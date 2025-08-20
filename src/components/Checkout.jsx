import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';

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

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Review, 2: Shipping, 3: Payment, 4: Confirmation
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    sameAsShipping: true
  });

  const [deliveryOption, setDeliveryOption] = useState('local_delivery');

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/cart');
      setCartItems(data.cart_items || []);
      setTotal(data.total || 0);
      
      if (data.cart_items.length === 0) {
        navigate('/cart');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(3); // Go to payment
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order
      const orderData = {
        delivery_type: deliveryOption,
        delivery_address: shippingInfo,
        notes: `Payment: Credit Card ending in ${paymentInfo.cardNumber.slice(-4)}`
      };

      const orderResponse = await apiCall('/orders/checkout', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });

      // Clear cart after successful order
      await apiCall('/cart/clear', { method: 'DELETE' });

      setStep(4); // Go to confirmation
    } catch (err) {
      alert('Payment failed: ' + err.message);
    } finally {
      setProcessing(false);
    }
  };

  const calculateTax = (subtotal) => subtotal * 0.08;
  const calculateShipping = () => deliveryOption === 'local_delivery' ? 0 : 15;
  const calculateTotal = () => total + calculateTax(total) + calculateShipping();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Please sign in to checkout</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">Error: {error}</p>
          <button 
            onClick={() => navigate('/cart')}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-6">
            {[
              { num: 1, label: 'Review Order' },
              { num: 2, label: 'Shipping' },
              { num: 3, label: 'Payment' },
              { num: 4, label: 'Confirmation' }
            ].map((stepItem) => (
              <div key={stepItem.num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepItem.num 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepItem.num}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= stepItem.num ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {stepItem.label}
                </span>
                {stepItem.num < 4 && <div className="w-8 h-px bg-gray-300 ml-4"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              /* Step 1: Review Order */
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
                        {item.product.media && item.product.media.length > 0 ? (
                          <img 
                            src={item.product.media[0].file_url} 
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">${item.item_total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Option</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="delivery" 
                        value="local_delivery"
                        checked={deliveryOption === 'local_delivery'}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                        className="text-green-600"
                      />
                      <div>
                        <p className="font-medium">Local Delivery</p>
                        <p className="text-sm text-gray-600">Same-day delivery within 2-4 hours - FREE</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="delivery" 
                        value="shipping"
                        checked={deliveryOption === 'shipping'}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                        className="text-green-600"
                      />
                      <div>
                        <p className="font-medium">Nationwide Shipping</p>
                        <p className="text-sm text-gray-600">1-3 business days - $15.00</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {step === 2 && (
              /* Step 2: Shipping Information */
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input 
                        type="text" 
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input 
                        type="tel" 
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                      type="text" 
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input 
                        type="text" 
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input 
                        type="text" 
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input 
                        type="text" 
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              /* Step 3: Payment Information */
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Information</h2>
                
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input 
                      type="text" 
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input 
                        type="text" 
                        required
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input 
                        type="text" 
                        required
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                    <input 
                      type="text" 
                      required
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      disabled={processing}
                      className="flex-1 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 disabled:opacity-50"
                    >
                      {processing ? 'Processing...' : `Pay $${calculateTotal().toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {step === 4 && (
              /* Step 4: Confirmation */
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you for your order. You will receive a confirmation email shortly.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/shop')}
                    className="w-full py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800"
                  >
                    Continue Shopping
                  </button>
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${calculateTax(total).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold">${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p className="mb-2">🔒 Secure checkout with SSL encryption</p>
                <p className="mb-2">📦 {deliveryOption === 'local_delivery' ? 'Same-day local delivery' : '1-3 business days shipping'}</p>
                <p>💳 We accept all major credit cards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

