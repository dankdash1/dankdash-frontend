import React, { useState, useEffect } from 'react';

const AutomatedSocialMediaModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [isAutomationEnabled, setIsAutomationEnabled] = useState(true);

  // AI Automation Settings
  const [automationSettings, setAutomationSettings] = useState({
    contentGeneration: {
      enabled: true,
      frequency: 'daily',
      contentTypes: ['educational', 'product', 'promotional', 'engagement'],
      tone: 'professional',
      includeHashtags: true,
      includeEmojis: true,
      brandVoice: 'friendly-expert'
    },
    autoPosting: {
      enabled: true,
      platforms: ['instagram', 'facebook', 'twitter', 'tiktok'],
      optimalTiming: true,
      crossPost: true,
      customSchedule: {
        instagram: ['09:00', '15:00', '19:00'],
        facebook: ['10:00', '14:00', '20:00'],
        twitter: ['08:00', '12:00', '16:00', '20:00'],
        tiktok: ['15:00', '18:00', '21:00']
      }
    },
    engagement: {
      autoReply: true,
      replyDelay: '5-15', // minutes
      sentimentAnalysis: true,
      escalateNegative: true,
      autoLike: true,
      autoFollow: false,
      engagementRate: 'moderate'
    },
    contentModeration: {
      enabled: true,
      filterProfanity: true,
      complianceCheck: true,
      brandSafety: true,
      autoApprove: false
    }
  });

  // Connected Platforms
  const [connectedPlatforms, setConnectedPlatforms] = useState([
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📷',
      connected: true,
      username: '@dankdash_official',
      followers: 45680,
      status: 'active',
      lastSync: '2024-08-14 16:30:00',
      apiStatus: 'healthy',
      permissions: ['read', 'write', 'manage'],
      features: ['posts', 'stories', 'reels', 'igtv', 'shopping']
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: '👥',
      connected: true,
      username: 'DankDash Cannabis Delivery',
      followers: 28450,
      status: 'active',
      lastSync: '2024-08-14 16:25:00',
      apiStatus: 'healthy',
      permissions: ['read', 'write', 'manage', 'ads'],
      features: ['posts', 'stories', 'events', 'marketplace', 'ads']
    },
    {
      id: 'twitter',
      name: 'X (Twitter)',
      icon: '🐦',
      connected: true,
      username: '@DankDashCA',
      followers: 12890,
      status: 'active',
      lastSync: '2024-08-14 16:20:00',
      apiStatus: 'healthy',
      permissions: ['read', 'write'],
      features: ['tweets', 'threads', 'spaces', 'dm']
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: '🎵',
      connected: true,
      username: '@dankdash_ca',
      followers: 18750,
      status: 'active',
      lastSync: '2024-08-14 16:15:00',
      apiStatus: 'healthy',
      permissions: ['read', 'write'],
      features: ['videos', 'live', 'duets', 'effects']
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      connected: false,
      username: '',
      followers: 0,
      status: 'disconnected',
      lastSync: null,
      apiStatus: 'disconnected',
      permissions: [],
      features: ['posts', 'articles', 'company-updates']
    },
    {
      id: 'youtube',
      name: 'YouTube',
      icon: '📺',
      connected: false,
      username: '',
      followers: 0,
      status: 'disconnected',
      lastSync: null,
      apiStatus: 'disconnected',
      permissions: [],
      features: ['videos', 'shorts', 'live', 'community']
    }
  ]);

  // AI Generated Content Queue
  const [contentQueue, setContentQueue] = useState([
    {
      id: 'AI-001',
      type: 'educational',
      platform: 'instagram',
      content: 'Did you know? 🌿 Terpenes are aromatic compounds found in cannabis that contribute to its unique scent and effects. Myrcene promotes relaxation, while Limonene can boost mood! #CannabiEducation #Terpenes #Cannabis101',
      media: {
        type: 'ai-generated-image',
        prompt: 'Cannabis terpene molecular structure infographic, educational, clean design',
        url: '/ai-content/terpenes-infographic.jpg'
      },
      hashtags: ['#CannabiEducation', '#Terpenes', '#Cannabis101', '#WellnessWednesday'],
      scheduledTime: '2024-08-15 14:00:00',
      status: 'pending-approval',
      aiConfidence: 0.92,
      complianceScore: 0.98,
      engagementPrediction: 4.2
    },
    {
      id: 'AI-002',
      type: 'product',
      platform: 'facebook',
      content: 'New arrival alert! 🔥 Premium Blue Dream hybrid now available for delivery. Known for its balanced effects and sweet berry aroma. Perfect for both new and experienced users. Order now for same-day delivery! 🚚',
      media: {
        type: 'product-photo',
        url: '/products/blue-dream-hero.jpg'
      },
      hashtags: ['#BlueDream', '#NewArrival', '#Cannabis', '#Delivery'],
      scheduledTime: '2024-08-15 18:00:00',
      status: 'approved',
      aiConfidence: 0.89,
      complianceScore: 0.95,
      engagementPrediction: 3.8
    },
    {
      id: 'AI-003',
      type: 'engagement',
      platform: 'twitter',
      content: 'What\'s your favorite way to unwind after a long day? 🌅 Share your relaxation tips below! #Wellness #Relaxation #Community',
      media: null,
      hashtags: ['#Wellness', '#Relaxation', '#Community', '#ThursdayThoughts'],
      scheduledTime: '2024-08-15 17:00:00',
      status: 'scheduled',
      aiConfidence: 0.85,
      complianceScore: 1.0,
      engagementPrediction: 3.5
    },
    {
      id: 'AI-004',
      type: 'promotional',
      platform: 'tiktok',
      content: 'POV: You just discovered the perfect strain for your needs 🎯 Our AI-powered strain matcher helps you find your ideal cannabis experience. Try it now! #StrainMatcher #Cannabis #AI #PersonalizedExperience',
      media: {
        type: 'ai-generated-video',
        prompt: 'Cannabis strain selection process, modern UI, engaging transitions',
        url: '/ai-content/strain-matcher-video.mp4'
      },
      hashtags: ['#StrainMatcher', '#Cannabis', '#AI', '#PersonalizedExperience'],
      scheduledTime: '2024-08-15 20:00:00',
      status: 'generating',
      aiConfidence: 0.91,
      complianceScore: 0.97,
      engagementPrediction: 5.1
    }
  ]);

  // Auto-Reply Templates
  const [autoReplyTemplates, setAutoReplyTemplates] = useState([
    {
      id: 'template-001',
      trigger: 'delivery',
      keywords: ['delivery', 'shipping', 'order', 'when'],
      response: 'Hi! 👋 We offer same-day delivery in California and nationwide shipping. You can track your order in real-time through our app. Need help with a specific order? DM us your order number!',
      platforms: ['instagram', 'facebook', 'twitter'],
      active: true
    },
    {
      id: 'template-002',
      trigger: 'product-info',
      keywords: ['strain', 'effects', 'thc', 'cbd', 'recommend'],
      response: 'Great question! 🌿 Each strain has unique effects and cannabinoid profiles. Check out our detailed strain guides on our website or use our AI strain matcher to find your perfect match! Link in bio 🔗',
      platforms: ['instagram', 'facebook', 'twitter', 'tiktok'],
      active: true
    },
    {
      id: 'template-003',
      trigger: 'pricing',
      keywords: ['price', 'cost', 'how much', 'deals', 'discount'],
      response: 'Thanks for your interest! 💚 Our prices vary by product and quantity. Check out our current deals and full menu on our website. First-time customers get 20% off! 🎉',
      platforms: ['instagram', 'facebook', 'twitter'],
      active: true
    },
    {
      id: 'template-004',
      trigger: 'compliance',
      keywords: ['legal', 'license', 'compliant', 'regulation'],
      response: 'Absolutely! We\'re fully licensed and compliant with all California cannabis regulations. Our license info is available on our website. We take compliance seriously! ✅',
      platforms: ['instagram', 'facebook', 'twitter'],
      active: true
    }
  ]);

  // Analytics Data
  const [analytics, setAnalytics] = useState({
    automation: {
      postsGenerated: 156,
      postsPublished: 142,
      autoReplies: 89,
      engagementRate: 4.7,
      timesSaved: 45.5, // hours
      costSavings: 2340.00
    },
    performance: {
      totalReach: 234560,
      totalImpressions: 456780,
      totalEngagement: 23450,
      websiteClicks: 3450,
      conversions: 234,
      revenue: 12450.75
    },
    aiInsights: {
      bestPerformingContent: 'educational',
      optimalPostingTimes: {
        instagram: '19:00',
        facebook: '20:00',
        twitter: '16:00',
        tiktok: '21:00'
      },
      trendingHashtags: ['#CannabiEducation', '#Wellness', '#Sustainability'],
      audienceGrowth: 12.5 // percentage
    }
  });

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Automation Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI Social Media Automation</h3>
            <p className="text-gray-600">Intelligent content creation and engagement across all platforms</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${isAutomationEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">{isAutomationEnabled ? 'Active' : 'Inactive'}</span>
            </div>
            <button
              onClick={() => setIsAutomationEnabled(!isAutomationEnabled)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isAutomationEnabled 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isAutomationEnabled ? 'Pause Automation' : 'Start Automation'}
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Posts Generated</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.automation.postsGenerated}</p>
              <p className="text-sm text-green-600">+23 this week</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Auto Replies</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.automation.autoReplies}</p>
              <p className="text-sm text-blue-600">Avg 2.3 min response</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Time Saved</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.automation.timesSaved}h</p>
              <p className="text-sm text-purple-600">This month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Cost Savings</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.automation.costSavings.toLocaleString()}</p>
              <p className="text-sm text-yellow-600">vs manual management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Platforms */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Connected Platforms</h3>
          <p className="text-gray-600">Manage your social media accounts and automation settings</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedPlatforms.map((platform) => (
              <div key={platform.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{platform.icon}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{platform.name}</h4>
                      <p className="text-sm text-gray-600">{platform.username || 'Not connected'}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    platform.connected 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {platform.connected ? 'Connected' : 'Disconnected'}
                  </div>
                </div>
                
                {platform.connected && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Followers:</span>
                      <span className="font-medium">{platform.followers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Sync:</span>
                      <span className="font-medium">{new Date(platform.lastSync).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">API Status:</span>
                      <span className={`font-medium ${
                        platform.apiStatus === 'healthy' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {platform.apiStatus}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex space-x-2">
                  {platform.connected ? (
                    <>
                      <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200">
                        Settings
                      </button>
                      <button className="flex-1 px-3 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200">
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button className="w-full px-3 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200">
                      Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">AI Insights & Recommendations</h3>
          <p className="text-gray-600">Data-driven insights to optimize your social media strategy</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Best Performing Content</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Educational posts:</span>
                  <span className="font-medium text-green-600">5.2% engagement</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product showcases:</span>
                  <span className="font-medium text-blue-600">4.8% engagement</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Behind-the-scenes:</span>
                  <span className="font-medium text-purple-600">4.1% engagement</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Optimal Posting Times</h4>
              <div className="space-y-2">
                {Object.entries(analytics.aiInsights.optimalPostingTimes).map(([platform, time]) => (
                  <div key={platform} className="flex justify-between">
                    <span className="text-gray-600 capitalize">{platform}:</span>
                    <span className="font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">💡 AI Recommendation</h4>
            <p className="text-blue-800">
              Your educational content performs 23% better than industry average. Consider increasing educational posts to 40% of your content mix for optimal engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContentQueue = () => (
    <div className="space-y-6">
      {/* Queue Controls */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Content Queue</h3>
          <p className="text-gray-600">Review and manage AI-generated content before publishing</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Generate New Content
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Approve All
          </button>
        </div>
      </div>

      {/* Content Cards */}
      <div className="space-y-4">
        {contentQueue.map((content) => (
          <div key={content.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{connectedPlatforms.find(p => p.id === content.platform)?.icon}</span>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 capitalize">{content.platform}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      content.type === 'educational' ? 'bg-blue-100 text-blue-800' :
                      content.type === 'product' ? 'bg-green-100 text-green-800' :
                      content.type === 'promotional' ? 'bg-purple-100 text-purple-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {content.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Scheduled: {new Date(content.scheduledTime).toLocaleString()}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                content.status === 'approved' ? 'bg-green-100 text-green-800' :
                content.status === 'pending-approval' ? 'bg-yellow-100 text-yellow-800' :
                content.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {content.status.replace('-', ' ')}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-900 mb-2">{content.content}</p>
              {content.media && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Media:</strong> {content.media.type}
                    {content.media.prompt && (
                      <span className="block mt-1">
                        <strong>AI Prompt:</strong> {content.media.prompt}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {content.hashtags.map((hashtag, index) => (
                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
                  {hashtag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>AI Confidence: {(content.aiConfidence * 100).toFixed(0)}%</span>
                <span>Compliance: {(content.complianceScore * 100).toFixed(0)}%</span>
                <span>Predicted Engagement: {content.engagementPrediction}/5</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200">
                  Edit
                </button>
                <button className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded hover:bg-green-200">
                  Approve
                </button>
                <button className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAutomationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Automation Settings</h3>
        <p className="text-gray-600">Configure AI-powered social media automation</p>
      </div>

      {/* Content Generation Settings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h4 className="font-medium text-gray-900">AI Content Generation</h4>
          <p className="text-gray-600">Configure how AI creates content for your social media</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900">Enable Content Generation</label>
              <p className="text-sm text-gray-600">AI will automatically create posts based on your settings</p>
            </div>
            <button
              onClick={() => setAutomationSettings(prev => ({
                ...prev,
                contentGeneration: { ...prev.contentGeneration, enabled: !prev.contentGeneration.enabled }
              }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                automationSettings.contentGeneration.enabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                automationSettings.contentGeneration.enabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-2">Content Frequency</label>
            <select 
              value={automationSettings.contentGeneration.frequency}
              onChange={(e) => setAutomationSettings(prev => ({
                ...prev,
                contentGeneration: { ...prev.contentGeneration, frequency: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="hourly">Every Hour</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="custom">Custom Schedule</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-2">Content Types</label>
            <div className="grid grid-cols-2 gap-3">
              {['educational', 'product', 'promotional', 'engagement'].map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={automationSettings.contentGeneration.contentTypes.includes(type)}
                    onChange={(e) => {
                      const types = e.target.checked
                        ? [...automationSettings.contentGeneration.contentTypes, type]
                        : automationSettings.contentGeneration.contentTypes.filter(t => t !== type);
                      setAutomationSettings(prev => ({
                        ...prev,
                        contentGeneration: { ...prev.contentGeneration, contentTypes: types }
                      }));
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-2">Brand Voice</label>
            <select 
              value={automationSettings.contentGeneration.brandVoice}
              onChange={(e) => setAutomationSettings(prev => ({
                ...prev,
                contentGeneration: { ...prev.contentGeneration, brandVoice: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="professional">Professional</option>
              <option value="friendly-expert">Friendly Expert</option>
              <option value="casual">Casual</option>
              <option value="educational">Educational</option>
              <option value="trendy">Trendy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Auto-Reply Settings */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h4 className="font-medium text-gray-900">Auto-Reply Settings</h4>
          <p className="text-gray-600">Configure automated responses to comments and messages</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900">Enable Auto-Reply</label>
              <p className="text-sm text-gray-600">Automatically respond to comments and messages</p>
            </div>
            <button
              onClick={() => setAutomationSettings(prev => ({
                ...prev,
                engagement: { ...prev.engagement, autoReply: !prev.engagement.autoReply }
              }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                automationSettings.engagement.autoReply ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                automationSettings.engagement.autoReply ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <div>
            <label className="block font-medium text-gray-900 mb-2">Response Delay (minutes)</label>
            <input
              type="text"
              value={automationSettings.engagement.replyDelay}
              onChange={(e) => setAutomationSettings(prev => ({
                ...prev,
                engagement: { ...prev.engagement, replyDelay: e.target.value }
              }))}
              placeholder="5-15"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">Random delay to appear more natural</p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900">Sentiment Analysis</label>
              <p className="text-sm text-gray-600">Analyze comment sentiment before responding</p>
            </div>
            <button
              onClick={() => setAutomationSettings(prev => ({
                ...prev,
                engagement: { ...prev.engagement, sentimentAnalysis: !prev.engagement.sentimentAnalysis }
              }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                automationSettings.engagement.sentimentAnalysis ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                automationSettings.engagement.sentimentAnalysis ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Auto-Reply Templates */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-gray-900">Auto-Reply Templates</h4>
              <p className="text-gray-600">Manage automated response templates</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Add Template
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {autoReplyTemplates.map((template) => (
              <div key={template.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900 capitalize">{template.trigger.replace('-', ' ')}</h5>
                    <p className="text-sm text-gray-600">
                      Keywords: {template.keywords.join(', ')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {template.active ? 'Active' : 'Inactive'}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-3">{template.response}</p>
                <div className="flex flex-wrap gap-2">
                  {template.platforms.map((platform) => (
                    <span key={platform} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded capitalize">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Automation Analytics</h3>
        <p className="text-gray-600">Track the performance of your automated social media activities</p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.performance.totalReach.toLocaleString()}</p>
              <p className="text-sm text-green-600">+15.3% vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Impressions</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.performance.totalImpressions.toLocaleString()}</p>
              <p className="text-sm text-blue-600">+22.1% vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.performance.totalEngagement.toLocaleString()}</p>
              <p className="text-sm text-purple-600">+18.7% vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.performance.revenue.toLocaleString()}</p>
              <p className="text-sm text-yellow-600">From social media</p>
            </div>
          </div>
        </div>
      </div>

      {/* Automation Efficiency */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h4 className="font-medium text-gray-900">Automation Efficiency</h4>
          <p className="text-gray-600">How automation is improving your social media performance</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{analytics.automation.timesSaved}h</div>
              <div className="text-sm text-gray-600">Time Saved This Month</div>
              <div className="text-xs text-gray-500 mt-1">vs manual management</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">${analytics.automation.costSavings.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Cost Savings</div>
              <div className="text-xs text-gray-500 mt-1">equivalent labor cost</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{analytics.automation.engagementRate}%</div>
              <div className="text-sm text-gray-600">Avg Engagement Rate</div>
              <div className="text-xs text-gray-500 mt-1">across all platforms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h4 className="font-medium text-gray-900">Platform Performance</h4>
          <p className="text-gray-600">Compare performance across different social media platforms</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {connectedPlatforms.filter(p => p.connected).map((platform) => (
              <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <div>
                    <h5 className="font-medium text-gray-900">{platform.name}</h5>
                    <p className="text-sm text-gray-600">{platform.followers.toLocaleString()} followers</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">4.2%</div>
                    <div className="text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">12.5K</div>
                    <div className="text-gray-600">Reach</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">234</div>
                    <div className="text-gray-600">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-green-600">+15%</div>
                    <div className="text-gray-600">Growth</div>
                  </div>
                </div>
              </div>
            ))}
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🤖 Automated Social Media Marketing</h1>
              <p className="text-gray-600 mt-2">AI-powered content creation and engagement across all platforms</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${isAutomationEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">{isAutomationEnabled ? 'Automation Active' : 'Automation Paused'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'content-queue', name: 'Content Queue', icon: '📝' },
              { id: 'automation', name: 'Automation Settings', icon: '⚙️' },
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
        {activeTab === 'content-queue' && renderContentQueue()}
        {activeTab === 'automation' && renderAutomationSettings()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default AutomatedSocialMediaModule;

