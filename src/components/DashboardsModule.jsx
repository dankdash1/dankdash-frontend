import React, { useState, useEffect } from 'react';

const DashboardsModule = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Mock dashboards data
  const [dashboards, setDashboards] = useState([
    {
      id: 'DASH-001',
      name: 'Executive Overview',
      description: 'High-level business metrics and KPIs for executive team',
      category: 'Executive',
      type: 'Business Intelligence',
      status: 'Active',
      owner: 'Sarah Johnson',
      createdAt: '2024-07-15',
      updatedAt: '2024-08-14',
      views: 1245,
      shares: 23,
      widgets: [
        { id: 'W001', type: 'revenue-chart', title: 'Monthly Revenue', position: { x: 0, y: 0, w: 6, h: 4 } },
        { id: 'W002', type: 'kpi-card', title: 'Total Customers', position: { x: 6, y: 0, w: 3, h: 2 } },
        { id: 'W003', type: 'kpi-card', title: 'Active Orders', position: { x: 9, y: 0, w: 3, h: 2 } },
        { id: 'W004', type: 'pie-chart', title: 'Product Categories', position: { x: 6, y: 2, w: 6, h: 4 } },
        { id: 'W005', type: 'table', title: 'Top Performing Products', position: { x: 0, y: 4, w: 12, h: 4 } }
      ],
      permissions: ['view', 'edit', 'share'],
      tags: ['executive', 'kpi', 'revenue', 'overview'],
      refreshRate: 300, // seconds
      isPublic: false,
      theme: 'light'
    },
    {
      id: 'DASH-002',
      name: 'Sales Performance',
      description: 'Detailed sales analytics and performance tracking',
      category: 'Sales',
      type: 'Analytics',
      status: 'Active',
      owner: 'Mike Chen',
      createdAt: '2024-07-20',
      updatedAt: '2024-08-13',
      views: 892,
      shares: 15,
      widgets: [
        { id: 'W006', type: 'line-chart', title: 'Sales Trend', position: { x: 0, y: 0, w: 8, h: 4 } },
        { id: 'W007', type: 'gauge', title: 'Monthly Target', position: { x: 8, y: 0, w: 4, h: 4 } },
        { id: 'W008', type: 'bar-chart', title: 'Sales by Region', position: { x: 0, y: 4, w: 6, h: 4 } },
        { id: 'W009', type: 'leaderboard', title: 'Top Salespeople', position: { x: 6, y: 4, w: 6, h: 4 } }
      ],
      permissions: ['view', 'edit'],
      tags: ['sales', 'performance', 'analytics', 'targets'],
      refreshRate: 600,
      isPublic: false,
      theme: 'light'
    },
    {
      id: 'DASH-003',
      name: 'Operations Monitor',
      description: 'Real-time operational metrics and system monitoring',
      category: 'Operations',
      type: 'Monitoring',
      status: 'Active',
      owner: 'Lisa Wang',
      createdAt: '2024-08-01',
      updatedAt: '2024-08-14',
      views: 2156,
      shares: 8,
      widgets: [
        { id: 'W010', type: 'status-grid', title: 'System Status', position: { x: 0, y: 0, w: 4, h: 3 } },
        { id: 'W011', type: 'metric-card', title: 'Inventory Levels', position: { x: 4, y: 0, w: 4, h: 3 } },
        { id: 'W012', type: 'alert-feed', title: 'Recent Alerts', position: { x: 8, y: 0, w: 4, h: 6 } },
        { id: 'W013', type: 'heatmap', title: 'Delivery Performance', position: { x: 0, y: 3, w: 8, h: 3 } }
      ],
      permissions: ['view'],
      tags: ['operations', 'monitoring', 'real-time', 'alerts'],
      refreshRate: 60,
      isPublic: false,
      theme: 'dark'
    },
    {
      id: 'DASH-004',
      name: 'Customer Insights',
      description: 'Customer behavior analysis and satisfaction metrics',
      category: 'Customer',
      type: 'Analytics',
      status: 'Draft',
      owner: 'Alex Rodriguez',
      createdAt: '2024-08-10',
      updatedAt: '2024-08-14',
      views: 45,
      shares: 2,
      widgets: [
        { id: 'W014', type: 'funnel-chart', title: 'Customer Journey', position: { x: 0, y: 0, w: 6, h: 4 } },
        { id: 'W015', type: 'satisfaction-meter', title: 'CSAT Score', position: { x: 6, y: 0, w: 3, h: 2 } },
        { id: 'W016', type: 'retention-chart', title: 'Customer Retention', position: { x: 9, y: 0, w: 3, h: 4 } },
        { id: 'W017', type: 'segment-analysis', title: 'Customer Segments', position: { x: 6, y: 2, w: 3, h: 2 } }
      ],
      permissions: ['view', 'edit'],
      tags: ['customer', 'insights', 'satisfaction', 'retention'],
      refreshRate: 3600,
      isPublic: false,
      theme: 'light'
    },
    {
      id: 'DASH-005',
      name: 'Compliance Dashboard',
      description: 'Cannabis compliance monitoring and regulatory tracking',
      category: 'Compliance',
      type: 'Regulatory',
      status: 'Active',
      owner: 'Tom Wilson',
      createdAt: '2024-07-25',
      updatedAt: '2024-08-12',
      views: 567,
      shares: 12,
      widgets: [
        { id: 'W018', type: 'compliance-score', title: 'Overall Compliance', position: { x: 0, y: 0, w: 4, h: 3 } },
        { id: 'W019', type: 'license-tracker', title: 'License Status', position: { x: 4, y: 0, w: 4, h: 3 } },
        { id: 'W020', type: 'audit-timeline', title: 'Upcoming Audits', position: { x: 8, y: 0, w: 4, h: 3 } },
        { id: 'W021', type: 'violation-log', title: 'Recent Violations', position: { x: 0, y: 3, w: 12, h: 3 } }
      ],
      permissions: ['view', 'edit', 'share'],
      tags: ['compliance', 'regulatory', 'cannabis', 'audits'],
      refreshRate: 1800,
      isPublic: false,
      theme: 'light'
    }
  ]);

  const [widgetTypes] = useState([
    { id: 'kpi-card', name: 'KPI Card', category: 'Metrics', icon: '📊', description: 'Display key performance indicators' },
    { id: 'line-chart', name: 'Line Chart', category: 'Charts', icon: '📈', description: 'Show trends over time' },
    { id: 'bar-chart', name: 'Bar Chart', category: 'Charts', icon: '📊', description: 'Compare values across categories' },
    { id: 'pie-chart', name: 'Pie Chart', category: 'Charts', icon: '🥧', description: 'Show proportional data' },
    { id: 'table', name: 'Data Table', category: 'Data', icon: '📋', description: 'Display tabular data' },
    { id: 'gauge', name: 'Gauge', category: 'Metrics', icon: '⏲️', description: 'Show progress toward goals' },
    { id: 'heatmap', name: 'Heat Map', category: 'Charts', icon: '🔥', description: 'Visualize data density' },
    { id: 'status-grid', name: 'Status Grid', category: 'Monitoring', icon: '🟢', description: 'Monitor system status' },
    { id: 'alert-feed', name: 'Alert Feed', category: 'Monitoring', icon: '🚨', description: 'Real-time alerts and notifications' },
    { id: 'funnel-chart', name: 'Funnel Chart', category: 'Analytics', icon: '🔽', description: 'Conversion funnel analysis' }
  ]);

  const [analytics] = useState({
    totalDashboards: 24,
    activeDashboards: 19,
    draftDashboards: 5,
    totalViews: 15678,
    totalShares: 234,
    avgViewsPerDashboard: 653,
    mostViewedDashboard: 'Operations Monitor',
    mostSharedDashboard: 'Executive Overview',
    topCategories: [
      { name: 'Operations', count: 8, percentage: 33 },
      { name: 'Sales', count: 6, percentage: 25 },
      { name: 'Executive', count: 4, percentage: 17 },
      { name: 'Customer', count: 3, percentage: 13 },
      { name: 'Compliance', count: 3, percentage: 12 }
    ]
  });

  // Filter dashboards
  const filteredDashboards = dashboards.filter(dashboard => {
    const matchesSearch = dashboard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dashboard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dashboard.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || dashboard.category.toLowerCase() === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-yellow-100 text-yellow-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'executive': return 'bg-purple-100 text-purple-700';
      case 'sales': return 'bg-blue-100 text-blue-700';
      case 'operations': return 'bg-green-100 text-green-700';
      case 'customer': return 'bg-orange-100 text-orange-700';
      case 'compliance': return 'bg-red-100 text-red-700';
      case 'marketing': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Dashboards</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalDashboards}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeDashboards}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔗</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Shares</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalShares}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dashboard Categories</h3>
          <div className="space-y-3">
            {analytics.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{category.name}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${category.percentage}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{category.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Views per Dashboard</span>
              <span className="text-sm font-medium text-gray-900">{analytics.avgViewsPerDashboard}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Viewed</span>
              <span className="text-sm font-medium text-gray-900">{analytics.mostViewedDashboard}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Shared</span>
              <span className="text-sm font-medium text-gray-900">{analytics.mostSharedDashboard}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Draft Dashboards</span>
              <span className="text-sm font-medium text-gray-900">{analytics.draftDashboards}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Dashboards */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recently Updated</h3>
        <div className="space-y-3">
          {dashboards.slice(0, 5).map((dashboard) => (
            <div key={dashboard.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📊</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{dashboard.name}</p>
                  <p className="text-sm text-gray-600">{dashboard.category} • {dashboard.owner}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dashboard.status)}`}>
                  {dashboard.status}
                </span>
                <span className="text-sm text-gray-500">{dashboard.views} views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboards = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search dashboards..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="executive">Executive</option>
              <option value="sales">Sales</option>
              <option value="operations">Operations</option>
              <option value="customer">Customer</option>
              <option value="compliance">Compliance</option>
              <option value="marketing">Marketing</option>
            </select>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowCreateModal(true)}
            >
              New Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Dashboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDashboards.map((dashboard) => (
          <div key={dashboard.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{dashboard.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{dashboard.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(dashboard.category)}`}>
                      {dashboard.category}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(dashboard.status)}`}>
                      {dashboard.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <span>👤 {dashboard.owner}</span>
                    <span>👁️ {dashboard.views}</span>
                    <span>🔗 {dashboard.shares}</span>
                    <span>🔄 {dashboard.refreshRate}s</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dashboard.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        #{tag}
                      </span>
                    ))}
                    {dashboard.tags.length > 3 && (
                      <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                        +{dashboard.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Widget Count */}
                  <div className="text-sm text-gray-600 mb-4">
                    📊 {dashboard.widgets.length} widgets
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Updated: {dashboard.updatedAt}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    onClick={() => setSelectedDashboard(dashboard)}
                  >
                    View
                  </button>
                  <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                    Share
                  </button>
                  <button className="px-3 py-1 text-sm text-purple-600 hover:bg-purple-50 rounded">
                    Clone
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWidgets = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Widget Types</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {widgetTypes.map((widget) => (
            <div key={widget.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{widget.icon}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{widget.name}</h4>
                  <p className="text-sm text-gray-600">{widget.category}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">{widget.description}</p>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add Widget
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Dashboard Templates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">📊</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Executive Dashboard</h4>
            <p className="text-sm text-gray-600 mb-4">High-level KPIs and business metrics for executives</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Use Template
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Preview
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">📈</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Sales Analytics</h4>
            <p className="text-sm text-gray-600 mb-4">Comprehensive sales performance and analytics dashboard</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Use Template
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Preview
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">🔧</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Operations Monitor</h4>
            <p className="text-sm text-gray-600 mb-4">Real-time operational metrics and system monitoring</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Use Template
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Preview
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">👥</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Customer Insights</h4>
            <p className="text-sm text-gray-600 mb-4">Customer behavior analysis and satisfaction metrics</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Use Template
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Preview
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-red-100 to-red-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">⚖️</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Compliance Monitor</h4>
            <p className="text-sm text-gray-600 mb-4">Cannabis compliance and regulatory tracking dashboard</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Use Template
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Preview
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-full h-32 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">📱</span>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Mobile Dashboard</h4>
            <p className="text-sm text-gray-600 mb-4">Mobile-optimized dashboard for on-the-go monitoring</p>
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Use Template
              </button>
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboards</h1>
          <p className="mt-2 text-gray-600">Create and manage custom dashboards for data visualization</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'dashboards', name: 'Dashboards', icon: '📋' },
              { id: 'widgets', name: 'Widgets', icon: '🧩' },
              { id: 'templates', name: 'Templates', icon: '📄' }
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'dashboards' && renderDashboards()}
        {activeTab === 'widgets' && renderWidgets()}
        {activeTab === 'templates' && renderTemplates()}
      </div>

      {/* Create Dashboard Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Dashboard</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter dashboard name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter dashboard description..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="executive">Executive</option>
                      <option value="sales">Sales</option>
                      <option value="operations">Operations</option>
                      <option value="customer">Customer</option>
                      <option value="compliance">Compliance</option>
                      <option value="marketing">Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="analytics">Analytics</option>
                      <option value="monitoring">Monitoring</option>
                      <option value="business-intelligence">Business Intelligence</option>
                      <option value="regulatory">Regulatory</option>
                      <option value="operational">Operational</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Refresh Rate (seconds)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="60">1 minute</option>
                      <option value="300">5 minutes</option>
                      <option value="600">10 minutes</option>
                      <option value="1800">30 minutes</option>
                      <option value="3600">1 hour</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tags separated by commas..."
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Make public</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Auto-refresh</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Dashboard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Preview Modal */}
      {selectedDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedDashboard.name}</h3>
                  <p className="text-sm text-gray-600">{selectedDashboard.description}</p>
                </div>
                <button 
                  onClick={() => setSelectedDashboard(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {/* Dashboard Preview */}
              <div className="bg-gray-100 rounded-lg p-6 min-h-96">
                <div className="grid grid-cols-12 gap-4 h-full">
                  {selectedDashboard.widgets.map((widget) => (
                    <div 
                      key={widget.id}
                      className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-center"
                      style={{
                        gridColumn: `span ${widget.position.w}`,
                        gridRow: `span ${widget.position.h}`
                      }}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">📊</div>
                        <div className="text-sm font-medium text-gray-900">{widget.title}</div>
                        <div className="text-xs text-gray-600">{widget.type}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setSelectedDashboard(null)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Edit Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardsModule;

