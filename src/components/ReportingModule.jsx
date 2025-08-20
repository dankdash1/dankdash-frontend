import React, { useState, useEffect } from 'react';

const ReportingModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReportType, setSelectedReportType] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock reporting data
  const [reports, setReports] = useState([
    {
      id: 'RPT-001',
      name: 'Monthly Sales Report',
      type: 'Sales',
      category: 'Financial',
      description: 'Comprehensive monthly sales performance analysis',
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
        includeRegions: true
      },
      fileSize: '2.4 MB',
      downloadCount: 156,
      automatedDelivery: true
    },
    {
      id: 'RPT-002',
      name: 'Inventory Status Report',
      type: 'Inventory',
      category: 'Operations',
      description: 'Current inventory levels and stock alerts',
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
        warehouseFilter: 'All'
      },
      fileSize: '1.8 MB',
      downloadCount: 89,
      automatedDelivery: true
    },
    {
      id: 'RPT-003',
      name: 'Compliance Audit Report',
      type: 'Compliance',
      category: 'Regulatory',
      description: 'Monthly compliance status and regulatory adherence',
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
        regulatoryBody: 'California DCC'
      },
      fileSize: '3.2 MB',
      downloadCount: 45,
      automatedDelivery: true
    },
    {
      id: 'RPT-004',
      name: 'Customer Analytics Report',
      type: 'Customer',
      category: 'Marketing',
      description: 'Customer behavior and engagement analysis',
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
        timeframe: 'Last 14 days'
      },
      fileSize: '1.9 MB',
      downloadCount: 67,
      automatedDelivery: true
    },
    {
      id: 'RPT-005',
      name: 'Financial Performance Report',
      type: 'Financial',
      category: 'Financial',
      description: 'Comprehensive financial performance and P&L analysis',
      frequency: 'Monthly',
      lastGenerated: '2024-08-01',
      nextScheduled: '2024-09-01',
      status: 'Draft',
      format: 'Excel',
      recipients: ['finance@dankdash.com', 'cfo@dankdash.com'],
      dataSource: 'Accounting System',
      parameters: {
        includeRevenue: true,
        includeExpenses: true,
        includeProfitability: true,
        includeCashFlow: true
      },
      fileSize: '4.1 MB',
      downloadCount: 23,
      automatedDelivery: false
    }
  ]);

  const [dashboards, setDashboards] = useState([
    {
      id: 'DASH-001',
      name: 'Executive Dashboard',
      description: 'High-level KPIs and business metrics for executives',
      category: 'Executive',
      widgets: [
        { id: 1, name: 'Total Revenue', type: 'metric', value: '$245,680', change: '+12.5%' },
        { id: 2, name: 'Active Customers', type: 'metric', value: '1,247', change: '+8.3%' },
        { id: 3, name: 'Order Volume', type: 'metric', value: '3,456', change: '+15.2%' },
        { id: 4, name: 'Profit Margin', type: 'metric', value: '23.4%', change: '+2.1%' },
        { id: 5, name: 'Sales Trend', type: 'chart', chartType: 'line' },
        { id: 6, name: 'Top Products', type: 'chart', chartType: 'bar' }
      ],
      lastUpdated: '2024-08-14 15:30:00',
      refreshRate: '15 minutes',
      accessLevel: 'Executive',
      isPublic: false,
      viewCount: 234
    },
    {
      id: 'DASH-002',
      name: 'Operations Dashboard',
      description: 'Operational metrics and performance indicators',
      category: 'Operations',
      widgets: [
        { id: 1, name: 'Inventory Turnover', type: 'metric', value: '4.2x', change: '+0.3x' },
        { id: 2, name: 'Order Fulfillment', type: 'metric', value: '98.5%', change: '+1.2%' },
        { id: 3, name: 'Delivery Time', type: 'metric', value: '24 min', change: '-3 min' },
        { id: 4, name: 'Quality Score', type: 'metric', value: '96.8%', change: '+0.5%' },
        { id: 5, name: 'Warehouse Efficiency', type: 'chart', chartType: 'gauge' },
        { id: 6, name: 'Delivery Routes', type: 'chart', chartType: 'map' }
      ],
      lastUpdated: '2024-08-14 15:25:00',
      refreshRate: '5 minutes',
      accessLevel: 'Operations',
      isPublic: false,
      viewCount: 567
    },
    {
      id: 'DASH-003',
      name: 'Sales Performance Dashboard',
      description: 'Sales team performance and revenue tracking',
      category: 'Sales',
      widgets: [
        { id: 1, name: 'Monthly Revenue', type: 'metric', value: '$89,450', change: '+18.7%' },
        { id: 2, name: 'Conversion Rate', type: 'metric', value: '12.3%', change: '+2.1%' },
        { id: 3, name: 'Average Order Value', type: 'metric', value: '$67.80', change: '+5.4%' },
        { id: 4, name: 'Sales Pipeline', type: 'metric', value: '$156k', change: '+22.3%' },
        { id: 5, name: 'Sales by Region', type: 'chart', chartType: 'pie' },
        { id: 6, name: 'Monthly Trends', type: 'chart', chartType: 'area' }
      ],
      lastUpdated: '2024-08-14 15:20:00',
      refreshRate: '10 minutes',
      accessLevel: 'Sales',
      isPublic: false,
      viewCount: 345
    },
    {
      id: 'DASH-004',
      name: 'Customer Insights Dashboard',
      description: 'Customer behavior and engagement analytics',
      category: 'Marketing',
      widgets: [
        { id: 1, name: 'Customer Lifetime Value', type: 'metric', value: '$234', change: '+12.8%' },
        { id: 2, name: 'Retention Rate', type: 'metric', value: '78.5%', change: '+3.2%' },
        { id: 3, name: 'Acquisition Cost', type: 'metric', value: '$45', change: '-8.1%' },
        { id: 4, name: 'Engagement Score', type: 'metric', value: '8.7/10', change: '+0.4' },
        { id: 5, name: 'Customer Segments', type: 'chart', chartType: 'donut' },
        { id: 6, name: 'Journey Analytics', type: 'chart', chartType: 'funnel' }
      ],
      lastUpdated: '2024-08-14 15:15:00',
      refreshRate: '30 minutes',
      accessLevel: 'Marketing',
      isPublic: true,
      viewCount: 189
    }
  ]);

  const [analytics, setAnalytics] = useState([
    {
      id: 'ANA-001',
      name: 'Revenue Growth Analysis',
      type: 'Financial',
      description: 'Detailed analysis of revenue growth patterns and trends',
      insights: [
        'Revenue increased by 23.5% compared to last quarter',
        'Edibles category showing strongest growth at 45.2%',
        'Weekend sales outperforming weekdays by 18%',
        'Customer acquisition cost decreased by 12%'
      ],
      recommendations: [
        'Increase marketing spend on edibles category',
        'Optimize weekend staffing and inventory',
        'Expand customer acquisition channels',
        'Focus on high-margin product lines'
      ],
      dataPoints: 1250,
      confidence: 94.5,
      lastUpdated: '2024-08-14',
      trend: 'Positive'
    },
    {
      id: 'ANA-002',
      name: 'Customer Behavior Analysis',
      type: 'Customer',
      description: 'Deep dive into customer purchasing patterns and preferences',
      insights: [
        'Average customer makes 3.2 purchases per month',
        'Mobile orders account for 67% of total orders',
        'Loyalty program members spend 40% more',
        'Peak ordering time is 7-9 PM on weekdays'
      ],
      recommendations: [
        'Enhance mobile app user experience',
        'Expand loyalty program benefits',
        'Optimize delivery capacity for peak hours',
        'Implement personalized product recommendations'
      ],
      dataPoints: 2340,
      confidence: 91.2,
      lastUpdated: '2024-08-13',
      trend: 'Stable'
    },
    {
      id: 'ANA-003',
      name: 'Inventory Optimization Analysis',
      type: 'Operations',
      description: 'Analysis of inventory levels and optimization opportunities',
      insights: [
        'Inventory turnover improved by 15% this quarter',
        'Flower products have highest demand variability',
        'Concentrate products show most consistent demand',
        'Seasonal patterns identified for edibles category'
      ],
      recommendations: [
        'Implement dynamic pricing for flower products',
        'Increase safety stock for concentrates',
        'Adjust seasonal inventory planning',
        'Optimize reorder points based on demand patterns'
      ],
      dataPoints: 890,
      confidence: 88.7,
      lastUpdated: '2024-08-12',
      trend: 'Improving'
    }
  ]);

  const [reportMetrics, setReportMetrics] = useState({
    totalReports: 156,
    activeReports: 23,
    scheduledReports: 18,
    totalDownloads: 2340,
    avgGenerationTime: 2.3,
    storageUsed: 45.6,
    automatedReports: 85.2,
    reportAccuracy: 98.7
  });

  // Filter functions
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedReportType === 'all' || report.type.toLowerCase() === selectedReportType;
    const matchesStatus = selectedStatus === 'all' || report.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Error': return 'bg-red-100 text-red-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Sales': return 'bg-green-100 text-green-800';
      case 'Financial': return 'bg-blue-100 text-blue-800';
      case 'Inventory': return 'bg-purple-100 text-purple-800';
      case 'Compliance': return 'bg-red-100 text-red-800';
      case 'Customer': return 'bg-yellow-100 text-yellow-800';
      case 'Operations': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'Positive': return 'text-green-600';
      case 'Negative': return 'text-red-600';
      case 'Stable': return 'text-blue-600';
      case 'Improving': return 'text-green-600';
      case 'Declining': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Sales': return '💰';
      case 'Financial': return '📊';
      case 'Inventory': return '📦';
      case 'Compliance': return '📋';
      case 'Customer': return '👥';
      case 'Operations': return '⚙️';
      case 'Marketing': return '📈';
      default: return '📄';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reportMetrics.totalReports}</p>
              <p className="text-sm text-blue-600">{reportMetrics.activeReports} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{reportMetrics.totalDownloads.toLocaleString()}</p>
              <p className="text-sm text-green-600">This month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Generation Time</p>
              <p className="text-2xl font-bold text-gray-900">{reportMetrics.avgGenerationTime}s</p>
              <p className="text-sm text-gray-600">Per report</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Automation Rate</p>
              <p className="text-2xl font-bold text-gray-900">{reportMetrics.automatedReports}%</p>
              <p className="text-sm text-gray-600">Automated reports</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Reporting Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{reportMetrics.reportAccuracy}%</div>
              <div className="text-sm text-gray-600">Report Accuracy</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${reportMetrics.reportAccuracy}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{reportMetrics.automatedReports}%</div>
              <div className="text-sm text-gray-600">Automation Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${reportMetrics.automatedReports}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{reportMetrics.storageUsed}</div>
              <div className="text-sm text-gray-600">Storage Used (GB)</div>
              <div className="text-xs text-gray-500 mt-1">Of 100 GB allocated</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {reports.slice(0, 5).map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getTypeIcon(report.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{report.name}</h4>
                    <p className="text-sm text-gray-600">{report.type} • {report.frequency}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Last: {report.lastGenerated}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analytics Insights */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Latest Analytics Insights</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {analytics.slice(0, 3).map((analysis) => (
              <div key={analysis.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{analysis.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getTrendColor(analysis.trend)}`}>
                      {analysis.trend}
                    </span>
                    <span className="text-sm text-gray-500">{analysis.confidence}% confidence</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{analysis.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Key Insights:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {analysis.insights.slice(0, 2).map((insight, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Recommendations:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {analysis.recommendations.slice(0, 2).map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">→</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Dashboards</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboards.map((dashboard) => (
              <div key={dashboard.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{dashboard.name}</h4>
                  <span className="text-sm text-blue-600">{dashboard.viewCount} views</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{dashboard.description}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Updated: {dashboard.lastUpdated}</span>
                  <span>Refresh: {dashboard.refreshRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search reports..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="sales">Sales</option>
              <option value="financial">Financial</option>
              <option value="inventory">Inventory</option>
              <option value="compliance">Compliance</option>
              <option value="customer">Customer</option>
              <option value="operations">Operations</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Report
            </button>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getTypeIcon(report.type)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.name}</h3>
                  <p className="text-sm text-gray-600">{report.category} • {report.frequency}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(report.type)}`}>
                  {report.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Last Generated:</p>
                <p className="text-sm text-gray-600">{report.lastGenerated}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Next Scheduled:</p>
                <p className="text-sm text-gray-600">{report.nextScheduled}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Format:</p>
                <p className="text-sm text-gray-600">{report.format}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Downloads:</p>
                <p className="text-sm text-blue-600">{report.downloadCount}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Recipients:</p>
              <div className="flex flex-wrap gap-2">
                {report.recipients.map((recipient, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {recipient}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Generate Now
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit Report
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Download Latest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDashboards = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search dashboards..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Dashboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboards.map((dashboard) => (
          <div key={dashboard.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{dashboard.name}</h3>
                <p className="text-sm text-gray-600">{dashboard.category}</p>
              </div>
              <div className="flex items-center space-x-2">
                {dashboard.isPublic && (
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Public
                  </span>
                )}
                <span className="text-sm text-blue-600">{dashboard.viewCount} views</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{dashboard.description}</p>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Key Metrics ({dashboard.widgets.length} widgets):</p>
              <div className="grid grid-cols-2 gap-2">
                {dashboard.widgets.filter(w => w.type === 'metric').slice(0, 4).map((widget) => (
                  <div key={widget.id} className="p-2 bg-gray-50 rounded text-center">
                    <p className="text-xs text-gray-600">{widget.name}</p>
                    <p className="text-sm font-medium text-gray-900">{widget.value}</p>
                    <p className={`text-xs ${widget.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {widget.change}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-900">{dashboard.lastUpdated}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Refresh Rate:</span>
                <span className="text-gray-900">{dashboard.refreshRate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Access Level:</span>
                <span className="text-gray-900">{dashboard.accessLevel}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Dashboard
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

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search analytics..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Run Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Analytics List */}
      <div className="space-y-6">
        {analytics.map((analysis) => (
          <div key={analysis.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{analysis.name}</h3>
                <p className="text-sm text-gray-600">{analysis.type} Analysis</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${getTrendColor(analysis.trend)}`}>
                  {analysis.trend}
                </span>
                <span className="text-sm text-gray-500">{analysis.confidence}% confidence</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{analysis.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Key Insights:</p>
                <ul className="space-y-2">
                  {analysis.insights.map((insight, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Recommendations:</p>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <span className="text-green-500 mr-2 mt-1">→</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
              <span>Data Points: {analysis.dataPoints.toLocaleString()}</span>
              <span>Last Updated: {analysis.lastUpdated}</span>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Export Analysis
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Schedule Update
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
          <h1 className="text-3xl font-bold text-gray-900">Reporting & Analytics</h1>
          <p className="mt-2 text-gray-600">Generate reports, create dashboards, and analyze business data</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'reports', name: 'Reports', icon: '📄' },
              { id: 'dashboards', name: 'Dashboards', icon: '📈' },
              { id: 'analytics', name: 'Analytics', icon: '🔍' }
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
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'dashboards' && renderDashboards()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default ReportingModule;

