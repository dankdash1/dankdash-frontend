import React, { useState, useEffect, useMemo } from 'react';

const EnhancedSurveyModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [editingSurvey, setEditingSurvey] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [currentSurveyId, setCurrentSurveyId] = useState(null);

  // Form states
  const [surveyForm, setSurveyForm] = useState({
    title: '',
    description: '',
    type: 'Customer Satisfaction',
    startDate: '',
    endDate: '',
    targetResponses: 100,
    segments: ['All Customers'],
    isAnonymous: false,
    allowMultipleResponses: false,
    showProgressBar: true,
    thankYouMessage: 'Thank you for your feedback!'
  });

  const [questionForm, setQuestionForm] = useState({
    type: 'rating',
    question: '',
    required: true,
    options: [''],
    minRating: 1,
    maxRating: 5,
    placeholder: ''
  });

  // Mock survey data with mobile-responsive considerations
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
      isAnonymous: false,
      allowMultipleResponses: false,
      showProgressBar: true,
      thankYouMessage: 'Thank you for helping us improve!',
      questions: [
        { id: 1, type: 'rating', question: 'How satisfied are you with our product quality?', required: true, minRating: 1, maxRating: 5 },
        { id: 2, type: 'rating', question: 'How would you rate our delivery service?', required: true, minRating: 1, maxRating: 5 },
        { id: 3, type: 'multiple_choice', question: 'How often do you purchase from us?', required: false, options: ['Weekly', 'Monthly', 'Quarterly', 'Rarely'] },
        { id: 4, type: 'text', question: 'What improvements would you suggest?', required: false, placeholder: 'Please share your suggestions...' }
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
      isAnonymous: true,
      allowMultipleResponses: false,
      showProgressBar: true,
      thankYouMessage: 'Thanks for your product feedback!',
      questions: [
        { id: 1, type: 'rating', question: 'Rate the overall quality of Blue Dream', required: true, minRating: 1, maxRating: 5 },
        { id: 2, type: 'rating', question: 'How would you rate the effects?', required: true, minRating: 1, maxRating: 5 },
        { id: 3, type: 'multiple_choice', question: 'Would you purchase this strain again?', required: true, options: ['Definitely', 'Probably', 'Maybe', 'Probably Not', 'Definitely Not'] }
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
      isAnonymous: false,
      allowMultipleResponses: true,
      showProgressBar: true,
      thankYouMessage: 'Thank you for helping us improve our website!',
      questions: [
        { id: 1, type: 'rating', question: 'How easy is it to find products on our website?', required: true, minRating: 1, maxRating: 5 },
        { id: 2, type: 'rating', question: 'Rate the checkout process', required: true, minRating: 1, maxRating: 5 },
        { id: 3, type: 'text', question: 'What features would you like to see added?', required: false, placeholder: 'Describe new features you\'d like...' }
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
      isAnonymous: false,
      allowMultipleResponses: false,
      showProgressBar: true,
      thankYouMessage: 'Thank you for rating our delivery service!',
      questions: [
        { id: 1, type: 'rating', question: 'Rate the delivery speed', required: true, minRating: 1, maxRating: 5 },
        { id: 2, type: 'rating', question: 'How professional was your driver?', required: true, minRating: 1, maxRating: 5 },
        { id: 3, type: 'rating', question: 'Rate the packaging quality', required: true, minRating: 1, maxRating: 5 }
      ]
    },
    {
      id: 'SUR-005',
      title: 'Employee Satisfaction Survey',
      description: 'Internal survey for employee satisfaction and workplace feedback',
      type: 'Employee Feedback',
      status: 'Active',
      createdDate: '2024-08-05',
      startDate: '2024-08-08',
      endDate: '2024-08-30',
      totalQuestions: 20,
      responses: 28,
      targetResponses: 45,
      completionRate: 85.7,
      avgRating: 3.8,
      responseRate: 62.2,
      segments: ['Employees'],
      isAnonymous: true,
      allowMultipleResponses: false,
      showProgressBar: true,
      thankYouMessage: 'Thank you for your honest feedback!',
      questions: [
        { id: 1, type: 'rating', question: 'How satisfied are you with your current role?', required: true, minRating: 1, maxRating: 5 },
        { id: 2, type: 'rating', question: 'Rate the work-life balance', required: true, minRating: 1, maxRating: 5 },
        { id: 3, type: 'text', question: 'What would improve your work experience?', required: false, placeholder: 'Share your thoughts...' }
      ]
    },
    {
      id: 'SUR-006',
      title: 'New Product Interest Survey',
      description: 'Gauge customer interest in potential new product categories',
      type: 'Market Research',
      status: 'Paused',
      createdDate: '2024-07-28',
      startDate: '2024-08-01',
      endDate: '2024-08-20',
      totalQuestions: 6,
      responses: 89,
      targetResponses: 250,
      completionRate: 76.4,
      avgRating: 4.1,
      responseRate: 35.6,
      segments: ['Active Customers', 'VIP Customers'],
      isAnonymous: false,
      allowMultipleResponses: false,
      showProgressBar: true,
      thankYouMessage: 'Thanks for helping us plan our product lineup!',
      questions: [
        { id: 1, type: 'multiple_choice', question: 'Which new product categories interest you most?', required: true, options: ['Beverages', 'Topicals', 'Accessories', 'Wellness Products'] },
        { id: 2, type: 'rating', question: 'How likely are you to try new product categories?', required: true, minRating: 1, maxRating: 5 },
        { id: 3, type: 'text', question: 'Any specific products you\'d like to see?', required: false, placeholder: 'Describe products you\'re interested in...' }
      ]
    }
  ]);

  const [surveySegments] = useState([
    { name: 'All Customers', count: 2450, description: 'All registered customers' },
    { name: 'Active Customers', count: 1850, description: 'Customers with recent purchases' },
    { name: 'VIP Customers', count: 320, description: 'High-value loyalty customers' },
    { name: 'New Customers', count: 180, description: 'Customers who joined in last 30 days' },
    { name: 'Flower Enthusiasts', count: 1200, description: 'Customers who primarily buy flower' },
    { name: 'Edibles Enthusiasts', count: 890, description: 'Customers who primarily buy edibles' },
    { name: 'Website Users', count: 3200, description: 'All website visitors' },
    { name: 'Delivery Customers', count: 1650, description: 'Customers who use delivery service' },
    { name: 'Employees', count: 45, description: 'Internal staff members' }
  ]);

  // Filter functions
  const filteredSurveys = useMemo(() => {
    return surveys.filter(survey => {
      const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           survey.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || survey.status.toLowerCase() === selectedStatus;
      const matchesType = selectedType === 'all' || survey.type.toLowerCase() === selectedType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [surveys, searchTerm, selectedStatus, selectedType]);

  // Survey CRUD Operations
  const handleAddSurvey = () => {
    if (!surveyForm.title || !surveyForm.description) {
      alert('Please fill in required fields (Title and Description)');
      return;
    }

    if (new Date(surveyForm.startDate) >= new Date(surveyForm.endDate)) {
      alert('End date must be after start date');
      return;
    }

    const newSurvey = {
      id: `SUR-${String(surveys.length + 1).padStart(3, '0')}`,
      ...surveyForm,
      status: 'Draft',
      createdDate: new Date().toISOString().split('T')[0],
      totalQuestions: 0,
      responses: 0,
      completionRate: 0.0,
      avgRating: 0.0,
      responseRate: 0.0,
      questions: []
    };

    setSurveys([...surveys, newSurvey]);
    setSurveyForm({
      title: '',
      description: '',
      type: 'Customer Satisfaction',
      startDate: '',
      endDate: '',
      targetResponses: 100,
      segments: ['All Customers'],
      isAnonymous: false,
      allowMultipleResponses: false,
      showProgressBar: true,
      thankYouMessage: 'Thank you for your feedback!'
    });
    setShowSurveyModal(false);
    alert('Survey created successfully!');
  };

  const handleEditSurvey = (survey) => {
    setEditingSurvey(survey);
    setSurveyForm({
      title: survey.title,
      description: survey.description,
      type: survey.type,
      startDate: survey.startDate,
      endDate: survey.endDate,
      targetResponses: survey.targetResponses,
      segments: survey.segments,
      isAnonymous: survey.isAnonymous,
      allowMultipleResponses: survey.allowMultipleResponses,
      showProgressBar: survey.showProgressBar,
      thankYouMessage: survey.thankYouMessage
    });
    setShowSurveyModal(true);
  };

  const handleUpdateSurvey = () => {
    if (!surveyForm.title || !surveyForm.description) {
      alert('Please fill in required fields (Title and Description)');
      return;
    }

    if (new Date(surveyForm.startDate) >= new Date(surveyForm.endDate)) {
      alert('End date must be after start date');
      return;
    }

    const updatedSurveys = surveys.map(survey =>
      survey.id === editingSurvey.id
        ? { ...survey, ...surveyForm }
        : survey
    );

    setSurveys(updatedSurveys);
    setEditingSurvey(null);
    setSurveyForm({
      title: '',
      description: '',
      type: 'Customer Satisfaction',
      startDate: '',
      endDate: '',
      targetResponses: 100,
      segments: ['All Customers'],
      isAnonymous: false,
      allowMultipleResponses: false,
      showProgressBar: true,
      thankYouMessage: 'Thank you for your feedback!'
    });
    setShowSurveyModal(false);
    alert('Survey updated successfully!');
  };

  const handleDeleteSurvey = (surveyId) => {
    if (window.confirm('Are you sure you want to delete this survey? This action cannot be undone.')) {
      setSurveys(surveys.filter(survey => survey.id !== surveyId));
      alert('Survey deleted successfully!');
    }
  };

  const handleLaunchSurvey = (surveyId) => {
    if (window.confirm('Are you sure you want to launch this survey? It will become active and start collecting responses.')) {
      const updatedSurveys = surveys.map(survey =>
        survey.id === surveyId
          ? { ...survey, status: 'Active' }
          : survey
      );
      setSurveys(updatedSurveys);
      alert('Survey launched successfully!');
    }
  };

  const handlePauseSurvey = (surveyId) => {
    if (window.confirm('Are you sure you want to pause this survey? Respondents will not be able to submit new responses.')) {
      const updatedSurveys = surveys.map(survey =>
        survey.id === surveyId
          ? { ...survey, status: 'Paused' }
          : survey
      );
      setSurveys(updatedSurveys);
      alert('Survey paused successfully!');
    }
  };

  const handleCloseSurvey = (surveyId) => {
    if (window.confirm('Are you sure you want to close this survey? This will end data collection permanently.')) {
      const updatedSurveys = surveys.map(survey =>
        survey.id === surveyId
          ? { ...survey, status: 'Completed' }
          : survey
      );
      setSurveys(updatedSurveys);
      alert('Survey closed successfully!');
    }
  };

  const handleDuplicateSurvey = (survey) => {
    const newSurvey = {
      ...survey,
      id: `SUR-${String(surveys.length + 1).padStart(3, '0')}`,
      title: `${survey.title} (Copy)`,
      status: 'Draft',
      createdDate: new Date().toISOString().split('T')[0],
      responses: 0,
      completionRate: 0.0,
      avgRating: 0.0,
      responseRate: 0.0
    };

    setSurveys([...surveys, newSurvey]);
    alert('Survey duplicated successfully!');
  };

  // Question CRUD Operations
  const handleAddQuestion = () => {
    if (!questionForm.question) {
      alert('Please enter a question');
      return;
    }

    if (questionForm.type === 'multiple_choice' && questionForm.options.filter(opt => opt.trim()).length < 2) {
      alert('Multiple choice questions need at least 2 options');
      return;
    }

    const newQuestion = {
      id: Date.now(),
      ...questionForm,
      options: questionForm.type === 'multiple_choice' ? questionForm.options.filter(opt => opt.trim()) : []
    };

    const updatedSurveys = surveys.map(survey =>
      survey.id === currentSurveyId
        ? { 
            ...survey, 
            questions: [...survey.questions, newQuestion],
            totalQuestions: survey.questions.length + 1
          }
        : survey
    );

    setSurveys(updatedSurveys);
    setQuestionForm({
      type: 'rating',
      question: '',
      required: true,
      options: [''],
      minRating: 1,
      maxRating: 5,
      placeholder: ''
    });
    setShowQuestionModal(false);
    alert('Question added successfully!');
  };

  const handleEditQuestion = (surveyId, question) => {
    setCurrentSurveyId(surveyId);
    setEditingQuestion(question);
    setQuestionForm({
      type: question.type,
      question: question.question,
      required: question.required,
      options: question.options || [''],
      minRating: question.minRating || 1,
      maxRating: question.maxRating || 5,
      placeholder: question.placeholder || ''
    });
    setShowQuestionModal(true);
  };

  const handleUpdateQuestion = () => {
    if (!questionForm.question) {
      alert('Please enter a question');
      return;
    }

    if (questionForm.type === 'multiple_choice' && questionForm.options.filter(opt => opt.trim()).length < 2) {
      alert('Multiple choice questions need at least 2 options');
      return;
    }

    const updatedSurveys = surveys.map(survey =>
      survey.id === currentSurveyId
        ? {
            ...survey,
            questions: survey.questions.map(q =>
              q.id === editingQuestion.id
                ? { 
                    ...q, 
                    ...questionForm,
                    options: questionForm.type === 'multiple_choice' ? questionForm.options.filter(opt => opt.trim()) : []
                  }
                : q
            )
          }
        : survey
    );

    setSurveys(updatedSurveys);
    setEditingQuestion(null);
    setCurrentSurveyId(null);
    setQuestionForm({
      type: 'rating',
      question: '',
      required: true,
      options: [''],
      minRating: 1,
      maxRating: 5,
      placeholder: ''
    });
    setShowQuestionModal(false);
    alert('Question updated successfully!');
  };

  const handleDeleteQuestion = (surveyId, questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const updatedSurveys = surveys.map(survey =>
        survey.id === surveyId
          ? {
              ...survey,
              questions: survey.questions.filter(q => q.id !== questionId),
              totalQuestions: survey.questions.length - 1
            }
          : survey
      );
      setSurveys(updatedSurveys);
      alert('Question deleted successfully!');
    }
  };

  // Utility functions
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'Customer Satisfaction': return 'bg-blue-100 text-blue-800';
      case 'Product Feedback': return 'bg-green-100 text-green-800';
      case 'User Experience': return 'bg-purple-100 text-purple-800';
      case 'Service Quality': return 'bg-orange-100 text-orange-800';
      case 'Employee Feedback': return 'bg-indigo-100 text-indigo-800';
      case 'Market Research': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Dashboard calculations
  const totalSurveys = surveys.length;
  const activeSurveys = surveys.filter(s => s.status === 'Active').length;
  const totalResponses = surveys.reduce((sum, s) => sum + s.responses, 0);
  const avgCompletionRate = surveys.filter(s => s.responses > 0).reduce((sum, s) => sum + s.completionRate, 0) / surveys.filter(s => s.responses > 0).length || 0;
  const avgRating = surveys.filter(s => s.avgRating > 0).reduce((sum, s) => sum + s.avgRating, 0) / surveys.filter(s => s.avgRating > 0).length || 0;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Surveys</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalSurveys}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{activeSurveys} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Responses</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{formatNumber(totalResponses)}</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">Across all surveys</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Avg Completion</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{formatPercentage(avgCompletionRate)}</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">Industry avg: 65%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Average Rating</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{avgRating.toFixed(1)}/5</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">Customer satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Survey Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Completion Rate</span>
              <span className="text-sm font-medium text-gray-900">{formatPercentage(avgCompletionRate)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: `${avgCompletionRate}%`}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Average Rating</span>
              <span className="text-sm font-medium text-gray-900">{avgRating.toFixed(1)}/5.0</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{width: `${(avgRating / 5) * 100}%`}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Response Rate</span>
              <span className="text-sm font-medium text-gray-900">{formatPercentage(totalResponses / (totalSurveys * 100))}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Recent Surveys</h3>
          <div className="space-y-3">
            {surveys.slice(0, 5).map((survey) => (
              <div key={survey.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">{survey.title}</h4>
                  <p className="text-xs text-gray-600 truncate">{survey.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(survey.status)}`}>
                      {survey.status}
                    </span>
                    <span className="text-xs text-gray-500">{formatNumber(survey.responses)} responses</span>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className="text-sm font-medium text-gray-900">{formatPercentage(survey.completionRate)}</p>
                  <p className="text-xs text-gray-500">Completion</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowSurveyModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Create Survey
            </button>
            <button
              onClick={() => alert('Survey templates coming soon')}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Use Template
            </button>
            <button
              onClick={() => alert('Analytics dashboard coming soon')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              View Analytics
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Survey Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Keep surveys short (5-10 questions)</p>
            <p>• Use clear, unbiased language</p>
            <p>• Mix question types for engagement</p>
            <p>• Test before launching</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Response Insights</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Best performing type:</span>
              <span className="text-gray-900 font-medium">Product Feedback</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Optimal length:</span>
              <span className="text-gray-900 font-medium">8-10 questions</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Peak response time:</span>
              <span className="text-gray-900 font-medium">2-4 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSurveys = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-lg">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search surveys..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
              <option value="paused">Paused</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="customer satisfaction">Customer Satisfaction</option>
              <option value="product feedback">Product Feedback</option>
              <option value="user experience">User Experience</option>
              <option value="service quality">Service Quality</option>
              <option value="employee feedback">Employee Feedback</option>
              <option value="market research">Market Research</option>
            </select>
          </div>
        </div>
        <button 
          onClick={() => setShowSurveyModal(true)}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Create Survey
        </button>
      </div>

      {/* Mobile-responsive survey cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredSurveys.map((survey) => (
          <div key={survey.id} className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm lg:text-base truncate">{survey.title}</h3>
                <p className="text-xs lg:text-sm text-gray-600 mt-1 line-clamp-2">{survey.description}</p>
              </div>
              <div className="flex flex-col items-end space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(survey.status)}`}>
                  {survey.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(survey.type)}`}>
                  {survey.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs lg:text-sm mb-4">
              <div>
                <span className="text-gray-600">Questions:</span>
                <span className="text-gray-900 ml-1 font-medium">{survey.totalQuestions}</span>
              </div>
              <div>
                <span className="text-gray-600">Responses:</span>
                <span className="text-gray-900 ml-1 font-medium">{formatNumber(survey.responses)}</span>
              </div>
              <div>
                <span className="text-gray-600">Completion:</span>
                <span className="text-gray-900 ml-1 font-medium">{formatPercentage(survey.completionRate)}</span>
              </div>
              <div>
                <span className="text-gray-600">Rating:</span>
                <span className="text-gray-900 ml-1 font-medium">{survey.avgRating > 0 ? `${survey.avgRating.toFixed(1)}/5` : 'N/A'}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{formatNumber(survey.responses)}/{formatNumber(survey.targetResponses)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{width: `${Math.min((survey.responses / survey.targetResponses) * 100, 100)}%`}}
                ></div>
              </div>
            </div>

            <div className="text-xs text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Start: {survey.startDate}</span>
                <span>End: {survey.endDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => alert(`Viewing survey: ${survey.title}`)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                View
              </button>
              <button 
                onClick={() => handleEditSurvey(survey)}
                className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  setCurrentSurveyId(survey.id);
                  setShowQuestionModal(true);
                }}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Questions
              </button>
              {survey.status === 'Draft' && (
                <button 
                  onClick={() => handleLaunchSurvey(survey.id)}
                  className="text-xs px-2 py-1 text-orange-600 hover:text-orange-900 bg-orange-50 rounded"
                >
                  Launch
                </button>
              )}
              {survey.status === 'Active' && (
                <button 
                  onClick={() => handlePauseSurvey(survey.id)}
                  className="text-xs px-2 py-1 text-yellow-600 hover:text-yellow-900 bg-yellow-50 rounded"
                >
                  Pause
                </button>
              )}
              <button 
                onClick={() => handleDuplicateSurvey(survey)}
                className="text-xs px-2 py-1 text-indigo-600 hover:text-indigo-900 bg-indigo-50 rounded"
              >
                Duplicate
              </button>
              <button 
                onClick={() => handleDeleteSurvey(survey.id)}
                className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResponses = () => (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900">Survey Responses</h3>
      <p className="text-gray-600">Response analysis and individual response viewing coming soon...</p>
    </div>
  );

  const renderAnalytics = () => (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900">Survey Analytics</h3>
      <p className="text-gray-600">Advanced analytics dashboard with charts and insights coming soon...</p>
    </div>
  );

  // Survey Modal - Mobile Responsive
  const SurveyModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingSurvey ? 'Edit Survey' : 'Create New Survey'}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Survey Title *</label>
              <input
                type="text"
                value={surveyForm.title}
                onChange={(e) => setSurveyForm({...surveyForm, title: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Survey Type</label>
              <select
                value={surveyForm.type}
                onChange={(e) => setSurveyForm({...surveyForm, type: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="Customer Satisfaction">Customer Satisfaction</option>
                <option value="Product Feedback">Product Feedback</option>
                <option value="User Experience">User Experience</option>
                <option value="Service Quality">Service Quality</option>
                <option value="Employee Feedback">Employee Feedback</option>
                <option value="Market Research">Market Research</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                value={surveyForm.description}
                onChange={(e) => setSurveyForm({...surveyForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={surveyForm.startDate}
                onChange={(e) => setSurveyForm({...surveyForm, startDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={surveyForm.endDate}
                onChange={(e) => setSurveyForm({...surveyForm, endDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Responses</label>
              <input
                type="number"
                value={surveyForm.targetResponses}
                onChange={(e) => setSurveyForm({...surveyForm, targetResponses: parseInt(e.target.value)})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Thank You Message</label>
              <input
                type="text"
                value={surveyForm.thankYouMessage}
                onChange={(e) => setSurveyForm({...surveyForm, thankYouMessage: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Survey Options</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={surveyForm.isAnonymous}
                  onChange={(e) => setSurveyForm({...surveyForm, isAnonymous: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Anonymous responses</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={surveyForm.allowMultipleResponses}
                  onChange={(e) => setSurveyForm({...surveyForm, allowMultipleResponses: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Allow multiple responses</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={surveyForm.showProgressBar}
                  onChange={(e) => setSurveyForm({...surveyForm, showProgressBar: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Show progress bar</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => {
                setShowSurveyModal(false);
                setEditingSurvey(null);
                setSurveyForm({
                  title: '',
                  description: '',
                  type: 'Customer Satisfaction',
                  startDate: '',
                  endDate: '',
                  targetResponses: 100,
                  segments: ['All Customers'],
                  isAnonymous: false,
                  allowMultipleResponses: false,
                  showProgressBar: true,
                  thankYouMessage: 'Thank you for your feedback!'
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingSurvey ? handleUpdateSurvey : handleAddSurvey}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingSurvey ? 'Update' : 'Create'} Survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Question Modal - Mobile Responsive
  const QuestionModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingQuestion ? 'Edit Question' : 'Add New Question'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Question Type</label>
              <select
                value={questionForm.type}
                onChange={(e) => setQuestionForm({...questionForm, type: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="rating">Rating Scale</option>
                <option value="multiple_choice">Multiple Choice</option>
                <option value="text">Text Response</option>
                <option value="yes_no">Yes/No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Question *</label>
              <textarea
                value={questionForm.question}
                onChange={(e) => setQuestionForm({...questionForm, question: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            {questionForm.type === 'rating' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Min Rating</label>
                  <input
                    type="number"
                    value={questionForm.minRating}
                    onChange={(e) => setQuestionForm({...questionForm, minRating: parseInt(e.target.value)})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Rating</label>
                  <input
                    type="number"
                    value={questionForm.maxRating}
                    onChange={(e) => setQuestionForm({...questionForm, maxRating: parseInt(e.target.value)})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            )}

            {questionForm.type === 'multiple_choice' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                {questionForm.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...questionForm.options];
                        newOptions[index] = e.target.value;
                        setQuestionForm({...questionForm, options: newOptions});
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                      placeholder={`Option ${index + 1}`}
                    />
                    <button
                      onClick={() => {
                        const newOptions = questionForm.options.filter((_, i) => i !== index);
                        setQuestionForm({...questionForm, options: newOptions});
                      }}
                      className="px-2 py-2 text-red-600 hover:text-red-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => setQuestionForm({...questionForm, options: [...questionForm.options, '']})}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Option
                </button>
              </div>
            )}

            {questionForm.type === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Placeholder Text</label>
                <input
                  type="text"
                  value={questionForm.placeholder}
                  onChange={(e) => setQuestionForm({...questionForm, placeholder: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            )}

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={questionForm.required}
                  onChange={(e) => setQuestionForm({...questionForm, required: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Required question</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowQuestionModal(false);
                setEditingQuestion(null);
                setCurrentSurveyId(null);
                setQuestionForm({
                  type: 'rating',
                  question: '',
                  required: true,
                  options: [''],
                  minRating: 1,
                  maxRating: 5,
                  placeholder: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingQuestion ? handleUpdateQuestion : handleAddQuestion}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingQuestion ? 'Update' : 'Add'} Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Survey Management</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Create, manage, and analyze customer surveys</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'surveys', name: 'Surveys', icon: '📋' },
            { id: 'responses', name: 'Responses', icon: '💬' },
            { id: 'analytics', name: 'Analytics', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="overflow-hidden">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'surveys' && renderSurveys()}
        {activeTab === 'responses' && renderResponses()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>

      {/* Modals */}
      {showSurveyModal && <SurveyModal />}
      {showQuestionModal && <QuestionModal />}
    </div>
  );
};

export default EnhancedSurveyModule;

