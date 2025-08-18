import React, { useState, useEffect, useMemo } from 'react';

const EnhancedReportingModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  // Form states
  const [reportForm, setReportForm] = useState({
    name: '',
    type: 'Sales',
    category: 'Financial',
    description: '',
    frequency: 'Monthly',
    format: 'PDF',
    recipients: '',
    dataSource: 'Sales Database',
    includeCharts: true,
    includeDetails: true,
    automatedDelivery: true,
    parameters: ''
  });

  const [scheduleForm, setScheduleForm] = useState({
    reportId: '',
    frequency: 'Monthly',
    dayOfWeek: 'Monday',
    dayOfMonth: '1',
    time: '09:00',
    timezone: 'PST',
    startDate: '',
    endDate: '',
    active: true
  });

  // Mock data with mobile-responsive considerations
  const [reports, setReports] = useState([
    {
      id: 'RPT-001',
      name: 'Monthly Sales Report',
      type: 'Sales',
      category: 'Financial',
      description: 'Comprehensive monthly sales performance analysis with trends and forecasts',
      frequency: 'Monthly',
      lastGenerated: '2024-08-01',
      nextScheduled: '2024-09-01',
      status: 'Active',
      format: 'PDF',
      recipients: ['sales@dankdash.com', 'management@dankdash.com'],
      dataSource: 'Sales Database',
      parameters: {
        dateRange: 'Last 30 days',
        includeProducts: true,
        includeCustomers: true,
        includeRegions: true,
        includeCharts: true,
        includeForecasts: true
      },
      fileSize: '2.4 MB',
      downloadCount: 156,
      automatedDelivery: true,
      generationTime: '3.2 minutes',
      createdBy: 'System Admin',
      lastUpdated: '2024-08-15'
    },
    {
      id: 'RPT-002',
      name: 'Inventory Status Report',
      type: 'Inventory',
      category: 'Operations',
      description: 'Current inventory levels, stock alerts, and reorder recommendations',
      frequency: 'Weekly',
      lastGenerated: '2024-08-12',
      nextScheduled: '2024-08-19',
      status: 'Active',
      format: 'Excel',
      recipients: ['inventory@dankdash.com', 'operations@dankdash.com'],
      dataSource: 'Inventory Management System',
      parameters: {
        includeStockLevels: true,
        includeLowStockAlerts: true,
        includeExpiryDates: true,
        warehouseFilter: 'All',
        includeReorderPoints: true,
        includeValuation: true
      },
      fileSize: '1.8 MB',
      downloadCount: 89,
      automatedDelivery: true,
      generationTime: '2.1 minutes',
      createdBy: 'Inventory Manager',
      lastUpdated: '2024-08-12'
    },
    {
      id: 'RPT-003',
      name: 'Compliance Audit Report',
      type: 'Compliance',
      category: 'Regulatory',
      description: 'Monthly compliance status, regulatory adherence, and audit findings',
      frequency: 'Monthly',
      lastGenerated: '2024-08-01',
      nextScheduled: '2024-09-01',
      status: 'Active',
      format: 'PDF',
      recipients: ['compliance@dankdash.com', 'legal@dankdash.com'],
      dataSource: 'Compliance Management System',
      parameters: {
        includeLicenseStatus: true,
        includeViolations: true,
        includeAuditTrail: true,
        regulatoryBody: 'California DCC',
        includeRecommendations: true,
        includeRiskAssessment: true
      },
      fileSize: '3.2 MB',
      downloadCount: 45,
      automatedDelivery: true,
      generationTime: '4.5 minutes',
      createdBy: 'Compliance Officer',
      lastUpdated: '2024-08-01'
    },
    {
      id: 'RPT-004',
      name: 'Customer Analytics Report',
      type: 'Customer',
      category: 'Marketing',
      description: 'Customer behavior, engagement analysis, and segmentation insights',
      frequency: 'Bi-weekly',
      lastGenerated: '2024-08-07',
      nextScheduled: '2024-08-21',
      status: 'Active',
      format: 'PDF',
      recipients: ['marketing@dankdash.com', 'crm@dankdash.com'],
      dataSource: 'CRM System',
      parameters: {
        includeSegmentation: true,
        includePurchaseHistory: true,
        includeLoyaltyMetrics: true,
        timeframe: 'Last 14 days',
        includeChurnAnalysis: true,
        includeLTVCalculations: true
      },
      fileSize: '1.9 MB',
      downloadCount: 78,
      automatedDelivery: true,
      generationTime: '2.8 minutes',
      createdBy: 'Marketing Manager',
      lastUpdated: '2024-08-07'
    },
    {
      id: 'RPT-005',
      name: 'Financial Performance Report',
      type: 'Financial',
      category: 'Financial',
      description: 'Comprehensive financial performance with P&L, cash flow, and KPIs',
      frequency: 'Monthly',
      lastGenerated: '2024-08-01',
      nextScheduled: '2024-09-01',
      status: 'Active',
      format: 'Excel',
      recipients: ['finance@dankdash.com', 'cfo@dankdash.com'],
      dataSource: 'Accounting System',
      parameters: {
        includeProfitLoss: true,
        includeCashFlow: true,
        includeBalanceSheet: true,
        includeKPIs: true,
        includeBudgetVariance: true,
        includeForecasts: true
      },
      fileSize: '2.7 MB',
      downloadCount: 92,
      automatedDelivery: true,
      generationTime: '3.8 minutes',
      createdBy: 'Finance Director',
      lastUpdated: '2024-08-01'
    },
    {
      id: 'RPT-006',
      name: 'Quality Control Report',
      type: 'Quality',
      category: 'Operations',
      description: 'Quality metrics, test results, batch compliance, and COA summaries',
      frequency: 'Weekly',
      lastGenerated: '2024-08-14',
      nextScheduled: '2024-08-21',
      status: 'Active',
      format: 'PDF',
      recipients: ['quality@dankdash.com', 'production@dankdash.com'],
      dataSource: 'Quality Management System',
      parameters: {
        includeTestResults: true,
        includeBatchTracking: true,
        includeCOASummary: true,
        includeDefectAnalysis: true,
        includeComplianceMetrics: true,
        includeLabResults: true
      },
      fileSize: '2.1 MB',
      downloadCount: 67,
      automatedDelivery: true,
      generationTime: '2.9 minutes',
      createdBy: 'QC Manager',
      lastUpdated: '2024-08-14'
    },
    {
      id: 'RPT-007',
      name: 'Employee Performance Report',
      type: 'HR',
      category: 'Human Resources',
      description: 'Employee metrics, performance reviews, training status, and payroll summary',
      frequency: 'Monthly',
      lastGenerated: '2024-08-01',
      nextScheduled: '2024-09-01',
      status: 'Draft',
      format: 'PDF',
      recipients: ['hr@dankdash.com', 'management@dankdash.com'],
      dataSource: 'HR Management System',
      parameters: {
        includePerformanceMetrics: true,
        includeTrainingStatus: true,
        includeAttendance: true,
        includePayrollSummary: true,
        includeComplianceTraining: true,
        includeTurnoverAnalysis: true
      },
      fileSize: '1.6 MB',
      downloadCount: 34,
      automatedDelivery: false,
      generationTime: '2.3 minutes',
      createdBy: 'HR Director',
      lastUpdated: '2024-07-28'
    },
    {
      id: 'RPT-008',
      name: 'Marketing Campaign Report',
      type: 'Marketing',
      category: 'Marketing',
      description: 'Campaign performance, ROI analysis, customer acquisition, and engagement metrics',
      frequency: 'Weekly',
      lastGenerated: '2024-08-13',
      nextScheduled: '2024-08-20',
      status: 'Active',
      format: 'PDF',
      recipients: ['marketing@dankdash.com', 'digital@dankdash.com'],
      dataSource: 'Marketing Automation System',
      parameters: {
        includeCampaignMetrics: true,
        includeROIAnalysis: true,
        includeCustomerAcquisition: true,
        includeEngagementMetrics: true,
        includeConversionFunnels: true,
        includeAttributionAnalysis: true
      },
      fileSize: '2.3 MB',
      downloadCount: 103,
      automatedDelivery: true,
      generationTime: '3.1 minutes',
      createdBy: 'Marketing Director',
      lastUpdated: '2024-08-13'
    }
  ]);

  const [reportTypes] = useState([
    'Sales',
    'Inventory',
    'Compliance',
    'Customer',
    'Financial',
    'Quality',
    'HR',
    'Marketing',
    'Operations',
    'Analytics'
  ]);

  const [reportCategories] = useState([
    'Financial',
    'Operations',
    'Regulatory',
    'Marketing',
    'Human Resources',
    'Quality Control',
    'Analytics',
    'Management'
  ]);

  const [frequencies] = useState([
    'Daily',
    'Weekly',
    'Bi-weekly',
    'Monthly',
    'Quarterly',
    'Annually',
    'On-demand'
  ]);

  const [formats] = useState(['PDF', 'Excel', 'CSV', 'Word', 'PowerPoint']);
  const [statuses] = useState(['Active', 'Draft', 'Paused', 'Archived']);
  const [dataSources] = useState([
    'Sales Database',
    'Inventory Management System',
    'CRM System',
    'Accounting System',
    'Compliance Management System',
    'Quality Management System',
    'HR Management System',
    'Marketing Automation System'
  ]);

  // Filter functions
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedReportType === 'all' || report.type === selectedReportType;
      const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reports, searchTerm, selectedReportType, selectedStatus]);

  // Report CRUD Operations
  const handleCreateReport = () => {
    if (!reportForm.name || !reportForm.type || !reportForm.description) {
      alert('Please fill in required fields (Name, Type, Description)');
      return;
    }

    const newReport = {
      id: `RPT-${String(reports.length + 1).padStart(3, '0')}`,
      name: reportForm.name,
      type: reportForm.type,
      category: reportForm.category,
      description: reportForm.description,
      frequency: reportForm.frequency,
      lastGenerated: null,
      nextScheduled: null,
      status: 'Draft',
      format: reportForm.format,
      recipients: reportForm.recipients ? reportForm.recipients.split(',').map(r => r.trim()) : [],
      dataSource: reportForm.dataSource,
      parameters: reportForm.parameters ? JSON.parse(reportForm.parameters || '{}') : {},
      fileSize: null,
      downloadCount: 0,
      automatedDelivery: reportForm.automatedDelivery,
      generationTime: null,
      createdBy: 'Current User',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setReports([...reports, newReport]);
    setReportForm({
      name: '',
      type: 'Sales',
      category: 'Financial',
      description: '',
      frequency: 'Monthly',
      format: 'PDF',
      recipients: '',
      dataSource: 'Sales Database',
      includeCharts: true,
      includeDetails: true,
      automatedDelivery: true,
      parameters: ''
    });
    setShowReportModal(false);
    alert('Report created successfully!');
  };

  const handleEditReport = (report) => {
    setEditingReport(report);
    setReportForm({
      name: report.name,
      type: report.type,
      category: report.category,
      description: report.description,
      frequency: report.frequency,
      format: report.format,
      recipients: report.recipients.join(', '),
      dataSource: report.dataSource,
      includeCharts: report.parameters.includeCharts || false,
      includeDetails: report.parameters.includeDetails || false,
      automatedDelivery: report.automatedDelivery,
      parameters: JSON.stringify(report.parameters, null, 2)
    });
    setShowReportModal(true);
  };

  const handleUpdateReport = () => {
    if (!reportForm.name || !reportForm.type || !reportForm.description) {
      alert('Please fill in required fields (Name, Type, Description)');
      return;
    }

    const updatedReports = reports.map(report =>
      report.id === editingReport.id
        ? { 
            ...report, 
            name: reportForm.name,
            type: reportForm.type,
            category: reportForm.category,
            description: reportForm.description,
            frequency: reportForm.frequency,
            format: reportForm.format,
            recipients: reportForm.recipients ? reportForm.recipients.split(',').map(r => r.trim()) : report.recipients,
            dataSource: reportForm.dataSource,
            parameters: reportForm.parameters ? JSON.parse(reportForm.parameters || '{}') : report.parameters,
            automatedDelivery: reportForm.automatedDelivery,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : report
    );

    setReports(updatedReports);
    setEditingReport(null);
    setReportForm({
      name: '',
      type: 'Sales',
      category: 'Financial',
      description: '',
      frequency: 'Monthly',
      format: 'PDF',
      recipients: '',
      dataSource: 'Sales Database',
      includeCharts: true,
      includeDetails: true,
      automatedDelivery: true,
      parameters: ''
    });
    setShowReportModal(false);
    alert('Report updated successfully!');
  };

  const handleDeleteReport = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      setReports(reports.filter(report => report.id !== reportId));
      alert('Report deleted successfully!');
    }
  };

  const handleGenerateReport = (reportId) => {
    const updatedReports = reports.map(report =>
      report.id === reportId
        ? { 
            ...report, 
            lastGenerated: new Date().toISOString().split('T')[0],
            status: 'Active',
            downloadCount: report.downloadCount + 1,
            fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
            generationTime: `${(Math.random() * 3 + 1).toFixed(1)} minutes`
          }
        : report
    );
    setReports(updatedReports);
    alert('Report generated successfully!');
  };

  const handleScheduleReport = (reportId) => {
    setScheduleForm({...scheduleForm, reportId});
    setShowScheduleModal(true);
  };

  const handleDownloadReport = (reportId) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      const updatedReports = reports.map(r =>
        r.id === reportId
          ? { ...r, downloadCount: r.downloadCount + 1 }
          : r
      );
      setReports(updatedReports);
      alert(`Downloading ${report.name} (${report.format})`);
    }
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatColor = (format) => {
    switch (format) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'Excel': return 'bg-green-100 text-green-800';
      case 'CSV': return 'bg-blue-100 text-blue-800';
      case 'Word': return 'bg-blue-100 text-blue-800';
      case 'PowerPoint': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  // Dashboard calculations
  const totalReports = reports.length;
  const activeReports = reports.filter(report => report.status === 'Active').length;
  const scheduledReports = reports.filter(report => report.automatedDelivery).length;
  const totalDownloads = reports.reduce((sum, report) => sum + report.downloadCount, 0);
  const draftReports = reports.filter(report => report.status === 'Draft').length;
  const averageFileSize = reports.filter(r => r.fileSize).length > 0 
    ? (reports.filter(r => r.fileSize).reduce((sum, r) => sum + parseFloat(r.fileSize), 0) / reports.filter(r => r.fileSize).length).toFixed(1)
    : 0;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Reports</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalReports}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{activeReports} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Scheduled Reports</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{scheduledReports}</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">automated delivery</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Downloads</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalDownloads}</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Avg File Size</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{averageFileSize} MB</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">{draftReports} drafts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports and Popular Reports - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Recent Reports</h3>
          <div className="space-y-3">
            {reports
              .sort((a, b) => new Date(b.lastGenerated || '1970-01-01') - new Date(a.lastGenerated || '1970-01-01'))
              .slice(0, 5)
              .map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${getFormatColor(report.format).replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 bg-')}`}>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{report.name}</h4>
                      <p className="text-xs text-gray-600 truncate">{report.type} • {report.category}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFormatColor(report.format)}`}>
                          {report.format}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-sm font-medium text-gray-900">{report.downloadCount}</p>
                    <p className="text-xs text-gray-500">{formatDate(report.lastGenerated)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Popular Reports</h3>
          <div className="space-y-4">
            {reports
              .sort((a, b) => b.downloadCount - a.downloadCount)
              .slice(0, 5)
              .map((report) => (
                <div key={report.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate">{report.name}</span>
                    <span className="text-gray-900 font-medium">{report.downloadCount} downloads</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((report.downloadCount / Math.max(...reports.map(r => r.downloadCount))) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{report.type}</span>
                    <span>{report.frequency}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions and Report Tips - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowReportModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Create Report
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Schedule Report
            </button>
            <button
              onClick={() => alert('Opening report analytics dashboard')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              View Analytics
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Report Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Schedule reports for automatic delivery</p>
            <p>• Use filters to focus on key metrics</p>
            <p>• Export in multiple formats</p>
            <p>• Set up email notifications</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Upcoming Reports</h3>
          <div className="space-y-3 text-sm">
            {reports
              .filter(report => report.nextScheduled && new Date(report.nextScheduled) > new Date())
              .sort((a, b) => new Date(a.nextScheduled) - new Date(b.nextScheduled))
              .slice(0, 3)
              .map((report) => (
                <div key={report.id} className="flex items-center justify-between">
                  <span className="text-gray-600 truncate">{report.name}</span>
                  <span className="text-gray-900 font-medium">{formatDate(report.nextScheduled)}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-3xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search reports..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {reportTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowReportModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Create Report
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{report.name}</h3>
                <p className="text-xs text-gray-500">{report.type} • {report.category}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getFormatColor(report.format)}`}>
                  {report.format}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Frequency:</span>
                <span className="text-gray-900 font-medium">{report.frequency}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Generated:</span>
                <span className="text-gray-900 font-medium">{formatDate(report.lastGenerated)}</span>
              </div>
              <div className="flex justify-between">
                <span>Next Scheduled:</span>
                <span className="text-gray-900 font-medium">{formatDate(report.nextScheduled)}</span>
              </div>
              <div className="flex justify-between">
                <span>Downloads:</span>
                <span className="text-gray-900 font-medium">{report.downloadCount}</span>
              </div>
              {report.fileSize && (
                <div className="flex justify-between">
                  <span>File Size:</span>
                  <span className="text-gray-900 font-medium">{report.fileSize}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Auto Delivery:</span>
                <span className={`font-medium ${report.automatedDelivery ? 'text-green-600' : 'text-red-600'}`}>
                  {report.automatedDelivery ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            {report.description && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 line-clamp-2">{report.description}</p>
              </div>
            )}

            {report.recipients && report.recipients.length > 0 && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 font-medium mb-1">Recipients:</p>
                <div className="flex flex-wrap gap-1">
                  {report.recipients.slice(0, 2).map((recipient, index) => (
                    <span key={index} className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {recipient.split('@')[0]}
                    </span>
                  ))}
                  {report.recipients.length > 2 && (
                    <span className="text-blue-600">+{report.recipients.length - 2} more</span>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditReport(report)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => handleGenerateReport(report.id)}
                className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
              >
                Generate
              </button>
              <button 
                onClick={() => handleDownloadReport(report.id)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Download
              </button>
              <button 
                onClick={() => handleScheduleReport(report.id)}
                className="text-xs px-2 py-1 text-orange-600 hover:text-orange-900 bg-orange-50 rounded"
              >
                Schedule
              </button>
              <button 
                onClick={() => alert(`Viewing report analytics for ${report.id}`)}
                className="text-xs px-2 py-1 text-gray-600 hover:text-gray-900 bg-gray-50 rounded"
              >
                Analytics
              </button>
              <button 
                onClick={() => handleDeleteReport(report.id)}
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

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Report Analytics</h2>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="weekly">Last 7 days</option>
            <option value="monthly">Last 30 days</option>
            <option value="quarterly">Last 90 days</option>
            <option value="yearly">Last 365 days</option>
          </select>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Report Generation Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Daily Average</span>
              <span className="text-sm font-medium text-gray-900">12.3 reports</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Peak Generation Time</span>
              <span className="text-sm font-medium text-gray-900">9:00 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Most Popular Format</span>
              <span className="text-sm font-medium text-gray-900">PDF (45%)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average Generation Time</span>
              <span className="text-sm font-medium text-gray-900">2.8 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Download Statistics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Downloads</span>
              <span className="text-sm font-medium text-gray-900">{totalDownloads}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Average per Report</span>
              <span className="text-sm font-medium text-gray-900">{(totalDownloads / totalReports).toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Most Downloaded</span>
              <span className="text-sm font-medium text-gray-900">Monthly Sales Report</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Download Growth</span>
              <span className="text-sm font-medium text-green-600">+23% this month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Report Modal - Mobile Responsive
  const ReportModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingReport ? 'Edit Report' : 'Create New Report'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Report Name *</label>
              <input
                type="text"
                value={reportForm.name}
                onChange={(e) => setReportForm({...reportForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type *</label>
                <select
                  value={reportForm.type}
                  onChange={(e) => setReportForm({...reportForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={reportForm.category}
                  onChange={(e) => setReportForm({...reportForm, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {reportCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Format</label>
                <select
                  value={reportForm.format}
                  onChange={(e) => setReportForm({...reportForm, format: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {formats.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                value={reportForm.description}
                onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <select
                  value={reportForm.frequency}
                  onChange={(e) => setReportForm({...reportForm, frequency: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {frequencies.map(frequency => (
                    <option key={frequency} value={frequency}>{frequency}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data Source</label>
                <select
                  value={reportForm.dataSource}
                  onChange={(e) => setReportForm({...reportForm, dataSource: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {dataSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Recipients (comma-separated emails)</label>
              <input
                type="text"
                value={reportForm.recipients}
                onChange={(e) => setReportForm({...reportForm, recipients: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="email1@example.com, email2@example.com"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportForm.includeCharts}
                  onChange={(e) => setReportForm({...reportForm, includeCharts: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Include Charts</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportForm.includeDetails}
                  onChange={(e) => setReportForm({...reportForm, includeDetails: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Include Details</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={reportForm.automatedDelivery}
                  onChange={(e) => setReportForm({...reportForm, automatedDelivery: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Auto Delivery</label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Parameters (JSON format)</label>
              <textarea
                value={reportForm.parameters}
                onChange={(e) => setReportForm({...reportForm, parameters: e.target.value})}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                placeholder='{"dateRange": "Last 30 days", "includeCharts": true}'
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowReportModal(false);
                setEditingReport(null);
                setReportForm({
                  name: '',
                  type: 'Sales',
                  category: 'Financial',
                  description: '',
                  frequency: 'Monthly',
                  format: 'PDF',
                  recipients: '',
                  dataSource: 'Sales Database',
                  includeCharts: true,
                  includeDetails: true,
                  automatedDelivery: true,
                  parameters: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingReport ? handleUpdateReport : handleCreateReport}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingReport ? 'Update' : 'Create'} Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Reporting & Analytics</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Generate, schedule, and manage business reports</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'reports', name: 'Reports', icon: '📄' },
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
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>

      {/* Modals */}
      {showReportModal && <ReportModal />}
    </div>
  );
};

export default EnhancedReportingModule;

