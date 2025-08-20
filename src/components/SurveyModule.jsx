import React, { useState, useEffect } from 'react';

const SurveyModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Mock survey data
  const [surveys, setSurveys] = useState([
    {
      id: 'SUR-001',
      title: 'Customer Satisfaction Survey',
      description: 'Monthly customer satisfaction and service quality assessment',
      type: 'Customer Satisfaction',
      status: 'Active',
      createdDate: '2024-08-01',
      startDate: '2024-08-05',
      endDate: '2024-08-31',
      totalQuestions: 12,
      responses: 245,
      targetResponses: 500,
      completionRate: 78.5,
      avgRating: 4.2,
      responseRate: 49.0,
      segments: ['All Customers'],
      questions: [
        { id: 1, type: 'rating', question: 'How satisfied are you with our product quality?', required: true },
        { id: 2, type: 'rating', question: 'How would you rate our delivery service?', required: true },
        { id: 3, type: 'multiple_choice', question: 'How often do you purchase from us?', required: false },
        { id: 4, type: 'text', question: 'What improvements would you suggest?', required: false }
      ]
    },
    {
      id: 'SUR-002',
      title: 'Product Feedback - Blue Dream',
      description: 'Feedback on new Blue Dream strain quality and effects',
      type: 'Product Feedback',
      status: 'Completed',
      createdDate: '2024-07-15',
      startDate: '2024-07-20',
      endDate: '2024-08-10',
      totalQuestions: 8,
      responses: 156,
      targetResponses: 200,
      completionRate: 92.3,
      avgRating: 4.6,
      responseRate: 78.0,
      segments: ['Flower Enthusiasts'],
      questions: [
        { id: 1, type: 'rating', question: 'Rate the overall quality of Blue Dream', required: true },
        { id: 2, type: 'rating', question: 'How would you rate the effects?', required: true },
        { id: 3, type: 'multiple_choice', question: 'Would you purchase this strain again?', required: true }
      ]
    },
    {
      id: 'SUR-003',
      title: 'Website User Experience',
      description: 'Feedback on website navigation and user experience',
      type: 'User Experience',
      status: 'Draft',
      createdDate: '2024-08-12',
      startDate: '2024-08-20',
      endDate: '2024-09-05',
      totalQuestions: 15,
      responses: 0,
      targetResponses: 300,
      completionRate: 0.0,
      avgRating: 0.0,
      responseRate: 0.0,
      segments: ['Website Users'],
      questions: [
        { id: 1, type: 'rating', question: 'How easy is it to find products on our website?', required: true },
        { id: 2, type: 'rating', question: 'Rate the checkout process', required: true },
        { id: 3, type: 'text', question: 'What features would you like to see added?', required: false }
      ]
    },
    {
      id: 'SUR-004',
      title: 'Delivery Service Evaluation',
      description: 'Assessment of delivery speed, driver professionalism, and packaging',
      type: 'Service Quality',
      status: 'Scheduled',
      createdDate: '2024-08-10',
      startDate: '2024-08-25',
      endDate: '2024-09-15',
      totalQuestions: 10,
      responses: 0,
      targetResponses: 400,
      completionRate: 0.0,
      avgRating: 0.0,
      responseRate: 0.0,
      segments: ['Delivery Customers'],
      questions: [
        { id: 1, type: 'rating', question: 'Rate the delivery speed', required: true },
        { id: 2, type: 'rating', question: 'How professional was your driver?', required: true },
        { id: 3, type: 'rating', question: 'Rate the packaging quality', required: true }
      ]
    }
  ]);

  const [responses, setResponses] = useState([
    {
      id: 'RES-001',
      surveyId: 'SUR-001',
      surveyTitle: 'Customer Satisfaction Survey',
      respondentId: 'CUST-001',
      respondentName: 'John Doe',
      respondentEmail: 'john.doe@email.com',
      submittedDate: '2024-08-12',
      completionTime: '3m 45s',
      completed: true,
      answers: [
        { questionId: 1, question: 'How satisfied are you with our product quality?', answer: '5', type: 'rating' },
        { questionId: 2, question: 'How would you rate our delivery service?', answer: '4', type: 'rating' },
        { questionId: 3, question: 'How often do you purchase from us?', answer: 'Weekly', type: 'multiple_choice' },
        { questionId: 4, question: 'What improvements would you suggest?', answer: 'More variety in edibles', type: 'text' }
      ]
    },
    {
      id: 'RES-002',
      surveyId: 'SUR-001',
      surveyTitle: 'Customer Satisfaction Survey',
      respondentId: 'CUST-002',
      respondentName: 'Sarah Johnson',
      respondentEmail: 'sarah.johnson@email.com',
      submittedDate: '2024-08-13',
      completionTime: '2m 30s',
      completed: true,
      answers: [
        { questionId: 1, question: 'How satisfied are you with our product quality?', answer: '4', type: 'rating' },
        { questionId: 2, question: 'How would you rate our delivery service?', answer: '5', type: 'rating' },
        { questionId: 3, question: 'How often do you purchase from us?', answer: 'Monthly', type: 'multiple_choice' },
        { questionId: 4, question: 'What improvements would you suggest?', answer: 'Faster delivery times', type: 'text' }
      ]
    }
  ]);

  const [templates, setTemplates] = useState([
    {
      id: 'TEMP-SUR-001',
      name: 'Customer Satisfaction Template',
      type: 'Customer Satisfaction',
      description: 'Standard customer satisfaction survey template',
      questions: 10,
      avgCompletionTime: '4m 15s',
      usage: 15,
      lastUsed: '2024-08-01',
      performance: 'High',
      avgResponseRate: 52.3
    },
    {
      id: 'TEMP-SUR-002',
      name: 'Product Feedback Template',
      type: 'Product Feedback',
      description: 'Template for collecting product-specific feedback',
      questions: 8,
      avgCompletionTime: '3m 30s',
      usage: 8,
      lastUsed: '2024-07-15',
      performance: 'Very High',
      avgResponseRate: 68.7
    },
    {
      id: 'TEMP-SUR-003',
      name: 'NPS Survey Template',
      type: 'Net Promoter Score',
      description: 'Net Promoter Score survey for customer loyalty measurement',
      questions: 3,
      avgCompletionTime: '1m 45s',
      usage: 22,
      lastUsed: '2024-08-10',
      performance: 'High',
      avgResponseRate: 45.8
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalSurveys: 12,
    activeSurveys: 3,
    totalResponses: 1250,
    avgResponseRate: 48.5,
    avgCompletionRate: 76.8,
    avgRating: 4.3,
    npsScore: 42,
    monthlyGrowth: 18.2
  });

  // Filter functions
  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || survey.status.toLowerCase() === selectedStatus;
    const matchesType = selectedType === 'all' || survey.type.toLowerCase().replace(' ', '-') === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Paused': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Very High': return 'bg-green-100 text-green-800';
      case 'High': return 'bg-blue-100 text-blue-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    return stars;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Surveys</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSurveys}</p>
              <p className="text-sm text-blue-600">{analytics.activeSurveys} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Responses</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalResponses.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{analytics.monthlyGrowth}% this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgResponseRate}%</p>
              <p className="text-sm text-gray-600">Industry avg: 25%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgRating}</p>
              <p className="text-sm text-gray-600">Out of 5.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Key Survey Metrics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.avgCompletionRate}%</div>
              <div className="text-sm text-gray-600">Average Completion Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.avgCompletionRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.npsScore}</div>
              <div className="text-sm text-gray-600">Net Promoter Score</div>
              <div className="text-xs text-gray-500 mt-1">Customer loyalty metric</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                {getRatingStars(analytics.avgRating)}
                <span className="ml-2 text-2xl font-bold text-gray-900">{analytics.avgRating}</span>
              </div>
              <div className="text-sm text-gray-600">Overall Satisfaction</div>
              <div className="text-xs text-gray-500 mt-1">Across all surveys</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Surveys */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Surveys</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {surveys.filter(s => s.status === 'Active').map((survey) => (
              <div key={survey.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">📋</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{survey.title}</h4>
                    <p className="text-sm text-gray-600">{survey.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">Responses</p>
                      <p className="font-medium">{survey.responses}/{survey.targetResponses}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Response Rate</p>
                      <p className="font-medium text-green-600">{survey.responseRate}%</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(survey.status)}`}>
                      {survey.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Responses */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Responses</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {responses.slice(0, 5).map((response) => (
              <div key={response.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{response.respondentName}</h4>
                    <p className="text-sm text-gray-600">{response.surveyTitle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{response.submittedDate}</p>
                  <p className="text-sm text-blue-600">{response.completionTime}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSurveys = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search surveys..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="customer-satisfaction">Customer Satisfaction</option>
              <option value="product-feedback">Product Feedback</option>
              <option value="user-experience">User Experience</option>
              <option value="service-quality">Service Quality</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Survey
            </button>
          </div>
        </div>
      </div>

      {/* Surveys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurveys.map((survey) => (
          <div key={survey.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{survey.title}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(survey.status)}`}>
                {survey.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{survey.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Type:</span>
                <span className="text-gray-900">{survey.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Questions:</span>
                <span className="text-blue-600">{survey.totalQuestions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Responses:</span>
                <span className="text-green-600">{survey.responses}/{survey.targetResponses}</span>
              </div>
              {survey.status === 'Active' || survey.status === 'Completed' ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response Rate:</span>
                    <span className="text-purple-600">{survey.responseRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Rating:</span>
                    <div className="flex items-center">
                      {getRatingStars(survey.avgRating)}
                      <span className="ml-1 text-gray-900">{survey.avgRating}</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="text-gray-900">{survey.startDate}</span>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                {survey.status === 'Draft' ? 'Edit' : 'Analyze'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResponses = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search responses..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Responses
            </button>
          </div>
        </div>
      </div>

      {/* Responses Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Survey Responses</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Respondent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responses.map((response) => (
                <tr key={response.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{response.respondentName}</div>
                      <div className="text-sm text-gray-500">{response.respondentEmail}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{response.surveyTitle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{response.submittedDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{response.completionTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${response.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {response.completed ? 'Completed' : 'Partial'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Export</button>
                    <button className="text-gray-600 hover:text-gray-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Template
            </button>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPerformanceColor(template.performance)}`}>
                {template.performance}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Type:</span>
                <span className="text-gray-900">{template.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Questions:</span>
                <span className="text-blue-600">{template.questions}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Completion:</span>
                <span className="text-green-600">{template.avgCompletionTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Usage:</span>
                <span className="text-purple-600">{template.usage} times</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Response Rate:</span>
                <span className="text-orange-600">{template.avgResponseRate}%</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Use Template
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Survey Management</h1>
          <p className="mt-2 text-gray-600">Create, distribute, and analyze customer feedback surveys</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'surveys', name: 'Surveys', icon: '📋' },
              { id: 'responses', name: 'Responses', icon: '💬' },
              { id: 'templates', name: 'Templates', icon: '📝' }
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
        {activeTab === 'surveys' && renderSurveys()}
        {activeTab === 'responses' && renderResponses()}
        {activeTab === 'templates' && renderTemplates()}
      </div>
    </div>
  );
};

export default SurveyModule;

