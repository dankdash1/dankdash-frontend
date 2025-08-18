import React, { useState, useEffect } from 'react';

const KnowledgeBaseModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    author: '',
    dateRange: '',
    tags: [],
    difficulty: '',
    hasAttachments: false
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Mock knowledge base data
  const [articles, setArticles] = useState([
    {
      id: 'KB-001',
      title: 'Cannabis Delivery Process and Timeline',
      category: 'Delivery',
      type: 'FAQ',
      status: 'Published',
      author: 'Sarah Johnson',
      createdDate: '2024-08-01',
      lastModified: '2024-08-10',
      views: 2450,
      likes: 89,
      helpful: 156,
      notHelpful: 12,
      tags: ['delivery', 'timeline', 'process', 'faq'],
      content: 'Learn about our cannabis delivery process, estimated delivery times, and what to expect when placing an order with DankDash.',
      excerpt: 'Complete guide to understanding our delivery process from order placement to doorstep delivery.',
      readTime: 5,
      difficulty: 'Beginner',
      featured: true,
      relatedArticles: ['KB-002', 'KB-015', 'KB-023'],
      attachments: ['delivery-process-flowchart.pdf', 'delivery-zones-map.jpg'],
      lastReviewed: '2024-08-10',
      reviewedBy: 'Mike Chen',
      version: '2.1'
    },
    {
      id: 'KB-002',
      title: 'Understanding Cannabis Strains: Indica vs Sativa vs Hybrid',
      category: 'Education',
      type: 'Guide',
      status: 'Published',
      author: 'Dr. Jennifer Park',
      createdDate: '2024-07-15',
      lastModified: '2024-08-05',
      views: 3680,
      likes: 234,
      helpful: 298,
      notHelpful: 23,
      tags: ['strains', 'indica', 'sativa', 'hybrid', 'education'],
      content: 'Comprehensive guide to understanding the differences between Indica, Sativa, and Hybrid cannabis strains, their effects, and how to choose the right one.',
      excerpt: 'Learn the key differences between cannabis strain types and their unique characteristics and effects.',
      readTime: 8,
      difficulty: 'Beginner',
      featured: true,
      relatedArticles: ['KB-003', 'KB-012', 'KB-018'],
      attachments: ['strain-comparison-chart.pdf', 'terpene-wheel.jpg'],
      lastReviewed: '2024-08-05',
      reviewedBy: 'Alex Kim',
      version: '3.0'
    },
    {
      id: 'KB-003',
      title: 'Cannabis Terpenes and Their Effects',
      category: 'Education',
      type: 'Guide',
      status: 'Published',
      author: 'Dr. Jennifer Park',
      createdDate: '2024-07-20',
      lastModified: '2024-08-01',
      views: 1890,
      likes: 145,
      helpful: 178,
      notHelpful: 15,
      tags: ['terpenes', 'effects', 'aromatherapy', 'science'],
      content: 'Deep dive into cannabis terpenes, their aromatic profiles, therapeutic effects, and how they contribute to the entourage effect.',
      excerpt: 'Explore the science behind cannabis terpenes and how they influence the overall cannabis experience.',
      readTime: 12,
      difficulty: 'Intermediate',
      featured: false,
      relatedArticles: ['KB-002', 'KB-004', 'KB-019'],
      attachments: ['terpene-profiles.pdf', 'entourage-effect-diagram.jpg'],
      lastReviewed: '2024-08-01',
      reviewedBy: 'Sarah Johnson',
      version: '1.5'
    },
    {
      id: 'KB-004',
      title: 'Proper Cannabis Storage and Preservation',
      category: 'Usage',
      type: 'How-to',
      status: 'Published',
      author: 'Mike Chen',
      createdDate: '2024-07-25',
      lastModified: '2024-07-30',
      views: 1245,
      likes: 67,
      helpful: 89,
      notHelpful: 8,
      tags: ['storage', 'preservation', 'freshness', 'quality'],
      content: 'Best practices for storing cannabis products to maintain potency, flavor, and quality over time.',
      excerpt: 'Learn how to properly store your cannabis products to preserve their quality and potency.',
      readTime: 6,
      difficulty: 'Beginner',
      featured: false,
      relatedArticles: ['KB-005', 'KB-016', 'KB-021'],
      attachments: ['storage-guide.pdf', 'humidity-chart.jpg'],
      lastReviewed: '2024-07-30',
      reviewedBy: 'Lisa Rodriguez',
      version: '1.2'
    },
    {
      id: 'KB-005',
      title: 'Cannabis Dosage Guidelines for Beginners',
      category: 'Usage',
      type: 'Guide',
      status: 'Published',
      author: 'Dr. Jennifer Park',
      createdDate: '2024-06-30',
      lastModified: '2024-08-12',
      views: 4250,
      likes: 312,
      helpful: 398,
      notHelpful: 28,
      tags: ['dosage', 'beginners', 'safety', 'microdosing'],
      content: 'Comprehensive dosage guidelines for cannabis beginners, including microdosing techniques and safety considerations.',
      excerpt: 'Essential dosage information for new cannabis users to ensure a safe and enjoyable experience.',
      readTime: 10,
      difficulty: 'Beginner',
      featured: true,
      relatedArticles: ['KB-006', 'KB-017', 'KB-024'],
      attachments: ['dosage-calculator.pdf', 'onset-time-chart.jpg'],
      lastReviewed: '2024-08-12',
      reviewedBy: 'Dr. Jennifer Park',
      version: '2.3'
    },
    {
      id: 'KB-006',
      title: 'California Cannabis Laws and Regulations',
      category: 'Legal',
      type: 'Reference',
      status: 'Published',
      author: 'Legal Team',
      createdDate: '2024-06-15',
      lastModified: '2024-08-14',
      views: 1890,
      likes: 78,
      helpful: 134,
      notHelpful: 19,
      tags: ['legal', 'california', 'regulations', 'compliance'],
      content: 'Current California cannabis laws, regulations, and compliance requirements for consumers and businesses.',
      excerpt: 'Stay informed about California cannabis laws and what you need to know as a consumer.',
      readTime: 15,
      difficulty: 'Advanced',
      featured: false,
      relatedArticles: ['KB-007', 'KB-020', 'KB-025'],
      attachments: ['ca-cannabis-laws.pdf', 'compliance-checklist.pdf'],
      lastReviewed: '2024-08-14',
      reviewedBy: 'Legal Team',
      version: '4.1'
    },
    {
      id: 'KB-007',
      title: 'Account Setup and Profile Management',
      category: 'Account',
      type: 'How-to',
      status: 'Published',
      author: 'Customer Support',
      createdDate: '2024-08-05',
      lastModified: '2024-08-08',
      views: 890,
      likes: 45,
      helpful: 67,
      notHelpful: 5,
      tags: ['account', 'setup', 'profile', 'verification'],
      content: 'Step-by-step guide to setting up your DankDash account, completing verification, and managing your profile.',
      excerpt: 'Get started with DankDash by setting up your account and completing the verification process.',
      readTime: 7,
      difficulty: 'Beginner',
      featured: false,
      relatedArticles: ['KB-008', 'KB-013', 'KB-022'],
      attachments: ['account-setup-guide.pdf', 'verification-requirements.jpg'],
      lastReviewed: '2024-08-08',
      reviewedBy: 'Customer Support',
      version: '1.0'
    },
    {
      id: 'KB-008',
      title: 'Payment Methods and Security',
      category: 'Payment',
      type: 'FAQ',
      status: 'Published',
      author: 'Finance Team',
      createdDate: '2024-07-10',
      lastModified: '2024-08-06',
      views: 1567,
      likes: 89,
      helpful: 123,
      notHelpful: 11,
      tags: ['payment', 'security', 'methods', 'safety'],
      content: 'Information about accepted payment methods, security measures, and how we protect your financial information.',
      excerpt: 'Learn about our secure payment options and how we protect your financial information.',
      readTime: 5,
      difficulty: 'Beginner',
      featured: false,
      relatedArticles: ['KB-009', 'KB-014', 'KB-026'],
      attachments: ['payment-security.pdf', 'accepted-payments.jpg'],
      lastReviewed: '2024-08-06',
      reviewedBy: 'Finance Team',
      version: '1.8'
    }
  ]);

  const [categories, setCategories] = useState([
    {
      id: 'delivery',
      name: 'Delivery',
      description: 'Information about our delivery service, timelines, and process',
      icon: '🚚',
      articleCount: 15,
      color: 'blue',
      featured: true
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Cannabis education, strain information, and scientific content',
      icon: '🎓',
      articleCount: 23,
      color: 'green',
      featured: true
    },
    {
      id: 'usage',
      name: 'Usage',
      description: 'How to use cannabis products safely and effectively',
      icon: '💡',
      articleCount: 18,
      color: 'purple',
      featured: true
    },
    {
      id: 'legal',
      name: 'Legal',
      description: 'Cannabis laws, regulations, and compliance information',
      icon: '⚖️',
      articleCount: 12,
      color: 'red',
      featured: false
    },
    {
      id: 'account',
      name: 'Account',
      description: 'Account management, profile setup, and verification',
      icon: '👤',
      articleCount: 9,
      color: 'yellow',
      featured: false
    },
    {
      id: 'payment',
      name: 'Payment',
      description: 'Payment methods, billing, and financial security',
      icon: '💳',
      articleCount: 7,
      color: 'indigo',
      featured: false
    },
    {
      id: 'troubleshooting',
      name: 'Troubleshooting',
      description: 'Common issues and their solutions',
      icon: '🔧',
      articleCount: 14,
      color: 'orange',
      featured: false
    },
    {
      id: 'products',
      name: 'Products',
      description: 'Product information, reviews, and recommendations',
      icon: '🌿',
      articleCount: 21,
      color: 'teal',
      featured: true
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalArticles: 127,
    totalViews: 45680,
    avgRating: 4.6,
    helpfulVotes: 2340,
    searchQueries: 8920,
    topSearches: ['delivery time', 'dosage guide', 'strain types', 'payment methods', 'account setup'],
    popularArticles: ['KB-005', 'KB-002', 'KB-001'],
    recentActivity: 156,
    userSatisfaction: 89.2
  });

  const [feedback, setFeedback] = useState([
    {
      id: 'FB-001',
      articleId: 'KB-002',
      articleTitle: 'Understanding Cannabis Strains',
      rating: 5,
      comment: 'Very helpful article! Clear explanations and great examples.',
      author: 'Anonymous User',
      date: '2024-08-14',
      helpful: true,
      status: 'Published'
    },
    {
      id: 'FB-002',
      articleId: 'KB-005',
      articleTitle: 'Cannabis Dosage Guidelines',
      rating: 4,
      comment: 'Good information but could use more specific examples for edibles.',
      author: 'Cannabis Newbie',
      date: '2024-08-13',
      helpful: true,
      status: 'Published'
    },
    {
      id: 'FB-003',
      articleId: 'KB-001',
      articleTitle: 'Cannabis Delivery Process',
      rating: 5,
      comment: 'Exactly what I needed to know about the delivery process!',
      author: 'First Time Customer',
      date: '2024-08-12',
      helpful: true,
      status: 'Published'
    }
  ]);

  // Filter functions
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status.toLowerCase() === selectedStatus;
    const matchesType = selectedType === 'all' || article.type.toLowerCase() === selectedType;
    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Review': return 'bg-blue-100 text-blue-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'FAQ': return 'bg-blue-100 text-blue-800';
      case 'Guide': return 'bg-green-100 text-green-800';
      case 'How-to': return 'bg-purple-100 text-purple-800';
      case 'Reference': return 'bg-yellow-100 text-yellow-800';
      case 'Tutorial': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const categoryData = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
    return categoryData ? `bg-${categoryData.color}-100 text-${categoryData.color}-800` : 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'FAQ': return '❓';
      case 'Guide': return '📖';
      case 'How-to': return '🛠️';
      case 'Reference': return '📋';
      case 'Tutorial': return '🎯';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalArticles}</p>
              <p className="text-sm text-blue-600">8 categories</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{(analytics.totalViews / 1000).toFixed(0)}k</p>
              <p className="text-sm text-green-600">This month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgRating}</p>
              <p className="text-sm text-purple-600">Out of 5.0</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Helpful Votes</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.helpfulVotes.toLocaleString()}</p>
              <p className="text-sm text-yellow-600">{analytics.userSatisfaction}% satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Knowledge Base Categories</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.filter(c => c.featured).map((category) => (
              <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center mb-3">
                  <div className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-500">{category.articleCount} articles</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Most Popular Articles</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {articles.filter(a => analytics.popularArticles.includes(a.id)).map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getTypeIcon(article.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{article.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{article.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{article.likes}</p>
                      <p className="text-xs text-gray-500">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{Math.round((article.helpful / (article.helpful + article.notHelpful)) * 100)}%</p>
                      <p className="text-xs text-gray-500">Helpful</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Search Queries */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Top Search Queries</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {analytics.topSearches.map((query, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                  </div>
                  <span className="text-gray-900">{query}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Popular search</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Create Article</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {feedback.slice(0, 3).map((fb) => (
              <div key={fb.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < fb.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{fb.author}</span>
                  </div>
                  <span className="text-sm text-gray-500">{fb.date}</span>
                </div>
                <p className="text-sm text-gray-900 mb-2">{fb.comment}</p>
                <p className="text-xs text-gray-500">Article: {fb.articleTitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name.toLowerCase()}>{category.name}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="faq">FAQ</option>
              <option value="guide">Guide</option>
              <option value="how-to">How-to</option>
              <option value="reference">Reference</option>
              <option value="tutorial">Tutorial</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Article
            </button>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getTypeIcon(article.type)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(article.type)}`}>
                      {article.type}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(article.status)}`}>
                      {article.status}
                    </span>
                    {article.featured && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
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
            
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Author:</p>
                <p className="text-sm text-gray-600">{article.author}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Last Modified:</p>
                <p className="text-sm text-gray-600">{article.lastModified}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Read Time:</p>
                <p className="text-sm text-gray-600">{article.readTime} min</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Version:</p>
                <p className="text-sm text-gray-600">v{article.version}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{article.views.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Views</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{article.likes}</p>
                <p className="text-xs text-gray-500">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{article.helpful}</p>
                <p className="text-xs text-gray-500">Helpful</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{Math.round((article.helpful / (article.helpful + article.notHelpful)) * 100)}%</p>
                <p className="text-xs text-gray-500">Helpful Rate</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            {article.attachments && article.attachments.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                <div className="flex flex-wrap gap-2">
                  {article.attachments.map((attachment, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                      📎 {attachment}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Last reviewed by {article.reviewedBy} on {article.lastReviewed}</span>
              <span>Created: {article.createdDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Category
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.articleCount} articles</p>
                </div>
              </div>
              {category.featured && (
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                  Featured
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4">{category.description}</p>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Articles
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit Category
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
            <div className="text-3xl font-bold text-blue-600">{analytics.totalViews.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Views</div>
            <div className="text-xs text-gray-500 mt-1">All time</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.searchQueries.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Search Queries</div>
            <div className="text-xs text-gray-500 mt-1">This month</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{analytics.avgRating}</div>
            <div className="text-sm text-gray-600">Average Rating</div>
            <div className="text-xs text-gray-500 mt-1">Out of 5.0</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{analytics.userSatisfaction}%</div>
            <div className="text-sm text-gray-600">User Satisfaction</div>
            <div className="text-xs text-gray-500 mt-1">Helpful votes</div>
          </div>
        </div>
      </div>

      {/* Article Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Articles</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {articles.sort((a, b) => b.views - a.views).slice(0, 5).map((article, index) => (
              <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{article.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.readTime} min read</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{article.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{article.likes}</p>
                      <p className="text-xs text-gray-500">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{Math.round((article.helpful / (article.helpful + article.notHelpful)) * 100)}%</p>
                      <p className="text-xs text-gray-500">Helpful</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Analytics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Search Analytics</h3>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <h4 className="text-md font-medium text-gray-900 mb-4">Top Search Queries</h4>
            <div className="space-y-3">
              {analytics.topSearches.map((query, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                    </div>
                    <span className="text-gray-900">{query}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">High volume</span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View Results</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {categories.sort((a, b) => b.articleCount - a.articleCount).map((category) => (
              <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 bg-${category.color}-100 rounded-lg flex items-center justify-center mr-3`}>
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{category.articleCount}</p>
                      <p className="text-xs text-gray-500">Articles</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">
                        {articles.filter(a => a.category.toLowerCase() === category.name.toLowerCase()).reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Total Views</p>
                    </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="mt-2 text-gray-600">Manage articles, categories, and help documentation</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <nav className="flex space-x-8">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: '📊' },
                { id: 'articles', name: 'Articles', icon: '📄' },
                { id: 'search', name: 'Advanced Search', icon: '🔍' },
                { id: 'files', name: 'File Manager', icon: '📁' },
                { id: 'categories', name: 'Categories', icon: '🏷️' },
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
                onClick={() => setShowFileUpload(true)}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                📎 Upload Files
              </button>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Create Article
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'articles' && renderArticles()}
        {activeTab === 'search' && renderAdvancedSearch()}
        {activeTab === 'files' && renderFileManager()}
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>

      {/* Create Article Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Article</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Article title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="delivery">Delivery</option>
                      <option value="education">Education</option>
                      <option value="compliance">Compliance</option>
                      <option value="products">Products</option>
                      <option value="troubleshooting">Troubleshooting</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="faq">FAQ</option>
                      <option value="guide">Guide</option>
                      <option value="tutorial">Tutorial</option>
                      <option value="policy">Policy</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tags separated by commas"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                  <textarea
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the article..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    rows="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Article content..."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="text-gray-400 mb-2">
                      <span className="text-3xl">📎</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      id="file-upload"
                      onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-blue-600 hover:text-blue-800"
                    >
                      Choose Files
                    </label>
                  </div>
                  
                  {selectedFiles.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Selected Files:</p>
                      <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <button
                              onClick={() => setSelectedFiles(files => files.filter((_, i) => i !== index))}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Publish Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Upload Modal */}
      {showFileUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Upload Files</h3>
                <button 
                  onClick={() => setShowFileUpload(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
                <div className="text-gray-400 mb-4">
                  <span className="text-6xl">📁</span>
                </div>
                <p className="text-lg text-gray-600 mb-2">Drag and drop files here</p>
                <p className="text-sm text-gray-500 mb-4">or click to browse from your computer</p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  id="bulk-file-upload"
                  onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                />
                <label
                  htmlFor="bulk-file-upload"
                  className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Choose Files
                </label>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="documents">Documents</option>
                    <option value="images">Images</option>
                    <option value="videos">Videos</option>
                    <option value="templates">Templates</option>
                    <option value="forms">Forms</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tags separated by commas"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6">
                <button
                  onClick={() => setShowFileUpload(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // New Advanced Search Component
  const renderAdvancedSearch = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Search</h3>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Term</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter search keywords..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
              <input
                type="text"
                value={searchFilters.author}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Author name..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="delivery">Delivery</option>
                <option value="education">Education</option>
                <option value="compliance">Compliance</option>
                <option value="products">Products</option>
                <option value="troubleshooting">Troubleshooting</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={searchFilters.difficulty}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={searchFilters.dateRange}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={searchFilters.hasAttachments}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, hasAttachments: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Has Attachments</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter tags separated by commas..."
            />
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSearchFilters({
                  author: '',
                  dateRange: '',
                  tags: [],
                  difficulty: '',
                  hasAttachments: false
                });
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Search Articles
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Search Results</h3>
          <span className="text-sm text-gray-600">Found 42 articles</span>
        </div>
        
        <div className="space-y-4">
          {articles.slice(0, 5).map((article) => (
            <div key={article.id} className="p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{article.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{article.excerpt}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {article.author}</span>
                    <span>•</span>
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{article.readTime} min read</span>
                    <span>•</span>
                    <span>{article.views} views</span>
                    {article.attachments && article.attachments.length > 0 && (
                      <>
                        <span>•</span>
                        <span className="flex items-center">
                          📎 {article.attachments.length} files
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    {article.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{article.tags.length - 3} more</span>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    article.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {article.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">{article.lastModified}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // New File Manager Component
  const renderFileManager = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">File Manager</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
              📁 New Folder
            </button>
            <button
              onClick={() => setShowFileUpload(true)}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              📤 Upload
            </button>
          </div>
        </div>
        
        {/* File Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {[
            { name: 'Documents', icon: '📄', count: 45, color: 'blue' },
            { name: 'Images', icon: '🖼️', count: 128, color: 'green' },
            { name: 'Videos', icon: '🎥', count: 23, color: 'purple' },
            { name: 'Templates', icon: '📋', count: 12, color: 'orange' },
            { name: 'Forms', icon: '📝', count: 8, color: 'red' },
            { name: 'Archives', icon: '🗜️', count: 15, color: 'gray' }
          ].map((category) => (
            <div key={category.name} className={`p-4 border rounded-lg hover:bg-${category.color}-50 cursor-pointer`}>
              <div className="text-center">
                <div className="text-3xl mb-2">{category.icon}</div>
                <h4 className="font-medium text-gray-900">{category.name}</h4>
                <p className="text-sm text-gray-600">{category.count} files</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recent Files */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Recent Files</h4>
          <div className="space-y-3">
            {[
              { name: 'delivery-process-flowchart.pdf', type: 'PDF', size: '2.4 MB', modified: '2024-08-14', category: 'Documents' },
              { name: 'cannabis-strains-guide.jpg', type: 'Image', size: '1.8 MB', modified: '2024-08-13', category: 'Images' },
              { name: 'compliance-checklist.docx', type: 'Document', size: '456 KB', modified: '2024-08-12', category: 'Documents' },
              { name: 'product-catalog-template.xlsx', type: 'Spreadsheet', size: '1.2 MB', modified: '2024-08-11', category: 'Templates' },
              { name: 'training-video-intro.mp4', type: 'Video', size: '45.6 MB', modified: '2024-08-10', category: 'Videos' }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">
                      {file.type === 'PDF' && '📄'}
                      {file.type === 'Image' && '🖼️'}
                      {file.type === 'Document' && '📝'}
                      {file.type === 'Spreadsheet' && '📊'}
                      {file.type === 'Video' && '🎥'}
                    </span>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">{file.name}</h5>
                    <p className="text-sm text-gray-600">{file.type} • {file.size}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{file.modified}</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    <button className="text-green-600 hover:text-green-800 text-sm">Download</button>
                    <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

