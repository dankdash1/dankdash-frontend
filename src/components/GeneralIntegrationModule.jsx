import React, { useState } from 'react';
import { 
  Settings, 
  Plus, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Zap,
  Database,
  Cloud,
  Smartphone,
  CreditCard,
  Mail,
  MessageSquare,
  BarChart3,
  Package
} from 'lucide-react';

const GeneralIntegrationModule = () => {
  const [activeTab, setActiveTab] = useState('available');

  const availableIntegrations = [
    {
      name: 'METRC',
      category: 'Compliance',
      description: 'State cannabis tracking and compliance system',
      icon: <Package className="w-8 h-8 text-green-600" />,
      status: 'available',
      features: ['Inventory tracking', 'Manifest management', 'Compliance reporting'],
      setupUrl: '/admin/metrc'
    },
    {
      name: 'Shopify',
      category: 'E-commerce',
      description: 'Connect your Shopify store for unified inventory',
      icon: <Package className="w-8 h-8 text-green-600" />,
      status: 'available',
      features: ['Product sync', 'Order management', 'Inventory sync']
    },
    {
      name: 'QuickBooks',
      category: 'Accounting',
      description: 'Sync financial data with QuickBooks',
      icon: <Database className="w-8 h-8 text-blue-600" />,
      status: 'available',
      features: ['Transaction sync', 'Tax reporting', 'Financial analytics']
    },
    {
      name: 'Mailchimp',
      category: 'Marketing',
      description: 'Email marketing automation',
      icon: <Mail className="w-8 h-8 text-yellow-600" />,
      status: 'available',
      features: ['Customer sync', 'Campaign automation', 'Analytics']
    },
    {
      name: 'Twilio',
      category: 'Communication',
      description: 'SMS and voice communication',
      icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
      status: 'available',
      features: ['SMS notifications', 'Voice calls', 'Two-factor auth']
    },
    {
      name: 'Stripe',
      category: 'Payments',
      description: 'Payment processing integration',
      icon: <CreditCard className="w-8 h-8 text-indigo-600" />,
      status: 'available',
      features: ['Payment processing', 'Subscription billing', 'Fraud protection']
    },
    {
      name: 'Google Analytics',
      category: 'Analytics',
      description: 'Website and app analytics',
      icon: <BarChart3 className="w-8 h-8 text-orange-600" />,
      status: 'available',
      features: ['Traffic analytics', 'Conversion tracking', 'Custom reports']
    },
    {
      name: 'Zapier',
      category: 'Automation',
      description: 'Connect with 5000+ apps',
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      status: 'available',
      features: ['Workflow automation', 'Data sync', 'Custom triggers']
    }
  ];

  const connectedIntegrations = [
    {
      name: 'METRC',
      category: 'Compliance',
      description: 'Connected to Oklahoma facility',
      icon: <Package className="w-8 h-8 text-green-600" />,
      status: 'connected',
      lastSync: '2 minutes ago',
      health: 'healthy'
    }
  ];

  const categories = ['All', 'Compliance', 'E-commerce', 'Accounting', 'Marketing', 'Communication', 'Payments', 'Analytics', 'Automation'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredIntegrations = selectedCategory === 'All' 
    ? availableIntegrations 
    : availableIntegrations.filter(integration => integration.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Integrations</h1>
              <p className="text-gray-600">Connect DankDash with your favorite tools and services</p>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Request Integration</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'available'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Available ({availableIntegrations.length})
          </button>
          <button
            onClick={() => setActiveTab('connected')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'connected'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Connected ({connectedIntegrations.length})
          </button>
        </div>

        {activeTab === 'available' && (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Available Integrations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {integration.icon}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                        <span className="text-sm text-gray-500">{integration.category}</span>
                      </div>
                    </div>
                    {integration.name === 'METRC' && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{integration.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {integration.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    {integration.setupUrl ? (
                      <a
                        href={integration.setupUrl}
                        className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Set Up
                      </a>
                    ) : (
                      <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        Connect
                      </button>
                    )}
                    <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <ExternalLink className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'connected' && (
          <div className="space-y-6">
            {connectedIntegrations.length === 0 ? (
              <div className="text-center py-12">
                <Cloud className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations connected</h3>
                <p className="text-gray-600 mb-6">Connect your first integration to get started</p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Available Integrations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {connectedIntegrations.map((integration, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {integration.icon}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                          <span className="text-sm text-gray-500">{integration.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-green-600 font-medium">Connected</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{integration.description}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          integration.health === 'healthy' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-gray-600">Last sync: {integration.lastSync}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-green-600 hover:text-green-700 font-medium">
                          Configure
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 font-medium">
                          Disconnect
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneralIntegrationModule;

