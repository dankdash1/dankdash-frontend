// Twilio Service for Real API Calls
// This service handles actual Twilio voice calls and SMS

class TwilioService {
  constructor() {
    this.accountSid = null;
    this.authToken = null;
    this.phoneNumber = null;
    this.isConfigured = false;
  }

  // Configure Twilio credentials
  configure(accountSid, authToken, phoneNumber) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.phoneNumber = phoneNumber;
    this.isConfigured = true;
    
    // Store in localStorage for persistence
    localStorage.setItem('twilio_config', JSON.stringify({
      accountSid,
      authToken,
      phoneNumber
    }));
  }

  // Load configuration from localStorage
  loadConfiguration() {
    try {
      const config = localStorage.getItem('twilio_config');
      if (config) {
        const { accountSid, authToken, phoneNumber } = JSON.parse(config);
        this.configure(accountSid, authToken, phoneNumber);
        return true;
      }
    } catch (error) {
      console.error('Error loading Twilio configuration:', error);
    }
    return false;
  }

  // Test Twilio connection
  async testConnection() {
    if (!this.isConfigured) {
      throw new Error('Twilio not configured. Please add your credentials.');
    }

    try {
      // Make a test API call to Twilio to verify credentials
      const response = await this.makeApiCall('/Accounts/' + this.accountSid + '.json', 'GET');
      
      if (response.sid === this.accountSid) {
        return {
          success: true,
          message: 'Twilio connection successful!',
          accountInfo: {
            friendlyName: response.friendly_name,
            status: response.status,
            type: response.type
          }
        };
      } else {
        throw new Error('Invalid account response');
      }
    } catch (error) {
      return {
        success: false,
        message: 'Connection failed: ' + error.message
      };
    }
  }

  // Send SMS
  async sendSMS(to, message) {
    if (!this.isConfigured) {
      throw new Error('Twilio not configured');
    }

    try {
      const response = await this.makeApiCall('/Accounts/' + this.accountSid + '/Messages.json', 'POST', {
        To: to,
        From: this.phoneNumber,
        Body: message
      });

      return {
        success: true,
        messageSid: response.sid,
        status: response.status,
        message: 'SMS sent successfully!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'SMS failed: ' + error.message
      };
    }
  }

  // Make voice call
  async makeVoiceCall(to, message, voice = 'alice', language = 'en-US') {
    if (!this.isConfigured) {
      throw new Error('Twilio not configured');
    }

    try {
      // Create TwiML for the voice message
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
        <Response>
          <Say voice="${voice}" language="${language}">${message}</Say>
        </Response>`;

      const response = await this.makeApiCall('/Accounts/' + this.accountSid + '/Calls.json', 'POST', {
        To: to,
        From: this.phoneNumber,
        Twiml: twiml
      });

      return {
        success: true,
        callSid: response.sid,
        status: response.status,
        message: 'Voice call initiated successfully!'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Voice call failed: ' + error.message
      };
    }
  }

  // Generic API call method
  async makeApiCall(endpoint, method = 'GET', data = null) {
    const url = `https://api.twilio.com/2010-04-01${endpoint}`;
    
    const options = {
      method: method,
      headers: {
        'Authorization': 'Basic ' + btoa(this.accountSid + ':' + this.authToken),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    if (data && method !== 'GET') {
      const formData = new URLSearchParams();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      options.body = formData;
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  }

  // Get call history
  async getCallHistory(limit = 20) {
    if (!this.isConfigured) {
      return [];
    }

    try {
      const response = await this.makeApiCall(`/Accounts/${this.accountSid}/Calls.json?PageSize=${limit}`, 'GET');
      return response.calls || [];
    } catch (error) {
      console.error('Error fetching call history:', error);
      return [];
    }
  }

  // Get SMS history
  async getSMSHistory(limit = 20) {
    if (!this.isConfigured) {
      return [];
    }

    try {
      const response = await this.makeApiCall(`/Accounts/${this.accountSid}/Messages.json?PageSize=${limit}`, 'GET');
      return response.messages || [];
    } catch (error) {
      console.error('Error fetching SMS history:', error);
      return [];
    }
  }

  // Format phone number for Twilio
  formatPhoneNumber(phone) {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');
    
    // Add +1 if it's a US number without country code
    if (digits.length === 10) {
      return '+1' + digits;
    } else if (digits.length === 11 && digits.startsWith('1')) {
      return '+' + digits;
    } else {
      return '+' + digits;
    }
  }

  // Validate phone number
  isValidPhoneNumber(phone) {
    const formatted = this.formatPhoneNumber(phone);
    return /^\+\d{10,15}$/.test(formatted);
  }
}

// Create singleton instance
const twilioService = new TwilioService();

// Auto-load configuration on startup
twilioService.loadConfiguration();

export default twilioService;

