import React, { useState, useEffect } from 'react';

const DocumentManagementModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  // Mock document data
  const [documents, setDocuments] = useState([
    {
      id: 'DOC-001',
      name: 'Cannabis License Application 2024',
      type: 'PDF',
      category: 'Legal & Compliance',
      size: '2.4 MB',
      uploadDate: '2024-08-10',
      modifiedDate: '2024-08-12',
      uploadedBy: 'Sarah Johnson',
      status: 'Active',
      version: '1.2',
      tags: ['license', 'compliance', 'legal'],
      description: 'Annual cannabis license renewal application and supporting documents',
      accessLevel: 'Restricted',
      downloads: 15,
      views: 45,
      shared: true,
      expiryDate: '2025-08-10',
      approvalStatus: 'Approved'
    },
    {
      id: 'DOC-002',
      name: 'Product Testing Results - Blue Dream',
      type: 'PDF',
      category: 'Quality Control',
      size: '1.8 MB',
      uploadDate: '2024-08-08',
      modifiedDate: '2024-08-08',
      uploadedBy: 'Mike Chen',
      status: 'Active',
      version: '1.0',
      tags: ['testing', 'quality', 'blue-dream'],
      description: 'Third-party lab testing results for Blue Dream strain batch BD-240808',
      accessLevel: 'Internal',
      downloads: 8,
      views: 23,
      shared: false,
      expiryDate: null,
      approvalStatus: 'Approved'
    },
    {
      id: 'DOC-003',
      name: 'Employee Handbook 2024',
      type: 'PDF',
      category: 'HR & Training',
      size: '5.2 MB',
      uploadDate: '2024-07-15',
      modifiedDate: '2024-08-01',
      uploadedBy: 'Lisa Rodriguez',
      status: 'Active',
      version: '2.1',
      tags: ['hr', 'handbook', 'training'],
      description: 'Comprehensive employee handbook with policies, procedures, and training materials',
      accessLevel: 'Public',
      downloads: 156,
      views: 234,
      shared: true,
      expiryDate: null,
      approvalStatus: 'Approved'
    },
    {
      id: 'DOC-004',
      name: 'Financial Report Q2 2024',
      type: 'Excel',
      category: 'Financial',
      size: '3.1 MB',
      uploadDate: '2024-07-30',
      modifiedDate: '2024-08-05',
      uploadedBy: 'Alex Kim',
      status: 'Active',
      version: '1.3',
      tags: ['financial', 'quarterly', 'report'],
      description: 'Quarterly financial report including revenue, expenses, and profit analysis',
      accessLevel: 'Restricted',
      downloads: 12,
      views: 28,
      shared: false,
      expiryDate: null,
      approvalStatus: 'Pending Review'
    },
    {
      id: 'DOC-005',
      name: 'Marketing Campaign Assets',
      type: 'ZIP',
      category: 'Marketing',
      size: '45.6 MB',
      uploadDate: '2024-08-12',
      modifiedDate: '2024-08-14',
      uploadedBy: 'Emma Davis',
      status: 'Active',
      version: '1.1',
      tags: ['marketing', 'assets', 'campaign'],
      description: 'Complete marketing campaign assets including images, videos, and copy',
      accessLevel: 'Internal',
      downloads: 6,
      views: 18,
      shared: true,
      expiryDate: null,
      approvalStatus: 'Approved'
    },
    {
      id: 'DOC-006',
      name: 'Inventory Audit Report',
      type: 'PDF',
      category: 'Operations',
      size: '1.2 MB',
      uploadDate: '2024-08-01',
      modifiedDate: '2024-08-01',
      uploadedBy: 'John Smith',
      status: 'Archived',
      version: '1.0',
      tags: ['inventory', 'audit', 'operations'],
      description: 'Monthly inventory audit report with discrepancies and recommendations',
      accessLevel: 'Internal',
      downloads: 22,
      views: 67,
      shared: false,
      expiryDate: '2024-12-01',
      approvalStatus: 'Approved'
    }
  ]);

  const [folders, setFolders] = useState([
    {
      id: 'FOLD-001',
      name: 'Legal & Compliance',
      description: 'Legal documents, licenses, and compliance materials',
      documentCount: 24,
      size: '156.8 MB',
      createdDate: '2024-01-15',
      modifiedDate: '2024-08-12',
      accessLevel: 'Restricted',
      color: 'red'
    },
    {
      id: 'FOLD-002',
      name: 'Quality Control',
      description: 'Product testing results and quality assurance documents',
      documentCount: 18,
      size: '89.2 MB',
      createdDate: '2024-02-01',
      modifiedDate: '2024-08-08',
      accessLevel: 'Internal',
      color: 'blue'
    },
    {
      id: 'FOLD-003',
      name: 'HR & Training',
      description: 'Employee documents, training materials, and HR policies',
      documentCount: 32,
      size: '234.5 MB',
      createdDate: '2024-01-10',
      modifiedDate: '2024-08-01',
      accessLevel: 'Public',
      color: 'green'
    },
    {
      id: 'FOLD-004',
      name: 'Financial',
      description: 'Financial reports, budgets, and accounting documents',
      documentCount: 15,
      size: '67.3 MB',
      createdDate: '2024-01-20',
      modifiedDate: '2024-08-05',
      accessLevel: 'Restricted',
      color: 'yellow'
    },
    {
      id: 'FOLD-005',
      name: 'Marketing',
      description: 'Marketing materials, campaigns, and brand assets',
      documentCount: 28,
      size: '512.7 MB',
      createdDate: '2024-02-15',
      modifiedDate: '2024-08-14',
      accessLevel: 'Internal',
      color: 'purple'
    }
  ]);

  const [workflows, setWorkflows] = useState([
    {
      id: 'WF-001',
      name: 'Document Approval Workflow',
      description: 'Standard approval process for new documents',
      steps: ['Upload', 'Review', 'Approve', 'Publish'],
      currentStep: 2,
      assignedTo: 'Sarah Johnson',
      dueDate: '2024-08-20',
      status: 'In Progress',
      documentsInFlow: 8
    },
    {
      id: 'WF-002',
      name: 'Compliance Review Process',
      description: 'Legal compliance review for regulatory documents',
      steps: ['Submit', 'Legal Review', 'Compliance Check', 'Final Approval'],
      currentStep: 3,
      assignedTo: 'Alex Kim',
      dueDate: '2024-08-18',
      status: 'In Progress',
      documentsInFlow: 3
    },
    {
      id: 'WF-003',
      name: 'Training Material Update',
      description: 'Process for updating and distributing training materials',
      steps: ['Draft', 'Review', 'Test', 'Deploy'],
      currentStep: 4,
      assignedTo: 'Lisa Rodriguez',
      dueDate: '2024-08-16',
      status: 'Completed',
      documentsInFlow: 0
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalDocuments: 156,
    totalSize: '2.4 GB',
    documentsThisMonth: 23,
    totalDownloads: 1250,
    avgFileSize: '15.8 MB',
    storageUsed: 68.5,
    activeWorkflows: 5,
    pendingApprovals: 12
  });

  // Filter functions
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || doc.status.toLowerCase() === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'Public': return 'bg-green-100 text-green-800';
      case 'Internal': return 'bg-blue-100 text-blue-800';
      case 'Restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'excel': case 'xlsx': case 'xls': return '📊';
      case 'word': case 'docx': case 'doc': return '📝';
      case 'powerpoint': case 'pptx': case 'ppt': return '📋';
      case 'zip': case 'rar': return '📦';
      case 'image': case 'jpg': case 'png': return '🖼️';
      case 'video': case 'mp4': case 'avi': return '🎥';
      default: return '📄';
    }
  };

  const getFolderColor = (color) => {
    const colors = {
      red: 'bg-red-100 text-red-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      purple: 'bg-purple-100 text-purple-800'
    };
    return colors[color] || 'bg-gray-100 text-gray-800';
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
              <p className="text-sm font-medium text-gray-600">Total Documents</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalDocuments}</p>
              <p className="text-sm text-blue-600">{analytics.documentsThisMonth} this month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Downloads</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalDownloads.toLocaleString()}</p>
              <p className="text-sm text-green-600">This month</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.storageUsed}%</p>
              <p className="text-sm text-gray-600">{analytics.totalSize} total</p>
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
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.pendingApprovals}</p>
              <p className="text-sm text-yellow-600">Require attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Storage Usage */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Storage Usage</h3>
        </div>
        <div className="p-6">
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Used: {analytics.totalSize}</span>
              <span className="text-gray-600">{analytics.storageUsed}% of 5 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${analytics.storageUsed}%` }}></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {folders.map((folder) => (
              <div key={folder.id} className="text-center">
                <div className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getFolderColor(folder.color)} mb-2`}>
                  {folder.name}
                </div>
                <div className="text-sm text-gray-600">{folder.size}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {documents.slice(0, 5).map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">{getFileIcon(doc.type)}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
                    <p className="text-sm text-gray-600">{doc.category} • {doc.size} • {doc.uploadedBy}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="text-sm text-gray-600">Downloads</p>
                      <p className="font-medium">{doc.downloads}</p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                      {doc.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Workflows */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Workflows</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {workflows.filter(w => w.status !== 'Completed').map((workflow) => (
              <div key={workflow.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(workflow.status)}`}>
                    {workflow.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Step:</span>
                      <span className="ml-1 font-medium">{workflow.currentStep}/{workflow.steps.length}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Assigned:</span>
                      <span className="ml-1 font-medium">{workflow.assignedTo}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Due:</span>
                      <span className="ml-1 font-medium">{workflow.dueDate}</span>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600">
                    {workflow.documentsInFlow} documents
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search documents..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Legal & Compliance">Legal & Compliance</option>
              <option value="Quality Control">Quality Control</option>
              <option value="HR & Training">HR & Training</option>
              <option value="Financial">Financial</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="draft">Draft</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              {viewMode === 'grid' ? '📋' : '⊞'} {viewMode === 'grid' ? 'List' : 'Grid'}
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Upload Document
            </button>
          </div>
        </div>
      </div>

      {/* Documents Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{getFileIcon(doc.type)}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                    <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="text-gray-900">{doc.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uploaded:</span>
                  <span className="text-gray-900">{doc.uploadDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Access:</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessLevelColor(doc.accessLevel)}`}>
                    {doc.accessLevel}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>👁️ {doc.views} views</span>
                <span>⬇️ {doc.downloads} downloads</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View
                </button>
                <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getFileIcon(doc.type)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">v{doc.version} • {doc.uploadedBy}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doc.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.modifiedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">Download</button>
                      <button className="text-gray-600 hover:text-gray-900">Share</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderFolders = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search folders..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Folder
            </button>
          </div>
        </div>
      </div>

      {/* Folders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {folders.map((folder) => (
          <div key={folder.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-3 ${getFolderColor(folder.color)}`}>
                  <span className="text-2xl">📁</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{folder.name}</h3>
                  <p className="text-sm text-gray-600">{folder.documentCount} documents</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessLevelColor(folder.accessLevel)}`}>
                {folder.accessLevel}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{folder.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Size:</span>
                <span className="text-gray-900">{folder.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900">{folder.createdDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Modified:</span>
                <span className="text-gray-900">{folder.modifiedDate}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                Open
              </button>
              <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Manage
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
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                <p className="text-sm text-gray-600">{workflow.description}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(workflow.status)}`}>
                {workflow.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">Step {workflow.currentStep} of {workflow.steps.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(workflow.currentStep / workflow.steps.length) * 100}%` }}></div>
              </div>
              <div className="flex justify-between mt-2">
                {workflow.steps.map((step, index) => (
                  <div key={index} className={`text-xs ${index < workflow.currentStep ? 'text-blue-600' : index === workflow.currentStep ? 'text-yellow-600' : 'text-gray-400'}`}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Assigned To:</p>
                <p className="text-sm text-gray-600">{workflow.assignedTo}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Due Date:</p>
                <p className="text-sm text-gray-600">{workflow.dueDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Documents:</p>
                <p className="text-sm text-blue-600">{workflow.documentsInFlow} in flow</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Current Step:</p>
                <p className="text-sm text-yellow-600">{workflow.steps[workflow.currentStep - 1]}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View Details
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                Manage
              </button>
              {workflow.status === 'In Progress' && (
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Advance Step
                </button>
              )}
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
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="mt-2 text-gray-600">Organize, store, and manage all your business documents</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'documents', name: 'Documents', icon: '📄' },
              { id: 'folders', name: 'Folders', icon: '📁' },
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
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'folders' && renderFolders()}
        {activeTab === 'workflows' && renderWorkflows()}
      </div>
    </div>
  );
};

export default DocumentManagementModule;

