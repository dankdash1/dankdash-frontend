import React, { useState, useEffect, useMemo } from 'react';

const EnhancedComplianceModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showRegulationModal, setShowRegulationModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [editingLicense, setEditingLicense] = useState(null);
  const [editingRegulation, setEditingRegulation] = useState(null);

  // Form states
  const [licenseForm, setLicenseForm] = useState({
    type: 'Cultivation License',
    licenseNumber: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    cost: '',
    contactPerson: '',
    conditions: '',
    notes: ''
  });

  const [regulationForm, setRegulationForm] = useState({
    title: '',
    category: 'Tracking',
    jurisdiction: '',
    effectiveDate: '',
    description: '',
    requirements: '',
    complianceStatus: 'Pending Review',
    priority: 'Medium',
    notes: ''
  });

  const [auditForm, setAuditForm] = useState({
    licenseId: '',
    auditorName: '',
    auditDate: '',
    auditType: 'Routine',
    findings: '',
    recommendations: '',
    complianceScore: '',
    followUpRequired: false,
    followUpDate: '',
    notes: ''
  });

  // Mock data with mobile-responsive considerations
  const [licenses, setLicenses] = useState([
    {
      id: 'LIC-001',
      type: 'Cultivation License',
      licenseNumber: 'CULT-CA-2024-001',
      issuer: 'California Department of Cannabis Control',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'Active',
      renewalRequired: false,
      daysUntilExpiry: 154,
      cost: 5000.00,
      conditions: ['Annual inspection required', 'Monthly reporting mandatory'],
      contactPerson: 'Sarah Johnson',
      lastInspection: '2024-06-15',
      nextInspection: '2024-12-15',
      violations: 0,
      complianceScore: 98.5,
      notes: 'All requirements met, excellent compliance record',
      createdBy: 'Compliance Manager',
      lastUpdated: '2024-08-15'
    },
    {
      id: 'LIC-002',
      type: 'Manufacturing License',
      licenseNumber: 'MFG-CA-2024-002',
      issuer: 'California Department of Cannabis Control',
      issueDate: '2024-02-01',
      expiryDate: '2025-02-01',
      status: 'Active',
      renewalRequired: false,
      daysUntilExpiry: 171,
      cost: 7500.00,
      conditions: ['Quality control testing required', 'Batch tracking mandatory'],
      contactPerson: 'Mike Chen',
      lastInspection: '2024-07-01',
      nextInspection: '2025-01-01',
      violations: 1,
      complianceScore: 92.3,
      notes: 'Minor violation corrected, monitoring ongoing',
      createdBy: 'Compliance Manager',
      lastUpdated: '2024-08-10'
    },
    {
      id: 'LIC-003',
      type: 'Distribution License',
      licenseNumber: 'DIST-CA-2024-003',
      issuer: 'California Department of Cannabis Control',
      issueDate: '2024-03-01',
      expiryDate: '2024-09-01',
      status: 'Renewal Required',
      renewalRequired: true,
      daysUntilExpiry: 18,
      cost: 4000.00,
      conditions: ['Transport manifest required', 'Driver certification mandatory'],
      contactPerson: 'Alex Kim',
      lastInspection: '2024-05-15',
      nextInspection: '2024-11-15',
      violations: 0,
      complianceScore: 96.8,
      notes: 'Renewal application submitted, awaiting approval',
      createdBy: 'Compliance Manager',
      lastUpdated: '2024-08-14'
    },
    {
      id: 'LIC-004',
      type: 'Retail License',
      licenseNumber: 'RET-CA-2024-004',
      issuer: 'California Department of Cannabis Control',
      issueDate: '2024-04-01',
      expiryDate: '2025-04-01',
      status: 'Active',
      renewalRequired: false,
      daysUntilExpiry: 231,
      cost: 6000.00,
      conditions: ['Age verification required', 'Purchase limits enforced'],
      contactPerson: 'Lisa Rodriguez',
      lastInspection: '2024-08-01',
      nextInspection: '2025-02-01',
      violations: 0,
      complianceScore: 99.2,
      notes: 'Exemplary compliance, no issues identified',
      createdBy: 'Compliance Manager',
      lastUpdated: '2024-08-12'
    },
    {
      id: 'LIC-005',
      type: 'Testing License',
      licenseNumber: 'TEST-CA-2024-005',
      issuer: 'California Department of Cannabis Control',
      issueDate: '2024-05-01',
      expiryDate: '2025-05-01',
      status: 'Active',
      renewalRequired: false,
      daysUntilExpiry: 262,
      cost: 8000.00,
      conditions: ['ISO certification required', 'Proficiency testing mandatory'],
      contactPerson: 'David Wilson',
      lastInspection: '2024-07-15',
      nextInspection: '2025-01-15',
      violations: 0,
      complianceScore: 97.8,
      notes: 'Laboratory accreditation maintained, all standards met',
      createdBy: 'Compliance Manager',
      lastUpdated: '2024-08-08'
    },
    {
      id: 'LIC-006',
      type: 'Transport License',
      licenseNumber: 'TRANS-CA-2024-006',
      issuer: 'California Department of Cannabis Control',
      issueDate: '2024-06-01',
      expiryDate: '2024-12-01',
      status: 'Expiring Soon',
      renewalRequired: true,
      daysUntilExpiry: 108,
      cost: 3500.00,
      conditions: ['GPS tracking required', 'Security protocols mandatory'],
      contactPerson: 'Jennifer Lee',
      lastInspection: '2024-08-01',
      nextInspection: '2024-10-01',
      violations: 0,
      complianceScore: 94.5,
      notes: 'Renewal process initiated, documentation in progress',
      createdBy: 'Compliance Manager',
      lastUpdated: '2024-08-16'
    }
  ]);

  const [regulations, setRegulations] = useState([
    {
      id: 'REG-001',
      title: 'Seed-to-Sale Tracking Requirements',
      category: 'Tracking',
      jurisdiction: 'California',
      effectiveDate: '2024-01-01',
      description: 'All cannabis products must be tracked from seed to sale using state-approved tracking systems',
      requirements: [
        'Use METRC tracking system',
        'Tag all plants and products',
        'Report transfers within 24 hours',
        'Maintain inventory records'
      ],
      complianceStatus: 'Compliant',
      priority: 'High',
      lastReviewed: '2024-08-15',
      nextReview: '2024-11-15',
      assignedTo: 'Operations Team',
      notes: 'Full compliance achieved, monitoring ongoing',
      createdBy: 'Compliance Manager',
      createdDate: '2024-01-01'
    },
    {
      id: 'REG-002',
      title: 'Product Testing Standards',
      category: 'Quality Control',
      jurisdiction: 'California',
      effectiveDate: '2024-02-01',
      description: 'Mandatory testing requirements for all cannabis products before retail sale',
      requirements: [
        'Potency testing required',
        'Pesticide screening mandatory',
        'Heavy metals testing',
        'Microbial contamination testing'
      ],
      complianceStatus: 'Compliant',
      priority: 'High',
      lastReviewed: '2024-08-10',
      nextReview: '2024-11-10',
      assignedTo: 'Quality Control Team',
      notes: 'All testing protocols implemented and operational',
      createdBy: 'Compliance Manager',
      createdDate: '2024-02-01'
    },
    {
      id: 'REG-003',
      title: 'Packaging and Labeling Requirements',
      category: 'Packaging',
      jurisdiction: 'California',
      effectiveDate: '2024-03-01',
      description: 'Specific requirements for cannabis product packaging and labeling',
      requirements: [
        'Child-resistant packaging',
        'Warning labels required',
        'Potency information display',
        'Batch tracking numbers'
      ],
      complianceStatus: 'Partial Compliance',
      priority: 'Medium',
      lastReviewed: '2024-08-05',
      nextReview: '2024-11-05',
      assignedTo: 'Packaging Team',
      notes: 'Minor labeling updates needed, 90% compliant',
      createdBy: 'Compliance Manager',
      createdDate: '2024-03-01'
    },
    {
      id: 'REG-004',
      title: 'Security and Surveillance Standards',
      category: 'Security',
      jurisdiction: 'California',
      effectiveDate: '2024-04-01',
      description: 'Security requirements for cannabis facilities and operations',
      requirements: [
        '24/7 video surveillance',
        'Alarm systems required',
        'Access control systems',
        'Security personnel training'
      ],
      complianceStatus: 'Compliant',
      priority: 'High',
      lastReviewed: '2024-08-12',
      nextReview: '2024-11-12',
      assignedTo: 'Security Team',
      notes: 'All security measures implemented and operational',
      createdBy: 'Compliance Manager',
      createdDate: '2024-04-01'
    },
    {
      id: 'REG-005',
      title: 'Waste Management Protocols',
      category: 'Environmental',
      jurisdiction: 'California',
      effectiveDate: '2024-05-01',
      description: 'Requirements for proper disposal and management of cannabis waste',
      requirements: [
        'Waste tracking required',
        'Proper disposal methods',
        'Documentation mandatory',
        'Third-party disposal services'
      ],
      complianceStatus: 'Under Review',
      priority: 'Medium',
      lastReviewed: '2024-08-08',
      nextReview: '2024-11-08',
      assignedTo: 'Environmental Team',
      notes: 'Reviewing current practices, updates may be needed',
      createdBy: 'Compliance Manager',
      createdDate: '2024-05-01'
    },
    {
      id: 'REG-006',
      title: 'Employee Training Requirements',
      category: 'Training',
      jurisdiction: 'California',
      effectiveDate: '2024-06-01',
      description: 'Mandatory training requirements for cannabis industry employees',
      requirements: [
        'Initial training certification',
        'Annual refresher training',
        'Role-specific training',
        'Documentation of training'
      ],
      complianceStatus: 'Non-Compliant',
      priority: 'High',
      lastReviewed: '2024-08-16',
      nextReview: '2024-09-16',
      assignedTo: 'HR Team',
      notes: 'Training program needs immediate implementation',
      createdBy: 'Compliance Manager',
      createdDate: '2024-06-01'
    }
  ]);

  const [audits, setAudits] = useState([
    {
      id: 'AUDIT-001',
      licenseId: 'LIC-001',
      licenseName: 'Cultivation License',
      auditorName: 'John Smith',
      auditDate: '2024-06-15',
      auditType: 'Routine',
      findings: 'All cultivation practices meet regulatory standards. Minor documentation improvements recommended.',
      recommendations: [
        'Update plant tracking logs more frequently',
        'Implement digital record keeping',
        'Schedule quarterly compliance reviews'
      ],
      complianceScore: 98.5,
      followUpRequired: true,
      followUpDate: '2024-09-15',
      status: 'Completed',
      notes: 'Excellent compliance record, minor improvements identified',
      createdBy: 'John Smith',
      createdDate: '2024-06-15'
    },
    {
      id: 'AUDIT-002',
      licenseId: 'LIC-002',
      licenseName: 'Manufacturing License',
      auditorName: 'Sarah Davis',
      auditDate: '2024-07-01',
      auditType: 'Compliance',
      findings: 'Manufacturing processes generally compliant. One minor violation found in batch documentation.',
      recommendations: [
        'Improve batch record accuracy',
        'Implement double-check procedures',
        'Train staff on documentation standards'
      ],
      complianceScore: 92.3,
      followUpRequired: true,
      followUpDate: '2024-10-01',
      status: 'Action Required',
      notes: 'Minor violation corrected, follow-up scheduled',
      createdBy: 'Sarah Davis',
      createdDate: '2024-07-01'
    },
    {
      id: 'AUDIT-003',
      licenseId: 'LIC-004',
      licenseName: 'Retail License',
      auditorName: 'Mike Johnson',
      auditDate: '2024-08-01',
      auditType: 'Routine',
      findings: 'Retail operations exceed compliance standards. Exemplary age verification and record keeping.',
      recommendations: [
        'Continue current practices',
        'Share best practices with other locations',
        'Consider compliance training for other facilities'
      ],
      complianceScore: 99.2,
      followUpRequired: false,
      followUpDate: null,
      status: 'Completed',
      notes: 'Outstanding compliance performance, no issues identified',
      createdBy: 'Mike Johnson',
      createdDate: '2024-08-01'
    },
    {
      id: 'AUDIT-004',
      licenseId: 'LIC-005',
      licenseName: 'Testing License',
      auditorName: 'Lisa Chen',
      auditDate: '2024-07-15',
      auditType: 'Technical',
      findings: 'Laboratory testing procedures meet all technical requirements. Equipment calibration up to date.',
      recommendations: [
        'Maintain current calibration schedule',
        'Update quality manual annually',
        'Continue proficiency testing participation'
      ],
      complianceScore: 97.8,
      followUpRequired: false,
      followUpDate: null,
      status: 'Completed',
      notes: 'Technical compliance excellent, all standards maintained',
      createdBy: 'Lisa Chen',
      createdDate: '2024-07-15'
    }
  ]);

  const [licenseTypes] = useState([
    'Cultivation License',
    'Manufacturing License',
    'Distribution License',
    'Retail License',
    'Testing License',
    'Transport License',
    'Nursery License',
    'Processing License'
  ]);

  const [regulationCategories] = useState([
    'Tracking',
    'Quality Control',
    'Packaging',
    'Security',
    'Environmental',
    'Training',
    'Financial',
    'Reporting'
  ]);

  const [auditTypes] = useState([
    'Routine',
    'Compliance',
    'Technical',
    'Financial',
    'Security',
    'Environmental',
    'Special'
  ]);

  const [complianceStatuses] = useState([
    'Compliant',
    'Partial Compliance',
    'Non-Compliant',
    'Under Review',
    'Pending Review'
  ]);

  const [priorities] = useState(['High', 'Medium', 'Low']);
  const [licenseStatuses] = useState(['Active', 'Renewal Required', 'Expiring Soon', 'Expired', 'Suspended']);

  // Filter functions
  const filteredLicenses = useMemo(() => {
    return licenses.filter(license => {
      const matchesSearch = license.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           license.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || license.status === selectedStatus;
      const matchesType = selectedType === 'all' || license.type === selectedType;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [licenses, searchTerm, selectedStatus, selectedType]);

  const filteredRegulations = useMemo(() => {
    return regulations.filter(regulation => {
      const matchesSearch = regulation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           regulation.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           regulation.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || regulation.complianceStatus === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || regulation.priority === selectedPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [regulations, searchTerm, selectedStatus, selectedPriority]);

  // License CRUD Operations
  const handleCreateLicense = () => {
    if (!licenseForm.type || !licenseForm.licenseNumber || !licenseForm.issuer) {
      alert('Please fill in required fields (Type, License Number, Issuer)');
      return;
    }

    const newLicense = {
      id: `LIC-${String(licenses.length + 1).padStart(3, '0')}`,
      type: licenseForm.type,
      licenseNumber: licenseForm.licenseNumber,
      issuer: licenseForm.issuer,
      issueDate: licenseForm.issueDate,
      expiryDate: licenseForm.expiryDate,
      status: 'Active',
      renewalRequired: false,
      daysUntilExpiry: licenseForm.expiryDate ? Math.ceil((new Date(licenseForm.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)) : null,
      cost: licenseForm.cost ? parseFloat(licenseForm.cost) : 0,
      conditions: licenseForm.conditions ? licenseForm.conditions.split('\n').filter(c => c.trim()) : [],
      contactPerson: licenseForm.contactPerson,
      lastInspection: null,
      nextInspection: null,
      violations: 0,
      complianceScore: 100,
      notes: licenseForm.notes,
      createdBy: 'Current User',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setLicenses([...licenses, newLicense]);
    setLicenseForm({
      type: 'Cultivation License',
      licenseNumber: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      cost: '',
      contactPerson: '',
      conditions: '',
      notes: ''
    });
    setShowLicenseModal(false);
    alert('License created successfully!');
  };

  const handleEditLicense = (license) => {
    setEditingLicense(license);
    setLicenseForm({
      type: license.type,
      licenseNumber: license.licenseNumber,
      issuer: license.issuer,
      issueDate: license.issueDate,
      expiryDate: license.expiryDate,
      cost: license.cost.toString(),
      contactPerson: license.contactPerson,
      conditions: license.conditions.join('\n'),
      notes: license.notes
    });
    setShowLicenseModal(true);
  };

  const handleUpdateLicense = () => {
    if (!licenseForm.type || !licenseForm.licenseNumber || !licenseForm.issuer) {
      alert('Please fill in required fields (Type, License Number, Issuer)');
      return;
    }

    const updatedLicenses = licenses.map(license =>
      license.id === editingLicense.id
        ? { 
            ...license, 
            type: licenseForm.type,
            licenseNumber: licenseForm.licenseNumber,
            issuer: licenseForm.issuer,
            issueDate: licenseForm.issueDate,
            expiryDate: licenseForm.expiryDate,
            daysUntilExpiry: licenseForm.expiryDate ? Math.ceil((new Date(licenseForm.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)) : null,
            cost: licenseForm.cost ? parseFloat(licenseForm.cost) : license.cost,
            conditions: licenseForm.conditions ? licenseForm.conditions.split('\n').filter(c => c.trim()) : license.conditions,
            contactPerson: licenseForm.contactPerson,
            notes: licenseForm.notes,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : license
    );

    setLicenses(updatedLicenses);
    setEditingLicense(null);
    setLicenseForm({
      type: 'Cultivation License',
      licenseNumber: '',
      issuer: '',
      issueDate: '',
      expiryDate: '',
      cost: '',
      contactPerson: '',
      conditions: '',
      notes: ''
    });
    setShowLicenseModal(false);
    alert('License updated successfully!');
  };

  const handleDeleteLicense = (licenseId) => {
    // Check if license has audit records
    const licenseAudits = audits.filter(audit => audit.licenseId === licenseId);
    if (licenseAudits.length > 0) {
      alert('Cannot delete license with existing audit records. Please archive audit records first.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this license? This action cannot be undone.')) {
      setLicenses(licenses.filter(license => license.id !== licenseId));
      alert('License deleted successfully!');
    }
  };

  const handleRenewLicense = (licenseId) => {
    const updatedLicenses = licenses.map(license =>
      license.id === licenseId
        ? { 
            ...license, 
            status: 'Active',
            renewalRequired: false,
            issueDate: new Date().toISOString().split('T')[0],
            expiryDate: new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0],
            daysUntilExpiry: 365,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : license
    );
    setLicenses(updatedLicenses);
    alert('License renewed successfully!');
  };

  // Regulation CRUD Operations
  const handleCreateRegulation = () => {
    if (!regulationForm.title || !regulationForm.category || !regulationForm.jurisdiction) {
      alert('Please fill in required fields (Title, Category, Jurisdiction)');
      return;
    }

    const newRegulation = {
      id: `REG-${String(regulations.length + 1).padStart(3, '0')}`,
      title: regulationForm.title,
      category: regulationForm.category,
      jurisdiction: regulationForm.jurisdiction,
      effectiveDate: regulationForm.effectiveDate,
      description: regulationForm.description,
      requirements: regulationForm.requirements ? regulationForm.requirements.split('\n').filter(r => r.trim()) : [],
      complianceStatus: regulationForm.complianceStatus,
      priority: regulationForm.priority,
      lastReviewed: new Date().toISOString().split('T')[0],
      nextReview: new Date(Date.now() + 90*24*60*60*1000).toISOString().split('T')[0],
      assignedTo: 'Compliance Team',
      notes: regulationForm.notes,
      createdBy: 'Current User',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setRegulations([...regulations, newRegulation]);
    setRegulationForm({
      title: '',
      category: 'Tracking',
      jurisdiction: '',
      effectiveDate: '',
      description: '',
      requirements: '',
      complianceStatus: 'Pending Review',
      priority: 'Medium',
      notes: ''
    });
    setShowRegulationModal(false);
    alert('Regulation created successfully!');
  };

  const handleEditRegulation = (regulation) => {
    setEditingRegulation(regulation);
    setRegulationForm({
      title: regulation.title,
      category: regulation.category,
      jurisdiction: regulation.jurisdiction,
      effectiveDate: regulation.effectiveDate,
      description: regulation.description,
      requirements: regulation.requirements.join('\n'),
      complianceStatus: regulation.complianceStatus,
      priority: regulation.priority,
      notes: regulation.notes
    });
    setShowRegulationModal(true);
  };

  const handleUpdateRegulation = () => {
    if (!regulationForm.title || !regulationForm.category || !regulationForm.jurisdiction) {
      alert('Please fill in required fields (Title, Category, Jurisdiction)');
      return;
    }

    const updatedRegulations = regulations.map(regulation =>
      regulation.id === editingRegulation.id
        ? { 
            ...regulation, 
            title: regulationForm.title,
            category: regulationForm.category,
            jurisdiction: regulationForm.jurisdiction,
            effectiveDate: regulationForm.effectiveDate,
            description: regulationForm.description,
            requirements: regulationForm.requirements ? regulationForm.requirements.split('\n').filter(r => r.trim()) : regulation.requirements,
            complianceStatus: regulationForm.complianceStatus,
            priority: regulationForm.priority,
            notes: regulationForm.notes,
            lastReviewed: new Date().toISOString().split('T')[0]
          }
        : regulation
    );

    setRegulations(updatedRegulations);
    setEditingRegulation(null);
    setRegulationForm({
      title: '',
      category: 'Tracking',
      jurisdiction: '',
      effectiveDate: '',
      description: '',
      requirements: '',
      complianceStatus: 'Pending Review',
      priority: 'Medium',
      notes: ''
    });
    setShowRegulationModal(false);
    alert('Regulation updated successfully!');
  };

  const handleDeleteRegulation = (regulationId) => {
    if (window.confirm('Are you sure you want to delete this regulation? This action cannot be undone.')) {
      setRegulations(regulations.filter(regulation => regulation.id !== regulationId));
      alert('Regulation deleted successfully!');
    }
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Renewal Required': return 'bg-yellow-100 text-yellow-800';
      case 'Expiring Soon': return 'bg-orange-100 text-orange-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceStatusColor = (status) => {
    switch (status) {
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Partial Compliance': return 'bg-yellow-100 text-yellow-800';
      case 'Non-Compliant': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Pending Review': return 'bg-gray-100 text-gray-800';
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

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    if (!amount) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  // Dashboard calculations
  const totalLicenses = licenses.length;
  const activeLicenses = licenses.filter(license => license.status === 'Active').length;
  const renewalRequired = licenses.filter(license => license.renewalRequired).length;
  const expiringSoon = licenses.filter(license => license.daysUntilExpiry && license.daysUntilExpiry <= 30).length;
  const totalRegulations = regulations.length;
  const compliantRegulations = regulations.filter(reg => reg.complianceStatus === 'Compliant').length;
  const nonCompliantRegulations = regulations.filter(reg => reg.complianceStatus === 'Non-Compliant').length;
  const complianceRate = totalRegulations > 0 ? ((compliantRegulations / totalRegulations) * 100).toFixed(1) : 0;
  const totalAudits = audits.length;
  const pendingAudits = audits.filter(audit => audit.status === 'Action Required').length;
  const averageComplianceScore = audits.length > 0 ? (audits.reduce((sum, audit) => sum + audit.complianceScore, 0) / audits.length).toFixed(1) : 0;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Licenses</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalLicenses}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{activeLicenses} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Compliance Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{complianceRate}%</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">{compliantRegulations} compliant</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Renewals Due</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{renewalRequired}</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">{expiringSoon} expiring soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Avg Audit Score</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{averageComplianceScore}</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">{totalAudits} audits</p>
            </div>
          </div>
        </div>
      </div>

      {/* License Status and Compliance Overview - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">License Status Overview</h3>
          <div className="space-y-3">
            {licenses
              .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)
              .slice(0, 5)
              .map((license) => (
                <div key={license.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${getStatusColor(license.status).replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 bg-')}`}>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{license.type}</h4>
                      <p className="text-xs text-gray-600 truncate">{license.licenseNumber}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                          {license.status}
                        </span>
                        {license.daysUntilExpiry !== null && (
                          <span className={`text-xs ${license.daysUntilExpiry <= 30 ? 'text-red-600' : 'text-gray-500'}`}>
                            {license.daysUntilExpiry} days
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-sm font-medium text-gray-900">{license.complianceScore}%</p>
                    <p className="text-xs text-gray-500">{formatDate(license.expiryDate)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Regulation Compliance</h3>
          <div className="space-y-4">
            {regulations
              .filter(reg => reg.complianceStatus !== 'Compliant')
              .slice(0, 5)
              .map((regulation) => (
                <div key={regulation.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate">{regulation.title}</span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(regulation.priority)}`}>
                      {regulation.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getComplianceStatusColor(regulation.complianceStatus)}`}>
                      {regulation.complianceStatus}
                    </span>
                    <span className="text-xs text-gray-500">{regulation.category}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Assigned: {regulation.assignedTo}</span>
                    <span className="text-gray-900 font-medium">{formatDate(regulation.nextReview)}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions and Compliance Tips - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowLicenseModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Add License
            </button>
            <button
              onClick={() => setShowRegulationModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Add Regulation
            </button>
            <button
              onClick={() => setShowAuditModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              Schedule Audit
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Compliance Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Monitor license expiration dates</p>
            <p>• Schedule regular compliance audits</p>
            <p>• Keep documentation up to date</p>
            <p>• Train staff on regulations</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3 text-sm">
            {licenses
              .filter(license => license.daysUntilExpiry && license.daysUntilExpiry <= 60)
              .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)
              .slice(0, 3)
              .map((license) => (
                <div key={license.id} className="flex items-center justify-between">
                  <span className="text-gray-600 truncate">{license.type}</span>
                  <span className={`font-medium ${license.daysUntilExpiry <= 30 ? 'text-red-600' : 'text-yellow-600'}`}>
                    {license.daysUntilExpiry} days
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderLicenses = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-3xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search licenses..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {licenseStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              {licenseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowLicenseModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Add License
          </button>
        </div>
      </div>

      {/* Licenses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredLicenses.map((license) => (
          <div key={license.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{license.type}</h3>
                <p className="text-xs text-gray-500">{license.licenseNumber}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                  {license.status}
                </span>
                <span className="text-xs text-center text-gray-600">{license.complianceScore}%</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Issuer:</span>
                <span className="text-gray-900 font-medium truncate">{license.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span>Issue Date:</span>
                <span className="text-gray-900 font-medium">{formatDate(license.issueDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Expiry Date:</span>
                <span className={`font-medium ${
                  license.daysUntilExpiry && license.daysUntilExpiry <= 30 
                    ? 'text-red-600' 
                    : license.daysUntilExpiry && license.daysUntilExpiry <= 60
                    ? 'text-yellow-600'
                    : 'text-gray-900'
                }`}>
                  {formatDate(license.expiryDate)}
                </span>
              </div>
              {license.daysUntilExpiry !== null && (
                <div className="flex justify-between">
                  <span>Days Until Expiry:</span>
                  <span className={`font-medium ${
                    license.daysUntilExpiry <= 30 ? 'text-red-600' : 
                    license.daysUntilExpiry <= 60 ? 'text-yellow-600' : 'text-gray-900'
                  }`}>
                    {license.daysUntilExpiry}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Cost:</span>
                <span className="text-gray-900 font-medium">{formatCurrency(license.cost)}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact:</span>
                <span className="text-gray-900 font-medium truncate">{license.contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span>Violations:</span>
                <span className={`font-medium ${license.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {license.violations}
                </span>
              </div>
            </div>

            {license.conditions && license.conditions.length > 0 && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 font-medium mb-1">Conditions:</p>
                <ul className="text-gray-500 space-y-1">
                  {license.conditions.slice(0, 2).map((condition, index) => (
                    <li key={index} className="truncate">• {condition}</li>
                  ))}
                  {license.conditions.length > 2 && (
                    <li className="text-blue-600">+ {license.conditions.length - 2} more</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditLicense(license)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              {license.renewalRequired && (
                <button 
                  onClick={() => handleRenewLicense(license.id)}
                  className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                >
                  Renew
                </button>
              )}
              <button 
                onClick={() => {
                  setAuditForm({...auditForm, licenseId: license.id});
                  setShowAuditModal(true);
                }}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Audit
              </button>
              <button 
                onClick={() => alert(`Viewing compliance history for ${license.id}`)}
                className="text-xs px-2 py-1 text-gray-600 hover:text-gray-900 bg-gray-50 rounded"
              >
                History
              </button>
              <button 
                onClick={() => handleDeleteLicense(license.id)}
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

  const renderRegulations = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-3xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search regulations..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              {complianceStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Priority</option>
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
        </div>
        <button 
          onClick={() => setShowRegulationModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          Add Regulation
        </button>
      </div>

      {/* Regulations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {filteredRegulations.map((regulation) => (
          <div key={regulation.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{regulation.title}</h3>
                <p className="text-xs text-gray-500">{regulation.category} • {regulation.jurisdiction}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getComplianceStatusColor(regulation.complianceStatus)}`}>
                  {regulation.complianceStatus}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(regulation.priority)}`}>
                  {regulation.priority}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Effective Date:</span>
                <span className="text-gray-900 font-medium">{formatDate(regulation.effectiveDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Reviewed:</span>
                <span className="text-gray-900 font-medium">{formatDate(regulation.lastReviewed)}</span>
              </div>
              <div className="flex justify-between">
                <span>Next Review:</span>
                <span className="text-gray-900 font-medium">{formatDate(regulation.nextReview)}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned To:</span>
                <span className="text-gray-900 font-medium truncate">{regulation.assignedTo}</span>
              </div>
            </div>

            {regulation.description && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 line-clamp-2">{regulation.description}</p>
              </div>
            )}

            {regulation.requirements && regulation.requirements.length > 0 && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 font-medium mb-1">Requirements:</p>
                <ul className="text-gray-500 space-y-1">
                  {regulation.requirements.slice(0, 2).map((requirement, index) => (
                    <li key={index} className="truncate">• {requirement}</li>
                  ))}
                  {regulation.requirements.length > 2 && (
                    <li className="text-blue-600">+ {regulation.requirements.length - 2} more</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditRegulation(regulation)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => alert(`Updating compliance status for ${regulation.id}`)}
                className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
              >
                Update Status
              </button>
              <button 
                onClick={() => alert(`Viewing compliance checklist for ${regulation.id}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Checklist
              </button>
              <button 
                onClick={() => handleDeleteRegulation(regulation.id)}
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

  const renderAudits = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Compliance Audits</h2>
        <button 
          onClick={() => setShowAuditModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          Schedule Audit
        </button>
      </div>

      {/* Audits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {audits.map((audit) => (
          <div key={audit.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{audit.licenseName}</h3>
                <p className="text-xs text-gray-500">{audit.id} • {audit.licenseId}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  audit.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  audit.status === 'Action Required' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {audit.status}
                </span>
                <span className="text-xs text-center text-gray-600">{audit.complianceScore}%</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Auditor:</span>
                <span className="text-gray-900 font-medium">{audit.auditorName}</span>
              </div>
              <div className="flex justify-between">
                <span>Audit Date:</span>
                <span className="text-gray-900 font-medium">{formatDate(audit.auditDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="text-gray-900 font-medium">{audit.auditType}</span>
              </div>
              {audit.followUpRequired && (
                <div className="flex justify-between">
                  <span>Follow-up Date:</span>
                  <span className="text-gray-900 font-medium">{formatDate(audit.followUpDate)}</span>
                </div>
              )}
            </div>

            {audit.findings && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 font-medium mb-1">Findings:</p>
                <p className="text-gray-500 line-clamp-2">{audit.findings}</p>
              </div>
            )}

            {audit.recommendations && audit.recommendations.length > 0 && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 font-medium mb-1">Recommendations:</p>
                <ul className="text-gray-500 space-y-1">
                  {audit.recommendations.slice(0, 2).map((recommendation, index) => (
                    <li key={index} className="truncate">• {recommendation}</li>
                  ))}
                  {audit.recommendations.length > 2 && (
                    <li className="text-blue-600">+ {audit.recommendations.length - 2} more</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => alert(`Editing audit ${audit.id}`)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => alert(`Viewing full audit report for ${audit.id}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Full Report
              </button>
              {audit.followUpRequired && (
                <button 
                  onClick={() => alert(`Scheduling follow-up for ${audit.id}`)}
                  className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                >
                  Follow-up
                </button>
              )}
              <button 
                onClick={() => alert(`Printing audit report for ${audit.id}`)}
                className="text-xs px-2 py-1 text-gray-600 hover:text-gray-900 bg-gray-50 rounded"
              >
                Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // License Modal - Mobile Responsive
  const LicenseModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingLicense ? 'Edit License' : 'Add New License'}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">License Type *</label>
                <select
                  value={licenseForm.type}
                  onChange={(e) => setLicenseForm({...licenseForm, type: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  {licenseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">License Number *</label>
                <input
                  type="text"
                  value={licenseForm.licenseNumber}
                  onChange={(e) => setLicenseForm({...licenseForm, licenseNumber: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Issuing Authority *</label>
              <input
                type="text"
                value={licenseForm.issuer}
                onChange={(e) => setLicenseForm({...licenseForm, issuer: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="e.g., California Department of Cannabis Control"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                <input
                  type="date"
                  value={licenseForm.issueDate}
                  onChange={(e) => setLicenseForm({...licenseForm, issueDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={licenseForm.expiryDate}
                  onChange={(e) => setLicenseForm({...licenseForm, expiryDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">License Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={licenseForm.cost}
                  onChange={(e) => setLicenseForm({...licenseForm, cost: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                <input
                  type="text"
                  value={licenseForm.contactPerson}
                  onChange={(e) => setLicenseForm({...licenseForm, contactPerson: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">License Conditions</label>
              <textarea
                value={licenseForm.conditions}
                onChange={(e) => setLicenseForm({...licenseForm, conditions: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Enter each condition on a new line"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={licenseForm.notes}
                onChange={(e) => setLicenseForm({...licenseForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowLicenseModal(false);
                setEditingLicense(null);
                setLicenseForm({
                  type: 'Cultivation License',
                  licenseNumber: '',
                  issuer: '',
                  issueDate: '',
                  expiryDate: '',
                  cost: '',
                  contactPerson: '',
                  conditions: '',
                  notes: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingLicense ? handleUpdateLicense : handleCreateLicense}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingLicense ? 'Update' : 'Add'} License
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Regulation Modal - Mobile Responsive
  const RegulationModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingRegulation ? 'Edit Regulation' : 'Add New Regulation'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Regulation Title *</label>
              <input
                type="text"
                value={regulationForm.title}
                onChange={(e) => setRegulationForm({...regulationForm, title: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category *</label>
                <select
                  value={regulationForm.category}
                  onChange={(e) => setRegulationForm({...regulationForm, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  {regulationCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Jurisdiction *</label>
                <input
                  type="text"
                  value={regulationForm.jurisdiction}
                  onChange={(e) => setRegulationForm({...regulationForm, jurisdiction: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., California"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Effective Date</label>
                <input
                  type="date"
                  value={regulationForm.effectiveDate}
                  onChange={(e) => setRegulationForm({...regulationForm, effectiveDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={regulationForm.description}
                onChange={(e) => setRegulationForm({...regulationForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <textarea
                value={regulationForm.requirements}
                onChange={(e) => setRegulationForm({...regulationForm, requirements: e.target.value})}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Enter each requirement on a new line"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Compliance Status</label>
                <select
                  value={regulationForm.complianceStatus}
                  onChange={(e) => setRegulationForm({...regulationForm, complianceStatus: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {complianceStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={regulationForm.priority}
                  onChange={(e) => setRegulationForm({...regulationForm, priority: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={regulationForm.notes}
                onChange={(e) => setRegulationForm({...regulationForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowRegulationModal(false);
                setEditingRegulation(null);
                setRegulationForm({
                  title: '',
                  category: 'Tracking',
                  jurisdiction: '',
                  effectiveDate: '',
                  description: '',
                  requirements: '',
                  complianceStatus: 'Pending Review',
                  priority: 'Medium',
                  notes: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingRegulation ? handleUpdateRegulation : handleCreateRegulation}
              className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              {editingRegulation ? 'Update' : 'Add'} Regulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Compliance Management</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Manage licenses, regulations, and compliance audits</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'licenses', name: 'Licenses', icon: '📄' },
            { id: 'regulations', name: 'Regulations', icon: '📋' },
            { id: 'audits', name: 'Audits', icon: '🔍' }
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
        {activeTab === 'licenses' && renderLicenses()}
        {activeTab === 'regulations' && renderRegulations()}
        {activeTab === 'audits' && renderAudits()}
      </div>

      {/* Modals */}
      {showLicenseModal && <LicenseModal />}
      {showRegulationModal && <RegulationModal />}
    </div>
  );
};

export default EnhancedComplianceModule;

