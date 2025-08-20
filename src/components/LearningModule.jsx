import React, { useState, useEffect } from 'react';

const LearningModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Mock learning data
  const [courses, setCourses] = useState([
    {
      id: 'CRS-001',
      title: 'Cannabis Compliance Fundamentals',
      category: 'Compliance',
      level: 'Beginner',
      duration: '4 hours',
      modules: 8,
      enrolled: 156,
      completed: 134,
      rating: 4.8,
      reviews: 89,
      instructor: 'Sarah Johnson',
      description: 'Comprehensive overview of cannabis regulations and compliance requirements',
      status: 'Published',
      price: 199.99,
      thumbnail: '/course-thumbnails/compliance-fundamentals.jpg',
      tags: ['compliance', 'regulations', 'fundamentals'],
      prerequisites: [],
      learningObjectives: [
        'Understand federal and state cannabis regulations',
        'Implement compliance procedures',
        'Manage regulatory documentation',
        'Handle compliance audits'
      ],
      completionRate: 85.9,
      lastUpdated: '2024-08-01',
      certificateAwarded: true,
      language: 'English'
    },
    {
      id: 'CRS-002',
      title: 'Cannabis Cultivation Techniques',
      category: 'Cultivation',
      level: 'Intermediate',
      duration: '6 hours',
      modules: 12,
      enrolled: 234,
      completed: 189,
      rating: 4.9,
      reviews: 156,
      instructor: 'Mike Chen',
      description: 'Advanced cultivation methods and best practices for cannabis growing',
      status: 'Published',
      price: 299.99,
      thumbnail: '/course-thumbnails/cultivation-techniques.jpg',
      tags: ['cultivation', 'growing', 'techniques'],
      prerequisites: ['Basic Horticulture'],
      learningObjectives: [
        'Master advanced growing techniques',
        'Optimize yield and quality',
        'Manage plant health and nutrition',
        'Implement sustainable practices'
      ],
      completionRate: 80.8,
      lastUpdated: '2024-07-15',
      certificateAwarded: true,
      language: 'English'
    },
    {
      id: 'CRS-003',
      title: 'Cannabis Product Development',
      category: 'Manufacturing',
      level: 'Advanced',
      duration: '8 hours',
      modules: 15,
      enrolled: 89,
      completed: 67,
      rating: 4.7,
      reviews: 45,
      instructor: 'Alex Kim',
      description: 'Product development, formulation, and manufacturing processes',
      status: 'Published',
      price: 399.99,
      thumbnail: '/course-thumbnails/product-development.jpg',
      tags: ['manufacturing', 'products', 'development'],
      prerequisites: ['Cannabis Chemistry Basics', 'Quality Control'],
      learningObjectives: [
        'Design cannabis products',
        'Understand extraction methods',
        'Implement quality control',
        'Scale manufacturing processes'
      ],
      completionRate: 75.3,
      lastUpdated: '2024-06-30',
      certificateAwarded: true,
      language: 'English'
    },
    {
      id: 'CRS-004',
      title: 'Cannabis Retail Operations',
      category: 'Retail',
      level: 'Beginner',
      duration: '3 hours',
      modules: 6,
      enrolled: 345,
      completed: 298,
      rating: 4.6,
      reviews: 234,
      instructor: 'Lisa Rodriguez',
      description: 'Essential skills for cannabis retail operations and customer service',
      status: 'Published',
      price: 149.99,
      thumbnail: '/course-thumbnails/retail-operations.jpg',
      tags: ['retail', 'operations', 'customer-service'],
      prerequisites: [],
      learningObjectives: [
        'Understand retail regulations',
        'Provide excellent customer service',
        'Manage inventory effectively',
        'Handle point-of-sale systems'
      ],
      completionRate: 86.4,
      lastUpdated: '2024-08-10',
      certificateAwarded: false,
      language: 'English'
    },
    {
      id: 'CRS-005',
      title: 'Cannabis Testing and Quality Control',
      category: 'Quality Control',
      level: 'Intermediate',
      duration: '5 hours',
      modules: 10,
      enrolled: 123,
      completed: 89,
      rating: 4.8,
      reviews: 67,
      instructor: 'Dr. Jennifer Park',
      description: 'Laboratory testing procedures and quality assurance protocols',
      status: 'Draft',
      price: 249.99,
      thumbnail: '/course-thumbnails/testing-qc.jpg',
      tags: ['testing', 'quality-control', 'laboratory'],
      prerequisites: ['Basic Chemistry'],
      learningObjectives: [
        'Perform cannabis testing procedures',
        'Interpret test results',
        'Implement QC protocols',
        'Ensure product safety'
      ],
      completionRate: 72.4,
      lastUpdated: '2024-08-05',
      certificateAwarded: true,
      language: 'English'
    }
  ]);

  const [students, setStudents] = useState([
    {
      id: 'STU-001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      enrolledCourses: 3,
      completedCourses: 2,
      inProgressCourses: 1,
      totalHours: 14,
      certificatesEarned: 2,
      averageScore: 87.5,
      lastActivity: '2024-08-14',
      joinDate: '2024-06-15',
      status: 'Active',
      currentCourse: 'Cannabis Product Development',
      progress: 65,
      role: 'Student',
      department: 'Manufacturing'
    },
    {
      id: 'STU-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      enrolledCourses: 5,
      completedCourses: 4,
      inProgressCourses: 1,
      totalHours: 22,
      certificatesEarned: 4,
      averageScore: 92.3,
      lastActivity: '2024-08-14',
      joinDate: '2024-05-01',
      status: 'Active',
      currentCourse: 'Cannabis Testing and Quality Control',
      progress: 80,
      role: 'Manager',
      department: 'Quality Control'
    },
    {
      id: 'STU-003',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      enrolledCourses: 2,
      completedCourses: 1,
      inProgressCourses: 1,
      totalHours: 10,
      certificatesEarned: 1,
      averageScore: 89.7,
      lastActivity: '2024-08-13',
      joinDate: '2024-07-01',
      status: 'Active',
      currentCourse: 'Cannabis Cultivation Techniques',
      progress: 45,
      role: 'Student',
      department: 'Cultivation'
    },
    {
      id: 'STU-004',
      name: 'Alex Kim',
      email: 'alex.kim@email.com',
      enrolledCourses: 4,
      completedCourses: 3,
      inProgressCourses: 1,
      totalHours: 18,
      certificatesEarned: 3,
      averageScore: 94.1,
      lastActivity: '2024-08-12',
      joinDate: '2024-04-15',
      status: 'Active',
      currentCourse: 'Cannabis Retail Operations',
      progress: 90,
      role: 'Supervisor',
      department: 'Retail'
    }
  ]);

  const [assessments, setAssessments] = useState([
    {
      id: 'ASS-001',
      title: 'Compliance Fundamentals Quiz',
      course: 'Cannabis Compliance Fundamentals',
      type: 'Quiz',
      questions: 25,
      timeLimit: 45,
      passingScore: 80,
      attempts: 156,
      averageScore: 87.3,
      passRate: 89.1,
      difficulty: 'Medium',
      lastUpdated: '2024-08-01',
      status: 'Active'
    },
    {
      id: 'ASS-002',
      title: 'Cultivation Practical Assessment',
      course: 'Cannabis Cultivation Techniques',
      type: 'Practical',
      questions: 15,
      timeLimit: 90,
      passingScore: 75,
      attempts: 189,
      averageScore: 82.7,
      passRate: 84.7,
      difficulty: 'Hard',
      lastUpdated: '2024-07-15',
      status: 'Active'
    },
    {
      id: 'ASS-003',
      title: 'Product Development Case Study',
      course: 'Cannabis Product Development',
      type: 'Case Study',
      questions: 10,
      timeLimit: 120,
      passingScore: 85,
      attempts: 67,
      averageScore: 88.9,
      passRate: 79.1,
      difficulty: 'Hard',
      lastUpdated: '2024-06-30',
      status: 'Active'
    }
  ]);

  const [certificates, setCertificates] = useState([
    {
      id: 'CERT-001',
      title: 'Cannabis Compliance Specialist',
      course: 'Cannabis Compliance Fundamentals',
      student: 'Sarah Johnson',
      issueDate: '2024-08-10',
      expiryDate: '2025-08-10',
      certificateNumber: 'DDS-COMP-2024-001',
      status: 'Valid',
      verificationCode: 'ABC123XYZ',
      downloadCount: 3,
      credentialHours: 4
    },
    {
      id: 'CERT-002',
      title: 'Cannabis Cultivation Expert',
      course: 'Cannabis Cultivation Techniques',
      student: 'Mike Chen',
      issueDate: '2024-08-05',
      expiryDate: '2025-08-05',
      certificateNumber: 'DDS-CULT-2024-002',
      status: 'Valid',
      verificationCode: 'DEF456UVW',
      downloadCount: 1,
      credentialHours: 6
    },
    {
      id: 'CERT-003',
      title: 'Cannabis Product Developer',
      course: 'Cannabis Product Development',
      student: 'Alex Kim',
      issueDate: '2024-07-28',
      expiryDate: '2025-07-28',
      certificateNumber: 'DDS-PROD-2024-003',
      status: 'Valid',
      verificationCode: 'GHI789RST',
      downloadCount: 2,
      credentialHours: 8
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalStudents: 1247,
    activeCourses: 24,
    completionRate: 82.4,
    averageScore: 88.7,
    totalHours: 15680,
    certificatesIssued: 456,
    revenue: 89450.75,
    satisfaction: 4.7
  });

  // Filter functions
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category.toLowerCase() === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || course.status.toLowerCase() === selectedStatus;
    const matchesLevel = selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel;
    return matchesSearch && matchesCategory && matchesStatus && matchesLevel;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Valid': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Compliance': return '📋';
      case 'Cultivation': return '🌱';
      case 'Manufacturing': return '🏭';
      case 'Retail': return '🏪';
      case 'Quality Control': return '🧪';
      case 'Safety': return '🛡️';
      default: return '📚';
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
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalStudents.toLocaleString()}</p>
              <p className="text-sm text-blue-600">{analytics.activeCourses} active courses</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.completionRate}%</p>
              <p className="text-sm text-green-600">Above target</p>
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
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageScore}%</p>
              <p className="text-sm text-purple-600">High performance</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1.5m0 0V20m-6 2h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Certificates Issued</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.certificatesIssued}</p>
              <p className="text-sm text-yellow-600">This year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Learning Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.completionRate}%</div>
              <div className="text-sm text-gray-600">Course Completion Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.completionRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.averageScore}%</div>
              <div className="text-sm text-gray-600">Average Assessment Score</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.averageScore}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.satisfaction}</div>
              <div className="text-sm text-gray-600">Student Satisfaction</div>
              <div className="text-xs text-gray-500 mt-1">Out of 5.0</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">{(analytics.totalHours / 1000).toFixed(1)}k</div>
              <div className="text-sm text-gray-600">Total Learning Hours</div>
              <div className="text-xs text-gray-500 mt-1">Across all courses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Courses */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Popular Courses</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {courses.slice(0, 5).map((course) => (
              <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getCategoryIcon(course.category)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600">{course.category} • {course.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{course.enrolled}</p>
                      <p className="text-xs text-gray-500">Enrolled</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{course.completionRate}%</p>
                      <p className="text-xs text-gray-500">Completion</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-yellow-600">{course.rating}★</p>
                      <p className="text-xs text-gray-500">{course.reviews} reviews</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Student Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {students.slice(0, 4).map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-600">{student.currentCourse}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{student.progress}%</p>
                      <p className="text-xs text-gray-500">Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{student.averageScore}%</p>
                      <p className="text-xs text-gray-500">Avg Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{student.certificatesEarned}</p>
                      <p className="text-xs text-gray-500">Certificates</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">${(analytics.revenue / 1000).toFixed(1)}k</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-xs text-gray-500 mt-1">This month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">${(analytics.revenue / analytics.totalStudents).toFixed(0)}</div>
              <div className="text-sm text-gray-600">Revenue per Student</div>
              <div className="text-xs text-gray-500 mt-1">Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{courses.length}</div>
              <div className="text-sm text-gray-600">Course Catalog</div>
              <div className="text-xs text-gray-500 mt-1">Available courses</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search courses..."
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
              <option value="compliance">Compliance</option>
              <option value="cultivation">Cultivation</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="quality control">Quality Control</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Course
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-6xl">{getCategoryIcon(course.category)}</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(course.status)}`}>
                  {course.status}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{course.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{course.duration}</span>
                <span>{course.modules} modules</span>
              </div>
              
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-gray-900">{course.rating}</span>
                  <span className="ml-1 text-gray-500">({course.reviews})</span>
                </div>
                <span className="text-gray-600">{course.enrolled} enrolled</span>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Completion Rate</span>
                  <span>{course.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${course.completionRate}%` }}></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-green-600">${course.price}</span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Student
            </button>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Student Progress</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Courses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 font-medium">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.enrolledCourses} enrolled</div>
                    <div className="text-sm text-gray-500">{student.completedCourses} completed</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.currentCourse}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{student.progress}% complete</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.averageScore}%</div>
                    <div className="text-sm text-gray-500">Average</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-yellow-600">{student.certificatesEarned}</div>
                    <div className="text-sm text-gray-500">Earned</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900">Message</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search certificates..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Issue Certificate
            </button>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        {certificates.map((certificate) => (
          <div key={certificate.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{certificate.title}</h3>
                  <p className="text-sm text-gray-600">{certificate.course}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(certificate.status)}`}>
                {certificate.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Student:</p>
                <p className="text-sm text-gray-600">{certificate.student}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Issue Date:</p>
                <p className="text-sm text-gray-600">{certificate.issueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Expiry Date:</p>
                <p className="text-sm text-gray-600">{certificate.expiryDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Certificate Number:</p>
                <p className="text-sm text-blue-600">{certificate.certificateNumber}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Verification Code:</p>
                <p className="text-sm text-gray-600 font-mono">{certificate.verificationCode}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Credential Hours:</p>
                <p className="text-sm text-gray-600">{certificate.credentialHours} hours</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Downloads:</p>
                <p className="text-sm text-gray-600">{certificate.downloadCount}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Certificate
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Download PDF
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Verify
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
          <h1 className="text-3xl font-bold text-gray-900">Learning Management System</h1>
          <p className="mt-2 text-gray-600">Manage courses, students, assessments, and certifications</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'courses', name: 'Courses', icon: '📚' },
              { id: 'students', name: 'Students', icon: '👥' },
              { id: 'certificates', name: 'Certificates', icon: '🏆' }
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
        {activeTab === 'courses' && renderCourses()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'certificates' && renderCertificates()}
      </div>
    </div>
  );
};

export default LearningModule;

