import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import OdooDashboard from './components/OdooDashboard';
import CRMModule from './components/CRMModule';
import EnhancedCRMModule from './components/EnhancedCRMModule';
import SalesModule from './components/SalesModule';
import EnhancedSalesModule from './components/EnhancedSalesModule';
import InventoryModule from './components/InventoryModule';
import EnhancedInventoryModule from './components/EnhancedInventoryModule';
import AccountingModule from './components/AccountingModule';
import EnhancedAccountingModule from './components/EnhancedAccountingModule';
import AIAgentNetwork from './components/AIAgentNetwork';
import CannabisSpecific from './components/CannabisSpecific';
import EcommerceModule from './components/EcommerceModule';
import EnhancedEcommerceModule from './components/EnhancedEcommerceModule';
import WebsiteModule from './components/WebsiteModule';
import DriverApp from './components/DriverApp';
import UserManagement from './components/UserManagement';
import PointOfSaleModule from './components/PointOfSaleModule';
import EnhancedPointOfSaleModule from './components/EnhancedPointOfSaleModule';
import MarketingAutomationModule from './components/MarketingAutomationModule';
import EnhancedMarketingAutomationModule from './components/EnhancedMarketingAutomationModule';
import ProjectManagementModule from './components/ProjectManagementModule';
import EnhancedProjectManagementModule from './components/EnhancedProjectManagementModule';
import PurchaseModule from './components/PurchaseModule';
import EnhancedPurchaseModule from './components/EnhancedPurchaseModule';
import EmployeesModule from './components/EmployeesModule';
import EnhancedEmployeesModule from './components/EnhancedEmployeesModule';
import EmailMarketingModule from './components/EmailMarketingModule';
import EnhancedEmailMarketingModule from './components/EnhancedEmailMarketingModule';
import SMSMarketingModule from './components/SMSMarketingModule';
import EnhancedSMSMarketingModule from './components/EnhancedSMSMarketingModule';
import SurveyModule from './components/SurveyModule';
import EnhancedSurveyModule from './components/EnhancedSurveyModule';
import DocumentManagementModule from './components/DocumentManagementModule';
import EnhancedDocumentManagementModule from './components/EnhancedDocumentManagementModule';
import PlanningModule from './components/PlanningModule';
import EnhancedPlanningModule from './components/EnhancedPlanningModule';
import EnhancedBarcodeModule from './components/EnhancedBarcodeModule';
import MaintenanceModule from './components/MaintenanceModule';
import EnhancedMaintenanceModule from './components/EnhancedMaintenanceModule';
import EnhancedQualityControlModule from './components/EnhancedQualityControlModule';
import EnhancedComplianceModule from './components/EnhancedComplianceModule';
import EnhancedReportingModule from './components/EnhancedReportingModule';
import CommunicationModule from './components/CommunicationModule';
import EnhancedCommunicationModule from './components/EnhancedCommunicationModule';
import LearningModule from './components/LearningModule';
import EnhancedLearningModule from './components/EnhancedLearningModule';
import FleetModule from './components/FleetModule';
import EnhancedFleetModule from './components/EnhancedFleetModule';
import SocialMediaModule from './components/SocialMediaModule';
import AutomatedSocialMediaModule from './components/AutomatedSocialMediaModule';
import EnhancedKnowledgeBaseModule from './components/EnhancedKnowledgeBaseModule';
import EnhancedLoyaltyModule from './components/EnhancedLoyaltyModule';
import EnhancedSubscriptionModule from './components/EnhancedSubscriptionModule';
import EnhancedAffiliateModule from './components/EnhancedAffiliateModule';
import EnhancedEventModule from './components/EnhancedEventModule';
import APIModule from './components/APIModule';
import EnhancedAPIModule from './components/EnhancedAPIModule';
import EnhancedBackupModule from './components/EnhancedBackupModule';
import EnhancedSecurityModule from './components/EnhancedSecurityModule';
import EnhancedIntegrationModule from './components/EnhancedIntegrationModule';
import MetrcIntegrationModule from './components/MetrcIntegrationModule';
import DigitalSignatureModule from './components/DigitalSignatureModule';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import EnhancedAnalyticsModule from './components/EnhancedAnalyticsModule';
import SimpleChatbot from './components/SimpleChatbot';
import DirectAdmin from './components/DirectAdmin';
import SimpleLogin from './components/SimpleLogin';
import Register from './components/Register';
import Shop from './components/Shop';
import EnhancedShop from './components/EnhancedShop';
import GrowRoomController from './components/GrowRoomController';
import GrowMonitorAgent from './components/GrowMonitorAgent';
import GrowAlertSystem from './components/GrowAlertSystem';
import ComprehensiveCheckout from './components/ComprehensiveCheckout';
import OrderManagement from './components/OrderManagement';
import PartnerPortal from './components/PartnerPortal';
import AgeVerification from './components/AgeVerification';
import EnhancedCart from './components/EnhancedCart';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import DeliveryDashboard from './components/DeliveryDashboard';
import DiscussModule from './components/DiscussModule';
import CalendarModule from './components/CalendarModule';
import AppointmentsModule from './components/AppointmentsModule';
import ToDoModule from './components/ToDoModule';
import ContactsModule from './components/ContactsModule';
import DashboardsModule from './components/DashboardsModule';
import AppsModule from './components/AppsModule';
import SettingsModule from './components/SettingsModule';

// Import UI components
const Button = ({ children, className }) => <button className={className}>{children}</button>;
const Card = ({ children, className }) => <div className={className}>{children}</div>;
const CardHeader = ({ children }) => <div>{children}</div>;
const CardTitle = ({ children, className }) => <h3 className={className}>{children}</h3>;
const CardContent = ({ children }) => <div>{children}</div>;
const CardDescription = ({ children }) => <p>{children}</p>;
const Badge = ({ children, className }) => <span className={className}>{children}</span>;
const Star = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.208-6.001 5.853 1.416 8.293L12 18.896l-7.415 3.893 1.416-8.293-6.001-5.853 8.332-1.208L12 .587z"/></svg>;

import './App.css';

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Utility function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Auth Context
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiCall('/auth/me')
        .then(data => setUser(data.user))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth };

// Navigation Component
function Navigation() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold text-gray-900">DankDash</span>
          </Link>

          <div className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive('/shop') 
                  ? 'bg-black text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Shop
            </Link>
            <a
              href="/direct-admin"
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-red-600 text-white hover:bg-red-700"
            >
              🔐 ADMIN
            </a>
            {(user?.role === 'admin' || user?.role === 'manager' || user?.role === 'driver') && (
              <Link
                to="/delivery"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive('/delivery') 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Delivery
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive('/admin') 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Admin
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
              </svg>
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Hello, {user.first_name}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/admin"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Admin
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Premium Cannabis
          <span className="block text-green-600">Delivery Platform</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Experience the future of cannabis delivery with AI-powered logistics, 
          real-time tracking, and premium products delivered to your door.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="px-8 py-4 bg-black text-white text-lg font-semibold rounded-full hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
          <Link
            to="/partners"
            className="px-8 py-4 border-2 border-black text-black text-lg font-semibold rounded-full hover:bg-black hover:text-white transition-colors"
          >
            Become a Partner
          </Link>
        </div>
      </div>
    </div>
  );
}

// Features Section Component
function FeaturesSection() {
  const features = [
    {
      icon: '🚀',
      title: 'AI-Powered Delivery',
      description: 'Smart routing and predictive logistics for faster delivery times.'
    },
    {
      icon: '📱',
      title: 'Real-Time Tracking',
      description: 'Track your order from dispensary to doorstep with live updates.'
    },
    {
      icon: '🔒',
      title: 'Secure & Compliant',
      description: 'Full compliance with state regulations and secure payment processing.'
    },
    {
      icon: '🌿',
      title: 'Premium Products',
      description: 'Curated selection of high-quality cannabis products from trusted partners.'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose DankDash?
          </h2>
          <p className="text-xl text-gray-600">
            The most advanced cannabis delivery platform in the industry
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <CardTitle className="text-xl font-semibold mb-2">{feature.title}</CardTitle>
              <CardDescription className="text-gray-600">{feature.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stats Section Component
function StatsSection() {
  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '100+', label: 'Partner Dispensaries' },
    { number: '25', label: 'Cities Served' },
    { number: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Partner Section Component
function PartnerSection() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">
          Ready to Partner With Us?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Join our network of premium dispensaries and reach more customers 
          with our advanced delivery platform and API integration.
        </p>
        <Link
          to="/partners"
          className="inline-block px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition-colors"
        >
          Become a Partner
        </Link>
      </div>
    </div>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      content: 'DankDash has revolutionized my cannabis shopping experience. Fast, reliable, and always high quality.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Dispensary Owner',
      content: 'The partner API integration was seamless. Our delivery volume increased by 300% in the first month.',
      rating: 5
    },
    {
      name: 'Alex Rodriguez',
      role: 'Medical Patient',
      content: 'As a medical patient, I rely on consistent access. DankDash never lets me down.',
      rating: 5
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 border border-gray-200 rounded-2xl">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-600 text-base">
                  "{testimonial.content}"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-gray-600">{testimonial.role}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-2xl font-bold">DankDash</span>
            </div>
            <p className="text-gray-400">
              Premium cannabis delivery powered by AI technology.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Flower</li>
              <li>Edibles</li>
              <li>Concentrates</li>
              <li>Accessories</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Local Delivery</li>
              <li>Nationwide Shipping</li>
              <li>Partner API</li>
              <li>Business Solutions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>API Documentation</li>
              <li>Status Page</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DankDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.warn('API call failed:', error);
    return null;
  }
};

// Auth Context
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }
      return data;
    } catch (error) {
      console.warn('Login failed:', error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">DankDash</h1>
                <p className="text-xl text-gray-600 mb-8">Premium Cannabis Delivery Platform</p>
                <Link to="/admin" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                  Go to Admin
                </Link>
              </div>
            } />
            <Route path="/admin" element={<OdooDashboard />} />
            <Route path="/admin/integration" element={<MetrcIntegrationModule />} />
            <Route path="/admin/digital-signature" element={<DigitalSignatureModule />} />
            <Route path="/admin/crm" element={<EnhancedCRMModule />} />
            <Route path="/admin/sales" element={<EnhancedSalesModule />} />
            <Route path="/admin/inventory" element={<EnhancedInventoryModule />} />
            <Route path="/admin/accounting" element={<EnhancedAccountingModule />} />
            <Route path="/admin/point-of-sale" element={<EnhancedPointOfSaleModule />} />
            <Route path="/admin/project-management" element={<EnhancedProjectManagementModule />} />
            <Route path="/admin/purchase" element={<EnhancedPurchaseModule />} />
            <Route path="/admin/barcode" element={<EnhancedBarcodeModule />} />
            <Route path="/admin/maintenance" element={<EnhancedMaintenanceModule />} />
            <Route path="/admin/quality-control" element={<EnhancedQualityControlModule />} />
            <Route path="/admin/fleet" element={<EnhancedFleetModule />} />
            <Route path="/admin/social-media" element={<SocialMediaModule />} />
            <Route path="/admin/automated-social-media" element={<AutomatedSocialMediaModule />} />
            <Route path="/admin/marketing-automation" element={<EnhancedMarketingAutomationModule />} />
            <Route path="/admin/email-marketing" element={<EnhancedEmailMarketingModule />} />
            <Route path="/admin/sms-marketing" element={<EnhancedSMSMarketingModule />} />
            <Route path="/admin/analytics" element={<EnhancedAnalyticsModule />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;


// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <FeaturesSection />
                <StatsSection />
                <PartnerSection />
                <TestimonialsSection />
              </>
            } />
            <Route path="/shop" element={<EnhancedShop />} />
            <Route path="/cart" element={<ComprehensiveCheckout />} />
            <Route path="/checkout" element={<ComprehensiveCheckout />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/delivery" element={<DeliveryDashboard />} />
            <Route path="/login" element={<SimpleLogin />} />
            <Route path="/direct-admin" element={<DirectAdmin />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<OdooDashboard />} />
            <Route path="/admin/crm" element={<EnhancedCRMModule />} />
            <Route path="/admin/sales" element={<EnhancedSalesModule />} />
            <Route path="/admin/inventory" element={<EnhancedInventoryModule />} />
            <Route path="/admin/accounting" element={<EnhancedAccountingModule />} />
            <Route path="/admin/ai-agents" element={<AIAgentNetwork />} />
            <Route path="/admin/cannabis" element={<CannabisSpecific />} />
            <Route path="/admin/ecommerce" element={<EnhancedEcommerceModule />} />
            <Route path="/admin/website-management" element={<WebsiteModule />} />
            <Route path="/admin/driver-app" element={<DriverApp />} />
            <Route path="/admin/user-management" element={<UserManagement />} />
            <Route path="/admin/point-of-sale" element={<EnhancedPointOfSaleModule />} />
            <Route path="/admin/marketing-automation" element={<EnhancedMarketingAutomationModule />} />
            <Route path="/admin/project-management" element={<EnhancedProjectManagementModule />} />
            <Route path="/admin/purchase" element={<EnhancedPurchaseModule />} />
            <Route path="/admin/employees" element={<EnhancedEmployeesModule />} />
            <Route path="/admin/email-marketing" element={<EnhancedEmailMarketingModule />} />
            <Route path="/admin/sms-marketing" element={<EnhancedSMSMarketingModule />} />
            <Route path="/admin/survey" element={<EnhancedSurveyModule />} />
            <Route path="/admin/documents" element={<EnhancedDocumentManagementModule />} />
            <Route path="/admin/planning" element={<EnhancedPlanningModule />} />
            <Route path="/admin/barcode" element={<EnhancedBarcodeModule />} />
            <Route path="/admin/maintenance" element={<EnhancedMaintenanceModule />} />
            <Route path="/admin/quality-control" element={<EnhancedQualityControlModule />} />
            <Route path="/admin/compliance" element={<EnhancedComplianceModule />} />
            <Route path="/admin/reporting" element={<EnhancedReportingModule />} />
            <Route path="/admin/communication" element={<EnhancedCommunicationModule />} />
            <Route path="/admin/learning" element={<EnhancedLearningModule />} />
            <Route path="/admin/fleet" element={<EnhancedFleetModule />} />
            <Route path="/admin/social-media" element={<SocialMediaModule />} />
            <Route path="/admin/automated-social-media" element={<AutomatedSocialMediaModule />} />
            <Route path="/admin/knowledge-base" element={<EnhancedKnowledgeBaseModule />} />
            <Route path="/admin/loyalty" element={<EnhancedLoyaltyModule />} />
            <Route path="/admin/subscription" element={<EnhancedSubscriptionModule />} />
            <Route path="/admin/affiliate" element={<EnhancedAffiliateModule />} />
            <Route path="/admin/events" element={<EnhancedEventModule />} />
            <Route path="/admin/api" element={<APIModule />} />
            <Route path="/admin/backup" element={<EnhancedBackupModule />} />
            <Route path="/admin/security" element={<EnhancedSecurityModule />} />
            <Route path="/admin/integration" element={<MetrcIntegrationModule />} />
            <Route path="/admin/analytics" element={<EnhancedAnalyticsModule />} />
            <Route path="/admin/grow-room" element={<GrowRoomController />} />
            <Route path="/admin/grow-monitor" element={<GrowMonitorAgent />} />
            <Route path="/admin/grow-alerts" element={<GrowAlertSystem />} />
            <Route path="/admin/discuss" element={<DiscussModule />} />
            <Route path="/admin/calendar" element={<CalendarModule />} />
            <Route path="/admin/appointments" element={<AppointmentsModule />} />
            <Route path="/admin/todo" element={<ToDoModule />} />
            <Route path="/admin/contacts" element={<ContactsModule />} />
            <Route path="/admin/dashboards" element={<DashboardsModule />} />
            <Route path="/admin/apps" element={<AppsModule />} />
            <Route path="/admin/settings" element={<SettingsModule />} />
            <Route path="/partners" element={<PartnerPortal />} />
          </Routes>
          <Footer />
          <SimpleChatbot />
          <AgeVerification isEnabled={true} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

