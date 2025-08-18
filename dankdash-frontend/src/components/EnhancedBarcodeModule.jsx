import React, { useState, useEffect, useMemo, useRef } from 'react';

const EnhancedBarcodeModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [scannerActive, setScannerActive] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [editingBarcode, setEditingBarcode] = useState(null);
  const [scanResult, setScanResult] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Form states
  const [barcodeForm, setBarcodeForm] = useState({
    code: '',
    type: 'UPC-A',
    productId: '',
    productName: '',
    category: 'Flower',
    sku: '',
    location: '',
    batchNumber: '',
    expiryDate: '',
    price: '',
    stock: ''
  });

  const [generateForm, setGenerateForm] = useState({
    type: 'UPC-A',
    productName: '',
    category: 'Flower',
    sku: '',
    quantity: 1,
    prefix: '123'
  });

  // Mock data with mobile-responsive considerations
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
      stock: 24,
      createdBy: 'Inventory Manager',
      notes: 'Premium indoor flower, high THC content'
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
      stock: 67,
      createdBy: 'Product Manager',
      notes: 'Vegan-friendly gummies, precise dosing'
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
      stock: 18,
      createdBy: 'Production Manager',
      notes: 'Full spectrum live resin, premium quality'
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
      stock: 1,
      createdBy: 'Fleet Manager',
      notes: 'Primary delivery vehicle for downtown routes'
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
      stock: 0,
      createdBy: 'Wellness Manager',
      notes: 'High-potency CBD tincture, discontinued'
    },
    {
      id: 'BC-006',
      code: '678901234567',
      type: 'UPC-A',
      productId: 'PROD-006',
      productName: 'Hybrid Pre-Roll Pack - 5pk',
      category: 'Flower',
      sku: 'HYB-PR-5PK-006',
      status: 'Active',
      createdDate: '2024-08-10',
      lastScanned: '2024-08-14',
      scanCount: 78,
      location: 'Warehouse A - Shelf 15',
      batchNumber: 'HYB-240810-006',
      expiryDate: '2025-02-10',
      price: 45.00,
      stock: 32,
      createdBy: 'Product Manager',
      notes: 'Convenience pack, popular with customers'
    },
    {
      id: 'BC-007',
      code: '789012345678',
      type: 'Code128',
      productId: 'PROD-007',
      productName: 'Rosin Dab - Wedding Cake',
      category: 'Concentrates',
      sku: 'WC-ROS-1G-007',
      status: 'Active',
      createdDate: '2024-08-08',
      lastScanned: '2024-08-13',
      scanCount: 34,
      location: 'Warehouse A - Shelf 9',
      batchNumber: 'WC-240808-007',
      expiryDate: '2025-08-08',
      price: 75.00,
      stock: 12,
      createdBy: 'Production Manager',
      notes: 'Solventless extraction, premium concentrate'
    },
    {
      id: 'BC-008',
      code: '890123456789',
      type: 'QR Code',
      productId: 'EQUIP-002',
      productName: 'Security Camera #12',
      category: 'Equipment',
      sku: 'CAM-012',
      status: 'Active',
      createdDate: '2024-07-20',
      lastScanned: '2024-08-12',
      scanCount: 15,
      location: 'Warehouse B - North Wall',
      batchNumber: null,
      expiryDate: null,
      price: null,
      stock: 1,
      createdBy: 'Security Manager',
      notes: 'High-resolution security camera, night vision'
    }
  ]);

  const [scanHistory, setScanHistory] = useState([
    {
      id: 'SCAN-001',
      barcodeId: 'BC-001',
      code: '123456789012',
      productName: 'Blue Dream - 3.5g',
      scanType: 'Inventory Check',
      scannedBy: 'John Doe',
      scanDate: '2024-08-14',
      scanTime: '14:30:25',
      location: 'Warehouse A',
      action: 'Stock Count',
      result: 'Success',
      notes: 'Regular inventory check'
    },
    {
      id: 'SCAN-002',
      barcodeId: 'BC-002',
      code: '234567890123',
      productName: 'OG Kush Gummies - 10mg',
      scanType: 'Sale Transaction',
      scannedBy: 'Sarah Johnson',
      scanDate: '2024-08-14',
      scanTime: '12:15:10',
      location: 'POS Terminal 1',
      action: 'Sale',
      result: 'Success',
      notes: 'Customer purchase, quantity: 2'
    },
    {
      id: 'SCAN-003',
      barcodeId: 'BC-003',
      code: '345678901234',
      productName: 'Live Resin Cart - Sour Diesel',
      scanType: 'Quality Check',
      scannedBy: 'Mike Chen',
      scanDate: '2024-08-14',
      scanTime: '10:45:33',
      location: 'QC Lab',
      action: 'Quality Verification',
      result: 'Success',
      notes: 'Batch quality verification passed'
    },
    {
      id: 'SCAN-004',
      barcodeId: 'BC-004',
      code: '456789012345',
      productName: 'Delivery Vehicle #1',
      scanType: 'Asset Tracking',
      scannedBy: 'Alex Kim',
      scanDate: '2024-08-14',
      scanTime: '08:00:15',
      location: 'Delivery Hub A',
      action: 'Check Out',
      result: 'Success',
      notes: 'Vehicle checked out for delivery route'
    },
    {
      id: 'SCAN-005',
      barcodeId: 'BC-006',
      code: '678901234567',
      productName: 'Hybrid Pre-Roll Pack - 5pk',
      scanType: 'Receiving',
      scannedBy: 'Lisa Rodriguez',
      scanDate: '2024-08-13',
      scanTime: '16:20:45',
      location: 'Receiving Dock',
      action: 'Receive Inventory',
      result: 'Success',
      notes: 'New inventory received from production'
    }
  ]);

  const [categories] = useState([
    'Flower',
    'Edibles',
    'Concentrates',
    'Wellness',
    'Equipment',
    'Accessories',
    'Topicals'
  ]);

  const [barcodeTypes] = useState([
    'UPC-A',
    'UPC-E',
    'Code128',
    'Code39',
    'QR Code',
    'Data Matrix'
  ]);

  const [locations] = useState([
    'Warehouse A - Shelf 1',
    'Warehouse A - Shelf 2',
    'Warehouse A - Shelf 3',
    'Warehouse B - Shelf 1',
    'Warehouse B - Shelf 2',
    'Warehouse C - Shelf 1',
    'Delivery Hub A',
    'Delivery Hub B',
    'QC Lab',
    'Production Floor'
  ]);

  // Filter functions
  const filteredBarcodes = useMemo(() => {
    return barcodes.filter(barcode => {
      const matchesSearch = barcode.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           barcode.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           barcode.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || barcode.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || barcode.status.toLowerCase() === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [barcodes, searchTerm, selectedCategory, selectedStatus]);

  // Barcode CRUD Operations
  const handleCreateBarcode = () => {
    if (!barcodeForm.code || !barcodeForm.productName || !barcodeForm.sku) {
      alert('Please fill in required fields (Code, Product Name, SKU)');
      return;
    }

    // Check for duplicate barcode
    if (barcodes.some(b => b.code === barcodeForm.code)) {
      alert('Barcode already exists! Please use a different code.');
      return;
    }

    const newBarcode = {
      id: `BC-${String(barcodes.length + 1).padStart(3, '0')}`,
      code: barcodeForm.code,
      type: barcodeForm.type,
      productId: `PROD-${String(barcodes.length + 1).padStart(3, '0')}`,
      productName: barcodeForm.productName,
      category: barcodeForm.category,
      sku: barcodeForm.sku,
      status: 'Active',
      createdDate: new Date().toISOString().split('T')[0],
      lastScanned: null,
      scanCount: 0,
      location: barcodeForm.location,
      batchNumber: barcodeForm.batchNumber,
      expiryDate: barcodeForm.expiryDate,
      price: barcodeForm.price ? parseFloat(barcodeForm.price) : null,
      stock: barcodeForm.stock ? parseInt(barcodeForm.stock) : 0,
      createdBy: 'Current User',
      notes: ''
    };

    setBarcodes([...barcodes, newBarcode]);
    setBarcodeForm({
      code: '',
      type: 'UPC-A',
      productId: '',
      productName: '',
      category: 'Flower',
      sku: '',
      location: '',
      batchNumber: '',
      expiryDate: '',
      price: '',
      stock: ''
    });
    setShowBarcodeModal(false);
    alert('Barcode created successfully!');
  };

  const handleEditBarcode = (barcode) => {
    setEditingBarcode(barcode);
    setBarcodeForm({
      code: barcode.code,
      type: barcode.type,
      productId: barcode.productId,
      productName: barcode.productName,
      category: barcode.category,
      sku: barcode.sku,
      location: barcode.location,
      batchNumber: barcode.batchNumber || '',
      expiryDate: barcode.expiryDate || '',
      price: barcode.price ? barcode.price.toString() : '',
      stock: barcode.stock ? barcode.stock.toString() : ''
    });
    setShowBarcodeModal(true);
  };

  const handleUpdateBarcode = () => {
    if (!barcodeForm.code || !barcodeForm.productName || !barcodeForm.sku) {
      alert('Please fill in required fields (Code, Product Name, SKU)');
      return;
    }

    // Check for duplicate barcode (excluding current)
    if (barcodes.some(b => b.code === barcodeForm.code && b.id !== editingBarcode.id)) {
      alert('Barcode already exists! Please use a different code.');
      return;
    }

    const updatedBarcodes = barcodes.map(barcode =>
      barcode.id === editingBarcode.id
        ? { 
            ...barcode, 
            code: barcodeForm.code,
            type: barcodeForm.type,
            productName: barcodeForm.productName,
            category: barcodeForm.category,
            sku: barcodeForm.sku,
            location: barcodeForm.location,
            batchNumber: barcodeForm.batchNumber,
            expiryDate: barcodeForm.expiryDate,
            price: barcodeForm.price ? parseFloat(barcodeForm.price) : null,
            stock: barcodeForm.stock ? parseInt(barcodeForm.stock) : 0
          }
        : barcode
    );

    setBarcodes(updatedBarcodes);
    setEditingBarcode(null);
    setBarcodeForm({
      code: '',
      type: 'UPC-A',
      productId: '',
      productName: '',
      category: 'Flower',
      sku: '',
      location: '',
      batchNumber: '',
      expiryDate: '',
      price: '',
      stock: ''
    });
    setShowBarcodeModal(false);
    alert('Barcode updated successfully!');
  };

  const handleDeleteBarcode = (barcodeId) => {
    if (window.confirm('Are you sure you want to delete this barcode? This action cannot be undone.')) {
      setBarcodes(barcodes.filter(barcode => barcode.id !== barcodeId));
      alert('Barcode deleted successfully!');
    }
  };

  const handleActivateBarcode = (barcodeId) => {
    const updatedBarcodes = barcodes.map(barcode =>
      barcode.id === barcodeId
        ? { ...barcode, status: 'Active' }
        : barcode
    );
    setBarcodes(updatedBarcodes);
    alert('Barcode activated successfully!');
  };

  const handleDeactivateBarcode = (barcodeId) => {
    if (window.confirm('Are you sure you want to deactivate this barcode?')) {
      const updatedBarcodes = barcodes.map(barcode =>
        barcode.id === barcodeId
          ? { ...barcode, status: 'Inactive' }
          : barcode
      );
      setBarcodes(updatedBarcodes);
      alert('Barcode deactivated successfully!');
    }
  };

  // Barcode Generation
  const generateBarcode = (type, data) => {
    let code = '';
    switch (type) {
      case 'UPC-A':
        code = generateForm.prefix + Math.random().toString().substr(2, 9);
        break;
      case 'Code128':
        code = 'C128' + Math.random().toString(36).substr(2, 8).toUpperCase();
        break;
      case 'QR Code':
        code = 'QR' + Math.random().toString(36).substr(2, 10).toUpperCase();
        break;
      default:
        code = Math.random().toString().substr(2, 12);
    }
    return code;
  };

  const handleGenerateBarcodes = () => {
    if (!generateForm.productName || !generateForm.sku) {
      alert('Please fill in required fields (Product Name, SKU)');
      return;
    }

    const quantity = parseInt(generateForm.quantity);
    const newBarcodes = [];

    for (let i = 0; i < quantity; i++) {
      const code = generateBarcode(generateForm.type);
      const newBarcode = {
        id: `BC-${String(barcodes.length + newBarcodes.length + 1).padStart(3, '0')}`,
        code: code,
        type: generateForm.type,
        productId: `PROD-${String(barcodes.length + newBarcodes.length + 1).padStart(3, '0')}`,
        productName: generateForm.productName + (quantity > 1 ? ` #${i + 1}` : ''),
        category: generateForm.category,
        sku: generateForm.sku + (quantity > 1 ? `-${i + 1}` : ''),
        status: 'Active',
        createdDate: new Date().toISOString().split('T')[0],
        lastScanned: null,
        scanCount: 0,
        location: '',
        batchNumber: '',
        expiryDate: '',
        price: null,
        stock: 0,
        createdBy: 'Current User',
        notes: 'Auto-generated barcode'
      };
      newBarcodes.push(newBarcode);
    }

    setBarcodes([...barcodes, ...newBarcodes]);
    setGenerateForm({
      type: 'UPC-A',
      productName: '',
      category: 'Flower',
      sku: '',
      quantity: 1,
      prefix: '123'
    });
    setShowGenerateModal(false);
    alert(`${quantity} barcode(s) generated successfully!`);
  };

  // Scanner Functions
  const startScanner = async () => {
    try {
      setScannerActive(true);
      setShowScanModal(true);
      
      // Simulate camera access (in real implementation, use getUserMedia)
      setTimeout(() => {
        // Simulate successful scan
        const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
        handleScanResult(randomBarcode.code);
      }, 3000);
    } catch (error) {
      console.error('Scanner error:', error);
      alert('Camera access denied or not available');
      setScannerActive(false);
    }
  };

  const stopScanner = () => {
    setScannerActive(false);
    setShowScanModal(false);
    setScanResult('');
  };

  const handleScanResult = (scannedCode) => {
    setScanResult(scannedCode);
    setScannerActive(false);
    
    // Find barcode in database
    const foundBarcode = barcodes.find(b => b.code === scannedCode);
    
    if (foundBarcode) {
      // Update scan count and last scanned
      const updatedBarcodes = barcodes.map(barcode =>
        barcode.id === foundBarcode.id
          ? { 
              ...barcode, 
              scanCount: barcode.scanCount + 1,
              lastScanned: new Date().toISOString().split('T')[0]
            }
          : barcode
      );
      setBarcodes(updatedBarcodes);

      // Add to scan history
      const newScan = {
        id: `SCAN-${String(scanHistory.length + 1).padStart(3, '0')}`,
        barcodeId: foundBarcode.id,
        code: scannedCode,
        productName: foundBarcode.productName,
        scanType: 'Manual Scan',
        scannedBy: 'Current User',
        scanDate: new Date().toISOString().split('T')[0],
        scanTime: new Date().toLocaleTimeString(),
        location: 'Mobile Scanner',
        action: 'Scan',
        result: 'Success',
        notes: 'Mobile barcode scan'
      };
      setScanHistory([newScan, ...scanHistory]);

      alert(`Barcode found!\nProduct: ${foundBarcode.productName}\nSKU: ${foundBarcode.sku}\nStock: ${foundBarcode.stock}`);
    } else {
      alert('Barcode not found in database!');
    }
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Flower': return 'bg-green-100 text-green-800';
      case 'Edibles': return 'bg-purple-100 text-purple-800';
      case 'Concentrates': return 'bg-yellow-100 text-yellow-800';
      case 'Wellness': return 'bg-blue-100 text-blue-800';
      case 'Equipment': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  // Dashboard calculations
  const totalBarcodes = barcodes.length;
  const activeBarcodes = barcodes.filter(b => b.status === 'Active').length;
  const totalScans = barcodes.reduce((sum, b) => sum + b.scanCount, 0);
  const recentScans = scanHistory.filter(s => s.scanDate === new Date().toISOString().split('T')[0]).length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Barcodes</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalBarcodes}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{activeBarcodes} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Scans</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalScans.toLocaleString()}</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">All time</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Today's Scans</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{recentScans}</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">Recent activity</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Avg Scans/Code</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{(totalScans / totalBarcodes).toFixed(1)}</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">Usage rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Recent Scans</h3>
          <div className="space-y-3">
            {scanHistory.slice(0, 5).map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{scan.productName}</h4>
                    <p className="text-xs text-gray-600 truncate">{scan.code} • {scan.scannedBy}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {scan.scanType}
                      </span>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {scan.result}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className="text-sm font-medium text-gray-900">{scan.scanTime}</p>
                  <p className="text-xs text-gray-500">{scan.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Top Scanned Products</h3>
          <div className="space-y-4">
            {barcodes
              .sort((a, b) => b.scanCount - a.scanCount)
              .slice(0, 5)
              .map((barcode) => (
                <div key={barcode.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate">{barcode.productName}</span>
                    <span className="text-gray-900 font-medium">{barcode.scanCount} scans</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${Math.min((barcode.scanCount / Math.max(...barcodes.map(b => b.scanCount))) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{barcode.sku}</span>
                    <span className={`inline-flex px-2 py-1 rounded-full ${getCategoryColor(barcode.category)}`}>
                      {barcode.category}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowBarcodeModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Create Barcode
            </button>
            <button
              onClick={() => setShowGenerateModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Generate Barcodes
            </button>
            <button
              onClick={startScanner}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              Scan Barcode
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Barcode Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Use UPC-A for retail products</p>
            <p>• QR codes for equipment tracking</p>
            <p>• Regular inventory scans</p>
            <p>• Keep barcodes clean and visible</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Scanner Status:</span>
              <span className="text-green-600 font-medium">Ready</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Sync:</span>
              <span className="text-green-600 font-medium">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Print Service:</span>
              <span className="text-green-600 font-medium">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBarcodes = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-2xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search barcodes..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowBarcodeModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Create
          </button>
          <button 
            onClick={() => setShowGenerateModal(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Barcode Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredBarcodes.map((barcode) => (
          <div key={barcode.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{barcode.productName}</h3>
                <p className="text-xs text-gray-500">{barcode.type} • {barcode.sku}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(barcode.status)}`}>
                  {barcode.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(barcode.category)}`}>
                  {barcode.category}
                </span>
              </div>
            </div>

            {/* Barcode Display */}
            <div className="mb-3 p-3 bg-gray-50 rounded-lg text-center">
              <div className="font-mono text-lg font-bold text-gray-900 mb-1">{barcode.code}</div>
              <div className="h-8 bg-black bg-opacity-80 rounded flex items-center justify-center">
                <span className="text-white text-xs font-mono">||||| |||| |||||</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Stock:</span>
                <span className="text-gray-900 font-medium">{barcode.stock}</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="text-gray-900 font-medium">{formatCurrency(barcode.price)}</span>
              </div>
              <div className="flex justify-between">
                <span>Scans:</span>
                <span className="text-gray-900 font-medium">{barcode.scanCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Scan:</span>
                <span className="text-gray-900 font-medium">{formatDate(barcode.lastScanned)}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-gray-900 font-medium truncate">{barcode.location}</span>
              </div>
            </div>

            {barcode.batchNumber && (
              <div className="mb-3 text-xs">
                <span className="text-gray-500">Batch:</span>
                <span className="text-gray-900 font-medium ml-1">{barcode.batchNumber}</span>
                {barcode.expiryDate && (
                  <>
                    <span className="text-gray-500 ml-2">Expires:</span>
                    <span className="text-gray-900 font-medium ml-1">{formatDate(barcode.expiryDate)}</span>
                  </>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditBarcode(barcode)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              {barcode.status === 'Active' ? (
                <button 
                  onClick={() => handleDeactivateBarcode(barcode.id)}
                  className="text-xs px-2 py-1 text-orange-600 hover:text-orange-900 bg-orange-50 rounded"
                >
                  Deactivate
                </button>
              ) : (
                <button 
                  onClick={() => handleActivateBarcode(barcode.id)}
                  className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                >
                  Activate
                </button>
              )}
              <button 
                onClick={() => alert(`Printing barcode: ${barcode.code}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Print
              </button>
              <button 
                onClick={() => handleDeleteBarcode(barcode.id)}
                className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderScanner = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Barcode Scanner</h2>
        <p className="text-gray-600 mb-6">Use your device camera to scan barcodes</p>
        
        <div className="max-w-md mx-auto">
          {!scannerActive ? (
            <button
              onClick={startScanner}
              className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
            >
              Start Scanner
            </button>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-8 text-white">
                <p className="mb-4">Camera Active - Point at barcode</p>
                <div className="w-32 h-32 mx-auto border-2 border-white rounded-lg flex items-center justify-center">
                  <span className="text-sm">Scanning...</span>
                </div>
              </div>
              <button
                onClick={stopScanner}
                className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Stop Scanner
              </button>
            </div>
          )}
        </div>

        {scanResult && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">Scan Result</h3>
            <p className="text-green-800 font-mono">{scanResult}</p>
          </div>
        )}
      </div>

      {/* Recent Scans */}
      <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
        <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Recent Scans</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Scanned By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {scanHistory.slice(0, 10).map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{scan.productName}</div>
                    <div className="text-sm text-gray-500">{scan.scanType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">{scan.code}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{scan.scannedBy}</div>
                    <div className="text-sm text-gray-500">{scan.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{scan.scanDate}</div>
                    <div className="text-sm text-gray-500">{scan.scanTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      scan.result === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {scan.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Barcode Modal - Mobile Responsive
  const BarcodeModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingBarcode ? 'Edit Barcode' : 'Create New Barcode'}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Barcode *</label>
                <input
                  type="text"
                  value={barcodeForm.code}
                  onChange={(e) => setBarcodeForm({...barcodeForm, code: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="123456789012"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={barcodeForm.type}
                  onChange={(e) => setBarcodeForm({...barcodeForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {barcodeTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name *</label>
              <input
                type="text"
                value={barcodeForm.productName}
                onChange={(e) => setBarcodeForm({...barcodeForm, productName: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">SKU *</label>
                <input
                  type="text"
                  value={barcodeForm.sku}
                  onChange={(e) => setBarcodeForm({...barcodeForm, sku: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={barcodeForm.category}
                  onChange={(e) => setBarcodeForm({...barcodeForm, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <select
                value={barcodeForm.location}
                onChange={(e) => setBarcodeForm({...barcodeForm, location: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Select Location</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch Number</label>
                <input
                  type="text"
                  value={barcodeForm.batchNumber}
                  onChange={(e) => setBarcodeForm({...barcodeForm, batchNumber: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={barcodeForm.expiryDate}
                  onChange={(e) => setBarcodeForm({...barcodeForm, expiryDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={barcodeForm.price}
                  onChange={(e) => setBarcodeForm({...barcodeForm, price: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock</label>
                <input
                  type="number"
                  value={barcodeForm.stock}
                  onChange={(e) => setBarcodeForm({...barcodeForm, stock: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowBarcodeModal(false);
                setEditingBarcode(null);
                setBarcodeForm({
                  code: '',
                  type: 'UPC-A',
                  productId: '',
                  productName: '',
                  category: 'Flower',
                  sku: '',
                  location: '',
                  batchNumber: '',
                  expiryDate: '',
                  price: '',
                  stock: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingBarcode ? handleUpdateBarcode : handleCreateBarcode}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingBarcode ? 'Update' : 'Create'} Barcode
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Generate Modal - Mobile Responsive
  const GenerateModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-20 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Generate Barcodes</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Barcode Type</label>
              <select
                value={generateForm.type}
                onChange={(e) => setGenerateForm({...generateForm, type: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {barcodeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name *</label>
              <input
                type="text"
                value={generateForm.productName}
                onChange={(e) => setGenerateForm({...generateForm, productName: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={generateForm.category}
                  onChange={(e) => setGenerateForm({...generateForm, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={generateForm.quantity}
                  onChange={(e) => setGenerateForm({...generateForm, quantity: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SKU *</label>
              <input
                type="text"
                value={generateForm.sku}
                onChange={(e) => setGenerateForm({...generateForm, sku: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            {generateForm.type === 'UPC-A' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Prefix</label>
                <input
                  type="text"
                  value={generateForm.prefix}
                  onChange={(e) => setGenerateForm({...generateForm, prefix: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="123"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowGenerateModal(false);
                setGenerateForm({
                  type: 'UPC-A',
                  productName: '',
                  category: 'Flower',
                  sku: '',
                  quantity: 1,
                  prefix: '123'
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerateBarcodes}
              className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              Generate Barcodes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Scanner Modal - Mobile Responsive
  const ScanModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-10 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Barcode Scanner</h3>
          
          <div className="text-center">
            <div className="bg-gray-900 rounded-lg p-8 text-white mb-4">
              <p className="mb-4">Camera Active</p>
              <div className="w-32 h-32 mx-auto border-2 border-white rounded-lg flex items-center justify-center">
                <span className="text-sm">Scanning...</span>
              </div>
            </div>
            
            <button
              onClick={stopScanner}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
            >
              Stop Scanner
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Barcode Management</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Generate, scan, and manage product barcodes</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'barcodes', name: 'Barcodes', icon: '🏷️' },
            { id: 'scanner', name: 'Scanner', icon: '📱' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="overflow-hidden">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'barcodes' && renderBarcodes()}
        {activeTab === 'scanner' && renderScanner()}
      </div>

      {/* Modals */}
      {showBarcodeModal && <BarcodeModal />}
      {showGenerateModal && <GenerateModal />}
      {showScanModal && <ScanModal />}
    </div>
  );
};

export default EnhancedBarcodeModule;

