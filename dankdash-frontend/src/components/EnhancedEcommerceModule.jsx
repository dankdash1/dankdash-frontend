import React, { useState, useEffect } from 'react';

const EnhancedEcommerceModule = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Enhanced product state with more realistic data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Blue Dream',
      sku: 'BD-001',
      category: 'Flower',
      price: 45.00,
      cost: 25.00,
      stock: 125,
      published: true,
      status: 'Active',
      image: '/api/placeholder/400/300',
      description: 'A balanced hybrid with sweet berry aroma and euphoric effects. Perfect for daytime use with creative and uplifting properties.',
      weight: '3.5g (1/8 oz)',
      thc: '18-24%',
      cbd: '<1%',
      strain: 'Hybrid',
      effects: ['Euphoric', 'Creative', 'Uplifting', 'Relaxed'],
      flavors: ['Berry', 'Sweet', 'Herbal'],
      created: '2024-08-01',
      lastModified: '2024-08-12',
      rating: 4.8,
      reviews: 234,
      lab_tested: true,
      organic: true
    },
    {
      id: 2,
      name: 'OG Kush',
      sku: 'OG-002',
      category: 'Flower',
      price: 48.00,
      cost: 28.00,
      stock: 89,
      published: true,
      status: 'Active',
      image: '/api/placeholder/400/300',
      description: 'Classic indica-dominant strain with earthy pine flavors and deeply relaxing effects. Ideal for evening use and stress relief.',
      weight: '3.5g (1/8 oz)',
      thc: '20-25%',
      cbd: '<1%',
      strain: 'Indica',
      effects: ['Relaxed', 'Sleepy', 'Happy', 'Euphoric'],
      flavors: ['Earthy', 'Pine', 'Woody'],
      created: '2024-08-02',
      lastModified: '2024-08-11',
      rating: 4.6,
      reviews: 189,
      lab_tested: true,
      organic: false
    },
    {
      id: 3,
      name: 'Live Resin Cart - Gelato',
      sku: 'LR-004',
      category: 'Concentrates',
      price: 55.00,
      cost: 30.00,
      stock: 34,
      published: true,
      status: 'Active',
      image: '/api/placeholder/400/300',
      description: 'Premium live resin cartridge preserving fresh terpenes. Smooth vapor with sweet dessert flavors and balanced effects.',
      weight: '0.5g cartridge',
      thc: '85-90%',
      cbd: '<1%',
      strain: 'Hybrid',
      effects: ['Euphoric', 'Relaxed', 'Creative', 'Happy'],
      flavors: ['Sweet', 'Vanilla', 'Berry'],
      created: '2024-08-03',
      lastModified: '2024-08-10',
      rating: 4.9,
      reviews: 98,
      lab_tested: true,
      solventless: false
    },
    {
      id: 4,
      name: 'Mixed Berry Gummies',
      sku: 'GU-006',
      category: 'Edibles',
      price: 22.00,
      cost: 12.00,
      stock: 156,
      published: false,
      status: 'Draft',
      image: '/api/placeholder/400/300',
      description: 'Delicious fruit gummies with precise 10mg THC dosing. Made with real fruit flavors and natural ingredients.',
      weight: '10 pieces (10mg each)',
      thc: '100mg total',
      cbd: '0mg',
      strain: 'Hybrid',
      effects: ['Relaxed', 'Happy', 'Euphoric', 'Sleepy'],
      flavors: ['Berry', 'Strawberry', 'Raspberry'],
      created: '2024-08-04',
      lastModified: '2024-08-09',
      rating: 4.5,
      reviews: 312,
      lab_tested: true,
      vegan: true
    }
  ]);

  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    category: 'Flower',
    price: '',
    cost: '',
    stock: '',
    description: '',
    weight: '',
    thc: '',
    cbd: '',
    strain: 'Hybrid',
    effects: [],
    flavors: [],
    published: false,
    lab_tested: false,
    organic: false,
    vegan: false,
    solventless: false
  });

  const categories = ['Flower', 'Concentrates', 'Edibles', 'Wellness', 'Accessories'];
  const strains = ['Indica', 'Sativa', 'Hybrid', 'Hemp'];
  const effectOptions = ['Euphoric', 'Relaxed', 'Creative', 'Happy', 'Sleepy', 'Energetic', 'Focused', 'Uplifted', 'Calm'];
  const flavorOptions = ['Berry', 'Sweet', 'Herbal', 'Earthy', 'Pine', 'Woody', 'Citrus', 'Vanilla', 'Diesel', 'Chocolate'];

  const handleProductSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...productForm, 
              id: editingProduct.id,
              lastModified: new Date().toISOString().split('T')[0],
              rating: editingProduct.rating,
              reviews: editingProduct.reviews
            }
          : p
      ));
    } else {
      // Create new product
      const newProduct = {
        ...productForm,
        id: Math.max(...products.map(p => p.id)) + 1,
        status: productForm.published ? 'Active' : 'Draft',
        created: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        rating: 0,
        reviews: 0,
        image: '/api/placeholder/400/300'
      };
      setProducts([...products, newProduct]);
    }
    
    // Reset form
    setProductForm({
      name: '',
      sku: '',
      category: 'Flower',
      price: '',
      cost: '',
      stock: '',
      description: '',
      weight: '',
      thc: '',
      cbd: '',
      strain: 'Hybrid',
      effects: [],
      flavors: [],
      published: false,
      lab_tested: false,
      organic: false,
      vegan: false,
      solventless: false
    });
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setProductForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      cost: product.cost,
      stock: product.stock,
      description: product.description,
      weight: product.weight,
      thc: product.thc,
      cbd: product.cbd,
      strain: product.strain,
      effects: product.effects || [],
      flavors: product.flavors || [],
      published: product.published,
      lab_tested: product.lab_tested || false,
      organic: product.organic || false,
      vegan: product.vegan || false,
      solventless: product.solventless || false
    });
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const togglePublishStatus = (productId) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { 
            ...p, 
            published: !p.published,
            status: !p.published ? 'Active' : 'Draft',
            lastModified: new Date().toISOString().split('T')[0]
          }
        : p
    ));
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleArrayInput = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setProductForm({ ...productForm, [field]: items });
  };

  // Product Form Component
  const ProductForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={() => {
                setShowProductForm(false);
                setEditingProduct(null);
                setProductForm({
                  name: '', sku: '', category: 'Flower', price: '', cost: '', stock: '',
                  description: '', weight: '', thc: '', cbd: '', strain: 'Hybrid',
                  effects: [], flavors: [], published: false, lab_tested: false,
                  organic: false, vegan: false, solventless: false
                });
              }}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleProductSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={productForm.cost}
                      onChange={(e) => setProductForm({ ...productForm, cost: parseFloat(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Cannabis Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Cannabis Information</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight/Size</label>
                  <input
                    type="text"
                    value={productForm.weight}
                    onChange={(e) => setProductForm({ ...productForm, weight: e.target.value })}
                    placeholder="e.g., 3.5g (1/8 oz)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Strain Type</label>
                  <select
                    value={productForm.strain}
                    onChange={(e) => setProductForm({ ...productForm, strain: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {strains.map(strain => (
                      <option key={strain} value={strain}>{strain}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">THC Content</label>
                    <input
                      type="text"
                      value={productForm.thc}
                      onChange={(e) => setProductForm({ ...productForm, thc: e.target.value })}
                      placeholder="e.g., 18-24%"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CBD Content</label>
                    <input
                      type="text"
                      value={productForm.cbd}
                      onChange={(e) => setProductForm({ ...productForm, cbd: e.target.value })}
                      placeholder="e.g., <1%"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Effects (comma-separated)</label>
                  <input
                    type="text"
                    value={productForm.effects.join(', ')}
                    onChange={(e) => handleArrayInput('effects', e.target.value)}
                    placeholder="e.g., Euphoric, Relaxed, Creative"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flavors (comma-separated)</label>
                  <input
                    type="text"
                    value={productForm.flavors.join(', ')}
                    onChange={(e) => handleArrayInput('flavors', e.target.value)}
                    placeholder="e.g., Berry, Sweet, Herbal"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={4}
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Product Attributes */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Attributes</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.published}
                    onChange={(e) => setProductForm({ ...productForm, published: e.target.checked })}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Published</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.lab_tested}
                    onChange={(e) => setProductForm({ ...productForm, lab_tested: e.target.checked })}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Lab Tested</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.organic}
                    onChange={(e) => setProductForm({ ...productForm, organic: e.target.checked })}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Organic</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.vegan}
                    onChange={(e) => setProductForm({ ...productForm, vegan: e.target.checked })}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Vegan</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={productForm.solventless}
                    onChange={(e) => setProductForm({ ...productForm, solventless: e.target.checked })}
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Solventless</span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {editingProduct ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">E-commerce Management</h1>
          <p className="text-gray-600 mt-2">Manage your online store products and inventory</p>
        </div>
        <button
          onClick={() => setShowProductForm(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-green-600">{products.filter(p => p.published).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-yellow-600">{products.filter(p => !p.published).length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                        <div className="text-xs text-gray-400">{product.weight}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">${product.price}</div>
                    <div className="text-sm text-gray-500">Cost: ${product.cost}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm font-medium ${
                      product.stock > 50 ? 'text-green-600' : 
                      product.stock > 10 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.stock} units
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.published ? 'Published' : 'Draft'}
                      </span>
                      {product.lab_tested && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Lab Tested
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => togglePublishStatus(product.id)}
                        className={`${
                          product.published ? 'text-yellow-600 hover:text-yellow-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {product.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Form Modal */}
      {showProductForm && <ProductForm />}
    </div>
  );
};

export default EnhancedEcommerceModule;

