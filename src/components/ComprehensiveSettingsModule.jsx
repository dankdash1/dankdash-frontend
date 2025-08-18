import React, { useState, useEffect } from 'react';
import { 
  Settings, Save, Package, Scale, Bell, Palette, Shield, 
  DollarSign, MapPin, Users, Phone, Mail, MessageSquare,
  Leaf, Cookie, Droplets, Cigarette, Zap, Volume2
} from 'lucide-react';

const ComprehensiveSettingsModule = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [settings, setSettings] = useState({
    // Product Categories & Weights
    productCategories: [
      { id: 'flower', name: 'Flower', icon: Leaf, enabled: true, taxRate: 8.75 },
      { id: 'edibles', name: 'Edibles', icon: Cookie, enabled: true, taxRate: 8.75 },
      { id: 'concentrates', name: 'Concentrates', icon: Droplets, enabled: true, taxRate: 8.75 },
      { id: 'vapes', name: 'Vapes', icon: Zap, enabled: true, taxRate: 8.75 },
      { id: 'prerolls', name: 'Pre-rolls', icon: Cigarette, enabled: true, taxRate: 8.75 },
      { id: 'blunts', name: 'Blunts', icon: Cigarette, enabled: true, taxRate: 8.75 },
      { id: 'infused_prerolls', name: 'Infused Pre-rolls', icon: Cigarette, enabled: true, taxRate: 8.75 },
      { id: 'infused_blunts', name: 'Infused Blunts', icon: Cigarette, enabled: true, taxRate: 8.75 }
    ],
    
    // Cannabis Weight Options
    weightOptions: [
      { id: '3.5g', name: '3.5 grams (Eighth)', grams: 3.5, multiplier: 1.0, enabled: true },
      { id: '7g', name: '7 grams (Quarter)', grams: 7, multiplier: 1.8, enabled: true },
      { id: '14g', name: '14 grams (Half Ounce)', grams: 14, multiplier: 3.4, enabled: true },
      { id: '28g', name: '28 grams (Ounce)', grams: 28, multiplier: 6.5, enabled: true },
      { id: '112g', name: '112 grams (Quarter Pound)', grams: 112, multiplier: 24, enabled: true },
      { id: '224g', name: '224 grams (Half Pound)', grams: 224, multiplier: 45, enabled: true },
      { id: '448g', name: '448 grams (Pound)', grams: 448, multiplier: 85, enabled: true }
    ],
    
    // Notification Preferences
    notifications: {
      email: { enabled: true, provider: 'gmail' },
      sms: { enabled: true, provider: 'twilio' },
      voice: { enabled: true, provider: 'twilio' },
      orderConfirmations: { email: true, sms: false, voice: false },
      driverAlerts: { email: false, sms: true, voice: true },
      adminAlerts: { email: true, sms: true, voice: false },
      marketingEmails: { email: true, sms: false, voice: false }
    },
    
    // System Modules
    modules: {
      crm: { enabled: true, name: 'Customer Relationship Management' },
      inventory: { enabled: true, name: 'Inventory Management' },
      pos: { enabled: true, name: 'Point of Sale' },
      delivery: { enabled: true, name: 'Delivery Management' },
      shipping: { enabled: true, name: 'Shipping & Logistics' },
      accounting: { enabled: true, name: 'Accounting & Finance' },
      marketing: { enabled: true, name: 'Email Marketing' },
      analytics: { enabled: true, name: 'Analytics & Reporting' },
      compliance: { enabled: true, name: 'Compliance & METRC' },
      partners: { enabled: true, name: 'Partner Management' }
    },
    
    // Business Settings
    business: {
      name: 'DankDash',
      address: '123 Cannabis St, Los Angeles, CA 90210',
      phone: '(555) 420-DANK',
      email: 'info@dankdash.com',
      license: 'CA-LICENSE-123456',
      taxId: '12-3456789',
      deliveryRadius: 25,
      minimumOrder: 25.00,
      deliveryFee: 5.00,
      freeDeliveryThreshold: 75.00
    },
    
    // Payment Settings
    payments: {
      creditCard: { enabled: true, processor: 'stripe' },
      debitCard: { enabled: true, processor: 'stripe' },
      cash: { enabled: true, processor: 'manual' },
      canpay: { enabled: false, processor: 'canpay' },
      aeropay: { enabled: false, processor: 'aeropay' },
      cryptocurrency: { enabled: false, processor: 'coinbase' }
    }
  });

  const [voiceSettings, setVoiceSettings] = useState({
    enabled: true,
    voice: 'alice',
    language: 'en-US',
    orderConfirmations: true,
    driverDispatch: true,
    customerSupport: true,
    emergencyAlerts: true
  });

  const tabs = [
    { id: 'products', name: 'Products & Categories', icon: Package },
    { id: 'weights', name: 'Weights & Pricing', icon: Scale },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'voice', name: 'Voice AI', icon: Volume2 },
    { id: 'modules', name: 'System Modules', icon: Settings },
    { id: 'business', name: 'Business Info', icon: MapPin },
    { id: 'payments', name: 'Payment Methods', icon: DollarSign },
    { id: 'branding', name: 'Branding', icon: Palette }
  ];

  const handleSaveSettings = () => {
    localStorage.setItem('dankdash_settings', JSON.stringify(settings));
    localStorage.setItem('dankdash_voice_settings', JSON.stringify(voiceSettings));
    alert('Settings saved successfully!');
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const updateProductCategory = (categoryId, field, value) => {
    setSettings(prev => ({
      ...prev,
      productCategories: prev.productCategories.map(cat =>
        cat.id === categoryId ? { ...cat, [field]: value } : cat
      )
    }));
  };

  const updateWeightOption = (weightId, field, value) => {
    setSettings(prev => ({
      ...prev,
      weightOptions: prev.weightOptions.map(weight =>
        weight.id === weightId ? { ...weight, [field]: value } : weight
      )
    }));
  };

  const renderProductsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Package className="mr-2 h-5 w-5" />
          Cannabis Product Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.productCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <IconComponent className="h-5 w-5 mr-2 text-green-600" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={category.enabled}
                      onChange={(e) => updateProductCategory(category.id, 'enabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={category.taxRate}
                      onChange={(e) => updateProductCategory(category.id, 'taxRate', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderWeightsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Scale className="mr-2 h-5 w-5" />
          Cannabis Weight Options & Pricing
        </h3>
        <div className="space-y-4">
          {settings.weightOptions.map((weight) => (
            <div key={weight.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-medium">{weight.name}</span>
                  <span className="text-gray-500 ml-2">({weight.grams}g)</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weight.enabled}
                    onChange={(e) => updateWeightOption(weight.id, 'enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Multiplier
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight.multiplier}
                    onChange={(e) => updateWeightOption(weight.id, 'multiplier', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Grams
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight.grams}
                    onChange={(e) => updateWeightOption(weight.id, 'grams', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notification Preferences
        </h3>
        
        {/* Notification Providers */}
        <div className="mb-6">
          <h4 className="font-medium mb-3">Notification Providers</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">Email</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.email.enabled}
                    onChange={(e) => updateSetting('notifications', 'email', { ...settings.notifications.email, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <select
                value={settings.notifications.email.provider}
                onChange={(e) => updateSetting('notifications', 'email', { ...settings.notifications.email, provider: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="gmail">Gmail API</option>
                <option value="sendgrid">SendGrid</option>
              </select>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
                  <span className="font-medium">SMS</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.sms.enabled}
                    onChange={(e) => updateSetting('notifications', 'sms', { ...settings.notifications.sms, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <select
                value={settings.notifications.sms.provider}
                onChange={(e) => updateSetting('notifications', 'sms', { ...settings.notifications.sms, provider: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="twilio">Twilio</option>
              </select>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-purple-600" />
                  <span className="font-medium">Voice Calls</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifications.voice.enabled}
                    onChange={(e) => updateSetting('notifications', 'voice', { ...settings.notifications.voice, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <select
                value={settings.notifications.voice.provider}
                onChange={(e) => updateSetting('notifications', 'voice', { ...settings.notifications.voice, provider: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="twilio">Twilio Voice</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h4 className="font-medium mb-3">Notification Types</h4>
          <div className="space-y-4">
            {Object.entries(settings.notifications).filter(([key]) => !['email', 'sms', 'voice'].includes(key)).map(([key, value]) => (
              <div key={key} className="border rounded-lg p-4">
                <h5 className="font-medium mb-3 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h5>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value.email}
                      onChange={(e) => updateSetting('notifications', key, { ...value, email: e.target.checked })}
                      className="mr-2"
                    />
                    Email
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value.sms}
                      onChange={(e) => updateSetting('notifications', key, { ...value, sms: e.target.checked })}
                      className="mr-2"
                    />
                    SMS
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value.voice}
                      onChange={(e) => updateSetting('notifications', key, { ...value, voice: e.target.checked })}
                      className="mr-2"
                    />
                    Voice Call
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderVoiceTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Volume2 className="mr-2 h-5 w-5" />
          Voice AI Settings
        </h3>
        
        <div className="space-y-6">
          {/* Voice AI Enable/Disable */}
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Enable Voice AI</h4>
              <p className="text-sm text-gray-600">Automated voice calls for notifications and customer service</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={voiceSettings.enabled}
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, enabled: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {/* Voice Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Voice Type
              </label>
              <select
                value={voiceSettings.voice}
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="alice">Alice (Female, Professional)</option>
                <option value="man">Man (Male, Clear)</option>
                <option value="woman">Woman (Female, Friendly)</option>
                <option value="polly.joanna">Joanna (Neural, Natural)</option>
                <option value="polly.matthew">Matthew (Neural, Professional)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={voiceSettings.language}
                onChange={(e) => setVoiceSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="en-US">English (US)</option>
                <option value="en-GB">English (UK)</option>
                <option value="es-US">Spanish (US)</option>
                <option value="es-ES">Spanish (Spain)</option>
                <option value="fr-FR">French</option>
              </select>
            </div>
          </div>

          {/* Voice AI Use Cases */}
          <div>
            <h4 className="font-medium mb-3">Voice AI Use Cases</h4>
            <div className="space-y-3">
              {[
                { key: 'orderConfirmations', label: 'Order Confirmations', desc: 'Call customers to confirm their orders' },
                { key: 'driverDispatch', label: 'Driver Dispatch', desc: 'Voice instructions for delivery drivers' },
                { key: 'customerSupport', label: 'Customer Support', desc: 'Automated customer service calls' },
                { key: 'emergencyAlerts', label: 'Emergency Alerts', desc: 'Critical system notifications via voice' }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <span className="font-medium">{item.label}</span>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={voiceSettings[item.key]}
                      onChange={(e) => setVoiceSettings(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Voice AI Preview */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Voice AI Preview</h4>
            <p className="text-sm text-gray-600 mb-3">
              Test how your voice AI will sound to customers and drivers
            </p>
            <div className="space-y-2">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 mr-2">
                Test Order Confirmation
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 mr-2">
                Test Driver Dispatch
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                Test Customer Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModulesTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          System Modules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.modules).map(([key, module]) => (
            <div key={key} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{module.name}</span>
                  <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={module.enabled}
                    onChange={(e) => updateSetting('modules', key, { ...module, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBusinessTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin className="mr-2 h-5 w-5" />
          Business Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.business).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type={typeof value === 'number' ? 'number' : 'text'}
                step={typeof value === 'number' ? '0.01' : undefined}
                value={value}
                onChange={(e) => updateSetting('business', key, typeof value === 'number' ? parseFloat(e.target.value) : e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPaymentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <DollarSign className="mr-2 h-5 w-5" />
          Payment Methods
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.payments).map(([key, payment]) => (
            <div key={key} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={payment.enabled}
                    onChange={(e) => updateSetting('payments', key, { ...payment, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Processor
                </label>
                <select
                  value={payment.processor}
                  onChange={(e) => updateSetting('payments', key, { ...payment, processor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="stripe">Stripe</option>
                  <option value="square">Square</option>
                  <option value="canpay">CanPay</option>
                  <option value="aeropay">AeroPay</option>
                  <option value="coinbase">Coinbase</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBrandingTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Palette className="mr-2 h-5 w-5" />
          Branding & Customization
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-2">Upload your company logo</p>
                <p className="text-sm text-gray-400">PNG, JPG up to 2MB</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <input
                type="color"
                defaultValue="#10b981"
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <input
                type="color"
                defaultValue="#059669"
                className="w-full h-10 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom CSS
            </label>
            <textarea
              rows="6"
              placeholder="Add custom CSS to override default styles..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">System Settings</h1>
          <p className="text-gray-600">Configure your DankDash platform settings and preferences</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="mr-2 h-4 w-4" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === 'products' && renderProductsTab()}
          {activeTab === 'weights' && renderWeightsTab()}
          {activeTab === 'notifications' && renderNotificationsTab()}
          {activeTab === 'voice' && renderVoiceTab()}
          {activeTab === 'modules' && renderModulesTab()}
          {activeTab === 'business' && renderBusinessTab()}
          {activeTab === 'payments' && renderPaymentsTab()}
          {activeTab === 'branding' && renderBrandingTab()}
        </div>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSaveSettings}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 flex items-center"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveSettingsModule;

