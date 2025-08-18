import React, { useState, useEffect } from 'react';

const SalesModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [quotes, setQuotes] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [salesTeam, setSalesTeam] = useState([]);
  const [salesMetrics, setSalesMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for demonstration
  useEffect(() => {
    setTimeout(() => {
      setQuotes([
        {
          id: 1,
          quoteNumber: 'Q-2025-001',
          customer: 'Cannabis Co.',
          contact: 'Lisa Rodriguez',
          email: 'lisa@cannabisco.com',
          status: 'Sent',
          total: 5250.00,
          validUntil: '2025-08-25',
          createdDate: '2025-08-10',
          items: [
            { product: 'Premium OG Kush', quantity: 50, price: 45.00, total: 2250.00 },
            { product: 'Blue Dream', quantity: 75, price: 40.00, total: 3000.00 }
          ]
        },
        {
          id: 2,
          quoteNumber: 'Q-2025-002',
          customer: 'Green Valley',
          contact: 'Tom Wilson',
          email: 'tom@greenvalley.com',
          status: 'Accepted',
          total: 8750.00,
          validUntil: '2025-08-20',
          createdDate: '2025-08-08',
          items: [
            { product: 'Gummy Bears 10mg', quantity: 100, price: 25.00, total: 2500.00 },
            { product: 'Chocolate Bar 100mg', quantity: 150, price: 30.00, total: 4500.00 },
            { product: 'Live Resin Cartridge', quantity: 32, price: 55.00, total: 1760.00 }
          ]
        },
        {
          id: 3,
          quoteNumber: 'Q-2025-003',
          customer: 'Herb Haven',
          contact: 'Amy Davis',
          email: 'amy@herbhaven.com',
          status: 'Draft',
          total: 12500.00,
          validUntil: '2025-08-30',
          createdDate: '2025-08-12',
          items: [
            { product: 'Sour Diesel', quantity: 100, price: 42.00, total: 4200.00 },
            { product: 'Shatter - Wedding Cake', quantity: 80, price: 60.00, total: 4800.00 },
            { product: 'Glass Pipe', quantity: 100, price: 35.00, total: 3500.00 }
          ]
        }
      ]);

      setOpportunities([
        {
          id: 1,
          name: 'Q4 Bulk Supply Contract',
          customer: 'Cannabis Co.',
          value: 45000,
          stage: 'Proposal',
          probability: 75,
          closeDate: '2025-09-30',
          assignedTo: 'Sarah Johnson',
          lastActivity: '2025-08-10',
          nextAction: 'Follow up on proposal',
          products: ['Premium OG Kush', 'Blue Dream', 'Sour Diesel']
        },
        {
          id: 2,
          name: 'Monthly Edibles Supply',
          customer: 'Green Valley',
          value: 25000,
          stage: 'Negotiation',
          probability: 85,
          closeDate: '2025-08-25',
          assignedTo: 'Mike Chen',
          lastActivity: '2025-08-11',
          nextAction: 'Contract review meeting',
          products: ['Gummy Bears 10mg', 'Chocolate Bar 100mg']
        },
        {
          id: 3,
          name: 'Premium Product Line',
          customer: 'Herb Haven',
          value: 60000,
          stage: 'Qualified',
          probability: 60,
          closeDate: '2025-10-15',
          assignedTo: 'Sarah Johnson',
          lastActivity: '2025-08-09',
          nextAction: 'Product demonstration',
          products: ['Live Resin Cartridge', 'Shatter - Wedding Cake']
        }
      ]);

      setSalesTeam([
        {
          id: 1,
          name: 'Sarah Johnson',
          role: 'Senior Sales Rep',
          email: 'sarah.j@dankdash.com',
          phone: '(555) 123-4567',
          activeDeals: 8,
          pipelineValue: 125000,
          monthlyTarget: 50000,
          monthlyActual: 42000,
          conversionRate: 68,
          avgDealSize: 15625
        },
        {
          id: 2,
          name: 'Mike Chen',
          role: 'Sales Rep',
          email: 'mike.c@dankdash.com',
          phone: '(555) 987-6543',
          activeDeals: 6,
          pipelineValue: 85000,
          monthlyTarget: 40000,
          monthlyActual: 38500,
          conversionRate: 72,
          avgDealSize: 14167
        },
        {
          id: 3,
          name: 'Lisa Rodriguez',
          role: 'Sales Manager',
          email: 'lisa.r@dankdash.com',
          phone: '(555) 456-7890',
          activeDeals: 12,
          pipelineValue: 180000,
          monthlyTarget: 75000,
          monthlyActual: 68000,
          conversionRate: 75,
          avgDealSize: 15000
        }
      ]);

      setSalesMetrics({
        totalRevenue: 148500,
        monthlyGrowth: 12.5,
        totalDeals: 26,
        avgDealSize: 15000,
        conversionRate: 71.2,
        pipelineValue: 390000,
        forecastAccuracy: 89,
        salesCycle: 18
      });

      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'bg-gray-100 text-gray-800',
      'Sent': 'bg-blue-100 text-blue-800',
      'Accepted': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
      'Expired': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStageColor = (stage) => {
    const colors = {
      'Lead': 'bg-blue-100 text-blue-800',
      'Qualified': 'bg-yellow-100 text-yellow-800',
      'Proposal': 'bg-purple-100 text-purple-800',
      'Negotiation': 'bg-orange-100 text-orange-800',
      'Closed Won': 'bg-green-100 text-green-800',
      'Closed Lost': 'bg-red-100 text-red-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${salesMetrics.totalRevenue?.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{salesMetrics.monthlyGrowth}% from last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-semibold text-gray-900">${salesMetrics.pipelineValue?.toLocaleString()}</p>
              <p className="text-xs text-blue-600">{opportunities.length} active opportunities</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{salesMetrics.conversionRate}%</p>
              <p className="text-xs text-purple-600">Avg deal size: ${salesMetrics.avgDealSize?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Sales Cycle</p>
              <p className="text-2xl font-semibold text-gray-900">{salesMetrics.salesCycle} days</p>
              <p className="text-xs text-orange-600">{salesMetrics.forecastAccuracy}% forecast accuracy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Performance Chart */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sales Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Performance */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Monthly Performance</h4>
              <div className="space-y-3">
                {salesTeam.map((rep) => (
                  <div key={rep.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {rep.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{rep.name}</p>
                        <p className="text-xs text-gray-500">{rep.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        ${rep.monthlyActual.toLocaleString()} / ${rep.monthlyTarget.toLocaleString()}
                      </p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${Math.min((rep.monthlyActual / rep.monthlyTarget) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline Distribution */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Pipeline by Stage</h4>
              <div className="space-y-3">
                {['Qualified', 'Proposal', 'Negotiation'].map((stage) => {
                  const stageOpps = opportunities.filter(opp => opp.stage === stage);
                  const stageValue = stageOpps.reduce((sum, opp) => sum + opp.value, 0);
                  return (
                    <div key={stage} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(stage)}`}>
                          {stage}
                        </span>
                        <span className="ml-2 text-sm text-gray-600">({stageOpps.length})</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${stageValue.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuotes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search quotes..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Create Quote
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {quotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{quote.quoteNumber}</div>
                    <div className="text-sm text-gray-500">Created: {quote.createdDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{quote.customer}</div>
                    <div className="text-sm text-gray-500">{quote.contact}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${quote.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {quote.validUntil}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-purple-600 hover:text-purple-900">Send</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOpportunities = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Sales Opportunities</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Add Opportunity
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opportunity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {opportunities.map((opp) => (
              <tr key={opp.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{opp.name}</div>
                    <div className="text-sm text-gray-500">Assigned to: {opp.assignedTo}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {opp.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${opp.value.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(opp.stage)}`}>
                    {opp.stage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${opp.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{opp.probability}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {opp.closeDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-green-600 hover:text-green-900 mr-3">View</button>
                  <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button className="text-purple-600 hover:text-purple-900">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Sales Team Performance</h2>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {salesTeam.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-lg font-medium text-gray-600">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Monthly Target</span>
                <span className="text-sm font-medium text-gray-900">${member.monthlyTarget.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Monthly Actual</span>
                <span className="text-sm font-medium text-gray-900">${member.monthlyActual.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${Math.min((member.monthlyActual / member.monthlyTarget) * 100, 100)}%` }}
                ></div>
              </div>
              
              <div className="pt-2 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Active Deals</span>
                    <p className="font-medium text-gray-900">{member.activeDeals}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Pipeline Value</span>
                    <p className="font-medium text-gray-900">${member.pipelineValue.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Conversion Rate</span>
                    <p className="font-medium text-gray-900">{member.conversionRate}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg Deal Size</span>
                    <p className="font-medium text-gray-900">${member.avgDealSize.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
        <p className="mt-2 text-gray-600">Manage quotes, opportunities, and sales team performance</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'dashboard'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'quotes'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Quotes
          </button>
          <button
            onClick={() => setActiveTab('opportunities')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'opportunities'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Opportunities
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'team'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Team Performance
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'quotes' && renderQuotes()}
      {activeTab === 'opportunities' && renderOpportunities()}
      {activeTab === 'team' && renderTeam()}
    </div>
  );
};

export default SalesModule;

