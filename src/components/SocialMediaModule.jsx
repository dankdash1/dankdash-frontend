import React, { useState, useEffect } from 'react';

const SocialMediaModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCampaign, setSelectedCampaign] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // Mock social media data
  const [accounts, setAccounts] = useState([
    {
      id: 'ACC-001',
      platform: 'Instagram',
      username: '@dankdash_official',
      followers: 45680,
      following: 1250,
      posts: 342,
      engagement: 4.8,
      status: 'Active',
      lastPost: '2024-08-14 15:30:00',
      profilePicture: '/social/instagram-profile.jpg',
      bio: 'Premium cannabis delivery service 🌿 | Licensed & Compliant | Fast & Discreet Delivery',
      website: 'https://dankdash.com',
      location: 'California, USA',
      verified: true,
      businessAccount: true,
      analytics: {
        reach: 125680,
        impressions: 234560,
        profileViews: 8920,
        websiteClicks: 1250
      },
      demographics: {
        ageGroups: {
          '18-24': 25,
          '25-34': 45,
          '35-44': 20,
          '45-54': 8,
          '55+': 2
        },
        gender: {
          male: 58,
          female: 40,
          other: 2
        },
        topLocations: ['Los Angeles', 'San Francisco', 'San Diego', 'Oakland', 'Sacramento']
      }
    },
    {
      id: 'ACC-002',
      platform: 'Facebook',
      username: 'DankDash Cannabis Delivery',
      followers: 28450,
      following: 890,
      posts: 198,
      engagement: 3.2,
      status: 'Active',
      lastPost: '2024-08-14 12:15:00',
      profilePicture: '/social/facebook-profile.jpg',
      bio: 'California\'s premier cannabis delivery service. Licensed, compliant, and committed to quality.',
      website: 'https://dankdash.com',
      location: 'California, USA',
      verified: true,
      businessAccount: true,
      analytics: {
        reach: 89450,
        impressions: 156780,
        profileViews: 5680,
        websiteClicks: 890
      },
      demographics: {
        ageGroups: {
          '18-24': 15,
          '25-34': 35,
          '35-44': 30,
          '45-54': 15,
          '55+': 5
        },
        gender: {
          male: 55,
          female: 43,
          other: 2
        },
        topLocations: ['San Francisco', 'Los Angeles', 'San Jose', 'Fresno', 'Long Beach']
      }
    },
    {
      id: 'ACC-003',
      platform: 'Twitter',
      username: '@DankDashCA',
      followers: 12890,
      following: 2340,
      posts: 1250,
      engagement: 2.8,
      status: 'Active',
      lastPost: '2024-08-14 16:45:00',
      profilePicture: '/social/twitter-profile.jpg',
      bio: '🌿 Premium Cannabis Delivery | Licensed & Compliant | California | #Cannabis #Delivery #Quality',
      website: 'https://dankdash.com',
      location: 'California, USA',
      verified: false,
      businessAccount: true,
      analytics: {
        reach: 45680,
        impressions: 89450,
        profileViews: 3450,
        websiteClicks: 560
      },
      demographics: {
        ageGroups: {
          '18-24': 30,
          '25-34': 40,
          '35-44': 20,
          '45-54': 8,
          '55+': 2
        },
        gender: {
          male: 62,
          female: 36,
          other: 2
        },
        topLocations: ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento', 'Fresno']
      }
    },
    {
      id: 'ACC-004',
      platform: 'TikTok',
      username: '@dankdash_ca',
      followers: 18750,
      following: 450,
      posts: 89,
      engagement: 6.2,
      status: 'Active',
      lastPost: '2024-08-14 14:20:00',
      profilePicture: '/social/tiktok-profile.jpg',
      bio: 'Cannabis education & delivery 🌿 | California licensed | Educational content only',
      website: 'https://dankdash.com',
      location: 'California, USA',
      verified: false,
      businessAccount: true,
      analytics: {
        reach: 78920,
        impressions: 145680,
        profileViews: 4560,
        websiteClicks: 340
      },
      demographics: {
        ageGroups: {
          '18-24': 55,
          '25-34': 30,
          '35-44': 12,
          '45-54': 2,
          '55+': 1
        },
        gender: {
          male: 48,
          female: 50,
          other: 2
        },
        topLocations: ['Los Angeles', 'San Francisco', 'San Diego', 'Oakland', 'Fresno']
      }
    }
  ]);

  const [posts, setPosts] = useState([
    {
      id: 'POST-001',
      platform: 'Instagram',
      type: 'Photo',
      content: 'New strain alert! 🔥 Premium OG Kush now available for delivery. Grown with love in California sunshine. #Cannabis #OGKush #PremiumQuality',
      media: ['/posts/og-kush-photo.jpg'],
      scheduledTime: '2024-08-15 18:00:00',
      publishedTime: null,
      status: 'Scheduled',
      campaign: 'New Product Launch',
      hashtags: ['#Cannabis', '#OGKush', '#PremiumQuality', '#CaliforniaCannabis', '#Delivery'],
      mentions: ['@cannabis_community', '@strain_reviews'],
      location: 'California, USA',
      engagement: {
        likes: 0,
        comments: 0,
        shares: 0,
        saves: 0,
        reach: 0,
        impressions: 0
      },
      audience: {
        targetAge: '25-44',
        targetGender: 'All',
        targetLocation: 'California',
        targetInterests: ['Cannabis', 'Wellness', 'Lifestyle']
      }
    },
    {
      id: 'POST-002',
      platform: 'Facebook',
      type: 'Video',
      content: 'Behind the scenes at our cultivation facility! See how we grow the highest quality cannabis with sustainable practices. 🌱',
      media: ['/posts/cultivation-video.mp4'],
      scheduledTime: null,
      publishedTime: '2024-08-14 15:30:00',
      status: 'Published',
      campaign: 'Brand Awareness',
      hashtags: ['#Cannabis', '#Cultivation', '#Sustainable', '#Quality'],
      mentions: [],
      location: 'California, USA',
      engagement: {
        likes: 234,
        comments: 45,
        shares: 67,
        saves: 89,
        reach: 12450,
        impressions: 18670
      },
      audience: {
        targetAge: '25-54',
        targetGender: 'All',
        targetLocation: 'California',
        targetInterests: ['Cannabis', 'Agriculture', 'Sustainability']
      }
    },
    {
      id: 'POST-003',
      platform: 'Twitter',
      type: 'Text',
      content: 'Did you know? Cannabis terpenes contribute to the unique aroma and effects of each strain. Learn more about terpene profiles on our blog! 🧬 #CannabiEducation #Terpenes',
      media: [],
      scheduledTime: null,
      publishedTime: '2024-08-14 16:45:00',
      status: 'Published',
      campaign: 'Educational Content',
      hashtags: ['#CannabiEducation', '#Terpenes', '#Cannabis', '#Science'],
      mentions: ['@cannabis_science'],
      location: null,
      engagement: {
        likes: 89,
        comments: 23,
        shares: 34,
        saves: 0,
        reach: 5680,
        impressions: 8920
      },
      audience: {
        targetAge: '21-45',
        targetGender: 'All',
        targetLocation: 'California',
        targetInterests: ['Cannabis', 'Education', 'Science']
      }
    },
    {
      id: 'POST-004',
      platform: 'TikTok',
      type: 'Video',
      content: 'Cannabis 101: Understanding the difference between Indica, Sativa, and Hybrid strains 🌿 #CannabiEducation #Cannabis101',
      media: ['/posts/cannabis-education-tiktok.mp4'],
      scheduledTime: null,
      publishedTime: '2024-08-14 14:20:00',
      status: 'Published',
      campaign: 'Educational Content',
      hashtags: ['#CannabiEducation', '#Cannabis101', '#Indica', '#Sativa', '#Hybrid'],
      mentions: [],
      location: 'California, USA',
      engagement: {
        likes: 456,
        comments: 78,
        shares: 123,
        saves: 89,
        reach: 15680,
        impressions: 23450
      },
      audience: {
        targetAge: '18-34',
        targetGender: 'All',
        targetLocation: 'California',
        targetInterests: ['Cannabis', 'Education', 'Lifestyle']
      }
    },
    {
      id: 'POST-005',
      platform: 'Instagram',
      type: 'Carousel',
      content: 'Strain Spotlight: Blue Dream 💙 Swipe to see why this hybrid is a customer favorite! Perfect balance of relaxation and euphoria.',
      media: ['/posts/blue-dream-1.jpg', '/posts/blue-dream-2.jpg', '/posts/blue-dream-3.jpg'],
      scheduledTime: null,
      publishedTime: '2024-08-13 19:00:00',
      status: 'Published',
      campaign: 'Product Spotlight',
      hashtags: ['#BlueDream', '#Cannabis', '#Hybrid', '#StrainSpotlight', '#CustomerFavorite'],
      mentions: ['@strain_hunters'],
      location: 'California, USA',
      engagement: {
        likes: 567,
        comments: 89,
        shares: 45,
        saves: 123,
        reach: 18920,
        impressions: 28450
      },
      audience: {
        targetAge: '25-44',
        targetGender: 'All',
        targetLocation: 'California',
        targetInterests: ['Cannabis', 'Strains', 'Reviews']
      }
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAM-001',
      name: 'New Product Launch',
      description: 'Promote new strain releases and product launches',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      status: 'Active',
      budget: 5000.00,
      spent: 2340.50,
      platforms: ['Instagram', 'Facebook', 'TikTok'],
      objectives: ['Brand Awareness', 'Traffic', 'Conversions'],
      targetAudience: {
        age: '25-44',
        gender: 'All',
        location: 'California',
        interests: ['Cannabis', 'Wellness', 'Lifestyle']
      },
      performance: {
        reach: 125680,
        impressions: 234560,
        clicks: 5680,
        conversions: 234,
        ctr: 2.4,
        cpc: 0.41,
        cpa: 10.00,
        roas: 4.2
      },
      posts: 12,
      engagement: 4.6
    },
    {
      id: 'CAM-002',
      name: 'Educational Content',
      description: 'Cannabis education and awareness content',
      startDate: '2024-07-15',
      endDate: '2024-09-15',
      status: 'Active',
      budget: 3000.00,
      spent: 1890.75,
      platforms: ['Twitter', 'TikTok', 'Instagram'],
      objectives: ['Brand Awareness', 'Engagement'],
      targetAudience: {
        age: '21-45',
        gender: 'All',
        location: 'California',
        interests: ['Cannabis', 'Education', 'Health']
      },
      performance: {
        reach: 89450,
        impressions: 156780,
        clicks: 3450,
        conversions: 156,
        ctr: 2.2,
        cpc: 0.55,
        cpa: 12.12,
        roas: 3.8
      },
      posts: 18,
      engagement: 5.2
    },
    {
      id: 'CAM-003',
      name: 'Brand Awareness',
      description: 'General brand awareness and community building',
      startDate: '2024-06-01',
      endDate: '2024-12-31',
      status: 'Active',
      budget: 8000.00,
      spent: 4560.25,
      platforms: ['Instagram', 'Facebook', 'Twitter', 'TikTok'],
      objectives: ['Brand Awareness', 'Community Building'],
      targetAudience: {
        age: '21-54',
        gender: 'All',
        location: 'California',
        interests: ['Cannabis', 'Lifestyle', 'Wellness']
      },
      performance: {
        reach: 234560,
        impressions: 456780,
        clicks: 8920,
        conversions: 445,
        ctr: 2.0,
        cpc: 0.51,
        cpa: 10.25,
        roas: 5.1
      },
      posts: 35,
      engagement: 4.1
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalFollowers: 105770,
    totalPosts: 1879,
    avgEngagement: 4.25,
    totalReach: 339770,
    totalImpressions: 647570,
    websiteClicks: 2740,
    conversions: 835,
    revenue: 45680.75,
    roas: 4.6
  });

  const [contentCalendar, setContentCalendar] = useState([
    {
      date: '2024-08-15',
      posts: [
        { platform: 'Instagram', type: 'Photo', content: 'New strain alert! Premium OG Kush...', time: '18:00' },
        { platform: 'Facebook', type: 'Link', content: 'Check out our latest blog post...', time: '20:00' }
      ]
    },
    {
      date: '2024-08-16',
      posts: [
        { platform: 'TikTok', type: 'Video', content: 'Cannabis storage tips...', time: '15:00' },
        { platform: 'Twitter', type: 'Text', content: 'Friday fact: Cannabis terpenes...', time: '17:00' }
      ]
    },
    {
      date: '2024-08-17',
      posts: [
        { platform: 'Instagram', type: 'Story', content: 'Weekend delivery special...', time: '12:00' },
        { platform: 'Facebook', type: 'Event', content: 'Cannabis education webinar...', time: '14:00' }
      ]
    }
  ]);

  // Filter functions
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatform === 'all' || post.platform.toLowerCase() === selectedPlatform;
    const matchesStatus = selectedStatus === 'all' || post.status.toLowerCase() === selectedStatus;
    const matchesCampaign = selectedCampaign === 'all' || post.campaign.toLowerCase().includes(selectedCampaign.toLowerCase());
    return matchesSearch && matchesPlatform && matchesStatus && matchesCampaign;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Published': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Paused': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Instagram': return 'bg-pink-100 text-pink-800';
      case 'Facebook': return 'bg-blue-100 text-blue-800';
      case 'Twitter': return 'bg-sky-100 text-sky-800';
      case 'TikTok': return 'bg-purple-100 text-purple-800';
      case 'LinkedIn': return 'bg-indigo-100 text-indigo-800';
      case 'YouTube': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Instagram': return '📷';
      case 'Facebook': return '👥';
      case 'Twitter': return '🐦';
      case 'TikTok': return '🎵';
      case 'LinkedIn': return '💼';
      case 'YouTube': return '📺';
      default: return '📱';
    }
  };

  const getPostTypeIcon = (type) => {
    switch (type) {
      case 'Photo': return '📸';
      case 'Video': return '🎥';
      case 'Carousel': return '🖼️';
      case 'Story': return '📱';
      case 'Text': return '📝';
      case 'Link': return '🔗';
      case 'Event': return '📅';
      default: return '📄';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Followers</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalFollowers.toLocaleString()}</p>
              <p className="text-sm text-blue-600">Across all platforms</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgEngagement}%</p>
              <p className="text-sm text-green-600">Above industry avg</p>
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
              <p className="text-sm font-medium text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold text-gray-900">{(analytics.totalReach / 1000).toFixed(0)}k</p>
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
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.revenue / 1000).toFixed(0)}k</p>
              <p className="text-sm text-yellow-600">{analytics.roas}x ROAS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Platform Performance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {accounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getPlatformIcon(account.platform)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{account.platform}</h4>
                    <p className="text-sm text-gray-600">{account.username}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{account.followers.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{account.posts}</p>
                      <p className="text-xs text-gray-500">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{account.engagement}%</p>
                      <p className="text-xs text-gray-500">Engagement</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{(account.analytics.reach / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Reach</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(account.status)}`}>
                      {account.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Posts Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Posts Performance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {posts.filter(p => p.status === 'Published').slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getPostTypeIcon(post.type)}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(post.platform)}`}>
                        {post.platform}
                      </span>
                      <span className="text-xs text-gray-500">{post.publishedTime}</span>
                    </div>
                    <p className="text-sm text-gray-900 line-clamp-2">{post.content}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{post.engagement.likes}</p>
                      <p className="text-xs text-gray-500">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{post.engagement.comments}</p>
                      <p className="text-xs text-gray-500">Comments</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{post.engagement.shares}</p>
                      <p className="text-xs text-gray-500">Shares</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{(post.engagement.reach / 1000).toFixed(1)}k</p>
                      <p className="text-xs text-gray-500">Reach</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.filter(c => c.status === 'Active').map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">${campaign.spent.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{(campaign.performance.reach / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Reach</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{campaign.performance.roas}x</p>
                      <p className="text-xs text-gray-500">ROAS</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{campaign.engagement}</p>
                      <p className="text-xs text-gray-500">Engagement</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Calendar Preview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Content</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {contentCalendar.slice(0, 3).map((day) => (
              <div key={day.date} className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">{day.date}</h4>
                <div className="space-y-2">
                  {day.posts.map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mr-2 ${getPlatformColor(post.platform)}`}>
                          {post.platform}
                        </span>
                        <span className="text-sm text-gray-900">{post.content.substring(0, 50)}...</span>
                      </div>
                      <span className="text-sm text-gray-500">{post.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPosts = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search posts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
            >
              <option value="all">All Platforms</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="tiktok">TikTok</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Post
            </button>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{getPostTypeIcon(post.type)}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(post.platform)}`}>
                      {post.platform}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {post.status === 'Published' ? `Published: ${post.publishedTime}` : 
                     post.status === 'Scheduled' ? `Scheduled: ${post.scheduledTime}` : 'Draft'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Analytics
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-900 mb-2">{post.content}</p>
              {post.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {post.hashtags.map((hashtag, index) => (
                    <span key={index} className="text-blue-600 text-sm">{hashtag}</span>
                  ))}
                </div>
              )}
              {post.mentions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.mentions.map((mention, index) => (
                    <span key={index} className="text-purple-600 text-sm">{mention}</span>
                  ))}
                </div>
              )}
            </div>
            
            {post.status === 'Published' && (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{post.engagement.likes}</p>
                  <p className="text-xs text-gray-500">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{post.engagement.comments}</p>
                  <p className="text-xs text-gray-500">Comments</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{post.engagement.shares}</p>
                  <p className="text-xs text-gray-500">Shares</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{post.engagement.saves}</p>
                  <p className="text-xs text-gray-500">Saves</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{(post.engagement.reach / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">Reach</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600">{(post.engagement.impressions / 1000).toFixed(1)}k</p>
                  <p className="text-xs text-gray-500">Impressions</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Campaign: {post.campaign}</span>
              <span>Type: {post.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <p className="text-sm text-gray-600">{campaign.description}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                {campaign.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Duration:</p>
                <p className="text-sm text-gray-600">{campaign.startDate} - {campaign.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Budget:</p>
                <p className="text-sm text-gray-600">${campaign.budget.toLocaleString()} / ${campaign.spent.toLocaleString()} spent</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Platforms:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {campaign.platforms.map((platform, index) => (
                    <span key={index} className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(platform)}`}>
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Posts:</p>
                <p className="text-sm text-gray-600">{campaign.posts} posts • {campaign.engagement}% avg engagement</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{(campaign.performance.reach / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">Reach</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-purple-600">{(campaign.performance.impressions / 1000).toFixed(0)}k</p>
                <p className="text-xs text-gray-500">Impressions</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{campaign.performance.conversions}</p>
                <p className="text-xs text-gray-500">Conversions</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-600">{campaign.performance.roas}x</p>
                <p className="text-xs text-gray-500">ROAS</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">CTR:</p>
                <p className="text-sm text-gray-600">{campaign.performance.ctr}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">CPC:</p>
                <p className="text-sm text-gray-600">${campaign.performance.cpc}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">CPA:</p>
                <p className="text-sm text-gray-600">${campaign.performance.cpa}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Budget Used:</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{Math.round((campaign.spent / campaign.budget) * 100)}%</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit Campaign
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Analytics
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{analytics.totalFollowers.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Followers</div>
            <div className="text-xs text-gray-500 mt-1">All platforms</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.avgEngagement}%</div>
            <div className="text-sm text-gray-600">Average Engagement</div>
            <div className="text-xs text-gray-500 mt-1">Above industry avg</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{(analytics.totalReach / 1000).toFixed(0)}k</div>
            <div className="text-sm text-gray-600">Total Reach</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{analytics.roas}x</div>
            <div className="text-sm text-gray-600">Return on Ad Spend</div>
            <div className="text-xs text-gray-500 mt-1">${(analytics.revenue / 1000).toFixed(0)}k revenue</div>
          </div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Platform Analytics</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {accounts.map((account) => (
              <div key={account.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">{getPlatformIcon(account.platform)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{account.platform}</h4>
                      <p className="text-sm text-gray-600">{account.username}</p>
                    </div>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(account.platform)}`}>
                    {account.verified ? 'Verified' : 'Unverified'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{account.followers.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{account.engagement}%</p>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{(account.analytics.reach / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-gray-500">Reach</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">{account.analytics.websiteClicks}</p>
                    <p className="text-xs text-gray-500">Website Clicks</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Age Demographics</h5>
                  <div className="space-y-2">
                    {Object.entries(account.demographics.ageGroups).map(([age, percentage]) => (
                      <div key={age} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{age}</span>
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-gray-900">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Top Locations</h5>
                  <div className="flex flex-wrap gap-2">
                    {account.demographics.topLocations.map((location, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                        {location}
                      </span>
                    ))}
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
          <h1 className="text-3xl font-bold text-gray-900">Social Media Management</h1>
          <p className="mt-2 text-gray-600">Manage social media accounts, posts, campaigns, and analytics</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <nav className="flex space-x-8">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                { id: 'posts', name: 'Posts', icon: '📝' },
                { id: 'scheduler', name: 'Scheduler', icon: '⏰' },
                { id: 'campaigns', name: 'Campaigns', icon: '🎯' },
                { id: 'analytics', name: 'Analytics', icon: '📈' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
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
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowScheduler(true)}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                ⏰ Schedule Post
              </button>
              <button
                onClick={() => setShowCreatePost(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Create Post
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'posts' && renderPosts()}
        {activeTab === 'scheduler' && renderScheduler()}
        {activeTab === 'campaigns' && renderCampaigns()}
        {activeTab === 'analytics' && renderEnhancedAnalytics()}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
                <button 
                  onClick={() => setShowCreatePost(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platforms</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Instagram', 'Facebook', 'Twitter', 'TikTok'].map((platform) => (
                      <label key={platform} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={selectedPlatforms.includes(platform)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPlatforms([...selectedPlatforms, platform]);
                            } else {
                              setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
                            }
                          }}
                        />
                        <span className="ml-2 text-sm text-gray-700">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
                  <textarea
                    rows="6"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What's happening? Share your thoughts..."
                  ></textarea>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">{postContent.length}/280 characters</span>
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">📷 Add Media</button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">🔗 Add Link</button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">#️⃣ Add Hashtags</button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">AI Suggestions</h4>
                  <div className="space-y-2">
                    <button className="block w-full text-left p-2 text-sm text-blue-700 hover:bg-blue-100 rounded">
                      "🌿 Fresh cannabis delivery now available! Order premium strains with fast, discreet delivery. #CannabisDelivery #PremiumCannabis"
                    </button>
                    <button className="block w-full text-left p-2 text-sm text-blue-700 hover:bg-blue-100 rounded">
                      "New strain alert! 🔥 Try our latest Indica blend for the ultimate relaxation experience. Same-day delivery available! #NewStrain #Cannabis"
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {scheduledDate ? 'Schedule Post' : 'Post Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Modal */}
      {showAnalyticsModal && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Analytics - {selectedAccount.platform} ({selectedAccount.username})
                </h3>
                <button 
                  onClick={() => setShowAnalyticsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              {/* Analytics Content */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900">Total Reach</h4>
                    <p className="text-2xl font-bold text-blue-600">{selectedAccount.analytics.reach.toLocaleString()}</p>
                    <p className="text-sm text-blue-700">+12.5% vs last month</p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="text-sm font-medium text-green-900">Impressions</h4>
                    <p className="text-2xl font-bold text-green-600">{selectedAccount.analytics.impressions.toLocaleString()}</p>
                    <p className="text-sm text-green-700">+8.3% vs last month</p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-900">Engagement Rate</h4>
                    <p className="text-2xl font-bold text-purple-600">{selectedAccount.engagement}%</p>
                    <p className="text-sm text-purple-700">+0.7% vs last month</p>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="text-sm font-medium text-orange-900">Website Clicks</h4>
                    <p className="text-2xl font-bold text-orange-600">{selectedAccount.analytics.websiteClicks}</p>
                    <p className="text-sm text-orange-700">+15.2% vs last month</p>
                  </div>
                </div>
                
                {/* Performance Chart Placeholder */}
                <div className="p-6 border rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Performance Over Time</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">📈 Performance chart would be displayed here</p>
                  </div>
                </div>
                
                {/* Top Posts */}
                <div className="p-6 border rounded-lg">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Top Performing Posts</h4>
                  <div className="space-y-4">
                    {[
                      { content: "🌿 New premium strains now available! Fast delivery...", likes: 1250, comments: 89, shares: 45 },
                      { content: "Cannabis education: Understanding Indica vs Sativa...", likes: 980, comments: 156, shares: 78 },
                      { content: "Customer testimonial: 'Best delivery service ever!'", likes: 756, comments: 67, shares: 23 }
                    ].map((post, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                        <div className="flex space-x-4 text-sm text-gray-600">
                          <span>❤️ {post.likes}</span>
                          <span>💬 {post.comments}</span>
                          <span>🔄 {post.shares}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-6">
                <button
                  onClick={() => setShowAnalyticsModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // New Scheduler Component
  const renderScheduler = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Post Scheduler</h3>
          <button
            onClick={() => setShowCreatePost(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Schedule New Post
          </button>
        </div>
        
        {/* Calendar View */}
        <div className="grid grid-cols-7 gap-1 mb-6">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-600 bg-gray-50">
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {Array.from({ length: 35 }, (_, i) => {
            const dayNumber = i - 6; // Adjust for month start
            const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
            const hasScheduledPost = isCurrentMonth && [15, 18, 22, 25, 28].includes(dayNumber);
            
            return (
              <div
                key={i}
                className={`p-3 h-32 border border-gray-200 ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${hasScheduledPost ? 'bg-blue-50' : ''}`}
              >
                {isCurrentMonth && (
                  <>
                    <div className="text-sm font-medium text-gray-900 mb-2">{dayNumber}</div>
                    {hasScheduledPost && (
                      <div className="space-y-1">
                        <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded truncate">
                          10:00 AM - Instagram
                        </div>
                        {dayNumber === 22 && (
                          <div className="text-xs bg-green-600 text-white px-2 py-1 rounded truncate">
                            2:00 PM - Facebook
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Scheduled Posts List */}
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Upcoming Scheduled Posts</h4>
          <div className="space-y-4">
            {[
              {
                id: 1,
                content: "🌿 New premium strains available! Order now for same-day delivery...",
                platforms: ['Instagram', 'Facebook'],
                scheduledDate: '2024-08-15',
                scheduledTime: '10:00 AM',
                status: 'Scheduled'
              },
              {
                id: 2,
                content: "Cannabis education: Learn about the benefits of different terpenes...",
                platforms: ['Twitter', 'Instagram'],
                scheduledDate: '2024-08-18',
                scheduledTime: '2:00 PM',
                status: 'Scheduled'
              },
              {
                id: 3,
                content: "Customer spotlight: Amazing review from satisfied customer!",
                platforms: ['Facebook'],
                scheduledDate: '2024-08-22',
                scheduledTime: '11:30 AM',
                status: 'Scheduled'
              }
            ].map((post) => (
              <div key={post.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>📅 {post.scheduledDate}</span>
                      <span>⏰ {post.scheduledTime}</span>
                      <div className="flex space-x-1">
                        {post.platforms.map((platform, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                      {post.status}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Cancel</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Analytics Component
  const renderEnhancedAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{account.platform}</h3>
              <button
                onClick={() => {
                  setSelectedAccount(account);
                  setShowAnalyticsModal(true);
                }}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                View Details
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Followers:</span>
                <span className="text-sm font-medium text-gray-900">{account.followers.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Engagement:</span>
                <span className="text-sm font-medium text-green-600">{account.engagement}%</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Reach:</span>
                <span className="text-sm font-medium text-blue-600">{(account.analytics.reach / 1000).toFixed(0)}k</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Website Clicks:</span>
                <span className="text-sm font-medium text-purple-600">{account.analytics.websiteClicks}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="h-20 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">📊 Mini chart</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Comprehensive Analytics Dashboard */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Overall Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
            <h4 className="text-sm font-medium opacity-90">Total Reach</h4>
            <p className="text-2xl font-bold">
              {accounts.reduce((sum, acc) => sum + acc.analytics.reach, 0).toLocaleString()}
            </p>
            <p className="text-sm opacity-75">+15.3% vs last month</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg">
            <h4 className="text-sm font-medium opacity-90">Total Followers</h4>
            <p className="text-2xl font-bold">
              {accounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString()}
            </p>
            <p className="text-sm opacity-75">+8.7% vs last month</p>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg">
            <h4 className="text-sm font-medium opacity-90">Avg Engagement</h4>
            <p className="text-2xl font-bold">
              {(accounts.reduce((sum, acc) => sum + acc.engagement, 0) / accounts.length).toFixed(1)}%
            </p>
            <p className="text-sm opacity-75">+2.1% vs last month</p>
          </div>
        </div>
        
        {/* Performance Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Engagement Trends</h4>
            <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">📈 Engagement trend chart</p>
            </div>
          </div>
          
          <div className="p-4 border rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Platform Comparison</h4>
            <div className="space-y-3">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{account.platform}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(account.engagement / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-900">{account.engagement}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaModule;

