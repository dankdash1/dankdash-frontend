import React, { useState, useEffect } from 'react';

const CommunicationModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock communication data
  const [messages, setMessages] = useState([
    {
      id: 'MSG-001',
      subject: 'Order Confirmation - #ORD-2024-001',
      channel: 'Email',
      type: 'Transactional',
      recipient: 'john.doe@email.com',
      sender: 'orders@dankdash.com',
      status: 'Delivered',
      priority: 'High',
      sentAt: '2024-08-14 14:30:25',
      deliveredAt: '2024-08-14 14:30:28',
      openedAt: '2024-08-14 14:45:12',
      clickedAt: null,
      content: 'Your order has been confirmed and is being prepared for delivery.',
      template: 'Order Confirmation',
      campaign: null,
      tags: ['order', 'confirmation', 'transactional'],
      attachments: ['receipt.pdf'],
      bounced: false,
      unsubscribed: false
    },
    {
      id: 'MSG-002',
      subject: 'Welcome to DankDash!',
      channel: 'Email',
      type: 'Marketing',
      recipient: 'sarah.johnson@email.com',
      sender: 'welcome@dankdash.com',
      status: 'Opened',
      priority: 'Medium',
      sentAt: '2024-08-14 13:15:10',
      deliveredAt: '2024-08-14 13:15:13',
      openedAt: '2024-08-14 15:22:45',
      clickedAt: '2024-08-14 15:23:12',
      content: 'Welcome to DankDash! Here\'s everything you need to know to get started.',
      template: 'Welcome Series #1',
      campaign: 'New Customer Onboarding',
      tags: ['welcome', 'onboarding', 'marketing'],
      attachments: ['welcome-guide.pdf'],
      bounced: false,
      unsubscribed: false
    },
    {
      id: 'MSG-003',
      subject: 'Your delivery is on the way!',
      channel: 'SMS',
      type: 'Notification',
      recipient: '+1-555-0123',
      sender: 'DankDash',
      status: 'Delivered',
      priority: 'High',
      sentAt: '2024-08-14 16:45:30',
      deliveredAt: '2024-08-14 16:45:32',
      openedAt: '2024-08-14 16:46:15',
      clickedAt: null,
      content: 'Your DankDash order is out for delivery! Track: https://dankdash.com/track/ABC123',
      template: 'Delivery Notification',
      campaign: null,
      tags: ['delivery', 'notification', 'sms'],
      attachments: [],
      bounced: false,
      unsubscribed: false
    },
    {
      id: 'MSG-004',
      subject: 'Special Offer: 20% Off Edibles',
      channel: 'Push',
      type: 'Promotional',
      recipient: 'user_12345',
      sender: 'DankDash App',
      status: 'Clicked',
      priority: 'Medium',
      sentAt: '2024-08-14 12:00:00',
      deliveredAt: '2024-08-14 12:00:02',
      openedAt: '2024-08-14 12:15:30',
      clickedAt: '2024-08-14 12:16:45',
      content: '🍃 Limited time offer! Get 20% off all edibles. Use code EDIBLES20',
      template: 'Promotional Push',
      campaign: 'August Edibles Promotion',
      tags: ['promotion', 'edibles', 'discount'],
      attachments: [],
      bounced: false,
      unsubscribed: false
    },
    {
      id: 'MSG-005',
      subject: 'Password Reset Request',
      channel: 'Email',
      type: 'Transactional',
      recipient: 'mike.chen@email.com',
      sender: 'security@dankdash.com',
      status: 'Bounced',
      priority: 'High',
      sentAt: '2024-08-14 11:30:15',
      deliveredAt: null,
      openedAt: null,
      clickedAt: null,
      content: 'Click here to reset your DankDash account password.',
      template: 'Password Reset',
      campaign: null,
      tags: ['security', 'password', 'transactional'],
      attachments: [],
      bounced: true,
      unsubscribed: false
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 'TPL-001',
      name: 'Order Confirmation',
      channel: 'Email',
      type: 'Transactional',
      subject: 'Order Confirmation - {{order_number}}',
      content: 'Hi {{customer_name}}, your order {{order_number}} has been confirmed...',
      variables: ['customer_name', 'order_number', 'order_total', 'delivery_address'],
      usage: 1250,
      lastUsed: '2024-08-14',
      status: 'Active',
      openRate: 98.5,
      clickRate: 45.2,
      category: 'Orders',
      tags: ['order', 'confirmation', 'transactional']
    },
    {
      id: 'TPL-002',
      name: 'Welcome Email',
      channel: 'Email',
      type: 'Marketing',
      subject: 'Welcome to {{company_name}}!',
      content: 'Welcome {{customer_name}}! We\'re excited to have you join our community...',
      variables: ['customer_name', 'company_name', 'welcome_offer'],
      usage: 890,
      lastUsed: '2024-08-14',
      status: 'Active',
      openRate: 72.3,
      clickRate: 28.7,
      category: 'Onboarding',
      tags: ['welcome', 'onboarding', 'marketing']
    },
    {
      id: 'TPL-003',
      name: 'Delivery Notification',
      channel: 'SMS',
      type: 'Notification',
      subject: null,
      content: 'Your {{company_name}} order is out for delivery! Track: {{tracking_url}}',
      variables: ['company_name', 'tracking_url', 'estimated_time'],
      usage: 2340,
      lastUsed: '2024-08-14',
      status: 'Active',
      openRate: 95.8,
      clickRate: 67.4,
      category: 'Delivery',
      tags: ['delivery', 'notification', 'sms']
    },
    {
      id: 'TPL-004',
      name: 'Promotional Push',
      channel: 'Push',
      type: 'Promotional',
      subject: null,
      content: '{{emoji}} {{offer_text}} Use code {{promo_code}}',
      variables: ['emoji', 'offer_text', 'promo_code', 'expiry_date'],
      usage: 567,
      lastUsed: '2024-08-14',
      status: 'Active',
      openRate: 45.6,
      clickRate: 12.3,
      category: 'Promotions',
      tags: ['promotion', 'discount', 'push']
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAM-001',
      name: 'New Customer Onboarding',
      type: 'Automated',
      channel: 'Email',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: null,
      totalSent: 1250,
      delivered: 1198,
      opened: 867,
      clicked: 234,
      unsubscribed: 12,
      bounced: 52,
      openRate: 72.4,
      clickRate: 19.5,
      unsubscribeRate: 1.0,
      bounceRate: 4.3,
      revenue: 15680.50,
      roi: 312.5,
      audience: 'New Customers',
      trigger: 'Account Creation',
      frequency: 'Triggered',
      templates: ['Welcome Email', 'Getting Started', 'First Purchase Incentive']
    },
    {
      id: 'CAM-002',
      name: 'August Edibles Promotion',
      type: 'Broadcast',
      channel: 'Multi-channel',
      status: 'Active',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      totalSent: 5670,
      delivered: 5456,
      opened: 2890,
      clicked: 567,
      unsubscribed: 23,
      bounced: 214,
      openRate: 53.0,
      clickRate: 10.4,
      unsubscribeRate: 0.4,
      bounceRate: 3.9,
      revenue: 45230.75,
      roi: 451.2,
      audience: 'All Active Customers',
      trigger: 'Manual',
      frequency: 'One-time',
      templates: ['Edibles Promotion Email', 'Edibles SMS', 'Edibles Push']
    },
    {
      id: 'CAM-003',
      name: 'Abandoned Cart Recovery',
      type: 'Automated',
      channel: 'Email',
      status: 'Active',
      startDate: '2024-07-15',
      endDate: null,
      totalSent: 890,
      delivered: 856,
      opened: 445,
      clicked: 123,
      unsubscribed: 8,
      bounced: 34,
      openRate: 52.0,
      clickRate: 13.8,
      unsubscribeRate: 0.9,
      bounceRate: 4.0,
      revenue: 8950.25,
      roi: 298.3,
      audience: 'Cart Abandoners',
      trigger: 'Cart Abandonment',
      frequency: 'Triggered',
      templates: ['Cart Reminder 1', 'Cart Reminder 2', 'Final Offer']
    },
    {
      id: 'CAM-004',
      name: 'Weekly Newsletter',
      type: 'Recurring',
      channel: 'Email',
      status: 'Active',
      startDate: '2024-06-01',
      endDate: null,
      totalSent: 12340,
      delivered: 11890,
      opened: 4567,
      clicked: 890,
      unsubscribed: 45,
      bounced: 450,
      openRate: 38.4,
      clickRate: 7.5,
      unsubscribeRate: 0.4,
      bounceRate: 3.8,
      revenue: 23450.80,
      roi: 234.5,
      audience: 'Newsletter Subscribers',
      trigger: 'Schedule',
      frequency: 'Weekly',
      templates: ['Newsletter Template']
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalMessages: 45680,
    deliveryRate: 96.2,
    openRate: 58.7,
    clickRate: 12.4,
    unsubscribeRate: 0.8,
    bounceRate: 3.8,
    totalRevenue: 156780.50,
    avgROI: 298.5,
    activeTemplates: 24,
    activeCampaigns: 8
  });

  // Filter functions
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChannel = selectedChannel === 'all' || message.channel.toLowerCase() === selectedChannel;
    const matchesStatus = selectedStatus === 'all' || message.status.toLowerCase() === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || message.priority.toLowerCase() === selectedPriority;
    return matchesSearch && matchesChannel && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Opened': return 'bg-blue-100 text-blue-800';
      case 'Clicked': return 'bg-purple-100 text-purple-800';
      case 'Bounced': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'Email': return 'bg-blue-100 text-blue-800';
      case 'SMS': return 'bg-green-100 text-green-800';
      case 'Push': return 'bg-purple-100 text-purple-800';
      case 'Multi-channel': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'Email': return '📧';
      case 'SMS': return '💬';
      case 'Push': return '🔔';
      case 'Multi-channel': return '📱';
      default: return '📨';
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
              <p className="text-sm font-medium text-gray-600">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalMessages.toLocaleString()}</p>
              <p className="text-sm text-blue-600">{analytics.deliveryRate}% delivered</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.openRate}%</p>
              <p className="text-sm text-green-600">Above industry avg</p>
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
              <p className="text-sm font-medium text-gray-600">Click Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.clickRate}%</p>
              <p className="text-sm text-purple-600">Strong engagement</p>
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
              <p className="text-sm font-medium text-gray-600">Revenue Generated</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-sm text-yellow-600">{analytics.avgROI}% avg ROI</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Communication Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.deliveryRate}%</div>
              <div className="text-sm text-gray-600">Delivery Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.deliveryRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.openRate}%</div>
              <div className="text-sm text-gray-600">Open Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.openRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.clickRate}%</div>
              <div className="text-sm text-gray-600">Click Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${analytics.clickRate}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Messages</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {messages.slice(0, 5).map((message) => (
              <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getChannelIcon(message.channel)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{message.subject || message.content.substring(0, 50) + '...'}</h4>
                    <p className="text-sm text-gray-600">{message.channel} • {message.recipient}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelColor(message.channel)}`}>
                      {message.channel}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{message.sentAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.filter(c => c.status === 'Active').map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.type} • {campaign.channel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{campaign.openRate}%</p>
                      <p className="text-xs text-gray-500">Open Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{campaign.clickRate}%</p>
                      <p className="text-xs text-gray-500">Click Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${(campaign.revenue / 1000).toFixed(1)}k</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Channel Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl mb-2">📧</div>
              <div className="text-lg font-semibold text-gray-900">Email</div>
              <div className="text-sm text-gray-600 mb-2">Primary channel</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Open Rate:</span>
                  <span className="font-medium">58.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Click Rate:</span>
                  <span className="font-medium">12.4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Revenue:</span>
                  <span className="font-medium text-green-600">$89.5k</span>
                </div>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl mb-2">💬</div>
              <div className="text-lg font-semibold text-gray-900">SMS</div>
              <div className="text-sm text-gray-600 mb-2">High engagement</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Open Rate:</span>
                  <span className="font-medium">95.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Click Rate:</span>
                  <span className="font-medium">18.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Revenue:</span>
                  <span className="font-medium text-green-600">$28.5k</span>
                </div>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-4xl mb-2">🔔</div>
              <div className="text-lg font-semibold text-gray-900">Push</div>
              <div className="text-sm text-gray-600 mb-2">Mobile focused</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Open Rate:</span>
                  <span className="font-medium">45.6%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Click Rate:</span>
                  <span className="font-medium">8.9%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Revenue:</span>
                  <span className="font-medium text-green-600">$38.8k</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search messages..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
            >
              <option value="all">All Channels</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="delivered">Delivered</option>
              <option value="opened">Opened</option>
              <option value="clicked">Clicked</option>
              <option value="bounced">Bounced</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getChannelIcon(message.channel)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {message.subject || message.content.substring(0, 60) + '...'}
                  </h3>
                  <p className="text-sm text-gray-600">{message.type} • {message.template}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelColor(message.channel)}`}>
                  {message.channel}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(message.priority)}`}>
                  {message.priority}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                  {message.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Recipient:</p>
                <p className="text-sm text-gray-600">{message.recipient}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Sent:</p>
                <p className="text-sm text-gray-600">{message.sentAt}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Delivered:</p>
                <p className="text-sm text-gray-600">{message.deliveredAt || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Opened:</p>
                <p className="text-sm text-gray-600">{message.openedAt || 'N/A'}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Content:</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{message.content}</p>
            </div>
            
            {message.tags && message.tags.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {message.tags.map((tag, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Resend
              </button>
              {message.campaign && (
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  View Campaign
                </button>
              )}
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

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getChannelIcon(template.channel)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.category} • {template.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelColor(template.channel)}`}>
                  {template.channel}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                  {template.status}
                </span>
              </div>
            </div>
            
            {template.subject && (
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-700">Subject:</p>
                <p className="text-sm text-gray-600">{template.subject}</p>
              </div>
            )}
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Content Preview:</p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                {template.content.substring(0, 120)}...
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Usage:</p>
                <p className="text-sm text-blue-600">{template.usage.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Last Used:</p>
                <p className="text-sm text-gray-600">{template.lastUsed}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Open Rate:</p>
                <p className="text-sm text-green-600">{template.openRate}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Click Rate:</p>
                <p className="text-sm text-purple-600">{template.clickRate}%</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Variables:</p>
              <div className="flex flex-wrap gap-2">
                {template.variables.map((variable, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                    {`{{${variable}}}`}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Edit Template
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-6">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <p className="text-sm text-gray-600">{campaign.type} • {campaign.frequency}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelColor(campaign.channel)}`}>
                  {campaign.channel}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                  {campaign.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{campaign.totalSent.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Sent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{campaign.delivered.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{campaign.opened.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Opened</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{campaign.clicked.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Clicked</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">${(campaign.revenue / 1000).toFixed(1)}k</p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600">{campaign.roi}%</p>
                <p className="text-sm text-gray-600">ROI</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Open Rate:</p>
                <p className="text-sm text-blue-600">{campaign.openRate}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Click Rate:</p>
                <p className="text-sm text-purple-600">{campaign.clickRate}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Bounce Rate:</p>
                <p className="text-sm text-red-600">{campaign.bounceRate}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Unsubscribe Rate:</p>
                <p className="text-sm text-yellow-600">{campaign.unsubscribeRate}%</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Audience:</p>
                <p className="text-sm text-gray-600">{campaign.audience}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Start Date:</p>
                <p className="text-sm text-gray-600">{campaign.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date:</p>
                <p className="text-sm text-gray-600">{campaign.endDate || 'Ongoing'}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Templates Used:</p>
              <div className="flex flex-wrap gap-2">
                {campaign.templates.map((template, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {template}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Analytics
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit Campaign
              </button>
              {campaign.status === 'Active' && (
                <button className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
                  Pause Campaign
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Communication & Messaging</h1>
          <p className="mt-2 text-gray-600">Manage email, SMS, push notifications, and communication campaigns</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'messages', name: 'Messages', icon: '📧' },
              { id: 'templates', name: 'Templates', icon: '📝' },
              { id: 'campaigns', name: 'Campaigns', icon: '📈' }
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
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'campaigns' && renderCampaigns()}
      </div>
    </div>
  );
};

export default CommunicationModule;

