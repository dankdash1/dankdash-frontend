import React, { useState, useEffect } from 'react';

const SubscriptionModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPlan, setSelectedPlan] = useState('all');
  const [selectedBilling, setSelectedBilling] = useState('all');

  // Mock subscription data
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
      notes: 'Prefers evening delivery, loves Purple strains'
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
      notes: 'Interested in wellness products, prefers CBD-heavy strains'
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
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'Pending',
      trialEnd: null,
      cancelDate: null,
      pauseDate: '2024-08-10',
      renewalCount: 4,
      totalPaid: 159.96,
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
        city: 'San Diego',
        state: 'CA',
        zipCode: '92101'
      },
      lastDelivery: '2024-07-10',
      nextDelivery: '2024-10-10',
      deliveryHistory: 4,
      satisfaction: 4.2,
      notes: 'Student discount applied, temporarily paused due to travel'
    },
    {
      id: 'SUB-004',
      customerId: 'CUST-004',
      customerName: 'Alex Kim',
      customerEmail: 'alex.kim@email.com',
      planId: 'PLAN-001',
      planName: 'Cannabis Connoisseur',
      planType: 'Premium',
      status: 'Trial',
      billingCycle: 'Monthly',
      startDate: '2024-08-01',
      nextBillingDate: '2024-09-01',
      lastBillingDate: null,
      amount: 89.99,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Trial',
      trialEnd: '2024-08-31',
      cancelDate: null,
      pauseDate: null,
      renewalCount: 0,
      totalPaid: 0,
      discountCode: 'TRIAL30',
      discountAmount: 89.99,
      preferences: {
        strainTypes: ['Indica', 'Sativa'],
        deliveryFrequency: 'Monthly',
        productTypes: ['Flower', 'Concentrates'],
        potencyLevel: 'High'
      },
      deliveryAddress: {
        street: '321 Elm Dr',
        city: 'Oakland',
        state: 'CA',
        zipCode: '94601'
      },
      lastDelivery: '2024-08-01',
      nextDelivery: '2024-09-01',
      deliveryHistory: 1,
      satisfaction: 5.0,
      notes: 'New customer on trial, very satisfied with first delivery'
    },
    {
      id: 'SUB-005',
      customerId: 'CUST-005',
      customerName: 'Lisa Rodriguez',
      customerEmail: 'lisa.rodriguez@email.com',
      planId: 'PLAN-002',
      planName: 'Wellness Explorer',
      planType: 'Standard',
      status: 'Cancelled',
      billingCycle: 'Monthly',
      startDate: '2024-01-01',
      nextBillingDate: null,
      lastBillingDate: '2024-07-01',
      amount: 59.99,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Cancelled',
      trialEnd: null,
      cancelDate: '2024-08-01',
      pauseDate: null,
      renewalCount: 7,
      totalPaid: 419.93,
      discountCode: null,
      discountAmount: 0,
      preferences: {
        strainTypes: ['CBD'],
        deliveryFrequency: 'Monthly',
        productTypes: ['Edibles', 'Topicals'],
        potencyLevel: 'Low'
      },
      deliveryAddress: {
        street: '654 Maple Ln',
        city: 'Sacramento',
        state: 'CA',
        zipCode: '95814'
      },
      lastDelivery: '2024-07-01',
      nextDelivery: null,
      deliveryHistory: 7,
      satisfaction: 3.8,
      notes: 'Cancelled due to moving out of state, expressed interest in returning'
    }
  ]);

  const [plans, setPlans] = useState([
    {
      id: 'PLAN-001',
      name: 'Cannabis Connoisseur',
      type: 'Premium',
      description: 'Premium cannabis subscription with top-shelf products and exclusive strains',
      monthlyPrice: 89.99,
      quarterlyPrice: 249.99,
      annualPrice: 899.99,
      features: [
        'Premium flower selection (3.5g)',
        'Exclusive strain access',
        'Free delivery',
        'Priority customer support',
        'Monthly strain guide',
        'Grower interviews',
        'Terpene analysis reports'
      ],
      limits: {
        monthlyQuantity: '3.5g flower + 2 edibles',
        deliveryFrequency: 'Monthly',
        productTypes: ['Flower', 'Edibles', 'Concentrates'],
        customization: 'Full'
      },
      status: 'Active',
      subscriberCount: 234,
      churnRate: 8.5,
      avgLifetimeValue: 1250.75,
      satisfaction: 4.7,
      createdDate: '2023-12-01',
      lastModified: '2024-07-15'
    },
    {
      id: 'PLAN-002',
      name: 'Wellness Explorer',
      type: 'Standard',
      description: 'Balanced wellness subscription focusing on therapeutic and CBD products',
      monthlyPrice: 59.99,
      quarterlyPrice: 169.99,
      annualPrice: 599.99,
      features: [
        'Curated wellness products',
        'CBD and low-THC options',
        'Educational materials',
        'Dosage guidance',
        'Wellness tracking tools',
        'Community access'
      ],
      limits: {
        monthlyQuantity: '2g flower + 3 wellness products',
        deliveryFrequency: 'Monthly or Quarterly',
        productTypes: ['Flower', 'Edibles', 'Tinctures', 'Topicals'],
        customization: 'Moderate'
      },
      status: 'Active',
      subscriberCount: 189,
      churnRate: 12.3,
      avgLifetimeValue: 890.50,
      satisfaction: 4.5,
      createdDate: '2024-01-15',
      lastModified: '2024-08-01'
    },
    {
      id: 'PLAN-003',
      name: 'Budget Basics',
      type: 'Basic',
      description: 'Affordable entry-level subscription for cannabis newcomers',
      monthlyPrice: 39.99,
      quarterlyPrice: 109.99,
      annualPrice: 399.99,
      features: [
        'Quality flower selection (2g)',
        'Beginner-friendly strains',
        'Educational content',
        'Basic customer support',
        'Monthly newsletter'
      ],
      limits: {
        monthlyQuantity: '2g flower',
        deliveryFrequency: 'Monthly',
        productTypes: ['Flower'],
        customization: 'Limited'
      },
      status: 'Active',
      subscriberCount: 156,
      churnRate: 18.7,
      avgLifetimeValue: 450.25,
      satisfaction: 4.2,
      createdDate: '2024-02-01',
      lastModified: '2024-06-20'
    },
    {
      id: 'PLAN-004',
      name: 'Micro-Dose Master',
      type: 'Specialty',
      description: 'Specialized subscription for micro-dosing enthusiasts',
      monthlyPrice: 69.99,
      quarterlyPrice: 199.99,
      annualPrice: 699.99,
      features: [
        'Micro-dose products',
        'Precise dosing guides',
        'Low-dose edibles',
        'Micro-dose journal',
        'Expert consultations',
        'Research updates'
      ],
      limits: {
        monthlyQuantity: '1g flower + 10 micro-dose products',
        deliveryFrequency: 'Monthly',
        productTypes: ['Edibles', 'Tinctures', 'Capsules'],
        customization: 'High'
      },
      status: 'Active',
      subscriberCount: 78,
      churnRate: 9.2,
      avgLifetimeValue: 980.75,
      satisfaction: 4.8,
      createdDate: '2024-03-01',
      lastModified: '2024-07-30'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalSubscriptions: 657,
    activeSubscriptions: 523,
    trialSubscriptions: 45,
    pausedSubscriptions: 34,
    cancelledSubscriptions: 55,
    monthlyRecurringRevenue: 38450.75,
    annualRecurringRevenue: 461409.00,
    averageRevenuePerUser: 73.50,
    customerLifetimeValue: 890.25,
    churnRate: 12.8,
    retentionRate: 87.2,
    conversionRate: 78.5,
    avgSubscriptionLength: 8.5,
    totalRevenue: 584750.50,
    growthRate: 15.6
  });

  const [billing, setBilling] = useState([
    {
      id: 'BILL-001',
      subscriptionId: 'SUB-001',
      customerName: 'John Doe',
      planName: 'Cannabis Connoisseur',
      amount: 89.99,
      discountAmount: 9.00,
      finalAmount: 80.99,
      billingDate: '2024-08-15',
      dueDate: '2024-08-15',
      paidDate: '2024-08-15',
      status: 'Paid',
      paymentMethod: 'Credit Card',
      invoiceNumber: 'INV-2024-001',
      taxAmount: 6.48,
      currency: 'USD',
      billingCycle: 'Monthly',
      nextBillingDate: '2024-09-15'
    },
    {
      id: 'BILL-002',
      subscriptionId: 'SUB-002',
      customerName: 'Sarah Johnson',
      planName: 'Wellness Explorer',
      amount: 199.99,
      discountAmount: 0,
      finalAmount: 199.99,
      billingDate: '2024-08-01',
      dueDate: '2024-08-01',
      paidDate: '2024-08-01',
      status: 'Paid',
      paymentMethod: 'Debit Card',
      invoiceNumber: 'INV-2024-002',
      taxAmount: 16.00,
      currency: 'USD',
      billingCycle: 'Quarterly',
      nextBillingDate: '2024-11-01'
    },
    {
      id: 'BILL-003',
      subscriptionId: 'SUB-003',
      customerName: 'Mike Chen',
      planName: 'Budget Basics',
      amount: 39.99,
      discountAmount: 8.00,
      finalAmount: 31.99,
      billingDate: '2024-07-10',
      dueDate: '2024-07-10',
      paidDate: '2024-07-12',
      status: 'Paid',
      paymentMethod: 'Bank Transfer',
      invoiceNumber: 'INV-2024-003',
      taxAmount: 2.56,
      currency: 'USD',
      billingCycle: 'Monthly',
      nextBillingDate: '2024-10-10'
    },
    {
      id: 'BILL-004',
      subscriptionId: 'SUB-006',
      customerName: 'Emma Wilson',
      planName: 'Cannabis Connoisseur',
      amount: 89.99,
      discountAmount: 0,
      finalAmount: 89.99,
      billingDate: '2024-08-20',
      dueDate: '2024-08-20',
      paidDate: null,
      status: 'Overdue',
      paymentMethod: 'Credit Card',
      invoiceNumber: 'INV-2024-004',
      taxAmount: 7.20,
      currency: 'USD',
      billingCycle: 'Monthly',
      nextBillingDate: '2024-09-20'
    },
    {
      id: 'BILL-005',
      subscriptionId: 'SUB-007',
      customerName: 'David Brown',
      planName: 'Micro-Dose Master',
      amount: 69.99,
      discountAmount: 0,
      finalAmount: 69.99,
      billingDate: '2024-08-25',
      dueDate: '2024-08-25',
      paidDate: null,
      status: 'Pending',
      paymentMethod: 'Credit Card',
      invoiceNumber: 'INV-2024-005',
      taxAmount: 5.60,
      currency: 'USD',
      billingCycle: 'Monthly',
      nextBillingDate: '2024-09-25'
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAM-001',
      name: 'Summer Trial Promotion',
      description: '30-day free trial for new subscribers',
      type: 'Trial Extension',
      startDate: '2024-06-21',
      endDate: '2024-09-21',
      status: 'Active',
      targetPlans: ['PLAN-001', 'PLAN-002'],
      discount: {
        type: 'Free Trial',
        value: 100,
        duration: 30
      },
      metrics: {
        signups: 234,
        conversions: 184,
        conversionRate: 78.6,
        revenue: 16560.00,
        cost: 3450.00,
        roi: 4.8
      }
    },
    {
      id: 'CAM-002',
      name: 'Annual Plan Discount',
      description: '20% off annual subscriptions',
      type: 'Discount',
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      status: 'Active',
      targetPlans: ['PLAN-001', 'PLAN-002', 'PLAN-003'],
      discount: {
        type: 'Percentage',
        value: 20,
        duration: 12
      },
      metrics: {
        signups: 89,
        conversions: 67,
        conversionRate: 75.3,
        revenue: 45670.00,
        cost: 9134.00,
        roi: 5.0
      }
    },
    {
      id: 'CAM-003',
      name: 'Referral Bonus Program',
      description: 'Free month for successful referrals',
      type: 'Referral',
      startDate: '2024-08-01',
      endDate: '2024-12-31',
      status: 'Active',
      targetPlans: ['PLAN-001', 'PLAN-002', 'PLAN-003', 'PLAN-004'],
      discount: {
        type: 'Free Month',
        value: 100,
        duration: 1
      },
      metrics: {
        referrals: 156,
        conversions: 89,
        conversionRate: 57.1,
        revenue: 12450.00,
        cost: 2890.00,
        roi: 4.3
      }
    }
  ]);

  // Filter functions
  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.planName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || sub.status.toLowerCase() === selectedStatus;
    const matchesPlan = selectedPlan === 'all' || sub.planId === selectedPlan;
    const matchesBilling = selectedBilling === 'all' || sub.billingCycle.toLowerCase() === selectedBilling;
    return matchesSearch && matchesStatus && matchesPlan && matchesBilling;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Trial': return 'bg-blue-100 text-blue-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanTypeColor = (type) => {
    switch (type) {
      case 'Premium': return 'bg-purple-100 text-purple-800';
      case 'Standard': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-green-100 text-green-800';
      case 'Specialty': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBillingStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Trial': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanIcon = (type) => {
    switch (type) {
      case 'Premium': return '💎';
      case 'Standard': return '⭐';
      case 'Basic': return '🌱';
      case 'Specialty': return '🎯';
      default: return '📦';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Subscriptions</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSubscriptions}</p>
              <p className="text-sm text-blue-600">{analytics.activeSubscriptions} active</p>
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
              <p className="text-sm font-medium text-gray-600">Monthly Recurring Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.monthlyRecurringRevenue / 1000).toFixed(0)}k</p>
              <p className="text-sm text-green-600">+{analytics.growthRate}% growth</p>
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
              <p className="text-sm font-medium text-gray-600">Customer LTV</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.customerLifetimeValue}</p>
              <p className="text-sm text-purple-600">{analytics.avgSubscriptionLength} months avg</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.retentionRate}%</p>
              <p className="text-sm text-yellow-600">{analytics.churnRate}% churn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Subscription Plans</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div key={plan.id} className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-2xl">{getPlanIcon(plan.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{plan.name}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanTypeColor(plan.type)}`}>
                      {plan.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly:</span>
                    <span className="text-gray-900">${plan.monthlyPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subscribers:</span>
                    <span className="text-gray-900">{plan.subscriberCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Churn Rate:</span>
                    <span className="text-red-600">{plan.churnRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Satisfaction:</span>
                    <span className="text-green-600">{plan.satisfaction}/5.0</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Campaigns */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Campaigns</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.filter(c => c.status === 'Active').map((campaign) => (
              <div key={campaign.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-600">{campaign.description}</p>
                    <p className="text-xs text-gray-500">{campaign.startDate} - {campaign.endDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{campaign.metrics.signups}</p>
                      <p className="text-xs text-gray-500">Signups</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{campaign.metrics.conversionRate}%</p>
                      <p className="text-xs text-gray-500">Conversion</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${(campaign.metrics.revenue / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{campaign.metrics.roi}x</p>
                      <p className="text-xs text-gray-500">ROI</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Billing */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Billing Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {billing.slice(0, 5).map((bill) => (
              <div key={bill.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">💳</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{bill.customerName}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBillingStatusColor(bill.status)}`}>
                        {bill.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{bill.planName} - {bill.invoiceNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${bill.finalAmount}</p>
                  <p className="text-xs text-gray-500">{bill.billingDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Status Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Subscription Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">{analytics.activeSubscriptions}</div>
              <div className="text-sm text-gray-600">Active</div>
              <div className="text-xs text-gray-500">{((analytics.activeSubscriptions / analytics.totalSubscriptions) * 100).toFixed(1)}%</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{analytics.trialSubscriptions}</div>
              <div className="text-sm text-gray-600">Trial</div>
              <div className="text-xs text-gray-500">{((analytics.trialSubscriptions / analytics.totalSubscriptions) * 100).toFixed(1)}%</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{analytics.pausedSubscriptions}</div>
              <div className="text-sm text-gray-600">Paused</div>
              <div className="text-xs text-gray-500">{((analytics.pausedSubscriptions / analytics.totalSubscriptions) * 100).toFixed(1)}%</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">{analytics.cancelledSubscriptions}</div>
              <div className="text-sm text-gray-600">Cancelled</div>
              <div className="text-xs text-gray-500">{((analytics.cancelledSubscriptions / analytics.totalSubscriptions) * 100).toFixed(1)}%</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{analytics.conversionRate}%</div>
              <div className="text-sm text-gray-600">Trial Conversion</div>
              <div className="text-xs text-gray-500">Trial to paid</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search subscriptions..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="paused">Paused</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="all">All Plans</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>{plan.name}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedBilling}
              onChange={(e) => setSelectedBilling(e.target.value)}
            >
              <option value="all">All Billing</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annual">Annual</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {filteredSubscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getPlanIcon(subscription.planType)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{subscription.customerName}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanTypeColor(subscription.planType)}`}>
                      {subscription.planName}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                      {subscription.status}
                    </span>
                    <span className="text-xs text-gray-500">{subscription.billingCycle}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Manage
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Billing
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Contact:</p>
                <p className="text-sm text-gray-600">{subscription.customerEmail}</p>
                <p className="text-sm text-gray-600">ID: {subscription.customerId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Billing:</p>
                <p className="text-sm text-gray-600">${subscription.amount}/{subscription.billingCycle.toLowerCase()}</p>
                <p className="text-sm text-gray-600">Next: {subscription.nextBillingDate || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Duration:</p>
                <p className="text-sm text-gray-600">Started: {subscription.startDate}</p>
                <p className="text-sm text-gray-600">Renewals: {subscription.renewalCount}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Value:</p>
                <p className="text-sm text-gray-600">Total Paid: ${subscription.totalPaid}</p>
                <p className="text-sm text-gray-600">Satisfaction: {subscription.satisfaction}/5.0</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{subscription.deliveryHistory}</p>
                <p className="text-xs text-gray-500">Deliveries</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{subscription.preferences.strainTypes.length}</p>
                <p className="text-xs text-gray-500">Strain Types</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">${(subscription.totalPaid / subscription.renewalCount || 0).toFixed(0)}</p>
                <p className="text-xs text-gray-500">Avg Payment</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{subscription.preferences.deliveryFrequency}</p>
                <p className="text-xs text-gray-500">Frequency</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Preferences:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Strain Types:</span> {subscription.preferences.strainTypes.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Product Types:</span> {subscription.preferences.productTypes.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Potency Level:</span> {subscription.preferences.potencyLevel}
                </div>
                <div>
                  <span className="font-medium">Delivery:</span> {subscription.preferences.deliveryFrequency}
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Delivery Address:</p>
              <p className="text-sm text-gray-600">
                {subscription.deliveryAddress.street}, {subscription.deliveryAddress.city}, {subscription.deliveryAddress.state} {subscription.deliveryAddress.zipCode}
              </p>
            </div>
            
            {subscription.discountCode && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Active Discount:</p>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    {subscription.discountCode}
                  </span>
                  <span className="text-sm text-gray-600">-${subscription.discountAmount}</span>
                </div>
              </div>
            )}
            
            {subscription.notes && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Notes:</p>
                <p className="text-sm text-gray-600">{subscription.notes}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Last Delivery: {subscription.lastDelivery}</span>
              <span>Next Delivery: {subscription.nextDelivery || 'N/A'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlans = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search plans..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Plan
            </button>
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getPlanIcon(plan.type)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanTypeColor(plan.type)}`}>
                    {plan.type}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Analytics
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{plan.description}</p>
            
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">${plan.monthlyPrice}</p>
                <p className="text-xs text-gray-500">Monthly</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">${plan.quarterlyPrice}</p>
                <p className="text-xs text-gray-500">Quarterly</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">${plan.annualPrice}</p>
                <p className="text-xs text-gray-500">Annual</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {plan.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
                {plan.features.length > 4 && (
                  <li className="text-gray-500">+ {plan.features.length - 4} more features</li>
                )}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Subscribers:</span>
                <span className="text-gray-900 ml-2">{plan.subscriberCount}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Churn Rate:</span>
                <span className="text-red-600 ml-2">{plan.churnRate}%</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Avg LTV:</span>
                <span className="text-green-600 ml-2">${plan.avgLifetimeValue}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Satisfaction:</span>
                <span className="text-blue-600 ml-2">{plan.satisfaction}/5.0</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Created: {plan.createdDate}</span>
              <span>Modified: {plan.lastModified}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">${(analytics.monthlyRecurringRevenue / 1000).toFixed(0)}k</div>
            <div className="text-sm text-gray-600">Monthly Recurring Revenue</div>
            <div className="text-xs text-gray-500 mt-1">+{analytics.growthRate}% growth</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">${(analytics.annualRecurringRevenue / 1000).toFixed(0)}k</div>
            <div className="text-sm text-gray-600">Annual Recurring Revenue</div>
            <div className="text-xs text-gray-500 mt-1">Projected</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">${analytics.averageRevenuePerUser}</div>
            <div className="text-sm text-gray-600">Average Revenue Per User</div>
            <div className="text-xs text-gray-500 mt-1">Monthly</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{analytics.churnRate}%</div>
            <div className="text-sm text-gray-600">Churn Rate</div>
            <div className="text-xs text-gray-500 mt-1">Monthly</div>
          </div>
        </div>
      </div>

      {/* Plan Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Plan Performance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {plans.sort((a, b) => b.subscriberCount - a.subscriberCount).map((plan) => (
              <div key={plan.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-xl">{getPlanIcon(plan.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{plan.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlanTypeColor(plan.type)}`}>
                        {plan.type}
                      </span>
                      <span className="text-xs text-gray-500">${plan.monthlyPrice}/month</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{plan.subscriberCount}</p>
                      <p className="text-xs text-gray-500">Subscribers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-red-600">{plan.churnRate}%</p>
                      <p className="text-xs text-gray-500">Churn Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${plan.avgLifetimeValue}</p>
                      <p className="text-xs text-gray-500">Avg LTV</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{plan.satisfaction}</p>
                      <p className="text-xs text-gray-500">Satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Metrics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${(analytics.totalRevenue / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-xs text-gray-500 mt-1">All time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${analytics.customerLifetimeValue}</div>
              <div className="text-sm text-gray-600">Customer Lifetime Value</div>
              <div className="text-xs text-gray-500 mt-1">Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{analytics.avgSubscriptionLength}</div>
              <div className="text-sm text-gray-600">Avg Subscription Length</div>
              <div className="text-xs text-gray-500 mt-1">Months</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Trial Signups</h4>
                <p className="text-sm text-gray-600">Users who started a trial</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{analytics.trialSubscriptions + Math.round(analytics.trialSubscriptions * 0.3)}</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Trial Conversions</h4>
                <p className="text-sm text-gray-600">Trials converted to paid</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{Math.round((analytics.trialSubscriptions + Math.round(analytics.trialSubscriptions * 0.3)) * analytics.conversionRate / 100)}</p>
                <p className="text-xs text-gray-500">{analytics.conversionRate}% conversion rate</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Active Subscriptions</h4>
                <p className="text-sm text-gray-600">Currently paying subscribers</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">{analytics.activeSubscriptions}</p>
                <p className="text-xs text-gray-500">{analytics.retentionRate}% retention</p>
              </div>
            </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
          <p className="mt-2 text-gray-600">Manage subscription plans, billing, and customer lifecycle</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'subscriptions', name: 'Subscriptions', icon: '📋' },
              { id: 'plans', name: 'Plans', icon: '📦' },
              { id: 'analytics', name: 'Analytics', icon: '📈' }
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
        {activeTab === 'subscriptions' && renderSubscriptions()}
        {activeTab === 'plans' && renderPlans()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default SubscriptionModule;

