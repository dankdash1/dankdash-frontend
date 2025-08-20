import React, { useState, useEffect } from 'react';

const BarcodeModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [scannerActive, setScannerActive] = useState(false);

  // Mock barcode data
  const [barcodes, setBarcodes] = useState([
    {
      id: 'BC-001',
      code: '123456789012',
      type: 'UPC-A',
      productId: 'PROD-001',
      productName: 'Blue Dream - 3.5g',
      category: 'Flower',
      sku: 'BD-3.5-001',
      status: 'Active',
      createdDate: '2024-08-01',
      lastScanned: '2024-08-14',
      scanCount: 156,
      location: 'Warehouse A - Shelf 12',
      batchNumber: 'BD-240801-001',
      expiryDate: '2025-08-01',
      price: 35.00,
      stock: 24
    },
    {
      id: 'BC-002',
      code: '234567890123',
      type: 'UPC-A',
      productId: 'PROD-002',
      productName: 'OG Kush Gummies - 10mg',
      category: 'Edibles',
      sku: 'OG-GUM-10-002',
      status: 'Active',
      createdDate: '2024-07-15',
      lastScanned: '2024-08-13',
      scanCount: 89,
      location: 'Warehouse B - Shelf 5',
      batchNumber: 'OG-240715-002',
      expiryDate: '2025-01-15',
      price: 25.00,
      stock: 67
    },
    {
      id: 'BC-003',
      code: '345678901234',
      type: 'Code128',
      productId: 'PROD-003',
      productName: 'Live Resin Cart - Sour Diesel',
      category: 'Concentrates',
      sku: 'SD-LR-1G-003',
      status: 'Active',
      createdDate: '2024-08-05',
      lastScanned: '2024-08-14',
      scanCount: 45,
      location: 'Warehouse A - Shelf 8',
      batchNumber: 'SD-240805-003',
      expiryDate: '2025-08-05',
      price: 65.00,
      stock: 18
    },
    {
      id: 'BC-004',
      code: '456789012345',
      type: 'QR Code',
      productId: 'EQUIP-001',
      productName: 'Delivery Vehicle #1',
      category: 'Equipment',
      sku: 'VEH-001',
      status: 'Active',
      createdDate: '2024-06-01',
      lastScanned: '2024-08-14',
      scanCount: 234,
      location: 'Delivery Hub A',
      batchNumber: null,
      expiryDate: null,
      price: null,
      stock: 1
    },
    {
      id: 'BC-005',
      code: '567890123456',
      type: 'UPC-A',
      productId: 'PROD-005',
      productName: 'CBD Tincture - 1000mg',
      category: 'Wellness',
      sku: 'CBD-TIN-1000-005',
      status: 'Inactive',
      createdDate: '2024-07-01',
      lastScanned: '2024-07-30',
      scanCount: 23,
      location: 'Warehouse C - Shelf 3',
      batchNumber: 'CBD-240701-005',
      expiryDate: '2025-07-01',
      price: 89.99,
      stock: 0
    }
  ]);

  const [scanHistory, setScanHistory] = useState([
    {
      id: 'SCAN-001',
      barcodeId: 'BC-001',
      code: '123456789012',
      productName: 'Blue Dream - 3.5g',
      scannedBy: 'John Doe',
      scanDate: '2024-08-14',
      scanTime: '14:30:25',
      location: 'Warehouse A',
      action: 'Inventory Check',
      device: 'Mobile Scanner #1',
      notes: 'Regular inventory audit scan'
    },
    {
      id: 'SCAN-002',
      barcodeId: 'BC-002',
      code: '234567890123',
      productName: 'OG Kush Gummies - 10mg',
      scannedBy: 'Sarah Johnson',
      scanDate: '2024-08-13',
      scanTime: '16:45:12',
      location: 'Packaging Area',
      action: 'Quality Check',
      device: 'Handheld Scanner #2',
      notes: 'Pre-shipment quality verification'
    },
    {
      id: 'SCAN-003',
      barcodeId: 'BC-003',
      code: '345678901234',
      productName: 'Live Resin Cart - Sour Diesel',
      scannedBy: 'Mike Chen',
      scanDate: '2024-08-14',
      scanTime: '09:15:33',
      location: 'Delivery Hub A',
      action: 'Order Fulfillment',
      device: 'Mobile App',
      notes: 'Customer order #ORD-12345 fulfillment'
    },
    {
      id: 'SCAN-004',
      barcodeId: 'BC-004',
      code: '456789012345',
      productName: 'Delivery Vehicle #1',
      scannedBy: 'Alex Kim',
      scanDate: '2024-08-14',
      scanTime: '08:00:00',
      location: 'Delivery Hub A',
      action: 'Vehicle Check-in',
      device: 'Mobile App',
      notes: 'Daily vehicle inspection and check-in'
    }
  ]);

  const [barcodeTemplates, setBarcodeTemplates] = useState([
    {
      id: 'TEMP-001',
      name: 'Product Barcode Template',
      type: 'UPC-A',
      category: 'Products',
      description: 'Standard template for cannabis product barcodes',
      format: '{category_code}{product_id}{check_digit}',
      usage: 156,
      lastUsed: '2024-08-14',
      isDefault: true
    },
    {
      id: 'TEMP-002',
      name: 'Equipment QR Template',
      type: 'QR Code',
      category: 'Equipment',
      description: 'QR code template for equipment and asset tracking',
      format: '{asset_type}_{location}_{asset_id}',
      usage: 45,
      lastUsed: '2024-08-12',
      isDefault: false
    },
    {
      id: 'TEMP-003',
      name: 'Batch Tracking Template',
      type: 'Code128',
      category: 'Batches',
      description: 'Template for batch and lot number tracking',
      format: '{batch_date}_{product_code}_{sequence}',
      usage: 89,
      lastUsed: '2024-08-13',
      isDefault: false
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalBarcodes: 1250,
    activeScans: 45,
    dailyScans: 234,
    scanAccuracy: 99.2,
    topScannedProduct: 'Blue Dream - 3.5g',
    avgScansPerDay: 187,
    errorRate: 0.8,
    mobileScans: 78.5
  });

  // Filter functions
  const filteredBarcodes = barcodes.filter(barcode => {
    const matchesSearch = barcode.code.includes(searchTerm) ||
                         barcode.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         barcode.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || barcode.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || barcode.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'UPC-A': return 'bg-blue-100 text-blue-800';
      case 'Code128': return 'bg-purple-100 text-purple-800';
      case 'QR Code': return 'bg-green-100 text-green-800';
      case 'EAN-13': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Flower': return '🌿';
      case 'Edibles': return '🍪';
      case 'Concentrates': return '💎';
      case 'Wellness': return '🌱';
      case 'Equipment': return '⚙️';
      case 'Accessories': return '🛍️';
      default: return '📦';
    }
  };

  const generateBarcode = (code, type) => {
    // Simulate barcode generation - in real app, this would generate actual barcode images
    const width = type === 'QR Code' ? 100 : 150;
    const height = type === 'QR Code' ? 100 : 50;
    
    return (
      <div className="flex flex-col items-center p-2 border rounded bg-white">
        <div 
          className="bg-black flex items-center justify-center text-white text-xs"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            background: type === 'QR Code' 
              ? 'repeating-linear-gradient(0deg, black 0px, black 2px, white 2px, white 4px), repeating-linear-gradient(90deg, black 0px, black 2px, white 2px, white 4px)'
              : 'repeating-linear-gradient(90deg, black 0px, black 1px, white 1px, white 2px)'
          }}
        >
          {type === 'QR Code' ? '⊞' : '|||'}
        </div>
        <div className="text-xs mt-1 font-mono">{code}</div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h4m4 0V4m0 0h4m-4 0v4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Barcodes</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalBarcodes.toLocaleString()}</p>
              <p className="text-sm text-blue-600">{analytics.activeScans} active today</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Daily Scans</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.dailyScans}</p>
              <p className="text-sm text-green-600">Avg: {analytics.avgScansPerDay}/day</p>
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
              <p className="text-sm font-medium text-gray-600">Scan Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.scanAccuracy}%</p>
              <p className="text-sm text-gray-600">Error rate: {analytics.errorRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mobile Scans</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.mobileScans}%</p>
              <p className="text-sm text-gray-600">Of total scans</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Scanning Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.scanAccuracy}%</div>
              <div className="text-sm text-gray-600">Scan Accuracy</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.scanAccuracy}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.avgScansPerDay}</div>
              <div className="text-sm text-gray-600">Average Scans per Day</div>
              <div className="text-xs text-gray-500 mt-1">Target: 200/day</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.mobileScans}%</div>
              <div className="text-sm text-gray-600">Mobile Device Usage</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${analytics.mobileScans}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Scanner */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Quick Scanner</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              {scannerActive ? (
                <div className="text-center">
                  <div className="animate-pulse">
                    <svg className="w-16 h-16 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4M4 8h4m4 0V4m0 0h4m-4 0v4" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Scanning...</p>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm text-gray-600">Click to start scanning</p>
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setScannerActive(!scannerActive)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  scannerActive 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {scannerActive ? 'Stop Scanner' : 'Start Scanner'}
              </button>
              <input
                type="text"
                placeholder="Or enter barcode manually..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Lookup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Scans */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Scans</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {scanHistory.slice(0, 5).map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">📱</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{scan.productName}</h4>
                    <p className="text-sm text-gray-600">{scan.code} • {scan.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{scan.scannedBy}</p>
                  <p className="text-sm text-gray-500">{scan.scanDate} {scan.scanTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Scanned Products */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Top Scanned Products</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {barcodes.slice(0, 5).map((barcode, index) => (
              <div key={barcode.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{barcode.productName}</h4>
                    <p className="text-sm text-gray-600">{barcode.category} • {barcode.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{barcode.scanCount}</p>
                  <p className="text-sm text-gray-500">scans</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBarcodes = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search barcodes..."
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
              <option value="Wellness">Wellness</option>
              <option value="Equipment">Equipment</option>
              <option value="Accessories">Accessories</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Generate Barcode
            </button>
          </div>
        </div>
      </div>

      {/* Barcodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBarcodes.map((barcode) => (
          <div key={barcode.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getCategoryIcon(barcode.category)}</span>
                <div>
                  <h3 className="font-medium text-gray-900">{barcode.productName}</h3>
                  <p className="text-sm text-gray-600">{barcode.sku}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(barcode.status)}`}>
                {barcode.status}
              </span>
            </div>
            
            <div className="flex justify-center mb-4">
              {generateBarcode(barcode.code, barcode.type)}
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Type:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(barcode.type)}`}>
                  {barcode.type}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="text-gray-900">{barcode.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-900">{barcode.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Scans:</span>
                <span className="text-blue-600">{barcode.scanCount}</span>
              </div>
              {barcode.stock !== null && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock:</span>
                  <span className={`${barcode.stock > 10 ? 'text-green-600' : barcode.stock > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {barcode.stock}
                  </span>
                </div>
              )}
              {barcode.price && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="text-green-600">${barcode.price.toFixed(2)}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScanHistory = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search scan history..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export History
            </button>
          </div>
        </div>
      </div>

      {/* Scan History Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Scan History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barcode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scanned By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scanHistory.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{scan.productName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-600">{scan.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{scan.scannedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{scan.scanDate}</div>
                    <div className="text-sm text-gray-500">{scan.scanTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {scan.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scan.device}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scan.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Template
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {barcodeTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <p className="text-sm text-gray-600">{template.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                {template.isDefault && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Default
                  </span>
                )}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}>
                  {template.type}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Format:</p>
                <p className="text-sm font-mono text-gray-600 bg-gray-50 p-2 rounded">{template.format}</p>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Usage:</span>
                <span className="text-blue-600">{template.usage} times</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Used:</span>
                <span className="text-gray-900">{template.lastUsed}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Use Template
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit
              </button>
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
          <h1 className="text-3xl font-bold text-gray-900">Barcode Management</h1>
          <p className="mt-2 text-gray-600">Generate, scan, and manage barcodes for products and assets</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'barcodes', name: 'Barcodes', icon: '📱' },
              { id: 'scan-history', name: 'Scan History', icon: '📋' },
              { id: 'templates', name: 'Templates', icon: '📝' }
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
        {activeTab === 'barcodes' && renderBarcodes()}
        {activeTab === 'scan-history' && renderScanHistory()}
        {activeTab === 'templates' && renderTemplates()}
      </div>
    </div>
  );
};

export default BarcodeModule;

