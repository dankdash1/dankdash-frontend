import React, { useState } from 'react';

const SimpleChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      alert(`You said: ${message}`);
      setMessage('');
    }
  };

  if (!isOpen) {
    return (
      <div 
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          backgroundColor: '#16a34a',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '50px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          fontSize: '14px',
          fontWeight: '600'
        }}
        onClick={() => setIsOpen(true)}
      >
        💬 Chat with us!
      </div>
    );
  }

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 9999,
        width: '320px',
        maxWidth: 'calc(100vw - 40px)',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        border: '1px solid #e5e7eb'
      }}
    >
      {/* Header */}
      <div 
        style={{
          backgroundColor: '#16a34a',
          color: 'white',
          padding: '16px',
          borderRadius: '12px 12px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontWeight: '600', fontSize: '16px' }}>DankDash Assistant</div>
          <div style={{ fontSize: '12px', opacity: 0.9 }}>Online • Typically replies instantly</div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0',
            width: '24px',
            height: '24px'
          }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div style={{ padding: '16px', height: '300px', overflowY: 'auto' }}>
        <div 
          style={{
            backgroundColor: '#f3f4f6',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '12px',
            fontSize: '14px',
            lineHeight: '1.4'
          }}
        >
          Hi! I'm your DankDash assistant. I can help you with:
          <br />• Product recommendations
          <br />• Order tracking
          <br />• Delivery information
          <br />• Cannabis education
          <br /><br />
          How can I help you today?
        </div>
      </div>

      {/* Input */}
      <div 
        style={{
          padding: '16px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '8px'
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            backgroundColor: '#16a34a',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default SimpleChatbot;

