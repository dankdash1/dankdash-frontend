import React, { useState, useEffect } from 'react';

const EnhancedSubscriptionModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedBilling, setSelectedBilling] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  // Enhanced subscription data with full functionality
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 'SUB-001',
      customerId: 'CUST-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@email.com',
      planId: 'PLAN-001',
      planName: 'Cannabis Connoisseur',
      planType: 'Premium',
      status: 'Active',
      billingCycle: 'Monthly',
      startDate: '2024-01-15',
      nextBillingDate: '2024-09-15',
      lastBillingDate: '2024-08-15',
      amount: 89.99,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      trialEnd: null,
      cancelDate: null,
      pauseDate: null,
      renewalCount: 8,
      totalPaid: 719.92,
      discountCode: 'WELCOME10',
      discountAmount: 9.00,
      preferences: {
        strainTypes: ['Indica', 'Hybrid'],
        deliveryFrequency: 'Monthly',
        productTypes: ['Flower', 'Edibles'],
        potencyLevel: 'Medium-High'
      },
      deliveryAddress: {
        street: '123 Main St',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210'
      },
      lastDelivery: '2024-08-15',
      nextDelivery: '2024-09-15',
      deliveryHistory: 8,
      satisfaction: 4.8,
      notes: 'Prefers evening delivery, loves Purple strains',
      autoRenew: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-08-15'
    },
    {
      id: 'SUB-002',
      customerId: 'CUST-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.johnson@email.com',
      planId: 'PLAN-002',
      planName: 'Wellness Explorer',
      planType: 'Standard',
      status: 'Active',
      billingCycle: 'Quarterly',
      startDate: '2024-02-01',
      nextBillingDate: '2024-11-01',
      lastBillingDate: '2024-08-01',
      amount: 199.99,
      currency: 'USD',
      paymentMethod: 'Debit Card',
      paymentStatus: 'Paid',
      trialEnd: null,
      cancelDate: null,
      pauseDate: null,
      renewalCount: 3,
      totalPaid: 599.97,
      discountCode: null,
      discountAmount: 0,
      preferences: {
        strainTypes: ['Sativa', 'CBD'],
        deliveryFrequency: 'Quarterly',
        productTypes: ['Edibles', 'Tinctures', 'Topicals'],
        potencyLevel: 'Low-Medium'
      },
      deliveryAddress: {
        street: '456 Oak Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102'
      },
      lastDelivery: '2024-08-01',
      nextDelivery: '2024-11-01',
      deliveryHistory: 3,
      satisfaction: 4.9,
      notes: 'Interested in wellness products, prefers CBD-heavy strains',
      autoRenew: true,
      createdAt: '2024-02-01',
      updatedAt: '2024-08-01'
    },
    {
      id: 'SUB-003',
      customerId: 'CUST-003',
      customerName: 'Mike Chen',
      customerEmail: 'mike.chen@email.com',
      planId: 'PLAN-003',
      planName: 'Budget Basics',
      planType: 'Basic',
      status: 'Paused',
      billingCycle: 'Monthly',
      startDate: '2024-03-10',
      nextBillingDate: '2024-10-10',
      lastBillingDate: '2024-07-10',
      amount: 39.99,
      currency: 'USD',
      paymentMethod: 'PayPal',
      paymentStatus: 'Pending',
      trialEnd: null,
      cancelDate: null,
      pauseDate: '2024-08-10',
      renewalCount: 5,
      totalPaid: 199.95,
      discountCode: 'STUDENT20',
      discountAmount: 8.00,
      preferences: {
        strainTypes: ['Hybrid'],
        deliveryFrequency: 'Monthly',
        productTypes: ['Flower'],
        potencyLevel: 'Medium'
      },
      deliveryAddress: {
        street: '789 Pine St',
        city: 'Oakland',
        state: 'CA',
        zipCode: '94610'
      },
      lastDelivery: '2024-07-10',
      nextDelivery: '2024-10-10',
      deliveryHistory: 5,
      satisfaction: 4.2,
      notes: 'Student discount applied, budget-conscious customer',
      autoRenew: false,
      createdAt: '2024-03-10',
      updatedAt: '2024-08-10'
    }
  ]);

  const [subscriptionPlans, setSubscriptionPlans] = useState([
    {
      id: 'PLAN-001',
      name: 'Cannabis Connoisseur',
      type: 'Premium',
      description: 'Premium cannabis subscription with top-shelf products',
      monthlyPrice: 89.99,
      quarterlyPrice: 249.99,
      yearlyPrice: 899.99,
      features: [
        'Premium flower selection',
        'Exclusive strains',
        'Free delivery',
        'Priority customer support',
        'Monthly surprise gifts',
        'Expert curation'
      ],
      productTypes: ['Flower', 'Concentrates', 'Edibles', 'Accessories'],
      maxProducts: 8,
      status: 'Active',
      subscriberCount: 156,
      created: '2024-01-01',
      lastUpdated: '2024-08-01'
    },
    {
      id: 'PLAN-002',
      name: 'Wellness Explorer',
      type: 'Standard',
      description: 'Wellness-focused subscription with CBD and therapeutic products',
      monthlyPrice: 59.99,
      quarterlyPrice: 169.99,
      yearlyPrice: 599.99,
      features: [
        'CBD-focused products',
        'Wellness consultation',
        'Educational materials',
        'Tinctures & topicals',
        'Dosage guidance',
        'Health tracking'
      ],
      productTypes: ['CBD Products', 'Tinctures', 'Topicals', 'Edibles'],
      maxProducts: 6,
      status: 'Active',
      subscriberCount: 89,
      created: '2024-01-01',
      lastUpdated: '2024-08-01'
    },
    {
      id: 'PLAN-003',
      name: 'Budget Basics',
      type: 'Basic',
      description: 'Affordable cannabis subscription for budget-conscious consumers',
      monthlyPrice: 39.99,
      quarterlyPrice: 109.99,
      yearlyPrice: 399.99,
      features: [
        'Quality flower selection',
        'Value pricing',
        'Basic delivery',
        'Email support',
        'Monthly newsletter'
      ],
      productTypes: ['Flower', 'Pre-rolls'],
      maxProducts: 4,
      status: 'Active',
      subscriberCount: 234,
      created: '2024-01-01',
      lastUpdated: '2024-08-01'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalSubscriptions: 479,
    activeSubscriptions: 423,
    pausedSubscriptions: 34,
    cancelledSubscriptions: 22,
    monthlyRevenue: 28450.75,
    quarterlyRevenue: 85352.25,
    yearlyRevenue: 341409.00,
    averageSubscriptionValue: 67.25,
    churnRate: 4.6,
    retentionRate: 95.4,
    lifetimeValue: 847.50,
    newSubscriptionsThisMonth: 45,
    renewalRate: 89.2,
    upgradeRate: 12.8
  });

  // Form states
  const [subscriptionForm, setSubscriptionForm] = useState({
    customerName: '',
    customerEmail: '',
    planId: '',
    billingCycle: 'Monthly',
    paymentMethod: 'Credit Card',
    discountCode: '',
    preferences: {
      strainTypes: [],
      deliveryFrequency: 'Monthly',
      productTypes: [],
      potencyLevel: 'Medium'
    },
    deliveryAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    notes: '',
    autoRenew: true
  });

  const [planForm, setPlanForm] = useState({
    name: '',
    type: 'Standard',
    description: '',
    monthlyPrice: 0,
    quarterlyPrice: 0,
    yearlyPrice: 0,
    features: [],
    productTypes: [],
    maxProducts: 4
  });

  // CRUD Operations for Subscriptions
  const handleCreateSubscription = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const selectedPlan = subscriptionPlans.find(plan => plan.id === subscriptionForm.planId);
      const amount = subscriptionForm.billingCycle === 'Monthly' ? selectedPlan.monthlyPrice :
                    subscriptionForm.billingCycle === 'Quarterly' ? selectedPlan.quarterlyPrice :
                    selectedPlan.yearlyPrice;

      const newSubscription = {
        id: `SUB-${String(subscriptions.length + 1).padStart(3, '0')}`,
        customerId: `CUST-${String(subscriptions.length + 1).padStart(3, '0')}`,
        ...subscriptionForm,
        planName: selectedPlan.name,
        planType: selectedPlan.type,
        status: 'Active',
        startDate: new Date().toISOString().split('T')[0],
        nextBillingDate: getNextBillingDate(subscriptionForm.billingCycle),
        lastBillingDate: null,
        amount: amount,
        currency: 'USD',
        paymentStatus: 'Pending',
        trialEnd: null,
        cancelDate: null,
        pauseDate: null,
        renewalCount: 0,
        totalPaid: 0,
        discountAmount: 0,
        lastDelivery: null,
        nextDelivery: getNextBillingDate(subscriptionForm.billingCycle),
        deliveryHistory: 0,
        satisfaction: 0,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setSubscriptions([...subscriptions, newSubscription]);
      setShowCreateModal(false);
      setSubscriptionForm({
        customerName: '',
        customerEmail: '',
        planId: '',
        billingCycle: 'Monthly',
        paymentMethod: 'Credit Card',
        discountCode: '',
        preferences: {
          strainTypes: [],
          deliveryFrequency: 'Monthly',
          productTypes: [],
          potencyLevel: 'Medium'
        },
        deliveryAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        },
        notes: '',
        autoRenew: true
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalSubscriptions: prev.totalSubscriptions + 1,
        activeSubscriptions: prev.activeSubscriptions + 1
      }));

    } catch (error) {
      console.error('Error creating subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubscription = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedSubscriptions = subscriptions.map(sub => 
        sub.id === selectedSubscription.id 
          ? { ...sub, ...subscriptionForm, updatedAt: new Date().toISOString().split('T')[0] }
          : sub
      );
      
      setSubscriptions(updatedSubscriptions);
      setShowEditModal(false);
      setSelectedSubscription(null);
      
    } catch (error) {
      console.error('Error updating subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscription = async () => {
    setLoading(true);
    
    try {
      const updatedSubscriptions = subscriptions.filter(sub => sub.id !== selectedSubscription.id);
      setSubscriptions(updatedSubscriptions);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalSubscriptions: prev.totalSubscriptions - 1,
        activeSubscriptions: selectedSubscription.status === 'Active' ? prev.activeSubscriptions - 1 : prev.activeSubscriptions
      }));
      
      setShowDeleteModal(false);
      setSelectedSubscription(null);
      
    } catch (error) {
      console.error('Error deleting subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSubscriptionStatus = (subscriptionId, newStatus) => {
    const updatedSubscriptions = subscriptions.map(sub => 
      sub.id === subscriptionId 
        ? { 
            ...sub, 
            status: newStatus,
            pauseDate: newStatus === 'Paused' ? new Date().toISOString().split('T')[0] : null,
            cancelDate: newStatus === 'Cancelled' ? new Date().toISOString().split('T')[0] : null,
            updatedAt: new Date().toISOString().split('T')[0]
          }
        : sub
    );
    
    setSubscriptions(updatedSubscriptions);
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newPlan = {
        id: `PLAN-${String(subscriptionPlans.length + 1).padStart(3, '0')}`,
        ...planForm,
        status: 'Active',
        subscriberCount: 0,
        created: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setSubscriptionPlans([...subscriptionPlans, newPlan]);
      setShowCreatePlanModal(false);
      setPlanForm({
        name: '',
        type: 'Standard',
        description: '',
        monthlyPrice: 0,
        quarterlyPrice: 0,
        yearlyPrice: 0,
        features: [],
        productTypes: [],
        maxProducts: 4
      });

    } catch (error) {
      console.error('Error creating plan:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getNextBillingDate = (billingCycle) => {
    const today = new Date();
    switch (billingCycle) {
      case 'Monthly':
        return new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0];
      case 'Quarterly':
        return new Date(today.setMonth(today.getMonth() + 3)).toISOString().split('T')[0];
      case 'Yearly':
        return new Date(today.setFullYear(today.getFullYear() + 1)).toISOString().split('T')[0];
      default:
        return new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0];
    }
  };

  // Filter functions
  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || subscription.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesPlan = selectedPlan === 'all' || subscription.planType.toLowerCase() === selectedPlan.toLowerCase();
    const matchesBilling = selectedBilling === 'all' || subscription.billingCycle.toLowerCase() === selectedBilling.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPlan && matchesBilling;
  });

  const openEditModal = (subscription) => {
    setSelectedSubscription(subscription);
    setSubscriptionForm({
      customerName: subscription.customerName,
      customerEmail: subscription.customerEmail,
      planId: subscription.planId,
      billingCycle: subscription.billingCycle,
      paymentMethod: subscription.paymentMethod,
      discountCode: subscription.discountCode || '',
      preferences: subscription.preferences,
      deliveryAddress: subscription.deliveryAddress,
      notes: subscription.notes,
      autoRenew: subscription.autoRenew
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (subscription) => {
    setSelectedSubscription(subscription);
    setShowDeleteModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'trial': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSubscriptions}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.activeSubscriptions} Active</span>
            <span className="text-gray-500 ml-2">• +{analytics.newSubscriptionsThisMonth} This Month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">Avg: ${analytics.averageSubscriptionValue}</span>
            <span className="text-gray-500 ml-2">• {analytics.renewalRate}% Renewal</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.retentionRate}%</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-red-600 font-medium">{analytics.churnRate}% Churn</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lifetime Value</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.lifetimeValue}</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">{analytics.upgradeRate}% Upgrade Rate</span>
          </div>
        </div>
      </div>

      {/* Plan Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Subscription Plans Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <div key={plan.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{plan.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    plan.type === 'Premium' ? 'text-purple-600 bg-purple-100' :
                    plan.type === 'Standard' ? 'text-blue-600 bg-blue-100' :
                    'text-green-600 bg-green-100'
                  }`}>
                    {plan.type}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subscribers</span>
                    <span className="font-medium text-gray-900">{plan.subscriberCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Monthly Price</span>
                    <span className="font-medium text-gray-900">${plan.monthlyPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Max Products</span>
                    <span className="font-medium text-gray-900">{plan.maxProducts}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Subscriptions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Subscriptions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {subscriptions
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((subscription) => (
                <div key={subscription.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {subscription.customerName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{subscription.customerName}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(subscription.status)}`}>
                        {subscription.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{subscription.planName} - {subscription.billingCycle}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>${subscription.amount}/month</span>
                      <span>•</span>
                      <span>Started: {new Date(subscription.startDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Next billing: {new Date(subscription.nextBillingDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
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
              placeholder="Search subscriptions..."
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
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
            <option value="trial">Trial</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            <option value="all">All Plans</option>
            <option value="premium">Premium</option>
            <option value="standard">Standard</option>
            <option value="basic">Basic</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedBilling}
            onChange={(e) => setSelectedBilling(e.target.value)}
          >
            <option value="all">All Billing</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Subscription</span>
          </button>
        </div>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSubscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">
                      {subscription.customerName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{subscription.customerName}</h3>
                    <p className="text-sm text-gray-600">{subscription.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(subscription.status)}`}>
                    {subscription.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(subscription.paymentStatus)}`}>
                    {subscription.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{subscription.planName}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    subscription.planType === 'Premium' ? 'text-purple-600 bg-purple-100' :
                    subscription.planType === 'Standard' ? 'text-blue-600 bg-blue-100' :
                    'text-green-600 bg-green-100'
                  }`}>
                    {subscription.planType}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{subscription.billingCycle} billing • ${subscription.amount}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium text-gray-900">{new Date(subscription.startDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Next Billing</span>
                  <span className="font-medium text-gray-900">{new Date(subscription.nextBillingDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Paid</span>
                  <span className="font-medium text-gray-900">${subscription.totalPaid.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Renewals</span>
                  <span className="font-medium text-gray-900">{subscription.renewalCount}</span>
                </div>
                {subscription.satisfaction > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Satisfaction</span>
                    <span className="font-medium text-gray-900">{subscription.satisfaction}/5.0</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {subscription.status === 'Active' && (
                      <>
                        <button
                          onClick={() => handleToggleSubscriptionStatus(subscription.id, 'Paused')}
                          className="p-2 text-yellow-600 hover:text-yellow-700 transition-colors"
                          title="Pause Subscription"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleToggleSubscriptionStatus(subscription.id, 'Cancelled')}
                          className="p-2 text-red-600 hover:text-red-700 transition-colors"
                          title="Cancel Subscription"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    )}
                    {subscription.status === 'Paused' && (
                      <button
                        onClick={() => handleToggleSubscriptionStatus(subscription.id, 'Active')}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        title="Resume Subscription"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(subscription)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(subscription)}
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

      {filteredSubscriptions.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No subscriptions found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first subscription.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              New Subscription
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPlans = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Subscription Plans</h2>
          <p className="text-sm text-gray-600">Manage subscription plans and pricing</p>
        </div>
        <button
          onClick={() => setShowCreatePlanModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Plan</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500">{plan.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  plan.type === 'Premium' ? 'text-purple-600 bg-purple-100' :
                  plan.type === 'Standard' ? 'text-blue-600 bg-blue-100' :
                  'text-green-600 bg-green-100'
                }`}>
                  {plan.type}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly</span>
                  <span className="font-medium text-gray-900">${plan.monthlyPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quarterly</span>
                  <span className="font-medium text-gray-900">${plan.quarterlyPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Yearly</span>
                  <span className="font-medium text-gray-900">${plan.yearlyPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Max Products</span>
                  <span className="font-medium text-gray-900">{plan.maxProducts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subscribers</span>
                  <span className="font-medium text-gray-900">{plan.subscriberCount}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {plan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-blue-600 text-xs">+{plan.features.length - 4} more features</li>
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {new Date(plan.created).toLocaleDateString()}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    plan.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                  }`}>
                    {plan.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Subscription Management</h1>
        <p className="text-gray-600 mt-1">Manage customer subscriptions, plans, and billing</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'subscriptions', name: 'Subscriptions', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { id: 'plans', name: 'Plans', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' }
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
      {activeTab === 'subscriptions' && renderSubscriptions()}
      {activeTab === 'plans' && renderPlans()}

      {/* Create Subscription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Subscription</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateSubscription} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.customerName}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, customerName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.customerEmail}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, customerEmail: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                    <select
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.planId}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, planId: e.target.value })}
                    >
                      <option value="">Select Plan</option>
                      {subscriptionPlans.map(plan => (
                        <option key={plan.id} value={plan.id}>{plan.name} - {plan.type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Cycle</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.billingCycle}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, billingCycle: e.target.value })}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.paymentMethod}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, paymentMethod: e.target.value })}
                    >
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.deliveryAddress.street}
                      onChange={(e) => setSubscriptionForm({ 
                        ...subscriptionForm, 
                        deliveryAddress: { ...subscriptionForm.deliveryAddress, street: e.target.value }
                      })}
                      placeholder="Street Address"
                    />
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.deliveryAddress.city}
                      onChange={(e) => setSubscriptionForm({ 
                        ...subscriptionForm, 
                        deliveryAddress: { ...subscriptionForm.deliveryAddress, city: e.target.value }
                      })}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.deliveryAddress.state}
                      onChange={(e) => setSubscriptionForm({ 
                        ...subscriptionForm, 
                        deliveryAddress: { ...subscriptionForm.deliveryAddress, state: e.target.value }
                      })}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.deliveryAddress.zipCode}
                      onChange={(e) => setSubscriptionForm({ 
                        ...subscriptionForm, 
                        deliveryAddress: { ...subscriptionForm.deliveryAddress, zipCode: e.target.value }
                      })}
                      placeholder="ZIP Code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={subscriptionForm.notes}
                    onChange={(e) => setSubscriptionForm({ ...subscriptionForm, notes: e.target.value })}
                    placeholder="Additional notes about the subscription..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="autoRenew"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={subscriptionForm.autoRenew}
                    onChange={(e) => setSubscriptionForm({ ...subscriptionForm, autoRenew: e.target.checked })}
                  />
                  <label htmlFor="autoRenew" className="ml-2 block text-sm text-gray-900">
                    Enable auto-renewal
                  </label>
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
                    {loading ? 'Creating...' : 'Create Subscription'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subscription Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Subscription</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditSubscription} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.customerName}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={subscriptionForm.customerEmail}
                      onChange={(e) => setSubscriptionForm({ ...subscriptionForm, customerEmail: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={subscriptionForm.notes}
                    onChange={(e) => setSubscriptionForm({ ...subscriptionForm, notes: e.target.value })}
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
                    {loading ? 'Updating...' : 'Update Subscription'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Subscription Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Subscription</h2>
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
                  Are you sure you want to delete the subscription for <strong>{selectedSubscription?.customerName}</strong>? This action cannot be undone.
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
                  onClick={handleDeleteSubscription}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Subscription'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Plan Modal */}
      {showCreatePlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Plan</h2>
                <button
                  onClick={() => setShowCreatePlanModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreatePlan} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={planForm.name}
                      onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                      placeholder="Premium Cannabis Box"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plan Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={planForm.type}
                      onChange={(e) => setPlanForm({ ...planForm, type: e.target.value })}
                    >
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={planForm.description}
                    onChange={(e) => setPlanForm({ ...planForm, description: e.target.value })}
                    placeholder="Describe the plan..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Price ($)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={planForm.monthlyPrice}
                      onChange={(e) => setPlanForm({ ...planForm, monthlyPrice: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quarterly Price ($)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={planForm.quarterlyPrice}
                      onChange={(e) => setPlanForm({ ...planForm, quarterlyPrice: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Yearly Price ($)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={planForm.yearlyPrice}
                      onChange={(e) => setPlanForm({ ...planForm, yearlyPrice: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Products</label>
                  <input
                    type="number"
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={planForm.maxProducts}
                    onChange={(e) => setPlanForm({ ...planForm, maxProducts: parseInt(e.target.value) || 4 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (one per line)</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={planForm.features.join('\n')}
                    onChange={(e) => setPlanForm({ 
                      ...planForm, 
                      features: e.target.value.split('\n').filter(feature => feature.trim()) 
                    })}
                    placeholder="Premium flower selection&#10;Free delivery&#10;Priority support&#10;Monthly surprise gifts"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Types (one per line)</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={planForm.productTypes.join('\n')}
                    onChange={(e) => setPlanForm({ 
                      ...planForm, 
                      productTypes: e.target.value.split('\n').filter(type => type.trim()) 
                    })}
                    placeholder="Flower&#10;Concentrates&#10;Edibles&#10;Accessories"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreatePlanModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Plan'}
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

export default EnhancedSubscriptionModule;

