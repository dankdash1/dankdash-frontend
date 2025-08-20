import React, { useState, useEffect } from 'react';
import { useIntegration } from './IntegrationHub';
import DigitalSignatureModule from './DigitalSignatureModule';

const EnhancedDriverAppModule = () => {
  const { state: integrationState, workflows, INTEGRATION_ACTIONS } = useIntegration();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureType, setSignatureType] = useState('driver'); // 'driver' or 'customer'
  const [currentManifest, setCurrentManifest] = useState(null);
  const [signatures, setSignatures] = useState({});
  const [deliveryTimestamps, setDeliveryTimestamps] = useState({});
  const [currentLocation, setCurrentLocation] = useState(null);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: new Date().toISOString()
          });
        },
        (error) => console.log('Location access denied:', error)
      );
    }
  }, []);
  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  // Enhanced driver data with Uber-style functionality
  const [drivers, setDrivers] = useState([
    {
      id: 'DRV-001',
      name: 'Michael Rodriguez',
      email: 'michael.rodriguez@email.com',
      phone: '+1-555-0101',
      status: 'Online',
      availability: 'Available',
      location: {
        lat: 37.7749,
        lng: -122.4194,
        address: '123 Market St, San Francisco, CA'
      },
      vehicle: {
        type: 'Car',
        make: 'Toyota',
        model: 'Prius',
        year: 2022,
        licensePlate: 'ABC123',
        color: 'White'
      },
      documents: {
        driversLicense: 'Verified',
        insurance: 'Verified',
        registration: 'Verified',
        backgroundCheck: 'Passed',
        cannabisLicense: 'Verified'
      },
      performance: {
        rating: 4.9,
        totalDeliveries: 1247,
        completionRate: 98.5,
        onTimeRate: 96.2,
        customerRating: 4.8,
        totalEarnings: 15680.50
      },
      currentOrder: null,
      zone: 'Downtown',
      shiftStart: '2024-08-14T08:00:00Z',
      shiftEnd: null,
      earnings: {
        today: 156.75,
        week: 892.40,
        month: 3247.80
      },
      createdAt: '2024-01-15',
      lastActive: '2024-08-14T10:30:00Z'
    },
    {
      id: 'DRV-002',
      name: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+1-555-0102',
      status: 'Online',
      availability: 'On Delivery',
      location: {
        lat: 37.7849,
        lng: -122.4094,
        address: '456 Mission St, San Francisco, CA'
      },
      vehicle: {
        type: 'Bike',
        make: 'Trek',
        model: 'Electric',
        year: 2023,
        licensePlate: 'N/A',
        color: 'Black'
      },
      documents: {
        driversLicense: 'Verified',
        insurance: 'Verified',
        registration: 'N/A',
        backgroundCheck: 'Passed',
        cannabisLicense: 'Verified'
      },
      performance: {
        rating: 4.7,
        totalDeliveries: 892,
        completionRate: 97.8,
        onTimeRate: 94.5,
        customerRating: 4.6,
        totalEarnings: 11240.25
      },
      currentOrder: 'ORD-2024-001',
      zone: 'Mission',
      shiftStart: '2024-08-14T09:00:00Z',
      shiftEnd: null,
      earnings: {
        today: 89.50,
        week: 645.30,
        month: 2890.75
      },
      createdAt: '2024-02-01',
      lastActive: '2024-08-14T10:25:00Z'
    },
    {
      id: 'DRV-003',
      name: 'David Thompson',
      email: 'david.thompson@email.com',
      phone: '+1-555-0103',
      status: 'Offline',
      availability: 'Offline',
      location: {
        lat: 37.7649,
        lng: -122.4294,
        address: '789 Castro St, San Francisco, CA'
      },
      vehicle: {
        type: 'Scooter',
        make: 'Vespa',
        model: 'Primavera',
        year: 2021,
        licensePlate: 'XYZ789',
        color: 'Blue'
      },
      documents: {
        driversLicense: 'Verified',
        insurance: 'Expired',
        registration: 'Verified',
        backgroundCheck: 'Passed',
        cannabisLicense: 'Pending'
      },
      performance: {
        rating: 4.3,
        totalDeliveries: 456,
        completionRate: 95.2,
        onTimeRate: 91.8,
        customerRating: 4.2,
        totalEarnings: 6890.75
      },
      currentOrder: null,
      zone: 'Castro',
      shiftStart: null,
      shiftEnd: '2024-08-14T06:00:00Z',
      earnings: {
        today: 0,
        week: 234.50,
        month: 1456.25
      },
      createdAt: '2024-03-15',
      lastActive: '2024-08-14T06:00:00Z'
    },
    {
      id: 'DRV-004',
      name: 'Lisa Park',
      email: 'lisa.park@email.com',
      phone: '+1-555-0104',
      status: 'Online',
      availability: 'Break',
      location: {
        lat: 37.7549,
        lng: -122.4394,
        address: '321 Valencia St, San Francisco, CA'
      },
      vehicle: {
        type: 'Car',
        make: 'Honda',
        model: 'Civic',
        year: 2020,
        licensePlate: 'DEF456',
        color: 'Silver'
      },
      documents: {
        driversLicense: 'Verified',
        insurance: 'Verified',
        registration: 'Verified',
        backgroundCheck: 'Passed',
        cannabisLicense: 'Verified'
      },
      performance: {
        rating: 4.8,
        totalDeliveries: 1089,
        completionRate: 99.1,
        onTimeRate: 97.5,
        customerRating: 4.9,
        totalEarnings: 13567.90
      },
      currentOrder: null,
      zone: 'Mission',
      shiftStart: '2024-08-14T07:30:00Z',
      shiftEnd: null,
      earnings: {
        today: 124.25,
        week: 756.80,
        month: 2987.45
      },
      createdAt: '2024-01-20',
      lastActive: '2024-08-14T10:15:00Z'
    },
    {
      id: 'DRV-005',
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '+1-555-0105',
      status: 'Online',
      availability: 'Available',
      location: {
        lat: 37.7449,
        lng: -122.4494,
        address: '654 Haight St, San Francisco, CA'
      },
      vehicle: {
        type: 'Car',
        make: 'Tesla',
        model: 'Model 3',
        year: 2023,
        licensePlate: 'GHI789',
        color: 'Red'
      },
      documents: {
        driversLicense: 'Verified',
        insurance: 'Verified',
        registration: 'Verified',
        backgroundCheck: 'Passed',
        cannabisLicense: 'Verified'
      },
      performance: {
        rating: 4.6,
        totalDeliveries: 723,
        completionRate: 96.8,
        onTimeRate: 93.7,
        customerRating: 4.5,
        totalEarnings: 9876.40
      },
      currentOrder: null,
      zone: 'Haight',
      shiftStart: '2024-08-14T10:00:00Z',
      shiftEnd: null,
      earnings: {
        today: 45.75,
        week: 567.20,
        month: 2134.60
      },
      createdAt: '2024-04-01',
      lastActive: '2024-08-14T10:28:00Z'
    }
  ]);

  // Get orders from integration state instead of static data
  const orders = integrationState.orders.length > 0 ? integrationState.orders : [
    {
      id: 'ORD-2024-001',
      customer: {
        name: 'John Smith',
        phone: '+1-555-1001',
        address: '123 Pine St, San Francisco, CA 94108'
      },
      items: [
        { name: 'Blue Dream (3.5g)', quantity: 1, price: 45.00 },
        { name: 'Sour Diesel (1g)', quantity: 2, price: 25.00 }
      ],
      total: 95.00,
      deliveryFee: 5.00,
      tip: 12.00,
      status: 'In Transit',
      assignedDriver: 'DRV-002',
      pickupLocation: '789 Dispensary Ave, San Francisco, CA',
      deliveryLocation: '123 Pine St, San Francisco, CA 94108',
      estimatedDelivery: '2024-08-14T11:15:00Z',
      orderTime: '2024-08-14T10:00:00Z',
      pickupTime: '2024-08-14T10:30:00Z',
      priority: 'Standard',
      distance: 2.3,
      estimatedDuration: 15,
      metrcManifest: {
        manifestNumber: 'DC-2024-001234',
        status: 'Pending Signature',
        requiresSignature: true,
        signedAt: null,
        signatureData: null
      }
    },
    {
      id: 'ORD-2024-002',
      customer: {
        name: 'Emily Davis',
        phone: '+1-555-1002',
        address: '456 Oak St, San Francisco, CA 94102'
      },
      items: [
        { name: 'OG Kush (7g)', quantity: 1, price: 85.00 },
        { name: 'Edible Gummies', quantity: 1, price: 30.00 }
      ],
      total: 115.00,
      deliveryFee: 5.00,
      tip: 15.00,
      status: 'Pending Assignment',
      assignedDriver: null,
      pickupLocation: '789 Dispensary Ave, San Francisco, CA',
      deliveryLocation: '456 Oak St, San Francisco, CA 94102',
      estimatedDelivery: null,
      orderTime: '2024-08-14T10:45:00Z',
      pickupTime: null,
      priority: 'High',
      distance: 3.1,
      estimatedDuration: 20,
      metrcManifest: {
        manifestNumber: 'DC-2024-001235',
        status: 'Generated',
        requiresSignature: true,
        signedAt: null,
        signatureData: null
      }
    },
    {
      id: 'ORD-2024-003',
      customer: {
        name: 'Robert Johnson',
        phone: '+1-555-1003',
        address: '789 Market St, San Francisco, CA 94103'
      },
      items: [
        { name: 'Purple Haze (3.5g)', quantity: 2, price: 50.00 },
        { name: 'Vape Cartridge', quantity: 1, price: 40.00 }
      ],
      total: 140.00,
      deliveryFee: 5.00,
      tip: 18.00,
      status: 'Ready for Pickup',
      assignedDriver: null,
      pickupLocation: '789 Dispensary Ave, San Francisco, CA',
      deliveryLocation: '789 Market St, San Francisco, CA 94103',
      estimatedDelivery: null,
      orderTime: '2024-08-14T10:50:00Z',
      pickupTime: null,
      priority: 'Standard',
      distance: 1.8,
      estimatedDuration: 12,
      metrcManifest: {
        manifestNumber: 'DC-2024-001236',
        status: 'Generated',
        requiresSignature: true,
        signedAt: null,
        signatureData: null
      }
    }
  ];

  const [analytics, setAnalytics] = useState({
    totalDrivers: 5,
    onlineDrivers: 4,
    availableDrivers: 2,
    activeDeliveries: 1,
    pendingOrders: 2,
    completedToday: 23,
    averageDeliveryTime: 18,
    customerSatisfaction: 4.7,
    totalEarnings: 2847.65,
    averageEarnings: 569.53,
    topPerformer: 'Michael Rodriguez',
    busyZones: ['Downtown', 'Mission', 'Castro']
  });

  // Form states
  const [driverForm, setDriverForm] = useState({
    name: '',
    email: '',
    phone: '',
    zone: 'Downtown',
    vehicle: {
      type: 'Car',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      color: ''
    },
    documents: {
      driversLicense: 'Pending',
      insurance: 'Pending',
      registration: 'Pending',
      backgroundCheck: 'Pending',
      cannabisLicense: 'Pending'
    }
  });

  // CRUD Operations for Drivers
  const handleCreateDriver = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newDriver = {
        id: `DRV-${String(drivers.length + 1).padStart(3, '0')}`,
        ...driverForm,
        status: 'Offline',
        availability: 'Offline',
        location: {
          lat: 37.7749,
          lng: -122.4194,
          address: 'San Francisco, CA'
        },
        performance: {
          rating: 0,
          totalDeliveries: 0,
          completionRate: 0,
          onTimeRate: 0,
          customerRating: 0,
          totalEarnings: 0
        },
        currentOrder: null,
        shiftStart: null,
        shiftEnd: null,
        earnings: {
          today: 0,
          week: 0,
          month: 0
        },
        createdAt: new Date().toISOString().split('T')[0],
        lastActive: null
      };

      setDrivers([...drivers, newDriver]);
      setShowCreateModal(false);
      setDriverForm({
        name: '',
        email: '',
        phone: '',
        zone: 'Downtown',
        vehicle: {
          type: 'Car',
          make: '',
          model: '',
          year: new Date().getFullYear(),
          licensePlate: '',
          color: ''
        },
        documents: {
          driversLicense: 'Pending',
          insurance: 'Pending',
          registration: 'Pending',
          backgroundCheck: 'Pending',
          cannabisLicense: 'Pending'
        }
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalDrivers: prev.totalDrivers + 1
      }));

    } catch (error) {
      console.error('Error creating driver:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditDriver = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedDrivers = drivers.map(driver => 
        driver.id === selectedDriver.id 
          ? { ...driver, ...driverForm, lastActive: new Date().toISOString() }
          : driver
      );
      
      setDrivers(updatedDrivers);
      setShowEditModal(false);
      setSelectedDriver(null);
      
    } catch (error) {
      console.error('Error updating driver:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDriver = async () => {
    setLoading(true);
    
    try {
      const updatedDrivers = drivers.filter(driver => driver.id !== selectedDriver.id);
      setDrivers(updatedDrivers);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalDrivers: prev.totalDrivers - 1,
        onlineDrivers: selectedDriver.status === 'Online' ? prev.onlineDrivers - 1 : prev.onlineDrivers,
        availableDrivers: selectedDriver.availability === 'Available' ? prev.availableDrivers - 1 : prev.availableDrivers
      }));
      
      setShowDeleteModal(false);
      setSelectedDriver(null);
      
    } catch (error) {
      console.error('Error deleting driver:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleDriverStatus = (driverId, newStatus) => {
    const updatedDrivers = drivers.map(driver => 
      driver.id === driverId 
        ? { 
            ...driver, 
            status: newStatus,
            availability: newStatus === 'Online' ? 'Available' : 'Offline',
            shiftStart: newStatus === 'Online' ? new Date().toISOString() : driver.shiftStart,
            shiftEnd: newStatus === 'Offline' ? new Date().toISOString() : null,
            lastActive: new Date().toISOString()
          }
        : driver
    );
    
    setDrivers(updatedDrivers);
    
    // Update analytics
    const onlineCount = updatedDrivers.filter(d => d.status === 'Online').length;
    const availableCount = updatedDrivers.filter(d => d.availability === 'Available').length;
    
    setAnalytics(prev => ({
      ...prev,
      onlineDrivers: onlineCount,
      availableDrivers: availableCount
    }));
  };

  const handleDispatchOrder = async (orderId, driverId) => {
    setLoading(true);
    
    try {
      // Use integration workflow for driver assignment
      await workflows.assignDriver(orderId, driverId);
      
      // Update local state for UI
      const updatedDrivers = drivers.map(driver => 
        driver.id === driverId 
          ? { 
              ...driver, 
              currentOrder: orderId,
              availability: 'On Delivery',
              lastActive: new Date().toISOString()
            }
          : driver
      );
      
      setDrivers(updatedDrivers);
      setShowDispatchModal(false);
      setSelectedOrder(null);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        activeDeliveries: prev.activeDeliveries + 1,
        pendingOrders: prev.pendingOrders - 1,
        availableDrivers: prev.availableDrivers - 1
      }));
      
    } catch (error) {
      console.error('Error dispatching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteDelivery = async (orderId) => {
    try {
      // Use integration workflow for delivery completion
      await workflows.updateDeliveryStatus(orderId, 'delivered');
      
      // Update local driver state
      const order = orders.find(o => o.id === orderId);
      const updatedDrivers = drivers.map(driver => 
        driver.id === order?.assignedDriver 
          ? { 
              ...driver, 
              currentOrder: null,
              availability: 'Available',
              performance: {
                ...driver.performance,
                totalDeliveries: driver.performance.totalDeliveries + 1,
                totalEarnings: driver.performance.totalEarnings + (order.deliveryFee + order.tip)
              },
              earnings: {
                ...driver.earnings,
                today: driver.earnings.today + (order.deliveryFee + order.tip)
              },
              lastActive: new Date().toISOString()
            }
          : driver
      );
      
      setDrivers(updatedDrivers);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        activeDeliveries: prev.activeDeliveries - 1,
        completedToday: prev.completedToday + 1,
        availableDrivers: prev.availableDrivers + 1
      }));
      
    } catch (error) {
      console.error('Error completing delivery:', error);
    }
  };

  // Automatic timestamp tracking
  const recordTimestamp = (orderId, action, additionalData = {}) => {
    const timestamp = {
      action,
      timestamp: new Date().toISOString(),
      location: currentLocation,
      ...additionalData
    };
    
    setDeliveryTimestamps(prev => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [action]: timestamp
      }
    }));
    
    console.log(`📍 ${action} recorded for order ${orderId}:`, timestamp);
  };

  // Enhanced delivery action handlers with timestamps
  const handleStartDelivery = (order) => {
    recordTimestamp(order.id, 'delivery_started', {
      driverName: 'Current Driver',
      vehicleId: 'Vehicle #1'
    });
    
    // Update order status
    const updatedOrders = orders.map(o => 
      o.id === order.id 
        ? { ...o, status: 'In Transit', startedAt: new Date().toISOString() }
        : o
    );
    
    console.log('Starting delivery for order:', order.id);
  };

  const handleArriveAtLocation = (order) => {
    recordTimestamp(order.id, 'arrived_at_location', {
      customerName: order.customer.name,
      address: order.customer.address
    });
    
    console.log('Arrived at location for order:', order.id);
  };

  // Signature handling functions with timestamp tracking
  const handleSignManifest = (order) => {
    setCurrentManifest(order);
    // Check if driver has already signed
    const driverSigned = signatures[order.metrcManifest.manifestNumber]?.driverSignature;
    setSignatureType(driverSigned ? 'customer' : 'driver');
    setShowSignatureModal(true);
    
    // Record signature initiation
    recordTimestamp(order.id, `${driverSigned ? 'customer' : 'driver'}_signature_initiated`);
  };

  const handleSaveSignature = (signatureData) => {
    if (currentManifest) {
      const manifestNumber = currentManifest.metrcManifest.manifestNumber;
      const existingSignatures = signatures[manifestNumber] || {};
      const signatureTimestamp = new Date().toISOString();
      
      // Update signatures based on type with timestamp and location
      const updatedSignatures = {
        ...existingSignatures,
        [`${signatureType}Signature`]: signatureData,
        [`${signatureType}SignedAt`]: signatureTimestamp,
        [`${signatureType}Location`]: currentLocation,
        [`${signatureType}PrintedName`]: signatureType === 'driver' ? 'Current Driver' : currentManifest.customer.name
      };
      
      // Record signature completion timestamp
      recordTimestamp(currentManifest.id, `${signatureType}_signature_completed`, {
        signatureType,
        signedBy: signatureType === 'driver' ? 'Current Driver' : currentManifest.customer.name,
        manifestNumber
      });
      
      // Check if both signatures are collected
      const bothSigned = updatedSignatures.driverSignature && updatedSignatures.customerSignature;
      
      // Update the order with signature data
      const updatedOrders = orders.map(order => 
        order.id === currentManifest.id 
          ? {
              ...order,
              metrcManifest: {
                ...order.metrcManifest,
                status: bothSigned ? 'Fully Signed' : 'Partially Signed',
                signedAt: bothSigned ? signatureTimestamp : order.metrcManifest.signedAt,
                driverSigned: !!updatedSignatures.driverSignature,
                customerSigned: !!updatedSignatures.customerSignature,
                driverSignedAt: updatedSignatures.driverSignedAt,
                customerSignedAt: updatedSignatures.customerSignedAt
              }
            }
          : order
      );
      
      // Store signatures in local state
      setSignatures(prev => ({
        ...prev,
        [manifestNumber]: updatedSignatures
      }));

      // Close modal and reset state
      setShowSignatureModal(false);
      setCurrentManifest(null);
      
      // If driver just signed, immediately prompt for customer signature
      if (signatureType === 'driver' && !updatedSignatures.customerSignature) {
        setTimeout(() => {
          setCurrentManifest(currentManifest);
          setSignatureType('customer');
          setShowSignatureModal(true);
        }, 500);
      } else {
        setSignatureType('driver');
      }
      
      // Record completion and METRC sync when both signatures collected
      if (bothSigned) {
        recordTimestamp(currentManifest.id, 'manifest_fully_signed', {
          manifestNumber,
          readyForMetrcSync: true
        });
        console.log('Both signatures collected for manifest:', manifestNumber);
        console.log('Ready to sync with METRC API');
      }
    }
  };

  const handleClearSignature = () => {
    // Clear signature logic if needed
    console.log('Signature cleared');
  };

  const handleCancelSignature = () => {
    setShowSignatureModal(false);
    setCurrentManifest(null);
    setSignatureType('driver');
  };

  // Filter functions
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || driver.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesZone = selectedZone === 'all' || driver.zone.toLowerCase() === selectedZone.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesZone;
  });

  const openEditModal = (driver) => {
    setSelectedDriver(driver);
    setDriverForm({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      zone: driver.zone,
      vehicle: driver.vehicle,
      documents: driver.documents
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (driver) => {
    setSelectedDriver(driver);
    setShowDeleteModal(true);
  };

  const openDispatchModal = (order) => {
    setSelectedOrder(order);
    setShowDispatchModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'online': return 'text-green-600 bg-green-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      case 'break': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityColor = (availability) => {
    switch (availability.toLowerCase()) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'on delivery': return 'text-blue-600 bg-blue-100';
      case 'break': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending assignment': return 'text-orange-600 bg-orange-100';
      case 'assigned': return 'text-blue-600 bg-blue-100';
      case 'in transit': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'ready for pickup': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'standard': return 'text-blue-600 bg-blue-100';
      case 'low': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Drivers</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalDrivers}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.onlineDrivers} Online</span>
            <span className="text-gray-500 ml-2">• {analytics.availableDrivers} Available</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Deliveries</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeDeliveries}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-orange-600 font-medium">{analytics.pendingOrders} Pending</span>
            <span className="text-gray-500 ml-2">orders</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageDeliveryTime}min</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.completedToday} Completed</span>
            <span className="text-gray-500 ml-2">today</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Customer Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.customerSatisfaction.toFixed(1)}</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">★★★★★</span>
            <span className="text-gray-500 ml-2">rating</span>
          </div>
        </div>
      </div>

      {/* Real-time Driver Map */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Live Driver Tracking</h3>
        </div>
        <div className="p-6">
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Live Map Integration</h3>
              <p className="mt-1 text-sm text-gray-500">Real-time driver locations and routes would be displayed here</p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {drivers.filter(d => d.status === 'Online').map((driver) => (
                  <div key={driver.id} className="p-3 bg-white rounded border">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${driver.availability === 'Available' ? 'bg-green-500' : driver.availability === 'On Delivery' ? 'bg-blue-500' : 'bg-yellow-500'}`}></div>
                      <span className="text-sm font-medium">{driver.name.split(' ')[0]}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{driver.zone}</div>
                    <div className="text-xs text-gray-500">{driver.availability}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Orders */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Active Orders</h3>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Orders
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {orders.filter(order => order.status !== 'Delivered').slice(0, 5).map((order) => {
              const assignedDriver = drivers.find(d => d.id === order.assignedDriver);
              return (
                <div key={order.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{order.id}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                          {order.priority}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{order.customer.name} • ${order.total.toFixed(2)}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{order.customer.address}</span>
                      {assignedDriver && (
                        <>
                          <span>•</span>
                          <span>Driver: {assignedDriver.name}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{order.distance}mi • {order.estimatedDuration}min</span>
                    </div>
                    {order.status === 'Pending Assignment' && (
                      <div className="mt-3">
                        <button
                          onClick={() => openDispatchModal(order)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                        >
                          Assign Driver
                        </button>
                      </div>
                    )}
                    {order.status === 'In Transit' && (
                      <div className="mt-3">
                        <button
                          onClick={() => handleCompleteDelivery(order.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                        >
                          Mark Delivered
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Performers Today</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drivers
              .sort((a, b) => b.earnings.today - a.earnings.today)
              .slice(0, 3)
              .map((driver, index) => (
                <div key={driver.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-100 text-yellow-600' : 
                      index === 1 ? 'bg-gray-100 text-gray-600' : 
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <span className="font-bold">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{driver.name}</h4>
                      <p className="text-sm text-gray-500">{driver.zone}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Today's Earnings:</span>
                      <span className="font-medium text-gray-900">${driver.earnings.today.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rating:</span>
                      <span className="font-medium text-gray-900">{driver.performance.rating.toFixed(1)} ★</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Deliveries:</span>
                      <span className="font-medium text-gray-900">{driver.performance.totalDeliveries}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDrivers = () => (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search drivers..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="all">All Zones</option>
            <option value="downtown">Downtown</option>
            <option value="mission">Mission</option>
            <option value="castro">Castro</option>
            <option value="haight">Haight</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Driver</span>
          </button>
        </div>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{driver.name}</h3>
                    <p className="text-sm text-gray-600">{driver.email}</p>
                    <p className="text-sm text-gray-600">{driver.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(driver.status)}`}>
                    {driver.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(driver.availability)}`}>
                    {driver.availability}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>{driver.zone} • {driver.location.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>{driver.vehicle.year} {driver.vehicle.make} {driver.vehicle.model} ({driver.vehicle.color})</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>Rating: {driver.performance.rating.toFixed(1)} ★ • {driver.performance.totalDeliveries} deliveries</span>
                </div>
                {driver.currentOrder && (
                  <div className="flex items-center text-sm text-blue-600">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Current Order: {driver.currentOrder}</span>
                  </div>
                )}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Today: ${driver.earnings.today.toFixed(2)}
                  </span>
                  <span className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {driver.performance.completionRate.toFixed(1)}% completion
                  </span>
                  <span className="flex items-center">
                    <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {driver.performance.onTimeRate.toFixed(1)}% on-time
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {driver.status === 'Offline' && (
                      <button
                        onClick={() => handleToggleDriverStatus(driver.id, 'Online')}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        title="Bring Online"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                    {driver.status === 'Online' && (
                      <button
                        onClick={() => handleToggleDriverStatus(driver.id, 'Offline')}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors"
                        title="Take Offline"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => console.log('View driver location:', driver.id)}
                      className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                      title="View Location"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => console.log('Message driver:', driver.id)}
                      className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
                      title="Send Message"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(driver)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(driver)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDrivers.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No drivers found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first driver.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Driver
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      {/* Orders Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Assignment</p>
              <p className="text-2xl font-bold text-orange-600">
                {orders.filter(o => o.status === 'Pending Assignment').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">In Transit</p>
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'In Transit').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ready for Pickup</p>
              <p className="text-2xl font-bold text-yellow-600">
                {orders.filter(o => o.status === 'Ready for Pickup').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'Delivered').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">All Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => {
                const assignedDriver = drivers.find(d => d.id === order.assignedDriver);
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{new Date(order.orderTime).toLocaleString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.phone}</div>
                        <div className="text-sm text-gray-500 break-all">{order.customer.address}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {assignedDriver ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900">{assignedDriver.name}</div>
                          <div className="text-sm text-gray-500">{assignedDriver.phone}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">{order.distance}mi • {order.estimatedDuration}min</div>
                        <div className="text-sm text-gray-500">{order.items.length} items</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getOrderStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                          {order.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {order.status === 'Pending Assignment' && (
                          <button
                            onClick={() => openDispatchModal(order)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Assign
                          </button>
                        )}
                        {order.status === 'In Transit' && (
                          <button
                            onClick={() => handleCompleteDelivery(order.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Complete
                          </button>
                        )}
                        {order.metrcManifest && order.metrcManifest.requiresSignature && (
                          <button
                            onClick={() => handleSignManifest(order)}
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              order.metrcManifest.status === 'Fully Signed' 
                                ? 'text-green-600 bg-green-100' 
                                : order.metrcManifest.status === 'Partially Signed'
                                ? 'text-yellow-600 bg-yellow-100 hover:bg-yellow-200'
                                : 'text-blue-600 bg-blue-100 hover:bg-blue-200'
                            }`}
                            disabled={order.metrcManifest.status === 'Fully Signed'}
                          >
                            {order.metrcManifest.status === 'Fully Signed' 
                              ? '✓ Both Signed' 
                              : order.metrcManifest.status === 'Partially Signed'
                              ? 'Need Customer'
                              : 'Sign Manifest'
                            }
                          </button>
                        )}
                        <button
                          onClick={() => console.log('View order details:', order.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Driver App & Dispatch System</h1>
        <p className="text-gray-600 mt-1">Uber-style driver management and order dispatch platform</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'drivers', name: 'Drivers', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { id: 'orders', name: 'Orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'drivers' && renderDrivers()}
      {activeTab === 'orders' && renderOrders()}

      {/* Create Driver Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add New Driver</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateDriver} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={driverForm.name}
                      onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={driverForm.email}
                      onChange={(e) => setDriverForm({ ...driverForm, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={driverForm.phone}
                      onChange={(e) => setDriverForm({ ...driverForm, phone: e.target.value })}
                      placeholder="+1-555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zone</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={driverForm.zone}
                      onChange={(e) => setDriverForm({ ...driverForm, zone: e.target.value })}
                    >
                      <option value="Downtown">Downtown</option>
                      <option value="Mission">Mission</option>
                      <option value="Castro">Castro</option>
                      <option value="Haight">Haight</option>
                    </select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Vehicle Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={driverForm.vehicle.type}
                        onChange={(e) => setDriverForm({ 
                          ...driverForm, 
                          vehicle: { ...driverForm.vehicle, type: e.target.value }
                        })}
                      >
                        <option value="Car">Car</option>
                        <option value="Bike">Bike</option>
                        <option value="Scooter">Scooter</option>
                        <option value="Motorcycle">Motorcycle</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={driverForm.vehicle.make}
                        onChange={(e) => setDriverForm({ 
                          ...driverForm, 
                          vehicle: { ...driverForm.vehicle, make: e.target.value }
                        })}
                        placeholder="Toyota"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={driverForm.vehicle.model}
                        onChange={(e) => setDriverForm({ 
                          ...driverForm, 
                          vehicle: { ...driverForm.vehicle, model: e.target.value }
                        })}
                        placeholder="Prius"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input
                        type="number"
                        required
                        min="2000"
                        max={new Date().getFullYear() + 1}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={driverForm.vehicle.year}
                        onChange={(e) => setDriverForm({ 
                          ...driverForm, 
                          vehicle: { ...driverForm.vehicle, year: parseInt(e.target.value) }
                        })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={driverForm.vehicle.licensePlate}
                        onChange={(e) => setDriverForm({ 
                          ...driverForm, 
                          vehicle: { ...driverForm.vehicle, licensePlate: e.target.value }
                        })}
                        placeholder="ABC123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={driverForm.vehicle.color}
                        onChange={(e) => setDriverForm({ 
                          ...driverForm, 
                          vehicle: { ...driverForm.vehicle, color: e.target.value }
                        })}
                        placeholder="White"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add Driver'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Driver Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Driver</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditDriver} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={driverForm.name}
                    onChange={(e) => setDriverForm({ ...driverForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={driverForm.email}
                    onChange={(e) => setDriverForm({ ...driverForm, email: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Driver'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Driver Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Driver</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">
                  Are you sure you want to delete <strong>{selectedDriver?.name}</strong>? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteDriver}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Driver'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dispatch Order Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Assign Driver to Order</h2>
                <button
                  onClick={() => setShowDispatchModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {selectedOrder && (
                <div className="mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{selectedOrder.id}</h3>
                    <p className="text-sm text-gray-600">{selectedOrder.customer.name} • ${selectedOrder.total.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.customer.address}</p>
                    <p className="text-sm text-gray-600">{selectedOrder.distance}mi • Est. {selectedOrder.estimatedDuration}min</p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Available Drivers</h3>
                {drivers.filter(d => d.availability === 'Available').map((driver) => (
                  <div key={driver.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                       onClick={() => handleDispatchOrder(selectedOrder.id, driver.id)}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{driver.name}</h4>
                        <p className="text-sm text-gray-600">{driver.zone} • {driver.vehicle.make} {driver.vehicle.model}</p>
                        <p className="text-sm text-gray-600">Rating: {driver.performance.rating.toFixed(1)} ★</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(driver.availability)}`}>
                          {driver.availability}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowDispatchModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && currentManifest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {signatureType === 'driver' ? 'Driver Signature Required' : 'Customer Signature Required'}
              </h3>
              <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <p><strong>Manifest:</strong> {currentManifest.metrcManifest.manifestNumber}</p>
                  <p><strong>Customer:</strong> {currentManifest.customer.name}</p>
                  <p><strong>Order:</strong> {currentManifest.id}</p>
                  <p><strong>Total:</strong> ${currentManifest.total.toFixed(2)}</p>
                  <p><strong>Signing as:</strong> <span className="font-medium text-blue-600">{signatureType === 'driver' ? 'Driver' : 'Customer'}</span></p>
                  {signatures[currentManifest.metrcManifest.manifestNumber]?.driverSignature && (
                    <p className="text-green-600 mt-2">✓ Driver signature collected</p>
                  )}
                </div>
              </div>
            </div>
            
            <DigitalSignatureModule
              onSave={handleSaveSignature}
              onClear={handleClearSignature}
              onCancel={handleCancelSignature}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDriverAppModule;

