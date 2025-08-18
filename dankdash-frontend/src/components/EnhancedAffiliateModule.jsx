import React, { useState, useEffect } from 'react';

const EnhancedAffiliateModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCommissionType, setSelectedCommissionType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [loading, setLoading] = useState(false);

  // Enhanced affiliate data with full functionality
  const [affiliates, setAffiliates] = useState([
    {
      id: 'AFF-001',
      name: 'Cannabis Influencer Pro',
      email: 'contact@cannabisinfluencer.com',
      website: 'https://cannabisinfluencer.com',
      socialMedia: {
        instagram: '@cannabisinfluencer',
        youtube: 'CannabisInfluencerPro',
        tiktok: '@cannabispro',
        followers: 125000
      },
      joinDate: '2024-01-15',
      status: 'Active',
      tier: 'Gold',
      commissionRate: 15.0,
      commissionType: 'Percentage',
      totalEarnings: 8450.75,
      totalSales: 56338.33,
      totalClicks: 12450,
      totalConversions: 234,
      conversionRate: 1.88,
      lastActivity: '2024-08-14',
      paymentMethod: 'Bank Transfer',
      paymentSchedule: 'Monthly',
      lastPayment: '2024-08-01',
      nextPayment: '2024-09-01',
      pendingCommission: 1250.50,
      referralCode: 'CANNPRO15',
      customLinks: 3,
      campaigns: ['Summer Sale', 'New Customer Promo'],
      notes: 'Top performing affiliate, excellent engagement rates',
      contactPerson: 'Sarah Johnson',
      phone: '+1-555-0123',
      address: {
        street: '123 Cannabis St',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210'
      },
      taxInfo: {
        taxId: '12-3456789',
        w9Status: 'Completed',
        taxForm: 'W-9'
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-08-14'
    },
    {
      id: 'AFF-002',
      name: 'Wellness Blog Network',
      email: 'partnerships@wellnessblog.com',
      website: 'https://wellnessblog.com',
      socialMedia: {
        instagram: '@wellnessblog',
        youtube: 'WellnessBlogNetwork',
        tiktok: null,
        followers: 89000
      },
      joinDate: '2024-02-01',
      status: 'Active',
      tier: 'Silver',
      commissionRate: 12.0,
      commissionType: 'Percentage',
      totalEarnings: 5670.25,
      totalSales: 47252.08,
      totalClicks: 8920,
      totalConversions: 178,
      conversionRate: 2.00,
      lastActivity: '2024-08-13',
      paymentMethod: 'PayPal',
      paymentSchedule: 'Bi-weekly',
      lastPayment: '2024-08-01',
      nextPayment: '2024-08-15',
      pendingCommission: 890.75,
      referralCode: 'WELLNESS12',
      customLinks: 2,
      campaigns: ['Wellness Explorer', 'CBD Focus'],
      notes: 'Focuses on wellness and CBD products, good conversion rates',
      contactPerson: 'Mike Chen',
      phone: '+1-555-0124',
      address: {
        street: '456 Wellness Ave',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102'
      },
      taxInfo: {
        taxId: '98-7654321',
        w9Status: 'Completed',
        taxForm: 'W-9'
      },
      createdAt: '2024-02-01',
      updatedAt: '2024-08-13'
    },
    {
      id: 'AFF-003',
      name: 'Budget Cannabis Reviews',
      email: 'hello@budgetcannabis.com',
      website: 'https://budgetcannabis.com',
      socialMedia: {
        instagram: '@budgetcannabis',
        youtube: 'BudgetCannabisTips',
        tiktok: '@budgetcannabis',
        followers: 45000
      },
      joinDate: '2024-03-10',
      status: 'Pending',
      tier: 'Bronze',
      commissionRate: 8.0,
      commissionType: 'Percentage',
      totalEarnings: 1245.50,
      totalSales: 15568.75,
      totalClicks: 3450,
      totalConversions: 67,
      conversionRate: 1.94,
      lastActivity: '2024-08-12',
      paymentMethod: 'Check',
      paymentSchedule: 'Monthly',
      lastPayment: '2024-07-01',
      nextPayment: '2024-09-01',
      pendingCommission: 345.25,
      referralCode: 'BUDGET8',
      customLinks: 1,
      campaigns: ['Budget Basics'],
      notes: 'New affiliate, pending approval for higher tier',
      contactPerson: 'Alex Rodriguez',
      phone: '+1-555-0125',
      address: {
        street: '789 Budget Blvd',
        city: 'Oakland',
        state: 'CA',
        zipCode: '94610'
      },
      taxInfo: {
        taxId: '45-6789012',
        w9Status: 'Pending',
        taxForm: 'W-9'
      },
      createdAt: '2024-03-10',
      updatedAt: '2024-08-12'
    }
  ]);

  const [affiliateTiers, setAffiliateTiers] = useState([
    {
      id: 'TIER-001',
      name: 'Bronze',
      minSales: 0,
      maxSales: 24999,
      commissionRate: 8.0,
      color: '#CD7F32',
      benefits: [
        'Basic affiliate dashboard',
        'Monthly payments',
        'Email support',
        'Standard marketing materials'
      ],
      affiliateCount: 45,
      status: 'Active'
    },
    {
      id: 'TIER-002',
      name: 'Silver',
      minSales: 25000,
      maxSales: 74999,
      commissionRate: 12.0,
      color: '#C0C0C0',
      benefits: [
        'Enhanced dashboard',
        'Bi-weekly payments',
        'Priority support',
        'Custom marketing materials',
        'Performance bonuses'
      ],
      affiliateCount: 23,
      status: 'Active'
    },
    {
      id: 'TIER-003',
      name: 'Gold',
      minSales: 75000,
      maxSales: 999999,
      commissionRate: 15.0,
      color: '#FFD700',
      benefits: [
        'Premium dashboard',
        'Weekly payments',
        'Dedicated support',
        'Custom campaigns',
        'Higher commissions',
        'Exclusive products'
      ],
      affiliateCount: 12,
      status: 'Active'
    }
  ]);

  const [commissions, setCommissions] = useState([
    {
      id: 'COM-001',
      affiliateId: 'AFF-001',
      affiliateName: 'Cannabis Influencer Pro',
      orderId: 'ORD-12345',
      orderDate: '2024-08-14',
      orderAmount: 125.99,
      commissionRate: 15.0,
      commissionAmount: 18.90,
      status: 'Pending',
      payoutDate: null,
      referralCode: 'CANNPRO15',
      customerEmail: 'customer@example.com',
      productsSold: ['OG Kush 1/8oz', 'Gummy Bears 10mg'],
      createdAt: '2024-08-14'
    },
    {
      id: 'COM-002',
      affiliateId: 'AFF-002',
      affiliateName: 'Wellness Blog Network',
      orderId: 'ORD-12346',
      orderDate: '2024-08-13',
      orderAmount: 89.50,
      commissionRate: 12.0,
      commissionAmount: 10.74,
      status: 'Paid',
      payoutDate: '2024-08-15',
      referralCode: 'WELLNESS12',
      customerEmail: 'wellness@example.com',
      productsSold: ['CBD Tincture 30ml', 'Topical Cream'],
      createdAt: '2024-08-13'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalAffiliates: 80,
    activeAffiliates: 67,
    pendingAffiliates: 8,
    suspendedAffiliates: 5,
    totalCommissions: 45670.25,
    pendingPayouts: 8950.75,
    paidCommissions: 36719.50,
    totalSales: 342850.00,
    averageCommissionRate: 11.8,
    topPerformer: 'Cannabis Influencer Pro',
    conversionRate: 1.92,
    clickThroughRate: 3.45,
    newAffiliatesThisMonth: 12,
    totalClicks: 89450,
    totalConversions: 1718
  });

  // Form states
  const [affiliateForm, setAffiliateForm] = useState({
    name: '',
    email: '',
    website: '',
    contactPerson: '',
    phone: '',
    socialMedia: {
      instagram: '',
      youtube: '',
      tiktok: '',
      followers: 0
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: ''
    },
    tier: 'Bronze',
    commissionType: 'Percentage',
    paymentMethod: 'PayPal',
    paymentSchedule: 'Monthly',
    taxInfo: {
      taxId: '',
      taxForm: 'W-9'
    },
    notes: ''
  });

  const [payoutForm, setPayoutForm] = useState({
    affiliateId: '',
    amount: 0,
    paymentMethod: 'PayPal',
    notes: ''
  });

  // CRUD Operations for Affiliates
  const handleCreateAffiliate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const tier = affiliateTiers.find(t => t.name === affiliateForm.tier);
      
      const newAffiliate = {
        id: `AFF-${String(affiliates.length + 1).padStart(3, '0')}`,
        ...affiliateForm,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        commissionRate: tier.commissionRate,
        totalEarnings: 0,
        totalSales: 0,
        totalClicks: 0,
        totalConversions: 0,
        conversionRate: 0,
        lastActivity: new Date().toISOString().split('T')[0],
        lastPayment: null,
        nextPayment: getNextPaymentDate(affiliateForm.paymentSchedule),
        pendingCommission: 0,
        referralCode: generateReferralCode(affiliateForm.name),
        customLinks: 0,
        campaigns: [],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setAffiliates([...affiliates, newAffiliate]);
      setShowCreateModal(false);
      setAffiliateForm({
        name: '',
        email: '',
        website: '',
        contactPerson: '',
        phone: '',
        socialMedia: {
          instagram: '',
          youtube: '',
          tiktok: '',
          followers: 0
        },
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        },
        tier: 'Bronze',
        commissionType: 'Percentage',
        paymentMethod: 'PayPal',
        paymentSchedule: 'Monthly',
        taxInfo: {
          taxId: '',
          taxForm: 'W-9'
        },
        notes: ''
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalAffiliates: prev.totalAffiliates + 1,
        pendingAffiliates: prev.pendingAffiliates + 1
      }));

    } catch (error) {
      console.error('Error creating affiliate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditAffiliate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedAffiliates = affiliates.map(affiliate => 
        affiliate.id === selectedAffiliate.id 
          ? { ...affiliate, ...affiliateForm, updatedAt: new Date().toISOString().split('T')[0] }
          : affiliate
      );
      
      setAffiliates(updatedAffiliates);
      setShowEditModal(false);
      setSelectedAffiliate(null);
      
    } catch (error) {
      console.error('Error updating affiliate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAffiliate = async () => {
    setLoading(true);
    
    try {
      const updatedAffiliates = affiliates.filter(affiliate => affiliate.id !== selectedAffiliate.id);
      setAffiliates(updatedAffiliates);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalAffiliates: prev.totalAffiliates - 1,
        activeAffiliates: selectedAffiliate.status === 'Active' ? prev.activeAffiliates - 1 : prev.activeAffiliates,
        pendingAffiliates: selectedAffiliate.status === 'Pending' ? prev.pendingAffiliates - 1 : prev.pendingAffiliates
      }));
      
      setShowDeleteModal(false);
      setSelectedAffiliate(null);
      
    } catch (error) {
      console.error('Error deleting affiliate:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAffiliateStatus = (affiliateId, newStatus) => {
    const updatedAffiliates = affiliates.map(affiliate => 
      affiliate.id === affiliateId 
        ? { ...affiliate, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : affiliate
    );
    
    setAffiliates(updatedAffiliates);
  };

  const handleProcessPayout = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Update affiliate's pending commission and last payment
      const updatedAffiliates = affiliates.map(affiliate => 
        affiliate.id === payoutForm.affiliateId 
          ? { 
              ...affiliate, 
              pendingCommission: Math.max(0, affiliate.pendingCommission - payoutForm.amount),
              totalEarnings: affiliate.totalEarnings + payoutForm.amount,
              lastPayment: new Date().toISOString().split('T')[0],
              nextPayment: getNextPaymentDate(affiliate.paymentSchedule),
              updatedAt: new Date().toISOString().split('T')[0]
            }
          : affiliate
      );
      
      setAffiliates(updatedAffiliates);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        pendingPayouts: prev.pendingPayouts - payoutForm.amount,
        paidCommissions: prev.paidCommissions + payoutForm.amount
      }));
      
      setShowPayoutModal(false);
      setPayoutForm({
        affiliateId: '',
        amount: 0,
        paymentMethod: 'PayPal',
        notes: ''
      });
      
    } catch (error) {
      console.error('Error processing payout:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const generateReferralCode = (name) => {
    return name.replace(/\s+/g, '').toUpperCase().substring(0, 8) + Math.floor(Math.random() * 100);
  };

  const getNextPaymentDate = (schedule) => {
    const today = new Date();
    switch (schedule) {
      case 'Weekly':
        return new Date(today.setDate(today.getDate() + 7)).toISOString().split('T')[0];
      case 'Bi-weekly':
        return new Date(today.setDate(today.getDate() + 14)).toISOString().split('T')[0];
      case 'Monthly':
        return new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0];
      default:
        return new Date(today.setMonth(today.getMonth() + 1)).toISOString().split('T')[0];
    }
  };

  // Filter functions
  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.referralCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || affiliate.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesTier = selectedTier === 'all' || affiliate.tier.toLowerCase() === selectedTier.toLowerCase();
    const matchesCommissionType = selectedCommissionType === 'all' || affiliate.commissionType.toLowerCase() === selectedCommissionType.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesTier && matchesCommissionType;
  });

  const openEditModal = (affiliate) => {
    setSelectedAffiliate(affiliate);
    setAffiliateForm({
      name: affiliate.name,
      email: affiliate.email,
      website: affiliate.website,
      contactPerson: affiliate.contactPerson,
      phone: affiliate.phone,
      socialMedia: affiliate.socialMedia,
      address: affiliate.address,
      tier: affiliate.tier,
      commissionType: affiliate.commissionType,
      paymentMethod: affiliate.paymentMethod,
      paymentSchedule: affiliate.paymentSchedule,
      taxInfo: affiliate.taxInfo,
      notes: affiliate.notes
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (affiliate) => {
    setSelectedAffiliate(affiliate);
    setShowDeleteModal(true);
  };

  const openPayoutModal = (affiliate) => {
    setPayoutForm({
      affiliateId: affiliate.id,
      amount: affiliate.pendingCommission,
      paymentMethod: affiliate.paymentMethod,
      notes: ''
    });
    setShowPayoutModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTierColor = (tier) => {
    switch (tier.toLowerCase()) {
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#6B7280';
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAffiliates}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.activeAffiliates} Active</span>
            <span className="text-gray-500 ml-2">• +{analytics.newAffiliatesThisMonth} This Month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Commissions</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalCommissions.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-yellow-600 font-medium">${analytics.pendingPayouts.toLocaleString()} Pending</span>
            <span className="text-gray-500 ml-2">• ${analytics.paidCommissions.toLocaleString()} Paid</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalSales.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.conversionRate}% Conversion</span>
            <span className="text-gray-500 ml-2">• {analytics.totalConversions.toLocaleString()} Orders</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Commission</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageCommissionRate}%</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">{analytics.totalClicks.toLocaleString()} Clicks</span>
            <span className="text-gray-500 ml-2">• {analytics.clickThroughRate}% CTR</span>
          </div>
        </div>
      </div>

      {/* Tier Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Affiliate Tiers Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {affiliateTiers.map((tier) => (
              <div key={tier.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${tier.color}20` }}
                  >
                    <svg className="h-4 w-4" style={{ color: tier.color }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tier.name}</h4>
                    <p className="text-sm text-gray-500">${tier.minSales.toLocaleString()} - ${tier.maxSales === 999999 ? '∞' : tier.maxSales.toLocaleString()}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Affiliates</span>
                    <span className="font-medium text-gray-900">{tier.affiliateCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Commission Rate</span>
                    <span className="font-medium text-gray-900">{tier.commissionRate}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Top Performing Affiliates</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {affiliates
              .sort((a, b) => b.totalEarnings - a.totalEarnings)
              .slice(0, 5)
              .map((affiliate) => (
                <div key={affiliate.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {affiliate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{affiliate.name}</h4>
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: getTierColor(affiliate.tier) }}
                      >
                        {affiliate.tier}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{affiliate.referralCode}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>${affiliate.totalEarnings.toFixed(2)} earned</span>
                      <span>•</span>
                      <span>${affiliate.totalSales.toFixed(2)} sales</span>
                      <span>•</span>
                      <span>{affiliate.conversionRate}% conversion</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAffiliates = () => (
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
              placeholder="Search affiliates..."
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
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            <option value="all">All Tiers</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Affiliate</span>
          </button>
        </div>
      </div>

      {/* Affiliates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAffiliates.map((affiliate) => (
          <div key={affiliate.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">
                      {affiliate.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{affiliate.name}</h3>
                    <p className="text-sm text-gray-600">{affiliate.email}</p>
                    <p className="text-sm text-blue-600">{affiliate.referralCode}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span 
                    className="px-2 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: getTierColor(affiliate.tier) }}
                  >
                    {affiliate.tier}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(affiliate.status)}`}>
                    {affiliate.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-medium text-gray-900">${affiliate.totalEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Sales</span>
                  <span className="font-medium text-gray-900">${affiliate.totalSales.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Commission Rate</span>
                  <span className="font-medium text-gray-900">{affiliate.commissionRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-medium text-gray-900">{affiliate.conversionRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pending Commission</span>
                  <span className="font-medium text-green-600">${affiliate.pendingCommission.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>Joined: {new Date(affiliate.joinDate).toLocaleDateString()}</span>
                  <span>Last Active: {new Date(affiliate.lastActivity).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {affiliate.status === 'Pending' && (
                      <button
                        onClick={() => handleToggleAffiliateStatus(affiliate.id, 'Active')}
                        className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        title="Approve Affiliate"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                    {affiliate.status === 'Active' && (
                      <button
                        onClick={() => handleToggleAffiliateStatus(affiliate.id, 'Suspended')}
                        className="p-2 text-red-600 hover:text-red-700 transition-colors"
                        title="Suspend Affiliate"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                    {affiliate.pendingCommission > 0 && (
                      <button
                        onClick={() => openPayoutModal(affiliate)}
                        className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                        title="Process Payout"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(affiliate)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(affiliate)}
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

      {filteredAffiliates.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No affiliates found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first affiliate partner.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Affiliate
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderCommissions = () => (
    <div className="space-y-6">
      {/* Commission Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Commissions</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalCommissions.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Payouts</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.pendingPayouts.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid Commissions</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.paidCommissions.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Commissions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Commissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affiliate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {commissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{commission.affiliateName}</div>
                      <div className="text-sm text-gray-500">{commission.referralCode}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{commission.orderId}</div>
                    <div className="text-sm text-gray-500">{commission.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(commission.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${commission.orderAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${commission.commissionAmount.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">{commission.commissionRate}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      commission.status === 'Paid' ? 'text-green-600 bg-green-100' :
                      commission.status === 'Pending' ? 'text-yellow-600 bg-yellow-100' :
                      'text-gray-600 bg-gray-100'
                    }`}>
                      {commission.status}
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Affiliate Management</h1>
        <p className="text-gray-600 mt-1">Manage affiliate partners, commissions, and payouts</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'affiliates', name: 'Affiliates', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
            { id: 'commissions', name: 'Commissions', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' }
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
      {activeTab === 'affiliates' && renderAffiliates()}
      {activeTab === 'commissions' && renderCommissions()}

      {/* Create Affiliate Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add Affiliate</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateAffiliate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.name}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, name: e.target.value })}
                      placeholder="Cannabis Influencer Pro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.email}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, email: e.target.value })}
                      placeholder="contact@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.website}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, website: e.target.value })}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.contactPerson}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, contactPerson: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.phone}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, phone: e.target.value })}
                      placeholder="+1-555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.tier}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, tier: e.target.value })}
                    >
                      {affiliateTiers.map(tier => (
                        <option key={tier.id} value={tier.name}>{tier.name} - {tier.commissionRate}%</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Social Media</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.socialMedia.instagram}
                      onChange={(e) => setAffiliateForm({ 
                        ...affiliateForm, 
                        socialMedia: { ...affiliateForm.socialMedia, instagram: e.target.value }
                      })}
                      placeholder="Instagram handle"
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.socialMedia.youtube}
                      onChange={(e) => setAffiliateForm({ 
                        ...affiliateForm, 
                        socialMedia: { ...affiliateForm.socialMedia, youtube: e.target.value }
                      })}
                      placeholder="YouTube channel"
                    />
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.socialMedia.followers}
                      onChange={(e) => setAffiliateForm({ 
                        ...affiliateForm, 
                        socialMedia: { ...affiliateForm.socialMedia, followers: parseInt(e.target.value) || 0 }
                      })}
                      placeholder="Total followers"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.address.street}
                      onChange={(e) => setAffiliateForm({ 
                        ...affiliateForm, 
                        address: { ...affiliateForm.address, street: e.target.value }
                      })}
                      placeholder="Street Address"
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.address.city}
                      onChange={(e) => setAffiliateForm({ 
                        ...affiliateForm, 
                        address: { ...affiliateForm.address, city: e.target.value }
                      })}
                      placeholder="City"
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.address.state}
                      onChange={(e) => setAffiliateForm({ 
                        ...affiliateForm, 
                        address: { ...affiliateForm.address, state: e.target.value }
                      })}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.address.zipCode}
                      onChange={(e) => setAffiliateForm({ 
                        ...affiliateForm, 
                        address: { ...affiliateForm.address, zipCode: e.target.value }
                      })}
                      placeholder="ZIP Code"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.paymentMethod}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, paymentMethod: e.target.value })}
                    >
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Check">Check</option>
                      <option value="Stripe">Stripe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Schedule</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.paymentSchedule}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, paymentSchedule: e.target.value })}
                    >
                      <option value="Weekly">Weekly</option>
                      <option value="Bi-weekly">Bi-weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={affiliateForm.taxInfo.taxId}
                    onChange={(e) => setAffiliateForm({ 
                      ...affiliateForm, 
                      taxInfo: { ...affiliateForm.taxInfo, taxId: e.target.value }
                    })}
                    placeholder="12-3456789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={affiliateForm.notes}
                    onChange={(e) => setAffiliateForm({ ...affiliateForm, notes: e.target.value })}
                    placeholder="Additional notes about the affiliate..."
                  />
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
                    {loading ? 'Adding...' : 'Add Affiliate'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Affiliate Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Affiliate</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditAffiliate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.name}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={affiliateForm.email}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={affiliateForm.notes}
                    onChange={(e) => setAffiliateForm({ ...affiliateForm, notes: e.target.value })}
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
                    {loading ? 'Updating...' : 'Update Affiliate'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Affiliate Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Affiliate</h2>
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
                  Are you sure you want to delete <strong>{selectedAffiliate?.name}</strong>? This action cannot be undone and will remove all their commission data.
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
                  onClick={handleDeleteAffiliate}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Affiliate'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Process Payout Modal */}
      {showPayoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Process Payout</h2>
                <button
                  onClick={() => setShowPayoutModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleProcessPayout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={payoutForm.amount}
                    onChange={(e) => setPayoutForm({ ...payoutForm, amount: parseFloat(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={payoutForm.paymentMethod}
                    onChange={(e) => setPayoutForm({ ...payoutForm, paymentMethod: e.target.value })}
                  >
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Check">Check</option>
                    <option value="Stripe">Stripe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={payoutForm.notes}
                    onChange={(e) => setPayoutForm({ ...payoutForm, notes: e.target.value })}
                    placeholder="Payout notes..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowPayoutModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Process Payout'}
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

export default EnhancedAffiliateModule;

