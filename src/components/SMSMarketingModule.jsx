import React, { useState, useEffect } from 'react';

const SMSMarketingModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCampaignType, setSelectedCampaignType] = useState('all');

  // Mock SMS campaign data
  const [smsCampaigns, setSmsCampaigns] = useState([
    {
      id: 'SMS-001',
      name: 'Flash Sale Alert',
      message: '🔥 FLASH SALE: 30% off all flower products! Use code FLASH30. Valid until midnight. Shop now: dankdash.com/shop',
      status: 'Sent',
      type: 'Promotional',
      sentDate: '2024-08-15',
      scheduledDate: '2024-08-15 2:00 PM',
      recipients: 1250,
      delivered: 1235,
      clicked: 185,
      optOuts: 8,
      deliveryRate: 98.8,
      clickRate: 15.0,
      optOutRate: 0.6,
      revenue: 8750.00,
      segment: 'Active Customers',
      characterCount: 125
    },
    {
      id: 'SMS-002',
      name: 'Order Ready Notification',
      message: 'Hi {{first_name}}, your DankDash order #{{order_id}} is ready for pickup! Address: 123 Main St. Hours: 9AM-9PM.',
      status: 'Automated',
      type: 'Transactional',
      sentDate: '2024-08-15',
      scheduledDate: 'Triggered',
      recipients: 45,
      delivered: 45,
      clicked: 12,
      optOuts: 0,
      deliveryRate: 100.0,
      clickRate: 26.7,
      optOutRate: 0.0,
      revenue: 0.00,
      segment: 'Order Customers',
      characterCount: 98
    },
    {
      id: 'SMS-003',
      name: 'New Product Launch - Edibles',
      message: '🍃 NEW ARRIVAL: Premium THC gummies now available! 10mg per piece, multiple flavors. Order now for same-day delivery!',
      status: 'Scheduled',
      type: 'Product Launch',
      sentDate: null,
      scheduledDate: '2024-08-20 11:00 AM',
      recipients: 890,
      delivered: 0,
      clicked: 0,
      optOuts: 0,
      deliveryRate: 0.0,
      clickRate: 0.0,
      optOutRate: 0.0,
      revenue: 0.00,
      segment: 'Edibles Enthusiasts',
      characterCount: 118
    },
    {
      id: 'SMS-004',
      name: 'Loyalty Program Reminder',
      message: 'You have 250 loyalty points expiring soon! Redeem now for $25 off your next order. Visit: dankdash.com/loyalty',
      status: 'Draft',
      type: 'Loyalty',
      sentDate: null,
      scheduledDate: '2024-08-22 10:00 AM',
      recipients: 320,
      delivered: 0,
      clicked: 0,
      optOuts: 0,
      deliveryRate: 0.0,
      clickRate: 0.0,
      optOutRate: 0.0,
      revenue: 0.00,
      segment: 'VIP Customers',
      characterCount: 112
    }
  ]);

  const [smsTemplates, setSmsTemplates] = useState([
    {
      id: 'TEMP-SMS-001',
      name: 'Flash Sale Template',
      type: 'Promotional',
      message: '🔥 FLASH SALE: {{discount}}% off {{product_category}}! Use code {{promo_code}}. Valid until {{expiry}}. Shop: {{link}}',
      characterCount: 95,
      usage: 28,
      lastUsed: '2024-08-15',
      performance: 'High',
      avgClickRate: 14.2,
      avgOptOutRate: 0.8
    },
    {
      id: 'TEMP-SMS-002',
      name: 'Order Confirmation',
      type: 'Transactional',
      message: 'Order confirmed! {{order_id}} - {{total}}. Estimated delivery: {{delivery_time}}. Track: {{tracking_link}}',
      characterCount: 78,
      usage: 156,
      lastUsed: '2024-08-15',
      performance: 'Very High',
      avgClickRate: 22.5,
      avgOptOutRate: 0.1
    },
    {
      id: 'TEMP-SMS-003',
      name: 'Welcome Message',
      type: 'Welcome',
      message: 'Welcome to DankDash, {{first_name}}! Get 15% off your first order with code WELCOME15. Start shopping: {{link}}',
      characterCount: 102,
      usage: 89,
      lastUsed: '2024-08-14',
      performance: 'High',
      avgClickRate: 18.7,
      avgOptOutRate: 0.5
    },
    {
      id: 'TEMP-SMS-004',
      name: 'Delivery Update',
      type: 'Transactional',
      message: 'Your DankDash order is out for delivery! Driver: {{driver_name}}. ETA: {{eta}}. Track live: {{tracking_link}}',
      characterCount: 95,
      usage: 234,
      lastUsed: '2024-08-15',
      performance: 'Very High',
      avgClickRate: 35.2,
      avgOptOutRate: 0.2
    }
  ]);

  const [smsSubscribers, setSmsSubscribers] = useState([
    {
      id: 'SUB-SMS-001',
      phone: '+1 (555) 123-4567',
      firstName: 'John',
      lastName: 'Doe',
      status: 'Active',
      subscribeDate: '2024-01-15',
      lastActivity: '2024-08-12',
      segments: ['Active Customers', 'Flower Enthusiasts'],
      totalReceived: 24,
      totalClicked: 8,
      avgClickRate: 33.3,
      totalPurchases: 6,
      totalSpent: 890.00,
      carrier: 'Verizon'
    },
    {
      id: 'SUB-SMS-002',
      phone: '+1 (555) 234-5678',
      firstName: 'Sarah',
      lastName: 'Johnson',
      status: 'Active',
      subscribeDate: '2024-02-20',
      lastActivity: '2024-08-15',
      segments: ['Active Customers', 'VIP Customers', 'Edibles Enthusiasts'],
      totalReceived: 32,
      totalClicked: 14,
      avgClickRate: 43.8,
      totalPurchases: 12,
      totalSpent: 1650.00,
      carrier: 'AT&T'
    },
    {
      id: 'SUB-SMS-003',
      phone: '+1 (555) 345-6789',
      firstName: 'Mike',
      lastName: 'Chen',
      status: 'Opted Out',
      subscribeDate: '2024-03-10',
      lastActivity: '2024-07-20',
      segments: ['Active Customers'],
      totalReceived: 18,
      totalClicked: 3,
      avgClickRate: 16.7,
      totalPurchases: 2,
      totalSpent: 320.00,
      carrier: 'T-Mobile'
    }
  ]);

  const [smsSegments, setSmsSegments] = useState([
    {
      id: 'SEG-SMS-001',
      name: 'Active Customers',
      description: 'Customers who made a purchase in the last 30 days',
      criteria: 'Purchase within 30 days',
      size: 1250,
      growth: '+12%',
      avgClickRate: 18.5,
      avgOptOutRate: 0.6
    },
    {
      id: 'SEG-SMS-002',
      name: 'VIP Customers',
      description: 'High-value customers with loyalty status',
      criteria: 'Total spent > $500 OR loyalty member',
      size: 320,
      growth: '+25%',
      avgClickRate: 28.2,
      avgOptOutRate: 0.3
    },
    {
      id: 'SEG-SMS-003',
      name: 'Flower Enthusiasts',
      description: 'Customers who primarily purchase flower products',
      criteria: 'Flower purchases > 70% of orders',
      size: 890,
      growth: '+8%',
      avgClickRate: 16.8,
      avgOptOutRate: 0.7
    },
    {
      id: 'SEG-SMS-004',
      name: 'Edibles Enthusiasts',
      description: 'Customers who frequently buy edibles',
      criteria: 'Edibles purchases > 50% of orders',
      size: 450,
      growth: '+18%',
      avgClickRate: 22.1,
      avgOptOutRate: 0.4
    }
  ]);

  const [smsAnalytics, setSmsAnalytics] = useState({
    totalCampaigns: 18,
    activeCampaigns: 6,
    totalSubscribers: 2850,
    avgDeliveryRate: 98.5,
    avgClickRate: 18.2,
    avgOptOutRate: 0.6,
    totalRevenue: 28500.00,
    monthlyGrowth: 22.3,
    costPerMessage: 0.045
  });

  // Filter functions
  const filteredCampaigns = smsCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || campaign.status.toLowerCase() === selectedStatus;
    const matchesType = selectedCampaignType === 'all' || campaign.type.toLowerCase().replace(' ', '-') === selectedCampaignType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Sending': return 'bg-yellow-100 text-yellow-800';
      case 'Automated': return 'bg-purple-100 text-purple-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Opted Out': return 'bg-red-100 text-red-800';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{smsAnalytics.totalCampaigns}</p>
              <p className="text-sm text-blue-600">{smsAnalytics.activeCampaigns} active</p>
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
              <p className="text-sm font-medium text-gray-600">SMS Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{smsAnalytics.totalSubscribers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{smsAnalytics.monthlyGrowth}% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Click Rate</p>
              <p className="text-2xl font-bold text-gray-900">{smsAnalytics.avgClickRate}%</p>
              <p className="text-sm text-gray-600">Industry avg: 6%</p>
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
              <p className="text-sm font-medium text-gray-600">SMS Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${(smsAnalytics.totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-sm text-green-600">From SMS campaigns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">SMS Performance Metrics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{smsAnalytics.avgDeliveryRate}%</div>
              <div className="text-sm text-gray-600">Delivery Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${smsAnalytics.avgDeliveryRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{smsAnalytics.avgClickRate}%</div>
              <div className="text-sm text-gray-600">Click Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${smsAnalytics.avgClickRate * 3}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{smsAnalytics.avgOptOutRate}%</div>
              <div className="text-sm text-gray-600">Opt-out Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: `${smsAnalytics.avgOptOutRate * 20}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">${smsAnalytics.costPerMessage.toFixed(3)}</div>
              <div className="text-sm text-gray-600">Cost per Message</div>
              <div className="text-xs text-gray-500 mt-1">Industry competitive</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent SMS Campaigns */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent SMS Campaigns</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {smsCampaigns.slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">📱</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.message.substring(0, 60)}...</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">Click Rate</p>
                      <p className="font-medium">{campaign.clickRate}%</p>
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

      {/* SMS Segments */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">SMS Subscriber Segments</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {smsSegments.map((segment) => (
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
                    <span className="text-gray-600">Click Rate:</span>
                    <span className="text-purple-600">{segment.avgClickRate}%</span>
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
              placeholder="Search SMS campaigns..."
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
              <option value="automated">Automated</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCampaignType}
              onChange={(e) => setSelectedCampaignType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="promotional">Promotional</option>
              <option value="transactional">Transactional</option>
              <option value="product-launch">Product Launch</option>
              <option value="loyalty">Loyalty</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create SMS Campaign
            </button>
          </div>
        </div>
      </div>

      {/* SMS Campaigns Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">SMS Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Rate</th>
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
                      <div className="text-sm text-gray-500">{campaign.message.substring(0, 50)}...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.recipients.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.deliveryRate}%</td>
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
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search SMS templates..."
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

      {/* SMS Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {smsTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(template.performance)}`}>
                {template.performance}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-800">{template.message}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Characters:</p>
                <p className="text-lg font-bold text-blue-600">{template.characterCount}/160</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Usage:</p>
                <p className="text-lg font-bold text-green-600">{template.usage}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Click Rate:</p>
                <p className="text-sm text-purple-600">{template.avgClickRate}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Opt-out Rate:</p>
                <p className="text-sm text-red-600">{template.avgOptOutRate}%</p>
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
              placeholder="Search SMS subscribers..."
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

      {/* SMS Subscribers Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">SMS Subscribers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscriber</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Click Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {smsSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{subscriber.firstName} {subscriber.lastName}</div>
                      <div className="text-sm text-gray-500">{subscriber.phone}</div>
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
                          +{subscriber.segments.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.avgClickRate}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${subscriber.totalSpent.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscriber.carrier}</td>
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
          <h1 className="text-3xl font-bold text-gray-900">SMS Marketing</h1>
          <p className="mt-2 text-gray-600">Create, send, and track SMS campaigns</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'campaigns', name: 'Campaigns', icon: '📱' },
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

export default SMSMarketingModule;

