import React, { useState } from 'react';

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('users');
  
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Customer',
      status: 'Active',
      lastLogin: '2024-08-12 14:30',
      joinDate: '2024-07-15',
      orders: 12,
      totalSpent: 540.50,
      phone: '(555) 123-4567',
      address: '123 Main St, San Francisco, CA'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@dankdash.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2024-08-12 16:45',
      joinDate: '2024-06-01',
      orders: 0,
      totalSpent: 0,
      phone: '(555) 234-5678',
      address: 'N/A'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@dankdash.com',
      role: 'Driver',
      status: 'Active',
      lastLogin: '2024-08-12 18:20',
      joinDate: '2024-07-01',
      orders: 0,
      totalSpent: 0,
      phone: '(555) 345-6789',
      address: 'N/A',
      deliveries: 156,
      rating: 4.8,
      earnings: 2340.75
    },
    {
      id: 4,
      name: 'Lisa Rodriguez',
      email: 'lisa.rodriguez@example.com',
      role: 'Customer',
      status: 'Inactive',
      lastLogin: '2024-08-05 10:15',
      joinDate: '2024-05-20',
      orders: 3,
      totalSpent: 125.00,
      phone: '(555) 456-7890',
      address: '456 Oak Ave, Oakland, CA'
    },
    {
      id: 5,
      name: 'Admin User',
      email: 'admin@dankdash.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-08-12 19:00',
      joinDate: '2024-01-01',
      orders: 0,
      totalSpent: 0,
      phone: '(555) 567-8901',
      address: 'N/A'
    }
  ]);

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access and management',
      permissions: ['All Modules', 'User Management', 'System Settings', 'Financial Data', 'Reports'],
      userCount: 1,
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Business operations and team management',
      permissions: ['CRM', 'Sales', 'Inventory', 'Delivery', 'Reports', 'User Management (Limited)'],
      userCount: 1,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      name: 'Driver',
      description: 'Delivery operations and customer interaction',
      permissions: ['Driver App', 'Delivery Management', 'Customer Communication', 'GPS Tracking'],
      userCount: 1,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 4,
      name: 'Customer',
      description: 'Product browsing and order placement',
      permissions: ['Shop', 'Cart', 'Order History', 'Profile Management', 'Support Chat'],
      userCount: 2,
      color: 'bg-purple-100 text-purple-800'
    }
  ]);

  const [userStats, setUserStats] = useState({
    totalUsers: 5,
    activeUsers: 4,
    newThisMonth: 2,
    customerRetention: 85.5,
    avgOrderValue: 332.75,
    topCustomerSpent: 540.50
  });

  const [activityLog, setActivityLog] = useState([
    {
      id: 1,
      user: 'John Doe',
      action: 'Placed order ORD-001',
      timestamp: '2024-08-12 18:45',
      type: 'order',
      details: 'Premium OG Kush (2g) - $97.20'
    },
    {
      id: 2,
      user: 'Mike Chen',
      action: 'Completed delivery DEL-001',
      timestamp: '2024-08-12 18:30',
      type: 'delivery',
      details: 'Delivered to 123 Main St'
    },
    {
      id: 3,
      user: 'Sarah Johnson',
      action: 'Updated inventory levels',
      timestamp: '2024-08-12 17:15',
      type: 'system',
      details: 'Blue Dream Cartridge stock updated'
    },
    {
      id: 4,
      user: 'Admin User',
      action: 'Created new user role',
      timestamp: '2024-08-12 16:00',
      type: 'admin',
      details: 'Added Partner role with API access'
    },
    {
      id: 5,
      user: 'Lisa Rodriguez',
      action: 'Updated profile information',
      timestamp: '2024-08-12 15:30',
      type: 'profile',
      details: 'Changed delivery address'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-red-100 text-red-800';
      case 'Manager': return 'bg-blue-100 text-blue-800';
      case 'Driver': return 'bg-green-100 text-green-800';
      case 'Customer': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-800';
      case 'delivery': return 'bg-green-100 text-green-800';
      case 'system': return 'bg-yellow-100 text-yellow-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'profile': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUserStatusToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
  };

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Add User
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export Users
          </button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{userStats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">{userStats.activeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold">📈</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">New This Month</p>
              <p className="text-2xl font-semibold text-gray-900">{userStats.newThisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.role === 'Customer' && (
                      <div>
                        <div>{user.orders} orders</div>
                        <div>${user.totalSpent}</div>
                      </div>
                    )}
                    {user.role === 'Driver' && (
                      <div>
                        <div>{user.deliveries} deliveries</div>
                        <div>⭐ {user.rating}</div>
                      </div>
                    )}
                    {(user.role === 'Admin' || user.role === 'Manager') && (
                      <div>System User</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button 
                      onClick={() => handleUserStatusToggle(user.id)}
                      className={user.status === 'Active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Role Management</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Role
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${role.color}`}>
                  {role.name}
                </span>
                <span className="text-sm text-gray-500">{role.userCount} users</span>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Permissions:</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, index) => (
                  <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">User Activity Log</h3>
      
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="space-y-4">
            {activityLog.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg">
                <div className="flex-shrink-0">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActivityTypeColor(activity.type)}`}>
                    {activity.type}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  {activity.details && (
                    <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">User Analytics</h3>
      
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">🔄</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Customer Retention</p>
              <p className="text-2xl font-semibold text-gray-900">{userStats.customerRetention}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
              <p className="text-2xl font-semibold text-gray-900">${userStats.avgOrderValue}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold">👑</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Top Customer</p>
              <p className="text-2xl font-semibold text-gray-900">${userStats.topCustomerSpent}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Distribution Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="text-lg font-medium text-gray-900 mb-4">User Distribution by Role</h4>
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${role.color}`}>
                  {role.name}
                </span>
                <span className="text-sm text-gray-600">{role.userCount} users</span>
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(role.userCount / userStats.totalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {Math.round((role.userCount / userStats.totalUsers) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage users, roles, permissions, and track user activity</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'users', name: 'Users', icon: '👥' },
              { id: 'roles', name: 'Roles & Permissions', icon: '🔐' },
              { id: 'activity', name: 'Activity Log', icon: '📋' },
              { id: 'analytics', name: 'Analytics', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'roles' && renderRoles()}
        {activeTab === 'activity' && renderActivity()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default UserManagement;

