import React, { useState, useEffect, useMemo } from 'react';

const EnhancedCRMModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingLead, setEditingLead] = useState(null);

  // Form states
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    source: 'Website',
    notes: '',
    // METRC Integration Fields
    metrcEnabled: false,
    metrcLicenseNumber: '',
    metrcFacilityName: '',
    businessType: 'Dispensary', // Dispensary, Distributor, Processor, Cultivator
    metrcState: 'OK',
    facilityAddress: '',
    facilityCity: '',
    facilityZip: '',
    contactPerson: '',
    contactTitle: ''
  });

  const [leadForm, setLeadForm] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    company: '',
    stage: 'New',
    value: '',
    probability: 25,
    source: 'Website',
    assignedTo: 'Sales Rep 1',
    nextAction: '',
    dueDate: '',
    notes: ''
  });

  // Initialize with data from localStorage and mock data
  useEffect(() => {
    // Load customers from localStorage (from sign up form)
    const savedCustomers = JSON.parse(localStorage.getItem('dankdash_customers') || '[]');
    
    // Default mock customers
    const mockCustomers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        company: 'Green Solutions',
        address: '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210',
        status: 'Active',
        totalOrders: 12,
        totalSpent: 2450.00,
        lastContact: '2025-08-10',
        source: 'Website',
        notes: 'VIP customer, prefers premium products',
        createdAt: '2024-01-15',
        // METRC Integration Fields
        metrcEnabled: false,
        metrcLicenseNumber: '',
        metrcFacilityName: '',
        businessType: 'Dispensary',
        metrcState: 'CA',
        facilityAddress: '',
        facilityCity: '',
        facilityZip: '',
        contactPerson: 'John Doe',
        contactTitle: 'Owner'
      },
      {
        id: 2,
        name: 'Sarah Johnson',
        email: 'sarah@dispensary.com',
        phone: '(555) 987-6543',
        company: 'City Dispensary',
        address: '456 Oak Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        status: 'Active',
        totalOrders: 8,
        totalSpent: 1890.00,
        lastContact: '2025-08-08',
        source: 'Referral',
        notes: 'Bulk orders, monthly delivery schedule',
        createdAt: '2024-02-20',
        // METRC Integration Fields
        metrcEnabled: true,
        metrcLicenseNumber: 'C11-0000123-LIC',
        metrcFacilityName: 'City Dispensary Main',
        businessType: 'Dispensary',
        metrcState: 'CA',
        facilityAddress: '456 Oak Ave',
        facilityCity: 'San Francisco',
        facilityZip: '94102',
        contactPerson: 'Sarah Johnson',
        contactTitle: 'Manager'
      },
      {
        id: 3,
        name: 'Mike Chen',
        email: 'mike@budstore.com',
        phone: '(555) 456-7890',
        company: 'Bud Store',
        address: '789 Pine St',
        city: 'San Diego',
        state: 'CA',
        zipCode: '92101',
        status: 'Inactive',
        totalOrders: 3,
        totalSpent: 450.00,
        lastContact: '2025-07-15',
        source: 'Social Media',
        notes: 'Interested in edibles, price-sensitive',
        createdAt: '2024-03-10',
        // METRC Integration Fields
        metrcEnabled: true,
        metrcLicenseNumber: 'C11-0000456-LIC',
        metrcFacilityName: 'Bud Store Downtown',
        businessType: 'Dispensary',
        metrcState: 'CA',
        facilityAddress: '789 Pine St',
        facilityCity: 'San Diego',
        facilityZip: '92101',
        contactPerson: 'Mike Chen',
        contactTitle: 'Owner'
      }
    ];
    
    // Combine saved customers with mock customers (avoid duplicates)
    const allCustomers = [...mockCustomers];
    savedCustomers.forEach(savedCustomer => {
      if (!allCustomers.find(c => c.email === savedCustomer.email)) {
        allCustomers.push({
          ...savedCustomer,
          totalOrders: savedCustomer.orders || 0,
          totalSpent: savedCustomer.total_spent || 0,
          lastContact: savedCustomer.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          createdAt: savedCustomer.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          address: '',
          city: '',
          state: '',
          zipCode: '',
          metrcEnabled: savedCustomer.metrc_enabled || false,
          metrcLicenseNumber: savedCustomer.metrc_license || '',
          metrcFacilityName: savedCustomer.metrc_facility || '',
          businessType: 'Dispensary',
          metrcState: savedCustomer.metrc_state || 'CA',
          facilityAddress: '',
          facilityCity: '',
          facilityZip: '',
          contactPerson: savedCustomer.name,
          contactTitle: 'Customer'
        });
      }
    });
    
    setCustomers(allCustomers);

    // Load leads from localStorage (from partner applications)
    const savedLeads = JSON.parse(localStorage.getItem('dankdash_leads') || '[]');
    
    // Default mock leads
    const mockLeads = [
      {
        id: 1,
        name: 'Cannabis Co.',
        contact: 'Lisa Rodriguez',
        email: 'lisa@cannabisco.com',
        phone: '(555) 111-2222',
        company: 'Cannabis Co.',
        stage: 'Qualified',
        value: 5000,
        probability: 75,
        source: 'Cold Call',
        assignedTo: 'Sales Rep 1',
        nextAction: 'Send proposal',
        dueDate: '2025-08-15',
        notes: 'Looking for wholesale pricing',
        createdAt: '2025-08-01'
      },
      {
        id: 2,
        name: 'Green Valley',
        contact: 'Tom Wilson',
        email: 'tom@greenvalley.com',
        phone: '(555) 333-4444',
        company: 'Green Valley Dispensary',
        stage: 'Proposal',
        value: 8500,
        probability: 60,
        source: 'Website',
        assignedTo: 'Sales Rep 2',
        nextAction: 'Follow up call',
        dueDate: '2025-08-12',
        notes: 'Interested in premium flower selection',
        createdAt: '2025-07-28'
      },
      {
        id: 3,
        name: 'Herb Haven',
        contact: 'Amy Davis',
        email: 'amy@herbhaven.com',
        phone: '(555) 555-6666',
        company: 'Herb Haven',
        stage: 'Negotiation',
        value: 12000,
        probability: 85,
        source: 'Referral',
        assignedTo: 'Sales Rep 1',
        nextAction: 'Contract review',
        dueDate: '2025-08-14',
        notes: 'Ready to sign, discussing payment terms',
        createdAt: '2025-07-25'
      }
    ];
    
    // Combine saved leads with mock leads (avoid duplicates)
    const allLeads = [...mockLeads];
    savedLeads.forEach(savedLead => {
      if (!allLeads.find(l => l.email === savedLead.email)) {
        allLeads.push({
          ...savedLead,
          value: parseInt(savedLead.value) || 0
        });
      }
    });
    
    setLeads(allLeads);

    setOpportunities([
      {
        id: 1,
        name: 'Q4 Expansion Deal',
        account: 'Green Solutions',
        value: 25000,
        stage: 'Proposal',
        probability: 70,
        closeDate: '2025-12-15',
        owner: 'Sales Rep 1'
      },
      {
        id: 2,
        name: 'Holiday Season Supply',
        account: 'City Dispensary',
        value: 15000,
        stage: 'Negotiation',
        probability: 80,
        closeDate: '2025-11-01',
        owner: 'Sales Rep 2'
      }
    ]);
  }, []);

  // Filter functions
  const filteredCustomers = useMemo(() => {
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leads, searchTerm]);

  // CRUD Operations
  const handleAddCustomer = () => {
    if (!customerForm.name || !customerForm.email) {
      alert('Please fill in required fields (Name and Email)');
      return;
    }

    const newCustomer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      ...customerForm,
      status: 'Active',
      totalOrders: 0,
      totalSpent: 0.00,
      lastContact: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCustomers([...customers, newCustomer]);
    setCustomerForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      source: 'Website',
      notes: ''
    });
    setShowAddCustomerModal(false);
    alert('Customer added successfully!');
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setCustomerForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      address: customer.address || '',
      city: customer.city || '',
      state: customer.state || '',
      zipCode: customer.zipCode || '',
      source: customer.source,
      notes: customer.notes || ''
    });
    setShowAddCustomerModal(true);
  };

  const handleUpdateCustomer = () => {
    if (!customerForm.name || !customerForm.email) {
      alert('Please fill in required fields (Name and Email)');
      return;
    }

    const updatedCustomers = customers.map(customer =>
      customer.id === editingCustomer.id
        ? { ...customer, ...customerForm }
        : customer
    );

    setCustomers(updatedCustomers);
    setEditingCustomer(null);
    setCustomerForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      source: 'Website',
      notes: ''
    });
    setShowAddCustomerModal(false);
    alert('Customer updated successfully!');
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      setCustomers(customers.filter(customer => customer.id !== customerId));
      alert('Customer deleted successfully!');
    }
  };

  const handleAddLead = () => {
    if (!leadForm.name || !leadForm.contact || !leadForm.email) {
      alert('Please fill in required fields (Name, Contact, and Email)');
      return;
    }

    const newLead = {
      id: Math.max(...leads.map(l => l.id), 0) + 1,
      ...leadForm,
      value: parseFloat(leadForm.value) || 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setLeads([...leads, newLead]);
    setLeadForm({
      name: '',
      contact: '',
      email: '',
      phone: '',
      company: '',
      stage: 'New',
      value: '',
      probability: 25,
      source: 'Website',
      assignedTo: 'Sales Rep 1',
      nextAction: '',
      dueDate: '',
      notes: ''
    });
    setShowAddLeadModal(false);
    alert('Lead added successfully!');
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setLeadForm({
      name: lead.name,
      contact: lead.contact,
      email: lead.email,
      phone: lead.phone,
      company: lead.company || '',
      stage: lead.stage,
      value: lead.value.toString(),
      probability: lead.probability,
      source: lead.source,
      assignedTo: lead.assignedTo,
      nextAction: lead.nextAction,
      dueDate: lead.dueDate,
      notes: lead.notes || ''
    });
    setShowAddLeadModal(true);
  };

  const handleUpdateLead = () => {
    if (!leadForm.name || !leadForm.contact || !leadForm.email) {
      alert('Please fill in required fields (Name, Contact, and Email)');
      return;
    }

    const updatedLeads = leads.map(lead =>
      lead.id === editingLead.id
        ? { ...lead, ...leadForm, value: parseFloat(leadForm.value) || 0 }
        : lead
    );

    setLeads(updatedLeads);
    setEditingLead(null);
    setLeadForm({
      name: '',
      contact: '',
      email: '',
      phone: '',
      company: '',
      stage: 'New',
      value: '',
      probability: 25,
      source: 'Website',
      assignedTo: 'Sales Rep 1',
      nextAction: '',
      dueDate: '',
      notes: ''
    });
    setShowAddLeadModal(false);
    alert('Lead updated successfully!');
  };

  const handleDeleteLead = (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== leadId));
      alert('Lead deleted successfully!');
    }
  };

  const handleConvertLead = (lead) => {
    if (window.confirm(`Convert lead "${lead.name}" to customer?`)) {
      const newCustomer = {
        id: Math.max(...customers.map(c => c.id), 0) + 1,
        name: lead.contact,
        email: lead.email,
        phone: lead.phone,
        company: lead.name,
        address: '',
        city: '',
        state: '',
        zipCode: '',
        status: 'Active',
        totalOrders: 0,
        totalSpent: 0.00,
        lastContact: new Date().toISOString().split('T')[0],
        source: lead.source,
        notes: `Converted from lead. Original value: $${lead.value}`,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setCustomers([...customers, newCustomer]);
      setLeads(leads.filter(l => l.id !== lead.id));
      alert('Lead converted to customer successfully!');
    }
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Qualified': return 'bg-green-100 text-green-800';
      case 'Proposal': return 'bg-yellow-100 text-yellow-800';
      case 'Negotiation': return 'bg-orange-100 text-orange-800';
      case 'Closed Won': return 'bg-green-100 text-green-800';
      case 'Closed Lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Dashboard calculations
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => l.stage === 'Qualified' || l.stage === 'Proposal' || l.stage === 'Negotiation').length;
  const pipelineValue = leads.reduce((sum, l) => sum + l.value, 0);
  const conversionRate = totalCustomers > 0 ? ((activeCustomers / totalCustomers) * 100).toFixed(1) : 0;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              <p className="text-sm text-blue-600">{activeCustomers} active</p>
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
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12% this month</p>
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
              <p className="text-sm font-medium text-gray-600">Active Leads</p>
              <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
              <p className="text-sm text-yellow-600">{qualifiedLeads} qualified</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-gray-900">${pipelineValue.toLocaleString()}</p>
              <p className="text-sm text-purple-600">{conversionRate}% conversion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">John Doe</span> placed a new order worth $450
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                New lead <span className="font-medium">Cannabis Co.</span> added to pipeline
              </p>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                Follow-up scheduled with <span className="font-medium">Green Valley</span>
              </p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowAddCustomerModal(true)}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.company}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{customer.email}</div>
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.totalOrders}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${customer.totalSpent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing customer: ${customer.name}`)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditCustomer(customer)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCustomer(customer.id)}
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

  const renderLeads = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Sales Pipeline</h2>
        <button 
          onClick={() => setShowAddLeadModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Add Lead
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Probability</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Action</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-500">Source: {lead.source}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{lead.contact}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStageColor(lead.stage)}`}>
                    {lead.stage}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${lead.value.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${lead.probability}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{lead.probability}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{lead.nextAction}</div>
                  <div className="text-sm text-gray-500">Due: {lead.dueDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing lead: ${lead.name}`)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditLead(lead)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleConvertLead(lead)}
                    className="text-purple-600 hover:text-purple-900 mr-3"
                  >
                    Convert
                  </button>
                  <button 
                    onClick={() => handleDeleteLead(lead.id)}
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

  // Customer Modal
  const CustomerModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name *</label>
              <input
                type="text"
                value={customerForm.name}
                onChange={(e) => setCustomerForm({...customerForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={customerForm.email}
                onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={customerForm.phone}
                onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Company</label>
              <input
                type="text"
                value={customerForm.company}
                onChange={(e) => setCustomerForm({...customerForm, company: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Source</label>
              <select
                value={customerForm.source}
                onChange={(e) => setCustomerForm({...customerForm, source: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Trade Show">Trade Show</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={customerForm.notes}
                onChange={(e) => setCustomerForm({...customerForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            {/* METRC Integration Section */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">METRC Integration</h4>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customerForm.metrcEnabled}
                    onChange={(e) => setCustomerForm({...customerForm, metrcEnabled: e.target.checked})}
                    className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="text-sm font-medium text-gray-700">Enable METRC Compliance</span>
                </label>
              </div>
              
              {customerForm.metrcEnabled && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">METRC License Number *</label>
                      <input
                        type="text"
                        value={customerForm.metrcLicenseNumber}
                        onChange={(e) => setCustomerForm({...customerForm, metrcLicenseNumber: e.target.value})}
                        placeholder="e.g., C11-0000123-LIC"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Business Type</label>
                      <select
                        value={customerForm.businessType}
                        onChange={(e) => setCustomerForm({...customerForm, businessType: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="Dispensary">Dispensary</option>
                        <option value="Distributor">Distributor</option>
                        <option value="Processor">Processor</option>
                        <option value="Cultivator">Cultivator</option>
                        <option value="Testing Lab">Testing Lab</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">METRC Facility Name</label>
                      <input
                        type="text"
                        value={customerForm.metrcFacilityName}
                        onChange={(e) => setCustomerForm({...customerForm, metrcFacilityName: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">METRC State</label>
                      <select
                        value={customerForm.metrcState}
                        onChange={(e) => setCustomerForm({...customerForm, metrcState: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="OK">Oklahoma</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="OR">Oregon</option>
                        <option value="WA">Washington</option>
                        <option value="NV">Nevada</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Facility Address</label>
                    <input
                      type="text"
                      value={customerForm.facilityAddress}
                      onChange={(e) => setCustomerForm({...customerForm, facilityAddress: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Facility City</label>
                      <input
                        type="text"
                        value={customerForm.facilityCity}
                        onChange={(e) => setCustomerForm({...customerForm, facilityCity: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Facility ZIP</label>
                      <input
                        type="text"
                        value={customerForm.facilityZip}
                        onChange={(e) => setCustomerForm({...customerForm, facilityZip: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                      <input
                        type="text"
                        value={customerForm.contactPerson}
                        onChange={(e) => setCustomerForm({...customerForm, contactPerson: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Title</label>
                      <input
                        type="text"
                        value={customerForm.contactTitle}
                        onChange={(e) => setCustomerForm({...customerForm, contactTitle: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowAddCustomerModal(false);
                setEditingCustomer(null);
                setCustomerForm({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  address: '',
                  city: '',
                  state: '',
                  zipCode: '',
                  source: 'Website',
                  notes: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editingCustomer ? 'Update' : 'Add'} Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Lead Modal
  const LeadModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingLead ? 'Edit Lead' : 'Add New Lead'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name *</label>
              <input
                type="text"
                value={leadForm.name}
                onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person *</label>
              <input
                type="text"
                value={leadForm.contact}
                onChange={(e) => setLeadForm({...leadForm, contact: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={leadForm.email}
                onChange={(e) => setLeadForm({...leadForm, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={leadForm.phone}
                onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stage</label>
              <select
                value={leadForm.stage}
                onChange={(e) => setLeadForm({...leadForm, stage: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="New">New</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal">Proposal</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estimated Value ($)</label>
              <input
                type="number"
                value={leadForm.value}
                onChange={(e) => setLeadForm({...leadForm, value: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Probability (%)</label>
              <input
                type="range"
                min="0"
                max="100"
                value={leadForm.probability}
                onChange={(e) => setLeadForm({...leadForm, probability: parseInt(e.target.value)})}
                className="mt-1 block w-full"
              />
              <div className="text-center text-sm text-gray-600">{leadForm.probability}%</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Next Action</label>
              <input
                type="text"
                value={leadForm.nextAction}
                onChange={(e) => setLeadForm({...leadForm, nextAction: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={leadForm.dueDate}
                onChange={(e) => setLeadForm({...leadForm, dueDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowAddLeadModal(false);
                setEditingLead(null);
                setLeadForm({
                  name: '',
                  contact: '',
                  email: '',
                  phone: '',
                  company: '',
                  stage: 'New',
                  value: '',
                  probability: 25,
                  source: 'Website',
                  assignedTo: 'Sales Rep 1',
                  nextAction: '',
                  dueDate: '',
                  notes: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingLead ? handleUpdateLead : handleAddLead}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editingLead ? 'Update' : 'Add'} Lead
            </button>
          </div>
        </div>
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
        <h1 className="text-3xl font-bold text-gray-900">Customer Relationship Management</h1>
        <p className="mt-2 text-gray-600">Manage your customer relationships, leads, and sales pipeline</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'customers', name: 'Customers', icon: '👥' },
            { id: 'leads', name: 'Leads', icon: '🎯' },
            { id: 'opportunities', name: 'Opportunities', icon: '💰' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
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
      {activeTab === 'customers' && renderCustomers()}
      {activeTab === 'leads' && renderLeads()}
      {activeTab === 'opportunities' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Opportunities</h3>
          <p className="text-gray-600">Opportunity management coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showAddCustomerModal && <CustomerModal />}
      {showAddLeadModal && <LeadModal />}
    </div>
  );
};

export default EnhancedCRMModule;

