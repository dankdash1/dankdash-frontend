import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Star, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  Award,
  Truck,
  Store,
  Megaphone,
  Package,
  Handshake,
  Zap,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  MapPin,
  Phone,
  Mail,
  Building,
  FileText,
  Send,
  Bell
} from 'lucide-react';

const EnhancedPartnerPortal = ({ isAdmin = false }) => {
  const [activeTab, setActiveTab] = useState(isAdmin ? 'dashboard' : 'applications');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showAddPartner, setShowAddPartner] = useState(false);
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [formData, setFormData] = useState({});

  // Enhanced partner data with location and notification preferences
  const [partners, setPartners] = useState([
    {
      id: 1,
      name: 'Green Valley Delivery',
      type: 'driver',
      email: 'contact@greenvalley.com',
      phone: '(555) 123-4567',
      status: 'active',
      joinDate: '2024-01-15',
      revenue: 45680,
      orders: 234,
      rating: 4.8,
      commission: 12.5,
      lastActivity: '2024-08-15',
      performance: 'excellent',
      onboardingStatus: 'completed',
      documents: ['license', 'insurance', 'background_check'],
      territories: ['North Valley', 'Downtown'],
      vehicleType: 'Car',
      location: { lat: 37.7749, lng: -122.4194, address: '123 Main St, San Francisco, CA' },
      availability: 'full-time',
      notifications: { email: true, sms: true, push: true }
    },
    {
      id: 2,
      name: 'Premium Cannabis Co.',
      type: 'vendor',
      email: 'sales@premiumcannabis.com',
      phone: '(555) 234-5678',
      status: 'active',
      joinDate: '2024-02-01',
      revenue: 128450,
      orders: 89,
      rating: 4.9,
      commission: 8.0,
      lastActivity: '2024-08-14',
      performance: 'excellent',
      onboardingStatus: 'completed',
      documents: ['license', 'coa', 'tax_cert'],
      products: ['Flower', 'Concentrates', 'Edibles'],
      certifications: ['Organic', 'Lab Tested'],
      location: { lat: 37.7849, lng: -122.4094, address: '456 Cannabis Ave, San Francisco, CA' },
      notifications: { email: true, sms: false, push: true }
    },
    {
      id: 3,
      name: 'Digital Marketing Pro',
      type: 'ad_vendor',
      email: 'hello@digitalmarketingpro.com',
      phone: '(555) 345-6789',
      status: 'pending',
      joinDate: '2024-08-10',
      revenue: 0,
      orders: 0,
      rating: 0,
      commission: 15.0,
      lastActivity: '2024-08-15',
      performance: 'new',
      onboardingStatus: 'in_progress',
      documents: ['business_license'],
      services: ['Google Ads', 'Facebook Ads', 'SEO'],
      specialties: ['Cannabis Marketing', 'Compliance'],
      location: { lat: 37.7649, lng: -122.4294, address: '789 Marketing Blvd, San Francisco, CA' },
      notifications: { email: true, sms: true, push: false }
    },
    {
      id: 4,
      name: 'Fast Track Delivery',
      type: 'driver',
      email: 'driver@fasttrack.com',
      phone: '(555) 456-7890',
      status: 'active',
      joinDate: '2024-03-15',
      revenue: 32100,
      orders: 156,
      rating: 4.6,
      commission: 12.5,
      lastActivity: '2024-08-15',
      performance: 'good',
      onboardingStatus: 'completed',
      documents: ['license', 'insurance', 'background_check'],
      territories: ['South Bay', 'Peninsula'],
      vehicleType: 'SUV',
      location: { lat: 37.7549, lng: -122.4394, address: '321 Speed St, San Francisco, CA' },
      availability: 'part-time',
      notifications: { email: true, sms: true, push: true }
    }
  ]);

  const partnerTypes = [
    { 
      id: 'driver', 
      name: 'Driver Partners', 
      icon: Truck, 
      color: 'bg-blue-500', 
      count: partners.filter(p => p.type === 'driver').length,
      description: 'Join our delivery network and earn money delivering cannabis products to customers.',
      benefits: [
        'Flexible schedule - work when you want',
        'Competitive pay + tips',
        'Weekly payouts',
        'Fuel reimbursement',
        'Insurance coverage during deliveries',
        'Mobile app with GPS navigation'
      ],
      requirements: [
        'Valid driver\'s license',
        'Clean driving record',
        'Reliable vehicle',
        'Cannabis delivery license (we help obtain)',
        'Pass background check',
        'Age 21+'
      ],
      earning: '$18-25/hour + tips'
    },
    { 
      id: 'vendor', 
      name: 'Vendor Partners', 
      icon: Store, 
      color: 'bg-green-500', 
      count: partners.filter(p => p.type === 'vendor').length,
      description: 'Sell your cannabis products through our platform and reach thousands of customers.',
      benefits: [
        'Access to large customer base',
        'Marketing and promotional support',
        'Inventory management tools',
        'Real-time sales analytics',
        'Payment processing included',
        'Compliance assistance'
      ],
      requirements: [
        'Valid cannabis license',
        'Quality products with lab testing',
        'Consistent supply capability',
        'Competitive pricing',
        'Professional packaging',
        'Insurance coverage'
      ],
      earning: '70-85% revenue share'
    },
    { 
      id: 'ad_vendor', 
      name: 'Ad Vendors', 
      icon: Megaphone, 
      color: 'bg-purple-500', 
      count: partners.filter(p => p.type === 'ad_vendor').length,
      description: 'Provide advertising and marketing services to help grow our cannabis business.',
      benefits: [
        'Recurring monthly contracts',
        'Performance-based bonuses',
        'Access to cannabis industry data',
        'Co-marketing opportunities',
        'Professional development support',
        'Compliance training included'
      ],
      requirements: [
        'Digital marketing experience',
        'Cannabis industry knowledge',
        'Proven track record',
        'Compliance certification',
        'Creative portfolio',
        'Analytics expertise'
      ],
      earning: '10-20% of ad spend + performance bonuses'
    },
    { 
      id: 'wholesale', 
      name: 'Wholesale Partners', 
      icon: Package, 
      color: 'bg-orange-500', 
      count: partners.filter(p => p.type === 'wholesale').length,
      description: 'Partner with us for bulk purchasing and distribution opportunities.',
      benefits: [
        'Volume discounts',
        'Priority inventory access',
        'Dedicated account manager',
        'Custom pricing tiers',
        'Bulk shipping options',
        'Extended payment terms'
      ],
      requirements: [
        'Valid cannabis license',
        'Minimum order quantities',
        'Established business',
        'Good credit standing',
        'Storage facilities',
        'Distribution network'
      ],
      earning: '15-30% wholesale margins'
    },
    { 
      id: 'retail', 
      name: 'Retail Partners', 
      icon: Handshake, 
      color: 'bg-pink-500', 
      count: partners.filter(p => p.type === 'retail').length,
      description: 'White-label our platform for your dispensary or retail business.',
      benefits: [
        'Complete e-commerce solution',
        'Custom branding',
        'Inventory management',
        'Customer analytics',
        'Marketing tools',
        'Technical support'
      ],
      requirements: [
        'Valid retail license',
        'Established customer base',
        'Technical capabilities',
        'Marketing budget',
        'Staff training commitment',
        'Brand guidelines compliance'
      ],
      earning: 'Custom pricing available'
    },
    { 
      id: 'affiliate', 
      name: 'Affiliate Partners', 
      icon: Star, 
      color: 'bg-yellow-500', 
      count: partners.filter(p => p.type === 'affiliate').length,
      description: 'Earn commissions by promoting our services to your network.',
      benefits: [
        'Generous commission structure',
        'Marketing materials provided',
        'Real-time tracking',
        'Monthly payouts',
        'Performance bonuses',
        'Dedicated support'
      ],
      requirements: [
        'Active social media presence',
        'Cannabis industry knowledge',
        'Marketing experience',
        'Professional network',
        'Content creation skills',
        'Compliance awareness'
      ],
      earning: '5-15% commission'
    },
    { 
      id: 'technology', 
      name: 'Technology Partners', 
      icon: Zap, 
      color: 'bg-indigo-500', 
      count: partners.filter(p => p.type === 'technology').length,
      description: 'Integrate with our API or develop custom solutions for cannabis businesses.',
      benefits: [
        'API access and documentation',
        'Technical support',
        'Co-marketing opportunities',
        'Revenue sharing',
        'Early access to new features',
        'Developer resources'
      ],
      requirements: [
        'Technical development capabilities',
        'Cannabis industry experience',
        'Existing customer base',
        'Quality assurance processes',
        'Security compliance',
        'Support infrastructure'
      ],
      earning: 'Revenue sharing model'
    }
  ];

  // Calculate dashboard metrics
  const totalRevenue = partners.reduce((sum, partner) => sum + partner.revenue, 0);
  const activePartners = partners.filter(p => p.status === 'active').length;
  const pendingPartners = partners.filter(p => p.status === 'pending').length;
  const averageRating = partners.filter(p => p.rating > 0).reduce((sum, p) => sum + p.rating, 0) / partners.filter(p => p.rating > 0).length;

  // Filter partners based on search and type
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || partner.type === filterType;
    return matchesSearch && matchesType;
  });

  // Driver assignment logic - find closest driver
  const findClosestDriver = (orderLocation) => {
    const availableDrivers = partners.filter(p => 
      p.type === 'driver' && 
      p.status === 'active' && 
      p.availability !== 'unavailable'
    );

    if (availableDrivers.length === 0) return null;

    // Simple distance calculation (in real app, use proper geolocation API)
    const calculateDistance = (lat1, lng1, lat2, lng2) => {
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLng = (lng2 - lng1) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    };

    let closestDriver = availableDrivers[0];
    let minDistance = calculateDistance(
      orderLocation.lat, orderLocation.lng,
      closestDriver.location.lat, closestDriver.location.lng
    );

    availableDrivers.forEach(driver => {
      const distance = calculateDistance(
        orderLocation.lat, orderLocation.lng,
        driver.location.lat, driver.location.lng
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestDriver = driver;
      }
    });

    return { driver: closestDriver, distance: minDistance };
  };

  // Notification system
  const sendNotification = (recipient, type, message, orderData = null) => {
    const notification = {
      id: Date.now(),
      recipient: recipient,
      type: type, // 'email', 'sms', 'push'
      message: message,
      orderData: orderData,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };

    // Save to localStorage for admin tracking
    const notifications = JSON.parse(localStorage.getItem('dankdash_notifications') || '[]');
    notifications.push(notification);
    localStorage.setItem('dankdash_notifications', JSON.stringify(notifications));

    console.log(`${type.toUpperCase()} sent to ${recipient.email || recipient.phone}:`, message);
    return notification;
  };

  // Order routing system
  const routeOrder = (order) => {
    const routing = {
      orderId: order.id,
      timestamp: new Date().toISOString(),
      fulfillmentMethod: order.fulfillmentMethod, // 'delivery' or 'shipping'
      status: 'processing'
    };

    if (order.fulfillmentMethod === 'delivery') {
      // Find closest driver
      const assignment = findClosestDriver(order.customerLocation);
      
      if (assignment) {
        routing.assignedDriver = assignment.driver;
        routing.distance = assignment.distance;
        routing.estimatedTime = Math.ceil(assignment.distance * 2); // 2 minutes per km
        
        // Send notifications
        if (assignment.driver.notifications.email) {
          sendNotification(
            assignment.driver,
            'email',
            `New delivery assignment: Order #${order.id} - ${order.customerName} at ${order.customerLocation.address}`,
            order
          );
        }
        
        if (assignment.driver.notifications.sms) {
          sendNotification(
            assignment.driver,
            'sms',
            `DankDash: New delivery Order #${order.id}. Customer: ${order.customerName}. Address: ${order.customerLocation.address}`,
            order
          );
        }
        
        routing.status = 'assigned';
      } else {
        routing.status = 'no_driver_available';
        // Send admin notification
        sendNotification(
          { email: 'admin@dankdash.com' },
          'email',
          `No drivers available for Order #${order.id}. Manual assignment required.`,
          order
        );
      }
    } else if (order.fulfillmentMethod === 'shipping') {
      // Route to shipping department
      routing.assignedDepartment = 'shipping';
      routing.status = 'routed_to_shipping';
      
      // Send shipping department notification
      sendNotification(
        { email: 'shipping@dankdash.com' },
        'email',
        `New shipping order: Order #${order.id} - ${order.customerName}. Prepare shipping label and package.`,
        order
      );
    }

    // Send customer confirmation
    sendNotification(
      { email: order.customerEmail },
      'email',
      `Order #${order.id} confirmed! ${order.fulfillmentMethod === 'delivery' ? 
        `Your driver ${routing.assignedDriver?.name} will deliver in approximately ${routing.estimatedTime} minutes.` :
        'Your order will be shipped within 1-2 business days.'
      }`,
      order
    );

    // Save routing info
    const routings = JSON.parse(localStorage.getItem('dankdash_order_routings') || '[]');
    routings.push(routing);
    localStorage.setItem('dankdash_order_routings', JSON.stringify(routings));

    return routing;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'average': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'productTypes') {
        setFormData(prev => ({
          ...prev,
          productTypes: checked 
            ? [...(prev.productTypes || []), value]
            : (prev.productTypes || []).filter(item => item !== value)
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save partner application to localStorage for admin integration
    const partners = JSON.parse(localStorage.getItem('dankdash_partners') || '[]');
    const newPartner = {
      id: Date.now(),
      type: selectedPartnership.id,
      title: selectedPartnership.name,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      businessName: formData.businessName || '',
      status: 'Pending Review',
      applicationDate: new Date().toISOString(),
      formData: formData,
      notes: `Applied for ${selectedPartnership.name} partnership`,
      notifications: { email: true, sms: true, push: false }
    };
    
    partners.push(newPartner);
    localStorage.setItem('dankdash_partners', JSON.stringify(partners));
    
    // Also add to CRM as a lead
    const leads = JSON.parse(localStorage.getItem('dankdash_leads') || '[]');
    const newLead = {
      id: Date.now() + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      contact: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      company: formData.businessName || 'Individual',
      stage: 'New',
      value: selectedPartnership.id === 'vendor' ? '50000' : '25000',
      probability: 50,
      source: 'Partner Application',
      assignedTo: 'Partnership Team',
      nextAction: 'Review Application',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: `${selectedPartnership.name} partnership application submitted`,
      createdAt: new Date().toISOString()
    };
    
    leads.push(newLead);
    localStorage.setItem('dankdash_leads', JSON.stringify(leads));
    
    // Send confirmation notifications
    sendNotification(
      { email: formData.email },
      'email',
      `Thank you ${formData.firstName} for your ${selectedPartnership.name} application! Our partnership team will review your application and contact you within 2-3 business days.`
    );

    // Send admin notification
    sendNotification(
      { email: 'partnerships@dankdash.com' },
      'email',
      `New ${selectedPartnership.name} application from ${formData.firstName} ${formData.lastName} (${formData.email}). Review required.`,
      newPartner
    );
    
    alert(`Application submitted for ${selectedPartnership.name}! We'll review your application and get back to you within 2-3 business days.`);
    setSelectedPartnership(null);
    setFormData({});
  };

  // Admin Dashboard Components
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Partners</p>
              <p className="text-3xl font-bold text-gray-900">{partners.length}</p>
              <p className="text-sm text-green-600">+{pendingPartners} pending</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+18.2% this month</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Partners</p>
              <p className="text-3xl font-bold text-gray-900">{activePartners}</p>
              <p className="text-sm text-blue-600">{((activePartners/partners.length)*100).toFixed(1)}% active rate</p>
            </div>
            <CheckCircle className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
              <p className="text-sm text-yellow-600">★★★★★</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Partner Types Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {partnerTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className={`p-2 rounded-lg ${type.color} text-white mr-3`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{type.count}</p>
                  <p className="text-sm text-gray-600">{type.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Driver Availability Map */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Availability</h3>
        <div className="space-y-3">
          {partners.filter(p => p.type === 'driver').map(driver => (
            <div key={driver.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${driver.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div>
                  <p className="font-medium text-gray-900">{driver.name}</p>
                  <p className="text-sm text-gray-600">{driver.location.address}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{driver.availability}</p>
                <p className="text-sm text-gray-600">{driver.vehicleType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPartnersList = () => (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Types</option>
          {partnerTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        <button
          onClick={() => setShowAddPartner(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Partner
        </button>
      </div>

      {/* Partners Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notifications</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPartners.map((partner) => {
                const partnerType = partnerTypes.find(t => t.id === partner.type);
                const Icon = partnerType?.icon || Users;
                
                return (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg ${partnerType?.color || 'bg-gray-500'} text-white mr-3`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                          <div className="text-sm text-gray-500">{partner.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">{partner.type.replace('_', ' ')}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(partner.status)}`}>
                        {partner.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${partner.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-900">{partner.rating || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-1">
                        {partner.notifications?.email && <Mail className="h-4 w-4 text-blue-500" />}
                        {partner.notifications?.sms && <Phone className="h-4 w-4 text-green-500" />}
                        {partner.notifications?.push && <Bell className="h-4 w-4 text-purple-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Customer-facing application selection
  const renderApplications = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Partner with DankDash</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our growing network of cannabis industry professionals and grow your business with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerTypes.map((partnership) => {
            const Icon = partnership.icon;
            return (
              <div key={partnership.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${partnership.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Icon className="h-8 w-8 mb-2" />
                      <h3 className="text-xl font-bold">{partnership.name}</h3>
                      <p className="text-sm opacity-90">{partnership.earning}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{partnership.count}</p>
                      <p className="text-sm opacity-90">Active</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{partnership.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Benefits:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {partnership.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => setSelectedPartnership(partnership)}
                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Application form for selected partnership
  const renderApplicationForm = () => {
    if (!selectedPartnership) return null;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <button
                onClick={() => setSelectedPartnership(null)}
                className="mr-4 p-2 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${selectedPartnership.color} text-white mr-3`}>
                  <selectedPartnership.icon className="h-6 w-6" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedPartnership.name} Application
                </h1>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Partnership Specific Fields */}
              {selectedPartnership.id === 'driver' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Driver Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type *</label>
                      <select
                        name="vehicleType"
                        required
                        value={formData.vehicleType || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select vehicle type</option>
                        <option value="car">Car</option>
                        <option value="suv">SUV</option>
                        <option value="truck">Truck</option>
                        <option value="van">Van</option>
                        <option value="motorcycle">Motorcycle</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability *</label>
                      <select
                        name="availability"
                        required
                        value={formData.availability || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select availability</option>
                        <option value="full-time">Full-time (40+ hours/week)</option>
                        <option value="part-time">Part-time (20-39 hours/week)</option>
                        <option value="weekends">Weekends only</option>
                        <option value="evenings">Evenings only</option>
                        <option value="flexible">Flexible schedule</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {selectedPartnership.id === 'ad_vendor' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Advertising Services Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={formData.businessName || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience *</label>
                      <select
                        name="experience"
                        required
                        value={formData.experience || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select experience</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Services Offered *</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {['Google Ads', 'Facebook Ads', 'Instagram Ads', 'SEO', 'Content Marketing', 'Email Marketing', 'Social Media Management', 'Influencer Marketing'].map(service => (
                          <label key={service} className="flex items-center">
                            <input
                              type="checkbox"
                              name="services"
                              value={service}
                              onChange={handleInputChange}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-700">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Preferences */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Preferences</h2>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      defaultChecked
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Email notifications for new opportunities and updates</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">SMS notifications for urgent updates</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="marketingEmails"
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <span className="text-sm text-gray-700">Marketing emails about new features and promotions</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // Main render logic
  if (selectedPartnership) {
    return renderApplicationForm();
  }

  if (!isAdmin) {
    return renderApplications();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Enhanced Partner Portal</h1>
          <p className="mt-2 text-gray-600">Comprehensive partner management with order routing and notifications</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
              { id: 'partners', name: 'Partners', icon: Users },
              { id: 'applications', name: 'Applications', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'partners' && renderPartnersList()}
        {activeTab === 'applications' && renderApplications()}
      </div>
    </div>
  );
};

export default EnhancedPartnerPortal;

