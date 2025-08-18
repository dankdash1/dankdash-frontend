import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [comparisonPeriod, setComparisonPeriod] = useState('previous');

  // Mock analytics data
  const [overviewMetrics, setOverviewMetrics] = useState({
    revenue: {
      current: 456780,
      previous: 398650,
      change: 14.6,
      trend: 'up',
      target: 500000,
      forecast: 485000
    },
    orders: {
      current: 2340,
      previous: 2180,
      change: 7.3,
      trend: 'up',
      target: 2500,
      forecast: 2420
    },
    customers: {
      current: 1567,
      previous: 1489,
      change: 5.2,
      trend: 'up',
      target: 1600,
      forecast: 1580
    },
    avgOrderValue: {
      current: 195.25,
      previous: 182.90,
      change: 6.8,
      trend: 'up',
      target: 200,
      forecast: 200.50
    },
    conversionRate: {
      current: 3.8,
      previous: 3.2,
      change: 18.8,
      trend: 'up',
      target: 4.0,
      forecast: 3.9
    },
    customerLifetimeValue: {
      current: 890.50,
      previous: 845.20,
      change: 5.4,
      trend: 'up',
      target: 950,
      forecast: 920
    }
  });

  const [revenueData, setRevenueData] = useState([
    { date: '2024-07-15', revenue: 12500, orders: 64, customers: 45 },
    { date: '2024-07-16', revenue: 15200, orders: 78, customers: 52 },
    { date: '2024-07-17', revenue: 18900, orders: 97, customers: 68 },
    { date: '2024-07-18', revenue: 16700, orders: 85, customers: 59 },
    { date: '2024-07-19', revenue: 21300, orders: 109, customers: 76 },
    { date: '2024-07-20', revenue: 19800, orders: 101, customers: 71 },
    { date: '2024-07-21', revenue: 17600, orders: 90, customers: 63 },
    { date: '2024-07-22', revenue: 22100, orders: 113, customers: 79 },
    { date: '2024-07-23', revenue: 20400, orders: 104, customers: 73 },
    { date: '2024-07-24', revenue: 18900, orders: 97, customers: 68 },
    { date: '2024-07-25', revenue: 24500, orders: 125, customers: 87 },
    { date: '2024-07-26', revenue: 23200, orders: 119, customers: 83 },
    { date: '2024-07-27', revenue: 21800, orders: 111, customers: 78 },
    { date: '2024-07-28', revenue: 25600, orders: 131, customers: 91 },
    { date: '2024-07-29', revenue: 24100, orders: 123, customers: 86 },
    { date: '2024-07-30', revenue: 22700, orders: 116, customers: 81 },
    { date: '2024-07-31', revenue: 26800, orders: 137, customers: 95 },
    { date: '2024-08-01', revenue: 25300, orders: 129, customers: 90 },
    { date: '2024-08-02', revenue: 23900, orders: 122, customers: 85 },
    { date: '2024-08-03', revenue: 27400, orders: 140, customers: 98 },
    { date: '2024-08-04', revenue: 26100, orders: 133, customers: 93 },
    { date: '2024-08-05', revenue: 24800, orders: 127, customers: 88 },
    { date: '2024-08-06', revenue: 28200, orders: 144, customers: 101 },
    { date: '2024-08-07', revenue: 26900, orders: 137, customers: 96 },
    { date: '2024-08-08', revenue: 25500, orders: 130, customers: 91 },
    { date: '2024-08-09', revenue: 29100, orders: 149, customers: 104 },
    { date: '2024-08-10', revenue: 27600, orders: 141, customers: 99 },
    { date: '2024-08-11', revenue: 26300, orders: 134, customers: 94 },
    { date: '2024-08-12', revenue: 30200, orders: 154, customers: 108 },
    { date: '2024-08-13', revenue: 28800, orders: 147, customers: 103 }
  ]);

  const [productAnalytics, setProductAnalytics] = useState([
    {
      id: 'PROD-001',
      name: 'Blue Dream - Premium Flower',
      category: 'Flower',
      revenue: 89500,
      units: 450,
      margin: 68.5,
      growth: 15.2,
      rating: 4.8,
      reviews: 234,
      inventory: 125,
      reorderPoint: 50,
      trend: 'up'
    },
    {
      id: 'PROD-002',
      name: 'Sour Diesel Vape Cartridge',
      category: 'Vapes',
      revenue: 67800,
      units: 340,
      margin: 72.3,
      growth: 22.8,
      rating: 4.6,
      reviews: 189,
      inventory: 89,
      reorderPoint: 30,
      trend: 'up'
    },
    {
      id: 'PROD-003',
      name: 'Chocolate Chip Edibles',
      category: 'Edibles',
      revenue: 45600,
      units: 228,
      margin: 65.8,
      growth: 8.9,
      rating: 4.7,
      reviews: 156,
      inventory: 67,
      reorderPoint: 25,
      trend: 'up'
    },
    {
      id: 'PROD-004',
      name: 'OG Kush Concentrate',
      category: 'Concentrates',
      revenue: 78900,
      units: 158,
      margin: 75.2,
      growth: 18.5,
      rating: 4.9,
      reviews: 98,
      inventory: 34,
      reorderPoint: 15,
      trend: 'up'
    },
    {
      id: 'PROD-005',
      name: 'CBD Tincture 1000mg',
      category: 'Wellness',
      revenue: 34500,
      units: 115,
      margin: 58.9,
      growth: -2.3,
      rating: 4.5,
      reviews: 87,
      inventory: 78,
      reorderPoint: 20,
      trend: 'down'
    }
  ]);

  const [customerSegments, setCustomerSegments] = useState([
    {
      segment: 'VIP Customers',
      count: 156,
      percentage: 10.0,
      avgOrderValue: 485.50,
      totalRevenue: 75780,
      frequency: 8.5,
      retention: 95.2,
      growth: 12.8,
      characteristics: ['High spending', 'Frequent orders', 'Premium products']
    },
    {
      segment: 'Regular Customers',
      count: 623,
      percentage: 39.8,
      avgOrderValue: 225.30,
      totalRevenue: 140360,
      frequency: 4.2,
      retention: 78.5,
      growth: 8.9,
      characteristics: ['Consistent orders', 'Mixed products', 'Price conscious']
    },
    {
      segment: 'Occasional Buyers',
      count: 567,
      percentage: 36.2,
      avgOrderValue: 165.80,
      totalRevenue: 94010,
      frequency: 2.1,
      retention: 45.6,
      growth: 5.2,
      characteristics: ['Infrequent orders', 'Basic products', 'Deal seekers']
    },
    {
      segment: 'New Customers',
      count: 221,
      percentage: 14.1,
      avgOrderValue: 145.20,
      totalRevenue: 32090,
      frequency: 1.3,
      retention: 25.8,
      growth: 18.5,
      characteristics: ['First-time buyers', 'Trial products', 'Referral driven']
    }
  ]);

  const [marketingMetrics, setMarketingMetrics] = useState({
    campaigns: [
      {
        name: 'Summer Sale 2024',
        type: 'Email',
        status: 'Active',
        budget: 5000,
        spent: 3200,
        impressions: 45600,
        clicks: 2280,
        conversions: 156,
        revenue: 28900,
        roi: 803.1,
        ctr: 5.0,
        conversionRate: 6.8
      },
      {
        name: 'New Customer Welcome',
        type: 'SMS',
        status: 'Active',
        budget: 2500,
        spent: 1800,
        impressions: 12400,
        clicks: 1860,
        conversions: 89,
        revenue: 12650,
        roi: 602.8,
        ctr: 15.0,
        conversionRate: 4.8
      },
      {
        name: 'Premium Product Launch',
        type: 'Social Media',
        status: 'Completed',
        budget: 8000,
        spent: 7500,
        impressions: 89500,
        clicks: 3580,
        conversions: 234,
        revenue: 45600,
        roi: 508.0,
        ctr: 4.0,
        conversionRate: 6.5
      }
    ],
    channels: [
      { name: 'Email Marketing', revenue: 89500, cost: 12000, roi: 645.8, conversions: 456 },
      { name: 'SMS Marketing', revenue: 67800, cost: 8500, roi: 697.6, conversions: 289 },
      { name: 'Social Media', revenue: 78900, cost: 15000, roi: 426.0, conversions: 378 },
      { name: 'Referral Program', revenue: 45600, cost: 5000, roi: 812.0, conversions: 234 },
      { name: 'SEO/Organic', revenue: 123400, cost: 18000, roi: 585.6, conversions: 567 }
    ]
  });

  const [operationalMetrics, setOperationalMetrics] = useState({
    delivery: {
      avgDeliveryTime: 28.5,
      onTimeRate: 94.2,
      customerSatisfaction: 4.6,
      driverUtilization: 78.5,
      fuelCosts: 2340,
      maintenanceCosts: 890
    },
    inventory: {
      turnoverRate: 8.5,
      stockoutRate: 2.3,
      excessInventory: 15.6,
      avgDaysOnHand: 42.8,
      warehouseUtilization: 76.3,
      shrinkageRate: 1.2
    },
    quality: {
      defectRate: 0.8,
      returnRate: 2.1,
      customerComplaints: 12,
      qualityScore: 96.5,
      complianceRate: 99.2,
      testPassRate: 98.7
    }
  });

  const [financialMetrics, setFinancialMetrics] = useState({
    profitability: {
      grossMargin: 68.5,
      netMargin: 15.2,
      ebitda: 89500,
      operatingExpenses: 234000,
      costOfGoodsSold: 143700,
      grossProfit: 313080
    },
    cashFlow: {
      operatingCashFlow: 78900,
      freeCashFlow: 56700,
      accountsReceivable: 23400,
      accountsPayable: 45600,
      inventory: 89500,
      cashOnHand: 156700
    },
    growth: {
      revenueGrowth: 14.6,
      customerGrowth: 5.2,
      orderGrowth: 7.3,
      marketShare: 12.8,
      customerAcquisitionCost: 45.60,
      customerLifetimeValue: 890.50
    }
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };

  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(1)}%`;
  };

  const getChangeColor = (change) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change) => {
    return change >= 0 ? '↗️' : '↘️';
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(overviewMetrics).map(([key, metric]) => (
          <div key={key} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <span className={`text-2xl ${getTrendColor(metric.trend)}`}>
                {getChangeIcon(metric.change)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-gray-900">
                  {key === 'revenue' || key === 'avgOrderValue' || key === 'customerLifetimeValue' 
                    ? formatCurrency(metric.current)
                    : key === 'conversionRate'
                    ? formatPercentage(metric.current)
                    : formatNumber(metric.current)}
                </p>
                <span className={`ml-2 text-sm font-medium ${getChangeColor(metric.change)}`}>
                  {metric.change >= 0 ? '+' : ''}{formatPercentage(metric.change)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Target: {
                  key === 'revenue' || key === 'avgOrderValue' || key === 'customerLifetimeValue'
                    ? formatCurrency(metric.target)
                    : key === 'conversionRate'
                    ? formatPercentage(metric.target)
                    : formatNumber(metric.target)
                }</span>
                <span>Forecast: {
                  key === 'revenue' || key === 'avgOrderValue' || key === 'customerLifetimeValue'
                    ? formatCurrency(metric.forecast)
                    : key === 'conversionRate'
                    ? formatPercentage(metric.forecast)
                    : formatNumber(metric.forecast)
                }</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((metric.current / metric.target) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
          <div className="flex space-x-2">
            {['7d', '30d', '90d', '1y'].map((period) => (
              <button
                key={period}
                onClick={() => setDateRange(period)}
                className={`px-3 py-1 text-sm rounded-md ${
                  dateRange === period
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-6xl mb-4">📈</div>
            <p className="text-gray-600">Interactive Revenue Chart</p>
            <p className="text-sm text-gray-500 mt-2">
              Revenue: {formatCurrency(revenueData.reduce((sum, day) => sum + day.revenue, 0))} | 
              Orders: {formatNumber(revenueData.reduce((sum, day) => sum + day.orders, 0))} | 
              Customers: {formatNumber(revenueData.reduce((sum, day) => sum + day.customers, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Daily Revenue</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(28800)}</p>
              <p className="text-sm text-green-600">+12.5% vs yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Orders Today</p>
              <p className="text-xl font-bold text-gray-900">{formatNumber(147)}</p>
              <p className="text-sm text-blue-600">+8.2% vs yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Customers</p>
              <p className="text-xl font-bold text-gray-900">{formatNumber(23)}</p>
              <p className="text-sm text-purple-600">+15.0% vs yesterday</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-xl font-bold text-gray-900">4.7</p>
              <p className="text-sm text-yellow-600">+0.1 vs last week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      {/* Product Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Product Performance</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Product</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Units</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Margin</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Growth</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Inventory</th>
                </tr>
              </thead>
              <tbody>
                {productAnalytics.map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-900">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {formatNumber(product.units)}
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      {formatPercentage(product.margin)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${getChangeColor(product.growth)}`}>
                        {product.growth >= 0 ? '+' : ''}{formatPercentage(product.growth)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">⭐</span>
                        <span className="font-medium text-gray-900">{product.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span className={`font-medium ${
                          product.inventory <= product.reorderPoint ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {product.inventory}
                        </span>
                        {product.inventory <= product.reorderPoint && (
                          <span className="ml-2 text-red-500">⚠️</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Revenue</h3>
          <div className="space-y-4">
            {[
              { name: 'Flower', revenue: 189500, percentage: 42.5, color: 'bg-green-500' },
              { name: 'Vapes', revenue: 145600, percentage: 32.6, color: 'bg-blue-500' },
              { name: 'Edibles', revenue: 67800, percentage: 15.2, color: 'bg-purple-500' },
              { name: 'Concentrates', revenue: 34500, percentage: 7.7, color: 'bg-yellow-500' },
              { name: 'Wellness', revenue: 8900, percentage: 2.0, color: 'bg-pink-500' }
            ].map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded ${category.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{formatCurrency(category.revenue)}</p>
                  <p className="text-xs text-gray-500">{formatPercentage(category.percentage)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Alerts</h3>
          <div className="space-y-3">
            {productAnalytics.filter(p => p.inventory <= p.reorderPoint).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="font-medium text-red-900">{product.name}</p>
                  <p className="text-sm text-red-700">Stock: {product.inventory} units</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-red-900">Reorder Point: {product.reorderPoint}</p>
                  <button className="text-xs bg-red-600 text-white px-2 py-1 rounded mt-1">
                    Reorder Now
                  </button>
                </div>
              </div>
            ))}
            {productAnalytics.filter(p => p.inventory <= p.reorderPoint).length === 0 && (
              <div className="text-center py-8">
                <span className="text-4xl mb-2 block">✅</span>
                <p className="text-gray-600">All products are well stocked</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      {/* Customer Segments */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Customer Segments</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerSegments.map((segment) => (
              <div key={segment.segment} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{segment.segment}</h4>
                  <span className={`text-sm font-medium ${getChangeColor(segment.growth)}`}>
                    {segment.growth >= 0 ? '+' : ''}{formatPercentage(segment.growth)}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Customers:</span>
                    <span className="font-medium text-gray-900">{formatNumber(segment.count)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Percentage:</span>
                    <span className="font-medium text-gray-900">{formatPercentage(segment.percentage)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Avg Order:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(segment.avgOrderValue)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(segment.totalRevenue)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frequency:</span>
                    <span className="font-medium text-gray-900">{segment.frequency}/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Retention:</span>
                    <span className="font-medium text-gray-900">{formatPercentage(segment.retention)}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-1">Characteristics:</p>
                  <div className="flex flex-wrap gap-1">
                    {segment.characteristics.map((char, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Lifetime Value Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Acquisition</h3>
          <div className="space-y-4">
            {[
              { channel: 'Referral Program', customers: 234, cost: 45.60, ltv: 890.50 },
              { channel: 'Social Media', customers: 189, cost: 67.80, ltv: 756.20 },
              { channel: 'Email Marketing', customers: 156, cost: 34.20, ltv: 945.80 },
              { channel: 'SEO/Organic', customers: 298, cost: 23.40, ltv: 1024.60 },
              { channel: 'Paid Advertising', customers: 123, cost: 89.50, ltv: 678.90 }
            ].map((channel) => (
              <div key={channel.channel} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{channel.channel}</p>
                  <p className="text-sm text-gray-600">{formatNumber(channel.customers)} customers</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">CAC: {formatCurrency(channel.cost)}</p>
                  <p className="text-sm text-gray-600">LTV: {formatCurrency(channel.ltv)}</p>
                  <p className="text-xs text-green-600">
                    ROI: {((channel.ltv / channel.cost) * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Retention Analysis</h3>
          <div className="space-y-4">
            {[
              { period: 'Month 1', retention: 85.2, customers: 1334 },
              { period: 'Month 3', retention: 68.5, customers: 1073 },
              { period: 'Month 6', retention: 52.8, customers: 827 },
              { period: 'Month 12', retention: 38.9, customers: 609 },
              { period: 'Month 24', retention: 25.6, customers: 401 }
            ].map((period) => (
              <div key={period.period} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{period.period}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">{formatNumber(period.customers)} customers</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${period.retention}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12">
                    {formatPercentage(period.retention)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketing = () => (
    <div className="space-y-6">
      {/* Campaign Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Budget</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Spent</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Conversions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
                </tr>
              </thead>
              <tbody>
                {marketingMetrics.campaigns.map((campaign, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{campaign.name}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {campaign.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {campaign.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(campaign.budget)}</td>
                    <td className="py-3 px-4 text-gray-900">{formatCurrency(campaign.spent)}</td>
                    <td className="py-3 px-4 text-gray-900">{formatNumber(campaign.impressions)}</td>
                    <td className="py-3 px-4 text-gray-900">{formatPercentage(campaign.ctr)}</td>
                    <td className="py-3 px-4 text-gray-900">{formatNumber(campaign.conversions)}</td>
                    <td className="py-3 px-4 font-medium text-gray-900">{formatCurrency(campaign.revenue)}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-green-600">{formatPercentage(campaign.roi)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Channel Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Marketing Channel Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketingMetrics.channels.map((channel, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">{channel.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(channel.revenue)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(channel.cost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">ROI:</span>
                    <span className="font-medium text-green-600">{formatPercentage(channel.roi)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Conversions:</span>
                    <span className="font-medium text-gray-900">{formatNumber(channel.conversions)}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((channel.roi / 10), 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketing Funnel */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Marketing Funnel</h3>
        <div className="space-y-4">
          {[
            { stage: 'Awareness', visitors: 45600, percentage: 100, color: 'bg-blue-500' },
            { stage: 'Interest', visitors: 12400, percentage: 27.2, color: 'bg-green-500' },
            { stage: 'Consideration', visitors: 5680, percentage: 12.5, color: 'bg-yellow-500' },
            { stage: 'Purchase', visitors: 1734, percentage: 3.8, color: 'bg-purple-500' },
            { stage: 'Retention', visitors: 1245, percentage: 2.7, color: 'bg-pink-500' }
          ].map((stage, index) => (
            <div key={stage.stage} className="flex items-center">
              <div className="w-24 text-sm font-medium text-gray-900">{stage.stage}</div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-8 relative">
                  <div 
                    className={`${stage.color} h-8 rounded-full flex items-center justify-center text-white text-sm font-medium`}
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {stage.percentage >= 15 && `${formatNumber(stage.visitors)}`}
                  </div>
                  {stage.percentage < 15 && (
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-700">
                      {formatNumber(stage.visitors)}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-16 text-right text-sm font-medium text-gray-900">
                {formatPercentage(stage.percentage)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderOperations = () => (
    <div className="space-y-6">
      {/* Operational KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Delivery Time:</span>
              <span className="font-medium text-gray-900">{operationalMetrics.delivery.avgDeliveryTime} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">On-Time Rate:</span>
              <span className="font-medium text-green-600">{formatPercentage(operationalMetrics.delivery.onTimeRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Customer Satisfaction:</span>
              <span className="font-medium text-gray-900">{operationalMetrics.delivery.customerSatisfaction}/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Driver Utilization:</span>
              <span className="font-medium text-blue-600">{formatPercentage(operationalMetrics.delivery.driverUtilization)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Fuel Costs:</span>
              <span className="font-medium text-gray-900">{formatCurrency(operationalMetrics.delivery.fuelCosts)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inventory Management</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Turnover Rate:</span>
              <span className="font-medium text-green-600">{operationalMetrics.inventory.turnoverRate}x/year</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Stockout Rate:</span>
              <span className="font-medium text-red-600">{formatPercentage(operationalMetrics.inventory.stockoutRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Excess Inventory:</span>
              <span className="font-medium text-yellow-600">{formatPercentage(operationalMetrics.inventory.excessInventory)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg Days on Hand:</span>
              <span className="font-medium text-gray-900">{operationalMetrics.inventory.avgDaysOnHand} days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Shrinkage Rate:</span>
              <span className="font-medium text-red-600">{formatPercentage(operationalMetrics.inventory.shrinkageRate)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Control</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Defect Rate:</span>
              <span className="font-medium text-red-600">{formatPercentage(operationalMetrics.quality.defectRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Return Rate:</span>
              <span className="font-medium text-yellow-600">{formatPercentage(operationalMetrics.quality.returnRate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Customer Complaints:</span>
              <span className="font-medium text-gray-900">{operationalMetrics.quality.customerComplaints}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Quality Score:</span>
              <span className="font-medium text-green-600">{formatPercentage(operationalMetrics.quality.qualityScore)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Test Pass Rate:</span>
              <span className="font-medium text-green-600">{formatPercentage(operationalMetrics.quality.testPassRate)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operational Efficiency Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Operational Efficiency Trends</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-gray-600">Operational Efficiency Chart</p>
            <p className="text-sm text-gray-500 mt-2">
              Delivery: {formatPercentage(operationalMetrics.delivery.onTimeRate)} | 
              Inventory: {operationalMetrics.inventory.turnoverRate}x | 
              Quality: {formatPercentage(operationalMetrics.quality.qualityScore)}
            </p>
          </div>
        </div>
      </div>

      {/* Process Optimization */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Process Optimization Opportunities</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                process: 'Order Fulfillment',
                currentTime: 45,
                targetTime: 30,
                improvement: 33.3,
                priority: 'High',
                impact: 'Customer satisfaction, operational costs'
              },
              {
                process: 'Inventory Replenishment',
                currentTime: 72,
                targetTime: 48,
                improvement: 33.3,
                priority: 'Medium',
                impact: 'Stock availability, carrying costs'
              },
              {
                process: 'Quality Testing',
                currentTime: 24,
                targetTime: 18,
                improvement: 25.0,
                priority: 'Medium',
                impact: 'Time to market, compliance'
              },
              {
                process: 'Customer Onboarding',
                currentTime: 15,
                targetTime: 10,
                improvement: 33.3,
                priority: 'High',
                impact: 'Customer experience, conversion'
              }
            ].map((process, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{process.process}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    process.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {process.priority} Priority
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Current Time:</span>
                    <span className="font-medium text-gray-900">{process.currentTime} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target Time:</span>
                    <span className="font-medium text-green-600">{process.targetTime} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Improvement:</span>
                    <span className="font-medium text-blue-600">{formatPercentage(process.improvement)}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-gray-600 mb-1">Impact:</p>
                    <p className="text-xs text-gray-700">{process.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancials = () => (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profitability</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gross Margin:</span>
              <span className="font-medium text-green-600">{formatPercentage(financialMetrics.profitability.grossMargin)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Net Margin:</span>
              <span className="font-medium text-blue-600">{formatPercentage(financialMetrics.profitability.netMargin)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">EBITDA:</span>
              <span className="font-medium text-gray-900">{formatCurrency(financialMetrics.profitability.ebitda)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Operating Expenses:</span>
              <span className="font-medium text-red-600">{formatCurrency(financialMetrics.profitability.operatingExpenses)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Gross Profit:</span>
              <span className="font-medium text-green-600">{formatCurrency(financialMetrics.profitability.grossProfit)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Operating Cash Flow:</span>
              <span className="font-medium text-green-600">{formatCurrency(financialMetrics.cashFlow.operatingCashFlow)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Free Cash Flow:</span>
              <span className="font-medium text-blue-600">{formatCurrency(financialMetrics.cashFlow.freeCashFlow)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Cash on Hand:</span>
              <span className="font-medium text-gray-900">{formatCurrency(financialMetrics.cashFlow.cashOnHand)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Accounts Receivable:</span>
              <span className="font-medium text-yellow-600">{formatCurrency(financialMetrics.cashFlow.accountsReceivable)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Accounts Payable:</span>
              <span className="font-medium text-red-600">{formatCurrency(financialMetrics.cashFlow.accountsPayable)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Revenue Growth:</span>
              <span className="font-medium text-green-600">{formatPercentage(financialMetrics.growth.revenueGrowth)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Customer Growth:</span>
              <span className="font-medium text-blue-600">{formatPercentage(financialMetrics.growth.customerGrowth)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Market Share:</span>
              <span className="font-medium text-purple-600">{formatPercentage(financialMetrics.growth.marketShare)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">CAC:</span>
              <span className="font-medium text-gray-900">{formatCurrency(financialMetrics.growth.customerAcquisitionCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">LTV:</span>
              <span className="font-medium text-green-600">{formatCurrency(financialMetrics.growth.customerLifetimeValue)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Expenses</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <p className="text-gray-600">Revenue vs Expenses Chart</p>
              <p className="text-sm text-gray-500 mt-2">
                Revenue: {formatCurrency(456780)} | 
                Expenses: {formatCurrency(234000)} | 
                Profit: {formatCurrency(222780)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Cash Flow Trend</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-6xl mb-4">📈</div>
              <p className="text-gray-600">Cash Flow Trend Chart</p>
              <p className="text-sm text-gray-500 mt-2">
                Operating: {formatCurrency(financialMetrics.cashFlow.operatingCashFlow)} | 
                Free: {formatCurrency(financialMetrics.cashFlow.freeCashFlow)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Ratios */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Key Financial Ratios</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'LTV:CAC Ratio',
                value: (financialMetrics.growth.customerLifetimeValue / financialMetrics.growth.customerAcquisitionCost).toFixed(1),
                target: '3:1',
                status: 'excellent',
                description: 'Customer lifetime value to acquisition cost ratio'
              },
              {
                name: 'Gross Margin',
                value: formatPercentage(financialMetrics.profitability.grossMargin),
                target: '65%',
                status: 'good',
                description: 'Gross profit as percentage of revenue'
              },
              {
                name: 'Cash Conversion',
                value: '32 days',
                target: '30 days',
                status: 'good',
                description: 'Time to convert sales to cash'
              },
              {
                name: 'Inventory Turns',
                value: operationalMetrics.inventory.turnoverRate + 'x',
                target: '8x',
                status: 'excellent',
                description: 'How often inventory is sold per year'
              }
            ].map((ratio, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{ratio.name}</h4>
                  <span className={`w-3 h-3 rounded-full ${
                    ratio.status === 'excellent' ? 'bg-green-500' :
                    ratio.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current:</span>
                    <span className="font-medium text-gray-900">{ratio.value}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target:</span>
                    <span className="text-sm text-gray-600">{ratio.target}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{ratio.description}</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">Comprehensive business intelligence and performance analytics</p>
        </div>

        {/* Controls */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={comparisonPeriod}
                onChange={(e) => setComparisonPeriod(e.target.value)}
              >
                <option value="previous">vs Previous Period</option>
                <option value="year">vs Same Period Last Year</option>
                <option value="target">vs Target</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export Report
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Schedule Report
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '📊' },
              { id: 'products', name: 'Products', icon: '📦' },
              { id: 'customers', name: 'Customers', icon: '👥' },
              { id: 'marketing', name: 'Marketing', icon: '📢' },
              { id: 'operations', name: 'Operations', icon: '⚙️' },
              { id: 'financials', name: 'Financials', icon: '💰' }
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'products' && renderProducts()}
        {activeTab === 'customers' && renderCustomers()}
        {activeTab === 'marketing' && renderMarketing()}
        {activeTab === 'operations' && renderOperations()}
        {activeTab === 'financials' && renderFinancials()}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

