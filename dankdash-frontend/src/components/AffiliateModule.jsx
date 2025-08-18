import React, { useState, useEffect } from 'react';

const AffiliateModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCommissionType, setSelectedCommissionType] = useState('all');

  // Mock affiliate data
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
      }
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
      }
    },
    {
      id: 'AFF-003',
      name: 'Budget Cannabis Reviews',
      email: 'info@budgetcannabis.com',
      website: 'https://budgetcannabis.com',
      socialMedia: {
        instagram: '@budgetcannabis',
        youtube: 'BudgetCannabisTips',
        tiktok: '@budgetcannabis',
        followers: 45000
      },
      joinDate: '2024-03-10',
      status: 'Active',
      tier: 'Bronze',
      commissionRate: 8.0,
      commissionType: 'Percentage',
      totalEarnings: 2340.50,
      totalSales: 29256.25,
      totalClicks: 5670,
      totalConversions: 89,
      conversionRate: 1.57,
      lastActivity: '2024-08-12',
      paymentMethod: 'Check',
      paymentSchedule: 'Monthly',
      lastPayment: '2024-08-01',
      nextPayment: '2024-09-01',
      pendingCommission: 450.25,
      referralCode: 'BUDGET8',
      customLinks: 1,
      campaigns: ['Budget Basics'],
      notes: 'Targets budget-conscious customers, consistent performance',
      contactPerson: 'Alex Kim',
      phone: '+1-555-0125',
      address: {
        street: '789 Budget Blvd',
        city: 'San Diego',
        state: 'CA',
        zipCode: '92101'
      },
      taxInfo: {
        taxId: '45-6789012',
        w9Status: 'Pending',
        taxForm: 'W-9'
      }
    },
    {
      id: 'AFF-004',
      name: 'Premium Cannabis Collective',
      email: 'elite@premiumcannabis.com',
      website: 'https://premiumcannabis.com',
      socialMedia: {
        instagram: '@premiumcannabis',
        youtube: 'PremiumCannabisCo',
        tiktok: null,
        followers: 67000
      },
      joinDate: '2024-04-05',
      status: 'Pending',
      tier: 'Silver',
      commissionRate: 12.0,
      commissionType: 'Percentage',
      totalEarnings: 1890.75,
      totalSales: 15756.25,
      totalClicks: 3450,
      totalConversions: 45,
      conversionRate: 1.30,
      lastActivity: '2024-08-10',
      paymentMethod: 'Bank Transfer',
      paymentSchedule: 'Monthly',
      lastPayment: '2024-07-01',
      nextPayment: '2024-09-01',
      pendingCommission: 890.75,
      referralCode: 'PREMIUM12',
      customLinks: 2,
      campaigns: ['Cannabis Connoisseur'],
      notes: 'New affiliate, pending approval for higher tier',
      contactPerson: 'Lisa Rodriguez',
      phone: '+1-555-0126',
      address: {
        street: '321 Premium Dr',
        city: 'Oakland',
        state: 'CA',
        zipCode: '94601'
      },
      taxInfo: {
        taxId: '78-9012345',
        w9Status: 'Pending',
        taxForm: 'W-9'
      }
    },
    {
      id: 'AFF-005',
      name: 'Micro-Dose Masters',
      email: 'hello@microdosemasters.com',
      website: 'https://microdosemasters.com',
      socialMedia: {
        instagram: '@microdosemasters',
        youtube: 'MicroDoseMasters',
        tiktok: '@microdose',
        followers: 34000
      },
      joinDate: '2024-05-20',
      status: 'Suspended',
      tier: 'Bronze',
      commissionRate: 8.0,
      commissionType: 'Percentage',
      totalEarnings: 890.25,
      totalSales: 11128.13,
      totalClicks: 2340,
      totalConversions: 28,
      conversionRate: 1.20,
      lastActivity: '2024-07-15',
      paymentMethod: 'PayPal',
      paymentSchedule: 'Monthly',
      lastPayment: '2024-07-01',
      nextPayment: null,
      pendingCommission: 0,
      referralCode: 'MICRO8',
      customLinks: 1,
      campaigns: ['Micro-Dose Master'],
      notes: 'Suspended due to policy violation, under review',
      contactPerson: 'David Brown',
      phone: '+1-555-0127',
      address: {
        street: '654 Micro Ln',
        city: 'Sacramento',
        state: 'CA',
        zipCode: '95814'
      },
      taxInfo: {
        taxId: '23-4567890',
        w9Status: 'Incomplete',
        taxForm: 'W-9'
      }
    }
  ]);

  const [commissionStructure, setCommissionStructure] = useState([
    {
      id: 'TIER-001',
      name: 'Bronze',
      description: 'Entry level affiliate tier',
      requirements: {
        minSales: 0,
        minConversions: 0,
        minClicks: 0
      },
      benefits: {
        commissionRate: 8.0,
        bonusThreshold: 1000,
        bonusRate: 1.0,
        paymentSchedule: 'Monthly',
        customLinks: 1,
        marketingMaterials: 'Basic',
        supportLevel: 'Standard'
      },
      affiliateCount: 156,
      avgEarnings: 450.25,
      color: '#CD7F32'
    },
    {
      id: 'TIER-002',
      name: 'Silver',
      description: 'Intermediate affiliate tier with enhanced benefits',
      requirements: {
        minSales: 10000,
        minConversions: 50,
        minClicks: 2000
      },
      benefits: {
        commissionRate: 12.0,
        bonusThreshold: 2500,
        bonusRate: 2.0,
        paymentSchedule: 'Bi-weekly',
        customLinks: 3,
        marketingMaterials: 'Enhanced',
        supportLevel: 'Priority'
      },
      affiliateCount: 89,
      avgEarnings: 1250.75,
      color: '#C0C0C0'
    },
    {
      id: 'TIER-003',
      name: 'Gold',
      description: 'Premium affiliate tier with maximum benefits',
      requirements: {
        minSales: 25000,
        minConversions: 100,
        minClicks: 5000
      },
      benefits: {
        commissionRate: 15.0,
        bonusThreshold: 5000,
        bonusRate: 3.0,
        paymentSchedule: 'Weekly',
        customLinks: 5,
        marketingMaterials: 'Premium',
        supportLevel: 'VIP'
      },
      affiliateCount: 34,
      avgEarnings: 3450.50,
      color: '#FFD700'
    },
    {
      id: 'TIER-004',
      name: 'Platinum',
      description: 'Elite affiliate tier for top performers',
      requirements: {
        minSales: 50000,
        minConversions: 200,
        minClicks: 10000
      },
      benefits: {
        commissionRate: 20.0,
        bonusThreshold: 10000,
        bonusRate: 5.0,
        paymentSchedule: 'Weekly',
        customLinks: 10,
        marketingMaterials: 'Custom',
        supportLevel: 'Dedicated'
      },
      affiliateCount: 12,
      avgEarnings: 8920.75,
      color: '#E5E4E2'
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAM-001',
      name: 'Summer Sale Affiliate Push',
      description: 'Special commission boost for summer promotion',
      startDate: '2024-06-21',
      endDate: '2024-09-21',
      status: 'Active',
      commissionBoost: 5.0,
      targetTiers: ['Bronze', 'Silver', 'Gold'],
      targetProducts: ['All'],
      minOrderValue: 50,
      maxCommission: 500,
      participatingAffiliates: 234,
      totalSales: 156780.50,
      totalCommissions: 18450.75,
      avgOrderValue: 89.50,
      conversionRate: 2.1,
      roi: 8.5
    },
    {
      id: 'CAM-002',
      name: 'New Customer Acquisition',
      description: 'Bonus for bringing in first-time customers',
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      status: 'Active',
      commissionBoost: 10.0,
      targetTiers: ['Silver', 'Gold', 'Platinum'],
      targetProducts: ['Starter Packs'],
      minOrderValue: 75,
      maxCommission: 100,
      participatingAffiliates: 89,
      totalSales: 89450.25,
      totalCommissions: 12450.75,
      avgOrderValue: 125.75,
      conversionRate: 3.2,
      roi: 7.2
    },
    {
      id: 'CAM-003',
      name: 'Premium Product Focus',
      description: 'Higher commissions for premium product sales',
      startDate: '2024-08-01',
      endDate: '2024-10-31',
      status: 'Active',
      commissionBoost: 7.5,
      targetTiers: ['Gold', 'Platinum'],
      targetProducts: ['Premium Flower', 'Concentrates'],
      minOrderValue: 100,
      maxCommission: 250,
      participatingAffiliates: 45,
      totalSales: 67890.75,
      totalCommissions: 8920.50,
      avgOrderValue: 156.25,
      conversionRate: 1.8,
      roi: 7.6
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalAffiliates: 291,
    activeAffiliates: 245,
    pendingAffiliates: 23,
    suspendedAffiliates: 23,
    totalCommissionsPaid: 156780.50,
    pendingCommissions: 23450.75,
    totalSales: 1245670.25,
    avgCommissionRate: 12.5,
    avgConversionRate: 1.85,
    totalClicks: 89450,
    totalConversions: 1654,
    topPerformingTier: 'Gold',
    monthlyGrowth: 15.6,
    revenueFromAffiliates: 245670.50
  });

  const [payments, setPayments] = useState([
    {
      id: 'PAY-001',
      affiliateId: 'AFF-001',
      affiliateName: 'Cannabis Influencer Pro',
      amount: 1250.50,
      commissionPeriod: '2024-07-01 to 2024-07-31',
      paymentDate: '2024-08-01',
      paymentMethod: 'Bank Transfer',
      status: 'Paid',
      transactionId: 'TXN-2024-001',
      taxWithheld: 125.05,
      netAmount: 1125.45,
      currency: 'USD',
      salesCount: 45,
      totalSalesValue: 8336.67
    },
    {
      id: 'PAY-002',
      affiliateId: 'AFF-002',
      affiliateName: 'Wellness Blog Network',
      amount: 890.75,
      commissionPeriod: '2024-07-15 to 2024-07-31',
      paymentDate: '2024-08-01',
      paymentMethod: 'PayPal',
      status: 'Paid',
      transactionId: 'TXN-2024-002',
      taxWithheld: 89.08,
      netAmount: 801.67,
      currency: 'USD',
      salesCount: 32,
      totalSalesValue: 7422.92
    },
    {
      id: 'PAY-003',
      affiliateId: 'AFF-003',
      affiliateName: 'Budget Cannabis Reviews',
      amount: 450.25,
      commissionPeriod: '2024-07-01 to 2024-07-31',
      paymentDate: '2024-08-01',
      paymentMethod: 'Check',
      status: 'Processing',
      transactionId: 'TXN-2024-003',
      taxWithheld: 45.03,
      netAmount: 405.22,
      currency: 'USD',
      salesCount: 18,
      totalSalesValue: 5628.13
    },
    {
      id: 'PAY-004',
      affiliateId: 'AFF-001',
      affiliateName: 'Cannabis Influencer Pro',
      amount: 1450.75,
      commissionPeriod: '2024-08-01 to 2024-08-15',
      paymentDate: '2024-08-16',
      paymentMethod: 'Bank Transfer',
      status: 'Pending',
      transactionId: null,
      taxWithheld: 145.08,
      netAmount: 1305.67,
      currency: 'USD',
      salesCount: 52,
      totalSalesValue: 9671.67
    },
    {
      id: 'PAY-005',
      affiliateId: 'AFF-004',
      affiliateName: 'Premium Cannabis Collective',
      amount: 890.75,
      commissionPeriod: '2024-07-01 to 2024-07-31',
      paymentDate: '2024-08-01',
      paymentMethod: 'Bank Transfer',
      status: 'Failed',
      transactionId: null,
      taxWithheld: 89.08,
      netAmount: 801.67,
      currency: 'USD',
      salesCount: 28,
      totalSalesValue: 7422.92
    }
  ]);

  // Filter functions
  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.referralCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || affiliate.status.toLowerCase() === selectedStatus;
    const matchesTier = selectedTier === 'all' || affiliate.tier.toLowerCase() === selectedTier;
    return matchesSearch && matchesStatus && matchesTier;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierIcon = (tier) => {
    switch (tier) {
      case 'Bronze': return '🥉';
      case 'Silver': return '🥈';
      case 'Gold': return '🥇';
      case 'Platinum': return '💎';
      default: return '👤';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Affiliates</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAffiliates}</p>
              <p className="text-sm text-blue-600">{analytics.activeAffiliates} active</p>
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
              <p className="text-sm font-medium text-gray-600">Commissions Paid</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalCommissionsPaid / 1000).toFixed(0)}k</p>
              <p className="text-sm text-green-600">${(analytics.pendingCommissions / 1000).toFixed(0)}k pending</p>
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
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalSales / 1000).toFixed(0)}k</p>
              <p className="text-sm text-purple-600">{analytics.avgConversionRate}% conversion</p>
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
              <p className="text-sm font-medium text-gray-600">Avg Commission Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgCommissionRate}%</p>
              <p className="text-sm text-yellow-600">+{analytics.monthlyGrowth}% growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Tiers */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Commission Tiers</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commissionStructure.map((tier) => (
              <div key={tier.id} className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: tier.color + '20' }}>
                    <span className="text-2xl">{getTierIcon(tier.name)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tier.name}</h4>
                    <p className="text-sm text-gray-500">{tier.affiliateCount} affiliates</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission Rate:</span>
                    <span className="text-gray-900">{tier.benefits.commissionRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Custom Links:</span>
                    <span className="text-gray-900">{tier.benefits.customLinks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Earnings:</span>
                    <span className="text-green-600">${tier.avgEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment:</span>
                    <span className="text-blue-600">{tier.benefits.paymentSchedule}</span>
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
                      <p className="text-sm font-medium text-gray-900">{campaign.participatingAffiliates}</p>
                      <p className="text-xs text-gray-500">Affiliates</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">+{campaign.commissionBoost}%</p>
                      <p className="text-xs text-gray-500">Boost</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${(campaign.totalSales / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Sales</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{campaign.roi}x</p>
                      <p className="text-xs text-gray-500">ROI</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Affiliates */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Affiliates</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {affiliates.filter(a => a.status === 'Active').sort((a, b) => b.totalEarnings - a.totalEarnings).slice(0, 5).map((affiliate, index) => (
              <div key={affiliate.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{affiliate.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(affiliate.tier)}`}>
                        {affiliate.tier}
                      </span>
                      <span className="text-xs text-gray-500">{affiliate.referralCode}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">${affiliate.totalEarnings.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Total Earnings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{affiliate.totalConversions}</p>
                      <p className="text-xs text-gray-500">Conversions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{affiliate.conversionRate}%</p>
                      <p className="text-xs text-gray-500">Conv. Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">💳</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{payment.affiliateName}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{payment.commissionPeriod}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${payment.amount}</p>
                  <p className="text-xs text-gray-500">{payment.paymentDate}</p>
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
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search affiliates..."
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
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
            >
              <option value="all">All Tiers</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Affiliate
            </button>
          </div>
        </div>
      </div>

      {/* Affiliates List */}
      <div className="space-y-4">
        {filteredAffiliates.map((affiliate) => (
          <div key={affiliate.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getTierIcon(affiliate.tier)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{affiliate.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(affiliate.tier)}`}>
                      {affiliate.tier}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(affiliate.status)}`}>
                      {affiliate.status}
                    </span>
                    <span className="text-xs text-gray-500">{affiliate.referralCode}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Manage
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Payments
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Contact:</p>
                <p className="text-sm text-gray-600">{affiliate.email}</p>
                <p className="text-sm text-gray-600">{affiliate.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Website:</p>
                <p className="text-sm text-gray-600">{affiliate.website}</p>
                <p className="text-sm text-gray-600">Joined: {affiliate.joinDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Commission:</p>
                <p className="text-sm text-gray-600">{affiliate.commissionRate}% {affiliate.commissionType}</p>
                <p className="text-sm text-gray-600">Payment: {affiliate.paymentSchedule}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Social Media:</p>
                <p className="text-sm text-gray-600">{affiliate.socialMedia.instagram || 'N/A'}</p>
                <p className="text-sm text-gray-600">{affiliate.socialMedia.followers.toLocaleString()} followers</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">${affiliate.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Earnings</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">${affiliate.totalSales.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Total Sales</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{affiliate.totalConversions}</p>
                <p className="text-xs text-gray-500">Conversions</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{affiliate.conversionRate}%</p>
                <p className="text-xs text-gray-500">Conv. Rate</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Active Campaigns:</p>
              <div className="flex flex-wrap gap-2">
                {affiliate.campaigns.map((campaign, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {campaign}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Payment Info:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Method:</span> {affiliate.paymentMethod}
                </div>
                <div>
                  <span className="font-medium">Last Payment:</span> {affiliate.lastPayment}
                </div>
                <div>
                  <span className="font-medium">Pending:</span> ${affiliate.pendingCommission}
                </div>
              </div>
            </div>
            
            {affiliate.notes && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Notes:</p>
                <p className="text-sm text-gray-600">{affiliate.notes}</p>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Contact: {affiliate.contactPerson}</span>
              <span>Last Activity: {affiliate.lastActivity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCommissions = () => (
    <div className="space-y-6">
      {/* Commission Structure */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Commission Structure</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {commissionStructure.map((tier) => (
              <div key={tier.id} className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4" style={{ backgroundColor: tier.color + '20' }}>
                      <span className="text-2xl">{getTierIcon(tier.name)}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{tier.name}</h4>
                      <p className="text-sm text-gray-600">{tier.description}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                      Edit
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Requirements</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Minimum Sales:</span>
                        <span className="text-gray-900">${tier.requirements.minSales.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Minimum Conversions:</span>
                        <span className="text-gray-900">{tier.requirements.minConversions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Minimum Clicks:</span>
                        <span className="text-gray-900">{tier.requirements.minClicks.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Benefits</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Commission Rate:</span>
                        <span className="text-gray-900">{tier.benefits.commissionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bonus Rate:</span>
                        <span className="text-gray-900">{tier.benefits.bonusRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Schedule:</span>
                        <span className="text-gray-900">{tier.benefits.paymentSchedule}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Custom Links:</span>
                        <span className="text-gray-900">{tier.benefits.customLinks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Support Level:</span>
                        <span className="text-gray-900">{tier.benefits.supportLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-900">{tier.affiliateCount}</p>
                    <p className="text-xs text-gray-500">Affiliates</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">${tier.avgEarnings}</p>
                    <p className="text-xs text-gray-500">Avg Earnings</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{((tier.affiliateCount / analytics.totalAffiliates) * 100).toFixed(1)}%</p>
                    <p className="text-xs text-gray-500">Distribution</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Commission Payments</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">💳</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{payment.affiliateName}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                      <span className="text-xs text-gray-500">{payment.paymentMethod}</span>
                    </div>
                    <p className="text-sm text-gray-600">{payment.commissionPeriod}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">${payment.amount}</p>
                      <p className="text-xs text-gray-500">Gross Amount</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">${payment.netAmount}</p>
                      <p className="text-xs text-gray-500">Net Amount</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{payment.salesCount}</p>
                      <p className="text-xs text-gray-500">Sales</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{payment.paymentDate}</p>
                      <p className="text-xs text-gray-500">Payment Date</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{analytics.totalClicks.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Clicks</div>
            <div className="text-xs text-gray-500 mt-1">All time</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.totalConversions}</div>
            <div className="text-sm text-gray-600">Total Conversions</div>
            <div className="text-xs text-gray-500 mt-1">{analytics.avgConversionRate}% rate</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">${(analytics.revenueFromAffiliates / 1000).toFixed(0)}k</div>
            <div className="text-sm text-gray-600">Revenue from Affiliates</div>
            <div className="text-xs text-gray-500 mt-1">Total generated</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{analytics.monthlyGrowth}%</div>
            <div className="text-sm text-gray-600">Monthly Growth</div>
            <div className="text-xs text-gray-500 mt-1">Affiliate program</div>
          </div>
        </div>
      </div>

      {/* Tier Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Tier Performance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {commissionStructure.sort((a, b) => b.avgEarnings - a.avgEarnings).map((tier) => (
              <div key={tier.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: tier.color + '20' }}>
                    <span className="text-xl">{getTierIcon(tier.name)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tier.name}</h4>
                    <p className="text-sm text-gray-600">{tier.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{tier.affiliateCount}</p>
                      <p className="text-xs text-gray-500">Affiliates</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{tier.benefits.commissionRate}%</p>
                      <p className="text-xs text-gray-500">Commission</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${tier.avgEarnings}</p>
                      <p className="text-xs text-gray-500">Avg Earnings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{((tier.affiliateCount / analytics.totalAffiliates) * 100).toFixed(1)}%</p>
                      <p className="text-xs text-gray-500">Distribution</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {campaigns.sort((a, b) => b.roi - a.roi).map((campaign) => (
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
                      <p className="text-sm font-medium text-gray-900">{campaign.participatingAffiliates}</p>
                      <p className="text-xs text-gray-500">Affiliates</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">${(campaign.totalSales / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Sales</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${(campaign.totalCommissions / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Commissions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{campaign.roi}x</p>
                      <p className="text-xs text-gray-500">ROI</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${(analytics.totalSales / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Total Sales</div>
              <div className="text-xs text-gray-500 mt-1">Generated by affiliates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${(analytics.totalCommissionsPaid / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Commissions Paid</div>
              <div className="text-xs text-gray-500 mt-1">To affiliates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{((analytics.totalCommissionsPaid / analytics.totalSales) * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Commission Rate</div>
              <div className="text-xs text-gray-500 mt-1">Average across all tiers</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Affiliate Management</h1>
          <p className="mt-2 text-gray-600">Manage affiliate partners, commissions, and performance tracking</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'affiliates', name: 'Affiliates', icon: '👥' },
              { id: 'commissions', name: 'Commissions', icon: '💰' },
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
        {activeTab === 'affiliates' && renderAffiliates()}
        {activeTab === 'commissions' && renderCommissions()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default AffiliateModule;

