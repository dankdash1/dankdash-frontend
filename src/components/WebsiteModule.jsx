import React, { useState } from 'react';

const WebsiteModule = () => {
  const [activeTab, setActiveTab] = useState('pages');
  const [pages, setPages] = useState([
    {
      id: 1,
      title: 'Homepage',
      url: '/',
      status: 'Published',
      lastModified: '2024-08-12',
      views: 1250,
      type: 'Homepage'
    },
    {
      id: 2,
      title: 'Shop',
      url: '/shop',
      status: 'Published',
      lastModified: '2024-08-11',
      views: 890,
      type: 'Product Catalog'
    },
    {
      id: 3,
      title: 'About Us',
      url: '/about',
      status: 'Published',
      lastModified: '2024-08-10',
      views: 340,
      type: 'Content Page'
    },
    {
      id: 4,
      title: 'Contact',
      url: '/contact',
      status: 'Draft',
      lastModified: '2024-08-09',
      views: 0,
      type: 'Contact Form'
    }
  ]);

  const [seoSettings, setSeoSettings] = useState({
    siteTitle: 'DankDash - Premium Cannabis Delivery',
    metaDescription: 'Fast, reliable cannabis delivery service with premium products. Order online for same-day delivery.',
    keywords: 'cannabis delivery, marijuana delivery, weed delivery, cannabis products',
    googleAnalytics: 'GA-XXXXXXXXX',
    facebookPixel: 'FB-XXXXXXXXX'
  });

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Home', url: '/', order: 1, visible: true },
    { id: 2, name: 'Shop', url: '/shop', order: 2, visible: true },
    { id: 3, name: 'About', url: '/about', order: 3, visible: true },
    { id: 4, name: 'Contact', url: '/contact', order: 4, visible: false }
  ]);

  const [analytics, setAnalytics] = useState({
    totalViews: 15420,
    uniqueVisitors: 8750,
    bounceRate: 32.5,
    avgSessionDuration: '3:45',
    topPages: [
      { page: 'Homepage', views: 5420, percentage: 35.2 },
      { page: 'Shop', views: 4890, percentage: 31.7 },
      { page: 'Product Details', views: 2340, percentage: 15.2 },
      { page: 'Cart', views: 1890, percentage: 12.3 },
      { page: 'About', views: 880, percentage: 5.7 }
    ]
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePublishToggle = (pageId) => {
    setPages(pages.map(page => 
      page.id === pageId 
        ? { ...page, status: page.status === 'Published' ? 'Draft' : 'Published' }
        : page
    ));
  };

  const renderPages = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Page Management</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Create Page
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{page.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.views.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.lastModified}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button 
                      onClick={() => handlePublishToggle(page.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      {page.status === 'Published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSEO = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">SEO Settings</h3>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
          <input
            type="text"
            value={seoSettings.siteTitle}
            onChange={(e) => setSeoSettings({...seoSettings, siteTitle: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
          <textarea
            value={seoSettings.metaDescription}
            onChange={(e) => setSeoSettings({...seoSettings, metaDescription: e.target.value})}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
          <input
            type="text"
            value={seoSettings.keywords}
            onChange={(e) => setSeoSettings({...seoSettings, keywords: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
            <input
              type="text"
              value={seoSettings.googleAnalytics}
              onChange={(e) => setSeoSettings({...seoSettings, googleAnalytics: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
            <input
              type="text"
              value={seoSettings.facebookPixel}
              onChange={(e) => setSeoSettings({...seoSettings, facebookPixel: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save SEO Settings
          </button>
        </div>
      </div>
    </div>
  );

  const renderMenus = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Navigation Menus</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Add Menu Item
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Menu Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {menuItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.order}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        item.visible ? 'bg-green-600' : 'bg-gray-200'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        item.visible ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Website Analytics</h3>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold">👁️</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Views</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">👥</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Unique Visitors</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.uniqueVisitors.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 font-semibold">📊</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Bounce Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.bounceRate}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold">⏱️</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Avg Session</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.avgSessionDuration}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Top Pages</h4>
        <div className="space-y-4">
          {analytics.topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{page.page}</span>
                  <span className="text-sm text-gray-500">{page.views.toLocaleString()} views</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${page.percentage}%` }}
                  ></div>
                </div>
              </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Website Management</h1>
          <p className="text-gray-600 mt-2">Manage your website content, SEO, and analytics</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'pages', name: 'Pages', icon: '📄' },
              { id: 'seo', name: 'SEO', icon: '🔍' },
              { id: 'menus', name: 'Menus', icon: '🧭' },
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
        {activeTab === 'pages' && renderPages()}
        {activeTab === 'seo' && renderSEO()}
        {activeTab === 'menus' && renderMenus()}
        {activeTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default WebsiteModule;

