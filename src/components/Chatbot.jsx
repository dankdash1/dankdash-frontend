import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your DankDash assistant. I can help you find products, track orders, or answer any questions about our cannabis delivery service. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    "Show me popular products",
    "Track my order",
    "Delivery areas",
    "Product recommendations",
    "How to place an order",
    "Cannabis strains info"
  ];

  const botResponses = {
    "show me popular products": "Our most popular products are:\n\n🌿 **Premium OG Kush** - $45/gram (Indica, 24.5% THC)\n🌿 **Blue Dream** - $40/gram (Sativa, 21.2% THC)\n🍫 **Chocolate Edibles** - $25 (10mg THC per piece)\n💨 **Blue Dream Cartridge** - $35 (0.5g, 85% THC)\n\nWould you like details about any of these?",
    
    "track my order": "I can help you track your order! Please provide your order number (starts with ORD-) or the email address you used to place the order.",
    
    "delivery areas": "We deliver to:\n\n📍 **San Francisco** - Same day delivery\n📍 **Oakland** - Same day delivery\n📍 **Berkeley** - Same day delivery\n📍 **San Jose** - Next day delivery\n📍 **Nationwide shipping** - 2-3 business days\n\nDelivery is free for orders over $50!",
    
    "product recommendations": "I'd love to help you find the perfect products! Tell me:\n\n🎯 What effects are you looking for? (relaxing, energizing, creative, pain relief)\n🌿 Do you prefer flower, edibles, or concentrates?\n💪 What's your experience level with cannabis?\n\nThis will help me recommend the best products for you!",
    
    "how to place an order": "Placing an order is easy! Here's how:\n\n1️⃣ **Browse** our products in the Shop section\n2️⃣ **Add items** to your cart\n3️⃣ **Review** your order and delivery details\n4️⃣ **Choose** delivery or shipping\n5️⃣ **Pay** securely with card or cash on delivery\n6️⃣ **Track** your order in real-time\n\nNeed help with any step?",
    
    "cannabis strains info": "Here's info about our strain types:\n\n🟢 **Indica** - Relaxing, body high, good for evening/sleep\n🔵 **Sativa** - Energizing, head high, good for daytime/creativity\n🟡 **Hybrid** - Balanced effects, combines indica and sativa\n\n**THC** = Psychoactive compound (gets you high)\n**CBD** = Non-psychoactive (therapeutic benefits)\n\nWhat specific strain information do you need?"
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(inputText.toLowerCase());
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const generateBotResponse = (userInput) => {
    // Check for exact matches first
    for (const [key, response] of Object.entries(botResponses)) {
      if (userInput.includes(key.toLowerCase())) {
        return response;
      }
    }

    // Check for keywords
    if (userInput.includes('price') || userInput.includes('cost') || userInput.includes('how much')) {
      return "Our prices range from $25-$45 for flower, $25-$35 for edibles, and $35-$50 for concentrates. We offer:\n\n💰 **Free delivery** on orders over $50\n🎁 **New customer discount** - 15% off first order\n📦 **Bulk discounts** available\n\nWhat specific products are you interested in?";
    }

    if (userInput.includes('delivery') || userInput.includes('shipping')) {
      return "We offer fast, discreet delivery:\n\n🚚 **Same-day delivery** in SF Bay Area (1-3 hours)\n📦 **Nationwide shipping** (2-3 business days)\n🆓 **Free delivery** on orders $50+\n⏰ **Delivery hours**: 9AM - 9PM daily\n\nWhere would you like your order delivered?";
    }

    if (userInput.includes('thc') || userInput.includes('cbd') || userInput.includes('potency')) {
      return "Our products have varying THC/CBD levels:\n\n🌿 **Flower**: 15-28% THC\n🍫 **Edibles**: 5-25mg THC per piece\n💨 **Concentrates**: 70-95% THC\n🌱 **CBD products**: High CBD, low THC\n\nWhat potency level are you looking for?";
    }

    if (userInput.includes('first time') || userInput.includes('beginner') || userInput.includes('new')) {
      return "Welcome to cannabis! For beginners, I recommend:\n\n🌿 **Low THC flower** (15-18% THC)\n🍫 **Micro-dose edibles** (2.5-5mg THC)\n💨 **1:1 THC:CBD products** for balanced effects\n\n⚠️ **Start low, go slow** - Wait 2 hours before taking more edibles!\n\nWould you like specific product recommendations?";
    }

    if (userInput.includes('pain') || userInput.includes('sleep') || userInput.includes('anxiety')) {
      return "For therapeutic use, consider:\n\n😴 **Sleep**: Indica strains, CBN products\n🩹 **Pain relief**: High CBD, balanced THC:CBD\n😌 **Anxiety**: Low THC, high CBD products\n\nI can recommend specific products based on your needs. What symptoms are you looking to address?";
    }

    if (userInput.includes('order') && (userInput.includes('track') || userInput.includes('status'))) {
      return "To track your order, I'll need:\n\n📧 **Email address** used for the order\n🔢 **Order number** (starts with ORD-)\n\nOnce I have this info, I can show you real-time tracking with estimated delivery time!";
    }

    if (userInput.includes('payment') || userInput.includes('pay')) {
      return "We accept several payment methods:\n\n💳 **Credit/Debit cards** (Visa, Mastercard)\n💵 **Cash on delivery** (exact change preferred)\n📱 **Digital payments** (Apple Pay, Google Pay)\n🏦 **Bank transfer** for large orders\n\nAll payments are secure and encrypted. Which payment method would you prefer?";
    }

    // Default responses for unmatched queries
    const defaultResponses = [
      "I'd be happy to help! Can you tell me more about what you're looking for?",
      "That's a great question! Let me help you find the right information. What specifically would you like to know?",
      "I'm here to assist with products, orders, delivery, and general cannabis questions. What can I help you with?",
      "Thanks for asking! I can help with product recommendations, order tracking, delivery info, and more. What interests you most?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleQuickReply = (reply) => {
    setInputText(reply);
    handleSendMessage();
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 sm:p-4 shadow-lg transition-all duration-300 transform hover:scale-110"
        >
          <div className="flex items-center space-x-2">
            <span className="text-xl sm:text-2xl">💬</span>
            <span className="hidden sm:block font-medium text-sm">Chat with us!</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 text-white p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-sm sm:text-lg">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">DankDash Assistant</h3>
              <p className="text-xs text-green-100">Online • Typically replies instantly</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <span className="text-lg sm:text-xl">×</span>
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 sm:h-96 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Replies */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.slice(0, 3).map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-sm">Send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

