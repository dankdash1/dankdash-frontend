import React, { useState, useEffect, useMemo } from 'react';

const EnhancedPlanningModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('calendar');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Form states
  const [scheduleForm, setScheduleForm] = useState({
    title: '',
    type: 'Staff Schedule',
    department: 'Operations',
    startDate: '',
    endDate: '',
    startTime: '09:00',
    endTime: '17:00',
    assignedTo: [],
    location: '',
    description: '',
    priority: 'Medium',
    recurring: 'None',
    capacity: 1,
    notes: ''
  });

  const [resourceForm, setResourceForm] = useState({
    name: '',
    type: 'Equipment',
    department: 'Operations',
    capacity: 1,
    location: '',
    description: '',
    status: 'Available',
    maintenanceSchedule: 'Monthly',
    cost: ''
  });

  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    priority: 'Medium',
    status: 'Planning',
    assignedTeam: [],
    milestones: []
  });

  // Mock data with mobile-responsive considerations
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
      notes: 'Peak delivery hours, full team required',
      createdBy: 'Operations Manager',
      createdDate: '2024-08-10'
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
      notes: 'After hours to avoid disrupting deliveries',
      createdBy: 'Maintenance Supervisor',
      createdDate: '2024-08-12'
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
      notes: 'Compliance requirement, must be completed by month end',
      createdBy: 'Inventory Manager',
      createdDate: '2024-08-08'
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
      notes: 'Mandatory attendance for all employees',
      createdBy: 'HR Manager',
      createdDate: '2024-08-05'
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
      priority: 'High',
      recurring: 'None',
      capacity: 5,
      utilized: 3,
      notes: 'Multi-channel campaign across social media and traditional advertising',
      createdBy: 'Marketing Director',
      createdDate: '2024-08-01'
    },
    {
      id: 'SCH-006',
      title: 'Quality Control Testing',
      type: 'Quality Assurance',
      department: 'Quality Control',
      startDate: '2024-08-16',
      endDate: '2024-08-16',
      startTime: '10:00',
      endTime: '15:00',
      assignedTo: ['Mike Chen', 'Quality Team'],
      status: 'Confirmed',
      location: 'QC Lab',
      description: 'Weekly quality control testing for all product batches',
      priority: 'High',
      recurring: 'Weekly',
      capacity: 3,
      utilized: 2,
      notes: 'Critical for compliance and product safety',
      createdBy: 'QC Manager',
      createdDate: '2024-08-09'
    },
    {
      id: 'SCH-007',
      title: 'Security System Upgrade',
      type: 'IT Project',
      department: 'Security',
      startDate: '2024-08-28',
      endDate: '2024-09-05',
      startTime: '20:00',
      endTime: '06:00',
      assignedTo: ['IT Team', 'Security Contractor'],
      status: 'Scheduled',
      location: 'All Facilities',
      description: 'Upgrade security cameras and access control systems',
      priority: 'High',
      recurring: 'None',
      capacity: 4,
      utilized: 4,
      notes: 'Night shift installation to minimize business disruption',
      createdBy: 'Security Manager',
      createdDate: '2024-08-03'
    },
    {
      id: 'SCH-008',
      title: 'Financial Review Meeting',
      type: 'Meeting',
      department: 'Finance',
      startDate: '2024-08-19',
      endDate: '2024-08-19',
      startTime: '11:00',
      endTime: '12:30',
      assignedTo: ['Finance Team', 'Management'],
      status: 'Confirmed',
      location: 'Boardroom',
      description: 'Monthly financial performance review and budget planning',
      priority: 'Medium',
      recurring: 'Monthly',
      capacity: 8,
      utilized: 6,
      notes: 'Review Q3 performance and Q4 projections',
      createdBy: 'CFO',
      createdDate: '2024-08-11'
    }
  ]);

  const [resources, setResources] = useState([
    {
      id: 'RES-001',
      name: 'Delivery Vehicle Fleet',
      type: 'Equipment',
      department: 'Delivery',
      capacity: 12,
      available: 10,
      location: 'Delivery Hub A',
      description: 'Fleet of delivery vehicles for product transportation',
      status: 'Available',
      maintenanceSchedule: 'Weekly',
      cost: '$2,500/month',
      utilization: 83,
      nextMaintenance: '2024-08-20'
    },
    {
      id: 'RES-002',
      name: 'Conference Room A',
      type: 'Facility',
      department: 'General',
      capacity: 25,
      available: 25,
      location: 'Main Office',
      description: 'Large conference room with AV equipment',
      status: 'Available',
      maintenanceSchedule: 'Monthly',
      cost: '$150/day',
      utilization: 65,
      nextMaintenance: '2024-09-01'
    },
    {
      id: 'RES-003',
      name: 'Quality Control Lab',
      type: 'Facility',
      department: 'Quality Control',
      capacity: 5,
      available: 3,
      location: 'Lab Building',
      description: 'Specialized laboratory for product testing',
      status: 'Partially Available',
      maintenanceSchedule: 'Weekly',
      cost: '$500/day',
      utilization: 90,
      nextMaintenance: '2024-08-17'
    },
    {
      id: 'RES-004',
      name: 'Warehouse Staff',
      type: 'Human Resource',
      department: 'Inventory',
      capacity: 15,
      available: 12,
      location: 'Warehouse A',
      description: 'Warehouse operations and inventory management staff',
      status: 'Available',
      maintenanceSchedule: 'N/A',
      cost: '$45,000/month',
      utilization: 80,
      nextMaintenance: 'N/A'
    },
    {
      id: 'RES-005',
      name: 'Security Equipment',
      type: 'Equipment',
      department: 'Security',
      capacity: 50,
      available: 48,
      location: 'All Facilities',
      description: 'Security cameras, alarms, and access control systems',
      status: 'Available',
      maintenanceSchedule: 'Monthly',
      cost: '$1,200/month',
      utilization: 96,
      nextMaintenance: '2024-08-25'
    },
    {
      id: 'RES-006',
      name: 'Marketing Team',
      type: 'Human Resource',
      department: 'Marketing',
      capacity: 8,
      available: 6,
      location: 'Marketing Office',
      description: 'Marketing specialists and creative team',
      status: 'Partially Available',
      maintenanceSchedule: 'N/A',
      cost: '$52,000/month',
      utilization: 75,
      nextMaintenance: 'N/A'
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 'PRJ-001',
      name: 'New Product Line Launch',
      description: 'Launch of premium cannabis edibles product line',
      startDate: '2024-09-01',
      endDate: '2024-11-30',
      budget: '$150,000',
      spent: '$45,000',
      priority: 'High',
      status: 'In Progress',
      progress: 35,
      assignedTeam: ['Marketing Team', 'Product Development', 'Quality Control'],
      milestones: [
        { name: 'Product Development', date: '2024-09-15', status: 'Completed' },
        { name: 'Testing & Approval', date: '2024-10-01', status: 'In Progress' },
        { name: 'Marketing Campaign', date: '2024-10-15', status: 'Planned' },
        { name: 'Product Launch', date: '2024-11-01', status: 'Planned' }
      ],
      manager: 'Product Manager',
      createdDate: '2024-08-01'
    },
    {
      id: 'PRJ-002',
      name: 'Facility Expansion',
      description: 'Expansion of cultivation and processing facilities',
      startDate: '2024-10-01',
      endDate: '2025-03-31',
      budget: '$500,000',
      spent: '$25,000',
      priority: 'High',
      status: 'Planning',
      progress: 10,
      assignedTeam: ['Operations', 'Construction', 'Compliance'],
      milestones: [
        { name: 'Permits & Approvals', date: '2024-11-01', status: 'In Progress' },
        { name: 'Construction Start', date: '2024-12-01', status: 'Planned' },
        { name: 'Equipment Installation', date: '2025-02-01', status: 'Planned' },
        { name: 'Facility Operational', date: '2025-03-31', status: 'Planned' }
      ],
      manager: 'Operations Director',
      createdDate: '2024-07-15'
    },
    {
      id: 'PRJ-003',
      name: 'ERP System Implementation',
      description: 'Implementation of comprehensive ERP system',
      startDate: '2024-08-15',
      endDate: '2024-12-31',
      budget: '$75,000',
      spent: '$15,000',
      priority: 'Medium',
      status: 'In Progress',
      progress: 25,
      assignedTeam: ['IT Team', 'All Departments'],
      milestones: [
        { name: 'System Selection', date: '2024-08-31', status: 'Completed' },
        { name: 'Data Migration', date: '2024-10-15', status: 'In Progress' },
        { name: 'Staff Training', date: '2024-11-30', status: 'Planned' },
        { name: 'Go Live', date: '2024-12-31', status: 'Planned' }
      ],
      manager: 'IT Director',
      createdDate: '2024-07-01'
    }
  ]);

  const [departments] = useState([
    'Operations',
    'Delivery',
    'Inventory',
    'HR',
    'Marketing',
    'Quality Control',
    'Security',
    'Finance',
    'IT',
    'Compliance'
  ]);

  const [scheduleTypes] = useState([
    'Staff Schedule',
    'Maintenance',
    'Operations',
    'Training',
    'Project',
    'Quality Assurance',
    'IT Project',
    'Meeting'
  ]);

  const [staff] = useState([
    'John Doe',
    'Sarah Johnson',
    'Mike Chen',
    'Lisa Rodriguez',
    'Emma Davis',
    'Alex Kim',
    'David Wilson',
    'Jennifer Lee',
    'Operations Manager',
    'Marketing Team',
    'Quality Team',
    'IT Team',
    'All Staff'
  ]);

  // Filter functions
  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const matchesSearch = schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           schedule.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || schedule.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || schedule.status.toLowerCase() === selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [schedules, searchTerm, selectedDepartment, selectedStatus]);

  // Schedule CRUD Operations
  const handleCreateSchedule = () => {
    if (!scheduleForm.title || !scheduleForm.startDate || !scheduleForm.endDate) {
      alert('Please fill in required fields (Title, Start Date, End Date)');
      return;
    }

    const newSchedule = {
      id: `SCH-${String(schedules.length + 1).padStart(3, '0')}`,
      title: scheduleForm.title,
      type: scheduleForm.type,
      department: scheduleForm.department,
      startDate: scheduleForm.startDate,
      endDate: scheduleForm.endDate,
      startTime: scheduleForm.startTime,
      endTime: scheduleForm.endTime,
      assignedTo: scheduleForm.assignedTo,
      status: 'Scheduled',
      location: scheduleForm.location,
      description: scheduleForm.description,
      priority: scheduleForm.priority,
      recurring: scheduleForm.recurring,
      capacity: parseInt(scheduleForm.capacity),
      utilized: 0,
      notes: scheduleForm.notes,
      createdBy: 'Current User',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setSchedules([...schedules, newSchedule]);
    setScheduleForm({
      title: '',
      type: 'Staff Schedule',
      department: 'Operations',
      startDate: '',
      endDate: '',
      startTime: '09:00',
      endTime: '17:00',
      assignedTo: [],
      location: '',
      description: '',
      priority: 'Medium',
      recurring: 'None',
      capacity: 1,
      notes: ''
    });
    setShowScheduleModal(false);
    alert('Schedule created successfully!');
  };

  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setScheduleForm({
      title: schedule.title,
      type: schedule.type,
      department: schedule.department,
      startDate: schedule.startDate,
      endDate: schedule.endDate,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      assignedTo: schedule.assignedTo,
      location: schedule.location,
      description: schedule.description,
      priority: schedule.priority,
      recurring: schedule.recurring,
      capacity: schedule.capacity,
      notes: schedule.notes
    });
    setShowScheduleModal(true);
  };

  const handleUpdateSchedule = () => {
    if (!scheduleForm.title || !scheduleForm.startDate || !scheduleForm.endDate) {
      alert('Please fill in required fields (Title, Start Date, End Date)');
      return;
    }

    const updatedSchedules = schedules.map(schedule =>
      schedule.id === editingSchedule.id
        ? { 
            ...schedule, 
            title: scheduleForm.title,
            type: scheduleForm.type,
            department: scheduleForm.department,
            startDate: scheduleForm.startDate,
            endDate: scheduleForm.endDate,
            startTime: scheduleForm.startTime,
            endTime: scheduleForm.endTime,
            assignedTo: scheduleForm.assignedTo,
            location: scheduleForm.location,
            description: scheduleForm.description,
            priority: scheduleForm.priority,
            recurring: scheduleForm.recurring,
            capacity: parseInt(scheduleForm.capacity),
            notes: scheduleForm.notes
          }
        : schedule
    );

    setSchedules(updatedSchedules);
    setEditingSchedule(null);
    setScheduleForm({
      title: '',
      type: 'Staff Schedule',
      department: 'Operations',
      startDate: '',
      endDate: '',
      startTime: '09:00',
      endTime: '17:00',
      assignedTo: [],
      location: '',
      description: '',
      priority: 'Medium',
      recurring: 'None',
      capacity: 1,
      notes: ''
    });
    setShowScheduleModal(false);
    alert('Schedule updated successfully!');
  };

  const handleDeleteSchedule = (scheduleId) => {
    if (window.confirm('Are you sure you want to delete this schedule? This action cannot be undone.')) {
      setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
      alert('Schedule deleted successfully!');
    }
  };

  const handleConfirmSchedule = (scheduleId) => {
    if (window.confirm('Are you sure you want to confirm this schedule?')) {
      const updatedSchedules = schedules.map(schedule =>
        schedule.id === scheduleId
          ? { ...schedule, status: 'Confirmed' }
          : schedule
      );
      setSchedules(updatedSchedules);
      alert('Schedule confirmed successfully!');
    }
  };

  const handleCancelSchedule = (scheduleId) => {
    if (window.confirm('Are you sure you want to cancel this schedule?')) {
      const updatedSchedules = schedules.map(schedule =>
        schedule.id === scheduleId
          ? { ...schedule, status: 'Cancelled' }
          : schedule
      );
      setSchedules(updatedSchedules);
      alert('Schedule cancelled successfully!');
    }
  };

  // Resource Operations
  const handleCreateResource = () => {
    if (!resourceForm.name || !resourceForm.capacity) {
      alert('Please fill in required fields (Name and Capacity)');
      return;
    }

    const newResource = {
      id: `RES-${String(resources.length + 1).padStart(3, '0')}`,
      name: resourceForm.name,
      type: resourceForm.type,
      department: resourceForm.department,
      capacity: parseInt(resourceForm.capacity),
      available: parseInt(resourceForm.capacity),
      location: resourceForm.location,
      description: resourceForm.description,
      status: resourceForm.status,
      maintenanceSchedule: resourceForm.maintenanceSchedule,
      cost: resourceForm.cost,
      utilization: 0,
      nextMaintenance: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setResources([...resources, newResource]);
    setResourceForm({
      name: '',
      type: 'Equipment',
      department: 'Operations',
      capacity: 1,
      location: '',
      description: '',
      status: 'Available',
      maintenanceSchedule: 'Monthly',
      cost: ''
    });
    setShowResourceModal(false);
    alert('Resource created successfully!');
  };

  // Project Operations
  const handleCreateProject = () => {
    if (!projectForm.name || !projectForm.startDate || !projectForm.endDate) {
      alert('Please fill in required fields (Name, Start Date, End Date)');
      return;
    }

    const newProject = {
      id: `PRJ-${String(projects.length + 1).padStart(3, '0')}`,
      name: projectForm.name,
      description: projectForm.description,
      startDate: projectForm.startDate,
      endDate: projectForm.endDate,
      budget: projectForm.budget,
      spent: '$0',
      priority: projectForm.priority,
      status: projectForm.status,
      progress: 0,
      assignedTeam: projectForm.assignedTeam,
      milestones: projectForm.milestones,
      manager: 'Current User',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setProjects([...projects, newProject]);
    setProjectForm({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      budget: '',
      priority: 'Medium',
      status: 'Planning',
      assignedTeam: [],
      milestones: []
    });
    setShowProjectModal(false);
    alert('Project created successfully!');
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
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

  const getResourceStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Partially Available': return 'bg-yellow-100 text-yellow-800';
      case 'Unavailable': return 'bg-red-100 text-red-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatCurrency = (value) => {
    if (typeof value === 'string' && value.includes('$')) return value;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  // Dashboard calculations
  const totalSchedules = schedules.length;
  const confirmedSchedules = schedules.filter(s => s.status === 'Confirmed').length;
  const totalResources = resources.length;
  const availableResources = resources.filter(r => r.status === 'Available').length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const averageUtilization = resources.reduce((sum, r) => sum + r.utilization, 0) / resources.length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Schedules</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalSchedules}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{confirmedSchedules} confirmed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Resources</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalResources}</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">{availableResources} available</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Active Projects</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{activeProjects}</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">In progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Avg Utilization</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{averageUtilization.toFixed(0)}%</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">Resource usage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Upcoming Schedules</h3>
          <div className="space-y-3">
            {schedules.slice(0, 5).map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{schedule.title}</h4>
                    <p className="text-xs text-gray-600 truncate">{schedule.department} • {schedule.startDate}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                        {schedule.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(schedule.priority)}`}>
                        {schedule.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className="text-sm font-medium text-gray-900">{formatTime(schedule.startTime)}</p>
                  <p className="text-xs text-gray-500">{schedule.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Resource Utilization</h3>
          <div className="space-y-4">
            {resources.slice(0, 5).map((resource) => (
              <div key={resource.id} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate">{resource.name}</span>
                  <span className="text-gray-900 font-medium">{resource.utilization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      resource.utilization >= 90 ? 'bg-red-600' :
                      resource.utilization >= 70 ? 'bg-yellow-600' : 'bg-green-600'
                    }`}
                    style={{width: `${Math.min(resource.utilization, 100)}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{resource.available}/{resource.capacity} available</span>
                  <span className={`inline-flex px-2 py-1 rounded-full ${getResourceStatusColor(resource.status)}`}>
                    {resource.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Create Schedule
            </button>
            <button
              onClick={() => setShowResourceModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Add Resource
            </button>
            <button
              onClick={() => setShowProjectModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              New Project
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Planning Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Plan resources in advance</p>
            <p>• Monitor utilization rates</p>
            <p>• Schedule regular maintenance</p>
            <p>• Track project milestones</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Schedule Conflicts:</span>
              <span className="text-green-600 font-medium">None</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Resource Availability:</span>
              <span className="text-green-600 font-medium">Good</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Project Health:</span>
              <span className="text-yellow-600 font-medium">Monitor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedules = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-2xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search schedules..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="in progress">In Progress</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-2 text-sm ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              List
            </button>
          </div>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Create
          </button>
        </div>
      </div>

      {/* Schedule Display */}
      {viewMode === 'calendar' ? (
        <div className="bg-white rounded-lg shadow-sm border p-4 lg:p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Calendar View</h3>
            <p className="text-gray-600">Interactive calendar view coming soon...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {filteredSchedules.map((schedule) => (
            <div key={schedule.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{schedule.title}</h3>
                  <p className="text-xs text-gray-500">{schedule.type} • {schedule.department}</p>
                </div>
                <div className="flex flex-col space-y-1 ml-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(schedule.status)}`}>
                    {schedule.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(schedule.priority)}`}>
                    {schedule.priority}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{schedule.description}</p>

              <div className="space-y-2 text-xs text-gray-500 mb-3">
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="text-gray-900 font-medium">{schedule.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="text-gray-900 font-medium">{formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="text-gray-900 font-medium truncate">{schedule.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Capacity:</span>
                  <span className="text-gray-900 font-medium">{schedule.utilized}/{schedule.capacity}</span>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Assigned To:</p>
                <div className="flex flex-wrap gap-1">
                  {schedule.assignedTo.slice(0, 2).map((person, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {person}
                    </span>
                  ))}
                  {schedule.assignedTo.length > 2 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      +{schedule.assignedTo.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                <button 
                  onClick={() => handleEditSchedule(schedule)}
                  className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
                >
                  Edit
                </button>
                {schedule.status === 'Scheduled' && (
                  <button 
                    onClick={() => handleConfirmSchedule(schedule.id)}
                    className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                  >
                    Confirm
                  </button>
                )}
                {schedule.status !== 'Cancelled' && (
                  <button 
                    onClick={() => handleCancelSchedule(schedule.id)}
                    className="text-xs px-2 py-1 text-orange-600 hover:text-orange-900 bg-orange-50 rounded"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteSchedule(schedule.id)}
                  className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
                >
                  Delete
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Resource Management</h2>
        <button 
          onClick={() => setShowResourceModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{resource.name}</h3>
                <p className="text-xs text-gray-500">{resource.type} • {resource.department}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getResourceStatusColor(resource.status)}`}>
                {resource.status}
              </span>
            </div>

            <p className="text-xs text-gray-600 mb-3 line-clamp-2">{resource.description}</p>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Capacity:</span>
                <span className="text-gray-900 font-medium">{resource.available}/{resource.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-gray-900 font-medium truncate">{resource.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Cost:</span>
                <span className="text-gray-900 font-medium">{resource.cost}</span>
              </div>
              <div className="flex justify-between">
                <span>Utilization:</span>
                <span className="text-gray-900 font-medium">{resource.utilization}%</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Utilization</span>
                <span className="text-gray-900 font-medium">{resource.utilization}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    resource.utilization >= 90 ? 'bg-red-600' :
                    resource.utilization >= 70 ? 'bg-yellow-600' : 'bg-green-600'
                  }`}
                  style={{width: `${Math.min(resource.utilization, 100)}%`}}
                ></div>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              <p>Next Maintenance: {resource.nextMaintenance}</p>
              <p>Schedule: {resource.maintenanceSchedule}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Project Planning</h2>
        <button 
          onClick={() => setShowProjectModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border p-4 lg:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-base truncate">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.manager} • {project.createdDate}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{project.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <span className="text-gray-500">Start Date:</span>
                <p className="text-gray-900 font-medium">{project.startDate}</p>
              </div>
              <div>
                <span className="text-gray-500">End Date:</span>
                <p className="text-gray-900 font-medium">{project.endDate}</p>
              </div>
              <div>
                <span className="text-gray-500">Budget:</span>
                <p className="text-gray-900 font-medium">{project.budget}</p>
              </div>
              <div>
                <span className="text-gray-500">Spent:</span>
                <p className="text-gray-900 font-medium">{project.spent}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-900 font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{width: `${Math.min(project.progress, 100)}%`}}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Assigned Team:</p>
              <div className="flex flex-wrap gap-1">
                {project.assignedTeam.map((team, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {team}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Milestones:</p>
              <div className="space-y-1">
                {project.milestones.slice(0, 3).map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 truncate">{milestone.name}</span>
                    <div className="flex items-center space-x-2 ml-2">
                      <span className="text-gray-500">{milestone.date}</span>
                      <span className={`inline-flex px-2 py-1 rounded-full ${getStatusColor(milestone.status)}`}>
                        {milestone.status}
                      </span>
                    </div>
                  </div>
                ))}
                {project.milestones.length > 3 && (
                  <p className="text-xs text-gray-500">+{project.milestones.length - 3} more milestones</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <button className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded">
                View Details
              </button>
              <button className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded">
                Edit Project
              </button>
              <button className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded">
                Add Milestone
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Schedule Modal - Mobile Responsive
  const ScheduleModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingSchedule ? 'Edit Schedule' : 'Create New Schedule'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                value={scheduleForm.title}
                onChange={(e) => setScheduleForm({...scheduleForm, title: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={scheduleForm.type}
                  onChange={(e) => setScheduleForm({...scheduleForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {scheduleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  value={scheduleForm.department}
                  onChange={(e) => setScheduleForm({...scheduleForm, department: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                <input
                  type="date"
                  value={scheduleForm.startDate}
                  onChange={(e) => setScheduleForm({...scheduleForm, startDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date *</label>
                <input
                  type="date"
                  value={scheduleForm.endDate}
                  onChange={(e) => setScheduleForm({...scheduleForm, endDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  value={scheduleForm.startTime}
                  onChange={(e) => setScheduleForm({...scheduleForm, startTime: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  value={scheduleForm.endTime}
                  onChange={(e) => setScheduleForm({...scheduleForm, endTime: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={scheduleForm.location}
                onChange={(e) => setScheduleForm({...scheduleForm, location: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={scheduleForm.description}
                onChange={(e) => setScheduleForm({...scheduleForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={scheduleForm.priority}
                  onChange={(e) => setScheduleForm({...scheduleForm, priority: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Recurring</label>
                <select
                  value={scheduleForm.recurring}
                  onChange={(e) => setScheduleForm({...scheduleForm, recurring: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="None">None</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  value={scheduleForm.capacity}
                  onChange={(e) => setScheduleForm({...scheduleForm, capacity: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
              <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
                {staff.map(person => (
                  <label key={person} className="flex items-center space-x-2 p-1 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      checked={scheduleForm.assignedTo.includes(person)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setScheduleForm({...scheduleForm, assignedTo: [...scheduleForm.assignedTo, person]});
                        } else {
                          setScheduleForm({...scheduleForm, assignedTo: scheduleForm.assignedTo.filter(p => p !== person)});
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="text-sm text-gray-900">{person}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={scheduleForm.notes}
                onChange={(e) => setScheduleForm({...scheduleForm, notes: e.target.value})}
                rows={2}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowScheduleModal(false);
                setEditingSchedule(null);
                setScheduleForm({
                  title: '',
                  type: 'Staff Schedule',
                  department: 'Operations',
                  startDate: '',
                  endDate: '',
                  startTime: '09:00',
                  endTime: '17:00',
                  assignedTo: [],
                  location: '',
                  description: '',
                  priority: 'Medium',
                  recurring: 'None',
                  capacity: 1,
                  notes: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingSchedule ? handleUpdateSchedule : handleCreateSchedule}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingSchedule ? 'Update' : 'Create'} Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Resource Modal - Mobile Responsive
  const ResourceModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-20 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Resource</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Resource Name *</label>
              <input
                type="text"
                value={resourceForm.name}
                onChange={(e) => setResourceForm({...resourceForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={resourceForm.type}
                  onChange={(e) => setResourceForm({...resourceForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Equipment">Equipment</option>
                  <option value="Facility">Facility</option>
                  <option value="Human Resource">Human Resource</option>
                  <option value="Vehicle">Vehicle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  value={resourceForm.department}
                  onChange={(e) => setResourceForm({...resourceForm, department: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Capacity *</label>
              <input
                type="number"
                value={resourceForm.capacity}
                onChange={(e) => setResourceForm({...resourceForm, capacity: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={resourceForm.location}
                onChange={(e) => setResourceForm({...resourceForm, location: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={resourceForm.description}
                onChange={(e) => setResourceForm({...resourceForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="text"
                value={resourceForm.cost}
                onChange={(e) => setResourceForm({...resourceForm, cost: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="$1,000/month"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowResourceModal(false);
                setResourceForm({
                  name: '',
                  type: 'Equipment',
                  department: 'Operations',
                  capacity: 1,
                  location: '',
                  description: '',
                  status: 'Available',
                  maintenanceSchedule: 'Monthly',
                  cost: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateResource}
              className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              Add Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Project Modal - Mobile Responsive
  const ProjectModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-10 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Project</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name *</label>
              <input
                type="text"
                value={projectForm.name}
                onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                <input
                  type="date"
                  value={projectForm.startDate}
                  onChange={(e) => setProjectForm({...projectForm, startDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date *</label>
                <input
                  type="date"
                  value={projectForm.endDate}
                  onChange={(e) => setProjectForm({...projectForm, endDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget</label>
                <input
                  type="text"
                  value={projectForm.budget}
                  onChange={(e) => setProjectForm({...projectForm, budget: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="$50,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={projectForm.priority}
                  onChange={(e) => setProjectForm({...projectForm, priority: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowProjectModal(false);
                setProjectForm({
                  name: '',
                  description: '',
                  startDate: '',
                  endDate: '',
                  budget: '',
                  priority: 'Medium',
                  status: 'Planning',
                  assignedTeam: [],
                  milestones: []
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
            >
              Create Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Resource Planning & Scheduling</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Manage schedules, resources, and project planning</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'schedules', name: 'Schedules', icon: '📅' },
            { id: 'resources', name: 'Resources', icon: '🏢' },
            { id: 'projects', name: 'Projects', icon: '📋' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="overflow-hidden">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'schedules' && renderSchedules()}
        {activeTab === 'resources' && renderResources()}
        {activeTab === 'projects' && renderProjects()}
      </div>

      {/* Modals */}
      {showScheduleModal && <ScheduleModal />}
      {showResourceModal && <ResourceModal />}
      {showProjectModal && <ProjectModal />}
    </div>
  );
};

export default EnhancedPlanningModule;

