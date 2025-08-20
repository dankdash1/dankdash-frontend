import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App'; // Assuming useAuth is exported from App.jsx

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  // Privacy and consent checkboxes
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [consentDataProcessing, setConsentDataProcessing] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [marketingCommunications, setMarketingCommunications] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // Validate required privacy checkboxes
    if (!agreeTerms) {
      setError('You must agree to the Terms & Conditions to continue');
      return;
    }
    
    if (!consentDataProcessing) {
      setError('You must consent to data processing for account creation');
      return;
    }
    
    try {
      const userData = { 
        first_name: firstName, 
        last_name: lastName, 
        email, 
        password,
        privacy_consent: {
          terms_agreed: agreeTerms,
          data_processing: consentDataProcessing,
          marketing_emails: marketingEmails,
          marketing_communications: marketingCommunications,
          consent_date: new Date().toISOString()
        }
      };
      
      await register(userData);
      navigate('/'); // Redirect to home or dashboard on successful registration
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Privacy and Consent Section */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-700 font-medium">
              Privacy & Consent
            </div>
            
            {/* Required: Terms & Conditions */}
            <div className="flex items-start">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="agree-terms" className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-green-600 hover:text-green-500 underline" target="_blank">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-green-600 hover:text-green-500 underline" target="_blank">
                  Privacy Policy
                </a>
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>

            {/* Required: Data Processing Consent */}
            <div className="flex items-start">
              <input
                id="consent-data"
                name="consent-data"
                type="checkbox"
                checked={consentDataProcessing}
                onChange={(e) => setConsentDataProcessing(e.target.checked)}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="consent-data" className="ml-2 text-sm text-gray-700">
                I consent to the processing of my personal data for account creation and order fulfillment
                <span className="text-red-500 ml-1">*</span>
              </label>
            </div>

            {/* Optional: Marketing Emails */}
            <div className="flex items-start">
              <input
                id="marketing-emails"
                name="marketing-emails"
                type="checkbox"
                checked={marketingEmails}
                onChange={(e) => setMarketingEmails(e.target.checked)}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="marketing-emails" className="ml-2 text-sm text-gray-700">
                Send me promotional emails about new products and special offers
              </label>
            </div>

            {/* Optional: Marketing Communications */}
            <div className="flex items-start">
              <input
                id="marketing-communications"
                name="marketing-communications"
                type="checkbox"
                checked={marketingCommunications}
                onChange={(e) => setMarketingCommunications(e.target.checked)}
                className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="marketing-communications" className="ml-2 text-sm text-gray-700">
                Allow marketing communications via SMS, phone, and other channels
              </label>
            </div>

            <div className="text-xs text-gray-500">
              <span className="text-red-500">*</span> Required fields. You can update your preferences anytime in your account settings.
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;


