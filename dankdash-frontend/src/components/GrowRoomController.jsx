import React, { useState, useEffect } from 'react';

const GrowRoomController = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnected, setIsConnected] = useState(true);
  const [autoMode, setAutoMode] = useState(true);

  // Simulated real-time data (in production, this would come from GrowLink API)
  const [environmentalData, setEnvironmentalData] = useState({
    temperature: 75.2,
    humidity: 62.5,
    vpd: 1.2,
    co2: 1200,
    lightIntensity: 850,
    ph: 6.1,
    ec: 1.8,
    waterLevel: 85
  });

  const [lightingControl, setLightingControl] = useState({
    red: 85,
    blue: 70,
    white: 90,
    farRed: 45
  });

  const [equipmentStatus, setEquipmentStatus] = useState({
    hvac: 'running',
    fans: 'running',
    humidifier: 'standby',
    co2Injector: 'running',
    irrigation: 'scheduled',
    lights: 'on'
  });

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', message: 'CO2 levels approaching upper limit', time: '2 min ago', severity: 'medium' },
    { id: 2, type: 'info', message: 'Irrigation cycle completed successfully', time: '15 min ago', severity: 'low' },
    { id: 3, type: 'success', message: 'VPD optimized for current growth stage', time: '1 hour ago', severity: 'low' }
  ]);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironmentalData(prev => ({
        ...prev,
        temperature: prev.temperature + (Math.random() - 0.5) * 0.2,
        humidity: prev.humidity + (Math.random() - 0.5) * 1,
        co2: prev.co2 + (Math.random() - 0.5) * 20,
        lightIntensity: prev.lightIntensity + (Math.random() - 0.5) * 10
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleLightingChange = (color, value) => {
    setLightingControl(prev => ({
      ...prev,
      [color]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-green-600';
      case 'standby': return 'text-yellow-600';
      case 'off': return 'text-gray-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="font-medium">GrowLink System Status</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Auto Mode</span>
            <button
              onClick={() => setAutoMode(!autoMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoMode ? 'bg-green-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Environmental Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-bold text-gray-900">{environmentalData.temperature.toFixed(1)}°F</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600 text-xl">🌡️</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{width: `${(environmentalData.temperature / 100) * 100}%`}}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-2xl font-bold text-gray-900">{environmentalData.humidity.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">💧</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{width: `${environmentalData.humidity}%`}}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">VPD</p>
              <p className="text-2xl font-bold text-gray-900">{environmentalData.vpd.toFixed(1)} kPa</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">🌿</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{width: `${(environmentalData.vpd / 2) * 100}%`}}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">CO2</p>
              <p className="text-2xl font-bold text-gray-900">{environmentalData.co2} ppm</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">🫧</span>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{width: `${(environmentalData.co2 / 1500) * 100}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Light Intensity</p>
              <p className="text-2xl font-bold text-gray-900">{environmentalData.lightIntensity.toFixed(0)} PPFD</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-xl">💡</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">pH Level</p>
              <p className="text-2xl font-bold text-gray-900">{environmentalData.ph.toFixed(1)}</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <span className="text-indigo-600 text-xl">⚗️</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">EC Level</p>
              <p className="text-2xl font-bold text-gray-900">{environmentalData.ec.toFixed(1)} mS/cm</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <span className="text-teal-600 text-xl">⚡</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Water Level</p>
              <p className="text-2xl font-bold text-gray-900">{environmentalData.waterLevel}%</p>
            </div>
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
              <span className="text-cyan-600 text-xl">🪣</span>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(equipmentStatus).map(([equipment, status]) => (
            <div key={equipment} className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">🔧</span>
              </div>
              <p className="text-sm font-medium text-gray-900 capitalize">{equipment.replace(/([A-Z])/g, ' $1')}</p>
              <p className={`text-xs capitalize ${getStatusColor(status)}`}>{status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLightingControl = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">LED Spectrum Control</h3>
        
        <div className="space-y-6">
          {Object.entries(lightingControl).map(([color, value]) => (
            <div key={color} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {color === 'farRed' ? 'Far Red' : color} ({value}%)
                </label>
                <span className="text-sm text-gray-500">{value}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => handleLightingChange(color, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${
                    color === 'red' ? '#ef4444' : 
                    color === 'blue' ? '#3b82f6' : 
                    color === 'white' ? '#f3f4f6' : 
                    '#dc2626'
                  } 0%, ${
                    color === 'red' ? '#ef4444' : 
                    color === 'blue' ? '#3b82f6' : 
                    color === 'white' ? '#f3f4f6' : 
                    '#dc2626'
                  } ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Total Light Intensity</span>
            <span className="text-lg font-bold text-gray-900">
              {Math.round((lightingControl.red + lightingControl.blue + lightingControl.white + lightingControl.farRed) / 4)}%
            </span>
          </div>
        </div>

        <div className="mt-4 flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Apply Changes
          </button>
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Save Preset
          </button>
        </div>
      </div>

      {/* Light Schedule */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Light Schedule</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">Vegetative Stage</span>
            <span className="text-sm text-gray-600">18h on / 6h off</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <span className="font-medium">Flowering Stage</span>
            <span className="text-sm text-gray-600">12h on / 12h off</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClimateControl = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Climate Control</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Temperature Control */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Temperature Settings</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Target Temperature</span>
                <span className="font-medium">75°F</span>
              </div>
              <input type="range" min="65" max="85" defaultValue="75" className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>65°F</span>
                <span>85°F</span>
              </div>
            </div>
          </div>

          {/* Humidity Control */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Humidity Settings</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Target Humidity</span>
                <span className="font-medium">60%</span>
              </div>
              <input type="range" min="40" max="80" defaultValue="60" className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>40%</span>
                <span>80%</span>
              </div>
            </div>
          </div>

          {/* CO2 Control */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">CO2 Settings</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Target CO2</span>
                <span className="font-medium">1200 ppm</span>
              </div>
              <input type="range" min="400" max="1500" defaultValue="1200" className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>400 ppm</span>
                <span>1500 ppm</span>
              </div>
            </div>
          </div>

          {/* VPD Control */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">VPD Settings</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Target VPD</span>
                <span className="font-medium">1.2 kPa</span>
              </div>
              <input type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.2" className="w-full" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.5 kPa</span>
                <span>2.0 kPa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Apply Settings
            </button>
            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIrrigation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Irrigation & Nutrients</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Irrigation Schedule */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Irrigation Schedule</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Morning Cycle</span>
                <span className="text-sm font-medium">6:00 AM - 15 min</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm">Evening Cycle</span>
                <span className="text-sm font-medium">6:00 PM - 10 min</span>
              </div>
            </div>
          </div>

          {/* Nutrient Levels */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Nutrient Levels</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">pH Level</span>
                <span className="font-medium text-green-600">{environmentalData.ph.toFixed(1)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">EC Level</span>
                <span className="font-medium text-blue-600">{environmentalData.ec.toFixed(1)} mS/cm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Water Level</span>
                <span className="font-medium text-cyan-600">{environmentalData.waterLevel}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Start Manual Cycle
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Calibrate Sensors
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Alerts</h3>
        
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getAlertColor(alert.severity)}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">{alert.message}</p>
                  <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                  alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.severity}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Alert Settings</h4>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">SMS Notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">Email Notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-700">Phone Call for Critical Alerts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIAgent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Grow Monitor AI Agent</h3>
        
        <div className="space-y-6">
          {/* AI Status */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-green-900">AI Agent Active</span>
            </div>
            <span className="text-sm text-green-700">Monitoring 24/7</span>
          </div>

          {/* AI Recommendations */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Current Recommendations</h4>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-900">Optimize VPD for Flowering Stage</p>
                <p className="text-sm text-blue-700 mt-1">
                  Consider reducing humidity to 55% to achieve optimal VPD of 1.0-1.2 kPa for current flowering stage.
                </p>
                <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Apply Recommendation
                </button>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="font-medium text-yellow-900">Light Schedule Adjustment</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Based on plant response, consider reducing light intensity by 10% during peak hours.
                </p>
                <button className="mt-2 px-3 py-1 bg-yellow-600 text-white text-sm rounded hover:bg-yellow-700">
                  Apply Recommendation
                </button>
              </div>
            </div>
          </div>

          {/* AI Learning */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">AI Learning Progress</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Environmental Optimization</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '87%'}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Growth Pattern Recognition</span>
                <span className="text-sm font-medium">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Predictive Analytics</span>
                <span className="text-sm font-medium">65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '65%'}}></div>
              </div>
            </div>
          </div>

          {/* AI Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">AI Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Auto-apply low-risk recommendations</span>
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Predictive maintenance alerts</span>
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Growth stage auto-detection</span>
                <input type="checkbox" className="rounded border-gray-300" />
              </label>
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
          <h1 className="text-3xl font-bold text-gray-900">Grow Room Controller</h1>
          <p className="text-gray-600 mt-2">Monitor and control your cultivation environment with GrowLink integration</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'lighting', name: 'Lighting', icon: '💡' },
              { id: 'climate', name: 'Climate', icon: '🌡️' },
              { id: 'irrigation', name: 'Irrigation', icon: '💧' },
              { id: 'alerts', name: 'Alerts', icon: '🚨' },
              { id: 'ai', name: 'AI Agent', icon: '🤖' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
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
        <div>
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'lighting' && renderLightingControl()}
          {activeTab === 'climate' && renderClimateControl()}
          {activeTab === 'irrigation' && renderIrrigation()}
          {activeTab === 'alerts' && renderAlerts()}
          {activeTab === 'ai' && renderAIAgent()}
        </div>
      </div>
    </div>
  );
};

export default GrowRoomController;

