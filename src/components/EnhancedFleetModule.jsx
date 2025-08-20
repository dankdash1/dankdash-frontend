import React, { useState, useEffect } from 'react';

const EnhancedFleetModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [showAddRoute, setShowAddRoute] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [editingRoute, setEditingRoute] = useState(null);

  // Enhanced fleet data with full CRUD functionality
  const [vehicles, setVehicles] = useState([
    {
      id: 'VEH-001',
      name: 'Delivery Van #1',
      type: 'Van',
      make: 'Ford',
      model: 'Transit',
      year: 2023,
      licensePlate: 'DDS-001',
      vin: '1FTBW2CM5NKA12345',
      status: 'Active',
      location: 'Warehouse A',
      driver: 'John Doe',
      mileage: 15420,
      fuelLevel: 85,
      lastMaintenance: '2024-07-15',
      nextMaintenance: '2024-10-15',
      maintenanceDue: false,
      insurance: {
        provider: 'State Farm',
        policyNumber: 'SF-123456789',
        expiryDate: '2025-03-15',
        premium: 1200.00
      },
      registration: {
        expiryDate: '2025-06-30',
        state: 'California',
        registrationNumber: 'CA-REG-001'
      },
      gps: {
        latitude: 37.7749,
        longitude: -122.4194,
        lastUpdate: '2024-08-14 16:45:30'
      },
      deliveries: {
        today: 8,
        thisWeek: 45,
        thisMonth: 187
      },
      performance: {
        avgDeliveryTime: 25,
        fuelEfficiency: 18.5,
        customerRating: 4.8
      }
    },
    {
      id: 'VEH-002',
      name: 'Delivery Truck #1',
      type: 'Truck',
      make: 'Chevrolet',
      model: 'Express',
      year: 2022,
      licensePlate: 'DDS-002',
      vin: '1GCWGBFP8N1234567',
      status: 'In Transit',
      location: 'Route 5',
      driver: 'Sarah Johnson',
      mileage: 28750,
      fuelLevel: 62,
      lastMaintenance: '2024-06-20',
      nextMaintenance: '2024-09-20',
      maintenanceDue: true,
      insurance: {
        provider: 'Allstate',
        policyNumber: 'AS-987654321',
        expiryDate: '2025-01-20',
        premium: 1450.00
      },
      registration: {
        expiryDate: '2025-04-15',
        state: 'California',
        registrationNumber: 'CA-REG-002'
      },
      gps: {
        latitude: 37.8044,
        longitude: -122.2711,
        lastUpdate: '2024-08-14 16:42:15'
      },
      deliveries: {
        today: 12,
        thisWeek: 58,
        thisMonth: 234
      },
      performance: {
        avgDeliveryTime: 22,
        fuelEfficiency: 16.2,
        customerRating: 4.9
      }
    },
    {
      id: 'VEH-003',
      name: 'Delivery Bike #1',
      type: 'Motorcycle',
      make: 'Honda',
      model: 'CB300R',
      year: 2024,
      licensePlate: 'DDS-003',
      vin: 'JH2RC5009PK123456',
      status: 'Maintenance',
      location: 'Service Center',
      driver: 'Mike Chen',
      mileage: 5240,
      fuelLevel: 95,
      lastMaintenance: '2024-08-10',
      nextMaintenance: '2024-11-10',
      maintenanceDue: false,
      insurance: {
        provider: 'Progressive',
        policyNumber: 'PR-456789123',
        expiryDate: '2025-05-10',
        premium: 800.00
      },
      registration: {
        expiryDate: '2025-08-20',
        state: 'California',
        registrationNumber: 'CA-REG-003'
      },
      gps: {
        latitude: 37.7849,
        longitude: -122.4094,
        lastUpdate: '2024-08-14 14:30:00'
      },
      deliveries: {
        today: 0,
        thisWeek: 25,
        thisMonth: 98
      },
      performance: {
        avgDeliveryTime: 18,
        fuelEfficiency: 45.8,
        customerRating: 4.7
      }
    }
  ]);

  const [drivers, setDrivers] = useState([
    {
      id: 'DRV-001',
      name: 'John Doe',
      email: 'john.doe@dankdash.com',
      phone: '(555) 123-4567',
      licenseNumber: 'CA-DL-12345678',
      licenseExpiry: '2026-03-15',
      status: 'Active',
      vehicle: 'VEH-001',
      rating: 4.8,
      totalDeliveries: 1247,
      joinDate: '2023-01-15',
      address: '123 Main St, San Francisco, CA 94102',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '(555) 987-6543',
        relationship: 'Spouse'
      },
      performance: {
        onTimeDeliveries: 96.5,
        customerRating: 4.8,
        avgDeliveryTime: 25,
        totalMiles: 15420
      }
    },
    {
      id: 'DRV-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@dankdash.com',
      phone: '(555) 234-5678',
      licenseNumber: 'CA-DL-87654321',
      licenseExpiry: '2025-11-20',
      status: 'Active',
      vehicle: 'VEH-002',
      rating: 4.9,
      totalDeliveries: 1856,
      joinDate: '2022-08-10',
      address: '456 Oak Ave, Oakland, CA 94601',
      emergencyContact: {
        name: 'Robert Johnson',
        phone: '(555) 876-5432',
        relationship: 'Husband'
      },
      performance: {
        onTimeDeliveries: 98.2,
        customerRating: 4.9,
        avgDeliveryTime: 22,
        totalMiles: 28750
      }
    },
    {
      id: 'DRV-003',
      name: 'Mike Chen',
      email: 'mike.chen@dankdash.com',
      phone: '(555) 345-6789',
      licenseNumber: 'CA-DL-11223344',
      licenseExpiry: '2027-07-08',
      status: 'On Leave',
      vehicle: 'VEH-003',
      rating: 4.7,
      totalDeliveries: 892,
      joinDate: '2023-06-01',
      address: '789 Pine St, Berkeley, CA 94702',
      emergencyContact: {
        name: 'Lisa Chen',
        phone: '(555) 765-4321',
        relationship: 'Sister'
      },
      performance: {
        onTimeDeliveries: 94.8,
        customerRating: 4.7,
        avgDeliveryTime: 18,
        totalMiles: 5240
      }
    }
  ]);

  const [routes, setRoutes] = useState([
    {
      id: 'RT-001',
      name: 'Downtown Route',
      description: 'Central San Francisco delivery route',
      status: 'Active',
      driver: 'John Doe',
      vehicle: 'VEH-001',
      startLocation: 'Warehouse A',
      endLocation: 'Warehouse A',
      estimatedTime: 180,
      actualTime: 165,
      distance: 45.2,
      stops: 12,
      deliveries: 8,
      priority: 'High',
      createdDate: '2024-08-14',
      completedDate: null,
      waypoints: [
        { address: '100 Market St, San Francisco, CA', status: 'Completed', time: '09:15' },
        { address: '250 Montgomery St, San Francisco, CA', status: 'Completed', time: '09:45' },
        { address: '500 California St, San Francisco, CA', status: 'In Progress', time: '10:15' },
        { address: '750 Bush St, San Francisco, CA', status: 'Pending', time: '10:45' }
      ]
    },
    {
      id: 'RT-002',
      name: 'East Bay Route',
      description: 'Oakland and Berkeley delivery route',
      status: 'In Progress',
      driver: 'Sarah Johnson',
      vehicle: 'VEH-002',
      startLocation: 'Warehouse B',
      endLocation: 'Warehouse B',
      estimatedTime: 240,
      actualTime: null,
      distance: 62.8,
      stops: 15,
      deliveries: 12,
      priority: 'Medium',
      createdDate: '2024-08-14',
      completedDate: null,
      waypoints: [
        { address: '1000 Broadway, Oakland, CA', status: 'Completed', time: '08:30' },
        { address: '2000 Telegraph Ave, Berkeley, CA', status: 'Completed', time: '09:15' },
        { address: '3000 Shattuck Ave, Berkeley, CA', status: 'In Progress', time: '10:00' },
        { address: '4000 San Pablo Ave, Oakland, CA', status: 'Pending', time: '10:45' }
      ]
    },
    {
      id: 'RT-003',
      name: 'South Bay Express',
      description: 'San Jose and surrounding areas',
      status: 'Scheduled',
      driver: 'Mike Chen',
      vehicle: 'VEH-003',
      startLocation: 'Warehouse C',
      endLocation: 'Warehouse C',
      estimatedTime: 300,
      actualTime: null,
      distance: 85.5,
      stops: 20,
      deliveries: 15,
      priority: 'Low',
      createdDate: '2024-08-15',
      completedDate: null,
      waypoints: [
        { address: '100 N 1st St, San Jose, CA', status: 'Pending', time: '11:00' },
        { address: '200 W Santa Clara St, San Jose, CA', status: 'Pending', time: '11:30' },
        { address: '300 S Market St, San Jose, CA', status: 'Pending', time: '12:00' },
        { address: '400 E San Fernando St, San Jose, CA', status: 'Pending', time: '12:30' }
      ]
    }
  ]);

  // Form states
  const [vehicleForm, setVehicleForm] = useState({
    name: '',
    type: 'Van',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    licensePlate: '',
    vin: '',
    status: 'Active',
    location: 'Warehouse A',
    driver: '',
    mileage: 0,
    fuelLevel: 100
  });

  const [driverForm, setDriverForm] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    licenseExpiry: '',
    status: 'Active',
    vehicle: '',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: ''
  });

  const [routeForm, setRouteForm] = useState({
    name: '',
    description: '',
    status: 'Scheduled',
    driver: '',
    vehicle: '',
    startLocation: 'Warehouse A',
    endLocation: 'Warehouse A',
    estimatedTime: 180,
    distance: 0,
    stops: 0,
    deliveries: 0,
    priority: 'Medium'
  });

  // Filter functions
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || vehicle.status === selectedStatus;
    const matchesType = selectedType === 'all' || vehicle.type === selectedType;
    const matchesDriver = selectedDriver === 'all' || vehicle.driver === selectedDriver;
    
    return matchesSearch && matchesStatus && matchesType && matchesDriver;
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || driver.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.driver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || route.status === selectedStatus;
    const matchesDriver = selectedDriver === 'all' || route.driver === selectedDriver;
    
    return matchesSearch && matchesStatus && matchesDriver;
  });

  // CRUD Operations for Vehicles
  const handleAddVehicle = () => {
    if (!vehicleForm.name || !vehicleForm.make || !vehicleForm.model || !vehicleForm.licensePlate || !vehicleForm.vin) {
      alert('Please fill in all required fields');
      return;
    }

    const newVehicle = {
      id: `VEH-${String(vehicles.length + 1).padStart(3, '0')}`,
      ...vehicleForm,
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      maintenanceDue: false,
      insurance: {
        provider: 'TBD',
        policyNumber: 'TBD',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        premium: 0
      },
      registration: {
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        state: 'California',
        registrationNumber: 'TBD'
      },
      gps: {
        latitude: 37.7749,
        longitude: -122.4194,
        lastUpdate: new Date().toISOString()
      },
      deliveries: {
        today: 0,
        thisWeek: 0,
        thisMonth: 0
      },
      performance: {
        avgDeliveryTime: 0,
        fuelEfficiency: 0,
        customerRating: 0
      }
    };

    setVehicles([...vehicles, newVehicle]);
    setVehicleForm({
      name: '',
      type: 'Van',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      vin: '',
      status: 'Active',
      location: 'Warehouse A',
      driver: '',
      mileage: 0,
      fuelLevel: 100
    });
    setShowAddVehicle(false);
    alert('Vehicle added successfully!');
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setVehicleForm({
      name: vehicle.name,
      type: vehicle.type,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      licensePlate: vehicle.licensePlate,
      vin: vehicle.vin,
      status: vehicle.status,
      location: vehicle.location,
      driver: vehicle.driver,
      mileage: vehicle.mileage,
      fuelLevel: vehicle.fuelLevel
    });
    setShowAddVehicle(true);
  };

  const handleUpdateVehicle = () => {
    if (!vehicleForm.name || !vehicleForm.make || !vehicleForm.model || !vehicleForm.licensePlate || !vehicleForm.vin) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedVehicles = vehicles.map(vehicle => 
      vehicle.id === editingVehicle.id 
        ? { ...vehicle, ...vehicleForm }
        : vehicle
    );

    setVehicles(updatedVehicles);
    setEditingVehicle(null);
    setVehicleForm({
      name: '',
      type: 'Van',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      licensePlate: '',
      vin: '',
      status: 'Active',
      location: 'Warehouse A',
      driver: '',
      mileage: 0,
      fuelLevel: 100
    });
    setShowAddVehicle(false);
    alert('Vehicle updated successfully!');
  };

  const handleDeleteVehicle = (vehicleId) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
      alert('Vehicle deleted successfully!');
    }
  };

  // CRUD Operations for Drivers
  const handleAddDriver = () => {
    if (!driverForm.name || !driverForm.email || !driverForm.phone || !driverForm.licenseNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const newDriver = {
      id: `DRV-${String(drivers.length + 1).padStart(3, '0')}`,
      ...driverForm,
      rating: 0,
      totalDeliveries: 0,
      joinDate: new Date().toISOString().split('T')[0],
      emergencyContact: {
        name: driverForm.emergencyContactName,
        phone: driverForm.emergencyContactPhone,
        relationship: driverForm.emergencyContactRelationship
      },
      performance: {
        onTimeDeliveries: 0,
        customerRating: 0,
        avgDeliveryTime: 0,
        totalMiles: 0
      }
    };

    setDrivers([...drivers, newDriver]);
    setDriverForm({
      name: '',
      email: '',
      phone: '',
      licenseNumber: '',
      licenseExpiry: '',
      status: 'Active',
      vehicle: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: ''
    });
    setShowAddDriver(false);
    alert('Driver added successfully!');
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    setDriverForm({
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      licenseNumber: driver.licenseNumber,
      licenseExpiry: driver.licenseExpiry,
      status: driver.status,
      vehicle: driver.vehicle,
      address: driver.address,
      emergencyContactName: driver.emergencyContact.name,
      emergencyContactPhone: driver.emergencyContact.phone,
      emergencyContactRelationship: driver.emergencyContact.relationship
    });
    setShowAddDriver(true);
  };

  const handleUpdateDriver = () => {
    if (!driverForm.name || !driverForm.email || !driverForm.phone || !driverForm.licenseNumber) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedDrivers = drivers.map(driver => 
      driver.id === editingDriver.id 
        ? { 
            ...driver, 
            ...driverForm,
            emergencyContact: {
              name: driverForm.emergencyContactName,
              phone: driverForm.emergencyContactPhone,
              relationship: driverForm.emergencyContactRelationship
            }
          }
        : driver
    );

    setDrivers(updatedDrivers);
    setEditingDriver(null);
    setDriverForm({
      name: '',
      email: '',
      phone: '',
      licenseNumber: '',
      licenseExpiry: '',
      status: 'Active',
      vehicle: '',
      address: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: ''
    });
    setShowAddDriver(false);
    alert('Driver updated successfully!');
  };

  const handleDeleteDriver = (driverId) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      setDrivers(drivers.filter(driver => driver.id !== driverId));
      alert('Driver deleted successfully!');
    }
  };

  // CRUD Operations for Routes
  const handleAddRoute = () => {
    if (!routeForm.name || !routeForm.description || !routeForm.driver || !routeForm.vehicle) {
      alert('Please fill in all required fields');
      return;
    }

    const newRoute = {
      id: `RT-${String(routes.length + 1).padStart(3, '0')}`,
      ...routeForm,
      actualTime: null,
      createdDate: new Date().toISOString().split('T')[0],
      completedDate: null,
      waypoints: []
    };

    setRoutes([...routes, newRoute]);
    setRouteForm({
      name: '',
      description: '',
      status: 'Scheduled',
      driver: '',
      vehicle: '',
      startLocation: 'Warehouse A',
      endLocation: 'Warehouse A',
      estimatedTime: 180,
      distance: 0,
      stops: 0,
      deliveries: 0,
      priority: 'Medium'
    });
    setShowAddRoute(false);
    alert('Route added successfully!');
  };

  const handleEditRoute = (route) => {
    setEditingRoute(route);
    setRouteForm({
      name: route.name,
      description: route.description,
      status: route.status,
      driver: route.driver,
      vehicle: route.vehicle,
      startLocation: route.startLocation,
      endLocation: route.endLocation,
      estimatedTime: route.estimatedTime,
      distance: route.distance,
      stops: route.stops,
      deliveries: route.deliveries,
      priority: route.priority
    });
    setShowAddRoute(true);
  };

  const handleUpdateRoute = () => {
    if (!routeForm.name || !routeForm.description || !routeForm.driver || !routeForm.vehicle) {
      alert('Please fill in all required fields');
      return;
    }

    const updatedRoutes = routes.map(route => 
      route.id === editingRoute.id 
        ? { ...route, ...routeForm }
        : route
    );

    setRoutes(updatedRoutes);
    setEditingRoute(null);
    setRouteForm({
      name: '',
      description: '',
      status: 'Scheduled',
      driver: '',
      vehicle: '',
      startLocation: 'Warehouse A',
      endLocation: 'Warehouse A',
      estimatedTime: 180,
      distance: 0,
      stops: 0,
      deliveries: 0,
      priority: 'Medium'
    });
    setShowAddRoute(false);
    alert('Route updated successfully!');
  };

  const handleDeleteRoute = (routeId) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      setRoutes(routes.filter(route => route.id !== routeId));
      alert('Route deleted successfully!');
    }
  };

  // Calculate dashboard metrics
  const dashboardMetrics = {
    totalVehicles: vehicles.length,
    activeVehicles: vehicles.filter(v => v.status === 'Active').length,
    totalDrivers: drivers.length,
    activeDrivers: drivers.filter(d => d.status === 'Active').length,
    totalRoutes: routes.length,
    activeRoutes: routes.filter(r => r.status === 'Active' || r.status === 'In Progress').length,
    maintenanceDue: vehicles.filter(v => v.maintenanceDue).length,
    avgFuelLevel: Math.round(vehicles.reduce((sum, v) => sum + v.fuelLevel, 0) / vehicles.length),
    totalDeliveries: vehicles.reduce((sum, v) => sum + v.deliveries.today, 0),
    avgRating: (drivers.reduce((sum, d) => sum + d.rating, 0) / drivers.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Fleet Management</h1>
          <p className="text-gray-600">Manage vehicles, drivers, and delivery routes</p>
        </div>

        {/* Navigation Tabs - Mobile Responsive */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-200">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊' },
              { id: 'vehicles', label: 'Vehicles', icon: '🚐' },
              { id: 'drivers', label: 'Drivers', icon: '👨‍💼' },
              { id: 'routes', label: 'Routes', icon: '🗺️' },
              { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
              { id: 'analytics', label: 'Analytics', icon: '📈' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Key Metrics - Mobile Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{dashboardMetrics.totalVehicles}</p>
                    <p className="text-xs sm:text-sm text-green-600">{dashboardMetrics.activeVehicles} active</p>
                  </div>
                  <div className="text-2xl sm:text-3xl">🚐</div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Drivers</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{dashboardMetrics.totalDrivers}</p>
                    <p className="text-xs sm:text-sm text-green-600">{dashboardMetrics.activeDrivers} active</p>
                  </div>
                  <div className="text-2xl sm:text-3xl">👨‍💼</div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Routes</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{dashboardMetrics.activeRoutes}</p>
                    <p className="text-xs sm:text-sm text-blue-600">{dashboardMetrics.totalRoutes} total</p>
                  </div>
                  <div className="text-2xl sm:text-3xl">🗺️</div>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Deliveries</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">{dashboardMetrics.totalDeliveries}</p>
                    <p className="text-xs sm:text-sm text-green-600">+12% from yesterday</p>
                  </div>
                  <div className="text-2xl sm:text-3xl">📦</div>
                </div>
              </div>
            </div>

            {/* Fleet Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Status</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Vehicles</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${(dashboardMetrics.activeVehicles / dashboardMetrics.totalVehicles) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{dashboardMetrics.activeVehicles}/{dashboardMetrics.totalVehicles}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Maintenance Due</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full" 
                          style={{ width: `${(dashboardMetrics.maintenanceDue / dashboardMetrics.totalVehicles) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{dashboardMetrics.maintenanceDue}/{dashboardMetrics.totalVehicles}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Average Fuel Level</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${dashboardMetrics.avgFuelLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{dashboardMetrics.avgFuelLevel}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Route completed</p>
                      <p className="text-xs text-gray-600">Downtown Route by John Doe - 8 deliveries</p>
                    </div>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Vehicle maintenance scheduled</p>
                      <p className="text-xs text-gray-600">Delivery Truck #1 - Oil change and inspection</p>
                    </div>
                    <span className="text-xs text-gray-500">15 min ago</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Low fuel alert</p>
                      <p className="text-xs text-gray-600">Delivery Van #2 - Fuel level at 25%</p>
                    </div>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fleet Management Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Fleet Management Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
                <div>• Schedule regular maintenance to prevent breakdowns</div>
                <div>• Monitor fuel efficiency to reduce operating costs</div>
                <div>• Track driver performance for safety and efficiency</div>
                <div>• Use GPS tracking for real-time route optimization</div>
              </div>
            </div>
          </div>
        )}

        {/* Vehicles Tab */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            {/* Search and Filters - Mobile Responsive */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search vehicles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="Van">Van</option>
                    <option value="Truck">Truck</option>
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Car">Car</option>
                  </select>
                  
                  <button
                    onClick={() => setShowAddVehicle(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    + Add Vehicle
                  </button>
                </div>
              </div>
            </div>

            {/* Vehicles Grid - Mobile Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        vehicle.status === 'Active' ? 'bg-green-100 text-green-800' :
                        vehicle.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                        vehicle.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {vehicle.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Type:</span>
                        <span className="font-medium">{vehicle.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Make/Model:</span>
                        <span className="font-medium">{vehicle.make} {vehicle.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>License Plate:</span>
                        <span className="font-medium">{vehicle.licensePlate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Driver:</span>
                        <span className="font-medium">{vehicle.driver}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mileage:</span>
                        <span className="font-medium">{vehicle.mileage.toLocaleString()} mi</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fuel Level</span>
                        <span>{vehicle.fuelLevel}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            vehicle.fuelLevel > 50 ? 'bg-green-500' :
                            vehicle.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${vehicle.fuelLevel}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {vehicle.maintenanceDue && (
                      <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xs text-red-800">⚠️ Maintenance due</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditVehicle(vehicle)}
                        className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteVehicle(vehicle.id)}
                        className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drivers Tab */}
        {activeTab === 'drivers' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search drivers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  
                  <button
                    onClick={() => setShowAddDriver(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    + Add Driver
                  </button>
                </div>
              </div>
            </div>

            {/* Drivers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map((driver) => (
                <div key={driver.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        driver.status === 'Active' ? 'bg-green-100 text-green-800' :
                        driver.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {driver.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium text-xs">{driver.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phone:</span>
                        <span className="font-medium">{driver.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vehicle:</span>
                        <span className="font-medium">{driver.vehicle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span className="font-medium">⭐ {driver.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Deliveries:</span>
                        <span className="font-medium">{driver.totalDeliveries.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>On-time Deliveries</span>
                        <span>{driver.performance.onTimeDeliveries}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${driver.performance.onTimeDeliveries}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditDriver(driver)}
                        className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDriver(driver.id)}
                        className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search routes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                  </select>
                  
                  <button
                    onClick={() => setShowAddRoute(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    + Add Route
                  </button>
                </div>
              </div>
            </div>

            {/* Routes List */}
            <div className="space-y-4">
              {filteredRoutes.map((route) => (
                <div key={route.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{route.name}</h3>
                        <p className="text-sm text-gray-600">{route.description}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          route.status === 'Active' ? 'bg-green-100 text-green-800' :
                          route.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          route.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {route.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          route.priority === 'High' ? 'bg-red-100 text-red-800' :
                          route.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {route.priority}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Driver</p>
                        <p className="text-sm font-medium">{route.driver}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Vehicle</p>
                        <p className="text-sm font-medium">{route.vehicle}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="text-sm font-medium">{route.distance} mi</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Est. Time</p>
                        <p className="text-sm font-medium">{route.estimatedTime} min</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Stops</p>
                        <p className="text-sm font-medium">{route.stops}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Deliveries</p>
                        <p className="text-sm font-medium">{route.deliveries}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="text-sm font-medium">{route.createdDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ 
                                width: `${route.status === 'Completed' ? 100 : 
                                        route.status === 'In Progress' ? 60 : 
                                        route.status === 'Active' ? 30 : 0}%` 
                              }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {route.status === 'Completed' ? '100%' : 
                             route.status === 'In Progress' ? '60%' : 
                             route.status === 'Active' ? '30%' : '0%'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditRoute(route)}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteRoute(route.id)}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                      <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Track
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Maintenance Tab */}
        {activeTab === 'maintenance' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h3>
              <div className="space-y-4">
                {vehicles.filter(v => v.maintenanceDue).map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                      <p className="text-sm text-gray-600">Last maintenance: {vehicle.lastMaintenance}</p>
                      <p className="text-sm text-red-600">⚠️ Maintenance overdue</p>
                    </div>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Schedule
                    </button>
                  </div>
                ))}
                
                {vehicles.filter(v => !v.maintenanceDue).map((vehicle) => (
                  <div key={vehicle.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                      <p className="text-sm text-gray-600">Last maintenance: {vehicle.lastMaintenance}</p>
                      <p className="text-sm text-green-600">✅ Next maintenance: {vehicle.nextMaintenance}</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Fuel Efficiency</span>
                      <span>18.2 MPG</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>On-time Delivery Rate</span>
                      <span>96.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96.5%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Satisfaction</span>
                      <span>4.8/5.0</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Analysis</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Fuel Costs (Monthly)</span>
                    <span className="font-medium">$2,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Maintenance Costs</span>
                    <span className="font-medium">$1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Insurance Premiums</span>
                    <span className="font-medium">$3,450</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium text-gray-900">Total Operating Cost</span>
                    <span className="font-bold">$7,100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Vehicle Modal */}
        {showAddVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddVehicle(false);
                      setEditingVehicle(null);
                      setVehicleForm({
                        name: '',
                        type: 'Van',
                        make: '',
                        model: '',
                        year: new Date().getFullYear(),
                        licensePlate: '',
                        vin: '',
                        status: 'Active',
                        location: 'Warehouse A',
                        driver: '',
                        mileage: 0,
                        fuelLevel: 100
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name *</label>
                    <input
                      type="text"
                      value={vehicleForm.name}
                      onChange={(e) => setVehicleForm({...vehicleForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Delivery Van #4"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={vehicleForm.type}
                        onChange={(e) => setVehicleForm({...vehicleForm, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Van">Van</option>
                        <option value="Truck">Truck</option>
                        <option value="Motorcycle">Motorcycle</option>
                        <option value="Car">Car</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={vehicleForm.status}
                        onChange={(e) => setVehicleForm({...vehicleForm, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Make *</label>
                      <input
                        type="text"
                        value={vehicleForm.make}
                        onChange={(e) => setVehicleForm({...vehicleForm, make: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Ford"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                      <input
                        type="text"
                        value={vehicleForm.model}
                        onChange={(e) => setVehicleForm({...vehicleForm, model: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., Transit"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <input
                      type="number"
                      value={vehicleForm.year}
                      onChange={(e) => setVehicleForm({...vehicleForm, year: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min="1990"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Plate *</label>
                    <input
                      type="text"
                      value={vehicleForm.licensePlate}
                      onChange={(e) => setVehicleForm({...vehicleForm, licensePlate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., DDS-004"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">VIN *</label>
                    <input
                      type="text"
                      value={vehicleForm.vin}
                      onChange={(e) => setVehicleForm({...vehicleForm, vin: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="17-character VIN"
                      maxLength="17"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <select
                        value={vehicleForm.location}
                        onChange={(e) => setVehicleForm({...vehicleForm, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Warehouse A">Warehouse A</option>
                        <option value="Warehouse B">Warehouse B</option>
                        <option value="Warehouse C">Warehouse C</option>
                        <option value="Service Center">Service Center</option>
                        <option value="On Route">On Route</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
                      <select
                        value={vehicleForm.driver}
                        onChange={(e) => setVehicleForm({...vehicleForm, driver: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Unassigned</option>
                        {drivers.filter(d => d.status === 'Active').map(driver => (
                          <option key={driver.id} value={driver.name}>{driver.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mileage</label>
                      <input
                        type="number"
                        value={vehicleForm.mileage}
                        onChange={(e) => setVehicleForm({...vehicleForm, mileage: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Level (%)</label>
                      <input
                        type="number"
                        value={vehicleForm.fuelLevel}
                        onChange={(e) => setVehicleForm({...vehicleForm, fuelLevel: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddVehicle(false);
                      setEditingVehicle(null);
                      setVehicleForm({
                        name: '',
                        type: 'Van',
                        make: '',
                        model: '',
                        year: new Date().getFullYear(),
                        licensePlate: '',
                        vin: '',
                        status: 'Active',
                        location: 'Warehouse A',
                        driver: '',
                        mileage: 0,
                        fuelLevel: 100
                      });
                    }}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingVehicle ? handleUpdateVehicle : handleAddVehicle}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Driver Modal */}
        {showAddDriver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingDriver ? 'Edit Driver' : 'Add New Driver'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddDriver(false);
                      setEditingDriver(null);
                      setDriverForm({
                        name: '',
                        email: '',
                        phone: '',
                        licenseNumber: '',
                        licenseExpiry: '',
                        status: 'Active',
                        vehicle: '',
                        address: '',
                        emergencyContactName: '',
                        emergencyContactPhone: '',
                        emergencyContactRelationship: ''
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={driverForm.name}
                      onChange={(e) => setDriverForm({...driverForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., John Smith"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={driverForm.email}
                      onChange={(e) => setDriverForm({...driverForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john.smith@dankdash.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={driverForm.phone}
                      onChange={(e) => setDriverForm({...driverForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Number *</label>
                    <input
                      type="text"
                      value={driverForm.licenseNumber}
                      onChange={(e) => setDriverForm({...driverForm, licenseNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="CA-DL-12345678"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Expiry</label>
                    <input
                      type="date"
                      value={driverForm.licenseExpiry}
                      onChange={(e) => setDriverForm({...driverForm, licenseExpiry: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={driverForm.status}
                        onChange={(e) => setDriverForm({...driverForm, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Active">Active</option>
                        <option value="On Leave">On Leave</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Vehicle</label>
                      <select
                        value={driverForm.vehicle}
                        onChange={(e) => setDriverForm({...driverForm, vehicle: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Unassigned</option>
                        {vehicles.filter(v => v.status === 'Active').map(vehicle => (
                          <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={driverForm.address}
                      onChange={(e) => setDriverForm({...driverForm, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                      placeholder="123 Main St, City, State ZIP"
                    />
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Emergency Contact</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={driverForm.emergencyContactName}
                        onChange={(e) => setDriverForm({...driverForm, emergencyContactName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Emergency contact name"
                      />
                    </div>
                    
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={driverForm.emergencyContactPhone}
                        onChange={(e) => setDriverForm({...driverForm, emergencyContactPhone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(555) 987-6543"
                      />
                    </div>
                    
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                      <select
                        value={driverForm.emergencyContactRelationship}
                        onChange={(e) => setDriverForm({...driverForm, emergencyContactRelationship: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select relationship</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="Child">Child</option>
                        <option value="Friend">Friend</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddDriver(false);
                      setEditingDriver(null);
                      setDriverForm({
                        name: '',
                        email: '',
                        phone: '',
                        licenseNumber: '',
                        licenseExpiry: '',
                        status: 'Active',
                        vehicle: '',
                        address: '',
                        emergencyContactName: '',
                        emergencyContactPhone: '',
                        emergencyContactRelationship: ''
                      });
                    }}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingDriver ? handleUpdateDriver : handleAddDriver}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingDriver ? 'Update Driver' : 'Add Driver'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Route Modal */}
        {showAddRoute && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {editingRoute ? 'Edit Route' : 'Add New Route'}
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddRoute(false);
                      setEditingRoute(null);
                      setRouteForm({
                        name: '',
                        description: '',
                        status: 'Scheduled',
                        driver: '',
                        vehicle: '',
                        startLocation: 'Warehouse A',
                        endLocation: 'Warehouse A',
                        estimatedTime: 180,
                        distance: 0,
                        stops: 0,
                        deliveries: 0,
                        priority: 'Medium'
                      });
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Route Name *</label>
                    <input
                      type="text"
                      value={routeForm.name}
                      onChange={(e) => setRouteForm({...routeForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., North Bay Route"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      value={routeForm.description}
                      onChange={(e) => setRouteForm({...routeForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="2"
                      placeholder="Brief description of the route"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={routeForm.status}
                        onChange={(e) => setRouteForm({...routeForm, status: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Active">Active</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={routeForm.priority}
                        onChange={(e) => setRouteForm({...routeForm, priority: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Driver *</label>
                    <select
                      value={routeForm.driver}
                      onChange={(e) => setRouteForm({...routeForm, driver: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select driver</option>
                      {drivers.filter(d => d.status === 'Active').map(driver => (
                        <option key={driver.id} value={driver.name}>{driver.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle *</label>
                    <select
                      value={routeForm.vehicle}
                      onChange={(e) => setRouteForm({...routeForm, vehicle: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select vehicle</option>
                      {vehicles.filter(v => v.status === 'Active').map(vehicle => (
                        <option key={vehicle.id} value={vehicle.id}>{vehicle.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Location</label>
                      <select
                        value={routeForm.startLocation}
                        onChange={(e) => setRouteForm({...routeForm, startLocation: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Warehouse A">Warehouse A</option>
                        <option value="Warehouse B">Warehouse B</option>
                        <option value="Warehouse C">Warehouse C</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Location</label>
                      <select
                        value={routeForm.endLocation}
                        onChange={(e) => setRouteForm({...routeForm, endLocation: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Warehouse A">Warehouse A</option>
                        <option value="Warehouse B">Warehouse B</option>
                        <option value="Warehouse C">Warehouse C</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Time (min)</label>
                      <input
                        type="number"
                        value={routeForm.estimatedTime}
                        onChange={(e) => setRouteForm({...routeForm, estimatedTime: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Distance (mi)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={routeForm.distance}
                        onChange={(e) => setRouteForm({...routeForm, distance: parseFloat(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Total Stops</label>
                      <input
                        type="number"
                        value={routeForm.stops}
                        onChange={(e) => setRouteForm({...routeForm, stops: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deliveries</label>
                      <input
                        type="number"
                        value={routeForm.deliveries}
                        onChange={(e) => setRouteForm({...routeForm, deliveries: parseInt(e.target.value) || 0})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddRoute(false);
                      setEditingRoute(null);
                      setRouteForm({
                        name: '',
                        description: '',
                        status: 'Scheduled',
                        driver: '',
                        vehicle: '',
                        startLocation: 'Warehouse A',
                        endLocation: 'Warehouse A',
                        estimatedTime: 180,
                        distance: 0,
                        stops: 0,
                        deliveries: 0,
                        priority: 'Medium'
                      });
                    }}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingRoute ? handleUpdateRoute : handleAddRoute}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingRoute ? 'Update Route' : 'Add Route'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedFleetModule;

