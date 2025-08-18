from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import datetime

api_bp = Blueprint('api', __name__)

# Sample data for demonstration
sample_products = [
    {
        "id": 1,
        "name": "Premium OG Kush",
        "sku": "POG-001",
        "price": 45.00,
        "stock": 25,
        "category": "Flower",
        "status": "active",
        "description": "High-quality OG Kush with earthy and pine flavors",
        "image": "/api/placeholder/400/300"
    },
    {
        "id": 2,
        "name": "Blue Dream Cartridge",
        "sku": "BDC-002",
        "price": 35.00,
        "stock": 15,
        "category": "Concentrates",
        "status": "active",
        "description": "Smooth Blue Dream vape cartridge",
        "image": "/api/placeholder/400/300"
    },
    {
        "id": 3,
        "name": "Gummy Bears 10mg",
        "sku": "GB-003",
        "price": 25.00,
        "stock": 50,
        "category": "Edibles",
        "status": "active",
        "description": "Delicious fruit-flavored gummy bears",
        "image": "/api/placeholder/400/300"
    }
]

sample_customers = [
    {
        "id": 1,
        "name": "John Smith",
        "email": "john@example.com",
        "phone": "(555) 123-4567",
        "orders": 12,
        "status": "active",
        "last_order": "2024-08-10"
    },
    {
        "id": 2,
        "name": "Sarah Johnson",
        "email": "sarah@example.com",
        "phone": "(555) 987-6543",
        "orders": 8,
        "status": "active",
        "last_order": "2024-08-11"
    },
    {
        "id": 3,
        "name": "Mike Chen",
        "email": "mike@example.com",
        "phone": "(555) 456-7890",
        "orders": 3,
        "status": "pending",
        "last_order": "2024-08-05"
    }
]

sample_orders = [
    {
        "id": 1,
        "order_number": "ORD-001",
        "customer": "John Smith",
        "total": 125.00,
        "status": "delivered",
        "date": "2024-08-10",
        "items": [
            {"product": "Premium OG Kush", "quantity": 2, "price": 45.00},
            {"product": "Gummy Bears 10mg", "quantity": 1, "price": 25.00}
        ]
    },
    {
        "id": 2,
        "order_number": "ORD-002",
        "customer": "Sarah Johnson",
        "total": 80.00,
        "status": "pending",
        "date": "2024-08-11",
        "items": [
            {"product": "Blue Dream Cartridge", "quantity": 2, "price": 35.00}
        ]
    },
    {
        "id": 3,
        "order_number": "ORD-003",
        "customer": "Mike Chen",
        "total": 70.00,
        "status": "shipped",
        "date": "2024-08-12",
        "items": [
            {"product": "Premium OG Kush", "quantity": 1, "price": 45.00},
            {"product": "Gummy Bears 10mg", "quantity": 1, "price": 25.00}
        ]
    }
]

# Dashboard stats
@api_bp.route('/dashboard/stats', methods=['GET'])
@cross_origin()
def get_dashboard_stats():
    stats = {
        "customers": len(sample_customers),
        "products": len(sample_products),
        "orders": len(sample_orders),
        "revenue": sum(order["total"] for order in sample_orders)
    }
    return jsonify(stats)

# Products endpoints
@api_bp.route('/products', methods=['GET'])
@cross_origin()
def get_products():
    return jsonify(sample_products)

@api_bp.route('/products/<int:product_id>', methods=['GET'])
@cross_origin()
def get_product(product_id):
    product = next((p for p in sample_products if p["id"] == product_id), None)
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

@api_bp.route('/products', methods=['POST'])
@cross_origin()
def create_product():
    data = request.get_json()
    new_product = {
        "id": len(sample_products) + 1,
        "name": data.get("name"),
        "sku": data.get("sku"),
        "price": data.get("price"),
        "stock": data.get("stock", 0),
        "category": data.get("category"),
        "status": data.get("status", "active"),
        "description": data.get("description", ""),
        "image": "/api/placeholder/400/300"
    }
    sample_products.append(new_product)
    return jsonify(new_product), 201

# Customers endpoints
@api_bp.route('/customers', methods=['GET'])
@cross_origin()
def get_customers():
    return jsonify(sample_customers)

@api_bp.route('/customers/<int:customer_id>', methods=['GET'])
@cross_origin()
def get_customer(customer_id):
    customer = next((c for c in sample_customers if c["id"] == customer_id), None)
    if customer:
        return jsonify(customer)
    return jsonify({"error": "Customer not found"}), 404

@api_bp.route('/customers', methods=['POST'])
@cross_origin()
def create_customer():
    data = request.get_json()
    new_customer = {
        "id": len(sample_customers) + 1,
        "name": data.get("name"),
        "email": data.get("email"),
        "phone": data.get("phone"),
        "orders": 0,
        "status": data.get("status", "active"),
        "last_order": None
    }
    sample_customers.append(new_customer)
    return jsonify(new_customer), 201

# Orders endpoints
@api_bp.route('/orders', methods=['GET'])
@cross_origin()
def get_orders():
    return jsonify(sample_orders)

@api_bp.route('/orders/<int:order_id>', methods=['GET'])
@cross_origin()
def get_order(order_id):
    order = next((o for o in sample_orders if o["id"] == order_id), None)
    if order:
        return jsonify(order)
    return jsonify({"error": "Order not found"}), 404

@api_bp.route('/orders', methods=['POST'])
@cross_origin()
def create_order():
    data = request.get_json()
    new_order = {
        "id": len(sample_orders) + 1,
        "order_number": f"ORD-{len(sample_orders) + 1:03d}",
        "customer": data.get("customer"),
        "total": data.get("total"),
        "status": data.get("status", "pending"),
        "date": datetime.datetime.now().strftime("%Y-%m-%d"),
        "items": data.get("items", [])
    }
    sample_orders.append(new_order)
    return jsonify(new_order), 201

# Partner API endpoints
@api_bp.route('/v1/orders', methods=['POST'])
@cross_origin()
def create_partner_order():
    """Partner API endpoint for creating orders"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['external_id', 'mode', 'pickup', 'dropoff', 'items']
    for field in required_fields:
        if field not in data:
            return jsonify({"error": {"code": "invalid_request", "message": f"Missing required field: {field}"}}), 400
    
    # Create order response
    order_response = {
        "order_id": f"dankdash_{len(sample_orders) + 1}",
        "external_id": data["external_id"],
        "status": "queued",
        "tracking_url": f"https://track.dankdash.com/{data['external_id']}",
        "estimated_pickup_time": "2024-08-12T15:30:00Z",
        "estimated_delivery_time": "2024-08-12T17:00:00Z"
    }
    
    return jsonify(order_response), 201

@api_bp.route('/v1/orders/<order_id>', methods=['GET'])
@cross_origin()
def get_partner_order(order_id):
    """Partner API endpoint for getting order status"""
    order_status = {
        "order_id": order_id,
        "status": "in_transit",
        "events": [
            {"timestamp": "2024-08-12T14:00:00Z", "status": "queued", "message": "Order received"},
            {"timestamp": "2024-08-12T15:30:00Z", "status": "picked_up", "message": "Package picked up"},
            {"timestamp": "2024-08-12T16:15:00Z", "status": "in_transit", "message": "Out for delivery"}
        ],
        "estimated_delivery_time": "2024-08-12T17:00:00Z",
        "tracking_url": f"https://track.dankdash.com/{order_id}"
    }
    
    return jsonify(order_status)

@api_bp.route('/v1/rates', methods=['POST'])
@cross_origin()
def get_shipping_rates():
    """Partner API endpoint for getting shipping rates"""
    data = request.get_json()
    
    rates = [
        {
            "service": "same_day",
            "carrier": "DankDash Local",
            "cost": 15.00,
            "currency": "USD",
            "estimated_delivery_time": "2024-08-12T18:00:00Z"
        },
        {
            "service": "next_day",
            "carrier": "DankDash Express",
            "cost": 25.00,
            "currency": "USD",
            "estimated_delivery_time": "2024-08-13T12:00:00Z"
        }
    ]
    
    return jsonify({"rates": rates})

# Chatbot endpoint
@api_bp.route('/chat', methods=['POST'])
@cross_origin()
def chat():
    """Simple chatbot endpoint"""
    data = request.get_json()
    message = data.get("message", "").lower()
    
    # Simple response logic
    if "product" in message or "strain" in message:
        response = "We have a great selection of premium cannabis products! Our top sellers include OG Kush, Blue Dream, and various edibles. Would you like to see our full catalog?"
    elif "delivery" in message or "shipping" in message:
        response = "We offer same-day local delivery and nationwide shipping! Local delivery is usually within 2-4 hours, and shipping takes 1-3 business days. What's your location?"
    elif "price" in message or "cost" in message:
        response = "Our products range from $25-$65 depending on the type and quality. We also offer bulk discounts for larger orders. What type of product are you interested in?"
    elif "hello" in message or "hi" in message:
        response = "Hello! Welcome to DankDash. I'm here to help you find the perfect cannabis products and answer any questions about our delivery service. How can I assist you today?"
    else:
        response = "Thanks for your message! I'm here to help with product recommendations, delivery information, pricing, and more. Feel free to ask me anything about our cannabis products and services!"
    
    return jsonify({"response": response})

