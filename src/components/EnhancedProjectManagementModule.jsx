import React, { useState, useEffect, useMemo } from 'react';

const EnhancedProjectManagementModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    status: 'Planning',
    priority: 'Medium',
    startDate: '',
    endDate: '',
    budget: 0,
    manager: '',
    team: [],
    category: 'Development',
    goals: [],
    milestones: []
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    projectId: '',
    assignee: '',
    status: 'To Do',
    priority: 'Medium',
    dueDate: '',
    estimatedHours: 0,
    actualHours: 0,
    tags: [],
    dependencies: []
  });

  const [teamForm, setTeamForm] = useState({
    name: '',
    email: '',
    role: 'Developer',
    department: 'Engineering',
    skills: [],
    hourlyRate: 0
  });

  // Mock project data
  const [projects, setProjects] = useState([
    {
      id: 'PROJ-001',
      name: 'DankDash Mobile App Development',
      description: 'Develop native mobile applications for iOS and Android with full feature parity',
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
      category: 'Development',
      goals: ['Launch iOS app', 'Launch Android app', 'Achieve 1000+ downloads'],
      milestones: [
        { id: 1, name: 'UI/UX Design Complete', date: '2024-07-15', completed: true },
        { id: 2, name: 'Backend API Integration', date: '2024-08-15', completed: true },
        { id: 3, name: 'Beta Testing', date: '2024-09-01', completed: false },
        { id: 4, name: 'App Store Submission', date: '2024-09-15', completed: false }
      ]
    },
    {
      id: 'PROJ-002',
      name: 'Cannabis Compliance System',
      description: 'Implement comprehensive state compliance tracking and reporting system for all cannabis operations',
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
      category: 'Compliance',
      goals: ['100% compliance tracking', 'Automated reporting', 'Multi-state support'],
      milestones: [
        { id: 1, name: 'Requirements Analysis', date: '2024-08-30', completed: false },
        { id: 2, name: 'System Architecture', date: '2024-09-15', completed: false },
        { id: 3, name: 'Development Phase 1', date: '2024-10-15', completed: false },
        { id: 4, name: 'Testing & Deployment', date: '2024-11-01', completed: false }
      ]
    },
    {
      id: 'PROJ-003',
      name: 'Delivery Fleet Optimization',
      description: 'Optimize delivery routes and fleet management system for maximum efficiency and cost reduction',
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
      category: 'Operations',
      goals: ['Reduce delivery time by 30%', 'Cut fuel costs by 20%', 'Improve customer satisfaction'],
      milestones: [
        { id: 1, name: 'Route Analysis', date: '2024-06-15', completed: true },
        { id: 2, name: 'Algorithm Development', date: '2024-07-01', completed: true },
        { id: 3, name: 'System Integration', date: '2024-07-15', completed: true },
        { id: 4, name: 'Performance Testing', date: '2024-07-31', completed: true }
      ]
    },
    {
      id: 'PROJ-004',
      name: 'AI Chatbot Enhancement',
      description: 'Enhance AI chatbot with advanced NLP capabilities and cannabis-specific knowledge base',
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
      category: 'AI/ML',
      goals: ['Improve response accuracy to 95%', 'Add voice support', 'Multi-language support'],
      milestones: [
        { id: 1, name: 'NLP Model Training', date: '2024-08-15', completed: true },
        { id: 2, name: 'Knowledge Base Expansion', date: '2024-08-30', completed: false },
        { id: 3, name: 'Voice Integration', date: '2024-09-10', completed: false }
      ]
    },
    {
      id: 'PROJ-005',
      name: 'Marketing Website Redesign',
      description: 'Complete redesign of marketing website and landing pages with modern UI/UX',
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
      category: 'Marketing',
      goals: ['Increase conversion rate by 40%', 'Improve SEO ranking', 'Mobile-first design'],
      milestones: [
        { id: 1, name: 'Design Mockups', date: '2024-08-01', completed: true },
        { id: 2, name: 'Content Strategy', date: '2024-08-15', completed: false },
        { id: 3, name: 'Development', date: '2024-09-15', completed: false },
        { id: 4, name: 'Launch', date: '2024-10-01', completed: false }
      ]
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: 'TASK-001',
      title: 'Design iOS App Interface',
      description: 'Create comprehensive UI/UX design for iOS mobile application',
      projectId: 'PROJ-001',
      projectName: 'DankDash Mobile App Development',
      assignee: 'Lisa Rodriguez',
      status: 'Completed',
      priority: 'High',
      dueDate: '2024-07-15',
      estimatedHours: 40,
      actualHours: 38,
      tags: ['design', 'ios', 'ui/ux'],
      dependencies: [],
      createdDate: '2024-07-01',
      completedDate: '2024-07-14'
    },
    {
      id: 'TASK-002',
      title: 'Implement User Authentication',
      description: 'Develop secure user authentication system with biometric support',
      projectId: 'PROJ-001',
      projectName: 'DankDash Mobile App Development',
      assignee: 'John Doe',
      status: 'In Progress',
      priority: 'Critical',
      dueDate: '2024-08-20',
      estimatedHours: 32,
      actualHours: 24,
      tags: ['backend', 'security', 'authentication'],
      dependencies: ['TASK-001'],
      createdDate: '2024-07-15',
      completedDate: null
    },
    {
      id: 'TASK-003',
      title: 'Cannabis Regulations Research',
      description: 'Research and document cannabis regulations for all target states',
      projectId: 'PROJ-002',
      projectName: 'Cannabis Compliance System',
      assignee: 'Emma Davis',
      status: 'In Progress',
      priority: 'Critical',
      dueDate: '2024-08-30',
      estimatedHours: 60,
      actualHours: 45,
      tags: ['research', 'compliance', 'legal'],
      dependencies: [],
      createdDate: '2024-08-15',
      completedDate: null
    },
    {
      id: 'TASK-004',
      title: 'Route Optimization Algorithm',
      description: 'Develop and test delivery route optimization algorithm',
      projectId: 'PROJ-003',
      projectName: 'Delivery Fleet Optimization',
      assignee: 'Alex Kim',
      status: 'Completed',
      priority: 'High',
      dueDate: '2024-07-01',
      estimatedHours: 50,
      actualHours: 52,
      tags: ['algorithm', 'optimization', 'delivery'],
      dependencies: [],
      createdDate: '2024-06-15',
      completedDate: '2024-06-30'
    },
    {
      id: 'TASK-005',
      title: 'NLP Model Training',
      description: 'Train natural language processing model for cannabis-specific queries',
      projectId: 'PROJ-004',
      projectName: 'AI Chatbot Enhancement',
      assignee: 'Mike Chen',
      status: 'Completed',
      priority: 'High',
      dueDate: '2024-08-15',
      estimatedHours: 35,
      actualHours: 33,
      tags: ['ai', 'nlp', 'machine-learning'],
      dependencies: [],
      createdDate: '2024-08-01',
      completedDate: '2024-08-14'
    },
    {
      id: 'TASK-006',
      title: 'Website Wireframes',
      description: 'Create detailed wireframes for all website pages',
      projectId: 'PROJ-005',
      projectName: 'Marketing Website Redesign',
      assignee: 'Lisa Rodriguez',
      status: 'To Do',
      priority: 'Medium',
      dueDate: '2024-08-25',
      estimatedHours: 25,
      actualHours: 0,
      tags: ['design', 'wireframes', 'website'],
      dependencies: [],
      createdDate: '2024-08-10',
      completedDate: null
    }
  ]);

  const [teamMembers, setTeamMembers] = useState([
    {
      id: 'TEAM-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@dankdash.com',
      role: 'Project Manager',
      department: 'Management',
      skills: ['Project Management', 'Agile', 'Scrum', 'Team Leadership'],
      hourlyRate: 85,
      activeProjects: 3,
      totalTasks: 45,
      completedTasks: 38,
      avatar: '👩‍💼'
    },
    {
      id: 'TEAM-002',
      name: 'John Doe',
      email: 'john.doe@dankdash.com',
      role: 'Senior Developer',
      department: 'Engineering',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
      hourlyRate: 95,
      activeProjects: 2,
      totalTasks: 32,
      completedTasks: 28,
      avatar: '👨‍💻'
    },
    {
      id: 'TEAM-003',
      name: 'Mike Chen',
      email: 'mike.chen@dankdash.com',
      role: 'AI/ML Engineer',
      department: 'Engineering',
      skills: ['Machine Learning', 'Python', 'TensorFlow', 'NLP', 'Data Science'],
      hourlyRate: 100,
      activeProjects: 2,
      totalTasks: 18,
      completedTasks: 15,
      avatar: '🤖'
    },
    {
      id: 'TEAM-004',
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@dankdash.com',
      role: 'UI/UX Designer',
      department: 'Design',
      skills: ['UI Design', 'UX Research', 'Figma', 'Adobe Creative Suite', 'Prototyping'],
      hourlyRate: 75,
      activeProjects: 3,
      totalTasks: 28,
      completedTasks: 24,
      avatar: '🎨'
    },
    {
      id: 'TEAM-005',
      name: 'Alex Kim',
      email: 'alex.kim@dankdash.com',
      role: 'DevOps Engineer',
      department: 'Engineering',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure'],
      hourlyRate: 90,
      activeProjects: 2,
      totalTasks: 22,
      completedTasks: 20,
      avatar: '⚙️'
    },
    {
      id: 'TEAM-006',
      name: 'Emma Davis',
      email: 'emma.davis@dankdash.com',
      role: 'Compliance Specialist',
      department: 'Legal',
      skills: ['Cannabis Law', 'Regulatory Compliance', 'Documentation', 'Risk Assessment'],
      hourlyRate: 80,
      activeProjects: 2,
      totalTasks: 15,
      completedTasks: 12,
      avatar: '⚖️'
    }
  ]);

  // Filter functions
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.manager.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || project.status.toLowerCase().replace(' ', '-') === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || project.priority.toLowerCase() === selectedPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [projects, searchTerm, selectedStatus, selectedPriority]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || task.status.toLowerCase().replace(' ', '-') === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || task.priority.toLowerCase() === selectedPriority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, selectedStatus, selectedPriority]);

  // Project CRUD Operations
  const handleAddProject = () => {
    if (!projectForm.name || !projectForm.description || !projectForm.manager) {
      alert('Please fill in required fields (Name, Description, and Manager)');
      return;
    }

    const newProject = {
      id: `PROJ-${String(projects.length + 1).padStart(3, '0')}`,
      ...projectForm,
      progress: 0,
      spent: 0,
      tasks: 0,
      completedTasks: 0,
      team: projectForm.team || []
    };

    setProjects([...projects, newProject]);
    setProjectForm({
      name: '',
      description: '',
      status: 'Planning',
      priority: 'Medium',
      startDate: '',
      endDate: '',
      budget: 0,
      manager: '',
      team: [],
      category: 'Development',
      goals: [],
      milestones: []
    });
    setShowProjectModal(false);
    alert('Project created successfully!');
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      status: project.status,
      priority: project.priority,
      startDate: project.startDate,
      endDate: project.endDate,
      budget: project.budget,
      manager: project.manager,
      team: project.team || [],
      category: project.category,
      goals: project.goals || [],
      milestones: project.milestones || []
    });
    setShowProjectModal(true);
  };

  const handleUpdateProject = () => {
    if (!projectForm.name || !projectForm.description || !projectForm.manager) {
      alert('Please fill in required fields (Name, Description, and Manager)');
      return;
    }

    const updatedProjects = projects.map(project =>
      project.id === editingProject.id
        ? { ...project, ...projectForm }
        : project
    );

    setProjects(updatedProjects);
    setEditingProject(null);
    setProjectForm({
      name: '',
      description: '',
      status: 'Planning',
      priority: 'Medium',
      startDate: '',
      endDate: '',
      budget: 0,
      manager: '',
      team: [],
      category: 'Development',
      goals: [],
      milestones: []
    });
    setShowProjectModal(false);
    alert('Project updated successfully!');
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project? This will also delete all associated tasks.')) {
      setProjects(projects.filter(project => project.id !== projectId));
      setTasks(tasks.filter(task => task.projectId !== projectId));
      alert('Project deleted successfully!');
    }
  };

  // Task CRUD Operations
  const handleAddTask = () => {
    if (!taskForm.title || !taskForm.projectId || !taskForm.assignee) {
      alert('Please fill in required fields (Title, Project, and Assignee)');
      return;
    }

    const project = projects.find(p => p.id === taskForm.projectId);
    const newTask = {
      id: `TASK-${String(tasks.length + 1).padStart(3, '0')}`,
      ...taskForm,
      projectName: project ? project.name : '',
      createdDate: new Date().toISOString().split('T')[0],
      completedDate: null,
      actualHours: 0
    };

    setTasks([...tasks, newTask]);
    
    // Update project task count
    const updatedProjects = projects.map(project =>
      project.id === taskForm.projectId
        ? { ...project, tasks: project.tasks + 1 }
        : project
    );
    setProjects(updatedProjects);

    setTaskForm({
      title: '',
      description: '',
      projectId: '',
      assignee: '',
      status: 'To Do',
      priority: 'Medium',
      dueDate: '',
      estimatedHours: 0,
      actualHours: 0,
      tags: [],
      dependencies: []
    });
    setShowTaskModal(false);
    alert('Task created successfully!');
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      projectId: task.projectId,
      assignee: task.assignee,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      actualHours: task.actualHours,
      tags: task.tags || [],
      dependencies: task.dependencies || []
    });
    setShowTaskModal(true);
  };

  const handleUpdateTask = () => {
    if (!taskForm.title || !taskForm.projectId || !taskForm.assignee) {
      alert('Please fill in required fields (Title, Project, and Assignee)');
      return;
    }

    const project = projects.find(p => p.id === taskForm.projectId);
    const oldTask = tasks.find(t => t.id === editingTask.id);
    
    const updatedTask = {
      ...editingTask,
      ...taskForm,
      projectName: project ? project.name : '',
      completedDate: taskForm.status === 'Completed' && oldTask.status !== 'Completed' 
        ? new Date().toISOString().split('T')[0] 
        : oldTask.completedDate
    };

    const updatedTasks = tasks.map(task =>
      task.id === editingTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);

    // Update project completed task count if status changed
    if (oldTask.status !== taskForm.status) {
      const updatedProjects = projects.map(project => {
        if (project.id === taskForm.projectId) {
          const projectTasks = updatedTasks.filter(t => t.projectId === project.id);
          const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
          const progress = projectTasks.length > 0 ? (completedTasks / projectTasks.length) * 100 : 0;
          
          return {
            ...project,
            completedTasks,
            progress: Math.round(progress)
          };
        }
        return project;
      });
      setProjects(updatedProjects);
    }

    setEditingTask(null);
    setTaskForm({
      title: '',
      description: '',
      projectId: '',
      assignee: '',
      status: 'To Do',
      priority: 'Medium',
      dueDate: '',
      estimatedHours: 0,
      actualHours: 0,
      tags: [],
      dependencies: []
    });
    setShowTaskModal(false);
    alert('Task updated successfully!');
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const task = tasks.find(t => t.id === taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      
      // Update project task count
      if (task) {
        const updatedProjects = projects.map(project =>
          project.id === task.projectId
            ? { 
                ...project, 
                tasks: project.tasks - 1,
                completedTasks: task.status === 'Completed' ? project.completedTasks - 1 : project.completedTasks
              }
            : project
        );
        setProjects(updatedProjects);
      }
      
      alert('Task deleted successfully!');
    }
  };

  // Team member CRUD operations
  const handleAddTeamMember = () => {
    if (!teamForm.name || !teamForm.email || !teamForm.role) {
      alert('Please fill in required fields (Name, Email, and Role)');
      return;
    }

    const newTeamMember = {
      id: `TEAM-${String(teamMembers.length + 1).padStart(3, '0')}`,
      ...teamForm,
      activeProjects: 0,
      totalTasks: 0,
      completedTasks: 0,
      avatar: '👤'
    };

    setTeamMembers([...teamMembers, newTeamMember]);
    setTeamForm({
      name: '',
      email: '',
      role: 'Developer',
      department: 'Engineering',
      skills: [],
      hourlyRate: 0
    });
    setShowTeamModal(false);
    alert('Team member added successfully!');
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      case 'On Hold': return 'bg-red-100 text-red-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Dashboard calculations
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === 'In Progress').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const overdueTasks = tasks.filter(t => 
    t.status !== 'Completed' && 
    new Date(t.dueDate) < new Date()
  ).length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
              <p className="text-sm text-blue-600">{activeProjects} active</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBudget)}</p>
              <p className="text-sm text-green-600">{formatCurrency(totalSpent)} spent</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              <p className="text-sm text-purple-600">{completedTasks} completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{overdueTasks}</p>
              <p className="text-sm text-orange-600">Need attention</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Projects</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {projects.filter(p => p.status === 'In Progress').slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.manager} • {project.team.length} team members</p>
                  <div className="mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{project.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{project.completedTasks}/{project.tasks}</p>
                    <p className="text-gray-500">Tasks</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{formatCurrency(project.spent)}</p>
                    <p className="text-gray-500">of {formatCurrency(project.budget)}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Tasks</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.projectName} • {task.assignee}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="text-sm text-gray-500">{task.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowProjectModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left"
            >
              Create New Project
            </button>
            <button
              onClick={() => setShowTaskModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left"
            >
              Add New Task
            </button>
            <button
              onClick={() => setShowTeamModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left"
            >
              Add Team Member
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Team Performance</h3>
          <div className="space-y-3">
            {teamMembers.slice(0, 3).map((member) => (
              <div key={member.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{member.avatar}</span>
                  <span className="text-sm text-gray-900">{member.name}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {member.completedTasks}/{member.totalTasks}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Project Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Break large projects into smaller, manageable tasks</p>
            <p>• Set realistic deadlines and buffer time</p>
            <p>• Regular team check-ins improve communication</p>
            <p>• Track progress with clear milestones</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg flex space-x-4">
          <input
            type="text"
            placeholder="Search projects..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button 
          onClick={() => setShowProjectModal(true)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{project.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              </div>
              <div className="flex space-x-1">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-gray-600">Manager</p>
                <p className="font-medium text-gray-900">{project.manager}</p>
              </div>
              <div>
                <p className="text-gray-600">Team Size</p>
                <p className="font-medium text-gray-900">{project.team.length} members</p>
              </div>
              <div>
                <p className="text-gray-600">Tasks</p>
                <p className="font-medium text-gray-900">{project.completedTasks}/{project.tasks}</p>
              </div>
              <div>
                <p className="text-gray-600">Budget</p>
                <p className="font-medium text-gray-900">{formatCurrency(project.budget)}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                {project.startDate} - {project.endDate}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Viewing project: ${project.name}`)}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEditProject(project)}
                  className="text-green-600 hover:text-green-900 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg flex space-x-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <button 
          onClick={() => setShowTaskModal(true)}
          className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Task
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {task.projectName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {task.assignee}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {task.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => alert(`Viewing task: ${task.title}`)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button 
                    onClick={() => handleEditTask(task)}
                    className="text-green-600 hover:text-green-900 mr-3"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Team Members</h3>
        <button 
          onClick={() => setShowTeamModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl">{member.avatar}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-sm text-gray-500">{member.department}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Projects:</span>
                <span className="font-medium text-gray-900">{member.activeProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tasks Completed:</span>
                <span className="font-medium text-gray-900">{member.completedTasks}/{member.totalTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hourly Rate:</span>
                <span className="font-medium text-gray-900">${member.hourlyRate}/hr</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Skills:</p>
              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {skill}
                  </span>
                ))}
                {member.skills.length > 3 && (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    +{member.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Viewing profile: ${member.name}`)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => alert(`Editing: ${member.name}`)}
                  className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Project Modal
  const ProjectModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name *</label>
              <input
                type="text"
                value={projectForm.name}
                onChange={(e) => setProjectForm({...projectForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={projectForm.category}
                onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Compliance">Compliance</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Design">Design</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={projectForm.status}
                onChange={(e) => setProjectForm({...projectForm, status: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={projectForm.priority}
                onChange={(e) => setProjectForm({...projectForm, priority: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={projectForm.startDate}
                onChange={(e) => setProjectForm({...projectForm, startDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={projectForm.endDate}
                onChange={(e) => setProjectForm({...projectForm, endDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Budget</label>
              <input
                type="number"
                value={projectForm.budget}
                onChange={(e) => setProjectForm({...projectForm, budget: parseFloat(e.target.value) || 0})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Manager *</label>
              <select
                value={projectForm.manager}
                onChange={(e) => setProjectForm({...projectForm, manager: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Manager</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.name}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Description *</label>
            <textarea
              value={projectForm.description}
              onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the project objectives and scope..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowProjectModal(false);
                setEditingProject(null);
                setProjectForm({
                  name: '',
                  description: '',
                  status: 'Planning',
                  priority: 'Medium',
                  startDate: '',
                  endDate: '',
                  budget: 0,
                  manager: '',
                  team: [],
                  category: 'Development',
                  goals: [],
                  milestones: []
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingProject ? handleUpdateProject : handleAddProject}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingProject ? 'Update' : 'Create'} Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Task Modal
  const TaskModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Task Title *</label>
              <input
                type="text"
                value={taskForm.title}
                onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Project *</label>
              <select
                value={taskForm.projectId}
                onChange={(e) => setTaskForm({...taskForm, projectId: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assignee *</label>
              <select
                value={taskForm.assignee}
                onChange={(e) => setTaskForm({...taskForm, assignee: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Assignee</option>
                {teamMembers.map(member => (
                  <option key={member.id} value={member.name}>
                    {member.name} - {member.role}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={taskForm.status}
                onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                value={taskForm.priority}
                onChange={(e) => setTaskForm({...taskForm, priority: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Due Date</label>
              <input
                type="date"
                value={taskForm.dueDate}
                onChange={(e) => setTaskForm({...taskForm, dueDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estimated Hours</label>
              <input
                type="number"
                value={taskForm.estimatedHours}
                onChange={(e) => setTaskForm({...taskForm, estimatedHours: parseInt(e.target.value) || 0})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Actual Hours</label>
              <input
                type="number"
                value={taskForm.actualHours}
                onChange={(e) => setTaskForm({...taskForm, actualHours: parseInt(e.target.value) || 0})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={taskForm.description}
              onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe the task requirements and acceptance criteria..."
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowTaskModal(false);
                setEditingTask(null);
                setTaskForm({
                  title: '',
                  description: '',
                  projectId: '',
                  assignee: '',
                  status: 'To Do',
                  priority: 'Medium',
                  dueDate: '',
                  estimatedHours: 0,
                  actualHours: 0,
                  tags: [],
                  dependencies: []
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingTask ? handleUpdateTask : handleAddTask}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              {editingTask ? 'Update' : 'Create'} Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Team Modal
  const TeamModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add Team Member</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                value={teamForm.name}
                onChange={(e) => setTeamForm({...teamForm, name: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={teamForm.email}
                onChange={(e) => setTeamForm({...teamForm, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Role *</label>
              <select
                value={teamForm.role}
                onChange={(e) => setTeamForm({...teamForm, role: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="Developer">Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Project Manager">Project Manager</option>
                <option value="UI/UX Designer">UI/UX Designer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Compliance Specialist">Compliance Specialist</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                value={teamForm.department}
                onChange={(e) => setTeamForm({...teamForm, department: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Management">Management</option>
                <option value="Legal">Legal</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hourly Rate</label>
              <input
                type="number"
                value={teamForm.hourlyRate}
                onChange={(e) => setTeamForm({...teamForm, hourlyRate: parseFloat(e.target.value) || 0})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowTeamModal(false);
                setTeamForm({
                  name: '',
                  email: '',
                  role: 'Developer',
                  department: 'Engineering',
                  skills: [],
                  hourlyRate: 0
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTeamMember}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <p className="mt-2 text-gray-600">Manage projects, tasks, and team collaboration</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'projects', name: 'Projects', icon: '📋' },
            { id: 'tasks', name: 'Tasks', icon: '✅' },
            { id: 'team', name: 'Team', icon: '👥' },
            { id: 'reports', name: 'Reports', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'projects' && renderProjects()}
      {activeTab === 'tasks' && renderTasks()}
      {activeTab === 'team' && renderTeam()}
      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">Project Reports</h3>
          <p className="text-gray-600">Advanced reporting coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showProjectModal && <ProjectModal />}
      {showTaskModal && <TaskModal />}
      {showTeamModal && <TeamModal />}
    </div>
  );
};

export default EnhancedProjectManagementModule;

