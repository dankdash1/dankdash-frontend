import React, { useState, useEffect, useMemo } from 'react';

const EnhancedEmailMarketingModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState('all');
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Form states
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    subject: '',
    type: 'Promotional',
    template: '',
    segment: 'All Customers',
    scheduledDate: '',
    scheduledTime: '',
    content: '',
    preheader: '',
    fromName: 'DankDash',
    fromEmail: 'noreply@dankdash.com',
    replyTo: 'support@dankdash.com'
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    type: 'Promotional',
    subject: '',
    content: '',
    preheader: '',
    backgroundColor: '#ffffff',
    primaryColor: '#059669',
    textColor: '#111827',
    buttonColor: '#059669',
    buttonTextColor: '#ffffff'
  });

  const [listForm, setListForm] = useState({
    name: '',
    description: '',
    tags: [],
    criteria: {
      location: '',
      purchaseHistory: '',
      engagement: '',
      demographics: ''
    }
  });

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
      segment: 'All Customers',
      content: 'Summer is here and we\'re celebrating with amazing deals on our premium cannabis products!',
      preheader: 'Don\'t miss out on our biggest sale of the summer',
      fromName: 'DankDash',
      fromEmail: 'noreply@dankdash.com',
      replyTo: 'support@dankdash.com'
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
      segment: 'Flower Enthusiasts',
      content: 'We\'re excited to introduce our latest premium strain - Blue Dream, a perfect hybrid for any time of day.',
      preheader: 'Premium hybrid strain now available',
      fromName: 'DankDash',
      fromEmail: 'noreply@dankdash.com',
      replyTo: 'support@dankdash.com'
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
      segment: 'Newsletter Subscribers',
      content: 'This week we\'re diving deep into terpenes and how they affect your cannabis experience.',
      preheader: 'Learn about terpenes and their effects',
      fromName: 'DankDash Education',
      fromEmail: 'education@dankdash.com',
      replyTo: 'education@dankdash.com'
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
      segment: 'High-Value Customers',
      content: 'Join our exclusive VIP loyalty program and unlock amazing benefits and rewards.',
      preheader: 'Exclusive VIP benefits await you',
      fromName: 'DankDash VIP',
      fromEmail: 'vip@dankdash.com',
      replyTo: 'vip@dankdash.com'
    },
    {
      id: 'CAM-005',
      name: 'Cart Abandonment Recovery',
      subject: '🛒 You Left Something Behind - Complete Your Order',
      status: 'Active',
      type: 'Automation',
      sentDate: '2024-08-12',
      scheduledDate: 'Automated',
      recipients: 450,
      delivered: 442,
      opened: 198,
      clicked: 89,
      bounced: 8,
      unsubscribed: 2,
      openRate: 44.8,
      clickRate: 20.1,
      bounceRate: 1.8,
      revenue: 3200.00,
      template: 'cart-abandonment-template',
      segment: 'Cart Abandoners',
      content: 'Don\'t forget about the items in your cart! Complete your order now and get free delivery.',
      preheader: 'Complete your order and get free delivery',
      fromName: 'DankDash',
      fromEmail: 'noreply@dankdash.com',
      replyTo: 'support@dankdash.com'
    },
    {
      id: 'CAM-006',
      name: 'Welcome Series - New Customers',
      subject: '👋 Welcome to DankDash - Your Cannabis Journey Starts Here',
      status: 'Active',
      type: 'Welcome',
      sentDate: '2024-08-01',
      scheduledDate: 'Automated',
      recipients: 320,
      delivered: 315,
      opened: 252,
      clicked: 126,
      bounced: 5,
      unsubscribed: 1,
      openRate: 80.0,
      clickRate: 40.0,
      bounceRate: 1.6,
      revenue: 1800.00,
      template: 'welcome-template',
      segment: 'New Customers',
      content: 'Welcome to DankDash! We\'re excited to help you discover the perfect cannabis products for your needs.',
      preheader: 'Your cannabis journey starts here',
      fromName: 'DankDash Team',
      fromEmail: 'welcome@dankdash.com',
      replyTo: 'support@dankdash.com'
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 'TEMP-001',
      name: 'Promotional Template',
      type: 'Promotional',
      subject: 'Special Offer: {{discount}}% Off {{product_category}}',
      content: '<div style="background-color: #ffffff; padding: 20px;"><h1 style="color: #059669;">{{campaign_name}}</h1><p>{{campaign_content}}</p><a href="{{shop_url}}" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Shop Now</a></div>',
      preheader: 'Don\'t miss out on this amazing deal',
      backgroundColor: '#ffffff',
      primaryColor: '#059669',
      textColor: '#111827',
      buttonColor: '#059669',
      buttonTextColor: '#ffffff',
      createdDate: '2024-07-15',
      lastUsed: '2024-08-10',
      usageCount: 15
    },
    {
      id: 'TEMP-002',
      name: 'Product Launch Template',
      type: 'Product Launch',
      subject: 'New Arrival: {{product_name}} - {{product_type}}',
      content: '<div style="background-color: #f9fafb; padding: 20px;"><h1 style="color: #1f2937;">{{campaign_name}}</h1><img src="{{product_image}}" alt="{{product_name}}" style="width: 100%; max-width: 400px; border-radius: 8px;"><p>{{campaign_content}}</p><a href="{{product_url}}" style="background-color: #1f2937; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Product</a></div>',
      preheader: 'Discover our latest premium product',
      backgroundColor: '#f9fafb',
      primaryColor: '#1f2937',
      textColor: '#374151',
      buttonColor: '#1f2937',
      buttonTextColor: '#ffffff',
      createdDate: '2024-07-20',
      lastUsed: '2024-08-15',
      usageCount: 8
    },
    {
      id: 'TEMP-003',
      name: 'Newsletter Template',
      type: 'Newsletter',
      subject: '{{newsletter_title}} - {{date}}',
      content: '<div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif;"><header style="border-bottom: 2px solid #059669; padding-bottom: 20px; margin-bottom: 20px;"><h1 style="color: #059669;">DankDash Newsletter</h1><p style="color: #6b7280;">{{date}}</p></header><main>{{campaign_content}}</main><footer style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px; color: #6b7280; font-size: 14px;"><p>Thank you for subscribing to DankDash Newsletter</p></footer></div>',
      preheader: 'Your weekly cannabis education and updates',
      backgroundColor: '#ffffff',
      primaryColor: '#059669',
      textColor: '#374151',
      buttonColor: '#059669',
      buttonTextColor: '#ffffff',
      createdDate: '2024-07-10',
      lastUsed: '2024-08-12',
      usageCount: 12
    },
    {
      id: 'TEMP-004',
      name: 'Cart Abandonment Template',
      type: 'Automation',
      subject: 'Complete Your Order - {{cart_total}} Worth of Items Waiting',
      content: '<div style="background-color: #fef3c7; padding: 20px; border-radius: 8px;"><h1 style="color: #92400e;">Don\'t Miss Out!</h1><p>You have {{cart_items}} items worth {{cart_total}} waiting in your cart.</p><div style="background-color: white; padding: 15px; border-radius: 6px; margin: 20px 0;">{{cart_contents}}</div><a href="{{checkout_url}}" style="background-color: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Complete Order</a><p style="margin-top: 20px; font-size: 14px; color: #92400e;">Free delivery on orders over $50!</p></div>',
      preheader: 'Complete your order and get free delivery',
      backgroundColor: '#fef3c7',
      primaryColor: '#92400e',
      textColor: '#92400e',
      buttonColor: '#059669',
      buttonTextColor: '#ffffff',
      createdDate: '2024-07-25',
      lastUsed: '2024-08-13',
      usageCount: 25
    },
    {
      id: 'TEMP-005',
      name: 'Welcome Template',
      type: 'Welcome',
      subject: 'Welcome to DankDash, {{customer_name}}!',
      content: '<div style="background-color: #ecfdf5; padding: 20px; text-align: center;"><h1 style="color: #059669;">Welcome to DankDash!</h1><p style="font-size: 18px; color: #374151;">Hi {{customer_name}}, we\'re excited to have you join our community!</p><div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0;"><h2 style="color: #1f2937;">Get Started</h2><p>{{campaign_content}}</p></div><a href="{{shop_url}}" style="background-color: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-size: 16px;">Start Shopping</a><p style="margin-top: 20px; color: #6b7280;">Use code WELCOME10 for 10% off your first order</p></div>',
      preheader: 'Welcome to the DankDash family',
      backgroundColor: '#ecfdf5',
      primaryColor: '#059669',
      textColor: '#374151',
      buttonColor: '#059669',
      buttonTextColor: '#ffffff',
      createdDate: '2024-07-05',
      lastUsed: '2024-08-14',
      usageCount: 45
    },
    {
      id: 'TEMP-006',
      name: 'Loyalty Template',
      type: 'Loyalty',
      subject: 'VIP Exclusive: {{offer_title}}',
      content: '<div style="background-color: #1f2937; color: white; padding: 20px; border-radius: 8px;"><h1 style="color: #fbbf24;">VIP EXCLUSIVE</h1><p style="font-size: 18px;">{{customer_name}}, this offer is just for our VIP members!</p><div style="background-color: #374151; padding: 20px; border-radius: 6px; margin: 20px 0;"><h2 style="color: #fbbf24;">{{campaign_name}}</h2><p>{{campaign_content}}</p></div><a href="{{offer_url}}" style="background-color: #fbbf24; color: #1f2937; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">Claim Offer</a><p style="margin-top: 20px; font-size: 14px; color: #9ca3af;">VIP Points Balance: {{loyalty_points}}</p></div>',
      preheader: 'Exclusive VIP offer just for you',
      backgroundColor: '#1f2937',
      primaryColor: '#fbbf24',
      textColor: '#ffffff',
      buttonColor: '#fbbf24',
      buttonTextColor: '#1f2937',
      createdDate: '2024-07-30',
      lastUsed: '2024-08-05',
      usageCount: 6
    }
  ]);

  const [emailLists, setEmailLists] = useState([
    {
      id: 'LIST-001',
      name: 'All Customers',
      description: 'All registered customers',
      subscribers: 5420,
      activeSubscribers: 5180,
      tags: ['customers', 'active'],
      createdDate: '2024-01-15',
      lastUpdated: '2024-08-13',
      criteria: {
        location: 'All',
        purchaseHistory: 'Any',
        engagement: 'All',
        demographics: 'All'
      }
    },
    {
      id: 'LIST-002',
      name: 'Newsletter Subscribers',
      description: 'Customers who opted in for newsletter',
      subscribers: 3200,
      activeSubscribers: 3050,
      tags: ['newsletter', 'education'],
      createdDate: '2024-02-01',
      lastUpdated: '2024-08-12',
      criteria: {
        location: 'All',
        purchaseHistory: 'Any',
        engagement: 'Newsletter Opt-in',
        demographics: 'All'
      }
    },
    {
      id: 'LIST-003',
      name: 'High-Value Customers',
      description: 'Customers with $500+ lifetime value',
      subscribers: 1200,
      activeSubscribers: 1150,
      tags: ['vip', 'high-value'],
      createdDate: '2024-03-10',
      lastUpdated: '2024-08-10',
      criteria: {
        location: 'All',
        purchaseHistory: '$500+ Lifetime Value',
        engagement: 'High',
        demographics: 'All'
      }
    },
    {
      id: 'LIST-004',
      name: 'Flower Enthusiasts',
      description: 'Customers who primarily buy flower products',
      subscribers: 1850,
      activeSubscribers: 1720,
      tags: ['flower', 'product-preference'],
      createdDate: '2024-04-05',
      lastUpdated: '2024-08-11',
      criteria: {
        location: 'All',
        purchaseHistory: 'Flower Products',
        engagement: 'Medium+',
        demographics: 'All'
      }
    },
    {
      id: 'LIST-005',
      name: 'Cart Abandoners',
      description: 'Customers who abandoned their cart in last 30 days',
      subscribers: 450,
      activeSubscribers: 420,
      tags: ['cart-abandonment', 'automation'],
      createdDate: '2024-07-01',
      lastUpdated: '2024-08-13',
      criteria: {
        location: 'All',
        purchaseHistory: 'Cart Abandonment',
        engagement: 'Low',
        demographics: 'All'
      }
    },
    {
      id: 'LIST-006',
      name: 'New Customers',
      description: 'Customers who joined in the last 30 days',
      subscribers: 320,
      activeSubscribers: 315,
      tags: ['new-customers', 'welcome'],
      createdDate: '2024-07-15',
      lastUpdated: '2024-08-13',
      criteria: {
        location: 'All',
        purchaseHistory: 'First 30 Days',
        engagement: 'New',
        demographics: 'All'
      }
    }
  ]);

  // Filter functions
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || campaign.status.toLowerCase() === selectedStatus;
      const matchesTemplate = selectedTemplate === 'all' || campaign.template === selectedTemplate;
      
      return matchesSearch && matchesStatus && matchesTemplate;
    });
  }, [campaigns, searchTerm, selectedStatus, selectedTemplate]);

  // Campaign CRUD Operations
  const handleAddCampaign = () => {
    if (!campaignForm.name || !campaignForm.subject || !campaignForm.template) {
      alert('Please fill in required fields (Name, Subject, and Template)');
      return;
    }

    const selectedTemplateData = templates.find(t => t.id === campaignForm.template);
    const selectedList = emailLists.find(l => l.name === campaignForm.segment);

    const newCampaign = {
      id: `CAM-${String(campaigns.length + 1).padStart(3, '0')}`,
      ...campaignForm,
      status: campaignForm.scheduledDate ? 'Scheduled' : 'Draft',
      sentDate: null,
      scheduledDate: campaignForm.scheduledDate ? `${campaignForm.scheduledDate} ${campaignForm.scheduledTime}` : null,
      recipients: selectedList ? selectedList.activeSubscribers : 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      openRate: 0.0,
      clickRate: 0.0,
      bounceRate: 0.0,
      revenue: 0.00,
      template: selectedTemplateData ? selectedTemplateData.name.toLowerCase().replace(/\s+/g, '-') + '-template' : 'default-template'
    };

    setCampaigns([...campaigns, newCampaign]);
    setCampaignForm({
      name: '',
      subject: '',
      type: 'Promotional',
      template: '',
      segment: 'All Customers',
      scheduledDate: '',
      scheduledTime: '',
      content: '',
      preheader: '',
      fromName: 'DankDash',
      fromEmail: 'noreply@dankdash.com',
      replyTo: 'support@dankdash.com'
    });
    setShowCampaignModal(false);
    alert('Campaign created successfully!');
  };

  const handleEditCampaign = (campaign) => {
    setEditingCampaign(campaign);
    const [date, time] = campaign.scheduledDate ? campaign.scheduledDate.split(' ') : ['', ''];
    setCampaignForm({
      name: campaign.name,
      subject: campaign.subject,
      type: campaign.type,
      template: campaign.template,
      segment: campaign.segment,
      scheduledDate: date,
      scheduledTime: time,
      content: campaign.content,
      preheader: campaign.preheader,
      fromName: campaign.fromName,
      fromEmail: campaign.fromEmail,
      replyTo: campaign.replyTo
    });
    setShowCampaignModal(true);
  };

  const handleUpdateCampaign = () => {
    if (!campaignForm.name || !campaignForm.subject || !campaignForm.template) {
      alert('Please fill in required fields (Name, Subject, and Template)');
      return;
    }

    const updatedCampaigns = campaigns.map(campaign =>
      campaign.id === editingCampaign.id
        ? { 
            ...campaign, 
            ...campaignForm,
            scheduledDate: campaignForm.scheduledDate ? `${campaignForm.scheduledDate} ${campaignForm.scheduledTime}` : null
          }
        : campaign
    );

    setCampaigns(updatedCampaigns);
    setEditingCampaign(null);
    setCampaignForm({
      name: '',
      subject: '',
      type: 'Promotional',
      template: '',
      segment: 'All Customers',
      scheduledDate: '',
      scheduledTime: '',
      content: '',
      preheader: '',
      fromName: 'DankDash',
      fromEmail: 'noreply@dankdash.com',
      replyTo: 'support@dankdash.com'
    });
    setShowCampaignModal(false);
    alert('Campaign updated successfully!');
  };

  const handleDeleteCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
      alert('Campaign deleted successfully!');
    }
  };

  const handleSendCampaign = (campaignId) => {
    if (window.confirm('Are you sure you want to send this campaign now?')) {
      const updatedCampaigns = campaigns.map(campaign =>
        campaign.id === campaignId
          ? { 
              ...campaign, 
              status: 'Sent',
              sentDate: new Date().toISOString().split('T')[0],
              delivered: Math.floor(campaign.recipients * 0.98),
              opened: Math.floor(campaign.recipients * 0.45),
              clicked: Math.floor(campaign.recipients * 0.12),
              bounced: Math.floor(campaign.recipients * 0.02),
              unsubscribed: Math.floor(campaign.recipients * 0.005),
              openRate: 45.0,
              clickRate: 12.0,
              bounceRate: 2.0,
              revenue: Math.floor(Math.random() * 10000) + 1000
            }
          : campaign
      );
      setCampaigns(updatedCampaigns);
      alert('Campaign sent successfully!');
    }
  };

  const handleDuplicateCampaign = (campaign) => {
    const newCampaign = {
      ...campaign,
      id: `CAM-${String(campaigns.length + 1).padStart(3, '0')}`,
      name: `${campaign.name} (Copy)`,
      status: 'Draft',
      sentDate: null,
      scheduledDate: null,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      openRate: 0.0,
      clickRate: 0.0,
      bounceRate: 0.0,
      revenue: 0.00
    };

    setCampaigns([...campaigns, newCampaign]);
    alert('Campaign duplicated successfully!');
  };

  // Template CRUD Operations
  const handleAddTemplate = () => {
    if (!templateForm.name || !templateForm.content) {
      alert('Please fill in required fields (Name and Content)');
      return;
    }

    const newTemplate = {
      id: `TEMP-${String(templates.length + 1).padStart(3, '0')}`,
      ...templateForm,
      createdDate: new Date().toISOString().split('T')[0],
      lastUsed: null,
      usageCount: 0
    };

    setTemplates([...templates, newTemplate]);
    setTemplateForm({
      name: '',
      type: 'Promotional',
      subject: '',
      content: '',
      preheader: '',
      backgroundColor: '#ffffff',
      primaryColor: '#059669',
      textColor: '#111827',
      buttonColor: '#059669',
      buttonTextColor: '#ffffff'
    });
    setShowTemplateModal(false);
    alert('Template created successfully!');
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      type: template.type,
      subject: template.subject,
      content: template.content,
      preheader: template.preheader,
      backgroundColor: template.backgroundColor,
      primaryColor: template.primaryColor,
      textColor: template.textColor,
      buttonColor: template.buttonColor,
      buttonTextColor: template.buttonTextColor
    });
    setShowTemplateModal(true);
  };

  const handleUpdateTemplate = () => {
    if (!templateForm.name || !templateForm.content) {
      alert('Please fill in required fields (Name and Content)');
      return;
    }

    const updatedTemplates = templates.map(template =>
      template.id === editingTemplate.id
        ? { ...template, ...templateForm }
        : template
    );

    setTemplates(updatedTemplates);
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      type: 'Promotional',
      subject: '',
      content: '',
      preheader: '',
      backgroundColor: '#ffffff',
      primaryColor: '#059669',
      textColor: '#111827',
      buttonColor: '#059669',
      buttonTextColor: '#ffffff'
    });
    setShowTemplateModal(false);
    alert('Template updated successfully!');
  };

  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      setTemplates(templates.filter(template => template.id !== templateId));
      alert('Template deleted successfully!');
    }
  };

  // Email List CRUD Operations
  const handleAddEmailList = () => {
    if (!listForm.name || !listForm.description) {
      alert('Please fill in required fields (Name and Description)');
      return;
    }

    const newList = {
      id: `LIST-${String(emailLists.length + 1).padStart(3, '0')}`,
      ...listForm,
      subscribers: Math.floor(Math.random() * 1000) + 100,
      activeSubscribers: Math.floor(Math.random() * 950) + 95,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setEmailLists([...emailLists, newList]);
    setListForm({
      name: '',
      description: '',
      tags: [],
      criteria: {
        location: '',
        purchaseHistory: '',
        engagement: '',
        demographics: ''
      }
    });
    setShowListModal(false);
    alert('Email list created successfully!');
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Active': return 'bg-purple-100 text-purple-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Promotional': return 'bg-orange-100 text-orange-800';
      case 'Product Launch': return 'bg-blue-100 text-blue-800';
      case 'Newsletter': return 'bg-green-100 text-green-800';
      case 'Loyalty': return 'bg-purple-100 text-purple-800';
      case 'Automation': return 'bg-indigo-100 text-indigo-800';
      case 'Welcome': return 'bg-pink-100 text-pink-800';
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

  // Dashboard calculations
  const totalCampaigns = campaigns.length;
  const sentCampaigns = campaigns.filter(c => c.status === 'Sent').length;
  const totalRecipients = campaigns.reduce((sum, c) => sum + c.recipients, 0);
  const totalRevenue = campaigns.reduce((sum, c) => sum + c.revenue, 0);
  const avgOpenRate = campaigns.filter(c => c.status === 'Sent').reduce((sum, c) => sum + c.openRate, 0) / sentCampaigns || 0;
  const avgClickRate = campaigns.filter(c => c.status === 'Sent').reduce((sum, c) => sum + c.clickRate, 0) / sentCampaigns || 0;
  const totalSubscribers = emailLists.reduce((sum, list) => sum + list.activeSubscribers, 0);

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
              <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(totalSubscribers)}</p>
              <p className="text-sm text-green-600">Active subscribers</p>
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
              <p className="text-2xl font-bold text-gray-900">{formatPercentage(avgOpenRate)}</p>
              <p className="text-sm text-purple-600">Industry avg: 21.3%</p>
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
              <p className="text-sm text-orange-600">From email campaigns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Open Rate</span>
              <span className="text-sm font-medium text-gray-900">{formatPercentage(avgOpenRate)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: `${avgOpenRate}%`}}></div>
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
            {campaigns.slice(0, 5).map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{campaign.name}</h4>
                  <p className="text-xs text-gray-600">{campaign.subject}</p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                    <span className="text-xs text-gray-500">{formatNumber(campaign.recipients)} recipients</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatPercentage(campaign.openRate)}</p>
                  <p className="text-xs text-gray-500">Open Rate</p>
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
              Create Campaign
            </button>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left"
            >
              Create Template
            </button>
            <button
              onClick={() => setShowListModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left"
            >
              Create Email List
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Email Marketing Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Personalize subject lines for better open rates</p>
            <p>• A/B test different send times</p>
            <p>• Segment your audience for targeted messaging</p>
            <p>• Keep mobile users in mind for design</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Campaigns</h3>
          <div className="space-y-3 text-sm">
            {campaigns.filter(c => c.status === 'Scheduled').slice(0, 3).map((campaign) => (
              <div key={campaign.id} className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <div className="flex-1">
                  <span className="text-gray-900">{campaign.name}</span>
                  <p className="text-gray-500 text-xs">{campaign.scheduledDate}</p>
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
          </select>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Templates</option>
            {templates.map(template => (
              <option key={template.id} value={template.name.toLowerCase().replace(/\s+/g, '-') + '-template'}>
                {template.name}
              </option>
            ))}
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
                      <div className="text-sm text-gray-500">{campaign.subject}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(campaign.type)}`}>
                          {campaign.type}
                        </span>
                        <span className="text-xs text-gray-500">{campaign.segment}</span>
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
                     campaign.scheduledDate ? `Scheduled: ${campaign.scheduledDate}` : 'Not scheduled'}
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
                  {campaign.status === 'Sent' ? (
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Open:</span>
                        <span className="text-xs font-medium">{formatPercentage(campaign.openRate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Click:</span>
                        <span className="text-xs font-medium">{formatPercentage(campaign.clickRate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Bounce:</span>
                        <span className="text-xs font-medium">{formatPercentage(campaign.bounceRate)}</span>
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
        <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
        <button 
          onClick={() => setShowTemplateModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}>
                {template.type}
              </span>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div>
                <span className="text-gray-600">Subject:</span>
                <p className="text-gray-900 font-medium">{template.subject}</p>
              </div>
              <div>
                <span className="text-gray-600">Preheader:</span>
                <p className="text-gray-900">{template.preheader}</p>
              </div>
              <div>
                <span className="text-gray-600">Usage Count:</span>
                <span className="text-gray-900 ml-2">{template.usageCount}</span>
              </div>
              <div>
                <span className="text-gray-600">Last Used:</span>
                <span className="text-gray-900 ml-2">{template.lastUsed || 'Never'}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Color Scheme:</p>
              <div className="flex space-x-2">
                <div 
                  className="w-6 h-6 rounded border"
                  style={{backgroundColor: template.backgroundColor}}
                  title="Background"
                ></div>
                <div 
                  className="w-6 h-6 rounded border"
                  style={{backgroundColor: template.primaryColor}}
                  title="Primary"
                ></div>
                <div 
                  className="w-6 h-6 rounded border"
                  style={{backgroundColor: template.buttonColor}}
                  title="Button"
                ></div>
              </div>
            </div>

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

  const renderLists = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Email Lists</h3>
        <button 
          onClick={() => setShowListModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Create List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {emailLists.map((list) => (
          <div key={list.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">{list.name}</h4>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{formatNumber(list.activeSubscribers)}</p>
                <p className="text-sm text-gray-500">Active subscribers</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{list.description}</p>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Subscribers:</span>
                <span className="text-gray-900">{formatNumber(list.subscribers)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Rate:</span>
                <span className="text-gray-900">{formatPercentage((list.activeSubscribers / list.subscribers) * 100)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900">{list.createdDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-900">{list.lastUpdated}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Tags:</p>
              <div className="flex flex-wrap gap-1">
                {list.tags.map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {list.criteria.purchaseHistory}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Viewing list: ${list.name}`)}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </button>
                <button 
                  onClick={() => alert(`Editing list: ${list.name}`)}
                  className="text-green-600 hover:text-green-900 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => alert(`Exporting list: ${list.name}`)}
                  className="text-purple-600 hover:text-purple-900 text-sm"
                >
                  Export
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
      <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
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
                <option value="Promotional">Promotional</option>
                <option value="Product Launch">Product Launch</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Loyalty">Loyalty</option>
                <option value="Automation">Automation</option>
                <option value="Welcome">Welcome</option>
              </select>
            </div>
            <div className="md:col-span-2">
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
              <label className="block text-sm font-medium text-gray-700">Template *</label>
              <select
                value={campaignForm.template}
                onChange={(e) => setCampaignForm({...campaignForm, template: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Template</option>
                {templates.map(template => (
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
                {emailLists.map(list => (
                  <option key={list.id} value={list.name}>
                    {list.name} ({formatNumber(list.activeSubscribers)} subscribers)
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
            <div>
              <label className="block text-sm font-medium text-gray-700">From Name</label>
              <input
                type="text"
                value={campaignForm.fromName}
                onChange={(e) => setCampaignForm({...campaignForm, fromName: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">From Email</label>
              <input
                type="email"
                value={campaignForm.fromEmail}
                onChange={(e) => setCampaignForm({...campaignForm, fromEmail: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Preheader Text</label>
              <input
                type="text"
                value={campaignForm.preheader}
                onChange={(e) => setCampaignForm({...campaignForm, preheader: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Preview text that appears after subject line"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Email Content</label>
            <textarea
              value={campaignForm.content}
              onChange={(e) => setCampaignForm({...campaignForm, content: e.target.value})}
              rows={6}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email content here..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowCampaignModal(false);
                setEditingCampaign(null);
                setCampaignForm({
                  name: '',
                  subject: '',
                  type: 'Promotional',
                  template: '',
                  segment: 'All Customers',
                  scheduledDate: '',
                  scheduledTime: '',
                  content: '',
                  preheader: '',
                  fromName: 'DankDash',
                  fromEmail: 'noreply@dankdash.com',
                  replyTo: 'support@dankdash.com'
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
      <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingTemplate ? 'Edit Template' : 'Create New Template'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                <option value="Newsletter">Newsletter</option>
                <option value="Loyalty">Loyalty</option>
                <option value="Automation">Automation</option>
                <option value="Welcome">Welcome</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Default Subject Line</label>
              <input
                type="text"
                value={templateForm.subject}
                onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Use {{variables}} for dynamic content"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Preheader Text</label>
              <input
                type="text"
                value={templateForm.preheader}
                onChange={(e) => setTemplateForm({...templateForm, preheader: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Preview text that appears after subject line"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Background</label>
              <input
                type="color"
                value={templateForm.backgroundColor}
                onChange={(e) => setTemplateForm({...templateForm, backgroundColor: e.target.value})}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Primary</label>
              <input
                type="color"
                value={templateForm.primaryColor}
                onChange={(e) => setTemplateForm({...templateForm, primaryColor: e.target.value})}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text</label>
              <input
                type="color"
                value={templateForm.textColor}
                onChange={(e) => setTemplateForm({...templateForm, textColor: e.target.value})}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Button</label>
              <input
                type="color"
                value={templateForm.buttonColor}
                onChange={(e) => setTemplateForm({...templateForm, buttonColor: e.target.value})}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Button Text</label>
              <input
                type="color"
                value={templateForm.buttonTextColor}
                onChange={(e) => setTemplateForm({...templateForm, buttonTextColor: e.target.value})}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">HTML Content *</label>
            <textarea
              value={templateForm.content}
              onChange={(e) => setTemplateForm({...templateForm, content: e.target.value})}
              rows={8}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 font-mono text-sm"
              placeholder="Enter HTML template content with {{variables}} for dynamic content..."
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Use variables like {{campaign_name}}, {{campaign_content}}, {{customer_name}}, {{shop_url}}, etc.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowTemplateModal(false);
                setEditingTemplate(null);
                setTemplateForm({
                  name: '',
                  type: 'Promotional',
                  subject: '',
                  content: '',
                  preheader: '',
                  backgroundColor: '#ffffff',
                  primaryColor: '#059669',
                  textColor: '#111827',
                  buttonColor: '#059669',
                  buttonTextColor: '#ffffff'
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

  // Email List Modal
  const ListModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Email List</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">List Name *</label>
              <input
                type="text"
                value={listForm.name}
                onChange={(e) => setListForm({...listForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                value={listForm.description}
                onChange={(e) => setListForm({...listForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Purchase History</label>
              <select
                value={listForm.criteria.purchaseHistory}
                onChange={(e) => setListForm({
                  ...listForm, 
                  criteria: {...listForm.criteria, purchaseHistory: e.target.value}
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Any</option>
                <option value="First Purchase">First Purchase</option>
                <option value="Repeat Customer">Repeat Customer</option>
                <option value="High Value">High Value ($500+)</option>
                <option value="Flower Products">Flower Products</option>
                <option value="Edibles">Edibles</option>
                <option value="Concentrates">Concentrates</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Engagement Level</label>
              <select
                value={listForm.criteria.engagement}
                onChange={(e) => setListForm({
                  ...listForm, 
                  criteria: {...listForm.criteria, engagement: e.target.value}
                })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">All</option>
                <option value="High">High Engagement</option>
                <option value="Medium">Medium Engagement</option>
                <option value="Low">Low Engagement</option>
                <option value="Newsletter Opt-in">Newsletter Subscribers</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowListModal(false);
                setListForm({
                  name: '',
                  description: '',
                  tags: [],
                  criteria: {
                    location: '',
                    purchaseHistory: '',
                    engagement: '',
                    demographics: ''
                  }
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddEmailList}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create List
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Email Marketing</h1>
        <p className="mt-2 text-gray-600">Create, manage, and track email campaigns and automation</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'campaigns', name: 'Campaigns', icon: '📧' },
            { id: 'templates', name: 'Templates', icon: '📝' },
            { id: 'lists', name: 'Email Lists', icon: '👥' },
            { id: 'automation', name: 'Automation', icon: '⚡' },
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
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'lists' && renderLists()}
      {activeTab === 'automation' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Email Automation</h3>
          <p className="text-gray-600">Advanced automation workflows coming soon...</p>
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Email Analytics</h3>
          <p className="text-gray-600">Detailed analytics and reporting coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showCampaignModal && <CampaignModal />}
      {showTemplateModal && <TemplateModal />}
      {showListModal && <ListModal />}
    </div>
  );
};

export default EnhancedEmailMarketingModule;

