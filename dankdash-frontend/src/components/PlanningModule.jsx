import React, { useState, useEffect } from 'react';

const PlanningModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('calendar'); // calendar, list, gantt

  // Mock planning data
  const [schedules, setSchedules] = useState([
    {
      id: 'SCH-001',
      title: 'Delivery Team Alpha - Morning Shift',
      type: 'Staff Schedule',
      department: 'Delivery',
      startDate: '2024-08-15',
      endDate: '2024-08-15',
      startTime: '08:00',
      endTime: '16:00',
      assignedTo: ['John Doe', 'Sarah Johnson', 'Mike Chen'],
      status: 'Confirmed',
      location: 'Delivery Hub A',
      description: 'Morning delivery shift covering downtown and east side routes',
      priority: 'High',
      recurring: 'Daily',
      capacity: 3,
      utilized: 3,
      notes: 'Peak delivery hours, full team required'
    },
    {
      id: 'SCH-002',
      title: 'Equipment Maintenance - Delivery Vehicles',
      type: 'Maintenance',
      department: 'Operations',
      startDate: '2024-08-20',
      endDate: '2024-08-20',
      startTime: '18:00',
      endTime: '22:00',
      assignedTo: ['Alex Kim'],
      status: 'Scheduled',
      location: 'Maintenance Bay',
      description: 'Routine maintenance for delivery fleet vehicles',
      priority: 'Medium',
      recurring: 'Weekly',
      capacity: 1,
      utilized: 1,
      notes: 'After hours to avoid disrupting deliveries'
    },
    {
      id: 'SCH-003',
      title: 'Inventory Audit - Flower Products',
      type: 'Operations',
      department: 'Inventory',
      startDate: '2024-08-18',
      endDate: '2024-08-18',
      startTime: '09:00',
      endTime: '17:00',
      assignedTo: ['Lisa Rodriguez', 'Emma Davis'],
      status: 'In Progress',
      location: 'Warehouse A',
      description: 'Monthly inventory audit for all flower products',
      priority: 'High',
      recurring: 'Monthly',
      capacity: 2,
      utilized: 2,
      notes: 'Compliance requirement, must be completed by month end'
    },
    {
      id: 'SCH-004',
      title: 'Staff Training - Cannabis Regulations',
      type: 'Training',
      department: 'HR',
      startDate: '2024-08-25',
      endDate: '2024-08-25',
      startTime: '14:00',
      endTime: '16:00',
      assignedTo: ['All Staff'],
      status: 'Scheduled',
      location: 'Conference Room',
      description: 'Quarterly training on updated cannabis regulations',
      priority: 'High',
      recurring: 'Quarterly',
      capacity: 25,
      utilized: 18,
      notes: 'Mandatory attendance for all employees'
    },
    {
      id: 'SCH-005',
      title: 'Marketing Campaign Launch',
      type: 'Project',
      department: 'Marketing',
      startDate: '2024-08-22',
      endDate: '2024-08-30',
      startTime: '09:00',
      endTime: '18:00',
      assignedTo: ['Emma Davis', 'Marketing Team'],
      status: 'Planning',
      location: 'Marketing Office',
      description: 'Launch of fall cannabis product marketing campaign',
      priority: 'Medium',
      recurring: 'None',
      capacity: 4,
      utilized: 3,
      notes: 'Multi-channel campaign across digital and traditional media'
    }
  ]);

  const [resources, setResources] = useState([
    {
      id: 'RES-001',
      name: 'Delivery Vehicle #1',
      type: 'Vehicle',
      department: 'Delivery',
      status: 'Available',
      capacity: 1,
      currentBookings: 8,
      maxBookings: 12,
      location: 'Delivery Hub A',
      maintenanceDate: '2024-08-20',
      utilizationRate: 67,
      costPerHour: 25.00
    },
    {
      id: 'RES-002',
      name: 'Conference Room A',
      type: 'Facility',
      department: 'General',
      status: 'Available',
      capacity: 25,
      currentBookings: 3,
      maxBookings: 8,
      location: 'Main Office',
      maintenanceDate: null,
      utilizationRate: 38,
      costPerHour: 0.00
    },
    {
      id: 'RES-003',
      name: 'Packaging Equipment #2',
      type: 'Equipment',
      department: 'Operations',
      status: 'In Use',
      capacity: 1,
      currentBookings: 6,
      maxBookings: 8,
      location: 'Packaging Area',
      maintenanceDate: '2024-09-01',
      utilizationRate: 75,
      costPerHour: 15.00
    },
    {
      id: 'RES-004',
      name: 'Quality Testing Lab',
      type: 'Facility',
      department: 'Quality Control',
      status: 'Available',
      capacity: 3,
      currentBookings: 4,
      maxBookings: 6,
      location: 'Lab Building',
      maintenanceDate: '2024-08-30',
      utilizationRate: 67,
      costPerHour: 50.00
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 'PROJ-001',
      name: 'Q4 Product Launch',
      description: 'Launch of new premium cannabis product line for Q4',
      startDate: '2024-09-01',
      endDate: '2024-12-15',
      status: 'Planning',
      progress: 15,
      manager: 'Sarah Johnson',
      team: ['Emma Davis', 'Mike Chen', 'Alex Kim'],
      budget: 150000.00,
      spent: 22500.00,
      milestones: [
        { id: 1, name: 'Product Development', date: '2024-09-30', status: 'Pending' },
        { id: 2, name: 'Marketing Campaign', date: '2024-10-31', status: 'Pending' },
        { id: 3, name: 'Launch Event', date: '2024-11-15', status: 'Pending' },
        { id: 4, name: 'Market Release', date: '2024-12-01', status: 'Pending' }
      ]
    },
    {
      id: 'PROJ-002',
      name: 'Facility Expansion',
      description: 'Expansion of main facility to increase production capacity',
      startDate: '2024-08-01',
      endDate: '2024-11-30',
      status: 'In Progress',
      progress: 35,
      manager: 'John Smith',
      team: ['Lisa Rodriguez', 'Alex Kim'],
      budget: 500000.00,
      spent: 175000.00,
      milestones: [
        { id: 1, name: 'Permits Approved', date: '2024-08-15', status: 'Completed' },
        { id: 2, name: 'Construction Start', date: '2024-09-01', status: 'In Progress' },
        { id: 3, name: 'Equipment Installation', date: '2024-10-15', status: 'Pending' },
        { id: 4, name: 'Final Inspection', date: '2024-11-15', status: 'Pending' }
      ]
    },
    {
      id: 'PROJ-003',
      name: 'Compliance System Upgrade',
      description: 'Upgrade of compliance tracking and reporting systems',
      startDate: '2024-07-01',
      endDate: '2024-09-30',
      status: 'In Progress',
      progress: 70,
      manager: 'Alex Kim',
      team: ['Mike Chen', 'Lisa Rodriguez'],
      budget: 75000.00,
      spent: 52500.00,
      milestones: [
        { id: 1, name: 'System Analysis', date: '2024-07-15', status: 'Completed' },
        { id: 2, name: 'Development Phase', date: '2024-08-31', status: 'In Progress' },
        { id: 3, name: 'Testing & QA', date: '2024-09-15', status: 'Pending' },
        { id: 4, name: 'Go Live', date: '2024-09-30', status: 'Pending' }
      ]
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalSchedules: 45,
    activeProjects: 8,
    resourceUtilization: 72.5,
    schedulingEfficiency: 89.2,
    overdueItems: 3,
    upcomingDeadlines: 12,
    avgProjectDuration: 85,
    budgetUtilization: 68.3
  });

  // Filter functions
  const filteredSchedules = schedules.filter(schedule => {
    const matchesSearch = schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         schedule.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || schedule.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || schedule.status.toLowerCase().replace(' ', '-') === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Available': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Staff Schedule': return '👥';
      case 'Maintenance': return '🔧';
      case 'Operations': return '⚙️';
      case 'Training': return '📚';
      case 'Project': return '📋';
      case 'Vehicle': return '🚗';
      case 'Facility': return '🏢';
      case 'Equipment': return '⚙️';
      default: return '📅';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Schedules</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalSchedules}</p>
              <p className="text-sm text-blue-600">{analytics.upcomingDeadlines} upcoming</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeProjects}</p>
              <p className="text-sm text-green-600">{analytics.overdueItems} overdue</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resource Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.resourceUtilization}%</p>
              <p className="text-sm text-gray-600">Efficiency rate</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Budget Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.budgetUtilization}%</p>
              <p className="text-sm text-gray-600">Across all projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Planning Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.schedulingEfficiency}%</div>
              <div className="text-sm text-gray-600">Scheduling Efficiency</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.schedulingEfficiency}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.avgProjectDuration}</div>
              <div className="text-sm text-gray-600">Avg Project Duration (days)</div>
              <div className="text-xs text-gray-500 mt-1">Target: 90 days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.resourceUtilization}%</div>
              <div className="text-sm text-gray-600">Resource Utilization</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${analytics.resourceUtilization}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {schedules.filter(s => s.startDate === '2024-08-15').map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getTypeIcon(schedule.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{schedule.title}</h4>
                    <p className="text-sm text-gray-600">{schedule.startTime} - {schedule.endTime} • {schedule.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">Team</p>
                      <p className="font-medium">{schedule.assignedTo.length} members</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                      {schedule.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Utilization */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Resource Utilization</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource) => (
              <div key={resource.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{resource.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(resource.status)}`}>
                    {resource.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{resource.type} • {resource.department}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Utilization:</span>
                    <span className="text-blue-600">{resource.utilizationRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${resource.utilizationRate}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bookings:</span>
                    <span className="text-gray-900">{resource.currentBookings}/{resource.maxBookings}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Projects</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.filter(p => p.status !== 'Completed').map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Progress:</p>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Manager:</p>
                    <p className="text-sm text-gray-600">{project.manager}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Budget:</p>
                    <p className="text-sm text-green-600">${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">End Date:</p>
                    <p className="text-sm text-gray-600">{project.endDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedules = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search schedules..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              <option value="Delivery">Delivery</option>
              <option value="Operations">Operations</option>
              <option value="Inventory">Inventory</option>
              <option value="HR">HR</option>
              <option value="Marketing">Marketing</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'calendar' ? 'list' : 'calendar')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              {viewMode === 'calendar' ? '📋' : '📅'} {viewMode === 'calendar' ? 'List' : 'Calendar'}
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Schedules Display */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Schedule Calendar</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(2024, 7, i - 6); // August 2024
                const dateStr = date.toISOString().split('T')[0];
                const daySchedules = schedules.filter(s => s.startDate === dateStr);
                
                return (
                  <div key={i} className="min-h-24 p-2 border rounded">
                    <div className="text-sm text-gray-600 mb-1">{date.getDate()}</div>
                    {daySchedules.slice(0, 2).map((schedule) => (
                      <div key={schedule.id} className="text-xs bg-blue-100 text-blue-800 p-1 rounded mb-1 truncate">
                        {schedule.title}
                      </div>
                    ))}
                    {daySchedules.length > 2 && (
                      <div className="text-xs text-gray-500">+{daySchedules.length - 2} more</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSchedules.map((schedule) => (
            <div key={schedule.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getTypeIcon(schedule.type)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{schedule.title}</h3>
                    <p className="text-sm text-gray-600">{schedule.type} • {schedule.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(schedule.priority)}`}>
                    {schedule.priority}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                    {schedule.status}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{schedule.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Date & Time:</p>
                  <p className="text-sm text-gray-600">{schedule.startDate}</p>
                  <p className="text-sm text-gray-600">{schedule.startTime} - {schedule.endTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Location:</p>
                  <p className="text-sm text-gray-600">{schedule.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Assigned To:</p>
                  <p className="text-sm text-gray-600">{schedule.assignedTo.slice(0, 2).join(', ')}</p>
                  {schedule.assignedTo.length > 2 && (
                    <p className="text-sm text-gray-500">+{schedule.assignedTo.length - 2} more</p>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Capacity:</p>
                  <p className="text-sm text-gray-600">{schedule.utilized}/{schedule.capacity}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(schedule.utilized / schedule.capacity) * 100}%` }}></div>
                  </div>
                </div>
              </div>
              
              {schedule.notes && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700">Notes:</p>
                  <p className="text-sm text-gray-600">{schedule.notes}</p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Details
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Edit
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Duplicate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Resource
            </button>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{resource.name}</h3>
                  <p className="text-sm text-gray-600">{resource.type}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(resource.status)}`}>
                {resource.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Department:</p>
                <p className="text-sm text-gray-600">{resource.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Location:</p>
                <p className="text-sm text-gray-600">{resource.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Utilization:</p>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${resource.utilizationRate}%` }}></div>
                  </div>
                  <span className="text-sm text-gray-600">{resource.utilizationRate}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Bookings:</p>
                <p className="text-sm text-gray-600">{resource.currentBookings}/{resource.maxBookings}</p>
              </div>
              {resource.costPerHour > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Cost per Hour:</p>
                  <p className="text-sm text-green-600">${resource.costPerHour.toFixed(2)}</p>
                </div>
              )}
              {resource.maintenanceDate && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Next Maintenance:</p>
                  <p className="text-sm text-orange-600">{resource.maintenanceDate}</p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Book Resource
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                View Schedule
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Project
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm font-medium text-gray-700">Progress:</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-3 mr-2">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Manager:</p>
                <p className="text-sm text-gray-600">{project.manager}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Budget:</p>
                <p className="text-sm text-green-600">${(project.spent / 1000).toFixed(0)}k / ${(project.budget / 1000).toFixed(0)}k</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(project.spent / project.budget) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Timeline:</p>
                <p className="text-sm text-gray-600">{project.startDate} - {project.endDate}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Milestones:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-900">{milestone.name}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{milestone.date}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit Project
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Gantt Chart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Planning & Scheduling</h1>
          <p className="mt-2 text-gray-600">Manage schedules, resources, and project planning</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'schedules', name: 'Schedules', icon: '📅' },
              { id: 'resources', name: 'Resources', icon: '⚙️' },
              { id: 'projects', name: 'Projects', icon: '📋' }
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
        {activeTab === 'schedules' && renderSchedules()}
        {activeTab === 'resources' && renderResources()}
        {activeTab === 'projects' && renderProjects()}
      </div>
    </div>
  );
};

export default PlanningModule;

