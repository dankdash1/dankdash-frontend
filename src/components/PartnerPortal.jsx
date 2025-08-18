import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PartnerPortal = () => {
  const [selectedPartnership, setSelectedPartnership] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Business Information
    businessName: '',
    businessType: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessZipCode: '',
    taxId: '',
    yearsInBusiness: '',
    
    // Partnership Specific
    partnershipType: '',
    experience: '',
    vehicleType: '',
    availability: '',
    productTypes: [],
    monthlyVolume: '',
    currentDistribution: '',
    
    // Additional Information
    motivation: '',
    additionalInfo: ''
  });

  const partnerships = [
    {
      id: 'driver',
      title: 'Driver Partner',
      icon: '🚗',
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
      earning: '$18-25/hour + tips',
      color: 'bg-blue-500'
    },
    {
      id: 'vendor',
      title: 'Vendor Partner',
      icon: '🌿',
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
      earning: '70-85% revenue share',
      color: 'bg-green-500'
    },
    {
      id: 'wholesale',
      title: 'Wholesale Partner',
      icon: '📦',
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
      earning: '15-30% wholesale margins',
      color: 'bg-purple-500'
    },
    {
      id: 'retail',
      title: 'Retail Partner',
      icon: '🏪',
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
      earning: 'Custom pricing available',
      color: 'bg-orange-500'
    },
    {
      id: 'affiliate',
      title: 'Affiliate Partner',
      icon: '🤝',
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
      earning: '5-15% commission',
      color: 'bg-pink-500'
    },
    {
      id: 'technology',
      title: 'Technology Partner',
      icon: '💻',
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
      earning: 'Revenue sharing model',
      color: 'bg-indigo-500'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'productTypes') {
        setFormData(prev => ({
          ...prev,
          productTypes: checked 
            ? [...prev.productTypes, value]
            : prev.productTypes.filter(item => item !== value)
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
      title: selectedPartnership.title,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      businessName: formData.businessName || '',
      status: 'Pending Review',
      applicationDate: new Date().toISOString(),
      formData: formData,
      notes: `Applied for ${selectedPartnership.title} partnership`
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
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
      notes: `${selectedPartnership.title} partnership application submitted`,
      createdAt: new Date().toISOString()
    };
    
    leads.push(newLead);
    localStorage.setItem('dankdash_leads', JSON.stringify(leads));
    
    // Send confirmation email (simulate)
    console.log('Partner application confirmation email sent to:', formData.email);
    
    // Add to email marketing automation
    const emailSubscribers = JSON.parse(localStorage.getItem('dankdash_email_subscribers') || '[]');
    const newSubscriber = {
      id: Date.now(),
      email: formData.email,
      name: `${formData.firstName} ${formData.lastName}`,
      status: 'Active',
      source: 'Partner Application',
      subscribed_date: new Date().toISOString(),
      tags: ['Partner Applicant', selectedPartnership.title, 'Business Contact'],
      preferences: {
        promotional: true,
        educational: true,
        newsletters: true,
        partner_updates: true
      }
    };
    
    if (!emailSubscribers.find(s => s.email === formData.email)) {
      emailSubscribers.push(newSubscriber);
      localStorage.setItem('dankdash_email_subscribers', JSON.stringify(emailSubscribers));
    }
    
    // Trigger partner application confirmation email
    const emailCampaigns = JSON.parse(localStorage.getItem('dankdash_email_campaigns') || '[]');
    const confirmationCampaign = {
      id: Date.now(),
      name: `Partner Application Confirmation - ${formData.firstName} ${formData.lastName}`,
      subject: `Your ${selectedPartnership.title} Application Has Been Received`,
      type: 'Partner Confirmation',
      status: 'Sent',
      recipient: formData.email,
      sentDate: new Date().toISOString(),
      openRate: 0,
      clickRate: 0,
      content: `Thank you ${formData.firstName} for your ${selectedPartnership.title} application! Our partnership team will review your application and contact you within 2-3 business days.`
    };
    
    emailCampaigns.push(confirmationCampaign);
    localStorage.setItem('dankdash_email_campaigns', JSON.stringify(emailCampaigns));
    
    alert(`Application submitted for ${selectedPartnership.title}! We'll review your application and get back to you within 2-3 business days.`);
    setSelectedPartnership(null);
    setFormData({});
  };

  if (selectedPartnership) {
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
                <span className="text-3xl mr-3">{selectedPartnership.icon}</span>
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedPartnership.title} Application
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

              {selectedPartnership.id === 'vendor' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h2>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business *</label>
                      <select
                        name="yearsInBusiness"
                        required
                        value={formData.yearsInBusiness || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="">Select years</option>
                        <option value="less-than-1">Less than 1 year</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Types *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {['Flower', 'Concentrates', 'Edibles', 'Topicals', 'Accessories', 'CBD Products'].map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            name="productTypes"
                            value={type}
                            checked={formData.productTypes?.includes(type) || false}
                            onChange={handleInputChange}
                            className="mr-2 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Motivation */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tell Us About Yourself</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Why do you want to partner with DankDash? *
                  </label>
                  <textarea
                    name="motivation"
                    required
                    rows={4}
                    value={formData.motivation || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Tell us about your goals, experience, and what you hope to achieve as a partner..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedPartnership(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Become a Partner
            <span className="block text-green-600">Grow With DankDash</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our network of partners and be part of the cannabis industry's future. 
            Whether you're a driver, vendor, or business owner, we have opportunities for you.
          </p>
        </div>
      </div>

      {/* Partnership Options */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Choose Your Partnership
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerships.map((partnership) => (
            <div
              key={partnership.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`${partnership.color} p-6 text-white`}>
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{partnership.icon}</span>
                  <h3 className="text-2xl font-bold">{partnership.title}</h3>
                </div>
                <p className="text-lg opacity-90">{partnership.description}</p>
                <div className="mt-4 text-xl font-semibold">
                  Earn: {partnership.earning}
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {partnership.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Requirements:</h4>
                  <ul className="space-y-2">
                    {partnership.requirements.slice(0, 3).map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        <span className="text-sm text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => setSelectedPartnership(partnership)}
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Partner With Us */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Partner With DankDash?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Growing Market</h3>
              <p className="text-gray-600">
                Join the fastest-growing industry with unlimited potential and expanding opportunities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Platform</h3>
              <p className="text-gray-600">
                Leverage cutting-edge technology to optimize your operations and maximize earnings.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Earnings</h3>
              <p className="text-gray-600">
                Earn more with our transparent pricing and performance-based incentives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of partners who are already growing their business with DankDash.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/api-docs"
              className="px-8 py-3 border border-gray-600 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              View API Docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPortal;

