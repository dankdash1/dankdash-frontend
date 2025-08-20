import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

const ComprehensiveCheckout = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isGuest, setIsGuest] = useState(!user); // Track if user is checking out as guest
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  // Privacy and consent for guest checkout
  const [guestPrivacy, setGuestPrivacy] = useState({
    agreeTerms: false,
    consentDataProcessing: false,
    marketingEmails: false,
    marketingCommunications: false
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [billingAddress, setBillingAddress] = useState({
    sameAsShipping: true,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [shippingOption, setShippingOption] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Load cart items from localStorage and auto-fill customer info
  useEffect(() => {
    // Load cart items
    const savedCart = JSON.parse(localStorage.getItem('dankdash_cart') || '[]');
    if (savedCart.length > 0) {
      setCartItems(savedCart.map(item => ({
        id: item.product_id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image || '/api/placeholder/80/80',
        thc: item.product.thc || 'N/A',
        category: item.product.category
      })));
    } else {
      // Fallback to mock data if no cart items
      setCartItems([
        {
          id: 1,
          name: 'Blue Dream - Premium Flower',
          price: 45.00,
          quantity: 1,
          image: '/api/placeholder/80/80',
          thc: '18-24%',
          category: 'Flower'
        },
        {
          id: 2,
          name: 'OG Kush Live Resin',
          price: 65.00,
          quantity: 1,
          image: '/api/placeholder/80/80',
          thc: '75-85%',
          category: 'Concentrates'
        }
      ]);
    }

    // Auto-fill customer information if user is logged in
    if (user) {
      setCustomerInfo({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  // Shipping options with real-time pricing
  const shippingOptions = [
    {
      id: 'same-day',
      name: 'Same-Day Delivery',
      description: 'Delivered within 2-4 hours (Local only)',
      price: 15.00,
      estimatedTime: '2-4 hours',
      available: true
    },
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'USPS Ground - 3-5 business days',
      price: 8.99,
      estimatedTime: '3-5 business days',
      available: true
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'FedEx Express - 1-2 business days',
      price: 24.99,
      estimatedTime: '1-2 business days',
      available: true
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      description: 'FedEx Overnight - Next business day',
      price: 39.99,
      estimatedTime: 'Next business day',
      available: true
    },
    {
      id: 'pickup',
      name: 'Store Pickup',
      description: 'Pick up at our location',
      price: 0.00,
      estimatedTime: 'Ready in 30 minutes',
      available: true
    }
  ];

  // Payment methods
  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: '💳',
      available: true
    },
    {
      id: 'canpay',
      name: 'CanPay',
      description: 'Cannabis-specific payment processor',
      icon: '🌿',
      available: true
    },
    {
      id: 'aeropay',
      name: 'AeroPay',
      description: 'Bank transfer payment',
      icon: '🏦',
      available: true
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      description: 'Pay with cash upon delivery',
      icon: '💵',
      available: shippingOption === 'same-day' || shippingOption === 'pickup'
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedShipping = shippingOptions.find(option => option.id === shippingOption);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const taxRate = 0.0875; // 8.75% tax rate
  const taxAmount = (subtotal + shippingCost) * taxRate;
  const total = subtotal + shippingCost + taxAmount;

  // US States
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    // Validate privacy consent for guest users
    if (isGuest) {
      if (!guestPrivacy.agreeTerms) {
        alert('You must agree to the Terms & Conditions to complete your order');
        return;
      }
      
      if (!guestPrivacy.consentDataProcessing) {
        alert('You must consent to data processing to complete your order');
        return;
      }
    }
    
    setIsProcessing(true);
    
    // Process order with complete admin integration
    setTimeout(() => {
      const newOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const orderData = {
        id: newOrderId,
        customer: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone
        },
        items: cartItems,
        shipping: {
          address: shippingAddress,
          option: shippingOption,
          cost: shippingCost
        },
        payment: {
          method: paymentMethod,
          total: total
        },
        status: shippingOption === 'pickup' ? 'Ready for Pickup' : 'Processing',
        orderDate: new Date().toISOString(),
        estimatedDelivery: selectedShipping?.estimatedTime || 'TBD',
        notes: orderNotes,
        subtotal: subtotal,
        tax: taxAmount,
        total: total
      };

      // REDUCE INVENTORY QUANTITIES
      const shopProducts = JSON.parse(localStorage.getItem('dankdash_shop_products') || '[]');
      cartItems.forEach(cartItem => {
        const productIndex = shopProducts.findIndex(p => p.id === cartItem.id);
        if (productIndex !== -1) {
          // Reduce stock by quantity purchased
          const currentStock = parseInt(shopProducts[productIndex].stock) || 0;
          const newStock = Math.max(0, currentStock - cartItem.quantity);
          shopProducts[productIndex].stock = newStock;
          
          // Update stock status
          if (newStock === 0) {
            shopProducts[productIndex].stockStatus = 'Out of Stock';
          } else if (newStock <= 10) {
            shopProducts[productIndex].stockStatus = 'Low Stock';
          } else {
            shopProducts[productIndex].stockStatus = 'In Stock';
          }
        }
      });
      localStorage.setItem('dankdash_shop_products', JSON.stringify(shopProducts));

      // Save to Sales Module
      const salesOrders = JSON.parse(localStorage.getItem('dankdash_sales_orders') || '[]');
      salesOrders.push(orderData);
      localStorage.setItem('dankdash_sales_orders', JSON.stringify(salesOrders));

      // Save to Point-of-Sale Module
      const posOrders = JSON.parse(localStorage.getItem('dankdash_pos_orders') || '[]');
      posOrders.push({
        ...orderData,
        source: 'Online Store',
        paymentStatus: 'Paid',
        fulfillmentStatus: shippingOption === 'pickup' ? 'Ready for Pickup' : 'Pending'
      });
      localStorage.setItem('dankdash_pos_orders', JSON.stringify(posOrders));

      // Add to Delivery Module if delivery order
      if (shippingOption === 'same-day' || shippingOption === 'next-day') {
        const deliveryOrders = JSON.parse(localStorage.getItem('dankdash_delivery_orders') || '[]');
        deliveryOrders.push({
          ...orderData,
          deliveryType: shippingOption,
          driverAssigned: null,
          deliveryStatus: 'Pending Assignment',
          priority: shippingOption === 'same-day' ? 'High' : 'Normal',
          estimatedDelivery: shippingOption === 'same-day' ? 'Today' : 'Tomorrow'
        });
        localStorage.setItem('dankdash_delivery_orders', JSON.stringify(deliveryOrders));
      }

      // Add to Shipping Module if shipping order
      if (shippingOption === 'standard' || shippingOption === 'express') {
        const shippingOrders = JSON.parse(localStorage.getItem('dankdash_shipping_orders') || '[]');
        shippingOrders.push({
          ...orderData,
          shippingType: shippingOption,
          carrier: shippingOption === 'express' ? 'FedEx Express' : 'USPS',
          trackingNumber: 'TRK-' + Math.random().toString(36).substr(2, 12).toUpperCase(),
          shippingStatus: 'Label Created',
          estimatedDelivery: shippingOption === 'express' ? '2-3 business days' : '5-7 business days'
        });
        localStorage.setItem('dankdash_shipping_orders', JSON.stringify(shippingOrders));
      }

      // Update customer order history in CRM
      const customers = JSON.parse(localStorage.getItem('dankdash_customers') || '[]');
      const customerIndex = customers.findIndex(c => c.email === customerInfo.email);
      if (customerIndex !== -1) {
        customers[customerIndex].orders = (customers[customerIndex].orders || 0) + 1;
        customers[customerIndex].totalSpent = (customers[customerIndex].totalSpent || 0) + total;
        customers[customerIndex].lastOrder = new Date().toISOString();
        customers[customerIndex].orderHistory = customers[customerIndex].orderHistory || [];
        customers[customerIndex].orderHistory.push({
          orderId: newOrderId,
          date: new Date().toISOString(),
          total: total,
          status: orderData.status
        });
        localStorage.setItem('dankdash_customers', JSON.stringify(customers));
      } else if (isGuest) {
        // Create guest customer record if they don't exist
        const guestCustomer = {
          id: Date.now(),
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          email: customerInfo.email,
          phone: customerInfo.phone,
          type: 'Guest',
          status: 'Active',
          orders: 1,
          totalSpent: total,
          lastOrder: new Date().toISOString(),
          joinDate: new Date().toISOString(),
          source: 'Guest Checkout',
          privacy_consent: guestPrivacy,
          orderHistory: [{
            orderId: newOrderId,
            date: new Date().toISOString(),
            total: total,
            status: orderData.status
          }]
        };
        customers.push(guestCustomer);
        localStorage.setItem('dankdash_customers', JSON.stringify(customers));
      }

      // Add to email marketing if opted in (guest users)
      if (isGuest && guestPrivacy.marketingEmails) {
        const emailSubscribers = JSON.parse(localStorage.getItem('dankdash_email_subscribers') || '[]');
        const newSubscriber = {
          id: Date.now(),
          email: customerInfo.email,
          name: `${customerInfo.firstName} ${customerInfo.lastName}`,
          status: 'Active',
          source: 'Guest Checkout',
          subscribed_date: new Date().toISOString(),
          tags: ['Guest Customer', 'Marketing Opt-in', 'Order Customer'],
          preferences: {
            promotional: guestPrivacy.marketingEmails,
            educational: true,
            newsletters: guestPrivacy.marketingEmails
          }
        };
        
        if (!emailSubscribers.find(s => s.email === customerInfo.email)) {
          emailSubscribers.push(newSubscriber);
          localStorage.setItem('dankdash_email_subscribers', JSON.stringify(emailSubscribers));
        }
      }

      // INTEGRATE WITH NOTIFICATION SYSTEM
      // Process order through notification system for automated routing and notifications
      if (window.DankDashNotifications) {
        const orderForNotifications = {
          id: newOrderId,
          customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone,
          fulfillmentMethod: shippingOption === 'same-day' ? 'delivery' : 'shipping',
          items: cartItems,
          total: total.toFixed(2),
          status: 'confirmed',
          customerLocation: {
            lat: 37.7749, // Default SF coordinates - in real app, use geocoding
            lng: -122.4194,
            address: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`
          },
          shippingAddress: `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}`,
          specialInstructions: orderNotes,
          priority: shippingOption === 'same-day' ? 'High' : 'Standard',
          weight: cartItems.reduce((sum, item) => sum + (item.weight || 0.1), 0).toFixed(1) + ' lbs'
        };
        
        // Process order through notification system
        window.DankDashNotifications.processOrder(orderForNotifications);
      }

      // Send order confirmation email
      const emailCampaigns = JSON.parse(localStorage.getItem('dankdash_email_campaigns') || '[]');
      const confirmationCampaign = {
        id: Date.now(),
        name: `Order Confirmation - ${newOrderId}`,
        subject: `Order Confirmation - ${newOrderId} - DankDash`,
        type: 'Order Confirmation',
        status: 'Sent',
        recipient: customerInfo.email,
        sentDate: new Date().toISOString(),
        openRate: 0,
        clickRate: 0,
        content: `Thank you for your order! Order ${newOrderId} has been confirmed and will be processed shortly. Total: $${total.toFixed(2)}`
      };
      
      emailCampaigns.push(confirmationCampaign);
      localStorage.setItem('dankdash_email_campaigns', JSON.stringify(emailCampaigns));

      // Clear cart after successful order
      localStorage.removeItem('dankdash_cart');
      
      setOrderId(newOrderId);
      setOrderComplete(true);
      setIsProcessing(false);
    }, 3000);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return customerInfo.firstName && customerInfo.lastName && customerInfo.email && customerInfo.phone;
      case 2:
        return shippingAddress.address && shippingAddress.city && shippingAddress.state && shippingAddress.zipCode;
      case 3:
        return shippingOption && paymentMethod;
      default:
        return true;
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-6">
              Thank you for your order. Your order number is:
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-2xl font-bold text-green-800">{orderId}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• You'll receive an email confirmation shortly</li>
                <li>• We'll send tracking information once your order ships</li>
                <li>• Estimated delivery: {selectedShipping?.estimatedTime}</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/shop'}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => window.location.href = '/orders'}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                Step {currentStep} of 4: {
                  currentStep === 1 ? 'Customer Information' :
                  currentStep === 2 ? 'Shipping Address' :
                  currentStep === 3 ? 'Shipping & Payment' :
                  'Review Order'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Step 1: Customer Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Information</h2>
                  
                  {/* Guest Checkout Option */}
                  {!user && (
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-blue-900">Continue as Guest</h3>
                          <p className="text-sm text-blue-700">
                            You can checkout without creating an account, or{' '}
                            <a href="/login" className="underline hover:text-blue-800">sign in</a> to your existing account.
                          </p>
                        </div>
                        <button
                          onClick={() => setIsGuest(true)}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            isGuest 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          {isGuest ? 'Guest Checkout' : 'Continue as Guest'}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.firstName}
                        onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={customerInfo.lastName}
                        onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Privacy and Consent for Guest Users */}
                  {isGuest && (
                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy & Consent</h3>
                      
                      {/* Required: Terms & Conditions */}
                      <div className="flex items-start mb-3">
                        <input
                          id="guest-agree-terms"
                          type="checkbox"
                          checked={guestPrivacy.agreeTerms}
                          onChange={(e) => setGuestPrivacy({...guestPrivacy, agreeTerms: e.target.checked})}
                          className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          required
                        />
                        <label htmlFor="guest-agree-terms" className="ml-2 text-sm text-gray-700">
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
                      <div className="flex items-start mb-3">
                        <input
                          id="guest-consent-data"
                          type="checkbox"
                          checked={guestPrivacy.consentDataProcessing}
                          onChange={(e) => setGuestPrivacy({...guestPrivacy, consentDataProcessing: e.target.checked})}
                          className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          required
                        />
                        <label htmlFor="guest-consent-data" className="ml-2 text-sm text-gray-700">
                          I consent to the processing of my personal data for order fulfillment
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                      </div>

                      {/* Optional: Marketing Emails */}
                      <div className="flex items-start mb-3">
                        <input
                          id="guest-marketing-emails"
                          type="checkbox"
                          checked={guestPrivacy.marketingEmails}
                          onChange={(e) => setGuestPrivacy({...guestPrivacy, marketingEmails: e.target.checked})}
                          className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="guest-marketing-emails" className="ml-2 text-sm text-gray-700">
                          Send me promotional emails about new products and special offers
                        </label>
                      </div>

                      {/* Optional: Marketing Communications */}
                      <div className="flex items-start mb-3">
                        <input
                          id="guest-marketing-communications"
                          type="checkbox"
                          checked={guestPrivacy.marketingCommunications}
                          onChange={(e) => setGuestPrivacy({...guestPrivacy, marketingCommunications: e.target.checked})}
                          className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="guest-marketing-communications" className="ml-2 text-sm text-gray-700">
                          Allow marketing communications via SMS, phone, and other channels
                        </label>
                      </div>

                      <div className="text-xs text-gray-500 mt-2">
                        <span className="text-red-500">*</span> Required for order processing
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Shipping Address */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="123 Main Street"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.city}
                          onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <select
                          value={shippingAddress.state}
                          onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="">Select State</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={shippingAddress.zipCode}
                          onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="12345"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <select
                          value={shippingAddress.country}
                          onChange={(e) => setShippingAddress({...shippingAddress, country: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="border-t pt-6">
                      <div className="flex items-center mb-4">
                        <input
                          type="checkbox"
                          id="sameAsShipping"
                          checked={billingAddress.sameAsShipping}
                          onChange={(e) => setBillingAddress({...billingAddress, sameAsShipping: e.target.checked})}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
                          Billing address is the same as shipping address
                        </label>
                      </div>

                      {!billingAddress.sameAsShipping && (
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-gray-900">Billing Address</h3>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Street Address *
                            </label>
                            <input
                              type="text"
                              value={billingAddress.address}
                              onChange={(e) => setBillingAddress({...billingAddress, address: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="123 Main Street"
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                City *
                              </label>
                              <input
                                type="text"
                                value={billingAddress.city}
                                onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="City"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                State *
                              </label>
                              <select
                                value={billingAddress.state}
                                onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              >
                                <option value="">Select State</option>
                                {states.map(state => (
                                  <option key={state} value={state}>{state}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                ZIP Code *
                              </label>
                              <input
                                type="text"
                                value={billingAddress.zipCode}
                                onChange={(e) => setBillingAddress({...billingAddress, zipCode: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="12345"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Country
                              </label>
                              <select
                                value={billingAddress.country}
                                onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              >
                                <option value="United States">United States</option>
                                <option value="Canada">Canada</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Shipping & Payment */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping & Payment</h2>
                  
                  {/* Shipping Options */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Shipping Method</h3>
                    <div className="space-y-3">
                      {shippingOptions.map((option) => (
                        <div
                          key={option.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            shippingOption === option.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setShippingOption(option.id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                type="radio"
                                name="shipping"
                                value={option.id}
                                checked={shippingOption === option.id}
                                onChange={() => setShippingOption(option.id)}
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                              />
                              <div className="ml-3">
                                <p className="font-medium text-gray-900">{option.name}</p>
                                <p className="text-sm text-gray-600">{option.description}</p>
                                <p className="text-sm text-green-600">{option.estimatedTime}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">
                                {option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                    <div className="space-y-3 mb-6">
                      {paymentMethods.filter(method => method.available).map((method) => (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            paymentMethod === method.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setPaymentMethod(method.id)}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="payment"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={() => setPaymentMethod(method.id)}
                              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                            />
                            <div className="ml-3 flex items-center">
                              <span className="text-2xl mr-3">{method.icon}</span>
                              <div>
                                <p className="font-medium text-gray-900">{method.name}</p>
                                <p className="text-sm text-gray-600">{method.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Details */}
                    {paymentMethod === 'credit-card' && (
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Card Information</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Card Number *
                            </label>
                            <input
                              type="text"
                              value={paymentDetails.cardNumber}
                              onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date *
                              </label>
                              <input
                                type="text"
                                value={paymentDetails.expiryDate}
                                onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV *
                              </label>
                              <input
                                type="text"
                                value={paymentDetails.cvv}
                                onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="123"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Name on Card *
                            </label>
                            <input
                              type="text"
                              value={paymentDetails.nameOnCard}
                              onChange={(e) => setPaymentDetails({...paymentDetails, nameOnCard: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Review Order */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                  
                  {/* Order Items */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.thc} • {item.category}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer & Shipping Info */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                      <p className="text-sm text-gray-600">
                        {customerInfo.firstName} {customerInfo.lastName}<br />
                        {customerInfo.email}<br />
                        {customerInfo.phone}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Address</h4>
                      <p className="text-sm text-gray-600">
                        {shippingAddress.address}<br />
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}<br />
                        {shippingAddress.country}
                      </p>
                    </div>
                  </div>

                  {/* Shipping & Payment Info */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Method</h4>
                      <p className="text-sm text-gray-600">
                        {selectedShipping?.name}<br />
                        {selectedShipping?.description}<br />
                        Estimated: {selectedShipping?.estimatedTime}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Payment Method</h4>
                      <p className="text-sm text-gray-600">
                        {paymentMethods.find(m => m.id === paymentMethod)?.name}
                      </p>
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Any special instructions for your order..."
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <div className="text-yellow-600 mr-3">⚠️</div>
                      <div>
                        <h4 className="font-medium text-yellow-800 mb-2">Important Notice</h4>
                        <p className="text-sm text-yellow-700">
                          By placing this order, you confirm that you are 21 years of age or older and agree to our 
                          <a href="/terms" className="underline ml-1">Terms of Service</a> and 
                          <a href="/privacy" className="underline ml-1">Privacy Policy</a>. 
                          Cannabis products have not been analyzed or approved by the FDA. 
                          Keep out of reach of children and pets.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                {currentStep < 4 ? (
                  <button
                    onClick={handleNextStep}
                    disabled={!validateStep(currentStep)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      validateStep(currentStep)
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (8.75%):</span>
                  <span className="text-gray-900">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center text-sm text-green-800">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  Secure SSL Encrypted Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveCheckout;

