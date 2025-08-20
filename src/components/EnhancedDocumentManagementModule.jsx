import React, { useState, useEffect, useMemo } from 'react';

const EnhancedDocumentManagementModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Form states
  const [uploadForm, setUploadForm] = useState({
    name: '',
    category: 'General',
    description: '',
    tags: '',
    accessLevel: 'Internal',
    expiryDate: '',
    file: null
  });

  const [folderForm, setFolderForm] = useState({
    name: '',
    description: '',
    parentFolder: 'root',
    accessLevel: 'Internal'
  });

  const [shareForm, setShareForm] = useState({
    users: [],
    permissions: 'view',
    expiryDate: '',
    message: ''
  });

  // Mock document data with mobile-responsive considerations
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
      approvalStatus: 'Approved',
      folder: 'Legal Documents',
      fileUrl: '/documents/cannabis-license-2024.pdf',
      thumbnail: '/thumbnails/pdf-icon.png'
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
      approvalStatus: 'Approved',
      folder: 'Quality Control',
      fileUrl: '/documents/blue-dream-testing.pdf',
      thumbnail: '/thumbnails/pdf-icon.png'
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
      approvalStatus: 'Approved',
      folder: 'HR Documents',
      fileUrl: '/documents/employee-handbook-2024.pdf',
      thumbnail: '/thumbnails/pdf-icon.png'
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
      approvalStatus: 'Pending Review',
      folder: 'Financial Reports',
      fileUrl: '/documents/q2-2024-financial.xlsx',
      thumbnail: '/thumbnails/excel-icon.png'
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
      tags: ['marketing', 'campaign', 'assets'],
      description: 'Complete marketing campaign assets including images, videos, and copy',
      accessLevel: 'Internal',
      downloads: 25,
      views: 67,
      shared: true,
      expiryDate: '2024-12-31',
      approvalStatus: 'Approved',
      folder: 'Marketing Materials',
      fileUrl: '/documents/marketing-campaign-assets.zip',
      thumbnail: '/thumbnails/zip-icon.png'
    },
    {
      id: 'DOC-006',
      name: 'Standard Operating Procedures',
      type: 'Word',
      category: 'Operations',
      size: '4.7 MB',
      uploadDate: '2024-08-05',
      modifiedDate: '2024-08-11',
      uploadedBy: 'David Wilson',
      status: 'Active',
      version: '3.0',
      tags: ['sop', 'operations', 'procedures'],
      description: 'Standard operating procedures for cultivation, processing, and retail operations',
      accessLevel: 'Internal',
      downloads: 89,
      views: 156,
      shared: true,
      expiryDate: null,
      approvalStatus: 'Approved',
      folder: 'Operations',
      fileUrl: '/documents/sop-procedures.docx',
      thumbnail: '/thumbnails/word-icon.png'
    },
    {
      id: 'DOC-007',
      name: 'Inventory Tracking Spreadsheet',
      type: 'Excel',
      category: 'Inventory',
      size: '2.9 MB',
      uploadDate: '2024-08-13',
      modifiedDate: '2024-08-15',
      uploadedBy: 'Jennifer Lee',
      status: 'Active',
      version: '1.5',
      tags: ['inventory', 'tracking', 'spreadsheet'],
      description: 'Master inventory tracking spreadsheet with real-time stock levels',
      accessLevel: 'Internal',
      downloads: 34,
      views: 78,
      shared: false,
      expiryDate: null,
      approvalStatus: 'Approved',
      folder: 'Inventory',
      fileUrl: '/documents/inventory-tracking.xlsx',
      thumbnail: '/thumbnails/excel-icon.png'
    },
    {
      id: 'DOC-008',
      name: 'Security Camera Footage Archive',
      type: 'Video',
      category: 'Security',
      size: '1.2 GB',
      uploadDate: '2024-08-01',
      modifiedDate: '2024-08-01',
      uploadedBy: 'Security System',
      status: 'Archived',
      version: '1.0',
      tags: ['security', 'footage', 'archive'],
      description: 'Security camera footage archive for July 2024',
      accessLevel: 'Restricted',
      downloads: 2,
      views: 5,
      shared: false,
      expiryDate: '2025-08-01',
      approvalStatus: 'Approved',
      folder: 'Security',
      fileUrl: '/documents/security-july-2024.mp4',
      thumbnail: '/thumbnails/video-icon.png'
    }
  ]);

  const [folders, setFolders] = useState([
    { id: 'root', name: 'Root', parent: null, documentCount: 0 },
    { id: 'legal', name: 'Legal Documents', parent: 'root', documentCount: 1 },
    { id: 'quality', name: 'Quality Control', parent: 'root', documentCount: 1 },
    { id: 'hr', name: 'HR Documents', parent: 'root', documentCount: 1 },
    { id: 'financial', name: 'Financial Reports', parent: 'root', documentCount: 1 },
    { id: 'marketing', name: 'Marketing Materials', parent: 'root', documentCount: 1 },
    { id: 'operations', name: 'Operations', parent: 'root', documentCount: 1 },
    { id: 'inventory', name: 'Inventory', parent: 'root', documentCount: 1 },
    { id: 'security', name: 'Security', parent: 'root', documentCount: 1 }
  ]);

  const [documentCategories] = useState([
    'General',
    'Legal & Compliance',
    'Quality Control',
    'HR & Training',
    'Financial',
    'Marketing',
    'Operations',
    'Inventory',
    'Security',
    'Technical'
  ]);

  const [users] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah@dankdash.com', role: 'Manager' },
    { id: 2, name: 'Mike Chen', email: 'mike@dankdash.com', role: 'Quality Control' },
    { id: 3, name: 'Lisa Rodriguez', email: 'lisa@dankdash.com', role: 'HR Manager' },
    { id: 4, name: 'Alex Kim', email: 'alex@dankdash.com', role: 'Finance' },
    { id: 5, name: 'Emma Davis', email: 'emma@dankdash.com', role: 'Marketing' },
    { id: 6, name: 'David Wilson', email: 'david@dankdash.com', role: 'Operations' },
    { id: 7, name: 'Jennifer Lee', email: 'jennifer@dankdash.com', role: 'Inventory' }
  ]);

  // Filter functions
  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || doc.status.toLowerCase() === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [documents, searchTerm, selectedCategory, selectedStatus]);

  // Document CRUD Operations
  const handleUploadDocument = () => {
    if (!uploadForm.name || !uploadForm.file) {
      alert('Please fill in required fields (Name and File)');
      return;
    }

    const newDocument = {
      id: `DOC-${String(documents.length + 1).padStart(3, '0')}`,
      name: uploadForm.name,
      type: uploadForm.file.type.split('/')[1].toUpperCase(),
      category: uploadForm.category,
      size: `${(uploadForm.file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
      modifiedDate: new Date().toISOString().split('T')[0],
      uploadedBy: 'Current User',
      status: 'Active',
      version: '1.0',
      tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      description: uploadForm.description,
      accessLevel: uploadForm.accessLevel,
      downloads: 0,
      views: 0,
      shared: false,
      expiryDate: uploadForm.expiryDate || null,
      approvalStatus: 'Pending Review',
      folder: 'Root',
      fileUrl: `/documents/${uploadForm.file.name}`,
      thumbnail: '/thumbnails/default-icon.png'
    };

    setDocuments([...documents, newDocument]);
    setUploadForm({
      name: '',
      category: 'General',
      description: '',
      tags: '',
      accessLevel: 'Internal',
      expiryDate: '',
      file: null
    });
    setShowUploadModal(false);
    alert('Document uploaded successfully!');
  };

  const handleEditDocument = (document) => {
    setEditingDocument(document);
    setUploadForm({
      name: document.name,
      category: document.category,
      description: document.description,
      tags: document.tags.join(', '),
      accessLevel: document.accessLevel,
      expiryDate: document.expiryDate || '',
      file: null
    });
    setShowUploadModal(true);
  };

  const handleUpdateDocument = () => {
    if (!uploadForm.name) {
      alert('Please fill in required fields (Name)');
      return;
    }

    const updatedDocuments = documents.map(doc =>
      doc.id === editingDocument.id
        ? { 
            ...doc, 
            name: uploadForm.name,
            category: uploadForm.category,
            description: uploadForm.description,
            tags: uploadForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            accessLevel: uploadForm.accessLevel,
            expiryDate: uploadForm.expiryDate || null,
            modifiedDate: new Date().toISOString().split('T')[0]
          }
        : doc
    );

    setDocuments(updatedDocuments);
    setEditingDocument(null);
    setUploadForm({
      name: '',
      category: 'General',
      description: '',
      tags: '',
      accessLevel: 'Internal',
      expiryDate: '',
      file: null
    });
    setShowUploadModal(false);
    alert('Document updated successfully!');
  };

  const handleDeleteDocument = (documentId) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      setDocuments(documents.filter(doc => doc.id !== documentId));
      alert('Document deleted successfully!');
    }
  };

  const handleDownloadDocument = (document) => {
    // Simulate download
    const updatedDocuments = documents.map(doc =>
      doc.id === document.id
        ? { ...doc, downloads: doc.downloads + 1 }
        : doc
    );
    setDocuments(updatedDocuments);
    alert(`Downloading: ${document.name}`);
  };

  const handleViewDocument = (document) => {
    // Simulate view
    const updatedDocuments = documents.map(doc =>
      doc.id === document.id
        ? { ...doc, views: doc.views + 1 }
        : doc
    );
    setDocuments(updatedDocuments);
    alert(`Opening: ${document.name}`);
  };

  const handleShareDocument = (document) => {
    setSelectedDocument(document);
    setShowShareModal(true);
  };

  const handleApproveDocument = (documentId) => {
    if (window.confirm('Are you sure you want to approve this document?')) {
      const updatedDocuments = documents.map(doc =>
        doc.id === documentId
          ? { ...doc, approvalStatus: 'Approved' }
          : doc
      );
      setDocuments(updatedDocuments);
      alert('Document approved successfully!');
    }
  };

  const handleArchiveDocument = (documentId) => {
    if (window.confirm('Are you sure you want to archive this document?')) {
      const updatedDocuments = documents.map(doc =>
        doc.id === documentId
          ? { ...doc, status: 'Archived' }
          : doc
      );
      setDocuments(updatedDocuments);
      alert('Document archived successfully!');
    }
  };

  // Folder Operations
  const handleCreateFolder = () => {
    if (!folderForm.name) {
      alert('Please enter a folder name');
      return;
    }

    const newFolder = {
      id: `folder-${Date.now()}`,
      name: folderForm.name,
      parent: folderForm.parentFolder,
      documentCount: 0
    };

    setFolders([...folders, newFolder]);
    setFolderForm({
      name: '',
      description: '',
      parentFolder: 'root',
      accessLevel: 'Internal'
    });
    setShowFolderModal(false);
    alert('Folder created successfully!');
  };

  // Share Operations
  const handleShareSubmit = () => {
    if (shareForm.users.length === 0) {
      alert('Please select at least one user to share with');
      return;
    }

    const updatedDocuments = documents.map(doc =>
      doc.id === selectedDocument.id
        ? { ...doc, shared: true }
        : doc
    );
    setDocuments(updatedDocuments);
    setShareForm({
      users: [],
      permissions: 'view',
      expiryDate: '',
      message: ''
    });
    setShowShareModal(false);
    setSelectedDocument(null);
    alert('Document shared successfully!');
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelColor = (level) => {
    switch (level) {
      case 'Public': return 'bg-blue-100 text-blue-800';
      case 'Internal': return 'bg-purple-100 text-purple-800';
      case 'Restricted': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc':
      case 'docx':
      case 'word': return '📝';
      case 'xls':
      case 'xlsx':
      case 'excel': return '📊';
      case 'ppt':
      case 'pptx': return '📋';
      case 'zip':
      case 'rar': return '🗜️';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'video': return '🎥';
      case 'mp3':
      case 'wav':
      case 'audio': return '🎵';
      default: return '📁';
    }
  };

  const formatFileSize = (size) => {
    if (typeof size === 'string') return size;
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Dashboard calculations
  const totalDocuments = documents.length;
  const activeDocuments = documents.filter(d => d.status === 'Active').length;
  const totalStorage = documents.reduce((sum, d) => {
    const sizeInMB = parseFloat(d.size.replace(/[^\d.]/g, ''));
    return sum + (d.size.includes('GB') ? sizeInMB * 1024 : sizeInMB);
  }, 0);
  const totalDownloads = documents.reduce((sum, d) => sum + d.downloads, 0);
  const pendingApprovals = documents.filter(d => d.approvalStatus === 'Pending Review').length;

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
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Documents</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalDocuments}</p>
              <p className="text-xs lg:text-sm text-blue-600 truncate">{activeDocuments} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Storage Used</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalStorage.toFixed(1)} MB</p>
              <p className="text-xs lg:text-sm text-green-600 truncate">of 10 GB limit</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="ml-3 lg:ml-4 min-w-0 flex-1">
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Total Downloads</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{formatNumber(totalDownloads)}</p>
              <p className="text-xs lg:text-sm text-purple-600 truncate">This month</p>
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
              <p className="text-xs lg:text-sm font-medium text-gray-600 truncate">Pending Approvals</p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900">{pendingApprovals}</p>
              <p className="text-xs lg:text-sm text-orange-600 truncate">Need review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Recent Documents</h3>
          <div className="space-y-3">
            {documents.slice(0, 5).map((document) => (
              <div key={document.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-2xl">{getFileTypeIcon(document.type)}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">{document.name}</h4>
                    <p className="text-xs text-gray-600 truncate">{document.uploadedBy} • {document.uploadDate}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}`}>
                        {document.status}
                      </span>
                      <span className="text-xs text-gray-500">{document.size}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-2">
                  <p className="text-sm font-medium text-gray-900">{document.downloads}</p>
                  <p className="text-xs text-gray-500">Downloads</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Storage by Category</h3>
          <div className="space-y-4">
            {documentCategories.slice(0, 6).map((category) => {
              const categoryDocs = documents.filter(d => d.category === category);
              const categorySize = categoryDocs.reduce((sum, d) => {
                const sizeInMB = parseFloat(d.size.replace(/[^\d.]/g, ''));
                return sum + (d.size.includes('GB') ? sizeInMB * 1024 : sizeInMB);
              }, 0);
              const percentage = totalStorage > 0 ? (categorySize / totalStorage) * 100 : 0;
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate">{category}</span>
                    <span className="text-gray-900 font-medium">{categorySize.toFixed(1)} MB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${Math.min(percentage, 100)}%`}}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions - Mobile Responsive */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left text-sm"
            >
              Upload Document
            </button>
            <button
              onClick={() => setShowFolderModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left text-sm"
            >
              Create Folder
            </button>
            <button
              onClick={() => alert('Bulk operations coming soon')}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left text-sm"
            >
              Bulk Operations
            </button>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">Document Tips</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Use descriptive file names</p>
            <p>• Add relevant tags for easy search</p>
            <p>• Set appropriate access levels</p>
            <p>• Regular cleanup of old files</p>
          </div>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border">
          <h3 className="text-base lg:text-lg font-medium text-gray-900 mb-4">System Status</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Storage Usage:</span>
              <span className="text-gray-900 font-medium">{((totalStorage / 10240) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Backup Status:</span>
              <span className="text-green-600 font-medium">Up to date</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Security Scan:</span>
              <span className="text-green-600 font-medium">Clean</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Mobile-responsive search and filters */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
        <div className="flex-1 max-w-full lg:max-w-2xl">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              placeholder="Search documents..."
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {documentCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              List
            </button>
          </div>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Upload
          </button>
        </div>
      </div>

      {/* Document Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredDocuments.map((document) => (
            <div key={document.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <span className="text-2xl">{getFileTypeIcon(document.type)}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">{document.name}</h3>
                    <p className="text-xs text-gray-500">{document.type} • {document.size}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}`}>
                    {document.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessLevelColor(document.accessLevel)}`}>
                    {document.accessLevel}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{document.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {document.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {tag}
                  </span>
                ))}
                {document.tags.length > 3 && (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    +{document.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="text-xs text-gray-500 mb-3">
                <div className="flex justify-between">
                  <span>By: {document.uploadedBy}</span>
                  <span>v{document.version}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>{document.uploadDate}</span>
                  <span>{document.downloads} downloads</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                <button 
                  onClick={() => handleViewDocument(document)}
                  className="text-xs px-2 py-1 text-blue-600 hover:text-blue-900 bg-blue-50 rounded"
                >
                  View
                </button>
                <button 
                  onClick={() => handleDownloadDocument(document)}
                  className="text-xs px-2 py-1 text-green-600 hover:text-green-900 bg-green-50 rounded"
                >
                  Download
                </button>
                <button 
                  onClick={() => handleEditDocument(document)}
                  className="text-xs px-2 py-1 text-purple-600 hover:text-purple-900 bg-purple-50 rounded"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleShareDocument(document)}
                  className="text-xs px-2 py-1 text-indigo-600 hover:text-indigo-900 bg-indigo-50 rounded"
                >
                  Share
                </button>
                {document.approvalStatus === 'Pending Review' && (
                  <button 
                    onClick={() => handleApproveDocument(document.id)}
                    className="text-xs px-2 py-1 text-orange-600 hover:text-orange-900 bg-orange-50 rounded"
                  >
                    Approve
                  </button>
                )}
                <button 
                  onClick={() => handleDeleteDocument(document.id)}
                  className="text-xs px-2 py-1 text-red-600 hover:text-red-900 bg-red-50 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{getFileTypeIcon(document.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">{document.name}</div>
                          <div className="text-sm text-gray-500 truncate">{document.description}</div>
                          <div className="text-xs text-gray-400">{document.type} • {document.size} • v{document.version}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {document.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(document.status)}`}>
                          {document.status}
                        </span>
                        <div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccessLevelColor(document.accessLevel)}`}>
                            {document.accessLevel}
                          </span>
                        </div>
                        <div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getApprovalStatusColor(document.approvalStatus)}`}>
                            {document.approvalStatus}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">Downloads: {document.downloads}</div>
                        <div className="text-xs text-gray-500">Views: {document.views}</div>
                        <div className="text-xs text-gray-500">Modified: {document.modifiedDate}</div>
                        <div className="text-xs text-gray-500">By: {document.uploadedBy}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-wrap gap-1">
                        <button 
                          onClick={() => handleViewDocument(document)}
                          className="text-blue-600 hover:text-blue-900 text-xs"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleDownloadDocument(document)}
                          className="text-green-600 hover:text-green-900 text-xs"
                        >
                          Download
                        </button>
                        <button 
                          onClick={() => handleEditDocument(document)}
                          className="text-purple-600 hover:text-purple-900 text-xs"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleShareDocument(document)}
                          className="text-indigo-600 hover:text-indigo-900 text-xs"
                        >
                          Share
                        </button>
                        <button 
                          onClick={() => handleDeleteDocument(document.id)}
                          className="text-red-600 hover:text-red-900 text-xs"
                        >
                          Delete
                        </button>
                      </div>
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
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900">Folder Management</h3>
      <p className="text-gray-600">Advanced folder organization and management coming soon...</p>
    </div>
  );

  const renderShared = () => (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900">Shared Documents</h3>
      <p className="text-gray-600">Shared document management and collaboration features coming soon...</p>
    </div>
  );

  // Upload Modal - Mobile Responsive
  const UploadModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-4 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingDocument ? 'Edit Document' : 'Upload New Document'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Document Name *</label>
              <input
                type="text"
                value={uploadForm.name}
                onChange={(e) => setUploadForm({...uploadForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  {documentCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Access Level</label>
                <select
                  value={uploadForm.accessLevel}
                  onChange={(e) => setUploadForm({...uploadForm, accessLevel: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="Public">Public</option>
                  <option value="Internal">Internal</option>
                  <option value="Restricted">Restricted</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={uploadForm.description}
                onChange={(e) => setUploadForm({...uploadForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
              <input
                type="text"
                value={uploadForm.tags}
                onChange={(e) => setUploadForm({...uploadForm, tags: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="tag1, tag2, tag3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date (optional)</label>
              <input
                type="date"
                value={uploadForm.expiryDate}
                onChange={(e) => setUploadForm({...uploadForm, expiryDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>

            {!editingDocument && (
              <div>
                <label className="block text-sm font-medium text-gray-700">File *</label>
                <input
                  type="file"
                  onChange={(e) => setUploadForm({...uploadForm, file: e.target.files[0]})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                  required={!editingDocument}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowUploadModal(false);
                setEditingDocument(null);
                setUploadForm({
                  name: '',
                  category: 'General',
                  description: '',
                  tags: '',
                  accessLevel: 'Internal',
                  expiryDate: '',
                  file: null
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={editingDocument ? handleUpdateDocument : handleUploadDocument}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {editingDocument ? 'Update' : 'Upload'} Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Folder Modal - Mobile Responsive
  const FolderModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-20 mx-auto border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Folder</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Folder Name *</label>
              <input
                type="text"
                value={folderForm.name}
                onChange={(e) => setFolderForm({...folderForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={folderForm.description}
                onChange={(e) => setFolderForm({...folderForm, description: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowFolderModal(false);
                setFolderForm({
                  name: '',
                  description: '',
                  parentFolder: 'root',
                  accessLevel: 'Internal'
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateFolder}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Create Folder
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Share Modal - Mobile Responsive
  const ShareModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 p-4">
      <div className="relative top-10 mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="p-4 lg:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Share Document: {selectedDocument?.name}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Users</label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                {users.map(user => (
                  <label key={user.id} className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded">
                    <input
                      type="checkbox"
                      checked={shareForm.users.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setShareForm({...shareForm, users: [...shareForm.users, user.id]});
                        } else {
                          setShareForm({...shareForm, users: shareForm.users.filter(id => id !== user.id)});
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      <span className="text-xs text-gray-500 block">{user.email} • {user.role}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Permissions</label>
                <select
                  value={shareForm.permissions}
                  onChange={(e) => setShareForm({...shareForm, permissions: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="view">View Only</option>
                  <option value="download">View & Download</option>
                  <option value="edit">View, Download & Edit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={shareForm.expiryDate}
                  onChange={(e) => setShareForm({...shareForm, expiryDate: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message (optional)</label>
              <textarea
                value={shareForm.message}
                onChange={(e) => setShareForm({...shareForm, message: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Add a message for the recipients..."
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              onClick={() => {
                setShowShareModal(false);
                setSelectedDocument(null);
                setShareForm({
                  users: [],
                  permissions: 'view',
                  expiryDate: '',
                  message: ''
                });
              }}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleShareSubmit}
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              Share Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8 overflow-hidden">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words">Document Management</h1>
        <p className="mt-2 text-sm lg:text-base text-gray-600 break-words">Store, organize, and manage your business documents</p>
      </div>

      {/* Mobile-responsive Tab Navigation */}
      <div className="border-b border-gray-200 mb-6 lg:mb-8 overflow-x-auto">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 min-w-max">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'documents', name: 'Documents', icon: '📄' },
            { id: 'folders', name: 'Folders', icon: '📁' },
            { id: 'shared', name: 'Shared', icon: '🔗' }
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
        {activeTab === 'documents' && renderDocuments()}
        {activeTab === 'folders' && renderFolders()}
        {activeTab === 'shared' && renderShared()}
      </div>

      {/* Modals */}
      {showUploadModal && <UploadModal />}
      {showFolderModal && <FolderModal />}
      {showShareModal && <ShareModal />}
    </div>
  );
};

export default EnhancedDocumentManagementModule;

