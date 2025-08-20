import React, { useState, useEffect, useMemo } from 'react';

const EnhancedMarketingAutomationModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showAutomationModal, setShowAutomationModal] = useState(false);
  const [showEmailBuilderModal, setShowEmailBuilderModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingAutomation, setEditingAutomation] = useState(null);

  // Form states
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    type: 'Email',
    subject: '',
    content: '',
    audience: 'All Customers',
    startDate: '',
    endDate: '',
    schedule: 'immediate',
    scheduledTime: '',
    tags: [],
    goals: {
      openRate: 25,
      clickRate: 5,
      conversionRate: 2
    }
  });

  const [automationForm, setAutomationForm] = useState({
    name: '',
    trigger: 'New Customer Registration',
    description: '',
    emails: [
      {
        id: 1,
        subject: '',
        content: '',
        delay: 0,
        delayUnit: 'hours'
      }
    ],
    conditions: [],
    goals: {
      completionRate: 70,
      revenue: 1000
    }
  });

  const [emailForm, setEmailForm] = useState({
    subject: '',
    preheader: '',
    content: '',
    template: 'basic',
    personalization: true,
    ctaText: 'Shop Now',
    ctaUrl: ''
  });

  // Mock marketing data
  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAMP-001',
      name: 'Summer Cannabis Sale',
      type: 'Email',
      subject: '🌞 Summer Sale: 25% Off Premium Strains',
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
      conversionRate: 2.0,
      schedule: 'immediate',
      tags: ['summer', 'sale', 'discount'],
      content: 'Beat the heat with our premium cannabis selection! Get 25% off all flower products this summer.',
      goals: { openRate: 25, clickRate: 5, conversionRate: 2 }
    },
    {
      id: 'CAMP-002',
      name: 'New Customer Welcome Series',
      type: 'Email Sequence',
      subject: 'Welcome to DankDash - Your Cannabis Journey Starts Here',
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
      conversionRate: 19.9,
      schedule: 'automated',
      tags: ['welcome', 'onboarding', 'new-customer'],
      content: 'Welcome to the DankDash family! Discover our premium products and exclusive member benefits.',
      goals: { openRate: 60, clickRate: 30, conversionRate: 15 }
    },
    {
      id: 'CAMP-003',
      name: 'Premium Product Launch',
      type: 'SMS',
      subject: 'New Premium Strain Alert! 🔥',
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
      conversionRate: 19.1,
      schedule: 'scheduled',
      tags: ['premium', 'launch', 'vip'],
      content: 'Exclusive first access to our new premium strain collection. Limited quantities available!',
      goals: { openRate: 90, clickRate: 35, conversionRate: 15 }
    },
    {
      id: 'CAMP-004',
      name: 'Loyalty Program Promotion',
      type: 'Push Notification',
      subject: 'Double Points Weekend! 🎯',
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
      conversionRate: 0.0,
      schedule: 'scheduled',
      tags: ['loyalty', 'points', 'weekend'],
      content: 'Earn double loyalty points on all purchases this weekend. Stack up those rewards!',
      goals: { openRate: 80, clickRate: 25, conversionRate: 10 }
    }
  ]);

  const [automations, setAutomations] = useState([
    {
      id: 'AUTO-001',
      name: 'Welcome Email Series',
      trigger: 'New Customer Registration',
      description: 'Onboard new customers with educational content and special offers',
      status: 'Active',
      emails: [
        { id: 1, subject: 'Welcome to DankDash!', delay: 0, delayUnit: 'hours' },
        { id: 2, subject: 'Your First Purchase Guide', delay: 24, delayUnit: 'hours' },
        { id: 3, subject: 'Exclusive New Customer Offer', delay: 72, delayUnit: 'hours' }
      ],
      subscribers: 156,
      completionRate: 78.2,
      revenue: 2340.00,
      conditions: ['Age >= 21', 'Email verified'],
      goals: { completionRate: 70, revenue: 2000 }
    },
    {
      id: 'AUTO-002',
      name: 'Abandoned Cart Recovery',
      trigger: 'Cart Abandoned > 2 hours',
      description: 'Recover abandoned carts with personalized reminders and incentives',
      status: 'Active',
      emails: [
        { id: 1, subject: 'You left something behind...', delay: 2, delayUnit: 'hours' },
        { id: 2, subject: 'Complete your order + 10% off', delay: 24, delayUnit: 'hours' }
      ],
      subscribers: 89,
      completionRate: 45.5,
      revenue: 1780.00,
      conditions: ['Cart value > $50', 'Not purchased in 24h'],
      goals: { completionRate: 50, revenue: 2000 }
    },
    {
      id: 'AUTO-003',
      name: 'Re-engagement Campaign',
      trigger: 'No Purchase > 30 days',
      description: 'Win back inactive customers with special offers and new product updates',
      status: 'Active',
      emails: [
        { id: 1, subject: 'We miss you! Come back for 20% off', delay: 0, delayUnit: 'hours' },
        { id: 2, subject: 'New products you might love', delay: 168, delayUnit: 'hours' }
      ],
      subscribers: 234,
      completionRate: 32.1,
      revenue: 3450.00,
      conditions: ['Last purchase > 30 days', 'Previously active'],
      goals: { completionRate: 40, revenue: 3000 }
    },
    {
      id: 'AUTO-004',
      name: 'VIP Customer Nurture',
      trigger: 'Total Spent > $1000',
      description: 'Provide exclusive experiences and early access to VIP customers',
      status: 'Draft',
      emails: [
        { id: 1, subject: 'Welcome to VIP Status!', delay: 0, delayUnit: 'hours' },
        { id: 2, subject: 'Exclusive VIP Preview', delay: 168, delayUnit: 'hours' }
      ],
      subscribers: 0,
      completionRate: 0,
      revenue: 0,
      conditions: ['Total spent >= $1000', 'Active in last 60 days'],
      goals: { completionRate: 80, revenue: 5000 }
    }
  ]);

  const [audiences, setAudiences] = useState([
    { id: 'all', name: 'All Customers', count: 2450, description: 'All registered customers' },
    { id: 'new', name: 'New Customers', count: 156, description: 'Customers registered in last 30 days' },
    { id: 'vip', name: 'VIP Customers', count: 89, description: 'Customers with $1000+ lifetime value' },
    { id: 'loyalty', name: 'Loyalty Members', count: 567, description: 'Active loyalty program members' },
    { id: 'inactive', name: 'Inactive Customers', count: 234, description: 'No purchase in last 30 days' }
  ]);

  const [templates, setTemplates] = useState([
    { id: 'basic', name: 'Basic Newsletter', description: 'Simple text-based email template' },
    { id: 'product', name: 'Product Showcase', description: 'Highlight featured products with images' },
    { id: 'sale', name: 'Sale Announcement', description: 'Eye-catching sale and promotion template' },
    { id: 'welcome', name: 'Welcome Series', description: 'Onboarding template for new customers' },
    { id: 'cart', name: 'Cart Recovery', description: 'Abandoned cart reminder template' }
  ]);

  // Filter functions
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || campaign.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchTerm, selectedStatus]);

  const filteredAutomations = useMemo(() => {
    return automations.filter(automation => {
      const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           automation.trigger.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || automation.status.toLowerCase() === selectedStatus.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [automations, searchTerm, selectedStatus]);

  // Campaign CRUD Operations
  const handleAddCampaign = () => {
    if (!campaignForm.name || !campaignForm.subject || !campaignForm.content) {
      alert('Please fill in required fields (Name, Subject, and Content)');
      return;
    }

    const newCampaign = {
      id: `CAMP-${String(campaigns.length + 1).padStart(3, '0')}`,
      ...campaignForm,
      status: campaignForm.schedule === 'immediate' ? 'Active' : 'Scheduled',
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      revenue: 0,
      openRate: 0,
      clickRate: 0,
      conversionRate: 0
    };

    setCampaigns([...campaigns, newCampaign]);
    setCampaignForm({
      name: '',
      type: 'Email',
      subject: '',
      content: '',
      audience: 'All Customers',
      startDate: '',
      endDate: '',
      schedule: 'immediate',
      scheduledTime: '',
      tags: [],
      goals: { openRate: 25, clickRate: 5, conversionRate: 2 }
    });
    setShowCampaignModal(false);
    alert('Campaign created successfully!');
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm({
      name: campaign.name,
      type: campaign.type,
      subject: campaign.subject,
      content: campaign.content,
      audience: campaign.audience,
      startDate: campaign.startDate,
      endDate: campaign.endDate,
      schedule: campaign.schedule,
      scheduledTime: campaign.scheduledTime || '',
      tags: campaign.tags || [],
      goals: campaign.goals || { openRate: 25, clickRate: 5, conversionRate: 2 }
    });
    setShowCampaignModal(true);
  };

  const handleUpdateCampaign = () => {
    if (!campaignForm.name || !campaignForm.subject || !campaignForm.content) {
      alert('Please fill in required fields (Name, Subject, and Content)');
      return;
    }

    const updatedCampaigns = campaigns.map(campaign =>
      campaign.id === editingCampaign.id
        ? { ...campaign, ...campaignForm }
        : campaign
    );

    setCampaigns(updatedCampaigns);
    setEditingCampaign(null);
    setCampaignForm({
      name: '',
      type: 'Email',
      subject: '',
      content: '',
      audience: 'All Customers',
      startDate: '',
      endDate: '',
      schedule: 'immediate',
      scheduledTime: '',
      tags: [],
      goals: { openRate: 25, clickRate: 5, conversionRate: 2 }
    });
    setShowCampaignModal(false);
    alert('Campaign updated successfully!');
  };

  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      alert('Campaign deleted successfully!');
    }
  };

  const handleLaunchCampaign = (campaignId) => {
    const updatedCampaigns = campaigns.map(campaign =>
      campaign.id === campaignId ? { ...campaign, status: 'Active' } : campaign
    );
    setCampaigns(updatedCampaigns);
    alert('Campaign launched successfully!');
  };

  const handlePauseCampaign = (campaignId) => {
    const updatedCampaigns = campaigns.map(campaign =>
      campaign.id === campaignId ? { ...campaign, status: 'Paused' } : campaign
    );
    setCampaigns(updatedCampaigns);
    alert('Campaign paused successfully!');
  };

  // Automation CRUD Operations
  const handleAddAutomation = () => {
    if (!automationForm.name || !automationForm.trigger || automationForm.emails.length === 0) {
      alert('Please fill in required fields (Name, Trigger, and at least one email)');
      return;
    }

    const newAutomation = {
      id: `AUTO-${String(automations.length + 1).padStart(3, '0')}`,
      ...automationForm,
      status: 'Draft',
      subscribers: 0,
      completionRate: 0,
      revenue: 0
    };

    setAutomations([...automations, newAutomation]);
    setAutomationForm({
      name: '',
      trigger: 'New Customer Registration',
      description: '',
      emails: [{ id: 1, subject: '', content: '', delay: 0, delayUnit: 'hours' }],
      conditions: [],
      goals: { completionRate: 70, revenue: 1000 }
    });
    setShowAutomationModal(false);
    alert('Automation created successfully!');
  };

  const handleEditAutomation = (automation) => {
    setEditingAutomation(automation);
    setAutomationForm({
      name: automation.name,
      trigger: automation.trigger,
      description: automation.description,
      emails: automation.emails,
      conditions: automation.conditions || [],
      goals: automation.goals || { completionRate: 70, revenue: 1000 }
    });
    setShowAutomationModal(true);
  };

  const handleUpdateAutomation = () => {
    if (!automationForm.name || !automationForm.trigger || automationForm.emails.length === 0) {
      alert('Please fill in required fields (Name, Trigger, and at least one email)');
      return;
    }

    const updatedAutomations = automations.map(automation =>
      automation.id === editingAutomation.id
        ? { ...automation, ...automationForm }
        : automation
    );

    setAutomations(updatedAutomations);
    setEditingAutomation(null);
    setAutomationForm({
      name: '',
      trigger: 'New Customer Registration',
      description: '',
      emails: [{ id: 1, subject: '', content: '', delay: 0, delayUnit: 'hours' }],
      conditions: [],
      goals: { completionRate: 70, revenue: 1000 }
    });
    setShowAutomationModal(false);
    alert('Automation updated successfully!');
  };

  const handleDeleteAutomation = (automationId) => {
    if (window.confirm('Are you sure you want to delete this automation?')) {
      setAutomations(automations.filter(automation => automation.id !== automationId));
      alert('Automation deleted successfully!');
    }
  };

  const handleActivateAutomation = (automationId) => {
    const updatedAutomations = automations.map(automation =>
      automation.id === automationId ? { ...automation, status: 'Active' } : automation
    );
    setAutomations(updatedAutomations);
    alert('Automation activated successfully!');
  };

  // Email management
  const addEmailToAutomation = () => {
    const newEmail = {
      id: automationForm.emails.length + 1,
      subject: '',
      content: '',
      delay: 24,
      delayUnit: 'hours'
    };
    setAutomationForm({
      ...automationForm,
      emails: [...automationForm.emails, newEmail]
    });
  };

  const removeEmailFromAutomation = (emailId) => {
    setAutomationForm({
      ...automationForm,
      emails: automationForm.emails.filter(email => email.id !== emailId)
    });
  };

  const updateAutomationEmail = (emailId, field, value) => {
    setAutomationForm({
      ...automationForm,
      emails: automationForm.emails.map(email =>
        email.id === emailId ? { ...email, [field]: value } : email
      )
    });
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Dashboard calculations
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'Active').length;
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const avgOpenRate = campaigns.length > 0 ? 
    campaigns.reduce((sum, c) => sum + c.openRate, 0) / campaigns.length : 0;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
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
              <p className="text-2xl font-bold text-gray-900">{totalCampaigns}</p>
              <p className="text-sm text-blue-600">{activeCampaigns} active</p>
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
              <p className="text-sm font-medium text-gray-600">Revenue Generated</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-green-600">+15.3% vs last month</p>
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
              <p className="text-2xl font-bold text-gray-900">{avgOpenRate.toFixed(1)}%</p>
              <p className="text-sm text-purple-600">Industry avg: 21.3%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Automations</p>
              <p className="text-2xl font-bold text-gray-900">{automations.filter(a => a.status === 'Active').length}</p>
              <p className="text-sm text-orange-600">{automations.length} total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Campaign Performance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <p className="text-sm text-gray-600">{campaign.type} • {campaign.audience}</p>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{campaign.openRate.toFixed(1)}%</p>
                    <p className="text-gray-500">Open Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{campaign.clickRate.toFixed(1)}%</p>
                    <p className="text-gray-500">Click Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{formatCurrency(campaign.revenue)}</p>
                    <p className="text-gray-500">Revenue</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowCampaignModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left"
            >
              Create New Campaign
            </button>
            <button
              onClick={() => setShowAutomationModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left"
            >
              Setup Automation
            </button>
            <button
              onClick={() => setShowEmailBuilderModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left"
            >
              Email Builder
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Audience Insights</h3>
          <div className="space-y-3">
            {audiences.slice(0, 3).map((audience) => (
              <div key={audience.id} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{audience.name}</span>
                <span className="text-sm font-medium text-gray-900">{audience.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Personalize subject lines to increase open rates by 26%</p>
            <p>• Send emails on Tuesday-Thursday for best engagement</p>
            <p>• A/B test your call-to-action buttons</p>
            <p>• Segment your audience for better targeting</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg flex space-x-4">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
        <button 
          onClick={() => setShowCampaignModal(true)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Campaign
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {campaign.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{campaign.audience}</div>
                  <div className="text-sm text-gray-500">{campaign.sent.toLocaleString()} sent</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Open: {campaign.openRate.toFixed(1)}% | Click: {campaign.clickRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Conv: {campaign.conversionRate.toFixed(1)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(campaign.revenue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing campaign: ${campaign.name}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditCampaign(campaign)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  {campaign.status === 'Draft' && (
                    <button 
                      onClick={() => handleLaunchCampaign(campaign.id)}
                      className="text-purple-600 hover:text-purple-900 mr-3"
                    >
                      Launch
                    </button>
                  )}
                  {campaign.status === 'Active' && (
                    <button 
                      onClick={() => handlePauseCampaign(campaign.id)}
                      className="text-yellow-600 hover:text-yellow-900 mr-3"
                    >
                      Pause
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAutomations = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg flex space-x-4">
          <input
            type="text"
            placeholder="Search automations..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="paused">Paused</option>
          </select>
        </div>
        <button 
          onClick={() => setShowAutomationModal(true)}
          className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Automation
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Automation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trigger</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emails</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAutomations.map((automation) => (
              <tr key={automation.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{automation.name}</div>
                    <div className="text-sm text-gray-500">{automation.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {automation.trigger}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{automation.emails.length} emails</div>
                  <div className="text-sm text-gray-500">{automation.subscribers} subscribers</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    Completion: {automation.completionRate.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-500">
                    Goal: {automation.goals?.completionRate || 70}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(automation.revenue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(automation.status)}`}>
                    {automation.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing automation: ${automation.name}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditAutomation(automation)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  {automation.status === 'Draft' && (
                    <button 
                      onClick={() => handleActivateAutomation(automation.id)}
                      className="text-purple-600 hover:text-purple-900 mr-3"
                    >
                      Activate
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteAutomation(automation.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Campaign Modal
  const CampaignModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Campaign Name *</label>
              <input
                type="text"
                value={campaignForm.name}
                onChange={(e) => setCampaignForm({...campaignForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Campaign Type</label>
              <select
                value={campaignForm.type}
                onChange={(e) => setCampaignForm({...campaignForm, type: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Push Notification">Push Notification</option>
                <option value="Email Sequence">Email Sequence</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject Line *</label>
              <input
                type="text"
                value={campaignForm.subject}
                onChange={(e) => setCampaignForm({...campaignForm, subject: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Audience</label>
              <select
                value={campaignForm.audience}
                onChange={(e) => setCampaignForm({...campaignForm, audience: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {audiences.map(audience => (
                  <option key={audience.id} value={audience.name}>
                    {audience.name} ({audience.count.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={campaignForm.startDate}
                onChange={(e) => setCampaignForm({...campaignForm, startDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={campaignForm.endDate}
                onChange={(e) => setCampaignForm({...campaignForm, endDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Campaign Content *</label>
            <textarea
              value={campaignForm.content}
              onChange={(e) => setCampaignForm({...campaignForm, content: e.target.value})}
              rows={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your campaign message here..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Schedule</label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="immediate"
                  checked={campaignForm.schedule === 'immediate'}
                  onChange={(e) => setCampaignForm({...campaignForm, schedule: e.target.value})}
                  className="mr-2"
                />
                Send immediately
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="scheduled"
                  checked={campaignForm.schedule === 'scheduled'}
                  onChange={(e) => setCampaignForm({...campaignForm, schedule: e.target.value})}
                  className="mr-2"
                />
                Schedule for later
              </label>
              {campaignForm.schedule === 'scheduled' && (
                <input
                  type="datetime-local"
                  value={campaignForm.scheduledTime}
                  onChange={(e) => setCampaignForm({...campaignForm, scheduledTime: e.target.value})}
                  className="ml-6 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowCampaignModal(false);
                setEditingCampaign(null);
                setCampaignForm({
                  name: '',
                  type: 'Email',
                  subject: '',
                  content: '',
                  audience: 'All Customers',
                  startDate: '',
                  endDate: '',
                  schedule: 'immediate',
                  scheduledTime: '',
                  tags: [],
                  goals: { openRate: 25, clickRate: 5, conversionRate: 2 }
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingCampaign ? handleUpdateCampaign : handleAddCampaign}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingCampaign ? 'Update' : 'Create'} Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Automation Modal
  const AutomationModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingAutomation ? 'Edit Automation' : 'Create New Automation'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Automation Name *</label>
              <input
                type="text"
                value={automationForm.name}
                onChange={(e) => setAutomationForm({...automationForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Trigger Event</label>
              <select
                value={automationForm.trigger}
                onChange={(e) => setAutomationForm({...automationForm, trigger: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="New Customer Registration">New Customer Registration</option>
                  <option value="Cart Abandoned &gt; 2 hours">Cart Abandoned &gt; 2 hours</option>
                  <option value="No Purchase &gt; 30 days">No Purchase &gt; 30 days</option>
                  <option value="Total Spent &gt; $1000">Total Spent &gt; $1000</option>
                <option value="Birthday">Birthday</option>
                <option value="Product Purchase">Product Purchase</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={automationForm.description}
              onChange={(e) => setAutomationForm({...automationForm, description: e.target.value})}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe what this automation does..."
            />
          </div>

          {/* Email Sequence */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900">Email Sequence</h4>
              <button
                onClick={addEmailToAutomation}
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
              >
                Add Email
              </button>
            </div>
            <div className="space-y-3">
              {automationForm.emails.map((email, index) => (
                <div key={email.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h5 className="font-medium text-gray-900">Email {index + 1}</h5>
                    {automationForm.emails.length > 1 && (
                      <button
                        onClick={() => removeEmailFromAutomation(email.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject Line</label>
                      <input
                        type="text"
                        value={email.subject}
                        onChange={(e) => updateAutomationEmail(email.id, 'subject', e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Email subject..."
                      />
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Delay</label>
                        <input
                          type="number"
                          value={email.delay}
                          onChange={(e) => updateAutomationEmail(email.id, 'delay', parseInt(e.target.value) || 0)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                        <select
                          value={email.delayUnit}
                          onChange={(e) => updateAutomationEmail(email.id, 'delayUnit', e.target.value)}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="hours">Hours</option>
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowAutomationModal(false);
                setEditingAutomation(null);
                setAutomationForm({
                  name: '',
                  trigger: 'New Customer Registration',
                  description: '',
                  emails: [{ id: 1, subject: '', content: '', delay: 0, delayUnit: 'hours' }],
                  conditions: [],
                  goals: { completionRate: 70, revenue: 1000 }
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingAutomation ? handleUpdateAutomation : handleAddAutomation}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {editingAutomation ? 'Update' : 'Create'} Automation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Email Builder Modal
  const EmailBuilderModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Builder</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Template</label>
                  <select
                    value={emailForm.template}
                    onChange={(e) => setEmailForm({...emailForm, template: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject Line</label>
                  <input
                    type="text"
                    value={emailForm.subject}
                    onChange={(e) => setEmailForm({...emailForm, subject: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter subject line..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preheader Text</label>
                  <input
                    type="text"
                    value={emailForm.preheader}
                    onChange={(e) => setEmailForm({...emailForm, preheader: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Preview text..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Content</label>
                  <textarea
                    value={emailForm.content}
                    onChange={(e) => setEmailForm({...emailForm, content: e.target.value})}
                    rows={8}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Enter your email content here..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CTA Text</label>
                    <input
                      type="text"
                      value={emailForm.ctaText}
                      onChange={(e) => setEmailForm({...emailForm, ctaText: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CTA URL</label>
                    <input
                      type="url"
                      value={emailForm.ctaUrl}
                      onChange={(e) => setEmailForm({...emailForm, ctaUrl: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={emailForm.personalization}
                    onChange={(e) => setEmailForm({...emailForm, personalization: e.target.checked})}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Enable personalization</label>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Email Preview</h4>
                <div className="bg-white p-4 rounded border text-sm">
                  <div className="border-b pb-2 mb-3">
                    <div className="font-medium">Subject: {emailForm.subject || 'Your Subject Line'}</div>
                    <div className="text-gray-500 text-xs">Preheader: {emailForm.preheader || 'Preview text'}</div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-center">
                      <h1 className="text-lg font-bold text-green-600">DankDash</h1>
                    </div>
                    <div className="whitespace-pre-wrap">
                      {emailForm.content || 'Your email content will appear here...'}
                    </div>
                    {emailForm.ctaText && (
                      <div className="text-center">
                        <button className="bg-green-600 text-white px-4 py-2 rounded">
                          {emailForm.ctaText}
                        </button>
                      </div>
                    )}
                    <div className="text-xs text-gray-500 border-t pt-2">
                      <p>© 2024 DankDash. All rights reserved.</p>
                      <p>You received this email because you're a valued customer.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowEmailBuilderModal(false);
                setEmailForm({
                  subject: '',
                  preheader: '',
                  content: '',
                  template: 'basic',
                  personalization: true,
                  ctaText: 'Shop Now',
                  ctaUrl: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => alert('Email template saved!')}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Marketing Automation</h1>
        <p className="mt-2 text-gray-600">Create, manage, and optimize your marketing campaigns and automations</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'campaigns', name: 'Campaigns', icon: '📧' },
            { id: 'automations', name: 'Automations', icon: '⚡' },
            { id: 'analytics', name: 'Analytics', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'campaigns' && renderCampaigns()}
      {activeTab === 'automations' && renderAutomations()}
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Marketing Analytics</h3>
          <p className="text-gray-600">Advanced analytics coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showCampaignModal && <CampaignModal />}
      {showAutomationModal && <AutomationModal />}
      {showEmailBuilderModal && <EmailBuilderModal />}
    </div>
  );
};

export default EnhancedMarketingAutomationModule;

