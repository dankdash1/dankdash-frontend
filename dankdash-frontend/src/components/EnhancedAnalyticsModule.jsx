import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Eye, Target, Calendar, Download, Filter, RefreshCw, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

const EnhancedAnalyticsModule = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [comparisonPeriod, setComparisonPeriod] = useState('previous');
  const [customReports, setCustomReports] = useState([]);
  const [dashboards, setDashboards] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data with comprehensive metrics
  const [overviewMetrics, setOverviewMetrics] = useState({
    revenue: {
      current: 456780,
      previous: 398650,
      change: 14.6,
      trend: 'up',
      target: 500000,
      forecast: 485000,
      unit: '$'
    },
    orders: {
      current: 2340,
      previous: 2180,
      change: 7.3,
      trend: 'up',
      target: 2500,
      forecast: 2420,
      unit: ''
    },
    customers: {
      current: 1567,
      previous: 1489,
      change: 5.2,
      trend: 'up',
      target: 1600,
      forecast: 1580,
      unit: ''
    },
    avgOrderValue: {
      current: 195.25,
      previous: 182.90,
      change: 6.8,
      trend: 'up',
      target: 200,
      forecast: 200.50,
      unit: '$'
    },
    conversionRate: {
      current: 3.8,
      previous: 3.2,
      change: 18.8,
      trend: 'up',
      target: 4.0,
      forecast: 3.9,
      unit: '%'
    },
    customerLifetimeValue: {
      current: 1250,
      previous: 1180,
      change: 5.9,
      trend: 'up',
      target: 1300,
      forecast: 1275,
      unit: '$'
    }
  });

  // Sample chart data
  const revenueData = [
    { month: 'Jan', revenue: 35000, orders: 180, customers: 120 },
    { month: 'Feb', revenue: 42000, orders: 220, customers: 145 },
    { month: 'Mar', revenue: 38000, orders: 195, customers: 135 },
    { month: 'Apr', revenue: 45000, orders: 235, customers: 160 },
    { month: 'May', revenue: 52000, orders: 270, customers: 185 },
    { month: 'Jun', revenue: 48000, orders: 250, customers: 170 },
    { month: 'Jul', revenue: 55000, orders: 285, customers: 195 },
    { month: 'Aug', revenue: 58000, orders: 300, customers: 210 },
    { month: 'Sep', revenue: 62000, orders: 320, customers: 225 },
    { month: 'Oct', revenue: 59000, orders: 305, customers: 215 },
    { month: 'Nov', revenue: 65000, orders: 335, customers: 240 },
    { month: 'Dec', revenue: 68000, orders: 350, customers: 255 }
  ];

  const categoryData = [
    { name: 'Flower', value: 45, color: '#10B981' },
    { name: 'Concentrates', value: 25, color: '#3B82F6' },
    { name: 'Edibles', value: 20, color: '#F59E0B' },
    { name: 'Accessories', value: 10, color: '#EF4444' }
  ];

  const trafficData = [
    { source: 'Organic Search', visitors: 12500, conversions: 475, rate: 3.8 },
    { source: 'Direct', visitors: 8900, conversions: 356, rate: 4.0 },
    { source: 'Social Media', visitors: 6700, conversions: 201, rate: 3.0 },
    { source: 'Email', visitors: 4200, conversions: 210, rate: 5.0 },
    { source: 'Paid Ads', visitors: 3800, conversions: 152, rate: 4.0 }
  ];

  // Initialize sample data
  useEffect(() => {
    setCustomReports([
      {
        id: 1,
        name: 'Monthly Sales Report',
        type: 'Sales',
        schedule: 'Monthly',
        lastRun: '2024-01-15',
        status: 'Active',
        recipients: 'sales@dankdash.com',
        format: 'PDF'
      },
      {
        id: 2,
        name: 'Customer Acquisition Analysis',
        type: 'Marketing',
        schedule: 'Weekly',
        lastRun: '2024-01-12',
        status: 'Active',
        recipients: 'marketing@dankdash.com',
        format: 'Excel'
      },
      {
        id: 3,
        name: 'Inventory Performance',
        type: 'Operations',
        schedule: 'Daily',
        lastRun: '2024-01-15',
        status: 'Paused',
        recipients: 'ops@dankdash.com',
        format: 'CSV'
      }
    ]);

    setDashboards([
      {
        id: 1,
        name: 'Executive Dashboard',
        description: 'High-level KPIs and business metrics',
        widgets: 8,
        lastUpdated: '2024-01-15 10:30',
        status: 'Active',
        shared: true
      },
      {
        id: 2,
        name: 'Sales Performance',
        description: 'Detailed sales analytics and trends',
        widgets: 12,
        lastUpdated: '2024-01-15 09:45',
        status: 'Active',
        shared: false
      },
      {
        id: 3,
        name: 'Marketing ROI',
        description: 'Campaign performance and attribution',
        widgets: 6,
        lastUpdated: '2024-01-14 16:20',
        status: 'Draft',
        shared: false
      }
    ]);

    setAlerts([
      {
        id: 1,
        type: 'warning',
        title: 'Revenue Target Alert',
        message: 'Monthly revenue is 15% below target',
        timestamp: '2024-01-15 14:30',
        status: 'Active',
        priority: 'High'
      },
      {
        id: 2,
        type: 'success',
        title: 'Conversion Rate Improvement',
        message: 'Conversion rate increased by 18.8% this month',
        timestamp: '2024-01-15 12:15',
        status: 'Acknowledged',
        priority: 'Medium'
      },
      {
        id: 3,
        type: 'info',
        title: 'New Customer Milestone',
        message: 'Reached 1,500+ active customers',
        timestamp: '2024-01-15 10:00',
        status: 'Active',
        priority: 'Low'
      }
    ]);
  }, []);

  const handleCreateReport = () => {
    const newReport = {
      id: customReports.length + 1,
      name: 'New Custom Report',
      type: 'Custom',
      schedule: 'Weekly',
      lastRun: new Date().toISOString().split('T')[0],
      status: 'Draft',
      recipients: 'admin@dankdash.com',
      format: 'PDF'
    };
    setCustomReports([...customReports, newReport]);
  };

  const handleCreateDashboard = () => {
    const newDashboard = {
      id: dashboards.length + 1,
      name: 'New Dashboard',
      description: 'Custom analytics dashboard',
      widgets: 0,
      lastUpdated: new Date().toLocaleString(),
      status: 'Draft',
      shared: false
    };
    setDashboards([...dashboards, newDashboard]);
  };

  const handleDeleteReport = (id) => {
    setCustomReports(customReports.filter(report => report.id !== id));
  };

  const handleDeleteDashboard = (id) => {
    setDashboards(dashboards.filter(dashboard => dashboard.id !== id));
  };

  const handleRunReport = (id) => {
    setIsLoading(true);
    setTimeout(() => {
      setCustomReports(customReports.map(report => 
        report.id === id 
          ? { ...report, lastRun: new Date().toISOString().split('T')[0], status: 'Active' }
          : report
      ));
      setIsLoading(false);
    }, 2000);
  };

  const handleDismissAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id 
        ? { ...alert, status: 'Dismissed' }
        : alert
    ));
  };

  const renderMetricCard = (key, metric) => (
    <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            key === 'revenue' ? 'bg-green-100 text-green-600' :
            key === 'orders' ? 'bg-blue-100 text-blue-600' :
            key === 'customers' ? 'bg-purple-100 text-purple-600' :
            key === 'avgOrderValue' ? 'bg-orange-100 text-orange-600' :
            key === 'conversionRate' ? 'bg-red-100 text-red-600' :
            'bg-indigo-100 text-indigo-600'
          }`}>
            {key === 'revenue' && <DollarSign className="h-5 w-5" />}
            {key === 'orders' && <ShoppingCart className="h-5 w-5" />}
            {key === 'customers' && <Users className="h-5 w-5" />}
            {key === 'avgOrderValue' && <Target className="h-5 w-5" />}
            {key === 'conversionRate' && <TrendingUp className="h-5 w-5" />}
            {key === 'customerLifetimeValue' && <Zap className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {metric.unit}{typeof metric.current === 'number' ? metric.current.toLocaleString() : metric.current}
            </p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
          metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {metric.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          <span>{metric.change}%</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Target: {metric.unit}{metric.target?.toLocaleString()}</span>
          <span className="text-gray-500">Forecast: {metric.unit}{metric.forecast?.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${metric.current >= metric.target ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Object.entries(overviewMetrics).map(([key, metric]) => renderMetricCard(key, metric))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 sm:mb-0">Revenue Trend</h3>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" fill="#10B981" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Categories */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sales by Category</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Source</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Visitors</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Conversions</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Rate</th>
              </tr>
            </thead>
            <tbody>
              {trafficData.map((source, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">{source.source}</td>
                  <td className="py-3 px-4 text-gray-600">{source.visitors.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600">{source.conversions}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      source.rate >= 4 ? 'bg-green-100 text-green-800' : 
                      source.rate >= 3 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {source.rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="space-y-6">
      {/* Reports Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Custom Reports</h2>
          <p className="text-gray-600">Create and manage automated reports</p>
        </div>
        <button
          onClick={handleCreateReport}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Download className="h-4 w-4" />
          <span>Create Report</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Report Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Schedule</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Last Run</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{report.name}</div>
                      <div className="text-sm text-gray-500">{report.format} format</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{report.type}</td>
                  <td className="py-3 px-4 text-gray-600">{report.schedule}</td>
                  <td className="py-3 px-4 text-gray-600">{report.lastRun}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'Active' ? 'bg-green-100 text-green-800' :
                      report.status === 'Paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleRunReport(report.id)}
                        disabled={isLoading}
                        className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
                      >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
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

  const renderDashboardsTab = () => (
    <div className="space-y-6">
      {/* Dashboards Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Custom Dashboards</h2>
          <p className="text-gray-600">Create and manage analytics dashboards</p>
        </div>
        <button
          onClick={handleCreateDashboard}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Eye className="h-4 w-4" />
          <span>Create Dashboard</span>
        </button>
      </div>

      {/* Dashboards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboards.map((dashboard) => (
          <div key={dashboard.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dashboard.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{dashboard.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{dashboard.widgets} widgets</span>
                  <span>Updated: {dashboard.lastUpdated}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                dashboard.status === 'Active' ? 'bg-green-100 text-green-800' :
                dashboard.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {dashboard.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {dashboard.shared && (
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Shared</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteDashboard(dashboard.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAlertsTab = () => (
    <div className="space-y-6">
      {/* Alerts Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics Alerts</h2>
        <p className="text-gray-600">Monitor key metrics and get notified of important changes</p>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`bg-white rounded-xl shadow-sm border-l-4 p-4 sm:p-6 ${
            alert.type === 'warning' ? 'border-l-yellow-400' :
            alert.type === 'success' ? 'border-l-green-400' :
            alert.type === 'error' ? 'border-l-red-400' :
            'border-l-blue-400'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  alert.type === 'success' ? 'bg-green-100 text-green-600' :
                  alert.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {alert.type === 'warning' && <AlertCircle className="h-5 w-5" />}
                  {alert.type === 'success' && <CheckCircle className="h-5 w-5" />}
                  {alert.type === 'error' && <AlertCircle className="h-5 w-5" />}
                  {alert.type === 'info' && <Clock className="h-5 w-5" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{alert.title}</h3>
                  <p className="text-gray-600 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{alert.timestamp}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.priority === 'High' ? 'bg-red-100 text-red-800' :
                      alert.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {alert.priority} Priority
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                      alert.status === 'Acknowledged' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDismissAlert(alert.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-gray-600">Comprehensive business intelligence and reporting</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: 'overview', name: 'Overview', icon: TrendingUp },
                { id: 'reports', name: 'Reports', icon: Download },
                { id: 'dashboards', name: 'Dashboards', icon: Eye },
                { id: 'alerts', name: 'Alerts', icon: AlertCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'reports' && renderReportsTab()}
        {activeTab === 'dashboards' && renderDashboardsTab()}
        {activeTab === 'alerts' && renderAlertsTab()}

        {/* Analytics Tips */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">📊 Analytics Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Performance Optimization</h4>
              <ul className="space-y-1">
                <li>• Monitor conversion rates weekly</li>
                <li>• Track customer acquisition costs</li>
                <li>• Analyze seasonal trends</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Data-Driven Decisions</h4>
              <ul className="space-y-1">
                <li>• Set up automated alerts for key metrics</li>
                <li>• Create custom dashboards for stakeholders</li>
                <li>• Schedule regular performance reports</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAnalyticsModule;

