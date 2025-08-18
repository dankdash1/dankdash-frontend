import React, { useState, useEffect } from 'react';
import { useIntegration } from './IntegrationHub';

const OrderIntegrationModule = () => {
  const { state: integrationState, workflows, INTEGRATION_ACTIONS } = useIntegration();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulate new orders coming from e-commerce website
  useEffect(() => {
    const simulateNewOrders = () => {
      const newOrder = {
        id: `ORD-${Date.now()}`,
        customer: {
          id: `CUST-${Math.floor(Math.random() * 1000)}`,
          name: 'New Customer',
          email: 'customer@example.com',
          phone: '+1-555-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
          address: '123 New St, San Francisco, CA 94102'
        },
        items: [
          {
            productId: 'PROD-001',
            name: 'Blue Dream (3.5g)',
            quantity: 1,
            price: 45.00
          }
        ],
        total: 50.00,
        deliveryFee: 5.00,
        tip: 0,
        status: 'pending',
        orderTime: new Date().toISOString(),
        deliveryAddress: '123 New St, San Francisco, CA 94102',
        priority: 'standard'
      };

      // Process the order through integration workflow
      processNewOrder(newOrder);
    };

    // Simulate orders every 30 seconds for demo
    const interval = setInterval(simulateNewOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const processNewOrder = async (orderData) => {
    setLoading(true);
    try {
      const result = await workflows.processNewOrder(orderData);
      if (result.success) {
        console.log('Order processed successfully:', result.orderId);
        setOrders(prev => [...prev, orderData]);
      } else {
        console.error('Order processing failed:', result.error);
      }
    } catch (error) {
      console.error('Error processing order:', error);
    } finally {
      setLoading(false);
    }
  };

  const manualCreateOrder = async () => {
    const testOrder = {
      id: `ORD-MANUAL-${Date.now()}`,
      customer: {
        id: 'CUST-TEST',
        name: 'Test Customer',
        email: 'test@example.com',
        phone: '+1-555-TEST',
        address: '456 Test Ave, San Francisco, CA 94103'
      },
      items: [
        {
          productId: 'PROD-002',
          name: 'OG Kush (7g)',
          quantity: 1,
          price: 85.00
        },
        {
          productId: 'PROD-003',
          name: 'Edible Gummies',
          quantity: 1,
          price: 30.00
        }
      ],
      total: 120.00,
      deliveryFee: 5.00,
      tip: 15.00,
      status: 'pending',
      orderTime: new Date().toISOString(),
      deliveryAddress: '456 Test Ave, San Francisco, CA 94103',
      priority: 'high'
    };

    await processNewOrder(testOrder);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Order Integration Hub</h2>
        <button
          onClick={manualCreateOrder}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Create Test Order'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{integrationState.orders.length}</div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {integrationState.orders.filter(o => o.status === 'delivered').length}
          </div>
          <div className="text-sm text-gray-600">Delivered</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-orange-600">
            {integrationState.orders.filter(o => o.status === 'assigned').length}
          </div>
          <div className="text-sm text-gray-600">In Transit</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {integrationState.orders.filter(o => o.status === 'pending').length}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-3">Integration Workflow</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>1. Order received from website</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>2. Inventory availability checked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>3. Driver automatically assigned</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>4. Customer notified via SMS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>5. Real-time tracking updates</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Orders</h3>
        {integrationState.orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No orders yet. Create a test order to see the integration in action.
          </div>
        ) : (
          <div className="space-y-3">
            {integrationState.orders.slice(-5).reverse().map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.customer.name}</div>
                    <div className="text-sm text-gray-600">{order.customer.address}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${order.total.toFixed(2)}</div>
                    <div className={`text-sm px-2 py-1 rounded-full ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {order.items.map(item => item.name).join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">Integration Status</h4>
        <div className="text-sm text-yellow-700">
          ✅ E-commerce to Driver App integration: Active<br/>
          ✅ Automatic inventory checking: Active<br/>
          ✅ Customer notifications: Active<br/>
          ✅ Real-time order tracking: Active
        </div>
      </div>
    </div>
  );
};

export default OrderIntegrationModule;

