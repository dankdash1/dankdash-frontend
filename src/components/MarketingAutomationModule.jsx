import React, { useState, useEffect } from 'react';

const MarketingAutomationModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock marketing data
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAMP-001',
      name: 'Summer Cannabis Sale',
      type: 'Email',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      audience: 'All Customers',
      sent: 2450,
      opened: 1225,
      clicked: 245,
      converted: 49,
      revenue: 4900.00,
      openRate: 50.0,
      clickRate: 10.0,
      conversionRate: 2.0
    },
    {
      id: 'CAMP-002',
      name: 'New Customer Welcome Series',
      type: 'Email Sequence',
      status: 'Active',
      startDate: '2024-07-15',
      endDate: 'Ongoing',
      audience: 'New Customers',
      sent: 156,
      opened: 124,
      clicked: 62,
      converted: 31,
      revenue: 1550.00,
      openRate: 79.5,
      clickRate: 39.7,
      conversionRate: 19.9
    },
    {
      id: 'CAMP-003',
      name: 'Premium Product Launch',
      type: 'SMS',
      status: 'Completed',
      startDate: '2024-08-10',
      endDate: '2024-08-12',
      audience: 'VIP Customers',
      sent: 89,
      opened: 85,
      clicked: 34,
      converted: 17,
      revenue: 3400.00,
      openRate: 95.5,
      clickRate: 38.2,
      conversionRate: 19.1
    },
    {
      id: 'CAMP-004',
      name: 'Loyalty Program Promotion',
      type: 'Push Notification',
      status: 'Draft',
      startDate: '2024-08-20',
      endDate: '2024-08-25',
      audience: 'Loyalty Members',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0.00,
      openRate: 0.0,
      clickRate: 0.0,
      conversionRate: 0.0
    }
  ]);

  const [automations, setAutomations] = useState([
    {
      id: 'AUTO-001',
      name: 'Welcome Email Series',
      trigger: 'New Customer Registration',
      status: 'Active',
      emails: 3,
      delay: '1 day between emails',
      subscribers: 156,
      completionRate: 78.2,
      revenue: 2340.00
    },
    {
      id: 'AUTO-002',
      name: 'Abandoned Cart Recovery',
      trigger: 'Cart Abandoned > 2 hours',
      status: 'Active',
      emails: 2,
      delay: '2 hours, then 24 hours',
      subscribers: 89,
      completionRate: 45.5,
      revenue: 1890.00
    },
    {
      id: 'AUTO-003',
      name: 'Re-engagement Campaign',
      trigger: 'No purchase in 30 days',
      status: 'Active',
      emails: 2,
      delay: '30 days, then 7 days',
      subscribers: 234,
      completionRate: 23.1,
      revenue: 1560.00
    },
    {
      id: 'AUTO-004',
      name: 'Birthday Discount',
      trigger: 'Customer Birthday',
      status: 'Active',
      emails: 1,
      delay: 'On birthday',
      subscribers: 45,
      completionRate: 89.0,
      revenue: 675.00
    }
  ]);

  const [segments, setSegments] = useState([
    {
      id: 'SEG-001',
      name: 'VIP Customers',
      criteria: 'Total spent > $500',
      size: 89,
      growth: '+12%',
      avgSpend: 750.00,
      lastUpdated: '2024-08-15'
    },
    {
      id: 'SEG-002',
      name: 'New Customers',
      criteria: 'Registered < 30 days',
      size: 156,
      growth: '+45%',
      avgSpend: 85.00,
      lastUpdated: '2024-08-15'
    },
    {
      id: 'SEG-003',
      name: 'Flower Enthusiasts',
      criteria: 'Purchased flower products',
      size: 567,
      growth: '+8%',
      avgSpend: 125.00,
      lastUpdated: '2024-08-15'
    },
    {
      id: 'SEG-004',
      name: 'Inactive Customers',
      criteria: 'No purchase in 60+ days',
      size: 234,
      growth: '-15%',
      avgSpend: 45.00,
      lastUpdated: '2024-08-15'
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 'TEMP-001',
      name: 'Welcome Email',
      type: 'Email',
      subject: 'Welcome to DankDash!',
      preview: 'Thank you for joining our premium cannabis delivery service...',
      usage: 156,
      performance: 'High',
      lastModified: '2024-08-10'
    },
    {
      id: 'TEMP-002',
      name: 'Product Promotion',
      type: 'Email',
      subject: 'New Premium Products Available',
      preview: 'Discover our latest collection of premium cannabis products...',
      usage: 89,
      performance: 'Medium',
      lastModified: '2024-08-12'
    },
    {
      id: 'TEMP-003',
      name: 'Cart Abandonment',
      type: 'Email',
      subject: 'You left something in your cart',
      preview: 'Complete your order and enjoy fast delivery...',
      usage: 234,
      performance: 'High',
      lastModified: '2024-08-08'
    },
    {
      id: 'TEMP-004',
      name: 'SMS Promotion',
      type: 'SMS',
      subject: 'N/A',
      preview: 'DankDash: 20% off your next order! Use code SAVE20...',
      usage: 67,
      performance: 'Very High',
      lastModified: '2024-08-14'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalCampaigns: 15,
    activeCampaigns: 8,
    totalRevenue: 45600.00,
    avgOpenRate: 58.2,
    avgClickRate: 12.4,
    avgConversionRate: 3.8,
    totalSubscribers: 2450,
    monthlyGrowth: 15.6
  });

  // Filter functions
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || campaign.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalCampaigns}</p>
              <p className="text-sm text-green-600">{analytics.activeCampaigns} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">From campaigns</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgOpenRate}%</p>
              <p className="text-sm text-gray-600">Industry avg: 22%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSubscribers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{analytics.monthlyGrowth}% this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.avgOpenRate}%</div>
              <div className="text-sm text-gray-600">Average Open Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.avgOpenRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.avgClickRate}%</div>
              <div className="text-sm text-gray-600">Average Click Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.avgClickRate * 5}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.avgConversionRate}%</div>
              <div className="text-sm text-gray-600">Average Conversion Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${analytics.avgConversionRate * 10}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">{campaign.type.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.type} • {campaign.audience}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">Open Rate</p>
                      <p className="font-medium">{campaign.openRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="font-medium text-green-600">${campaign.revenue.toLocaleString()}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search campaigns..."
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
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Click Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.audience}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.sent.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.openRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.clickRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${campaign.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">Duplicate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAutomations = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search automations..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Automation
            </button>
          </div>
        </div>
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {automations.map((automation) => (
          <div key={automation.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{automation.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(automation.status)}`}>
                {automation.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Trigger:</p>
                <p className="text-sm text-gray-600">{automation.trigger}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Emails:</p>
                  <p className="text-lg font-bold text-blue-600">{automation.emails}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Subscribers:</p>
                  <p className="text-lg font-bold text-green-600">{automation.subscribers}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Completion Rate:</p>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${automation.completionRate}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{automation.completionRate}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Revenue:</p>
                  <p className="text-lg font-bold text-green-600">${automation.revenue.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search segments..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Segment
            </button>
          </div>
        </div>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {segments.map((segment) => (
          <div key={segment.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{segment.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                segment.growth.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {segment.growth}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-700">Criteria:</p>
                <p className="text-sm text-gray-600">{segment.criteria}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Size:</p>
                  <p className="text-2xl font-bold text-blue-600">{segment.size}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Avg. Spend:</p>
                  <p className="text-lg font-bold text-green-600">${segment.avgSpend}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Last updated: {segment.lastUpdated}</p>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Members
                </button>
                <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Template
            </button>
          </div>
        </div>
      </div>

      {/* Templates Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Email & SMS Templates</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {templates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{template.name}</div>
                      <div className="text-sm text-gray-500">{template.subject || template.preview.substring(0, 50)}...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{template.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{template.usage} times</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(template.performance)}`}>
                      {template.performance}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{template.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Preview</button>
                    <button className="text-gray-600 hover:text-gray-900">Duplicate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketing Automation</h1>
          <p className="mt-2 text-gray-600">Create, manage, and optimize automated marketing campaigns</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'campaigns', name: 'Campaigns', icon: '📧' },
              { id: 'automations', name: 'Automations', icon: '⚡' },
              { id: 'segments', name: 'Segments', icon: '👥' },
              { id: 'templates', name: 'Templates', icon: '📝' }
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
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'automations' && renderAutomations()}
        {activeTab === 'segments' && renderSegments()}
        {activeTab === 'templates' && renderTemplates()}
      </div>
    </div>
  );
};

export default MarketingAutomationModule;

