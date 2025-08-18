import React, { useState, useEffect } from 'react';

const LoyaltyModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRewardType, setSelectedRewardType] = useState('all');

  // Mock loyalty program data
  const [members, setMembers] = useState([
    {
      id: 'MEM-001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1-555-0123',
      joinDate: '2024-01-15',
      tier: 'Gold',
      points: 2450,
      lifetimePoints: 8920,
      lifetimeSpent: 4560.75,
      status: 'Active',
      lastActivity: '2024-08-14',
      referrals: 3,
      orders: 45,
      avgOrderValue: 101.35,
      favoriteProducts: ['OG Kush', 'Blue Dream', 'Sour Diesel'],
      preferences: {
        categories: ['Flower', 'Edibles'],
        deliveryTime: 'Evening',
        communication: 'Email'
      },
      rewards: {
        earned: 12,
        redeemed: 8,
        pending: 2,
        expired: 1
      },
      milestones: {
        firstPurchase: '2024-01-20',
        tier1Achieved: '2024-03-15',
        tier2Achieved: '2024-06-10',
        tier3Achieved: '2024-08-01'
      }
    },
    {
      id: 'MEM-002',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1-555-0124',
      joinDate: '2024-02-01',
      tier: 'Platinum',
      points: 4680,
      lifetimePoints: 15670,
      lifetimeSpent: 7834.50,
      status: 'Active',
      lastActivity: '2024-08-14',
      referrals: 7,
      orders: 78,
      avgOrderValue: 100.44,
      favoriteProducts: ['Wedding Cake', 'Gelato', 'Purple Punch'],
      preferences: {
        categories: ['Flower', 'Concentrates', 'Edibles'],
        deliveryTime: 'Afternoon',
        communication: 'SMS'
      },
      rewards: {
        earned: 23,
        redeemed: 18,
        pending: 3,
        expired: 2
      },
      milestones: {
        firstPurchase: '2024-02-05',
        tier1Achieved: '2024-03-20',
        tier2Achieved: '2024-05-15',
        tier3Achieved: '2024-07-10'
      }
    },
    {
      id: 'MEM-003',
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1-555-0125',
      joinDate: '2024-03-10',
      tier: 'Silver',
      points: 1250,
      lifetimePoints: 3890,
      lifetimeSpent: 1945.25,
      status: 'Active',
      lastActivity: '2024-08-13',
      referrals: 1,
      orders: 23,
      avgOrderValue: 84.58,
      favoriteProducts: ['Green Crack', 'Jack Herer'],
      preferences: {
        categories: ['Flower'],
        deliveryTime: 'Morning',
        communication: 'Email'
      },
      rewards: {
        earned: 6,
        redeemed: 4,
        pending: 1,
        expired: 1
      },
      milestones: {
        firstPurchase: '2024-03-15',
        tier1Achieved: '2024-05-01',
        tier2Achieved: '2024-07-20',
        tier3Achieved: null
      }
    },
    {
      id: 'MEM-004',
      name: 'Alex Kim',
      email: 'alex.kim@email.com',
      phone: '+1-555-0126',
      joinDate: '2024-04-05',
      tier: 'Bronze',
      points: 680,
      lifetimePoints: 1450,
      lifetimeSpent: 725.00,
      status: 'Active',
      lastActivity: '2024-08-12',
      referrals: 0,
      orders: 12,
      avgOrderValue: 60.42,
      favoriteProducts: ['Granddaddy Purple'],
      preferences: {
        categories: ['Edibles'],
        deliveryTime: 'Evening',
        communication: 'Email'
      },
      rewards: {
        earned: 3,
        redeemed: 1,
        pending: 1,
        expired: 1
      },
      milestones: {
        firstPurchase: '2024-04-10',
        tier1Achieved: '2024-06-15',
        tier2Achieved: null,
        tier3Achieved: null
      }
    }
  ]);

  const [tiers, setTiers] = useState([
    {
      id: 'bronze',
      name: 'Bronze',
      description: 'Entry level membership with basic benefits',
      color: '#CD7F32',
      icon: '🥉',
      requirements: {
        minSpent: 0,
        minOrders: 0,
        minPoints: 0
      },
      benefits: {
        pointsMultiplier: 1.0,
        freeDeliveryThreshold: 75,
        birthdayBonus: 100,
        referralBonus: 50,
        exclusiveDeals: false,
        prioritySupport: false,
        earlyAccess: false
      },
      memberCount: 245,
      avgSpent: 650.25,
      retention: 78.5
    },
    {
      id: 'silver',
      name: 'Silver',
      description: 'Enhanced benefits for regular customers',
      color: '#C0C0C0',
      icon: '🥈',
      requirements: {
        minSpent: 500,
        minOrders: 5,
        minPoints: 1000
      },
      benefits: {
        pointsMultiplier: 1.25,
        freeDeliveryThreshold: 50,
        birthdayBonus: 200,
        referralBonus: 75,
        exclusiveDeals: true,
        prioritySupport: false,
        earlyAccess: false
      },
      memberCount: 189,
      avgSpent: 1850.75,
      retention: 85.2
    },
    {
      id: 'gold',
      name: 'Gold',
      description: 'Premium benefits for valued customers',
      color: '#FFD700',
      icon: '🥇',
      requirements: {
        minSpent: 2000,
        minOrders: 15,
        minPoints: 4000
      },
      benefits: {
        pointsMultiplier: 1.5,
        freeDeliveryThreshold: 25,
        birthdayBonus: 300,
        referralBonus: 100,
        exclusiveDeals: true,
        prioritySupport: true,
        earlyAccess: true
      },
      memberCount: 156,
      avgSpent: 4250.50,
      retention: 92.1
    },
    {
      id: 'platinum',
      name: 'Platinum',
      description: 'Elite status with maximum benefits',
      color: '#E5E4E2',
      icon: '💎',
      requirements: {
        minSpent: 5000,
        minOrders: 30,
        minPoints: 10000
      },
      benefits: {
        pointsMultiplier: 2.0,
        freeDeliveryThreshold: 0,
        birthdayBonus: 500,
        referralBonus: 150,
        exclusiveDeals: true,
        prioritySupport: true,
        earlyAccess: true
      },
      memberCount: 67,
      avgSpent: 8920.25,
      retention: 96.8
    }
  ]);

  const [rewards, setRewards] = useState([
    {
      id: 'REW-001',
      name: '10% Off Next Order',
      description: 'Get 10% discount on your next purchase',
      type: 'Discount',
      category: 'Percentage Discount',
      pointsCost: 500,
      value: 10,
      valueType: 'percentage',
      minOrderValue: 50,
      maxDiscount: 25,
      validDays: 30,
      status: 'Active',
      tierRestriction: null,
      usageLimit: 1,
      totalRedeemed: 234,
      totalIssued: 456,
      redemptionRate: 51.3,
      avgOrderValue: 89.50,
      createdDate: '2024-06-01',
      expiryDate: '2024-12-31'
    },
    {
      id: 'REW-002',
      name: 'Free Delivery',
      description: 'Free delivery on any order',
      type: 'Service',
      category: 'Delivery',
      pointsCost: 200,
      value: 15,
      valueType: 'fixed',
      minOrderValue: 0,
      maxDiscount: 15,
      validDays: 14,
      status: 'Active',
      tierRestriction: null,
      usageLimit: 1,
      totalRedeemed: 567,
      totalIssued: 789,
      redemptionRate: 71.9,
      avgOrderValue: 67.25,
      createdDate: '2024-05-15',
      expiryDate: '2024-12-31'
    },
    {
      id: 'REW-003',
      name: '$25 Store Credit',
      description: '$25 credit towards any purchase',
      type: 'Credit',
      category: 'Store Credit',
      pointsCost: 1000,
      value: 25,
      valueType: 'fixed',
      minOrderValue: 25,
      maxDiscount: 25,
      validDays: 60,
      status: 'Active',
      tierRestriction: 'Silver',
      usageLimit: 1,
      totalRedeemed: 123,
      totalIssued: 189,
      redemptionRate: 65.1,
      avgOrderValue: 78.90,
      createdDate: '2024-07-01',
      expiryDate: '2024-12-31'
    },
    {
      id: 'REW-004',
      name: 'Exclusive Strain Access',
      description: 'Early access to new and limited strains',
      type: 'Access',
      category: 'Early Access',
      pointsCost: 750,
      value: 0,
      valueType: 'access',
      minOrderValue: 0,
      maxDiscount: 0,
      validDays: 7,
      status: 'Active',
      tierRestriction: 'Gold',
      usageLimit: 1,
      totalRedeemed: 89,
      totalIssued: 134,
      redemptionRate: 66.4,
      avgOrderValue: 125.75,
      createdDate: '2024-07-15',
      expiryDate: '2024-12-31'
    },
    {
      id: 'REW-005',
      name: 'Birthday Special - 20% Off',
      description: 'Special birthday discount of 20%',
      type: 'Discount',
      category: 'Birthday Reward',
      pointsCost: 0,
      value: 20,
      valueType: 'percentage',
      minOrderValue: 75,
      maxDiscount: 50,
      validDays: 7,
      status: 'Active',
      tierRestriction: null,
      usageLimit: 1,
      totalRedeemed: 45,
      totalIssued: 67,
      redemptionRate: 67.2,
      avgOrderValue: 112.30,
      createdDate: '2024-01-01',
      expiryDate: '2024-12-31'
    }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 'CAM-001',
      name: 'Summer Points Boost',
      description: 'Double points on all purchases during summer',
      type: 'Points Multiplier',
      startDate: '2024-06-21',
      endDate: '2024-09-21',
      status: 'Active',
      multiplier: 2.0,
      minOrderValue: 50,
      tierRestriction: null,
      totalParticipants: 456,
      totalOrders: 1234,
      totalPointsAwarded: 45680,
      avgOrderValue: 89.50,
      revenue: 110456.75,
      roi: 3.2
    },
    {
      id: 'CAM-002',
      name: 'Referral Bonus Campaign',
      description: 'Extra points for successful referrals',
      type: 'Referral Bonus',
      startDate: '2024-07-01',
      endDate: '2024-08-31',
      status: 'Active',
      bonusPoints: 200,
      referrerBonus: 150,
      refereeBonus: 100,
      tierRestriction: null,
      totalReferrals: 89,
      successfulReferrals: 67,
      conversionRate: 75.3,
      totalPointsAwarded: 13400,
      revenue: 23450.50,
      roi: 4.1
    },
    {
      id: 'CAM-003',
      name: 'Tier Upgrade Challenge',
      description: 'Bonus points for reaching next tier',
      type: 'Tier Challenge',
      startDate: '2024-08-01',
      endDate: '2024-08-31',
      status: 'Active',
      bonusPoints: 500,
      targetTier: 'Silver',
      tierRestriction: 'Bronze',
      totalParticipants: 123,
      completedChallenges: 34,
      completionRate: 27.6,
      totalPointsAwarded: 17000,
      revenue: 15670.25,
      roi: 2.8
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalMembers: 657,
    activeMembers: 589,
    totalPointsIssued: 234560,
    totalPointsRedeemed: 156780,
    redemptionRate: 66.9,
    avgPointsPerMember: 357,
    totalRevenue: 456780.50,
    avgOrderValue: 89.25,
    memberRetention: 87.3,
    tierDistribution: {
      bronze: 37.3,
      silver: 28.8,
      gold: 23.7,
      platinum: 10.2
    }
  });

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN-001',
      memberId: 'MEM-001',
      memberName: 'John Doe',
      type: 'Earned',
      points: 89,
      description: 'Points earned from order #ORD-1234',
      orderId: 'ORD-1234',
      orderValue: 89.50,
      date: '2024-08-14 15:30:00',
      multiplier: 1.5,
      campaign: 'Summer Points Boost'
    },
    {
      id: 'TXN-002',
      memberId: 'MEM-002',
      memberName: 'Sarah Johnson',
      type: 'Redeemed',
      points: -500,
      description: 'Redeemed 10% Off Next Order',
      rewardId: 'REW-001',
      rewardName: '10% Off Next Order',
      date: '2024-08-14 14:15:00',
      orderId: 'ORD-1235',
      orderValue: 125.75
    },
    {
      id: 'TXN-003',
      memberId: 'MEM-003',
      memberName: 'Mike Chen',
      type: 'Earned',
      points: 67,
      description: 'Points earned from order #ORD-1236',
      orderId: 'ORD-1236',
      orderValue: 67.25,
      date: '2024-08-14 12:45:00',
      multiplier: 1.25,
      campaign: null
    },
    {
      id: 'TXN-004',
      memberId: 'MEM-001',
      memberName: 'John Doe',
      type: 'Bonus',
      points: 150,
      description: 'Referral bonus for successful referral',
      referralId: 'REF-001',
      date: '2024-08-14 10:20:00',
      campaign: 'Referral Bonus Campaign'
    },
    {
      id: 'TXN-005',
      memberId: 'MEM-004',
      memberName: 'Alex Kim',
      type: 'Expired',
      points: -50,
      description: 'Points expired after 12 months',
      date: '2024-08-14 00:00:00',
      expiryReason: 'Inactivity'
    }
  ]);

  // Filter functions
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = selectedTier === 'all' || member.tier.toLowerCase() === selectedTier;
    const matchesStatus = selectedStatus === 'all' || member.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedRewardType === 'all' || reward.type.toLowerCase() === selectedRewardType;
    const matchesStatus = selectedStatus === 'all' || reward.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
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

  const getRewardTypeColor = (type) => {
    switch (type) {
      case 'Discount': return 'bg-blue-100 text-blue-800';
      case 'Credit': return 'bg-green-100 text-green-800';
      case 'Service': return 'bg-purple-100 text-purple-800';
      case 'Access': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'Earned': return 'bg-green-100 text-green-800';
      case 'Redeemed': return 'bg-blue-100 text-blue-800';
      case 'Bonus': return 'bg-purple-100 text-purple-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Adjusted': return 'bg-yellow-100 text-yellow-800';
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

  const getRewardIcon = (type) => {
    switch (type) {
      case 'Discount': return '💰';
      case 'Credit': return '💳';
      case 'Service': return '🚚';
      case 'Access': return '🔓';
      default: return '🎁';
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
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalMembers}</p>
              <p className="text-sm text-blue-600">{analytics.activeMembers} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Points Issued</p>
              <p className="text-2xl font-bold text-gray-900">{(analytics.totalPointsIssued / 1000).toFixed(0)}k</p>
              <p className="text-sm text-green-600">{analytics.redemptionRate}% redeemed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-sm text-purple-600">${analytics.avgOrderValue} AOV</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Retention Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.memberRetention}%</p>
              <p className="text-sm text-yellow-600">Member retention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tier Distribution */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Membership Tiers</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="p-4 border rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: tier.color + '20' }}>
                    <span className="text-2xl">{tier.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{tier.name}</h4>
                    <p className="text-sm text-gray-500">{tier.memberCount} members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Points Multiplier:</span>
                    <span className="text-gray-900">{tier.benefits.pointsMultiplier}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Free Delivery:</span>
                    <span className="text-gray-900">${tier.benefits.freeDeliveryThreshold}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Spent:</span>
                    <span className="text-green-600">${tier.avgSpent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Retention:</span>
                    <span className="text-blue-600">{tier.retention}%</span>
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
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{campaign.totalParticipants}</p>
                      <p className="text-xs text-gray-500">Participants</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{(campaign.totalPointsAwarded / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Points Awarded</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${(campaign.revenue / 1000).toFixed(0)}k</p>
                      <p className="text-xs text-gray-500">Revenue</p>
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

      {/* Top Rewards */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Popular Rewards</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {rewards.sort((a, b) => b.totalRedeemed - a.totalRedeemed).slice(0, 5).map((reward) => (
              <div key={reward.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getRewardIcon(reward.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{reward.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRewardTypeColor(reward.type)}`}>
                        {reward.type}
                      </span>
                      <span className="text-sm text-gray-600">{reward.pointsCost} points</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{reward.totalRedeemed}</p>
                      <p className="text-xs text-gray-500">Redeemed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{reward.redemptionRate}%</p>
                      <p className="text-xs text-gray-500">Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${reward.avgOrderValue}</p>
                      <p className="text-xs text-gray-500">Avg Order</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Point Transactions</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">
                      {transaction.type === 'Earned' ? '💰' : 
                       transaction.type === 'Redeemed' ? '🎁' : 
                       transaction.type === 'Bonus' ? '🎉' : 
                       transaction.type === 'Expired' ? '⏰' : '📝'}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{transaction.memberName}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTransactionTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${transaction.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.points > 0 ? '+' : ''}{transaction.points} pts
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date.split(' ')[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMembers = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search members..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Members
            </button>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="space-y-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getTierIcon(member.tier)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(member.tier)}`}>
                      {member.tier}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(member.status)}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Profile
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Send Points
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Contact:</p>
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-sm text-gray-600">{member.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Member Since:</p>
                <p className="text-sm text-gray-600">{member.joinDate}</p>
                <p className="text-sm text-gray-600">Last Activity: {member.lastActivity}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Points:</p>
                <p className="text-sm text-gray-600">Current: {member.points.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Lifetime: {member.lifetimePoints.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Spending:</p>
                <p className="text-sm text-gray-600">Total: ${member.lifetimeSpent.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Avg Order: ${member.avgOrderValue}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{member.orders}</p>
                <p className="text-xs text-gray-500">Total Orders</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{member.referrals}</p>
                <p className="text-xs text-gray-500">Referrals</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{member.rewards.earned}</p>
                <p className="text-xs text-gray-500">Rewards Earned</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{member.rewards.redeemed}</p>
                <p className="text-xs text-gray-500">Rewards Redeemed</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Favorite Products:</p>
              <div className="flex flex-wrap gap-2">
                {member.favoriteProducts.map((product, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                    {product}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Preferred Categories:</span> {member.preferences.categories.join(', ')}
              </div>
              <div>
                <span className="font-medium">Delivery Time:</span> {member.preferences.deliveryTime}
              </div>
              <div>
                <span className="font-medium">Communication:</span> {member.preferences.communication}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search rewards..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedRewardType}
              onChange={(e) => setSelectedRewardType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="discount">Discount</option>
              <option value="credit">Credit</option>
              <option value="service">Service</option>
              <option value="access">Access</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Reward
            </button>
          </div>
        </div>
      </div>

      {/* Rewards List */}
      <div className="space-y-4">
        {filteredRewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getRewardIcon(reward.type)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{reward.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRewardTypeColor(reward.type)}`}>
                      {reward.type}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(reward.status)}`}>
                      {reward.status}
                    </span>
                    {reward.tierRestriction && (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(reward.tierRestriction)}`}>
                        {reward.tierRestriction}+ Only
                      </span>
                    )}
                  </div>
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
            
            <p className="text-gray-600 mb-4">{reward.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Points Cost:</p>
                <p className="text-sm text-gray-600">{reward.pointsCost} points</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Value:</p>
                <p className="text-sm text-gray-600">
                  {reward.valueType === 'percentage' ? `${reward.value}%` : 
                   reward.valueType === 'fixed' ? `$${reward.value}` : 
                   'Access Reward'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Valid For:</p>
                <p className="text-sm text-gray-600">{reward.validDays} days</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Min Order:</p>
                <p className="text-sm text-gray-600">${reward.minOrderValue}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{reward.totalRedeemed}</p>
                <p className="text-xs text-gray-500">Total Redeemed</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{reward.totalIssued}</p>
                <p className="text-xs text-gray-500">Total Issued</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{reward.redemptionRate}%</p>
                <p className="text-xs text-gray-500">Redemption Rate</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">${reward.avgOrderValue}</p>
                <p className="text-xs text-gray-500">Avg Order Value</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Created: {reward.createdDate}</span>
              <span>Expires: {reward.expiryDate}</span>
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
            <div className="text-3xl font-bold text-blue-600">{analytics.totalMembers}</div>
            <div className="text-sm text-gray-600">Total Members</div>
            <div className="text-xs text-gray-500 mt-1">{analytics.activeMembers} active</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.redemptionRate}%</div>
            <div className="text-sm text-gray-600">Redemption Rate</div>
            <div className="text-xs text-gray-500 mt-1">Points redeemed</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{analytics.avgPointsPerMember}</div>
            <div className="text-sm text-gray-600">Avg Points per Member</div>
            <div className="text-xs text-gray-500 mt-1">Current balance</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{analytics.memberRetention}%</div>
            <div className="text-sm text-gray-600">Member Retention</div>
            <div className="text-xs text-gray-500 mt-1">12-month retention</div>
          </div>
        </div>
      </div>

      {/* Tier Distribution Chart */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Tier Distribution</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(analytics.tierDistribution).map(([tier, percentage]) => (
              <div key={tier} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl mr-3">{getTierIcon(tier.charAt(0).toUpperCase() + tier.slice(1))}</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">{tier}</span>
                </div>
                <div className="flex items-center flex-1 ml-4">
                  <div className="w-full bg-gray-200 rounded-full h-3 mr-3">
                    <div 
                      className={`h-3 rounded-full ${
                        tier === 'bronze' ? 'bg-orange-500' :
                        tier === 'silver' ? 'bg-gray-500' :
                        tier === 'gold' ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 min-w-[3rem]">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Points Analytics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Points Analytics</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{(analytics.totalPointsIssued / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Total Points Issued</div>
              <div className="text-xs text-gray-500 mt-1">All time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{(analytics.totalPointsRedeemed / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Total Points Redeemed</div>
              <div className="text-xs text-gray-500 mt-1">All time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{((analytics.totalPointsIssued - analytics.totalPointsRedeemed) / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Outstanding Points</div>
              <div className="text-xs text-gray-500 mt-1">Current liability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Impact */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Impact</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${(analytics.totalRevenue / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-xs text-gray-500 mt-1">From loyalty members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${analytics.avgOrderValue}</div>
              <div className="text-sm text-gray-600">Average Order Value</div>
              <div className="text-xs text-gray-500 mt-1">Loyalty members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">+{((analytics.avgOrderValue - 65) / 65 * 100).toFixed(0)}%</div>
              <div className="text-sm text-gray-600">AOV Lift</div>
              <div className="text-xs text-gray-500 mt-1">vs non-members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Rewards */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Top Performing Rewards</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {rewards.sort((a, b) => b.redemptionRate - a.redemptionRate).slice(0, 5).map((reward, index) => (
              <div key={reward.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{reward.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRewardTypeColor(reward.type)}`}>
                        {reward.type}
                      </span>
                      <span className="text-xs text-gray-500">{reward.pointsCost} points</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{reward.totalRedeemed}</p>
                      <p className="text-xs text-gray-500">Redeemed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{reward.redemptionRate}%</p>
                      <p className="text-xs text-gray-500">Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${reward.avgOrderValue}</p>
                      <p className="text-xs text-gray-500">Avg Order</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Loyalty Program</h1>
          <p className="mt-2 text-gray-600">Manage loyalty members, rewards, tiers, and campaigns</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'members', name: 'Members', icon: '👥' },
              { id: 'rewards', name: 'Rewards', icon: '🎁' },
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
        {activeTab === 'members' && renderMembers()}
        {activeTab === 'rewards' && renderRewards()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default LoyaltyModule;

