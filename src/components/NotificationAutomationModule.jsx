import React, { useState, useEffect } from 'react';
import { useIntegration } from './IntegrationHub';

const NotificationAutomationModule = () => {
  const { state: integrationState, workflows, dispatch, INTEGRATION_ACTIONS } = useIntegration();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [automationRules, setAutomationRules] = useState([]);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [showCreateRule, setShowCreateRule] = useState(false);

  // Form states
  const [templateForm, setTemplateForm] = useState({
    name: '',
    type: 'sms',
    subject: '',
    content: '',
    variables: [],
    category: 'order'
  });

  const [ruleForm, setRuleForm] = useState({
    name: '',
    trigger: 'order_placed',
    conditions: [],
    actions: [],
    enabled: true
  });

  // Initialize with default templates and rules
  useEffect(() => {
    const defaultTemplates = [
      {
        id: 'TPL-001',
        name: 'Order Confirmation',
        type: 'sms',
        subject: 'Order Confirmed',
        content: 'Hi {{customerName}}, your order {{orderId}} for ${{total}} has been confirmed. Estimated delivery: {{estimatedDelivery}}. Track your order: {{trackingLink}}',
        variables: ['customerName', 'orderId', 'total', 'estimatedDelivery', 'trackingLink'],
        category: 'order',
        status: 'active',
        createdAt: '2024-08-14'
      },
      {
        id: 'TPL-002',
        name: 'Driver Assigned',
        type: 'sms',
        subject: 'Driver Assigned',
        content: 'Great news {{customerName}}! Your order {{orderId}} has been assigned to driver {{driverName}}. They will arrive in approximately {{eta}} minutes.',
        variables: ['customerName', 'orderId', 'driverName', 'eta'],
        category: 'delivery',
        status: 'active',
        createdAt: '2024-08-14'
      },
      {
        id: 'TPL-003',
        name: 'Out for Delivery',
        type: 'sms',
        subject: 'Out for Delivery',
        content: 'Your order {{orderId}} is out for delivery! Driver {{driverName}} is on the way. Live tracking: {{trackingLink}}',
        variables: ['orderId', 'driverName', 'trackingLink'],
        category: 'delivery',
        status: 'active',
        createdAt: '2024-08-14'
      },
      {
        id: 'TPL-004',
        name: 'Delivery Completed',
        type: 'sms',
        subject: 'Delivery Completed',
        content: 'Your order {{orderId}} has been delivered! Thank you for choosing us. Rate your experience: {{ratingLink}}',
        variables: ['orderId', 'ratingLink'],
        category: 'delivery',
        status: 'active',
        createdAt: '2024-08-14'
      },
      {
        id: 'TPL-005',
        name: 'Low Stock Alert',
        type: 'email',
        subject: 'Low Stock Alert - {{productName}}',
        content: 'Alert: {{productName}} (SKU: {{sku}}) is running low. Current stock: {{currentStock}} units. Minimum threshold: {{minStock}} units. Please reorder soon.',
        variables: ['productName', 'sku', 'currentStock', 'minStock'],
        category: 'inventory',
        status: 'active',
        createdAt: '2024-08-14'
      },
      {
        id: 'TPL-006',
        name: 'Welcome New Customer',
        type: 'email',
        subject: 'Welcome to DankDash!',
        content: 'Welcome {{customerName}}! Thank you for joining DankDash. Use code WELCOME10 for 10% off your first order. Browse our products: {{catalogLink}}',
        variables: ['customerName', 'catalogLink'],
        category: 'customer',
        status: 'active',
        createdAt: '2024-08-14'
      }
    ];

    const defaultRules = [
      {
        id: 'RULE-001',
        name: 'Order Confirmation SMS',
        trigger: 'order_placed',
        conditions: [
          { field: 'orderTotal', operator: 'greater_than', value: 0 }
        ],
        actions: [
          { type: 'send_sms', templateId: 'TPL-001', delay: 0 }
        ],
        enabled: true,
        createdAt: '2024-08-14',
        lastTriggered: null,
        triggerCount: 0
      },
      {
        id: 'RULE-002',
        name: 'Driver Assignment Notification',
        trigger: 'driver_assigned',
        conditions: [],
        actions: [
          { type: 'send_sms', templateId: 'TPL-002', delay: 0 }
        ],
        enabled: true,
        createdAt: '2024-08-14',
        lastTriggered: null,
        triggerCount: 0
      },
      {
        id: 'RULE-003',
        name: 'Delivery Status Updates',
        trigger: 'delivery_status_changed',
        conditions: [
          { field: 'status', operator: 'equals', value: 'out_for_delivery' }
        ],
        actions: [
          { type: 'send_sms', templateId: 'TPL-003', delay: 0 }
        ],
        enabled: true,
        createdAt: '2024-08-14',
        lastTriggered: null,
        triggerCount: 0
      },
      {
        id: 'RULE-004',
        name: 'Delivery Completion',
        trigger: 'delivery_completed',
        conditions: [],
        actions: [
          { type: 'send_sms', templateId: 'TPL-004', delay: 5 }
        ],
        enabled: true,
        createdAt: '2024-08-14',
        lastTriggered: null,
        triggerCount: 0
      },
      {
        id: 'RULE-005',
        name: 'Low Stock Alerts',
        trigger: 'inventory_low',
        conditions: [
          { field: 'stockLevel', operator: 'less_than_equal', value: 'minThreshold' }
        ],
        actions: [
          { type: 'send_email', templateId: 'TPL-005', delay: 0, recipients: ['inventory@dankdash.com'] }
        ],
        enabled: true,
        createdAt: '2024-08-14',
        lastTriggered: null,
        triggerCount: 0
      }
    ];

    setTemplates(defaultTemplates);
    setAutomationRules(defaultRules);
  }, []);

  // Listen for integration events to trigger notifications
  useEffect(() => {
    const handleIntegrationEvent = (event) => {
      automationRules.forEach(rule => {
        if (rule.enabled && rule.trigger === event.type) {
          const conditionsMet = rule.conditions.every(condition => {
            return evaluateCondition(condition, event.data);
          });

          if (conditionsMet) {
            executeRuleActions(rule, event.data);
          }
        }
      });
    };

    // Subscribe to integration events
    if (integrationState.events) {
      integrationState.events.forEach(handleIntegrationEvent);
    }
  }, [integrationState.events, automationRules]);

  const evaluateCondition = (condition, data) => {
    const value = data[condition.field];
    const targetValue = condition.value;

    switch (condition.operator) {
      case 'equals':
        return value === targetValue;
      case 'not_equals':
        return value !== targetValue;
      case 'greater_than':
        return parseFloat(value) > parseFloat(targetValue);
      case 'less_than':
        return parseFloat(value) < parseFloat(targetValue);
      case 'greater_than_equal':
        return parseFloat(value) >= parseFloat(targetValue);
      case 'less_than_equal':
        return parseFloat(value) <= parseFloat(targetValue);
      case 'contains':
        return String(value).toLowerCase().includes(String(targetValue).toLowerCase());
      default:
        return false;
    }
  };

  const executeRuleActions = async (rule, eventData) => {
    for (const action of rule.actions) {
      try {
        if (action.delay > 0) {
          setTimeout(() => executeAction(action, eventData, rule), action.delay * 1000);
        } else {
          await executeAction(action, eventData, rule);
        }
      } catch (error) {
        console.error('Error executing action:', error);
      }
    }

    // Update rule statistics
    const updatedRules = automationRules.map(r => 
      r.id === rule.id 
        ? { 
            ...r, 
            lastTriggered: new Date().toISOString(),
            triggerCount: r.triggerCount + 1
          }
        : r
    );
    setAutomationRules(updatedRules);
  };

  const executeAction = async (action, eventData, rule) => {
    const template = templates.find(t => t.id === action.templateId);
    if (!template) return;

    const personalizedContent = personalizeTemplate(template, eventData);
    
    const notification = {
      id: `NOT-${Date.now()}`,
      type: action.type,
      recipient: eventData.customerPhone || eventData.customerEmail || action.recipients?.[0],
      subject: personalizedContent.subject,
      content: personalizedContent.content,
      templateId: template.id,
      ruleId: rule.id,
      status: 'sent',
      sentAt: new Date().toISOString(),
      eventData: eventData
    };

    // Simulate sending notification
    await sendNotification(notification);
    
    setNotifications(prev => [notification, ...prev]);
  };

  const personalizeTemplate = (template, data) => {
    let content = template.content;
    let subject = template.subject;

    template.variables.forEach(variable => {
      const value = data[variable] || `{{${variable}}}`;
      content = content.replace(new RegExp(`{{${variable}}}`, 'g'), value);
      subject = subject.replace(new RegExp(`{{${variable}}}`, 'g'), value);
    });

    return { content, subject };
  };

  const sendNotification = async (notification) => {
    // Simulate API call to send notification
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`${notification.type.toUpperCase()} sent to ${notification.recipient}:`, notification.content);
        resolve();
      }, 100);
    });
  };

  const handleCreateTemplate = () => {
    if (!templateForm.name || !templateForm.content) {
      alert('Please fill in required fields');
      return;
    }

    const newTemplate = {
      id: `TPL-${String(templates.length + 1).padStart(3, '0')}`,
      ...templateForm,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setTemplates([...templates, newTemplate]);
    setTemplateForm({
      name: '',
      type: 'sms',
      subject: '',
      content: '',
      variables: [],
      category: 'order'
    });
    setShowCreateTemplate(false);
    alert('Template created successfully!');
  };

  const handleCreateRule = () => {
    if (!ruleForm.name || !ruleForm.trigger) {
      alert('Please fill in required fields');
      return;
    }

    const newRule = {
      id: `RULE-${String(automationRules.length + 1).padStart(3, '0')}`,
      ...ruleForm,
      createdAt: new Date().toISOString().split('T')[0],
      lastTriggered: null,
      triggerCount: 0
    };

    setAutomationRules([...automationRules, newRule]);
    setRuleForm({
      name: '',
      trigger: 'order_placed',
      conditions: [],
      actions: [],
      enabled: true
    });
    setShowCreateRule(false);
    alert('Automation rule created successfully!');
  };

  const toggleRuleStatus = (ruleId) => {
    const updatedRules = automationRules.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    );
    setAutomationRules(updatedRules);
  };

  // Calculate statistics
  const stats = {
    totalNotifications: notifications.length,
    smsCount: notifications.filter(n => n.type === 'send_sms').length,
    emailCount: notifications.filter(n => n.type === 'send_email').length,
    activeRules: automationRules.filter(r => r.enabled).length,
    totalTemplates: templates.length
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Notification Automation</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCreateTemplate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Create Template
          </button>
          <button
            onClick={() => setShowCreateRule(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Create Rule
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {['dashboard', 'notifications', 'templates', 'rules'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.totalNotifications}</div>
              <div className="text-sm text-gray-600">Total Notifications</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.smsCount}</div>
              <div className="text-sm text-gray-600">SMS Sent</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.emailCount}</div>
              <div className="text-sm text-gray-600">Emails Sent</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{stats.activeRules}</div>
              <div className="text-sm text-gray-600">Active Rules</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{stats.totalTemplates}</div>
              <div className="text-sm text-gray-600">Templates</div>
            </div>
          </div>

          {/* Recent Notifications */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Recent Notifications</h3>
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notifications sent yet. Automation rules will trigger notifications based on system events.
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.slice(0, 5).map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-3 bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{notification.subject}</div>
                        <div className="text-sm text-gray-600">{notification.recipient}</div>
                        <div className="text-sm text-gray-500 mt-1">{notification.content}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          notification.type === 'send_sms' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {notification.type === 'send_sms' ? 'SMS' : 'Email'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(notification.sentAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Automation Rules */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Active Automation Rules</h3>
            <div className="space-y-2">
              {automationRules.filter(rule => rule.enabled).map((rule) => (
                <div key={rule.id} className="flex justify-between items-center bg-white p-3 rounded border">
                  <div>
                    <div className="font-medium">{rule.name}</div>
                    <div className="text-sm text-gray-600">Trigger: {rule.trigger}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Triggered: {rule.triggerCount} times</div>
                    <div className="text-xs text-gray-500">
                      {rule.lastTriggered ? new Date(rule.lastTriggered).toLocaleString() : 'Never'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notification History</h3>
            <div className="text-sm text-gray-600">
              Total: {notifications.length} notifications
            </div>
          </div>
          
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No notifications sent yet.
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{notification.subject}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          notification.type === 'send_sms' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {notification.type === 'send_sms' ? 'SMS' : 'Email'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">To: {notification.recipient}</div>
                      <div className="text-sm text-gray-700 mt-2 bg-gray-50 p-2 rounded">
                        {notification.content}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600">
                        {new Date(notification.sentAt).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Rule: {notification.ruleId}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Message Templates</h3>
            <button
              onClick={() => setShowCreateTemplate(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Create Template
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold">{template.name}</div>
                    <div className="text-sm text-gray-600">{template.category} • {template.type}</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    template.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {template.status}
                  </div>
                </div>
                
                {template.subject && (
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    Subject: {template.subject}
                  </div>
                )}
                
                <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded mb-2">
                  {template.content}
                </div>
                
                <div className="text-xs text-gray-500">
                  Variables: {template.variables.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Automation Rules</h3>
            <button
              onClick={() => setShowCreateRule(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Create Rule
            </button>
          </div>
          
          <div className="space-y-3">
            {automationRules.map((rule) => (
              <div key={rule.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{rule.name}</span>
                      <button
                        onClick={() => toggleRuleStatus(rule.id)}
                        className={`text-xs px-2 py-1 rounded-full ${
                          rule.enabled 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {rule.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-600 mt-1">
                      Trigger: <span className="font-medium">{rule.trigger}</span>
                    </div>
                    
                    {rule.conditions.length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">
                        Conditions: {rule.conditions.map(c => `${c.field} ${c.operator} ${c.value}`).join(', ')}
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-600 mt-1">
                      Actions: {rule.actions.map(a => `${a.type} (${a.templateId})`).join(', ')}
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-sm text-gray-600">
                      Triggered: {rule.triggerCount} times
                    </div>
                    <div className="text-xs text-gray-500">
                      Last: {rule.lastTriggered ? new Date(rule.lastTriggered).toLocaleString() : 'Never'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create Message Template</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Template Name</label>
                <input
                  type="text"
                  value={templateForm.name}
                  onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter template name"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={templateForm.type}
                    onChange={(e) => setTemplateForm({...templateForm, type: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={templateForm.category}
                    onChange={(e) => setTemplateForm({...templateForm, category: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="order">Order</option>
                    <option value="delivery">Delivery</option>
                    <option value="customer">Customer</option>
                    <option value="inventory">Inventory</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>
              </div>
              
              {templateForm.type === 'email' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={templateForm.subject}
                    onChange={(e) => setTemplateForm({...templateForm, subject: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter email subject"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={templateForm.content}
                  onChange={(e) => setTemplateForm({...templateForm, content: e.target.value})}
                  className="w-full p-2 border rounded-lg h-32"
                  placeholder="Enter message content. Use {{variableName}} for dynamic content."
                />
              </div>
              
              <div className="text-sm text-gray-600">
                <strong>Available Variables:</strong> {{customerName}}, {{orderId}}, {{total}}, {{driverName}}, {{eta}}, {{trackingLink}}, {{productName}}, {{sku}}, {{currentStock}}, {{minStock}}
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowCreateTemplate(false)}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTemplate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Rule Modal */}
      {showCreateRule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Create Automation Rule</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rule Name</label>
                <input
                  type="text"
                  value={ruleForm.name}
                  onChange={(e) => setRuleForm({...ruleForm, name: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter rule name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trigger Event</label>
                <select
                  value={ruleForm.trigger}
                  onChange={(e) => setRuleForm({...ruleForm, trigger: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="order_placed">Order Placed</option>
                  <option value="driver_assigned">Driver Assigned</option>
                  <option value="delivery_status_changed">Delivery Status Changed</option>
                  <option value="delivery_completed">Delivery Completed</option>
                  <option value="inventory_low">Inventory Low</option>
                  <option value="customer_registered">Customer Registered</option>
                  <option value="payment_received">Payment Received</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={ruleForm.enabled}
                  onChange={(e) => setRuleForm({...ruleForm, enabled: e.target.checked})}
                  className="rounded"
                />
                <label className="text-sm font-medium text-gray-700">Enable this rule</label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowCreateRule(false)}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRule}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationAutomationModule;

