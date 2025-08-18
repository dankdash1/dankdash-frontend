from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import uuid

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255))
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    role = db.Column(db.Enum('admin', 'manager', 'driver', 'sales', 'partner', 'customer', name='user_role'), 
                     nullable=False, default='customer')
    status = db.Column(db.Enum('active', 'inactive', 'suspended', name='user_status'), 
                       nullable=False, default='active')
    email_verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    orders = db.relationship('Order', foreign_keys='[Order.user_id]', backref='user', lazy=True)
    assigned_deliveries = db.relationship('Order', foreign_keys='[Order.assigned_driver_id]', backref='assigned_driver', lazy=True)
    cart_items = db.relationship('CartItem', backref='user', lazy=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone': self.phone,
            'role': self.role,
            'status': self.status,
            'email_verified': self.email_verified,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class Category(db.Model):
    __tablename__ = 'categories'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(255), unique=True, nullable=False)
    description = db.Column(db.Text)
    parent_id = db.Column(db.String(36), db.ForeignKey('categories.id'))
    sort_order = db.Column(db.Integer, default=0)
    status = db.Column(db.Enum('active', 'inactive', name='category_status'), 
                       nullable=False, default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    products = db.relationship('Product', backref='category', lazy=True)
    children = db.relationship('Category', backref=db.backref('parent', remote_side=[id]))
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'description': self.description,
            'parent_id': self.parent_id,
            'sort_order': self.sort_order,
            'status': self.status
        }

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(255), nullable=False)
    sku = db.Column(db.String(100), unique=True, nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    cost = db.Column(db.Numeric(10, 2))
    stock_quantity = db.Column(db.Integer, default=0)
    category_id = db.Column(db.String(36), db.ForeignKey('categories.id'))
    status = db.Column(db.Enum('active', 'inactive', 'out_of_stock', name='product_status'), 
                       nullable=False, default='active')
    weight = db.Column(db.Numeric(8, 3))
    dimensions = db.Column(db.JSON)
    metadata_json = db.Column(db.JSON)
    
    # Cannabis-specific fields
    product_category = db.Column(db.String(100))  # Flower, Edibles, Concentrates, etc.
    strain_type = db.Column(db.String(50))  # Indica, Sativa, Hybrid
    thc_content = db.Column(db.String(20))  # THC percentage
    cbd_content = db.Column(db.String(20))  # CBD percentage
    effects = db.Column(db.String(255))  # Relaxing, Energetic, etc.
    flavors = db.Column(db.String(255))  # Berry, Earthy, etc.
    stock = db.Column(db.Integer, default=0)  # Stock quantity
    image_url = db.Column(db.String(255))  # Product image
    lab_tested = db.Column(db.Boolean, default=False)
    organic = db.Column(db.Boolean, default=False)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    media = db.relationship('ProductMedia', backref='product', lazy=True, cascade='all, delete-orphan')
    order_items = db.relationship('OrderItem', backref='product', lazy=True)
    cart_items = db.relationship('CartItem', backref='product', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'sku': self.sku,
            'description': self.description,
            'price': float(self.price) if self.price else None,
            'cost': float(self.cost) if self.cost else None,
            'stock_quantity': self.stock_quantity,
            'category_id': self.category_id,
            'status': self.status,
            'weight': self.weight,
            'dimensions': self.dimensions,
            'metadata': self.metadata_json,
            'category': self.product_category,
            'strain_type': self.strain_type,
            'thc_content': self.thc_content,
            'cbd_content': self.cbd_content,
            'effects': self.effects,
            'flavors': self.flavors,
            'stock': self.stock,
            'image_url': self.image_url,
            'lab_tested': self.lab_tested,
            'organic': self.organic,
            'media': [media.to_dict() for media in self.media]
        }

class ProductMedia(db.Model):
    __tablename__ = 'product_media'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    product_id = db.Column(db.String(36), db.ForeignKey('products.id'), nullable=False)
    media_type = db.Column(db.Enum('image', 'video', 'document', name='media_type'), nullable=False)
    file_url = db.Column(db.String(500), nullable=False)
    file_name = db.Column(db.String(255))
    file_size = db.Column(db.Integer)
    mime_type = db.Column(db.String(100))
    sort_order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'media_type': self.media_type,
            'file_url': self.file_url,
            'file_name': self.file_name,
            'file_size': self.file_size,
            'mime_type': self.mime_type,
            'sort_order': self.sort_order
        }

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.String(36), db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'product': self.product.to_dict() if self.product else None
        }

class Order(db.Model):
    __tablename__ = 'orders'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_number = db.Column(db.String(50), unique=True, nullable=False)
    user_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    external_id = db.Column(db.String(255))
    status = db.Column(db.Enum('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 
                              name='order_status'), nullable=False, default='pending')
    payment_status = db.Column(db.Enum('pending', 'paid', 'failed', 'refunded', 'partially_refunded', 
                                      name='payment_status'), nullable=False, default='pending')
    fulfillment_status = db.Column(db.Enum('pending', 'processing', 'shipped', 'delivered', 'failed', 
                                          name='fulfillment_status'), nullable=False, default='pending')
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
    tax_amount = db.Column(db.Numeric(10, 2), default=0)
    shipping_amount = db.Column(db.Numeric(10, 2), default=0)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    currency = db.Column(db.String(3), default='USD')
    delivery_type = db.Column(db.Enum('local_delivery', 'carrier_shipping', 'pickup', name='delivery_type'), 
                             nullable=False)
    delivery_address = db.Column(db.JSON)
    pickup_address = db.Column(db.JSON)
    assigned_driver_id = db.Column(db.String(36), db.ForeignKey('users.id'))
    shipped_at = db.Column(db.DateTime)
    delivered_at = db.Column(db.DateTime)
    notes = db.Column(db.Text)
    metadata_json = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    items = db.relationship('OrderItem', backref='order', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_number': self.order_number,
            'user_id': self.user_id,
            'external_id': self.external_id,
            'status': self.status,
            'payment_status': self.payment_status,
            'fulfillment_status': self.fulfillment_status,
            'subtotal': float(self.subtotal) if self.subtotal else None,
            'tax_amount': float(self.tax_amount) if self.tax_amount else None,
            'shipping_amount': float(self.shipping_amount) if self.shipping_amount else None,
            'total_amount': float(self.total_amount) if self.total_amount else None,
            'currency': self.currency,
            'delivery_type': self.delivery_type,
            'delivery_address': self.delivery_address,
            'pickup_address': self.pickup_address,
            'notes': self.notes,
            'metadata': self.metadata_json,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'items': [item.to_dict() for item in self.items]
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    order_id = db.Column(db.String(36), db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.String(36), db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)
    total_price = db.Column(db.Numeric(10, 2), nullable=False)
    product_snapshot = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'unit_price': float(self.unit_price) if self.unit_price else None,
            'total_price': float(self.total_price) if self.total_price else None,
            'product_snapshot': self.product_snapshot,
            'product': self.product.to_dict() if self.product else None
        }

