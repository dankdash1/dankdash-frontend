import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Leaf, Package, Truck, FileText, Settings, 
  CheckCircle, AlertCircle, Clock, Eye, EyeOff, X,
  RefreshCw, Plus, Download, Upload
} from 'lucide-react';

const CompleteMETRCSystem = () => {
  // State management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSubTab, setActiveSubTab] = useState('immature');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [showApiKey, setShowApiKey] = useState(false);
  
  // METRC data state
  const [plants, setPlants] = useState([]);
  const [packages, setPackages] = useState([]);
  const [manifests, setManifests] = useState([]);
  
  // Bulk operation states
  const [showBulkHarvest, setShowBulkHarvest] = useState(false);
  const [showBulkManifest, setShowBulkManifest] = useState(false);
  const [showBulkPlants, setShowBulkPlants] = useState(false);
  const [bulkHarvestData, setBulkHarvestData] = useState('');
  const [bulkManifestData, setBulkManifestData] = useState('');
  const [bulkPlantData, setBulkPlantData] = useState('');
  const [bulkProgress, setBulkProgress] = useState(0);
  const [bulkResults, setBulkResults] = useState([]);

  // Configuration state
  const [config, setConfig] = useState({
    state: 'OK',
    licenseNumber: 'GAAI-2SGP-B3GR',
    userApiKey: '',
    facilityApiKey: '',
    businessName: 'Cannaflame, LLC',
    facilityName: 'Cannaflame, LLC'
  });

  // Load configuration from localStorage
  useEffect(() => {
    const savedConfig = localStorage.getItem('metrc_config');
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    }
    loadMETRCData();
  }, []);

  // Save configuration to localStorage
  const saveConfiguration = () => {
    localStorage.setItem('metrc_config', JSON.stringify(config));
    setConnectionStatus('saved');
    setTimeout(() => setConnectionStatus('disconnected'), 2000);
  };

  // Test METRC connection
  const testConnection = async () => {
    setIsLoading(true);
    setConnectionStatus('testing');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (config.userApiKey && config.licenseNumber) {
        setConnectionStatus('connected');
        loadMETRCData();
      } else {
        setConnectionStatus('error');
      }
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Load METRC data
  const loadMETRCData = async () => {
    // Simulate loading real METRC data
    setPlants([
      { Id: '1A4DE0000000001', StrainName: 'GUMBO RUNTS', LocationName: 'VEG ROOM', PlantState: 'Vegetative', PlantedDate: '2024-01-10' },
      { Id: '1A4DE0000000002', StrainName: 'Biscotti', LocationName: 'VEG ROOM A', PlantState: 'Flowering', PlantedDate: '2024-01-08' },
      { Id: '1A4DE0000000003', StrainName: 'FIZZY', LocationName: 'VEG ROOM B', PlantState: 'Vegetative', PlantedDate: '2024-01-12' }
    ]);

    setPackages([
      { Id: 'PKG001', ProductName: 'Blue Dream Flower', Quantity: '156.5', UnitOfMeasureName: 'Grams', PackageState: 'Active' },
      { Id: 'PKG002', ProductName: 'OG Kush Live Resin', Quantity: '23.2', UnitOfMeasureName: 'Grams', PackageState: 'Active' },
      { Id: 'PKG003', ProductName: 'Chocolate Chip Cookies', Quantity: '48', UnitOfMeasureName: 'Each', PackageState: 'Active' }
    ]);

    setManifests([
      { Id: 'MAN001', ShipToFacilityName: 'Green Valley Dispensary', ManifestState: 'Active', EstimatedDepartureDateTime: '2024-01-20' },
      { Id: 'MAN002', ShipToFacilityName: 'High Times Collective', ManifestState: 'In Transit', EstimatedDepartureDateTime: '2024-01-19' }
    ]);
  };

  // Create transfer manifest
  const createTransferManifest = async (manifestData) => {
    setIsLoading(true);
    try {
      // Simulate API call to create manifest
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Add to manifests
      const newManifest = {
        Id: `MAN${manifests.length + 1}`,
        ...manifestData,
        ManifestState: 'Active'
      };
      setManifests([...manifests, newManifest]);
      
      // Auto-generate invoice
      console.log('Auto-generating invoice for manifest:', newManifest.Id);
      
      alert(`Manifest ${newManifest.Id} created successfully! Invoice INV-${Date.now()} generated.`);
    } catch (error) {
      alert('Error creating manifest: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Process bulk harvest
  const processBulkHarvest = async () => {
    const lines = bulkHarvestData.trim().split('\n');
    const results = [];
    setBulkProgress(0);
    setBulkResults([]);

    for (let i = 0; i < lines.length; i++) {
      const [plantId, weight, harvestDate] = lines[i].split(',');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        results.push({
          plantId: plantId?.trim(),
          status: 'success',
          message: `Harvested ${weight?.trim()}g on ${harvestDate?.trim()}`
        });
      } catch (error) {
        results.push({
          plantId: plantId?.trim(),
          status: 'error',
          message: 'Failed to process harvest'
        });
      }
      
      setBulkProgress(((i + 1) / lines.length) * 100);
      setBulkResults([...results]);
    }
    
    // Refresh data
    loadMETRCData();
  };

  // Process bulk manifests
  const processBulkManifests = async () => {
    const lines = bulkManifestData.trim().split('\n');
    const results = [];
    setBulkProgress(0);
    setBulkResults([]);

    for (let i = 0; i < lines.length; i++) {
      const [destination, packageIds, transportDate] = lines[i].split(',');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const manifestId = `MAN${manifests.length + i + 1}`;
        results.push({
          destination: destination?.trim(),
          status: 'success',
          manifestId: manifestId,
          message: `Manifest and invoice created`
        });
      } catch (error) {
        results.push({
          destination: destination?.trim(),
          status: 'error',
          message: 'Failed to create manifest'
        });
      }
      
      setBulkProgress(((i + 1) / lines.length) * 100);
      setBulkResults([...results]);
    }
    
    // Refresh data
    loadMETRCData();
  };

  // Dashboard component
  const Dashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <Leaf className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Plants</p>
            <p className="text-2xl font-bold text-gray-900">{plants.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <Package className="h-8 w-8 text-blue-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Active Packages</p>
            <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <Truck className="h-8 w-8 text-purple-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Manifests</p>
            <p className="text-2xl font-bold text-gray-900">{manifests.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Connection</p>
            <p className="text-2xl font-bold text-gray-900 capitalize">{connectionStatus}</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Plants component
  const Plants = () => {
    const plantCategories = {
      immature: plants.filter(p => p.PlantState === 'Immature'),
      vegetative: plants.filter(p => p.PlantState === 'Vegetative'),
      flowering: plants.filter(p => p.PlantState === 'Flowering'),
      harvested: plants.filter(p => p.PlantState === 'Harvested')
    };

    const currentPlants = plantCategories[activeSubTab] || [];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {Object.keys(plantCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveSubTab(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                  activeSubTab === category
                    ? 'bg-white text-gray-900 shadow'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {category} ({plantCategories[category].length})
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowBulkHarvest(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Bulk Harvest
            </button>
            <button
              onClick={() => setShowBulkPlants(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Bulk Plants
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 capitalize">{activeSubTab} Plants</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plant ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planted Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPlants.map((plant, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {plant.Id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plant.StrainName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plant.LocationName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {plant.PlantedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {plant.PlantState}
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
  };

  // Transfers component
  const Transfers = () => {
    if (activeSubTab === 'newtransfer') {
      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Create New Transfer Manifest</h3>
            <button
              onClick={() => setShowBulkManifest(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Bulk Manifests
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination Facility</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Select destination...</option>
                  <option>Green Valley Dispensary</option>
                  <option>High Times Collective</option>
                  <option>Cannabis Corner</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Departure</label>
                <input 
                  type="datetime-local" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  defaultValue={new Date().toISOString().slice(0, 16)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Packages</label>
              <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto">
                {packages.map((pkg, index) => (
                  <div key={index} className="flex items-center space-x-3 py-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-900">
                      {pkg.ProductName} - {pkg.Quantity} {pkg.UnitOfMeasureName}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex space-x-4">
              <button 
                onClick={() => {
                  const manifestData = {
                    ShipToFacilityName: 'Green Valley Dispensary',
                    EstimatedDepartureDateTime: new Date().toISOString(),
                    Packages: packages.slice(0, 3)
                  };
                  createTransferManifest(manifestData);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Manifest & Generate Invoice
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {['newtransfer', 'viewmanifests', 'incoming', 'active', 'outgoing'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveSubTab(category)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize ${
                activeSubTab === category
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {category.replace('newtransfer', 'New Transfer').replace('viewmanifests', 'View Manifests')}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Transfer Manifests</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Manifest ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {manifests.map((manifest, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {manifest.Id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {manifest.ShipToFacilityName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {manifest.ManifestState}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(manifest.EstimatedDepartureDateTime).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                      <button className="hover:underline">INV-{index + 1001}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Administration component
  const Administration = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">METRC API Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input 
              type="text" 
              value={config.state}
              onChange={(e) => setConfig({...config, state: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input 
              type="text" 
              value={config.licenseNumber}
              onChange={(e) => setConfig({...config, licenseNumber: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User API Key</label>
            <div className="relative">
              <input 
                type={showApiKey ? "text" : "password"}
                value={config.userApiKey}
                onChange={(e) => setConfig({...config, userApiKey: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
              />
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facility API Key</label>
            <div className="relative">
              <input 
                type={showApiKey ? "text" : "password"}
                value={config.facilityApiKey}
                onChange={(e) => setConfig({...config, facilityApiKey: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex space-x-4">
          <button 
            onClick={saveConfiguration}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Configuration
          </button>
          <button 
            onClick={testConnection}
            disabled={isLoading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Connection'}
          </button>
        </div>

        {connectionStatus && (
          <div className={`mt-4 p-4 rounded-md ${
            connectionStatus === 'connected' ? 'bg-green-50 text-green-800' :
            connectionStatus === 'error' ? 'bg-red-50 text-red-800' :
            'bg-gray-50 text-gray-800'
          }`}>
            <div className="flex items-center">
              {connectionStatus === 'connected' ? <CheckCircle className="h-5 w-5 mr-2" /> :
               connectionStatus === 'error' ? <AlertCircle className="h-5 w-5 mr-2" /> :
               <Clock className="h-5 w-5 mr-2" />}
              <span className="font-medium capitalize">{connectionStatus}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">METRC Integration System</h1>
          <p className="mt-2 text-gray-600">Complete cannabis compliance and automation platform</p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'plants', label: 'Plants', icon: Leaf },
              { id: 'packages', label: 'Packages', icon: Package },
              { id: 'transfers', label: 'Transfers', icon: Truck },
              { id: 'reports', label: 'Reports', icon: FileText },
              { id: 'admin', label: 'Administration', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'plants') setActiveSubTab('immature');
                    if (tab.id === 'packages') setActiveSubTab('active');
                    if (tab.id === 'transfers') setActiveSubTab('newtransfer');
                  }}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'plants' && <Plants />}
          {activeTab === 'transfers' && <Transfers />}
          {activeTab === 'admin' && <Administration />}
        </div>
      </div>

      {/* Bulk Harvest Modal */}
      {showBulkHarvest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Bulk Harvest Processing</h3>
              <button onClick={() => setShowBulkHarvest(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CSV Data (Plant ID, Weight, Harvest Date)
                </label>
                <textarea
                  value={bulkHarvestData}
                  onChange={(e) => setBulkHarvestData(e.target.value)}
                  placeholder="1A4DE0000000001,156.5,2024-01-15&#10;1A4DE0000000002,142.3,2024-01-15"
                  className="w-full h-40 border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {bulkProgress > 0 && (
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Processing...</span>
                    <span>{Math.round(bulkProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${bulkProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={processBulkHarvest}
                  disabled={!bulkHarvestData.trim() || bulkProgress > 0}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {bulkProgress > 0 ? 'Processing...' : 'Process Bulk Harvest'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Manifest Modal */}
      {showBulkManifest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Bulk Manifest Creation</h3>
              <button onClick={() => setShowBulkManifest(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CSV Data (Destination, Package IDs, Transport Date)
                </label>
                <textarea
                  value={bulkManifestData}
                  onChange={(e) => setBulkManifestData(e.target.value)}
                  placeholder="Green Valley Dispensary,PKG001;PKG002,2024-01-20"
                  className="w-full h-40 border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={processBulkManifests}
                  disabled={!bulkManifestData.trim() || bulkProgress > 0}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                >
                  {bulkProgress > 0 ? 'Creating...' : 'Create Bulk Manifests & Invoices'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Plants Modal */}
      {showBulkPlants && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Bulk Plant Batch Creation</h3>
              <button onClick={() => setShowBulkPlants(false)}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CSV Data (Strain, Quantity, Location, Plant Date)
                </label>
                <textarea
                  value={bulkPlantData}
                  onChange={(e) => setBulkPlantData(e.target.value)}
                  placeholder="GUMBO RUNTS,50,VEG ROOM,2024-01-15"
                  className="w-full h-40 border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    // Process bulk plant creation
                    const lines = bulkPlantData.trim().split('\n');
                    setBulkProgress(0);
                    
                    lines.forEach((line, index) => {
                      setTimeout(() => {
                        setBulkProgress(((index + 1) / lines.length) * 100);
                        if (index === lines.length - 1) {
                          loadMETRCData();
                        }
                      }, index * 500);
                    });
                  }}
                  disabled={!bulkPlantData.trim() || bulkProgress > 0}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {bulkProgress > 0 ? 'Creating...' : 'Create Bulk Plant Batches'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteMETRCSystem;

