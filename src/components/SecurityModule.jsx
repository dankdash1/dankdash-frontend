import React, { useState, useEffect } from 'react';

const SecurityModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock security data
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
      }
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
      }
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
      }
    },
    {
      id: 'SEC-004',
      title: 'Privilege Escalation Attempt',
      description: 'User attempted to access admin functions without proper authorization',
      severity: 'High',
      status: 'Active',
      category: 'Access Control',
      source: 'Web Application',
      timestamp: '2024-08-14T07:15:00Z',
      affectedAssets: ['Admin Panel', 'User Management System'],
      riskScore: 80,
      mitigationSteps: [
        'Access attempt blocked',
        'User session terminated',
        'Account flagged for review'
      ],
      assignedTo: 'Security Team',
      tags: ['privilege-escalation', 'unauthorized-access', 'admin-panel'],
      relatedIncidents: [],
      evidence: {
        userId: '5678',
        attemptedAction: 'DELETE /admin/users/all',
        userRole: 'customer',
        sessionId: 'sess_abc123def456'
      }
    },
    {
      id: 'SEC-005',
      title: 'Data Exfiltration Warning',
      description: 'Large volume of data downloaded by single user in short timeframe',
      severity: 'Medium',
      status: 'Monitoring',
      category: 'Data Loss Prevention',
      source: 'Database Monitoring',
      timestamp: '2024-08-14T06:00:00Z',
      affectedAssets: ['Customer Database', 'Order History'],
      riskScore: 70,
      mitigationSteps: [
        'Download activity logged',
        'User behavior analysis initiated',
        'Data access audit in progress'
      ],
      assignedTo: 'Data Protection Team',
      tags: ['data-exfiltration', 'bulk-download', 'monitoring'],
      relatedIncidents: [],
      evidence: {
        dataVolume: '50 GB',
        recordCount: 125000,
        downloadDuration: '45 minutes',
        userRole: 'analyst'
      }
    }
  ]);

  const [vulnerabilities, setVulnerabilities] = useState([
    {
      id: 'VULN-001',
      title: 'Outdated SSL Certificate',
      description: 'SSL certificate for api.dankdash.com expires in 7 days',
      severity: 'Medium',
      status: 'Open',
      category: 'Certificate Management',
      cve: null,
      cvssScore: 5.3,
      affectedSystems: ['API Gateway', 'Load Balancer'],
      discoveredDate: '2024-08-07T00:00:00Z',
      dueDate: '2024-08-21T00:00:00Z',
      assignedTo: 'DevOps Team',
      remediation: {
        steps: [
          'Generate new SSL certificate',
          'Update load balancer configuration',
          'Test certificate installation',
          'Monitor certificate expiry'
        ],
        estimatedEffort: '2 hours',
        priority: 'Medium'
      },
      riskAssessment: {
        likelihood: 'Medium',
        impact: 'Medium',
        businessRisk: 'Service disruption if not renewed'
      }
    },
    {
      id: 'VULN-002',
      title: 'SQL Injection Vulnerability',
      description: 'Potential SQL injection in product search functionality',
      severity: 'Critical',
      status: 'In Progress',
      category: 'Web Application',
      cve: 'CVE-2024-12345',
      cvssScore: 9.1,
      affectedSystems: ['Web Application', 'Product Database'],
      discoveredDate: '2024-08-10T00:00:00Z',
      dueDate: '2024-08-17T00:00:00Z',
      assignedTo: 'Development Team',
      remediation: {
        steps: [
          'Implement parameterized queries',
          'Add input validation',
          'Update security tests',
          'Deploy security patch'
        ],
        estimatedEffort: '8 hours',
        priority: 'Critical'
      },
      riskAssessment: {
        likelihood: 'High',
        impact: 'Critical',
        businessRisk: 'Data breach, compliance violation'
      }
    },
    {
      id: 'VULN-003',
      title: 'Weak Password Policy',
      description: 'Current password policy allows weak passwords',
      severity: 'Medium',
      status: 'Open',
      category: 'Authentication',
      cve: null,
      cvssScore: 6.2,
      affectedSystems: ['User Management', 'Authentication Service'],
      discoveredDate: '2024-08-05T00:00:00Z',
      dueDate: '2024-08-25T00:00:00Z',
      assignedTo: 'Security Team',
      remediation: {
        steps: [
          'Update password complexity requirements',
          'Implement password strength meter',
          'Force password reset for weak passwords',
          'Update user documentation'
        ],
        estimatedEffort: '4 hours',
        priority: 'Medium'
      },
      riskAssessment: {
        likelihood: 'Medium',
        impact: 'Medium',
        businessRisk: 'Account compromise, unauthorized access'
      }
    },
    {
      id: 'VULN-004',
      title: 'Unencrypted Data Transmission',
      description: 'Some internal API calls not using HTTPS',
      severity: 'High',
      status: 'Open',
      category: 'Network Security',
      cve: null,
      cvssScore: 7.5,
      affectedSystems: ['Internal APIs', 'Microservices'],
      discoveredDate: '2024-08-12T00:00:00Z',
      dueDate: '2024-08-19T00:00:00Z',
      assignedTo: 'Infrastructure Team',
      remediation: {
        steps: [
          'Audit all internal API calls',
          'Implement TLS for internal communication',
          'Update service configurations',
          'Verify encryption implementation'
        ],
        estimatedEffort: '6 hours',
        priority: 'High'
      },
      riskAssessment: {
        likelihood: 'Medium',
        impact: 'High',
        businessRisk: 'Data interception, man-in-the-middle attacks'
      }
    }
  ]);

  const [accessLogs, setAccessLogs] = useState([
    {
      id: 'LOG-001',
      timestamp: '2024-08-14T10:30:00Z',
      user: 'admin@dankdash.com',
      action: 'Login Success',
      resource: 'Admin Dashboard',
      ipAddress: '192.168.1.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      location: 'San Francisco, CA',
      riskLevel: 'Low',
      sessionId: 'sess_abc123',
      duration: '45 minutes'
    },
    {
      id: 'LOG-002',
      timestamp: '2024-08-14T10:25:00Z',
      user: 'user@example.com',
      action: 'Failed Login',
      resource: 'Web Application',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      location: 'Unknown',
      riskLevel: 'High',
      sessionId: null,
      duration: null
    },
    {
      id: 'LOG-003',
      timestamp: '2024-08-14T10:20:00Z',
      user: 'api_user',
      action: 'API Access',
      resource: '/api/v2/products',
      ipAddress: '10.0.1.25',
      userAgent: 'DankDash-Mobile/1.2.0',
      location: 'Los Angeles, CA',
      riskLevel: 'Low',
      sessionId: 'api_sess_def456',
      duration: '2 seconds'
    },
    {
      id: 'LOG-004',
      timestamp: '2024-08-14T10:15:00Z',
      user: 'manager@dankdash.com',
      action: 'Data Export',
      resource: 'Customer Reports',
      ipAddress: '192.168.1.75',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      location: 'Denver, CO',
      riskLevel: 'Medium',
      sessionId: 'sess_ghi789',
      duration: '15 minutes'
    },
    {
      id: 'LOG-005',
      timestamp: '2024-08-14T10:10:00Z',
      user: 'system',
      action: 'Automated Backup',
      resource: 'Database',
      ipAddress: '127.0.0.1',
      userAgent: 'BackupService/2.1.0',
      location: 'Local',
      riskLevel: 'Low',
      sessionId: 'backup_jkl012',
      duration: '20 minutes'
    }
  ]);

  const [complianceStatus, setComplianceStatus] = useState([
    {
      id: 'COMP-001',
      framework: 'SOC 2 Type II',
      status: 'Compliant',
      lastAudit: '2024-06-15T00:00:00Z',
      nextAudit: '2024-12-15T00:00:00Z',
      score: 95,
      findings: 2,
      criticalFindings: 0,
      controls: {
        total: 150,
        implemented: 148,
        pending: 2,
        failed: 0
      },
      auditor: 'CyberSec Auditing LLC',
      certificate: 'SOC2-2024-DS-001'
    },
    {
      id: 'COMP-002',
      framework: 'PCI DSS',
      status: 'Compliant',
      lastAudit: '2024-07-01T00:00:00Z',
      nextAudit: '2025-07-01T00:00:00Z',
      score: 98,
      findings: 1,
      criticalFindings: 0,
      controls: {
        total: 200,
        implemented: 199,
        pending: 1,
        failed: 0
      },
      auditor: 'Payment Security Partners',
      certificate: 'PCI-DSS-2024-001'
    },
    {
      id: 'COMP-003',
      framework: 'Cannabis Compliance',
      status: 'Compliant',
      lastAudit: '2024-08-01T00:00:00Z',
      nextAudit: '2024-11-01T00:00:00Z',
      score: 92,
      findings: 5,
      criticalFindings: 1,
      controls: {
        total: 75,
        implemented: 70,
        pending: 4,
        failed: 1
      },
      auditor: 'Cannabis Regulatory Consultants',
      certificate: 'CRC-2024-CA-001'
    },
    {
      id: 'COMP-004',
      framework: 'GDPR',
      status: 'Partial',
      lastAudit: '2024-05-25T00:00:00Z',
      nextAudit: '2024-11-25T00:00:00Z',
      score: 78,
      findings: 12,
      criticalFindings: 3,
      controls: {
        total: 100,
        implemented: 85,
        pending: 12,
        failed: 3
      },
      auditor: 'EU Privacy Consultants',
      certificate: null
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalAlerts: 156,
    activeAlerts: 23,
    criticalAlerts: 3,
    resolvedAlerts: 133,
    avgResolutionTime: 4.5,
    securityScore: 87,
    vulnerabilities: {
      critical: 1,
      high: 3,
      medium: 8,
      low: 15
    },
    accessAttempts: {
      successful: 12450,
      failed: 234,
      blocked: 89
    },
    complianceScore: 91,
    lastIncident: '2024-08-10T00:00:00Z',
    mttr: 2.3, // Mean Time To Resolution in hours
    mttd: 0.5  // Mean Time To Detection in hours
  });

  // Filter functions
  const filteredAlerts = securityAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || alert.severity.toLowerCase() === selectedSeverity;
    const matchesStatus = selectedStatus === 'all' || alert.status.toLowerCase() === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || alert.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Investigating': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Monitoring': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-orange-100 text-orange-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Partial': return 'bg-yellow-100 text-yellow-800';
      case 'Non-Compliant': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Security Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeAlerts}</p>
              <p className="text-sm text-red-600">{analytics.criticalAlerts} critical</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Security Score</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.securityScore}%</p>
              <p className="text-sm text-blue-600">Good security posture</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Vulnerabilities</p>
              <p className="text-2xl font-bold text-gray-900">{Object.values(analytics.vulnerabilities).reduce((a, b) => a + b, 0)}</p>
              <p className="text-sm text-yellow-600">{analytics.vulnerabilities.critical + analytics.vulnerabilities.high} high risk</p>
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
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.complianceScore}%</p>
              <p className="text-sm text-green-600">4 frameworks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Security Alerts */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Security Alerts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {securityAlerts.slice(0, 5).map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{alert.title}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                      <span className="text-xs text-gray-500">{alert.category}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{alert.riskScore}</p>
                      <p className="text-xs text-gray-500">Risk Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{alert.affectedAssets.length}</p>
                      <p className="text-xs text-gray-500">Assets</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{formatDateTime(alert.timestamp)}</p>
                      <p className="text-xs text-gray-500">Detected</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vulnerability Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Vulnerability Breakdown</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Critical</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-red-600 mr-2">{analytics.vulnerabilities.critical}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: `${(analytics.vulnerabilities.critical / 10) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">High</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-orange-600 mr-2">{analytics.vulnerabilities.high}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${(analytics.vulnerabilities.high / 10) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Medium</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-yellow-600 mr-2">{analytics.vulnerabilities.medium}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${(analytics.vulnerabilities.medium / 10) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Low</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-green-600 mr-2">{analytics.vulnerabilities.low}</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(analytics.vulnerabilities.low / 20) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Access Statistics</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Successful Logins</span>
                <span className="text-sm font-medium text-green-600">{analytics.accessAttempts.successful.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Failed Attempts</span>
                <span className="text-sm font-medium text-red-600">{analytics.accessAttempts.failed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Blocked IPs</span>
                <span className="text-sm font-medium text-orange-600">{analytics.accessAttempts.blocked}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Success Rate</span>
                <span className="text-sm font-medium text-blue-600">
                  {((analytics.accessAttempts.successful / (analytics.accessAttempts.successful + analytics.accessAttempts.failed)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {complianceStatus.map((compliance) => (
              <div key={compliance.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{compliance.framework}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(compliance.status)}`}>
                    {compliance.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-medium text-gray-900">{compliance.score}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Findings:</span>
                    <span className="font-medium text-gray-900">{compliance.findings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next Audit:</span>
                    <span className="font-medium text-gray-900">{formatDate(compliance.nextAudit)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search alerts..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="monitoring">Monitoring</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="authentication">Authentication</option>
              <option value="api security">API Security</option>
              <option value="malware">Malware</option>
              <option value="access control">Access Control</option>
              <option value="data loss prevention">Data Loss Prevention</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">🚨</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                    <span className="text-xs text-gray-500">{alert.category}</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-gray-500">{alert.source}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Investigate
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Assign
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{alert.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Risk Score:</p>
                <p className="text-sm text-gray-600">{alert.riskScore}/100</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Assigned To:</p>
                <p className="text-sm text-gray-600">{alert.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Affected Assets:</p>
                <p className="text-sm text-gray-600">{alert.affectedAssets.length} systems</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Detected:</p>
                <p className="text-sm text-gray-600">{formatDateTime(alert.timestamp)}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Affected Assets:</p>
              <div className="flex flex-wrap gap-2">
                {alert.affectedAssets.map((asset, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {asset}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Mitigation Steps:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                {alert.mitigationSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Evidence:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {Object.entries(alert.evidence).map(([key, value]) => (
                  <div key={key}>
                    <span className="font-medium text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                    <span className="ml-2 text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {alert.tags.map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {alert.relatedIncidents.length > 0 && (
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Related Incidents: {alert.relatedIncidents.join(', ')}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderVulnerabilities = () => (
    <div className="space-y-6">
      {/* Vulnerabilities List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Vulnerabilities</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Scan Now
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {vulnerabilities.map((vuln) => (
              <div key={vuln.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{vuln.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(vuln.severity)}`}>
                          {vuln.severity}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vuln.status)}`}>
                          {vuln.status}
                        </span>
                        <span className="text-xs text-gray-500">{vuln.category}</span>
                        {vuln.cve && (
                          <span className="text-xs text-blue-600">{vuln.cve}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                      Fix Now
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{vuln.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">CVSS Score:</p>
                    <p className="text-sm text-gray-600">{vuln.cvssScore}/10</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Assigned To:</p>
                    <p className="text-sm text-gray-600">{vuln.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Due Date:</p>
                    <p className="text-sm text-gray-600">{formatDate(vuln.dueDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Discovered:</p>
                    <p className="text-sm text-gray-600">{formatDate(vuln.discoveredDate)}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Affected Systems:</p>
                  <div className="flex flex-wrap gap-2">
                    {vuln.affectedSystems.map((system, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                        {system}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Remediation Steps:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {vuln.remediation.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                  <div className="mt-2 text-sm text-gray-600">
                    <span className="font-medium">Estimated Effort:</span> {vuln.remediation.estimatedEffort}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{vuln.riskAssessment.likelihood}</p>
                    <p className="text-xs text-gray-500">Likelihood</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{vuln.riskAssessment.impact}</p>
                    <p className="text-xs text-gray-500">Impact</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{vuln.remediation.priority}</p>
                    <p className="text-xs text-gray-500">Priority</p>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Business Risk:</span> {vuln.riskAssessment.businessRisk}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccessLogs = () => (
    <div className="space-y-6">
      {/* Access Logs */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Access Logs</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Timestamp</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">User</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Action</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Resource</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">IP Address</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Location</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Risk</th>
                </tr>
              </thead>
              <tbody>
                {accessLogs.map((log) => (
                  <tr key={log.id} className="border-b">
                    <td className="py-3 px-4 text-gray-900">{formatDateTime(log.timestamp)}</td>
                    <td className="py-3 px-4 text-gray-900">{log.user}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        log.action.includes('Failed') ? 'bg-red-100 text-red-800' : 
                        log.action.includes('Success') ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{log.resource}</td>
                    <td className="py-3 px-4 text-gray-900">{log.ipAddress}</td>
                    <td className="py-3 px-4 text-gray-900">{log.location}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(log.riskLevel)}`}>
                        {log.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      {/* Compliance Frameworks */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Frameworks</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {complianceStatus.map((compliance) => (
              <div key={compliance.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{compliance.framework}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(compliance.status)}`}>
                          {compliance.status}
                        </span>
                        <span className="text-xs text-gray-500">Score: {compliance.score}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                      View Report
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      Remediate
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Audit:</p>
                    <p className="text-sm text-gray-600">{formatDate(compliance.lastAudit)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Next Audit:</p>
                    <p className="text-sm text-gray-600">{formatDate(compliance.nextAudit)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Auditor:</p>
                    <p className="text-sm text-gray-600">{compliance.auditor}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Certificate:</p>
                    <p className="text-sm text-gray-600">{compliance.certificate || 'N/A'}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Compliance Score:</p>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        compliance.score >= 90 ? 'bg-green-600' :
                        compliance.score >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                      }`}
                      style={{ width: `${compliance.score}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>0%</span>
                    <span>{compliance.score}%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{compliance.controls.implemented}</p>
                    <p className="text-xs text-gray-500">Implemented</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-yellow-600">{compliance.controls.pending}</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{compliance.controls.failed}</p>
                    <p className="text-xs text-gray-500">Failed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{compliance.controls.total}</p>
                    <p className="text-xs text-gray-500">Total Controls</p>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <span className="text-gray-600">Findings: </span>
                    <span className="font-medium text-gray-900">{compliance.findings} total</span>
                    {compliance.criticalFindings > 0 && (
                      <span className="ml-2 text-red-600">({compliance.criticalFindings} critical)</span>
                    )}
                  </div>
                  <div className="text-gray-600">
                    Implementation: {Math.round((compliance.controls.implemented / compliance.controls.total) * 100)}%
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
          <h1 className="text-3xl font-bold text-gray-900">Security & Monitoring</h1>
          <p className="mt-2 text-gray-600">Monitor security threats, manage vulnerabilities, and ensure compliance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'alerts', name: 'Security Alerts', icon: '🚨' },
              { id: 'vulnerabilities', name: 'Vulnerabilities', icon: '⚠️' },
              { id: 'access', name: 'Access Logs', icon: '📝' },
              { id: 'compliance', name: 'Compliance', icon: '📋' }
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
        {activeTab === 'alerts' && renderAlerts()}
        {activeTab === 'vulnerabilities' && renderVulnerabilities()}
        {activeTab === 'access' && renderAccessLogs()}
        {activeTab === 'compliance' && renderCompliance()}
      </div>
    </div>
  );
};

export default SecurityModule;

