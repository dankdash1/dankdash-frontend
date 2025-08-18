import React, { useState, useEffect } from 'react';

const AgeVerification = ({ isEnabled = true, onVerified }) => {
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check if user has already been verified in this session
    const verified = sessionStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsVerified(true);
      if (onVerified) onVerified(true);
    } else if (isEnabled) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isEnabled, onVerified]);

  const handleVerification = (isOfAge) => {
    if (isOfAge) {
      setIsVerified(true);
      setShowModal(false);
      sessionStorage.setItem('ageVerified', 'true');
      if (onVerified) onVerified(true);
    } else {
      // Redirect to a different page or show message
      window.location.href = 'https://www.samhsa.gov/find-help/national-helpline';
    }
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!isEnabled || isVerified || !showModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white text-center">
          <div className="text-4xl mb-3">🔞</div>
          <h2 className="text-2xl font-bold">Age Verification Required</h2>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Welcome to DankDash
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            This website contains information about cannabis products. 
            You must be 21 years of age or older to enter this site.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Legal Notice:</strong> Cannabis products are for adults 21 and over. 
              Keep out of reach of children and pets. Do not operate vehicles or machinery. 
              This product has not been analyzed or approved by the FDA.
            </p>
          </div>

          <div className="text-lg font-medium text-gray-900 mb-8">
            Are you 21 years of age or older?
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleVerification(true)}
              className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
            >
              Yes, I'm 21+
            </button>
            <button
              onClick={() => handleVerification(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-4 px-6 rounded-lg hover:bg-gray-400 transition-colors font-semibold text-lg"
            >
              No, I'm Under 21
            </button>
          </div>

          <button
            onClick={handleExit}
            className="mt-4 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Exit Site
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-xs text-gray-500">
            By entering this site, you acknowledge that you are of legal age and agree to our 
            <a href="/terms" className="text-green-600 hover:text-green-700 ml-1">Terms of Service</a> and 
            <a href="/privacy" className="text-green-600 hover:text-green-700 ml-1">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

// Settings component for admin to toggle age verification
export const AgeVerificationSettings = ({ isEnabled, onToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Age Verification Settings</h3>
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-gray-900">Enable Age Verification</h4>
          <p className="text-sm text-gray-600">
            Require visitors to verify they are 21+ before accessing the site
          </p>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
        </label>
      </div>

      {isEnabled && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-green-600 mr-3">✓</div>
            <div>
              <h5 className="font-medium text-green-800">Age Verification Active</h5>
              <p className="text-sm text-green-700 mt-1">
                All visitors will be prompted to verify their age before accessing the site. 
                Verification is stored for the browser session.
              </p>
            </div>
          </div>
        </div>
      )}

      {!isEnabled && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start">
            <div className="text-yellow-600 mr-3">⚠️</div>
            <div>
              <h5 className="font-medium text-yellow-800">Age Verification Disabled</h5>
              <p className="text-sm text-yellow-700 mt-1">
                Visitors can access the site without age verification. This may not be compliant 
                with local cannabis regulations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeVerification;

