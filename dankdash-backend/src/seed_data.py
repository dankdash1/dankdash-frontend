from src.models.models import db, User, Category, Product, ProductMedia
from werkzeug.security import generate_password_hash

def seed_database():
    """Seed the database with initial data"""
    
    # Clear existing data
    db.session.query(ProductMedia).delete()
    db.session.query(Product).delete()
    db.session.query(Category).delete()
    db.session.query(User).delete()
    db.session.commit()
    
    print("Seeding database with initial data...")
    
    # Create admin user
    admin_user = User(
        email='admin@dankdash.com',
        first_name='Admin',
        last_name='User',
        phone='(555) 123-4567',
        role='admin',
        status='active',
        email_verified=True
    )
    admin_user.set_password('admin123')
    db.session.add(admin_user)
    
    # Create test customer
    customer_user = User(
        email='customer@example.com',
        first_name='John',
        last_name='Doe',
        phone='(555) 987-6543',
        role='customer',
        status='active',
        email_verified=True
    )
    customer_user.set_password('customer123')
    db.session.add(customer_user)
    
    # Create driver users
    driver1 = User(
        email='driver1@dankdash.com',
        first_name='Mike',
        last_name='Johnson',
        phone='(555) 111-2222',
        role='driver',
        status='active',
        email_verified=True
    )
    driver1.set_password('driver123')
    db.session.add(driver1)
    
    driver2 = User(
        email='driver2@dankdash.com',
        first_name='Sarah',
        last_name='Williams',
        phone='(555) 333-4444',
        role='driver',
        status='active',
        email_verified=True
    )
    driver2.set_password('driver123')
    db.session.add(driver2)
    
    driver3 = User(
        email='driver3@dankdash.com',
        first_name='Carlos',
        last_name='Rodriguez',
        phone='(555) 555-6666',
        role='driver',
        status='active',
        email_verified=True
    )
    driver3.set_password('driver123')
    db.session.add(driver3)
    
    # Create manager user
    manager_user = User(
        email='manager@dankdash.com',
        first_name='Lisa',
        last_name='Chen',
        phone='(555) 777-8888',
        role='manager',
        status='active',
        email_verified=True
    )
    manager_user.set_password('manager123')
    db.session.add(manager_user)
    
    # Create categories
    categories = [
        {
            'name': 'Flower',
            'slug': 'flower',
            'description': 'Premium cannabis flower products'
        },
        {
            'name': 'Edibles',
            'slug': 'edibles',
            'description': 'Cannabis-infused edible products'
        },
        {
            'name': 'Concentrates',
            'slug': 'concentrates',
            'description': 'Cannabis concentrates and extracts'
        },
        {
            'name': 'Accessories',
            'slug': 'accessories',
            'description': 'Cannabis accessories and tools'
        }
    ]
    
    category_objects = []
    for cat_data in categories:
        category = Category(**cat_data)
        db.session.add(category)
        category_objects.append(category)
    
    db.session.flush()  # Get category IDs
    
    # Create products
    products = [
        {
            'name': 'Premium OG Kush',
            'sku': 'POG-001',
            'description': 'High-quality OG Kush with earthy and pine flavors. Perfect for relaxation and stress relief.',
            'price': 45.00,
            'cost': 25.00,
            'stock_quantity': 25,
            'category_id': category_objects[0].id,  # Flower
            'weight': 3.5,
            'status': 'active'
        },
        {
            'name': 'Blue Dream',
            'sku': 'BD-002',
            'description': 'Balanced hybrid strain with sweet berry aroma. Great for daytime use.',
            'price': 40.00,
            'cost': 22.00,
            'stock_quantity': 30,
            'category_id': category_objects[0].id,  # Flower
            'weight': 3.5,
            'status': 'active'
        },
        {
            'name': 'Sour Diesel',
            'sku': 'SD-003',
            'description': 'Energizing sativa with diesel aroma. Perfect for creative activities.',
            'price': 42.00,
            'cost': 23.00,
            'stock_quantity': 20,
            'category_id': category_objects[0].id,  # Flower
            'weight': 3.5,
            'status': 'active'
        },
        {
            'name': 'Gummy Bears 10mg',
            'sku': 'GB-004',
            'description': 'Delicious fruit-flavored gummy bears. 10mg THC per piece, 10 pieces per package.',
            'price': 25.00,
            'cost': 12.00,
            'stock_quantity': 50,
            'category_id': category_objects[1].id,  # Edibles
            'status': 'active'
        },
        {
            'name': 'Chocolate Bar 100mg',
            'sku': 'CB-005',
            'description': 'Premium dark chocolate bar infused with 100mg THC. 10 pieces per bar.',
            'price': 30.00,
            'cost': 15.00,
            'stock_quantity': 35,
            'category_id': category_objects[1].id,  # Edibles
            'status': 'active'
        },
        {
            'name': 'Live Resin Cartridge',
            'sku': 'LRC-006',
            'description': 'Premium live resin vape cartridge. Full spectrum cannabis oil.',
            'price': 55.00,
            'cost': 30.00,
            'stock_quantity': 15,
            'category_id': category_objects[2].id,  # Concentrates
            'status': 'active'
        },
        {
            'name': 'Shatter - Wedding Cake',
            'sku': 'SWC-007',
            'description': 'High-quality shatter with Wedding Cake strain. 85% THC.',
            'price': 60.00,
            'cost': 35.00,
            'stock_quantity': 12,
            'category_id': category_objects[2].id,  # Concentrates
            'status': 'active'
        },
        {
            'name': 'Glass Pipe',
            'sku': 'GP-008',
            'description': 'Hand-blown glass pipe with unique design. Perfect for flower consumption.',
            'price': 35.00,
            'cost': 18.00,
            'stock_quantity': 40,
            'category_id': category_objects[3].id,  # Accessories
            'status': 'active'
        },
        {
            'name': 'Rolling Papers',
            'sku': 'RP-009',
            'description': 'Premium hemp rolling papers. 32 papers per pack.',
            'price': 8.00,
            'cost': 3.00,
            'stock_quantity': 100,
            'category_id': category_objects[3].id,  # Accessories
            'status': 'active'
        },
        {
            'name': 'Grinder - 4 Piece',
            'sku': 'G4P-010',
            'description': 'High-quality aluminum grinder with pollen catcher. 4-piece design.',
            'price': 45.00,
            'cost': 22.00,
            'stock_quantity': 25,
            'category_id': category_objects[3].id,  # Accessories
            'status': 'active'
        }
    ]
    
    product_objects = []
    for prod_data in products:
        product = Product(**prod_data)
        db.session.add(product)
        product_objects.append(product)
    
    db.session.flush()  # Get product IDs
    
    # Add sample media for products
    media_data = [
        {
            'product_id': product_objects[0].id,
            'media_type': 'image',
            'file_url': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
            'file_name': 'og_kush_1.jpg',
            'sort_order': 0
        },
        {
            'product_id': product_objects[1].id,
            'media_type': 'image',
            'file_url': 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop',
            'file_name': 'blue_dream_1.jpg',
            'sort_order': 0
        },
        {
            'product_id': product_objects[3].id,
            'media_type': 'image',
            'file_url': 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
            'file_name': 'gummy_bears_1.jpg',
            'sort_order': 0
        }
    ]
    
    for media in media_data:
        product_media = ProductMedia(**media)
        db.session.add(product_media)
    
    db.session.commit()
    print("Database seeded successfully!")

if __name__ == '__main__':
    from src.main import app
    with app.app_context():
        db.create_all()
        seed_database()

