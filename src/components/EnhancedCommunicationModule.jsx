import React, { useState, useEffect, useMemo } from 'react';

const EnhancedCommunicationModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Form states
  const [messageForm, setMessageForm] = useState({
    subject: '',
    channel: 'Email',
    type: 'Transactional',
    recipient: '',
    content: '',
    priority: 'Medium',
    template: '',
    campaign: '',
    tags: '',
    attachments: '',
    scheduledAt: ''
  });

  const [templateForm, setTemplateForm] = useState({
    name: '',
    type: 'Email',
    category: 'Transactional',
    subject: '',
    content: '',
    variables: '',
    description: '',
    active: true
  });

  // Mock data with mobile-responsive considerations
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
      content: 'Your order has been confirmed and is being prepared for delivery. Order #ORD-2024-001 includes 3.5g Premium Flower and 10mg Gummies.',
      template: 'Order Confirmation',
      campaign: null,
      tags: ['order', 'confirmation', 'transactional'],
      attachments: ['receipt.pdf'],
      bounced: false,
      unsubscribed: false,
      readTime: '2.3 minutes',
      deviceType: 'Mobile',
      location: 'Los Angeles, CA'
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
      content: 'Welcome to DankDash! Here\'s everything you need to know to get started with premium cannabis delivery.',
      template: 'Welcome Series #1',
      campaign: 'New Customer Onboarding',
      tags: ['welcome', 'onboarding', 'marketing'],
      attachments: ['welcome-guide.pdf'],
      bounced: false,
      unsubscribed: false,
      readTime: '4.1 minutes',
      deviceType: 'Desktop',
      location: 'San Francisco, CA'
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
      content: 'Your DankDash order is out for delivery! ETA: 3:30 PM. Track: https://dankdash.com/track/ABC123',
      template: 'Delivery Notification',
      campaign: null,
      tags: ['delivery', 'notification', 'sms'],
      attachments: [],
      bounced: false,
      unsubscribed: false,
      readTime: '0.5 minutes',
      deviceType: 'Mobile',
      location: 'Oakland, CA'
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
      content: '🍃 Limited time offer! Get 20% off all edibles. Use code EDIBLES20. Valid until midnight!',
      template: 'Promotional Push',
      campaign: 'August Edibles Promotion',
      tags: ['promotion', 'edibles', 'discount'],
      attachments: [],
      bounced: false,
      unsubscribed: false,
      readTime: '1.2 minutes',
      deviceType: 'Mobile',
      location: 'San Diego, CA'
    },
    {
      id: 'MSG-005',
      subject: 'Password Reset Request',
      channel: 'Email',
      type: 'Transactional',
      recipient: 'mike.wilson@email.com',
      sender: 'security@dankdash.com',
      status: 'Opened',
      priority: 'High',
      sentAt: '2024-08-14 11:20:15',
      deliveredAt: '2024-08-14 11:20:18',
      openedAt: '2024-08-14 11:25:30',
      clickedAt: '2024-08-14 11:26:12',
      content: 'You requested a password reset for your DankDash account. Click the link below to reset your password.',
      template: 'Password Reset',
      campaign: null,
      tags: ['security', 'password', 'transactional'],
      attachments: [],
      bounced: false,
      unsubscribed: false,
      readTime: '1.8 minutes',
      deviceType: 'Desktop',
      location: 'Sacramento, CA'
    },
    {
      id: 'MSG-006',
      subject: 'New Product Alert: Premium Concentrates',
      channel: 'Email',
      type: 'Marketing',
      recipient: 'lisa.brown@email.com',
      sender: 'products@dankdash.com',
      status: 'Bounced',
      priority: 'Low',
      sentAt: '2024-08-14 10:00:00',
      deliveredAt: null,
      openedAt: null,
      clickedAt: null,
      content: 'Discover our new line of premium concentrates! Lab-tested, high-quality extracts now available.',
      template: 'Product Launch',
      campaign: 'Concentrates Launch',
      tags: ['product', 'launch', 'concentrates'],
      attachments: ['product-catalog.pdf'],
      bounced: true,
      unsubscribed: false,
      readTime: null,
      deviceType: null,
      location: null
    },
    {
      id: 'MSG-007',
      subject: 'Loyalty Points Update',
      channel: 'Push',
      type: 'Notification',
      recipient: 'user_67890',
      sender: 'DankDash App',
      status: 'Delivered',
      priority: 'Low',
      sentAt: '2024-08-14 09:30:00',
      deliveredAt: '2024-08-14 09:30:02',
      openedAt: '2024-08-14 10:15:45',
      clickedAt: null,
      content: 'You\'ve earned 50 loyalty points! You now have 350 points. Redeem for discounts on your next order.',
      template: 'Loyalty Update',
      campaign: 'Loyalty Program',
      tags: ['loyalty', 'points', 'notification'],
      attachments: [],
      bounced: false,
      unsubscribed: false,
      readTime: '0.8 minutes',
      deviceType: 'Mobile',
      location: 'Fresno, CA'
    },
    {
      id: 'MSG-008',
      subject: 'Weekly Newsletter - Cannabis News',
      channel: 'Email',
      type: 'Newsletter',
      recipient: 'newsletter@subscribers.com',
      sender: 'news@dankdash.com',
      status: 'Scheduled',
      priority: 'Medium',
      sentAt: null,
      deliveredAt: null,
      openedAt: null,
      clickedAt: null,
      content: 'This week in cannabis: New regulations, product reviews, and industry insights.',
      template: 'Weekly Newsletter',
      campaign: 'Newsletter Campaign',
      tags: ['newsletter', 'weekly', 'cannabis'],
      attachments: [],
      bounced: false,
      unsubscribed: false,
      readTime: null,
      deviceType: null,
      location: null
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 'TPL-001',
      name: 'Order Confirmation',
      type: 'Email',
      category: 'Transactional',
      subject: 'Order Confirmation - #{order_number}',
      content: 'Dear {customer_name},\n\nYour order has been confirmed and is being prepared for delivery.\n\nOrder Details:\n- Order Number: {order_number}\n- Items: {order_items}\n- Total: {order_total}\n- Delivery Address: {delivery_address}\n\nThank you for choosing DankDash!',
      variables: ['customer_name', 'order_number', 'order_items', 'order_total', 'delivery_address'],
      description: 'Sent when customer places an order',
      active: true,
      usageCount: 156,
      lastUsed: '2024-08-14',
      createdBy: 'System Admin',
      createdAt: '2024-01-15'
    },
    {
      id: 'TPL-002',
      name: 'Welcome Series #1',
      type: 'Email',
      category: 'Marketing',
      subject: 'Welcome to DankDash, {first_name}!',
      content: 'Welcome to DankDash, {first_name}!\n\nWe\'re excited to have you join our community of cannabis enthusiasts.\n\nHere\'s what you can expect:\n- Premium quality products\n- Fast, discreet delivery\n- Expert customer support\n- Exclusive member discounts\n\nUse code WELCOME10 for 10% off your first order!',
      variables: ['first_name'],
      description: 'First email in welcome series for new customers',
      active: true,
      usageCount: 89,
      lastUsed: '2024-08-14',
      createdBy: 'Marketing Manager',
      createdAt: '2024-02-01'
    },
    {
      id: 'TPL-003',
      name: 'Delivery Notification',
      type: 'SMS',
      category: 'Notification',
      subject: null,
      content: 'Your DankDash order is out for delivery! ETA: {delivery_eta}. Track: {tracking_url}',
      variables: ['delivery_eta', 'tracking_url'],
      description: 'SMS sent when order is out for delivery',
      active: true,
      usageCount: 234,
      lastUsed: '2024-08-14',
      createdBy: 'Operations Manager',
      createdAt: '2024-01-20'
    },
    {
      id: 'TPL-004',
      name: 'Promotional Push',
      type: 'Push',
      category: 'Promotional',
      subject: null,
      content: '{promotion_emoji} {promotion_title}! {promotion_description}. Use code {promo_code}',
      variables: ['promotion_emoji', 'promotion_title', 'promotion_description', 'promo_code'],
      description: 'Push notification for promotions and special offers',
      active: true,
      usageCount: 67,
      lastUsed: '2024-08-14',
      createdBy: 'Marketing Team',
      createdAt: '2024-03-10'
    },
    {
      id: 'TPL-005',
      name: 'Password Reset',
      type: 'Email',
      category: 'Transactional',
      subject: 'Password Reset Request',
      content: 'Hi {customer_name},\n\nYou requested a password reset for your DankDash account.\n\nClick the link below to reset your password:\n{reset_link}\n\nThis link will expire in 24 hours.\n\nIf you didn\'t request this, please ignore this email.',
      variables: ['customer_name', 'reset_link'],
      description: 'Password reset email template',
      active: true,
      usageCount: 23,
      lastUsed: '2024-08-14',
      createdBy: 'Security Team',
      createdAt: '2024-01-10'
    },
    {
      id: 'TPL-006',
      name: 'Product Launch',
      type: 'Email',
      category: 'Marketing',
      subject: 'New Product Alert: {product_name}',
      content: 'Exciting news, {customer_name}!\n\nWe\'re thrilled to introduce our latest product: {product_name}\n\n{product_description}\n\nKey Features:\n{product_features}\n\nSpecial launch price: {launch_price}\n\nOrder now and be among the first to try it!',
      variables: ['customer_name', 'product_name', 'product_description', 'product_features', 'launch_price'],
      description: 'Email template for new product launches',
      active: true,
      usageCount: 45,
      lastUsed: '2024-08-13',
      createdBy: 'Product Manager',
      createdAt: '2024-04-05'
    }
  ]);

  const [channels] = useState(['Email', 'SMS', 'Push', 'In-App']);
  const [messageTypes] = useState(['Transactional', 'Marketing', 'Promotional', 'Notification', 'Newsletter']);
  const [priorities] = useState(['Low', 'Medium', 'High', 'Urgent']);
  const [statuses] = useState(['Sent', 'Delivered', 'Opened', 'Clicked', 'Bounced', 'Failed', 'Scheduled']);
  const [templateCategories] = useState(['Transactional', 'Marketing', 'Promotional', 'Notification', 'Newsletter']);

  // Filter functions
  const filteredMessages = useMemo(() => {
    return messages.filter(message => {
      const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           message.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesChannel = selectedChannel === 'all' || message.channel === selectedChannel;
      const matchesStatus = selectedStatus === 'all' || message.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || message.priority === selectedPriority;
      
      return matchesSearch && matchesChannel && matchesStatus && matchesPriority;
    });
  }, [messages, searchTerm, selectedChannel, selectedStatus, selectedPriority]);

  // Message CRUD Operations
  const handleCreateMessage = () => {
    if (!messageForm.subject || !messageForm.recipient || !messageForm.content) {
      alert('Please fill in required fields (Subject, Recipient, Content)');
      return;
    }

    const newMessage = {
      id: `MSG-${String(messages.length + 1).padStart(3, '0')}`,
      subject: messageForm.subject,
      channel: messageForm.channel,
      type: messageForm.type,
      recipient: messageForm.recipient,
      sender: messageForm.channel === 'SMS' ? 'DankDash' : 'system@dankdash.com',
      status: messageForm.scheduledAt ? 'Scheduled' : 'Sent',
      priority: messageForm.priority,
      sentAt: messageForm.scheduledAt || new Date().toISOString(),
      deliveredAt: messageForm.scheduledAt ? null : new Date().toISOString(),
      openedAt: null,
      clickedAt: null,
      content: messageForm.content,
      template: messageForm.template || null,
      campaign: messageForm.campaign || null,
      tags: messageForm.tags ? messageForm.tags.split(',').map(t => t.trim()) : [],
      attachments: messageForm.attachments ? messageForm.attachments.split(',').map(a => a.trim()) : [],
      bounced: false,
      unsubscribed: false,
      readTime: null,
      deviceType: null,
      location: null
    };

    setMessages([...messages, newMessage]);
    setMessageForm({
      subject: '',
      channel: 'Email',
      type: 'Transactional',
      recipient: '',
      content: '',
      priority: 'Medium',
      template: '',
      campaign: '',
      tags: '',
      attachments: '',
      scheduledAt: ''
    });
    setShowMessageModal(false);
    alert('Message created successfully!');
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setMessageForm({
      subject: message.subject,
      channel: message.channel,
      type: message.type,
      recipient: message.recipient,
      content: message.content,
      priority: message.priority,
      template: message.template || '',
      campaign: message.campaign || '',
      tags: message.tags.join(', '),
      attachments: message.attachments.join(', '),
      scheduledAt: ''
    });
    setShowMessageModal(true);
  };

  const handleUpdateMessage = () => {
    if (!messageForm.subject || !messageForm.recipient || !messageForm.content) {
      alert('Please fill in required fields (Subject, Recipient, Content)');
      return;
    }

    const updatedMessages = messages.map(message =>
      message.id === editingMessage.id
        ? { 
            ...message, 
            subject: messageForm.subject,
            channel: messageForm.channel,
            type: messageForm.type,
            recipient: messageForm.recipient,
            content: messageForm.content,
            priority: messageForm.priority,
            template: messageForm.template || message.template,
            campaign: messageForm.campaign || message.campaign,
            tags: messageForm.tags ? messageForm.tags.split(',').map(t => t.trim()) : message.tags,
            attachments: messageForm.attachments ? messageForm.attachments.split(',').map(a => a.trim()) : message.attachments
          }
        : message
    );

    setMessages(updatedMessages);
    setEditingMessage(null);
    setMessageForm({
      subject: '',
      channel: 'Email',
      type: 'Transactional',
      recipient: '',
      content: '',
      priority: 'Medium',
      template: '',
      campaign: '',
      tags: '',
      attachments: '',
      scheduledAt: ''
    });
    setShowMessageModal(false);
    alert('Message updated successfully!');
  };

  const handleDeleteMessage = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      setMessages(messages.filter(message => message.id !== messageId));
      alert('Message deleted successfully!');
    }
  };

  const handleResendMessage = (messageId) => {
    const updatedMessages = messages.map(message =>
      message.id === messageId
        ? { 
            ...message, 
            status: 'Sent',
            sentAt: new Date().toISOString(),
            deliveredAt: new Date().toISOString(),
            bounced: false
          }
        : message
    );
    setMessages(updatedMessages);
    alert('Message resent successfully!');
  };

  // Template CRUD Operations
  const handleCreateTemplate = () => {
    if (!templateForm.name || !templateForm.content) {
      alert('Please fill in required fields (Name, Content)');
      return;
    }

    const newTemplate = {
      id: `TPL-${String(templates.length + 1).padStart(3, '0')}`,
      name: templateForm.name,
      type: templateForm.type,
      category: templateForm.category,
      subject: templateForm.subject,
      content: templateForm.content,
      variables: templateForm.variables ? templateForm.variables.split(',').map(v => v.trim()) : [],
      description: templateForm.description,
      active: templateForm.active,
      usageCount: 0,
      lastUsed: null,
      createdBy: 'Current User',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTemplates([...templates, newTemplate]);
    setTemplateForm({
      name: '',
      type: 'Email',
      category: 'Transactional',
      subject: '',
      content: '',
      variables: '',
      description: '',
      active: true
    });
    setShowTemplateModal(false);
    alert('Template created successfully!');
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      type: template.type,
      category: template.category,
      subject: template.subject || '',
      content: template.content,
      variables: template.variables.join(', '),
      description: template.description,
      active: template.active
    });
    setShowTemplateModal(true);
  };

  const handleUpdateTemplate = () => {
    if (!templateForm.name || !templateForm.content) {
      alert('Please fill in required fields (Name, Content)');
      return;
    }

    const updatedTemplates = templates.map(template =>
      template.id === editingTemplate.id
        ? { 
            ...template, 
            name: templateForm.name,
            type: templateForm.type,
            category: templateForm.category,
            subject: templateForm.subject,
            content: templateForm.content,
            variables: templateForm.variables ? templateForm.variables.split(',').map(v => v.trim()) : template.variables,
            description: templateForm.description,
            active: templateForm.active
          }
        : template
    );

    setTemplates(updatedTemplates);
    setEditingTemplate(null);
    setTemplateForm({
      name: '',
      type: 'Email',
      category: 'Transactional',
      subject: '',
      content: '',
      variables: '',
      description: '',
      active: true
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

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Opened': return 'bg-blue-100 text-blue-800';
      case 'Clicked': return 'bg-purple-100 text-purple-800';
      case 'Sent': return 'bg-gray-100 text-gray-800';
      case 'Bounced': return 'bg-red-100 text-red-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelColor = (channel) => {
    switch (channel) {
      case 'Email': return 'bg-blue-100 text-blue-800';
      case 'SMS': return 'bg-green-100 text-green-800';
      case 'Push': return 'bg-purple-100 text-purple-800';
      case 'In-App': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  };

  // Dashboard calculations
  const totalMessages = messages.length;
  const deliveredMessages = messages.filter(message => message.status === 'Delivered').length;
  const openedMessages = messages.filter(message => message.openedAt).length;
  const clickedMessages = messages.filter(message => message.clickedAt).length;
  const bouncedMessages = messages.filter(message => message.bounced).length;
  const scheduledMessages = messages.filter(message => message.status === 'Scheduled').length;
  const deliveryRate = totalMessages > 0 ? ((deliveredMessages / totalMessages) * 100).toFixed(1) : 0;
  const openRate = deliveredMessages > 0 ? ((openedMessages / deliveredMessages) * 100).toFixed(1) : 0;
  const clickRate = openedMessages > 0 ? ((clickedMessages / openedMessages) * 100).toFixed(1) : 0;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Messages</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalMessages}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{deliveredMessages} delivered</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Delivery Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{deliveryRate}%</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">{bouncedMessages} bounced</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Open Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{openRate}%</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">{openedMessages} opened</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Click Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{clickRate}%</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">{clickedMessages} clicked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages and Channel Performance - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {messages
              .sort((a, b) => new Date(b.sentAt || '1970-01-01') - new Date(a.sentAt || '1970-01-01'))
              .slice(0, 5)
              .map((message) => (
                <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${getChannelColor(message.channel).replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 bg-')}`}>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{message.subject}</h4>
                      <p className="text-xs text-gray-600 truncate">{message.recipient}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelColor(message.channel)}`}>
                          {message.channel}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-xs text-gray-500">{formatDate(message.sentAt)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Channel Performance</h3>
          <div className="space-y-4">
            {channels.map((channel) => {
              const channelMessages = messages.filter(m => m.channel === channel);
              const channelDelivered = channelMessages.filter(m => m.status === 'Delivered').length;
              const channelOpened = channelMessages.filter(m => m.openedAt).length;
              const channelRate = channelMessages.length > 0 ? ((channelDelivered / channelMessages.length) * 100).toFixed(1) : 0;
              
              return (
                <div key={channel} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{channel}</span>
                    <span className="text-gray-900 font-medium">{channelMessages.length} messages</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(channelRate, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{channelRate}% delivery rate</span>
                    <span>{channelOpened} opened</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions and Communication Tips - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowMessageModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Send Message
            </button>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Create Template
            </button>
            <button
              onClick={() => alert('Opening broadcast composer')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              Broadcast Message
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Communication Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Personalize messages with customer names</p>
            <p>• Use clear, actionable subject lines</p>
            <p>• Test templates before sending</p>
            <p>• Monitor delivery and open rates</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Scheduled Messages</h3>
          <div className="space-y-3 text-sm">
            {messages
              .filter(message => message.status === 'Scheduled')
              .slice(0, 3)
              .map((message) => (
                <div key={message.id} className="flex items-center justify-between">
                  <span className="text-gray-600 truncate">{message.subject}</span>
                  <span className="text-gray-900 font-medium">{formatDate(message.sentAt)}</span>
                </div>
              ))}
            {scheduledMessages === 0 && (
              <p className="text-gray-500 text-center">No scheduled messages</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMessages = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-4xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search messages..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Channels</option>
              {channels.map(channel => (
                <option key={channel} value={channel}>{channel}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowMessageModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Send Message
          </button>
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredMessages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{message.subject}</h3>
                <p className="text-xs text-gray-500 truncate">{message.recipient}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(message.status)}`}>
                  {message.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelColor(message.channel)}`}>
                  {message.channel}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="text-gray-900 font-medium">{message.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Priority:</span>
                <span className={`font-medium ${message.priority === 'High' || message.priority === 'Urgent' ? 'text-red-600' : 'text-gray-900'}`}>
                  {message.priority}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sent:</span>
                <span className="text-gray-900 font-medium">{formatDate(message.sentAt)}</span>
              </div>
              {message.deliveredAt && (
                <div className="flex justify-between">
                  <span>Delivered:</span>
                  <span className="text-gray-900 font-medium">{formatDate(message.deliveredAt)}</span>
                </div>
              )}
              {message.openedAt && (
                <div className="flex justify-between">
                  <span>Opened:</span>
                  <span className="text-gray-900 font-medium">{formatDate(message.openedAt)}</span>
                </div>
              )}
              {message.readTime && (
                <div className="flex justify-between">
                  <span>Read Time:</span>
                  <span className="text-gray-900 font-medium">{message.readTime}</span>
                </div>
              )}
            </div>

            {message.content && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 line-clamp-3">{message.content}</p>
              </div>
            )}

            {message.tags && message.tags.length > 0 && (
              <div className="mb-3 text-xs">
                <div className="flex flex-wrap gap-1">
                  {message.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="inline-flex px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {message.tags.length > 3 && (
                    <span className="text-gray-600">+{message.tags.length - 3} more</span>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditMessage(message)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              {message.status === 'Bounced' || message.status === 'Failed' ? (
                <button 
                  onClick={() => handleResendMessage(message.id)}
                  className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                >
                  Resend
                </button>
              ) : null}
              <button 
                onClick={() => alert(`Viewing analytics for ${message.id}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Analytics
              </button>
              <button 
                onClick={() => alert(`Duplicating message ${message.id}`)}
                className="text-xs px-2 py-1 text-orange-600 hover:text-orange-900 bg-orange-50 rounded"
              >
                Duplicate
              </button>
              <button 
                onClick={() => handleDeleteMessage(message.id)}
                className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Message Templates</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowTemplateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Create Template
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{template.name}</h3>
                <p className="text-xs text-gray-500">{template.type} • {template.category}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {template.active ? 'Active' : 'Inactive'}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getChannelColor(template.type)}`}>
                  {template.type}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Usage Count:</span>
                <span className="text-gray-900 font-medium">{template.usageCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Used:</span>
                <span className="text-gray-900 font-medium">{template.lastUsed || 'Never'}</span>
              </div>
              <div className="flex justify-between">
                <span>Created By:</span>
                <span className="text-gray-900 font-medium">{template.createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span>Variables:</span>
                <span className="text-gray-900 font-medium">{template.variables.length}</span>
              </div>
            </div>

            {template.subject && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 font-medium">Subject:</p>
                <p className="text-gray-800 truncate">{template.subject}</p>
              </div>
            )}

            {template.description && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 line-clamp-2">{template.description}</p>
              </div>
            )}

            {template.variables && template.variables.length > 0 && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 font-medium mb-1">Variables:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.slice(0, 3).map((variable, index) => (
                    <span key={index} className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {variable}
                    </span>
                  ))}
                  {template.variables.length > 3 && (
                    <span className="text-blue-600">+{template.variables.length - 3} more</span>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditTemplate(template)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => alert(`Using template ${template.id} for new message`)}
                className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
              >
                Use Template
              </button>
              <button 
                onClick={() => alert(`Duplicating template ${template.id}`)}
                className="text-xs px-2 py-1 text-orange-600 hover:text-orange-900 bg-orange-50 rounded"
              >
                Duplicate
              </button>
              <button 
                onClick={() => alert(`Viewing template analytics for ${template.id}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Analytics
              </button>
              <button 
                onClick={() => handleDeleteTemplate(template.id)}
                className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Message Modal - Mobile Responsive
  const MessageModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingMessage ? 'Edit Message' : 'Send New Message'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject *</label>
              <input
                type="text"
                value={messageForm.subject}
                onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Channel *</label>
                <select
                  value={messageForm.channel}
                  onChange={(e) => setMessageForm({...messageForm, channel: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  {channels.map(channel => (
                    <option key={channel} value={channel}>{channel}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={messageForm.type}
                  onChange={(e) => setMessageForm({...messageForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {messageTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={messageForm.priority}
                  onChange={(e) => setMessageForm({...messageForm, priority: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Recipient *</label>
              <input
                type="text"
                value={messageForm.recipient}
                onChange={(e) => setMessageForm({...messageForm, recipient: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="email@example.com or +1-555-0123"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content *</label>
              <textarea
                value={messageForm.content}
                onChange={(e) => setMessageForm({...messageForm, content: e.target.value})}
                rows={5}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Template</label>
                <input
                  type="text"
                  value={messageForm.template}
                  onChange={(e) => setMessageForm({...messageForm, template: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Template name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Campaign</label>
                <input
                  type="text"
                  value={messageForm.campaign}
                  onChange={(e) => setMessageForm({...messageForm, campaign: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Campaign name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input
                type="text"
                value={messageForm.tags}
                onChange={(e) => setMessageForm({...messageForm, tags: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Attachments (comma-separated filenames)</label>
              <input
                type="text"
                value={messageForm.attachments}
                onChange={(e) => setMessageForm({...messageForm, attachments: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="file1.pdf, file2.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Schedule For Later</label>
              <input
                type="datetime-local"
                value={messageForm.scheduledAt}
                onChange={(e) => setMessageForm({...messageForm, scheduledAt: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowMessageModal(false);
                setEditingMessage(null);
                setMessageForm({
                  subject: '',
                  channel: 'Email',
                  type: 'Transactional',
                  recipient: '',
                  content: '',
                  priority: 'Medium',
                  template: '',
                  campaign: '',
                  tags: '',
                  attachments: '',
                  scheduledAt: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingMessage ? handleUpdateMessage : handleCreateMessage}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingMessage ? 'Update' : 'Send'} Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Template Modal - Mobile Responsive
  const TemplateModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingTemplate ? 'Edit Template' : 'Create New Template'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Template Name *</label>
              <input
                type="text"
                value={templateForm.name}
                onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type *</label>
                <select
                  value={templateForm.type}
                  onChange={(e) => setTemplateForm({...templateForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  {channels.map(channel => (
                    <option key={channel} value={channel}>{channel}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={templateForm.category}
                  onChange={(e) => setTemplateForm({...templateForm, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {templateCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={templateForm.active}
                  onChange={(e) => setTemplateForm({...templateForm, active: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Active</label>
              </div>
            </div>

            {templateForm.type === 'Email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject Line</label>
                <input
                  type="text"
                  value={templateForm.subject}
                  onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Use {variables} for personalization"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Content *</label>
              <textarea
                value={templateForm.content}
                onChange={(e) => setTemplateForm({...templateForm, content: e.target.value})}
                rows={6}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Use {variables} for personalization"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Variables (comma-separated)</label>
              <input
                type="text"
                value={templateForm.variables}
                onChange={(e) => setTemplateForm({...templateForm, variables: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="customer_name, order_number, product_name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={templateForm.description}
                onChange={(e) => setTemplateForm({...templateForm, description: e.target.value})}
                rows={2}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Describe when this template should be used"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowTemplateModal(false);
                setEditingTemplate(null);
                setTemplateForm({
                  name: '',
                  type: 'Email',
                  category: 'Transactional',
                  subject: '',
                  content: '',
                  variables: '',
                  description: '',
                  active: true
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingTemplate ? handleUpdateTemplate : handleCreateTemplate}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingTemplate ? 'Update' : 'Create'} Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Communication Center</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Manage messages, templates, and communication channels</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'messages', name: 'Messages', icon: '💬' },
            { id: 'templates', name: 'Templates', icon: '📝' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="overflow-hidden">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'templates' && renderTemplates()}
      </div>

      {/* Modals */}
      {showMessageModal && <MessageModal />}
      {showTemplateModal && <TemplateModal />}
    </div>
  );
};

export default EnhancedCommunicationModule;

