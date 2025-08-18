import React, { useState, useEffect } from 'react';

const SettingsModule = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'DankDash Cannabis Co.',
    businessType: 'Cannabis Dispensary',
    timezone: 'America/Los_Angeles',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    currency: 'USD',
    language: 'English',
    address: {
      street: '123 Cannabis Street',
      city: 'Los Angeles',
      state: 'California',
      zipCode: '90210',
      country: 'United States'
    },
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'info@dankdash.com',
      website: 'https://dankdash.com'
    },
    licenses: {
      retailLicense: 'C10-0000123-LIC',
      distributionLicense: 'C11-0000124-LIC',
      manufacturingLicense: 'C7-0000125-LIC'
    }
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expirationDays: 90
    },
    sessionTimeout: 30,
    loginAttempts: 5,
    ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
    auditLogging: true,
    dataEncryption: true,
    backupEncryption: true,
    sslRequired: true
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      enabled: true,
      orderNotifications: true,
      inventoryAlerts: true,
      complianceReminders: true,
      systemUpdates: false,
      marketingEmails: false
    },
    sms: {
      enabled: true,
      orderUpdates: true,
      deliveryAlerts: true,
      emergencyAlerts: true,
      marketingSMS: false
    },
    push: {
      enabled: true,
      realTimeAlerts: true,
      dailySummary: true,
      weeklyReports: false
    },
    slack: {
      enabled: false,
      webhook: '',
      channel: '#general'
    }
  });

  // Integration Settings State
  const [integrationSettings, setIntegrationSettings] = useState({
    metrc: {
      enabled: true,
      facilityLicense: 'C11-0000123-LIC',
      userApiKey: 'mtrc_xxxxxxxxxx',
      vendorApiKey: 'mtrc_yyyyyyyyyy',
      environment: 'production',
      syncInterval: 15
    },
    stripe: {
      enabled: true,
      publicKey: 'pk_live_xxxxxxxxxx',
      secretKey: 'sk_live_xxxxxxxxxx',
      webhookSecret: 'whsec_xxxxxxxxxx',
      currency: 'USD'
    },
    quickbooks: {
      enabled: true,
      companyId: 'QB123456789',
      accessToken: 'qb_xxxxxxxxxx',
      refreshToken: 'qb_yyyyyyyyyy',
      environment: 'production'
    },
    mailchimp: {
      enabled: false,
      apiKey: 'mc_xxxxxxxxxx',
      listId: 'abc123def456',
      dataCenter: 'us19'
    },
    twilio: {
      enabled: true,
      accountSid: 'ACxxxxxxxxxx',
      authToken: 'xxxxxxxxxx',
      phoneNumber: '+1234567890'
    }
  });

  // System Settings State
  const [systemSettings, setSystemSettings] = useState({
    maintenance: {
      enabled: false,
      message: 'System maintenance in progress. Please check back later.',
      allowedIPs: ['192.168.1.100']
    },
    performance: {
      cacheEnabled: true,
      cacheTTL: 3600,
      compressionEnabled: true,
      cdnEnabled: true,
      maxUploadSize: 50
    },
    backup: {
      enabled: true,
      frequency: 'daily',
      retention: 30,
      location: 'aws-s3',
      encryption: true
    },
    logging: {
      level: 'info',
      retention: 90,
      errorReporting: true,
      performanceMonitoring: true
    },
    api: {
      rateLimit: 1000,
      rateLimitWindow: 3600,
      corsEnabled: true,
      allowedOrigins: ['https://dankdash.com', 'https://app.dankdash.com']
    }
  });

  // Cannabis-specific Settings State
  const [cannabisSettings, setCannabisSettings] = useState({
    compliance: {
      trackingSystem: 'metrc',
      labTesting: true,
      childResistantPackaging: true,
      batchTracking: true,
      seedToSaleTracking: true
    },
    inventory: {
      lowStockThreshold: 10,
      expirationWarningDays: 30,
      batchSizeLimit: 1000,
      quarantinePeriod: 7
    },
    sales: {
      dailyLimit: 28.5,
      monthlyLimit: 1000,
      ageVerification: true,
      idScanning: true,
      taxCalculation: 'automatic'
    },
    delivery: {
      enabled: true,
      maxDistance: 25,
      deliveryFee: 5.00,
      minimumOrder: 25.00,
      trackingEnabled: true
    },
    growRoom: {
      environmentalMonitoring: true,
      automatedControls: true,
      alertThresholds: {
        temperature: { min: 65, max: 80 },
        humidity: { min: 45, max: 65 },
        co2: { min: 1000, max: 1500 }
      }
    }
  });

  const handleSettingChange = (category, path, value) => {
    setUnsavedChanges(true);
    
    switch (category) {
      case 'general':
        setGeneralSettings(prev => updateNestedObject(prev, path, value));
        break;
      case 'security':
        setSecuritySettings(prev => updateNestedObject(prev, path, value));
        break;
      case 'notifications':
        setNotificationSettings(prev => updateNestedObject(prev, path, value));
        break;
      case 'integrations':
        setIntegrationSettings(prev => updateNestedObject(prev, path, value));
        break;
      case 'system':
        setSystemSettings(prev => updateNestedObject(prev, path, value));
        break;
      case 'cannabis':
        setCannabisSettings(prev => updateNestedObject(prev, path, value));
        break;
    }
  };

  const updateNestedObject = (obj, path, value) => {
    const keys = path.split('.');
    const newObj = { ...obj };
    let current = newObj;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] };
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    return newObj;
  };

  const saveSettings = () => {
    // Simulate API call
    setTimeout(() => {
      setUnsavedChanges(false);
      setShowSaveModal(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={generalSettings.companyName}
              onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <select
              value={generalSettings.businessType}
              onChange={(e) => handleSettingChange('general', 'businessType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Cannabis Dispensary">Cannabis Dispensary</option>
              <option value="Cannabis Delivery">Cannabis Delivery</option>
              <option value="Cannabis Cultivation">Cannabis Cultivation</option>
              <option value="Cannabis Manufacturing">Cannabis Manufacturing</option>
              <option value="Cannabis Distribution">Cannabis Distribution</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
            <select
              value={generalSettings.timezone}
              onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/New_York">Eastern Time</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              value={generalSettings.currency}
              onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Business Address</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
            <input
              type="text"
              value={generalSettings.address.street}
              onChange={(e) => handleSettingChange('general', 'address.street', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
            <input
              type="text"
              value={generalSettings.address.city}
              onChange={(e) => handleSettingChange('general', 'address.city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
            <input
              type="text"
              value={generalSettings.address.state}
              onChange={(e) => handleSettingChange('general', 'address.state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Cannabis Licenses</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Retail License</label>
            <input
              type="text"
              value={generalSettings.licenses.retailLicense}
              onChange={(e) => handleSettingChange('general', 'licenses.retailLicense', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Distribution License</label>
            <input
              type="text"
              value={generalSettings.licenses.distributionLicense}
              onChange={(e) => handleSettingChange('general', 'licenses.distributionLicense', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Authentication & Access</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Require 2FA for all admin users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Password Policy</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Length</label>
                <input
                  type="number"
                  value={securitySettings.passwordPolicy.minLength}
                  onChange={(e) => handleSettingChange('security', 'passwordPolicy.minLength', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiration (days)</label>
                <input
                  type="number"
                  value={securitySettings.passwordPolicy.expirationDays}
                  onChange={(e) => handleSettingChange('security', 'passwordPolicy.expirationDays', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              {[
                { key: 'requireUppercase', label: 'Require uppercase letters' },
                { key: 'requireLowercase', label: 'Require lowercase letters' },
                { key: 'requireNumbers', label: 'Require numbers' },
                { key: 'requireSpecialChars', label: 'Require special characters' }
              ].map((item) => (
                <label key={item.key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securitySettings.passwordPolicy[item.key]}
                    onChange={(e) => handleSettingChange('security', `passwordPolicy.${item.key}`, e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Security</h3>
        
        <div className="space-y-4">
          {[
            { key: 'auditLogging', label: 'Audit Logging', description: 'Log all user actions and system events' },
            { key: 'dataEncryption', label: 'Data Encryption', description: 'Encrypt sensitive data at rest' },
            { key: 'backupEncryption', label: 'Backup Encryption', description: 'Encrypt all backup files' },
            { key: 'sslRequired', label: 'SSL Required', description: 'Force HTTPS for all connections' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-semibold text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings[item.key]}
                  onChange={(e) => handleSettingChange('security', item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {['email', 'sms', 'push'].map((channel) => (
        <div key={channel} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 capitalize">{channel} Notifications</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings[channel].enabled}
                onChange={(e) => handleSettingChange('notifications', `${channel}.enabled`, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          {notificationSettings[channel].enabled && (
            <div className="space-y-3">
              {Object.entries(notificationSettings[channel])
                .filter(([key]) => key !== 'enabled')
                .map(([key, value]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={(e) => handleSettingChange('notifications', `${channel}.${key}`, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                  </label>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderIntegrationSettings = () => (
    <div className="space-y-6">
      {Object.entries(integrationSettings).map(([integration, settings]) => (
        <div key={integration} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-lg">
                  {integration === 'metrc' && '🌿'}
                  {integration === 'stripe' && '💳'}
                  {integration === 'quickbooks' && '📊'}
                  {integration === 'mailchimp' && '📧'}
                  {integration === 'twilio' && '📱'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 capitalize">{integration}</h3>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => handleSettingChange('integrations', `${integration}.enabled`, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          {settings.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(settings)
                .filter(([key]) => key !== 'enabled')
                .map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </label>
                    {typeof value === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleSettingChange('integrations', `${integration}.${key}`, e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    ) : typeof value === 'number' ? (
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleSettingChange('integrations', `${integration}.${key}`, parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleSettingChange('integrations', `${integration}.${key}`, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance & Caching</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-gray-900">Enable Caching</h4>
              <p className="text-sm text-gray-600">Improve performance with intelligent caching</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.performance.cacheEnabled}
                onChange={(e) => handleSettingChange('system', 'performance.cacheEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cache TTL (seconds)</label>
              <input
                type="number"
                value={systemSettings.performance.cacheTTL}
                onChange={(e) => handleSettingChange('system', 'performance.cacheTTL', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Upload Size (MB)</label>
              <input
                type="number"
                value={systemSettings.performance.maxUploadSize}
                onChange={(e) => handleSettingChange('system', 'performance.maxUploadSize', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Backup Configuration</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-gray-900">Automatic Backups</h4>
              <p className="text-sm text-gray-600">Automatically backup your data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={systemSettings.backup.enabled}
                onChange={(e) => handleSettingChange('system', 'backup.enabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
              <select
                value={systemSettings.backup.frequency}
                onChange={(e) => handleSettingChange('system', 'backup.frequency', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Retention (days)</label>
              <input
                type="number"
                value={systemSettings.backup.retention}
                onChange={(e) => handleSettingChange('system', 'backup.retention', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCannabisSettings = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Settings</h3>
        
        <div className="space-y-4">
          {[
            { key: 'labTesting', label: 'Lab Testing Required', description: 'Require lab testing for all products' },
            { key: 'childResistantPackaging', label: 'Child-Resistant Packaging', description: 'Enforce child-resistant packaging requirements' },
            { key: 'batchTracking', label: 'Batch Tracking', description: 'Track products by batch/lot numbers' },
            { key: 'seedToSaleTracking', label: 'Seed-to-Sale Tracking', description: 'Full supply chain tracking' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-semibold text-gray-900">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={cannabisSettings.compliance[item.key]}
                  onChange={(e) => handleSettingChange('cannabis', `compliance.${item.key}`, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales Limits</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Daily Limit (grams)</label>
            <input
              type="number"
              step="0.1"
              value={cannabisSettings.sales.dailyLimit}
              onChange={(e) => handleSettingChange('cannabis', 'sales.dailyLimit', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Limit (grams)</label>
            <input
              type="number"
              value={cannabisSettings.sales.monthlyLimit}
              onChange={(e) => handleSettingChange('cannabis', 'sales.monthlyLimit', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Grow Room Monitoring</h3>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold text-gray-900">Environmental Monitoring</h4>
              <p className="text-sm text-gray-600">Monitor temperature, humidity, and CO2 levels</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={cannabisSettings.growRoom.environmentalMonitoring}
                onChange={(e) => handleSettingChange('cannabis', 'growRoom.environmentalMonitoring', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Alert Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°F)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={cannabisSettings.growRoom.alertThresholds.temperature.min}
                    onChange={(e) => handleSettingChange('cannabis', 'growRoom.alertThresholds.temperature.min', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={cannabisSettings.growRoom.alertThresholds.temperature.max}
                    onChange={(e) => handleSettingChange('cannabis', 'growRoom.alertThresholds.temperature.max', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Humidity (%)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={cannabisSettings.growRoom.alertThresholds.humidity.min}
                    onChange={(e) => handleSettingChange('cannabis', 'growRoom.alertThresholds.humidity.min', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={cannabisSettings.growRoom.alertThresholds.humidity.max}
                    onChange={(e) => handleSettingChange('cannabis', 'growRoom.alertThresholds.humidity.max', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CO2 (ppm)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={cannabisSettings.growRoom.alertThresholds.co2.min}
                    onChange={(e) => handleSettingChange('cannabis', 'growRoom.alertThresholds.co2.min', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={cannabisSettings.growRoom.alertThresholds.co2.max}
                    onChange={(e) => handleSettingChange('cannabis', 'growRoom.alertThresholds.co2.max', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="mt-2 text-gray-600">Configure your DankDash system settings</p>
            </div>
            
            {unsavedChanges && (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-orange-600">Unsaved changes</span>
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'general', name: 'General', icon: '⚙️' },
              { id: 'security', name: 'Security', icon: '🔒' },
              { id: 'notifications', name: 'Notifications', icon: '🔔' },
              { id: 'integrations', name: 'Integrations', icon: '🔗' },
              { id: 'system', name: 'System', icon: '💻' },
              { id: 'cannabis', name: 'Cannabis', icon: '🌿' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
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
        {activeTab === 'general' && renderGeneralSettings()}
        {activeTab === 'security' && renderSecuritySettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'integrations' && renderIntegrationSettings()}
        {activeTab === 'system' && renderSystemSettings()}
        {activeTab === 'cannabis' && renderCannabisSettings()}
      </div>

      {/* Save Confirmation Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💾</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Save Settings</h3>
                  <p className="text-sm text-gray-600">Are you sure you want to save these changes?</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSaveModal(false)}
                  className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSettings}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsModule;

