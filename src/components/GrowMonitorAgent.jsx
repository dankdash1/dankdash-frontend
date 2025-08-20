import React, { useState, useEffect } from 'react';

const GrowMonitorAgent = () => {
  const [agentStatus, setAgentStatus] = useState('active');
  const [automationLevel, setAutomationLevel] = useState(75);
  const [learningProgress, setLearningProgress] = useState({
    environmental: 87,
    growth: 72,
    predictive: 65,
    optimization: 81
  });

  const [aiRecommendations, setAiRecommendations] = useState([
    {
      id: 1,
      type: 'optimization',
      priority: 'high',
      title: 'VPD Optimization Opportunity',
      description: 'Current VPD of 1.4 kPa is above optimal range for flowering stage. Recommend reducing humidity to 55% to achieve target VPD of 1.0-1.2 kPa.',
      impact: 'Potential 8-12% yield increase',
      confidence: 92,
      autoApply: false,
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 2,
      type: 'efficiency',
      priority: 'medium',
      title: 'Light Schedule Optimization',
      description: 'Plant response data suggests reducing light intensity by 10% during peak hours (12-3 PM) could improve energy efficiency without affecting growth.',
      impact: '15% energy savings',
      confidence: 78,
      autoApply: true,
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    {
      id: 3,
      type: 'maintenance',
      priority: 'low',
      title: 'Preventive Maintenance Alert',
      description: 'pH sensor calibration recommended based on drift patterns. Schedule calibration within next 48 hours.',
      impact: 'Maintain sensor accuracy',
      confidence: 85,
      autoApply: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    }
  ]);

  const [automationRules, setAutomationRules] = useState([
    {
      id: 1,
      name: 'Temperature Control',
      condition: 'Temperature > 78°F',
      action: 'Increase exhaust fan speed to 80%',
      enabled: true,
      triggered: 3,
      lastTriggered: new Date(Date.now() - 30 * 60 * 1000)
    },
    {
      id: 2,
      name: 'Humidity Management',
      condition: 'Humidity > 65% AND Lights On',
      action: 'Activate dehumidifier',
      enabled: true,
      triggered: 7,
      lastTriggered: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 3,
      name: 'CO2 Injection',
      condition: 'CO2 < 1000 ppm AND Lights On',
      action: 'Start CO2 injection',
      enabled: true,
      triggered: 12,
      lastTriggered: new Date(Date.now() - 15 * 60 * 1000)
    },
    {
      id: 4,
      name: 'Irrigation Trigger',
      condition: 'Soil Moisture < 40%',
      action: 'Start irrigation cycle',
      enabled: true,
      triggered: 2,
      lastTriggered: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    energyEfficiency: 87,
    waterSavings: 34,
    yieldOptimization: 92,
    costReduction: 28,
    automationUptime: 99.7
  });

  const [growthStage, setGrowthStage] = useState('flowering');
  const [daysInStage, setDaysInStage] = useState(21);

  const applyRecommendation = (recommendationId) => {
    setAiRecommendations(prev => 
      prev.map(rec => 
        rec.id === recommendationId 
          ? { ...rec, applied: true, appliedAt: new Date() }
          : rec
      )
    );
  };

  const dismissRecommendation = (recommendationId) => {
    setAiRecommendations(prev => 
      prev.filter(rec => rec.id !== recommendationId)
    );
  };

  const toggleAutomationRule = (ruleId) => {
    setAutomationRules(prev =>
      prev.map(rule =>
        rule.id === ruleId
          ? { ...rule, enabled: !rule.enabled }
          : rule
      )
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'optimization': return '⚡';
      case 'efficiency': return '💡';
      case 'maintenance': return '🔧';
      case 'alert': return '🚨';
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

  return (
    <div className="space-y-6">
      {/* Agent Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-4 h-4 rounded-full ${agentStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <h2 className="text-xl font-semibold text-gray-900">Grow Monitor AI Agent</h2>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Automation Level</span>
            <span className="font-medium">{automationLevel}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{performanceMetrics.energyEfficiency}%</div>
            <div className="text-sm text-gray-600">Energy Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{performanceMetrics.waterSavings}%</div>
            <div className="text-sm text-gray-600">Water Savings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{performanceMetrics.yieldOptimization}%</div>
            <div className="text-sm text-gray-600">Yield Optimization</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{performanceMetrics.costReduction}%</div>
            <div className="text-sm text-gray-600">Cost Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{performanceMetrics.automationUptime}%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
        </div>
      </div>

      {/* Growth Stage Tracking */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Stage Intelligence</h3>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 capitalize">{growthStage} Stage</div>
            <div className="text-sm text-gray-600">Day {daysInStage} of current stage</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Estimated completion</div>
            <div className="font-medium">14 days remaining</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{width: `${(daysInStage / 35) * 100}%`}}></div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Recommendations</h3>
        <div className="space-y-4">
          {aiRecommendations.map((recommendation) => (
            <div key={recommendation.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(recommendation.priority)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getTypeIcon(recommendation.type)}</span>
                    <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      recommendation.priority === 'high' ? 'bg-red-100 text-red-800' :
                      recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {recommendation.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{recommendation.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600">
                    <span>Impact: {recommendation.impact}</span>
                    <span>Confidence: {recommendation.confidence}%</span>
                    <span>{formatTimeAgo(recommendation.timestamp)}</span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  {!recommendation.applied && (
                    <>
                      <button
                        onClick={() => applyRecommendation(recommendation.id)}
                        className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => dismissRecommendation(recommendation.id)}
                        className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                      >
                        Dismiss
                      </button>
                    </>
                  )}
                  {recommendation.applied && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded">
                      Applied
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Learning Progress</h3>
        <div className="space-y-4">
          {Object.entries(learningProgress).map(([category, progress]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {category === 'environmental' ? 'Environmental Control' :
                   category === 'growth' ? 'Growth Pattern Recognition' :
                   category === 'predictive' ? 'Predictive Analytics' :
                   'Yield Optimization'}
                </span>
                <span className="text-sm font-medium text-gray-900">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    category === 'environmental' ? 'bg-green-500' :
                    category === 'growth' ? 'bg-blue-500' :
                    category === 'predictive' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}
                  style={{width: `${progress}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Rules */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Automation Rules</h3>
        <div className="space-y-4">
          {automationRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleAutomationRule(rule.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      rule.enabled ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      rule.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                  <div>
                    <h4 className="font-medium text-gray-900">{rule.name}</h4>
                    <p className="text-sm text-gray-600">
                      <span className="font-mono bg-gray-200 px-2 py-1 rounded text-xs">{rule.condition}</span>
                      {' → '}
                      <span className="font-mono bg-blue-100 px-2 py-1 rounded text-xs">{rule.action}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <div>Triggered: {rule.triggered} times</div>
                <div>Last: {formatTimeAgo(rule.lastTriggered)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Configuration */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Configuration</h3>
        <div className="space-y-6">
          {/* Automation Level */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Automation Level</label>
              <span className="text-sm text-gray-600">{automationLevel}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={automationLevel}
              onChange={(e) => setAutomationLevel(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Manual</span>
              <span>Assisted</span>
              <span>Autonomous</span>
            </div>
          </div>

          {/* AI Settings */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">AI Behavior Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Auto-apply low-risk optimizations</span>
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
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Energy optimization mode</span>
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Yield maximization mode</span>
                <input type="checkbox" defaultChecked className="rounded border-gray-300" />
              </label>
            </div>
          </div>

          {/* Learning Data */}
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Learning Data</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Data points collected:</span>
                <span className="font-medium">2.4M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Training cycles:</span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model accuracy:</span>
                <span className="font-medium">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last update:</span>
                <span className="font-medium">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowMonitorAgent;

