import React, { useState, useEffect, useCallback } from 'react';

const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5001/api'
  : 'https://web-production-52f4.up.railway.app/api';

const EmailAccountsModule = () => {
  const [activeTab, setActiveTab] = useState('accounts');
  const [emailAccounts, setEmailAccounts] = useState([]);
  const [accountsLoading, setAccountsLoading] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountTestResults, setAccountTestResults] = useState({});
  const [providers, setProviders] = useState([]);
  const [gmailStatus, setGmailStatus] = useState(null);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [inboxLoading, setInboxLoading] = useState(false);

  const defaultForm = {
    provider: 'gmail', email_address: '', account_name: '', business_type: 'cannabis',
    google_client_id: '', google_client_secret: '', google_refresh_token: '',
    ms_client_id: '', ms_client_secret: '', ms_refresh_token: '', ms_tenant_id: 'common',
    imap_host: '', imap_port: 993, smtp_host: '', smtp_port: 587, imap_password: '',
    enable_inbox_monitoring: true, enable_auto_reply: true, enable_lab_results: false,
    check_interval_minutes: 5,
  };
  const [accountForm, setAccountForm] = useState(defaultForm);

  const fetchAccounts = useCallback(async () => {
    setAccountsLoading(true);
    try {
      const res = await fetch(`${API_URL}/gmail/accounts?include_inactive=true`);
      const data = await res.json();
      if (data.success) setEmailAccounts(data.accounts || []);
    } catch (err) {
      console.error('Failed to fetch email accounts:', err);
    } finally {
      setAccountsLoading(false);
    }
  }, []);

  const fetchProviders = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/gmail/accounts/providers`);
      const data = await res.json();
      if (data.success) setProviders(data.providers || []);
    } catch (err) {
      console.error('Failed to fetch providers:', err);
    }
  }, []);

  const fetchGmailStatus = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/gmail/status`);
      const data = await res.json();
      if (data.success) setGmailStatus(data);
    } catch (err) {
      console.error('Failed to fetch gmail status:', err);
    }
  }, []);

  const fetchInbox = useCallback(async () => {
    setInboxLoading(true);
    try {
      const res = await fetch(`${API_URL}/gmail/inbox?limit=15&unread=false`);
      const data = await res.json();
      if (data.success) setInboxMessages(data.messages || []);
    } catch (err) {
      console.error('Failed to fetch inbox:', err);
    } finally {
      setInboxLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
    fetchProviders();
    fetchGmailStatus();
  }, [fetchAccounts, fetchProviders, fetchGmailStatus]);

  useEffect(() => {
    if (activeTab === 'inbox') fetchInbox();
  }, [activeTab, fetchInbox]);

  const resetAccountForm = () => {
    setAccountForm(defaultForm);
    setEditingAccount(null);
  };

  const handleSaveAccount = async () => {
    try {
      const url = editingAccount
        ? `${API_URL}/gmail/accounts/${editingAccount.id}`
        : `${API_URL}/gmail/accounts`;
      const method = editingAccount ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountForm),
      });
      const data = await res.json();

      if (data.success) {
        setShowAccountModal(false);
        resetAccountForm();
        fetchAccounts();
      } else {
        alert(data.error || 'Failed to save account');
      }
    } catch (err) {
      alert('Error saving account: ' + err.message);
    }
  };

  const handleDeleteAccount = async (id) => {
    if (!confirm('Deactivate this email account?')) return;
    try {
      const res = await fetch(`${API_URL}/gmail/accounts/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) fetchAccounts();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleTestAccount = async (id) => {
    setAccountTestResults(prev => ({ ...prev, [id]: { loading: true } }));
    try {
      const res = await fetch(`${API_URL}/gmail/accounts/${id}/test`, { method: 'POST' });
      const data = await res.json();
      setAccountTestResults(prev => ({ ...prev, [id]: data }));
    } catch (err) {
      setAccountTestResults(prev => ({ ...prev, [id]: { success: false, error: err.message } }));
    }
  };

  const handleCheckNow = async (id) => {
    setAccountTestResults(prev => ({ ...prev, [`check-${id}`]: { loading: true } }));
    try {
      const res = await fetch(`${API_URL}/gmail/accounts/${id}/check-now`, { method: 'POST' });
      const data = await res.json();
      setAccountTestResults(prev => ({
        ...prev,
        [`check-${id}`]: { success: data.success, message: `Processed ${data.processed || 0} emails` }
      }));
      fetchAccounts();
    } catch (err) {
      setAccountTestResults(prev => ({ ...prev, [`check-${id}`]: { success: false, error: err.message } }));
    }
  };

  const handleManualInboxCheck = async () => {
    try {
      const res = await fetch(`${API_URL}/gmail/check-inbox`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ business_type: 'cannabis', auto_reply: false }),
      });
      const data = await res.json();
      alert(data.success ? `Processed ${data.processed} emails` : (data.error || 'Failed'));
      fetchInbox();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const providerLabel = (p) => ({ gmail: 'Gmail', outlook: 'Outlook', imap: 'IMAP' }[p] || p);
  const providerColor = (p) => ({
    gmail: 'bg-red-100 text-red-800',
    outlook: 'bg-blue-100 text-blue-800',
    imap: 'bg-gray-100 text-gray-800',
  }[p] || 'bg-gray-100 text-gray-800');

  const credentialFields = {
    gmail: [
      { key: 'google_client_id', label: 'Google Client ID', type: 'text' },
      { key: 'google_client_secret', label: 'Google Client Secret', type: 'password' },
      { key: 'google_refresh_token', label: 'Google Refresh Token', type: 'password' },
    ],
    outlook: [
      { key: 'ms_client_id', label: 'Azure App Client ID', type: 'text' },
      { key: 'ms_client_secret', label: 'Azure Client Secret', type: 'password' },
      { key: 'ms_refresh_token', label: 'Microsoft Refresh Token', type: 'password' },
      { key: 'ms_tenant_id', label: 'Tenant ID (or "common")', type: 'text' },
    ],
    imap: [
      { key: 'imap_host', label: 'IMAP Host', type: 'text' },
      { key: 'imap_port', label: 'IMAP Port', type: 'number' },
      { key: 'smtp_host', label: 'SMTP Host', type: 'text' },
      { key: 'smtp_port', label: 'SMTP Port', type: 'number' },
      { key: 'imap_password', label: 'Password', type: 'password' },
    ],
  };

  // ── Account Modal ────────────────────────────────────────────

  const AccountModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {editingAccount ? 'Edit Email Account' : 'Connect Email Account'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Add a Gmail, Outlook, or IMAP email account</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
            <select
              value={accountForm.provider}
              onChange={(e) => setAccountForm({ ...accountForm, provider: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="gmail">Gmail (Google)</option>
              <option value="outlook">Microsoft Outlook</option>
              <option value="imap">Generic IMAP/SMTP</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={accountForm.email_address}
                onChange={(e) => setAccountForm({ ...accountForm, email_address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
              <input
                type="text"
                value={accountForm.account_name}
                onChange={(e) => setAccountForm({ ...accountForm, account_name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Main Cannabis Gmail"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
            <select
              value={accountForm.business_type}
              onChange={(e) => setAccountForm({ ...accountForm, business_type: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="cannabis">Cannabis</option>
              <option value="junkyard">Junkyard</option>
              <option value="general">General</option>
            </select>
          </div>

          {/* Provider credentials */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              {providerLabel(accountForm.provider)} Credentials
            </h3>
            {providers.find(p => p.id === accountForm.provider)?.instructions && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-xs text-blue-800 whitespace-pre-line">
                {providers.find(p => p.id === accountForm.provider)?.instructions}
              </div>
            )}
            <div className="space-y-3">
              {(credentialFields[accountForm.provider] || []).map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    value={accountForm[field.key] || ''}
                    onChange={(e) => setAccountForm({ ...accountForm, [field.key]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                    placeholder={editingAccount ? '(unchanged)' : ''}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Feature toggles */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Features</h3>
            <div className="space-y-2">
              {[
                { key: 'enable_inbox_monitoring', label: 'Inbox Monitoring', desc: 'Check inbox every 5 min and process with AI' },
                { key: 'enable_auto_reply', label: 'Auto-Reply', desc: 'AI generates and sends replies automatically' },
                { key: 'enable_lab_results', label: 'Lab Results Detection', desc: 'Auto-detect COA emails and upload PDFs' },
              ].map(toggle => (
                <label key={toggle.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{toggle.label}</div>
                    <div className="text-xs text-gray-500">{toggle.desc}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={accountForm[toggle.key]}
                    onChange={(e) => setAccountForm({ ...accountForm, [toggle.key]: e.target.checked })}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => { setShowAccountModal(false); resetAccountForm(); }}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >Cancel</button>
          <button
            onClick={handleSaveAccount}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >{editingAccount ? 'Update Account' : 'Connect Account'}</button>
        </div>
      </div>
    </div>
  );

  // ── Tab: Connected Accounts ──────────────────────────────────

  const renderAccounts = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Connected Email Accounts</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage Gmail, Outlook, and IMAP accounts for inbox monitoring and auto-reply
          </p>
        </div>
        <button
          onClick={() => { resetAccountForm(); setShowAccountModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <span>+</span>
          <span>Connect Account</span>
        </button>
      </div>

      {/* Env var default account status */}
      {gmailStatus && (
        <div className={`border rounded-xl p-4 mb-6 ${gmailStatus.configured ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{gmailStatus.configured ? '✅' : '⚠️'}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Default Gmail (Environment Variables)
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {gmailStatus.configured
                    ? 'Configured via GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN env vars'
                    : 'Not configured — set Gmail env vars on Railway or add an account below'}
                </p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${gmailStatus.configured ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {gmailStatus.configured ? 'Active' : 'Not Set'}
            </span>
          </div>
        </div>
      )}

      {/* Active count banner */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-900">
              {emailAccounts.filter(a => a.is_active).length} Database Account{emailAccounts.filter(a => a.is_active).length !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-blue-700 mt-1">
              Celery checks all active accounts every 5 minutes during business hours (8am-6pm)
            </p>
          </div>
          <div className="flex space-x-2 text-xs">
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">Gmail</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Outlook</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">IMAP</span>
          </div>
        </div>
      </div>

      {accountsLoading && (
        <div className="text-center py-12 text-gray-500">Loading accounts...</div>
      )}

      {!accountsLoading && emailAccounts.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="text-5xl mb-4">📬</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Email Accounts Connected</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Connect your Gmail or Outlook accounts to enable AI-powered inbox monitoring,
            auto-reply, and lab results detection.
          </p>
          <button
            onClick={() => { resetAccountForm(); setShowAccountModal(true); }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Connect Your First Account
          </button>
        </div>
      )}

      {/* Account cards */}
      <div className="space-y-4">
        {emailAccounts.map(account => (
          <div
            key={account.id}
            className={`bg-white rounded-xl border ${account.is_active ? 'border-gray-200' : 'border-red-200 opacity-60'} p-5`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                  account.provider === 'gmail' ? 'bg-red-50' :
                  account.provider === 'outlook' ? 'bg-blue-50' : 'bg-gray-50'
                }`}>
                  {account.provider === 'gmail' ? '📧' : account.provider === 'outlook' ? '📨' : '📬'}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{account.account_name || account.email_address}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${providerColor(account.provider)}`}>
                      {providerLabel(account.provider)}
                    </span>
                    {!account.is_active && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Inactive</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{account.email_address}</p>
                  <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                    <span>Business: {account.business_type}</span>
                    {account.last_checked_at && (
                      <span>Last checked: {new Date(account.last_checked_at).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleTestAccount(account.id)}
                  className="px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 border border-green-200"
                >
                  {accountTestResults[account.id]?.loading ? 'Testing...' : 'Test'}
                </button>
                <button
                  onClick={() => handleCheckNow(account.id)}
                  className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 border border-blue-200"
                >
                  {accountTestResults[`check-${account.id}`]?.loading ? 'Checking...' : 'Check Now'}
                </button>
                <button
                  onClick={() => {
                    setEditingAccount(account);
                    setAccountForm({
                      ...defaultForm,
                      provider: account.provider,
                      email_address: account.email_address,
                      account_name: account.account_name || '',
                      business_type: account.business_type || 'cannabis',
                      enable_inbox_monitoring: account.enable_inbox_monitoring,
                      enable_auto_reply: account.enable_auto_reply,
                      enable_lab_results: account.enable_lab_results,
                      check_interval_minutes: account.check_interval_minutes || 5,
                    });
                    setShowAccountModal(true);
                  }}
                  className="px-3 py-1.5 text-xs font-medium bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 border border-gray-200"
                >Edit</button>
                <button
                  onClick={() => handleDeleteAccount(account.id)}
                  className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 border border-red-200"
                >{account.is_active ? 'Deactivate' : 'Delete'}</button>
              </div>
            </div>

            {/* Feature badges */}
            <div className="mt-3 flex items-center space-x-2">
              {account.enable_inbox_monitoring && (
                <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">Inbox Monitoring</span>
              )}
              {account.enable_auto_reply && (
                <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">Auto-Reply</span>
              )}
              {account.enable_lab_results && (
                <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded text-xs">Lab Results</span>
              )}
            </div>

            {/* Test result */}
            {accountTestResults[account.id] && !accountTestResults[account.id].loading && (
              <div className={`mt-3 p-2 rounded text-xs ${
                accountTestResults[account.id].success
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {accountTestResults[account.id].success
                  ? `Connected: ${accountTestResults[account.id].message}`
                  : `Error: ${accountTestResults[account.id].error}`}
              </div>
            )}
            {accountTestResults[`check-${account.id}`] && !accountTestResults[`check-${account.id}`].loading && (
              <div className={`mt-2 p-2 rounded text-xs ${
                accountTestResults[`check-${account.id}`].success
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {accountTestResults[`check-${account.id}`].success
                  ? accountTestResults[`check-${account.id}`].message
                  : `Error: ${accountTestResults[`check-${account.id}`].error}`}
              </div>
            )}

            {account.last_error && (
              <div className="mt-3 p-2 bg-red-50 text-red-700 border border-red-200 rounded text-xs">
                Last error: {account.last_error}
              </div>
            )}
          </div>
        ))}
      </div>

      {showAccountModal && <AccountModal />}
    </div>
  );

  // ── Tab: Inbox Preview ───────────────────────────────────────

  const renderInbox = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Inbox Preview</h2>
          <p className="text-sm text-gray-500 mt-1">Recent messages from the default Gmail account (env var)</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={fetchInbox}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
          >Refresh</button>
          <button
            onClick={handleManualInboxCheck}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >Process with AI</button>
        </div>
      </div>

      {inboxLoading && <div className="text-center py-12 text-gray-500">Loading inbox...</div>}

      {!inboxLoading && inboxMessages.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500">No messages found. Gmail may not be configured via env vars.</p>
        </div>
      )}

      <div className="space-y-2">
        {inboxMessages.map(msg => (
          <div key={msg.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900 truncate">{msg.from}</p>
                  <p className="text-xs text-gray-400">{msg.date}</p>
                </div>
                <p className="text-sm text-gray-800 font-medium mt-1">{msg.subject}</p>
                <p className="text-xs text-gray-500 mt-1 truncate">{msg.snippet}</p>
              </div>
              <div className="flex space-x-1 ml-3">
                {msg.labels?.includes('UNREAD') && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Unread</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── Tab: Activity Log ────────────────────────────────────────

  const renderActivity = () => (
    <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
      <div className="text-4xl mb-3">📋</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Email Activity Log</h3>
      <p className="text-gray-500">AI processing history, auto-replies sent, and lab results detected will appear here.</p>
      <p className="text-xs text-gray-400 mt-2">Coming soon — logged in chatbot_analytics table</p>
    </div>
  );

  // ── Main Render ──────────────────────────────────────────────

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gmail & Inbox AI</h1>
        <p className="mt-2 text-gray-600">
          Connect email accounts, monitor inboxes with AI, auto-reply, and detect lab results
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'accounts', name: 'Connected Accounts', icon: '🔗' },
            { id: 'inbox', name: 'Inbox Preview', icon: '📥' },
            { id: 'activity', name: 'Activity Log', icon: '📋' },
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

      {activeTab === 'accounts' && renderAccounts()}
      {activeTab === 'inbox' && renderInbox()}
      {activeTab === 'activity' && renderActivity()}
    </div>
  );
};

export default EmailAccountsModule;
