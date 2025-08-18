import React, { useState, useEffect } from 'react';
import { Search, Plus, Filter, BookOpen, Users, Award, Clock, Star, Play, Download, Edit, Trash2, Eye, CheckCircle, XCircle, Calendar, User, BarChart3, TrendingUp, Target, Brain, Zap, Shield } from 'lucide-react';

const EnhancedLearningModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddCertification, setShowAddCertification] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingCertification, setEditingCertification] = useState(null);

  // Mock learning data with comprehensive course management
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
      language: 'English',
      createdDate: '2024-01-15',
      totalRevenue: 31344.00
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
      instructor: 'Mike Rodriguez',
      description: 'Advanced cultivation methods and best practices for cannabis growing',
      status: 'Published',
      price: 299.99,
      thumbnail: '/course-thumbnails/cultivation-techniques.jpg',
      tags: ['cultivation', 'growing', 'techniques'],
      prerequisites: ['CRS-001'],
      learningObjectives: [
        'Master advanced growing techniques',
        'Optimize yield and quality',
        'Manage plant health and nutrition',
        'Implement sustainable practices'
      ],
      completionRate: 80.8,
      lastUpdated: '2024-07-15',
      certificateAwarded: true,
      language: 'English',
      createdDate: '2024-02-01',
      totalRevenue: 70197.66
    },
    {
      id: 'CRS-003',
      title: 'Cannabis Business Management',
      category: 'Business',
      level: 'Advanced',
      duration: '8 hours',
      modules: 16,
      enrolled: 89,
      completed: 67,
      rating: 4.7,
      reviews: 45,
      instructor: 'Lisa Chen',
      description: 'Strategic business management for cannabis industry professionals',
      status: 'Published',
      price: 399.99,
      thumbnail: '/course-thumbnails/business-management.jpg',
      tags: ['business', 'management', 'strategy'],
      prerequisites: ['CRS-001', 'CRS-002'],
      learningObjectives: [
        'Develop business strategies',
        'Manage operations effectively',
        'Understand market dynamics',
        'Build successful teams'
      ],
      completionRate: 75.3,
      lastUpdated: '2024-06-30',
      certificateAwarded: true,
      language: 'English',
      createdDate: '2024-03-01',
      totalRevenue: 35599.33
    },
    {
      id: 'CRS-004',
      title: 'Cannabis Quality Control',
      category: 'Quality',
      level: 'Intermediate',
      duration: '5 hours',
      modules: 10,
      enrolled: 178,
      completed: 145,
      rating: 4.6,
      reviews: 98,
      instructor: 'David Kim',
      description: 'Quality assurance and testing protocols for cannabis products',
      status: 'Draft',
      price: 249.99,
      thumbnail: '/course-thumbnails/quality-control.jpg',
      tags: ['quality', 'testing', 'protocols'],
      prerequisites: ['CRS-001'],
      learningObjectives: [
        'Implement QC procedures',
        'Understand testing methods',
        'Manage quality standards',
        'Handle non-conformances'
      ],
      completionRate: 81.5,
      lastUpdated: '2024-08-10',
      certificateAwarded: true,
      language: 'English',
      createdDate: '2024-04-01',
      totalRevenue: 44499.55
    }
  ]);

  const [students, setStudents] = useState([
    {
      id: 'STU-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      enrolledCourses: ['CRS-001', 'CRS-002'],
      completedCourses: ['CRS-001'],
      totalHours: 12,
      certificatesEarned: 1,
      averageScore: 87.5,
      lastActivity: '2024-08-12',
      status: 'Active',
      joinDate: '2024-01-15',
      department: 'Operations',
      position: 'Cultivation Manager',
      progress: {
        'CRS-001': 100,
        'CRS-002': 75
      }
    },
    {
      id: 'STU-002',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@email.com',
      enrolledCourses: ['CRS-001', 'CRS-003'],
      completedCourses: ['CRS-001', 'CRS-003'],
      totalHours: 20,
      certificatesEarned: 2,
      averageScore: 92.3,
      lastActivity: '2024-08-11',
      status: 'Active',
      joinDate: '2024-02-01',
      department: 'Management',
      position: 'Operations Director',
      progress: {
        'CRS-001': 100,
        'CRS-003': 100
      }
    },
    {
      id: 'STU-003',
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      enrolledCourses: ['CRS-002', 'CRS-004'],
      completedCourses: [],
      totalHours: 8,
      certificatesEarned: 0,
      averageScore: 78.9,
      lastActivity: '2024-08-05',
      status: 'Inactive',
      joinDate: '2024-03-15',
      department: 'Quality',
      position: 'QC Technician',
      progress: {
        'CRS-002': 45,
        'CRS-004': 30
      }
    }
  ]);

  const [certifications, setCertifications] = useState([
    {
      id: 'CERT-001',
      name: 'Cannabis Compliance Specialist',
      description: 'Certified specialist in cannabis regulatory compliance',
      requirements: ['CRS-001'],
      validityPeriod: '2 years',
      issuedCount: 134,
      status: 'Active',
      createdDate: '2024-01-15',
      expiryTracking: true,
      renewalRequired: true,
      cpeCreditHours: 40,
      certificationBody: 'Cannabis Industry Association',
      level: 'Professional'
    },
    {
      id: 'CERT-002',
      name: 'Master Cannabis Cultivator',
      description: 'Advanced certification for cannabis cultivation expertise',
      requirements: ['CRS-001', 'CRS-002'],
      validityPeriod: '3 years',
      issuedCount: 89,
      status: 'Active',
      createdDate: '2024-02-01',
      expiryTracking: true,
      renewalRequired: true,
      cpeCreditHours: 60,
      certificationBody: 'Cannabis Cultivation Institute',
      level: 'Expert'
    },
    {
      id: 'CERT-003',
      name: 'Cannabis Business Leader',
      description: 'Executive-level certification for cannabis business management',
      requirements: ['CRS-001', 'CRS-002', 'CRS-003'],
      validityPeriod: '5 years',
      issuedCount: 45,
      status: 'Active',
      createdDate: '2024-03-01',
      expiryTracking: true,
      renewalRequired: true,
      cpeCreditHours: 80,
      certificationBody: 'Cannabis Business Council',
      level: 'Executive'
    }
  ]);

  // Calculate dashboard metrics
  const dashboardMetrics = {
    totalCourses: courses.length,
    activeCourses: courses.filter(c => c.status === 'Published').length,
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'Active').length,
    totalEnrollments: courses.reduce((sum, course) => sum + course.enrolled, 0),
    completionRate: courses.reduce((sum, course) => sum + course.completionRate, 0) / courses.length,
    totalRevenue: courses.reduce((sum, course) => sum + course.totalRevenue, 0),
    certificatesIssued: certifications.reduce((sum, cert) => sum + cert.issuedCount, 0)
  };

  // Filter functions
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || course.status === selectedStatus;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLevel;
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // CRUD Operations
  const handleAddCourse = (courseData) => {
    const newCourse = {
      id: `CRS-${String(courses.length + 1).padStart(3, '0')}`,
      ...courseData,
      enrolled: 0,
      completed: 0,
      rating: 0,
      reviews: 0,
      completionRate: 0,
      totalRevenue: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setCourses([...courses, newCourse]);
    setShowAddCourse(false);
  };

  const handleEditCourse = (courseId, courseData) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, ...courseData, lastUpdated: new Date().toISOString().split('T')[0] }
        : course
    ));
    setEditingCourse(null);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
  };

  const handleAddStudent = (studentData) => {
    const newStudent = {
      id: `STU-${String(students.length + 1).padStart(3, '0')}`,
      ...studentData,
      enrolledCourses: [],
      completedCourses: [],
      totalHours: 0,
      certificatesEarned: 0,
      averageScore: 0,
      joinDate: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      progress: {}
    };
    setStudents([...students, newStudent]);
    setShowAddStudent(false);
  };

  const handleEditStudent = (studentId, studentData) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, ...studentData, lastActivity: new Date().toISOString().split('T')[0] }
        : student
    ));
    setEditingStudent(null);
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const handleAddCertification = (certData) => {
    const newCertification = {
      id: `CERT-${String(certifications.length + 1).padStart(3, '0')}`,
      ...certData,
      issuedCount: 0,
      createdDate: new Date().toISOString().split('T')[0]
    };
    setCertifications([...certifications, newCertification]);
    setShowAddCertification(false);
  };

  const handleEditCertification = (certId, certData) => {
    setCertifications(certifications.map(cert => 
      cert.id === certId ? { ...cert, ...certData } : cert
    ));
    setEditingCertification(null);
  };

  const handleDeleteCertification = (certId) => {
    setCertifications(certifications.filter(cert => cert.id !== certId));
  };

  // Mobile-responsive dashboard component
  const Dashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalCourses}</p>
              <p className="text-xs text-green-600 mt-1">
                {dashboardMetrics.activeCourses} active
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.totalStudents}</p>
              <p className="text-xs text-green-600 mt-1">
                {dashboardMetrics.activeStudents} active
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.completionRate.toFixed(1)}%</p>
              <p className="text-xs text-blue-600 mt-1">
                {dashboardMetrics.totalEnrollments} enrollments
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Certificates Issued</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardMetrics.certificatesIssued}</p>
              <p className="text-xs text-yellow-600 mt-1">
                ${dashboardMetrics.totalRevenue.toLocaleString()} revenue
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Courses</h3>
          <div className="space-y-4">
            {courses.slice(0, 5).map((course) => (
              <div key={course.id} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.enrolled} enrolled • {course.rating} ⭐</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${course.completionRate}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{course.completionRate.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.department} • {student.certificatesEarned} certs</p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <p className="text-sm font-semibold text-green-600">{student.averageScore.toFixed(1)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Brain className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Learning Management Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium mb-1">📚 Course Design:</p>
                <p>Break content into digestible modules (15-20 min each) for better retention</p>
              </div>
              <div>
                <p className="font-medium mb-1">🎯 Engagement:</p>
                <p>Include interactive elements, quizzes, and practical exercises</p>
              </div>
              <div>
                <p className="font-medium mb-1">📊 Progress Tracking:</p>
                <p>Monitor completion rates and identify students who need support</p>
              </div>
              <div>
                <p className="font-medium mb-1">🏆 Motivation:</p>
                <p>Implement gamification with badges, leaderboards, and certificates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile-responsive courses component
  const Courses = () => (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Management</h2>
          <p className="text-gray-600">Create and manage training courses</p>
        </div>
        <button
          onClick={() => setShowAddCourse(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="Compliance">Compliance</option>
            <option value="Cultivation">Cultivation</option>
            <option value="Business">Business</option>
            <option value="Quality">Quality</option>
            <option value="Safety">Safety</option>
            <option value="Marketing">Marketing</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
            <option value="Archived">Archived</option>
          </select>

          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <button className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status === 'Published' 
                    ? 'bg-green-100 text-green-800' 
                    : course.status === 'Draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {course.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.level === 'Beginner' 
                    ? 'bg-blue-100 text-blue-800' 
                    : course.level === 'Intermediate'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {course.level}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-1" />
                  {course.enrolled} enrolled
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-4 w-4 mr-1" />
                  {course.rating} ({course.reviews})
                </div>
                <div className="flex items-center text-gray-600">
                  <Award className="h-4 w-4 mr-1" />
                  {course.certificateAwarded ? 'Certificate' : 'No Certificate'}
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium">{course.completionRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${course.completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">${course.price}</p>
                  <p className="text-xs text-gray-500">Revenue: ${course.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </button>
                  <button className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm">
                    <Play className="h-3 w-3 mr-1" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or create a new course.</p>
          <button
            onClick={() => setShowAddCourse(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </button>
        </div>
      )}
    </div>
  );

  // Mobile-responsive students component
  const Students = () => (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
          <p className="text-gray-600">Track student progress and enrollment</p>
        </div>
        <button
          onClick={() => setShowAddStudent(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.department}</div>
                    <div className="text-sm text-gray-500">{student.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{student.enrolledCourses.length} enrolled</div>
                    <div className="text-sm text-gray-500">{student.completedCourses.length} completed</div>
                    <div className="text-sm text-gray-500">{student.totalHours}h total</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{student.averageScore.toFixed(1)}%</div>
                    <div className="text-sm text-gray-500">{student.certificatesEarned} certificates</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setEditingStudent(student)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria or add a new student.</p>
          <button
            onClick={() => setShowAddStudent(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </button>
        </div>
      )}
    </div>
  );

  // Mobile-responsive certifications component
  const Certifications = () => (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Certification Management</h2>
          <p className="text-gray-600">Manage professional certifications and awards</p>
        </div>
        <button
          onClick={() => setShowAddCertification(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </button>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <div key={cert.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setEditingCertification(cert)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteCertification(cert.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Level:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  cert.level === 'Professional' 
                    ? 'bg-blue-100 text-blue-800' 
                    : cert.level === 'Expert'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {cert.level}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Validity:</span>
                <span className="font-medium">{cert.validityPeriod}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">CPE Hours:</span>
                <span className="font-medium">{cert.cpeCreditHours}h</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Issued:</span>
                <span className="font-medium">{cert.issuedCount}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Requirements:</p>
              <div className="flex flex-wrap gap-1">
                {cert.requirements.map((req, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {req}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                cert.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {cert.status}
              </span>
              <div className="flex items-center space-x-2">
                <button className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm">
                  <Award className="h-3 w-3 mr-1" />
                  Issue
                </button>
                <button className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                  <Download className="h-3 w-3 mr-1" />
                  Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {certifications.length === 0 && (
        <div className="text-center py-12">
          <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications found</h3>
          <p className="text-gray-600 mb-4">Create your first certification program.</p>
          <button
            onClick={() => setShowAddCertification(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Certification
          </button>
        </div>
      )}
    </div>
  );

  // Add Course Modal
  const AddCourseModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      category: 'Compliance',
      level: 'Beginner',
      duration: '',
      modules: '',
      instructor: '',
      description: '',
      status: 'Draft',
      price: '',
      tags: '',
      prerequisites: [],
      learningObjectives: [''],
      certificateAwarded: true,
      language: 'English'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddCourse({
        ...formData,
        modules: parseInt(formData.modules),
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(tag => tag.trim()),
        learningObjectives: formData.learningObjectives.filter(obj => obj.trim() !== '')
      });
    };

    if (!showAddCourse) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Course</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Compliance">Compliance</option>
                    <option value="Cultivation">Cultivation</option>
                    <option value="Business">Business</option>
                    <option value="Quality">Quality</option>
                    <option value="Safety">Safety</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., 4 hours"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Modules</label>
                  <input
                    type="number"
                    required
                    value={formData.modules}
                    onChange={(e) => setFormData({...formData, modules: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                  <input
                    type="text"
                    required
                    value={formData.instructor}
                    onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g., compliance, regulations, fundamentals"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Learning Objectives</label>
                {formData.learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...formData.learningObjectives];
                        newObjectives[index] = e.target.value;
                        setFormData({...formData, learningObjectives: newObjectives});
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter learning objective"
                    />
                    {formData.learningObjectives.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newObjectives = formData.learningObjectives.filter((_, i) => i !== index);
                          setFormData({...formData, learningObjectives: newObjectives});
                        }}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setFormData({...formData, learningObjectives: [...formData.learningObjectives, '']})}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  + Add Objective
                </button>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="certificateAwarded"
                  checked={formData.certificateAwarded}
                  onChange={(e) => setFormData({...formData, certificateAwarded: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="certificateAwarded" className="ml-2 block text-sm text-gray-900">
                  Award certificate upon completion
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCourse(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Course
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Add Student Modal
  const AddStudentModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      department: '',
      position: '',
      status: 'Active'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddStudent(formData);
    };

    if (!showAddStudent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Student</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  <option value="Operations">Operations</option>
                  <option value="Management">Management</option>
                  <option value="Quality">Quality</option>
                  <option value="Cultivation">Cultivation</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Compliance">Compliance</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddStudent(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Add Certification Modal
  const AddCertificationModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      requirements: [],
      validityPeriod: '2 years',
      status: 'Active',
      expiryTracking: true,
      renewalRequired: true,
      cpeCreditHours: '',
      certificationBody: '',
      level: 'Professional'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleAddCertification({
        ...formData,
        cpeCreditHours: parseInt(formData.cpeCreditHours)
      });
    };

    if (!showAddCertification) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Certification</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Professional">Professional</option>
                  <option value="Expert">Expert</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Validity Period</label>
                <select
                  value={formData.validityPeriod}
                  onChange={(e) => setFormData({...formData, validityPeriod: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="5 years">5 years</option>
                  <option value="Lifetime">Lifetime</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPE Credit Hours</label>
                <input
                  type="number"
                  required
                  value={formData.cpeCreditHours}
                  onChange={(e) => setFormData({...formData, cpeCreditHours: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certification Body</label>
                <input
                  type="text"
                  required
                  value={formData.certificationBody}
                  onChange={(e) => setFormData({...formData, certificationBody: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="expiryTracking"
                    checked={formData.expiryTracking}
                    onChange={(e) => setFormData({...formData, expiryTracking: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="expiryTracking" className="ml-2 block text-sm text-gray-900">
                    Enable expiry tracking
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="renewalRequired"
                    checked={formData.renewalRequired}
                    onChange={(e) => setFormData({...formData, renewalRequired: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="renewalRequired" className="ml-2 block text-sm text-gray-900">
                    Renewal required
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCertification(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Certification
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Learning Management System</h1>
          <p className="text-gray-600 mt-2">Comprehensive training and certification platform</p>
        </div>

        {/* Mobile-responsive Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
                { id: 'courses', name: 'Courses', icon: BookOpen },
                { id: 'students', name: 'Students', icon: Users },
                { id: 'certifications', name: 'Certifications', icon: Award }
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
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'courses' && <Courses />}
        {activeTab === 'students' && <Students />}
        {activeTab === 'certifications' && <Certifications />}

        {/* Modals */}
        <AddCourseModal />
        <AddStudentModal />
        <AddCertificationModal />
      </div>
    </div>
  );
};

export default EnhancedLearningModule;

