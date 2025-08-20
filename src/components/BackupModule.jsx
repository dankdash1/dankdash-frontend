import React, { useState, useEffect } from 'react';

const BackupModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFrequency, setSelectedFrequency] = useState('all');

  // Mock backup data
  const [backups, setBackups] = useState([
    {
      id: 'BKP-001',
      name: 'Daily Database Backup',
      description: 'Automated daily backup of all database tables including user data, orders, and products',
      type: 'Database',
      status: 'Completed',
      frequency: 'Daily',
      schedule: '02:00 UTC',
      lastRun: '2024-08-14T02:00:00Z',
      nextRun: '2024-08-15T02:00:00Z',
      duration: 1245,
      size: 2.4,
      location: 'AWS S3 - us-west-2',
      retention: 30,
      encryption: true,
      compression: true,
      includes: [
        'users',
        'orders',
        'products',
        'inventory',
        'payments',
        'compliance_logs'
      ],
      excludes: [
        'temp_sessions',
        'cache_data'
      ],
      metrics: {
        successRate: 99.2,
        avgDuration: 1180,
        avgSize: 2.3,
        totalRuns: 365,
        failedRuns: 3
      },
      alerts: {
        onFailure: true,
        onSizeIncrease: true,
        onDurationIncrease: false,
        recipients: ['admin@dankdash.com', 'ops@dankdash.com']
      },
      verification: {
        enabled: true,
        lastVerified: '2024-08-14T02:15:00Z',
        status: 'Verified',
        checksumMatch: true
      }
    },
    {
      id: 'BKP-002',
      name: 'Weekly File System Backup',
      description: 'Complete backup of application files, configurations, and uploaded media',
      type: 'File System',
      status: 'Running',
      frequency: 'Weekly',
      schedule: 'Sunday 01:00 UTC',
      lastRun: '2024-08-11T01:00:00Z',
      nextRun: '2024-08-18T01:00:00Z',
      duration: 3420,
      size: 15.7,
      location: 'AWS S3 - us-west-2',
      retention: 12,
      encryption: true,
      compression: true,
      includes: [
        '/var/www/dankdash',
        '/etc/nginx',
        '/etc/ssl',
        '/home/uploads',
        '/var/log/application'
      ],
      excludes: [
        '/var/log/nginx/access.log',
        '/tmp',
        '/var/cache'
      ],
      metrics: {
        successRate: 97.8,
        avgDuration: 3200,
        avgSize: 14.9,
        totalRuns: 52,
        failedRuns: 1
      },
      alerts: {
        onFailure: true,
        onSizeIncrease: true,
        onDurationIncrease: true,
        recipients: ['admin@dankdash.com', 'devops@dankdash.com']
      },
      verification: {
        enabled: true,
        lastVerified: '2024-08-11T04:30:00Z',
        status: 'Verified',
        checksumMatch: true
      }
    },
    {
      id: 'BKP-003',
      name: 'Configuration Backup',
      description: 'Backup of system configurations, environment variables, and deployment scripts',
      type: 'Configuration',
      status: 'Completed',
      frequency: 'Daily',
      schedule: '03:00 UTC',
      lastRun: '2024-08-14T03:00:00Z',
      nextRun: '2024-08-15T03:00:00Z',
      duration: 180,
      size: 0.05,
      location: 'AWS S3 - us-west-2',
      retention: 90,
      encryption: true,
      compression: false,
      includes: [
        '/etc/environment',
        '/etc/systemd/system',
        '/etc/crontab',
        '/home/deploy/scripts',
        'docker-compose.yml',
        '.env files'
      ],
      excludes: [
        'node_modules',
        '.git'
      ],
      metrics: {
        successRate: 100,
        avgDuration: 165,
        avgSize: 0.048,
        totalRuns: 120,
        failedRuns: 0
      },
      alerts: {
        onFailure: true,
        onSizeIncrease: false,
        onDurationIncrease: false,
        recipients: ['admin@dankdash.com']
      },
      verification: {
        enabled: true,
        lastVerified: '2024-08-14T03:05:00Z',
        status: 'Verified',
        checksumMatch: true
      }
    },
    {
      id: 'BKP-004',
      name: 'Compliance Archive',
      description: 'Long-term archive of compliance data and regulatory reports for legal requirements',
      type: 'Compliance',
      status: 'Completed',
      frequency: 'Monthly',
      schedule: '1st of month 00:00 UTC',
      lastRun: '2024-08-01T00:00:00Z',
      nextRun: '2024-09-01T00:00:00Z',
      duration: 890,
      size: 1.2,
      location: 'AWS Glacier - us-west-2',
      retention: 2555, // 7 years
      encryption: true,
      compression: true,
      includes: [
        'compliance_reports',
        'audit_logs',
        'regulatory_submissions',
        'license_documents',
        'quality_control_records'
      ],
      excludes: [],
      metrics: {
        successRate: 100,
        avgDuration: 845,
        avgSize: 1.1,
        totalRuns: 8,
        failedRuns: 0
      },
      alerts: {
        onFailure: true,
        onSizeIncrease: false,
        onDurationIncrease: false,
        recipients: ['compliance@dankdash.com', 'legal@dankdash.com']
      },
      verification: {
        enabled: true,
        lastVerified: '2024-08-01T01:30:00Z',
        status: 'Verified',
        checksumMatch: true
      }
    },
    {
      id: 'BKP-005',
      name: 'Critical System Snapshot',
      description: 'Real-time snapshot of critical system state for disaster recovery',
      type: 'System',
      status: 'Failed',
      frequency: 'Hourly',
      schedule: 'Every hour',
      lastRun: '2024-08-14T10:00:00Z',
      nextRun: '2024-08-14T11:00:00Z',
      duration: 0,
      size: 0,
      location: 'Local Storage - Primary',
      retention: 7,
      encryption: false,
      compression: false,
      includes: [
        'system_state',
        'running_processes',
        'network_configuration',
        'active_connections',
        'memory_dumps'
      ],
      excludes: [
        'user_data',
        'application_logs'
      ],
      metrics: {
        successRate: 94.5,
        avgDuration: 45,
        avgSize: 0.8,
        totalRuns: 2400,
        failedRuns: 132
      },
      alerts: {
        onFailure: true,
        onSizeIncrease: false,
        onDurationIncrease: false,
        recipients: ['ops@dankdash.com', 'sre@dankdash.com']
      },
      verification: {
        enabled: false,
        lastVerified: null,
        status: 'Not Configured',
        checksumMatch: null
      }
    }
  ]);

  const [recoveryPlans, setRecoveryPlans] = useState([
    {
      id: 'REC-001',
      name: 'Database Recovery Plan',
      description: 'Complete database restoration procedure for production environment',
      type: 'Database',
      priority: 'Critical',
      rto: 30, // Recovery Time Objective in minutes
      rpo: 60, // Recovery Point Objective in minutes
      steps: [
        {
          order: 1,
          title: 'Stop Application Services',
          description: 'Gracefully stop all application services to prevent data corruption',
          estimatedTime: 5,
          responsible: 'Operations Team',
          automated: true
        },
        {
          order: 2,
          title: 'Verify Backup Integrity',
          description: 'Validate backup file integrity and checksums',
          estimatedTime: 10,
          responsible: 'Database Administrator',
          automated: true
        },
        {
          order: 3,
          title: 'Restore Database',
          description: 'Execute database restoration from latest backup',
          estimatedTime: 15,
          responsible: 'Database Administrator',
          automated: false
        },
        {
          order: 4,
          title: 'Verify Data Integrity',
          description: 'Run data integrity checks and validation queries',
          estimatedTime: 10,
          responsible: 'Database Administrator',
          automated: true
        },
        {
          order: 5,
          title: 'Restart Services',
          description: 'Start application services and verify functionality',
          estimatedTime: 5,
          responsible: 'Operations Team',
          automated: true
        }
      ],
      lastTested: '2024-07-15T14:00:00Z',
      testResults: {
        success: true,
        actualRTO: 28,
        actualRPO: 45,
        issues: []
      },
      contacts: [
        {
          role: 'Primary DBA',
          name: 'Sarah Johnson',
          phone: '+1-555-0123',
          email: 'sarah@dankdash.com'
        },
        {
          role: 'Backup DBA',
          name: 'Mike Chen',
          phone: '+1-555-0124',
          email: 'mike@dankdash.com'
        }
      ]
    },
    {
      id: 'REC-002',
      name: 'Full System Recovery',
      description: 'Complete system restoration including all services and data',
      type: 'System',
      priority: 'Critical',
      rto: 120,
      rpo: 240,
      steps: [
        {
          order: 1,
          title: 'Assess Damage',
          description: 'Evaluate system state and determine recovery scope',
          estimatedTime: 15,
          responsible: 'Site Reliability Engineer',
          automated: false
        },
        {
          order: 2,
          title: 'Provision Infrastructure',
          description: 'Deploy new infrastructure or repair existing systems',
          estimatedTime: 30,
          responsible: 'DevOps Team',
          automated: true
        },
        {
          order: 3,
          title: 'Restore File Systems',
          description: 'Restore application files and configurations',
          estimatedTime: 45,
          responsible: 'Operations Team',
          automated: true
        },
        {
          order: 4,
          title: 'Restore Database',
          description: 'Execute database recovery procedures',
          estimatedTime: 30,
          responsible: 'Database Administrator',
          automated: false
        },
        {
          order: 5,
          title: 'Verify and Test',
          description: 'Comprehensive system testing and validation',
          estimatedTime: 20,
          responsible: 'QA Team',
          automated: true
        }
      ],
      lastTested: '2024-06-01T09:00:00Z',
      testResults: {
        success: false,
        actualRTO: 145,
        actualRPO: 180,
        issues: [
          'Infrastructure provisioning took longer than expected',
          'Database restoration had minor issues with indexes'
        ]
      },
      contacts: [
        {
          role: 'Incident Commander',
          name: 'Alex Kim',
          phone: '+1-555-0125',
          email: 'alex@dankdash.com'
        },
        {
          role: 'Technical Lead',
          name: 'Lisa Rodriguez',
          phone: '+1-555-0126',
          email: 'lisa@dankdash.com'
        }
      ]
    },
    {
      id: 'REC-003',
      name: 'Compliance Data Recovery',
      description: 'Recovery of compliance and regulatory data from long-term archives',
      type: 'Compliance',
      priority: 'High',
      rto: 480, // 8 hours
      rpo: 1440, // 24 hours
      steps: [
        {
          order: 1,
          title: 'Identify Required Data',
          description: 'Determine specific compliance data needed for recovery',
          estimatedTime: 60,
          responsible: 'Compliance Officer',
          automated: false
        },
        {
          order: 2,
          title: 'Request Archive Retrieval',
          description: 'Submit request to retrieve data from cold storage',
          estimatedTime: 240,
          responsible: 'Operations Team',
          automated: true
        },
        {
          order: 3,
          title: 'Verify Data Integrity',
          description: 'Validate retrieved data integrity and completeness',
          estimatedTime: 120,
          responsible: 'Compliance Officer',
          automated: true
        },
        {
          order: 4,
          title: 'Restore to Production',
          description: 'Import compliance data to production systems',
          estimatedTime: 60,
          responsible: 'Database Administrator',
          automated: false
        }
      ],
      lastTested: '2024-05-01T10:00:00Z',
      testResults: {
        success: true,
        actualRTO: 420,
        actualRPO: 1440,
        issues: []
      },
      contacts: [
        {
          role: 'Compliance Officer',
          name: 'Emma Wilson',
          phone: '+1-555-0127',
          email: 'emma@dankdash.com'
        }
      ]
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalBackups: 45,
    activeBackups: 38,
    failedBackups: 2,
    totalStorage: 156.7,
    monthlyGrowth: 12.5,
    avgBackupTime: 1245,
    successRate: 97.8,
    lastFailure: '2024-08-14T10:00:00Z',
    recoveryPlans: 8,
    testedPlans: 6,
    avgRTO: 85,
    avgRPO: 120,
    complianceRetention: 2555,
    encryptedBackups: 42
  });

  const [storageLocations, setStorageLocations] = useState([
    {
      id: 'LOC-001',
      name: 'AWS S3 Primary',
      type: 'Cloud',
      provider: 'Amazon Web Services',
      region: 'us-west-2',
      capacity: 1000,
      used: 156.7,
      available: 843.3,
      cost: 89.50,
      encryption: true,
      redundancy: 'Multi-AZ',
      accessTier: 'Standard',
      backupCount: 35,
      status: 'Active'
    },
    {
      id: 'LOC-002',
      name: 'AWS Glacier Archive',
      type: 'Cold Storage',
      provider: 'Amazon Web Services',
      region: 'us-west-2',
      capacity: 5000,
      used: 45.2,
      available: 4954.8,
      cost: 12.30,
      encryption: true,
      redundancy: 'Cross-Region',
      accessTier: 'Archive',
      backupCount: 8,
      status: 'Active'
    },
    {
      id: 'LOC-003',
      name: 'Local NAS',
      type: 'On-Premise',
      provider: 'Synology',
      region: 'Data Center',
      capacity: 100,
      used: 78.9,
      available: 21.1,
      cost: 0,
      encryption: true,
      redundancy: 'RAID 6',
      accessTier: 'Hot',
      backupCount: 12,
      status: 'Warning'
    }
  ]);

  // Filter functions
  const filteredBackups = backups.filter(backup => {
    const matchesSearch = backup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         backup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         backup.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || backup.status.toLowerCase() === selectedStatus;
    const matchesType = selectedType === 'all' || backup.type.toLowerCase() === selectedType;
    const matchesFrequency = selectedFrequency === 'all' || backup.frequency.toLowerCase() === selectedFrequency;
    return matchesSearch && matchesStatus && matchesType && matchesFrequency;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Running': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Paused': return 'bg-gray-100 text-gray-800';
      case 'Warning': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Database': return 'bg-blue-100 text-blue-800';
      case 'File System': return 'bg-green-100 text-green-800';
      case 'Configuration': return 'bg-purple-100 text-purple-800';
      case 'Compliance': return 'bg-orange-100 text-orange-800';
      case 'System': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
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

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatSize = (gb) => {
    if (gb >= 1000) {
      return `${(gb / 1000).toFixed(1)} TB`;
    }
    return `${gb.toFixed(1)} GB`;
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Backups</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalBackups}</p>
              <p className="text-sm text-blue-600">{analytics.activeBackups} active</p>
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
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.successRate}%</p>
              <p className="text-sm text-green-600">{analytics.failedBackups} failed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">{formatSize(analytics.totalStorage)}</p>
              <p className="text-sm text-purple-600">+{analytics.monthlyGrowth}% monthly</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Backup Time</p>
              <p className="text-2xl font-bold text-gray-900">{formatDuration(analytics.avgBackupTime)}</p>
              <p className="text-sm text-yellow-600">RTO: {analytics.avgRTO}m</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Backup Status */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Backup Status</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {backups.slice(0, 5).map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💾</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{backup.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(backup.status)}`}>
                        {backup.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(backup.type)}`}>
                        {backup.type}
                      </span>
                      <span className="text-xs text-gray-500">{backup.frequency}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{formatSize(backup.size)}</p>
                      <p className="text-xs text-gray-500">Size</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{formatDuration(backup.duration)}</p>
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{backup.metrics.successRate}%</p>
                      <p className="text-xs text-gray-500">Success</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{formatDateTime(backup.lastRun)}</p>
                      <p className="text-xs text-gray-500">Last Run</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Storage Locations</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {storageLocations.map((location) => (
              <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">☁️</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{location.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(location.status)}`}>
                        {location.status}
                      </span>
                      <span className="text-xs text-gray-500">{location.type}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{location.region}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{formatSize(location.used)}</p>
                      <p className="text-xs text-gray-500">Used</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{formatSize(location.capacity)}</p>
                      <p className="text-xs text-gray-500">Capacity</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{location.backupCount}</p>
                      <p className="text-xs text-gray-500">Backups</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${location.cost}</p>
                      <p className="text-xs text-gray-500">Monthly Cost</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recovery Plans Status */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recovery Plans Status</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recoveryPlans.slice(0, 3).map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🔄</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{plan.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(plan.priority)}`}>
                        {plan.priority}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(plan.type)}`}>
                        {plan.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{plan.rto}m</p>
                      <p className="text-xs text-gray-500">RTO</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{plan.rpo}m</p>
                      <p className="text-xs text-gray-500">RPO</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{plan.steps.length}</p>
                      <p className="text-xs text-gray-500">Steps</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{formatDate(plan.lastTested)}</p>
                      <p className="text-xs text-gray-500">Last Tested</p>
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

  const renderBackups = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search backups..."
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
              <option value="completed">Completed</option>
              <option value="running">Running</option>
              <option value="failed">Failed</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="database">Database</option>
              <option value="file system">File System</option>
              <option value="configuration">Configuration</option>
              <option value="compliance">Compliance</option>
              <option value="system">System</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedFrequency}
              onChange={(e) => setSelectedFrequency(e.target.value)}
            >
              <option value="all">All Frequencies</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Backup
            </button>
          </div>
        </div>
      </div>

      {/* Backups List */}
      <div className="space-y-4">
        {filteredBackups.map((backup) => (
          <div key={backup.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💾</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{backup.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(backup.status)}`}>
                      {backup.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(backup.type)}`}>
                      {backup.type}
                    </span>
                    <span className="text-xs text-gray-500">{backup.frequency} at {backup.schedule}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Run Now
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Configure
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{backup.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Schedule:</p>
                <p className="text-sm text-gray-600">{backup.frequency}</p>
                <p className="text-sm text-gray-600">{backup.schedule}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Storage:</p>
                <p className="text-sm text-gray-600">{backup.location}</p>
                <p className="text-sm text-gray-600">Retention: {backup.retention} days</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Security:</p>
                <p className="text-sm text-gray-600">
                  {backup.encryption ? '🔒 Encrypted' : '🔓 Not Encrypted'}
                </p>
                <p className="text-sm text-gray-600">
                  {backup.compression ? '📦 Compressed' : '📄 Uncompressed'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Next Run:</p>
                <p className="text-sm text-gray-600">{formatDateTime(backup.nextRun)}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{formatSize(backup.size)}</p>
                <p className="text-xs text-gray-500">Last Size</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{formatDuration(backup.duration)}</p>
                <p className="text-xs text-gray-500">Last Duration</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{backup.metrics.successRate}%</p>
                <p className="text-xs text-gray-500">Success Rate</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{backup.metrics.totalRuns}</p>
                <p className="text-xs text-gray-500">Total Runs</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
              <div className="flex flex-wrap gap-2">
                {backup.includes.slice(0, 5).map((item, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    {item}
                  </span>
                ))}
                {backup.includes.length > 5 && (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    +{backup.includes.length - 5} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Verification:</p>
              <div className="flex items-center space-x-4 text-sm">
                <span className={`${backup.verification.enabled ? 'text-green-600' : 'text-red-600'}`}>
                  {backup.verification.enabled ? '✅ Enabled' : '❌ Disabled'}
                </span>
                {backup.verification.enabled && (
                  <>
                    <span>Last Verified: {formatDateTime(backup.verification.lastVerified)}</span>
                    <span className={`${backup.verification.checksumMatch ? 'text-green-600' : 'text-red-600'}`}>
                      {backup.verification.checksumMatch ? '✅ Checksum Match' : '❌ Checksum Mismatch'}
                    </span>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Last Run: {formatDateTime(backup.lastRun)}</span>
              <span>Failed Runs: {backup.metrics.failedRuns}</span>
              <span>Alerts: {backup.alerts.recipients.length} recipients</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRecovery = () => (
    <div className="space-y-6">
      {/* Recovery Plans List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Recovery Plans</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Plan
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {recoveryPlans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">🔄</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{plan.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(plan.priority)}`}>
                          {plan.priority}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(plan.type)}`}>
                          {plan.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                      Execute
                    </button>
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                      Test
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      Edit
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{plan.rto}m</p>
                    <p className="text-xs text-gray-500">RTO (Target)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-orange-600">{plan.rpo}m</p>
                    <p className="text-xs text-gray-500">RPO (Target)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{plan.steps.length}</p>
                    <p className="text-xs text-gray-500">Recovery Steps</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{plan.testResults.actualRTO || 'N/A'}m</p>
                    <p className="text-xs text-gray-500">Actual RTO</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Recovery Steps:</p>
                  <div className="space-y-2">
                    {plan.steps.map((step) => (
                      <div key={step.order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-blue-600">{step.order}</span>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900">{step.title}</h5>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-600">{step.estimatedTime}m</span>
                            <span className="text-gray-600">{step.responsible}</span>
                            <span className={`${step.automated ? 'text-green-600' : 'text-orange-600'}`}>
                              {step.automated ? '🤖 Auto' : '👤 Manual'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Emergency Contacts:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plan.contacts.map((contact, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h6 className="font-medium text-gray-900">{contact.name}</h6>
                            <p className="text-sm text-gray-600">{contact.role}</p>
                          </div>
                          <div className="text-right text-sm">
                            <p className="text-gray-600">{contact.phone}</p>
                            <p className="text-gray-600">{contact.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Last Test Results:</p>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${plan.testResults.success ? 'text-green-600' : 'text-red-600'}`}>
                        {plan.testResults.success ? '✅ Test Passed' : '❌ Test Failed'}
                      </span>
                      <span className="text-sm text-gray-600">Tested: {formatDate(plan.lastTested)}</span>
                    </div>
                    {plan.testResults.issues && plan.testResults.issues.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-700 mb-1">Issues Found:</p>
                        <ul className="text-sm text-red-600 list-disc list-inside">
                          {plan.testResults.issues.map((issue, index) => (
                            <li key={index}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Total Estimated Time: {plan.steps.reduce((sum, step) => sum + step.estimatedTime, 0)}m</span>
                  <span>Automated Steps: {plan.steps.filter(step => step.automated).length}/{plan.steps.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStorage = () => (
    <div className="space-y-6">
      {/* Storage Locations */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Storage Locations</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Location
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {storageLocations.map((location) => (
              <div key={location.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">☁️</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{location.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(location.status)}`}>
                          {location.status}
                        </span>
                        <span className="text-xs text-gray-500">{location.type}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{location.provider}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                      Configure
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      Test
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Region:</p>
                    <p className="text-sm text-gray-600">{location.region}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Access Tier:</p>
                    <p className="text-sm text-gray-600">{location.accessTier}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Redundancy:</p>
                    <p className="text-sm text-gray-600">{location.redundancy}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Encryption:</p>
                    <p className="text-sm text-gray-600">
                      {location.encryption ? '🔒 Enabled' : '🔓 Disabled'}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Storage Usage:</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(location.used / location.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{formatSize(location.used)} used</span>
                    <span>{formatSize(location.available)} available</span>
                    <span>{formatSize(location.capacity)} total</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{location.backupCount}</p>
                    <p className="text-xs text-gray-500">Active Backups</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">${location.cost}</p>
                    <p className="text-xs text-gray-500">Monthly Cost</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{Math.round((location.used / location.capacity) * 100)}%</p>
                    <p className="text-xs text-gray-500">Utilization</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Storage Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Storage Costs</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Monthly Cost</span>
                <span className="text-sm font-medium text-gray-900">
                  ${storageLocations.reduce((sum, loc) => sum + loc.cost, 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cost per GB</span>
                <span className="text-sm font-medium text-gray-900">
                  ${(storageLocations.reduce((sum, loc) => sum + loc.cost, 0) / 
                     storageLocations.reduce((sum, loc) => sum + loc.used, 0)).toFixed(3)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Projected Annual</span>
                <span className="text-sm font-medium text-green-600">
                  ${(storageLocations.reduce((sum, loc) => sum + loc.cost, 0) * 12).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Storage Distribution</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {storageLocations.map((location) => (
                <div key={location.id} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{location.name}</span>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{formatSize(location.used)}</span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({Math.round((location.used / storageLocations.reduce((sum, loc) => sum + loc.used, 0)) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Backup & Recovery</h1>
          <p className="mt-2 text-gray-600">Manage data backups, disaster recovery plans, and storage infrastructure</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'backups', name: 'Backups', icon: '💾' },
              { id: 'recovery', name: 'Recovery Plans', icon: '🔄' },
              { id: 'storage', name: 'Storage', icon: '☁️' }
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
        {activeTab === 'backups' && renderBackups()}
        {activeTab === 'recovery' && renderRecovery()}
        {activeTab === 'storage' && renderStorage()}
      </div>
    </div>
  );
};

export default BackupModule;

