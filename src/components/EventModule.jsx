import React, { useState, useEffect } from 'react';

const EventModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState('all');

  // Mock event data
  const [events, setEvents] = useState([
    {
      id: 'EVT-001',
      name: 'Cannabis Education Workshop',
      description: 'Comprehensive workshop covering cannabis basics, consumption methods, and safety guidelines',
      type: 'Educational',
      status: 'Upcoming',
      startDate: '2024-08-20',
      endDate: '2024-08-20',
      startTime: '14:00',
      endTime: '17:00',
      venue: {
        name: 'DankDash Learning Center',
        address: '123 Cannabis St, Los Angeles, CA 90210',
        capacity: 50,
        type: 'Indoor'
      },
      organizer: {
        name: 'Sarah Johnson',
        email: 'sarah@dankdash.com',
        phone: '+1-555-0123'
      },
      registration: {
        required: true,
        fee: 25.00,
        maxAttendees: 50,
        currentAttendees: 34,
        waitlist: 8,
        registrationDeadline: '2024-08-18'
      },
      speakers: [
        {
          name: 'Dr. Michael Green',
          title: 'Cannabis Research Specialist',
          bio: 'Leading expert in cannabis research with 15+ years experience',
          photo: null
        },
        {
          name: 'Lisa Rodriguez',
          title: 'Certified Cannabis Consultant',
          bio: 'Licensed consultant specializing in medical cannabis applications',
          photo: null
        }
      ],
      agenda: [
        {
          time: '14:00',
          title: 'Welcome & Introduction',
          duration: 30,
          speaker: 'Sarah Johnson'
        },
        {
          time: '14:30',
          title: 'Cannabis Basics & Science',
          duration: 60,
          speaker: 'Dr. Michael Green'
        },
        {
          time: '15:30',
          title: 'Break',
          duration: 15,
          speaker: null
        },
        {
          time: '15:45',
          title: 'Consumption Methods & Safety',
          duration: 60,
          speaker: 'Lisa Rodriguez'
        },
        {
          time: '16:45',
          title: 'Q&A Session',
          duration: 15,
          speaker: 'All Speakers'
        }
      ],
      materials: [
        'Cannabis Education Handbook',
        'Safety Guidelines Brochure',
        'Product Samples (Non-consumable)',
        'Certificate of Completion'
      ],
      requirements: [
        'Valid ID (21+ only)',
        'Pre-registration required',
        'No photography/recording'
      ],
      tags: ['Education', 'Beginner', 'Safety', 'Medical'],
      budget: {
        total: 2500.00,
        spent: 1850.75,
        categories: {
          venue: 500.00,
          speakers: 800.00,
          materials: 350.75,
          marketing: 200.00
        }
      },
      marketing: {
        channels: ['Email', 'Social Media', 'Website'],
        reach: 2500,
        clicks: 450,
        conversions: 34
      },
      feedback: {
        averageRating: 4.7,
        totalResponses: 28,
        wouldRecommend: 96
      }
    },
    {
      id: 'EVT-002',
      name: 'Cannabis Industry Networking Mixer',
      description: 'Professional networking event for cannabis industry professionals, entrepreneurs, and enthusiasts',
      type: 'Networking',
      status: 'Active',
      startDate: '2024-08-15',
      endDate: '2024-08-15',
      startTime: '18:00',
      endTime: '21:00',
      venue: {
        name: 'Green Valley Conference Center',
        address: '456 Industry Blvd, San Francisco, CA 94102',
        capacity: 150,
        type: 'Indoor'
      },
      organizer: {
        name: 'Mike Chen',
        email: 'mike@dankdash.com',
        phone: '+1-555-0124'
      },
      registration: {
        required: true,
        fee: 50.00,
        maxAttendees: 150,
        currentAttendees: 127,
        waitlist: 15,
        registrationDeadline: '2024-08-14'
      },
      speakers: [
        {
          name: 'Jennifer Martinez',
          title: 'Cannabis Industry Analyst',
          bio: 'Market research expert with deep industry insights',
          photo: null
        }
      ],
      agenda: [
        {
          time: '18:00',
          title: 'Registration & Welcome Reception',
          duration: 30,
          speaker: null
        },
        {
          time: '18:30',
          title: 'Industry Trends Presentation',
          duration: 45,
          speaker: 'Jennifer Martinez'
        },
        {
          time: '19:15',
          title: 'Networking Session',
          duration: 90,
          speaker: null
        },
        {
          time: '20:45',
          title: 'Closing Remarks',
          duration: 15,
          speaker: 'Mike Chen'
        }
      ],
      materials: [
        'Industry Report 2024',
        'Networking Directory',
        'Business Card Holder',
        'Welcome Gift Bag'
      ],
      requirements: [
        'Professional attire',
        'Business cards recommended',
        'Industry professionals only'
      ],
      tags: ['Networking', 'Professional', 'Industry', 'Business'],
      budget: {
        total: 7500.00,
        spent: 6850.25,
        categories: {
          venue: 2500.00,
          catering: 3000.00,
          speakers: 1000.00,
          materials: 350.25
        }
      },
      marketing: {
        channels: ['LinkedIn', 'Industry Publications', 'Email'],
        reach: 5000,
        clicks: 890,
        conversions: 127
      },
      feedback: {
        averageRating: 4.5,
        totalResponses: 89,
        wouldRecommend: 92
      }
    },
    {
      id: 'EVT-003',
      name: 'Cannabis Product Launch Event',
      description: 'Exclusive launch event for new premium cannabis product line with tastings and demonstrations',
      type: 'Product Launch',
      status: 'Completed',
      startDate: '2024-08-01',
      endDate: '2024-08-01',
      startTime: '19:00',
      endTime: '22:00',
      venue: {
        name: 'Premium Cannabis Lounge',
        address: '789 Premium Dr, Oakland, CA 94601',
        capacity: 75,
        type: 'Indoor'
      },
      organizer: {
        name: 'Alex Kim',
        email: 'alex@dankdash.com',
        phone: '+1-555-0125'
      },
      registration: {
        required: true,
        fee: 75.00,
        maxAttendees: 75,
        currentAttendees: 75,
        waitlist: 0,
        registrationDeadline: '2024-07-30'
      },
      speakers: [
        {
          name: 'David Brown',
          title: 'Master Grower',
          bio: 'Award-winning cultivator with 20+ years experience',
          photo: null
        },
        {
          name: 'Emma Wilson',
          title: 'Product Development Manager',
          bio: 'Expert in cannabis product innovation and quality',
          photo: null
        }
      ],
      agenda: [
        {
          time: '19:00',
          title: 'VIP Reception',
          duration: 30,
          speaker: null
        },
        {
          time: '19:30',
          title: 'Product Presentation',
          duration: 45,
          speaker: 'Emma Wilson'
        },
        {
          time: '20:15',
          title: 'Cultivation Process Demo',
          duration: 30,
          speaker: 'David Brown'
        },
        {
          time: '20:45',
          title: 'Product Tasting Session',
          duration: 60,
          speaker: null
        },
        {
          time: '21:45',
          title: 'Closing & Special Offers',
          duration: 15,
          speaker: 'Alex Kim'
        }
      ],
      materials: [
        'Product Sample Kit',
        'Cultivation Guide',
        'Exclusive Discount Codes',
        'Premium Gift Bag'
      ],
      requirements: [
        'Valid Cannabis License',
        'Age 21+ verification',
        'Invitation only'
      ],
      tags: ['Product Launch', 'Premium', 'Exclusive', 'Tasting'],
      budget: {
        total: 12000.00,
        spent: 11750.50,
        categories: {
          venue: 3000.00,
          products: 4000.00,
          catering: 2500.00,
          marketing: 1500.00,
          materials: 750.50
        }
      },
      marketing: {
        channels: ['Invitation Only', 'VIP Email', 'Social Media'],
        reach: 1500,
        clicks: 320,
        conversions: 75
      },
      feedback: {
        averageRating: 4.9,
        totalResponses: 68,
        wouldRecommend: 99
      }
    },
    {
      id: 'EVT-004',
      name: 'Cannabis Compliance Training',
      description: 'Mandatory compliance training for cannabis industry employees covering regulations and best practices',
      type: 'Training',
      status: 'Upcoming',
      startDate: '2024-08-25',
      endDate: '2024-08-25',
      startTime: '09:00',
      endTime: '16:00',
      venue: {
        name: 'DankDash Training Facility',
        address: '321 Compliance Ave, Sacramento, CA 95814',
        capacity: 30,
        type: 'Indoor'
      },
      organizer: {
        name: 'Lisa Rodriguez',
        email: 'lisa@dankdash.com',
        phone: '+1-555-0126'
      },
      registration: {
        required: true,
        fee: 150.00,
        maxAttendees: 30,
        currentAttendees: 18,
        waitlist: 3,
        registrationDeadline: '2024-08-23'
      },
      speakers: [
        {
          name: 'Robert Johnson',
          title: 'Compliance Attorney',
          bio: 'Cannabis law specialist with regulatory expertise',
          photo: null
        },
        {
          name: 'Maria Garcia',
          title: 'Quality Assurance Director',
          bio: 'Expert in cannabis quality control and testing',
          photo: null
        }
      ],
      agenda: [
        {
          time: '09:00',
          title: 'Registration & Welcome',
          duration: 30,
          speaker: null
        },
        {
          time: '09:30',
          title: 'Cannabis Regulations Overview',
          duration: 90,
          speaker: 'Robert Johnson'
        },
        {
          time: '11:00',
          title: 'Break',
          duration: 15,
          speaker: null
        },
        {
          time: '11:15',
          title: 'Quality Control Standards',
          duration: 90,
          speaker: 'Maria Garcia'
        },
        {
          time: '12:45',
          title: 'Lunch Break',
          duration: 60,
          speaker: null
        },
        {
          time: '13:45',
          title: 'Compliance Best Practices',
          duration: 90,
          speaker: 'Robert Johnson'
        },
        {
          time: '15:15',
          title: 'Certification Exam',
          duration: 45,
          speaker: null
        }
      ],
      materials: [
        'Compliance Manual',
        'Regulation Reference Guide',
        'Certification Certificate',
        'Training Materials USB'
      ],
      requirements: [
        'Cannabis industry employment',
        'Government-issued ID',
        'Laptop/tablet recommended'
      ],
      tags: ['Training', 'Compliance', 'Certification', 'Mandatory'],
      budget: {
        total: 4500.00,
        spent: 2850.75,
        categories: {
          venue: 800.00,
          speakers: 1500.00,
          materials: 450.75,
          catering: 100.00
        }
      },
      marketing: {
        channels: ['Industry Partners', 'Email', 'Website'],
        reach: 1200,
        clicks: 180,
        conversions: 18
      },
      feedback: {
        averageRating: 4.8,
        totalResponses: 0,
        wouldRecommend: 0
      }
    },
    {
      id: 'EVT-005',
      name: 'Cannabis Wellness Retreat',
      description: 'Weekend wellness retreat focusing on cannabis for health, meditation, and holistic wellness practices',
      type: 'Wellness',
      status: 'Planning',
      startDate: '2024-09-15',
      endDate: '2024-09-17',
      startTime: '10:00',
      endTime: '16:00',
      venue: {
        name: 'Mountain View Wellness Center',
        address: '654 Wellness Way, Napa Valley, CA 94558',
        capacity: 40,
        type: 'Outdoor'
      },
      organizer: {
        name: 'Emma Wilson',
        email: 'emma@dankdash.com',
        phone: '+1-555-0127'
      },
      registration: {
        required: true,
        fee: 350.00,
        maxAttendees: 40,
        currentAttendees: 12,
        waitlist: 0,
        registrationDeadline: '2024-09-10'
      },
      speakers: [
        {
          name: 'Dr. Sarah Green',
          title: 'Cannabis Wellness Expert',
          bio: 'Holistic health practitioner specializing in cannabis therapy',
          photo: null
        },
        {
          name: 'James Martinez',
          title: 'Meditation Instructor',
          bio: 'Certified meditation teacher with cannabis integration expertise',
          photo: null
        }
      ],
      agenda: [
        {
          time: '10:00',
          title: 'Welcome & Intention Setting',
          duration: 60,
          speaker: 'Dr. Sarah Green'
        },
        {
          time: '11:00',
          title: 'Cannabis & Wellness Workshop',
          duration: 90,
          speaker: 'Dr. Sarah Green'
        },
        {
          time: '12:30',
          title: 'Mindful Lunch',
          duration: 60,
          speaker: null
        },
        {
          time: '13:30',
          title: 'Guided Meditation Session',
          duration: 60,
          speaker: 'James Martinez'
        },
        {
          time: '14:30',
          title: 'Nature Walk & Reflection',
          duration: 60,
          speaker: null
        },
        {
          time: '15:30',
          title: 'Closing Circle',
          duration: 30,
          speaker: 'All'
        }
      ],
      materials: [
        'Wellness Journal',
        'Cannabis Wellness Guide',
        'Meditation Cushion',
        'Organic Wellness Kit'
      ],
      requirements: [
        'Medical cannabis recommendation',
        'Comfortable outdoor clothing',
        'Open mind and positive attitude'
      ],
      tags: ['Wellness', 'Retreat', 'Meditation', 'Holistic'],
      budget: {
        total: 15000.00,
        spent: 3500.00,
        categories: {
          venue: 5000.00,
          speakers: 2500.00,
          materials: 1000.00,
          catering: 3000.00,
          accommodation: 3500.00
        }
      },
      marketing: {
        channels: ['Wellness Communities', 'Social Media', 'Email'],
        reach: 3000,
        clicks: 240,
        conversions: 12
      },
      feedback: {
        averageRating: 0,
        totalResponses: 0,
        wouldRecommend: 0
      }
    }
  ]);

  const [venues, setVenues] = useState([
    {
      id: 'VEN-001',
      name: 'DankDash Learning Center',
      address: '123 Cannabis St, Los Angeles, CA 90210',
      capacity: 50,
      type: 'Indoor',
      amenities: ['Projector', 'Sound System', 'WiFi', 'Parking', 'Catering Kitchen'],
      hourlyRate: 75.00,
      availability: 'Available',
      contact: {
        name: 'Venue Manager',
        phone: '+1-555-0200',
        email: 'venues@dankdash.com'
      }
    },
    {
      id: 'VEN-002',
      name: 'Green Valley Conference Center',
      address: '456 Industry Blvd, San Francisco, CA 94102',
      capacity: 150,
      type: 'Indoor',
      amenities: ['Stage', 'Professional Lighting', 'Sound System', 'WiFi', 'Valet Parking'],
      hourlyRate: 200.00,
      availability: 'Available',
      contact: {
        name: 'Conference Manager',
        phone: '+1-555-0201',
        email: 'events@greenvalley.com'
      }
    },
    {
      id: 'VEN-003',
      name: 'Premium Cannabis Lounge',
      address: '789 Premium Dr, Oakland, CA 94601',
      capacity: 75,
      type: 'Indoor',
      amenities: ['Cannabis Consumption Area', 'Premium Seating', 'Bar Service', 'WiFi'],
      hourlyRate: 150.00,
      availability: 'Booked',
      contact: {
        name: 'Lounge Manager',
        phone: '+1-555-0202',
        email: 'bookings@premiumlounge.com'
      }
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalEvents: 45,
    upcomingEvents: 8,
    activeEvents: 3,
    completedEvents: 34,
    totalAttendees: 2340,
    avgAttendance: 52,
    totalRevenue: 89450.75,
    avgTicketPrice: 125.50,
    satisfactionScore: 4.6,
    repeatAttendeeRate: 68.5,
    conversionRate: 15.8,
    topEventType: 'Educational'
  });

  // Filter functions
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || event.status.toLowerCase() === selectedStatus;
    const matchesType = selectedType === 'all' || event.type.toLowerCase() === selectedType;
    const matchesVenue = selectedVenue === 'all' || event.venue.name.toLowerCase().includes(selectedVenue.toLowerCase());
    return matchesSearch && matchesStatus && matchesType && matchesVenue;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Educational': return 'bg-purple-100 text-purple-800';
      case 'Networking': return 'bg-blue-100 text-blue-800';
      case 'Product Launch': return 'bg-green-100 text-green-800';
      case 'Training': return 'bg-orange-100 text-orange-800';
      case 'Wellness': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Educational': return '📚';
      case 'Networking': return '🤝';
      case 'Product Launch': return '🚀';
      case 'Training': return '🎓';
      case 'Wellness': return '🧘';
      default: return '📅';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalEvents}</p>
              <p className="text-sm text-blue-600">{analytics.upcomingEvents} upcoming</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAttendees.toLocaleString()}</p>
              <p className="text-sm text-green-600">{analytics.avgAttendance} avg per event</p>
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
              <p className="text-sm text-purple-600">${analytics.avgTicketPrice} avg ticket</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Satisfaction Score</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.satisfactionScore}/5.0</p>
              <p className="text-sm text-yellow-600">{analytics.repeatAttendeeRate}% repeat rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {events.filter(e => e.status === 'Upcoming').map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getTypeIcon(event.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(event.startDate)} at {formatTime(event.startTime)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.venue.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{event.registration.currentAttendees}/{event.registration.maxAttendees}</p>
                      <p className="text-xs text-gray-500">Registered</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">${event.registration.fee}</p>
                      <p className="text-xs text-gray-500">Ticket Price</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{Math.round((event.registration.currentAttendees / event.registration.maxAttendees) * 100)}%</p>
                      <p className="text-xs text-gray-500">Capacity</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Types Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Event Types Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {['Educational', 'Networking', 'Product Launch', 'Training', 'Wellness'].map((type) => {
              const typeEvents = events.filter(e => e.type === type);
              const totalAttendees = typeEvents.reduce((sum, e) => sum + e.registration.currentAttendees, 0);
              const avgRating = typeEvents.reduce((sum, e) => sum + (e.feedback.averageRating || 0), 0) / typeEvents.length || 0;
              
              return (
                <div key={type} className="p-4 border rounded-lg text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{getTypeIcon(type)}</span>
                  </div>
                  <h4 className="font-medium text-gray-900">{type}</h4>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-gray-600">{typeEvents.length} events</div>
                    <div className="text-sm text-gray-600">{totalAttendees} attendees</div>
                    <div className="text-sm text-yellow-600">{avgRating.toFixed(1)}/5.0 rating</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Event Feedback</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {events.filter(e => e.feedback.totalResponses > 0).sort((a, b) => b.feedback.averageRating - a.feedback.averageRating).slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.name}</h4>
                    <p className="text-sm text-gray-600">{formatDate(event.startDate)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-yellow-600">{event.feedback.averageRating}/5.0</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{event.feedback.totalResponses}</p>
                      <p className="text-xs text-gray-500">Responses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{event.feedback.wouldRecommend}%</p>
                      <p className="text-xs text-gray-500">Would Recommend</p>
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

  const renderEvents = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search events..."
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
              <option value="upcoming">Upcoming</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="planning">Planning</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="educational">Educational</option>
              <option value="networking">Networking</option>
              <option value="product launch">Product Launch</option>
              <option value="training">Training</option>
              <option value="wellness">Wellness</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Event
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getTypeIcon(event.type)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    <span className="text-xs text-gray-500">{event.id}</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Manage
                </button>
                <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  View Details
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{event.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Date & Time:</p>
                <p className="text-sm text-gray-600">{formatDate(event.startDate)}</p>
                <p className="text-sm text-gray-600">{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Venue:</p>
                <p className="text-sm text-gray-600">{event.venue.name}</p>
                <p className="text-sm text-gray-600">Capacity: {event.venue.capacity}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Registration:</p>
                <p className="text-sm text-gray-600">${event.registration.fee} per ticket</p>
                <p className="text-sm text-gray-600">Deadline: {formatDate(event.registration.registrationDeadline)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Organizer:</p>
                <p className="text-sm text-gray-600">{event.organizer.name}</p>
                <p className="text-sm text-gray-600">{event.organizer.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{event.registration.currentAttendees}/{event.registration.maxAttendees}</p>
                <p className="text-xs text-gray-500">Registered</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{Math.round((event.registration.currentAttendees / event.registration.maxAttendees) * 100)}%</p>
                <p className="text-xs text-gray-500">Capacity</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">${(event.budget.total - event.budget.spent).toLocaleString()}</p>
                <p className="text-xs text-gray-500">Budget Remaining</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-600">{event.feedback.averageRating || 'N/A'}</p>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Speakers:</p>
              <div className="flex flex-wrap gap-2">
                {event.speakers.map((speaker, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                    {speaker.name} - {speaker.title}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Budget: ${event.budget.total.toLocaleString()} (${event.budget.spent.toLocaleString()} spent)</span>
              <span>Marketing Reach: {event.marketing.reach.toLocaleString()} people</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVenues = () => (
    <div className="space-y-6">
      {/* Venues List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Event Venues</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Add Venue
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {venues.map((venue) => (
              <div key={venue.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{venue.name}</h4>
                    <p className="text-sm text-gray-600">{venue.address}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">Capacity: {venue.capacity}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">{venue.type}</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className={`text-xs ${venue.availability === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                        {venue.availability}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">${venue.hourlyRate}/hr</p>
                      <p className="text-xs text-gray-500">Hourly Rate</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{venue.amenities.length}</p>
                      <p className="text-xs text-gray-500">Amenities</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                        Book
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Amenities */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Venue Amenities Comparison</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Venue</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Capacity</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Rate/Hour</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Amenities</th>
                  <th className="text-left py-2 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {venues.map((venue) => (
                  <tr key={venue.id} className="border-b">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{venue.name}</p>
                        <p className="text-sm text-gray-600">{venue.type}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{venue.capacity}</td>
                    <td className="py-3 px-4 text-gray-900">${venue.hourlyRate}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {venue.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {amenity}
                          </span>
                        ))}
                        {venue.amenities.length > 3 && (
                          <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            +{venue.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        venue.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {venue.availability}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            <div className="text-3xl font-bold text-blue-600">{analytics.conversionRate}%</div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
            <div className="text-xs text-gray-500 mt-1">Registration to attendance</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{analytics.repeatAttendeeRate}%</div>
            <div className="text-sm text-gray-600">Repeat Attendee Rate</div>
            <div className="text-xs text-gray-500 mt-1">Customer retention</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">${analytics.avgTicketPrice}</div>
            <div className="text-sm text-gray-600">Avg Ticket Price</div>
            <div className="text-xs text-gray-500 mt-1">Across all events</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{analytics.topEventType}</div>
            <div className="text-sm text-gray-600">Top Event Type</div>
            <div className="text-xs text-gray-500 mt-1">Most popular category</div>
          </div>
        </div>
      </div>

      {/* Event Performance by Type */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Event Performance by Type</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {['Educational', 'Networking', 'Product Launch', 'Training', 'Wellness'].map((type) => {
              const typeEvents = events.filter(e => e.type === type);
              const totalAttendees = typeEvents.reduce((sum, e) => sum + e.registration.currentAttendees, 0);
              const totalRevenue = typeEvents.reduce((sum, e) => sum + (e.registration.currentAttendees * e.registration.fee), 0);
              const avgRating = typeEvents.reduce((sum, e) => sum + (e.feedback.averageRating || 0), 0) / typeEvents.length || 0;
              const avgCapacity = typeEvents.reduce((sum, e) => sum + ((e.registration.currentAttendees / e.registration.maxAttendees) * 100), 0) / typeEvents.length || 0;
              
              return (
                <div key={type} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">{getTypeIcon(type)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{type}</h4>
                      <p className="text-sm text-gray-600">{typeEvents.length} events total</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{totalAttendees}</p>
                        <p className="text-xs text-gray-500">Total Attendees</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-600">${(totalRevenue / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-gray-500">Revenue</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-yellow-600">{avgRating.toFixed(1)}/5.0</p>
                        <p className="text-xs text-gray-500">Avg Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-blue-600">{avgCapacity.toFixed(0)}%</p>
                        <p className="text-xs text-gray-500">Avg Capacity</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Revenue Analysis */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Revenue Analysis</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${(analytics.totalRevenue / 1000).toFixed(0)}k</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
              <div className="text-xs text-gray-500 mt-1">All events combined</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">${analytics.avgTicketPrice}</div>
              <div className="text-sm text-gray-600">Average Ticket Price</div>
              <div className="text-xs text-gray-500 mt-1">Across all event types</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{analytics.avgAttendance}</div>
              <div className="text-sm text-gray-600">Average Attendance</div>
              <div className="text-xs text-gray-500 mt-1">Per event</div>
            </div>
          </div>
        </div>
      </div>

      {/* Satisfaction Metrics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Customer Satisfaction Metrics</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {events.filter(e => e.feedback.totalResponses > 0).sort((a, b) => b.feedback.averageRating - a.feedback.averageRating).map((event) => (
              <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{event.name}</h4>
                    <p className="text-sm text-gray-600">{formatDate(event.startDate)} • {event.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-yellow-600">{event.feedback.averageRating}/5.0</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">{event.feedback.totalResponses}</p>
                      <p className="text-xs text-gray-500">Responses</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-green-600">{event.feedback.wouldRecommend}%</p>
                      <p className="text-xs text-gray-500">Would Recommend</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-blue-600">{Math.round((event.feedback.totalResponses / event.registration.currentAttendees) * 100)}%</p>
                      <p className="text-xs text-gray-500">Response Rate</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="mt-2 text-gray-600">Organize and manage cannabis industry events, workshops, and networking sessions</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'events', name: 'Events', icon: '📅' },
              { id: 'venues', name: 'Venues', icon: '🏢' },
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
        {activeTab === 'events' && renderEvents()}
        {activeTab === 'venues' && renderVenues()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default EventModule;

