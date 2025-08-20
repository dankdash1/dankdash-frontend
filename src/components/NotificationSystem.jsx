import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Bell, 
  Send, 
  Users, 
  Truck, 
  Package, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Eye,
  Filter,
  Search,
  Download,
  Settings,
  Phone,
  User,
  Building,
  ShoppingCart,
  Star,
  TrendingUp
} from 'lucide-react';

const NotificationSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  
  // Email provider configuration
  const [emailProvider, setEmailProvider] = useState('gmail'); // 'gmail' or 'sendgrid'
  const [providerConfig, setProviderConfig] = useState({
    gmail: {
      enabled: true,
      clientId: '',
      clientSecret: '',
      refreshToken: '',
      accessToken: '',
      configured: false
    },
    sendgrid: {
      enabled: true,
      apiKey: '',
      fromEmail: 'noreply@dankdash.com',
      fromName: 'DankDash',
      configured: false
    },
    twilio: {
      enabled: true,
      accountSid: '',
      authToken: '',
      fromNumber: '',
      configured: false
    }
  });

  // Initialize notification templates
  useEffect(() => {
    const defaultTemplates = [
      {
        id: 'customer_welcome',
        name: 'Customer Welcome Email',
        type: 'email',
        category: 'customer',
        subject: 'Welcome to DankDash - Your Premium Cannabis Delivery Platform',
        content: `Hi {{customer_name}},

Welcome to DankDash! We're excited to have you join our community of cannabis enthusiasts.

🌿 **What's Next?**
- Browse our premium product selection
- Enjoy fast, reliable delivery
- Track your orders in real-time
- Get exclusive member discounts

Your account is now active and ready to use. Start shopping today!

Best regards,
The DankDash Team`,
        variables: ['customer_name', 'customer_email'],
        active: true
      },
      {
        id: 'order_confirmation',
        name: 'Order Confirmation',
        type: 'email',
        category: 'order',
        subject: 'Order #{{order_id}} Confirmed - DankDash',
        content: `Hi {{customer_name}},

Thank you for your order! We've received your order and it's being processed.

📦 **Order Details:**
- Order #: {{order_id}}
- Total: ${{order_total}}
- Items: {{order_items}}
- Delivery Method: {{fulfillment_method}}

{{#if_delivery}}
🚚 **Delivery Information:**
Your driver {{driver_name}} will deliver your order to:
{{delivery_address}}

Estimated delivery time: {{estimated_time}} minutes
Driver contact: {{driver_phone}}
{{/if_delivery}}

{{#if_shipping}}
📦 **Shipping Information:**
Your order will be shipped within 1-2 business days.
Tracking information will be sent once your order ships.
{{/if_shipping}}

Track your order: {{tracking_url}}

Questions? Reply to this email or call us at (555) 420-DANK

Best regards,
The DankDash Team`,
        variables: ['customer_name', 'order_id', 'order_total', 'order_items', 'fulfillment_method', 'driver_name', 'delivery_address', 'estimated_time', 'driver_phone', 'tracking_url'],
        active: true
      },
      {
        id: 'driver_assignment',
        name: 'Driver Assignment Notification',
        type: 'sms',
        category: 'driver',
        subject: 'New Delivery Assignment',
        content: `DankDash Alert: New delivery assignment!

Order #{{order_id}}
Customer: {{customer_name}}
Address: {{delivery_address}}
Items: {{order_items}}
Total: ${{order_total}}

Estimated distance: {{distance}}km
Customer phone: {{customer_phone}}

Accept delivery in the app within 5 minutes.`,
        variables: ['order_id', 'customer_name', 'delivery_address', 'order_items', 'order_total', 'distance', 'customer_phone'],
        active: true
      },
      {
        id: 'driver_assignment_email',
        name: 'Driver Assignment Email',
        type: 'email',
        category: 'driver',
        subject: 'New Delivery Assignment - Order #{{order_id}}',
        content: `Hi {{driver_name}},

You have a new delivery assignment!

📦 **Order Details:**
- Order #: {{order_id}}
- Customer: {{customer_name}}
- Phone: {{customer_phone}}
- Address: {{delivery_address}}
- Items: {{order_items}}
- Total: ${{order_total}}

🚗 **Delivery Info:**
- Distance: {{distance}}km
- Estimated time: {{estimated_time}} minutes
- Special instructions: {{special_instructions}}

Please confirm acceptance in the driver app within 5 minutes.

Safe driving!
DankDash Dispatch`,
        variables: ['driver_name', 'order_id', 'customer_name', 'customer_phone', 'delivery_address', 'order_items', 'order_total', 'distance', 'estimated_time', 'special_instructions'],
        active: true
      },
      {
        id: 'shipping_notification',
        name: 'Shipping Department Alert',
        type: 'email',
        category: 'shipping',
        subject: 'New Shipping Order - Order #{{order_id}}',
        content: `Shipping Team,

New order ready for shipping:

📦 **Order Details:**
- Order #: {{order_id}}
- Customer: {{customer_name}}
- Email: {{customer_email}}
- Phone: {{customer_phone}}
- Shipping Address: {{shipping_address}}
- Items: {{order_items}}
- Total: ${{order_total}}
- Weight: {{package_weight}}

📋 **Action Required:**
1. Prepare shipping label
2. Package items securely
3. Update tracking information
4. Send tracking email to customer

Priority: {{shipping_priority}}

DankDash Operations`,
        variables: ['order_id', 'customer_name', 'customer_email', 'customer_phone', 'shipping_address', 'order_items', 'order_total', 'package_weight', 'shipping_priority'],
        active: true
      },
      {
        id: 'admin_alert',
        name: 'Admin Order Alert',
        type: 'email',
        category: 'admin',
        subject: 'Order Alert - {{alert_type}}',
        content: `Admin Alert,

{{alert_message}}

📊 **Order Details:**
- Order #: {{order_id}}
- Customer: {{customer_name}}
- Total: ${{order_total}}
- Status: {{order_status}}
- Timestamp: {{timestamp}}

{{#if_driver_issue}}
🚨 **Driver Issue:**
{{driver_issue_details}}
{{/if_driver_issue}}

{{#if_inventory_issue}}
📦 **Inventory Issue:**
{{inventory_issue_details}}
{{/if_inventory_issue}}

Action may be required.

DankDash System`,
        variables: ['alert_type', 'alert_message', 'order_id', 'customer_name', 'order_total', 'order_status', 'timestamp', 'driver_issue_details', 'inventory_issue_details'],
        active: true
      },
      {
        id: 'partner_welcome',
        name: 'Partner Welcome Email',
        type: 'email',
        category: 'partner',
        subject: 'Welcome to the DankDash Partner Network!',
        content: `Hi {{partner_name}},

Welcome to the DankDash Partner Network! We're excited to have you join our growing community.

🤝 **Your Partnership:**
- Partner Type: {{partner_type}}
- Status: {{partner_status}}
- Commission Rate: {{commission_rate}}%

📋 **Next Steps:**
1. Complete your profile setup
2. Review partnership agreement
3. Access partner dashboard
4. Start earning with DankDash

🔗 **Quick Links:**
- Partner Dashboard: {{partner_dashboard_url}}
- Support Center: {{support_url}}
- Contact Your Account Manager: {{account_manager_email}}

Questions? We're here to help!

Best regards,
DankDash Partnership Team`,
        variables: ['partner_name', 'partner_type', 'partner_status', 'commission_rate', 'partner_dashboard_url', 'support_url', 'account_manager_email'],
        active: true
      },
      {
        id: 'order_status_update',
        name: 'Order Status Update',
        type: 'sms',
        category: 'customer',
        subject: 'Order Update',
        content: `DankDash Update: Order #{{order_id}} is now {{order_status}}.

{{#if_out_for_delivery}}
Your driver {{driver_name}} is on the way! ETA: {{eta}} minutes.
Track: {{tracking_url}}
{{/if_out_for_delivery}}

{{#if_delivered}}
Order delivered! Enjoy your products and thank you for choosing DankDash.
{{/if_delivered}}`,
        variables: ['order_id', 'order_status', 'driver_name', 'eta', 'tracking_url'],
        active: true
      }
    ];

    setTemplates(defaultTemplates);
    
    // Load existing notifications from localStorage
    const existingNotifications = JSON.parse(localStorage.getItem('dankdash_notifications') || '[]');
    setNotifications(existingNotifications);
    
    const existingCampaigns = JSON.parse(localStorage.getItem('dankdash_email_campaigns') || '[]');
    setCampaigns(existingCampaigns);
  }, []);

  // Email sending functions
  const sendGmailEmail = async (to, subject, content) => {
    try {
      // Gmail API implementation
      const gmailConfig = providerConfig.gmail;
      
      if (!gmailConfig.configured) {
        console.log('Gmail not configured - simulating email send');
        return { success: true, messageId: 'gmail_sim_' + Date.now() };
      }

      // In production, this would use the Gmail API
      const emailData = {
        to: to,
        subject: subject,
        body: content,
        from: 'noreply@dankdash.com'
      };

      console.log('Gmail Email would be sent:', emailData);
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, messageId: 'gmail_' + Date.now() });
        }, 1000);
      });
    } catch (error) {
      console.error('Gmail send error:', error);
      return { success: false, error: error.message };
    }
  };

  const sendSendGridEmail = async (to, subject, content) => {
    try {
      // SendGrid API implementation
      const sendGridConfig = providerConfig.sendgrid;
      
      if (!sendGridConfig.configured) {
        console.log('SendGrid not configured - simulating email send');
        return { success: true, messageId: 'sendgrid_sim_' + Date.now() };
      }

      // In production, this would use the SendGrid API
      const emailData = {
        personalizations: [{
          to: [{ email: to }],
          subject: subject
        }],
        from: {
          email: sendGridConfig.fromEmail,
          name: sendGridConfig.fromName
        },
        content: [{
          type: 'text/html',
          value: content.replace(/\n/g, '<br>')
        }]
      };

      console.log('SendGrid Email would be sent:', emailData);
      
      // Simulate API call with advanced features
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            messageId: 'sendgrid_' + Date.now(),
            tracking: {
              click_tracking: { enable: true },
              open_tracking: { enable: true },
              subscription_tracking: { enable: true }
            }
          });
        }, 1000);
      });
    } catch (error) {
      console.error('SendGrid send error:', error);
      return { success: false, error: error.message };
    }
  };

  const sendTwilioSMS = async (to, content) => {
    try {
      // Twilio SMS implementation
      const twilioConfig = providerConfig.twilio;
      
      if (!twilioConfig.configured) {
        console.log('Twilio not configured - simulating SMS send');
        return { success: true, messageId: 'twilio_sim_' + Date.now() };
      }

      // In production, this would use the Twilio API
      const smsData = {
        to: to,
        from: twilioConfig.fromNumber,
        body: content
      };

      console.log('Twilio SMS would be sent:', smsData);
      
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true, messageId: 'twilio_' + Date.now() });
        }, 1000);
      });
    } catch (error) {
      console.error('Twilio send error:', error);
      return { success: false, error: error.message };
    }
  };

  // Enhanced notification sending function
  const sendNotification = async (templateId, recipient, variables = {}, orderData = null) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) {
      console.error('Template not found:', templateId);
      return null;
    }

    // Replace variables in content
    let content = template.content;
    let subject = template.subject;
    
    Object.keys(variables).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, variables[key] || '');
      subject = subject.replace(regex, variables[key] || '');
    });

    // Handle conditional blocks (simplified)
    content = content.replace(/{{#if_delivery}}[\s\S]*?{{\/if_delivery}}/g, 
      variables.fulfillment_method === 'delivery' ? content.match(/{{#if_delivery}}([\s\S]*?){{\/if_delivery}}/)?.[1] || '' : '');
    content = content.replace(/{{#if_shipping}}[\s\S]*?{{\/if_shipping}}/g, 
      variables.fulfillment_method === 'shipping' ? content.match(/{{#if_shipping}}([\s\S]*?){{\/if_shipping}}/)?.[1] || '' : '');

    const notification = {
      id: Date.now() + Math.random(),
      templateId: templateId,
      templateName: template.name,
      type: template.type,
      category: template.category,
      recipient: recipient,
      subject: subject,
      content: content,
      variables: variables,
      orderData: orderData,
      timestamp: new Date().toISOString(),
      status: 'pending',
      opened: false,
      clicked: false,
      provider: template.type === 'email' ? emailProvider : 'twilio'
    };

    // Send notification using appropriate provider
    let sendResult = null;
    
    if (template.type === 'email') {
      if (emailProvider === 'gmail') {
        sendResult = await sendGmailEmail(recipient.email, subject, content);
      } else if (emailProvider === 'sendgrid') {
        sendResult = await sendSendGridEmail(recipient.email, subject, content);
      }
    } else if (template.type === 'sms') {
      sendResult = await sendTwilioSMS(recipient.phone, content);
    }

    // Update notification status based on send result
    if (sendResult) {
      notification.status = sendResult.success ? 'sent' : 'failed';
      notification.messageId = sendResult.messageId;
      notification.error = sendResult.error;
      notification.tracking = sendResult.tracking;
    }

    // Save notification
    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);
    localStorage.setItem('dankdash_notifications', JSON.stringify(updatedNotifications));

    // Also save to campaigns for tracking
    if (template.type === 'email') {
      const campaign = {
        id: notification.id,
        name: `${template.name} - ${recipient.email || recipient.phone}`,
        subject: subject,
        type: template.category,
        status: notification.status === 'sent' ? 'Sent' : 'Failed',
        recipient: recipient.email || recipient.phone,
        sentDate: new Date().toISOString(),
        openRate: 0,
        clickRate: 0,
        content: content,
        provider: notification.provider,
        messageId: notification.messageId
      };
      
      const updatedCampaigns = [...campaigns, campaign];
      setCampaigns(updatedCampaigns);
      localStorage.setItem('dankdash_email_campaigns', JSON.stringify(updatedCampaigns));
    }

    console.log(`${template.type.toUpperCase()} ${notification.status} via ${notification.provider} to ${recipient.email || recipient.phone}:`, subject);
    return notification;
  };

  // Order routing with notifications
  const processOrder = (order) => {
    console.log('Processing order with notifications:', order);

    // Send customer confirmation
    sendNotification('order_confirmation', 
      { email: order.customerEmail }, 
      {
        customer_name: order.customerName,
        order_id: order.id,
        order_total: order.total,
        order_items: order.items.map(item => `${item.name} (${item.quantity})`).join(', '),
        fulfillment_method: order.fulfillmentMethod,
        driver_name: order.assignedDriver?.name || '',
        delivery_address: order.customerLocation?.address || '',
        estimated_time: order.estimatedTime || '',
        driver_phone: order.assignedDriver?.phone || '',
        tracking_url: `https://dankdash.com/track/${order.id}`
      },
      order
    );

    if (order.fulfillmentMethod === 'delivery' && order.assignedDriver) {
      // Send driver notifications
      sendNotification('driver_assignment_email',
        { email: order.assignedDriver.email },
        {
          driver_name: order.assignedDriver.name,
          order_id: order.id,
          customer_name: order.customerName,
          customer_phone: order.customerPhone,
          delivery_address: order.customerLocation.address,
          order_items: order.items.map(item => `${item.name} (${item.quantity})`).join(', '),
          order_total: order.total,
          distance: order.distance || '0',
          estimated_time: order.estimatedTime || '30',
          special_instructions: order.specialInstructions || 'None'
        },
        order
      );

      if (order.assignedDriver.notifications?.sms) {
        sendNotification('driver_assignment',
          { phone: order.assignedDriver.phone },
          {
            order_id: order.id,
            customer_name: order.customerName,
            delivery_address: order.customerLocation.address,
            order_items: order.items.map(item => item.name).join(', '),
            order_total: order.total,
            distance: order.distance || '0',
            customer_phone: order.customerPhone
          },
          order
        );
      }
    } else if (order.fulfillmentMethod === 'shipping') {
      // Send shipping department notification
      sendNotification('shipping_notification',
        { email: 'shipping@dankdash.com' },
        {
          order_id: order.id,
          customer_name: order.customerName,
          customer_email: order.customerEmail,
          customer_phone: order.customerPhone,
          shipping_address: order.shippingAddress,
          order_items: order.items.map(item => `${item.name} (${item.quantity})`).join(', '),
          order_total: order.total,
          package_weight: order.weight || 'TBD',
          shipping_priority: order.priority || 'Standard'
        },
        order
      );
    }

    // Send admin alert if needed
    if (order.requiresAdminAttention) {
      sendNotification('admin_alert',
        { email: 'admin@dankdash.com' },
        {
          alert_type: order.alertType || 'Order Processing',
          alert_message: order.alertMessage || 'New order requires attention',
          order_id: order.id,
          customer_name: order.customerName,
          order_total: order.total,
          order_status: order.status,
          timestamp: new Date().toISOString()
        },
        order
      );
    }
  };

  // Expose processOrder function globally for other components
  useEffect(() => {
    window.DankDashNotifications = {
      processOrder,
      sendNotification,
      templates
    };
  }, [templates, notifications]);

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.templateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.recipient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.recipient.phone?.includes(searchTerm);
    const matchesType = filterType === 'all' || notification.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'customer': return User;
      case 'driver': return Truck;
      case 'shipping': return Package;
      case 'admin': return Settings;
      case 'partner': return Building;
      case 'order': return ShoppingCart;
      default: return Bell;
    }
  };

  const renderDashboard = () => {
    const totalNotifications = notifications.length;
    const emailNotifications = notifications.filter(n => n.type === 'email').length;
    const smsNotifications = notifications.filter(n => n.type === 'sms').length;
    const todayNotifications = notifications.filter(n => 
      new Date(n.timestamp).toDateString() === new Date().toDateString()
    ).length;

    const categoryStats = {
      customer: notifications.filter(n => n.category === 'customer').length,
      driver: notifications.filter(n => n.category === 'driver').length,
      shipping: notifications.filter(n => n.category === 'shipping').length,
      admin: notifications.filter(n => n.category === 'admin').length,
      partner: notifications.filter(n => n.category === 'partner').length,
      order: notifications.filter(n => n.category === 'order').length
    };

    return (
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Notifications</p>
                <p className="text-3xl font-bold text-gray-900">{totalNotifications}</p>
                <p className="text-sm text-blue-600">{todayNotifications} today</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Email Notifications</p>
                <p className="text-3xl font-bold text-gray-900">{emailNotifications}</p>
                <p className="text-sm text-green-600">{((emailNotifications/totalNotifications)*100).toFixed(1)}% of total</p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">SMS Notifications</p>
                <p className="text-3xl font-bold text-gray-900">{smsNotifications}</p>
                <p className="text-sm text-purple-600">{((smsNotifications/totalNotifications)*100).toFixed(1)}% of total</p>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">99.2%</p>
                <p className="text-sm text-green-600">Delivery success</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(categoryStats).map(([category, count]) => {
              const Icon = getCategoryIcon(category);
              return (
                <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                  <Icon className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600 capitalize">{category}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Notifications</h3>
          <div className="space-y-3">
            {notifications.slice(-5).reverse().map(notification => {
              const Icon = getCategoryIcon(notification.category);
              return (
                <div key={notification.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{notification.templateName}</p>
                      <p className="text-sm text-gray-600">
                        {notification.type === 'email' ? notification.recipient.email : notification.recipient.phone}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderNotifications = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          <option value="email">Email</option>
          <option value="sms">SMS</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Notifications Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotifications.slice(0, 50).map((notification) => {
                const Icon = getCategoryIcon(notification.category);
                
                return (
                  <tr key={notification.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{notification.templateName}</div>
                          <div className="text-sm text-gray-500">{notification.subject}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {notification.type === 'email' ? (
                          <Mail className="h-4 w-4 text-blue-500 mr-1" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-purple-500 mr-1" />
                        )}
                        <span className="text-sm text-gray-900 capitalize">{notification.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {notification.recipient.email || notification.recipient.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(notification.status)}`}>
                        {notification.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Notification Templates</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Send className="h-4 w-4" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => {
          const Icon = getCategoryIcon(template.category);
          return (
            <div key={template.id} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Icon className="h-6 w-6 text-gray-500 mr-3" />
                  <div>
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{template.category} • {template.type}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${template.active ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Subject:</p>
                <p className="text-sm text-gray-600">{template.subject}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Variables:</p>
                <div className="flex flex-wrap gap-1">
                  {template.variables.slice(0, 3).map(variable => (
                    <span key={variable} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      {variable}
                    </span>
                  ))}
                  {template.variables.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                      +{template.variables.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                  Edit Template
                </button>
                <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                  Test Send
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderProviderSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Provider Settings</h2>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-gray-700">Email Provider:</label>
          <select
            value={emailProvider}
            onChange={(e) => setEmailProvider(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="gmail">Gmail API</option>
            <option value="sendgrid">SendGrid</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gmail Configuration */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Gmail API Configuration</h3>
            <div className={`w-3 h-3 rounded-full ${providerConfig.gmail.configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client ID</label>
              <input
                type="text"
                placeholder="Your Gmail API Client ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={providerConfig.gmail.clientId}
                onChange={(e) => setProviderConfig(prev => ({
                  ...prev,
                  gmail: { ...prev.gmail, clientId: e.target.value }
                }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client Secret</label>
              <input
                type="password"
                placeholder="Your Gmail API Client Secret"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={providerConfig.gmail.clientSecret}
                onChange={(e) => setProviderConfig(prev => ({
                  ...prev,
                  gmail: { ...prev.gmail, clientSecret: e.target.value }
                }))}
              />
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md">
              <h4 className="font-medium text-blue-900 mb-2">Setup Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Go to Google Cloud Console</li>
                <li>2. Create a new project or select existing</li>
                <li>3. Enable Gmail API</li>
                <li>4. Create OAuth 2.0 credentials</li>
                <li>5. Add your domain to authorized origins</li>
              </ol>
            </div>
            
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Test Gmail Connection
            </button>
          </div>
        </div>

        {/* SendGrid Configuration */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">SendGrid Configuration</h3>
            <div className={`w-3 h-3 rounded-full ${providerConfig.sendgrid.configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key</label>
              <input
                type="password"
                placeholder="Your SendGrid API Key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={providerConfig.sendgrid.apiKey}
                onChange={(e) => setProviderConfig(prev => ({
                  ...prev,
                  sendgrid: { ...prev.sendgrid, apiKey: e.target.value }
                }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Email</label>
              <input
                type="email"
                placeholder="noreply@dankdash.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={providerConfig.sendgrid.fromEmail}
                onChange={(e) => setProviderConfig(prev => ({
                  ...prev,
                  sendgrid: { ...prev.sendgrid, fromEmail: e.target.value }
                }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
              <input
                type="text"
                placeholder="DankDash"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={providerConfig.sendgrid.fromName}
                onChange={(e) => setProviderConfig(prev => ({
                  ...prev,
                  sendgrid: { ...prev.sendgrid, fromName: e.target.value }
                }))}
              />
            </div>
            
            <div className="bg-green-50 p-4 rounded-md">
              <h4 className="font-medium text-green-900 mb-2">AI Automation Features:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Advanced analytics and tracking</li>
                <li>• A/B testing capabilities</li>
                <li>• Webhook support for AI feedback</li>
                <li>• Dynamic content generation</li>
                <li>• Automated campaign optimization</li>
              </ul>
            </div>
            
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Test SendGrid Connection
            </button>
          </div>
        </div>

        {/* Twilio Configuration */}
        <div className="bg-white p-6 rounded-lg shadow-sm border lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Twilio SMS Configuration</h3>
            <div className={`w-3 h-3 rounded-full ${providerConfig.twilio.configured ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account SID</label>
              <input
                type="text"
                placeholder="Your Twilio Account SID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={providerConfig.twilio.accountSid}
                onChange={(e) => setProviderConfig(prev => ({
                  ...prev,
                  twilio: { ...prev.twilio, accountSid: e.target.value }
                }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Auth Token</label>
              <input
                type="password"
                placeholder="Your Twilio Auth Token"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={providerConfig.twilio.authToken}
                onChange={(e) => setProviderConfig(prev => ({
                  ...prev,
                  twilio: { ...prev.twilio, authToken: e.target.value }
                }))}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Number</label>
              <input
                type="tel"
                placeholder="+1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={providerConfig.twilio.fromNumber}
                onChange={(e) => setProviderConfig(prev => ({
                  ...prev,
                  twilio: { ...prev.twilio, fromNumber: e.target.value }
                }))}
              />
            </div>
          </div>
          
          <div className="mt-4 bg-purple-50 p-4 rounded-md">
            <h4 className="font-medium text-purple-900 mb-2">SMS Features:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800">
              <ul className="space-y-1">
                <li>• Instant delivery notifications</li>
                <li>• Driver assignment alerts</li>
                <li>• Order status updates</li>
              </ul>
              <ul className="space-y-1">
                <li>• Emergency notifications</li>
                <li>• Delivery confirmations</li>
                <li>• Customer support alerts</li>
              </ul>
            </div>
          </div>
          
          <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Test Twilio Connection
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notification System</h1>
          <p className="mt-2 text-gray-600">Automated email and SMS notifications for all stakeholders</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: TrendingUp },
              { id: 'notifications', name: 'Notifications', icon: Bell },
              { id: 'templates', name: 'Templates', icon: Mail },
              { id: 'settings', name: 'Provider Settings', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'notifications' && renderNotifications()}
        {activeTab === 'templates' && renderTemplates()}
        {activeTab === 'settings' && renderProviderSettings()}
      </div>
    </div>
  );
};

export default NotificationSystem;

