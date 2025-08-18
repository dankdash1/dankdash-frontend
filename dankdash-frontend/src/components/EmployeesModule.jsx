import React, { useState, useEffect } from 'react';

const EmployeesModule = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

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
      usedSick: 3
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
      usedSick: 1
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
      usedSick: 2
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
      birthDate: '1987-09-18',
      ssn: '***-**-3456',
      benefits: ['Health Insurance', 'Dental', '401k'],
      skills: ['Cannabis Regulations', 'Legal Compliance', 'Documentation'],
      performance: 4.7,
      vacationDays: 15,
      usedVacation: 10,
      sickDays: 10,
      usedSick: 4
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
      hireDate: '2023-04-15',
      status: 'On Leave',
      salary: 58000.00,
      payType: 'Salary',
      address: '654 Marketing Blvd, Los Angeles, CA 90210',
      emergencyContact: 'Tom Davis - (555) 678-9012',
      birthDate: '1992-11-25',
      ssn: '***-**-7890',
      benefits: ['Health Insurance', 'Dental', 'Vision'],
      skills: ['Digital Marketing', 'Social Media', 'Content Creation'],
      performance: 4.5,
      vacationDays: 15,
      usedVacation: 15,
      sickDays: 10,
      usedSick: 6
    }
  ]);

  const [departments, setDepartments] = useState([
    {
      id: 'DEPT-001',
      name: 'Operations',
      manager: 'Sarah Johnson',
      employees: 8,
      budget: 450000.00,
      description: 'Daily operations and facility management'
    },
    {
      id: 'DEPT-002',
      name: 'Technology',
      manager: 'Mike Chen',
      employees: 6,
      budget: 650000.00,
      description: 'Software development and IT infrastructure'
    },
    {
      id: 'DEPT-003',
      name: 'Delivery',
      manager: 'Lisa Rodriguez',
      employees: 12,
      budget: 280000.00,
      description: 'Product delivery and logistics'
    },
    {
      id: 'DEPT-004',
      name: 'Compliance',
      manager: 'Alex Kim',
      employees: 3,
      budget: 180000.00,
      description: 'Regulatory compliance and legal affairs'
    },
    {
      id: 'DEPT-005',
      name: 'Marketing',
      manager: 'Emma Davis',
      employees: 4,
      budget: 220000.00,
      description: 'Marketing and customer acquisition'
    }
  ]);

  const [payroll, setPayroll] = useState([
    {
      id: 'PAY-001',
      period: '2024-08-01 to 2024-08-15',
      employeeId: 'DD001',
      employeeName: 'Sarah Johnson',
      grossPay: 2884.62,
      deductions: 865.38,
      netPay: 2019.24,
      hoursWorked: 80,
      overtimeHours: 0,
      status: 'Paid'
    },
    {
      id: 'PAY-002',
      period: '2024-08-01 to 2024-08-15',
      employeeId: 'DD002',
      employeeName: 'Mike Chen',
      grossPay: 3653.85,
      deductions: 1096.15,
      netPay: 2557.70,
      hoursWorked: 80,
      overtimeHours: 5,
      status: 'Paid'
    },
    {
      id: 'PAY-003',
      period: '2024-08-01 to 2024-08-15',
      employeeId: 'DD003',
      employeeName: 'Lisa Rodriguez',
      grossPay: 1480.00,
      deductions: 296.00,
      netPay: 1184.00,
      hoursWorked: 80,
      overtimeHours: 0,
      status: 'Pending'
    }
  ]);

  const [timeOff, setTimeOff] = useState([
    {
      id: 'TO-001',
      employeeId: 'DD001',
      employeeName: 'Sarah Johnson',
      type: 'Vacation',
      startDate: '2024-08-20',
      endDate: '2024-08-23',
      days: 4,
      status: 'Approved',
      reason: 'Family vacation',
      approvedBy: 'John Smith'
    },
    {
      id: 'TO-002',
      employeeId: 'DD002',
      employeeName: 'Mike Chen',
      type: 'Sick Leave',
      startDate: '2024-08-15',
      endDate: '2024-08-16',
      days: 2,
      status: 'Approved',
      reason: 'Medical appointment',
      approvedBy: 'Sarah Johnson'
    },
    {
      id: 'TO-003',
      employeeId: 'DD005',
      employeeName: 'Emma Davis',
      type: 'Maternity Leave',
      startDate: '2024-07-01',
      endDate: '2024-09-30',
      days: 90,
      status: 'Active',
      reason: 'Maternity leave',
      approvedBy: 'Sarah Johnson'
    }
  ]);

  const [analytics, setAnalytics] = useState({
    totalEmployees: 33,
    activeEmployees: 31,
    onLeaveEmployees: 2,
    newHires: 5,
    avgSalary: 67500.00,
    totalPayroll: 2227500.00,
    turnoverRate: 8.5,
    avgPerformance: 4.7
  });

  // Filter functions
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || employee.status.toLowerCase().replace(' ', '-') === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance) => {
    if (performance >= 4.5) return 'text-green-600';
    if (performance >= 4.0) return 'text-blue-600';
    if (performance >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalEmployees}</p>
              <p className="text-sm text-green-600">{analytics.newHires} new hires</p>
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
              <p className="text-sm font-medium text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">${(analytics.totalPayroll / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-gray-600">Annual</p>
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
              <p className="text-2xl font-bold text-gray-900">{analytics.avgPerformance}</p>
              <p className="text-sm text-green-600">Out of 5.0</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Turnover Rate</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.turnoverRate}%</p>
              <p className="text-sm text-gray-600">Annual rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Overview */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Department Overview</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div key={dept.id} className="p-4 border rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{dept.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Manager:</span>
                    <span className="text-gray-900">{dept.manager}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Employees:</span>
                    <span className="text-blue-600">{dept.employees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget:</span>
                    <span className="text-green-600">${(dept.budget / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Time Off Requests */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Recent Time Off Requests</h3>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {timeOff.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{request.employeeName}</h4>
                    <p className="text-sm text-gray-600">{request.type} • {request.days} days</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">{request.startDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderEmployees = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <input
              type="text"
              placeholder="Search employees..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="terminated">Terminated</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* Employees Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{employee.firstName} {employee.lastName}</h3>
                  <p className="text-sm text-gray-600">{employee.position}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                {employee.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Department: {employee.department}</p>
                <p className="text-sm text-gray-600">Employee ID: {employee.employeeId}</p>
                <p className="text-sm text-gray-600">Hire Date: {employee.hireDate}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Salary:</p>
                  <p className="text-lg font-bold text-green-600">
                    ${employee.payType === 'Hourly' ? employee.salary.toFixed(2) + '/hr' : (employee.salary / 1000).toFixed(0) + 'k'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Performance:</p>
                  <p className={`text-lg font-bold ${getPerformanceColor(employee.performance)}`}>
                    {employee.performance}/5.0
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Time Off:</p>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Vacation: {employee.usedVacation}/{employee.vacationDays}</span>
                  <span>Sick: {employee.usedSick}/{employee.sickDays}</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-700">Skills:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {employee.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  View Profile
                </button>
                <button className="flex-1 px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPayroll = () => (
    <div className="space-y-6">
      {/* Payroll Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payroll Summary</h3>
            <p className="text-sm text-gray-600">Current pay period: August 1-15, 2024</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Process Payroll
            </button>
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Payroll Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payroll.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                      <div className="text-sm text-gray-500">{record.employeeId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.hoursWorked}
                    {record.overtimeHours > 0 && (
                      <span className="text-orange-600"> (+{record.overtimeHours} OT)</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${record.grossPay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">${record.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">${record.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Print</button>
                    <button className="text-gray-600 hover:text-gray-900">Email</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTimeOff = () => (
    <div className="space-y-6">
      {/* Search and Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search time off requests..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              New Request
            </button>
          </div>
        </div>
      </div>

      {/* Time Off Requests */}
      <div className="space-y-4">
        {timeOff.map((request) => (
          <div key={request.id} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{request.employeeName}</h3>
                  <p className="text-sm text-gray-600">{request.type}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                {request.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Start Date:</p>
                <p className="text-sm text-gray-600">{request.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">End Date:</p>
                <p className="text-sm text-gray-600">{request.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Days:</p>
                <p className="text-sm text-blue-600">{request.days} days</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Approved By:</p>
                <p className="text-sm text-gray-600">{request.approvedBy}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700">Reason:</p>
              <p className="text-sm text-gray-600">{request.reason}</p>
            </div>
            
            {request.status === 'Pending' && (
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                  Approve
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                  Reject
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  View Details
                </button>
              </div>
            )}
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
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="mt-2 text-gray-600">Manage employees, payroll, and HR processes</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'employees', name: 'Employees', icon: '👥' },
              { id: 'payroll', name: 'Payroll', icon: '💰' },
              { id: 'timeoff', name: 'Time Off', icon: '🏖️' }
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
        {activeTab === 'employees' && renderEmployees()}
        {activeTab === 'payroll' && renderPayroll()}
        {activeTab === 'timeoff' && renderTimeOff()}
      </div>
    </div>
  );
};

export default EmployeesModule;

