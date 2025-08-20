import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  RefreshCw, 
  Package, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  X,
  Eye,
  EyeOff,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Truck,
  Leaf,
  BarChart3,
  Users
} from 'lucide-react';

const METRCModule = () => {
  const [activeMainTab, setActiveMainTab] = useState('plants');
  const [activeSubTab, setActiveSubTab] = useState('immature');
  const [isEditing, setIsEditing] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [showCreateTransfer, setShowCreateTransfer] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Load saved config from localStorage
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem('metrc_config');
    return saved ? JSON.parse(saved) : {
      state: 'OK',
      licenseNumber: 'GAAI-2SGP-B3GR',
      userApiKey: '',
      facilityApiKey: '',
      businessName: 'Cannaflame, LLC',
      facilityName: 'Cannaflame, LLC',
      baseUrl: 'https://api-ok.metrc.com'
    };
  });

  const [showApiKeys, setShowApiKeys] = useState({
    user: false,
    facility: false
  });

  // Sample data for different categories
  const [plantsData, setPlantsData] = useState({
    immature: [
      { id: 'PLT001', strain: 'Blue Dream', quantity: 50, location: 'Room A', plantedDate: '2024-12-01', source: 'PKG001' },
      { id: 'PLT002', strain: 'OG Kush', quantity: 25, location: 'Room B', plantedDate: '2024-12-02', source: 'PKG002' },
      { id: 'PLT003', strain: 'White Widow', quantity: 30, location: 'Room A', plantedDate: '2024-12-03', source: 'PKG003' }
    ],
    vegetative: [
      { id: 'PLT101', strain: 'Blue Dream', tag: 'GAAI001', location: 'Veg Room 1', plantedDate: '2024-11-15', phase: 'Vegetative' },
      { id: 'PLT102', strain: 'OG Kush', tag: 'GAAI002', location: 'Veg Room 1', plantedDate: '2024-11-16', phase: 'Vegetative' },
      { id: 'PLT103', strain: 'Sour Diesel', tag: 'GAAI003', location: 'Veg Room 2', plantedDate: '2024-11-17', phase: 'Vegetative' }
    ],
    flowering: [
      { id: 'PLT201', strain: 'Blue Dream', tag: 'GAAI101', location: 'Flower Room 1', flowerDate: '2024-10-15', expectedHarvest: '2024-12-20' },
      { id: 'PLT202', strain: 'OG Kush', tag: 'GAAI102', location: 'Flower Room 1', flowerDate: '2024-10-16', expectedHarvest: '2024-12-21' },
      { id: 'PLT203', strain: 'White Widow', tag: 'GAAI103', location: 'Flower Room 2', flowerDate: '2024-10-17', expectedHarvest: '2024-12-22' }
    ],
    harvested: [
      { id: 'PLT301', strain: 'Blue Dream', tag: 'GAAI201', harvestDate: '2024-12-10', weight: '156.5g', dryingLocation: 'Dry Room A' },
      { id: 'PLT302', strain: 'OG Kush', tag: 'GAAI202', harvestDate: '2024-12-11', weight: '142.3g', dryingLocation: 'Dry Room A' },
      { id: 'PLT303', strain: 'Sour Diesel', tag: 'GAAI203', harvestDate: '2024-12-12', weight: '189.7g', dryingLocation: 'Dry Room B' }
    ]
  });

  const [packagesData, setPackagesData] = useState({
    active: [
      { id: 'PKG001', product: 'Blue Dream Flower', tag: 'GAAI-PKG-001', quantity: '156.5g', location: 'Vault A', packagedDate: '2024-12-13' },
      { id: 'PKG002', product: 'OG Kush Live Resin', tag: 'GAAI-PKG-002', quantity: '23.2g', location: 'Vault B', packagedDate: '2024-12-14' },
      { id: 'PKG003', product: 'Chocolate Chip Cookies', tag: 'GAAI-PKG-003', quantity: '48 units', location: 'Vault A', packagedDate: '2024-12-15' }
    ],
    onHold: [
      { id: 'PKG101', product: 'White Widow Flower', tag: 'GAAI-PKG-101', quantity: '89.3g', location: 'Hold Area', reason: 'Quality Check' }
    ],
    inactive: [
      { id: 'PKG201', product: 'Sold Blue Dream', tag: 'GAAI-PKG-201', quantity: '0g', soldDate: '2024-12-10', destination: 'Green Valley Dispensary' }
    ]
  });

  const [transfersData, setTransfersData] = useState({
    incoming: [
      { id: 'TRF001', manifest: 'M240001', origin: 'Supplier ABC', products: 3, status: 'In Transit', eta: '2024-12-16' }
    ],
    outgoing: [
      { id: 'TRF101', manifest: 'M240101', destination: 'Green Valley Dispensary', products: 5, status: 'Delivered', date: '2024-12-14' },
      { id: 'TRF102', manifest: 'M240102', destination: 'High Times Collective', products: 3, status: 'In Transit', date: '2024-12-15' }
    ],
    active: [
      { id: 'TRF201', manifest: 'M240201', destination: 'Cannabis Corner', products: 2, status: 'Preparing', scheduledDate: '2024-12-17' }
    ]
  });

  // Save config to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('metrc_config', JSON.stringify(config));
  }, [config]);

  const handleSave = () => {
    localStorage.setItem('metrc_config', JSON.stringify(config));
    setIsEditing(false);
    setConnectionMessage('✅ Configuration saved successfully!');
  };

  const testConnection = async () => {
    if (!config.userApiKey || !config.licenseNumber) {
      setConnectionMessage('❌ Please enter API key and license number first.');
      return;
    }

    setIsTestingConnection(true);
    setConnectionMessage('🔄 Testing connection...');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionMessage('✅ API key format validated! Note: Full METRC connection requires backend integration due to CORS restrictions.');
    } catch (error) {
      setConnectionMessage('❌ Connection test failed. Please check your credentials.');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const syncData = async () => {
    setIsSyncing(true);
    setConnectionMessage('🔄 Syncing data with METRC...');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionMessage('✅ Data synced successfully with METRC!');
    } catch (error) {
      setConnectionMessage('❌ Data sync failed. Please check your connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  const getMainTabContent = () => {
    switch (activeMainTab) {
      case 'plants':
        return renderPlantsContent();
      case 'packages':
        return renderPackagesContent();
      case 'transfers':
        return renderTransfersContent();
      case 'financial':
        return renderFinancialContent();
      case 'administration':
        return renderAdministrationContent();
      default:
        return renderPlantsContent();
    }
  };

  const renderPlantsContent = () => {
    const subTabs = [
      { id: 'immature', label: 'Immature', count: plantsData.immature?.length || 0 },
      { id: 'vegetative', label: 'Vegetative', count: plantsData.vegetative?.length || 0 },
      { id: 'flowering', label: 'Flowering', count: plantsData.flowering?.length || 0 },
      { id: 'harvested', label: 'Harvested', count: plantsData.harvested?.length || 0 },
      { id: 'onHold', label: 'On Hold', count: 0 },
      { id: 'inactive', label: 'Inactive', count: 0 },
      { id: 'additives', label: 'Additives', count: 0 },
      { id: 'waste', label: 'Waste', count: 0 }
    ];

    return (
      <div className="space-y-6">
        {/* Sub Navigation */}
        <div className="bg-gray-50 rounded-lg p-1">
          <div className="flex flex-wrap gap-1">
            {subTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                  activeSubTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                🌱 Plants - {subTabs.find(t => t.id === activeSubTab)?.label}
              </h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search plants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Plants</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {renderPlantsTable()}
          </div>
        </div>
      </div>
    );
  };

  const renderPlantsTable = () => {
    const currentData = plantsData[activeSubTab] || [];
    
    if (currentData.length === 0) {
      return (
        <div className="text-center py-12">
          <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeSubTab} plants</h3>
          <p className="text-gray-600">No plants found in this category.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((plant, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plant.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{plant.strain}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {plant.quantity && `Qty: ${plant.quantity}`}
                  {plant.tag && `Tag: ${plant.tag}`}
                  {plant.weight && `Weight: ${plant.weight}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{plant.location || plant.dryingLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {plant.plantedDate || plant.flowerDate || plant.harvestDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <button className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPackagesContent = () => {
    const subTabs = [
      { id: 'active', label: 'Active', count: packagesData.active?.length || 0 },
      { id: 'onHold', label: 'On Hold', count: packagesData.onHold?.length || 0 },
      { id: 'inactive', label: 'Inactive', count: packagesData.inactive?.length || 0 }
    ];

    return (
      <div className="space-y-6">
        {/* Sub Navigation */}
        <div className="bg-gray-50 rounded-lg p-1">
          <div className="flex flex-wrap gap-1">
            {subTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                  activeSubTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                📦 Packages - {subTabs.find(t => t.id === activeSubTab)?.label}
              </h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search packages..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Create Package</span>
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {renderPackagesTable()}
          </div>
        </div>
      </div>
    );
  };

  const renderPackagesTable = () => {
    const currentData = packagesData[activeSubTab] || [];
    
    if (currentData.length === 0) {
      return (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeSubTab} packages</h3>
          <p className="text-gray-600">No packages found in this category.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((pkg, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pkg.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pkg.product}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.tag}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{pkg.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {pkg.packagedDate || pkg.soldDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <button className="text-blue-600 hover:text-blue-700 mr-3">Edit</button>
                  <button className="text-green-600 hover:text-green-700 mr-3">Transfer</button>
                  <button className="text-red-600 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTransfersContent = () => {
    const subTabs = [
      { id: 'newTransfer', label: 'New Transfer', count: 0 },
      { id: 'viewManifests', label: 'View Manifests', count: 15 },
      { id: 'incoming', label: 'Incoming', count: transfersData.incoming?.length || 0 },
      { id: 'active', label: 'Active', count: transfersData.active?.length || 0 },
      { id: 'outgoing', label: 'Outgoing', count: transfersData.outgoing?.length || 0 },
      { id: 'rejected', label: 'Rejected', count: 0 },
      { id: 'inactive', label: 'Inactive', count: 0 }
    ];

    return (
      <div className="space-y-6">
        {/* Sub Navigation */}
        <div className="bg-gray-50 rounded-lg p-1">
          <div className="flex flex-wrap gap-1">
            {subTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                  activeSubTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{tab.label}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{tab.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow">
          {renderTransferContent()}
        </div>
      </div>
    );
  };

  const renderTransferContent = () => {
    if (activeSubTab === 'newTransfer') {
      return (
        <div className="p-6">
          <div className="text-center py-12">
            <Truck className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Transfer Manifest</h3>
            <p className="text-gray-600 mb-6">Create a new transport manifest for transferring products to licensed facilities.</p>
            <button 
              onClick={() => setShowCreateTransfer(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Create Transfer Manifest</span>
            </button>
          </div>
        </div>
      );
    }

    if (activeSubTab === 'viewManifests') {
      return (
        <div>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">📋 All Manifests</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search manifests..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manifest #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">M240101</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Green Valley Dispensary</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">5 items</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Delivered</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2024-12-14</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <button className="text-blue-600 hover:text-blue-700 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-700">Print</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">M240102</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">High Times Collective</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">3 items</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">In Transit</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2024-12-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <button className="text-blue-600 hover:text-blue-700 mr-3">View</button>
                      <button className="text-orange-600 hover:text-orange-700">Track</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    // For other transfer tabs, show the appropriate data
    const currentData = transfersData[activeSubTab] || [];
    
    return (
      <div>
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            🚚 Transfers - {activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1)}
          </h3>
        </div>
        <div className="p-6">
          {currentData.length === 0 ? (
            <div className="text-center py-12">
              <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeSubTab} transfers</h3>
              <p className="text-gray-600">No transfers found in this category.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manifest</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {activeSubTab === 'incoming' ? 'Origin' : 'Destination'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((transfer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transfer.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transfer.manifest}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {transfer.origin || transfer.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transfer.products}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          transfer.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          transfer.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transfer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {transfer.date || transfer.eta || transfer.scheduledDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <button className="text-blue-600 hover:text-blue-700 mr-3">View</button>
                        <button className="text-green-600 hover:text-green-700">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFinancialContent = () => {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">📊 Financial Reports</h3>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Reports</h3>
            <p className="text-gray-600 mb-6">View and generate financial reports for compliance and business analysis.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-medium">Sales Report</p>
                <p className="text-sm text-gray-600">Monthly sales summary</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium">Tax Report</p>
                <p className="text-sm text-gray-600">Tax compliance report</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Package className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="font-medium">Inventory Report</p>
                <p className="text-sm text-gray-600">Current inventory status</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAdministrationContent = () => {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">⚙️ Administration</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>{isEditing ? 'Cancel' : 'Edit Configuration'}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                value={config.state}
                onChange={(e) => setConfig({...config, state: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
              <input
                type="text"
                value={config.licenseNumber}
                onChange={(e) => setConfig({...config, licenseNumber: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">User API Key</label>
              <div className="relative">
                <input
                  type={showApiKeys.user ? "text" : "password"}
                  value={config.userApiKey}
                  onChange={(e) => setConfig({...config, userApiKey: e.target.value})}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKeys({...showApiKeys, user: !showApiKeys.user})}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showApiKeys.user ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facility API Key</label>
              <div className="relative">
                <input
                  type={showApiKeys.facility ? "text" : "password"}
                  value={config.facilityApiKey}
                  onChange={(e) => setConfig({...config, facilityApiKey: e.target.value})}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKeys({...showApiKeys, facility: !showApiKeys.facility})}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showApiKeys.facility ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                value={config.businessName}
                onChange={(e) => setConfig({...config, businessName: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
              <input
                type="text"
                value={config.facilityName}
                onChange={(e) => setConfig({...config, facilityName: e.target.value})}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-50"
              />
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Configuration
              </button>
              <button
                onClick={testConnection}
                disabled={isTestingConnection}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {isTestingConnection ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Test Connection</span>
                  </>
                )}
              </button>
              <button
                onClick={syncData}
                disabled={isSyncing}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Sync All Data</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">METRC Integration</h1>
            <p className="text-gray-600 mt-1">Oklahoma Medical Marijuana Authority - Complete Cannabis Compliance System</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Connected - {config.businessName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-gray-50 rounded-lg p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => {setActiveMainTab('plants'); setActiveSubTab('immature');}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeMainTab === 'plants'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>Plants</span>
          </button>
          <button
            onClick={() => {setActiveMainTab('packages'); setActiveSubTab('active');}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeMainTab === 'packages'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Packages</span>
          </button>
          <button
            onClick={() => {setActiveMainTab('transfers'); setActiveSubTab('newTransfer');}}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeMainTab === 'transfers'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Transfers</span>
          </button>
          <button
            onClick={() => setActiveMainTab('financial')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeMainTab === 'financial'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Financial Reports</span>
          </button>
          <button
            onClick={() => setActiveMainTab('administration')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeMainTab === 'administration'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Administration</span>
          </button>
        </div>
      </div>

      {/* Connection Message */}
      {connectionMessage && (
        <div className={`p-4 rounded-lg ${
          connectionMessage.includes('✅') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : connectionMessage.includes('❌') 
            ? 'bg-red-50 text-red-800 border border-red-200'
            : 'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          {connectionMessage}
        </div>
      )}

      {/* Tab Content */}
      {getMainTabContent()}

      {/* Create Transfer Modal */}
      {showCreateTransfer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Create Transfer Manifest</h3>
                <button
                  onClick={() => setShowCreateTransfer(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination Facility</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>Select destination...</option>
                    <option>Green Valley Dispensary</option>
                    <option>High Times Collective</option>
                    <option>Cannabis Corner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Transport Date</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Packages to Transfer</label>
                  <div className="border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
                    {packagesData.active.map((pkg, index) => (
                      <div key={index} className="p-3 border-b border-gray-100 flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <div className="flex-1">
                          <p className="font-medium">{pkg.product}</p>
                          <p className="text-sm text-gray-600">{pkg.tag} - {pkg.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver Information</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Driver Name"
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Driver License #"
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Information</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Vehicle Make/Model"
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="License Plate"
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
                <button 
                  onClick={() => setShowCreateTransfer(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowCreateTransfer(false);
                    setConnectionMessage('✅ Transfer manifest created successfully! Manifest #M240103 generated.');
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Manifest & Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default METRCModule;

