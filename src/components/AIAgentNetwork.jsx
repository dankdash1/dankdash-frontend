import React, { useState, useEffect } from 'react';

const AIAgentNetwork = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Mock AI agents data
  const [agents, setAgents] = useState([
    {
      id: 'marketing-agent',
      name: 'Marketing Automation Agent',
      type: 'Marketing',
      status: 'Active',
      description: 'Automates email campaigns, social media posts, and customer segmentation',
      lastActive: '2024-08-12 15:30',
      tasksCompleted: 1247,
      successRate: 94.2,
      capabilities: [
        'Email campaign automation',
        'Social media scheduling',
        'Customer segmentation',
        'A/B testing',
        'Performance analytics'
      ],
      currentTasks: [
        { id: 1, task: 'Weekly newsletter campaign', status: 'Running', progress: 75 },
        { id: 2, task: 'Instagram post scheduling', status: 'Completed', progress: 100 },
        { id: 3, task: 'Customer retention analysis', status: 'Queued', progress: 0 }
      ],
      metrics: {
        emailsSent: 15420,
        clickRate: 8.7,
        conversionRate: 3.2,
        socialEngagement: 12.5
      }
    },
    {
      id: 'sales-agent',
      name: 'Sales Assistant Agent',
      type: 'Sales',
      status: 'Active',
      description: '24/7 customer support chatbot with sales optimization',
      lastActive: '2024-08-12 15:45',
      tasksCompleted: 2156,
      successRate: 89.7,
      capabilities: [
        '24/7 customer chat support',
        'Product recommendations',
        'Order assistance',
        'FAQ handling',
        'Lead qualification'
      ],
      currentTasks: [
        { id: 1, task: 'Live chat sessions', status: 'Running', progress: 100 },
        { id: 2, task: 'Product recommendation engine', status: 'Running', progress: 85 },
        { id: 3, task: 'Lead scoring update', status: 'Pending', progress: 0 }
      ],
      metrics: {
        chatsHandled: 3420,
        avgResponseTime: 2.3,
        customerSatisfaction: 4.6,
        salesConversions: 18.2
      }
    },
    {
      id: 'operations-agent',
      name: 'Operations Automation Agent',
      type: 'Operations',
      status: 'Active',
      description: 'Automates inventory management, order processing, and logistics',
      lastActive: '2024-08-12 15:42',
      tasksCompleted: 892,
      successRate: 97.1,
      capabilities: [
        'Inventory monitoring',
        'Automated reordering',
        'Order processing',
        'Delivery optimization',
        'Supply chain management'
      ],
      currentTasks: [
        { id: 1, task: 'Inventory level monitoring', status: 'Running', progress: 100 },
        { id: 2, task: 'Automated purchase orders', status: 'Completed', progress: 100 },
        { id: 3, task: 'Delivery route optimization', status: 'Running', progress: 60 }
      ],
      metrics: {
        ordersProcessed: 1250,
        inventoryAccuracy: 99.2,
        deliveryOptimization: 23.5,
        costSavings: 15.8
      }
    },
    {
      id: 'compliance-agent',
      name: 'Compliance Monitoring Agent',
      type: 'Compliance',
      status: 'Active',
      description: 'Monitors regulatory compliance and generates required reports',
      lastActive: '2024-08-12 14:15',
      tasksCompleted: 456,
      successRate: 99.8,
      capabilities: [
        'Regulatory monitoring',
        'Compliance reporting',
        'License tracking',
        'Audit preparation',
        'Risk assessment'
      ],
      currentTasks: [
        { id: 1, task: 'Monthly compliance report', status: 'Running', progress: 80 },
        { id: 2, task: 'License renewal tracking', status: 'Completed', progress: 100 },
        { id: 3, task: 'Regulatory update scan', status: 'Scheduled', progress: 0 }
      ],
      metrics: {
        complianceScore: 99.8,
        reportsGenerated: 45,
        violationsDetected: 0,
        auditReadiness: 100
      }
    },
    {
      id: 'grow-agent',
      name: 'Grow Room Monitoring Agent',
      type: 'Grow Operations',
      status: 'Active',
      description: 'Monitors grow room conditions and automates environmental controls',
      lastActive: '2024-08-12 15:47',
      tasksCompleted: 2847,
      successRate: 96.5,
      capabilities: [
        'Environmental monitoring',
        'Automated irrigation',
        'Climate control',
        'Growth analytics',
        'Harvest optimization'
      ],
      currentTasks: [
        { id: 1, task: 'Temperature/humidity monitoring', status: 'Running', progress: 100 },
        { id: 2, task: 'Automated watering cycle', status: 'Running', progress: 90 },
        { id: 3, task: 'Growth phase analysis', status: 'Running', progress: 45 }
      ],
      metrics: {
        roomsMonitored: 8,
        avgTemperature: 75.2,
        avgHumidity: 62.5,
        yieldIncrease: 18.7
      }
    },
    {
      id: 'research-agent',
      name: 'Research & Analytics Agent',
      type: 'Research',
      status: 'Active',
      description: 'Conducts market research and provides business intelligence',
      lastActive: '2024-08-12 13:20',
      tasksCompleted: 234,
      successRate: 91.3,
      capabilities: [
        'Market trend analysis',
        'Competitor monitoring',
        'Customer behavior analysis',
        'Predictive analytics',
        'Business intelligence'
      ],
      currentTasks: [
        { id: 1, task: 'Weekly market analysis', status: 'Running', progress: 65 },
        { id: 2, task: 'Competitor price monitoring', status: 'Completed', progress: 100 },
        { id: 3, task: 'Customer sentiment analysis', status: 'Queued', progress: 0 }
      ],
      metrics: {
        reportsGenerated: 28,
        trendsIdentified: 15,
        accuracyRate: 87.3,
        insightsProvided: 142
      }
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState({
    totalAgents: 6,
    activeAgents: 6,
    totalTasks: 15420,
    successRate: 94.7,
    costSavings: 125000,
    automationLevel: 78.5
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStatusColor = (status) => {
    switch (status) {
      case 'Running': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Queued': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Agents</p>
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.activeAgents}/{systemMetrics.totalAgents}</p>
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
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.successRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Automation Level</p>
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.automationLevel}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cost Savings</p>
              <p className="text-2xl font-bold text-gray-900">${systemMetrics.costSavings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(agent.status)}`}>
                {agent.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{agent.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tasks Completed:</span>
                <span className="font-medium">{agent.tasksCompleted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Success Rate:</span>
                <span className="font-medium">{agent.successRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Active:</span>
                <span className="font-medium">{agent.lastActive}</span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <button 
                onClick={() => setSelectedAgent(agent)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* System Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Agent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">Marketing Agent completed email campaign</p>
                  <p className="text-sm text-gray-500">Weekly newsletter sent to 2,450 subscribers • 5 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-green-600">✓ Success</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">Operations Agent processed 45 orders</p>
                  <p className="text-sm text-gray-500">Automated order fulfillment and shipping • 12 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-blue-600">⚡ Running</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">Grow Agent adjusted room temperature</p>
                  <p className="text-sm text-gray-500">Room 3 temperature optimized for flowering stage • 18 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-purple-600">🌡️ Optimized</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-900">Compliance Agent generated monthly report</p>
                  <p className="text-sm text-gray-500">Regulatory compliance report ready for review • 25 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-yellow-600">📋 Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgentDetails = () => {
    if (!selectedAgent) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedAgent.name}</h2>
            <p className="text-gray-600">{selectedAgent.description}</p>
          </div>
          <button 
            onClick={() => setSelectedAgent(null)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Overview
          </button>
        </div>

        {/* Agent Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(selectedAgent.metrics).map(([key, value]) => (
            <div key={key} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {typeof value === 'number' ? (
                    key.includes('Rate') || key.includes('Engagement') || key.includes('Satisfaction') || key.includes('Temperature') || key.includes('Humidity') || key.includes('Increase') || key.includes('Optimization') || key.includes('Savings') || key.includes('Accuracy') || key.includes('Score') ? 
                    `${value}${key.includes('Temperature') ? '°F' : key.includes('Humidity') ? '%' : key.includes('Time') ? 's' : key.includes('Satisfaction') ? '/5' : '%'}` :
                    value.toLocaleString()
                  ) : value}
                </p>
                <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Current Tasks */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Current Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {selectedAgent.currentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{task.task}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTaskStatusColor(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{task.progress}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capabilities */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Agent Capabilities</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedAgent.capabilities.map((capability, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-900">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAutomation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Automation Rules</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            name: 'Low Stock Alert',
            description: 'Automatically reorder products when stock falls below minimum threshold',
            trigger: 'Inventory Level < Minimum',
            action: 'Create Purchase Order',
            status: 'Active',
            executions: 23
          },
          {
            name: 'Customer Follow-up',
            description: 'Send follow-up email 3 days after purchase',
            trigger: 'Order Completed + 3 days',
            action: 'Send Email Campaign',
            status: 'Active',
            executions: 156
          },
          {
            name: 'Price Optimization',
            description: 'Adjust prices based on demand and competitor analysis',
            trigger: 'Weekly Schedule',
            action: 'Update Product Prices',
            status: 'Active',
            executions: 8
          },
          {
            name: 'Compliance Check',
            description: 'Daily compliance monitoring and reporting',
            trigger: 'Daily at 6:00 AM',
            action: 'Generate Compliance Report',
            status: 'Active',
            executions: 45
          }
        ].map((rule, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">{rule.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(rule.status)}`}>
                {rule.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{rule.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Trigger:</span>
                <span className="font-medium">{rule.trigger}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Action:</span>
                <span className="font-medium">{rule.action}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Executions:</span>
                <span className="font-medium">{rule.executions}</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Edit Rule
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                Disable
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Agent Network</h1>
          <p className="text-gray-600 mt-2">Manage and monitor your AI automation agents</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '🤖' },
              { id: 'automation', name: 'Automation Rules', icon: '⚡' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
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
        {activeTab === 'overview' && (selectedAgent ? renderAgentDetails() : renderOverview())}
        {activeTab === 'automation' && renderAutomation()}
      </div>
    </div>
  );
};

export default AIAgentNetwork;

