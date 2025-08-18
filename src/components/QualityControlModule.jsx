import React, { useState, useEffect } from 'react';

const QualityControlModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTestType, setSelectedTestType] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');

  // Mock quality control data
  const [testResults, setTestResults] = useState([
    {
      id: 'TEST-001',
      batchId: 'BATCH-BD-240815',
      productName: 'Blue Dream - 3.5g',
      productType: 'Flower',
      testType: 'Potency',
      labName: 'Cannabis Testing Lab',
      testDate: '2024-08-15',
      resultDate: '2024-08-17',
      status: 'Passed',
      overallGrade: 'A',
      thcContent: 22.5,
      cbdContent: 0.8,
      moistureContent: 11.2,
      pesticides: 'Not Detected',
      heavyMetals: 'Not Detected',
      microbials: 'Not Detected',
      residualSolvents: 'Not Detected',
      terpenes: [
        { name: 'Myrcene', percentage: 0.85 },
        { name: 'Limonene', percentage: 0.62 },
        { name: 'Pinene', percentage: 0.41 }
      ],
      compliance: true,
      notes: 'All tests passed within acceptable limits',
      coaGenerated: true,
      coaUrl: '/coa/TEST-001.pdf'
    },
    {
      id: 'TEST-002',
      batchId: 'BATCH-OG-240810',
      productName: 'OG Kush Gummies - 10mg',
      productType: 'Edibles',
      testType: 'Full Panel',
      labName: 'Cannabis Testing Lab',
      testDate: '2024-08-10',
      resultDate: '2024-08-12',
      status: 'Passed',
      overallGrade: 'A+',
      thcContent: 9.8,
      cbdContent: 0.2,
      moistureContent: 8.5,
      pesticides: 'Not Detected',
      heavyMetals: 'Not Detected',
      microbials: 'Not Detected',
      residualSolvents: 'Not Detected',
      terpenes: [
        { name: 'Caryophyllene', percentage: 0.45 },
        { name: 'Humulene', percentage: 0.32 }
      ],
      compliance: true,
      notes: 'Excellent quality, all parameters within spec',
      coaGenerated: true,
      coaUrl: '/coa/TEST-002.pdf'
    },
    {
      id: 'TEST-003',
      batchId: 'BATCH-SD-240812',
      productName: 'Sour Diesel Live Resin',
      productType: 'Concentrates',
      testType: 'Potency & Residuals',
      labName: 'Cannabis Testing Lab',
      testDate: '2024-08-12',
      resultDate: '2024-08-14',
      status: 'Failed',
      overallGrade: 'C',
      thcContent: 78.2,
      cbdContent: 1.2,
      moistureContent: 2.1,
      pesticides: 'Detected - Myclobutanil',
      heavyMetals: 'Not Detected',
      microbials: 'Not Detected',
      residualSolvents: 'Ethanol - 150ppm',
      terpenes: [
        { name: 'Terpinolene', percentage: 1.25 },
        { name: 'Myrcene', percentage: 0.95 }
      ],
      compliance: false,
      notes: 'Failed due to pesticide detection above limits',
      coaGenerated: false,
      coaUrl: null
    },
    {
      id: 'TEST-004',
      batchId: 'BATCH-CBD-240808',
      productName: 'CBD Tincture - 1000mg',
      productType: 'Wellness',
      testType: 'Full Panel',
      labName: 'Cannabis Testing Lab',
      testDate: '2024-08-08',
      resultDate: '2024-08-10',
      status: 'Pending',
      overallGrade: null,
      thcContent: null,
      cbdContent: null,
      moistureContent: null,
      pesticides: 'Pending',
      heavyMetals: 'Pending',
      microbials: 'Pending',
      residualSolvents: 'Pending',
      terpenes: [],
      compliance: null,
      notes: 'Test in progress, results expected by EOD',
      coaGenerated: false,
      coaUrl: null
    }
  ]);

  const [batches, setBatches] = useState([
    {
      id: 'BATCH-BD-240815',
      productName: 'Blue Dream - 3.5g',
      batchNumber: 'BD-240815-001',
      productionDate: '2024-08-15',
      expiryDate: '2025-08-15',
      quantity: 500,
      status: 'Released',
      qcStatus: 'Passed',
      testCount: 3,
      passedTests: 3,
      failedTests: 0,
      pendingTests: 0,
      compliance: true,
      releaseDate: '2024-08-18',
      quarantineReason: null
    },
    {
      id: 'BATCH-OG-240810',
      productName: 'OG Kush Gummies - 10mg',
      batchNumber: 'OG-240810-002',
      productionDate: '2024-08-10',
      expiryDate: '2025-02-10',
      quantity: 1000,
      status: 'Released',
      qcStatus: 'Passed',
      testCount: 4,
      passedTests: 4,
      failedTests: 0,
      pendingTests: 0,
      compliance: true,
      releaseDate: '2024-08-13',
      quarantineReason: null
    },
    {
      id: 'BATCH-SD-240812',
      productName: 'Sour Diesel Live Resin',
      batchNumber: 'SD-240812-003',
      productionDate: '2024-08-12',
      expiryDate: '2025-08-12',
      quantity: 200,
      status: 'Quarantined',
      qcStatus: 'Failed',
      testCount: 2,
      passedTests: 1,
      failedTests: 1,
      pendingTests: 0,
      compliance: false,
      releaseDate: null,
      quarantineReason: 'Pesticide detection above acceptable limits'
    },
    {
      id: 'BATCH-CBD-240808',
      productName: 'CBD Tincture - 1000mg',
      batchNumber: 'CBD-240808-004',
      productionDate: '2024-08-08',
      expiryDate: '2025-08-08',
      quantity: 300,
      status: 'Testing',
      qcStatus: 'Pending',
      testCount: 1,
      passedTests: 0,
      failedTests: 0,
      pendingTests: 1,
      compliance: null,
      releaseDate: null,
      quarantineReason: null
    }
  ]);

  const [qcWorkflows, setQcWorkflows] = useState([
    {
      id: 'WF-QC-001',
      name: 'Flower Quality Control',
      description: 'Standard QC workflow for flower products',
      steps: [
        { id: 1, name: 'Visual Inspection', required: true, completed: true },
        { id: 2, name: 'Potency Testing', required: true, completed: true },
        { id: 3, name: 'Pesticide Screening', required: true, completed: true },
        { id: 4, name: 'Microbial Testing', required: true, completed: false },
        { id: 5, name: 'Heavy Metals', required: true, completed: false },
        { id: 6, name: 'COA Generation', required: true, completed: false }
      ],
      currentStep: 4,
      assignedTo: 'QC Team Lead',
      estimatedDuration: '5 days',
      actualDuration: '3 days',
      batchesInWorkflow: 8
    },
    {
      id: 'WF-QC-002',
      name: 'Edibles Quality Control',
      description: 'Comprehensive QC workflow for edible products',
      steps: [
        { id: 1, name: 'Ingredient Verification', required: true, completed: true },
        { id: 2, name: 'Potency Testing', required: true, completed: true },
        { id: 3, name: 'Homogeneity Testing', required: true, completed: true },
        { id: 4, name: 'Pesticide Screening', required: true, completed: true },
        { id: 5, name: 'Microbial Testing', required: true, completed: true },
        { id: 6, name: 'Shelf Life Testing', required: false, completed: false },
        { id: 7, name: 'COA Generation', required: true, completed: true }
      ],
      currentStep: 7,
      assignedTo: 'QC Specialist',
      estimatedDuration: '7 days',
      actualDuration: '6 days',
      batchesInWorkflow: 3
    },
    {
      id: 'WF-QC-003',
      name: 'Concentrate Quality Control',
      description: 'Specialized QC workflow for concentrate products',
      steps: [
        { id: 1, name: 'Visual Inspection', required: true, completed: true },
        { id: 2, name: 'Potency Testing', required: true, completed: true },
        { id: 3, name: 'Residual Solvents', required: true, completed: false },
        { id: 4, name: 'Pesticide Screening', required: true, completed: false },
        { id: 5, name: 'Heavy Metals', required: true, completed: false }
      ],
      currentStep: 3,
      assignedTo: 'Senior QC Analyst',
      estimatedDuration: '4 days',
      actualDuration: '2 days',
      batchesInWorkflow: 2
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalTests: 245,
    passedTests: 218,
    failedTests: 12,
    pendingTests: 15,
    passRate: 89.0,
    avgTestTime: 3.2,
    batchesReleased: 156,
    batchesQuarantined: 8,
    complianceRate: 95.1
  });

  // Filter functions
  const filteredTestResults = testResults.filter(test => {
    const matchesSearch = test.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.batchId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || test.status.toLowerCase() === selectedStatus;
    const matchesTestType = selectedTestType === 'all' || test.testType.toLowerCase().replace(' ', '-') === selectedTestType;
    return matchesSearch && matchesStatus && matchesTestType;
  });

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || batch.status.toLowerCase() === selectedBatch;
    return matchesSearch && matchesBatch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Passed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Released': return 'bg-green-100 text-green-800';
      case 'Quarantined': return 'bg-red-100 text-red-800';
      case 'Testing': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': case 'A': return 'bg-green-100 text-green-800';
      case 'B+': case 'B': return 'bg-blue-100 text-blue-800';
      case 'C+': case 'C': return 'bg-yellow-100 text-yellow-800';
      case 'D': case 'F': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTestTypeIcon = (type) => {
    switch (type) {
      case 'Potency': return '💪';
      case 'Full Panel': return '🧪';
      case 'Pesticides': return '🐛';
      case 'Microbials': return '🦠';
      case 'Heavy Metals': return '⚗️';
      case 'Residuals': return '🧬';
      default: return '🔬';
    }
  };

  const getProductTypeIcon = (type) => {
    switch (type) {
      case 'Flower': return '🌿';
      case 'Edibles': return '🍪';
      case 'Concentrates': return '💎';
      case 'Wellness': return '🌱';
      default: return '📦';
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalTests}</p>
              <p className="text-sm text-blue-600">{analytics.pendingTests} pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pass Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.passRate}%</p>
              <p className="text-sm text-green-600">{analytics.passedTests} passed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Test Time</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.avgTestTime}</p>
              <p className="text-sm text-gray-600">days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliance Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.complianceRate}%</p>
              <p className="text-sm text-gray-600">Regulatory compliance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Quality Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{analytics.passRate}%</div>
              <div className="text-sm text-gray-600">Test Pass Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.passRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{analytics.complianceRate}%</div>
              <div className="text-sm text-gray-600">Compliance Rate</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.complianceRate}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{analytics.avgTestTime}</div>
              <div className="text-sm text-gray-600">Average Test Time (days)</div>
              <div className="text-xs text-gray-500 mt-1">Target: 3.0 days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Test Results Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">Passed Tests</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.passedTests}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">Failed Tests</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.failedTests}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">Pending Tests</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.pendingTests}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Batch Status Summary</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">Released Batches</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.batchesReleased}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">Quarantined Batches</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{analytics.batchesQuarantined}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                  <span className="text-sm text-gray-700">In Testing</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{batches.filter(b => b.status === 'Testing').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Test Results */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Test Results</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {testResults.slice(0, 5).map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getTestTypeIcon(test.testType)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{test.productName}</h4>
                    <p className="text-sm text-gray-600">{test.testType} • {test.batchId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    {test.overallGrade && (
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(test.overallGrade)}`}>
                        Grade {test.overallGrade}
                      </span>
                    )}
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{test.resultDate || test.testDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active QC Workflows */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active QC Workflows</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {qcWorkflows.map((workflow) => (
              <div key={workflow.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                  <span className="text-sm text-blue-600">{workflow.batchesInWorkflow} batches</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">Step {workflow.currentStep} of {workflow.steps.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(workflow.currentStep / workflow.steps.length) * 100}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Assigned: {workflow.assignedTo}</span>
                  <span>Duration: {workflow.actualDuration} / {workflow.estimatedDuration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTestResults = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search test results..."
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
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedTestType}
              onChange={(e) => setSelectedTestType(e.target.value)}
            >
              <option value="all">All Test Types</option>
              <option value="potency">Potency</option>
              <option value="full-panel">Full Panel</option>
              <option value="pesticides">Pesticides</option>
              <option value="microbials">Microbials</option>
              <option value="heavy-metals">Heavy Metals</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Request Test
            </button>
          </div>
        </div>
      </div>

      {/* Test Results List */}
      <div className="space-y-4">
        {filteredTestResults.map((test) => (
          <div key={test.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">{getProductTypeIcon(test.productType)}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{test.productName}</h3>
                  <p className="text-sm text-gray-600">{test.batchId} • {test.testType}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {test.overallGrade && (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(test.overallGrade)}`}>
                    Grade {test.overallGrade}
                  </span>
                )}
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                  {test.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Lab:</p>
                <p className="text-sm text-gray-600">{test.labName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Test Date:</p>
                <p className="text-sm text-gray-600">{test.testDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Result Date:</p>
                <p className="text-sm text-gray-600">{test.resultDate || 'Pending'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Compliance:</p>
                <p className={`text-sm ${test.compliance === true ? 'text-green-600' : test.compliance === false ? 'text-red-600' : 'text-gray-600'}`}>
                  {test.compliance === true ? 'Compliant' : test.compliance === false ? 'Non-Compliant' : 'Pending'}
                </p>
              </div>
            </div>
            
            {test.status !== 'Pending' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">THC Content:</p>
                  <p className="text-sm text-gray-600">{test.thcContent}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">CBD Content:</p>
                  <p className="text-sm text-gray-600">{test.cbdContent}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Moisture:</p>
                  <p className="text-sm text-gray-600">{test.moistureContent}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Pesticides:</p>
                  <p className={`text-sm ${test.pesticides === 'Not Detected' ? 'text-green-600' : 'text-red-600'}`}>
                    {test.pesticides}
                  </p>
                </div>
              </div>
            )}
            
            {test.terpenes && test.terpenes.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Terpene Profile:</p>
                <div className="flex flex-wrap gap-2">
                  {test.terpenes.map((terpene, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                      {terpene.name}: {terpene.percentage}%
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {test.notes && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700">Notes:</p>
                <p className="text-sm text-gray-600">{test.notes}</p>
              </div>
            )}
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              {test.coaGenerated && (
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Download COA
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Retest
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBatches = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search batches..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="released">Released</option>
              <option value="quarantined">Quarantined</option>
              <option value="testing">Testing</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Batch
            </button>
          </div>
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{batch.productName}</h3>
                <p className="text-sm text-gray-600">{batch.batchNumber}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(batch.status)}`}>
                {batch.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Production Date:</span>
                <span className="text-gray-900">{batch.productionDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Quantity:</span>
                <span className="text-gray-900">{batch.quantity} units</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">QC Status:</span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(batch.qcStatus)}`}>
                  {batch.qcStatus}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tests:</span>
                <span className="text-blue-600">{batch.passedTests}/{batch.testCount}</span>
              </div>
              {batch.releaseDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Released:</span>
                  <span className="text-green-600">{batch.releaseDate}</span>
                </div>
              )}
              {batch.quarantineReason && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-red-700">Quarantine Reason:</p>
                  <p className="text-sm text-red-600">{batch.quarantineReason}</p>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Test Results
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search workflows..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-6">
        {qcWorkflows.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                <p className="text-sm text-gray-600">{workflow.description}</p>
              </div>
              <span className="text-sm text-blue-600">{workflow.batchesInWorkflow} batches in workflow</span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">Step {workflow.currentStep} of {workflow.steps.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(workflow.currentStep / workflow.steps.length) * 100}%` }}></div>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Workflow Steps:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {workflow.steps.map((step) => (
                  <div key={step.id} className="flex items-center p-2 border rounded">
                    <input
                      type="checkbox"
                      checked={step.completed}
                      readOnly
                      className="mr-2 h-4 w-4 text-blue-600 rounded"
                    />
                    <span className={`text-sm ${step.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                      {step.name}
                      {step.required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Assigned To:</p>
                <p className="text-sm text-gray-600">{workflow.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Estimated Duration:</p>
                <p className="text-sm text-gray-600">{workflow.estimatedDuration}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Actual Duration:</p>
                <p className="text-sm text-gray-600">{workflow.actualDuration}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Edit Workflow
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                Advance Step
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
          <h1 className="text-3xl font-bold text-gray-900">Quality Control</h1>
          <p className="mt-2 text-gray-600">Manage product testing, batch quality, and compliance</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'test-results', name: 'Test Results', icon: '🧪' },
              { id: 'batches', name: 'Batches', icon: '📦' },
              { id: 'workflows', name: 'Workflows', icon: '🔄' }
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
        {activeTab === 'test-results' && renderTestResults()}
        {activeTab === 'batches' && renderBatches()}
        {activeTab === 'workflows' && renderWorkflows()}
      </div>
    </div>
  );
};

export default QualityControlModule;

