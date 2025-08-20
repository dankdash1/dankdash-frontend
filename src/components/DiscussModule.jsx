import React, { useState, useEffect } from 'react';

const DiscussModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);

  // Mock discussion data
  const [discussions, setDiscussions] = useState([
    {
      id: 'DISC-001',
      title: 'Q3 Cannabis Compliance Updates',
      category: 'Compliance',
      author: 'Sarah Johnson',
      authorRole: 'Compliance Manager',
      authorAvatar: '👩‍💼',
      createdAt: '2024-08-14 09:30:00',
      lastActivity: '2024-08-14 16:45:00',
      status: 'Active',
      priority: 'High',
      replies: 12,
      views: 89,
      participants: ['John Doe', 'Mike Chen', 'Lisa Wang', 'Alex Rodriguez'],
      tags: ['compliance', 'regulations', 'Q3', 'urgent'],
      pinned: true,
      locked: false,
      content: 'We need to discuss the new state regulations coming into effect next month. Please review the attached documents and share your thoughts.',
      attachments: ['Q3-Compliance-Updates.pdf', 'State-Regulations-Summary.docx'],
      lastReply: {
        author: 'Mike Chen',
        content: 'I\'ve reviewed the documents. We need to update our tracking procedures.',
        timestamp: '2024-08-14 16:45:00'
      }
    },
    {
      id: 'DISC-002',
      title: 'New Product Launch Strategy',
      category: 'Marketing',
      author: 'Alex Rodriguez',
      authorRole: 'Marketing Director',
      authorAvatar: '👨‍💼',
      createdAt: '2024-08-13 14:20:00',
      lastActivity: '2024-08-14 15:30:00',
      status: 'Active',
      priority: 'Medium',
      replies: 8,
      views: 156,
      participants: ['Sarah Johnson', 'Lisa Wang', 'Tom Wilson'],
      tags: ['marketing', 'product-launch', 'strategy'],
      pinned: false,
      locked: false,
      content: 'Let\'s brainstorm ideas for our upcoming edibles line launch. What marketing channels should we focus on?',
      attachments: ['Product-Launch-Timeline.xlsx'],
      lastReply: {
        author: 'Lisa Wang',
        content: 'Social media campaigns have been performing well. Let\'s double down on Instagram and TikTok.',
        timestamp: '2024-08-14 15:30:00'
      }
    },
    {
      id: 'DISC-003',
      title: 'Grow Room Temperature Issues',
      category: 'Operations',
      author: 'Mike Chen',
      authorRole: 'Grow Manager',
      authorAvatar: '🌱',
      createdAt: '2024-08-13 11:15:00',
      lastActivity: '2024-08-14 12:20:00',
      status: 'Resolved',
      priority: 'High',
      replies: 15,
      views: 203,
      participants: ['John Doe', 'Sarah Johnson', 'Tom Wilson', 'Lisa Wang'],
      tags: ['grow-room', 'temperature', 'equipment', 'resolved'],
      pinned: false,
      locked: true,
      content: 'Room 3 is showing temperature fluctuations. HVAC system needs immediate attention.',
      attachments: ['Temperature-Logs.csv', 'HVAC-Maintenance-Report.pdf'],
      lastReply: {
        author: 'Tom Wilson',
        content: 'Issue resolved. New HVAC controller installed and temperatures are stable.',
        timestamp: '2024-08-14 12:20:00'
      }
    },
    {
      id: 'DISC-004',
      title: 'Customer Feedback Analysis',
      category: 'Customer Service',
      author: 'Lisa Wang',
      authorRole: 'Customer Success Manager',
      authorAvatar: '👩‍💻',
      createdAt: '2024-08-12 16:45:00',
      lastActivity: '2024-08-14 10:15:00',
      status: 'Active',
      priority: 'Medium',
      replies: 6,
      views: 124,
      participants: ['Alex Rodriguez', 'Sarah Johnson', 'John Doe'],
      tags: ['customer-feedback', 'analysis', 'improvement'],
      pinned: false,
      locked: false,
      content: 'Monthly customer feedback summary is ready. Several areas for improvement identified.',
      attachments: ['Customer-Feedback-Report.pdf'],
      lastReply: {
        author: 'John Doe',
        content: 'Great insights! Let\'s schedule a meeting to discuss implementation.',
        timestamp: '2024-08-14 10:15:00'
      }
    },
    {
      id: 'DISC-005',
      title: 'Team Building Event Planning',
      category: 'HR',
      author: 'Tom Wilson',
      authorRole: 'HR Manager',
      authorAvatar: '👨‍💼',
      createdAt: '2024-08-12 09:30:00',
      lastActivity: '2024-08-13 17:20:00',
      status: 'Planning',
      priority: 'Low',
      replies: 4,
      views: 67,
      participants: ['Lisa Wang', 'Alex Rodriguez'],
      tags: ['team-building', 'event', 'planning', 'hr'],
      pinned: false,
      locked: false,
      content: 'Planning our quarterly team building event. Looking for venue and activity suggestions.',
      attachments: [],
      lastReply: {
        author: 'Alex Rodriguez',
        content: 'How about a cannabis farm tour followed by a cooking class?',
        timestamp: '2024-08-13 17:20:00'
      }
    }
  ]);

  const [categories] = useState([
    { id: 'compliance', name: 'Compliance', color: 'bg-red-100 text-red-700', count: 8 },
    { id: 'marketing', name: 'Marketing', color: 'bg-blue-100 text-blue-700', count: 12 },
    { id: 'operations', name: 'Operations', color: 'bg-green-100 text-green-700', count: 15 },
    { id: 'customer-service', name: 'Customer Service', color: 'bg-purple-100 text-purple-700', count: 6 },
    { id: 'hr', name: 'HR', color: 'bg-yellow-100 text-yellow-700', count: 4 },
    { id: 'general', name: 'General', color: 'bg-gray-100 text-gray-700', count: 9 }
  ]);

  const [analytics] = useState({
    totalDiscussions: 54,
    activeDiscussions: 32,
    totalReplies: 287,
    totalParticipants: 18,
    avgResponseTime: '2.4 hours',
    resolutionRate: 78.5,
    engagementScore: 85.2,
    topContributors: [
      { name: 'Sarah Johnson', posts: 23, replies: 45 },
      { name: 'Mike Chen', posts: 18, replies: 38 },
      { name: 'Alex Rodriguez', posts: 15, replies: 32 }
    ]
  });

  // Filter discussions based on search and filters
  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || discussion.category.toLowerCase().replace(' ', '-') === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || discussion.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'resolved': return 'bg-blue-100 text-blue-700';
      case 'planning': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💬</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Discussions</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalDiscussions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Discussions</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeDiscussions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💭</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Replies</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalReplies}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Participants</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalParticipants}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Response Time</span>
              <span className="text-sm font-medium text-gray-900">{analytics.avgResponseTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Resolution Rate</span>
              <span className="text-sm font-medium text-gray-900">{analytics.resolutionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Engagement Score</span>
              <span className="text-sm font-medium text-gray-900">{analytics.engagementScore}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contributors</h3>
          <div className="space-y-3">
            {analytics.topContributors.map((contributor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-700">{contributor.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{contributor.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {contributor.posts} posts, {contributor.replies} replies
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Discussion Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div key={category.id} className="text-center">
              <div className={`inline-flex px-3 py-2 rounded-full text-sm font-medium ${category.color} mb-2`}>
                {category.name}
              </div>
              <p className="text-lg font-bold text-gray-900">{category.count}</p>
              <p className="text-xs text-gray-600">discussions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="planning">Planning</option>
              <option value="closed">Closed</option>
            </select>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowCreateModal(true)}
            >
              New Discussion
            </button>
          </div>
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <div key={discussion.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{discussion.authorAvatar}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {discussion.pinned && (
                      <span className="text-yellow-500">📌</span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {discussion.title}
                    </h3>
                    {discussion.locked && (
                      <span className="text-gray-500">🔒</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    by <span className="font-medium">{discussion.author}</span> • {discussion.authorRole}
                  </p>
                  <p className="text-gray-700 mb-3 line-clamp-2">{discussion.content}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {discussion.tags.map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Attachments */}
                  {discussion.attachments.length > 0 && (
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-gray-500">📎</span>
                      <span className="text-sm text-gray-600">{discussion.attachments.length} attachment(s)</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="flex space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(discussion.status)}`}>
                    {discussion.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(discussion.priority)}`}>
                    {discussion.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(discussion.lastActivity).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Discussion Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <span className="flex items-center">
                  <span className="mr-1">💬</span>
                  {discussion.replies} replies
                </span>
                <span className="flex items-center">
                  <span className="mr-1">👀</span>
                  {discussion.views} views
                </span>
                <span className="flex items-center">
                  <span className="mr-1">👥</span>
                  {discussion.participants.length} participants
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  View
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  Reply
                </button>
              </div>
            </div>

            {/* Last Reply Preview */}
            {discussion.lastReply && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">Latest: {discussion.lastReply.author}</span>
                  <span className="text-xs text-gray-500">{new Date(discussion.lastReply.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-700">{discussion.lastReply.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Discussion Categories</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Category
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{category.name}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${category.color}`}>
                  {category.count} discussions
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Category for {category.name.toLowerCase()} related discussions and collaboration.
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Discussions
                </button>
                <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Edit Category
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderParticipants = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Participants</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analytics.topContributors.map((contributor, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-lg font-medium text-blue-700">{contributor.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{contributor.name}</h4>
                  <p className="text-sm text-gray-600">Active Contributor</p>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Posts Created</span>
                  <span className="text-sm font-medium text-gray-900">{contributor.posts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Replies</span>
                  <span className="text-sm font-medium text-gray-900">{contributor.replies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Engagement</span>
                  <span className="text-sm font-medium text-green-600">High</span>
                </div>
              </div>
              
              <button className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Discussions</h1>
          <p className="mt-2 text-gray-600">Collaborate, share ideas, and stay connected with your team</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'discussions', name: 'Discussions', icon: '💬' },
              { id: 'categories', name: 'Categories', icon: '📁' },
              { id: 'participants', name: 'Participants', icon: '👥' }
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
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'discussions' && renderDiscussions()}
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'participants' && renderParticipants()}
      </div>

      {/* Create Discussion Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Discussion</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter discussion title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Write your discussion content..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tags separated by commas..."
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Pin this discussion</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Discussion
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussModule;

