import React, { useState, useEffect } from 'react';

const ToDoModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedProject, setSelectedProject] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // list, board, calendar

  // Mock tasks data
  const [tasks, setTasks] = useState([
    {
      id: 'TASK-001',
      title: 'Update Compliance Documentation',
      description: 'Review and update all compliance documentation for Q3 regulatory changes.',
      status: 'In Progress',
      priority: 'High',
      project: 'Compliance',
      assignedTo: 'Sarah Johnson',
      assignedBy: 'Mike Chen',
      dueDate: '2024-08-20',
      createdAt: '2024-08-10 09:30:00',
      updatedAt: '2024-08-14 14:20:00',
      completedAt: null,
      tags: ['compliance', 'documentation', 'regulatory'],
      attachments: ['compliance-checklist.pdf'],
      subtasks: [
        { id: 'SUB-001', title: 'Review state regulations', completed: true },
        { id: 'SUB-002', title: 'Update internal policies', completed: false },
        { id: 'SUB-003', title: 'Train staff on changes', completed: false }
      ],
      comments: [
        { id: 'COM-001', author: 'Sarah Johnson', content: 'Started reviewing the new regulations.', timestamp: '2024-08-14 10:15:00' }
      ],
      timeTracked: 180, // minutes
      estimatedTime: 480 // minutes
    },
    {
      id: 'TASK-002',
      title: 'Launch New Product Marketing Campaign',
      description: 'Create and execute marketing campaign for the new edibles product line.',
      status: 'To Do',
      priority: 'Medium',
      project: 'Marketing',
      assignedTo: 'Alex Rodriguez',
      assignedBy: 'Tom Wilson',
      dueDate: '2024-08-25',
      createdAt: '2024-08-12 11:45:00',
      updatedAt: '2024-08-13 16:30:00',
      completedAt: null,
      tags: ['marketing', 'campaign', 'edibles', 'product-launch'],
      attachments: ['campaign-brief.docx', 'product-images.zip'],
      subtasks: [
        { id: 'SUB-004', title: 'Design campaign visuals', completed: false },
        { id: 'SUB-005', title: 'Write copy for ads', completed: false },
        { id: 'SUB-006', title: 'Set up social media campaigns', completed: false },
        { id: 'SUB-007', title: 'Schedule email marketing', completed: false }
      ],
      comments: [],
      timeTracked: 0,
      estimatedTime: 720
    },
    {
      id: 'TASK-003',
      title: 'Optimize Grow Room Environment',
      description: 'Adjust environmental controls in grow rooms for optimal plant health.',
      status: 'Completed',
      priority: 'High',
      project: 'Operations',
      assignedTo: 'Mike Chen',
      assignedBy: 'John Doe',
      dueDate: '2024-08-15',
      createdAt: '2024-08-08 08:00:00',
      updatedAt: '2024-08-15 17:45:00',
      completedAt: '2024-08-15 17:45:00',
      tags: ['grow-room', 'environment', 'optimization'],
      attachments: ['environment-report.pdf'],
      subtasks: [
        { id: 'SUB-008', title: 'Check temperature controls', completed: true },
        { id: 'SUB-009', title: 'Adjust humidity levels', completed: true },
        { id: 'SUB-010', title: 'Calibrate CO2 systems', completed: true }
      ],
      comments: [
        { id: 'COM-002', author: 'Mike Chen', content: 'All systems optimized and running smoothly.', timestamp: '2024-08-15 17:45:00' }
      ],
      timeTracked: 240,
      estimatedTime: 180
    },
    {
      id: 'TASK-004',
      title: 'Customer Feedback Analysis',
      description: 'Analyze customer feedback from the past month and create improvement recommendations.',
      status: 'In Review',
      priority: 'Medium',
      project: 'Customer Service',
      assignedTo: 'Lisa Wang',
      assignedBy: 'Sarah Johnson',
      dueDate: '2024-08-18',
      createdAt: '2024-08-11 13:20:00',
      updatedAt: '2024-08-16 09:10:00',
      completedAt: null,
      tags: ['customer-feedback', 'analysis', 'improvement'],
      attachments: ['feedback-data.xlsx'],
      subtasks: [
        { id: 'SUB-011', title: 'Collect feedback data', completed: true },
        { id: 'SUB-012', title: 'Analyze trends', completed: true },
        { id: 'SUB-013', title: 'Create recommendations', completed: false }
      ],
      comments: [
        { id: 'COM-003', author: 'Lisa Wang', content: 'Analysis complete, working on recommendations.', timestamp: '2024-08-16 09:10:00' }
      ],
      timeTracked: 300,
      estimatedTime: 360
    },
    {
      id: 'TASK-005',
      title: 'Inventory System Upgrade',
      description: 'Upgrade the inventory management system to improve tracking accuracy.',
      status: 'Blocked',
      priority: 'High',
      project: 'Technology',
      assignedTo: 'John Doe',
      assignedBy: 'Tom Wilson',
      dueDate: '2024-08-30',
      createdAt: '2024-08-05 10:15:00',
      updatedAt: '2024-08-14 11:30:00',
      completedAt: null,
      tags: ['inventory', 'system-upgrade', 'technology'],
      attachments: ['system-requirements.pdf'],
      subtasks: [
        { id: 'SUB-014', title: 'Research upgrade options', completed: true },
        { id: 'SUB-015', title: 'Get vendor quotes', completed: false },
        { id: 'SUB-016', title: 'Plan implementation', completed: false }
      ],
      comments: [
        { id: 'COM-004', author: 'John Doe', content: 'Waiting for budget approval before proceeding.', timestamp: '2024-08-14 11:30:00' }
      ],
      timeTracked: 120,
      estimatedTime: 960
    }
  ]);

  const [projects] = useState([
    { id: 'compliance', name: 'Compliance', color: 'bg-red-100 text-red-700', tasks: 8 },
    { id: 'marketing', name: 'Marketing', color: 'bg-blue-100 text-blue-700', tasks: 12 },
    { id: 'operations', name: 'Operations', color: 'bg-green-100 text-green-700', tasks: 15 },
    { id: 'customer-service', name: 'Customer Service', color: 'bg-purple-100 text-purple-700', tasks: 6 },
    { id: 'technology', name: 'Technology', color: 'bg-yellow-100 text-yellow-700', tasks: 9 },
    { id: 'hr', name: 'HR', color: 'bg-indigo-100 text-indigo-700', tasks: 4 }
  ]);

  const [analytics] = useState({
    totalTasks: 54,
    completedTasks: 32,
    inProgressTasks: 15,
    blockedTasks: 4,
    overdueTasks: 3,
    completionRate: 78.5,
    avgCompletionTime: 3.2, // days
    productivityScore: 85.7,
    teamEfficiency: 92.3,
    topPerformers: [
      { name: 'Sarah Johnson', completed: 18, inProgress: 3 },
      { name: 'Mike Chen', completed: 15, inProgress: 2 },
      { name: 'Lisa Wang', completed: 12, inProgress: 4 }
    ]
  });

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || task.status.toLowerCase().replace(' ', '-') === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || task.priority.toLowerCase() === selectedPriority;
    const matchesProject = selectedProject === 'all' || task.project.toLowerCase().replace(' ', '-') === selectedProject;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesProject;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase().replace(' ', '-')) {
      case 'to-do': return 'bg-gray-100 text-gray-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'in-review': return 'bg-yellow-100 text-yellow-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'blocked': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getProgressPercentage = (task) => {
    if (task.subtasks.length === 0) return task.status === 'Completed' ? 100 : 0;
    const completedSubtasks = task.subtasks.filter(subtask => subtask.completed).length;
    return Math.round((completedSubtasks / task.subtasks.length) * 100);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.completedTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔄</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.inProgressTasks}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🚫</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blocked</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.blockedTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="text-sm font-medium text-gray-900">{analytics.completionRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Completion Time</span>
              <span className="text-sm font-medium text-gray-900">{analytics.avgCompletionTime} days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Productivity Score</span>
              <span className="text-sm font-medium text-gray-900">{analytics.productivityScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Team Efficiency</span>
              <span className="text-sm font-medium text-gray-900">{analytics.teamEfficiency}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
          <div className="space-y-3">
            {analytics.topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-sm font-medium text-blue-700">{performer.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{performer.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {performer.completed} completed, {performer.inProgress} active
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Projects Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {projects.map((project) => (
            <div key={project.id} className="text-center">
              <div className={`inline-flex px-3 py-2 rounded-full text-sm font-medium ${project.color} mb-2`}>
                {project.name}
              </div>
              <p className="text-lg font-bold text-gray-900">{project.tasks}</p>
              <p className="text-xs text-gray-600">tasks</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">{task.assignedTo.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-600">{task.assignedTo} • {task.project}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="completed">Completed</option>
              <option value="blocked">Blocked</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="all">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
            <button 
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setShowCreateModal(true)}
            >
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📋</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
                  <p className="text-gray-700 mb-3">{task.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm text-gray-600">{getProgressPercentage(task)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{width: `${getProgressPercentage(task)}%`}}
                      ></div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Task Details */}
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>👤 {task.assignedTo}</span>
                    <span>📅 Due: {task.dueDate}</span>
                    <span>📂 {task.project}</span>
                    {task.attachments.length > 0 && <span>📎 {task.attachments.length} files</span>}
                    <span>⏱️ {Math.floor(task.timeTracked / 60)}h {task.timeTracked % 60}m</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end space-y-2">
                <div className="flex space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Subtasks ({task.subtasks.filter(st => st.completed).length}/{task.subtasks.length})</h4>
                <div className="space-y-1">
                  {task.subtasks.map((subtask) => (
                    <div key={subtask.id} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={subtask.completed} 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2" 
                        readOnly
                      />
                      <span className={`text-sm ${subtask.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                        {subtask.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            {task.comments.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Latest Comment</h4>
                {task.comments.slice(-1).map((comment) => (
                  <div key={comment.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                      <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>💬 {task.comments.length} comments</span>
                <span>📋 {task.subtasks.length} subtasks</span>
                <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                  View
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded">
                  Complete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Project
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${project.color}`}>
                  {project.tasks} tasks
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-medium text-gray-900">
                    {Math.floor(project.tasks * 0.6)} / {project.tasks}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{width: `${(Math.floor(project.tasks * 0.6) / project.tasks) * 100}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Tasks
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Edit Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Reports & Analytics</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Task Distribution by Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '59%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">32</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">In Progress</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '28%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">15</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">To Do</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-gray-600 h-2 rounded-full" style={{width: '13%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">7</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Priority Distribution</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">High Priority</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-red-600 h-2 rounded-full" style={{width: '35%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">19</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Medium Priority</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{width: '50%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">27</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Low Priority</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '15%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="mt-2 text-gray-600">Organize, track, and manage your team's tasks and projects</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'tasks', name: 'Tasks', icon: '📋' },
              { id: 'projects', name: 'Projects', icon: '📁' },
              { id: 'reports', name: 'Reports', icon: '📈' }
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
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'reports' && renderReports()}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Create New Task</h3>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task title..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter task description..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="sarah">Sarah Johnson</option>
                      <option value="mike">Mike Chen</option>
                      <option value="lisa">Lisa Wang</option>
                      <option value="alex">Alex Rodriguez</option>
                      <option value="tom">Tom Wilson</option>
                      <option value="john">John Doe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter tags separated by commas..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time (hours)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter estimated hours..."
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoModule;

