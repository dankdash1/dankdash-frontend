import React, { useState, useEffect, useMemo } from 'react';

const EnhancedPointOfSaleModule = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState('percentage');
  const [tax, setTax] = useState(8.75); // Default tax rate
  const [cashReceived, setCashReceived] = useState(0);

  // Form states
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    idNumber: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    method: 'cash',
    amount: 0,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cashReceived: 0,
    reference: ''
  });

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
      strain: 'Indica',
      weight: '3.5g'
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
      strain: 'Sativa',
      weight: '3.5g'
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
      strain: 'N/A',
      weight: '100mg'
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
      strain: 'Indica',
      weight: '1g'
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
      strain: 'N/A',
      weight: 'N/A'
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
      strain: 'Hybrid',
      weight: '3g'
    },
    {
      id: 'SKU-007',
      name: 'CBD Tincture',
      category: 'Wellness',
      price: 45.00,
      stock: 75,
      image: '/api/placeholder/80/80',
      barcode: '123456789007',
      thc: 0.3,
      strain: 'N/A',
      weight: '30ml'
    },
    {
      id: 'SKU-008',
      name: 'Vape Cartridge - Gelato',
      category: 'Concentrates',
      price: 55.00,
      stock: 95,
      image: '/api/placeholder/80/80',
      barcode: '123456789008',
      thc: 85.2,
      strain: 'Hybrid',
      weight: '1g'
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
      visits: 12,
      dateOfBirth: '1985-06-15',
      address: '123 Main St, CA 90210',
      idNumber: 'DL123456789'
    },
    {
      id: 'CUST-002',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      phone: '(555) 234-5678',
      loyaltyPoints: 89,
      totalSpent: 890.00,
      visits: 8,
      dateOfBirth: '1990-03-22',
      address: '456 Oak Ave, CA 90211',
      idNumber: 'DL987654321'
    },
    {
      id: 'CUST-003',
      name: 'Mike Chen',
      email: 'mike@example.com',
      phone: '(555) 345-6789',
      loyaltyPoints: 245,
      totalSpent: 2450.00,
      visits: 18,
      dateOfBirth: '1988-11-08',
      address: '789 Pine St, CA 90212',
      idNumber: 'DL456789123'
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-001',
      date: '2024-08-13',
      time: '14:30',
      customer: 'John Doe',
      items: 3,
      subtotal: 85.00,
      tax: 7.44,
      total: 92.44,
      paymentMethod: 'Credit Card',
      status: 'Completed',
      cashier: 'Admin User'
    },
    {
      id: 'TXN-002',
      date: '2024-08-13',
      time: '15:15',
      customer: 'Walk-in Customer',
      items: 1,
      subtotal: 35.00,
      tax: 3.06,
      total: 38.06,
      paymentMethod: 'Cash',
      status: 'Completed',
      cashier: 'Admin User'
    },
    {
      id: 'TXN-003',
      date: '2024-08-13',
      time: '16:45',
      customer: 'Sarah Johnson',
      items: 2,
      subtotal: 80.00,
      tax: 7.00,
      total: 87.00,
      paymentMethod: 'Debit Card',
      status: 'Completed',
      cashier: 'Admin User'
    }
  ]);

  // Filter functions
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.barcode.includes(searchTerm);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory && product.stock > 0;
    });
  }, [products, searchTerm, selectedCategory]);

  // Cart calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = discountType === 'percentage' ? 
    (subtotal * discount / 100) : 
    Math.min(discount, subtotal);
  const discountedSubtotal = subtotal - discountAmount;
  const taxAmount = discountedSubtotal * (tax / 100);
  const total = discountedSubtotal + taxAmount;

  // POS Operations
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        alert('Insufficient stock available');
        return;
      }
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = products.find(p => p.id === productId);
    if (newQuantity > product.stock) {
      alert('Insufficient stock available');
      return;
    }

    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCustomer(null);
    setDiscount(0);
    setDiscountType('percentage');
  };

  const handleAddCustomer = () => {
    if (!customerForm.name || !customerForm.email || !customerForm.phone || !customerForm.dateOfBirth) {
      alert('Please fill in required fields (Name, Email, Phone, Date of Birth)');
      return;
    }

    // Age verification (must be 21+)
    const birthDate = new Date(customerForm.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 21) {
      alert('Customer must be 21 or older to purchase cannabis products');
      return;
    }

    const newCustomer = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      ...customerForm,
      loyaltyPoints: 0,
      totalSpent: 0,
      visits: 0
    };

    setCustomers([...customers, newCustomer]);
    setCustomer(newCustomer);
    setCustomerForm({
      name: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      idNumber: ''
    });
    setShowCustomerModal(false);
    alert('Customer added successfully!');
  };

  const processTransaction = () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    if (!customer) {
      alert('Please select or add a customer');
      return;
    }

    if (paymentForm.method === 'cash' && paymentForm.cashReceived < total) {
      alert('Insufficient cash received');
      return;
    }

    // Create transaction
    const transaction = {
      id: `TXN-${String(transactions.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      customer: customer.name,
      customerId: customer.id,
      items: cart.length,
      cart: [...cart],
      subtotal: subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total: total,
      paymentMethod: paymentForm.method,
      cashReceived: paymentForm.method === 'cash' ? paymentForm.cashReceived : total,
      change: paymentForm.method === 'cash' ? paymentForm.cashReceived - total : 0,
      status: 'Completed',
      cashier: 'Admin User',
      reference: paymentForm.reference || `REF-${Date.now()}`
    };

    // Update product stock
    const updatedProducts = products.map(product => {
      const cartItem = cart.find(item => item.id === product.id);
      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity };
      }
      return product;
    });
    setProducts(updatedProducts);

    // Update customer
    const updatedCustomers = customers.map(cust => {
      if (cust.id === customer.id) {
        return {
          ...cust,
          totalSpent: cust.totalSpent + total,
          visits: cust.visits + 1,
          loyaltyPoints: cust.loyaltyPoints + Math.floor(total) // 1 point per dollar
        };
      }
      return cust;
    });
    setCustomers(updatedCustomers);

    // Add transaction
    setTransactions([transaction, ...transactions]);
    setCurrentTransaction(transaction);

    // INTEGRATE WITH NOTIFICATION SYSTEM
    // Process POS transaction through notification system
    if (window.DankDashNotifications) {
      const orderForNotifications = {
        id: transaction.id,
        customerName: customer.name,
        customerEmail: customer.email || '',
        customerPhone: customer.phone || '',
        fulfillmentMethod: 'pickup', // POS transactions are in-store pickup
        items: cart,
        total: total.toFixed(2),
        status: 'completed',
        source: 'Point of Sale',
        paymentMethod: paymentForm.method,
        cashier: 'Admin User',
        location: 'In-Store Purchase'
      };
      
      // Send customer receipt notification if email available
      if (customer.email) {
        window.DankDashNotifications.sendNotification(
          'order_confirmation',
          { email: customer.email },
          {
            customer_name: customer.name,
            order_id: transaction.id,
            order_total: total.toFixed(2),
            order_items: cart.map(item => `${item.name} (${item.quantity})`).join(', '),
            fulfillment_method: 'In-Store Purchase',
            tracking_url: `https://dankdash.com/receipt/${transaction.id}`
          },
          orderForNotifications
        );
      }
    }

    // Clear form
    clearCart();
    setPaymentForm({
      method: 'cash',
      amount: 0,
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cashReceived: 0,
      reference: ''
    });
    setShowPaymentModal(false);
    setShowReceiptModal(true);

    alert('Transaction completed successfully!');
  };

  const printReceipt = () => {
    // In a real application, this would send to a receipt printer
    alert('Receipt sent to printer!');
    setShowReceiptModal(false);
  };

  const emailReceipt = () => {
    // In a real application, this would send an email
    alert(`Receipt emailed to ${currentTransaction?.customer}!`);
    setShowReceiptModal(false);
  };

  // Utility functions
  const getStockColor = (stock) => {
    if (stock === 0) return 'text-red-600';
    if (stock < 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const renderPOS = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Product Grid */}
      <div className="lg:col-span-2">
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products or scan barcode..."
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
            <option value="Wellness">Wellness</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md cursor-pointer transition-shadow"
            >
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{product.category} • {product.weight}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-green-600">${product.price.toFixed(2)}</span>
                <span className={`text-xs ${getStockColor(product.stock)}`}>
                  {product.stock} left
                </span>
              </div>
              {product.thc > 0 && (
                <p className="text-xs text-purple-600 mt-1">THC: {product.thc}%</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Current Sale</h3>
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
          {customer ? (
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div>
                <p className="font-medium text-green-900">{customer.name}</p>
                <p className="text-sm text-green-700">{customer.phone}</p>
                <p className="text-xs text-green-600">{customer.loyaltyPoints} points</p>
              </div>
              <button
                onClick={() => setCustomer(null)}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <select
                onChange={(e) => {
                  const selectedCustomer = customers.find(c => c.id === e.target.value);
                  setCustomer(selectedCustomer);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select existing customer</option>
                {customers.map(cust => (
                  <option key={cust.id} value={cust.id}>
                    {cust.name} - {cust.phone}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowCustomerModal(true)}
                className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Add New Customer
              </button>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 bg-gray-200 rounded text-xs hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 bg-gray-200 rounded text-xs hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-6 h-6 bg-red-200 text-red-600 rounded text-xs hover:bg-red-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Discount */}
        {cart.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
            <div className="flex space-x-2">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="px-2 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="percentage">%</option>
                <option value="fixed">$</option>
              </select>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                placeholder="0"
              />
            </div>
          </div>
        )}

        {/* Totals */}
        {cart.length > 0 && (
          <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-sm text-red-600">
                <span>Discount:</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Tax ({tax}%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        <button
          onClick={() => {
            if (cart.length === 0) {
              alert('Cart is empty');
              return;
            }
            if (!customer) {
              alert('Please select a customer');
              return;
            }
            setPaymentForm({
              ...paymentForm,
              amount: total,
              cashReceived: total
            });
            setShowPaymentModal(true);
          }}
          disabled={cart.length === 0 || !customer}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          Checkout ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
        <div className="flex space-x-3">
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{transaction.id}</div>
                    <div className="text-sm text-gray-500">{transaction.date} {transaction.time}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{transaction.customer}</div>
                  <div className="text-sm text-gray-500">{transaction.cashier}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.items} items
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${transaction.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.paymentMethod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => {
                      setCurrentTransaction(transaction);
                      setShowReceiptModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Receipt
                  </button>
                  <button 
                    onClick={() => alert(`Refunding transaction: ${transaction.id}`)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Refund
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Customer Modal
  const CustomerModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Customer</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone *</label>
              <input
                type="tel"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth * (Must be 21+)</label>
              <input
                type="date"
                value={customerForm.dateOfBirth}
                onChange={(e) => setCustomerForm({...customerForm, dateOfBirth: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={customerForm.address}
                onChange={(e) => setCustomerForm({...customerForm, address: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Number</label>
              <input
                type="text"
                value={customerForm.idNumber}
                onChange={(e) => setCustomerForm({...customerForm, idNumber: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Driver's License or State ID"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowCustomerModal(false);
                setCustomerForm({
                  name: '',
                  email: '',
                  phone: '',
                  dateOfBirth: '',
                  address: '',
                  idNumber: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCustomer}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Modal
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Process Payment</h3>
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Total Amount:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                value={paymentForm.method}
                onChange={(e) => setPaymentForm({...paymentForm, method: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="cash">Cash</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="canpay">CanPay</option>
                <option value="aeropay">AeroPay</option>
              </select>
            </div>

            {paymentForm.method === 'cash' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Cash Received *</label>
                <input
                  type="number"
                  step="0.01"
                  value={paymentForm.cashReceived}
                  onChange={(e) => setPaymentForm({...paymentForm, cashReceived: parseFloat(e.target.value) || 0})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {paymentForm.cashReceived > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Change: ${Math.max(0, paymentForm.cashReceived - total).toFixed(2)}
                  </p>
                )}
              </div>
            )}

            {(paymentForm.method === 'credit' || paymentForm.method === 'debit') && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    value={paymentForm.cardNumber}
                    onChange={(e) => setPaymentForm({...paymentForm, cardNumber: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="**** **** **** ****"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry</label>
                    <input
                      type="text"
                      value={paymentForm.expiryDate}
                      onChange={(e) => setPaymentForm({...paymentForm, expiryDate: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      value={paymentForm.cvv}
                      onChange={(e) => setPaymentForm({...paymentForm, cvv: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="***"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Reference (Optional)</label>
              <input
                type="text"
                value={paymentForm.reference}
                onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Transaction reference"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setPaymentForm({
                  method: 'cash',
                  amount: 0,
                  cardNumber: '',
                  expiryDate: '',
                  cvv: '',
                  cashReceived: 0,
                  reference: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={processTransaction}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Receipt Modal
  const ReceiptModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">DankDash</h2>
            <p className="text-sm text-gray-600">Cannabis Dispensary</p>
            <p className="text-xs text-gray-500">123 Main St, CA 90210</p>
            <p className="text-xs text-gray-500">(555) 123-4567</p>
          </div>

          {currentTransaction && (
            <div className="space-y-3 text-sm">
              <div className="border-b pb-3">
                <div className="flex justify-between">
                  <span>Transaction:</span>
                  <span>{currentTransaction.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{currentTransaction.date} {currentTransaction.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer:</span>
                  <span>{currentTransaction.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cashier:</span>
                  <span>{currentTransaction.cashier}</span>
                </div>
              </div>

              <div className="border-b pb-3">
                <h4 className="font-medium mb-2">Items:</h4>
                {currentTransaction.cart?.map((item, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span>{item.name} x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${currentTransaction.subtotal.toFixed(2)}</span>
                </div>
                {currentTransaction.discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount:</span>
                    <span>-${currentTransaction.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${currentTransaction.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-1">
                  <span>Total:</span>
                  <span>${currentTransaction.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span>{currentTransaction.paymentMethod}</span>
                </div>
                {currentTransaction.paymentMethod === 'Cash' && (
                  <>
                    <div className="flex justify-between">
                      <span>Cash Received:</span>
                      <span>${currentTransaction.cashReceived.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Change:</span>
                      <span>${currentTransaction.change.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="text-center text-xs text-gray-500 border-t pt-3">
                <p>Thank you for your business!</p>
                <p>Please consume responsibly</p>
                <p>Keep out of reach of children</p>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-3 mt-6">
            <button
              onClick={printReceipt}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Print Receipt
            </button>
            <button
              onClick={emailReceipt}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Email Receipt
            </button>
            <button
              onClick={() => setShowReceiptModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
        <p className="mt-2 text-gray-600">Process transactions, manage customers, and track sales</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'pos', name: 'POS Terminal', icon: '🛒' },
            { id: 'transactions', name: 'Transactions', icon: '📋' },
            { id: 'customers', name: 'Customers', icon: '👥' },
            { id: 'reports', name: 'Reports', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
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
      {activeTab === 'pos' && renderPOS()}
      {activeTab === 'transactions' && renderTransactions()}
      {activeTab === 'customers' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Customer Management</h3>
          <p className="text-gray-600">Customer management coming soon...</p>
        </div>
      )}
      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Sales Reports</h3>
          <p className="text-gray-600">Sales reporting coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showCustomerModal && <CustomerModal />}
      {showPaymentModal && <PaymentModal />}
      {showReceiptModal && <ReceiptModal />}
    </div>
  );
};

export default EnhancedPointOfSaleModule;

