import React, { useState, useEffect, useMemo } from 'react';

const EnhancedEmployeesModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [showPayrollModal, setShowPayrollModal] = useState(false);
  const [showTimeOffModal, setShowTimeOffModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Form states
  const [employeeForm, setEmployeeForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: 'Operations',
    manager: '',
    hireDate: new Date().toISOString().split('T')[0],
    salary: 0,
    payType: 'Salary',
    address: '',
    emergencyContact: '',
    birthDate: '',
    ssn: '',
    benefits: [],
    skills: []
  });

  const [timeOffForm, setTimeOffForm] = useState({
    employeeId: '',
    type: 'Vacation',
    startDate: '',
    endDate: '',
    days: 1,
    reason: '',
    status: 'Pending'
  });

  const [performanceForm, setPerformanceForm] = useState({
    employeeId: '',
    reviewDate: new Date().toISOString().split('T')[0],
    reviewer: '',
    period: 'Q4 2024',
    overallRating: 5,
    goals: '',
    achievements: '',
    improvements: '',
    comments: ''
  });

  // Mock employee data
  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      employeeId: 'DD001',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@dankdash.com',
      phone: '+1 (555) 123-4567',
      position: 'Operations Manager',
      department: 'Operations',
      manager: 'John Smith',
      hireDate: '2023-01-15',
      status: 'Active',
      salary: 75000.00,
      payType: 'Salary',
      address: '123 Main St, San Francisco, CA 94102',
      emergencyContact: 'Mike Johnson - (555) 234-5678',
      birthDate: '1990-05-15',
      ssn: '***-**-1234',
      benefits: ['Health Insurance', 'Dental', '401k'],
      skills: ['Project Management', 'Cannabis Operations', 'Team Leadership'],
      performance: 4.8,
      vacationDays: 15,
      usedVacation: 8,
      sickDays: 10,
      usedSick: 3,
      avatar: '👩‍💼'
    },
    {
      id: 'EMP-002',
      employeeId: 'DD002',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike.chen@dankdash.com',
      phone: '+1 (555) 234-5678',
      position: 'Senior Developer',
      department: 'Technology',
      manager: 'Sarah Johnson',
      hireDate: '2023-03-20',
      status: 'Active',
      salary: 95000.00,
      payType: 'Salary',
      address: '456 Tech Ave, San Jose, CA 95110',
      emergencyContact: 'Lisa Chen - (555) 345-6789',
      birthDate: '1988-08-22',
      ssn: '***-**-5678',
      benefits: ['Health Insurance', 'Dental', 'Vision', '401k'],
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      performance: 4.9,
      vacationDays: 20,
      usedVacation: 12,
      sickDays: 10,
      usedSick: 1,
      avatar: '👨‍💻'
    },
    {
      id: 'EMP-003',
      employeeId: 'DD003',
      firstName: 'Lisa',
      lastName: 'Rodriguez',
      email: 'lisa.rodriguez@dankdash.com',
      phone: '+1 (555) 345-6789',
      position: 'Delivery Driver',
      department: 'Delivery',
      manager: 'Sarah Johnson',
      hireDate: '2023-06-10',
      status: 'Active',
      salary: 18.50,
      payType: 'Hourly',
      address: '789 Delivery Rd, Oakland, CA 94612',
      emergencyContact: 'Carlos Rodriguez - (555) 456-7890',
      birthDate: '1995-12-03',
      ssn: '***-**-9012',
      benefits: ['Health Insurance', 'Dental'],
      skills: ['Safe Driving', 'Customer Service', 'Cannabis Knowledge'],
      performance: 4.6,
      vacationDays: 10,
      usedVacation: 5,
      sickDays: 8,
      usedSick: 2,
      avatar: '🚗'
    },
    {
      id: 'EMP-004',
      employeeId: 'DD004',
      firstName: 'Alex',
      lastName: 'Kim',
      email: 'alex.kim@dankdash.com',
      phone: '+1 (555) 456-7890',
      position: 'Compliance Officer',
      department: 'Compliance',
      manager: 'John Smith',
      hireDate: '2023-02-28',
      status: 'Active',
      salary: 68000.00,
      payType: 'Salary',
      address: '321 Compliance Way, Sacramento, CA 95814',
      emergencyContact: 'Jenny Kim - (555) 567-8901',
      birthDate: '1992-11-18',
      ssn: '***-**-3456',
      benefits: ['Health Insurance', 'Dental', '401k'],
      skills: ['Cannabis Law', 'Regulatory Compliance', 'Documentation'],
      performance: 4.7,
      vacationDays: 15,
      usedVacation: 6,
      sickDays: 10,
      usedSick: 4,
      avatar: '⚖️'
    },
    {
      id: 'EMP-005',
      employeeId: 'DD005',
      firstName: 'Emma',
      lastName: 'Davis',
      email: 'emma.davis@dankdash.com',
      phone: '+1 (555) 567-8901',
      position: 'Marketing Specialist',
      department: 'Marketing',
      manager: 'Sarah Johnson',
      hireDate: '2023-04-12',
      status: 'Active',
      salary: 58000.00,
      payType: 'Salary',
      address: '654 Marketing Blvd, Los Angeles, CA 90210',
      emergencyContact: 'Tom Davis - (555) 678-9012',
      birthDate: '1993-07-25',
      ssn: '***-**-7890',
      benefits: ['Health Insurance', 'Dental', 'Vision'],
      skills: ['Digital Marketing', 'Social Media', 'Content Creation', 'Analytics'],
      performance: 4.5,
      vacationDays: 12,
      usedVacation: 7,
      sickDays: 8,
      usedSick: 1,
      avatar: '📱'
    },
    {
      id: 'EMP-006',
      employeeId: 'DD006',
      firstName: 'Tom',
      lastName: 'Brown',
      email: 'tom.brown@dankdash.com',
      phone: '+1 (555) 678-9012',
      position: 'Budtender',
      department: 'Retail',
      manager: 'Lisa Rodriguez',
      hireDate: '2023-07-01',
      status: 'Active',
      salary: 16.00,
      payType: 'Hourly',
      address: '987 Retail St, San Diego, CA 92101',
      emergencyContact: 'Mary Brown - (555) 789-0123',
      birthDate: '1996-03-14',
      ssn: '***-**-2468',
      benefits: ['Health Insurance'],
      skills: ['Cannabis Knowledge', 'Customer Service', 'Sales', 'POS Systems'],
      performance: 4.4,
      vacationDays: 8,
      usedVacation: 3,
      sickDays: 6,
      usedSick: 2,
      avatar: '🌿'
    }
  ]);

  const [timeOffRequests, setTimeOffRequests] = useState([
    {
      id: 'TO-001',
      employeeId: 'EMP-001',
      employeeName: 'Sarah Johnson',
      type: 'Vacation',
      startDate: '2024-08-25',
      endDate: '2024-08-30',
      days: 6,
      reason: 'Family vacation',
      status: 'Approved',
      requestDate: '2024-08-10',
      approvedBy: 'John Smith',
      approvedDate: '2024-08-11'
    },
    {
      id: 'TO-002',
      employeeId: 'EMP-002',
      employeeName: 'Mike Chen',
      type: 'Sick',
      startDate: '2024-08-20',
      endDate: '2024-08-20',
      days: 1,
      reason: 'Medical appointment',
      status: 'Approved',
      requestDate: '2024-08-19',
      approvedBy: 'Sarah Johnson',
      approvedDate: '2024-08-19'
    },
    {
      id: 'TO-003',
      employeeId: 'EMP-003',
      employeeName: 'Lisa Rodriguez',
      type: 'Personal',
      startDate: '2024-08-28',
      endDate: '2024-08-29',
      days: 2,
      reason: 'Personal matters',
      status: 'Pending',
      requestDate: '2024-08-15',
      approvedBy: null,
      approvedDate: null
    }
  ]);

  const [performanceReviews, setPerformanceReviews] = useState([
    {
      id: 'PR-001',
      employeeId: 'EMP-001',
      employeeName: 'Sarah Johnson',
      reviewDate: '2024-07-15',
      reviewer: 'John Smith',
      period: 'Q2 2024',
      overallRating: 4.8,
      goals: 'Improve team productivity, implement new processes',
      achievements: 'Led successful product launch, increased team efficiency by 25%',
      improvements: 'Focus on delegation skills, strategic planning',
      comments: 'Excellent leadership and execution. Ready for additional responsibilities.',
      status: 'Completed'
    },
    {
      id: 'PR-002',
      employeeId: 'EMP-002',
      employeeName: 'Mike Chen',
      reviewDate: '2024-07-20',
      reviewer: 'Sarah Johnson',
      period: 'Q2 2024',
      overallRating: 4.9,
      goals: 'Lead technical architecture, mentor junior developers',
      achievements: 'Delivered major platform upgrade, mentored 3 junior developers',
      improvements: 'Improve documentation practices, cross-team collaboration',
      comments: 'Outstanding technical contributions and leadership. Top performer.',
      status: 'Completed'
    }
  ]);

  const [payrollRecords, setPayrollRecords] = useState([
    {
      id: 'PAY-001',
      employeeId: 'EMP-001',
      employeeName: 'Sarah Johnson',
      payPeriod: '2024-08-01 to 2024-08-15',
      grossPay: 2884.62,
      taxes: 721.15,
      benefits: 150.00,
      netPay: 2013.47,
      hoursWorked: 80,
      overtimeHours: 0,
      status: 'Paid',
      payDate: '2024-08-16'
    },
    {
      id: 'PAY-002',
      employeeId: 'EMP-002',
      employeeName: 'Mike Chen',
      payPeriod: '2024-08-01 to 2024-08-15',
      grossPay: 3653.85,
      taxes: 913.46,
      benefits: 200.00,
      netPay: 2540.39,
      hoursWorked: 80,
      overtimeHours: 0,
      status: 'Paid',
      payDate: '2024-08-16'
    },
    {
      id: 'PAY-003',
      employeeId: 'EMP-003',
      employeeName: 'Lisa Rodriguez',
      payPeriod: '2024-08-01 to 2024-08-15',
      grossPay: 1480.00,
      taxes: 222.00,
      benefits: 75.00,
      netPay: 1183.00,
      hoursWorked: 80,
      overtimeHours: 8,
      status: 'Paid',
      payDate: '2024-08-16'
    }
  ]);

  // Filter functions
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const matchesSearch = employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'all' || employee.status.toLowerCase() === selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, selectedDepartment, selectedStatus]);

  // Employee CRUD Operations
  const handleAddEmployee = () => {
    if (!employeeForm.firstName || !employeeForm.lastName || !employeeForm.email || !employeeForm.position) {
      alert('Please fill in required fields (First Name, Last Name, Email, and Position)');
      return;
    }

    const newEmployee = {
      id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      employeeId: `DD${String(employees.length + 1).padStart(3, '0')}`,
      ...employeeForm,
      status: 'Active',
      performance: 0,
      vacationDays: employeeForm.payType === 'Salary' ? 15 : 10,
      usedVacation: 0,
      sickDays: 10,
      usedSick: 0,
      avatar: '👤'
    };

    setEmployees([...employees, newEmployee]);
    setEmployeeForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: 'Operations',
      manager: '',
      hireDate: new Date().toISOString().split('T')[0],
      salary: 0,
      payType: 'Salary',
      address: '',
      emergencyContact: '',
      birthDate: '',
      ssn: '',
      benefits: [],
      skills: []
    });
    setShowEmployeeModal(false);
    alert('Employee added successfully!');
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setEmployeeForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      position: employee.position,
      department: employee.department,
      manager: employee.manager,
      hireDate: employee.hireDate,
      salary: employee.salary,
      payType: employee.payType,
      address: employee.address,
      emergencyContact: employee.emergencyContact,
      birthDate: employee.birthDate,
      ssn: employee.ssn,
      benefits: employee.benefits || [],
      skills: employee.skills || []
    });
    setShowEmployeeModal(true);
  };

  const handleUpdateEmployee = () => {
    if (!employeeForm.firstName || !employeeForm.lastName || !employeeForm.email || !employeeForm.position) {
      alert('Please fill in required fields (First Name, Last Name, Email, and Position)');
      return;
    }

    const updatedEmployees = employees.map(employee =>
      employee.id === editingEmployee.id
        ? { ...employee, ...employeeForm }
        : employee
    );

    setEmployees(updatedEmployees);
    setEditingEmployee(null);
    setEmployeeForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: 'Operations',
      manager: '',
      hireDate: new Date().toISOString().split('T')[0],
      salary: 0,
      payType: 'Salary',
      address: '',
      emergencyContact: '',
      birthDate: '',
      ssn: '',
      benefits: [],
      skills: []
    });
    setShowEmployeeModal(false);
    alert('Employee updated successfully!');
  };

  const handleDeleteEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee? This action cannot be undone.')) {
      setEmployees(employees.filter(employee => employee.id !== employeeId));
      alert('Employee deleted successfully!');
    }
  };

  const handleDeactivateEmployee = (employeeId) => {
    if (window.confirm('Are you sure you want to deactivate this employee?')) {
      const updatedEmployees = employees.map(employee =>
        employee.id === employeeId
          ? { ...employee, status: 'Inactive' }
          : employee
      );
      setEmployees(updatedEmployees);
      alert('Employee deactivated successfully!');
    }
  };

  // Time Off Operations
  const handleAddTimeOffRequest = () => {
    if (!timeOffForm.employeeId || !timeOffForm.startDate || !timeOffForm.endDate) {
      alert('Please fill in required fields (Employee, Start Date, and End Date)');
      return;
    }

    const employee = employees.find(emp => emp.id === timeOffForm.employeeId);
    const newRequest = {
      id: `TO-${String(timeOffRequests.length + 1).padStart(3, '0')}`,
      ...timeOffForm,
      employeeName: employee ? `${employee.firstName} ${employee.lastName}` : '',
      requestDate: new Date().toISOString().split('T')[0],
      approvedBy: null,
      approvedDate: null
    };

    setTimeOffRequests([...timeOffRequests, newRequest]);
    setTimeOffForm({
      employeeId: '',
      type: 'Vacation',
      startDate: '',
      endDate: '',
      days: 1,
      reason: '',
      status: 'Pending'
    });
    setShowTimeOffModal(false);
    alert('Time off request submitted successfully!');
  };

  const handleApproveTimeOff = (requestId) => {
    if (window.confirm('Are you sure you want to approve this time off request?')) {
      const updatedRequests = timeOffRequests.map(request =>
        request.id === requestId
          ? { 
              ...request, 
              status: 'Approved',
              approvedBy: 'Current User',
              approvedDate: new Date().toISOString().split('T')[0]
            }
          : request
      );
      setTimeOffRequests(updatedRequests);
      alert('Time off request approved successfully!');
    }
  };

  const handleDenyTimeOff = (requestId) => {
    if (window.confirm('Are you sure you want to deny this time off request?')) {
      const updatedRequests = timeOffRequests.map(request =>
        request.id === requestId
          ? { 
              ...request, 
              status: 'Denied',
              approvedBy: 'Current User',
              approvedDate: new Date().toISOString().split('T')[0]
            }
          : request
      );
      setTimeOffRequests(updatedRequests);
      alert('Time off request denied successfully!');
    }
  };

  // Performance Review Operations
  const handleAddPerformanceReview = () => {
    if (!performanceForm.employeeId || !performanceForm.reviewer || !performanceForm.period) {
      alert('Please fill in required fields (Employee, Reviewer, and Period)');
      return;
    }

    const employee = employees.find(emp => emp.id === performanceForm.employeeId);
    const newReview = {
      id: `PR-${String(performanceReviews.length + 1).padStart(3, '0')}`,
      ...performanceForm,
      employeeName: employee ? `${employee.firstName} ${employee.lastName}` : '',
      status: 'Completed'
    };

    setPerformanceReviews([...performanceReviews, newReview]);
    
    // Update employee performance rating
    const updatedEmployees = employees.map(emp =>
      emp.id === performanceForm.employeeId
        ? { ...emp, performance: performanceForm.overallRating }
        : emp
    );
    setEmployees(updatedEmployees);

    setPerformanceForm({
      employeeId: '',
      reviewDate: new Date().toISOString().split('T')[0],
      reviewer: '',
      period: 'Q4 2024',
      overallRating: 5,
      goals: '',
      achievements: '',
      improvements: '',
      comments: ''
    });
    setShowPerformanceModal(false);
    alert('Performance review added successfully!');
  };

  // Payroll Operations
  const generatePayroll = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    const hoursWorked = 80; // Bi-weekly
    const overtimeHours = 0;
    
    let grossPay;
    if (employee.payType === 'Salary') {
      grossPay = employee.salary / 26; // Bi-weekly salary
    } else {
      grossPay = (hoursWorked * employee.salary) + (overtimeHours * employee.salary * 1.5);
    }

    const taxes = grossPay * 0.25; // Simplified tax calculation
    const benefits = employee.benefits.length * 50; // $50 per benefit
    const netPay = grossPay - taxes - benefits;

    const newPayroll = {
      id: `PAY-${String(payrollRecords.length + 1).padStart(3, '0')}`,
      employeeId: employee.id,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      payPeriod: `${new Date().toISOString().split('T')[0]} to ${new Date(Date.now() + 14*24*60*60*1000).toISOString().split('T')[0]}`,
      grossPay: Math.round(grossPay * 100) / 100,
      taxes: Math.round(taxes * 100) / 100,
      benefits: benefits,
      netPay: Math.round(netPay * 100) / 100,
      hoursWorked,
      overtimeHours,
      status: 'Generated',
      payDate: new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0]
    };

    setPayrollRecords([...payrollRecords, newPayroll]);
    alert(`Payroll generated for ${employee.firstName} ${employee.lastName}`);
  };

  // Utility functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Denied': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Generated': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return '⭐'.repeat(fullStars) + (hasHalfStar ? '⭐' : '') + '☆'.repeat(5 - Math.ceil(rating));
  };

  const calculateTenure = (hireDate) => {
    const hire = new Date(hireDate);
    const now = new Date();
    const months = (now.getFullYear() - hire.getFullYear()) * 12 + (now.getMonth() - hire.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0) {
      return `${years}y ${remainingMonths}m`;
    }
    return `${remainingMonths}m`;
  };

  // Dashboard calculations
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
  const totalPayroll = payrollRecords.reduce((sum, record) => sum + record.netPay, 0);
  const pendingTimeOff = timeOffRequests.filter(req => req.status === 'Pending').length;
  const avgPerformance = employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length;

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
              <p className="text-sm text-blue-600">{activeEmployees} active</p>
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
              <p className="text-sm font-medium text-gray-600">Monthly Payroll</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayroll * 2)}</p>
              <p className="text-sm text-green-600">Bi-weekly: {formatCurrency(totalPayroll)}</p>
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
              <p className="text-sm font-medium text-gray-600">Pending Time Off</p>
              <p className="text-2xl font-bold text-gray-900">{pendingTimeOff}</p>
              <p className="text-sm text-yellow-600">Awaiting approval</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900">{avgPerformance.toFixed(1)}</p>
              <p className="text-sm text-purple-600">{getRatingStars(avgPerformance)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{[...new Set(employees.map(emp => emp.department))].length}</p>
              <p className="text-sm text-orange-600">Active departments</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Employees */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Hires</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {employees.slice(-5).reverse().map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{employee.avatar}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</h4>
                    <p className="text-sm text-gray-600">{employee.position} • {employee.department}</p>
                    <p className="text-sm text-gray-500">Hired: {employee.hireDate} • Tenure: {calculateTenure(employee.hireDate)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-900">{formatCurrency(employee.salary)}</p>
                    <p className="text-gray-500">{employee.payType}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                    {employee.status}
                  </span>
                  <span className="text-sm">{getRatingStars(employee.performance)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Department Breakdown</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...new Set(employees.map(emp => emp.department))].map((department) => {
              const deptEmployees = employees.filter(emp => emp.department === department);
              const avgSalary = deptEmployees.reduce((sum, emp) => sum + emp.salary, 0) / deptEmployees.length;
              
              return (
                <div key={department} className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900">{department}</h4>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employees:</span>
                      <span className="text-gray-900">{deptEmployees.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Salary:</span>
                      <span className="text-gray-900">{formatCurrency(avgSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Active:</span>
                      <span className="text-gray-900">{deptEmployees.filter(emp => emp.status === 'Active').length}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setShowEmployeeModal(true)}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-left"
            >
              Add New Employee
            </button>
            <button
              onClick={() => setShowTimeOffModal(true)}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-left"
            >
              Request Time Off
            </button>
            <button
              onClick={() => setShowPerformanceModal(true)}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-left"
            >
              Add Performance Review
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">HR Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Conduct regular performance reviews</p>
            <p>• Maintain accurate employee records</p>
            <p>• Ensure compliance with labor laws</p>
            <p>• Provide competitive benefits packages</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="text-gray-600">Payroll processing - Aug 30</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gray-600">Q3 reviews due - Sep 15</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              <span className="text-gray-600">Benefits enrollment - Oct 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex-1 max-w-lg flex space-x-4">
          <input
            type="text"
            placeholder="Search employees..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {[...new Set(employees.map(emp => emp.department))].map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>
        <button 
          onClick={() => setShowEmployeeModal(true)}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-3xl">{employee.avatar}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{employee.firstName} {employee.lastName}</h4>
                <p className="text-sm text-gray-600">{employee.position}</p>
                <p className="text-sm text-gray-500">{employee.department}</p>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                {employee.status}
              </span>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Employee ID:</span>
                <span className="text-gray-900">{employee.employeeId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="text-gray-900">{employee.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hire Date:</span>
                <span className="text-gray-900">{employee.hireDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tenure:</span>
                <span className="text-gray-900">{calculateTenure(employee.hireDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Salary:</span>
                <span className="text-gray-900">{formatCurrency(employee.salary)} {employee.payType === 'Hourly' ? '/hr' : '/yr'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Performance:</span>
                <span className="text-gray-900">{getRatingStars(employee.performance)}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Skills:</p>
              <div className="flex flex-wrap gap-1">
                {employee.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {skill}
                  </span>
                ))}
                {employee.skills.length > 3 && (
                  <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                    +{employee.skills.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Vacation: {employee.usedVacation}/{employee.vacationDays}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => alert(`Viewing employee: ${employee.firstName} ${employee.lastName}`)}
                  className="text-blue-600 hover:text-blue-900 text-sm"
                >
                  View
                </button>
                <button 
                  onClick={() => handleEditEmployee(employee)}
                  className="text-green-600 hover:text-green-900 text-sm"
                >
                  Edit
                </button>
                <button 
                  onClick={() => generatePayroll(employee.id)}
                  className="text-purple-600 hover:text-purple-900 text-sm"
                >
                  Payroll
                </button>
                <button 
                  onClick={() => handleDeactivateEmployee(employee.id)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTimeOff = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Time Off Requests</h3>
        <button 
          onClick={() => setShowTimeOffModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          New Request
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeOffRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {request.employeeName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.startDate} to {request.endDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.days}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {request.reason}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {request.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleApproveTimeOff(request.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleDenyTimeOff(request.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Deny
                      </button>
                    </div>
                  )}
                  {request.status !== 'Pending' && (
                    <span className="text-gray-500">
                      {request.status} by {request.approvedBy}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayroll = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Payroll Records</h3>
        <button 
          onClick={() => alert('Bulk payroll generation opened')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Generate Payroll
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pay Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrollRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {record.employeeName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.payPeriod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {record.hoursWorked} + {record.overtimeHours} OT
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(record.grossPay)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(record.taxes + record.benefits)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(record.netPay)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Performance Reviews</h3>
        <button 
          onClick={() => setShowPerformanceModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          New Review
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {performanceReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-gray-900">{review.employeeName}</h4>
                <p className="text-sm text-gray-600">{review.period} • {review.reviewDate}</p>
                <p className="text-sm text-gray-500">Reviewed by: {review.reviewer}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{review.overallRating}</div>
                <div className="text-sm text-gray-600">{getRatingStars(review.overallRating)}</div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-gray-700">Goals:</p>
                <p className="text-gray-600">{review.goals}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Achievements:</p>
                <p className="text-gray-600">{review.achievements}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Areas for Improvement:</p>
                <p className="text-gray-600">{review.improvements}</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Comments:</p>
                <p className="text-gray-600">{review.comments}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                {review.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Employee Modal
  const EmployeeModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name *</label>
              <input
                type="text"
                value={employeeForm.firstName}
                onChange={(e) => setEmployeeForm({...employeeForm, firstName: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name *</label>
              <input
                type="text"
                value={employeeForm.lastName}
                onChange={(e) => setEmployeeForm({...employeeForm, lastName: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email *</label>
              <input
                type="email"
                value={employeeForm.email}
                onChange={(e) => setEmployeeForm({...employeeForm, email: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={employeeForm.phone}
                onChange={(e) => setEmployeeForm({...employeeForm, phone: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Position *</label>
              <input
                type="text"
                value={employeeForm.position}
                onChange={(e) => setEmployeeForm({...employeeForm, position: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                value={employeeForm.department}
                onChange={(e) => setEmployeeForm({...employeeForm, department: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Operations">Operations</option>
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Compliance">Compliance</option>
                <option value="Delivery">Delivery</option>
                <option value="Retail">Retail</option>
                <option value="Finance">Finance</option>
                <option value="HR">HR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Manager</label>
              <input
                type="text"
                value={employeeForm.manager}
                onChange={(e) => setEmployeeForm({...employeeForm, manager: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hire Date</label>
              <input
                type="date"
                value={employeeForm.hireDate}
                onChange={(e) => setEmployeeForm({...employeeForm, hireDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pay Type</label>
              <select
                value={employeeForm.payType}
                onChange={(e) => setEmployeeForm({...employeeForm, payType: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Salary">Salary</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {employeeForm.payType === 'Salary' ? 'Annual Salary' : 'Hourly Rate'}
              </label>
              <input
                type="number"
                step="0.01"
                value={employeeForm.salary}
                onChange={(e) => setEmployeeForm({...employeeForm, salary: parseFloat(e.target.value) || 0})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                value={employeeForm.birthDate}
                onChange={(e) => setEmployeeForm({...employeeForm, birthDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SSN (Last 4 digits)</label>
              <input
                type="text"
                value={employeeForm.ssn}
                onChange={(e) => setEmployeeForm({...employeeForm, ssn: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="***-**-1234"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={employeeForm.address}
                onChange={(e) => setEmployeeForm({...employeeForm, address: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
              <textarea
                value={employeeForm.emergencyContact}
                onChange={(e) => setEmployeeForm({...employeeForm, emergencyContact: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name - Phone Number"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowEmployeeModal(false);
                setEditingEmployee(null);
                setEmployeeForm({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  position: '',
                  department: 'Operations',
                  manager: '',
                  hireDate: new Date().toISOString().split('T')[0],
                  salary: 0,
                  payType: 'Salary',
                  address: '',
                  emergencyContact: '',
                  birthDate: '',
                  ssn: '',
                  benefits: [],
                  skills: []
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingEmployee ? 'Update' : 'Add'} Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Time Off Modal
  const TimeOffModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Request Time Off</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee *</label>
              <select
                value={timeOffForm.employeeId}
                onChange={(e) => setTimeOffForm({...timeOffForm, employeeId: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                value={timeOffForm.type}
                onChange={(e) => setTimeOffForm({...timeOffForm, type: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Vacation">Vacation</option>
                <option value="Sick">Sick</option>
                <option value="Personal">Personal</option>
                <option value="Bereavement">Bereavement</option>
                <option value="Jury Duty">Jury Duty</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date *</label>
              <input
                type="date"
                value={timeOffForm.startDate}
                onChange={(e) => setTimeOffForm({...timeOffForm, startDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date *</label>
              <input
                type="date"
                value={timeOffForm.endDate}
                onChange={(e) => setTimeOffForm({...timeOffForm, endDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Days</label>
              <input
                type="number"
                value={timeOffForm.days}
                onChange={(e) => setTimeOffForm({...timeOffForm, days: parseInt(e.target.value) || 1})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reason</label>
              <textarea
                value={timeOffForm.reason}
                onChange={(e) => setTimeOffForm({...timeOffForm, reason: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                placeholder="Reason for time off request..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => {
                setShowTimeOffModal(false);
                setTimeOffForm({
                  employeeId: '',
                  type: 'Vacation',
                  startDate: '',
                  endDate: '',
                  days: 1,
                  reason: '',
                  status: 'Pending'
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTimeOffRequest}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Performance Review Modal
  const PerformanceModal = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-5 border w-2/3 max-w-4xl shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Review</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Employee *</label>
              <select
                value={performanceForm.employeeId}
                onChange={(e) => setPerformanceForm({...performanceForm, employeeId: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(employee => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstName} {employee.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Reviewer *</label>
              <input
                type="text"
                value={performanceForm.reviewer}
                onChange={(e) => setPerformanceForm({...performanceForm, reviewer: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Review Date</label>
              <input
                type="date"
                value={performanceForm.reviewDate}
                onChange={(e) => setPerformanceForm({...performanceForm, reviewDate: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Review Period *</label>
              <input
                type="text"
                value={performanceForm.period}
                onChange={(e) => setPerformanceForm({...performanceForm, period: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Q4 2024"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Overall Rating</label>
              <select
                value={performanceForm.overallRating}
                onChange={(e) => setPerformanceForm({...performanceForm, overallRating: parseFloat(e.target.value)})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value={5}>5 - Exceptional</option>
                <option value={4.5}>4.5 - Exceeds Expectations</option>
                <option value={4}>4 - Meets Expectations</option>
                <option value={3.5}>3.5 - Below Expectations</option>
                <option value={3}>3 - Needs Improvement</option>
                <option value={2}>2 - Unsatisfactory</option>
                <option value={1}>1 - Poor</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Goals & Objectives</label>
              <textarea
                value={performanceForm.goals}
                onChange={(e) => setPerformanceForm({...performanceForm, goals: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Goals and objectives for this review period..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Key Achievements</label>
              <textarea
                value={performanceForm.achievements}
                onChange={(e) => setPerformanceForm({...performanceForm, achievements: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Major accomplishments and successes..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Areas for Improvement</label>
              <textarea
                value={performanceForm.improvements}
                onChange={(e) => setPerformanceForm({...performanceForm, improvements: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Areas where employee can improve..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
              <textarea
                value={performanceForm.comments}
                onChange={(e) => setPerformanceForm({...performanceForm, comments: e.target.value})}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Additional feedback and comments..."
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowPerformanceModal(false);
                setPerformanceForm({
                  employeeId: '',
                  reviewDate: new Date().toISOString().split('T')[0],
                  reviewer: '',
                  period: 'Q4 2024',
                  overallRating: 5,
                  goals: '',
                  achievements: '',
                  improvements: '',
                  comments: ''
                });
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPerformanceReview}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
        <p className="mt-2 text-gray-600">Manage employees, payroll, time off, and performance reviews</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: '📊' },
            { id: 'employees', name: 'Employees', icon: '👥' },
            { id: 'time-off', name: 'Time Off', icon: '🏖️' },
            { id: 'payroll', name: 'Payroll', icon: '💰' },
            { id: 'performance', name: 'Performance', icon: '⭐' },
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
      {activeTab === 'employees' && renderEmployees()}
      {activeTab === 'time-off' && renderTimeOff()}
      {activeTab === 'payroll' && renderPayroll()}
      {activeTab === 'performance' && renderPerformance()}
      {activeTab === 'reports' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">HR Reports</h3>
          <p className="text-gray-600">Advanced reporting coming soon...</p>
        </div>
      )}

      {/* Modals */}
      {showEmployeeModal && <EmployeeModal />}
      {showTimeOffModal && <TimeOffModal />}
      {showPerformanceModal && <PerformanceModal />}
    </div>
  );
};

export default EnhancedEmployeesModule;

