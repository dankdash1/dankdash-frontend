import React, { useState, useEffect, useMemo } from 'react';

const EnhancedMaintenanceModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAssetType, setSelectedAssetType] = useState('all');
  const [showWorkOrderModal, setShowWorkOrderModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingWorkOrder, setEditingWorkOrder] = useState(null);
  const [editingAsset, setEditingAsset] = useState(null);

  // Form states
  const [workOrderForm, setWorkOrderForm] = useState({
    title: '',
    description: '',
    assetId: '',
    priority: 'Medium',
    type: 'Preventive',
    assignedTo: '',
    scheduledDate: '',
    dueDate: '',
    estimatedHours: '',
    estimatedCost: '',
    location: '',
    notes: '',
    parts: []
  });

  const [assetForm, setAssetForm] = useState({
    name: '',
    type: 'Equipment',
    model: '',
    serialNumber: '',
    manufacturer: '',
    location: '',
    purchaseDate: '',
    warrantyExpiry: '',
    status: 'Active',
    notes: ''
  });

  const [scheduleForm, setScheduleForm] = useState({
    assetId: '',
    maintenanceType: 'Preventive',
    frequency: 'Monthly',
    nextDue: '',
    assignedTo: '',
    estimatedHours: '',
    notes: ''
  });

  // Mock data with mobile-responsive considerations
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
      ],
      createdBy: 'System',
      lastUpdated: '2024-08-14'
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
      ],
      createdBy: 'Production Manager',
      lastUpdated: '2024-08-13'
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
      ],
      createdBy: 'Facility Manager',
      lastUpdated: '2024-08-06'
    },
    {
      id: 'WO-004',
      title: 'Security Camera #5 - Lens Cleaning',
      description: 'Clean security camera lens and check positioning',
      assetId: 'CAM-005',
      assetName: 'Security Camera #5',
      assetType: 'Security',
      priority: 'Low',
      status: 'Pending',
      type: 'Preventive',
      assignedTo: 'Sarah Johnson',
      requestedBy: 'Security Manager',
      createdDate: '2024-08-13',
      scheduledDate: '2024-08-17',
      dueDate: '2024-08-19',
      completedDate: null,
      estimatedHours: 0.5,
      actualHours: null,
      estimatedCost: 25.00,
      actualCost: null,
      location: 'Warehouse B - North Wall',
      notes: 'Camera lens appears dirty, affecting image quality',
      parts: ['Cleaning Solution', 'Microfiber Cloth'],
      checklist: [
        { id: 1, task: 'Clean camera lens', completed: false },
        { id: 2, task: 'Check camera positioning', completed: false },
        { id: 3, task: 'Test image quality', completed: false }
      ],
      createdBy: 'Security Manager',
      lastUpdated: '2024-08-13'
    },
    {
      id: 'WO-005',
      title: 'Grow Light #12 - Bulb Replacement',
      description: 'Replace LED grow light bulbs showing reduced output',
      assetId: 'LIGHT-012',
      assetName: 'Grow Light #12',
      assetType: 'Lighting',
      priority: 'High',
      status: 'In Progress',
      type: 'Corrective',
      assignedTo: 'Mike Chen',
      requestedBy: 'Grow Manager',
      createdDate: '2024-08-11',
      scheduledDate: '2024-08-14',
      dueDate: '2024-08-15',
      completedDate: null,
      estimatedHours: 1.5,
      actualHours: 1.2,
      estimatedCost: 200.00,
      actualCost: 180.00,
      location: 'Grow Room C - Section 3',
      notes: 'Light output reduced by 30%, affecting plant growth',
      parts: ['LED Bulbs', 'Mounting Hardware'],
      checklist: [
        { id: 1, task: 'Turn off power', completed: true },
        { id: 2, task: 'Remove old bulbs', completed: true },
        { id: 3, task: 'Install new bulbs', completed: false },
        { id: 4, task: 'Test light output', completed: false }
      ],
      createdBy: 'Grow Manager',
      lastUpdated: '2024-08-14'
    },
    {
      id: 'WO-006',
      title: 'Extraction Equipment - Routine Inspection',
      description: 'Monthly inspection and cleaning of extraction equipment',
      assetId: 'EXT-001',
      assetName: 'CO2 Extraction System',
      assetType: 'Equipment',
      priority: 'Medium',
      status: 'Scheduled',
      type: 'Preventive',
      assignedTo: 'Alex Kim',
      requestedBy: 'Production Manager',
      createdDate: '2024-08-09',
      scheduledDate: '2024-08-16',
      dueDate: '2024-08-18',
      completedDate: null,
      estimatedHours: 3.0,
      actualHours: null,
      estimatedCost: 100.00,
      actualCost: null,
      location: 'Extraction Lab',
      notes: 'Monthly preventive maintenance as per manufacturer guidelines',
      parts: ['Cleaning Solvents', 'Replacement Seals', 'Filters'],
      checklist: [
        { id: 1, task: 'Shut down system safely', completed: false },
        { id: 2, task: 'Clean extraction chamber', completed: false },
        { id: 3, task: 'Replace filters', completed: false },
        { id: 4, task: 'Check pressure seals', completed: false },
        { id: 5, task: 'Test system operation', completed: false }
      ],
      createdBy: 'Production Manager',
      lastUpdated: '2024-08-09'
    }
  ]);

  const [assets, setAssets] = useState([
    {
      id: 'VEH-001',
      name: 'Delivery Vehicle #1',
      type: 'Vehicle',
      model: 'Ford Transit',
      serialNumber: 'FT2024001',
      manufacturer: 'Ford',
      location: 'Delivery Hub A',
      purchaseDate: '2023-06-15',
      warrantyExpiry: '2026-06-15',
      status: 'Active',
      lastMaintenance: '2024-08-10',
      nextMaintenance: '2024-11-10',
      totalWorkOrders: 8,
      maintenanceCost: 1250.00,
      notes: 'Primary delivery vehicle for downtown routes'
    },
    {
      id: 'EQ-002',
      name: 'Packaging Equipment #2',
      type: 'Equipment',
      model: 'PackMaster 3000',
      serialNumber: 'PM3000-2024-002',
      manufacturer: 'PackTech Industries',
      location: 'Production Floor',
      purchaseDate: '2024-01-20',
      warrantyExpiry: '2027-01-20',
      status: 'Active',
      lastMaintenance: '2024-07-15',
      nextMaintenance: '2024-08-18',
      totalWorkOrders: 3,
      maintenanceCost: 850.00,
      notes: 'High-speed packaging equipment for flower products'
    },
    {
      id: 'HVAC-001',
      name: 'Grow Room HVAC System',
      type: 'HVAC',
      model: 'ClimateControl Pro',
      serialNumber: 'CCP-2023-001',
      manufacturer: 'HVAC Solutions',
      location: 'Grow Room A',
      purchaseDate: '2023-03-10',
      warrantyExpiry: '2028-03-10',
      status: 'Active',
      lastMaintenance: '2024-08-06',
      nextMaintenance: '2024-09-06',
      totalWorkOrders: 12,
      maintenanceCost: 2100.00,
      notes: 'Primary climate control for grow room operations'
    },
    {
      id: 'CAM-005',
      name: 'Security Camera #5',
      type: 'Security',
      model: 'SecureCam HD',
      serialNumber: 'SC-HD-005',
      manufacturer: 'Security Systems Inc',
      location: 'Warehouse B - North Wall',
      purchaseDate: '2023-09-05',
      warrantyExpiry: '2025-09-05',
      status: 'Active',
      lastMaintenance: '2024-07-20',
      nextMaintenance: '2024-08-17',
      totalWorkOrders: 4,
      maintenanceCost: 200.00,
      notes: 'High-definition security camera with night vision'
    },
    {
      id: 'LIGHT-012',
      name: 'Grow Light #12',
      type: 'Lighting',
      model: 'GrowMax LED 1000W',
      serialNumber: 'GM-LED-1000-012',
      manufacturer: 'GrowTech Lighting',
      location: 'Grow Room C - Section 3',
      purchaseDate: '2023-11-12',
      warrantyExpiry: '2025-11-12',
      status: 'Active',
      lastMaintenance: '2024-08-11',
      nextMaintenance: '2024-11-11',
      totalWorkOrders: 2,
      maintenanceCost: 380.00,
      notes: 'Full spectrum LED grow light for flowering stage'
    },
    {
      id: 'EXT-001',
      name: 'CO2 Extraction System',
      type: 'Equipment',
      model: 'ExtractPro 5000',
      serialNumber: 'EP5000-2024-001',
      manufacturer: 'Extraction Technologies',
      location: 'Extraction Lab',
      purchaseDate: '2024-02-28',
      warrantyExpiry: '2029-02-28',
      status: 'Active',
      lastMaintenance: '2024-07-16',
      nextMaintenance: '2024-08-16',
      totalWorkOrders: 6,
      maintenanceCost: 1800.00,
      notes: 'Supercritical CO2 extraction system for concentrates'
    }
  ]);

  const [maintenanceSchedule, setMaintenanceSchedule] = useState([
    {
      id: 'SCHED-001',
      assetId: 'VEH-001',
      assetName: 'Delivery Vehicle #1',
      maintenanceType: 'Preventive',
      frequency: 'Quarterly',
      nextDue: '2024-11-10',
      assignedTo: 'Mike Chen',
      estimatedHours: 2.0,
      lastCompleted: '2024-08-10',
      notes: 'Oil change, fluid check, tire rotation'
    },
    {
      id: 'SCHED-002',
      assetId: 'HVAC-001',
      assetName: 'Grow Room HVAC System',
      maintenanceType: 'Preventive',
      frequency: 'Monthly',
      nextDue: '2024-09-06',
      assignedTo: 'John Smith',
      estimatedHours: 1.0,
      lastCompleted: '2024-08-06',
      notes: 'Filter replacement, system inspection'
    },
    {
      id: 'SCHED-003',
      assetId: 'EXT-001',
      assetName: 'CO2 Extraction System',
      maintenanceType: 'Preventive',
      frequency: 'Monthly',
      nextDue: '2024-08-16',
      assignedTo: 'Alex Kim',
      estimatedHours: 3.0,
      lastCompleted: '2024-07-16',
      notes: 'Deep cleaning, seal inspection, calibration'
    },
    {
      id: 'SCHED-004',
      assetId: 'CAM-005',
      assetName: 'Security Camera #5',
      maintenanceType: 'Preventive',
      frequency: 'Bi-weekly',
      nextDue: '2024-08-17',
      assignedTo: 'Sarah Johnson',
      estimatedHours: 0.5,
      lastCompleted: '2024-07-20',
      notes: 'Lens cleaning, positioning check'
    }
  ]);

  const [technicians] = useState([
    'Mike Chen',
    'Alex Kim',
    'John Smith',
    'Sarah Johnson',
    'David Wilson',
    'Lisa Rodriguez'
  ]);

  const [assetTypes] = useState([
    'Vehicle',
    'Equipment',
    'HVAC',
    'Security',
    'Lighting',
    'Plumbing',
    'Electrical'
  ]);

  const [priorities] = useState(['Low', 'Medium', 'High', 'Critical']);
  const [statuses] = useState(['Pending', 'Scheduled', 'In Progress', 'Completed', 'Cancelled']);
  const [workOrderTypes] = useState(['Preventive', 'Corrective', 'Emergency', 'Inspection']);
  const [frequencies] = useState(['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Semi-annual', 'Annual']);

  // Filter functions
  const filteredWorkOrders = useMemo(() => {
    return workOrders.filter(wo => {
      const matchesSearch = wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           wo.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           wo.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = selectedPriority === 'all' || wo.priority === selectedPriority;
      const matchesStatus = selectedStatus === 'all' || wo.status === selectedStatus;
      const matchesAssetType = selectedAssetType === 'all' || wo.assetType === selectedAssetType;
      
      return matchesSearch && matchesPriority && matchesStatus && matchesAssetType;
    });
  }, [workOrders, searchTerm, selectedPriority, selectedStatus, selectedAssetType]);

  // Work Order CRUD Operations
  const handleCreateWorkOrder = () => {
    if (!workOrderForm.title || !workOrderForm.assetId || !workOrderForm.assignedTo) {
      alert('Please fill in required fields (Title, Asset, Assigned To)');
      return;
    }

    const selectedAsset = assets.find(a => a.id === workOrderForm.assetId);
    
    const newWorkOrder = {
      id: `WO-${String(workOrders.length + 1).padStart(3, '0')}`,
      title: workOrderForm.title,
      description: workOrderForm.description,
      assetId: workOrderForm.assetId,
      assetName: selectedAsset ? selectedAsset.name : 'Unknown Asset',
      assetType: selectedAsset ? selectedAsset.type : 'Unknown',
      priority: workOrderForm.priority,
      status: 'Pending',
      type: workOrderForm.type,
      assignedTo: workOrderForm.assignedTo,
      requestedBy: 'Current User',
      createdDate: new Date().toISOString().split('T')[0],
      scheduledDate: workOrderForm.scheduledDate,
      dueDate: workOrderForm.dueDate,
      completedDate: null,
      estimatedHours: workOrderForm.estimatedHours ? parseFloat(workOrderForm.estimatedHours) : null,
      actualHours: null,
      estimatedCost: workOrderForm.estimatedCost ? parseFloat(workOrderForm.estimatedCost) : null,
      actualCost: null,
      location: workOrderForm.location,
      notes: workOrderForm.notes,
      parts: workOrderForm.parts,
      checklist: [],
      createdBy: 'Current User',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setWorkOrders([...workOrders, newWorkOrder]);
    setWorkOrderForm({
      title: '',
      description: '',
      assetId: '',
      priority: 'Medium',
      type: 'Preventive',
      assignedTo: '',
      scheduledDate: '',
      dueDate: '',
      estimatedHours: '',
      estimatedCost: '',
      location: '',
      notes: '',
      parts: []
    });
    setShowWorkOrderModal(false);
    alert('Work order created successfully!');
  };

  const handleEditWorkOrder = (workOrder) => {
    setEditingWorkOrder(workOrder);
    setWorkOrderForm({
      title: workOrder.title,
      description: workOrder.description,
      assetId: workOrder.assetId,
      priority: workOrder.priority,
      type: workOrder.type,
      assignedTo: workOrder.assignedTo,
      scheduledDate: workOrder.scheduledDate,
      dueDate: workOrder.dueDate,
      estimatedHours: workOrder.estimatedHours ? workOrder.estimatedHours.toString() : '',
      estimatedCost: workOrder.estimatedCost ? workOrder.estimatedCost.toString() : '',
      location: workOrder.location,
      notes: workOrder.notes,
      parts: workOrder.parts || []
    });
    setShowWorkOrderModal(true);
  };

  const handleUpdateWorkOrder = () => {
    if (!workOrderForm.title || !workOrderForm.assetId || !workOrderForm.assignedTo) {
      alert('Please fill in required fields (Title, Asset, Assigned To)');
      return;
    }

    const selectedAsset = assets.find(a => a.id === workOrderForm.assetId);

    const updatedWorkOrders = workOrders.map(wo =>
      wo.id === editingWorkOrder.id
        ? { 
            ...wo, 
            title: workOrderForm.title,
            description: workOrderForm.description,
            assetId: workOrderForm.assetId,
            assetName: selectedAsset ? selectedAsset.name : wo.assetName,
            assetType: selectedAsset ? selectedAsset.type : wo.assetType,
            priority: workOrderForm.priority,
            type: workOrderForm.type,
            assignedTo: workOrderForm.assignedTo,
            scheduledDate: workOrderForm.scheduledDate,
            dueDate: workOrderForm.dueDate,
            estimatedHours: workOrderForm.estimatedHours ? parseFloat(workOrderForm.estimatedHours) : wo.estimatedHours,
            estimatedCost: workOrderForm.estimatedCost ? parseFloat(workOrderForm.estimatedCost) : wo.estimatedCost,
            location: workOrderForm.location,
            notes: workOrderForm.notes,
            parts: workOrderForm.parts,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : wo
    );

    setWorkOrders(updatedWorkOrders);
    setEditingWorkOrder(null);
    setWorkOrderForm({
      title: '',
      description: '',
      assetId: '',
      priority: 'Medium',
      type: 'Preventive',
      assignedTo: '',
      scheduledDate: '',
      dueDate: '',
      estimatedHours: '',
      estimatedCost: '',
      location: '',
      notes: '',
      parts: []
    });
    setShowWorkOrderModal(false);
    alert('Work order updated successfully!');
  };

  const handleDeleteWorkOrder = (workOrderId) => {
    if (window.confirm('Are you sure you want to delete this work order? This action cannot be undone.')) {
      setWorkOrders(workOrders.filter(wo => wo.id !== workOrderId));
      alert('Work order deleted successfully!');
    }
  };

  const handleCompleteWorkOrder = (workOrderId) => {
    const updatedWorkOrders = workOrders.map(wo =>
      wo.id === workOrderId
        ? { 
            ...wo, 
            status: 'Completed',
            completedDate: new Date().toISOString().split('T')[0],
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : wo
    );
    setWorkOrders(updatedWorkOrders);
    alert('Work order marked as completed!');
  };

  const handleStartWorkOrder = (workOrderId) => {
    const updatedWorkOrders = workOrders.map(wo =>
      wo.id === workOrderId
        ? { 
            ...wo, 
            status: 'In Progress',
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : wo
    );
    setWorkOrders(updatedWorkOrders);
    alert('Work order started!');
  };

  // Asset CRUD Operations
  const handleCreateAsset = () => {
    if (!assetForm.name || !assetForm.type) {
      alert('Please fill in required fields (Name, Type)');
      return;
    }

    const newAsset = {
      id: `${assetForm.type.toUpperCase().substr(0, 3)}-${String(assets.length + 1).padStart(3, '0')}`,
      name: assetForm.name,
      type: assetForm.type,
      model: assetForm.model,
      serialNumber: assetForm.serialNumber,
      manufacturer: assetForm.manufacturer,
      location: assetForm.location,
      purchaseDate: assetForm.purchaseDate,
      warrantyExpiry: assetForm.warrantyExpiry,
      status: assetForm.status,
      lastMaintenance: null,
      nextMaintenance: null,
      totalWorkOrders: 0,
      maintenanceCost: 0,
      notes: assetForm.notes
    };

    setAssets([...assets, newAsset]);
    setAssetForm({
      name: '',
      type: 'Equipment',
      model: '',
      serialNumber: '',
      manufacturer: '',
      location: '',
      purchaseDate: '',
      warrantyExpiry: '',
      status: 'Active',
      notes: ''
    });
    setShowAssetModal(false);
    alert('Asset created successfully!');
  };

  const handleEditAsset = (asset) => {
    setEditingAsset(asset);
    setAssetForm({
      name: asset.name,
      type: asset.type,
      model: asset.model,
      serialNumber: asset.serialNumber,
      manufacturer: asset.manufacturer,
      location: asset.location,
      purchaseDate: asset.purchaseDate,
      warrantyExpiry: asset.warrantyExpiry,
      status: asset.status,
      notes: asset.notes
    });
    setShowAssetModal(true);
  };

  const handleUpdateAsset = () => {
    if (!assetForm.name || !assetForm.type) {
      alert('Please fill in required fields (Name, Type)');
      return;
    }

    const updatedAssets = assets.map(asset =>
      asset.id === editingAsset.id
        ? { 
            ...asset, 
            name: assetForm.name,
            type: assetForm.type,
            model: assetForm.model,
            serialNumber: assetForm.serialNumber,
            manufacturer: assetForm.manufacturer,
            location: assetForm.location,
            purchaseDate: assetForm.purchaseDate,
            warrantyExpiry: assetForm.warrantyExpiry,
            status: assetForm.status,
            notes: assetForm.notes
          }
        : asset
    );

    setAssets(updatedAssets);
    setEditingAsset(null);
    setAssetForm({
      name: '',
      type: 'Equipment',
      model: '',
      serialNumber: '',
      manufacturer: '',
      location: '',
      purchaseDate: '',
      warrantyExpiry: '',
      status: 'Active',
      notes: ''
    });
    setShowAssetModal(false);
    alert('Asset updated successfully!');
  };

  const handleDeleteAsset = (assetId) => {
    // Check if asset has active work orders
    const activeWorkOrders = workOrders.filter(wo => wo.assetId === assetId && wo.status !== 'Completed');
    if (activeWorkOrders.length > 0) {
      alert('Cannot delete asset with active work orders. Please complete or cancel all work orders first.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
      setAssets(assets.filter(asset => asset.id !== assetId));
      alert('Asset deleted successfully!');
    }
  };

  // Utility functions
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAssetTypeColor = (type) => {
    switch (type) {
      case 'Vehicle': return 'bg-blue-100 text-blue-800';
      case 'Equipment': return 'bg-purple-100 text-purple-800';
      case 'HVAC': return 'bg-green-100 text-green-800';
      case 'Security': return 'bg-red-100 text-red-800';
      case 'Lighting': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  // Dashboard calculations
  const totalWorkOrders = workOrders.length;
  const activeWorkOrders = workOrders.filter(wo => wo.status === 'In Progress' || wo.status === 'Scheduled').length;
  const overdueWorkOrders = workOrders.filter(wo => 
    wo.dueDate && new Date(wo.dueDate) < new Date() && wo.status !== 'Completed'
  ).length;
  const totalAssets = assets.length;
  const totalMaintenanceCost = workOrders.reduce((sum, wo) => sum + (wo.actualCost || wo.estimatedCost || 0), 0);
  const avgCompletionTime = workOrders
    .filter(wo => wo.actualHours)
    .reduce((sum, wo) => sum + wo.actualHours, 0) / workOrders.filter(wo => wo.actualHours).length || 0;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Work Orders</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalWorkOrders}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{activeWorkOrders} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Overdue Tasks</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{overdueWorkOrders}</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">Need attention</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 7h10M7 11h4m6 0h2M7 15h10" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Assets</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalAssets}</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">Under management</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Maintenance Cost</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{formatCurrency(totalMaintenanceCost)}</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">This month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Upcoming Tasks - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Recent Work Orders</h3>
          <div className="space-y-3">
            {workOrders
              .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
              .slice(0, 5)
              .map((wo) => (
                <div key={wo.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${getPriorityColor(wo.priority).replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 bg-')}`}>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{wo.title}</h4>
                      <p className="text-xs text-gray-600 truncate">{wo.assetName} • {wo.assignedTo}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(wo.priority)}`}>
                          {wo.priority}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(wo.status)}`}>
                          {wo.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-sm font-medium text-gray-900">{wo.id}</p>
                    <p className="text-xs text-gray-500">{formatDate(wo.lastUpdated)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Upcoming Maintenance</h3>
          <div className="space-y-4">
            {maintenanceSchedule
              .sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue))
              .slice(0, 5)
              .map((schedule) => (
                <div key={schedule.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate">{schedule.assetName}</span>
                    <span className="text-gray-900 font-medium">{formatDate(schedule.nextDue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        new Date(schedule.nextDue) <= new Date(Date.now() + 7*24*60*60*1000) 
                          ? 'bg-red-600' 
                          : new Date(schedule.nextDue) <= new Date(Date.now() + 14*24*60*60*1000)
                          ? 'bg-yellow-600'
                          : 'bg-green-600'
                      }`}
                      style={{width: `${Math.max(10, 100 - Math.floor((new Date(schedule.nextDue) - new Date()) / (1000 * 60 * 60 * 24)))}%`}}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{schedule.maintenanceType} • {schedule.assignedTo}</span>
                    <span className="text-gray-900 font-medium">{schedule.estimatedHours}h</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions and Maintenance Tips - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowWorkOrderModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Create Work Order
            </button>
            <button
              onClick={() => setShowAssetModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Add Asset
            </button>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              Schedule Maintenance
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Maintenance Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Schedule preventive maintenance regularly</p>
            <p>• Keep detailed maintenance records</p>
            <p>• Monitor asset performance trends</p>
            <p>• Stock critical spare parts</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Avg Completion Time:</span>
              <span className="text-gray-900 font-medium">{avgCompletionTime.toFixed(1)}h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">On-time Completion:</span>
              <span className="text-green-600 font-medium">87%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Cost Efficiency:</span>
              <span className="text-blue-600 font-medium">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWorkOrders = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-3xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search work orders..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priorities</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={selectedAssetType}
              onChange={(e) => setSelectedAssetType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Asset Types</option>
              {assetTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowWorkOrderModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Create Work Order
          </button>
        </div>
      </div>

      {/* Work Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredWorkOrders.map((wo) => (
          <div key={wo.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{wo.title}</h3>
                <p className="text-xs text-gray-500">{wo.id} • {wo.assetName}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(wo.priority)}`}>
                  {wo.priority}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(wo.status)}`}>
                  {wo.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="text-gray-900 font-medium">{wo.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned To:</span>
                <span className="text-gray-900 font-medium">{wo.assignedTo}</span>
              </div>
              <div className="flex justify-between">
                <span>Scheduled:</span>
                <span className="text-gray-900 font-medium">{formatDate(wo.scheduledDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span className={`font-medium ${
                  wo.dueDate && new Date(wo.dueDate) < new Date() && wo.status !== 'Completed' 
                    ? 'text-red-600' 
                    : 'text-gray-900'
                }`}>
                  {formatDate(wo.dueDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Est. Cost:</span>
                <span className="text-gray-900 font-medium">{formatCurrency(wo.estimatedCost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-gray-900 font-medium truncate">{wo.location}</span>
              </div>
            </div>

            {wo.description && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 line-clamp-2">{wo.description}</p>
              </div>
            )}

            {wo.parts && wo.parts.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Parts Required:</p>
                <div className="flex flex-wrap gap-1">
                  {wo.parts.slice(0, 3).map((part, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {part}
                    </span>
                  ))}
                  {wo.parts.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      +{wo.parts.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditWorkOrder(wo)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              {wo.status === 'Pending' && (
                <button 
                  onClick={() => handleStartWorkOrder(wo.id)}
                  className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                >
                  Start
                </button>
              )}
              {(wo.status === 'In Progress' || wo.status === 'Scheduled') && (
                <button 
                  onClick={() => handleCompleteWorkOrder(wo.id)}
                  className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                >
                  Complete
                </button>
              )}
              <button 
                onClick={() => alert(`Viewing details for ${wo.id}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Details
              </button>
              <button 
                onClick={() => handleDeleteWorkOrder(wo.id)}
                className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAssets = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Asset Management</h2>
        <button 
          onClick={() => setShowAssetModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          Add Asset
        </button>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{asset.name}</h3>
                <p className="text-xs text-gray-500">{asset.id} • {asset.model}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAssetTypeColor(asset.type)}`}>
                {asset.type}
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Manufacturer:</span>
                <span className="text-gray-900 font-medium truncate">{asset.manufacturer}</span>
              </div>
              <div className="flex justify-between">
                <span>Serial Number:</span>
                <span className="text-gray-900 font-medium">{asset.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-gray-900 font-medium truncate">{asset.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Purchase Date:</span>
                <span className="text-gray-900 font-medium">{formatDate(asset.purchaseDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Warranty:</span>
                <span className={`font-medium ${
                  asset.warrantyExpiry && new Date(asset.warrantyExpiry) < new Date() 
                    ? 'text-red-600' 
                    : 'text-gray-900'
                }`}>
                  {formatDate(asset.warrantyExpiry)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Work Orders:</span>
                <span className="text-gray-900 font-medium">{asset.totalWorkOrders}</span>
              </div>
              <div className="flex justify-between">
                <span>Maintenance Cost:</span>
                <span className="text-gray-900 font-medium">{formatCurrency(asset.maintenanceCost)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditAsset(asset)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => alert(`Viewing maintenance history for ${asset.name}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                History
              </button>
              <button 
                onClick={() => {
                  setWorkOrderForm({...workOrderForm, assetId: asset.id});
                  setShowWorkOrderModal(true);
                }}
                className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
              >
                Create WO
              </button>
              <button 
                onClick={() => handleDeleteAsset(asset.id)}
                className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Maintenance Schedule</h2>
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          Schedule Maintenance
        </button>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {maintenanceSchedule.map((schedule) => (
          <div key={schedule.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{schedule.assetName}</h3>
                <p className="text-xs text-gray-500">{schedule.id} • {schedule.maintenanceType}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                new Date(schedule.nextDue) <= new Date(Date.now() + 7*24*60*60*1000) 
                  ? 'bg-red-100 text-red-800' 
                  : new Date(schedule.nextDue) <= new Date(Date.now() + 14*24*60*60*1000)
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {schedule.frequency}
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Next Due:</span>
                <span className={`font-medium ${
                  new Date(schedule.nextDue) <= new Date(Date.now() + 7*24*60*60*1000) 
                    ? 'text-red-600' 
                    : 'text-gray-900'
                }`}>
                  {formatDate(schedule.nextDue)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Assigned To:</span>
                <span className="text-gray-900 font-medium">{schedule.assignedTo}</span>
              </div>
              <div className="flex justify-between">
                <span>Est. Hours:</span>
                <span className="text-gray-900 font-medium">{schedule.estimatedHours}h</span>
              </div>
              <div className="flex justify-between">
                <span>Last Completed:</span>
                <span className="text-gray-900 font-medium">{formatDate(schedule.lastCompleted)}</span>
              </div>
            </div>

            {schedule.notes && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600">{schedule.notes}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => {
                  const asset = assets.find(a => a.id === schedule.assetId);
                  setWorkOrderForm({
                    ...workOrderForm,
                    title: `${schedule.maintenanceType} Maintenance - ${asset?.name}`,
                    assetId: schedule.assetId,
                    type: schedule.maintenanceType,
                    assignedTo: schedule.assignedTo,
                    scheduledDate: schedule.nextDue,
                    estimatedHours: schedule.estimatedHours.toString(),
                    notes: schedule.notes
                  });
                  setShowWorkOrderModal(true);
                }}
                className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
              >
                Create Work Order
              </button>
              <button 
                onClick={() => alert(`Editing schedule for ${schedule.assetName}`)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit Schedule
              </button>
              <button 
                onClick={() => alert(`Viewing history for ${schedule.assetName}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Work Order Modal - Mobile Responsive
  const WorkOrderModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingWorkOrder ? 'Edit Work Order' : 'Create New Work Order'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title *</label>
              <input
                type="text"
                value={workOrderForm.title}
                onChange={(e) => setWorkOrderForm({...workOrderForm, title: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={workOrderForm.description}
                onChange={(e) => setWorkOrderForm({...workOrderForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Asset *</label>
                <select
                  value={workOrderForm.assetId}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, assetId: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="">Select Asset</option>
                  {assets.map(asset => (
                    <option key={asset.id} value={asset.id}>{asset.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Assigned To *</label>
                <select
                  value={workOrderForm.assignedTo}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, assignedTo: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="">Select Technician</option>
                  {technicians.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={workOrderForm.priority}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, priority: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={workOrderForm.type}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {workOrderTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={workOrderForm.location}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, location: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
                <input
                  type="date"
                  value={workOrderForm.scheduledDate}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, scheduledDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  type="date"
                  value={workOrderForm.dueDate}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, dueDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Hours</label>
                <input
                  type="number"
                  step="0.5"
                  value={workOrderForm.estimatedHours}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, estimatedHours: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Cost</label>
                <input
                  type="number"
                  step="0.01"
                  value={workOrderForm.estimatedCost}
                  onChange={(e) => setWorkOrderForm({...workOrderForm, estimatedCost: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={workOrderForm.notes}
                onChange={(e) => setWorkOrderForm({...workOrderForm, notes: e.target.value})}
                rows={2}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowWorkOrderModal(false);
                setEditingWorkOrder(null);
                setWorkOrderForm({
                  title: '',
                  description: '',
                  assetId: '',
                  priority: 'Medium',
                  type: 'Preventive',
                  assignedTo: '',
                  scheduledDate: '',
                  dueDate: '',
                  estimatedHours: '',
                  estimatedCost: '',
                  location: '',
                  notes: '',
                  parts: []
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingWorkOrder ? handleUpdateWorkOrder : handleCreateWorkOrder}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingWorkOrder ? 'Update' : 'Create'} Work Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Asset Modal - Mobile Responsive
  const AssetModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingAsset ? 'Edit Asset' : 'Add New Asset'}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Asset Name *</label>
                <input
                  type="text"
                  value={assetForm.name}
                  onChange={(e) => setAssetForm({...assetForm, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type *</label>
                <select
                  value={assetForm.type}
                  onChange={(e) => setAssetForm({...assetForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  {assetTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  value={assetForm.model}
                  onChange={(e) => setAssetForm({...assetForm, model: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Serial Number</label>
                <input
                  type="text"
                  value={assetForm.serialNumber}
                  onChange={(e) => setAssetForm({...assetForm, serialNumber: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                <input
                  type="text"
                  value={assetForm.manufacturer}
                  onChange={(e) => setAssetForm({...assetForm, manufacturer: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={assetForm.location}
                  onChange={(e) => setAssetForm({...assetForm, location: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
                <input
                  type="date"
                  value={assetForm.purchaseDate}
                  onChange={(e) => setAssetForm({...assetForm, purchaseDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Warranty Expiry</label>
                <input
                  type="date"
                  value={assetForm.warrantyExpiry}
                  onChange={(e) => setAssetForm({...assetForm, warrantyExpiry: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={assetForm.status}
                onChange={(e) => setAssetForm({...assetForm, status: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Retired">Retired</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={assetForm.notes}
                onChange={(e) => setAssetForm({...assetForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowAssetModal(false);
                setEditingAsset(null);
                setAssetForm({
                  name: '',
                  type: 'Equipment',
                  model: '',
                  serialNumber: '',
                  manufacturer: '',
                  location: '',
                  purchaseDate: '',
                  warrantyExpiry: '',
                  status: 'Active',
                  notes: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingAsset ? handleUpdateAsset : handleCreateAsset}
              className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              {editingAsset ? 'Update' : 'Add'} Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Maintenance Management</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Manage work orders, assets, and maintenance schedules</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'workorders', name: 'Work Orders', icon: '🔧' },
            { id: 'assets', name: 'Assets', icon: '🏭' },
            { id: 'schedule', name: 'Schedule', icon: '📅' }
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
        {activeTab === 'workorders' && renderWorkOrders()}
        {activeTab === 'assets' && renderAssets()}
        {activeTab === 'schedule' && renderSchedule()}
      </div>

      {/* Modals */}
      {showWorkOrderModal && <WorkOrderModal />}
      {showAssetModal && <AssetModal />}
    </div>
  );
};

export default EnhancedMaintenanceModule;

