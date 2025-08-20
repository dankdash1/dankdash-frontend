import React, { useState, useEffect } from 'react';
import { Phone, Volume2, Play, Pause, Settings, Users, AlertCircle, CheckCircle } from 'lucide-react';

const VoiceAIIntegration = () => {
  const [voiceSettings, setVoiceSettings] = useState({
    enabled: true,
    twilioAccountSid: '',
    twilioAuthToken: '',
    twilioPhoneNumber: '',
    voice: 'alice',
    language: 'en-US',
    orderConfirmations: true,
    driverDispatch: true,
    customerSupport: true,
    emergencyAlerts: true
  });

  const [emailSettings, setEmailSettings] = useState({
    provider: 'gmail',
    gmailUser: '',
    gmailPassword: '',
    fromEmail: '',
    enabled: true
  });

  const [testPhoneNumber, setTestPhoneNumber] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = 'https://5000-iq1qblhwkyzzrbiy4exfi-be7b87fb.manus.computer';

  const updateTwilioSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/twilio/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_sid: voiceSettings.twilioAccountSid,
          auth_token: voiceSettings.twilioAuthToken,
          phone_number: voiceSettings.twilioPhoneNumber
        })
      });

      const result = await response.json();
      if (result.success) {
        setConnectionStatus('connected');
        alert('Twilio configuration updated successfully!');
      } else {
        setConnectionStatus('error');
        alert('Error: ' + result.error);
      }
    } catch (error) {
      setConnectionStatus('error');
      alert('Connection error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/twilio/test-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      if (result.success) {
        setConnectionStatus('connected');
        alert('Connection successful! Account status: ' + result.account_status);
      } else {
        setConnectionStatus('error');
        alert('Connection failed: ' + result.error);
      }
    } catch (error) {
      setConnectionStatus('error');
      alert('Connection error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const makeTestCall = async (callType) => {
    if (!testPhoneNumber) {
      alert('Please enter a phone number for testing');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/twilio/make-call`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: testPhoneNumber,
          call_type: callType,
          voice: voiceSettings.voice,
          language: voiceSettings.language,
          customer_name: 'Test Customer',
          order_id: 'TEST123',
          order_total: '25.99'
        })
      });

      const result = await response.json();
      if (result.success) {
        alert(`Test call initiated! Call SID: ${result.call_sid}`);
      } else {
        alert('Call failed: ' + result.error);
      }
    } catch (error) {
      alert('Call error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestSMS = async () => {
    if (!testPhoneNumber) {
      alert('Please enter a phone number for testing');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/twilio/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: testPhoneNumber,
          message: 'Hello! This is a test SMS from your DankDash notification system. If you received this message, SMS integration is working correctly!'
        })
      });

      const result = await response.json();
      if (result.success) {
        alert(`Test SMS sent! Message SID: ${result.message_sid}`);
      } else {
        alert('SMS failed: ' + result.error);
      }
    } catch (error) {
      alert('SMS error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Gmail Configuration Functions
  const updateEmailSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/email/config`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: emailSettings.provider,
          gmail_user: emailSettings.gmailUser,
          gmail_password: emailSettings.gmailPassword,
          from_email: emailSettings.fromEmail || emailSettings.gmailUser
        })
      });

      const result = await response.json();
      if (result.success) {
        alert('Email configuration updated successfully!');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      alert('Configuration error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const testEmailConnection = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/email/test-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();
      if (result.success) {
        alert('Email connection successful!');
      } else {
        alert('Email connection failed: ' + result.error);
      }
    } catch (error) {
      alert('Connection error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendTestEmail = async () => {
    const testEmail = prompt('Enter email address to send test email:');
    if (!testEmail) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/email/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: testEmail
        })
      });

      const result = await response.json();
      if (result.success) {
        alert('Test email sent successfully!');
      } else {
        alert('Email failed: ' + result.error);
      }
    } catch (error) {
      alert('Email error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Volume2 className="mr-3 h-8 w-8 text-purple-600" />
            Voice AI Integration
          </h1>
          <p className="text-gray-600">Configure automated voice calls for orders, drivers, and customer support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Twilio Configuration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="mr-2 h-5 w-5 text-purple-600" />
                Twilio Configuration
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account SID</label>
                  <input
                    type="text"
                    value={voiceSettings.twilioAccountSid}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, twilioAccountSid: e.target.value }))}
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auth Token</label>
                  <input
                    type="password"
                    value={voiceSettings.twilioAuthToken}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, twilioAuthToken: e.target.value }))}
                    placeholder="Your Twilio Auth Token"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={voiceSettings.twilioPhoneNumber}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, twilioPhoneNumber: e.target.value }))}
                    placeholder="+1234567890"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={updateTwilioSettings}
                    disabled={isLoading}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Updating...' : 'Update Settings'}
                  </button>
                  <button
                    onClick={testConnection}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Testing...' : 'Test Connection'}
                  </button>
                </div>

                {/* Connection Status */}
                <div className="mt-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                    connectionStatus === 'connected' ? 'bg-green-100 text-green-800' :
                    connectionStatus === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {connectionStatus === 'connected' && <CheckCircle className="w-4 h-4 mr-1" />}
                    {connectionStatus === 'error' && <AlertCircle className="w-4 h-4 mr-1" />}
                    {connectionStatus === 'connected' ? 'Connected' :
                     connectionStatus === 'error' ? 'Connection Failed' :
                     'Not Connected'}
                  </div>
                </div>
              </div>
            </div>

            {/* Gmail Configuration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="mr-2 h-5 w-5 text-blue-600" />
                📧 Gmail Configuration
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gmail Username</label>
                  <input
                    type="email"
                    value={emailSettings.gmailUser}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, gmailUser: e.target.value }))}
                    placeholder="your-email@gmail.com"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gmail App Password</label>
                  <input
                    type="password"
                    value={emailSettings.gmailPassword}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, gmailPassword: e.target.value }))}
                    placeholder="Your Gmail App Password (not regular password)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Generate an App Password in Gmail Settings → Security → 2-Step Verification → App passwords
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Email (Optional)</label>
                  <input
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings(prev => ({ ...prev, fromEmail: e.target.value }))}
                    placeholder="noreply@dankdash.com (defaults to Gmail username)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={updateEmailSettings}
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Updating...' : 'Update Email Settings'}
                  </button>
                  <button
                    onClick={testEmailConnection}
                    disabled={isLoading}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Testing...' : 'Test Email Connection'}
                  </button>
                  <button
                    onClick={sendTestEmail}
                    disabled={isLoading}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50"
                  >
                    {isLoading ? 'Sending...' : 'Send Test Email'}
                  </button>
                </div>
              </div>
            </div>

            {/* Voice Settings */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Voice Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voice Type</label>
                  <select
                    value={voiceSettings.voice}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="alice">Alice (Female, Professional)</option>
                    <option value="man">Man (Male, Clear)</option>
                    <option value="woman">Woman (Female, Friendly)</option>
                    <option value="polly.joanna">Joanna (Neural, Natural)</option>
                    <option value="polly.matthew">Matthew (Neural, Professional)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={voiceSettings.language}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-US">Spanish (US)</option>
                    <option value="es-ES">Spanish (Spain)</option>
                    <option value="fr-FR">French</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Test Configuration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Test Configuration</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Test Phone Number</label>
                <input
                  type="tel"
                  value={testPhoneNumber}
                  onChange={(e) => setTestPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-1">Enter a phone number to receive test calls and SMS</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={sendTestSMS}
                  disabled={isLoading || !testPhoneNumber}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send Test SMS'}
                </button>
              </div>
            </div>
          </div>

          {/* Call Types Panel */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Call Types & Templates</h3>
              
              <div className="space-y-4">
                {[
                  {
                    id: 'order_confirmation',
                    name: 'Order Confirmations',
                    description: 'Automated calls to confirm customer orders',
                    template: 'Hello {customer_name}, this is DankDash calling to confirm your order #{order_id} for ${order_total}.'
                  },
                  {
                    id: 'driver_dispatch',
                    name: 'Driver Dispatch',
                    description: 'Voice instructions for delivery drivers',
                    template: 'Hi {driver_name}, you have a new delivery assignment. Customer: {customer_name}, Order total: ${order_total}.'
                  },
                  {
                    id: 'customer_support',
                    name: 'Customer Support',
                    description: 'Automated customer service calls',
                    template: 'Hello {customer_name}, this is DankDash customer support. We received your inquiry and wanted to provide an update.'
                  },
                  {
                    id: 'emergency_alert',
                    name: 'Emergency Alerts',
                    description: 'Critical system notifications via voice',
                    template: 'This is an urgent alert from DankDash. {alert_message}. Please take immediate action.'
                  }
                ].map((callType) => (
                  <div key={callType.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{callType.name}</h4>
                        <p className="text-sm text-gray-600">{callType.description}</p>
                      </div>
                      <button
                        onClick={() => makeTestCall(callType.id)}
                        disabled={isLoading || !testPhoneNumber}
                        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700 disabled:opacity-50"
                      >
                        {isLoading ? 'Calling...' : 'Test Call'}
                      </button>
                    </div>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700">
                      <strong>Template:</strong> {callType.template}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Call Statistics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Total Calls</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Successful</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$0.00</div>
                  <div className="text-sm text-gray-600">Total Cost</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">0s</div>
                  <div className="text-sm text-gray-600">Avg Duration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAIIntegration;

