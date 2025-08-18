import React, { useState, useEffect } from 'react';

const PointOfSaleModule = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Mock POS data
  const [products, setProducts] = useState([
    {
      id: 'SKU-001',
      name: 'Premium OG Kush',
      category: 'Flower',
      price: 35.00,
      stock: 250,
      image: '/api/placeholder/80/80',
      barcode: '123456789001',
      thc: 22.5,
      strain: 'Indica'
    },
    {
      id: 'SKU-002',
      name: 'Blue Dream',
      category: 'Flower',
      price: 32.00,
      stock: 90,
      image: '/api/placeholder/80/80',
      barcode: '123456789002',
      thc: 21.3,
      strain: 'Sativa'
    },
    {
      id: 'SKU-003',
      name: 'Mixed Berry Gummies',
      category: 'Edibles',
      price: 25.00,
      stock: 880,
      image: '/api/placeholder/80/80',
      barcode: '123456789003',
      thc: 10.0,
      strain: 'N/A'
    },
    {
      id: 'SKU-004',
      name: 'OG Kush Shatter',
      category: 'Concentrates',
      price: 65.00,
      stock: 48,
      image: '/api/placeholder/80/80',
      barcode: '123456789004',
      thc: 87.3,
      strain: 'Indica'
    },
    {
      id: 'SKU-005',
      name: 'Glass Spoon Pipe',
      category: 'Accessories',
      price: 15.00,
      stock: 180,
      image: '/api/placeholder/80/80',
      barcode: '123456789005',
      thc: 0.0,
      strain: 'N/A'
    },
    {
      id: 'SKU-006',
      name: 'Pre-Roll 3-Pack',
      category: 'Flower',
      price: 18.00,
      stock: 120,
      image: '/api/placeholder/80/80',
      barcode: '123456789006',
      thc: 20.5,
      strain: 'Hybrid'
    }
  ]);

  const [customers, setCustomers] = useState([
    {
      id: 'CUST-001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      loyaltyPoints: 150,
      totalSpent: 1250.00,
      visits: 12
    },
    {
      id: 'CUST-002',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 234-5678',
      loyaltyPoints: 89,
      totalSpent: 890.00,
      visits: 8
    },
    {
      id: 'CUST-003',
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: '(555) 345-6789',
      loyaltyPoints: 245,
      totalSpent: 2450.00,
      visits: 18
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-2024-001',
      customer: 'John Doe',
      items: [
        { product: 'Premium OG Kush', quantity: 2, price: 35.00, total: 70.00 },
        { product: 'Mixed Berry Gummies', quantity: 1, price: 25.00, total: 25.00 }
      ],
      subtotal: 95.00,
      tax: 7.60,
      total: 102.60,
      paymentMethod: 'Credit Card',
      timestamp: '2024-08-15 14:30:25',
      cashier: 'Sarah Johnson',
      status: 'Completed'
    },
    {
      id: 'TXN-2024-002',
      customer: 'Walk-in Customer',
      items: [
        { product: 'Glass Spoon Pipe', quantity: 1, price: 15.00, total: 15.00 }
      ],
      subtotal: 15.00,
      tax: 1.20,
      total: 16.20,
      paymentMethod: 'Cash',
      timestamp: '2024-08-15 15:15:10',
      cashier: 'Mike Chen',
      status: 'Completed'
    },
    {
      id: 'TXN-2024-003',
      customer: 'Sarah Johnson',
      items: [
        { product: 'OG Kush Shatter', quantity: 1, price: 65.00, total: 65.00 },
        { product: 'Pre-Roll 3-Pack', quantity: 2, price: 18.00, total: 36.00 }
      ],
      subtotal: 101.00,
      tax: 8.08,
      total: 109.08,
      paymentMethod: 'Debit Card',
      timestamp: '2024-08-15 16:45:33',
      cashier: 'Sarah Johnson',
      status: 'Completed'
    }
  ]);

  const [dailyStats, setDailyStats] = useState({
    totalSales: 1247.88,
    totalTransactions: 23,
    averageTicket: 54.26,
    cashSales: 456.20,
    cardSales: 791.68,
    topProduct: 'Premium OG Kush',
    topCategory: 'Flower'
  });

  // Filter functions
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Cart functions
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1, total: product.price }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity, total: newQuantity * item.price }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
    setCustomer(null);
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const processTransaction = () => {
    if (cart.length === 0) return;

    const newTransaction = {
      id: `TXN-2024-${String(transactions.length + 1).padStart(3, '0')}`,
      customer: customer ? customer.name : 'Walk-in Customer',
      items: cart.map(item => ({
        product: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.total
      })),
      subtotal: subtotal,
      tax: tax,
      total: total,
      paymentMethod: paymentMethod === 'cash' ? 'Cash' : paymentMethod === 'credit' ? 'Credit Card' : 'Debit Card',
      timestamp: new Date().toLocaleString(),
      cashier: 'Current User',
      status: 'Completed'
    };

    setTransactions([newTransaction, ...transactions]);
    clearCart();
    alert('Transaction completed successfully!');
  };

  const renderPOS = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-screen">
      {/* Products Section */}
      <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products or scan barcode..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Flower">Flower</option>
              <option value="Edibles">Edibles</option>
              <option value="Concentrates">Concentrates</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <div className="w-full h-20 bg-gray-200 rounded-lg mb-3"></div>
              <h3 className="font-medium text-sm text-gray-900 mb-1">{product.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{product.category}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                <span className="text-xs text-gray-500">Stock: {product.stock}</span>
              </div>
              {product.thc > 0 && (
                <p className="text-xs text-purple-600 mt-1">THC: {product.thc}%</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Current Sale</h3>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear All
          </button>
        </div>

        {/* Customer Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={customer?.id || ''}
            onChange={(e) => {
              const selectedCustomer = customers.find(c => c.id === e.target.value);
              setCustomer(selectedCustomer || null);
            }}
          >
            <option value="">Walk-in Customer</option>
            {customers.map((cust) => (
              <option key={cust.id} value={cust.id}>{cust.name}</option>
            ))}
          </select>
        </div>

        {/* Cart Items */}
        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium text-sm text-gray-900">{item.name}</h4>
                <p className="text-xs text-gray-600">${item.price} each</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-6 h-6 bg-gray-200 rounded text-xs hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-6 h-6 bg-gray-200 rounded text-xs hover:bg-gray-300"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-6 h-6 bg-red-200 text-red-600 rounded text-xs hover:bg-red-300"
                >
                  ×
                </button>
              </div>
              <div className="text-sm font-medium text-gray-900 ml-3">
                ${item.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax (8%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
            <option value="debit">Debit Card</option>
          </select>
        </div>

        {/* Process Transaction */}
        <button
          onClick={processTransaction}
          disabled={cart.length === 0}
          className={`w-full mt-4 py-3 rounded-lg font-medium ${
            cart.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          Process Sale (${total.toFixed(2)})
        </button>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      {/* Daily Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Sales</p>
              <p className="text-2xl font-bold text-gray-900">${dailyStats.totalSales.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-2xl font-bold text-gray-900">{dailyStats.totalTransactions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Ticket</p>
              <p className="text-2xl font-bold text-gray-900">${dailyStats.averageTicket}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top Product</p>
              <p className="text-lg font-bold text-gray-900">{dailyStats.topProduct}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.items.length} items</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${transaction.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.paymentMethod}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Receipt</button>
                    <button className="text-gray-600 hover:text-gray-900">Refund</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Customer
            </button>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Email: {customer.email}</p>
                <p className="text-sm text-gray-600">Phone: {customer.phone}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">Total Spent</p>
                  <p className="text-lg font-bold text-green-600">${customer.totalSpent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Visits</p>
                  <p className="text-lg font-bold text-blue-600">{customer.visits}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-900">Loyalty Points</p>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${Math.min((customer.loyaltyPoints / 500) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{customer.loyaltyPoints} pts</span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View History
                </button>
                <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
          <p className="mt-2 text-gray-600">Process sales, manage transactions, and track customer data</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'pos', name: 'POS Terminal', icon: '🛒' },
              { id: 'transactions', name: 'Transactions', icon: '📊' },
              { id: 'customers', name: 'Customers', icon: '👥' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'pos' && renderPOS()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'customers' && renderCustomers()}
      </div>
    </div>
  );
};

export default PointOfSaleModule;

