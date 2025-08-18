import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const OdooDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const modules = [
    { name: 'Discuss', icon: '💬', path: '/admin/discuss', category: 'Communication' },
    { name: 'Calendar', icon: '📅', path: '/admin/calendar', category: 'Planning' },
    { name: 'Appointments', icon: '🗓️', path: '/admin/appointments', category: 'Planning' },
    { name: 'To-do', icon: '📝', path: '/admin/todo', category: 'Productivity' },
    { name: 'Knowledge Base', icon: '🧠', path: '/admin/knowledge-base', category: 'Documentation' },
    { name: 'Contacts', icon: '👥', path: '/admin/contacts', category: 'CRM' },
    { name: 'CRM', icon: '📈', path: '/admin/crm', category: 'Sales' },
    { name: 'Sales', icon: '💰', path: '/admin/sales', category: 'Sales' },
    { name: 'Analytics', icon: '📊', path: '/admin/analytics', category: 'Analytics' },
    { name: 'Dashboards', icon: '📊', path: '/admin/dashboards', category: 'Analytics' },
    { name: 'Point of Sale', icon: '🛒', path: '/admin/point-of-sale', category: 'Sales' },
    { name: 'Accounting', icon: '🧾', path: '/admin/accounting', category: 'Finance' },
    { name: 'Documents', icon: '📁', path: '/admin/documents', category: 'Documentation' },
    { name: 'Project Management', icon: '🚧', path: '/admin/project-management', category: 'Operations' },
    { name: 'Planning', icon: '🗓️', path: '/admin/planning', category: 'Planning' },
    { name: 'Website', icon: '🌐', path: '/admin/website', category: 'Marketing' },
    { name: 'Social Media', icon: '📣', path: '/admin/social-media', category: 'Marketing' },
    { name: 'AI Social Media', icon: '🤖', path: '/admin/automated-social-media', category: 'Marketing' },
    { name: 'Marketing Automation', icon: '🤖', path: '/admin/marketing-automation', category: 'Marketing' },
    { name: 'Email Marketing', icon: '📧', path: '/admin/email-marketing', category: 'Marketing' },
    { name: 'SMS Marketing', icon: '📱', path: '/admin/sms-marketing', category: 'Marketing' },
    { name: 'Survey', icon: '📋', path: '/admin/survey', category: 'Analytics' },
    { name: 'Purchase', icon: '📦', path: '/admin/purchase', category: 'Operations' },
    { name: 'Inventory', icon: '📦', path: '/admin/inventory', category: 'Operations' },
    { name: 'Barcode', icon: '🏷️', path: '/admin/barcode', category: 'Operations' },
    { name: 'Maintenance', icon: '🛠️', path: '/admin/maintenance', category: 'Operations' },
    { name: 'Quality Control', icon: '✅', path: '/admin/quality-control', category: 'Operations' },
    { name: 'Compliance', icon: '📋', path: '/admin/compliance', category: 'Legal' },
    { name: 'Employees', icon: '🧑‍🤝‍🧑', path: '/admin/employees', category: 'HR' },
    { name: 'Learning', icon: '🎓', path: '/admin/learning', category: 'HR' },
    { name: 'Fleet', icon: '🚚', path: '/admin/fleet', category: 'Operations' },
    { name: 'Reporting', icon: '📊', path: '/admin/reporting', category: 'Analytics' },
    { name: 'Communication', icon: '💬', path: '/admin/communication', category: 'Communication' },
    { name: 'AI Agents', icon: '🤖', path: '/admin/ai-agents', category: 'AI' },
    { name: 'Cannabis Ops', icon: '🌿', path: '/admin/cannabis', category: 'Cannabis' },
    { name: 'E-commerce', icon: '🛒', path: '/admin/ecommerce', category: 'Sales' },
    { name: 'Website Mgmt', icon: '🌐', path: '/admin/website-management', category: 'Marketing' },
    { name: 'Driver App', icon: '🚚', path: '/admin/driver-app', category: 'Operations' },
    { name: 'User Mgmt', icon: '👥', path: '/admin/user-management', category: 'Administration' },
    { name: 'Loyalty', icon: '🎁', path: '/admin/loyalty', category: 'Marketing' },
    { name: 'Subscription', icon: '🔄', path: '/admin/subscription', category: 'Sales' },
    { name: 'Affiliate', icon: '🤝', path: '/admin/affiliate', category: 'Marketing' },
    { name: 'Events', icon: '🎉', path: '/admin/events', category: 'Marketing' },
    { name: 'API', icon: '🔌', path: '/admin/api', category: 'Technical' },
    { name: 'Grow Room', icon: '🌱', path: '/admin/grow-room', category: 'Cannabis' },
    { name: 'Grow Monitor', icon: '🤖', path: '/admin/grow-monitor', category: 'Cannabis' },
    { name: 'Grow Alerts', icon: '🚨', path: '/admin/grow-alerts', category: 'Cannabis' },
    { name: 'Backup', icon: '💾', path: '/admin/backup', category: 'Technical' },
    { name: 'Security', icon: '🔒', path: '/admin/security', category: 'Technical' },
    { name: 'Integration', icon: '🔗', path: '/admin/integration', category: 'Technical' },
    { name: 'Apps', icon: '🧩', path: '/admin/apps', category: 'Administration' },
    { name: 'Settings', icon: '⚙️', path: '/admin/settings', category: 'Administration' },
  ];

  // Filter modules based on search term
  const filteredModules = useMemo(() => {
    if (!searchTerm) return modules;
    
    return modules.filter(module =>
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Group modules by category for better organization
  const modulesByCategory = useMemo(() => {
    const grouped = {};
    filteredModules.forEach(module => {
      if (!grouped[module.category]) {
        grouped[module.category] = [];
      }
      grouped[module.category].push(module);
    });
    return grouped;
  }, [filteredModules]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header with Search */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Applications</h1>
          
          {/* Search Bar */}
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-4 text-sm text-gray-600">
              Found {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''} matching "{searchTerm}"
            </div>
          )}
        </div>

        {/* Modules Grid */}
        {searchTerm ? (
          // Show filtered results in a simple grid when searching
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {filteredModules.map((module) => (
              <Link
                key={module.name}
                to={module.path}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="text-3xl mb-2">{module.icon}</div>
                <div className="text-sm font-semibold text-gray-800 text-center">{module.name}</div>
                <div className="text-xs text-gray-500 mt-1">{module.category}</div>
              </Link>
            ))}
          </div>
        ) : (
          // Show modules grouped by category when not searching
          <div className="space-y-8">
            {Object.entries(modulesByCategory).map(([category, categoryModules]) => (
              <div key={category}>
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {category}
                  </span>
                  <span className="text-gray-500 text-sm">({categoryModules.length})</span>
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                  {categoryModules.map((module) => (
                    <Link
                      key={module.name}
                      to={module.path}
                      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 border-l-4 border-green-500"
                    >
                      <div className="text-3xl mb-2">{module.icon}</div>
                      <div className="text-sm font-semibold text-gray-800 text-center">{module.name}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {searchTerm && filteredModules.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a7.5 7.5 0 11-6 0 7.5 7.5 0 016 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No modules found</h3>
            <p className="mt-1 text-sm text-gray-500">Try searching with different keywords.</p>
            <button
              onClick={clearSearch}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OdooDashboard;

