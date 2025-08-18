import React, { useState, useEffect } from 'react';

const EnhancedBackupModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFrequency, setSelectedFrequency] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [loading, setLoading] = useState(false);

  // Enhanced backup data with full functionality
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
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-08-14'
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
        lastVerified: '2024-08-11T01:30:00Z',
        status: 'Verified',
        checksumMatch: true
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-08-11'
    },
    {
      id: 'BKP-003',
      name: 'Monthly Configuration Backup',
      description: 'Backup of system configurations, environment variables, and security certificates',
      type: 'Configuration',
      status: 'Scheduled',
      frequency: 'Monthly',
      schedule: '1st Sunday 03:00 UTC',
      lastRun: '2024-07-07T03:00:00Z',
      nextRun: '2024-09-01T03:00:00Z',
      duration: 180,
      size: 0.3,
      location: 'Local Storage',
      retention: 6,
      encryption: true,
      compression: false,
      includes: [
        '/etc/nginx/sites-available',
        '/etc/ssl/certs',
        '/etc/environment',
        '/home/dankdash/.env'
      ],
      excludes: [
        '/etc/ssl/private'
      ],
      metrics: {
        successRate: 100.0,
        avgDuration: 165,
        avgSize: 0.28,
        totalRuns: 8,
        failedRuns: 0
      },
      alerts: {
        onFailure: true,
        onSizeIncrease: false,
        onDurationIncrease: false,
        recipients: ['security@dankdash.com']
      },
      verification: {
        enabled: true,
        lastVerified: '2024-07-07T03:05:00Z',
        status: 'Verified',
        checksumMatch: true
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-07-07'
    },
    {
      id: 'BKP-004',
      name: 'Compliance Data Archive',
      description: 'Long-term archive of compliance logs and regulatory data for audit purposes',
      type: 'Archive',
      status: 'Failed',
      frequency: 'Quarterly',
      schedule: '1st Monday 00:00 UTC',
      lastRun: '2024-07-01T00:00:00Z',
      nextRun: '2024-10-01T00:00:00Z',
      duration: 0,
      size: 0,
      location: 'AWS Glacier',
      retention: 84,
      encryption: true,
      compression: true,
      includes: [
        'compliance_logs',
        'audit_trails',
        'regulatory_reports',
        'license_documents'
      ],
      excludes: [],
      metrics: {
        successRate: 75.0,
        avgDuration: 2400,
        avgSize: 8.5,
        totalRuns: 4,
        failedRuns: 1
      },
      alerts: {
        onFailure: true,
        onSizeIncrease: false,
        onDurationIncrease: false,
        recipients: ['compliance@dankdash.com', 'legal@dankdash.com']
      },
      verification: {
        enabled: true,
        lastVerified: '2024-04-01T02:30:00Z',
        status: 'Failed',
        checksumMatch: false
      },
      createdAt: '2024-01-01',
      updatedAt: '2024-07-01'
    }
  ]);

  const [restorePoints, setRestorePoints] = useState([
    {
      id: 'RST-001',
      backupId: 'BKP-001',
      name: 'Database Restore Point - Aug 14',
      timestamp: '2024-08-14T02:00:00Z',
      size: 2.4,
      status: 'Available',
      type: 'Full',
      location: 'AWS S3 - us-west-2',
      retention: '2024-09-13',
      verified: true,
      description: 'Complete database backup with all user data and transactions'
    },
    {
      id: 'RST-002',
      backupId: 'BKP-001',
      name: 'Database Restore Point - Aug 13',
      timestamp: '2024-08-13T02:00:00Z',
      size: 2.3,
      status: 'Available',
      type: 'Full',
      location: 'AWS S3 - us-west-2',
      retention: '2024-09-12',
      verified: true,
      description: 'Complete database backup with all user data and transactions'
    },
    {
      id: 'RST-003',
      backupId: 'BKP-002',
      name: 'File System Restore Point - Aug 11',
      timestamp: '2024-08-11T01:00:00Z',
      size: 15.7,
      status: 'Available',
      type: 'Full',
      location: 'AWS S3 - us-west-2',
      retention: '2024-11-11',
      verified: true,
      description: 'Complete file system backup including application files and media'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalBackups: 4,
    activeBackups: 3,
    failedBackups: 1,
    scheduledBackups: 1,
    totalStorage: 18.4,
    monthlyGrowth: 2.1,
    successRate: 93.0,
    avgDuration: 1761,
    lastBackup: '2024-08-14T02:00:00Z',
    nextBackup: '2024-08-15T02:00:00Z',
    retentionCompliance: 98.5,
    encryptionCoverage: 100.0
  });

  // Form states
  const [backupForm, setBackupForm] = useState({
    name: '',
    description: '',
    type: 'Database',
    frequency: 'Daily',
    schedule: '02:00',
    location: 'AWS S3 - us-west-2',
    retention: 30,
    encryption: true,
    compression: true,
    includes: [],
    excludes: [],
    alerts: {
      onFailure: true,
      onSizeIncrease: false,
      onDurationIncrease: false,
      recipients: []
    },
    verification: {
      enabled: true
    }
  });

  const [restoreForm, setRestoreForm] = useState({
    restorePointId: '',
    targetLocation: 'Original Location',
    restoreType: 'Full',
    confirmRestore: false
  });

  // CRUD Operations for Backups
  const handleCreateBackup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newBackup = {
        id: `BKP-${String(backups.length + 1).padStart(3, '0')}`,
        ...backupForm,
        status: 'Scheduled',
        lastRun: null,
        nextRun: calculateNextRun(backupForm.frequency, backupForm.schedule),
        duration: 0,
        size: 0,
        metrics: {
          successRate: 0,
          avgDuration: 0,
          avgSize: 0,
          totalRuns: 0,
          failedRuns: 0
        },
        verification: {
          ...backupForm.verification,
          lastVerified: null,
          status: 'Pending',
          checksumMatch: null
        },
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setBackups([...backups, newBackup]);
      setShowCreateModal(false);
      setBackupForm({
        name: '',
        description: '',
        type: 'Database',
        frequency: 'Daily',
        schedule: '02:00',
        location: 'AWS S3 - us-west-2',
        retention: 30,
        encryption: true,
        compression: true,
        includes: [],
        excludes: [],
        alerts: {
          onFailure: true,
          onSizeIncrease: false,
          onDurationIncrease: false,
          recipients: []
        },
        verification: {
          enabled: true
        }
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalBackups: prev.totalBackups + 1,
        activeBackups: prev.activeBackups + 1
      }));

    } catch (error) {
      console.error('Error creating backup:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBackup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedBackups = backups.map(backup => 
        backup.id === selectedBackup.id 
          ? { 
              ...backup, 
              ...backupForm, 
              nextRun: calculateNextRun(backupForm.frequency, backupForm.schedule),
              updatedAt: new Date().toISOString().split('T')[0] 
            }
          : backup
      );
      
      setBackups(updatedBackups);
      setShowEditModal(false);
      setSelectedBackup(null);
      
    } catch (error) {
      console.error('Error updating backup:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBackup = async () => {
    setLoading(true);
    
    try {
      const updatedBackups = backups.filter(backup => backup.id !== selectedBackup.id);
      setBackups(updatedBackups);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalBackups: prev.totalBackups - 1,
        activeBackups: selectedBackup.status === 'Completed' || selectedBackup.status === 'Running' || selectedBackup.status === 'Scheduled' 
          ? prev.activeBackups - 1 : prev.activeBackups,
        failedBackups: selectedBackup.status === 'Failed' ? prev.failedBackups - 1 : prev.failedBackups
      }));
      
      setShowDeleteModal(false);
      setSelectedBackup(null);
      
    } catch (error) {
      console.error('Error deleting backup:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunBackup = async (backupId) => {
    setLoading(true);
    
    try {
      const updatedBackups = backups.map(backup => 
        backup.id === backupId 
          ? { 
              ...backup, 
              status: 'Running',
              lastRun: new Date().toISOString(),
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : backup
      );
      
      setBackups(updatedBackups);
      
      // Simulate backup completion after 3 seconds
      setTimeout(() => {
        const completedBackups = backups.map(backup => 
          backup.id === backupId 
            ? { 
                ...backup, 
                status: 'Completed',
                duration: Math.floor(Math.random() * 3000) + 500,
                size: Math.random() * 5 + 1,
                metrics: {
                  ...backup.metrics,
                  totalRuns: backup.metrics.totalRuns + 1,
                  successRate: ((backup.metrics.totalRuns * backup.metrics.successRate / 100) + 1) / (backup.metrics.totalRuns + 1) * 100
                },
                verification: {
                  ...backup.verification,
                  lastVerified: new Date().toISOString(),
                  status: 'Verified',
                  checksumMatch: true
                }
              }
            : backup
        );
        setBackups(completedBackups);
      }, 3000);
      
    } catch (error) {
      console.error('Error running backup:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreBackup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate restore process
      console.log('Restoring backup:', restoreForm);
      
      setShowRestoreModal(false);
      setRestoreForm({
        restorePointId: '',
        targetLocation: 'Original Location',
        restoreType: 'Full',
        confirmRestore: false
      });
      
    } catch (error) {
      console.error('Error restoring backup:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const calculateNextRun = (frequency, schedule) => {
    const now = new Date();
    const [hours, minutes] = schedule.split(':').map(Number);
    
    switch (frequency) {
      case 'Daily':
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(hours, minutes, 0, 0);
        return tomorrow.toISOString();
      case 'Weekly':
        const nextWeek = new Date(now);
        nextWeek.setDate(nextWeek.getDate() + 7);
        nextWeek.setHours(hours, minutes, 0, 0);
        return nextWeek.toISOString();
      case 'Monthly':
        const nextMonth = new Date(now);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setHours(hours, minutes, 0, 0);
        return nextMonth.toISOString();
      case 'Quarterly':
        const nextQuarter = new Date(now);
        nextQuarter.setMonth(nextQuarter.getMonth() + 3);
        nextQuarter.setHours(hours, minutes, 0, 0);
        return nextQuarter.toISOString();
      default:
        return now.toISOString();
    }
  };

  // Filter functions
  const filteredBackups = backups.filter(backup => {
    const matchesSearch = backup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         backup.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         backup.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || backup.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesType = selectedType === 'all' || backup.type.toLowerCase() === selectedType.toLowerCase();
    const matchesFrequency = selectedFrequency === 'all' || backup.frequency.toLowerCase() === selectedFrequency.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType && matchesFrequency;
  });

  const openEditModal = (backup) => {
    setSelectedBackup(backup);
    setBackupForm({
      name: backup.name,
      description: backup.description,
      type: backup.type,
      frequency: backup.frequency,
      schedule: backup.schedule.split(' ')[0],
      location: backup.location,
      retention: backup.retention,
      encryption: backup.encryption,
      compression: backup.compression,
      includes: backup.includes,
      excludes: backup.excludes,
      alerts: backup.alerts,
      verification: backup.verification
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (backup) => {
    setSelectedBackup(backup);
    setShowDeleteModal(true);
  };

  const openRestoreModal = (backup) => {
    setSelectedBackup(backup);
    setShowRestoreModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'running': return 'text-blue-600 bg-blue-100';
      case 'scheduled': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'paused': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'database': return 'text-blue-600 bg-blue-100';
      case 'file system': return 'text-green-600 bg-green-100';
      case 'configuration': return 'text-purple-600 bg-purple-100';
      case 'archive': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatFileSize = (sizeInGB) => {
    if (sizeInGB < 1) {
      return `${(sizeInGB * 1024).toFixed(0)} MB`;
    }
    return `${sizeInGB.toFixed(1)} GB`;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Backups</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalBackups}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.activeBackups} Active</span>
            <span className="text-gray-500 ml-2">• {analytics.failedBackups} Failed</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Storage</p>
              <p className="text-2xl font-bold text-gray-900">{formatFileSize(analytics.totalStorage)}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">+{formatFileSize(analytics.monthlyGrowth)}</span>
            <span className="text-gray-500 ml-2">this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.successRate.toFixed(1)}%</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-yellow-600 font-medium">Avg: {formatDuration(analytics.avgDuration)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Encryption Coverage</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.encryptionCoverage.toFixed(0)}%</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">{analytics.retentionCompliance.toFixed(1)}%</span>
            <span className="text-gray-500 ml-2">retention compliance</span>
          </div>
        </div>
      </div>

      {/* Backup Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Backup Status Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Completed', 'Running', 'Scheduled', 'Failed'].map((status) => {
              const statusBackups = backups.filter(backup => backup.status === status);
              const percentage = backups.length > 0 ? ((statusBackups.length / backups.length) * 100).toFixed(1) : 0;
              
              return (
                <div key={status} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(status)}`}>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{status}</h4>
                      <p className="text-sm text-gray-500">{statusBackups.length} backups</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Percentage</span>
                      <span className="font-medium text-gray-900">{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Backup Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Backup Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {backups
              .sort((a, b) => new Date(b.lastRun || b.updatedAt) - new Date(a.lastRun || a.updatedAt))
              .slice(0, 5)
              .map((backup) => (
                <div key={backup.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{backup.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backup.status)}`}>
                        {backup.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{backup.type} • {backup.location}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      {backup.lastRun && (
                        <>
                          <span>Last run: {new Date(backup.lastRun).toLocaleDateString()}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>Size: {formatFileSize(backup.size)}</span>
                      {backup.duration > 0 && (
                        <>
                          <span>•</span>
                          <span>Duration: {formatDuration(backup.duration)}</span>
                        </>
                      )}
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
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search backups..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="running">Running</option>
            <option value="scheduled">Scheduled</option>
            <option value="failed">Failed</option>
            <option value="paused">Paused</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="database">Database</option>
            <option value="file system">File System</option>
            <option value="configuration">Configuration</option>
            <option value="archive">Archive</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedFrequency}
            onChange={(e) => setSelectedFrequency(e.target.value)}
          >
            <option value="all">All Frequencies</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Backup</span>
          </button>
        </div>
      </div>

      {/* Backups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBackups.map((backup) => (
          <div key={backup.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{backup.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{backup.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(backup.status)}`}>
                      {backup.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(backup.type)}`}>
                      {backup.type}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full text-gray-600 bg-gray-100">
                      {backup.frequency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Schedule: {backup.schedule}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{backup.location}</span>
                </div>
                {backup.lastRun && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Last run: {new Date(backup.lastRun).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                  <span>Size: {formatFileSize(backup.size)} • Success: {backup.metrics.successRate.toFixed(1)}%</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  {backup.encryption && (
                    <span className="flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Encrypted
                    </span>
                  )}
                  {backup.compression && (
                    <span className="flex items-center">
                      <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Compressed
                    </span>
                  )}
                  <span>Retention: {backup.retention} days</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {backup.status !== 'Running' && (
                      <button
                        onClick={() => handleRunBackup(backup.id)}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        title="Run Backup"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                    {backup.status === 'Completed' && (
                      <button
                        onClick={() => openRestoreModal(backup)}
                        className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                        title="Restore"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => console.log('Download backup:', backup.id)}
                      className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
                      title="Download"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(backup)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(backup)}
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
          </div>
        ))}
      </div>

      {filteredBackups.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No backups found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first backup.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Backup
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderRestorePoints = () => (
    <div className="space-y-6">
      {/* Restore Points Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available Restore Points</p>
              <p className="text-2xl font-bold text-gray-900">{restorePoints.length}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Size</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatFileSize(restorePoints.reduce((sum, rp) => sum + rp.size, 0))}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">
                {restorePoints.filter(rp => rp.verified).length}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Restore Points Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Restore Points</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restore Point</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Backup Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {restorePoints.map((restorePoint) => {
                const backup = backups.find(b => b.id === restorePoint.backupId);
                return (
                  <tr key={restorePoint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{restorePoint.name}</div>
                        <div className="text-sm text-gray-500">{restorePoint.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{backup?.name}</div>
                      <div className="text-sm text-gray-500">{backup?.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(restorePoint.timestamp).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(restorePoint.timestamp).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatFileSize(restorePoint.size)}</div>
                      <div className="text-sm text-gray-500">{restorePoint.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          restorePoint.status === 'Available' ? 'text-green-600 bg-green-100' :
                          'text-gray-600 bg-gray-100'
                        }`}>
                          {restorePoint.status}
                        </span>
                        {restorePoint.verified && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full text-blue-600 bg-blue-100">
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedBackup(backup);
                            setRestoreForm({ ...restoreForm, restorePointId: restorePoint.id });
                            setShowRestoreModal(true);
                          }}
                          className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                          title="Restore"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                        <button
                          onClick={() => console.log('Download restore point:', restorePoint.id)}
                          className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
                          title="Download"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
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
        <h1 className="text-2xl font-bold text-gray-900">Backup Management</h1>
        <p className="text-gray-600 mt-1">Manage data backups, restore points, and recovery operations</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'backups', name: 'Backups', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10' },
            { id: 'restore', name: 'Restore Points', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' }
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
      {activeTab === 'backups' && renderBackups()}
      {activeTab === 'restore' && renderRestorePoints()}

      {/* Create Backup Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Backup</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateBackup} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Backup Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={backupForm.name}
                      onChange={(e) => setBackupForm({ ...backupForm, name: e.target.value })}
                      placeholder="Daily Database Backup"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Backup Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={backupForm.type}
                      onChange={(e) => setBackupForm({ ...backupForm, type: e.target.value })}
                    >
                      <option value="Database">Database</option>
                      <option value="File System">File System</option>
                      <option value="Configuration">Configuration</option>
                      <option value="Archive">Archive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={backupForm.description}
                    onChange={(e) => setBackupForm({ ...backupForm, description: e.target.value })}
                    placeholder="Describe the backup..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={backupForm.frequency}
                      onChange={(e) => setBackupForm({ ...backupForm, frequency: e.target.value })}
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Time</label>
                    <input
                      type="time"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={backupForm.schedule}
                      onChange={(e) => setBackupForm({ ...backupForm, schedule: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Retention (days)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={backupForm.retention}
                      onChange={(e) => setBackupForm({ ...backupForm, retention: parseInt(e.target.value) || 30 })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={backupForm.location}
                    onChange={(e) => setBackupForm({ ...backupForm, location: e.target.value })}
                  >
                    <option value="AWS S3 - us-west-2">AWS S3 - us-west-2</option>
                    <option value="AWS S3 - us-east-1">AWS S3 - us-east-1</option>
                    <option value="AWS Glacier">AWS Glacier</option>
                    <option value="Local Storage">Local Storage</option>
                    <option value="Google Cloud Storage">Google Cloud Storage</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="encryption"
                      checked={backupForm.encryption}
                      onChange={(e) => setBackupForm({ ...backupForm, encryption: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="encryption" className="text-sm font-medium text-gray-700">
                      Enable Encryption
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="compression"
                      checked={backupForm.compression}
                      onChange={(e) => setBackupForm({ ...backupForm, compression: e.target.checked })}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="compression" className="text-sm font-medium text-gray-700">
                      Enable Compression
                    </label>
                  </div>
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
                    {loading ? 'Creating...' : 'Create Backup'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Backup Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Backup</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditBackup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Backup Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={backupForm.name}
                    onChange={(e) => setBackupForm({ ...backupForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={backupForm.description}
                    onChange={(e) => setBackupForm({ ...backupForm, description: e.target.value })}
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
                    {loading ? 'Updating...' : 'Update Backup'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Backup Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Backup</h2>
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
                  Are you sure you want to delete <strong>{selectedBackup?.name}</strong>? This action cannot be undone and will remove all backup data and restore points.
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
                  onClick={handleDeleteBackup}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Backup'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Restore Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Restore Backup</h2>
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleRestoreBackup} className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex">
                    <svg className="h-5 w-5 text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        This operation will restore data from the selected backup. Current data may be overwritten. Please ensure you have a recent backup before proceeding.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Backup to Restore</label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">{selectedBackup?.name}</div>
                    <div className="text-sm text-gray-500">{selectedBackup?.description}</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Location</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={restoreForm.targetLocation}
                    onChange={(e) => setRestoreForm({ ...restoreForm, targetLocation: e.target.value })}
                  >
                    <option value="Original Location">Original Location</option>
                    <option value="Custom Location">Custom Location</option>
                    <option value="Test Environment">Test Environment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Restore Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={restoreForm.restoreType}
                    onChange={(e) => setRestoreForm({ ...restoreForm, restoreType: e.target.value })}
                  >
                    <option value="Full">Full Restore</option>
                    <option value="Partial">Partial Restore</option>
                    <option value="Point-in-Time">Point-in-Time Restore</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="confirmRestore"
                    required
                    checked={restoreForm.confirmRestore}
                    onChange={(e) => setRestoreForm({ ...restoreForm, confirmRestore: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="confirmRestore" className="text-sm font-medium text-gray-700">
                    I understand that this operation may overwrite existing data
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowRestoreModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !restoreForm.confirmRestore}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Restoring...' : 'Restore Backup'}
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

export default EnhancedBackupModule;

