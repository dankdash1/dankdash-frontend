import React, { useState, useEffect, useMemo } from 'react';

const EnhancedSalesModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deals, setDeals] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [salesTeam, setSalesTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState(null);
  const [editingQuote, setEditingQuote] = useState(null);

  // Form states
  const [dealForm, setDealForm] = useState({
    name: '',
    customer: '',
    contact: '',
    email: '',
    phone: '',
    value: '',
    stage: 'Prospecting',
    probability: 25,
    closeDate: '',
    assignedTo: 'Sales Rep 1',
    source: 'Website',
    description: '',
    products: []
  });

  const [quoteForm, setQuoteForm] = useState({
    customer: '',
    contact: '',
    email: '',
    validUntil: '',
    items: [{ product: '', quantity: 1, price: 0, total: 0 }],
    notes: '',
    terms: 'Net 30 days',
    isMetrcSale: false, // METRC OMMA Sale toggle
    metrcManifest: null // Will be populated when METRC sale is created
  });

  // Initialize with mock data
  useEffect(() => {
    setDeals([
      {
        id: 1,
        name: 'Q4 Bulk Supply Contract',
        customer: 'Cannabis Co.',
        contact: 'Lisa Rodriguez',
        email: 'lisa@cannabisco.com',
        phone: '(555) 111-2222',
        value: 45000,
        stage: 'Proposal',
        probability: 75,
        closeDate: '2025-09-30',
        assignedTo: 'Sarah Johnson',
        source: 'Cold Call',
        description: 'Large bulk supply contract for Q4 inventory',
        products: ['Premium OG Kush', 'Blue Dream', 'Sour Diesel'],
        createdAt: '2025-08-01',
        lastActivity: '2025-08-10',
        nextAction: 'Follow up on proposal'
      },
      {
        id: 2,
        name: 'Monthly Edibles Supply',
        customer: 'Green Valley',
        contact: 'Tom Wilson',
        email: 'tom@greenvalley.com',
        phone: '(555) 333-4444',
        value: 25000,
        stage: 'Negotiation',
        probability: 85,
        closeDate: '2025-08-25',
        assignedTo: 'Mike Chen',
        source: 'Website',
        description: 'Monthly recurring edibles supply agreement',
        products: ['Gummy Bears 10mg', 'Chocolate Bar 100mg'],
        createdAt: '2025-07-28',
        lastActivity: '2025-08-11',
        nextAction: 'Contract review meeting'
      },
      {
        id: 3,
        name: 'Premium Product Line',
        customer: 'Herb Haven',
        contact: 'Amy Davis',
        email: 'amy@herbhaven.com',
        phone: '(555) 555-6666',
        value: 60000,
        stage: 'Qualified',
        probability: 60,
        closeDate: '2025-10-15',
        assignedTo: 'Sarah Johnson',
        source: 'Referral',
        description: 'Premium product line introduction',
        products: ['Live Resin', 'Hash Rosin', 'Premium Flower'],
        createdAt: '2025-07-25',
        lastActivity: '2025-08-09',
        nextAction: 'Product demonstration'
      }
    ]);

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
        terms: 'Net 30 days',
        notes: 'Bulk pricing applied',
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
        terms: 'Net 15 days',
        notes: 'Preferred customer pricing',
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
        terms: 'Net 30 days',
        notes: 'Premium product selection',
        items: [
          { product: 'Sour Diesel', quantity: 100, price: 42.00, total: 4200.00 },
          { product: 'Shatter - Wedding Cake', quantity: 80, price: 60.00, total: 4800.00 },
          { product: 'Glass Pipe', quantity: 100, price: 35.00, total: 3500.00 }
        ]
      }
    ]);

    setSalesTeam([
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Senior Sales Rep',
        email: 'sarah@dankdash.com',
        phone: '(555) 123-4567',
        activeDeals: 8,
        totalValue: 125000,
        closedDeals: 15,
        conversionRate: 68
      },
      {
        id: 2,
        name: 'Mike Chen',
        role: 'Sales Rep',
        email: 'mike@dankdash.com',
        phone: '(555) 987-6543',
        activeDeals: 5,
        totalValue: 85000,
        closedDeals: 12,
        conversionRate: 72
      },
      {
        id: 3,
        name: 'Lisa Rodriguez',
        role: 'Sales Manager',
        email: 'lisa@dankdash.com',
        phone: '(555) 456-7890',
        activeDeals: 12,
        totalValue: 200000,
        closedDeals: 25,
        conversionRate: 75
      }
    ]);
  }, []);

  // Filter functions
  const filteredDeals = useMemo(() => {
    return deals.filter(deal =>
      deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [deals, searchTerm]);

  const filteredQuotes = useMemo(() => {
    return quotes.filter(quote =>
      quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [quotes, searchTerm]);

  // CRUD Operations for Deals
  const handleAddDeal = () => {
    if (!dealForm.name || !dealForm.customer || !dealForm.contact) {
      alert('Please fill in required fields (Name, Customer, and Contact)');
      return;
    }

    const newDeal = {
      id: Math.max(...deals.map(d => d.id), 0) + 1,
      ...dealForm,
      value: parseFloat(dealForm.value) || 0,
      createdAt: new Date().toISOString().split('T')[0],
      lastActivity: new Date().toISOString().split('T')[0],
      nextAction: 'Initial contact'
    };

    setDeals([...deals, newDeal]);
    setDealForm({
      name: '',
      customer: '',
      contact: '',
      email: '',
      phone: '',
      value: '',
      stage: 'Prospecting',
      probability: 25,
      closeDate: '',
      assignedTo: 'Sales Rep 1',
      source: 'Website',
      description: '',
      products: []
    });
    setShowAddDealModal(false);
    alert('Deal created successfully!');
  };

  const handleEditDeal = (deal) => {
    setEditingDeal(deal);
    setDealForm({
      name: deal.name,
      customer: deal.customer,
      contact: deal.contact,
      email: deal.email,
      phone: deal.phone,
      value: deal.value.toString(),
      stage: deal.stage,
      probability: deal.probability,
      closeDate: deal.closeDate,
      assignedTo: deal.assignedTo,
      source: deal.source,
      description: deal.description,
      products: deal.products || []
    });
    setShowAddDealModal(true);
  };

  const handleUpdateDeal = () => {
    if (!dealForm.name || !dealForm.customer || !dealForm.contact) {
      alert('Please fill in required fields (Name, Customer, and Contact)');
      return;
    }

    const updatedDeals = deals.map(deal =>
      deal.id === editingDeal.id
        ? { ...deal, ...dealForm, value: parseFloat(dealForm.value) || 0 }
        : deal
    );

    setDeals(updatedDeals);
    setEditingDeal(null);
    setDealForm({
      name: '',
      customer: '',
      contact: '',
      email: '',
      phone: '',
      value: '',
      stage: 'Prospecting',
      probability: 25,
      closeDate: '',
      assignedTo: 'Sales Rep 1',
      source: 'Website',
      description: '',
      products: []
    });
    setShowAddDealModal(false);
    alert('Deal updated successfully!');
  };

  const handleDeleteDeal = (dealId) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      setDeals(deals.filter(deal => deal.id !== dealId));
      alert('Deal deleted successfully!');
    }
  };

  const handleMoveDealStage = (dealId, newStage) => {
    const updatedDeals = deals.map(deal => {
      if (deal.id === dealId) {
        let newProbability = deal.probability;
        switch (newStage) {
          case 'Prospecting': newProbability = 25; break;
          case 'Qualified': newProbability = 50; break;
          case 'Proposal': newProbability = 75; break;
          case 'Negotiation': newProbability = 85; break;
          case 'Closed Won': newProbability = 100; break;
          case 'Closed Lost': newProbability = 0; break;
        }
        return { ...deal, stage: newStage, probability: newProbability };
      }
      return deal;
    });
    setDeals(updatedDeals);
    alert(`Deal moved to ${newStage} stage!`);
  };

  // CRUD Operations for Quotes
  const handleAddQuote = () => {
    if (!quoteForm.customer || !quoteForm.contact || !quoteForm.email) {
      alert('Please fill in required fields (Customer, Contact, and Email)');
      return;
    }

    const total = quoteForm.items.reduce((sum, item) => sum + item.total, 0);
    const newQuote = {
      id: Math.max(...quotes.map(q => q.id), 0) + 1,
      quoteNumber: `Q-2025-${String(Math.max(...quotes.map(q => q.id), 0) + 1).padStart(3, '0')}`,
      ...quoteForm,
      status: 'Draft',
      total: total,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setQuotes([...quotes, newQuote]);
    setQuoteForm({
      customer: '',
      contact: '',
      email: '',
      validUntil: '',
      items: [{ product: '', quantity: 1, price: 0, total: 0 }],
      notes: '',
      terms: 'Net 30 days'
    });
    setShowAddQuoteModal(false);
    alert('Quote created successfully!');
  };

  const handleEditQuote = (quote) => {
    setEditingQuote(quote);
    setQuoteForm({
      customer: quote.customer,
      contact: quote.contact,
      email: quote.email,
      validUntil: quote.validUntil,
      items: quote.items,
      notes: quote.notes,
      terms: quote.terms
    });
    setShowAddQuoteModal(true);
  };

  const handleUpdateQuote = () => {
    if (!quoteForm.customer || !quoteForm.contact || !quoteForm.email) {
      alert('Please fill in required fields (Customer, Contact, and Email)');
      return;
    }

    const total = quoteForm.items.reduce((sum, item) => sum + item.total, 0);
    const updatedQuotes = quotes.map(quote =>
      quote.id === editingQuote.id
        ? { ...quote, ...quoteForm, total: total }
        : quote
    );

    setQuotes(updatedQuotes);
    setEditingQuote(null);
    setQuoteForm({
      customer: '',
      contact: '',
      email: '',
      validUntil: '',
      items: [{ product: '', quantity: 1, price: 0, total: 0 }],
      notes: '',
      terms: 'Net 30 days'
    });
    setShowAddQuoteModal(false);
    alert('Quote updated successfully!');
  };

  const handleDeleteQuote = (quoteId) => {
    if (window.confirm('Are you sure you want to delete this quote?')) {
      setQuotes(quotes.filter(quote => quote.id !== quoteId));
      alert('Quote deleted successfully!');
    }
  };

  const handleSendQuote = (quoteId) => {
    const updatedQuotes = quotes.map(quote =>
      quote.id === quoteId ? { ...quote, status: 'Sent' } : quote
    );
    setQuotes(updatedQuotes);
    alert('Quote sent to customer!');
  };

  const handleConvertQuoteToDeal = (quote) => {
    if (window.confirm(`Convert quote "${quote.quoteNumber}" to deal?`)) {
      const newDeal = {
        id: Math.max(...deals.map(d => d.id), 0) + 1,
        name: `Deal from ${quote.quoteNumber}`,
        customer: quote.customer,
        contact: quote.contact,
        email: quote.email,
        phone: '',
        value: quote.total,
        stage: 'Proposal',
        probability: 75,
        closeDate: '',
        assignedTo: 'Sales Rep 1',
        source: 'Quote',
        description: `Converted from quote ${quote.quoteNumber}`,
        products: quote.items.map(item => item.product),
        createdAt: new Date().toISOString().split('T')[0],
        lastActivity: new Date().toISOString().split('T')[0],
        nextAction: 'Follow up on quote'
      };

      setDeals([...deals, newDeal]);
      
      // Update quote status
      const updatedQuotes = quotes.map(q =>
        q.id === quote.id ? { ...q, status: 'Converted' } : q
      );
      setQuotes(updatedQuotes);
      
      alert('Quote converted to deal successfully!');
    }
  };

  // Quote item management
  const addQuoteItem = () => {
    setQuoteForm({
      ...quoteForm,
      items: [...quoteForm.items, { product: '', quantity: 1, price: 0, total: 0 }]
    });
  };

  const removeQuoteItem = (index) => {
    const newItems = quoteForm.items.filter((_, i) => i !== index);
    setQuoteForm({ ...quoteForm, items: newItems });
  };

  const updateQuoteItem = (index, field, value) => {
    const newItems = [...quoteForm.items];
    newItems[index][field] = value;
    
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    
    setQuoteForm({ ...quoteForm, items: newItems });
  };

  // Utility functions
  const getStageColor = (stage) => {
    switch (stage) {
      case 'Prospecting': return 'bg-gray-100 text-gray-800';
      case 'Qualified': return 'bg-blue-100 text-blue-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Closed Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQuoteStatusColor = (status) => {
    switch (status) {
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Accepted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-yellow-100 text-yellow-800';
      case 'Converted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Dashboard calculations
  const totalDeals = deals.length;
  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const avgDealSize = totalDeals > 0 ? totalPipelineValue / totalDeals : 0;
  const wonDeals = deals.filter(d => d.stage === 'Closed Won').length;
  const conversionRate = totalDeals > 0 ? ((wonDeals / totalDeals) * 100).toFixed(1) : 0;
  const totalQuotes = quotes.length;
  const sentQuotes = quotes.filter(q => q.status === 'Sent').length;
  const acceptedQuotes = quotes.filter(q => q.status === 'Accepted').length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
              <p className="text-2xl font-bold text-gray-900">${totalPipelineValue.toLocaleString()}</p>
              <p className="text-sm text-blue-600">{totalDeals} active deals</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
              <p className="text-2xl font-bold text-gray-900">${avgDealSize.toLocaleString()}</p>
              <p className="text-sm text-green-600">+15% vs last month</p>
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
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{conversionRate}%</p>
              <p className="text-sm text-yellow-600">{wonDeals} deals won</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Quotes</p>
              <p className="text-2xl font-bold text-gray-900">{totalQuotes}</p>
              <p className="text-sm text-purple-600">{acceptedQuotes} accepted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Pipeline by Stage */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sales Pipeline by Stage</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Prospecting', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'].map((stage) => {
              const stageDeals = deals.filter(deal => deal.stage === stage);
              const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
              return (
                <div key={stage} className="text-center">
                  <div className={`p-4 rounded-lg ${getStageColor(stage)}`}>
                    <div className="text-2xl font-bold">{stageDeals.length}</div>
                    <div className="text-sm font-medium">{stage}</div>
                    <div className="text-xs mt-1">${stageValue.toLocaleString()}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Sales Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Q4 Bulk Supply Contract</span> moved to Proposal stage
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                New quote <span className="font-medium">Q-2025-003</span> created for Herb Haven
              </p>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Monthly Edibles Supply</span> deal updated
              </p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeals = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search deals..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowAddDealModal(true)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Deal
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDeals.map((deal) => (
              <tr key={deal.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{deal.name}</div>
                    <div className="text-sm text-gray-500">Assigned to: {deal.assignedTo}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{deal.customer}</div>
                  <div className="text-sm text-gray-500">{deal.contact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${deal.value.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(deal.stage)}`}>
                    {deal.stage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${deal.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{deal.probability}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {deal.closeDate || 'Not set'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing deal: ${deal.name}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditDeal(deal)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  <select
                    value={deal.stage}
                    onChange={(e) => handleMoveDealStage(deal.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 mr-3"
                  >
                    <option value="Prospecting">Prospecting</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Closed Won">Closed Won</option>
                    <option value="Closed Lost">Closed Lost</option>
                  </select>
                  <button 
                    onClick={() => handleDeleteDeal(deal.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowAddQuoteModal(true)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Quote
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote #</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Until</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredQuotes.map((quote) => (
              <tr key={quote.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{quote.quoteNumber}</div>
                  <div className="text-sm text-gray-500">Created: {quote.createdDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{quote.customer}</div>
                  <div className="text-sm text-gray-500">{quote.contact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${quote.total.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getQuoteStatusColor(quote.status)}`}>
                    {quote.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {quote.validUntil}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing quote: ${quote.quoteNumber}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditQuote(quote)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  {quote.status === 'Draft' && (
                    <button 
                      onClick={() => handleSendQuote(quote.id)}
                      className="text-purple-600 hover:text-purple-900 mr-3"
                    >
                      Send
                    </button>
                  )}
                  {(quote.status === 'Sent' || quote.status === 'Accepted') && (
                    <button 
                      onClick={() => handleConvertQuoteToDeal(quote)}
                      className="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      Convert
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteQuote(quote.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Deal Modal
  const DealModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingDeal ? 'Edit Deal' : 'Create New Deal'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Deal Name *</label>
              <input
                type="text"
                value={dealForm.name}
                onChange={(e) => setDealForm({...dealForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer *</label>
              <input
                type="text"
                value={dealForm.customer}
                onChange={(e) => setDealForm({...dealForm, customer: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person *</label>
              <input
                type="text"
                value={dealForm.contact}
                onChange={(e) => setDealForm({...dealForm, contact: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={dealForm.email}
                onChange={(e) => setDealForm({...dealForm, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Deal Value ($)</label>
              <input
                type="number"
                value={dealForm.value}
                onChange={(e) => setDealForm({...dealForm, value: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stage</label>
              <select
                value={dealForm.stage}
                onChange={(e) => setDealForm({...dealForm, stage: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Prospecting">Prospecting</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Close Date</label>
              <input
                type="date"
                value={dealForm.closeDate}
                onChange={(e) => setDealForm({...dealForm, closeDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
              <select
                value={dealForm.assignedTo}
                onChange={(e) => setDealForm({...dealForm, assignedTo: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Sales Rep 1">Sales Rep 1</option>
                <option value="Sales Rep 2">Sales Rep 2</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
                <option value="Mike Chen">Mike Chen</option>
                <option value="Lisa Rodriguez">Lisa Rodriguez</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={dealForm.description}
                onChange={(e) => setDealForm({...dealForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowAddDealModal(false);
                setEditingDeal(null);
                setDealForm({
                  name: '',
                  customer: '',
                  contact: '',
                  email: '',
                  phone: '',
                  value: '',
                  stage: 'Prospecting',
                  probability: 25,
                  closeDate: '',
                  assignedTo: 'Sales Rep 1',
                  source: 'Website',
                  description: '',
                  products: []
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingDeal ? handleUpdateDeal : handleAddDeal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingDeal ? 'Update' : 'Create'} Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Quote Modal
  const QuoteModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingQuote ? 'Edit Quote' : 'Create New Quote'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer *</label>
              <input
                type="text"
                value={quoteForm.customer}
                onChange={(e) => setQuoteForm({...quoteForm, customer: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person *</label>
              <input
                type="text"
                value={quoteForm.contact}
                onChange={(e) => setQuoteForm({...quoteForm, contact: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={quoteForm.email}
                onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valid Until</label>
              <input
                type="date"
                value={quoteForm.validUntil}
                onChange={(e) => setQuoteForm({...quoteForm, validUntil: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Quote Items */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900">Quote Items</h4>
              <button
                onClick={addQuoteItem}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
            <div className="space-y-3">
              {quoteForm.items.map((item, index) => (
                <div key={index} className="grid grid-cols-5 gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Product"
                    value={item.product}
                    onChange={(e) => updateQuoteItem(index, 'product', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateQuoteItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => updateQuoteItem(index, 'price', parseFloat(e.target.value) || 0)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                    ${item.total.toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeQuoteItem(index)}
                    className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <span className="text-lg font-bold">
                Total: ${quoteForm.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Terms</label>
              <select
                value={quoteForm.terms}
                onChange={(e) => setQuoteForm({...quoteForm, terms: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Net 15 days">Net 15 days</option>
                <option value="Net 30 days">Net 30 days</option>
                <option value="Net 60 days">Net 60 days</option>
                <option value="Due on receipt">Due on receipt</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={quoteForm.notes}
                onChange={(e) => setQuoteForm({...quoteForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowAddQuoteModal(false);
                setEditingQuote(null);
                setQuoteForm({
                  customer: '',
                  contact: '',
                  email: '',
                  validUntil: '',
                  items: [{ product: '', quantity: 1, price: 0, total: 0 }],
                  notes: '',
                  terms: 'Net 30 days'
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingQuote ? handleUpdateQuote : handleAddQuote}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingQuote ? 'Update' : 'Create'} Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
        <p className="mt-2 text-gray-600">Manage your sales pipeline, deals, quotes, and team performance</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'deals', name: 'Deals', icon: '🤝' },
            { id: 'quotes', name: 'Quotes', icon: '📄' },
            { id: 'team', name: 'Sales Team', icon: '👥' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'deals' && renderDeals()}
      {activeTab === 'quotes' && renderQuotes()}
      {activeTab === 'team' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Sales Team</h3>
          <p className="text-gray-600">Team management coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showAddDealModal && <DealModal />}
      {showAddQuoteModal && <QuoteModal />}
    </div>
  );
};

export default EnhancedSalesModule;

