import React, { useState, useEffect } from 'react';

const EnhancedSecurityModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showCreatePolicyModal, setShowCreatePolicyModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Enhanced security data with full functionality
  const [securityAlerts, setSecurityAlerts] = useState([
    {
      id: 'SEC-001',
      title: 'Multiple Failed Login Attempts',
      description: 'Detected 15 failed login attempts from IP 192.168.1.100 within 5 minutes',
      severity: 'High',
      status: 'Active',
      category: 'Authentication',
      source: 'Web Application',
      timestamp: '2024-08-14T10:25:00Z',
      affectedAssets: ['Web Server', 'User Database'],
      riskScore: 85,
      mitigationSteps: [
        'IP address temporarily blocked',
        'User account locked after 5 attempts',
        'Security team notified'
      ],
      assignedTo: 'Security Team',
      tags: ['brute-force', 'authentication', 'suspicious-activity'],
      relatedIncidents: ['INC-2024-0156'],
      evidence: {
        logEntries: 15,
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        geolocation: 'Unknown'
      },
      created: '2024-08-14',
      lastUpdated: '2024-08-14'
    },
    {
      id: 'SEC-002',
      title: 'Unusual API Access Pattern',
      description: 'API endpoint accessed 500+ times in 1 hour from single source',
      severity: 'Medium',
      status: 'Investigating',
      category: 'API Security',
      source: 'API Gateway',
      timestamp: '2024-08-14T09:45:00Z',
      affectedAssets: ['API Gateway', 'Product Database'],
      riskScore: 65,
      mitigationSteps: [
        'Rate limiting applied',
        'API key usage monitored',
        'Traffic analysis in progress'
      ],
      assignedTo: 'DevOps Team',
      tags: ['api-abuse', 'rate-limiting', 'monitoring'],
      relatedIncidents: [],
      evidence: {
        requestCount: 523,
        endpoint: '/api/v2/products',
        apiKey: 'dk_live_abc123...',
        responsePattern: 'Consistent 200 responses'
      },
      created: '2024-08-14',
      lastUpdated: '2024-08-14'
    },
    {
      id: 'SEC-003',
      title: 'Suspicious File Upload',
      description: 'File upload with potentially malicious content detected',
      severity: 'Critical',
      status: 'Resolved',
      category: 'Malware',
      source: 'File Upload System',
      timestamp: '2024-08-14T08:30:00Z',
      affectedAssets: ['Upload Server', 'File Storage'],
      riskScore: 95,
      mitigationSteps: [
        'File quarantined immediately',
        'Antivirus scan completed',
        'Upload source blocked',
        'System integrity verified'
      ],
      assignedTo: 'Security Team',
      tags: ['malware', 'file-upload', 'quarantine'],
      relatedIncidents: ['INC-2024-0155'],
      evidence: {
        fileName: 'document.pdf.exe',
        fileSize: '2.3 MB',
        virusSignature: 'Trojan.Generic.KD.12345',
        uploadSource: 'User ID: 1234'
      },
      created: '2024-08-14',
      lastUpdated: '2024-08-14'
    }
  ]);

  const [securityPolicies, setSecurityPolicies] = useState([
    {
      id: 'POL-001',
      name: 'Password Policy',
      description: 'Minimum password requirements and complexity rules',
      category: 'Authentication',
      status: 'Active',
      priority: 'High',
      rules: [
        'Minimum 8 characters',
        'Must contain uppercase and lowercase letters',
        'Must contain at least one number',
        'Must contain at least one special character',
        'Cannot reuse last 5 passwords'
      ],
      enforcement: 'Automatic',
      compliance: 'SOC 2, GDPR',
      lastReview: '2024-07-15',
      nextReview: '2024-10-15',
      owner: 'Security Team',
      violations: 12,
      created: '2024-01-15',
      lastUpdated: '2024-07-15'
    },
    {
      id: 'POL-002',
      name: 'API Access Control',
      description: 'Rules for API authentication and authorization',
      category: 'API Security',
      status: 'Active',
      priority: 'Critical',
      rules: [
        'All API requests must include valid authentication',
        'Rate limiting: 1000 requests per hour per key',
        'API keys must be rotated every 90 days',
        'Failed authentication attempts logged and monitored'
      ],
      enforcement: 'Automatic',
      compliance: 'SOC 2, PCI DSS',
      lastReview: '2024-08-01',
      nextReview: '2024-11-01',
      owner: 'DevOps Team',
      violations: 3,
      created: '2024-02-01',
      lastUpdated: '2024-08-01'
    },
    {
      id: 'POL-003',
      name: 'Data Encryption',
      description: 'Encryption requirements for data at rest and in transit',
      category: 'Data Protection',
      status: 'Active',
      priority: 'Critical',
      rules: [
        'All sensitive data encrypted with AES-256',
        'TLS 1.3 required for data in transit',
        'Database encryption enabled',
        'Encryption keys rotated quarterly'
      ],
      enforcement: 'Automatic',
      compliance: 'GDPR, HIPAA, SOC 2',
      lastReview: '2024-06-30',
      nextReview: '2024-09-30',
      owner: 'Security Team',
      violations: 0,
      created: '2024-01-01',
      lastUpdated: '2024-06-30'
    }
  ]);

  const [accessControl, setAccessControl] = useState([
    {
      id: 'USER-001',
      username: 'admin@dankdash.com',
      name: 'System Administrator',
      role: 'Super Admin',
      permissions: ['read:all', 'write:all', 'delete:all', 'admin:all'],
      status: 'Active',
      lastLogin: '2024-08-14T10:30:00Z',
      loginCount: 1247,
      failedAttempts: 0,
      accountLocked: false,
      mfaEnabled: true,
      passwordLastChanged: '2024-07-15',
      sessionTimeout: 60,
      ipRestrictions: [],
      department: 'IT',
      created: '2024-01-01',
      lastUpdated: '2024-08-14'
    },
    {
      id: 'USER-002',
      username: 'manager@dankdash.com',
      name: 'Operations Manager',
      role: 'Manager',
      permissions: ['read:all', 'write:operations', 'write:inventory', 'read:reports'],
      status: 'Active',
      lastLogin: '2024-08-14T09:15:00Z',
      loginCount: 892,
      failedAttempts: 1,
      accountLocked: false,
      mfaEnabled: true,
      passwordLastChanged: '2024-08-01',
      sessionTimeout: 30,
      ipRestrictions: ['192.168.1.0/24'],
      department: 'Operations',
      created: '2024-02-15',
      lastUpdated: '2024-08-14'
    },
    {
      id: 'USER-003',
      username: 'employee@dankdash.com',
      name: 'Store Employee',
      role: 'Employee',
      permissions: ['read:products', 'write:orders', 'read:customers'],
      status: 'Active',
      lastLogin: '2024-08-13T16:45:00Z',
      loginCount: 456,
      failedAttempts: 0,
      accountLocked: false,
      mfaEnabled: false,
      passwordLastChanged: '2024-07-20',
      sessionTimeout: 15,
      ipRestrictions: ['10.0.1.0/24'],
      department: 'Sales',
      created: '2024-03-01',
      lastUpdated: '2024-08-13'
    }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'AUDIT-001',
      timestamp: '2024-08-14T10:30:25Z',
      user: 'admin@dankdash.com',
      action: 'User Login',
      resource: 'Authentication System',
      details: 'Successful login from IP 192.168.1.50',
      ipAddress: '192.168.1.50',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      severity: 'Info',
      category: 'Authentication',
      outcome: 'Success'
    },
    {
      id: 'AUDIT-002',
      timestamp: '2024-08-14T10:25:15Z',
      user: 'manager@dankdash.com',
      action: 'Data Export',
      resource: 'Customer Database',
      details: 'Exported customer list (500 records)',
      ipAddress: '192.168.1.75',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      severity: 'Medium',
      category: 'Data Access',
      outcome: 'Success'
    },
    {
      id: 'AUDIT-003',
      timestamp: '2024-08-14T10:20:45Z',
      user: 'employee@dankdash.com',
      action: 'Failed Login',
      resource: 'Authentication System',
      details: 'Invalid password attempt',
      ipAddress: '10.0.1.25',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1)',
      severity: 'Warning',
      category: 'Authentication',
      outcome: 'Failed'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalAlerts: 24,
    activeAlerts: 8,
    criticalAlerts: 2,
    resolvedAlerts: 16,
    totalPolicies: 15,
    activePolicies: 13,
    policyViolations: 23,
    totalUsers: 156,
    activeUsers: 142,
    lockedAccounts: 3,
    mfaEnabled: 89,
    averageRiskScore: 45,
    securityScore: 87,
    incidentResponseTime: 12,
    complianceRate: 94.5
  });

  // Form states
  const [alertForm, setAlertForm] = useState({
    title: '',
    description: '',
    severity: 'Medium',
    category: 'Authentication',
    source: 'Web Application',
    affectedAssets: [],
    assignedTo: 'Security Team',
    tags: []
  });

  const [policyForm, setPolicyForm] = useState({
    name: '',
    description: '',
    category: 'Authentication',
    priority: 'Medium',
    rules: [],
    enforcement: 'Manual',
    compliance: '',
    owner: 'Security Team'
  });

  const [userForm, setUserForm] = useState({
    username: '',
    name: '',
    role: 'Employee',
    permissions: [],
    department: '',
    sessionTimeout: 30,
    mfaEnabled: false,
    ipRestrictions: []
  });

  // CRUD Operations for Security Alerts
  const handleCreateAlert = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newAlert = {
        id: `SEC-${String(securityAlerts.length + 1).padStart(3, '0')}`,
        ...alertForm,
        status: 'Active',
        timestamp: new Date().toISOString(),
        riskScore: calculateRiskScore(alertForm.severity),
        mitigationSteps: [],
        relatedIncidents: [],
        evidence: {},
        created: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setSecurityAlerts([...securityAlerts, newAlert]);
      setShowCreateModal(false);
      setAlertForm({
        title: '',
        description: '',
        severity: 'Medium',
        category: 'Authentication',
        source: 'Web Application',
        affectedAssets: [],
        assignedTo: 'Security Team',
        tags: []
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalAlerts: prev.totalAlerts + 1,
        activeAlerts: prev.activeAlerts + 1
      }));

    } catch (error) {
      console.error('Error creating alert:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAlert = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedAlerts = securityAlerts.map(alert => 
        alert.id === selectedAlert.id 
          ? { ...alert, ...alertForm, lastUpdated: new Date().toISOString().split('T')[0] }
          : alert
      );
      
      setSecurityAlerts(updatedAlerts);
      setShowEditModal(false);
      setSelectedAlert(null);
      
    } catch (error) {
      console.error('Error updating alert:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlert = async () => {
    setLoading(true);
    
    try {
      const updatedAlerts = securityAlerts.filter(alert => alert.id !== selectedAlert.id);
      setSecurityAlerts(updatedAlerts);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalAlerts: prev.totalAlerts - 1,
        activeAlerts: selectedAlert.status === 'Active' ? prev.activeAlerts - 1 : prev.activeAlerts
      }));
      
      setShowDeleteModal(false);
      setSelectedAlert(null);
      
    } catch (error) {
      console.error('Error deleting alert:', error);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations for Security Policies
  const handleCreatePolicy = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newPolicy = {
        id: `POL-${String(securityPolicies.length + 1).padStart(3, '0')}`,
        ...policyForm,
        status: 'Active',
        lastReview: new Date().toISOString().split('T')[0],
        nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        violations: 0,
        created: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setSecurityPolicies([...securityPolicies, newPolicy]);
      setShowCreatePolicyModal(false);
      setPolicyForm({
        name: '',
        description: '',
        category: 'Authentication',
        priority: 'Medium',
        rules: [],
        enforcement: 'Manual',
        compliance: '',
        owner: 'Security Team'
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalPolicies: prev.totalPolicies + 1,
        activePolicies: prev.activePolicies + 1
      }));

    } catch (error) {
      console.error('Error creating policy:', error);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations for Access Control
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newUser = {
        id: `USER-${String(accessControl.length + 1).padStart(3, '0')}`,
        ...userForm,
        status: 'Active',
        lastLogin: null,
        loginCount: 0,
        failedAttempts: 0,
        accountLocked: false,
        passwordLastChanged: new Date().toISOString().split('T')[0],
        created: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setAccessControl([...accessControl, newUser]);
      setShowCreateUserModal(false);
      setUserForm({
        username: '',
        name: '',
        role: 'Employee',
        permissions: [],
        department: '',
        sessionTimeout: 30,
        mfaEnabled: false,
        ipRestrictions: []
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + 1,
        activeUsers: prev.activeUsers + 1
      }));

    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUserStatus = (userId) => {
    const updatedUsers = accessControl.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    );
    
    setAccessControl(updatedUsers);
  };

  const handleLockUser = (userId) => {
    const updatedUsers = accessControl.map(user => 
      user.id === userId 
        ? { ...user, accountLocked: !user.accountLocked }
        : user
    );
    
    setAccessControl(updatedUsers);
  };

  // Utility functions
  const calculateRiskScore = (severity) => {
    switch (severity) {
      case 'Critical': return Math.floor(Math.random() * 20) + 80;
      case 'High': return Math.floor(Math.random() * 20) + 60;
      case 'Medium': return Math.floor(Math.random() * 20) + 40;
      case 'Low': return Math.floor(Math.random() * 20) + 20;
      default: return 50;
    }
  };

  // Filter functions
  const filteredAlerts = securityAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || alert.severity.toLowerCase() === selectedSeverity.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || alert.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesCategory = selectedCategory === 'all' || alert.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
  });

  const openEditModal = (alert) => {
    setSelectedAlert(alert);
    setAlertForm({
      title: alert.title,
      description: alert.description,
      severity: alert.severity,
      category: alert.category,
      source: alert.source,
      affectedAssets: alert.affectedAssets,
      assignedTo: alert.assignedTo,
      tags: alert.tags
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (alert) => {
    setSelectedAlert(alert);
    setShowDeleteModal(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'investigating': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'dismissed': return 'text-gray-600 bg-gray-100';
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
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.securityScore}%</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">+2.5% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeAlerts}</p>
            </div>
            <div className="h-8 w-8 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-red-600 font-medium">{analytics.criticalAlerts} Critical</span>
            <span className="text-gray-500 ml-2">• {analytics.totalAlerts} Total</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Policy Compliance</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.complianceRate}%</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-blue-600 font-medium">{analytics.activePolicies} Active Policies</span>
            <span className="text-gray-500 ml-2">• {analytics.policyViolations} Violations</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">MFA Adoption</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round((analytics.mfaEnabled / analytics.totalUsers) * 100)}%</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">{analytics.mfaEnabled} Users</span>
            <span className="text-gray-500 ml-2">• {analytics.totalUsers} Total</span>
          </div>
        </div>
      </div>

      {/* Recent Security Alerts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Security Alerts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {securityAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                  alert.severity === 'Critical' ? 'bg-red-500' :
                  alert.severity === 'High' ? 'bg-orange-500' :
                  alert.severity === 'Medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{alert.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>{alert.category}</span>
                    <span>•</span>
                    <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    <span>•</span>
                    <span>Risk Score: {alert.riskScore}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="h-5 w-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Security Best Practices</h4>
            <p className="text-sm text-blue-700 mt-1">
              Enable multi-factor authentication for all users, regularly review access permissions, and keep security policies up to date. Monitor for unusual activity patterns and respond to alerts promptly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
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
              placeholder="Search alerts..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="dismissed">Dismissed</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Alert</span>
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{alert.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{alert.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span><strong>Category:</strong> {alert.category}</span>
                    <span><strong>Source:</strong> {alert.source}</span>
                    <span><strong>Risk Score:</strong> {alert.riskScore}</span>
                    <span><strong>Assigned:</strong> {alert.assignedTo}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(alert)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => openDeleteModal(alert)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {alert.affectedAssets.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Affected Assets</h4>
                  <div className="flex flex-wrap gap-2">
                    {alert.affectedAssets.map((asset, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {asset}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {alert.tags.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {alert.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Created: {new Date(alert.timestamp).toLocaleString()}</span>
                  <span>ID: {alert.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No security alerts found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first security alert.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Create Alert
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPolicies = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Security Policies</h2>
          <p className="text-sm text-gray-600">Manage security policies and compliance rules</p>
        </div>
        <button
          onClick={() => setShowCreatePolicyModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Policy</span>
        </button>
      </div>

      {/* Policies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {securityPolicies.map((policy) => (
          <div key={policy.id} className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{policy.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{policy.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      policy.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                      {policy.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      policy.priority === 'Critical' ? 'text-red-600 bg-red-100' :
                      policy.priority === 'High' ? 'text-orange-600 bg-orange-100' :
                      policy.priority === 'Medium' ? 'text-yellow-600 bg-yellow-100' :
                      'text-green-600 bg-green-100'
                    }`}>
                      {policy.priority}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium text-gray-900">{policy.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Enforcement</span>
                  <span className="font-medium text-gray-900">{policy.enforcement}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Owner</span>
                  <span className="font-medium text-gray-900">{policy.owner}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Violations</span>
                  <span className={`font-medium ${policy.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {policy.violations}
                  </span>
                </div>
              </div>

              {policy.rules.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Rules</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {policy.rules.slice(0, 3).map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                    {policy.rules.length > 3 && (
                      <li className="text-blue-600 text-xs">+{policy.rules.length - 3} more rules</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Next Review: {new Date(policy.nextReview).toLocaleDateString()}</span>
                  <span>Updated: {new Date(policy.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAccessControl = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Access Control</h2>
          <p className="text-sm text-gray-600">Manage user access and permissions</p>
        </div>
        <button
          onClick={() => setShowCreateUserModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add User</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MFA</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accessControl.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'Super Admin' ? 'text-red-600 bg-red-100' :
                      user.role === 'Manager' ? 'text-blue-600 bg-blue-100' :
                      'text-green-600 bg-green-100'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'Active' && !user.accountLocked ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                      }`}>
                        {user.accountLocked ? 'Locked' : user.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.mfaEnabled ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleUserStatus(user.id)}
                        className={`${
                          user.status === 'Active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'
                        }`}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleLockUser(user.id)}
                        className={`${
                          user.accountLocked ? 'text-green-600 hover:text-green-700' : 'text-orange-600 hover:text-orange-700'
                        }`}
                      >
                        {user.accountLocked ? 'Unlock' : 'Lock'}
                      </button>
                      <button className="text-blue-600 hover:text-blue-700">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAuditLogs = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-gray-900">Audit Logs</h2>
        <p className="text-sm text-gray-600">Track all security-related activities and events</p>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.resource}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.outcome === 'Success' ? 'text-green-600 bg-green-100' :
                      log.outcome === 'Failed' ? 'text-red-600 bg-red-100' :
                      'text-yellow-600 bg-yellow-100'
                    }`}>
                      {log.outcome}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Security Management</h1>
        <p className="text-gray-600 mt-1">Monitor security alerts, manage policies, and control access</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'alerts', name: 'Security Alerts', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z' },
            { id: 'policies', name: 'Policies', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { id: 'access', name: 'Access Control', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
            { id: 'audit', name: 'Audit Logs', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' }
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
      {activeTab === 'alerts' && renderAlerts()}
      {activeTab === 'policies' && renderPolicies()}
      {activeTab === 'access' && renderAccessControl()}
      {activeTab === 'audit' && renderAuditLogs()}

      {/* Create Alert Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Security Alert</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateAlert} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={alertForm.title}
                      onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })}
                      placeholder="e.g., Suspicious Login Activity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={alertForm.severity}
                      onChange={(e) => setAlertForm({ ...alertForm, severity: e.target.value })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={alertForm.description}
                    onChange={(e) => setAlertForm({ ...alertForm, description: e.target.value })}
                    placeholder="Describe the security alert in detail..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={alertForm.category}
                      onChange={(e) => setAlertForm({ ...alertForm, category: e.target.value })}
                    >
                      <option value="Authentication">Authentication</option>
                      <option value="API Security">API Security</option>
                      <option value="Malware">Malware</option>
                      <option value="Access Control">Access Control</option>
                      <option value="Data Protection">Data Protection</option>
                      <option value="Network Security">Network Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={alertForm.source}
                      onChange={(e) => setAlertForm({ ...alertForm, source: e.target.value })}
                    >
                      <option value="Web Application">Web Application</option>
                      <option value="API Gateway">API Gateway</option>
                      <option value="Database">Database</option>
                      <option value="File System">File System</option>
                      <option value="Network">Network</option>
                      <option value="External">External</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={alertForm.assignedTo}
                    onChange={(e) => setAlertForm({ ...alertForm, assignedTo: e.target.value })}
                  >
                    <option value="Security Team">Security Team</option>
                    <option value="DevOps Team">DevOps Team</option>
                    <option value="IT Team">IT Team</option>
                    <option value="Compliance Team">Compliance Team</option>
                  </select>
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
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Alert'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Alert Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Security Alert</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditAlert} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={alertForm.title}
                      onChange={(e) => setAlertForm({ ...alertForm, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={alertForm.severity}
                      onChange={(e) => setAlertForm({ ...alertForm, severity: e.target.value })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={alertForm.description}
                    onChange={(e) => setAlertForm({ ...alertForm, description: e.target.value })}
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
                    {loading ? 'Updating...' : 'Update Alert'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Alert Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Security Alert</h2>
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
                  Are you sure you want to delete <strong>{selectedAlert?.title}</strong>? This action cannot be undone.
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
                  onClick={handleDeleteAlert}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Alert'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Policy Modal */}
      {showCreatePolicyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Security Policy</h2>
                <button
                  onClick={() => setShowCreatePolicyModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreatePolicy} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Policy Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={policyForm.name}
                      onChange={(e) => setPolicyForm({ ...policyForm, name: e.target.value })}
                      placeholder="e.g., Password Policy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={policyForm.priority}
                      onChange={(e) => setPolicyForm({ ...policyForm, priority: e.target.value })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={policyForm.description}
                    onChange={(e) => setPolicyForm({ ...policyForm, description: e.target.value })}
                    placeholder="Describe the security policy..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={policyForm.category}
                      onChange={(e) => setPolicyForm({ ...policyForm, category: e.target.value })}
                    >
                      <option value="Authentication">Authentication</option>
                      <option value="API Security">API Security</option>
                      <option value="Data Protection">Data Protection</option>
                      <option value="Access Control">Access Control</option>
                      <option value="Network Security">Network Security</option>
                      <option value="Compliance">Compliance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Enforcement</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={policyForm.enforcement}
                      onChange={(e) => setPolicyForm({ ...policyForm, enforcement: e.target.value })}
                    >
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Advisory">Advisory</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={policyForm.owner}
                      onChange={(e) => setPolicyForm({ ...policyForm, owner: e.target.value })}
                    >
                      <option value="Security Team">Security Team</option>
                      <option value="IT Team">IT Team</option>
                      <option value="Compliance Team">Compliance Team</option>
                      <option value="DevOps Team">DevOps Team</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compliance</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={policyForm.compliance}
                      onChange={(e) => setPolicyForm({ ...policyForm, compliance: e.target.value })}
                      placeholder="e.g., SOC 2, GDPR, HIPAA"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreatePolicyModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Policy'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add User</h2>
                <button
                  onClick={() => setShowCreateUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={userForm.username}
                      onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                      placeholder="user@dankdash.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={userForm.name}
                      onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={userForm.role}
                      onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    >
                      <option value="Employee">Employee</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={userForm.department}
                      onChange={(e) => setUserForm({ ...userForm, department: e.target.value })}
                      placeholder="e.g., Sales, IT, Operations"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                    <input
                      type="number"
                      required
                      min="5"
                      max="480"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={userForm.sessionTimeout}
                      onChange={(e) => setUserForm({ ...userForm, sessionTimeout: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={userForm.mfaEnabled}
                        onChange={(e) => setUserForm({ ...userForm, mfaEnabled: e.target.checked })}
                      />
                      <span className="ml-2 text-sm text-gray-700">Enable Multi-Factor Authentication</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['read:products', 'write:products', 'read:orders', 'write:orders', 'read:customers', 'write:customers', 'read:reports', 'admin:all'].map((permission) => (
                      <label key={permission} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          checked={userForm.permissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUserForm({ ...userForm, permissions: [...userForm.permissions, permission] });
                            } else {
                              setUserForm({ ...userForm, permissions: userForm.permissions.filter(p => p !== permission) });
                            }
                          }}
                        />
                        <span className="ml-2 text-sm text-gray-700">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateUserModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Add User'}
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

export default EnhancedSecurityModule;

