import React, { useState, useEffect } from 'react';

const EnhancedLoyaltyModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRewardType, setSelectedRewardType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showCreateRewardModal, setShowCreateRewardModal] = useState(false);
  const [showCreateTierModal, setShowCreateTierModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Enhanced loyalty program data with full functionality
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
      },
      address: '123 Main St, San Francisco, CA 94102',
      birthday: '1985-06-15',
      notes: 'Prefers evening deliveries, loyal customer'
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
      },
      address: '456 Oak Ave, Oakland, CA 94610',
      birthday: '1990-03-22',
      notes: 'VIP customer, prefers premium products'
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
        earned: 8,
        redeemed: 5,
        pending: 1,
        expired: 2
      },
      milestones: {
        firstPurchase: '2024-03-15',
        tier1Achieved: '2024-04-20',
        tier2Achieved: '2024-07-05'
      },
      address: '789 Pine St, Berkeley, CA 94704',
      birthday: '1988-11-08',
      notes: 'Regular customer, morning delivery preference'
    }
  ]);

  const [loyaltyTiers, setLoyaltyTiers] = useState([
    {
      id: 'TIER-001',
      name: 'Bronze',
      minPoints: 0,
      maxPoints: 999,
      color: '#CD7F32',
      benefits: [
        '1 point per $1 spent',
        'Birthday discount 10%',
        'Early access to sales',
        'Free delivery on orders $50+'
      ],
      pointsMultiplier: 1.0,
      discountPercentage: 0,
      freeDeliveryThreshold: 50,
      memberCount: 245,
      status: 'Active',
      created: '2024-01-01',
      lastUpdated: '2024-08-01'
    },
    {
      id: 'TIER-002',
      name: 'Silver',
      minPoints: 1000,
      maxPoints: 2999,
      color: '#C0C0C0',
      benefits: [
        '1.25 points per $1 spent',
        'Birthday discount 15%',
        'Early access to new products',
        'Free delivery on orders $40+',
        'Monthly surprise gift'
      ],
      pointsMultiplier: 1.25,
      discountPercentage: 5,
      freeDeliveryThreshold: 40,
      memberCount: 89,
      status: 'Active',
      created: '2024-01-01',
      lastUpdated: '2024-08-01'
    },
    {
      id: 'TIER-003',
      name: 'Gold',
      minPoints: 3000,
      maxPoints: 7999,
      color: '#FFD700',
      benefits: [
        '1.5 points per $1 spent',
        'Birthday discount 20%',
        'VIP customer support',
        'Free delivery on all orders',
        'Exclusive product access',
        'Quarterly bonus points'
      ],
      pointsMultiplier: 1.5,
      discountPercentage: 10,
      freeDeliveryThreshold: 0,
      memberCount: 34,
      status: 'Active',
      created: '2024-01-01',
      lastUpdated: '2024-08-01'
    },
    {
      id: 'TIER-004',
      name: 'Platinum',
      minPoints: 8000,
      maxPoints: 999999,
      color: '#E5E4E2',
      benefits: [
        '2 points per $1 spent',
        'Birthday discount 25%',
        'Dedicated account manager',
        'Free same-day delivery',
        'First access to limited editions',
        'Personal shopping consultation',
        'Exclusive events invitation'
      ],
      pointsMultiplier: 2.0,
      discountPercentage: 15,
      freeDeliveryThreshold: 0,
      memberCount: 12,
      status: 'Active',
      created: '2024-01-01',
      lastUpdated: '2024-08-01'
    }
  ]);

  const [rewards, setRewards] = useState([
    {
      id: 'REW-001',
      title: '$10 Off Next Order',
      description: 'Get $10 discount on your next purchase of $50 or more',
      type: 'Discount',
      value: 10,
      pointsCost: 500,
      category: 'Discount',
      status: 'Active',
      validityDays: 30,
      minOrderValue: 50,
      maxRedemptions: 1000,
      currentRedemptions: 234,
      created: '2024-01-15',
      lastUpdated: '2024-08-01',
      terms: 'Valid for 30 days from redemption. Cannot be combined with other offers.',
      image: '/images/rewards/discount-10.jpg'
    },
    {
      id: 'REW-002',
      title: 'Free Delivery',
      description: 'Free delivery on your next order (any amount)',
      type: 'Service',
      value: 0,
      pointsCost: 200,
      category: 'Delivery',
      status: 'Active',
      validityDays: 14,
      minOrderValue: 0,
      maxRedemptions: 500,
      currentRedemptions: 156,
      created: '2024-01-15',
      lastUpdated: '2024-08-01',
      terms: 'Valid for 14 days from redemption. Standard delivery only.',
      image: '/images/rewards/free-delivery.jpg'
    },
    {
      id: 'REW-003',
      title: 'Premium Pre-Roll',
      description: 'Complimentary premium pre-roll with your next order',
      type: 'Product',
      value: 15,
      pointsCost: 750,
      category: 'Product',
      status: 'Active',
      validityDays: 21,
      minOrderValue: 75,
      maxRedemptions: 100,
      currentRedemptions: 67,
      created: '2024-02-01',
      lastUpdated: '2024-08-01',
      terms: 'Valid for 21 days. Subject to availability. Must be 21+ to redeem.',
      image: '/images/rewards/premium-preroll.jpg'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalMembers: 380,
    activeMembers: 342,
    newMembersThisMonth: 45,
    totalPointsIssued: 125680,
    totalPointsRedeemed: 89340,
    averagePointsPerMember: 331,
    topTier: 'Bronze',
    membershipGrowth: 12.5,
    redemptionRate: 71.2,
    averageLifetimeValue: 2847.50,
    retentionRate: 89.5,
    referralRate: 23.8
  });

  // Form states
  const [memberForm, setMemberForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthday: '',
    tier: 'Bronze',
    points: 0,
    preferences: {
      categories: [],
      deliveryTime: 'Anytime',
      communication: 'Email'
    },
    notes: ''
  });

  const [rewardForm, setRewardForm] = useState({
    title: '',
    description: '',
    type: 'Discount',
    value: 0,
    pointsCost: 100,
    category: 'Discount',
    validityDays: 30,
    minOrderValue: 0,
    maxRedemptions: 100,
    terms: ''
  });

  const [tierForm, setTierForm] = useState({
    name: '',
    minPoints: 0,
    maxPoints: 999,
    color: '#3B82F6',
    benefits: [],
    pointsMultiplier: 1.0,
    discountPercentage: 0,
    freeDeliveryThreshold: 0
  });

  // CRUD Operations for Members
  const handleCreateMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newMember = {
        id: `MEM-${String(members.length + 1).padStart(3, '0')}`,
        ...memberForm,
        joinDate: new Date().toISOString().split('T')[0],
        lifetimePoints: memberForm.points,
        lifetimeSpent: 0,
        status: 'Active',
        lastActivity: new Date().toISOString().split('T')[0],
        referrals: 0,
        orders: 0,
        avgOrderValue: 0,
        favoriteProducts: [],
        rewards: {
          earned: 0,
          redeemed: 0,
          pending: 0,
          expired: 0
        },
        milestones: {
          firstPurchase: null
        }
      };

      setMembers([...members, newMember]);
      setShowCreateModal(false);
      setMemberForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        birthday: '',
        tier: 'Bronze',
        points: 0,
        preferences: {
          categories: [],
          deliveryTime: 'Anytime',
          communication: 'Email'
        },
        notes: ''
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalMembers: prev.totalMembers + 1,
        activeMembers: prev.activeMembers + 1
      }));

    } catch (error) {
      console.error('Error creating member:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedMembers = members.map(member => 
        member.id === selectedMember.id 
          ? { ...member, ...memberForm, lastActivity: new Date().toISOString().split('T')[0] }
          : member
      );
      
      setMembers(updatedMembers);
      setShowEditModal(false);
      setSelectedMember(null);
      
    } catch (error) {
      console.error('Error updating member:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async () => {
    setLoading(true);
    
    try {
      const updatedMembers = members.filter(member => member.id !== selectedMember.id);
      setMembers(updatedMembers);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalMembers: prev.totalMembers - 1,
        activeMembers: selectedMember.status === 'Active' ? prev.activeMembers - 1 : prev.activeMembers
      }));
      
      setShowDeleteModal(false);
      setSelectedMember(null);
      
    } catch (error) {
      console.error('Error deleting member:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustPoints = (memberId, pointsChange, reason) => {
    const updatedMembers = members.map(member => 
      member.id === memberId 
        ? { 
            ...member, 
            points: Math.max(0, member.points + pointsChange),
            lifetimePoints: pointsChange > 0 ? member.lifetimePoints + pointsChange : member.lifetimePoints,
            lastActivity: new Date().toISOString().split('T')[0]
          }
        : member
    );
    
    setMembers(updatedMembers);
  };

  const handleToggleMemberStatus = (memberId) => {
    const updatedMembers = members.map(member => 
      member.id === memberId 
        ? { ...member, status: member.status === 'Active' ? 'Inactive' : 'Active' }
        : member
    );
    
    setMembers(updatedMembers);
  };

  // CRUD Operations for Rewards
  const handleCreateReward = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newReward = {
        id: `REW-${String(rewards.length + 1).padStart(3, '0')}`,
        ...rewardForm,
        status: 'Active',
        currentRedemptions: 0,
        created: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        image: '/images/rewards/default.jpg'
      };

      setRewards([...rewards, newReward]);
      setShowCreateRewardModal(false);
      setRewardForm({
        title: '',
        description: '',
        type: 'Discount',
        value: 0,
        pointsCost: 100,
        category: 'Discount',
        validityDays: 30,
        minOrderValue: 0,
        maxRedemptions: 100,
        terms: ''
      });

    } catch (error) {
      console.error('Error creating reward:', error);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operations for Tiers
  const handleCreateTier = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newTier = {
        id: `TIER-${String(loyaltyTiers.length + 1).padStart(3, '0')}`,
        ...tierForm,
        memberCount: 0,
        status: 'Active',
        created: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      setLoyaltyTiers([...loyaltyTiers, newTier]);
      setShowCreateTierModal(false);
      setTierForm({
        name: '',
        minPoints: 0,
        maxPoints: 999,
        color: '#3B82F6',
        benefits: [],
        pointsMultiplier: 1.0,
        discountPercentage: 0,
        freeDeliveryThreshold: 0
      });

    } catch (error) {
      console.error('Error creating tier:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter functions
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.phone.includes(searchTerm);
    const matchesTier = selectedTier === 'all' || member.tier.toLowerCase() === selectedTier.toLowerCase();
    const matchesStatus = selectedStatus === 'all' || member.status.toLowerCase() === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesTier && matchesStatus;
  });

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedRewardType === 'all' || reward.type.toLowerCase() === selectedRewardType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  const openEditModal = (member) => {
    setSelectedMember(member);
    setMemberForm({
      name: member.name,
      email: member.email,
      phone: member.phone,
      address: member.address,
      birthday: member.birthday,
      tier: member.tier,
      points: member.points,
      preferences: member.preferences,
      notes: member.notes
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const getTierColor = (tier) => {
    const tierObj = loyaltyTiers.find(t => t.name === tier);
    return tierObj ? tierObj.color : '#6B7280';
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'suspended': return 'text-yellow-600 bg-yellow-100';
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
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalMembers}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.activeMembers} Active</span>
            <span className="text-gray-500 ml-2">• +{analytics.newMembersThisMonth} This Month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Points Issued</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalPointsIssued.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.totalPointsRedeemed.toLocaleString()} Redeemed</span>
            <span className="text-gray-500 ml-2">• {analytics.redemptionRate}% Rate</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Lifetime Value</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.averageLifetimeValue}</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-yellow-600 font-medium">{analytics.retentionRate}% Retention</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Referral Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.referralRate}%</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">+{analytics.membershipGrowth}% Growth</span>
          </div>
        </div>
      </div>

      {/* Tier Distribution */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Membership Tiers</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loyaltyTiers.map((tier) => (
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
                    <p className="text-sm text-gray-500">{tier.minPoints}-{tier.maxPoints === 999999 ? '∞' : tier.maxPoints} points</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Members</span>
                    <span className="font-medium text-gray-900">{tier.memberCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Points Multiplier</span>
                    <span className="font-medium text-gray-900">{tier.pointsMultiplier}x</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="font-medium text-gray-900">{tier.discountPercentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Member Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {members
              .sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity))
              .slice(0, 5)
              .map((member) => (
                <div key={member.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                      <span 
                        className="px-2 py-1 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: getTierColor(member.tier) }}
                      >
                        {member.tier}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{member.email}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{member.points.toLocaleString()} points</span>
                      <span>•</span>
                      <span>{member.orders} orders</span>
                      <span>•</span>
                      <span>Last active: {new Date(member.lastActivity).toLocaleDateString()}</span>
                    </div>
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
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search members..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
          >
            <option value="all">All Tiers</option>
            {loyaltyTiers.map(tier => (
              <option key={tier.id} value={tier.name}>{tier.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-blue-600">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span 
                    className="px-2 py-1 text-xs font-medium rounded-full text-white"
                    style={{ backgroundColor: getTierColor(member.tier) }}
                  >
                    {member.tier}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(member.status)}`}>
                    {member.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Points</span>
                  <span className="font-medium text-gray-900">{member.points.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lifetime Points</span>
                  <span className="font-medium text-gray-900">{member.lifetimePoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Lifetime Spent</span>
                  <span className="font-medium text-gray-900">${member.lifetimeSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Orders</span>
                  <span className="font-medium text-gray-900">{member.orders}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Referrals</span>
                  <span className="font-medium text-gray-900">{member.referrals}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
                  <span>Last Active: {new Date(member.lastActivity).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAdjustPoints(member.id, 100, 'Manual adjustment')}
                      className="p-2 text-green-600 hover:text-green-700 transition-colors"
                      title="Add 100 points"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleAdjustPoints(member.id, -100, 'Manual adjustment')}
                      className="p-2 text-red-600 hover:text-red-700 transition-colors"
                      title="Remove 100 points"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleToggleMemberStatus(member.id)}
                      className={`p-2 transition-colors ${
                        member.status === 'Active' 
                          ? 'text-yellow-600 hover:text-yellow-700' 
                          : 'text-green-600 hover:text-green-700'
                      }`}
                      title={member.status === 'Active' ? 'Deactivate' : 'Activate'}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(member)}
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

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No members found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding your first loyalty member.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Member
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderRewards = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search rewards..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedRewardType}
            onChange={(e) => setSelectedRewardType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="discount">Discount</option>
            <option value="service">Service</option>
            <option value="product">Product</option>
          </select>
          <button
            onClick={() => setShowCreateRewardModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Reward</span>
          </button>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{reward.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      reward.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                      {reward.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      reward.type === 'Discount' ? 'text-blue-600 bg-blue-100' :
                      reward.type === 'Service' ? 'text-green-600 bg-green-100' :
                      'text-purple-600 bg-purple-100'
                    }`}>
                      {reward.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Points Cost</span>
                  <span className="font-medium text-gray-900">{reward.pointsCost.toLocaleString()}</span>
                </div>
                {reward.value > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Value</span>
                    <span className="font-medium text-gray-900">${reward.value}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min Order</span>
                  <span className="font-medium text-gray-900">${reward.minOrderValue}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Validity</span>
                  <span className="font-medium text-gray-900">{reward.validityDays} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Redemptions</span>
                  <span className="font-medium text-gray-900">
                    {reward.currentRedemptions}/{reward.maxRedemptions}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Created: {new Date(reward.created).toLocaleDateString()}</span>
                  <span>ID: {reward.id}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTiers = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Loyalty Tiers</h2>
          <p className="text-sm text-gray-600">Manage membership tiers and benefits</p>
        </div>
        <button
          onClick={() => setShowCreateTierModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Create Tier</span>
        </button>
      </div>

      {/* Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loyaltyTiers.map((tier) => (
          <div key={tier.id} className="bg-white rounded-lg shadow-sm border">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${tier.color}20` }}
                >
                  <svg className="h-6 w-6" style={{ color: tier.color }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-medium text-gray-900">{tier.name}</h3>
                  <p className="text-sm text-gray-500">
                    {tier.minPoints.toLocaleString()} - {tier.maxPoints === 999999 ? '∞' : tier.maxPoints.toLocaleString()} points
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  tier.status === 'Active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                }`}>
                  {tier.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Members</span>
                  <span className="font-medium text-gray-900">{tier.memberCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Points Multiplier</span>
                  <span className="font-medium text-gray-900">{tier.pointsMultiplier}x</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-gray-900">{tier.discountPercentage}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Free Delivery</span>
                  <span className="font-medium text-gray-900">
                    {tier.freeDeliveryThreshold === 0 ? 'All orders' : `$${tier.freeDeliveryThreshold}+`}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Benefits</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {tier.benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                  {tier.benefits.length > 3 && (
                    <li className="text-blue-600 text-xs">+{tier.benefits.length - 3} more benefits</li>
                  )}
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Created: {new Date(tier.created).toLocaleDateString()}</span>
                  <span>Updated: {new Date(tier.lastUpdated).toLocaleDateString()}</span>
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
        <h1 className="text-2xl font-bold text-gray-900">Loyalty Program</h1>
        <p className="text-gray-600 mt-1">Manage customer loyalty, rewards, and membership tiers</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'members', name: 'Members', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z' },
            { id: 'rewards', name: 'Rewards', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
            { id: 'tiers', name: 'Tiers', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' }
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
      {activeTab === 'members' && renderMembers()}
      {activeTab === 'rewards' && renderRewards()}
      {activeTab === 'tiers' && renderTiers()}

      {/* Create Member Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add Member</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateMember} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={memberForm.phone}
                      onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                      placeholder="+1-555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={memberForm.birthday}
                      onChange={(e) => setMemberForm({ ...memberForm, birthday: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={memberForm.address}
                    onChange={(e) => setMemberForm({ ...memberForm, address: e.target.value })}
                    placeholder="123 Main St, City, State 12345"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Tier</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={memberForm.tier}
                      onChange={(e) => setMemberForm({ ...memberForm, tier: e.target.value })}
                    >
                      {loyaltyTiers.map(tier => (
                        <option key={tier.id} value={tier.name}>{tier.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Initial Points</label>
                    <input
                      type="number"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={memberForm.points}
                      onChange={(e) => setMemberForm({ ...memberForm, points: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={memberForm.notes}
                    onChange={(e) => setMemberForm({ ...memberForm, notes: e.target.value })}
                    placeholder="Additional notes about the member..."
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
                    {loading ? 'Adding...' : 'Add Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Member</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditMember} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={memberForm.notes}
                    onChange={(e) => setMemberForm({ ...memberForm, notes: e.target.value })}
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
                    {loading ? 'Updating...' : 'Update Member'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Member Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Member</h2>
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
                  Are you sure you want to delete <strong>{selectedMember?.name}</strong>? This action cannot be undone and will remove all their loyalty data.
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
                  onClick={handleDeleteMember}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Member'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Reward Modal */}
      {showCreateRewardModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Reward</h2>
                <button
                  onClick={() => setShowCreateRewardModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateReward} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={rewardForm.title}
                      onChange={(e) => setRewardForm({ ...rewardForm, title: e.target.value })}
                      placeholder="$10 Off Next Order"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={rewardForm.type}
                      onChange={(e) => setRewardForm({ ...rewardForm, type: e.target.value })}
                    >
                      <option value="Discount">Discount</option>
                      <option value="Service">Service</option>
                      <option value="Product">Product</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={rewardForm.description}
                    onChange={(e) => setRewardForm({ ...rewardForm, description: e.target.value })}
                    placeholder="Describe the reward..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points Cost</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={rewardForm.pointsCost}
                      onChange={(e) => setRewardForm({ ...rewardForm, pointsCost: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={rewardForm.value}
                      onChange={(e) => setRewardForm({ ...rewardForm, value: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Validity (days)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={rewardForm.validityDays}
                      onChange={(e) => setRewardForm({ ...rewardForm, validityDays: parseInt(e.target.value) || 30 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Value ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={rewardForm.minOrderValue}
                      onChange={(e) => setRewardForm({ ...rewardForm, minOrderValue: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Redemptions</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={rewardForm.maxRedemptions}
                      onChange={(e) => setRewardForm({ ...rewardForm, maxRedemptions: parseInt(e.target.value) || 100 })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                  <textarea
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={rewardForm.terms}
                    onChange={(e) => setRewardForm({ ...rewardForm, terms: e.target.value })}
                    placeholder="Terms and conditions for this reward..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateRewardModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Reward'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Tier Modal */}
      {showCreateTierModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Tier</h2>
                <button
                  onClick={() => setShowCreateTierModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateTier} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tier Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tierForm.name}
                      onChange={(e) => setTierForm({ ...tierForm, name: e.target.value })}
                      placeholder="Diamond"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <input
                      type="color"
                      className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tierForm.color}
                      onChange={(e) => setTierForm({ ...tierForm, color: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Points</label>
                    <input
                      type="number"
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tierForm.minPoints}
                      onChange={(e) => setTierForm({ ...tierForm, minPoints: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Points</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tierForm.maxPoints}
                      onChange={(e) => setTierForm({ ...tierForm, maxPoints: parseInt(e.target.value) || 999 })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points Multiplier</label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tierForm.pointsMultiplier}
                      onChange={(e) => setTierForm({ ...tierForm, pointsMultiplier: parseFloat(e.target.value) || 1.0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tierForm.discountPercentage}
                      onChange={(e) => setTierForm({ ...tierForm, discountPercentage: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Free Delivery Threshold ($)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={tierForm.freeDeliveryThreshold}
                      onChange={(e) => setTierForm({ ...tierForm, freeDeliveryThreshold: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (one per line)</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={tierForm.benefits.join('\n')}
                    onChange={(e) => setTierForm({ 
                      ...tierForm, 
                      benefits: e.target.value.split('\n').filter(benefit => benefit.trim()) 
                    })}
                    placeholder="1.5 points per $1 spent&#10;Birthday discount 20%&#10;VIP customer support&#10;Free delivery on all orders"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateTierModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Tier'}
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

export default EnhancedLoyaltyModule;

