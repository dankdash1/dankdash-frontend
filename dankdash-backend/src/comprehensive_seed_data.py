import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.models import db, User, Product, CartItem, Order, OrderItem
from werkzeug.security import generate_password_hash
import uuid

def create_comprehensive_products():
    """Create comprehensive cannabis product database with realistic data"""
    
    # Clear existing products (skip if running in main.py context)
    try:
        Product.query.delete()
    except:
        pass
    
    products = [
        # FLOWER - INDICA STRAINS
        {
            'name': 'OG Kush',
            'description': 'Classic indica strain with earthy pine flavors. Known for its relaxing body high and stress relief. Perfect for evening use and pain management.',
            'price': 45.00,
            'category': 'Flower',
            'strain_type': 'Indica',
            'thc_content': '22.5%',
            'cbd_content': '0.3%',
            'effects': 'Relaxing, Euphoric, Sleepy',
            'flavors': 'Earthy, Pine, Woody',
            'stock': 25,
            'sku': 'FL-OGK-001',
            'image_url': '/images/og-kush.jpg',
            'weight': '3.5g',
            'lab_tested': True,
            'organic': True
        },
        {
            'name': 'Granddaddy Purple',
            'description': 'Legendary indica with sweet grape and berry flavors. Delivers deep relaxation and is excellent for insomnia and chronic pain.',
            'price': 42.00,
            'category': 'Flower',
            'strain_type': 'Indica',
            'thc_content': '20.1%',
            'cbd_content': '0.2%',
            'effects': 'Relaxing, Sleepy, Happy',
            'flavors': 'Grape, Berry, Sweet',
            'stock': 18,
            'sku': 'FL-GDP-002',
            'image_url': '/images/granddaddy-purple.jpg',
            'weight': '3.5g',
            'lab_tested': True,
            'organic': False
        },
        {
            'name': 'Northern Lights',
            'description': 'Pure indica classic with sweet and spicy flavors. Famous for its resinous buds and powerful sedating effects.',
            'price': 38.00,
            'category': 'Flower',
            'strain_type': 'Indica',
            'thc_content': '18.7%',
            'cbd_content': '0.4%',
            'effects': 'Relaxing, Sleepy, Euphoric',
            'flavors': 'Sweet, Spicy, Earthy',
            'stock': 22,
            'sku': 'FL-NL-003',
            'image_url': '/images/northern-lights.jpg',
            'weight': '3.5g',
            'lab_tested': True,
            'organic': True
        },
        
        # FLOWER - SATIVA STRAINS
        {
            'name': 'Blue Dream',
            'description': 'Balanced sativa-dominant hybrid with sweet berry flavors. Provides gentle cerebral invigoration and full-body relaxation.',
            'price': 40.00,
            'category': 'Flower',
            'strain_type': 'Sativa',
            'thc_content': '21.3%',
            'cbd_content': '0.2%',
            'effects': 'Creative, Energetic, Happy',
            'flavors': 'Berry, Sweet, Herbal',
            'stock': 30,
            'sku': 'FL-BD-004',
            'image_url': '/images/blue-dream.jpg',
            'weight': '3.5g',
            'lab_tested': True,
            'organic': True
        },
        {
            'name': 'Sour Diesel',
            'description': 'Energizing sativa with pungent diesel and citrus aromas. Delivers fast-acting cerebral effects and creative energy.',
            'price': 44.00,
            'category': 'Flower',
            'strain_type': 'Sativa',
            'thc_content': '23.8%',
            'cbd_content': '0.1%',
            'effects': 'Energetic, Creative, Uplifting',
            'flavors': 'Diesel, Citrus, Pungent',
            'stock': 15,
            'sku': 'FL-SD-005',
            'image_url': '/images/sour-diesel.jpg',
            'weight': '3.5g',
            'lab_tested': True,
            'organic': False
        },
        {
            'name': 'Jack Herer',
            'description': 'Legendary sativa named after the cannabis activist. Offers clear-headed and creative effects with pine and spice flavors.',
            'price': 43.00,
            'category': 'Flower',
            'strain_type': 'Sativa',
            'thc_content': '20.9%',
            'cbd_content': '0.3%',
            'effects': 'Creative, Focused, Uplifting',
            'flavors': 'Pine, Spicy, Earthy',
            'stock': 20,
            'sku': 'FL-JH-006',
            'image_url': '/images/jack-herer.jpg',
            'weight': '3.5g',
            'lab_tested': True,
            'organic': True
        },
        
        # FLOWER - HYBRID STRAINS
        {
            'name': 'Girl Scout Cookies',
            'description': 'Potent hybrid with sweet and earthy flavors. Delivers euphoric effects followed by full-body relaxation.',
            'price': 48.00,
            'category': 'Flower',
            'strain_type': 'Hybrid',
            'thc_content': '26.2%',
            'cbd_content': '0.2%',
            'effects': 'Euphoric, Relaxing, Creative',
            'flavors': 'Sweet, Earthy, Mint',
            'stock': 12,
            'sku': 'FL-GSC-007',
            'image_url': '/images/girl-scout-cookies.jpg',
            'weight': '3.5g',
            'lab_tested': True,
            'organic': True
        },
        {
            'name': 'Wedding Cake',
            'description': 'Indica-dominant hybrid with vanilla and pepper notes. Provides relaxing effects with mental clarity.',
            'price': 46.00,
            'category': 'Flower',
            'strain_type': 'Hybrid',
            'thc_content': '24.1%',
            'cbd_content': '0.4%',
            'effects': 'Relaxing, Happy, Euphoric',
            'flavors': 'Vanilla, Pepper, Sweet',
            'stock': 16,
            'sku': 'FL-WC-008',
            'image_url': '/images/wedding-cake.jpg',
            'weight': '3.5g',
            'lab_tested': True,
            'organic': False
        },
        
        # PRE-ROLLS
        {
            'name': 'OG Kush Pre-Roll',
            'description': 'Premium pre-rolled joint with OG Kush flower. Perfect for on-the-go relaxation.',
            'price': 12.00,
            'category': 'Pre-Rolls',
            'strain_type': 'Indica',
            'thc_content': '22.5%',
            'cbd_content': '0.3%',
            'effects': 'Relaxing, Euphoric, Sleepy',
            'flavors': 'Earthy, Pine, Woody',
            'stock': 45,
            'sku': 'PR-OGK-009',
            'image_url': '/images/og-kush-preroll.jpg',
            'weight': '1g',
            'lab_tested': True,
            'organic': True
        },
        {
            'name': 'Blue Dream Pre-Roll 3-Pack',
            'description': 'Three premium Blue Dream pre-rolls. Great value for sativa lovers.',
            'price': 32.00,
            'category': 'Pre-Rolls',
            'strain_type': 'Sativa',
            'thc_content': '21.3%',
            'cbd_content': '0.2%',
            'effects': 'Creative, Energetic, Happy',
            'flavors': 'Berry, Sweet, Herbal',
            'stock': 25,
            'sku': 'PR-BD3-010',
            'image_url': '/images/blue-dream-3pack.jpg',
            'weight': '3g (1g each)',
            'lab_tested': True,
            'organic': True
        },
        {
            'name': 'Hash-Infused Pre-Roll',
            'description': 'Premium flower pre-roll infused with high-quality hash for extra potency.',
            'price': 18.00,
            'category': 'Pre-Rolls',
            'strain_type': 'Hybrid',
            'thc_content': '38.7%',
            'cbd_content': '0.5%',
            'effects': 'Euphoric, Relaxing, Potent',
            'flavors': 'Earthy, Hash, Spicy',
            'stock': 20,
            'sku': 'PR-HI-011',
            'image_url': '/images/hash-infused-preroll.jpg',
            'weight': '1g',
            'lab_tested': True,
            'organic': False
        },
        
        # EDIBLES - GUMMIES
        {
            'name': 'Mixed Berry Gummies',
            'description': 'Delicious mixed berry gummies with 10mg THC each. Perfect for precise dosing and great taste.',
            'price': 25.00,
            'category': 'Edibles',
            'strain_type': 'Hybrid',
            'thc_content': '10mg per gummy',
            'cbd_content': '0mg',
            'effects': 'Relaxing, Happy, Euphoric',
            'flavors': 'Mixed Berry, Sweet',
            'stock': 35,
            'sku': 'ED-MBG-012',
            'image_url': '/images/mixed-berry-gummies.jpg',
            'weight': '10 gummies (100mg total)',
            'lab_tested': True,
            'organic': True
        },
        {
            'name': 'Sour Watermelon Gummies',
            'description': 'Sour watermelon gummies with 5mg THC each. Great for beginners or microdosing.',
            'price': 20.00,
            'category': 'Edibles',
            'strain_type': 'Sativa',
            'thc_content': '5mg per gummy',
            'cbd_content': '0mg',
            'effects': 'Uplifting, Creative, Energetic',
            'flavors': 'Watermelon, Sour',
            'stock': 40,
            'sku': 'ED-SWG-013',
            'image_url': '/images/sour-watermelon-gummies.jpg',
            'weight': '20 gummies (100mg total)',
            'lab_tested': True,
            'organic': True
        },
        
        # EDIBLES - CHOCOLATES
        {
            'name': 'Dark Chocolate Bar',
            'description': 'Premium dark chocolate bar with 10mg THC per square. Rich cocoa flavor with smooth effects.',
            'price': 28.00,
            'category': 'Edibles',
            'strain_type': 'Indica',
            'thc_content': '10mg per square',
            'cbd_content': '0mg',
            'effects': 'Relaxing, Sleepy, Happy',
            'flavors': 'Dark Chocolate, Cocoa',
            'stock': 30,
            'sku': 'ED-DCB-014',
            'image_url': '/images/dark-chocolate-bar.jpg',
            'weight': '10 squares (100mg total)',
            'lab_tested': True,
            'organic': True
        },
        {
            'name': 'Milk Chocolate Truffles',
            'description': 'Gourmet milk chocolate truffles with 5mg THC each. Luxurious taste and gentle effects.',
            'price': 35.00,
            'category': 'Edibles',
            'strain_type': 'Hybrid',
            'thc_content': '5mg per truffle',
            'cbd_content': '0mg',
            'effects': 'Happy, Relaxing, Euphoric',
            'flavors': 'Milk Chocolate, Cream',
            'stock': 25,
            'sku': 'ED-MCT-015',
            'image_url': '/images/milk-chocolate-truffles.jpg',
            'weight': '12 truffles (60mg total)',
            'lab_tested': True,
            'organic': True
        },
        
        # CONCENTRATES - SHATTER
        {
            'name': 'OG Kush Shatter',
            'description': 'Premium OG Kush shatter with glass-like consistency. High potency for experienced users.',
            'price': 55.00,
            'category': 'Concentrates',
            'strain_type': 'Indica',
            'thc_content': '87.3%',
            'cbd_content': '0.2%',
            'effects': 'Potent, Relaxing, Euphoric',
            'flavors': 'Earthy, Pine, Woody',
            'stock': 15,
            'sku': 'CO-OGS-016',
            'image_url': '/images/og-kush-shatter.jpg',
            'weight': '1g',
            'lab_tested': True,
            'organic': False
        },
        
        # CONCENTRATES - LIVE RESIN
        {
            'name': 'Blue Dream Live Resin',
            'description': 'Fresh-frozen Blue Dream live resin with full terpene profile. Premium quality and flavor.',
            'price': 65.00,
            'category': 'Concentrates',
            'strain_type': 'Sativa',
            'thc_content': '82.1%',
            'cbd_content': '0.3%',
            'effects': 'Creative, Energetic, Flavorful',
            'flavors': 'Berry, Sweet, Herbal',
            'stock': 12,
            'sku': 'CO-BDLR-017',
            'image_url': '/images/blue-dream-live-resin.jpg',
            'weight': '1g',
            'lab_tested': True,
            'organic': True
        },
        
        # VAPE CARTRIDGES
        {
            'name': 'Girl Scout Cookies Cartridge',
            'description': 'Premium GSC distillate cartridge with natural terpenes. Compatible with 510-thread batteries.',
            'price': 45.00,
            'category': 'Concentrates',
            'strain_type': 'Hybrid',
            'thc_content': '89.5%',
            'cbd_content': '0.1%',
            'effects': 'Euphoric, Relaxing, Creative',
            'flavors': 'Sweet, Earthy, Mint',
            'stock': 28,
            'sku': 'CO-GSCC-018',
            'image_url': '/images/gsc-cartridge.jpg',
            'weight': '0.5g',
            'lab_tested': True,
            'organic': False
        },
        {
            'name': 'Sour Diesel Cartridge',
            'description': 'Energizing Sour Diesel cartridge with authentic strain flavors. Perfect for daytime use.',
            'price': 42.00,
            'category': 'Concentrates',
            'strain_type': 'Sativa',
            'thc_content': '86.7%',
            'cbd_content': '0.2%',
            'effects': 'Energetic, Creative, Uplifting',
            'flavors': 'Diesel, Citrus, Pungent',
            'stock': 32,
            'sku': 'CO-SDC-019',
            'image_url': '/images/sour-diesel-cartridge.jpg',
            'weight': '0.5g',
            'lab_tested': True,
            'organic': False
        },
        
        # ACCESSORIES - SMOKING
        {
            'name': 'Glass Spoon Pipe',
            'description': 'Hand-blown borosilicate glass pipe with unique color patterns. Smooth smoking experience.',
            'price': 25.00,
            'category': 'Accessories',
            'strain_type': None,
            'thc_content': None,
            'cbd_content': None,
            'effects': None,
            'flavors': None,
            'stock': 20,
            'sku': 'AC-GSP-020',
            'image_url': '/images/glass-spoon-pipe.jpg',
            'weight': '4 inches',
            'lab_tested': False,
            'organic': False
        },
        {
            'name': 'Premium Grinder',
            'description': 'Aircraft-grade aluminum grinder with sharp teeth and pollen catcher. 4-piece design.',
            'price': 35.00,
            'category': 'Accessories',
            'strain_type': None,
            'thc_content': None,
            'cbd_content': None,
            'effects': None,
            'flavors': None,
            'stock': 25,
            'sku': 'AC-PG-021',
            'image_url': '/images/premium-grinder.jpg',
            'weight': '2.5 inches',
            'lab_tested': False,
            'organic': False
        },
        {
            'name': 'Rolling Papers Pack',
            'description': 'Premium hemp rolling papers with natural gum. Slow-burning and smooth.',
            'price': 8.00,
            'category': 'Accessories',
            'strain_type': None,
            'thc_content': None,
            'cbd_content': None,
            'effects': None,
            'flavors': None,
            'stock': 50,
            'sku': 'AC-RPP-022',
            'image_url': '/images/rolling-papers.jpg',
            'weight': '32 papers',
            'lab_tested': False,
            'organic': True
        },
        
        # ACCESSORIES - STORAGE
        {
            'name': 'Airtight Storage Container',
            'description': 'UV-resistant glass container with airtight seal. Keeps cannabis fresh and potent.',
            'price': 22.00,
            'category': 'Accessories',
            'strain_type': None,
            'thc_content': None,
            'cbd_content': None,
            'effects': None,
            'flavors': None,
            'stock': 30,
            'sku': 'AC-ASC-023',
            'image_url': '/images/storage-container.jpg',
            'weight': '1 oz capacity',
            'lab_tested': False,
            'organic': False
        },
        {
            'name': 'Smell-Proof Bag',
            'description': 'Carbon-lined smell-proof bag with combination lock. Discreet and secure storage.',
            'price': 28.00,
            'category': 'Accessories',
            'strain_type': None,
            'thc_content': None,
            'cbd_content': None,
            'effects': None,
            'flavors': None,
            'stock': 18,
            'sku': 'AC-SPB-024',
            'image_url': '/images/smell-proof-bag.jpg',
            'weight': '8x6 inches',
            'lab_tested': False,
            'organic': False
        }
    ]
    
    # Create products
    for product_data in products:
        product = Product(
            id=str(uuid.uuid4()),
            name=product_data['name'],
            description=product_data['description'],
            price=product_data['price'],
            product_category=product_data['category'],
            strain_type=product_data.get('strain_type'),
            thc_content=product_data.get('thc_content'),
            cbd_content=product_data.get('cbd_content'),
            effects=product_data.get('effects'),
            flavors=product_data.get('flavors'),
            stock=product_data['stock'],
            sku=product_data['sku'],
            image_url=product_data['image_url'],
            weight=product_data['weight'],
            lab_tested=product_data['lab_tested'],
            organic=product_data['organic']
        )
        db.session.add(product)
    
    db.session.commit()
    print(f"Created {len(products)} comprehensive cannabis products!")

if __name__ == '__main__':
    import sys
    import os
    sys.path.append(os.path.dirname(os.path.abspath(__file__)))
    
    from main import app, db
    with app.app_context():
        db.create_all()
        create_comprehensive_products()

