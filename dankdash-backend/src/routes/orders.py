from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from src.models.models import db, Order, OrderItem, CartItem, Product
from src.routes.auth import token_required, admin_required
from datetime import datetime
import uuid

orders_bp = Blueprint('orders', __name__)

def generate_order_number():
    """Generate a unique order number"""
    timestamp = datetime.now().strftime('%Y%m%d')
    random_suffix = str(uuid.uuid4())[:8].upper()
    return f"ORD-{timestamp}-{random_suffix}"

@orders_bp.route('', methods=['GET'])
@cross_origin()
@token_required
def get_orders(current_user):
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        status = request.args.get('status')
        
        # Build query based on user role
        if current_user.role in ['admin', 'manager']:
            query = Order.query
        else:
            query = Order.query.filter_by(user_id=current_user.id)
        
        if status:
            query = query.filter(Order.status == status)
        
        # Order by creation date (newest first)
        query = query.order_by(Order.created_at.desc())
        
        # Paginate results
        orders = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        return jsonify({
            'orders': [order.to_dict() for order in orders.items],
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

@orders_bp.route('/<order_id>', methods=['GET'])
@cross_origin()
@token_required
def get_order(current_user, order_id):
    try:
        # Build query based on user role
        if current_user.role in ['admin', 'manager']:
            order = Order.query.get(order_id)
        else:
            order = Order.query.filter_by(id=order_id, user_id=current_user.id).first()
        
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        return jsonify({'order': order.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/checkout', methods=['POST'])
@cross_origin()
@token_required
def checkout(current_user):
    try:
        data = request.get_json()
        
        # Get user's cart items
        cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
        
        if not cart_items:
            return jsonify({'error': 'Cart is empty'}), 400
        
        # Validate required fields
        required_fields = ['delivery_type', 'delivery_address']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Calculate totals
        subtotal = 0
        order_items_data = []
        
        for cart_item in cart_items:
            product = cart_item.product
            
            # Check product availability and stock
            if product.status != 'active':
                return jsonify({'error': f'Product {product.name} is not available'}), 400
            
            if product.stock_quantity < cart_item.quantity:
                return jsonify({'error': f'Insufficient stock for {product.name}'}), 400
            
            item_total = float(product.price) * cart_item.quantity
            subtotal += item_total
            
            order_items_data.append({
                'product_id': product.id,
                'quantity': cart_item.quantity,
                'unit_price': product.price,
                'total_price': item_total,
                'product_snapshot': product.to_dict()
            })
        
        # Calculate tax and shipping (simplified calculation)
        tax_rate = 0.08  # 8% tax
        tax_amount = subtotal * tax_rate
        
        shipping_amount = 0
        if data['delivery_type'] == 'carrier_shipping':
            shipping_amount = 15.00  # Flat rate shipping
        elif data['delivery_type'] == 'local_delivery':
            shipping_amount = 5.00   # Local delivery fee
        
        total_amount = subtotal + tax_amount + shipping_amount
        
        # Create order
        order = Order(
            order_number=generate_order_number(),
            user_id=current_user.id,
            status='pending',
            payment_status='pending',
            fulfillment_status='pending',
            subtotal=subtotal,
            tax_amount=tax_amount,
            shipping_amount=shipping_amount,
            total_amount=total_amount,
            delivery_type=data['delivery_type'],
            delivery_address=data['delivery_address'],
            pickup_address=data.get('pickup_address'),
            notes=data.get('notes'),
            metadata_json=data.get('metadata')
        )
        
        db.session.add(order)
        db.session.flush()  # Get the order ID
        
        # Create order items and update stock
        for item_data in order_items_data:
            order_item = OrderItem(
                order_id=order.id,
                product_id=item_data['product_id'],
                quantity=item_data['quantity'],
                unit_price=item_data['unit_price'],
                total_price=item_data['total_price'],
                product_snapshot=item_data['product_snapshot']
            )
            db.session.add(order_item)
            
            # Update product stock
            product = Product.query.get(item_data['product_id'])
            product.stock_quantity -= item_data['quantity']
        
        # Clear cart
        CartItem.query.filter_by(user_id=current_user.id).delete()
        
        db.session.commit()
        
        return jsonify({
            'message': 'Order created successfully',
            'order': order.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/<order_id>/status', methods=['PUT'])
@cross_origin()
@token_required
@admin_required
def update_order_status(current_user, order_id):
    try:
        order = Order.query.get(order_id)
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        data = request.get_json()
        
        if 'status' in data:
            order.status = data['status']
        if 'payment_status' in data:
            order.payment_status = data['payment_status']
        if 'fulfillment_status' in data:
            order.fulfillment_status = data['fulfillment_status']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Order status updated successfully',
            'order': order.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/<order_id>/cancel', methods=['PUT'])
@cross_origin()
@token_required
def cancel_order(current_user, order_id):
    try:
        # Users can only cancel their own orders, admins can cancel any
        if current_user.role in ['admin', 'manager']:
            order = Order.query.get(order_id)
        else:
            order = Order.query.filter_by(id=order_id, user_id=current_user.id).first()
        
        if not order:
            return jsonify({'error': 'Order not found'}), 404
        
        # Check if order can be cancelled
        if order.status in ['delivered', 'cancelled', 'refunded']:
            return jsonify({'error': 'Order cannot be cancelled'}), 400
        
        # Restore stock quantities
        for item in order.items:
            product = Product.query.get(item.product_id)
            if product:
                product.stock_quantity += item.quantity
        
        order.status = 'cancelled'
        order.fulfillment_status = 'failed'
        
        db.session.commit()
        
        return jsonify({
            'message': 'Order cancelled successfully',
            'order': order.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/stats', methods=['GET'])
@cross_origin()
@token_required
@admin_required
def get_order_stats(current_user):
    try:
        # Get various order statistics
        total_orders = Order.query.count()
        pending_orders = Order.query.filter_by(status='pending').count()
        completed_orders = Order.query.filter_by(status='delivered').count()
        
        # Calculate total revenue
        completed_order_totals = db.session.query(db.func.sum(Order.total_amount)).filter_by(status='delivered').scalar()
        total_revenue = float(completed_order_totals) if completed_order_totals else 0
        
        # Get recent orders
        recent_orders = Order.query.order_by(Order.created_at.desc()).limit(5).all()
        
        return jsonify({
            'stats': {
                'total_orders': total_orders,
                'pending_orders': pending_orders,
                'completed_orders': completed_orders,
                'total_revenue': total_revenue
            },
            'recent_orders': [order.to_dict() for order in recent_orders]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

