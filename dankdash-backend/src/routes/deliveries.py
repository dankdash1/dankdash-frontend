from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from src.models.models import db, Order, User
from src.routes.auth import token_required, admin_required
from datetime import datetime, timedelta
import uuid

deliveries_bp = Blueprint('deliveries', __name__)

@deliveries_bp.route('/drivers', methods=['GET'])
@cross_origin()
@token_required
def get_drivers(current_user):
    try:
        # Check user permissions (only admin/manager can view all drivers)
        if current_user.role not in ['admin', 'manager']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        # Get all users with driver role
        drivers = User.query.filter_by(role='driver').all()
        
        driver_list = []
        for driver in drivers:
            driver_data = {
                'id': driver.id,
                'first_name': driver.first_name,
                'last_name': driver.last_name,
                'email': driver.email,
                'phone': driver.phone,
                'status': 'active',  # In real implementation, track driver status
                'current_deliveries': 0  # Count of active deliveries
            }
            
            # Count active deliveries for this driver
            active_count = Order.query.filter(
                Order.assigned_driver_id == driver.id,
                Order.fulfillment_status.in_(['processing', 'shipped'])
            ).count()
            driver_data['current_deliveries'] = active_count
            
            driver_list.append(driver_data)
        
        return jsonify({'drivers': driver_list}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@deliveries_bp.route('', methods=['GET'])
@cross_origin()
@token_required
def get_deliveries(current_user):
    try:
        # Check user permissions
        if current_user.role not in ['admin', 'manager', 'driver']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        status = request.args.get('status', 'all')
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        # Build query based on user role and status
        query = Order.query.filter(Order.delivery_type == 'local_delivery')
        
        # Filter by driver for driver role
        if current_user.role == 'driver':
            query = query.filter(Order.assigned_driver_id == current_user.id)
        
        # Filter by status
        if status == 'active':
            query = query.filter(Order.fulfillment_status.in_(['processing', 'shipped']))
        elif status == 'pending':
            query = query.filter(Order.fulfillment_status == 'pending')
        elif status == 'completed':
            query = query.filter(Order.fulfillment_status == 'delivered')
        elif status != 'all':
            query = query.filter(Order.fulfillment_status == status)
        
        # Order by creation date (newest first)
        query = query.order_by(Order.created_at.desc())
        
        # Paginate results
        orders = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        # Format delivery data
        deliveries = []
        for order in orders.items:
            delivery_data = {
                'id': order.id,
                'order_number': order.order_number,
                'customer_name': f"{order.user.first_name} {order.user.last_name}" if order.user else "Guest",
                'customer_phone': order.user.phone if order.user else None,
                'customer_email': order.user.email if order.user else None,
                'delivery_address': order.delivery_address,
                'total_amount': float(order.total_amount) if order.total_amount else 0,
                'status': order.fulfillment_status,
                'created_at': order.created_at.isoformat() if order.created_at else None,
                'estimated_delivery': None,  # Will be calculated based on route optimization
                'driver': None,
                'tracking_url': f"/track/{order.order_number}",
                'items_count': len(order.items)
            }
            
            # Add driver info if assigned
            if hasattr(order, 'assigned_driver_id') and order.assigned_driver_id:
                driver = User.query.get(order.assigned_driver_id)
                if driver:
                    delivery_data['driver'] = {
                        'id': driver.id,
                        'first_name': driver.first_name,
                        'last_name': driver.last_name,
                        'phone': driver.phone
                    }
            
            deliveries.append(delivery_data)
        
        return jsonify({
            'deliveries': deliveries,
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': orders.total,
                'pages': orders.pages,
                'has_next': orders.has_next,
                'has_prev': orders.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@deliveries_bp.route('/<delivery_id>/status', methods=['PUT'])
@cross_origin()
@token_required
def update_delivery_status(current_user, delivery_id):
    try:
        # Check user permissions
        if current_user.role not in ['admin', 'manager', 'driver']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        order = Order.query.get(delivery_id)
        if not order:
            return jsonify({'error': 'Delivery not found'}), 404
        
        # Drivers can only update their own deliveries
        if current_user.role == 'driver' and order.assigned_driver_id != current_user.id:
            return jsonify({'error': 'You can only update your own deliveries'}), 403
        
        data = request.get_json()
        new_status = data.get('status')
        
        if not new_status:
            return jsonify({'error': 'Status is required'}), 400
        
        # Validate status transitions
        valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'failed']
        if new_status not in valid_statuses:
            return jsonify({'error': 'Invalid status'}), 400
        
        # Update order fulfillment status
        order.fulfillment_status = new_status
        
        # Update order status based on fulfillment status
        if new_status == 'delivered':
            order.status = 'delivered'
        elif new_status == 'failed':
            order.status = 'cancelled'
        elif new_status in ['processing', 'shipped']:
            order.status = 'processing'
        
        # Add timestamp for status changes
        if new_status == 'shipped':
            order.shipped_at = datetime.utcnow()
        elif new_status == 'delivered':
            order.delivered_at = datetime.utcnow()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Delivery status updated successfully',
            'delivery': {
                'id': order.id,
                'status': order.fulfillment_status,
                'order_status': order.status
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@deliveries_bp.route('/<delivery_id>/assign', methods=['PUT'])
@cross_origin()
@token_required
def assign_driver(current_user, delivery_id):
    try:
        # Check user permissions (only admin/manager can assign drivers)
        if current_user.role not in ['admin', 'manager']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        order = Order.query.get(delivery_id)
        if not order:
            return jsonify({'error': 'Delivery not found'}), 404
        
        data = request.get_json()
        driver_id = data.get('driver_id')
        
        if not driver_id:
            return jsonify({'error': 'Driver ID is required'}), 400
        
        # Verify driver exists and has driver role
        driver = User.query.filter_by(id=driver_id, role='driver').first()
        if not driver:
            return jsonify({'error': 'Driver not found'}), 404
        
        # Assign driver to order
        order.assigned_driver_id = driver_id
        order.fulfillment_status = 'processing'
        order.status = 'processing'
        
        db.session.commit()
        
        return jsonify({
            'message': 'Driver assigned successfully',
            'delivery': {
                'id': order.id,
                'driver': {
                    'id': driver.id,
                    'name': f"{driver.first_name} {driver.last_name}"
                }
            }
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@deliveries_bp.route('/stats', methods=['GET'])
@cross_origin()
@token_required
def get_delivery_stats(current_user):
    try:
        # Check user permissions
        if current_user.role not in ['admin', 'manager']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        today = datetime.utcnow().date()
        
        # Calculate stats
        active_deliveries = Order.query.filter(
            Order.delivery_type == 'local_delivery',
            Order.fulfillment_status.in_(['processing', 'shipped'])
        ).count()
        
        completed_today = Order.query.filter(
            Order.delivery_type == 'local_delivery',
            Order.fulfillment_status == 'delivered',
            db.func.date(Order.updated_at) == today
        ).count()
        
        pending_pickup = Order.query.filter(
            Order.delivery_type == 'local_delivery',
            Order.fulfillment_status == 'pending'
        ).count()
        
        total_drivers = User.query.filter_by(role='driver').count()
        
        # Calculate revenue stats
        today_revenue = db.session.query(db.func.sum(Order.total_amount)).filter(
            Order.delivery_type == 'local_delivery',
            Order.fulfillment_status == 'delivered',
            db.func.date(Order.updated_at) == today
        ).scalar() or 0
        
        # Average delivery time (mock data for now)
        avg_delivery_time = "45 minutes"
        
        return jsonify({
            'stats': {
                'active_deliveries': active_deliveries,
                'completed_today': completed_today,
                'pending_pickup': pending_pickup,
                'total_drivers': total_drivers,
                'today_revenue': float(today_revenue),
                'avg_delivery_time': avg_delivery_time
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@deliveries_bp.route('/optimize-routes', methods=['POST'])
@cross_origin()
@token_required
def optimize_routes(current_user):
    try:
        # Check user permissions
        if current_user.role not in ['admin', 'manager']:
            return jsonify({'error': 'Insufficient permissions'}), 403
        
        # Get pending deliveries
        pending_deliveries = Order.query.filter(
            Order.delivery_type == 'local_delivery',
            Order.fulfillment_status == 'pending'
        ).all()
        
        if not pending_deliveries:
            return jsonify({'message': 'No pending deliveries to optimize'}), 200
        
        # Mock route optimization (in real implementation, use Google Maps API or similar)
        optimized_routes = []
        for i, delivery in enumerate(pending_deliveries):
            route = {
                'delivery_id': delivery.id,
                'order_number': delivery.order_number,
                'address': delivery.delivery_address,
                'estimated_time': f"{30 + (i * 15)} minutes",
                'distance': f"{2.5 + (i * 0.8):.1f} miles",
                'priority': 'high' if i < 3 else 'normal'
            }
            optimized_routes.append(route)
        
        return jsonify({
            'message': 'Routes optimized successfully',
            'routes': optimized_routes,
            'total_deliveries': len(optimized_routes),
            'estimated_total_time': f"{len(optimized_routes) * 45} minutes"
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@deliveries_bp.route('/track/<order_number>', methods=['GET'])
@cross_origin()
def track_delivery(order_number):
    try:
        order = Order.query.filter_by(order_number=order_number).first()
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        # Build tracking information
        tracking_info = {
            'order_number': order.order_number,
            'status': order.fulfillment_status,
            'estimated_delivery': None,  # Would be calculated based on current location
            'delivery_address': order.delivery_address,
            'timeline': [
                {
                    'status': 'Order Placed',
                    'timestamp': order.created_at.isoformat() if order.created_at else None,
                    'completed': True
                },
                {
                    'status': 'Order Confirmed',
                    'timestamp': order.created_at.isoformat() if order.created_at else None,
                    'completed': order.status != 'pending'
                },
                {
                    'status': 'Preparing for Delivery',
                    'timestamp': None,
                    'completed': order.fulfillment_status in ['processing', 'shipped', 'delivered']
                },
                {
                    'status': 'Out for Delivery',
                    'timestamp': getattr(order, 'shipped_at', None),
                    'completed': order.fulfillment_status in ['shipped', 'delivered']
                },
                {
                    'status': 'Delivered',
                    'timestamp': getattr(order, 'delivered_at', None),
                    'completed': order.fulfillment_status == 'delivered'
                }
            ]
        }
        
        # Add driver info if available
        if hasattr(order, 'assigned_driver_id') and order.assigned_driver_id:
            driver = User.query.get(order.assigned_driver_id)
            if driver:
                tracking_info['driver'] = {
                    'name': f"{driver.first_name} {driver.last_name}",
                    'phone': driver.phone
                }
        
        return jsonify({'tracking': tracking_info}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Driver-specific endpoints
@deliveries_bp.route('/driver/my-deliveries', methods=['GET'])
@cross_origin()
@token_required
def get_driver_deliveries(current_user):
    try:
        if current_user.role != 'driver':
            return jsonify({'error': 'Driver access required'}), 403
        
        # Get deliveries assigned to this driver
        deliveries = Order.query.filter(
            Order.assigned_driver_id == current_user.id,
            Order.delivery_type == 'local_delivery'
        ).order_by(Order.created_at.desc()).all()
        
        delivery_list = []
        for order in deliveries:
            delivery_data = {
                'id': order.id,
                'order_number': order.order_number,
                'customer_name': f"{order.user.first_name} {order.user.last_name}" if order.user else "Guest",
                'customer_phone': order.user.phone if order.user else None,
                'delivery_address': order.delivery_address,
                'total_amount': float(order.total_amount) if order.total_amount else 0,
                'status': order.fulfillment_status,
                'items': [item.to_dict() for item in order.items],
                'special_instructions': order.notes
            }
            delivery_list.append(delivery_data)
        
        return jsonify({'deliveries': delivery_list}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@deliveries_bp.route('/driver/update-location', methods=['POST'])
@cross_origin()
@token_required
def update_driver_location(current_user):
    try:
        if current_user.role != 'driver':
            return jsonify({'error': 'Driver access required'}), 403
        
        data = request.get_json()
        latitude = data.get('latitude')
        longitude = data.get('longitude')
        
        if not latitude or not longitude:
            return jsonify({'error': 'Latitude and longitude are required'}), 400
        
        # In a real implementation, store location in database
        # For now, just acknowledge the update
        
        return jsonify({
            'message': 'Location updated successfully',
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


