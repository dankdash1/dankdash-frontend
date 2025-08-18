import React, { useState, useEffect } from 'react';

const ProjectManagementModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock project data
  const [projects, setProjects] = useState([
    {
      id: 'PROJ-001',
      name: 'DankDash Mobile App Development',
      description: 'Develop native mobile applications for iOS and Android',
      status: 'In Progress',
      priority: 'High',
      progress: 65,
      startDate: '2024-07-01',
      endDate: '2024-09-30',
      budget: 50000.00,
      spent: 32500.00,
      manager: 'Sarah Johnson',
      team: ['John Doe', 'Mike Chen', 'Lisa Rodriguez', 'Alex Kim'],
      tasks: 24,
      completedTasks: 16,
      category: 'Development'
    },
    {
      id: 'PROJ-002',
      name: 'Cannabis Compliance System',
      description: 'Implement state compliance tracking and reporting system',
      status: 'Planning',
      priority: 'Critical',
      progress: 15,
      startDate: '2024-08-15',
      endDate: '2024-11-15',
      budget: 75000.00,
      spent: 5000.00,
      manager: 'Mike Chen',
      team: ['Sarah Johnson', 'David Wilson', 'Emma Davis'],
      tasks: 18,
      completedTasks: 3,
      category: 'Compliance'
    },
    {
      id: 'PROJ-003',
      name: 'Delivery Fleet Optimization',
      description: 'Optimize delivery routes and fleet management system',
      status: 'Completed',
      priority: 'Medium',
      progress: 100,
      startDate: '2024-06-01',
      endDate: '2024-07-31',
      budget: 25000.00,
      spent: 23500.00,
      manager: 'Lisa Rodriguez',
      team: ['Alex Kim', 'Tom Brown'],
      tasks: 12,
      completedTasks: 12,
      category: 'Operations'
    },
    {
      id: 'PROJ-004',
      name: 'AI Chatbot Enhancement',
      description: 'Enhance AI chatbot with advanced NLP capabilities',
      status: 'In Progress',
      priority: 'Medium',
      progress: 40,
      startDate: '2024-08-01',
      endDate: '2024-09-15',
      budget: 15000.00,
      spent: 6000.00,
      manager: 'John Doe',
      team: ['Sarah Johnson', 'Mike Chen'],
      tasks: 8,
      completedTasks: 3,
      category: 'AI/ML'
    },
    {
      id: 'PROJ-005',
      name: 'Marketing Website Redesign',
      description: 'Complete redesign of marketing website and landing pages',
      status: 'On Hold',
      priority: 'Low',
      progress: 25,
      startDate: '2024-07-15',
      endDate: '2024-10-15',
      budget: 20000.00,
      spent: 5000.00,
      manager: 'Emma Davis',
      team: ['Lisa Rodriguez', 'Alex Kim'],
      tasks: 15,
      completedTasks: 4,
      category: 'Marketing'
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 'TASK-001',
      title: 'Design user authentication flow',
      description: 'Create wireframes and mockups for login/signup process',
      project: 'DankDash Mobile App Development',
      projectId: 'PROJ-001',
      assignee: 'Lisa Rodriguez',
      status: 'Completed',
      priority: 'High',
      dueDate: '2024-08-20',
      createdDate: '2024-08-01',
      estimatedHours: 16,
      actualHours: 14,
      tags: ['Design', 'UX', 'Authentication']
    },
    {
      id: 'TASK-002',
      title: 'Implement payment gateway integration',
      description: 'Integrate Stripe and other payment processors',
      project: 'DankDash Mobile App Development',
      projectId: 'PROJ-001',
      assignee: 'John Doe',
      status: 'In Progress',
      priority: 'Critical',
      dueDate: '2024-08-25',
      createdDate: '2024-08-10',
      estimatedHours: 24,
      actualHours: 18,
      tags: ['Development', 'Payment', 'Integration']
    },
    {
      id: 'TASK-003',
      title: 'Research state compliance requirements',
      description: 'Document all state-specific cannabis regulations',
      project: 'Cannabis Compliance System',
      projectId: 'PROJ-002',
      assignee: 'David Wilson',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2024-08-30',
      createdDate: '2024-08-15',
      estimatedHours: 40,
      actualHours: 25,
      tags: ['Research', 'Compliance', 'Legal']
    },
    {
      id: 'TASK-004',
      title: 'Set up project tracking dashboard',
      description: 'Create real-time project monitoring dashboard',
      project: 'Cannabis Compliance System',
      projectId: 'PROJ-002',
      assignee: 'Sarah Johnson',
      status: 'Todo',
      priority: 'Medium',
      dueDate: '2024-09-05',
      createdDate: '2024-08-20',
      estimatedHours: 12,
      actualHours: 0,
      tags: ['Dashboard', 'Monitoring', 'Analytics']
    },
    {
      id: 'TASK-005',
      title: 'Train NLP model for cannabis queries',
      description: 'Develop and train specialized NLP model for cannabis-related questions',
      project: 'AI Chatbot Enhancement',
      projectId: 'PROJ-004',
      assignee: 'Mike Chen',
      status: 'In Progress',
      priority: 'High',
      dueDate: '2024-09-01',
      createdDate: '2024-08-05',
      estimatedHours: 32,
      actualHours: 20,
      tags: ['AI', 'NLP', 'Training']
    }
  ]);

  const [team, setTeam] = useState([
    {
      id: 'USER-001',
      name: 'Sarah Johnson',
      role: 'Project Manager',
      email: 'sarah@dankdash.com',
      avatar: '/api/placeholder/40/40',
      activeProjects: 3,
      completedTasks: 45,
      workload: 85,
      skills: ['Project Management', 'Agile', 'Scrum', 'Leadership']
    },
    {
      id: 'USER-002',
      name: 'John Doe',
      role: 'Senior Developer',
      email: 'john@dankdash.com',
      avatar: '/api/placeholder/40/40',
      activeProjects: 2,
      completedTasks: 67,
      workload: 90,
      skills: ['React', 'Node.js', 'Python', 'AWS']
    },
    {
      id: 'USER-003',
      name: 'Mike Chen',
      role: 'AI/ML Engineer',
      email: 'mike@dankdash.com',
      avatar: '/api/placeholder/40/40',
      activeProjects: 2,
      completedTasks: 34,
      workload: 75,
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'NLP']
    },
    {
      id: 'USER-004',
      name: 'Lisa Rodriguez',
      role: 'UX Designer',
      email: 'lisa@dankdash.com',
      avatar: '/api/placeholder/40/40',
      activeProjects: 3,
      completedTasks: 52,
      workload: 70,
      skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research']
    },
    {
      id: 'USER-005',
      name: 'Alex Kim',
      role: 'DevOps Engineer',
      email: 'alex@dankdash.com',
      avatar: '/api/placeholder/40/40',
      activeProjects: 2,
      completedTasks: 28,
      workload: 60,
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD']
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalProjects: 12,
    activeProjects: 7,
    completedProjects: 4,
    onHoldProjects: 1,
    totalTasks: 156,
    completedTasks: 89,
    overdueTasks: 12,
    totalBudget: 250000.00,
    spentBudget: 145000.00,
    teamUtilization: 78.5
  });

  // Filter functions
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status.toLowerCase().replace(' ', '-') === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || project.priority.toLowerCase() === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || task.status.toLowerCase().replace(' ', '-') === selectedStatus;
    const matchesPriority = selectedPriority === 'all' || task.priority.toLowerCase() === selectedPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      case 'Todo': return 'bg-purple-100 text-purple-800';
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

  const getWorkloadColor = (workload) => {
    if (workload >= 90) return 'bg-red-500';
    if (workload >= 75) return 'bg-yellow-500';
    if (workload >= 50) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalProjects}</p>
              <p className="text-sm text-blue-600">{analytics.activeProjects} active</p>
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
              <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.completedTasks}</p>
              <p className="text-sm text-gray-600">of {analytics.totalTasks} total</p>
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
              <p className="text-sm font-medium text-gray-600">Budget Spent</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.spentBudget / 1000).toFixed(0)}k</p>
              <p className="text-sm text-gray-600">of ${(analytics.totalBudget / 1000).toFixed(0)}k total</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Team Utilization</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.teamUtilization}%</p>
              <p className="text-sm text-gray-600">Average workload</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Active Projects Progress</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.filter(p => p.status === 'In Progress').map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{project.name}</h4>
                    <span className="text-sm text-gray-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>Manager: {project.manager}</span>
                    <span>Due: {project.endDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Workload */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Team Workload</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member) => (
              <div key={member.id} className="flex items-center p-4 border rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getWorkloadColor(member.workload)}`}
                        style={{ width: `${member.workload}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{member.workload}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    task.status === 'Completed' ? 'bg-green-500' :
                    task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600">{task.project} • {task.assignee}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{task.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search projects..."
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
              <option value="planning">Planning</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Project
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{project.description}</p>
            
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Budget</p>
                  <p className="text-lg font-bold text-green-600">${(project.budget / 1000).toFixed(0)}k</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Tasks</p>
                  <p className="text-lg font-bold text-blue-600">{project.completedTasks}/{project.tasks}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Manager</p>
                <p className="text-sm text-gray-600">{project.manager}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Team ({project.team.length})</p>
                <div className="flex -space-x-2 mt-1">
                  {project.team.slice(0, 4).map((member, index) => (
                    <div key={index} className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                  ))}
                  {project.team.length > 4 && (
                    <div className="w-6 h-6 bg-gray-500 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-white">+{project.team.length - 4}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    View
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search tasks..."
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
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Task
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description.substring(0, 50)}...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.project}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.assignee}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.actualHours}/{task.estimatedHours}h</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search team members..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Member
            </button>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Email: {member.email}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Active Projects</p>
                  <p className="text-lg font-bold text-blue-600">{member.activeProjects}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Completed Tasks</p>
                  <p className="text-lg font-bold text-green-600">{member.completedTasks}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Workload</p>
                <div className="flex items-center mt-1">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getWorkloadColor(member.workload)}`}
                      style={{ width: `${member.workload}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{member.workload}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Skills</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      +{member.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Profile
                </button>
                <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Assign Task
                </button>
              </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
          <p className="mt-2 text-gray-600">Manage projects, tasks, and team collaboration</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'projects', name: 'Projects', icon: '📁' },
              { id: 'tasks', name: 'Tasks', icon: '✅' },
              { id: 'team', name: 'Team', icon: '👥' }
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
        {activeTab === 'projects' && renderProjects()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'team' && renderTeam()}
      </div>
    </div>
  );
};

export default ProjectManagementModule;

