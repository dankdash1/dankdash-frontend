import React, { useState, useEffect, useMemo } from 'react';

const EnhancedInventoryModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Form states
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    category: 'Flower',
    currentStock: 0,
    minStock: 10,
    maxStock: 100,
    unitPrice: 0,
    supplier: '',
    location: 'Warehouse A - Shelf 1',
    barcode: '',
    description: '',
    weight: '',
    thcContent: '',
    cbdContent: '',
    published: true, // Add published field
    images: [], // Add images field
    videos: [], // Add videos field
    coas: [] // Add COAs field
  });

  const [stockForm, setStockForm] = useState({
    type: 'restock',
    quantity: 0,
    reason: '',
    notes: '',
    cost: 0,
    supplier: ''
  });

  const [transferForm, setTransferForm] = useState({
    fromLocation: '',
    toLocation: '',
    quantity: 0,
    reason: '',
    notes: ''
  });

  // Mock inventory data
  const [inventoryItems, setInventoryItems] = useState([
    {
      id: 1,
      name: 'Premium OG Kush',
      sku: 'OGK-001',
      category: 'Flower',
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      unitPrice: 45.00,
      supplier: 'Green Valley Farms',
      location: 'Warehouse A - Shelf 1',
      lastRestocked: '2024-08-10',
      status: 'In Stock',
      published: true,
      barcode: '123456789012',
      description: 'Premium quality OG Kush strain',
      weight: '1g',
      thcContent: '22%',
      cbdContent: '0.5%',
      images: ['/api/placeholder/300/300'],
      videos: [],
      coas: ['/documents/ogkush-coa.pdf'],
      stockHistory: [
        { date: '2024-08-10', type: 'restock', quantity: 50, reason: 'New shipment', cost: 2000 },
        { date: '2024-08-05', type: 'sale', quantity: -5, reason: 'Customer order' }
      ]
    },
    {
      id: 2,
      name: 'Blue Dream Cartridge',
      sku: 'BDC-002',
      category: 'Concentrates',
      currentStock: 8,
      minStock: 15,
      maxStock: 50,
      unitPrice: 65.00,
      supplier: 'Pure Extracts Co.',
      location: 'Warehouse B - Shelf 3',
      lastRestocked: '2024-08-08',
      status: 'Low Stock',
      published: true,
      barcode: '123456789013',
      description: 'Blue Dream strain vape cartridge',
      weight: '1g',
      thcContent: '85%',
      cbdContent: '2%',
      images: ['/api/placeholder/300/300'],
      videos: [],
      coas: ['/documents/bluedream-coa.pdf'],
      stockHistory: [
        { date: '2024-08-08', type: 'restock', quantity: 25, reason: 'Weekly restock', cost: 1500 }
      ]
    },
    {
      id: 3,
      name: 'Chocolate Edibles 10mg',
      sku: 'CHE-003',
      category: 'Edibles',
      currentStock: 120,
      minStock: 25,
      maxStock: 200,
      unitPrice: 25.00,
      supplier: 'Sweet Cannabis Co.',
      location: 'Warehouse A - Shelf 5',
      lastRestocked: '2024-08-12',
      status: 'In Stock',
      published: true,
      barcode: '123456789014',
      description: 'Chocolate edibles with 10mg THC per piece',
      weight: '10g',
      thcContent: '10mg',
      cbdContent: '0mg',
      images: ['/api/placeholder/300/300'],
      videos: [],
      coas: ['/documents/chocolate-coa.pdf'],
      stockHistory: [
        { date: '2024-08-12', type: 'restock', quantity: 100, reason: 'Bulk order', cost: 2000 }
      ]
    },
    {
      id: 4,
      name: 'Glass Pipe Set',
      sku: 'GPS-004',
      category: 'Accessories',
      currentStock: 0,
      minStock: 5,
      maxStock: 30,
      unitPrice: 35.00,
      supplier: 'Glass Works Ltd.',
      location: 'Warehouse C - Shelf 2',
      lastRestocked: '2024-08-05',
      status: 'Out of Stock',
      published: false, // Unpublished due to out of stock
      barcode: '123456789015',
      description: 'Premium glass pipe set',
      weight: '200g',
      thcContent: 'N/A',
      cbdContent: 'N/A',
      images: ['/api/placeholder/300/300'],
      videos: [],
      coas: [],
      stockHistory: [
        { date: '2024-08-05', type: 'restock', quantity: 20, reason: 'Initial stock', cost: 600 },
        { date: '2024-08-10', type: 'sale', quantity: -20, reason: 'Sold out' }
      ]
    },
    {
      id: 5,
      name: 'Sativa Blend Pre-rolls',
      sku: 'SBP-005',
      category: 'Flower',
      currentStock: 75,
      minStock: 20,
      maxStock: 150,
      unitPrice: 15.00,
      supplier: 'Rolling Hills Farm',
      location: 'Warehouse A - Shelf 2',
      lastRestocked: '2024-08-11',
      status: 'In Stock',
      barcode: '123456789016',
      description: 'Sativa blend pre-rolled joints',
      weight: '1g',
      thcContent: '18%',
      cbdContent: '1%',
      stockHistory: [
        { date: '2024-08-11', type: 'restock', quantity: 100, reason: 'Weekly delivery', cost: 1200 }
      ]
    }
  ]);

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: 'Green Valley Farms',
      contact: 'John Smith',
      email: 'john@greenvalley.com',
      phone: '(555) 123-4567',
      address: '123 Farm Road, CA 90210',
      rating: 4.8,
      activeProducts: 12,
      lastOrder: '2024-08-10'
    },
    {
      id: 2,
      name: 'Pure Extracts Co.',
      contact: 'Sarah Johnson',
      email: 'sarah@pureextracts.com',
      phone: '(555) 987-6543',
      address: '456 Extract Ave, CA 90211',
      rating: 4.6,
      activeProducts: 8,
      lastOrder: '2024-08-08'
    },
    {
      id: 3,
      name: 'Sweet Cannabis Co.',
      contact: 'Mike Chen',
      email: 'mike@sweetcannabis.com',
      phone: '(555) 456-7890',
      address: '789 Edible St, CA 90212',
      rating: 4.9,
      activeProducts: 15,
      lastOrder: '2024-08-12'
    }
  ]);

  const [locations, setLocations] = useState([
    'Warehouse A - Shelf 1',
    'Warehouse A - Shelf 2',
    'Warehouse A - Shelf 3',
    'Warehouse A - Shelf 4',
    'Warehouse A - Shelf 5',
    'Warehouse B - Shelf 1',
    'Warehouse B - Shelf 2',
    'Warehouse B - Shelf 3',
    'Warehouse C - Shelf 1',
    'Warehouse C - Shelf 2'
  ]);

  // Sync inventory with localStorage for shop integration
  useEffect(() => {
    localStorage.setItem('dankdash_inventory_products', JSON.stringify(inventoryItems));
  }, [inventoryItems]);

  // Filter functions
  const filteredInventory = useMemo(() => {
    return inventoryItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesLocation = selectedLocation === 'all' || item.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [inventoryItems, searchTerm, selectedCategory, selectedLocation]);

  // CRUD Operations
  const handleAddProduct = () => {
    if (!productForm.name || !productForm.sku) {
      alert('Please fill in required fields (Name and SKU)');
      return;
    }

    // Check for duplicate SKU
    if (inventoryItems.some(item => item.sku === productForm.sku)) {
      alert('SKU already exists. Please use a unique SKU.');
      return;
    }

    const newProduct = {
      id: Math.max(...inventoryItems.map(i => i.id), 0) + 1,
      ...productForm,
      unitPrice: parseFloat(productForm.unitPrice) || 0,
      currentStock: parseInt(productForm.currentStock) || 0,
      minStock: parseInt(productForm.minStock) || 0,
      maxStock: parseInt(productForm.maxStock) || 0,
      lastRestocked: new Date().toISOString().split('T')[0],
      status: parseInt(productForm.currentStock) > 0 ? 'In Stock' : 'Out of Stock',
      stockHistory: []
    };

    setInventoryItems([...inventoryItems, newProduct]);
    setProductForm({
      name: '',
      sku: '',
      category: 'Flower',
      currentStock: 0,
      minStock: 10,
      maxStock: 100,
      unitPrice: 0,
      supplier: '',
      location: 'Warehouse A - Shelf 1',
      barcode: '',
      description: '',
      weight: '',
      thcContent: '',
      cbdContent: ''
    });
    setShowAddProductModal(false);
    alert('Product added successfully!');
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      currentStock: product.currentStock,
      minStock: product.minStock,
      maxStock: product.maxStock,
      unitPrice: product.unitPrice,
      supplier: product.supplier,
      location: product.location,
      barcode: product.barcode,
      description: product.description || '',
      weight: product.weight || '',
      thcContent: product.thcContent || '',
      cbdContent: product.cbdContent || ''
    });
    setShowAddProductModal(true);
  };

  const handleUpdateProduct = () => {
    if (!productForm.name || !productForm.sku) {
      alert('Please fill in required fields (Name and SKU)');
      return;
    }

    // Check for duplicate SKU (excluding current product)
    if (inventoryItems.some(item => item.sku === productForm.sku && item.id !== editingProduct.id)) {
      alert('SKU already exists. Please use a unique SKU.');
      return;
    }

    const updatedItems = inventoryItems.map(item =>
      item.id === editingProduct.id
        ? {
            ...item,
            ...productForm,
            unitPrice: parseFloat(productForm.unitPrice) || 0,
            currentStock: parseInt(productForm.currentStock) || 0,
            minStock: parseInt(productForm.minStock) || 0,
            maxStock: parseInt(productForm.maxStock) || 0,
            status: parseInt(productForm.currentStock) > 0 ? 
              (parseInt(productForm.currentStock) <= parseInt(productForm.minStock) ? 'Low Stock' : 'In Stock') : 
              'Out of Stock'
          }
        : item
    );

    setInventoryItems(updatedItems);
    setEditingProduct(null);
    setProductForm({
      name: '',
      sku: '',
      category: 'Flower',
      currentStock: 0,
      minStock: 10,
      maxStock: 100,
      unitPrice: 0,
      supplier: '',
      location: 'Warehouse A - Shelf 1',
      barcode: '',
      description: '',
      weight: '',
      thcContent: '',
      cbdContent: ''
    });
    setShowAddProductModal(false);
    alert('Product updated successfully!');
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setInventoryItems(inventoryItems.filter(item => item.id !== productId));
      alert('Product deleted successfully!');
    }
  };

  const handleStockUpdate = () => {
    if (!stockForm.quantity || stockForm.quantity === 0) {
      alert('Please enter a valid quantity');
      return;
    }

    const updatedItems = inventoryItems.map(item => {
      if (item.id === selectedProduct.id) {
        const newStock = stockForm.type === 'restock' ? 
          item.currentStock + parseInt(stockForm.quantity) :
          Math.max(0, item.currentStock - parseInt(stockForm.quantity));
        
        const newStatus = newStock === 0 ? 'Out of Stock' : 
          (newStock <= item.minStock ? 'Low Stock' : 'In Stock');

        const stockEntry = {
          date: new Date().toISOString().split('T')[0],
          type: stockForm.type,
          quantity: stockForm.type === 'restock' ? parseInt(stockForm.quantity) : -parseInt(stockForm.quantity),
          reason: stockForm.reason,
          cost: stockForm.type === 'restock' ? parseFloat(stockForm.cost) || 0 : 0,
          supplier: stockForm.supplier || item.supplier,
          notes: stockForm.notes
        };

        return {
          ...item,
          currentStock: newStock,
          status: newStatus,
          lastRestocked: stockForm.type === 'restock' ? new Date().toISOString().split('T')[0] : item.lastRestocked,
          stockHistory: [...(item.stockHistory || []), stockEntry]
        };
      }
      return item;
    });

    setInventoryItems(updatedItems);
    setStockForm({
      type: 'restock',
      quantity: 0,
      reason: '',
      notes: '',
      cost: 0,
      supplier: ''
    });
    setShowStockModal(false);
    setSelectedProduct(null);
    alert('Stock updated successfully!');
  };

  const handleTransfer = () => {
    if (!transferForm.quantity || transferForm.quantity === 0) {
      alert('Please enter a valid quantity');
      return;
    }

    if (transferForm.quantity > selectedProduct.currentStock) {
      alert('Transfer quantity cannot exceed current stock');
      return;
    }

    if (transferForm.fromLocation === transferForm.toLocation) {
      alert('From and To locations must be different');
      return;
    }

    const updatedItems = inventoryItems.map(item => {
      if (item.id === selectedProduct.id) {
        const transferEntry = {
          date: new Date().toISOString().split('T')[0],
          type: 'transfer',
          quantity: -parseInt(transferForm.quantity),
          reason: `Transfer to ${transferForm.toLocation}`,
          notes: transferForm.notes
        };

        return {
          ...item,
          location: transferForm.toLocation,
          stockHistory: [...(item.stockHistory || []), transferEntry]
        };
      }
      return item;
    });

    setInventoryItems(updatedItems);
    setTransferForm({
      fromLocation: '',
      toLocation: '',
      quantity: 0,
      reason: '',
      notes: ''
    });
    setShowTransferModal(false);
    setSelectedProduct(null);
    alert('Product transferred successfully!');
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateSKU = () => {
    const prefix = productForm.category.substring(0, 3).toUpperCase();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${random}`;
  };

  // Dashboard calculations
  const totalProducts = inventoryItems.length;
  const inStockProducts = inventoryItems.filter(item => item.status === 'In Stock').length;
  const lowStockProducts = inventoryItems.filter(item => item.status === 'Low Stock').length;
  const outOfStockProducts = inventoryItems.filter(item => item.status === 'Out of Stock').length;
  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              <p className="text-sm text-blue-600">{inStockProducts} in stock</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
              <p className="text-sm text-green-600">Current stock value</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockProducts}</p>
              <p className="text-sm text-yellow-600">Requires attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900">{outOfStockProducts}</p>
              <p className="text-sm text-red-600">Needs restocking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stock Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Stock Status Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{inStockProducts}</div>
              <div className="text-sm text-gray-600">In Stock</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(inStockProducts / totalProducts) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{lowStockProducts}</div>
              <div className="text-sm text-gray-600">Low Stock</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full" 
                  style={{ width: `${(lowStockProducts / totalProducts) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{outOfStockProducts}</div>
              <div className="text-sm text-gray-600">Out of Stock</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-red-600 h-2 rounded-full" 
                  style={{ width: `${(outOfStockProducts / totalProducts) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Inventory Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Chocolate Edibles 10mg</span> restocked with 100 units
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Blue Dream Cartridge</span> is now low stock (8 units)
              </p>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Glass Pipe Set</span> is out of stock
              </p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="Flower">Flower</option>
          <option value="Concentrates">Concentrates</option>
          <option value="Edibles">Edibles</option>
          <option value="Accessories">Accessories</option>
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
        <button 
          onClick={() => setShowAddProductModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.supplier}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.currentStock}</div>
                  <div className="text-sm text-gray-500">Min: {item.minStock}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${item.unitPrice.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing product: ${item.name}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditProduct(item)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProduct(item);
                      setStockForm({
                        type: 'restock',
                        quantity: 0,
                        reason: '',
                        notes: '',
                        cost: 0,
                        supplier: item.supplier
                      });
                      setShowStockModal(true);
                    }}
                    className="text-purple-600 hover:text-purple-900 mr-3"
                  >
                    Stock
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProduct(item);
                      setTransferForm({
                        fromLocation: item.location,
                        toLocation: '',
                        quantity: 0,
                        reason: '',
                        notes: ''
                      });
                      setShowTransferModal(true);
                    }}
                    className="text-orange-600 hover:text-orange-900 mr-3"
                  >
                    Transfer
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(item.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Product Modal
  const ProductModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name *</label>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SKU *</label>
              <div className="flex">
                <input
                  type="text"
                  value={productForm.sku}
                  onChange={(e) => setProductForm({...productForm, sku: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setProductForm({...productForm, sku: generateSKU()})}
                  className="mt-1 px-3 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md text-sm hover:bg-gray-300"
                >
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={productForm.category}
                onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Flower">Flower</option>
                <option value="Concentrates">Concentrates</option>
                <option value="Edibles">Edibles</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Supplier</label>
              <select
                value={productForm.supplier}
                onChange={(e) => setProductForm({...productForm, supplier: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Stock</label>
              <input
                type="number"
                value={productForm.currentStock}
                onChange={(e) => setProductForm({...productForm, currentStock: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={productForm.unitPrice}
                onChange={(e) => setProductForm({...productForm, unitPrice: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min Stock Level</label>
              <input
                type="number"
                value={productForm.minStock}
                onChange={(e) => setProductForm({...productForm, minStock: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Stock Level</label>
              <input
                type="number"
                value={productForm.maxStock}
                onChange={(e) => setProductForm({...productForm, maxStock: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                value={productForm.location}
                onChange={(e) => setProductForm({...productForm, location: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Barcode</label>
              <input
                type="text"
                value={productForm.barcode}
                onChange={(e) => setProductForm({...productForm, barcode: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <input
                type="text"
                value={productForm.weight}
                onChange={(e) => setProductForm({...productForm, weight: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">THC Content</label>
              <input
                type="text"
                value={productForm.thcContent}
                onChange={(e) => setProductForm({...productForm, thcContent: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={productForm.description}
              onChange={(e) => setProductForm({...productForm, description: e.target.value})}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* PUBLISH/UNPUBLISH TOGGLE */}
          <div className="mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                checked={productForm.published}
                onChange={(e) => setProductForm({...productForm, published: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm font-medium text-gray-700">
                Publish to Website
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {productForm.published ? 'Product will be visible to customers on the website' : 'Product will be hidden from customers (admin only)'}
            </p>
          </div>

          {/* MEDIA UPLOAD SECTION */}
          <div className="mb-6 space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Media & Documents</h4>
            
            {/* Product Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-2">
                    <button type="button" className="text-blue-600 hover:text-blue-500">
                      Upload images
                    </button>
                    <span className="text-gray-500"> or </span>
                    <button type="button" className="text-blue-600 hover:text-blue-500">
                      take photo
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

            {/* Product Videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Videos</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div className="mt-2">
                    <button type="button" className="text-blue-600 hover:text-blue-500">
                      Upload video
                    </button>
                    <span className="text-gray-500"> or </span>
                    <button type="button" className="text-blue-600 hover:text-blue-500">
                      record video
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">MP4, MOV up to 100MB</p>
                </div>
              </div>
            </div>

            {/* COA Documents */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Certificate of Analysis (COA)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="mt-2">
                    <button type="button" className="text-blue-600 hover:text-blue-500">
                      Upload COA
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">PDF documents only</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowAddProductModal(false);
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  sku: '',
                  category: 'Flower',
                  currentStock: 0,
                  minStock: 10,
                  maxStock: 100,
                  unitPrice: 0,
                  supplier: '',
                  location: 'Warehouse A - Shelf 1',
                  barcode: '',
                  description: '',
                  weight: '',
                  thcContent: '',
                  cbdContent: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Stock Modal
  const StockModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Update Stock - {selectedProduct?.name}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Action Type</label>
              <select
                value={stockForm.type}
                onChange={(e) => setStockForm({...stockForm, type: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="restock">Restock (Add)</option>
                <option value="adjustment">Adjustment (Remove)</option>
                <option value="sale">Sale (Remove)</option>
                <option value="damage">Damage (Remove)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity *</label>
              <input
                type="number"
                value={stockForm.quantity}
                onChange={(e) => setStockForm({...stockForm, quantity: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Current stock: {selectedProduct?.currentStock}
              </p>
            </div>
            {stockForm.type === 'restock' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cost ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={stockForm.cost}
                    onChange={(e) => setStockForm({...stockForm, cost: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Supplier</label>
                  <select
                    value={stockForm.supplier}
                    onChange={(e) => setStockForm({...stockForm, supplier: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map(supplier => (
                      <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <input
                type="text"
                value={stockForm.reason}
                onChange={(e) => setStockForm({...stockForm, reason: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Weekly restock, Customer order, Damaged goods"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={stockForm.notes}
                onChange={(e) => setStockForm({...stockForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowStockModal(false);
                setSelectedProduct(null);
                setStockForm({
                  type: 'restock',
                  quantity: 0,
                  reason: '',
                  notes: '',
                  cost: 0,
                  supplier: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleStockUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Stock
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Transfer Modal
  const TransferModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Transfer Product - {selectedProduct?.name}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">From Location</label>
              <input
                type="text"
                value={transferForm.fromLocation}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">To Location *</label>
              <select
                value={transferForm.toLocation}
                onChange={(e) => setTransferForm({...transferForm, toLocation: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Location</option>
                {locations.filter(loc => loc !== transferForm.fromLocation).map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity *</label>
              <input
                type="number"
                value={transferForm.quantity}
                onChange={(e) => setTransferForm({...transferForm, quantity: e.target.value})}
                max={selectedProduct?.currentStock}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Available: {selectedProduct?.currentStock}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <input
                type="text"
                value={transferForm.reason}
                onChange={(e) => setTransferForm({...transferForm, reason: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Reorganization, Customer pickup"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={transferForm.notes}
                onChange={(e) => setTransferForm({...transferForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowTransferModal(false);
                setSelectedProduct(null);
                setTransferForm({
                  fromLocation: '',
                  toLocation: '',
                  quantity: 0,
                  reason: '',
                  notes: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleTransfer}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Transfer Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
        <p className="mt-2 text-gray-600">Manage your product inventory, stock levels, and warehouse operations</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'products', name: 'Products', icon: '📦' },
            { id: 'suppliers', name: 'Suppliers', icon: '🏭' },
            { id: 'reports', name: 'Reports', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'products' && renderProducts()}
      {activeTab === 'suppliers' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Supplier Management</h3>
          <p className="text-gray-600">Supplier management coming soon...</p>
        </div>
      )}
      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Inventory Reports</h3>
          <p className="text-gray-600">Advanced reporting coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showAddProductModal && <ProductModal />}
      {showStockModal && <StockModal />}
      {showTransferModal && <TransferModal />}
    </div>
  );
};

export default EnhancedInventoryModule;

