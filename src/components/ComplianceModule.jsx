import React, { useState, useEffect } from 'react';

const ComplianceModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock compliance data
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
      complianceScore: 98.5
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
      complianceScore: 92.3
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
      complianceScore: 96.8
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
      complianceScore: 99.2
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
      lastReview: '2024-08-01',
      nextReview: '2024-11-01',
      assignedTo: 'Compliance Team',
      priority: 'High',
      violations: 0
    },
    {
      id: 'REG-002',
      title: 'Product Testing Requirements',
      category: 'Quality Control',
      jurisdiction: 'California',
      effectiveDate: '2024-01-01',
      description: 'All cannabis products must undergo mandatory testing before sale',
      requirements: [
        'Test for potency (THC/CBD)',
        'Screen for pesticides',
        'Test for heavy metals',
        'Microbial testing required',
        'Certificate of Analysis (COA) mandatory'
      ],
      complianceStatus: 'Compliant',
      lastReview: '2024-07-15',
      nextReview: '2024-10-15',
      assignedTo: 'QC Manager',
      priority: 'Critical',
      violations: 0
    },
    {
      id: 'REG-003',
      title: 'Packaging and Labeling Standards',
      category: 'Packaging',
      jurisdiction: 'California',
      effectiveDate: '2024-01-01',
      description: 'Cannabis products must meet specific packaging and labeling requirements',
      requirements: [
        'Child-resistant packaging',
        'Warning labels required',
        'Potency information displayed',
        'Batch number and test date',
        'Exit packaging for retail'
      ],
      complianceStatus: 'Non-Compliant',
      lastReview: '2024-08-10',
      nextReview: '2024-09-10',
      assignedTo: 'Packaging Team',
      priority: 'High',
      violations: 2
    },
    {
      id: 'REG-004',
      title: 'Security Requirements',
      category: 'Security',
      jurisdiction: 'California',
      effectiveDate: '2024-01-01',
      description: 'Cannabis facilities must maintain specific security measures',
      requirements: [
        '24/7 video surveillance',
        'Alarm systems required',
        'Limited access areas',
        'Background checks for employees',
        'Security plan on file'
      ],
      complianceStatus: 'Compliant',
      lastReview: '2024-06-01',
      nextReview: '2024-12-01',
      assignedTo: 'Security Manager',
      priority: 'Critical',
      violations: 0
    }
  ]);

  const [violations, setViolations] = useState([
    {
      id: 'VIO-001',
      type: 'Minor Violation',
      category: 'Packaging',
      description: 'Missing batch number on 5 product packages',
      discoveredDate: '2024-08-10',
      reportedBy: 'Internal Audit',
      status: 'Resolved',
      severity: 'Low',
      fineAmount: 500.00,
      correctionDeadline: '2024-08-20',
      correctionCompleted: '2024-08-18',
      assignedTo: 'Packaging Team',
      correctiveActions: [
        'Updated packaging procedures',
        'Retrained packaging staff',
        'Implemented quality checks'
      ],
      followUpRequired: false,
      regulatoryBody: 'California DCC'
    },
    {
      id: 'VIO-002',
      type: 'Administrative Violation',
      category: 'Reporting',
      description: 'Late submission of monthly inventory report',
      discoveredDate: '2024-07-05',
      reportedBy: 'California DCC',
      status: 'Resolved',
      severity: 'Medium',
      fineAmount: 1000.00,
      correctionDeadline: '2024-07-15',
      correctionCompleted: '2024-07-12',
      assignedTo: 'Compliance Officer',
      correctiveActions: [
        'Implemented automated reporting',
        'Set up calendar reminders',
        'Assigned backup personnel'
      ],
      followUpRequired: false,
      regulatoryBody: 'California DCC'
    },
    {
      id: 'VIO-003',
      type: 'Serious Violation',
      category: 'Security',
      description: 'Camera malfunction in storage area for 4 hours',
      discoveredDate: '2024-08-12',
      reportedBy: 'Security Audit',
      status: 'Under Review',
      severity: 'High',
      fineAmount: 2500.00,
      correctionDeadline: '2024-08-25',
      correctionCompleted: null,
      assignedTo: 'Security Manager',
      correctiveActions: [
        'Replaced faulty camera equipment',
        'Implemented redundant monitoring',
        'Enhanced maintenance schedule'
      ],
      followUpRequired: true,
      regulatoryBody: 'California DCC'
    }
  ]);

  const [auditTrail, setAuditTrail] = useState([
    {
      id: 'AUDIT-001',
      timestamp: '2024-08-14 14:30:25',
      user: 'Sarah Johnson',
      action: 'License Renewal Submitted',
      module: 'License Management',
      details: 'Distribution License renewal application submitted',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/91.0.4472.124',
      result: 'Success'
    },
    {
      id: 'AUDIT-002',
      timestamp: '2024-08-14 13:15:10',
      user: 'Mike Chen',
      action: 'Violation Status Updated',
      module: 'Violation Management',
      details: 'Updated VIO-001 status to Resolved',
      ipAddress: '192.168.1.101',
      userAgent: 'Firefox/89.0',
      result: 'Success'
    },
    {
      id: 'AUDIT-003',
      timestamp: '2024-08-14 11:45:33',
      user: 'Alex Kim',
      action: 'Regulation Review Completed',
      module: 'Regulation Management',
      details: 'Completed review of REG-003 Packaging Standards',
      ipAddress: '192.168.1.102',
      userAgent: 'Safari/14.1.1',
      result: 'Success'
    },
    {
      id: 'AUDIT-004',
      timestamp: '2024-08-14 09:20:15',
      user: 'Lisa Rodriguez',
      action: 'Compliance Report Generated',
      module: 'Reporting',
      details: 'Generated monthly compliance report for July 2024',
      ipAddress: '192.168.1.103',
      userAgent: 'Chrome/91.0.4472.124',
      result: 'Success'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalLicenses: 4,
    activeLicenses: 3,
    expiringLicenses: 1,
    totalViolations: 15,
    openViolations: 1,
    resolvedViolations: 14,
    complianceScore: 96.2,
    avgResolutionTime: 8.5,
    totalFines: 12500.00,
    upcomingInspections: 2
  });

  // Filter functions
  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = license.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || license.status.toLowerCase().replace(' ', '-') === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredViolations = violations.filter(violation => {
    const matchesSearch = violation.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         violation.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || violation.status.toLowerCase().replace(' ', '-') === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || violation.severity.toLowerCase() === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Renewal Required': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Compliant': return 'bg-green-100 text-green-800';
      case 'Non-Compliant': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Open': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Tracking': return '📍';
      case 'Quality Control': return '🧪';
      case 'Packaging': return '📦';
      case 'Security': return '🔒';
      case 'Reporting': return '📊';
      case 'Licensing': return '📄';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Licenses</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.activeLicenses}</p>
              <p className="text-sm text-blue-600">{analytics.expiringLicenses} expiring soon</p>
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
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.complianceScore}%</p>
              <p className="text-sm text-green-600">Above target</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Violations</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.openViolations}</p>
              <p className="text-sm text-gray-600">{analytics.resolvedViolations} resolved</p>
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
              <p className="text-sm font-medium text-gray-600">Total Fines</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalFines / 1000).toFixed(1)}k</p>
              <p className="text-sm text-gray-600">This year</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Compliance Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.complianceScore}%</div>
              <div className="text-sm text-gray-600">Overall Compliance Score</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.complianceScore}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.avgResolutionTime}</div>
              <div className="text-sm text-gray-600">Avg Resolution Time (days)</div>
              <div className="text-xs text-gray-500 mt-1">Target: 10 days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.upcomingInspections}</div>
              <div className="text-sm text-gray-600">Upcoming Inspections</div>
              <div className="text-xs text-gray-500 mt-1">Next 30 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* License Status */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">License Status</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {licenses.map((license) => (
              <div key={license.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">📄</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{license.type}</h4>
                    <p className="text-sm text-gray-600">{license.licenseNumber}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                      {license.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {license.renewalRequired ? `Renewal due in ${license.daysUntilExpiry} days` : `Expires in ${license.daysUntilExpiry} days`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Violations */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Violations</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {violations.slice(0, 3).map((violation) => (
              <div key={violation.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getCategoryIcon(violation.category)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{violation.description}</h4>
                    <p className="text-sm text-gray-600">{violation.category} • {violation.discoveredDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(violation.severity)}`}>
                      {violation.severity}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(violation.status)}`}>
                      {violation.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">${violation.fineAmount.toFixed(2)} fine</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-yellow-600 font-bold">📅</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Distribution License Renewal</h4>
                  <p className="text-sm text-gray-600">DIST-CA-2024-003</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-red-600 font-medium">Due in 18 days</p>
                <p className="text-sm text-gray-500">Sep 1, 2024</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-bold">🔍</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Manufacturing Facility Inspection</h4>
                  <p className="text-sm text-gray-600">Annual compliance inspection</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600 font-medium">In 128 days</p>
                <p className="text-sm text-gray-500">Jan 1, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLicenses = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search licenses..."
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
              <option value="active">Active</option>
              <option value="renewal-required">Renewal Required</option>
              <option value="expired">Expired</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add License
            </button>
          </div>
        </div>
      </div>

      {/* Licenses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLicenses.map((license) => (
          <div key={license.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{license.type}</h3>
                <p className="text-sm text-gray-600">{license.licenseNumber}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(license.status)}`}>
                {license.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Issuer:</span>
                <span className="text-gray-900">{license.issuer}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Issue Date:</span>
                <span className="text-gray-900">{license.issueDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Expiry Date:</span>
                <span className={`${license.daysUntilExpiry < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                  {license.expiryDate}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Days Until Expiry:</span>
                <span className={`${license.daysUntilExpiry < 30 ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                  {license.daysUntilExpiry} days
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cost:</span>
                <span className="text-green-600">${license.cost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Compliance Score:</span>
                <span className="text-blue-600">{license.complianceScore}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Violations:</span>
                <span className={`${license.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {license.violations}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Conditions:</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {license.conditions.map((condition, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              {license.renewalRequired && (
                <button className="flex-1 px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700">
                  Renew License
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderViolations = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search violations..."
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
              <option value="open">Open</option>
              <option value="under-review">Under Review</option>
              <option value="resolved">Resolved</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Report Violation
            </button>
          </div>
        </div>
      </div>

      {/* Violations List */}
      <div className="space-y-4">
        {filteredViolations.map((violation) => (
          <div key={violation.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getCategoryIcon(violation.category)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{violation.type}</h3>
                  <p className="text-sm text-gray-600">{violation.category} • {violation.discoveredDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(violation.severity)}`}>
                  {violation.severity}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(violation.status)}`}>
                  {violation.status}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{violation.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Reported By:</p>
                <p className="text-sm text-gray-600">{violation.reportedBy}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Fine Amount:</p>
                <p className="text-sm text-red-600">${violation.fineAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Correction Deadline:</p>
                <p className="text-sm text-gray-600">{violation.correctionDeadline}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Assigned To:</p>
                <p className="text-sm text-gray-600">{violation.assignedTo}</p>
              </div>
            </div>
            
            {violation.correctiveActions && violation.correctiveActions.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Corrective Actions:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {violation.correctiveActions.map((action, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Update Status
              </button>
              {violation.status !== 'Resolved' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Mark Resolved
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAuditTrail = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search audit trail..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Export Audit Log
            </button>
          </div>
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Audit Trail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {auditTrail.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.module}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{entry.details}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      entry.result === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {entry.result}
                    </span>
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
          <h1 className="text-3xl font-bold text-gray-900">Compliance Management</h1>
          <p className="mt-2 text-gray-600">Manage licenses, regulations, violations, and compliance tracking</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'licenses', name: 'Licenses', icon: '📄' },
              { id: 'violations', name: 'Violations', icon: '⚠️' },
              { id: 'audit-trail', name: 'Audit Trail', icon: '📋' }
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
        {activeTab === 'licenses' && renderLicenses()}
        {activeTab === 'violations' && renderViolations()}
        {activeTab === 'audit-trail' && renderAuditTrail()}
      </div>
    </div>
  );
};

export default ComplianceModule;

