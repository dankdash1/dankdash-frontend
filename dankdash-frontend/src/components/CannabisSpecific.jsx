import React, { useState, useEffect } from 'react';

const CannabisSpecific = () => {
  const [activeTab, setActiveTab] = useState('strains');

  // Mock cannabis-specific data
  const [strains, setStrains] = useState([
    {
      id: 1,
      name: 'Premium OG Kush',
      type: 'Indica',
      thc: 24.5,
      cbd: 0.8,
      genetics: 'OG Kush x Hindu Kush',
      effects: ['Relaxing', 'Euphoric', 'Sleepy'],
      flavors: ['Earthy', 'Pine', 'Citrus'],
      growTime: 65,
      yield: 'High',
      difficulty: 'Moderate',
      status: 'Active',
      stock: 45,
      price: 45.00
    },
    {
      id: 2,
      name: 'Blue Dream',
      type: 'Sativa',
      thc: 21.2,
      cbd: 1.2,
      genetics: 'Blueberry x Haze',
      effects: ['Creative', 'Uplifting', 'Focused'],
      flavors: ['Berry', 'Sweet', 'Vanilla'],
      growTime: 70,
      yield: 'Very High',
      difficulty: 'Easy',
      status: 'Active',
      stock: 32,
      price: 42.00
    },
    {
      id: 3,
      name: 'Girl Scout Cookies',
      type: 'Hybrid',
      thc: 28.1,
      cbd: 0.5,
      genetics: 'Durban Poison x OG Kush',
      effects: ['Happy', 'Relaxed', 'Creative'],
      flavors: ['Sweet', 'Earthy', 'Mint'],
      growTime: 63,
      yield: 'Medium',
      difficulty: 'Hard',
      status: 'Active',
      stock: 18,
      price: 52.00
    }
  ]);

  const [complianceData, setComplianceData] = useState({
    licenses: [
      {
        type: 'Cultivation License',
        number: 'CULT-2024-001',
        issuer: 'California Department of Cannabis Control',
        issueDate: '2024-01-15',
        expiryDate: '2025-01-15',
        status: 'Active',
        renewalDue: 45
      },
      {
        type: 'Manufacturing License',
        number: 'MFG-2024-002',
        issuer: 'California Department of Cannabis Control',
        issueDate: '2024-02-01',
        expiryDate: '2025-02-01',
        status: 'Active',
        renewalDue: 62
      },
      {
        type: 'Distribution License',
        number: 'DIST-2024-003',
        issuer: 'California Department of Cannabis Control',
        issueDate: '2024-03-01',
        expiryDate: '2025-03-01',
        status: 'Active',
        renewalDue: 90
      }
    ],
    testing: [
      {
        batch: 'OGK-240812-001',
        product: 'Premium OG Kush',
        testDate: '2024-08-10',
        lab: 'Green Scientific Labs',
        thc: 24.5,
        cbd: 0.8,
        pesticides: 'Pass',
        heavyMetals: 'Pass',
        microbials: 'Pass',
        residualSolvents: 'Pass',
        status: 'Approved'
      },
      {
        batch: 'BD-240811-002',
        product: 'Blue Dream',
        testDate: '2024-08-09',
        lab: 'CannaSafe Analytics',
        thc: 21.2,
        cbd: 1.2,
        pesticides: 'Pass',
        heavyMetals: 'Pass',
        microbials: 'Pass',
        residualSolvents: 'Pass',
        status: 'Approved'
      }
    ],
    tracking: [
      {
        uid: 'CA-1A4FF0000000022000000123',
        product: 'Premium OG Kush',
        quantity: 100,
        unit: 'grams',
        location: 'Warehouse A',
        status: 'Active',
        lastUpdate: '2024-08-12 14:30'
      },
      {
        uid: 'CA-1A4FF0000000022000000124',
        product: 'Blue Dream Cartridge',
        quantity: 50,
        unit: 'units',
        location: 'Warehouse B',
        status: 'Active',
        lastUpdate: '2024-08-12 15:15'
      }
    ]
  });

  const [growRooms, setGrowRooms] = useState([
    {
      id: 'room-1',
      name: 'Flowering Room A',
      stage: 'Flowering',
      strain: 'Premium OG Kush',
      plantCount: 48,
      daysSinceFlip: 35,
      temperature: 75.2,
      humidity: 45.8,
      co2: 1200,
      ph: 6.2,
      ec: 1.8,
      lightCycle: '12/12',
      status: 'Optimal'
    },
    {
      id: 'room-2',
      name: 'Vegetative Room B',
      stage: 'Vegetative',
      strain: 'Blue Dream',
      plantCount: 72,
      daysSinceFlip: 21,
      temperature: 78.5,
      humidity: 65.2,
      co2: 800,
      ph: 6.0,
      ec: 1.4,
      lightCycle: '18/6',
      status: 'Optimal'
    },
    {
      id: 'room-3',
      name: 'Clone Room C',
      stage: 'Clone',
      strain: 'Girl Scout Cookies',
      plantCount: 120,
      daysSinceFlip: 7,
      temperature: 76.8,
      humidity: 75.5,
      co2: 600,
      ph: 5.8,
      ec: 0.8,
      lightCycle: '24/0',
      status: 'Attention'
    }
  ]);

  const [deliveryZones, setDeliveryZones] = useState([
    {
      id: 1,
      name: 'San Francisco',
      radius: 15,
      minOrder: 50,
      deliveryFee: 10,
      avgDeliveryTime: 45,
      activeOrders: 12,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Oakland',
      radius: 20,
      minOrder: 75,
      deliveryFee: 15,
      avgDeliveryTime: 60,
      activeOrders: 8,
      status: 'Active'
    },
    {
      id: 3,
      name: 'San Jose',
      radius: 25,
      minOrder: 100,
      deliveryFee: 20,
      avgDeliveryTime: 75,
      activeOrders: 5,
      status: 'Limited'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': case 'Approved': case 'Pass': case 'Optimal': return 'bg-green-100 text-green-800';
      case 'Attention': case 'Limited': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': case 'Failed': case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStrains = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Strain Management</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Strain
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strains.map((strain) => (
          <div key={strain.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{strain.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(strain.status)}`}>
                {strain.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">{strain.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">THC:</span>
                <span className="font-medium">{strain.thc}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">CBD:</span>
                <span className="font-medium">{strain.cbd}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className="font-medium">{strain.stock}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">${strain.price}/g</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Effects:</p>
              <div className="flex flex-wrap gap-1">
                {strain.effects.map((effect, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {effect}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Flavors:</p>
              <div className="flex flex-wrap gap-1">
                {strain.flavors.map((flavor, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {flavor}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Edit
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Clone
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      {/* Licenses */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Cannabis Licenses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renewal Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceData.licenses.map((license, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{license.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{license.number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{license.issuer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{license.expiryDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{license.renewalDue} days</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                      {license.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lab Testing */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Lab Testing Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">THC/CBD</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pesticides</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Microbials</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceData.testing.map((test, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{test.batch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{test.thc}% / {test.cbd}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.pesticides)}`}>
                      {test.pesticides}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.microbials)}`}>
                      {test.microbials}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seed-to-Sale Tracking */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Seed-to-Sale Tracking</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">UID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceData.tracking.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">{item.uid}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity} {item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.lastUpdate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
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

  const renderGrowOps = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Grow Room Operations</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Room
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {growRooms.map((room) => (
          <div key={room.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{room.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(room.status)}`}>
                {room.status}
              </span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Stage:</span>
                <span className="font-medium">{room.stage}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Strain:</span>
                <span className="font-medium">{room.strain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plants:</span>
                <span className="font-medium">{room.plantCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Days:</span>
                <span className="font-medium">{room.daysSinceFlip}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <h5 className="font-medium text-gray-900 mb-3">Environmental Conditions</h5>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Temp:</span>
                  <span className="font-medium ml-1">{room.temperature}°F</span>
                </div>
                <div>
                  <span className="text-gray-600">Humidity:</span>
                  <span className="font-medium ml-1">{room.humidity}%</span>
                </div>
                <div>
                  <span className="text-gray-600">CO2:</span>
                  <span className="font-medium ml-1">{room.co2} ppm</span>
                </div>
                <div>
                  <span className="text-gray-600">pH:</span>
                  <span className="font-medium ml-1">{room.ph}</span>
                </div>
                <div>
                  <span className="text-gray-600">EC:</span>
                  <span className="font-medium ml-1">{room.ec}</span>
                </div>
                <div>
                  <span className="text-gray-600">Light:</span>
                  <span className="font-medium ml-1">{room.lightCycle}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Monitor
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Adjust
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDelivery = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Cannabis Delivery Zones</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Zone
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveryZones.map((zone) => (
          <div key={zone.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{zone.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(zone.status)}`}>
                {zone.status}
              </span>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Radius:</span>
                <span className="font-medium">{zone.radius} miles</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Min Order:</span>
                <span className="font-medium">${zone.minOrder}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee:</span>
                <span className="font-medium">${zone.deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Time:</span>
                <span className="font-medium">{zone.avgDeliveryTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Orders:</span>
                <span className="font-medium">{zone.activeOrders}</span>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Edit Zone
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                View Map
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Age Verification Settings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Age Verification & Compliance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Verification Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Minimum Age</span>
                  <span className="font-medium">21 years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">ID Verification</span>
                  <span className="text-green-600">✓ Required</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Photo Verification</span>
                  <span className="text-green-600">✓ Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Address Verification</span>
                  <span className="text-green-600">✓ Required</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Delivery Compliance</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Driver License Check</span>
                  <span className="text-green-600">✓ Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">GPS Tracking</span>
                  <span className="text-green-600">✓ Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Delivery Hours</span>
                  <span className="font-medium">8 AM - 10 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Max Daily Limit</span>
                  <span className="font-medium">1 oz per customer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cannabis Operations</h1>
          <p className="text-gray-600 mt-2">Specialized cannabis business management and compliance tools</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'strains', name: 'Strain Management', icon: '🌿' },
              { id: 'compliance', name: 'Compliance & Testing', icon: '📋' },
              { id: 'grow', name: 'Grow Operations', icon: '🌱' },
              { id: 'delivery', name: 'Cannabis Delivery', icon: '🚚' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'strains' && renderStrains()}
        {activeTab === 'compliance' && renderCompliance()}
        {activeTab === 'grow' && renderGrowOps()}
        {activeTab === 'delivery' && renderDelivery()}
      </div>
    </div>
  );
};

export default CannabisSpecific;

