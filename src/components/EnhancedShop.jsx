import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

// Mock product data based on research
const mockProducts = [
  // FLOWER PRODUCTS
  {
    id: 'prod-001',
    name: 'Blue Dream',
    category: 'Flower',
    price: 45.00,
    originalPrice: 50.00,
    description: 'A balanced hybrid with sweet berry aroma and euphoric effects. Perfect for daytime use with creative and uplifting properties.',
    thc: '18-24%',
    cbd: '<1%',
    strain: 'Hybrid',
    effects: ['Euphoric', 'Creative', 'Uplifting', 'Relaxed'],
    flavors: ['Berry', 'Sweet', 'Herbal'],
    stock: 125,
    status: 'active',
    sku: 'BD-001',
    image: '/api/placeholder/400/300',
    rating: 4.8,
    reviews: 234,
    weight: '3.5g (1/8 oz)',
    lab_tested: true,
    organic: true
  },
  {
    id: 'prod-002',
    name: 'OG Kush',
    category: 'Flower',
    price: 48.00,
    description: 'Classic indica-dominant strain with earthy pine flavors and deeply relaxing effects. Ideal for evening use and stress relief.',
    thc: '20-25%',
    cbd: '<1%',
    strain: 'Indica',
    effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric'],
    flavors: ['Earthy', 'Pine', 'Woody'],
    stock: 89,
    status: 'active',
    sku: 'OG-002',
    image: '/api/placeholder/400/300',
    rating: 4.6,
    reviews: 189,
    weight: '3.5g (1/8 oz)',
    lab_tested: true,
    organic: false
  },
  {
    id: 'prod-003',
    name: 'Sour Diesel',
    category: 'Flower',
    price: 42.00,
    description: 'Energizing sativa with distinctive diesel aroma. Provides mental clarity and creative focus for productive days.',
    thc: '19-25%',
    cbd: '<1%',
    strain: 'Sativa',
    effects: ['Energetic', 'Creative', 'Focused', 'Uplifted'],
    flavors: ['Diesel', 'Citrus', 'Pungent'],
    stock: 67,
    status: 'active',
    sku: 'SD-003',
    image: '/api/placeholder/400/300',
    rating: 4.7,
    reviews: 156,
    weight: '3.5g (1/8 oz)',
    lab_tested: true,
    organic: true
  },
  
  // CONCENTRATES
  {
    id: 'prod-004',
    name: 'Live Resin Cart - Gelato',
    category: 'Concentrates',
    price: 55.00,
    description: 'Premium live resin cartridge preserving fresh terpenes. Smooth vapor with sweet dessert flavors and balanced effects.',
    thc: '85-90%',
    cbd: '<1%',
    strain: 'Hybrid',
    effects: ['Euphoric', 'Relaxed', 'Creative', 'Happy'],
    flavors: ['Sweet', 'Vanilla', 'Berry'],
    stock: 34,
    status: 'active',
    sku: 'LR-004',
    image: '/api/placeholder/400/300',
    rating: 4.9,
    reviews: 98,
    weight: '0.5g cartridge',
    lab_tested: true,
    solventless: false
  },
  {
    id: 'prod-005',
    name: 'Rosin - Wedding Cake',
    category: 'Concentrates',
    price: 75.00,
    description: 'Solventless rosin extraction preserving full cannabinoid and terpene profile. Premium quality for connoisseurs.',
    thc: '70-80%',
    cbd: '<1%',
    strain: 'Hybrid',
    effects: ['Euphoric', 'Relaxed', 'Sleepy', 'Happy'],
    flavors: ['Vanilla', 'Sweet', 'Earthy'],
    stock: 12,
    status: 'active',
    sku: 'RS-005',
    image: '/api/placeholder/400/300',
    rating: 4.9,
    reviews: 67,
    weight: '1g',
    lab_tested: true,
    solventless: true
  },
  
  // EDIBLES
  {
    id: 'prod-006',
    name: 'Mixed Berry Gummies',
    category: 'Edibles',
    price: 22.00,
    description: 'Delicious fruit gummies with precise 10mg THC dosing. Made with real fruit flavors and natural ingredients.',
    thc: '100mg total',
    cbd: '0mg',
    strain: 'Hybrid',
    effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy'],
    flavors: ['Berry', 'Strawberry', 'Raspberry'],
    stock: 156,
    status: 'active',
    sku: 'GU-006',
    image: '/api/placeholder/400/300',
    rating: 4.5,
    reviews: 312,
    weight: '10 pieces (10mg each)',
    lab_tested: true,
    vegan: true
  },
  {
    id: 'prod-007',
    name: 'Dark Chocolate Bar',
    category: 'Edibles',
    price: 28.00,
    description: 'Premium Belgian dark chocolate infused with high-quality cannabis extract. Rich cocoa flavor with smooth effects.',
    thc: '100mg total',
    cbd: '0mg',
    strain: 'Indica',
    effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric'],
    flavors: ['Chocolate', 'Cocoa', 'Rich'],
    stock: 78,
    status: 'active',
    sku: 'CH-007',
    image: '/api/placeholder/400/300',
    rating: 4.7,
    reviews: 189,
    weight: '10 squares (10mg each)',
    lab_tested: true,
    vegan: false
  },
  
  // WELLNESS/CBD
  {
    id: 'prod-008',
    name: 'CBD Tincture 1000mg',
    category: 'Wellness',
    price: 55.00,
    description: 'Full-spectrum CBD tincture for daily wellness. Supports relaxation, sleep, and overall well-being without psychoactive effects.',
    thc: '<0.3%',
    cbd: '1000mg',
    strain: 'Hemp',
    effects: ['Relaxed', 'Calm', 'Focused', 'Balanced'],
    flavors: ['Natural', 'Hemp', 'Earthy'],
    stock: 45,
    status: 'active',
    sku: 'CBD-008',
    image: '/api/placeholder/400/300',
    rating: 4.6,
    reviews: 145,
    weight: '30ml bottle',
    lab_tested: true,
    organic: true
  },
  
  // ACCESSORIES
  {
    id: 'prod-009',
    name: 'Premium Glass Pipe',
    category: 'Accessories',
    price: 35.00,
    description: 'Hand-blown borosilicate glass pipe with unique color patterns. Durable construction and smooth smoking experience.',
    thc: 'N/A',
    cbd: 'N/A',
    strain: 'N/A',
    effects: [],
    flavors: [],
    stock: 23,
    status: 'active',
    sku: 'GP-009',
    image: '/api/placeholder/400/300',
    rating: 4.4,
    reviews: 67,
    weight: 'Standard size',
    lab_tested: false,
    handmade: true
  },
  {
    id: 'prod-010',
    name: 'Portable Vaporizer',
    category: 'Accessories',
    price: 125.00,
    originalPrice: 150.00,
    description: 'Advanced portable vaporizer with precise temperature control. Compatible with dry herbs and concentrates.',
    thc: 'N/A',
    cbd: 'N/A',
    strain: 'N/A',
    effects: [],
    flavors: [],
    stock: 8,
    status: 'active',
    sku: 'VP-010',
    image: '/api/placeholder/400/300',
    rating: 4.8,
    reviews: 234,
    weight: 'Portable',
    lab_tested: false,
    warranty: '2 years'
  }
];

function EnhancedShop() {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    category: 'All',
    priceRange: 'All',
    strain: 'All',
    inStock: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  // Filter products based on current filters
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Price range filter
    if (filters.priceRange !== 'All') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Strain filter
    if (filters.strain !== 'All') {
      filtered = filtered.filter(product => product.strain === filters.strain);
    }

    // In stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }

    setFilteredProducts(filtered);
  }, [products, filters, searchTerm]);

  const addToCart = async (product) => {
    // Simulate API call
    try {
      setLoading(true);
      
      // Get existing cart from localStorage
      const existingCart = JSON.parse(localStorage.getItem('dankdash_cart') || '[]');
      
      // Update local cart state
      const existingItem = existingCart.find(item => item.product_id === product.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = existingCart.map(item => 
          item.product_id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...existingCart, { 
          product_id: product.id, 
          quantity: 1, 
          product,
          added_date: new Date().toISOString(),
          user_id: user ? user.id : 'guest'
        }];
      }
      
      // Save to localStorage
      localStorage.setItem('dankdash_cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
      
      alert('Added to cart!');
    } catch (err) {
      alert('Failed to add to cart: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Flower', 'Concentrates', 'Edibles', 'Wellness', 'Accessories'];
  const priceRanges = ['All', '0-25', '25-50', '50-75', '75-100', '100+'];
  const strains = ['All', 'Indica', 'Sativa', 'Hybrid', 'Hemp'];

  // Product Detail Modal
  const ProductModal = ({ product, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
              <p className="text-lg text-gray-600">{product.category} • {product.strain}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <p className="text-green-600 font-medium text-xl">{product.category}</p>
                </div>
              </div>
              
              {/* Product Badges */}
              <div className="flex flex-wrap gap-2">
                {product.lab_tested && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    Lab Tested
                  </span>
                )}
                {product.organic && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Organic
                  </span>
                )}
                {product.vegan && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    Vegan
                  </span>
                )}
                {product.solventless && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    Solventless
                  </span>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Price and Rating */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                  <p className="text-sm text-gray-500">{product.weight}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  </div>
                  <p className={`text-sm font-medium ${
                    product.stock > 10 ? 'text-green-600' : 
                    product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Cannabinoids */}
              {(product.thc !== 'N/A' || product.cbd !== 'N/A') && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cannabinoids</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.thc !== 'N/A' && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">THC</p>
                        <p className="font-semibold">{product.thc}</p>
                      </div>
                    )}
                    {product.cbd !== 'N/A' && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-500">CBD</p>
                        <p className="font-semibold">{product.cbd}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Effects */}
              {product.effects.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Effects</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.effects.map((effect, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavors */}
              {product.flavors.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Flavors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor, index) => (
                      <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0 || loading}
                className={`w-full py-4 px-6 rounded-full font-medium text-lg transition-colors ${
                  product.stock === 0 || loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {loading ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Cannabis Products
          </h1>
          <p className="text-xl text-gray-600">
            Discover our curated selection of high-quality cannabis products
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {priceRanges.map(range => (
                <option key={range} value={range}>
                  {range === 'All' ? 'All Prices' : range === '100+' ? '$100+' : `$${range}`}
                </option>
              ))}
            </select>

            <select
              value={filters.strain}
              onChange={(e) => setFilters({...filters, strain: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              {strains.map(strain => (
                <option key={strain} value={strain}>{strain}</option>
              ))}
            </select>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">In Stock Only</span>
            </label>
          </div>

          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              {/* Product Image */}
              <div 
                className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <p className="text-green-600 font-medium text-sm">{product.category}</p>
                </div>
                
                {/* Sale Badge */}
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Sale
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-yellow-400">★</span>
                    <span>{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                {/* THC/CBD Info */}
                {(product.thc !== 'N/A' || product.cbd !== 'N/A') && (
                  <div className="flex gap-2 mb-3">
                    {product.thc !== 'N/A' && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        THC: {product.thc}
                      </span>
                    )}
                    {product.cbd !== 'N/A' && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                        CBD: {product.cbd}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{product.weight}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-medium ${
                      product.stock > 10 ? 'text-green-600' : 
                      product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                    </p>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  disabled={product.stock === 0 || loading}
                  className={`w-full py-2 px-4 rounded-full font-medium text-sm transition-colors ${
                    product.stock === 0 || loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {loading ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}

export default EnhancedShop;

