import React, { useState, useEffect } from 'react';

const MaintenanceModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAssetType, setSelectedAssetType] = useState('all');

  // Mock maintenance data
  const [workOrders, setWorkOrders] = useState([
    {
      id: 'WO-001',
      title: 'Delivery Vehicle #1 - Oil Change',
      description: 'Routine oil change and fluid check for delivery vehicle',
      assetId: 'VEH-001',
      assetName: 'Delivery Vehicle #1',
      assetType: 'Vehicle',
      priority: 'Medium',
      status: 'In Progress',
      type: 'Preventive',
      assignedTo: 'Mike Chen',
      requestedBy: 'Fleet Manager',
      createdDate: '2024-08-10',
      scheduledDate: '2024-08-15',
      dueDate: '2024-08-16',
      completedDate: null,
      estimatedHours: 2.0,
      actualHours: 1.5,
      estimatedCost: 150.00,
      actualCost: 125.00,
      location: 'Maintenance Bay A',
      notes: 'Vehicle has 15,000 miles, due for routine maintenance',
      parts: ['Engine Oil', 'Oil Filter', 'Air Filter'],
      checklist: [
        { id: 1, task: 'Drain old oil', completed: true },
        { id: 2, task: 'Replace oil filter', completed: true },
        { id: 3, task: 'Add new oil', completed: false },
        { id: 4, task: 'Check fluid levels', completed: false }
      ]
    },
    {
      id: 'WO-002',
      title: 'Packaging Equipment #2 - Belt Replacement',
      description: 'Replace worn conveyor belt on packaging equipment',
      assetId: 'EQ-002',
      assetName: 'Packaging Equipment #2',
      assetType: 'Equipment',
      priority: 'High',
      status: 'Scheduled',
      type: 'Corrective',
      assignedTo: 'Alex Kim',
      requestedBy: 'Production Manager',
      createdDate: '2024-08-12',
      scheduledDate: '2024-08-18',
      dueDate: '2024-08-20',
      completedDate: null,
      estimatedHours: 4.0,
      actualHours: null,
      estimatedCost: 350.00,
      actualCost: null,
      location: 'Production Floor',
      notes: 'Belt showing signs of wear, replacement needed before failure',
      parts: ['Conveyor Belt', 'Belt Tensioner', 'Mounting Hardware'],
      checklist: [
        { id: 1, task: 'Order replacement parts', completed: true },
        { id: 2, task: 'Schedule downtime', completed: true },
        { id: 3, task: 'Remove old belt', completed: false },
        { id: 4, task: 'Install new belt', completed: false },
        { id: 5, task: 'Test equipment', completed: false }
      ]
    },
    {
      id: 'WO-003',
      title: 'HVAC System - Filter Replacement',
      description: 'Monthly HVAC filter replacement for grow room climate control',
      assetId: 'HVAC-001',
      assetName: 'Grow Room HVAC System',
      assetType: 'HVAC',
      priority: 'Medium',
      status: 'Completed',
      type: 'Preventive',
      assignedTo: 'John Smith',
      requestedBy: 'Facility Manager',
      createdDate: '2024-08-01',
      scheduledDate: '2024-08-05',
      dueDate: '2024-08-07',
      completedDate: '2024-08-06',
      estimatedHours: 1.0,
      actualHours: 0.8,
      estimatedCost: 75.00,
      actualCost: 65.00,
      location: 'Grow Room A',
      notes: 'Monthly filter replacement completed successfully',
      parts: ['HEPA Filter', 'Carbon Filter'],
      checklist: [
        { id: 1, task: 'Turn off HVAC system', completed: true },
        { id: 2, task: 'Remove old filters', completed: true },
        { id: 3, task: 'Install new filters', completed: true },
        { id: 4, task: 'Test system operation', completed: true }
      ]
    },
    {
      id: 'WO-004',
      title: 'Security System - Camera Calibration',
      description: 'Quarterly calibration and cleaning of security cameras',
      assetId: 'SEC-001',
      assetName: 'Security Camera System',
      assetType: 'Security',
      priority: 'Low',
      status: 'Pending',
      type: 'Preventive',
      assignedTo: 'Lisa Rodriguez',
      requestedBy: 'Security Manager',
      createdDate: '2024-08-14',
      scheduledDate: '2024-08-25',
      dueDate: '2024-08-30',
      completedDate: null,
      estimatedHours: 3.0,
      actualHours: null,
      estimatedCost: 200.00,
      actualCost: null,
      location: 'Multiple Locations',
      notes: 'Quarterly maintenance for all 24 security cameras',
      parts: ['Cleaning Supplies', 'Calibration Tools'],
      checklist: [
        { id: 1, task: 'Clean camera lenses', completed: false },
        { id: 2, task: 'Check camera positioning', completed: false },
        { id: 3, task: 'Test recording quality', completed: false },
        { id: 4, task: 'Update firmware', completed: false }
      ]
    }
  ]);

  const [assets, setAssets] = useState([
    {
      id: 'VEH-001',
      name: 'Delivery Vehicle #1',
      type: 'Vehicle',
      category: 'Transportation',
      manufacturer: 'Ford',
      model: 'Transit Connect',
      serialNumber: 'FC2024001',
      purchaseDate: '2024-01-15',
      warrantyExpiry: '2027-01-15',
      location: 'Delivery Hub A',
      status: 'Operational',
      condition: 'Good',
      lastMaintenance: '2024-07-15',
      nextMaintenance: '2024-08-15',
      maintenanceCost: 2450.00,
      downtime: 12,
      utilizationRate: 85.5,
      criticality: 'High'
    },
    {
      id: 'EQ-002',
      name: 'Packaging Equipment #2',
      type: 'Equipment',
      category: 'Production',
      manufacturer: 'PackTech',
      model: 'PT-500',
      serialNumber: 'PT500-2024-002',
      purchaseDate: '2024-03-01',
      warrantyExpiry: '2026-03-01',
      location: 'Production Floor',
      status: 'Needs Repair',
      condition: 'Fair',
      lastMaintenance: '2024-06-01',
      nextMaintenance: '2024-08-18',
      maintenanceCost: 1850.00,
      downtime: 8,
      utilizationRate: 92.3,
      criticality: 'Critical'
    },
    {
      id: 'HVAC-001',
      name: 'Grow Room HVAC System',
      type: 'HVAC',
      category: 'Climate Control',
      manufacturer: 'ClimateMax',
      model: 'CM-2000',
      serialNumber: 'CM2000-001',
      purchaseDate: '2023-12-01',
      warrantyExpiry: '2025-12-01',
      location: 'Grow Room A',
      status: 'Operational',
      condition: 'Excellent',
      lastMaintenance: '2024-08-06',
      nextMaintenance: '2024-09-06',
      maintenanceCost: 950.00,
      downtime: 4,
      utilizationRate: 98.7,
      criticality: 'Critical'
    },
    {
      id: 'SEC-001',
      name: 'Security Camera System',
      type: 'Security',
      category: 'Security',
      manufacturer: 'SecureVision',
      model: 'SV-Pro24',
      serialNumber: 'SV24-001',
      purchaseDate: '2024-02-01',
      warrantyExpiry: '2026-02-01',
      location: 'Multiple Locations',
      status: 'Operational',
      condition: 'Good',
      lastMaintenance: '2024-05-15',
      nextMaintenance: '2024-08-25',
      maintenanceCost: 650.00,
      downtime: 2,
      utilizationRate: 99.1,
      criticality: 'Medium'
    }
  ]);

  const [maintenanceSchedule, setMaintenanceSchedule] = useState([
    {
      id: 'SCHED-001',
      assetId: 'VEH-001',
      assetName: 'Delivery Vehicle #1',
      taskName: 'Oil Change',
      frequency: 'Every 3 months',
      lastCompleted: '2024-05-15',
      nextDue: '2024-08-15',
      estimatedDuration: 2.0,
      estimatedCost: 150.00,
      priority: 'Medium',
      assignedTo: 'Mike Chen',
      isOverdue: false
    },
    {
      id: 'SCHED-002',
      assetId: 'EQ-002',
      assetName: 'Packaging Equipment #2',
      taskName: 'Belt Inspection',
      frequency: 'Monthly',
      lastCompleted: '2024-07-01',
      nextDue: '2024-08-01',
      estimatedDuration: 1.0,
      estimatedCost: 50.00,
      priority: 'High',
      assignedTo: 'Alex Kim',
      isOverdue: true
    },
    {
      id: 'SCHED-003',
      assetId: 'HVAC-001',
      assetName: 'Grow Room HVAC System',
      taskName: 'Filter Replacement',
      frequency: 'Monthly',
      lastCompleted: '2024-08-06',
      nextDue: '2024-09-06',
      estimatedDuration: 1.0,
      estimatedCost: 75.00,
      priority: 'Medium',
      assignedTo: 'John Smith',
      isOverdue: false
    },
    {
      id: 'SCHED-004',
      assetId: 'SEC-001',
      assetName: 'Security Camera System',
      taskName: 'Camera Calibration',
      frequency: 'Quarterly',
      lastCompleted: '2024-05-15',
      nextDue: '2024-08-25',
      estimatedDuration: 3.0,
      estimatedCost: 200.00,
      priority: 'Low',
      assignedTo: 'Lisa Rodriguez',
      isOverdue: false
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalWorkOrders: 156,
    openWorkOrders: 23,
    overdueWorkOrders: 5,
    completedThisMonth: 45,
    avgCompletionTime: 2.8,
    maintenanceCosts: 15750.00,
    assetUptime: 94.2,
    preventiveRatio: 78.5
  });

  // Filter functions
  const filteredWorkOrders = workOrders.filter(wo => {
    const matchesSearch = wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.assetName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || wo.priority.toLowerCase() === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || wo.status.toLowerCase().replace(' ', '-') === selectedStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedAssetType === 'all' || asset.type.toLowerCase() === selectedAssetType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-gray-100 text-gray-800';
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Operational': return 'bg-green-100 text-green-800';
      case 'Needs Repair': return 'bg-red-100 text-red-800';
      case 'Under Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Service': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Vehicle': return '🚗';
      case 'Equipment': return '⚙️';
      case 'HVAC': return '🌡️';
      case 'Security': return '🔒';
      case 'Preventive': return '🔧';
      case 'Corrective': return '🛠️';
      case 'Emergency': return '🚨';
      default: return '📋';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Work Orders</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalWorkOrders}</p>
              <p className="text-sm text-blue-600">{analytics.openWorkOrders} open</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Asset Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.assetUptime}%</p>
              <p className="text-sm text-green-600">Above target</p>
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
              <p className="text-sm font-medium text-gray-600">Maintenance Costs</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.maintenanceCosts / 1000).toFixed(1)}k</p>
              <p className="text-sm text-gray-600">This month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue Items</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.overdueWorkOrders}</p>
              <p className="text-sm text-yellow-600">Require attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance Performance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Maintenance Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.assetUptime}%</div>
              <div className="text-sm text-gray-600">Asset Uptime</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.assetUptime}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.preventiveRatio}%</div>
              <div className="text-sm text-gray-600">Preventive Maintenance</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.preventiveRatio}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.avgCompletionTime}</div>
              <div className="text-sm text-gray-600">Avg Completion Time (days)</div>
              <div className="text-xs text-gray-500 mt-1">Target: 3.0 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Work Orders */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Urgent Work Orders</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {workOrders.filter(wo => wo.priority === 'High' || wo.priority === 'Critical').map((wo) => (
              <div key={wo.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getTypeIcon(wo.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{wo.title}</h4>
                    <p className="text-sm text-gray-600">{wo.assetName} • Due: {wo.dueDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(wo.priority)}`}>
                      {wo.priority}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(wo.status)}`}>
                      {wo.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Asset Status Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {assets.map((asset) => (
              <div key={asset.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{asset.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                    {asset.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{asset.type} • {asset.location}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Condition:</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(asset.condition)}`}>
                      {asset.condition}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Uptime:</span>
                    <span className="text-blue-600">{asset.utilizationRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next Maintenance:</span>
                    <span className="text-gray-900">{asset.nextMaintenance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Maintenance */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Maintenance</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {maintenanceSchedule.slice(0, 5).map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">🔧</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{schedule.taskName}</h4>
                    <p className="text-sm text-gray-600">{schedule.assetName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">Due: {schedule.nextDue}</p>
                  <p className="text-sm text-gray-500">{schedule.assignedTo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkOrders = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search work orders..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Work Order
            </button>
          </div>
        </div>
      </div>

      {/* Work Orders List */}
      <div className="space-y-4">
        {filteredWorkOrders.map((wo) => (
          <div key={wo.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getTypeIcon(wo.type)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{wo.title}</h3>
                  <p className="text-sm text-gray-600">{wo.assetName} • {wo.type} Maintenance</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(wo.priority)}`}>
                  {wo.priority}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(wo.status)}`}>
                  {wo.status}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{wo.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Assigned To:</p>
                <p className="text-sm text-gray-600">{wo.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Due Date:</p>
                <p className="text-sm text-gray-600">{wo.dueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Estimated Cost:</p>
                <p className="text-sm text-green-600">${wo.estimatedCost.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Location:</p>
                <p className="text-sm text-gray-600">{wo.location}</p>
              </div>
            </div>
            
            {wo.checklist && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Progress:</p>
                <div className="space-y-1">
                  {wo.checklist.map((item) => (
                    <div key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        readOnly
                        className="mr-2 h-4 w-4 text-blue-600 rounded"
                      />
                      <span className={`text-sm ${item.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(wo.checklist.filter(item => item.completed).length / wo.checklist.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {wo.checklist.filter(item => item.completed).length} of {wo.checklist.length} tasks completed
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit
              </button>
              {wo.status === 'Scheduled' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Start Work
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssets = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search assets..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedAssetType}
              onChange={(e) => setSelectedAssetType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="vehicle">Vehicle</option>
              <option value="equipment">Equipment</option>
              <option value="hvac">HVAC</option>
              <option value="security">Security</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Asset
            </button>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-2xl">{getTypeIcon(asset.type)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{asset.name}</h3>
                  <p className="text-sm text-gray-600">{asset.manufacturer} {asset.model}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(asset.status)}`}>
                {asset.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Type:</span>
                <span className="text-gray-900">{asset.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="text-gray-900">{asset.location}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Condition:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getConditionColor(asset.condition)}`}>
                  {asset.condition}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Utilization:</span>
                <span className="text-blue-600">{asset.utilizationRate}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Next Maintenance:</span>
                <span className="text-gray-900">{asset.nextMaintenance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Maintenance Cost:</span>
                <span className="text-green-600">${asset.maintenanceCost.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Schedule Maintenance
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search maintenance schedule..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Schedule Maintenance
            </button>
          </div>
        </div>
      </div>

      {/* Maintenance Schedule Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Maintenance Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Due</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {maintenanceSchedule.map((schedule) => (
                <tr key={schedule.id} className={`hover:bg-gray-50 ${schedule.isOverdue ? 'bg-red-50' : ''}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{schedule.assetName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{schedule.taskName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.frequency}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.lastCompleted}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`text-sm ${schedule.isOverdue ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                      {schedule.nextDue}
                      {schedule.isOverdue && <span className="ml-1 text-xs">(Overdue)</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{schedule.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(schedule.priority)}`}>
                      {schedule.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Schedule</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Complete</button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Maintenance Management</h1>
          <p className="mt-2 text-gray-600">Manage work orders, assets, and maintenance schedules</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'work-orders', name: 'Work Orders', icon: '🔧' },
              { id: 'assets', name: 'Assets', icon: '⚙️' },
              { id: 'schedule', name: 'Schedule', icon: '📅' }
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
        {activeTab === 'work-orders' && renderWorkOrders()}
        {activeTab === 'assets' && renderAssets()}
        {activeTab === 'schedule' && renderSchedule()}
      </div>
    </div>
  );
};

export default MaintenanceModule;

