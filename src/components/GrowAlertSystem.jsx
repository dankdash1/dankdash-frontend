import React, { useState, useEffect } from 'react';

const GrowAlertSystem = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      category: 'temperature',
      title: 'High Temperature Alert',
      message: 'Temperature has exceeded 82°F for 15 minutes. Immediate action required.',
      value: '82.4°F',
      threshold: '80°F',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      acknowledged: false,
      resolved: false,
      actions: ['Increase exhaust fan', 'Reduce light intensity', 'Check AC system'],
      location: 'Flower Room A'
    },
    {
      id: 2,
      type: 'warning',
      category: 'humidity',
      title: 'High Humidity Warning',
      message: 'Humidity levels approaching upper limit. Monitor closely.',
      value: '68%',
      threshold: '65%',
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      acknowledged: true,
      resolved: false,
      actions: ['Activate dehumidifier', 'Increase air circulation'],
      location: 'Veg Room B'
    },
    {
      id: 3,
      type: 'info',
      category: 'irrigation',
      title: 'Irrigation Cycle Complete',
      message: 'Scheduled irrigation cycle completed successfully.',
      value: '15 min',
      threshold: 'N/A',
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      acknowledged: true,
      resolved: true,
      actions: [],
      location: 'All Rooms'
    },
    {
      id: 4,
      type: 'warning',
      category: 'co2',
      title: 'Low CO2 Levels',
      message: 'CO2 levels below optimal range for current growth stage.',
      value: '850 ppm',
      threshold: '1000 ppm',
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
      acknowledged: false,
      resolved: false,
      actions: ['Check CO2 tank', 'Verify injection system', 'Adjust flow rate'],
      location: 'Flower Room A'
    }
  ]);

  const [alertSettings, setAlertSettings] = useState({
    email: {
      enabled: true,
      address: 'grower@dankdash.com',
      critical: true,
      warning: true,
      info: false
    },
    sms: {
      enabled: true,
      number: '+1 (555) 123-4567',
      critical: true,
      warning: false,
      info: false
    },
    phone: {
      enabled: false,
      number: '+1 (555) 123-4567',
      critical: true,
      warning: false,
      info: false
    },
    push: {
      enabled: true,
      critical: true,
      warning: true,
      info: true
    }
  });

  const [thresholds, setThresholds] = useState({
    temperature: {
      min: 65,
      max: 80,
      critical: 82,
      unit: '°F'
    },
    humidity: {
      min: 45,
      max: 65,
      critical: 70,
      unit: '%'
    },
    co2: {
      min: 1000,
      max: 1500,
      critical: 2000,
      unit: 'ppm'
    },
    ph: {
      min: 5.5,
      max: 6.5,
      critical: 7.0,
      unit: ''
    },
    ec: {
      min: 1.2,
      max: 2.0,
      critical: 2.5,
      unit: 'mS/cm'
    }
  });

  const [escalationRules, setEscalationRules] = useState([
    {
      id: 1,
      name: 'Critical Temperature',
      condition: 'Temperature > 82°F for 10 minutes',
      actions: [
        { delay: 0, action: 'Send SMS alert' },
        { delay: 5, action: 'Send email alert' },
        { delay: 15, action: 'Phone call alert' },
        { delay: 30, action: 'Emergency contact notification' }
      ],
      enabled: true
    },
    {
      id: 2,
      name: 'Equipment Failure',
      condition: 'Any equipment offline for 5 minutes',
      actions: [
        { delay: 0, action: 'Send push notification' },
        { delay: 2, action: 'Send SMS alert' },
        { delay: 10, action: 'Send email alert' }
      ],
      enabled: true
    },
    {
      id: 3,
      name: 'Power Outage',
      condition: 'Power loss detected',
      actions: [
        { delay: 0, action: 'Immediate phone call' },
        { delay: 0, action: 'Send SMS alert' },
        { delay: 1, action: 'Emergency contact notification' }
      ],
      enabled: true
    }
  ]);

  const acknowledgeAlert = (alertId) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, acknowledged: true, acknowledgedAt: new Date() }
          : alert
      )
    );
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId
          ? { ...alert, resolved: true, resolvedAt: new Date() }
          : alert
      )
    );
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-50';
      case 'warning': return 'border-yellow-500 bg-yellow-50';
      case 'info': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getAlertIcon = (category) => {
    switch (category) {
      case 'temperature': return '🌡️';
      case 'humidity': return '💧';
      case 'co2': return '🫧';
      case 'irrigation': return '💦';
      case 'lighting': return '💡';
      case 'power': return '⚡';
      case 'equipment': return '🔧';
      default: return '📊';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) {
      return `${minutes} min ago`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
  };

  const updateThreshold = (parameter, type, value) => {
    setThresholds(prev => ({
      ...prev,
      [parameter]: {
        ...prev[parameter],
        [type]: parseFloat(value)
      }
    }));
  };

  const updateAlertSetting = (channel, setting, value) => {
    setAlertSettings(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [setting]: value
      }
    }));
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const criticalAlerts = activeAlerts.filter(alert => alert.type === 'critical');
  const warningAlerts = activeAlerts.filter(alert => alert.type === 'warning');

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{activeAlerts.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-600 text-xl">🚨</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{criticalAlerts.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-xl">🔴</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{warningAlerts.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-xl">⚠️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Alerts</h3>
        <div className="space-y-4">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.type)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getAlertIcon(alert.category)}</span>
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.type === 'critical' ? 'bg-red-100 text-red-800' :
                      alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.type}
                    </span>
                    {alert.acknowledged && (
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        Acknowledged
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600 mb-3">
                    <span>Current: {alert.value}</span>
                    <span>Threshold: {alert.threshold}</span>
                    <span>Location: {alert.location}</span>
                    <span>{formatTimeAgo(alert.timestamp)}</span>
                  </div>
                  {alert.actions.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-gray-700">Recommended Actions:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {alert.actions.map((action, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  {!alert.acknowledged && (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                  {!alert.resolved && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Thresholds */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Alert Thresholds</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(thresholds).map(([parameter, config]) => (
            <div key={parameter} className="space-y-4">
              <h4 className="font-medium text-gray-900 capitalize">{parameter}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600">Minimum</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={config.min}
                      onChange={(e) => updateThreshold(parameter, 'min', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      step="0.1"
                    />
                    <span className="text-sm text-gray-500">{config.unit}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600">Maximum</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={config.max}
                      onChange={(e) => updateThreshold(parameter, 'max', e.target.value)}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                      step="0.1"
                    />
                    <span className="text-sm text-gray-500">{config.unit}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-600">Critical</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={config.critical}
                      onChange={(e) => updateThreshold(parameter, 'critical', e.target.value)}
                      className="w-20 px-2 py-1 border border-red-300 rounded text-sm"
                      step="0.1"
                    />
                    <span className="text-sm text-gray-500">{config.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(alertSettings).map(([channel, settings]) => (
            <div key={channel} className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 capitalize">{channel} Notifications</h4>
                <button
                  onClick={() => updateAlertSetting(channel, 'enabled', !settings.enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.enabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              
              {settings.enabled && (
                <div className="space-y-3">
                  {(channel === 'email' || channel === 'sms' || channel === 'phone') && (
                    <div>
                      <label className="text-sm text-gray-600 capitalize">{channel === 'email' ? 'Email Address' : 'Phone Number'}</label>
                      <input
                        type={channel === 'email' ? 'email' : 'tel'}
                        value={channel === 'email' ? settings.address : settings.number}
                        onChange={(e) => updateAlertSetting(channel, channel === 'email' ? 'address' : 'number', e.target.value)}
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Alert Types</p>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.critical}
                          onChange={(e) => updateAlertSetting(channel, 'critical', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Critical Alerts</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.warning}
                          onChange={(e) => updateAlertSetting(channel, 'warning', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Warning Alerts</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.info}
                          onChange={(e) => updateAlertSetting(channel, 'info', e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Info Alerts</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Escalation Rules */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Escalation Rules</h3>
        <div className="space-y-4">
          {escalationRules.map((rule) => (
            <div key={rule.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{rule.name}</h4>
                <button
                  onClick={() => setEscalationRules(prev =>
                    prev.map(r => r.id === rule.id ? { ...r, enabled: !r.enabled } : r)
                  )}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    rule.enabled ? 'bg-green-600' : 'bg-gray-200'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    rule.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-mono bg-gray-200 px-2 py-1 rounded text-xs">{rule.condition}</span>
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Escalation Actions:</p>
                {rule.actions.map((action, index) => (
                  <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
                    <span className="w-16 text-right">{action.delay === 0 ? 'Immediate' : `${action.delay} min`}</span>
                    <span>→</span>
                    <span>{action.action}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GrowAlertSystem;

