import React, { useState, useEffect } from 'react';

const FleetModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState('all');

  // Mock fleet data
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
        avgDeliveryTime: 24,
        fuelEfficiency: 18.5,
        onTimeRate: 94.2
      }
    },
    {
      id: 'VEH-002',
      name: 'Delivery Van #2',
      type: 'Van',
      make: 'Mercedes',
      model: 'Sprinter',
      year: 2022,
      licensePlate: 'DDS-002',
      vin: '1FTBW2CM5NKA67890',
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
        premium: 1350.00
      },
      registration: {
        expiryDate: '2025-04-15',
        state: 'California',
        registrationNumber: 'CA-REG-002'
      },
      gps: {
        latitude: 37.8044,
        longitude: -122.2711,
        lastUpdate: '2024-08-14 16:47:15'
      },
      deliveries: {
        today: 6,
        thisWeek: 38,
        thisMonth: 156
      },
      performance: {
        avgDeliveryTime: 26,
        fuelEfficiency: 16.8,
        onTimeRate: 91.7
      }
    },
    {
      id: 'VEH-003',
      name: 'Delivery Truck #1',
      type: 'Truck',
      make: 'Isuzu',
      model: 'NPR',
      year: 2021,
      licensePlate: 'DDS-003',
      vin: '1FTBW2CM5NKA11111',
      status: 'Maintenance',
      location: 'Service Center',
      driver: null,
      mileage: 45680,
      fuelLevel: 45,
      lastMaintenance: '2024-08-10',
      nextMaintenance: '2024-11-10',
      maintenanceDue: false,
      insurance: {
        provider: 'Progressive',
        policyNumber: 'PG-555666777',
        expiryDate: '2024-12-31',
        premium: 1800.00
      },
      registration: {
        expiryDate: '2025-02-28',
        state: 'California',
        registrationNumber: 'CA-REG-003'
      },
      gps: {
        latitude: 37.7849,
        longitude: -122.4094,
        lastUpdate: '2024-08-14 08:30:00'
      },
      deliveries: {
        today: 0,
        thisWeek: 0,
        thisMonth: 89
      },
      performance: {
        avgDeliveryTime: 32,
        fuelEfficiency: 12.3,
        onTimeRate: 88.5
      }
    },
    {
      id: 'VEH-004',
      name: 'Delivery Bike #1',
      type: 'Motorcycle',
      make: 'Honda',
      model: 'CB300R',
      year: 2023,
      licensePlate: 'DDS-004',
      vin: '1FTBW2CM5NKA22222',
      status: 'Active',
      location: 'Downtown Hub',
      driver: 'Mike Chen',
      mileage: 8920,
      fuelLevel: 78,
      lastMaintenance: '2024-08-01',
      nextMaintenance: '2024-11-01',
      maintenanceDue: false,
      insurance: {
        provider: 'Geico',
        policyNumber: 'GC-111222333',
        expiryDate: '2025-05-10',
        premium: 600.00
      },
      registration: {
        expiryDate: '2025-08-15',
        state: 'California',
        registrationNumber: 'CA-REG-004'
      },
      gps: {
        latitude: 37.7849,
        longitude: -122.4194,
        lastUpdate: '2024-08-14 16:50:45'
      },
      deliveries: {
        today: 12,
        thisWeek: 67,
        thisMonth: 234
      },
      performance: {
        avgDeliveryTime: 18,
        fuelEfficiency: 45.2,
        onTimeRate: 96.8
      }
    }
  ]);

  const [drivers, setDrivers] = useState([
    {
      id: 'DRV-001',
      name: 'John Doe',
      email: 'john.doe@dankdash.com',
      phone: '+1-555-0123',
      licenseNumber: 'CA-DL-123456789',
      licenseExpiry: '2026-03-15',
      status: 'Active',
      vehicle: 'VEH-001',
      rating: 4.8,
      totalDeliveries: 1250,
      onTimeRate: 94.2,
      customerRating: 4.7,
      joinDate: '2023-01-15',
      lastDelivery: '2024-08-14 16:30:00',
      currentLocation: {
        latitude: 37.7749,
        longitude: -122.4194,
        address: '123 Main St, San Francisco, CA'
      },
      performance: {
        avgDeliveryTime: 24,
        completionRate: 98.5,
        fuelEfficiency: 18.5
      },
      certifications: ['Cannabis Delivery', 'Safe Driving', 'Customer Service'],
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1-555-0124',
        relationship: 'Spouse'
      }
    },
    {
      id: 'DRV-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@dankdash.com',
      phone: '+1-555-0125',
      licenseNumber: 'CA-DL-987654321',
      licenseExpiry: '2025-11-20',
      status: 'On Route',
      vehicle: 'VEH-002',
      rating: 4.9,
      totalDeliveries: 980,
      onTimeRate: 91.7,
      customerRating: 4.9,
      joinDate: '2023-03-01',
      lastDelivery: '2024-08-14 16:15:00',
      currentLocation: {
        latitude: 37.8044,
        longitude: -122.2711,
        address: '456 Oak Ave, Oakland, CA'
      },
      performance: {
        avgDeliveryTime: 26,
        completionRate: 97.8,
        fuelEfficiency: 16.8
      },
      certifications: ['Cannabis Delivery', 'Safe Driving', 'First Aid'],
      emergencyContact: {
        name: 'Robert Johnson',
        phone: '+1-555-0126',
        relationship: 'Father'
      }
    },
    {
      id: 'DRV-003',
      name: 'Mike Chen',
      email: 'mike.chen@dankdash.com',
      phone: '+1-555-0127',
      licenseNumber: 'CA-DL-555666777',
      licenseExpiry: '2027-01-10',
      status: 'Active',
      vehicle: 'VEH-004',
      rating: 4.6,
      totalDeliveries: 1450,
      onTimeRate: 96.8,
      customerRating: 4.8,
      joinDate: '2022-11-15',
      lastDelivery: '2024-08-14 16:45:00',
      currentLocation: {
        latitude: 37.7849,
        longitude: -122.4194,
        address: '789 Pine St, San Francisco, CA'
      },
      performance: {
        avgDeliveryTime: 18,
        completionRate: 99.2,
        fuelEfficiency: 45.2
      },
      certifications: ['Cannabis Delivery', 'Motorcycle Safety', 'Customer Service'],
      emergencyContact: {
        name: 'Lisa Chen',
        phone: '+1-555-0128',
        relationship: 'Sister'
      }
    }
  ]);

  const [routes, setRoutes] = useState([
    {
      id: 'RTE-001',
      name: 'Downtown Route',
      driver: 'Mike Chen',
      vehicle: 'VEH-004',
      status: 'In Progress',
      startTime: '2024-08-14 14:00:00',
      estimatedEndTime: '2024-08-14 18:00:00',
      actualEndTime: null,
      totalStops: 8,
      completedStops: 5,
      remainingStops: 3,
      totalDistance: 25.6,
      estimatedDuration: 240,
      actualDuration: 165,
      fuelUsed: 2.1,
      deliveries: [
        { id: 'DEL-001', address: '123 Market St', status: 'Completed', time: '14:15' },
        { id: 'DEL-002', address: '456 Mission St', status: 'Completed', time: '14:35' },
        { id: 'DEL-003', address: '789 Howard St', status: 'Completed', time: '14:55' },
        { id: 'DEL-004', address: '321 Folsom St', status: 'Completed', time: '15:20' },
        { id: 'DEL-005', address: '654 Bryant St', status: 'Completed', time: '15:45' },
        { id: 'DEL-006', address: '987 Harrison St', status: 'In Transit', time: null },
        { id: 'DEL-007', address: '147 Brannan St', status: 'Pending', time: null },
        { id: 'DEL-008', address: '258 Townsend St', status: 'Pending', time: null }
      ],
      performance: {
        onTimeRate: 100,
        avgStopTime: 8.5,
        customerSatisfaction: 4.8
      }
    },
    {
      id: 'RTE-002',
      name: 'Oakland Route',
      driver: 'Sarah Johnson',
      vehicle: 'VEH-002',
      status: 'In Progress',
      startTime: '2024-08-14 13:30:00',
      estimatedEndTime: '2024-08-14 17:30:00',
      actualEndTime: null,
      totalStops: 6,
      completedStops: 4,
      remainingStops: 2,
      totalDistance: 32.4,
      estimatedDuration: 240,
      actualDuration: 195,
      fuelUsed: 3.8,
      deliveries: [
        { id: 'DEL-009', address: '111 Broadway', status: 'Completed', time: '13:45' },
        { id: 'DEL-010', address: '222 Telegraph Ave', status: 'Completed', time: '14:10' },
        { id: 'DEL-011', address: '333 Grand Ave', status: 'Completed', time: '14:40' },
        { id: 'DEL-012', address: '444 Lake Merritt Blvd', status: 'Completed', time: '15:15' },
        { id: 'DEL-013', address: '555 MacArthur Blvd', status: 'In Transit', time: null },
        { id: 'DEL-014', address: '666 International Blvd', status: 'Pending', time: null }
      ],
      performance: {
        onTimeRate: 95,
        avgStopTime: 12.3,
        customerSatisfaction: 4.9
      }
    },
    {
      id: 'RTE-003',
      name: 'Peninsula Route',
      driver: 'John Doe',
      vehicle: 'VEH-001',
      status: 'Completed',
      startTime: '2024-08-14 09:00:00',
      estimatedEndTime: '2024-08-14 15:00:00',
      actualEndTime: '2024-08-14 14:45:00',
      totalStops: 10,
      completedStops: 10,
      remainingStops: 0,
      totalDistance: 45.8,
      estimatedDuration: 360,
      actualDuration: 345,
      fuelUsed: 5.2,
      deliveries: [
        { id: 'DEL-015', address: '777 El Camino Real', status: 'Completed', time: '09:20' },
        { id: 'DEL-016', address: '888 University Ave', status: 'Completed', time: '09:50' },
        { id: 'DEL-017', address: '999 Middlefield Rd', status: 'Completed', time: '10:25' },
        { id: 'DEL-018', address: '101 California Ave', status: 'Completed', time: '11:00' },
        { id: 'DEL-019', address: '202 Forest Ave', status: 'Completed', time: '11:35' },
        { id: 'DEL-020', address: '303 Alma St', status: 'Completed', time: '12:10' },
        { id: 'DEL-021', address: '404 Castro St', status: 'Completed', time: '12:45' },
        { id: 'DEL-022', address: '505 Showers Dr', status: 'Completed', time: '13:20' },
        { id: 'DEL-023', address: '606 Bernardo Ave', status: 'Completed', time: '13:55' },
        { id: 'DEL-024', address: '707 Escuela Ave', status: 'Completed', time: '14:30' }
      ],
      performance: {
        onTimeRate: 100,
        avgStopTime: 10.2,
        customerSatisfaction: 4.7
      }
    }
  ]);

  const [maintenance, setMaintenance] = useState([
    {
      id: 'MNT-001',
      vehicle: 'VEH-002',
      type: 'Scheduled',
      service: 'Oil Change & Inspection',
      scheduledDate: '2024-08-20',
      status: 'Scheduled',
      priority: 'Medium',
      estimatedCost: 150.00,
      actualCost: null,
      serviceProvider: 'AutoCare Plus',
      description: 'Regular oil change and 30-point inspection',
      mileage: 28750,
      lastService: '2024-06-20',
      nextService: '2024-11-20',
      parts: ['Engine Oil', 'Oil Filter', 'Air Filter'],
      labor: 2.5,
      warranty: '6 months / 6,000 miles'
    },
    {
      id: 'MNT-002',
      vehicle: 'VEH-003',
      type: 'Repair',
      service: 'Brake Pad Replacement',
      scheduledDate: '2024-08-15',
      status: 'In Progress',
      priority: 'High',
      estimatedCost: 450.00,
      actualCost: null,
      serviceProvider: 'Fleet Service Center',
      description: 'Replace worn brake pads and resurface rotors',
      mileage: 45680,
      lastService: '2024-08-10',
      nextService: '2024-11-10',
      parts: ['Brake Pads', 'Brake Rotors', 'Brake Fluid'],
      labor: 4.0,
      warranty: '12 months / 12,000 miles'
    },
    {
      id: 'MNT-003',
      vehicle: 'VEH-001',
      type: 'Preventive',
      service: 'Tire Rotation & Alignment',
      scheduledDate: '2024-08-25',
      status: 'Scheduled',
      priority: 'Low',
      estimatedCost: 120.00,
      actualCost: null,
      serviceProvider: 'Tire World',
      description: 'Rotate tires and check wheel alignment',
      mileage: 15420,
      lastService: '2024-07-15',
      nextService: '2024-10-15',
      parts: ['Tire Balancing Weights'],
      labor: 1.5,
      warranty: '3 months / 3,000 miles'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalVehicles: 4,
    activeVehicles: 3,
    totalDrivers: 3,
    activeDrivers: 3,
    totalDeliveries: 2456,
    onTimeRate: 94.2,
    avgDeliveryTime: 22.5,
    fuelEfficiency: 19.7,
    maintenanceCost: 15680.50,
    totalMileage: 98770
  });

  // Filter functions
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || vehicle.status.toLowerCase().replace(' ', '-') === selectedStatus;
    const matchesType = selectedType === 'all' || vehicle.type.toLowerCase() === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'On Route': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Van': return 'bg-blue-100 text-blue-800';
      case 'Truck': return 'bg-purple-100 text-purple-800';
      case 'Motorcycle': return 'bg-green-100 text-green-800';
      case 'Car': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'Van': return '🚐';
      case 'Truck': return '🚛';
      case 'Motorcycle': return '🏍️';
      case 'Car': return '🚗';
      default: return '🚗';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-1a2 2 0 00-2-2H8a2 2 0 00-2 2v1a2 2 0 01-2 2 2 2 0 01-2-2V9a2 2 0 012-2h2V7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalVehicles}</p>
              <p className="text-sm text-blue-600">{analytics.activeVehicles} active</p>
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
              <p className="text-sm font-medium text-gray-600">On-Time Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.onTimeRate}%</p>
              <p className="text-sm text-green-600">Above target</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Delivery Time</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgDeliveryTime}m</p>
              <p className="text-sm text-purple-600">Per delivery</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Fuel Efficiency</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.fuelEfficiency}</p>
              <p className="text-sm text-yellow-600">MPG average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Fleet Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.onTimeRate}%</div>
              <div className="text-sm text-gray-600">On-Time Delivery Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.onTimeRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.fuelEfficiency}</div>
              <div className="text-sm text-gray-600">Average Fuel Efficiency (MPG)</div>
              <div className="text-xs text-gray-500 mt-1">Fleet average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.totalDeliveries.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Deliveries</div>
              <div className="text-xs text-gray-500 mt-1">This month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{(analytics.totalMileage / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Total Mileage</div>
              <div className="text-xs text-gray-500 mt-1">All vehicles</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Vehicles */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Vehicles</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {vehicles.filter(v => v.status === 'Active' || v.status === 'In Transit').map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getVehicleIcon(vehicle.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                    <p className="text-sm text-gray-600">{vehicle.licensePlate} • {vehicle.driver || 'Unassigned'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{vehicle.deliveries.today}</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{vehicle.fuelLevel}%</p>
                      <p className="text-xs text-gray-500">Fuel</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{vehicle.performance.onTimeRate}%</p>
                      <p className="text-xs text-gray-500">On-Time</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Routes */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Routes</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {routes.filter(r => r.status === 'In Progress').map((route) => (
              <div key={route.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{route.name}</h4>
                    <p className="text-sm text-gray-600">{route.driver} • {route.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{route.completedStops}/{route.totalStops}</p>
                      <p className="text-xs text-gray-500">Stops</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{route.totalDistance} mi</p>
                      <p className="text-xs text-gray-500">Distance</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{Math.round((route.completedStops / route.totalStops) * 100)}%</p>
                      <p className="text-xs text-gray-500">Progress</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(route.status)}`}>
                      {route.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maintenance Alerts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Maintenance Alerts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {vehicles.filter(v => v.maintenanceDue).map((vehicle) => (
              <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg bg-yellow-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-yellow-600 font-bold">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{vehicle.name}</h4>
                    <p className="text-sm text-gray-600">Maintenance due: {vehicle.nextMaintenance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-yellow-600 font-medium">Due Soon</p>
                  <p className="text-sm text-gray-500">{vehicle.mileage.toLocaleString()} miles</p>
                </div>
              </div>
            ))}
            {maintenance.filter(m => m.status === 'Scheduled' && m.priority === 'High').map((maint) => (
              <div key={maint.id} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-red-600 font-bold">🔧</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{maint.service}</h4>
                    <p className="text-sm text-gray-600">{maint.vehicle} • {maint.scheduledDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-red-600 font-medium">High Priority</p>
                  <p className="text-sm text-gray-500">${maint.estimatedCost}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVehicles = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search vehicles..."
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
              <option value="active">Active</option>
              <option value="in-transit">In Transit</option>
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="van">Van</option>
              <option value="truck">Truck</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="car">Car</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Vehicle
            </button>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getVehicleIcon(vehicle.type)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{vehicle.name}</h3>
                  <p className="text-sm text-gray-600">{vehicle.make} {vehicle.model} {vehicle.year}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(vehicle.type)}`}>
                  {vehicle.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                  {vehicle.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">License Plate:</span>
                <span className="text-gray-900 font-medium">{vehicle.licensePlate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Driver:</span>
                <span className="text-gray-900">{vehicle.driver || 'Unassigned'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-900">{vehicle.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Mileage:</span>
                <span className="text-gray-900">{vehicle.mileage.toLocaleString()} miles</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fuel Level:</span>
                <span className={`${vehicle.fuelLevel < 25 ? 'text-red-600' : 'text-green-600'}`}>
                  {vehicle.fuelLevel}%
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Fuel Level</span>
                <span>{vehicle.fuelLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${vehicle.fuelLevel < 25 ? 'bg-red-600' : 'bg-green-600'}`} 
                  style={{ width: `${vehicle.fuelLevel}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{vehicle.deliveries.today}</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{vehicle.deliveries.thisWeek}</p>
                <p className="text-xs text-gray-500">This Week</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{vehicle.performance.onTimeRate}%</p>
                <p className="text-xs text-gray-500">On-Time</p>
              </div>
            </div>
            
            {vehicle.maintenanceDue && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-yellow-600 mr-2">⚠️</span>
                  <span className="text-sm text-yellow-800">Maintenance due: {vehicle.nextMaintenance}</span>
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Track Location
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDrivers = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search drivers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Driver
            </button>
          </div>
        </div>
      </div>

      {/* Drivers List */}
      <div className="space-y-4">
        {drivers.map((driver) => (
          <div key={driver.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                  <p className="text-sm text-gray-600">{driver.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(driver.status)}`}>
                  {driver.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Vehicle:</p>
                <p className="text-sm text-gray-600">{driver.vehicle || 'Unassigned'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">License:</p>
                <p className="text-sm text-gray-600">{driver.licenseNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">License Expiry:</p>
                <p className="text-sm text-gray-600">{driver.licenseExpiry}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Join Date:</p>
                <p className="text-sm text-gray-600">{driver.joinDate}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{driver.totalDeliveries.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Deliveries</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{driver.onTimeRate}%</p>
                <p className="text-sm text-gray-600">On-Time Rate</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{driver.customerRating}</p>
                <p className="text-sm text-gray-600">Customer Rating</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-600">{driver.performance.avgDeliveryTime}m</p>
                <p className="text-sm text-gray-600">Avg Delivery Time</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Current Location:</p>
              <p className="text-sm text-gray-600">{driver.currentLocation.address}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Certifications:</p>
              <div className="flex flex-wrap gap-2">
                {driver.certifications.map((cert, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Profile
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Track Location
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Message Driver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaintenance = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search maintenance records..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Schedule Maintenance
            </button>
          </div>
        </div>
      </div>

      {/* Maintenance List */}
      <div className="space-y-4">
        {maintenance.map((maint) => (
          <div key={maint.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{maint.service}</h3>
                  <p className="text-sm text-gray-600">{maint.vehicle} • {maint.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(maint.priority)}`}>
                  {maint.priority}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(maint.status)}`}>
                  {maint.status}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{maint.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Scheduled Date:</p>
                <p className="text-sm text-gray-600">{maint.scheduledDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Service Provider:</p>
                <p className="text-sm text-gray-600">{maint.serviceProvider}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Estimated Cost:</p>
                <p className="text-sm text-green-600">${maint.estimatedCost.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Labor Hours:</p>
                <p className="text-sm text-gray-600">{maint.labor} hours</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Parts Required:</p>
              <div className="flex flex-wrap gap-2">
                {maint.parts.map((part, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {part}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Warranty:</p>
              <p className="text-sm text-gray-600">{maint.warranty}</p>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit Schedule
              </button>
              {maint.status === 'Scheduled' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Mark Complete
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
          <h1 className="text-3xl font-bold text-gray-900">Fleet Management</h1>
          <p className="mt-2 text-gray-600">Manage vehicles, drivers, routes, and maintenance schedules</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'vehicles', name: 'Vehicles', icon: '🚐' },
              { id: 'drivers', name: 'Drivers', icon: '👥' },
              { id: 'maintenance', name: 'Maintenance', icon: '🔧' }
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
        {activeTab === 'vehicles' && renderVehicles()}
        {activeTab === 'drivers' && renderDrivers()}
        {activeTab === 'maintenance' && renderMaintenance()}
      </div>
    </div>
  );
};

export default FleetModule;

