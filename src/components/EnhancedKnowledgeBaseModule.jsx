import React, { useState, useEffect } from 'react';

const EnhancedKnowledgeBaseModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Enhanced knowledge base data with full functionality
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
      content: 'Learn about our cannabis delivery process, estimated delivery times, and what to expect when placing an order with DankDash. Our delivery service operates 7 days a week with same-day delivery available in most areas.',
      excerpt: 'Complete guide to understanding our delivery process from order placement to doorstep delivery.',
      readTime: 5,
      difficulty: 'Beginner',
      featured: true,
      relatedArticles: ['KB-002', 'KB-015', 'KB-023'],
      attachments: ['delivery-process-flowchart.pdf', 'delivery-zones-map.jpg'],
      lastReviewed: '2024-08-10',
      reviewedBy: 'Mike Chen',
      version: '2.1',
      priority: 'High',
      language: 'English',
      seoKeywords: ['cannabis delivery', 'delivery process', 'timeline', 'same day delivery']
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
      content: 'Comprehensive guide to understanding the differences between Indica, Sativa, and Hybrid cannabis strains, their effects, and how to choose the right one for your needs. Includes detailed information about cannabinoid profiles and terpene effects.',
      excerpt: 'Learn the key differences between cannabis strain types and their unique characteristics and effects.',
      readTime: 8,
      difficulty: 'Beginner',
      featured: true,
      relatedArticles: ['KB-003', 'KB-012', 'KB-018'],
      attachments: ['strain-comparison-chart.pdf', 'terpene-wheel.jpg'],
      lastReviewed: '2024-08-05',
      reviewedBy: 'Alex Kim',
      version: '3.0',
      priority: 'High',
      language: 'English',
      seoKeywords: ['cannabis strains', 'indica', 'sativa', 'hybrid', 'strain guide']
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
      content: 'Deep dive into cannabis terpenes, their aromatic profiles, therapeutic effects, and how they contribute to the entourage effect. Learn about myrcene, limonene, pinene, and other important terpenes.',
      excerpt: 'Explore the science behind cannabis terpenes and how they influence the overall cannabis experience.',
      readTime: 12,
      difficulty: 'Intermediate',
      featured: false,
      relatedArticles: ['KB-002', 'KB-004', 'KB-019'],
      attachments: ['terpene-profiles.pdf', 'entourage-effect-diagram.jpg'],
      lastReviewed: '2024-08-01',
      reviewedBy: 'Sarah Johnson',
      version: '1.5',
      priority: 'Medium',
      language: 'English',
      seoKeywords: ['cannabis terpenes', 'terpene effects', 'entourage effect', 'aromatherapy']
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
      content: 'Learn the best practices for storing cannabis to maintain potency, flavor, and freshness. Includes information about humidity control, temperature, light exposure, and proper containers.',
      excerpt: 'Essential tips for keeping your cannabis fresh and potent with proper storage techniques.',
      readTime: 6,
      difficulty: 'Beginner',
      featured: false,
      relatedArticles: ['KB-005', 'KB-011', 'KB-020'],
      attachments: ['storage-guide.pdf', 'humidity-chart.jpg'],
      lastReviewed: '2024-07-30',
      reviewedBy: 'Dr. Jennifer Park',
      version: '1.2',
      priority: 'Medium',
      language: 'English',
      seoKeywords: ['cannabis storage', 'preservation', 'freshness', 'storage containers']
    }
  ]);

  const [categories, setCategories] = useState([
    {
      id: 'CAT-001',
      name: 'Delivery',
      description: 'Information about delivery services, timelines, and processes',
      color: '#3B82F6',
      icon: 'truck',
      articleCount: 15,
      status: 'Active',
      created: '2024-01-15',
      lastUpdated: '2024-08-10'
    },
    {
      id: 'CAT-002',
      name: 'Education',
      description: 'Educational content about cannabis strains, effects, and science',
      color: '#10B981',
      icon: 'academic-cap',
      articleCount: 28,
      status: 'Active',
      created: '2024-01-15',
      lastUpdated: '2024-08-05'
    },
    {
      id: 'CAT-003',
      name: 'Usage',
      description: 'How-to guides for using and storing cannabis products',
      color: '#F59E0B',
      icon: 'light-bulb',
      articleCount: 12,
      status: 'Active',
      created: '2024-01-15',
      lastUpdated: '2024-07-30'
    },
    {
      id: 'CAT-004',
      name: 'Legal',
      description: 'Legal information, compliance, and regulations',
      color: '#EF4444',
      icon: 'scale',
      articleCount: 8,
      status: 'Active',
      created: '2024-02-01',
      lastUpdated: '2024-08-01'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalArticles: 67,
    publishedArticles: 58,
    draftArticles: 9,
    totalViews: 45682,
    totalLikes: 1234,
    helpfulVotes: 2156,
    averageRating: 4.7,
    topCategory: 'Education',
    mostViewedArticle: 'Understanding Cannabis Strains',
    searchQueries: 892,
    uniqueVisitors: 3456,
    bounceRate: 23.5,
    avgTimeOnPage: 245
  });

  // Form states
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Education',
    type: 'Guide',
    content: '',
    excerpt: '',
    tags: [],
    difficulty: 'Beginner',
    readTime: 5,
    featured: false,
    priority: 'Medium',
    language: 'English',
    seoKeywords: []
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    description: '',
    color: '#3B82F6',
    icon: 'folder'
  });

  // CRUD Operations for Articles
  const handleCreateArticle = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newArticle = {
        id: `KB-${String(articles.length + 1).padStart(3, '0')}`,
        ...articleForm,
        status: 'Draft',
        author: 'Current User',
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        views: 0,
        likes: 0,
        helpful: 0,
        notHelpful: 0,
        relatedArticles: [],
        attachments: [],
        lastReviewed: new Date().toISOString().split('T')[0],
        reviewedBy: 'Current User',
        version: '1.0'
      };

      setArticles([...articles, newArticle]);
      setShowCreateModal(false);
      setArticleForm({
        title: '',
        category: 'Education',
        type: 'Guide',
        content: '',
        excerpt: '',
        tags: [],
        difficulty: 'Beginner',
        readTime: 5,
        featured: false,
        priority: 'Medium',
        language: 'English',
        seoKeywords: []
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalArticles: prev.totalArticles + 1,
        draftArticles: prev.draftArticles + 1
      }));

    } catch (error) {
      console.error('Error creating article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditArticle = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedArticles = articles.map(article => 
        article.id === selectedArticle.id 
          ? { 
              ...article, 
              ...articleForm, 
              lastModified: new Date().toISOString().split('T')[0],
              version: incrementVersion(article.version)
            }
          : article
      );
      
      setArticles(updatedArticles);
      setShowEditModal(false);
      setSelectedArticle(null);
      
    } catch (error) {
      console.error('Error updating article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteArticle = async () => {
    setLoading(true);
    
    try {
      const updatedArticles = articles.filter(article => article.id !== selectedArticle.id);
      setArticles(updatedArticles);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalArticles: prev.totalArticles - 1,
        publishedArticles: selectedArticle.status === 'Published' ? prev.publishedArticles - 1 : prev.publishedArticles,
        draftArticles: selectedArticle.status === 'Draft' ? prev.draftArticles - 1 : prev.draftArticles
      }));
      
      setShowDeleteModal(false);
      setSelectedArticle(null);
      
    } catch (error) {
      console.error('Error deleting article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishArticle = (articleId) => {
    const updatedArticles = articles.map(article => 
      article.id === articleId 
        ? { ...article, status: 'Published', lastModified: new Date().toISOString().split('T')[0] }
        : article
    );
    
    setArticles(updatedArticles);
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      publishedArticles: prev.publishedArticles + 1,
      draftArticles: prev.draftArticles - 1
    }));
  };

  const handleUnpublishArticle = (articleId) => {
    const updatedArticles = articles.map(article => 
      article.id === articleId 
        ? { ...article, status: 'Draft', lastModified: new Date().toISOString().split('T')[0] }
        : article
    );
    
    setArticles(updatedArticles);
    
    // Update analytics
    setAnalytics(prev => ({
      ...prev,
      publishedArticles: prev.publishedArticles - 1,
      draftArticles: prev.draftArticles + 1
    }));
  };

  const handleToggleFeatured = (articleId) => {
    const updatedArticles = articles.map(article => 
      article.id === articleId 
        ? { ...article, featured: !article.featured, lastModified: new Date().toISOString().split('T')[0] }
        : article
    );
    
    setArticles(updatedArticles);
  };

  // CRUD Operations for Categories
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newCategory = {
        id: `CAT-${String(categories.length + 1).padStart(3, '0')}`,
        ...categoryForm,
        articleCount: 0,
        status: 'Active',
        created: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setCategories([...categories, newCategory]);
      setShowCreateCategoryModal(false);
      setCategoryForm({
        name: '',
        description: '',
        color: '#3B82F6',
        icon: 'folder'
      });

    } catch (error) {
      console.error('Error creating category:', error);
    } finally {
      setLoading(false);
    }
  };

  // Utility functions
  const incrementVersion = (version) => {
    const parts = version.split('.');
    const patch = parseInt(parts[2] || 0) + 1;
    return `${parts[0]}.${parts[1]}.${patch}`;
  };

  // Filter functions
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || article.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesType = selectedType === 'all' || article.type.toLowerCase() === selectedType.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus && matchesType;
  });

  const openEditModal = (article) => {
    setSelectedArticle(article);
    setArticleForm({
      title: article.title,
      category: article.category,
      type: article.type,
      content: article.content,
      excerpt: article.excerpt,
      tags: article.tags,
      difficulty: article.difficulty,
      readTime: article.readTime,
      featured: article.featured,
      priority: article.priority,
      language: article.language,
      seoKeywords: article.seoKeywords
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (article) => {
    setSelectedArticle(article);
    setShowDeleteModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published': return 'text-green-600 bg-green-100';
      case 'draft': return 'text-yellow-600 bg-yellow-100';
      case 'archived': return 'text-gray-600 bg-gray-100';
      case 'review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalArticles}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.publishedArticles} Published</span>
            <span className="text-gray-500 ml-2">• {analytics.draftArticles} Drafts</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Views</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.uniqueVisitors.toLocaleString()} Unique Visitors</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}/5</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-yellow-600 font-medium">{analytics.helpfulVotes} Helpful Votes</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Search Queries</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.searchQueries}</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">{analytics.bounceRate}% Bounce Rate</span>
          </div>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Most Popular Articles</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {articles
              .sort((a, b) => b.views - a.views)
              .slice(0, 5)
              .map((article, index) => (
                <div key={article.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{article.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                        {article.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{article.category}</span>
                      <span>•</span>
                      <span>{article.views.toLocaleString()} views</span>
                      <span>•</span>
                      <span>{article.likes} likes</span>
                      <span>•</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <svg className="h-4 w-4" style={{ color: category.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                <div className="text-sm text-gray-500">
                  <span className="font-medium">{category.articleCount}</span> articles
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderArticles = () => (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.name}>{category.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">Review</option>
            <option value="archived">Archived</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="guide">Guide</option>
            <option value="faq">FAQ</option>
            <option value="how-to">How-to</option>
            <option value="tutorial">Tutorial</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Article</span>
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-2">{article.title}</h3>
                    {article.featured && (
                      <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(article.status)}`}>
                      {article.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(article.difficulty)}`}>
                      {article.difficulty}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full text-blue-600 bg-blue-100">
                      {article.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-3">{article.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                    <span><strong>Category:</strong> {article.category}</span>
                    <span><strong>Views:</strong> {article.views.toLocaleString()}</span>
                    <span><strong>Read Time:</strong> {article.readTime} min</span>
                    <span><strong>Author:</strong> {article.author}</span>
                  </div>
                </div>
              </div>

              {article.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 4).map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        #{tag}
                      </span>
                    ))}
                    {article.tags.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{article.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{article.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    <span>{article.helpful}</span>
                  </div>
                  <span>Updated: {new Date(article.lastModified).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {article.status === 'Draft' ? (
                    <button
                      onClick={() => handlePublishArticle(article.id)}
                      className="p-2 text-green-600 hover:text-green-700 transition-colors"
                      title="Publish"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnpublishArticle(article.id)}
                      className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors"
                      title="Unpublish"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 12l2 2 4-4" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => handleToggleFeatured(article.id)}
                    className={`p-2 transition-colors ${
                      article.featured 
                        ? 'text-yellow-600 hover:text-yellow-700' 
                        : 'text-gray-400 hover:text-yellow-600'
                    }`}
                    title={article.featured ? 'Remove from featured' : 'Add to featured'}
                  >
                    <svg className="h-4 w-4" fill={article.featured ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => openEditModal(article)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => openDeleteModal(article)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first knowledge base article.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Article
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderCategories = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Categories</h2>
          <p className="text-sm text-gray-600">Organize your knowledge base content</p>
        </div>
        <button
          onClick={() => setShowCreateCategoryModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <svg className="h-5 w-5" style={{ color: category.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    category.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                  }`}>
                    {category.status}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="text-gray-500">
                  <span className="font-medium text-gray-900">{category.articleCount}</span> articles
                </div>
                <div className="text-gray-500">
                  Updated {new Date(category.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Knowledge Base</h1>
        <p className="text-gray-600 mt-1">Manage articles, documentation, and help content</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'articles', name: 'Articles', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { id: 'categories', name: 'Categories', icon: 'M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'articles' && renderArticles()}
      {activeTab === 'categories' && renderCategories()}

      {/* Create Article Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Article</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateArticle} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.title}
                      onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                      placeholder="Enter article title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.category}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.type}
                      onChange={(e) => setArticleForm({ ...articleForm, type: e.target.value })}
                    >
                      <option value="Guide">Guide</option>
                      <option value="FAQ">FAQ</option>
                      <option value="How-to">How-to</option>
                      <option value="Tutorial">Tutorial</option>
                      <option value="Documentation">Documentation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.difficulty}
                      onChange={(e) => setArticleForm({ ...articleForm, difficulty: e.target.value })}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Read Time (minutes)</label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.readTime}
                      onChange={(e) => setArticleForm({ ...articleForm, readTime: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                  <textarea
                    required
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={articleForm.excerpt}
                    onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                    placeholder="Brief description of the article"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    required
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                    placeholder="Write your article content here..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.tags.join(', ')}
                      onChange={(e) => setArticleForm({ 
                        ...articleForm, 
                        tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                      })}
                      placeholder="e.g., cannabis, delivery, guide"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.priority}
                      onChange={(e) => setArticleForm({ ...articleForm, priority: e.target.value })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={articleForm.featured}
                      onChange={(e) => setArticleForm({ ...articleForm, featured: e.target.checked })}
                    />
                    <span className="ml-2 text-sm text-gray-700">Feature this article</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Article Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Article</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditArticle} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.title}
                      onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={articleForm.category}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    required
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={articleForm.content}
                    onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Updating...' : 'Update Article'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Article Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Article</h2>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">
                  Are you sure you want to delete <strong>{selectedArticle?.title}</strong>? This action cannot be undone.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteArticle}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Article'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Category Modal */}
      {showCreateCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Category</h2>
                <button
                  onClick={() => setShowCreateCategoryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    placeholder="Category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={categoryForm.description}
                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                    placeholder="Category description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input
                    type="color"
                    className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={categoryForm.color}
                    onChange={(e) => setCategoryForm({ ...categoryForm, color: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateCategoryModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Category'}
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

export default EnhancedKnowledgeBaseModule;

