import React, { useState, useEffect } from 'react';
import { 
  Send, 
  FileText, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Download,
  Upload,
  RefreshCw,
  Key,
  Shield,
  Database,
  Activity,
  Settings,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const MetrcIntegrationModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnected, setIsConnected] = useState(true);
  const [lastSync, setLastSync] = useState('2024-08-14T10:30:00Z');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample data
  const [manifests, setManifests] = useState([
    {
      id: 'MAN-001',
      manifestNumber: 'DC-2024-001234',
      type: 'Sales Delivery',
      status: 'Pending Signature',
      customerName: 'Green Valley Dispensary',
      driverName: 'Mike Johnson',
      items: 15,
      totalValue: '$2,450.00',
      createdDate: '2024-08-14T09:15:00Z',
      deliveryDate: '2024-08-14T14:00:00Z',
      metrcStatus: 'Created',
      signatures: {
        driver: null,
        customer: null
      }
    },
    {
      id: 'MAN-002',
      manifestNumber: 'DC-2024-001235',
      type: 'Transfer',
      status: 'Completed',
      customerName: 'Premium Cannabis Co.',
      driverName: 'Sarah Wilson',
      items: 8,
      totalValue: '$1,890.00',
      createdDate: '2024-08-14T08:30:00Z',
      deliveryDate: '2024-08-14T12:00:00Z',
      metrcStatus: 'Completed',
      signatures: {
        driver: 'signed',
        customer: 'signed'
      }
    },
    {
      id: 'MAN-003',
      manifestNumber: 'DC-2024-001236',
      type: 'Sales Delivery',
      status: 'In Transit',
      customerName: 'City Cannabis Collective',
      driverName: 'Alex Rodriguez',
      items: 22,
      totalValue: '$3,120.00',
      createdDate: '2024-08-14T07:45:00Z',
      deliveryDate: '2024-08-14T16:30:00Z',
      metrcStatus: 'In Transit',
      signatures: {
        driver: 'signed',
        customer: null
      }
    }
  ]);

  const [apiConfig, setApiConfig] = useState({
    userApiKey: '••••••••••••••••',
    facilityApiKey: '••••••••••••••••',
    state: 'OK', // Oklahoma
    baseUrl: 'https://api-ok.metrc.com',
    licenseNumber: 'OMMA-2024-001234',
    businessName: 'Your Cannabis Business',
    facilityName: 'Main Facility'
  });

  const [syncStats, setSyncStats] = useState({
    totalManifests: 156,
    pendingSync: 3,
    successRate: 98.7,
    lastError: null,
    apiCalls: 2847,
    dataTransferred: '45.2 MB'
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Pending Signature': return 'text-yellow-600 bg-yellow-100';
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getMetrcStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600';
      case 'Created': return 'text-blue-600';
      case 'In Transit': return 'text-yellow-600';
      case 'Failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleCreateManifest = () => {
    setShowCreateModal(true);
  };

  const handleSyncWithMetrc = () => {
    // Simulate sync process
    setLastSync(new Date().toISOString());
    // Update sync stats
    setSyncStats(prev => ({
      ...prev,
      apiCalls: prev.apiCalls + 1,
      pendingSync: Math.max(0, prev.pendingSync - 1)
    }));
  };

  const filteredManifests = manifests.filter(manifest => {
    const matchesSearch = manifest.manifestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         manifest.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || manifest.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">METRC Connection Status</h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
            isConnected ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
          }`}>
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{syncStats.totalManifests}</div>
            <div className="text-sm text-gray-600">Total Manifests</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{syncStats.pendingSync}</div>
            <div className="text-sm text-gray-600">Pending Sync</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{syncStats.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Last sync: {new Date(lastSync).toLocaleString()}
          </div>
          <button
            onClick={handleSyncWithMetrc}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Sync Now</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Active Manifests</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">132</div>
              <div className="text-sm text-gray-600">Completed Today</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">Pending Signatures</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">{syncStats.apiCalls}</div>
              <div className="text-sm text-gray-600">API Calls</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent METRC Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Manifest DC-2024-001235 completed</div>
              <div className="text-xs text-gray-600">Premium Cannabis Co. - 2 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <Truck className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Manifest DC-2024-001236 in transit</div>
              <div className="text-xs text-gray-600">City Cannabis Collective - 15 minutes ago</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-600" />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900">Manifest DC-2024-001234 awaiting signatures</div>
              <div className="text-xs text-gray-600">Green Valley Dispensary - 1 hour ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManifests = () => (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-900">METRC Manifests</h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleCreateManifest}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Manifest</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search manifests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="Pending Signature">Pending Signature</option>
          <option value="In Transit">In Transit</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Manifests Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Manifest
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  METRC Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Signatures
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredManifests.map((manifest) => (
                <tr key={manifest.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{manifest.manifestNumber}</div>
                      <div className="text-sm text-gray-500">{manifest.type}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{manifest.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{manifest.driverName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(manifest.status)}`}>
                      {manifest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getMetrcStatusColor(manifest.metrcStatus)}`}>
                      {manifest.metrcStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{manifest.totalValue}</div>
                    <div className="text-sm text-gray-500">{manifest.items} items</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1">
                      <div className={`w-3 h-3 rounded-full ${manifest.signatures.driver ? 'bg-green-500' : 'bg-gray-300'}`} title="Driver Signature"></div>
                      <div className={`w-3 h-3 rounded-full ${manifest.signatures.customer ? 'bg-green-500' : 'bg-gray-300'}`} title="Customer Signature"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderConfiguration = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">METRC Configuration</h2>
        <button
          onClick={() => setShowConfigModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Edit Configuration</span>
        </button>
      </div>

      {/* API Configuration */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              value={apiConfig.state}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
            <input
              type="text"
              value={apiConfig.licenseNumber}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User API Key</label>
            <input
              type="password"
              value={apiConfig.userApiKey}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facility API Key</label>
            <input
              type="password"
              value={apiConfig.facilityApiKey}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              value={apiConfig.businessName}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
            <input
              type="text"
              value={apiConfig.facilityName}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Sync Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sync Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Auto-sync Manifests</div>
              <div className="text-sm text-gray-500">Automatically sync manifest status with METRC</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Real-time Updates</div>
              <div className="text-sm text-gray-500">Push updates to METRC immediately</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-900">Error Notifications</div>
              <div className="text-sm text-gray-500">Send alerts when sync fails</div>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </div>

      {/* API Statistics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">API Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{syncStats.apiCalls}</div>
            <div className="text-sm text-gray-600">Total API Calls</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{syncStats.dataTransferred}</div>
            <div className="text-sm text-gray-600">Data Transferred</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{syncStats.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Create Manifest Modal
  const CreateManifestModal = () => (
    showCreateModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create METRC Manifest</h3>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manifest Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sales Delivery</option>
                  <option>Transfer</option>
                  <option>Return</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Green Valley Dispensary</option>
                  <option>Premium Cannabis Co.</option>
                  <option>City Cannabis Collective</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Mike Johnson</option>
                  <option>Sarah Wilson</option>
                  <option>Alex Rodriguez</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
              <textarea
                rows={3}
                placeholder="Select items from inventory..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                rows={2}
                placeholder="Additional notes..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setShowCreateModal(false);
                // Add manifest creation logic here
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Manifest
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Database className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">METRC Integration</h1>
                  <p className="text-sm text-gray-600">Cannabis compliance & manifest management</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                isConnected ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'
              }`}>
                <Shield className="w-4 h-4" />
                <span>{isConnected ? 'METRC Connected' : 'METRC Disconnected'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('manifests')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'manifests'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Manifests
            </button>
            <button
              onClick={() => setActiveTab('configuration')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'configuration'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Configuration
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'manifests' && renderManifests()}
        {activeTab === 'configuration' && renderConfiguration()}
      </div>

      {/* Modals */}
      <CreateManifestModal />
    </div>
  );
};

export default MetrcIntegrationModule;

