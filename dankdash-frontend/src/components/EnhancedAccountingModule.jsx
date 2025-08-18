import React, { useState, useEffect, useMemo } from 'react';

const EnhancedAccountingModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Form states
  const [invoiceForm, setInvoiceForm] = useState({
    customer: '',
    customerEmail: '',
    dueDate: '',
    terms: 'Net 30',
    notes: '',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
  });

  const [expenseForm, setExpenseForm] = useState({
    description: '',
    category: 'Inventory',
    amount: '',
    date: '',
    vendor: '',
    notes: '',
    receipt: false
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    method: 'Credit Card',
    reference: '',
    date: '',
    notes: ''
  });

  // Mock financial data
  const [financialData, setFinancialData] = useState({
    revenue: {
      total: 148500,
      growth: 12.5,
      monthly: [
        { month: 'Jan', amount: 125000 },
        { month: 'Feb', amount: 132000 },
        { month: 'Mar', amount: 128000 },
        { month: 'Apr', amount: 145000 },
        { month: 'May', amount: 138000 },
        { month: 'Jun', amount: 152000 },
        { month: 'Jul', amount: 148500 }
      ]
    },
    expenses: {
      total: 89200,
      growth: -5.2,
      categories: [
        { name: 'Inventory', amount: 45000, percentage: 50.4 },
        { name: 'Salaries', amount: 18000, percentage: 20.2 },
        { name: 'Marketing', amount: 8500, percentage: 9.5 },
        { name: 'Rent', amount: 6000, percentage: 6.7 },
        { name: 'Utilities', amount: 3200, percentage: 3.6 },
        { name: 'Other', amount: 8500, percentage: 9.5 }
      ]
    },
    profit: {
      gross: 59300,
      net: 52100,
      margin: 35.1
    }
  });

  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2024-001',
      customer: 'Green Solutions',
      customerEmail: 'billing@greensolutions.com',
      amount: 2450.00,
      status: 'Paid',
      dueDate: '2024-08-15',
      issueDate: '2024-08-01',
      terms: 'Net 30',
      notes: 'Bulk order discount applied',
      items: [
        { description: 'Premium OG Kush', quantity: 50, rate: 45.00, amount: 2250.00 },
        { description: 'Processing Fee', quantity: 1, rate: 200.00, amount: 200.00 }
      ],
      payments: [
        { date: '2024-08-14', amount: 2450.00, method: 'Bank Transfer', reference: 'TXN-001' }
      ]
    },
    {
      id: 'INV-2024-002',
      customer: 'City Dispensary',
      customerEmail: 'accounts@citydispensary.com',
      amount: 3200.00,
      status: 'Pending',
      dueDate: '2024-08-20',
      issueDate: '2024-08-05',
      terms: 'Net 15',
      notes: 'Preferred customer pricing',
      items: [
        { description: 'Blue Dream', quantity: 80, rate: 40.00, amount: 3200.00 }
      ],
      payments: []
    },
    {
      id: 'INV-2024-003',
      customer: 'Bud Store',
      customerEmail: 'finance@budstore.com',
      amount: 1850.00,
      status: 'Overdue',
      dueDate: '2024-08-10',
      issueDate: '2024-07-25',
      terms: 'Net 30',
      notes: 'Follow up required',
      items: [
        { description: 'Sour Diesel', quantity: 25, rate: 42.00, amount: 1050.00 },
        { description: 'Glass Pipes', quantity: 20, rate: 40.00, amount: 800.00 }
      ],
      payments: []
    },
    {
      id: 'INV-2024-004',
      customer: 'Cannabis Co.',
      customerEmail: 'billing@cannabisco.com',
      amount: 4100.00,
      status: 'Draft',
      dueDate: '2024-08-25',
      issueDate: '2024-08-12',
      terms: 'Net 30',
      notes: 'Awaiting approval',
      items: [
        { description: 'Live Resin Cartridges', quantity: 100, rate: 35.00, amount: 3500.00 },
        { description: 'Shipping', quantity: 1, rate: 600.00, amount: 600.00 }
      ],
      payments: []
    }
  ]);

  const [expenses, setExpenses] = useState([
    {
      id: 'EXP-2024-001',
      description: 'Premium OG Kush - Bulk Purchase',
      category: 'Inventory',
      amount: 15000.00,
      date: '2024-08-10',
      vendor: 'Green Valley Farms',
      status: 'Approved',
      receipt: true,
      notes: 'Wholesale pricing negotiated'
    },
    {
      id: 'EXP-2024-002',
      description: 'Monthly Rent - Warehouse A',
      category: 'Rent',
      amount: 3000.00,
      date: '2024-08-01',
      vendor: 'Property Management Co.',
      status: 'Paid',
      receipt: true,
      notes: 'Monthly facility rent'
    },
    {
      id: 'EXP-2024-003',
      description: 'Digital Marketing Campaign',
      category: 'Marketing',
      amount: 2500.00,
      date: '2024-08-08',
      vendor: 'Digital Agency Pro',
      status: 'Pending',
      receipt: false,
      notes: 'Q3 social media campaign'
    },
    {
      id: 'EXP-2024-004',
      description: 'Electricity Bill - July',
      category: 'Utilities',
      amount: 850.00,
      date: '2024-08-05',
      vendor: 'Power Company',
      status: 'Paid',
      receipt: true,
      notes: 'Monthly utility payment'
    }
  ]);

  // Filter functions
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice =>
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [invoices, searchTerm]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense =>
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [expenses, searchTerm]);

  // Invoice CRUD Operations
  const handleAddInvoice = () => {
    if (!invoiceForm.customer || !invoiceForm.customerEmail || invoiceForm.items.length === 0) {
      alert('Please fill in required fields (Customer, Email, and at least one item)');
      return;
    }

    const total = invoiceForm.items.reduce((sum, item) => sum + item.amount, 0);
    const newInvoice = {
      id: `INV-2024-${String(invoices.length + 1).padStart(3, '0')}`,
      ...invoiceForm,
      amount: total,
      status: 'Draft',
      issueDate: new Date().toISOString().split('T')[0],
      payments: []
    };

    setInvoices([...invoices, newInvoice]);
    setInvoiceForm({
      customer: '',
      customerEmail: '',
      dueDate: '',
      terms: 'Net 30',
      notes: '',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
    });
    setShowAddInvoiceModal(false);
    alert('Invoice created successfully!');
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setInvoiceForm({
      customer: invoice.customer,
      customerEmail: invoice.customerEmail,
      dueDate: invoice.dueDate,
      terms: invoice.terms,
      notes: invoice.notes,
      items: invoice.items
    });
    setShowAddInvoiceModal(true);
  };

  const handleUpdateInvoice = () => {
    if (!invoiceForm.customer || !invoiceForm.customerEmail || invoiceForm.items.length === 0) {
      alert('Please fill in required fields (Customer, Email, and at least one item)');
      return;
    }

    const total = invoiceForm.items.reduce((sum, item) => sum + item.amount, 0);
    const updatedInvoices = invoices.map(invoice =>
      invoice.id === editingInvoice.id
        ? { ...invoice, ...invoiceForm, amount: total }
        : invoice
    );

    setInvoices(updatedInvoices);
    setEditingInvoice(null);
    setInvoiceForm({
      customer: '',
      customerEmail: '',
      dueDate: '',
      terms: 'Net 30',
      notes: '',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
    });
    setShowAddInvoiceModal(false);
    alert('Invoice updated successfully!');
  };

  const handleDeleteInvoice = (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(invoices.filter(invoice => invoice.id !== invoiceId));
      alert('Invoice deleted successfully!');
    }
  };

  const handleSendInvoice = (invoiceId) => {
    const updatedInvoices = invoices.map(invoice =>
      invoice.id === invoiceId ? { ...invoice, status: 'Pending' } : invoice
    );
    setInvoices(updatedInvoices);
    alert('Invoice sent to customer!');
  };

  const handleProcessPayment = () => {
    if (!paymentForm.amount || !paymentForm.date) {
      alert('Please fill in required fields (Amount and Date)');
      return;
    }

    const payment = {
      date: paymentForm.date,
      amount: parseFloat(paymentForm.amount),
      method: paymentForm.method,
      reference: paymentForm.reference,
      notes: paymentForm.notes
    };

    const updatedInvoices = invoices.map(invoice => {
      if (invoice.id === selectedInvoice.id) {
        const newPayments = [...invoice.payments, payment];
        const totalPaid = newPayments.reduce((sum, p) => sum + p.amount, 0);
        const newStatus = totalPaid >= invoice.amount ? 'Paid' : 'Partial';
        return { ...invoice, payments: newPayments, status: newStatus };
      }
      return invoice;
    });

    setInvoices(updatedInvoices);
    setPaymentForm({
      amount: '',
      method: 'Credit Card',
      reference: '',
      date: '',
      notes: ''
    });
    setShowPaymentModal(false);
    setSelectedInvoice(null);
    alert('Payment processed successfully!');
  };

  // Expense CRUD Operations
  const handleAddExpense = () => {
    if (!expenseForm.description || !expenseForm.amount || !expenseForm.date) {
      alert('Please fill in required fields (Description, Amount, and Date)');
      return;
    }

    const newExpense = {
      id: `EXP-2024-${String(expenses.length + 1).padStart(3, '0')}`,
      ...expenseForm,
      amount: parseFloat(expenseForm.amount),
      status: 'Pending'
    };

    setExpenses([...expenses, newExpense]);
    setExpenseForm({
      description: '',
      category: 'Inventory',
      amount: '',
      date: '',
      vendor: '',
      notes: '',
      receipt: false
    });
    setShowAddExpenseModal(false);
    alert('Expense added successfully!');
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setExpenseForm({
      description: expense.description,
      category: expense.category,
      amount: expense.amount.toString(),
      date: expense.date,
      vendor: expense.vendor,
      notes: expense.notes || '',
      receipt: expense.receipt
    });
    setShowAddExpenseModal(true);
  };

  const handleUpdateExpense = () => {
    if (!expenseForm.description || !expenseForm.amount || !expenseForm.date) {
      alert('Please fill in required fields (Description, Amount, and Date)');
      return;
    }

    const updatedExpenses = expenses.map(expense =>
      expense.id === editingExpense.id
        ? { ...expense, ...expenseForm, amount: parseFloat(expenseForm.amount) }
        : expense
    );

    setExpenses(updatedExpenses);
    setEditingExpense(null);
    setExpenseForm({
      description: '',
      category: 'Inventory',
      amount: '',
      date: '',
      vendor: '',
      notes: '',
      receipt: false
    });
    setShowAddExpenseModal(false);
    alert('Expense updated successfully!');
  };

  const handleDeleteExpense = (expenseId) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== expenseId));
      alert('Expense deleted successfully!');
    }
  };

  const handleApproveExpense = (expenseId) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === expenseId ? { ...expense, status: 'Approved' } : expense
    );
    setExpenses(updatedExpenses);
    alert('Expense approved!');
  };

  // Invoice item management
  const addInvoiceItem = () => {
    setInvoiceForm({
      ...invoiceForm,
      items: [...invoiceForm.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    });
  };

  const removeInvoiceItem = (index) => {
    const newItems = invoiceForm.items.filter((_, i) => i !== index);
    setInvoiceForm({ ...invoiceForm, items: newItems });
  };

  const updateInvoiceItem = (index, field, value) => {
    const newItems = [...invoiceForm.items];
    newItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setInvoiceForm({ ...invoiceForm, items: newItems });
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Partial': return 'bg-blue-100 text-blue-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Dashboard calculations
  const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
  const pendingInvoices = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').length;
  const totalExpenses = expenses.filter(e => e.status === 'Approved' || e.status === 'Paid').reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
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
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12.5% vs last month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">${totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-red-600">-5.2% vs last month</p>
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
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-2xl font-bold text-gray-900">${netProfit.toLocaleString()}</p>
              <p className="text-sm text-blue-600">{((netProfit/totalRevenue)*100).toFixed(1)}% margin</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Invoices</p>
              <p className="text-2xl font-bold text-gray-900">{pendingInvoices}</p>
              <p className="text-sm text-yellow-600">Requires follow-up</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Revenue Trend</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {financialData.revenue.monthly.slice(-6).map((month, index) => (
                <div key={month.month} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{month.month}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(month.amount / 160000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${month.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Expense Categories</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {financialData.expenses.categories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-600 h-2 rounded-full" 
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${category.amount.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Financial Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                Invoice <span className="font-medium">INV-2024-001</span> paid by Green Solutions
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                New expense <span className="font-medium">$15,000</span> for inventory purchase
              </p>
              <span className="text-xs text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <p className="text-sm text-gray-600">
                Invoice <span className="font-medium">INV-2024-003</span> is now overdue
              </p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search invoices..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowAddInvoiceModal(true)}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Create Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{invoice.id}</div>
                    <div className="text-sm text-gray-500">Issued: {invoice.issueDate}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{invoice.customer}</div>
                  <div className="text-sm text-gray-500">{invoice.customerEmail}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${invoice.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing invoice: ${invoice.id}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditInvoice(invoice)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  {invoice.status === 'Draft' && (
                    <button 
                      onClick={() => handleSendInvoice(invoice.id)}
                      className="text-purple-600 hover:text-purple-900 mr-3"
                    >
                      Send
                    </button>
                  )}
                  {(invoice.status === 'Pending' || invoice.status === 'Overdue' || invoice.status === 'Partial') && (
                    <button 
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setPaymentForm({
                          amount: (invoice.amount - (invoice.payments?.reduce((sum, p) => sum + p.amount, 0) || 0)).toString(),
                          method: 'Credit Card',
                          reference: '',
                          date: new Date().toISOString().split('T')[0],
                          notes: ''
                        });
                        setShowPaymentModal(true);
                      }}
                      className="text-orange-600 hover:text-orange-900 mr-3"
                    >
                      Payment
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteInvoice(invoice.id)}
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

  const renderExpenses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search expenses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setShowAddExpenseModal(true)}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Add Expense
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                    <div className="text-sm text-gray-500">{expense.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${expense.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.vendor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(expense.status)}`}>
                    {expense.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {expense.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing expense: ${expense.id}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditExpense(expense)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  {expense.status === 'Pending' && (
                    <button 
                      onClick={() => handleApproveExpense(expense.id)}
                      className="text-purple-600 hover:text-purple-900 mr-3"
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteExpense(expense.id)}
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

  // Invoice Modal
  const InvoiceModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingInvoice ? 'Edit Invoice' : 'Create New Invoice'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer *</label>
              <input
                type="text"
                value={invoiceForm.customer}
                onChange={(e) => setInvoiceForm({...invoiceForm, customer: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Email *</label>
              <input
                type="email"
                value={invoiceForm.customerEmail}
                onChange={(e) => setInvoiceForm({...invoiceForm, customerEmail: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={invoiceForm.dueDate}
                onChange={(e) => setInvoiceForm({...invoiceForm, dueDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Terms</label>
              <select
                value={invoiceForm.terms}
                onChange={(e) => setInvoiceForm({...invoiceForm, terms: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="Net 15">Net 15 days</option>
                <option value="Net 30">Net 30 days</option>
                <option value="Net 60">Net 60 days</option>
                <option value="Due on receipt">Due on receipt</option>
              </select>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-md font-medium text-gray-900">Invoice Items</h4>
              <button
                onClick={addInvoiceItem}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Add Item
              </button>
            </div>
            <div className="space-y-3">
              {invoiceForm.items.map((item, index) => (
                <div key={index} className="grid grid-cols-5 gap-3 items-center">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateInvoiceItem(index, 'description', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateInvoiceItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <input
                    type="number"
                    placeholder="Rate"
                    value={item.rate}
                    onChange={(e) => updateInvoiceItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                    ${item.amount.toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeInvoiceItem(index)}
                    className="px-2 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <span className="text-lg font-bold">
                Total: ${invoiceForm.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={invoiceForm.notes}
              onChange={(e) => setInvoiceForm({...invoiceForm, notes: e.target.value})}
              rows={3}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowAddInvoiceModal(false);
                setEditingInvoice(null);
                setInvoiceForm({
                  customer: '',
                  customerEmail: '',
                  dueDate: '',
                  terms: 'Net 30',
                  notes: '',
                  items: [{ description: '', quantity: 1, rate: 0, amount: 0 }]
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingInvoice ? handleUpdateInvoice : handleAddInvoice}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editingInvoice ? 'Update' : 'Create'} Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Expense Modal
  const ExpenseModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingExpense ? 'Edit Expense' : 'Add New Expense'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <input
                type="text"
                value={expenseForm.description}
                onChange={(e) => setExpenseForm({...expenseForm, description: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({...expenseForm, category: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="Inventory">Inventory</option>
                <option value="Salaries">Salaries</option>
                <option value="Marketing">Marketing</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount *</label>
              <input
                type="number"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({...expenseForm, amount: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date *</label>
              <input
                type="date"
                value={expenseForm.date}
                onChange={(e) => setExpenseForm({...expenseForm, date: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Vendor</label>
              <input
                type="text"
                value={expenseForm.vendor}
                onChange={(e) => setExpenseForm({...expenseForm, vendor: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={expenseForm.notes}
                onChange={(e) => setExpenseForm({...expenseForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={expenseForm.receipt}
                onChange={(e) => setExpenseForm({...expenseForm, receipt: e.target.checked})}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">Receipt attached</label>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowAddExpenseModal(false);
                setEditingExpense(null);
                setExpenseForm({
                  description: '',
                  category: 'Inventory',
                  amount: '',
                  date: '',
                  vendor: '',
                  notes: '',
                  receipt: false
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingExpense ? handleUpdateExpense : handleAddExpense}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {editingExpense ? 'Update' : 'Add'} Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Modal
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Process Payment - {selectedInvoice?.id}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount *</label>
              <input
                type="number"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({...paymentForm, amount: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                value={paymentForm.method}
                onChange={(e) => setPaymentForm({...paymentForm, method: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Check">Check</option>
                <option value="Cash">Cash</option>
                <option value="ACH">ACH</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reference Number</label>
              <input
                type="text"
                value={paymentForm.reference}
                onChange={(e) => setPaymentForm({...paymentForm, reference: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Date *</label>
              <input
                type="date"
                value={paymentForm.date}
                onChange={(e) => setPaymentForm({...paymentForm, date: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm({...paymentForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedInvoice(null);
                setPaymentForm({
                  amount: '',
                  method: 'Credit Card',
                  reference: '',
                  date: '',
                  notes: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleProcessPayment}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Process Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Accounting & Finance</h1>
        <p className="mt-2 text-gray-600">Manage your financial operations, invoices, expenses, and reporting</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'invoices', name: 'Invoices', icon: '📄' },
            { id: 'expenses', name: 'Expenses', icon: '💰' },
            { id: 'reports', name: 'Reports', icon: '📈' }
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
      {activeTab === 'invoices' && renderInvoices()}
      {activeTab === 'expenses' && renderExpenses()}
      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Financial Reports</h3>
          <p className="text-gray-600">Advanced reporting coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showAddInvoiceModal && <InvoiceModal />}
      {showAddExpenseModal && <ExpenseModal />}
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

export default EnhancedAccountingModule;

