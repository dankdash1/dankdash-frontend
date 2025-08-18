import React, { useState, useEffect } from 'react';

const EnhancedEventModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedVenue, setSelectedVenue] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAttendeeModal, setShowAttendeeModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Enhanced event data with full functionality
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
        spent: 1850.00,
        remaining: 650.00
      },
      createdAt: '2024-07-15',
      updatedAt: '2024-08-10'
    },
    {
      id: 'EVT-002',
      name: 'Cannabis Industry Networking Mixer',
      description: 'Professional networking event for cannabis industry professionals, entrepreneurs, and investors',
      type: 'Networking',
      status: 'Active',
      startDate: '2024-08-25',
      endDate: '2024-08-25',
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
        currentAttendees: 89,
        waitlist: 12,
        registrationDeadline: '2024-08-23'
      },
      speakers: [
        {
          name: 'Jennifer Martinez',
          title: 'Cannabis Industry Investor',
          bio: 'Venture capitalist focused on cannabis startups and innovation',
          photo: null
        }
      ],
      agenda: [
        {
          time: '18:00',
          title: 'Registration & Welcome Drinks',
          duration: 30,
          speaker: null
        },
        {
          time: '18:30',
          title: 'Industry Overview Presentation',
          duration: 45,
          speaker: 'Jennifer Martinez'
        },
        {
          time: '19:15',
          title: 'Networking & Refreshments',
          duration: 105,
          speaker: null
        }
      ],
      materials: [
        'Industry Report 2024',
        'Networking Directory',
        'Business Cards Exchange'
      ],
      requirements: [
        'Professional attire',
        'Business cards recommended',
        'Industry professionals only'
      ],
      tags: ['Networking', 'Professional', 'Industry', 'Business'],
      budget: {
        total: 7500.00,
        spent: 4200.00,
        remaining: 3300.00
      },
      createdAt: '2024-07-20',
      updatedAt: '2024-08-12'
    },
    {
      id: 'EVT-003',
      name: 'Cannabis Cultivation Masterclass',
      description: 'Advanced cultivation techniques workshop for experienced growers',
      type: 'Workshop',
      status: 'Completed',
      startDate: '2024-08-10',
      endDate: '2024-08-10',
      startTime: '10:00',
      endTime: '16:00',
      venue: {
        name: 'GrowTech Facility',
        address: '789 Cultivation Way, Oakland, CA 94610',
        capacity: 25,
        type: 'Greenhouse'
      },
      organizer: {
        name: 'Alex Rodriguez',
        email: 'alex@dankdash.com',
        phone: '+1-555-0125'
      },
      registration: {
        required: true,
        fee: 150.00,
        maxAttendees: 25,
        currentAttendees: 25,
        waitlist: 0,
        registrationDeadline: '2024-08-08'
      },
      speakers: [
        {
          name: 'Master Grower Tom Wilson',
          title: 'Head Cultivator',
          bio: '20+ years experience in commercial cannabis cultivation',
          photo: null
        }
      ],
      agenda: [
        {
          time: '10:00',
          title: 'Advanced Nutrient Management',
          duration: 90,
          speaker: 'Tom Wilson'
        },
        {
          time: '11:30',
          title: 'Break',
          duration: 15,
          speaker: null
        },
        {
          time: '11:45',
          title: 'Environmental Controls',
          duration: 90,
          speaker: 'Tom Wilson'
        },
        {
          time: '13:15',
          title: 'Lunch Break',
          duration: 45,
          speaker: null
        },
        {
          time: '14:00',
          title: 'Pest & Disease Management',
          duration: 90,
          speaker: 'Tom Wilson'
        },
        {
          time: '15:30',
          title: 'Harvest & Curing Techniques',
          duration: 30,
          speaker: 'Tom Wilson'
        }
      ],
      materials: [
        'Cultivation Guide',
        'Nutrient Schedule Templates',
        'Pest Identification Chart',
        'Sample Testing Kit'
      ],
      requirements: [
        'Basic cultivation knowledge',
        'Notebook for taking notes',
        'Closed-toe shoes required'
      ],
      tags: ['Cultivation', 'Advanced', 'Workshop', 'Hands-on'],
      budget: {
        total: 3750.00,
        spent: 3750.00,
        remaining: 0.00
      },
      createdAt: '2024-07-01',
      updatedAt: '2024-08-10'
    }
  ]);

  const [attendees, setAttendees] = useState([
    {
      id: 'ATT-001',
      eventId: 'EVT-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-1001',
      registrationDate: '2024-07-20',
      paymentStatus: 'Paid',
      checkInStatus: 'Not Checked In',
      ticketType: 'Regular',
      specialRequests: 'Vegetarian meal preference',
      company: 'Green Solutions Inc.',
      title: 'Marketing Manager'
    },
    {
      id: 'ATT-002',
      eventId: 'EVT-001',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1-555-1002',
      registrationDate: '2024-07-22',
      paymentStatus: 'Paid',
      checkInStatus: 'Checked In',
      ticketType: 'Regular',
      specialRequests: null,
      company: 'Cannabis Consulting LLC',
      title: 'Senior Consultant'
    }
  ]);

  const [venues, setVenues] = useState([
    {
      id: 'VEN-001',
      name: 'DankDash Learning Center',
      address: '123 Cannabis St, Los Angeles, CA 90210',
      capacity: 50,
      type: 'Indoor',
      amenities: ['Projector', 'Sound System', 'WiFi', 'Parking'],
      hourlyRate: 75.00,
      status: 'Available'
    },
    {
      id: 'VEN-002',
      name: 'Green Valley Conference Center',
      address: '456 Industry Blvd, San Francisco, CA 94102',
      capacity: 150,
      type: 'Indoor',
      amenities: ['A/V Equipment', 'Catering Kitchen', 'WiFi', 'Valet Parking'],
      hourlyRate: 200.00,
      status: 'Available'
    },
    {
      id: 'VEN-003',
      name: 'GrowTech Facility',
      address: '789 Cultivation Way, Oakland, CA 94610',
      capacity: 25,
      type: 'Greenhouse',
      amenities: ['Growing Equipment', 'Climate Control', 'Security System'],
      hourlyRate: 150.00,
      status: 'Available'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalEvents: 15,
    upcomingEvents: 8,
    activeEvents: 3,
    completedEvents: 4,
    totalAttendees: 567,
    averageAttendance: 37.8,
    totalRevenue: 28450.00,
    averageTicketPrice: 50.18,
    topEventType: 'Educational',
    attendanceRate: 89.2,
    noShowRate: 10.8,
    repeatAttendees: 234
  });

  // Form states
  const [eventForm, setEventForm] = useState({
    name: '',
    description: '',
    type: 'Educational',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    venue: {
      name: '',
      address: '',
      capacity: 50,
      type: 'Indoor'
    },
    organizer: {
      name: '',
      email: '',
      phone: ''
    },
    registration: {
      required: true,
      fee: 0,
      maxAttendees: 50,
      registrationDeadline: ''
    },
    speakers: [],
    agenda: [],
    materials: [],
    requirements: [],
    tags: [],
    budget: {
      total: 0
    }
  });

  const [attendeeForm, setAttendeeForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    ticketType: 'Regular',
    specialRequests: ''
  });

  // CRUD Operations for Events
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newEvent = {
        id: `EVT-${String(events.length + 1).padStart(3, '0')}`,
        ...eventForm,
        status: 'Upcoming',
        registration: {
          ...eventForm.registration,
          currentAttendees: 0,
          waitlist: 0
        },
        budget: {
          ...eventForm.budget,
          spent: 0,
          remaining: eventForm.budget.total
        },
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      setEvents([...events, newEvent]);
      setShowCreateModal(false);
      setEventForm({
        name: '',
        description: '',
        type: 'Educational',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        venue: {
          name: '',
          address: '',
          capacity: 50,
          type: 'Indoor'
        },
        organizer: {
          name: '',
          email: '',
          phone: ''
        },
        registration: {
          required: true,
          fee: 0,
          maxAttendees: 50,
          registrationDeadline: ''
        },
        speakers: [],
        agenda: [],
        materials: [],
        requirements: [],
        tags: [],
        budget: {
          total: 0
        }
      });
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalEvents: prev.totalEvents + 1,
        upcomingEvents: prev.upcomingEvents + 1
      }));

    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...eventForm, updatedAt: new Date().toISOString().split('T')[0] }
          : event
      );
      
      setEvents(updatedEvents);
      setShowEditModal(false);
      setSelectedEvent(null);
      
    } catch (error) {
      console.error('Error updating event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    setLoading(true);
    
    try {
      const updatedEvents = events.filter(event => event.id !== selectedEvent.id);
      setEvents(updatedEvents);
      
      // Update analytics
      setAnalytics(prev => ({
        ...prev,
        totalEvents: prev.totalEvents - 1,
        upcomingEvents: selectedEvent.status === 'Upcoming' ? prev.upcomingEvents - 1 : prev.upcomingEvents,
        activeEvents: selectedEvent.status === 'Active' ? prev.activeEvents - 1 : prev.activeEvents,
        completedEvents: selectedEvent.status === 'Completed' ? prev.completedEvents - 1 : prev.completedEvents
      }));
      
      setShowDeleteModal(false);
      setSelectedEvent(null);
      
    } catch (error) {
      console.error('Error deleting event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEventStatus = (eventId, newStatus) => {
    const updatedEvents = events.map(event => 
      event.id === eventId 
        ? { ...event, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : event
    );
    
    setEvents(updatedEvents);
  };

  const handleAddAttendee = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newAttendee = {
        id: `ATT-${String(attendees.length + 1).padStart(3, '0')}`,
        eventId: selectedEvent.id,
        ...attendeeForm,
        registrationDate: new Date().toISOString().split('T')[0],
        paymentStatus: 'Pending',
        checkInStatus: 'Not Checked In'
      };

      setAttendees([...attendees, newAttendee]);
      
      // Update event attendee count
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { 
              ...event, 
              registration: {
                ...event.registration,
                currentAttendees: event.registration.currentAttendees + 1
              }
            }
          : event
      );
      setEvents(updatedEvents);
      
      setShowAttendeeModal(false);
      setAttendeeForm({
        name: '',
        email: '',
        phone: '',
        company: '',
        title: '',
        ticketType: 'Regular',
        specialRequests: ''
      });
      
    } catch (error) {
      console.error('Error adding attendee:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter functions
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || event.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesType = selectedType === 'all' || event.type.toLowerCase() === selectedType.toLowerCase();
    const matchesVenue = selectedVenue === 'all' || event.venue.name.toLowerCase().includes(selectedVenue.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesType && matchesVenue;
  });

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setEventForm({
      name: event.name,
      description: event.description,
      type: event.type,
      startDate: event.startDate,
      endDate: event.endDate,
      startTime: event.startTime,
      endTime: event.endTime,
      venue: event.venue,
      organizer: event.organizer,
      registration: event.registration,
      speakers: event.speakers,
      agenda: event.agenda,
      materials: event.materials,
      requirements: event.requirements,
      tags: event.tags,
      budget: event.budget
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const openAttendeeModal = (event) => {
    setSelectedEvent(event);
    setShowAttendeeModal(true);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'educational': return 'text-purple-600 bg-purple-100';
      case 'networking': return 'text-blue-600 bg-blue-100';
      case 'workshop': return 'text-green-600 bg-green-100';
      case 'conference': return 'text-yellow-600 bg-yellow-100';
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
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalEvents}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">{analytics.upcomingEvents} Upcoming</span>
            <span className="text-gray-500 ml-2">• {analytics.activeEvents} Active</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalAttendees}</p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-600 font-medium">Avg: {analytics.averageAttendance}</span>
            <span className="text-gray-500 ml-2">• {analytics.attendanceRate}% Rate</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${analytics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-yellow-600 font-medium">Avg: ${analytics.averageTicketPrice}</span>
            <span className="text-gray-500 ml-2">per ticket</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Repeat Attendees</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.repeatAttendees}</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-purple-600 font-medium">{analytics.noShowRate}% No-show</span>
          </div>
        </div>
      </div>

      {/* Event Type Distribution */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Event Types Distribution</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {['Educational', 'Networking', 'Workshop', 'Conference'].map((type) => {
              const typeEvents = events.filter(event => event.type === type);
              const percentage = events.length > 0 ? ((typeEvents.length / events.length) * 100).toFixed(1) : 0;
              
              return (
                <div key={type} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(type)}`}>
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{type}</h4>
                      <p className="text-sm text-gray-500">{typeEvents.length} events</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Percentage</span>
                      <span className="font-medium text-gray-900">{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Events</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {events
              .filter(event => event.status === 'Upcoming')
              .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
              .slice(0, 5)
              .map((event) => (
                <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900">{event.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.venue.name}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>{new Date(event.startDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{event.startTime} - {event.endTime}</span>
                      <span>•</span>
                      <span>{event.registration.currentAttendees}/{event.registration.maxAttendees} registered</span>
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
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search events..."
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
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="educational">Educational</option>
            <option value="networking">Networking</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conference</option>
          </select>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Event</span>
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{event.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                      {event.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(event.startDate).toLocaleDateString()} • {event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{event.venue.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{event.registration.currentAttendees}/{event.registration.maxAttendees} registered</span>
                  {event.registration.waitlist > 0 && (
                    <span className="text-yellow-600 ml-2">• {event.registration.waitlist} waitlist</span>
                  )}
                </div>
                {event.registration.fee > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>${event.registration.fee} registration fee</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {event.status === 'Upcoming' && (
                      <>
                        <button
                          onClick={() => handleToggleEventStatus(event.id, 'Active')}
                          className="p-2 text-green-600 hover:text-green-700 transition-colors"
                          title="Start Event"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleToggleEventStatus(event.id, 'Cancelled')}
                          className="p-2 text-red-600 hover:text-red-700 transition-colors"
                          title="Cancel Event"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </>
                    )}
                    {event.status === 'Active' && (
                      <button
                        onClick={() => handleToggleEventStatus(event.id, 'Completed')}
                        className="p-2 text-blue-600 hover:text-blue-700 transition-colors"
                        title="Complete Event"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => openAttendeeModal(event)}
                      className="p-2 text-purple-600 hover:text-purple-700 transition-colors"
                      title="Add Attendee"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(event)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => openDeleteModal(event)}
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

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating your first event.</p>
          <div className="mt-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Event
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderAttendees = () => (
    <div className="space-y-6">
      {/* Attendee Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attendees</p>
              <p className="text-2xl font-bold text-gray-900">{attendees.length}</p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Checked In</p>
              <p className="text-2xl font-bold text-gray-900">
                {attendees.filter(a => a.checkInStatus === 'Checked In').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {attendees.filter(a => a.paymentStatus === 'Pending').length}
              </p>
            </div>
            <div className="h-8 w-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <svg className="h-4 w-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Attendees Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Event Attendees</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendees.map((attendee) => {
                const event = events.find(e => e.id === attendee.eventId);
                return (
                  <tr key={attendee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                        <div className="text-sm text-gray-500">{attendee.email}</div>
                        {attendee.company && (
                          <div className="text-sm text-gray-500">{attendee.company}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{event?.name}</div>
                      <div className="text-sm text-gray-500">{event?.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(attendee.registrationDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500">{attendee.ticketType}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        attendee.paymentStatus === 'Paid' ? 'text-green-600 bg-green-100' :
                        attendee.paymentStatus === 'Pending' ? 'text-yellow-600 bg-yellow-100' :
                        'text-red-600 bg-red-100'
                      }`}>
                        {attendee.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        attendee.checkInStatus === 'Checked In' ? 'text-green-600 bg-green-100' :
                        'text-gray-600 bg-gray-100'
                      }`}>
                        {attendee.checkInStatus}
                      </span>
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
        <p className="text-gray-600 mt-1">Manage events, attendees, and venues</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10' },
            { id: 'events', name: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { id: 'attendees', name: 'Attendees', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
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
      {activeTab === 'events' && renderEvents()}
      {activeTab === 'attendees' && renderAttendees()}

      {/* Create Event Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Create Event</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateEvent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.name}
                      onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                      placeholder="Cannabis Education Workshop"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.type}
                      onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                    >
                      <option value="Educational">Educational</option>
                      <option value="Networking">Networking</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Conference">Conference</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    placeholder="Describe the event..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.startDate}
                      onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.endDate}
                      onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.startTime}
                      onChange={(e) => setEventForm({ ...eventForm, startTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.endTime}
                      onChange={(e) => setEventForm({ ...eventForm, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.venue.name}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        venue: { ...eventForm.venue, name: e.target.value }
                      })}
                      placeholder="Venue Name"
                    />
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.venue.address}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        venue: { ...eventForm.venue, address: e.target.value }
                      })}
                      placeholder="Venue Address"
                    />
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.venue.capacity}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        venue: { ...eventForm.venue, capacity: parseInt(e.target.value) || 50 }
                      })}
                      placeholder="Capacity"
                    />
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.venue.type}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        venue: { ...eventForm.venue, type: e.target.value }
                      })}
                    >
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Greenhouse">Greenhouse</option>
                      <option value="Virtual">Virtual</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organizer</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.organizer.name}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        organizer: { ...eventForm.organizer, name: e.target.value }
                      })}
                      placeholder="Organizer Name"
                    />
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.organizer.email}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        organizer: { ...eventForm.organizer, email: e.target.value }
                      })}
                      placeholder="Organizer Email"
                    />
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.organizer.phone}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        organizer: { ...eventForm.organizer, phone: e.target.value }
                      })}
                      placeholder="Organizer Phone"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Registration</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.registration.fee}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        registration: { ...eventForm.registration, fee: parseFloat(e.target.value) || 0 }
                      })}
                      placeholder="Registration Fee ($)"
                    />
                    <input
                      type="number"
                      required
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.registration.maxAttendees}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        registration: { ...eventForm.registration, maxAttendees: parseInt(e.target.value) || 50 }
                      })}
                      placeholder="Max Attendees"
                    />
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={eventForm.registration.registrationDeadline}
                      onChange={(e) => setEventForm({ 
                        ...eventForm, 
                        registration: { ...eventForm.registration, registrationDeadline: e.target.value }
                      })}
                      placeholder="Registration Deadline"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={eventForm.budget.total}
                    onChange={(e) => setEventForm({ 
                      ...eventForm, 
                      budget: { ...eventForm.budget, total: parseFloat(e.target.value) || 0 }
                    })}
                    placeholder="Total Budget"
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
                    {loading ? 'Creating...' : 'Create Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Edit Event</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={eventForm.name}
                    onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={eventForm.description}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
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
                    {loading ? 'Updating...' : 'Update Event'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Event Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Delete Event</h2>
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
                  Are you sure you want to delete <strong>{selectedEvent?.name}</strong>? This action cannot be undone and will remove all attendee data.
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
                  onClick={handleDeleteEvent}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Deleting...' : 'Delete Event'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Attendee Modal */}
      {showAttendeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Add Attendee</h2>
                <button
                  onClick={() => setShowAttendeeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddAttendee} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={attendeeForm.name}
                      onChange={(e) => setAttendeeForm({ ...attendeeForm, name: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={attendeeForm.email}
                      onChange={(e) => setAttendeeForm({ ...attendeeForm, email: e.target.value })}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={attendeeForm.phone}
                      onChange={(e) => setAttendeeForm({ ...attendeeForm, phone: e.target.value })}
                      placeholder="+1-555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={attendeeForm.company}
                      onChange={(e) => setAttendeeForm({ ...attendeeForm, company: e.target.value })}
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={attendeeForm.title}
                      onChange={(e) => setAttendeeForm({ ...attendeeForm, title: e.target.value })}
                      placeholder="Marketing Manager"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Type</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={attendeeForm.ticketType}
                      onChange={(e) => setAttendeeForm({ ...attendeeForm, ticketType: e.target.value })}
                    >
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                      <option value="Student">Student</option>
                      <option value="Press">Press</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={attendeeForm.specialRequests}
                    onChange={(e) => setAttendeeForm({ ...attendeeForm, specialRequests: e.target.value })}
                    placeholder="Any special requests or dietary requirements..."
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAttendeeModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add Attendee'}
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

export default EnhancedEventModule;

