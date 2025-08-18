from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from src.models.models import db, CartItem, Product
from src.routes.auth import token_required

cart_bp = Blueprint('cart', __name__)

@cart_bp.route('', methods=['GET'])
@cross_origin()
@token_required
def get_cart(current_user):
    try:
        cart_items = CartItem.query.filter_by(user_id=current_user.id).all()
        
        total = 0
        items_data = []
        
        for item in cart_items:
            item_data = item.to_dict()
            if item.product:
                item_total = float(item.product.price) * item.quantity
                item_data['item_total'] = item_total
                total += item_total
            items_data.append(item_data)
        
        return jsonify({
            'cart_items': items_data,
            'total': total,
            'item_count': len(cart_items)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/items', methods=['POST'])
@cross_origin()
@token_required
def add_to_cart(current_user):
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('product_id') or not data.get('quantity'):
            return jsonify({'error': 'Product ID and quantity are required'}), 400
        
        product_id = data['product_id']
        quantity = int(data['quantity'])
        
        if quantity <= 0:
            return jsonify({'error': 'Quantity must be greater than 0'}), 400
        
        # Check if product exists and is available
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        if product.status != 'active':
            return jsonify({'error': 'Product is not available'}), 400
        
        if product.stock_quantity < quantity:
            return jsonify({'error': 'Insufficient stock'}), 400
        
        # Check if item already exists in cart
        existing_item = CartItem.query.filter_by(
            user_id=current_user.id,
            product_id=product_id
        ).first()
        
        if existing_item:
            # Update quantity
            new_quantity = existing_item.quantity + quantity
            if product.stock_quantity < new_quantity:
                return jsonify({'error': 'Insufficient stock'}), 400
            
            existing_item.quantity = new_quantity
            db.session.commit()
            
            return jsonify({
                'message': 'Cart updated successfully',
                'cart_item': existing_item.to_dict()
            }), 200
        else:
            # Create new cart item
            cart_item = CartItem(
                user_id=current_user.id,
                product_id=product_id,
                quantity=quantity
            )
            
            db.session.add(cart_item)
            db.session.commit()
            
            return jsonify({
                'message': 'Item added to cart successfully',
                'cart_item': cart_item.to_dict()
            }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/items/<item_id>', methods=['PUT'])
@cross_origin()
@token_required
def update_cart_item(current_user, item_id):
    try:
        cart_item = CartItem.query.filter_by(
            id=item_id,
            user_id=current_user.id
        ).first()
        
        if not cart_item:
            return jsonify({'error': 'Cart item not found'}), 404
        
        data = request.get_json()
        quantity = int(data.get('quantity', cart_item.quantity))
        
        if quantity <= 0:
            return jsonify({'error': 'Quantity must be greater than 0'}), 400
        
        # Check stock availability
        if cart_item.product.stock_quantity < quantity:
            return jsonify({'error': 'Insufficient stock'}), 400
        
        cart_item.quantity = quantity
        db.session.commit()
        
        return jsonify({
            'message': 'Cart item updated successfully',
            'cart_item': cart_item.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/items/<item_id>', methods=['DELETE'])
@cross_origin()
@token_required
def remove_from_cart(current_user, item_id):
    try:
        cart_item = CartItem.query.filter_by(
            id=item_id,
            user_id=current_user.id
        ).first()
        
        if not cart_item:
            return jsonify({'error': 'Cart item not found'}), 404
        
        db.session.delete(cart_item)
        db.session.commit()
        
        return jsonify({'message': 'Item removed from cart successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@cart_bp.route('/clear', methods=['DELETE'])
@cross_origin()
@token_required
def clear_cart(current_user):
    try:
        CartItem.query.filter_by(user_id=current_user.id).delete()
        db.session.commit()
        
        return jsonify({'message': 'Cart cleared successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

