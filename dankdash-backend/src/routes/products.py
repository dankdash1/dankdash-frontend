from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from src.models.models import db, Product, Category, ProductMedia
from src.routes.auth import token_required, admin_required
from sqlalchemy import or_

products_bp = Blueprint('products', __name__)

@products_bp.route('', methods=['GET'])
@cross_origin()
def get_products():
    try:
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        category_id = request.args.get('category_id')
        search = request.args.get('search')
        status = request.args.get('status', 'active')
        
        # Build query
        query = Product.query
        
        if category_id:
            query = query.filter(Product.category_id == category_id)
        
        if search:
            query = query.filter(or_(
                Product.name.ilike(f'%{search}%'),
                Product.description.ilike(f'%{search}%'),
                Product.sku.ilike(f'%{search}%')
            ))
        
        if status:
            query = query.filter(Product.status == status)
        
        # Paginate results
        products = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'products': [product.to_dict() for product in products.items],
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': products.total,
                'pages': products.pages,
                'has_next': products.has_next,
                'has_prev': products.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<product_id>', methods=['GET'])
@cross_origin()
def get_product(product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        return jsonify({'product': product.to_dict()}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('', methods=['POST'])
@cross_origin()
@token_required
@admin_required
def create_product(current_user):
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'sku', 'price']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if SKU already exists
        if Product.query.filter_by(sku=data['sku']).first():
            return jsonify({'error': 'SKU already exists'}), 400
        
        # Create product
        product = Product(
            name=data['name'],
            sku=data['sku'],
            description=data.get('description'),
            price=data['price'],
            cost=data.get('cost'),
            stock_quantity=data.get('stock_quantity', 0),
            category_id=data.get('category_id'),
            status=data.get('status', 'active'),
            weight=data.get('weight'),
            dimensions=data.get('dimensions'),
            metadata_json=data.get('metadata')
        )
        
        db.session.add(product)
        db.session.commit()
        
        return jsonify({
            'message': 'Product created successfully',
            'product': product.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<product_id>', methods=['PUT'])
@cross_origin()
@token_required
@admin_required
def update_product(current_user, product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        data = request.get_json()
        
        # Update fields
        if 'name' in data:
            product.name = data['name']
        if 'sku' in data:
            # Check if new SKU already exists (excluding current product)
            existing = Product.query.filter(Product.sku == data['sku'], Product.id != product_id).first()
            if existing:
                return jsonify({'error': 'SKU already exists'}), 400
            product.sku = data['sku']
        if 'description' in data:
            product.description = data['description']
        if 'price' in data:
            product.price = data['price']
        if 'cost' in data:
            product.cost = data['cost']
        if 'stock_quantity' in data:
            product.stock_quantity = data['stock_quantity']
        if 'category_id' in data:
            product.category_id = data['category_id']
        if 'status' in data:
            product.status = data['status']
        if 'weight' in data:
            product.weight = data['weight']
        if 'dimensions' in data:
            product.dimensions = data['dimensions']
        if 'metadata' in data:
            product.metadata_json = data['metadata']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Product updated successfully',
            'product': product.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<product_id>', methods=['DELETE'])
@cross_origin()
@token_required
@admin_required
def delete_product(current_user, product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({'message': 'Product deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<product_id>/media', methods=['POST'])
@cross_origin()
@token_required
@admin_required
def add_product_media(current_user, product_id):
    try:
        product = Product.query.get(product_id)
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['media_type', 'file_url']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        media = ProductMedia(
            product_id=product_id,
            media_type=data['media_type'],
            file_url=data['file_url'],
            file_name=data.get('file_name'),
            file_size=data.get('file_size'),
            mime_type=data.get('mime_type'),
            sort_order=data.get('sort_order', 0)
        )
        
        db.session.add(media)
        db.session.commit()
        
        return jsonify({
            'message': 'Media added successfully',
            'media': media.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<product_id>/media/<media_id>', methods=['DELETE'])
@cross_origin()
@token_required
@admin_required
def delete_product_media(current_user, product_id, media_id):
    try:
        media = ProductMedia.query.filter_by(id=media_id, product_id=product_id).first()
        if not media:
            return jsonify({'error': 'Media not found'}), 404
        
        db.session.delete(media)
        db.session.commit()
        
        return jsonify({'message': 'Media deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Categories endpoints
@products_bp.route('/categories', methods=['GET'])
@cross_origin()
def get_categories():
    try:
        categories = Category.query.filter_by(status='active').all()
        return jsonify({
            'categories': [category.to_dict() for category in categories]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/categories', methods=['POST'])
@cross_origin()
@token_required
@admin_required
def create_category(current_user):
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'slug']
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if slug already exists
        if Category.query.filter_by(slug=data['slug']).first():
            return jsonify({'error': 'Slug already exists'}), 400
        
        category = Category(
            name=data['name'],
            slug=data['slug'],
            description=data.get('description'),
            parent_id=data.get('parent_id'),
            sort_order=data.get('sort_order', 0),
            status=data.get('status', 'active')
        )
        
        db.session.add(category)
        db.session.commit()
        
        return jsonify({
            'message': 'Category created successfully',
            'category': category.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

