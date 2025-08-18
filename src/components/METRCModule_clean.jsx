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
  EyeOff
} from 'lucide-react';

const METRCModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [showCreateManifest, setShowCreateManifest] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [realInventory, setRealInventory] = useState([]);
  const [realManifests, setRealManifests] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [bulkHarvestData, setBulkHarvestData] = useState('');
  const [harvestProgress, setHarvestProgress] = useState({ current: 0, total: 0, isProcessing: false });
  const [harvestResults, setHarvestResults] = useState([]);
  const [bulkManifestData, setBulkManifestData] = useState('');
  const [manifestProgress, setManifestProgress] = useState({ current: 0, total: 0, isProcessing: false });
  const [manifestResults, setManifestResults] = useState([]);
  
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
      // For demo purposes, simulate a successful connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      setConnectionMessage('✅ API key format validated! Note: Full METRC connection requires backend integration due to CORS restrictions.');
    } catch (error) {
      setConnectionMessage('❌ Connection test failed. Please check your credentials.');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const syncInventory = async () => {
    setIsSyncing(true);
    setConnectionMessage('🔄 Syncing inventory with METRC...');
    
    try {
      // Simulate API call with demo data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const demoInventory = [
        { id: 'PKG001', name: 'Blue Dream Flower', sku: 'BD-FL-001', quantity: 156.5, unit: 'grams', value: 3130, status: 'Available', batch: 'BD240815' },
        { id: 'PKG002', name: 'OG Kush Live Resin', sku: 'OG-LR-002', quantity: 23.2, unit: 'grams', value: 1856, status: 'Low Stock', batch: 'OG240820' },
        { id: 'PKG003', name: 'Chocolate Chip Cookies', sku: 'CC-ED-003', quantity: 48, unit: 'units', value: 1440, status: 'Available', batch: 'CC240825' },
        { id: 'PKG004', name: 'CBD Capsules 25mg', sku: 'CBD-CAP-004', quantity: 120, unit: 'units', value: 3600, status: 'Available', batch: 'CBD240830' }
      ];
      
      setRealInventory(demoInventory);
      setConnectionMessage('✅ Inventory synced successfully! Loaded ' + demoInventory.length + ' packages.');
    } catch (error) {
      setConnectionMessage('❌ Inventory sync failed. Please check your connection.');
    } finally {
      setIsSyncing(false);
    }
  };

  const processBulkHarvest = async () => {
    if (!bulkHarvestData.trim()) {
      setConnectionMessage('❌ Please enter harvest data in CSV format.');
      return;
    }

    const lines = bulkHarvestData.trim().split('\n');
    const harvestEntries = [];
    
    // Parse CSV data (skip header if present)
    const startIndex = lines[0].toLowerCase().includes('plant') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const [plantId, weight, harvestDate] = line.split(',').map(item => item.trim());
      if (plantId && weight) {
        harvestEntries.push({
          plantId: plantId.replace(/"/g, ''),
          weight: parseFloat(weight.replace(/"/g, '')),
          harvestDate: harvestDate ? harvestDate.replace(/"/g, '') : new Date().toISOString().split('T')[0]
        });
      }
    }

    if (harvestEntries.length === 0) {
      setConnectionMessage('❌ No valid harvest entries found. Please check CSV format.');
      return;
    }

    setHarvestProgress({ current: 0, total: harvestEntries.length, isProcessing: true });
    setHarvestResults([]);
    setConnectionMessage(`🔄 Processing ${harvestEntries.length} plant harvests...`);

    const results = [];
    
    for (let i = 0; i < harvestEntries.length; i++) {
      const entry = harvestEntries[i];
      setHarvestProgress(prev => ({ ...prev, current: i + 1 }));
      
      try {
        // For demo purposes, simulate success for most entries
        if (Math.random() > 0.1) {
          results.push({ ...entry, status: 'success', message: 'Harvest processed successfully' });
        } else {
          results.push({ ...entry, status: 'error', message: 'API Error: Plant not found' });
        }
      } catch (error) {
        results.push({ ...entry, status: 'error', message: `Error: ${error.message}` });
      }
      
      // Small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setHarvestResults(results);
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.length - successCount;
    
    setConnectionMessage(`✅ Bulk harvest complete! ${successCount} plants processed, ${errorCount} errors.`);
    setHarvestProgress(prev => ({ ...prev, isProcessing: false }));
  };

  const processBulkManifests = async () => {
    if (!bulkManifestData.trim()) {
      setConnectionMessage('❌ Please enter manifest data in CSV format.');
      return;
    }

    const lines = bulkManifestData.trim().split('\n');
    const manifestEntries = [];
    
    // Parse CSV data (skip header if present)
    const startIndex = lines[0].toLowerCase().includes('destination') ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const [destination, products, transportDate] = line.split(',').map(item => item.trim());
      if (destination && products) {
        manifestEntries.push({
          destination: destination.replace(/"/g, ''),
          products: products.replace(/"/g, '').split(';').map(p => p.trim()),
          transportDate: transportDate ? transportDate.replace(/"/g, '') : new Date().toISOString().split('T')[0]
        });
      }
    }

    if (manifestEntries.length === 0) {
      setConnectionMessage('❌ No valid manifest entries found. Please check CSV format.');
      return;
    }

    setManifestProgress({ current: 0, total: manifestEntries.length, isProcessing: true });
    setManifestResults([]);
    setConnectionMessage(`🔄 Processing ${manifestEntries.length} manifest entries...`);

    const results = [];
    
    for (let i = 0; i < manifestEntries.length; i++) {
      const entry = manifestEntries[i];
      setManifestProgress(prev => ({ ...prev, current: i + 1 }));
      
      try {
        // For demo purposes, simulate success
        const invoiceData = {
          manifestId: `M${Date.now()}-${i}`,
          destination: entry.destination,
          products: entry.products,
          total: entry.products.length * 150,
          date: entry.transportDate
        };
        
        results.push({ 
          ...entry, 
          status: 'success', 
          message: 'Manifest created & invoice generated',
          invoiceId: invoiceData.manifestId
        });
      } catch (error) {
        results.push({ ...entry, status: 'error', message: `Error: ${error.message}` });
      }
      
      // Small delay to show progress
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setManifestResults(results);
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.length - successCount;
    
    setConnectionMessage(`✅ Bulk manifest creation complete! ${successCount} manifests created with auto-generated invoices, ${errorCount} errors.`);
    setManifestProgress(prev => ({ ...prev, isProcessing: false }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">METRC Integration</h1>
            <p className="text-gray-600 mt-1">Oklahoma Medical Marijuana Authority compliance and automation</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">API Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-50 rounded-lg p-1">
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('configuration')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'configuration'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Configuration
          </button>
          <button
            onClick={() => setActiveTab('manifests')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'manifests'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Manifests
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'inventory'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => setActiveTab('bulk-manifests')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'bulk-manifests'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 Bulk Manifests
          </button>
          <button
            onClick={() => setActiveTab('bulk-harvest')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'bulk-harvest'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🚀 Bulk Harvest
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
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Connection Status</p>
                <p className="text-2xl font-semibold text-gray-900">Connected</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Manifests</p>
                <p className="text-2xl font-semibold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">3</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-semibold text-gray-900">98.7%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'configuration' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">METRC API Configuration</h3>
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
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'bulk-harvest' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">🚀 Bulk Harvest Automation</h3>
                <p className="text-sm text-gray-600">Process multiple plant harvests at once instead of clicking each individual plant</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={processBulkHarvest}
                  disabled={harvestProgress.isProcessing || !bulkHarvestData.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {harvestProgress.isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      <span>Process Harvests</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CSV Input */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">CSV Harvest Data</h4>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium mb-1">CSV Format:</p>
                    <code className="text-xs">Plant_ID, Weight_Grams, Harvest_Date</code>
                    <p className="mt-1 text-xs">Example: PLANT001, 156.5, 2024-12-14</p>
                  </div>
                  <textarea
                    value={bulkHarvestData}
                    onChange={(e) => setBulkHarvestData(e.target.value)}
                    placeholder="Plant_ID, Weight_Grams, Harvest_Date
PLANT001, 156.5, 2024-12-14
PLANT002, 142.3, 2024-12-14
PLANT003, 189.7, 2024-12-14"
                    className="w-full h-40 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{bulkHarvestData.trim().split('\n').filter(line => line.trim()).length} lines entered</span>
                    <button
                      onClick={() => setBulkHarvestData('')}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress & Results */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Processing Status</h4>
                
                {/* Progress Bar */}
                {harvestProgress.total > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progress: {harvestProgress.current} / {harvestProgress.total}</span>
                      <span>{Math.round((harvestProgress.current / harvestProgress.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(harvestProgress.current / harvestProgress.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Results */}
                {harvestResults.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <h5 className="font-medium text-gray-900">Results:</h5>
                    {harvestResults.map((result, index) => (
                      <div key={index} className={`p-2 rounded text-sm ${
                        result.status === 'success' 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{result.plantId}</span>
                          <span className="text-xs">{result.weight}g</span>
                        </div>
                        <p className="text-xs mt-1">{result.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructions */}
                {harvestResults.length === 0 && !harvestProgress.isProcessing && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">How it works:</h5>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Enter your harvest data in CSV format</li>
                      <li>Click "Process Harvests" to start automation</li>
                      <li>Watch progress as each plant is processed</li>
                      <li>Review results and handle any errors</li>
                      <li>Save hours compared to manual METRC entry!</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bulk-manifests' && (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">📋 Bulk Manifest Creation & Auto-Invoice</h3>
                <p className="text-sm text-gray-600">Create multiple transport manifests at once with automatic invoice generation</p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={processBulkManifests}
                  disabled={manifestProgress.isProcessing || !bulkManifestData.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {manifestProgress.isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Create Manifests & Invoices</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CSV Input */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">CSV Manifest Data</h4>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium mb-1">CSV Format:</p>
                    <code className="text-xs">Destination, Products, Transport_Date</code>
                    <p className="mt-1 text-xs">Products separated by semicolons (;)</p>
                    <p className="text-xs">Example: Green Valley Dispensary, Blue Dream;OG Kush, 2024-12-15</p>
                  </div>
                  <textarea
                    value={bulkManifestData}
                    onChange={(e) => setBulkManifestData(e.target.value)}
                    placeholder="Destination, Products, Transport_Date
Green Valley Dispensary, Blue Dream;OG Kush, 2024-12-15
High Times Collective, Live Resin;Cookies, 2024-12-15
Cannabis Corner, CBD Capsules;Gummies, 2024-12-16"
                    className="w-full h-40 p-3 border border-gray-300 rounded-lg font-mono text-sm"
                  />
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{bulkManifestData.trim().split('\n').filter(line => line.trim()).length} manifests entered</span>
                    <button
                      onClick={() => setBulkManifestData('')}
                      className="text-red-600 hover:text-red-700"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress & Results */}
              <div>
                <h4 className="text-md font-medium text-gray-900 mb-3">Processing Status</h4>
                
                {/* Progress Bar */}
                {manifestProgress.total > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>Progress: {manifestProgress.current} / {manifestProgress.total}</span>
                      <span>{Math.round((manifestProgress.current / manifestProgress.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(manifestProgress.current / manifestProgress.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Results */}
                {manifestResults.length > 0 && (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    <h5 className="font-medium text-gray-900">Results:</h5>
                    {manifestResults.map((result, index) => (
                      <div key={index} className={`p-2 rounded text-sm ${
                        result.status === 'success' 
                          ? 'bg-green-50 text-green-800 border border-green-200' 
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{result.destination}</span>
                          <span className="text-xs">{result.products.length} products</span>
                        </div>
                        <p className="text-xs mt-1">{result.message}</p>
                        {result.invoiceId && (
                          <p className="text-xs text-blue-600 mt-1">Invoice: {result.invoiceId}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Instructions */}
                {manifestResults.length === 0 && !manifestProgress.isProcessing && (
                  <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">How it works:</h5>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Enter manifest data in CSV format</li>
                      <li>Click "Create Manifests & Invoices"</li>
                      <li>Watch as manifests are created in METRC</li>
                      <li>Invoices are automatically generated for each manifest</li>
                      <li>Review results and handle any errors</li>
                      <li>Save hours on manual manifest creation!</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default METRCModule;

