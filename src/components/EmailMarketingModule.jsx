import React, { useState, useEffect } from 'react';

const EmailMarketingModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('all');

  // Mock email campaign data
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAM-001',
      name: 'Summer Cannabis Sale 2024',
      subject: '🌞 Summer Sale: 25% Off Premium Cannabis Products',
      status: 'Sent',
      type: 'Promotional',
      sentDate: '2024-08-10',
      scheduledDate: '2024-08-10 10:00 AM',
      recipients: 2450,
      delivered: 2398,
      opened: 1199,
      clicked: 240,
      bounced: 52,
      unsubscribed: 8,
      openRate: 50.0,
      clickRate: 10.0,
      bounceRate: 2.1,
      revenue: 12500.00,
      template: 'promotional-template',
      segment: 'All Customers'
    },
    {
      id: 'CAM-002',
      name: 'New Product Launch - Blue Dream',
      subject: '🆕 Introducing Blue Dream - Premium Hybrid Strain',
      status: 'Scheduled',
      type: 'Product Launch',
      sentDate: null,
      scheduledDate: '2024-08-20 2:00 PM',
      recipients: 1850,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      openRate: 0.0,
      clickRate: 0.0,
      bounceRate: 0.0,
      revenue: 0.00,
      template: 'product-launch-template',
      segment: 'Flower Enthusiasts'
    },
    {
      id: 'CAM-003',
      name: 'Weekly Newsletter - Cannabis Education',
      subject: '📚 Cannabis Education: Understanding Terpenes',
      status: 'Draft',
      type: 'Newsletter',
      sentDate: null,
      scheduledDate: '2024-08-18 9:00 AM',
      recipients: 3200,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      openRate: 0.0,
      clickRate: 0.0,
      bounceRate: 0.0,
      revenue: 0.00,
      template: 'newsletter-template',
      segment: 'Newsletter Subscribers'
    },
    {
      id: 'CAM-004',
      name: 'Customer Loyalty Program',
      subject: '⭐ Join Our VIP Loyalty Program - Exclusive Benefits',
      status: 'Sent',
      type: 'Loyalty',
      sentDate: '2024-08-05',
      scheduledDate: '2024-08-05 11:00 AM',
      recipients: 1200,
      delivered: 1185,
      opened: 829,
      clicked: 166,
      bounced: 15,
      unsubscribed: 3,
      openRate: 70.0,
      clickRate: 14.0,
      bounceRate: 1.3,
      revenue: 8900.00,
      template: 'loyalty-template',
      segment: 'High-Value Customers'
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 'TEMP-001',
      name: 'Promotional Template',
      type: 'Promotional',
      subject: 'Special Offer: {{discount}}% Off {{product_category}}',
      previewText: 'Don\'t miss out on our limited-time offer...',
      thumbnail: '/api/placeholder/300/200',
      usage: 45,
      lastModified: '2024-08-12',
      performance: 'High',
      avgOpenRate: 52.3,
      avgClickRate: 11.8
    },
    {
      id: 'TEMP-002',
      name: 'Product Launch Template',
      type: 'Product Launch',
      subject: 'Introducing {{product_name}} - Now Available',
      previewText: 'Be the first to try our newest premium product...',
      thumbnail: '/api/placeholder/300/200',
      usage: 12,
      lastModified: '2024-08-08',
      performance: 'Medium',
      avgOpenRate: 48.7,
      avgClickRate: 9.2
    },
    {
      id: 'TEMP-003',
      name: 'Newsletter Template',
      type: 'Newsletter',
      subject: 'Cannabis Education: {{topic}}',
      previewText: 'Learn more about cannabis with our weekly newsletter...',
      thumbnail: '/api/placeholder/300/200',
      usage: 28,
      lastModified: '2024-08-15',
      performance: 'High',
      avgOpenRate: 65.1,
      avgClickRate: 8.4
    },
    {
      id: 'TEMP-004',
      name: 'Welcome Series Template',
      type: 'Welcome',
      subject: 'Welcome to DankDash - Your Cannabis Journey Begins',
      previewText: 'Thank you for joining our community...',
      thumbnail: '/api/placeholder/300/200',
      usage: 156,
      lastModified: '2024-08-10',
      performance: 'Very High',
      avgOpenRate: 78.9,
      avgClickRate: 15.6
    }
  ]);

  const [subscribers, setSubscribers] = useState([
    {
      id: 'SUB-001',
      email: 'john.doe@email.com',
      firstName: 'John',
      lastName: 'Doe',
      status: 'Active',
      subscribeDate: '2024-01-15',
      lastActivity: '2024-08-12',
      segments: ['All Customers', 'Flower Enthusiasts'],
      totalOpens: 45,
      totalClicks: 12,
      avgOpenRate: 68.2,
      totalPurchases: 8,
      totalSpent: 1250.00
    },
    {
      id: 'SUB-002',
      email: 'sarah.johnson@email.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      status: 'Active',
      subscribeDate: '2024-02-20',
      lastActivity: '2024-08-15',
      segments: ['All Customers', 'Newsletter Subscribers', 'High-Value Customers'],
      totalOpens: 67,
      totalClicks: 23,
      avgOpenRate: 82.1,
      totalPurchases: 15,
      totalSpent: 2890.00
    },
    {
      id: 'SUB-003',
      email: 'mike.chen@email.com',
      firstName: 'Mike',
      lastName: 'Chen',
      status: 'Unsubscribed',
      subscribeDate: '2024-03-10',
      lastActivity: '2024-07-20',
      segments: ['All Customers'],
      totalOpens: 23,
      totalClicks: 4,
      avgOpenRate: 34.8,
      totalPurchases: 3,
      totalSpent: 450.00
    }
  ]);

  const [segments, setSegments] = useState([
    {
      id: 'SEG-001',
      name: 'All Customers',
      description: 'All registered customers',
      criteria: 'All users with accounts',
      size: 3200,
      growth: '+15%',
      avgOpenRate: 58.2,
      avgClickRate: 10.4
    },
    {
      id: 'SEG-002',
      name: 'Flower Enthusiasts',
      description: 'Customers who primarily purchase flower products',
      criteria: 'Purchased flower products in last 90 days',
      size: 1850,
      growth: '+8%',
      avgOpenRate: 62.1,
      avgClickRate: 12.8
    },
    {
      id: 'SEG-003',
      name: 'High-Value Customers',
      description: 'Customers with high lifetime value',
      criteria: 'Total spent > $500',
      size: 450,
      growth: '+22%',
      avgOpenRate: 71.5,
      avgClickRate: 16.2
    },
    {
      id: 'SEG-004',
      name: 'Newsletter Subscribers',
      description: 'Users subscribed to weekly newsletter',
      criteria: 'Opted in to newsletter',
      size: 2100,
      growth: '+12%',
      avgOpenRate: 65.8,
      avgClickRate: 8.9
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalCampaigns: 24,
    activeCampaigns: 8,
    totalSubscribers: 3200,
    avgOpenRate: 58.2,
    avgClickRate: 10.4,
    totalRevenue: 45600.00,
    monthlyGrowth: 15.6,
    deliverabilityRate: 97.8
  });

  // Filter functions
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || campaign.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTemplate = selectedTemplate === 'all' || template.type.toLowerCase().replace(' ', '-') === selectedTemplate;
    return matchesSearch && matchesTemplate;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Sending': return 'bg-yellow-100 text-yellow-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Unsubscribed': return 'bg-red-100 text-red-800';
      case 'Bounced': return 'bg-orange-100 text-orange-800';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalCampaigns}</p>
              <p className="text-sm text-blue-600">{analytics.activeCampaigns} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSubscribers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{analytics.monthlyGrowth}% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgOpenRate}%</p>
              <p className="text-sm text-gray-600">Industry avg: 22%</p>
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
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-sm text-green-600">From email campaigns</p>
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
              <div className="text-3xl font-bold text-purple-600">{analytics.deliverabilityRate}%</div>
              <div className="text-sm text-gray-600">Deliverability Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${analytics.deliverabilityRate}%` }}></div>
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
                    <span className="text-blue-600 font-bold">📧</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.subject}</p>
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

      {/* Subscriber Segments */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Subscriber Segments</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {segments.map((segment) => (
              <div key={segment.id} className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{segment.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="text-blue-600">{segment.size.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Growth:</span>
                    <span className="text-green-600">{segment.growth}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Open Rate:</span>
                    <span className="text-purple-600">{segment.avgOpenRate}%</span>
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
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="sending">Sending</option>
              <option value="sent">Sent</option>
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
          <h3 className="text-lg font-semibold text-gray-900">Email Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
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
                      <div className="text-sm text-gray-500">{campaign.subject}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.recipients.toLocaleString()}</td>
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

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search templates..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="promotional">Promotional</option>
              <option value="product-launch">Product Launch</option>
              <option value="newsletter">Newsletter</option>
              <option value="welcome">Welcome</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Template
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Template Preview</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(template.performance)}`}>
                  {template.performance}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{template.type}</p>
              
              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Subject:</p>
                  <p className="text-sm text-gray-600">{template.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Preview:</p>
                  <p className="text-sm text-gray-600">{template.previewText}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Usage:</p>
                  <p className="text-lg font-bold text-blue-600">{template.usage}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Open Rate:</p>
                  <p className="text-lg font-bold text-green-600">{template.avgOpenRate}%</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Use Template
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

  const renderSubscribers = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search subscribers..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Import Subscribers
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Export List
            </button>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Subscribers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscriber</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subscriber.firstName} {subscriber.lastName}</div>
                      <div className="text-sm text-gray-500">{subscriber.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscriber.status)}`}>
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {subscriber.segments.slice(0, 2).map((segment, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                          {segment}
                        </span>
                      ))}
                      {subscriber.segments.length > 2 && (
                        <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                          +{subscriber.segments.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.avgOpenRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${subscriber.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscriber.lastActivity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">Remove</button>
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
          <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
          <p className="mt-2 text-gray-600">Create, send, and track email campaigns</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'campaigns', name: 'Campaigns', icon: '📧' },
              { id: 'templates', name: 'Templates', icon: '📝' },
              { id: 'subscribers', name: 'Subscribers', icon: '👥' }
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
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'subscribers' && renderSubscribers()}
      </div>
    </div>
  );
};

export default EmailMarketingModule;

