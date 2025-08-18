import React, { useState, useEffect, useMemo } from 'react';

const EnhancedSMSMarketingModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCampaignType, setSelectedCampaignType] = useState('all');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Form states
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    message: '',
    type: 'Promotional',
    segment: 'All Customers',
    scheduledDate: '',
    scheduledTime: '',
    template: '',
    fromNumber: '+1-555-DANK-DASH'
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    type: 'Promotional',
    message: '',
    variables: []
  });

  const [contactForm, setContactForm] = useState({
    phone: '',
    firstName: '',
    lastName: '',
    segment: 'General',
    optInDate: new Date().toISOString().split('T')[0],
    source: 'Manual'
  });

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
      characterCount: 125,
      template: 'flash-sale-template',
      fromNumber: '+1-555-DANK-DASH'
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
      characterCount: 98,
      template: 'order-ready-template',
      fromNumber: '+1-555-DANK-DASH'
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
      characterCount: 118,
      template: 'product-launch-template',
      fromNumber: '+1-555-DANK-DASH'
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
      characterCount: 112,
      template: 'loyalty-template',
      fromNumber: '+1-555-DANK-DASH'
    },
    {
      id: 'SMS-005',
      name: 'Cart Abandonment Recovery',
      message: 'Don\'t forget your cart! Complete your order in the next 2 hours and get FREE delivery. Cart total: {{cart_total}}',
      status: 'Active',
      type: 'Automation',
      sentDate: '2024-08-12',
      scheduledDate: 'Automated',
      recipients: 180,
      delivered: 175,
      clicked: 52,
      optOuts: 3,
      deliveryRate: 97.2,
      clickRate: 29.7,
      optOutRate: 1.7,
      revenue: 2400.00,
      segment: 'Cart Abandoners',
      characterCount: 108,
      template: 'cart-abandonment-template',
      fromNumber: '+1-555-DANK-DASH'
    },
    {
      id: 'SMS-006',
      name: 'Birthday Special Offer',
      message: '🎉 Happy Birthday {{first_name}}! Celebrate with 25% off your entire order today. Use code BIRTHDAY25. Cheers!',
      status: 'Active',
      type: 'Birthday',
      sentDate: '2024-08-10',
      scheduledDate: 'Automated',
      recipients: 25,
      delivered: 25,
      clicked: 18,
      optOuts: 0,
      deliveryRate: 100.0,
      clickRate: 72.0,
      optOutRate: 0.0,
      revenue: 450.00,
      segment: 'Birthday Customers',
      characterCount: 105,
      template: 'birthday-template',
      fromNumber: '+1-555-DANK-DASH'
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
      avgOptOutRate: 0.8,
      variables: ['discount', 'product_category', 'promo_code', 'expiry', 'link'],
      createdDate: '2024-07-01'
    },
    {
      id: 'TEMP-SMS-002',
      name: 'Order Ready Template',
      type: 'Transactional',
      message: 'Hi {{first_name}}, your DankDash order #{{order_id}} is ready for pickup! Address: {{store_address}}. Hours: {{store_hours}}.',
      characterCount: 98,
      usage: 156,
      lastUsed: '2024-08-15',
      performance: 'Excellent',
      avgClickRate: 26.7,
      avgOptOutRate: 0.1,
      variables: ['first_name', 'order_id', 'store_address', 'store_hours'],
      createdDate: '2024-06-15'
    },
    {
      id: 'TEMP-SMS-003',
      name: 'Product Launch Template',
      type: 'Product Launch',
      message: '🍃 NEW ARRIVAL: {{product_name}} now available! {{product_description}}. Order now for {{delivery_option}}!',
      characterCount: 85,
      usage: 12,
      lastUsed: '2024-08-10',
      performance: 'Good',
      avgClickRate: 18.5,
      avgOptOutRate: 1.2,
      variables: ['product_name', 'product_description', 'delivery_option'],
      createdDate: '2024-07-20'
    },
    {
      id: 'TEMP-SMS-004',
      name: 'Loyalty Points Template',
      type: 'Loyalty',
      message: 'You have {{points}} loyalty points expiring soon! Redeem now for ${{discount_amount}} off your next order. Visit: {{loyalty_link}}',
      characterCount: 102,
      usage: 8,
      lastUsed: '2024-08-05',
      performance: 'Good',
      avgClickRate: 22.3,
      avgOptOutRate: 0.5,
      variables: ['points', 'discount_amount', 'loyalty_link'],
      createdDate: '2024-07-25'
    },
    {
      id: 'TEMP-SMS-005',
      name: 'Cart Abandonment Template',
      type: 'Automation',
      message: 'Don\'t forget your cart! Complete your order in the next {{time_limit}} and get {{incentive}}. Cart total: {{cart_total}}',
      characterCount: 95,
      usage: 45,
      lastUsed: '2024-08-14',
      performance: 'High',
      avgClickRate: 29.7,
      avgOptOutRate: 1.7,
      variables: ['time_limit', 'incentive', 'cart_total'],
      createdDate: '2024-06-30'
    },
    {
      id: 'TEMP-SMS-006',
      name: 'Birthday Template',
      type: 'Birthday',
      message: '🎉 Happy Birthday {{first_name}}! Celebrate with {{discount}}% off your entire order today. Use code {{birthday_code}}. Cheers!',
      characterCount: 105,
      usage: 35,
      lastUsed: '2024-08-13',
      performance: 'Excellent',
      avgClickRate: 72.0,
      avgOptOutRate: 0.2,
      variables: ['first_name', 'discount', 'birthday_code'],
      createdDate: '2024-06-20'
    }
  ]);

  const [smsContacts, setSmsContacts] = useState([
    {
      id: 'CONTACT-001',
      phone: '+1-555-123-4567',
      firstName: 'John',
      lastName: 'Smith',
      segment: 'VIP Customers',
      optInDate: '2024-01-15',
      source: 'Website',
      status: 'Active',
      totalMessages: 25,
      lastMessage: '2024-08-10',
      clickRate: 18.5,
      optOutDate: null
    },
    {
      id: 'CONTACT-002',
      phone: '+1-555-987-6543',
      firstName: 'Sarah',
      lastName: 'Johnson',
      segment: 'Active Customers',
      optInDate: '2024-02-20',
      source: 'In-Store',
      status: 'Active',
      totalMessages: 18,
      lastMessage: '2024-08-12',
      clickRate: 22.3,
      optOutDate: null
    },
    {
      id: 'CONTACT-003',
      phone: '+1-555-456-7890',
      firstName: 'Mike',
      lastName: 'Davis',
      segment: 'Edibles Enthusiasts',
      optInDate: '2024-03-10',
      source: 'Social Media',
      status: 'Active',
      totalMessages: 12,
      lastMessage: '2024-08-08',
      clickRate: 15.8,
      optOutDate: null
    },
    {
      id: 'CONTACT-004',
      phone: '+1-555-321-0987',
      firstName: 'Emily',
      lastName: 'Wilson',
      segment: 'New Customers',
      optInDate: '2024-07-25',
      source: 'Referral',
      status: 'Active',
      totalMessages: 3,
      lastMessage: '2024-08-01',
      clickRate: 33.3,
      optOutDate: null
    },
    {
      id: 'CONTACT-005',
      phone: '+1-555-654-3210',
      firstName: 'David',
      lastName: 'Brown',
      segment: 'General',
      optInDate: '2024-04-15',
      source: 'Website',
      status: 'Opted Out',
      totalMessages: 8,
      lastMessage: '2024-06-20',
      clickRate: 12.5,
      optOutDate: '2024-06-22'
    }
  ]);

  const [smsSegments] = useState([
    { name: 'All Customers', count: 2450, description: 'All opted-in customers' },
    { name: 'Active Customers', count: 1850, description: 'Customers with recent purchases' },
    { name: 'VIP Customers', count: 320, description: 'High-value loyalty customers' },
    { name: 'New Customers', count: 180, description: 'Customers who joined in last 30 days' },
    { name: 'Edibles Enthusiasts', count: 890, description: 'Customers who primarily buy edibles' },
    { name: 'Flower Enthusiasts', count: 1200, description: 'Customers who primarily buy flower' },
    { name: 'Cart Abandoners', count: 450, description: 'Customers with abandoned carts' },
    { name: 'Birthday Customers', count: 25, description: 'Customers with birthdays today' },
    { name: 'Order Customers', count: 45, description: 'Customers with pending orders' }
  ]);

  // Filter functions
  const filteredCampaigns = useMemo(() => {
    return smsCampaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || campaign.status.toLowerCase() === selectedStatus;
      const matchesType = selectedCampaignType === 'all' || campaign.type.toLowerCase() === selectedCampaignType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [smsCampaigns, searchTerm, selectedStatus, selectedCampaignType]);

  // SMS Campaign CRUD Operations
  const handleAddCampaign = () => {
    if (!campaignForm.name || !campaignForm.message) {
      alert('Please fill in required fields (Name and Message)');
      return;
    }

    if (campaignForm.message.length > 160) {
      alert('Message exceeds 160 characters. Please shorten your message.');
      return;
    }

    const selectedSegment = smsSegments.find(s => s.name === campaignForm.segment);
    
    const newCampaign = {
      id: `SMS-${String(smsCampaigns.length + 1).padStart(3, '0')}`,
      ...campaignForm,
      status: campaignForm.scheduledDate ? 'Scheduled' : 'Draft',
      sentDate: null,
      scheduledDate: campaignForm.scheduledDate ? `${campaignForm.scheduledDate} ${campaignForm.scheduledTime}` : null,
      recipients: selectedSegment ? selectedSegment.count : 0,
      delivered: 0,
      clicked: 0,
      optOuts: 0,
      deliveryRate: 0.0,
      clickRate: 0.0,
      optOutRate: 0.0,
      revenue: 0.00,
      characterCount: campaignForm.message.length,
      template: campaignForm.template || 'custom'
    };

    setSmsCampaigns([...smsCampaigns, newCampaign]);
    setCampaignForm({
      name: '',
      message: '',
      type: 'Promotional',
      segment: 'All Customers',
      scheduledDate: '',
      scheduledTime: '',
      template: '',
      fromNumber: '+1-555-DANK-DASH'
    });
    setShowCampaignModal(false);
    alert('SMS campaign created successfully!');
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    const [date, time] = campaign.scheduledDate && campaign.scheduledDate !== 'Triggered' && campaign.scheduledDate !== 'Automated' 
      ? campaign.scheduledDate.split(' ') : ['', ''];
    setCampaignForm({
      name: campaign.name,
      message: campaign.message,
      type: campaign.type,
      segment: campaign.segment,
      scheduledDate: date,
      scheduledTime: time,
      template: campaign.template,
      fromNumber: campaign.fromNumber
    });
    setShowCampaignModal(true);
  };

  const handleUpdateCampaign = () => {
    if (!campaignForm.name || !campaignForm.message) {
      alert('Please fill in required fields (Name and Message)');
      return;
    }

    if (campaignForm.message.length > 160) {
      alert('Message exceeds 160 characters. Please shorten your message.');
      return;
    }

    const updatedCampaigns = smsCampaigns.map(campaign =>
      campaign.id === editingCampaign.id
        ? { 
            ...campaign, 
            ...campaignForm,
            scheduledDate: campaignForm.scheduledDate ? `${campaignForm.scheduledDate} ${campaignForm.scheduledTime}` : null,
            characterCount: campaignForm.message.length
          }
        : campaign
    );

    setSmsCampaigns(updatedCampaigns);
    setEditingCampaign(null);
    setCampaignForm({
      name: '',
      message: '',
      type: 'Promotional',
      segment: 'All Customers',
      scheduledDate: '',
      scheduledTime: '',
      template: '',
      fromNumber: '+1-555-DANK-DASH'
    });
    setShowCampaignModal(false);
    alert('SMS campaign updated successfully!');
  };

  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this SMS campaign? This action cannot be undone.')) {
      setSmsCampaigns(smsCampaigns.filter(campaign => campaign.id !== campaignId));
      alert('SMS campaign deleted successfully!');
    }
  };

  const handleSendCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to send this SMS campaign now?')) {
      const updatedCampaigns = smsCampaigns.map(campaign =>
        campaign.id === campaignId
          ? { 
              ...campaign, 
              status: 'Sent',
              sentDate: new Date().toISOString().split('T')[0],
              delivered: Math.floor(campaign.recipients * 0.98),
              clicked: Math.floor(campaign.recipients * 0.18),
              optOuts: Math.floor(campaign.recipients * 0.01),
              deliveryRate: 98.0,
              clickRate: 18.0,
              optOutRate: 1.0,
              revenue: Math.floor(Math.random() * 5000) + 1000
            }
          : campaign
      );
      setSmsCampaigns(updatedCampaigns);
      alert('SMS campaign sent successfully!');
    }
  };

  const handleDuplicateCampaign = (campaign) => {
    const newCampaign = {
      ...campaign,
      id: `SMS-${String(smsCampaigns.length + 1).padStart(3, '0')}`,
      name: `${campaign.name} (Copy)`,
      status: 'Draft',
      sentDate: null,
      scheduledDate: null,
      delivered: 0,
      clicked: 0,
      optOuts: 0,
      deliveryRate: 0.0,
      clickRate: 0.0,
      optOutRate: 0.0,
      revenue: 0.00
    };

    setSmsCampaigns([...smsCampaigns, newCampaign]);
    alert('SMS campaign duplicated successfully!');
  };

  // Template CRUD Operations
  const handleAddTemplate = () => {
    if (!templateForm.name || !templateForm.message) {
      alert('Please fill in required fields (Name and Message)');
      return;
    }

    if (templateForm.message.length > 160) {
      alert('Template message exceeds 160 characters. Please shorten your message.');
      return;
    }

    const variables = templateForm.message.match(/\{\{([^}]+)\}\}/g) || [];
    const uniqueVariables = [...new Set(variables.map(v => v.replace(/[{}]/g, '')))];

    const newTemplate = {
      id: `TEMP-SMS-${String(smsTemplates.length + 1).padStart(3, '0')}`,
      ...templateForm,
      characterCount: templateForm.message.length,
      usage: 0,
      lastUsed: null,
      performance: 'New',
      avgClickRate: 0.0,
      avgOptOutRate: 0.0,
      variables: uniqueVariables,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setSmsTemplates([...smsTemplates, newTemplate]);
    setTemplateForm({
      name: '',
      type: 'Promotional',
      message: '',
      variables: []
    });
    setShowTemplateModal(false);
    alert('SMS template created successfully!');
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      type: template.type,
      message: template.message,
      variables: template.variables
    });
    setShowTemplateModal(true);
  };

  const handleUpdateTemplate = () => {
    if (!templateForm.name || !templateForm.message) {
      alert('Please fill in required fields (Name and Message)');
      return;
    }

    if (templateForm.message.length > 160) {
      alert('Template message exceeds 160 characters. Please shorten your message.');
      return;
    }

    const variables = templateForm.message.match(/\{\{([^}]+)\}\}/g) || [];
    const uniqueVariables = [...new Set(variables.map(v => v.replace(/[{}]/g, '')))];

    const updatedTemplates = smsTemplates.map(template =>
      template.id === editingTemplate.id
        ? { 
            ...template, 
            ...templateForm,
            characterCount: templateForm.message.length,
            variables: uniqueVariables
          }
        : template
    );

    setSmsTemplates(updatedTemplates);
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      type: 'Promotional',
      message: '',
      variables: []
    });
    setShowTemplateModal(false);
    alert('SMS template updated successfully!');
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this SMS template? This action cannot be undone.')) {
      setSmsTemplates(smsTemplates.filter(template => template.id !== templateId));
      alert('SMS template deleted successfully!');
    }
  };

  // Contact CRUD Operations
  const handleAddContact = () => {
    if (!contactForm.phone || !contactForm.firstName) {
      alert('Please fill in required fields (Phone and First Name)');
      return;
    }

    // Basic phone validation
    const phoneRegex = /^\+?1?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/;
    if (!phoneRegex.test(contactForm.phone)) {
      alert('Please enter a valid phone number');
      return;
    }

    const newContact = {
      id: `CONTACT-${String(smsContacts.length + 1).padStart(3, '0')}`,
      ...contactForm,
      status: 'Active',
      totalMessages: 0,
      lastMessage: null,
      clickRate: 0.0,
      optOutDate: null
    };

    setSmsContacts([...smsContacts, newContact]);
    setContactForm({
      phone: '',
      firstName: '',
      lastName: '',
      segment: 'General',
      optInDate: new Date().toISOString().split('T')[0],
      source: 'Manual'
    });
    setShowContactModal(false);
    alert('SMS contact added successfully!');
  };

  const handleOptOutContact = (contactId) => {
    if (window.confirm('Are you sure you want to opt out this contact? They will no longer receive SMS messages.')) {
      const updatedContacts = smsContacts.map(contact =>
        contact.id === contactId
          ? { 
              ...contact, 
              status: 'Opted Out',
              optOutDate: new Date().toISOString().split('T')[0]
            }
          : contact
      );
      setSmsContacts(updatedContacts);
      alert('Contact opted out successfully!');
    }
  };

  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      setSmsContacts(smsContacts.filter(contact => contact.id !== contactId));
      alert('Contact deleted successfully!');
    }
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Active': return 'bg-purple-100 text-purple-800';
      case 'Automated': return 'bg-indigo-100 text-indigo-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Promotional': return 'bg-orange-100 text-orange-800';
      case 'Product Launch': return 'bg-blue-100 text-blue-800';
      case 'Transactional': return 'bg-green-100 text-green-800';
      case 'Loyalty': return 'bg-purple-100 text-purple-800';
      case 'Automation': return 'bg-indigo-100 text-indigo-800';
      case 'Birthday': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      case 'New': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1-${match[1]}-${match[2]}-${match[3]}`;
    }
    return phone;
  };

  // Dashboard calculations
  const totalCampaigns = smsCampaigns.length;
  const sentCampaigns = smsCampaigns.filter(c => c.status === 'Sent').length;
  const totalRecipients = smsCampaigns.reduce((sum, c) => sum + c.recipients, 0);
  const totalRevenue = smsCampaigns.reduce((sum, c) => sum + c.revenue, 0);
  const avgDeliveryRate = smsCampaigns.filter(c => c.status === 'Sent').reduce((sum, c) => sum + c.deliveryRate, 0) / sentCampaigns || 0;
  const avgClickRate = smsCampaigns.filter(c => c.status === 'Sent').reduce((sum, c) => sum + c.clickRate, 0) / sentCampaigns || 0;
  const totalContacts = smsContacts.filter(c => c.status === 'Active').length;
  const totalOptOuts = smsContacts.filter(c => c.status === 'Opted Out').length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-gray-900">{totalCampaigns}</p>
              <p className="text-sm text-blue-600">{sentCampaigns} sent</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Contacts</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalContacts)}</p>
              <p className="text-sm text-green-600">{totalOptOuts} opted out</p>
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
              <p className="text-sm font-medium text-gray-600">Avg Delivery Rate</p>
              <p className="text-2xl font-bold text-gray-900">{formatPercentage(avgDeliveryRate)}</p>
              <p className="text-sm text-purple-600">Industry avg: 95%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-orange-600">From SMS campaigns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Delivery Rate</span>
              <span className="text-sm font-medium text-gray-900">{formatPercentage(avgDeliveryRate)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: `${avgDeliveryRate}%`}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Click Rate</span>
              <span className="text-sm font-medium text-gray-900">{formatPercentage(avgClickRate)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: `${avgClickRate * 4}%`}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Revenue per Campaign</span>
              <span className="text-sm font-medium text-gray-900">{formatCurrency(totalRevenue / totalCampaigns)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Campaigns</h3>
          <div className="space-y-4">
            {smsCampaigns.slice(0, 5).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{campaign.name}</h4>
                  <p className="text-xs text-gray-600 truncate">{campaign.message.substring(0, 50)}...</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <span className="text-xs text-gray-500">{formatNumber(campaign.recipients)} recipients</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatPercentage(campaign.clickRate)}</p>
                  <p className="text-xs text-gray-500">Click Rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowCampaignModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left"
            >
              Create SMS Campaign
            </button>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left"
            >
              Create Template
            </button>
            <button
              onClick={() => setShowContactModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left"
            >
              Add Contact
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SMS Marketing Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Keep messages under 160 characters</p>
            <p>• Include clear call-to-action</p>
            <p>• Personalize with customer names</p>
            <p>• Respect opt-out requests immediately</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Compliance Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-900">TCPA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-900">Opt-out Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-900">Cannabis Regulations</span>
            </div>
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
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
            <option value="active">Active</option>
            <option value="automated">Automated</option>
          </select>
          <select
            value={selectedCampaignType}
            onChange={(e) => setSelectedCampaignType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="promotional">Promotional</option>
            <option value="transactional">Transactional</option>
            <option value="product launch">Product Launch</option>
            <option value="loyalty">Loyalty</option>
            <option value="automation">Automation</option>
            <option value="birthday">Birthday</option>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCampaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{campaign.message}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(campaign.type)}`}>
                          {campaign.type}
                        </span>
                        <span className="text-xs text-gray-500">{campaign.characterCount} chars</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    {campaign.sentDate ? `Sent: ${campaign.sentDate}` : 
                     campaign.scheduledDate && campaign.scheduledDate !== 'Triggered' && campaign.scheduledDate !== 'Automated' ? `Scheduled: ${campaign.scheduledDate}` : 
                     campaign.scheduledDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-sm font-medium">{formatNumber(campaign.recipients)}</div>
                  {campaign.status === 'Sent' && (
                    <div className="text-xs text-gray-500">
                      Delivered: {formatNumber(campaign.delivered)}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {campaign.status === 'Sent' || campaign.status === 'Active' || campaign.status === 'Automated' ? (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Delivery:</span>
                        <span className="text-xs font-medium">{formatPercentage(campaign.deliveryRate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Click:</span>
                        <span className="text-xs font-medium">{formatPercentage(campaign.clickRate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Opt-out:</span>
                        <span className="text-xs font-medium">{formatPercentage(campaign.optOutRate)}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">Not sent yet</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(campaign.revenue)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert(`Viewing campaign: ${campaign.name}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => handleEditCampaign(campaign)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDuplicateCampaign(campaign)}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      Duplicate
                    </button>
                    {(campaign.status === 'Draft' || campaign.status === 'Scheduled') && (
                      <button 
                        onClick={() => handleSendCampaign(campaign.id)}
                        className="text-orange-600 hover:text-orange-900"
                      >
                        Send
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">SMS Templates</h3>
        <button 
          onClick={() => setShowTemplateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {smsTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}>
                  {template.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(template.performance)}`}>
                  {template.performance}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border">{template.message}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-600">Characters:</span>
                <span className="text-gray-900 ml-2 font-medium">{template.characterCount}/160</span>
              </div>
              <div>
                <span className="text-gray-600">Usage:</span>
                <span className="text-gray-900 ml-2 font-medium">{template.usage}</span>
              </div>
              <div>
                <span className="text-gray-600">Avg Click Rate:</span>
                <span className="text-gray-900 ml-2 font-medium">{formatPercentage(template.avgClickRate)}</span>
              </div>
              <div>
                <span className="text-gray-600">Avg Opt-out:</span>
                <span className="text-gray-900 ml-2 font-medium">{formatPercentage(template.avgOptOutRate)}</span>
              </div>
            </div>

            {template.variables.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Variables:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.map((variable, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {`{{${variable}}}`}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Created: {template.createdDate}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Previewing template: ${template.name}`)}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  Preview
                </button>
                <button 
                  onClick={() => handleEditTemplate(template)}
                  className="text-green-600 hover:text-green-900 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">SMS Contacts</h3>
        <button 
          onClick={() => setShowContactModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Add Contact
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {smsContacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {contact.firstName} {contact.lastName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Opted in: {contact.optInDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatPhoneNumber(contact.phone)}</div>
                  <div className="text-sm text-gray-500">Source: {contact.source}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {contact.segment}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    contact.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {contact.status}
                  </span>
                  {contact.optOutDate && (
                    <div className="text-xs text-gray-500 mt-1">
                      Opted out: {contact.optOutDate}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="text-sm font-medium">{contact.totalMessages} messages</div>
                  <div className="text-xs text-gray-500">
                    {contact.lastMessage ? `Last: ${contact.lastMessage}` : 'No messages'}
                  </div>
                  <div className="text-xs text-gray-500">
                    Click rate: {formatPercentage(contact.clickRate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => alert(`Viewing contact: ${contact.firstName} ${contact.lastName}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => alert(`Editing contact: ${contact.firstName} ${contact.lastName}`)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    {contact.status === 'Active' && (
                      <button 
                        onClick={() => handleOptOutContact(contact.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Opt Out
                      </button>
                    )}
                    <button 
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSegments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">SMS Segments</h3>
        <button 
          onClick={() => alert('Create segment functionality coming soon')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Create Segment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {smsSegments.map((segment, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">{segment.name}</h4>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{formatNumber(segment.count)}</p>
                <p className="text-sm text-gray-500">contacts</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{segment.description}</p>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Active segment
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Viewing segment: ${segment.name}`)}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </button>
                <button 
                  onClick={() => alert(`Editing segment: ${segment.name}`)}
                  className="text-green-600 hover:text-green-900 text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Campaign Modal
  const CampaignModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-3xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingCampaign ? 'Edit SMS Campaign' : 'Create New SMS Campaign'}
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
                <option value="Promotional">Promotional</option>
                <option value="Product Launch">Product Launch</option>
                <option value="Transactional">Transactional</option>
                <option value="Loyalty">Loyalty</option>
                <option value="Automation">Automation</option>
                <option value="Birthday">Birthday</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Template</label>
              <select
                value={campaignForm.template}
                onChange={(e) => {
                  setCampaignForm({...campaignForm, template: e.target.value});
                  const selectedTemplate = smsTemplates.find(t => t.id === e.target.value);
                  if (selectedTemplate) {
                    setCampaignForm(prev => ({...prev, message: selectedTemplate.message}));
                  }
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Template (Optional)</option>
                {smsTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Audience Segment</label>
              <select
                value={campaignForm.segment}
                onChange={(e) => setCampaignForm({...campaignForm, segment: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {smsSegments.map(segment => (
                  <option key={segment.name} value={segment.name}>
                    {segment.name} ({formatNumber(segment.count)} contacts)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
              <input
                type="date"
                value={campaignForm.scheduledDate}
                onChange={(e) => setCampaignForm({...campaignForm, scheduledDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Scheduled Time</label>
              <input
                type="time"
                value={campaignForm.scheduledTime}
                onChange={(e) => setCampaignForm({...campaignForm, scheduledTime: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">SMS Message *</label>
            <textarea
              value={campaignForm.message}
              onChange={(e) => setCampaignForm({...campaignForm, message: e.target.value})}
              rows={4}
              maxLength={160}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your SMS message here (max 160 characters)..."
              required
            />
            <div className="flex justify-between mt-1">
              <p className="text-sm text-gray-500">
                Use variables like {{first_name}}, {{order_id}}, {{discount}}, etc.
              </p>
              <p className={`text-sm ${campaignForm.message.length > 160 ? 'text-red-600' : 'text-gray-500'}`}>
                {campaignForm.message.length}/160 characters
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowCampaignModal(false);
                setEditingCampaign(null);
                setCampaignForm({
                  name: '',
                  message: '',
                  type: 'Promotional',
                  segment: 'All Customers',
                  scheduledDate: '',
                  scheduledTime: '',
                  template: '',
                  fromNumber: '+1-555-DANK-DASH'
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

  // Template Modal
  const TemplateModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingTemplate ? 'Edit SMS Template' : 'Create New SMS Template'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Template Name *</label>
              <input
                type="text"
                value={templateForm.name}
                onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Template Type</label>
              <select
                value={templateForm.type}
                onChange={(e) => setTemplateForm({...templateForm, type: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Promotional">Promotional</option>
                <option value="Product Launch">Product Launch</option>
                <option value="Transactional">Transactional</option>
                <option value="Loyalty">Loyalty</option>
                <option value="Automation">Automation</option>
                <option value="Birthday">Birthday</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SMS Message *</label>
              <textarea
                value={templateForm.message}
                onChange={(e) => setTemplateForm({...templateForm, message: e.target.value})}
                rows={4}
                maxLength={160}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter template message with {{variables}}..."
                required
              />
              <div className="flex justify-between mt-1">
                <p className="text-sm text-gray-500">
                  Use {{variable}} for dynamic content
                </p>
                <p className={`text-sm ${templateForm.message.length > 160 ? 'text-red-600' : 'text-gray-500'}`}>
                  {templateForm.message.length}/160 characters
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowTemplateModal(false);
                setEditingTemplate(null);
                setTemplateForm({
                  name: '',
                  type: 'Promotional',
                  message: '',
                  variables: []
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingTemplate ? handleUpdateTemplate : handleAddTemplate}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {editingTemplate ? 'Update' : 'Create'} Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Modal
  const ContactModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New SMS Contact</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                type="tel"
                value={contactForm.phone}
                onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="+1-555-123-4567"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                value={contactForm.firstName}
                onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                value={contactForm.lastName}
                onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Segment</label>
              <select
                value={contactForm.segment}
                onChange={(e) => setContactForm({...contactForm, segment: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="General">General</option>
                <option value="VIP Customers">VIP Customers</option>
                <option value="Active Customers">Active Customers</option>
                <option value="New Customers">New Customers</option>
                <option value="Edibles Enthusiasts">Edibles Enthusiasts</option>
                <option value="Flower Enthusiasts">Flower Enthusiasts</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Source</label>
              <select
                value={contactForm.source}
                onChange={(e) => setContactForm({...contactForm, source: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="Manual">Manual</option>
                <option value="Website">Website</option>
                <option value="In-Store">In-Store</option>
                <option value="Social Media">Social Media</option>
                <option value="Referral">Referral</option>
                <option value="Import">Import</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowContactModal(false);
                setContactForm({
                  phone: '',
                  firstName: '',
                  lastName: '',
                  segment: 'General',
                  optInDate: new Date().toISOString().split('T')[0],
                  source: 'Manual'
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddContact}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SMS Marketing</h1>
        <p className="mt-2 text-gray-600">Create, manage, and track SMS campaigns and automation</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'campaigns', name: 'Campaigns', icon: '💬' },
            { id: 'templates', name: 'Templates', icon: '📝' },
            { id: 'contacts', name: 'Contacts', icon: '👥' },
            { id: 'segments', name: 'Segments', icon: '🎯' },
            { id: 'automation', name: 'Automation', icon: '⚡' }
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
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'contacts' && renderContacts()}
      {activeTab === 'segments' && renderSegments()}
      {activeTab === 'automation' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">SMS Automation</h3>
          <p className="text-gray-600">Advanced SMS automation workflows coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showCampaignModal && <CampaignModal />}
      {showTemplateModal && <TemplateModal />}
      {showContactModal && <ContactModal />}
    </div>
  );
};

export default EnhancedSMSMarketingModule;

