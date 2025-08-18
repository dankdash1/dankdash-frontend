import React, { useState, useEffect, useMemo } from 'react';

const EnhancedPurchaseModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [showPOModal, setShowPOModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showReceivingModal, setShowReceivingModal] = useState(false);
  const [editingPO, setEditingPO] = useState(null);
  const [editingVendor, setEditingVendor] = useState(null);
  const [selectedPO, setSelectedPO] = useState(null);

  // Form states
  const [poForm, setPOForm] = useState({
    vendor: '',
    orderDate: new Date().toISOString().split('T')[0],
    expectedDate: '',
    paymentTerms: 'Net 30',
    shippingMethod: 'Standard Delivery',
    notes: '',
    items: [{ product: '', quantity: 1, unit: 'units', unitPrice: 0 }]
  });

  const [vendorForm, setVendorForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    taxId: '',
    paymentTerms: 'Net 30',
    category: 'Cannabis Products',
    rating: 5,
    notes: ''
  });

  const [receivingForm, setReceivingForm] = useState({
    poId: '',
    receivedDate: new Date().toISOString().split('T')[0],
    receivedBy: '',
    items: [],
    notes: '',
    qualityCheck: true,
    documentsReceived: true
  });

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
        { id: 1, product: 'Premium OG Kush', quantity: 50, unit: 'oz', unitPrice: 200.00, total: 10000.00, received: 50 },
        { id: 2, product: 'Blue Dream', quantity: 25, unit: 'oz', unitPrice: 180.00, total: 4500.00, received: 25 },
        { id: 3, product: 'Packaging Supplies', quantity: 100, unit: 'units', unitPrice: 12.50, total: 1250.00, received: 100 }
      ],
      notes: 'Premium quality flower for retail sales',
      paymentTerms: 'Net 30',
      shippingMethod: 'Ground Delivery',
      createdBy: 'Sarah Johnson',
      approvedBy: 'Mike Chen',
      receivedBy: 'Alex Kim'
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
        { id: 1, product: 'Edible Gummies', quantity: 200, unit: 'packs', unitPrice: 25.00, total: 5000.00, received: 0 },
        { id: 2, product: 'Vape Cartridges', quantity: 100, unit: 'units', unitPrice: 35.00, total: 3500.00, received: 0 },
        { id: 3, product: 'CBD Oil', quantity: 20, unit: 'bottles', unitPrice: 70.00, total: 1400.00, received: 0 }
      ],
      notes: 'Monthly edibles and concentrates order',
      paymentTerms: 'Net 15',
      shippingMethod: 'Express Delivery',
      createdBy: 'John Doe',
      approvedBy: null,
      receivedBy: null
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
        { id: 1, product: 'Digital Scale', quantity: 2, unit: 'units', unitPrice: 450.00, total: 900.00, received: 2 },
        { id: 2, product: 'Storage Containers', quantity: 50, unit: 'units', unitPrice: 25.00, total: 1250.00, received: 50 },
        { id: 3, product: 'Security Cameras', quantity: 4, unit: 'units', unitPrice: 262.50, total: 1050.00, received: 4 }
      ],
      notes: 'Equipment upgrade for compliance',
      paymentTerms: 'Net 30',
      shippingMethod: 'Standard Delivery',
      createdBy: 'Lisa Rodriguez',
      approvedBy: 'Sarah Johnson',
      receivedBy: 'Tom Brown'
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
        { id: 1, product: 'Sativa Blend', quantity: 40, unit: 'oz', unitPrice: 220.00, total: 8800.00, received: 0 },
        { id: 2, product: 'Indica Blend', quantity: 30, unit: 'oz', unitPrice: 190.00, total: 5700.00, received: 0 }
      ],
      notes: 'Fall inventory restock',
      paymentTerms: 'Net 30',
      shippingMethod: 'Ground Delivery',
      createdBy: 'Emma Davis',
      approvedBy: null,
      receivedBy: null
    },
    {
      id: 'PO-005',
      orderNumber: 'PO-2024-005',
      vendor: 'Packaging Pro',
      vendorId: 'VEN-004',
      status: 'Approved',
      orderDate: '2024-08-14',
      expectedDate: '2024-08-28',
      deliveryDate: null,
      totalAmount: 2800.00,
      paidAmount: 0.00,
      currency: 'USD',
      items: [
        { id: 1, product: 'Child-Resistant Bags', quantity: 1000, unit: 'units', unitPrice: 1.50, total: 1500.00, received: 0 },
        { id: 2, product: 'Labels & Stickers', quantity: 500, unit: 'sheets', unitPrice: 2.60, total: 1300.00, received: 0 }
      ],
      notes: 'Compliance packaging materials',
      paymentTerms: 'Net 15',
      shippingMethod: 'Standard Delivery',
      createdBy: 'Alex Kim',
      approvedBy: 'Mike Chen',
      receivedBy: null
    }
  ]);

  const [vendors, setVendors] = useState([
    {
      id: 'VEN-001',
      name: 'Green Valley Farms',
      contactPerson: 'John Smith',
      email: 'john@greenvalleyfarms.com',
      phone: '(555) 123-4567',
      address: '123 Farm Road',
      city: 'Sacramento',
      state: 'CA',
      zipCode: '95814',
      taxId: 'TAX-001-GVF',
      paymentTerms: 'Net 30',
      category: 'Cannabis Products',
      rating: 5,
      totalOrders: 15,
      totalSpent: 125000.00,
      lastOrderDate: '2024-08-15',
      status: 'Active',
      notes: 'Premium flower supplier with excellent quality and reliability'
    },
    {
      id: 'VEN-002',
      name: 'Cannabis Supply Co',
      contactPerson: 'Maria Rodriguez',
      email: 'maria@cannabissupply.com',
      phone: '(555) 234-5678',
      address: '456 Supply Street',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      taxId: 'TAX-002-CSC',
      paymentTerms: 'Net 15',
      category: 'Edibles & Concentrates',
      rating: 4,
      totalOrders: 8,
      totalSpent: 67500.00,
      lastOrderDate: '2024-08-12',
      status: 'Active',
      notes: 'Reliable supplier for edibles and vape products'
    },
    {
      id: 'VEN-003',
      name: 'Equipment Solutions',
      contactPerson: 'David Wilson',
      email: 'david@equipmentsolutions.com',
      phone: '(555) 345-6789',
      address: '789 Equipment Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      taxId: 'TAX-003-ES',
      paymentTerms: 'Net 30',
      category: 'Equipment & Supplies',
      rating: 5,
      totalOrders: 12,
      totalSpent: 45000.00,
      lastOrderDate: '2024-08-05',
      status: 'Active',
      notes: 'Professional equipment supplier with excellent technical support'
    },
    {
      id: 'VEN-004',
      name: 'Packaging Pro',
      contactPerson: 'Lisa Chen',
      email: 'lisa@packagingpro.com',
      phone: '(555) 456-7890',
      address: '321 Package Blvd',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94601',
      taxId: 'TAX-004-PP',
      paymentTerms: 'Net 15',
      category: 'Packaging & Labels',
      rating: 4,
      totalOrders: 6,
      totalSpent: 18500.00,
      lastOrderDate: '2024-08-14',
      status: 'Active',
      notes: 'Compliance-focused packaging solutions'
    },
    {
      id: 'VEN-005',
      name: 'Security Systems Inc',
      contactPerson: 'Robert Taylor',
      email: 'robert@securitysystems.com',
      phone: '(555) 567-8901',
      address: '654 Security Way',
      city: 'San Diego',
      state: 'CA',
      zipCode: '92101',
      taxId: 'TAX-005-SSI',
      paymentTerms: 'Net 30',
      category: 'Security & Compliance',
      rating: 5,
      totalOrders: 4,
      totalSpent: 28000.00,
      lastOrderDate: '2024-07-20',
      status: 'Active',
      notes: 'Specialized in cannabis facility security systems'
    }
  ]);

  const [receivingRecords, setReceivingRecords] = useState([
    {
      id: 'REC-001',
      poId: 'PO-001',
      poNumber: 'PO-2024-001',
      vendor: 'Green Valley Farms',
      receivedDate: '2024-08-18',
      receivedBy: 'Alex Kim',
      totalItems: 3,
      receivedItems: 3,
      qualityCheck: true,
      documentsReceived: true,
      notes: 'All items received in excellent condition',
      status: 'Complete'
    },
    {
      id: 'REC-002',
      poId: 'PO-003',
      poNumber: 'PO-2024-003',
      vendor: 'Equipment Solutions',
      receivedDate: '2024-08-14',
      receivedBy: 'Tom Brown',
      totalItems: 3,
      receivedItems: 3,
      qualityCheck: true,
      documentsReceived: true,
      notes: 'Equipment tested and operational',
      status: 'Complete'
    }
  ]);

  // Filter functions
  const filteredPurchaseOrders = useMemo(() => {
    return purchaseOrders.filter(po => {
      const matchesSearch = po.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           po.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           po.notes.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || po.status.toLowerCase().replace(' ', '-') === selectedStatus;
      const matchesVendor = selectedVendor === 'all' || po.vendorId === selectedVendor;
      
      return matchesSearch && matchesStatus && matchesVendor;
    });
  }, [purchaseOrders, searchTerm, selectedStatus, selectedVendor]);

  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [vendors, searchTerm]);

  // Purchase Order CRUD Operations
  const handleAddPO = () => {
    if (!poForm.vendor || poForm.items.length === 0) {
      alert('Please select a vendor and add at least one item');
      return;
    }

    // Calculate total amount
    const totalAmount = poForm.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    const newPO = {
      id: `PO-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      orderNumber: `PO-2024-${String(purchaseOrders.length + 1).padStart(3, '0')}`,
      vendor: vendors.find(v => v.id === poForm.vendor)?.name || '',
      vendorId: poForm.vendor,
      status: 'Draft',
      orderDate: poForm.orderDate,
      expectedDate: poForm.expectedDate,
      deliveryDate: null,
      totalAmount,
      paidAmount: 0.00,
      currency: 'USD',
      items: poForm.items.map((item, index) => ({
        id: index + 1,
        ...item,
        total: item.quantity * item.unitPrice,
        received: 0
      })),
      notes: poForm.notes,
      paymentTerms: poForm.paymentTerms,
      shippingMethod: poForm.shippingMethod,
      createdBy: 'Current User',
      approvedBy: null,
      receivedBy: null
    };

    setPurchaseOrders([...purchaseOrders, newPO]);
    setPOForm({
      vendor: '',
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate: '',
      paymentTerms: 'Net 30',
      shippingMethod: 'Standard Delivery',
      notes: '',
      items: [{ product: '', quantity: 1, unit: 'units', unitPrice: 0 }]
    });
    setShowPOModal(false);
    alert('Purchase Order created successfully!');
  };

  const handleEditPO = (po) => {
    setEditingPO(po);
    setPOForm({
      vendor: po.vendorId,
      orderDate: po.orderDate,
      expectedDate: po.expectedDate,
      paymentTerms: po.paymentTerms,
      shippingMethod: po.shippingMethod,
      notes: po.notes,
      items: po.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        unit: item.unit,
        unitPrice: item.unitPrice
      }))
    });
    setShowPOModal(true);
  };

  const handleUpdatePO = () => {
    if (!poForm.vendor || poForm.items.length === 0) {
      alert('Please select a vendor and add at least one item');
      return;
    }

    const totalAmount = poForm.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    
    const updatedPOs = purchaseOrders.map(po =>
      po.id === editingPO.id
        ? {
            ...po,
            vendor: vendors.find(v => v.id === poForm.vendor)?.name || '',
            vendorId: poForm.vendor,
            orderDate: poForm.orderDate,
            expectedDate: poForm.expectedDate,
            totalAmount,
            items: poForm.items.map((item, index) => ({
              id: index + 1,
              ...item,
              total: item.quantity * item.unitPrice,
              received: po.items[index]?.received || 0
            })),
            notes: poForm.notes,
            paymentTerms: poForm.paymentTerms,
            shippingMethod: poForm.shippingMethod
          }
        : po
    );

    setPurchaseOrders(updatedPOs);
    setEditingPO(null);
    setPOForm({
      vendor: '',
      orderDate: new Date().toISOString().split('T')[0],
      expectedDate: '',
      paymentTerms: 'Net 30',
      shippingMethod: 'Standard Delivery',
      notes: '',
      items: [{ product: '', quantity: 1, unit: 'units', unitPrice: 0 }]
    });
    setShowPOModal(false);
    alert('Purchase Order updated successfully!');
  };

  const handleDeletePO = (poId) => {
    if (window.confirm('Are you sure you want to delete this Purchase Order?')) {
      setPurchaseOrders(purchaseOrders.filter(po => po.id !== poId));
      alert('Purchase Order deleted successfully!');
    }
  };

  const handleApprovePO = (poId) => {
    if (window.confirm('Are you sure you want to approve this Purchase Order?')) {
      const updatedPOs = purchaseOrders.map(po =>
        po.id === poId
          ? { ...po, status: 'Approved', approvedBy: 'Current User' }
          : po
      );
      setPurchaseOrders(updatedPOs);
      alert('Purchase Order approved successfully!');
    }
  };

  const handleSendPO = (poId) => {
    if (window.confirm('Are you sure you want to send this Purchase Order to the vendor?')) {
      const updatedPOs = purchaseOrders.map(po =>
        po.id === poId
          ? { ...po, status: 'Confirmed' }
          : po
      );
      setPurchaseOrders(updatedPOs);
      alert('Purchase Order sent to vendor successfully!');
    }
  };

  // Vendor CRUD Operations
  const handleAddVendor = () => {
    if (!vendorForm.name || !vendorForm.contactPerson || !vendorForm.email) {
      alert('Please fill in required fields (Name, Contact Person, and Email)');
      return;
    }

    const newVendor = {
      id: `VEN-${String(vendors.length + 1).padStart(3, '0')}`,
      ...vendorForm,
      totalOrders: 0,
      totalSpent: 0.00,
      lastOrderDate: null,
      status: 'Active'
    };

    setVendors([...vendors, newVendor]);
    setVendorForm({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      taxId: '',
      paymentTerms: 'Net 30',
      category: 'Cannabis Products',
      rating: 5,
      notes: ''
    });
    setShowVendorModal(false);
    alert('Vendor added successfully!');
  };

  const handleEditVendor = (vendor) => {
    setEditingVendor(vendor);
    setVendorForm({
      name: vendor.name,
      contactPerson: vendor.contactPerson,
      email: vendor.email,
      phone: vendor.phone,
      address: vendor.address,
      city: vendor.city,
      state: vendor.state,
      zipCode: vendor.zipCode,
      taxId: vendor.taxId,
      paymentTerms: vendor.paymentTerms,
      category: vendor.category,
      rating: vendor.rating,
      notes: vendor.notes
    });
    setShowVendorModal(true);
  };

  const handleUpdateVendor = () => {
    if (!vendorForm.name || !vendorForm.contactPerson || !vendorForm.email) {
      alert('Please fill in required fields (Name, Contact Person, and Email)');
      return;
    }

    const updatedVendors = vendors.map(vendor =>
      vendor.id === editingVendor.id
        ? { ...vendor, ...vendorForm }
        : vendor
    );

    setVendors(updatedVendors);
    setEditingVendor(null);
    setVendorForm({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      taxId: '',
      paymentTerms: 'Net 30',
      category: 'Cannabis Products',
      rating: 5,
      notes: ''
    });
    setShowVendorModal(false);
    alert('Vendor updated successfully!');
  };

  const handleDeleteVendor = (vendorId) => {
    const hasOrders = purchaseOrders.some(po => po.vendorId === vendorId);
    if (hasOrders) {
      alert('Cannot delete vendor with existing purchase orders. Please archive instead.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(vendor => vendor.id !== vendorId));
      alert('Vendor deleted successfully!');
    }
  };

  // Receiving Operations
  const handleReceiveItems = (po) => {
    setSelectedPO(po);
    setReceivingForm({
      poId: po.id,
      receivedDate: new Date().toISOString().split('T')[0],
      receivedBy: 'Current User',
      items: po.items.map(item => ({
        ...item,
        receivedQuantity: item.quantity - item.received,
        condition: 'Good'
      })),
      notes: '',
      qualityCheck: true,
      documentsReceived: true
    });
    setShowReceivingModal(true);
  };

  const handleCompleteReceiving = () => {
    if (!receivingForm.receivedBy) {
      alert('Please specify who received the items');
      return;
    }

    // Update purchase order with received quantities
    const updatedPOs = purchaseOrders.map(po => {
      if (po.id === receivingForm.poId) {
        const updatedItems = po.items.map(item => {
          const receivingItem = receivingForm.items.find(ri => ri.id === item.id);
          return {
            ...item,
            received: item.received + (receivingItem?.receivedQuantity || 0)
          };
        });

        const allReceived = updatedItems.every(item => item.received >= item.quantity);
        
        return {
          ...po,
          items: updatedItems,
          status: allReceived ? 'Delivered' : 'Partially Received',
          deliveryDate: allReceived ? receivingForm.receivedDate : po.deliveryDate,
          receivedBy: receivingForm.receivedBy
        };
      }
      return po;
    });

    setPurchaseOrders(updatedPOs);

    // Add receiving record
    const newReceiving = {
      id: `REC-${String(receivingRecords.length + 1).padStart(3, '0')}`,
      poId: receivingForm.poId,
      poNumber: selectedPO.orderNumber,
      vendor: selectedPO.vendor,
      receivedDate: receivingForm.receivedDate,
      receivedBy: receivingForm.receivedBy,
      totalItems: receivingForm.items.length,
      receivedItems: receivingForm.items.filter(item => item.receivedQuantity > 0).length,
      qualityCheck: receivingForm.qualityCheck,
      documentsReceived: receivingForm.documentsReceived,
      notes: receivingForm.notes,
      status: 'Complete'
    };

    setReceivingRecords([...receivingRecords, newReceiving]);
    setShowReceivingModal(false);
    setSelectedPO(null);
    alert('Items received successfully!');
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Approved': return 'bg-blue-100 text-blue-800';
      case 'Confirmed': return 'bg-yellow-100 text-yellow-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Partially Received': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  // Dashboard calculations
  const totalPOs = purchaseOrders.length;
  const pendingPOs = purchaseOrders.filter(po => po.status === 'Pending' || po.status === 'Confirmed').length;
  const totalSpent = purchaseOrders.reduce((sum, po) => sum + po.paidAmount, 0);
  const totalCommitted = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0);
  const activeVendors = vendors.filter(v => v.status === 'Active').length;
  const overdueDeliveries = purchaseOrders.filter(po => 
    po.status !== 'Delivered' && 
    po.expectedDate && 
    new Date(po.expectedDate) < new Date()
  ).length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Purchase Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalPOs}</p>
              <p className="text-sm text-blue-600">{pendingPOs} pending</p>
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
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpent)}</p>
              <p className="text-sm text-green-600">of {formatCurrency(totalCommitted)} committed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Vendors</p>
              <p className="text-2xl font-bold text-gray-900">{activeVendors}</p>
              <p className="text-sm text-purple-600">{vendors.length} total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">{overdueDeliveries}</p>
              <p className="text-sm text-orange-600">Need attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Purchase Orders */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Purchase Orders</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {purchaseOrders.slice(0, 5).map((po) => (
              <div key={po.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{po.orderNumber}</h4>
                  <p className="text-sm text-gray-600">{po.vendor} • {po.items.length} items</p>
                  <p className="text-sm text-gray-500">Expected: {po.expectedDate}</p>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{formatCurrency(po.totalAmount)}</p>
                    <p className="text-gray-500">Total</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(po.status)}`}>
                    {po.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Vendors */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Vendors</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {vendors.slice(0, 5).map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                  <p className="text-sm text-gray-600">{vendor.category} • {vendor.contactPerson}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{vendor.totalOrders}</p>
                    <p className="text-gray-500 text-xs">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{formatCurrency(vendor.totalSpent)}</p>
                    <p className="text-gray-500 text-xs">Spent</p>
                  </div>
                  <span className="text-sm">{getRatingStars(vendor.rating)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowPOModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left"
            >
              Create Purchase Order
            </button>
            <button
              onClick={() => setShowVendorModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left"
            >
              Add New Vendor
            </button>
            <button
              onClick={() => alert('Receiving workflow opened')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left"
            >
              Receive Items
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Procurement Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Maintain 2-3 suppliers per product category</p>
            <p>• Review vendor performance quarterly</p>
            <p>• Negotiate better terms for bulk orders</p>
            <p>• Keep compliance documentation updated</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Alerts</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">All vendors licensed ✓</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">Tax documents current ✓</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-600">2 contracts expire soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPurchaseOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg flex space-x-4">
          <input
            type="text"
            placeholder="Search purchase orders..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="approved">Approved</option>
            <option value="confirmed">Confirmed</option>
            <option value="delivered">Delivered</option>
            <option value="partially-received">Partially Received</option>
            <option value="pending">Pending</option>
          </select>
          <select
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Vendors</option>
            {vendors.map(vendor => (
              <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
            ))}
          </select>
        </div>
        <button 
          onClick={() => setShowPOModal(true)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create PO
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPurchaseOrders.map((po) => (
              <tr key={po.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{po.orderNumber}</div>
                    <div className="text-sm text-gray-500">{po.items.length} items</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {po.vendor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{po.orderDate}</div>
                  <div className="text-sm text-gray-500">Expected: {po.expectedDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(po.totalAmount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(po.status)}`}>
                    {po.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert(`Viewing PO: ${po.orderNumber}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleEditPO(po)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    {po.status === 'Draft' && (
                      <button 
                        onClick={() => handleApprovePO(po.id)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Approve
                      </button>
                    )}
                    {po.status === 'Approved' && (
                      <button 
                        onClick={() => handleSendPO(po.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Send
                      </button>
                    )}
                    {(po.status === 'Confirmed' || po.status === 'Partially Received') && (
                      <button 
                        onClick={() => handleReceiveItems(po)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Receive
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeletePO(po.id)}
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
  );

  const renderVendors = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search vendors..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowVendorModal(true)}
          className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add Vendor
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-1">{vendor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
                <p className="text-sm text-gray-500">{vendor.contactPerson}</p>
              </div>
              <span className="text-sm">{getRatingStars(vendor.rating)}</span>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{vendor.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="text-gray-900">{vendor.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Terms:</span>
                <span className="text-gray-900">{vendor.paymentTerms}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Orders:</span>
                <span className="text-gray-900">{vendor.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Spent:</span>
                <span className="text-gray-900">{formatCurrency(vendor.totalSpent)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Last Order: {vendor.lastOrderDate || 'Never'}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Viewing vendor: ${vendor.name}`)}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEditVendor(vendor)}
                  className="text-green-600 hover:text-green-900 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteVendor(vendor.id)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReceiving = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Receiving Records</h3>
        <button 
          onClick={() => alert('Receiving workflow opened')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          New Receiving
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received By</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {receivingRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.poNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.vendor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.receivedDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.receivedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.receivedItems}/{record.totalItems}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Purchase Order Modal
  const POModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-6xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingPO ? 'Edit Purchase Order' : 'Create Purchase Order'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor *</label>
              <select
                value={poForm.vendor}
                onChange={(e) => setPOForm({...poForm, vendor: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Vendor</option>
                {vendors.map(vendor => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name} - {vendor.category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Order Date</label>
              <input
                type="date"
                value={poForm.orderDate}
                onChange={(e) => setPOForm({...poForm, orderDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
              <input
                type="date"
                value={poForm.expectedDate}
                onChange={(e) => setPOForm({...poForm, expectedDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
              <select
                value={poForm.paymentTerms}
                onChange={(e) => setPOForm({...poForm, paymentTerms: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 60">Net 60</option>
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="COD">COD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Shipping Method</label>
              <select
                value={poForm.shippingMethod}
                onChange={(e) => setPOForm({...poForm, shippingMethod: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Standard Delivery">Standard Delivery</option>
                <option value="Express Delivery">Express Delivery</option>
                <option value="Ground Delivery">Ground Delivery</option>
                <option value="Overnight">Overnight</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
            <div className="space-y-3">
              {poForm.items.map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-3 p-3 border border-gray-200 rounded-lg">
                  <div>
                    <input
                      type="text"
                      placeholder="Product name"
                      value={item.product}
                      onChange={(e) => {
                        const newItems = [...poForm.items];
                        newItems[index].product = e.target.value;
                        setPOForm({...poForm, items: newItems});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...poForm.items];
                        newItems[index].quantity = parseInt(e.target.value) || 0;
                        setPOForm({...poForm, items: newItems});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <select
                      value={item.unit}
                      onChange={(e) => {
                        const newItems = [...poForm.items];
                        newItems[index].unit = e.target.value;
                        setPOForm({...poForm, items: newItems});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="units">Units</option>
                      <option value="oz">Ounces</option>
                      <option value="lbs">Pounds</option>
                      <option value="grams">Grams</option>
                      <option value="packs">Packs</option>
                      <option value="bottles">Bottles</option>
                      <option value="sheets">Sheets</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Unit price"
                      value={item.unitPrice}
                      onChange={(e) => {
                        const newItems = [...poForm.items];
                        newItems[index].unitPrice = parseFloat(e.target.value) || 0;
                        setPOForm({...poForm, items: newItems});
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const newItems = poForm.items.filter((_, i) => i !== index);
                        setPOForm({...poForm, items: newItems});
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setPOForm({
                  ...poForm,
                  items: [...poForm.items, { product: '', quantity: 1, unit: 'units', unitPrice: 0 }]
                });
              }}
              className="mt-3 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Add Item
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={poForm.notes}
              onChange={(e) => setPOForm({...poForm, notes: e.target.value})}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Additional notes or special instructions..."
            />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-medium text-gray-900">
              Total: {formatCurrency(poForm.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowPOModal(false);
                setEditingPO(null);
                setPOForm({
                  vendor: '',
                  orderDate: new Date().toISOString().split('T')[0],
                  expectedDate: '',
                  paymentTerms: 'Net 30',
                  shippingMethod: 'Standard Delivery',
                  notes: '',
                  items: [{ product: '', quantity: 1, unit: 'units', unitPrice: 0 }]
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingPO ? handleUpdatePO : handleAddPO}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingPO ? 'Update' : 'Create'} Purchase Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Vendor Modal
  const VendorModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name *</label>
              <input
                type="text"
                value={vendorForm.name}
                onChange={(e) => setVendorForm({...vendorForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person *</label>
              <input
                type="text"
                value={vendorForm.contactPerson}
                onChange={(e) => setVendorForm({...vendorForm, contactPerson: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={vendorForm.email}
                onChange={(e) => setVendorForm({...vendorForm, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={vendorForm.phone}
                onChange={(e) => setVendorForm({...vendorForm, phone: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                value={vendorForm.address}
                onChange={(e) => setVendorForm({...vendorForm, address: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                value={vendorForm.city}
                onChange={(e) => setVendorForm({...vendorForm, city: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                value={vendorForm.state}
                onChange={(e) => setVendorForm({...vendorForm, state: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
              <input
                type="text"
                value={vendorForm.zipCode}
                onChange={(e) => setVendorForm({...vendorForm, zipCode: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax ID</label>
              <input
                type="text"
                value={vendorForm.taxId}
                onChange={(e) => setVendorForm({...vendorForm, taxId: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
              <select
                value={vendorForm.paymentTerms}
                onChange={(e) => setVendorForm({...vendorForm, paymentTerms: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Net 15">Net 15</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 60">Net 60</option>
                <option value="Due on Receipt">Due on Receipt</option>
                <option value="COD">COD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={vendorForm.category}
                onChange={(e) => setVendorForm({...vendorForm, category: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Cannabis Products">Cannabis Products</option>
                <option value="Edibles & Concentrates">Edibles & Concentrates</option>
                <option value="Equipment & Supplies">Equipment & Supplies</option>
                <option value="Packaging & Labels">Packaging & Labels</option>
                <option value="Security & Compliance">Security & Compliance</option>
                <option value="Professional Services">Professional Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                value={vendorForm.rating}
                onChange={(e) => setVendorForm({...vendorForm, rating: parseInt(e.target.value)})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value={5}>5 Stars - Excellent</option>
                <option value={4}>4 Stars - Good</option>
                <option value={3}>3 Stars - Average</option>
                <option value={2}>2 Stars - Below Average</option>
                <option value={1}>1 Star - Poor</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={vendorForm.notes}
              onChange={(e) => setVendorForm({...vendorForm, notes: e.target.value})}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Additional notes about this vendor..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowVendorModal(false);
                setEditingVendor(null);
                setVendorForm({
                  name: '',
                  contactPerson: '',
                  email: '',
                  phone: '',
                  address: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  taxId: '',
                  paymentTerms: 'Net 30',
                  category: 'Cannabis Products',
                  rating: 5,
                  notes: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingVendor ? handleUpdateVendor : handleAddVendor}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {editingVendor ? 'Update' : 'Add'} Vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Receiving Modal
  const ReceivingModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-5xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Receive Items - {selectedPO?.orderNumber}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Received Date</label>
              <input
                type="date"
                value={receivingForm.receivedDate}
                onChange={(e) => setReceivingForm({...receivingForm, receivedDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Received By</label>
              <input
                type="text"
                value={receivingForm.receivedBy}
                onChange={(e) => setReceivingForm({...receivingForm, receivedBy: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex items-center space-x-4 pt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={receivingForm.qualityCheck}
                  onChange={(e) => setReceivingForm({...receivingForm, qualityCheck: e.target.checked})}
                  className="mr-2"
                />
                Quality Check
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={receivingForm.documentsReceived}
                  onChange={(e) => setReceivingForm({...receivingForm, documentsReceived: e.target.checked})}
                  className="mr-2"
                />
                Documents
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Items to Receive</label>
            <div className="space-y-3">
              {receivingForm.items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="md:col-span-2">
                    <p className="font-medium text-gray-900">{item.product}</p>
                    <p className="text-sm text-gray-500">Ordered: {item.quantity} {item.unit}</p>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Received Qty</label>
                    <input
                      type="number"
                      value={item.receivedQuantity}
                      onChange={(e) => {
                        const newItems = [...receivingForm.items];
                        newItems[index].receivedQuantity = parseInt(e.target.value) || 0;
                        setReceivingForm({...receivingForm, items: newItems});
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      max={item.quantity - item.received}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Condition</label>
                    <select
                      value={item.condition}
                      onChange={(e) => {
                        const newItems = [...receivingForm.items];
                        newItems[index].condition = e.target.value;
                        setReceivingForm({...receivingForm, items: newItems});
                      }}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="Good">Good</option>
                      <option value="Damaged">Damaged</option>
                      <option value="Expired">Expired</option>
                      <option value="Partial">Partial</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Unit Price</p>
                    <p className="font-medium">{formatCurrency(item.unitPrice)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Value</p>
                    <p className="font-medium">{formatCurrency(item.receivedQuantity * item.unitPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Receiving Notes</label>
            <textarea
              value={receivingForm.notes}
              onChange={(e) => setReceivingForm({...receivingForm, notes: e.target.value})}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="Notes about the received items, condition, discrepancies, etc..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowReceivingModal(false);
                setSelectedPO(null);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleCompleteReceiving}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Complete Receiving
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Purchase Management</h1>
        <p className="mt-2 text-gray-600">Manage purchase orders, vendors, and procurement processes</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'purchase-orders', name: 'Purchase Orders', icon: '📋' },
            { id: 'vendors', name: 'Vendors', icon: '🏢' },
            { id: 'receiving', name: 'Receiving', icon: '📦' },
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
      {activeTab === 'purchase-orders' && renderPurchaseOrders()}
      {activeTab === 'vendors' && renderVendors()}
      {activeTab === 'receiving' && renderReceiving()}
      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Purchase Reports</h3>
          <p className="text-gray-600">Advanced reporting coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showPOModal && <POModal />}
      {showVendorModal && <VendorModal />}
      {showReceivingModal && <ReceivingModal />}
    </div>
  );
};

export default EnhancedPurchaseModule;

