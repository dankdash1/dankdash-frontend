import React, { useState, useEffect } from 'react';

const PurchaseModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');

  // Mock purchase data
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      id: 'PO-001',
      orderNumber: 'PO-2024-001',
      vendor: 'Green Valley Farms',
      vendorId: 'VEN-001',
      status: 'Confirmed',
      orderDate: '2024-08-10',
      expectedDate: '2024-08-20',
      deliveryDate: '2024-08-18',
      totalAmount: 15750.00,
      paidAmount: 15750.00,
      currency: 'USD',
      items: [
        { product: 'Premium OG Kush', quantity: 50, unit: 'oz', unitPrice: 200.00, total: 10000.00 },
        { product: 'Blue Dream', quantity: 25, unit: 'oz', unitPrice: 180.00, total: 4500.00 },
        { product: 'Packaging Supplies', quantity: 100, unit: 'units', unitPrice: 12.50, total: 1250.00 }
      ],
      notes: 'Premium quality flower for retail sales',
      paymentTerms: 'Net 30',
      shippingMethod: 'Ground Delivery'
    },
    {
      id: 'PO-002',
      orderNumber: 'PO-2024-002',
      vendor: 'Cannabis Supply Co',
      vendorId: 'VEN-002',
      status: 'Pending',
      orderDate: '2024-08-12',
      expectedDate: '2024-08-25',
      deliveryDate: null,
      totalAmount: 8900.00,
      paidAmount: 0.00,
      currency: 'USD',
      items: [
        { product: 'Edible Gummies', quantity: 200, unit: 'packs', unitPrice: 25.00, total: 5000.00 },
        { product: 'Vape Cartridges', quantity: 100, unit: 'units', unitPrice: 35.00, total: 3500.00 },
        { product: 'CBD Oil', quantity: 20, unit: 'bottles', unitPrice: 70.00, total: 1400.00 }
      ],
      notes: 'Monthly edibles and concentrates order',
      paymentTerms: 'Net 15',
      shippingMethod: 'Express Delivery'
    },
    {
      id: 'PO-003',
      orderNumber: 'PO-2024-003',
      vendor: 'Equipment Solutions',
      vendorId: 'VEN-003',
      status: 'Delivered',
      orderDate: '2024-08-05',
      expectedDate: '2024-08-15',
      deliveryDate: '2024-08-14',
      totalAmount: 3200.00,
      paidAmount: 3200.00,
      currency: 'USD',
      items: [
        { product: 'Digital Scale', quantity: 2, unit: 'units', unitPrice: 450.00, total: 900.00 },
        { product: 'Storage Containers', quantity: 50, unit: 'units', unitPrice: 25.00, total: 1250.00 },
        { product: 'Security Cameras', quantity: 4, unit: 'units', unitPrice: 262.50, total: 1050.00 }
      ],
      notes: 'Equipment upgrade for compliance',
      paymentTerms: 'Net 30',
      shippingMethod: 'Standard Delivery'
    },
    {
      id: 'PO-004',
      orderNumber: 'PO-2024-004',
      vendor: 'Green Valley Farms',
      vendorId: 'VEN-001',
      status: 'Draft',
      orderDate: '2024-08-15',
      expectedDate: '2024-08-30',
      deliveryDate: null,
      totalAmount: 12500.00,
      paidAmount: 0.00,
      currency: 'USD',
      items: [
        { product: 'Sativa Blend', quantity: 40, unit: 'oz', unitPrice: 220.00, total: 8800.00 },
        { product: 'Indica Blend', quantity: 30, unit: 'oz', unitPrice: 190.00, total: 5700.00 }
      ],
      notes: 'Fall inventory restock',
      paymentTerms: 'Net 30',
      shippingMethod: 'Ground Delivery'
    }
  ]);

  const [vendors, setVendors] = useState([
    {
      id: 'VEN-001',
      name: 'Green Valley Farms',
      contactPerson: 'John Smith',
      email: 'john@greenvalleyfarms.com',
      phone: '+1 (555) 123-4567',
      address: '123 Farm Road, Green Valley, CA 95945',
      category: 'Flower Supplier',
      rating: 4.8,
      totalOrders: 45,
      totalSpent: 125000.00,
      paymentTerms: 'Net 30',
      status: 'Active',
      notes: 'Premium quality flower supplier with consistent delivery'
    },
    {
      id: 'VEN-002',
      name: 'Cannabis Supply Co',
      contactPerson: 'Sarah Johnson',
      email: 'sarah@cannabissupply.com',
      phone: '+1 (555) 234-5678',
      address: '456 Supply Street, Oakland, CA 94612',
      category: 'Edibles & Concentrates',
      rating: 4.6,
      totalOrders: 32,
      totalSpent: 89000.00,
      paymentTerms: 'Net 15',
      status: 'Active',
      notes: 'Reliable supplier for edibles and vape products'
    },
    {
      id: 'VEN-003',
      name: 'Equipment Solutions',
      contactPerson: 'Mike Chen',
      email: 'mike@equipmentsolutions.com',
      phone: '+1 (555) 345-6789',
      address: '789 Industrial Blvd, San Jose, CA 95110',
      category: 'Equipment & Supplies',
      rating: 4.9,
      totalOrders: 18,
      totalSpent: 45000.00,
      paymentTerms: 'Net 30',
      status: 'Active',
      notes: 'High-quality equipment and compliance supplies'
    },
    {
      id: 'VEN-004',
      name: 'Packaging Pro',
      contactPerson: 'Lisa Rodriguez',
      email: 'lisa@packagingpro.com',
      phone: '+1 (555) 456-7890',
      address: '321 Package Lane, Los Angeles, CA 90210',
      category: 'Packaging',
      rating: 4.4,
      totalOrders: 25,
      totalSpent: 32000.00,
      paymentTerms: 'Net 15',
      status: 'Active',
      notes: 'Custom packaging solutions for cannabis products'
    }
  ]);

  const [rfqs, setRfqs] = useState([
    {
      id: 'RFQ-001',
      title: 'Premium Flower Varieties',
      description: 'Looking for high-quality flower varieties for Q4 inventory',
      status: 'Open',
      dueDate: '2024-08-25',
      createdDate: '2024-08-15',
      estimatedValue: 25000.00,
      responses: 3,
      items: [
        { product: 'Premium Sativa', quantity: 50, unit: 'oz' },
        { product: 'Premium Indica', quantity: 40, unit: 'oz' },
        { product: 'Hybrid Varieties', quantity: 30, unit: 'oz' }
      ]
    },
    {
      id: 'RFQ-002',
      title: 'Security System Upgrade',
      description: 'Complete security system upgrade for compliance requirements',
      status: 'Closed',
      dueDate: '2024-08-10',
      createdDate: '2024-08-01',
      estimatedValue: 15000.00,
      responses: 5,
      items: [
        { product: 'Security Cameras', quantity: 12, unit: 'units' },
        { product: 'Access Control System', quantity: 1, unit: 'system' },
        { product: 'Alarm System', quantity: 1, unit: 'system' }
      ]
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalPurchases: 156,
    totalSpent: 450000.00,
    avgOrderValue: 2884.62,
    onTimeDelivery: 94.2,
    activeVendors: 12,
    pendingOrders: 8,
    monthlySpend: 45000.00,
    topCategory: 'Flower Products'
  });

  // Filter functions
  const filteredPurchaseOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || order.status.toLowerCase() === selectedStatus;
    const matchesVendor = selectedVendor === 'all' || order.vendorId === selectedVendor;
    return matchesSearch && matchesStatus && matchesVendor;
  });

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Active': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    return stars;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Purchases</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalPurchases}</p>
              <p className="text-sm text-blue-600">{analytics.pendingOrders} pending</p>
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
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalSpent / 1000).toFixed(0)}k</p>
              <p className="text-sm text-gray-600">This year</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.avgOrderValue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12% vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">On-Time Delivery</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.onTimeDelivery}%</p>
              <p className="text-sm text-gray-600">Performance rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Purchase Orders */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {purchaseOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">PO</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{order.orderNumber}</h4>
                    <p className="text-sm text-gray-600">{order.vendor} • {order.orderDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium text-green-600">${order.totalAmount.toLocaleString()}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Vendors */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Top Vendors</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.slice(0, 3).map((vendor) => (
              <div key={vendor.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                  <div className="flex items-center">
                    {getRatingStars(vendor.rating)}
                    <span className="ml-1 text-sm text-gray-600">{vendor.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Orders: {vendor.totalOrders}</span>
                  <span className="text-green-600">${(vendor.totalSpent / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPurchaseOrders = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search purchase orders..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
            >
              <option value="all">All Vendors</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Purchase Order
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Purchase Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPurchaseOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                      <div className="text-sm text-gray-500">{order.items.length} items</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.vendor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.expectedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${order.totalAmount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">Print</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderVendors = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search vendors..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Vendor
            </button>
          </div>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
                {vendor.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Contact:</p>
                <p className="text-sm text-gray-600">{vendor.contactPerson}</p>
                <p className="text-sm text-gray-600">{vendor.email}</p>
                <p className="text-sm text-gray-600">{vendor.phone}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Category:</p>
                <p className="text-sm text-gray-600">{vendor.category}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">Rating:</p>
                  <div className="flex items-center">
                    {getRatingStars(vendor.rating)}
                    <span className="ml-1 text-sm text-gray-600">{vendor.rating}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">Total Spent:</p>
                  <p className="text-lg font-bold text-green-600">${(vendor.totalSpent / 1000).toFixed(0)}k</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Orders:</p>
                  <p className="text-lg font-bold text-blue-600">{vendor.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Terms:</p>
                  <p className="text-sm text-gray-600">{vendor.paymentTerms}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Details
                </button>
                <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Create Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRFQs = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search RFQs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create RFQ
            </button>
          </div>
        </div>
      </div>

      {/* RFQs List */}
      <div className="space-y-4">
        {rfqs.map((rfq) => (
          <div key={rfq.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{rfq.title}</h3>
                <p className="text-sm text-gray-600">{rfq.description}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rfq.status)}`}>
                {rfq.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Created:</p>
                <p className="text-sm text-gray-600">{rfq.createdDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Due Date:</p>
                <p className="text-sm text-gray-600">{rfq.dueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Est. Value:</p>
                <p className="text-sm text-green-600">${rfq.estimatedValue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Responses:</p>
                <p className="text-sm text-blue-600">{rfq.responses} received</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
              <div className="space-y-1">
                {rfq.items.map((item, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    • {item.product} - {item.quantity} {item.unit}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                View Responses
              </button>
              {rfq.status === 'Open' && (
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Close RFQ
                </button>
              )}
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
          <h1 className="text-3xl font-bold text-gray-900">Purchase Management</h1>
          <p className="mt-2 text-gray-600">Manage purchase orders, vendors, and procurement processes</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'orders', name: 'Purchase Orders', icon: '📋' },
              { id: 'vendors', name: 'Vendors', icon: '🏢' },
              { id: 'rfqs', name: 'RFQs', icon: '📝' }
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
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'orders' && renderPurchaseOrders()}
        {activeTab === 'vendors' && renderVendors()}
        {activeTab === 'rfqs' && renderRFQs()}
      </div>
    </div>
  );
};

export default PurchaseModule;

