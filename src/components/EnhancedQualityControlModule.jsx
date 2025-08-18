import React, { useState, useEffect, useMemo } from 'react';

const EnhancedQualityControlModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTestType, setSelectedTestType] = useState('all');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [showTestModal, setShowTestModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showInspectionModal, setShowInspectionModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [editingBatch, setEditingBatch] = useState(null);

  // Form states
  const [testForm, setTestForm] = useState({
    batchId: '',
    productName: '',
    productType: 'Flower',
    testType: 'Potency',
    labName: '',
    testDate: '',
    thcContent: '',
    cbdContent: '',
    moistureContent: '',
    pesticides: 'Not Detected',
    heavyMetals: 'Not Detected',
    microbials: 'Not Detected',
    residualSolvents: 'Not Detected',
    notes: ''
  });

  const [batchForm, setBatchForm] = useState({
    productName: '',
    productType: 'Flower',
    batchSize: '',
    harvestDate: '',
    processDate: '',
    expiryDate: '',
    supplier: '',
    location: '',
    status: 'In Production',
    notes: ''
  });

  const [inspectionForm, setInspectionForm] = useState({
    batchId: '',
    inspectorName: '',
    inspectionDate: '',
    inspectionType: 'Visual',
    visualAppearance: '',
    aroma: '',
    texture: '',
    color: '',
    overallRating: '5',
    defects: '',
    recommendations: '',
    passed: true
  });

  // Mock data with mobile-responsive considerations
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
      coaUrl: '/coa/TEST-001.pdf',
      createdBy: 'Lab Technician',
      lastUpdated: '2024-08-17'
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
      coaUrl: '/coa/TEST-002.pdf',
      createdBy: 'Lab Technician',
      lastUpdated: '2024-08-12'
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
      coaUrl: null,
      createdBy: 'Lab Technician',
      lastUpdated: '2024-08-14'
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
      status: 'Passed',
      overallGrade: 'A',
      thcContent: 0.3,
      cbdContent: 33.2,
      moistureContent: 5.8,
      pesticides: 'Not Detected',
      heavyMetals: 'Not Detected',
      microbials: 'Not Detected',
      residualSolvents: 'Not Detected',
      terpenes: [
        { name: 'Linalool', percentage: 0.28 },
        { name: 'Beta-Pinene', percentage: 0.15 }
      ],
      compliance: true,
      notes: 'High CBD content, excellent for wellness products',
      coaGenerated: true,
      coaUrl: '/coa/TEST-004.pdf',
      createdBy: 'Lab Technician',
      lastUpdated: '2024-08-10'
    },
    {
      id: 'TEST-005',
      batchId: 'BATCH-WW-240805',
      productName: 'White Widow Pre-Roll',
      productType: 'Pre-Rolls',
      testType: 'Potency',
      labName: 'Cannabis Testing Lab',
      testDate: '2024-08-05',
      resultDate: '2024-08-07',
      status: 'Passed',
      overallGrade: 'B+',
      thcContent: 19.8,
      cbdContent: 0.5,
      moistureContent: 12.1,
      pesticides: 'Not Detected',
      heavyMetals: 'Not Detected',
      microbials: 'Not Detected',
      residualSolvents: 'Not Detected',
      terpenes: [
        { name: 'Myrcene', percentage: 0.72 },
        { name: 'Caryophyllene', percentage: 0.58 }
      ],
      compliance: true,
      notes: 'Good quality flower, slightly high moisture content',
      coaGenerated: true,
      coaUrl: '/coa/TEST-005.pdf',
      createdBy: 'Lab Technician',
      lastUpdated: '2024-08-07'
    },
    {
      id: 'TEST-006',
      batchId: 'BATCH-GG-240803',
      productName: 'Gorilla Glue Shatter',
      productType: 'Concentrates',
      testType: 'Full Panel',
      labName: 'Cannabis Testing Lab',
      testDate: '2024-08-03',
      resultDate: '2024-08-05',
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
      notes: 'Test results pending from laboratory',
      coaGenerated: false,
      coaUrl: null,
      createdBy: 'Lab Technician',
      lastUpdated: '2024-08-03'
    }
  ]);

  const [batches, setBatches] = useState([
    {
      id: 'BATCH-BD-240815',
      productName: 'Blue Dream - 3.5g',
      productType: 'Flower',
      batchSize: '50 lbs',
      harvestDate: '2024-07-20',
      processDate: '2024-08-01',
      expiryDate: '2025-08-01',
      supplier: 'Green Valley Farms',
      location: 'Warehouse A - Section 2',
      status: 'Released',
      qcStatus: 'Passed',
      testCount: 3,
      lastTested: '2024-08-17',
      notes: 'Premium indoor flower, excellent trichome coverage',
      createdBy: 'Production Manager',
      createdDate: '2024-08-01'
    },
    {
      id: 'BATCH-OG-240810',
      productName: 'OG Kush Gummies - 10mg',
      productType: 'Edibles',
      batchSize: '1000 units',
      harvestDate: '2024-07-15',
      processDate: '2024-08-05',
      expiryDate: '2025-02-05',
      supplier: 'Edible Creations Co',
      location: 'Warehouse B - Section 1',
      status: 'Released',
      qcStatus: 'Passed',
      testCount: 2,
      lastTested: '2024-08-12',
      notes: 'Consistent dosing, excellent flavor profile',
      createdBy: 'Production Manager',
      createdDate: '2024-08-05'
    },
    {
      id: 'BATCH-SD-240812',
      productName: 'Sour Diesel Live Resin',
      productType: 'Concentrates',
      batchSize: '500g',
      harvestDate: '2024-07-25',
      processDate: '2024-08-10',
      expiryDate: '2025-08-10',
      supplier: 'Extract Masters',
      location: 'Warehouse C - Section 3',
      status: 'Quarantined',
      qcStatus: 'Failed',
      testCount: 1,
      lastTested: '2024-08-14',
      notes: 'Failed QC due to pesticide detection, investigating source',
      createdBy: 'Production Manager',
      createdDate: '2024-08-10'
    },
    {
      id: 'BATCH-CBD-240808',
      productName: 'CBD Tincture - 1000mg',
      productType: 'Wellness',
      batchSize: '200 bottles',
      harvestDate: '2024-07-10',
      processDate: '2024-08-03',
      expiryDate: '2026-08-03',
      supplier: 'Wellness Extracts',
      location: 'Warehouse A - Section 4',
      status: 'Released',
      qcStatus: 'Passed',
      testCount: 2,
      lastTested: '2024-08-10',
      notes: 'High-quality CBD extract, excellent bioavailability',
      createdBy: 'Production Manager',
      createdDate: '2024-08-03'
    },
    {
      id: 'BATCH-WW-240805',
      productName: 'White Widow Pre-Roll',
      productType: 'Pre-Rolls',
      batchSize: '500 units',
      harvestDate: '2024-07-18',
      processDate: '2024-08-02',
      expiryDate: '2025-02-02',
      supplier: 'Rolling Papers Co',
      location: 'Warehouse B - Section 2',
      status: 'Released',
      qcStatus: 'Passed',
      testCount: 1,
      lastTested: '2024-08-07',
      notes: 'Consistent roll quality, good burn characteristics',
      createdBy: 'Production Manager',
      createdDate: '2024-08-02'
    },
    {
      id: 'BATCH-GG-240803',
      productName: 'Gorilla Glue Shatter',
      productType: 'Concentrates',
      batchSize: '300g',
      harvestDate: '2024-07-22',
      processDate: '2024-08-01',
      expiryDate: '2025-08-01',
      supplier: 'Shatter Solutions',
      location: 'Warehouse C - Section 1',
      status: 'In Testing',
      qcStatus: 'Pending',
      testCount: 1,
      lastTested: '2024-08-05',
      notes: 'Awaiting full panel test results from laboratory',
      createdBy: 'Production Manager',
      createdDate: '2024-08-01'
    }
  ]);

  const [inspections, setInspections] = useState([
    {
      id: 'INSP-001',
      batchId: 'BATCH-BD-240815',
      productName: 'Blue Dream - 3.5g',
      inspectorName: 'Sarah Johnson',
      inspectionDate: '2024-08-16',
      inspectionType: 'Visual',
      visualAppearance: 'Dense, frosty buds with vibrant green color',
      aroma: 'Sweet berry with earthy undertones',
      texture: 'Firm, sticky, well-cured',
      color: 'Bright green with orange pistils',
      overallRating: '9',
      defects: 'None observed',
      recommendations: 'Excellent quality, ready for packaging',
      passed: true,
      notes: 'Premium quality flower, exceeds standards',
      createdBy: 'Sarah Johnson',
      createdDate: '2024-08-16'
    },
    {
      id: 'INSP-002',
      batchId: 'BATCH-OG-240810',
      productName: 'OG Kush Gummies - 10mg',
      inspectorName: 'Mike Chen',
      inspectionDate: '2024-08-11',
      inspectionType: 'Physical',
      visualAppearance: 'Uniform shape and size, consistent color',
      aroma: 'Pleasant fruity scent with subtle cannabis notes',
      texture: 'Soft, chewy, appropriate consistency',
      color: 'Consistent amber color throughout batch',
      overallRating: '8',
      defects: 'Minor variation in size (within tolerance)',
      recommendations: 'Approved for distribution',
      passed: true,
      notes: 'Good batch consistency, meets quality standards',
      createdBy: 'Mike Chen',
      createdDate: '2024-08-11'
    },
    {
      id: 'INSP-003',
      batchId: 'BATCH-SD-240812',
      productName: 'Sour Diesel Live Resin',
      inspectorName: 'Alex Kim',
      inspectionDate: '2024-08-13',
      inspectionType: 'Visual',
      visualAppearance: 'Golden amber color, good clarity',
      aroma: 'Strong diesel scent with citrus notes',
      texture: 'Proper consistency for live resin',
      color: 'Golden amber, no discoloration',
      overallRating: '7',
      defects: 'Slight cloudiness in some samples',
      recommendations: 'Send for additional testing before release',
      passed: false,
      notes: 'Visual inspection passed but requires lab confirmation',
      createdBy: 'Alex Kim',
      createdDate: '2024-08-13'
    }
  ]);

  const [labs] = useState([
    'Cannabis Testing Lab',
    'Green Leaf Analytics',
    'Pure Cannabis Labs',
    'Terpene Testing Solutions',
    'Quality Assurance Labs'
  ]);

  const [inspectors] = useState([
    'Sarah Johnson',
    'Mike Chen',
    'Alex Kim',
    'Lisa Rodriguez',
    'David Wilson'
  ]);

  const [productTypes] = useState([
    'Flower',
    'Edibles',
    'Concentrates',
    'Pre-Rolls',
    'Wellness',
    'Topicals',
    'Vapes'
  ]);

  const [testTypes] = useState([
    'Potency',
    'Pesticides',
    'Heavy Metals',
    'Microbials',
    'Residual Solvents',
    'Terpenes',
    'Full Panel',
    'Potency & Residuals'
  ]);

  const [inspectionTypes] = useState([
    'Visual',
    'Physical',
    'Sensory',
    'Packaging',
    'Weight',
    'Comprehensive'
  ]);

  const [statuses] = useState(['Passed', 'Failed', 'Pending', 'In Progress']);
  const [batchStatuses] = useState(['In Production', 'In Testing', 'Quarantined', 'Released', 'Recalled']);

  // Filter functions
  const filteredTestResults = useMemo(() => {
    return testResults.filter(test => {
      const matchesSearch = test.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || test.status === selectedStatus;
      const matchesTestType = selectedTestType === 'all' || test.testType === selectedTestType;
      const matchesBatch = selectedBatch === 'all' || test.batchId === selectedBatch;
      
      return matchesSearch && matchesStatus && matchesTestType && matchesBatch;
    });
  }, [testResults, searchTerm, selectedStatus, selectedTestType, selectedBatch]);

  // Test Result CRUD Operations
  const handleCreateTest = () => {
    if (!testForm.batchId || !testForm.productName || !testForm.testType) {
      alert('Please fill in required fields (Batch ID, Product Name, Test Type)');
      return;
    }

    const newTest = {
      id: `TEST-${String(testResults.length + 1).padStart(3, '0')}`,
      batchId: testForm.batchId,
      productName: testForm.productName,
      productType: testForm.productType,
      testType: testForm.testType,
      labName: testForm.labName,
      testDate: testForm.testDate,
      resultDate: null,
      status: 'Pending',
      overallGrade: null,
      thcContent: testForm.thcContent ? parseFloat(testForm.thcContent) : null,
      cbdContent: testForm.cbdContent ? parseFloat(testForm.cbdContent) : null,
      moistureContent: testForm.moistureContent ? parseFloat(testForm.moistureContent) : null,
      pesticides: testForm.pesticides,
      heavyMetals: testForm.heavyMetals,
      microbials: testForm.microbials,
      residualSolvents: testForm.residualSolvents,
      terpenes: [],
      compliance: null,
      notes: testForm.notes,
      coaGenerated: false,
      coaUrl: null,
      createdBy: 'Current User',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setTestResults([...testResults, newTest]);
    setTestForm({
      batchId: '',
      productName: '',
      productType: 'Flower',
      testType: 'Potency',
      labName: '',
      testDate: '',
      thcContent: '',
      cbdContent: '',
      moistureContent: '',
      pesticides: 'Not Detected',
      heavyMetals: 'Not Detected',
      microbials: 'Not Detected',
      residualSolvents: 'Not Detected',
      notes: ''
    });
    setShowTestModal(false);
    alert('Test record created successfully!');
  };

  const handleEditTest = (test) => {
    setEditingTest(test);
    setTestForm({
      batchId: test.batchId,
      productName: test.productName,
      productType: test.productType,
      testType: test.testType,
      labName: test.labName,
      testDate: test.testDate,
      thcContent: test.thcContent ? test.thcContent.toString() : '',
      cbdContent: test.cbdContent ? test.cbdContent.toString() : '',
      moistureContent: test.moistureContent ? test.moistureContent.toString() : '',
      pesticides: test.pesticides,
      heavyMetals: test.heavyMetals,
      microbials: test.microbials,
      residualSolvents: test.residualSolvents,
      notes: test.notes
    });
    setShowTestModal(true);
  };

  const handleUpdateTest = () => {
    if (!testForm.batchId || !testForm.productName || !testForm.testType) {
      alert('Please fill in required fields (Batch ID, Product Name, Test Type)');
      return;
    }

    const updatedTests = testResults.map(test =>
      test.id === editingTest.id
        ? { 
            ...test, 
            batchId: testForm.batchId,
            productName: testForm.productName,
            productType: testForm.productType,
            testType: testForm.testType,
            labName: testForm.labName,
            testDate: testForm.testDate,
            thcContent: testForm.thcContent ? parseFloat(testForm.thcContent) : test.thcContent,
            cbdContent: testForm.cbdContent ? parseFloat(testForm.cbdContent) : test.cbdContent,
            moistureContent: testForm.moistureContent ? parseFloat(testForm.moistureContent) : test.moistureContent,
            pesticides: testForm.pesticides,
            heavyMetals: testForm.heavyMetals,
            microbials: testForm.microbials,
            residualSolvents: testForm.residualSolvents,
            notes: testForm.notes,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : test
    );

    setTestResults(updatedTests);
    setEditingTest(null);
    setTestForm({
      batchId: '',
      productName: '',
      productType: 'Flower',
      testType: 'Potency',
      labName: '',
      testDate: '',
      thcContent: '',
      cbdContent: '',
      moistureContent: '',
      pesticides: 'Not Detected',
      heavyMetals: 'Not Detected',
      microbials: 'Not Detected',
      residualSolvents: 'Not Detected',
      notes: ''
    });
    setShowTestModal(false);
    alert('Test record updated successfully!');
  };

  const handleDeleteTest = (testId) => {
    if (window.confirm('Are you sure you want to delete this test record? This action cannot be undone.')) {
      setTestResults(testResults.filter(test => test.id !== testId));
      alert('Test record deleted successfully!');
    }
  };

  const handleApproveTest = (testId) => {
    const updatedTests = testResults.map(test =>
      test.id === testId
        ? { 
            ...test, 
            status: 'Passed',
            compliance: true,
            resultDate: new Date().toISOString().split('T')[0],
            overallGrade: 'A',
            coaGenerated: true,
            coaUrl: `/coa/${testId}.pdf`,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : test
    );
    setTestResults(updatedTests);
    alert('Test approved and COA generated!');
  };

  const handleRejectTest = (testId) => {
    const updatedTests = testResults.map(test =>
      test.id === testId
        ? { 
            ...test, 
            status: 'Failed',
            compliance: false,
            resultDate: new Date().toISOString().split('T')[0],
            overallGrade: 'F',
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : test
    );
    setTestResults(updatedTests);
    alert('Test rejected due to non-compliance!');
  };

  // Batch CRUD Operations
  const handleCreateBatch = () => {
    if (!batchForm.productName || !batchForm.batchSize) {
      alert('Please fill in required fields (Product Name, Batch Size)');
      return;
    }

    const newBatch = {
      id: `BATCH-${batchForm.productType.substr(0, 2).toUpperCase()}-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}`,
      productName: batchForm.productName,
      productType: batchForm.productType,
      batchSize: batchForm.batchSize,
      harvestDate: batchForm.harvestDate,
      processDate: batchForm.processDate,
      expiryDate: batchForm.expiryDate,
      supplier: batchForm.supplier,
      location: batchForm.location,
      status: batchForm.status,
      qcStatus: 'Pending',
      testCount: 0,
      lastTested: null,
      notes: batchForm.notes,
      createdBy: 'Current User',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setBatches([...batches, newBatch]);
    setBatchForm({
      productName: '',
      productType: 'Flower',
      batchSize: '',
      harvestDate: '',
      processDate: '',
      expiryDate: '',
      supplier: '',
      location: '',
      status: 'In Production',
      notes: ''
    });
    setShowBatchModal(false);
    alert('Batch created successfully!');
  };

  const handleEditBatch = (batch) => {
    setEditingBatch(batch);
    setBatchForm({
      productName: batch.productName,
      productType: batch.productType,
      batchSize: batch.batchSize,
      harvestDate: batch.harvestDate,
      processDate: batch.processDate,
      expiryDate: batch.expiryDate,
      supplier: batch.supplier,
      location: batch.location,
      status: batch.status,
      notes: batch.notes
    });
    setShowBatchModal(true);
  };

  const handleUpdateBatch = () => {
    if (!batchForm.productName || !batchForm.batchSize) {
      alert('Please fill in required fields (Product Name, Batch Size)');
      return;
    }

    const updatedBatches = batches.map(batch =>
      batch.id === editingBatch.id
        ? { 
            ...batch, 
            productName: batchForm.productName,
            productType: batchForm.productType,
            batchSize: batchForm.batchSize,
            harvestDate: batchForm.harvestDate,
            processDate: batchForm.processDate,
            expiryDate: batchForm.expiryDate,
            supplier: batchForm.supplier,
            location: batchForm.location,
            status: batchForm.status,
            notes: batchForm.notes
          }
        : batch
    );

    setBatches(updatedBatches);
    setEditingBatch(null);
    setBatchForm({
      productName: '',
      productType: 'Flower',
      batchSize: '',
      harvestDate: '',
      processDate: '',
      expiryDate: '',
      supplier: '',
      location: '',
      status: 'In Production',
      notes: ''
    });
    setShowBatchModal(false);
    alert('Batch updated successfully!');
  };

  const handleDeleteBatch = (batchId) => {
    // Check if batch has test results
    const batchTests = testResults.filter(test => test.batchId === batchId);
    if (batchTests.length > 0) {
      alert('Cannot delete batch with existing test results. Please delete test results first.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this batch? This action cannot be undone.')) {
      setBatches(batches.filter(batch => batch.id !== batchId));
      alert('Batch deleted successfully!');
    }
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Passed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatchStatusColor = (status) => {
    switch (status) {
      case 'Released': return 'bg-green-100 text-green-800';
      case 'Quarantined': return 'bg-red-100 text-red-800';
      case 'In Testing': return 'bg-blue-100 text-blue-800';
      case 'In Production': return 'bg-yellow-100 text-yellow-800';
      case 'Recalled': return 'bg-red-100 text-red-800';
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

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const formatPercentage = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `${value}%`;
  };

  // Dashboard calculations
  const totalTests = testResults.length;
  const passedTests = testResults.filter(test => test.status === 'Passed').length;
  const failedTests = testResults.filter(test => test.status === 'Failed').length;
  const pendingTests = testResults.filter(test => test.status === 'Pending').length;
  const passRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : 0;
  const totalBatches = batches.length;
  const releasedBatches = batches.filter(batch => batch.status === 'Released').length;
  const quarantinedBatches = batches.filter(batch => batch.status === 'Quarantined').length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics - Mobile Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Tests</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalTests}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{passedTests} passed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Pass Rate</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{passRate}%</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">Quality standard</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Batches</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalBatches}</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">{releasedBatches} released</p>
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
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Failed Tests</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{failedTests}</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">{quarantinedBatches} quarantined</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Test Results and Batch Status - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Recent Test Results</h3>
          <div className="space-y-3">
            {testResults
              .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
              .slice(0, 5)
              .map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className={`p-2 rounded-lg ${getStatusColor(test.status).replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 bg-')}`}>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm truncate">{test.productName}</h4>
                      <p className="text-xs text-gray-600 truncate">{test.batchId} • {test.testType}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                          {test.status}
                        </span>
                        {test.overallGrade && (
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(test.overallGrade)}`}>
                            Grade {test.overallGrade}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-sm font-medium text-gray-900">{test.id}</p>
                    <p className="text-xs text-gray-500">{formatDate(test.lastUpdated)}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Batch Status Overview</h3>
          <div className="space-y-4">
            {batches
              .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
              .slice(0, 5)
              .map((batch) => (
                <div key={batch.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate">{batch.productName}</span>
                    <span className="text-gray-900 font-medium">{batch.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBatchStatusColor(batch.status)}`}>
                      {batch.status}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(batch.qcStatus)}`}>
                      QC: {batch.qcStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{batch.batchSize} • {batch.testCount} tests</span>
                    <span className="text-gray-900 font-medium">{formatDate(batch.lastTested)}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Quick Actions and Quality Tips - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowTestModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Create Test Record
            </button>
            <button
              onClick={() => setShowBatchModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Add Batch
            </button>
            <button
              onClick={() => setShowInspectionModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              Schedule Inspection
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quality Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Test every batch before release</p>
            <p>• Maintain proper storage conditions</p>
            <p>• Document all quality issues</p>
            <p>• Regular equipment calibration</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Compliance Metrics</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pass Rate:</span>
              <span className="text-green-600 font-medium">{passRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Tests:</span>
              <span className="text-yellow-600 font-medium">{pendingTests}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">COAs Generated:</span>
              <span className="text-blue-600 font-medium">{testResults.filter(t => t.coaGenerated).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTestResults = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-3xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search tests..."
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
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={selectedTestType}
              onChange={(e) => setSelectedTestType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Test Types</option>
              {testTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowTestModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Create Test
          </button>
        </div>
      </div>

      {/* Test Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredTestResults.map((test) => (
          <div key={test.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{test.productName}</h3>
                <p className="text-xs text-gray-500">{test.id} • {test.batchId}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(test.status)}`}>
                  {test.status}
                </span>
                {test.overallGrade && (
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGradeColor(test.overallGrade)}`}>
                    {test.overallGrade}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Test Type:</span>
                <span className="text-gray-900 font-medium">{test.testType}</span>
              </div>
              <div className="flex justify-between">
                <span>Lab:</span>
                <span className="text-gray-900 font-medium truncate">{test.labName}</span>
              </div>
              <div className="flex justify-between">
                <span>Test Date:</span>
                <span className="text-gray-900 font-medium">{formatDate(test.testDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Result Date:</span>
                <span className="text-gray-900 font-medium">{formatDate(test.resultDate)}</span>
              </div>
              {test.thcContent !== null && (
                <div className="flex justify-between">
                  <span>THC:</span>
                  <span className="text-gray-900 font-medium">{formatPercentage(test.thcContent)}</span>
                </div>
              )}
              {test.cbdContent !== null && (
                <div className="flex justify-between">
                  <span>CBD:</span>
                  <span className="text-gray-900 font-medium">{formatPercentage(test.cbdContent)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Compliance:</span>
                <span className={`font-medium ${test.compliance ? 'text-green-600' : test.compliance === false ? 'text-red-600' : 'text-gray-900'}`}>
                  {test.compliance === null ? 'Pending' : test.compliance ? 'Yes' : 'No'}
                </span>
              </div>
            </div>

            {test.notes && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600 line-clamp-2">{test.notes}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditTest(test)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              {test.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => handleApproveTest(test.id)}
                    className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleRejectTest(test.id)}
                    className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
                  >
                    Reject
                  </button>
                </>
              )}
              {test.coaGenerated && (
                <button 
                  onClick={() => alert(`Downloading COA for ${test.id}`)}
                  className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
                >
                  COA
                </button>
              )}
              <button 
                onClick={() => handleDeleteTest(test.id)}
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

  const renderBatches = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Batch Management</h2>
        <button 
          onClick={() => setShowBatchModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          Add Batch
        </button>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{batch.productName}</h3>
                <p className="text-xs text-gray-500">{batch.id} • {batch.productType}</p>
              </div>
              <div className="flex flex-col space-y-1 ml-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBatchStatusColor(batch.status)}`}>
                  {batch.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(batch.qcStatus)}`}>
                  QC: {batch.qcStatus}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Batch Size:</span>
                <span className="text-gray-900 font-medium">{batch.batchSize}</span>
              </div>
              <div className="flex justify-between">
                <span>Supplier:</span>
                <span className="text-gray-900 font-medium truncate">{batch.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-gray-900 font-medium truncate">{batch.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Harvest Date:</span>
                <span className="text-gray-900 font-medium">{formatDate(batch.harvestDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Expiry Date:</span>
                <span className={`font-medium ${
                  batch.expiryDate && new Date(batch.expiryDate) < new Date(Date.now() + 30*24*60*60*1000) 
                    ? 'text-red-600' 
                    : 'text-gray-900'
                }`}>
                  {formatDate(batch.expiryDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tests:</span>
                <span className="text-gray-900 font-medium">{batch.testCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Tested:</span>
                <span className="text-gray-900 font-medium">{formatDate(batch.lastTested)}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => handleEditBatch(batch)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => {
                  setTestForm({...testForm, batchId: batch.id, productName: batch.productName, productType: batch.productType});
                  setShowTestModal(true);
                }}
                className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
              >
                Add Test
              </button>
              <button 
                onClick={() => alert(`Viewing test history for ${batch.id}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                History
              </button>
              <button 
                onClick={() => handleDeleteBatch(batch.id)}
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

  const renderInspections = () => (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Quality Inspections</h2>
        <button 
          onClick={() => setShowInspectionModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          Schedule Inspection
        </button>
      </div>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {inspections.map((inspection) => (
          <div key={inspection.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm truncate">{inspection.productName}</h3>
                <p className="text-xs text-gray-500">{inspection.id} • {inspection.batchId}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                inspection.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {inspection.passed ? 'Passed' : 'Failed'}
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-500 mb-3">
              <div className="flex justify-between">
                <span>Inspector:</span>
                <span className="text-gray-900 font-medium">{inspection.inspectorName}</span>
              </div>
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="text-gray-900 font-medium">{formatDate(inspection.inspectionDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="text-gray-900 font-medium">{inspection.inspectionType}</span>
              </div>
              <div className="flex justify-between">
                <span>Rating:</span>
                <span className="text-gray-900 font-medium">{inspection.overallRating}/10</span>
              </div>
            </div>

            {inspection.visualAppearance && (
              <div className="mb-2 text-xs">
                <p className="text-gray-600"><strong>Appearance:</strong> {inspection.visualAppearance}</p>
              </div>
            )}

            {inspection.defects && (
              <div className="mb-2 text-xs">
                <p className="text-gray-600"><strong>Defects:</strong> {inspection.defects}</p>
              </div>
            )}

            {inspection.recommendations && (
              <div className="mb-3 text-xs">
                <p className="text-gray-600"><strong>Recommendations:</strong> {inspection.recommendations}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-1">
              <button 
                onClick={() => alert(`Editing inspection ${inspection.id}`)}
                className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => alert(`Viewing full report for ${inspection.id}`)}
                className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
              >
                Full Report
              </button>
              <button 
                onClick={() => alert(`Printing inspection report for ${inspection.id}`)}
                className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
              >
                Print
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Test Modal - Mobile Responsive
  const TestModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingTest ? 'Edit Test Record' : 'Create New Test Record'}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch ID *</label>
                <select
                  value={testForm.batchId}
                  onChange={(e) => {
                    const selectedBatch = batches.find(b => b.id === e.target.value);
                    setTestForm({
                      ...testForm, 
                      batchId: e.target.value,
                      productName: selectedBatch ? selectedBatch.productName : testForm.productName,
                      productType: selectedBatch ? selectedBatch.productType : testForm.productType
                    });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  <option value="">Select Batch</option>
                  {batches.map(batch => (
                    <option key={batch.id} value={batch.id}>{batch.id} - {batch.productName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                <input
                  type="text"
                  value={testForm.productName}
                  onChange={(e) => setTestForm({...testForm, productName: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Type</label>
                <select
                  value={testForm.productType}
                  onChange={(e) => setTestForm({...testForm, productType: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {productTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Test Type *</label>
                <select
                  value={testForm.testType}
                  onChange={(e) => setTestForm({...testForm, testType: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                >
                  {testTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Lab Name</label>
                <select
                  value={testForm.labName}
                  onChange={(e) => setTestForm({...testForm, labName: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="">Select Lab</option>
                  {labs.map(lab => (
                    <option key={lab} value={lab}>{lab}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Test Date</label>
                <input
                  type="date"
                  value={testForm.testDate}
                  onChange={(e) => setTestForm({...testForm, testDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">THC Content (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={testForm.thcContent}
                  onChange={(e) => setTestForm({...testForm, thcContent: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CBD Content (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={testForm.cbdContent}
                  onChange={(e) => setTestForm({...testForm, cbdContent: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Moisture (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={testForm.moistureContent}
                  onChange={(e) => setTestForm({...testForm, moistureContent: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pesticides</label>
                <select
                  value={testForm.pesticides}
                  onChange={(e) => setTestForm({...testForm, pesticides: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Not Detected">Not Detected</option>
                  <option value="Detected - Within Limits">Detected - Within Limits</option>
                  <option value="Detected - Above Limits">Detected - Above Limits</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Heavy Metals</label>
                <select
                  value={testForm.heavyMetals}
                  onChange={(e) => setTestForm({...testForm, heavyMetals: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Not Detected">Not Detected</option>
                  <option value="Detected - Within Limits">Detected - Within Limits</option>
                  <option value="Detected - Above Limits">Detected - Above Limits</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Microbials</label>
                <select
                  value={testForm.microbials}
                  onChange={(e) => setTestForm({...testForm, microbials: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Not Detected">Not Detected</option>
                  <option value="Detected - Within Limits">Detected - Within Limits</option>
                  <option value="Detected - Above Limits">Detected - Above Limits</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Residual Solvents</label>
                <select
                  value={testForm.residualSolvents}
                  onChange={(e) => setTestForm({...testForm, residualSolvents: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Not Detected">Not Detected</option>
                  <option value="Detected - Within Limits">Detected - Within Limits</option>
                  <option value="Detected - Above Limits">Detected - Above Limits</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={testForm.notes}
                onChange={(e) => setTestForm({...testForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowTestModal(false);
                setEditingTest(null);
                setTestForm({
                  batchId: '',
                  productName: '',
                  productType: 'Flower',
                  testType: 'Potency',
                  labName: '',
                  testDate: '',
                  thcContent: '',
                  cbdContent: '',
                  moistureContent: '',
                  pesticides: 'Not Detected',
                  heavyMetals: 'Not Detected',
                  microbials: 'Not Detected',
                  residualSolvents: 'Not Detected',
                  notes: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingTest ? handleUpdateTest : handleCreateTest}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingTest ? 'Update' : 'Create'} Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Batch Modal - Mobile Responsive
  const BatchModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingBatch ? 'Edit Batch' : 'Add New Batch'}
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                <input
                  type="text"
                  value={batchForm.productName}
                  onChange={(e) => setBatchForm({...batchForm, productName: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Type</label>
                <select
                  value={batchForm.productType}
                  onChange={(e) => setBatchForm({...batchForm, productType: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {productTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Batch Size *</label>
                <input
                  type="text"
                  value={batchForm.batchSize}
                  onChange={(e) => setBatchForm({...batchForm, batchSize: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., 50 lbs, 1000 units"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Supplier</label>
                <input
                  type="text"
                  value={batchForm.supplier}
                  onChange={(e) => setBatchForm({...batchForm, supplier: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Harvest Date</label>
                <input
                  type="date"
                  value={batchForm.harvestDate}
                  onChange={(e) => setBatchForm({...batchForm, harvestDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Process Date</label>
                <input
                  type="date"
                  value={batchForm.processDate}
                  onChange={(e) => setBatchForm({...batchForm, processDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={batchForm.expiryDate}
                  onChange={(e) => setBatchForm({...batchForm, expiryDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={batchForm.location}
                  onChange={(e) => setBatchForm({...batchForm, location: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="e.g., Warehouse A - Section 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  value={batchForm.status}
                  onChange={(e) => setBatchForm({...batchForm, status: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {batchStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={batchForm.notes}
                onChange={(e) => setBatchForm({...batchForm, notes: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowBatchModal(false);
                setEditingBatch(null);
                setBatchForm({
                  productName: '',
                  productType: 'Flower',
                  batchSize: '',
                  harvestDate: '',
                  processDate: '',
                  expiryDate: '',
                  supplier: '',
                  location: '',
                  status: 'In Production',
                  notes: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingBatch ? handleUpdateBatch : handleCreateBatch}
              className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              {editingBatch ? 'Update' : 'Add'} Batch
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Quality Control</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Manage test results, batch tracking, and quality inspections</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'tests', name: 'Test Results', icon: '🧪' },
            { id: 'batches', name: 'Batches', icon: '📦' },
            { id: 'inspections', name: 'Inspections', icon: '🔍' }
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
        {activeTab === 'tests' && renderTestResults()}
        {activeTab === 'batches' && renderBatches()}
        {activeTab === 'inspections' && renderInspections()}
      </div>

      {/* Modals */}
      {showTestModal && <TestModal />}
      {showBatchModal && <BatchModal />}
    </div>
  );
};

export default EnhancedQualityControlModule;

