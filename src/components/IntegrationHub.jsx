import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Integration Hub Context
const IntegrationContext = createContext();

// Action types for integration events
const INTEGRATION_ACTIONS = {
  NEW_ORDER: 'NEW_ORDER',
  UPDATE_INVENTORY: 'UPDATE_INVENTORY',
  ASSIGN_DRIVER: 'ASSIGN_DRIVER',
  UPDATE_DELIVERY_STATUS: 'UPDATE_DELIVERY_STATUS',
  SEND_NOTIFICATION: 'SEND_NOTIFICATION',
  TRIGGER_NOTIFICATION: 'TRIGGER_NOTIFICATION',
  UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
  PROCESS_PAYMENT: 'PROCESS_PAYMENT',
  UPDATE_ACCOUNTING: 'UPDATE_ACCOUNTING',
  TRIGGER_MARKETING: 'TRIGGER_MARKETING'
};

// Initial state for integration hub
const initialState = {
  orders: [],
  inventory: {},
  drivers: [],
  customers: {},
  notifications: [],
  events: [],
  deliveries: {},
  accounting: {},
  isConnected: false,
  lastSync: null
};

// Integration reducer to handle cross-module events
function integrationReducer(state, action) {
  switch (action.type) {
    case INTEGRATION_ACTIONS.NEW_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        lastSync: new Date().toISOString()
      };
    
    case INTEGRATION_ACTIONS.UPDATE_INVENTORY:
      return {
        ...state,
        inventory: {
          ...state.inventory,
          [action.payload.productId]: action.payload.quantity
        },
        lastSync: new Date().toISOString()
      };
    
    case INTEGRATION_ACTIONS.ASSIGN_DRIVER:
      return {
        ...state,
        deliveries: {
          ...state.deliveries,
          [action.payload.orderId]: {
            ...state.deliveries[action.payload.orderId],
            driverId: action.payload.driverId,
            status: 'assigned',
            assignedAt: new Date().toISOString()
          }
        },
        lastSync: new Date().toISOString()
      };
    
    case INTEGRATION_ACTIONS.UPDATE_DELIVERY_STATUS:
      return {
        ...state,
        deliveries: {
          ...state.deliveries,
          [action.payload.orderId]: {
            ...state.deliveries[action.payload.orderId],
            status: action.payload.status,
            updatedAt: new Date().toISOString()
          }
        },
        lastSync: new Date().toISOString()
      };
    
    case INTEGRATION_ACTIONS.SEND_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, {
          id: Date.now(),
          ...action.payload,
          sentAt: new Date().toISOString()
        }],
        lastSync: new Date().toISOString()
      };
    
    case INTEGRATION_ACTIONS.TRIGGER_NOTIFICATION:
      return {
        ...state,
        events: [...(state.events || []), {
          id: Date.now(),
          type: action.payload.type,
          data: action.payload.data,
          timestamp: new Date().toISOString()
        }],
        lastSync: new Date().toISOString()
      };
    
    case INTEGRATION_ACTIONS.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: {
          ...state.customers,
          [action.payload.customerId]: {
            ...state.customers[action.payload.customerId],
            ...action.payload.updates
          }
        },
        lastSync: new Date().toISOString()
      };
    
    default:
      return state;
  }
}

// Integration Hub Provider Component
export function IntegrationProvider({ children }) {
  const [state, dispatch] = useReducer(integrationReducer, initialState);

  // Simulate WebSocket connection
  useEffect(() => {
    // In a real implementation, this would be a WebSocket connection
    const interval = setInterval(() => {
      dispatch({
        type: 'UPDATE_CONNECTION',
        payload: { isConnected: true, lastSync: new Date().toISOString() }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Integration workflows
  const workflows = {
    // Order Processing Workflow
    processNewOrder: async (orderData) => {
      try {
        // 1. Add order to system
        dispatch({
          type: INTEGRATION_ACTIONS.NEW_ORDER,
          payload: orderData
        });

        // 2. Check inventory availability
        const inventoryCheck = await checkInventoryAvailability(orderData.items);
        if (!inventoryCheck.available) {
          throw new Error('Insufficient inventory');
        }

        // 3. Update inventory levels
        for (const item of orderData.items) {
          dispatch({
            type: INTEGRATION_ACTIONS.UPDATE_INVENTORY,
            payload: {
              productId: item.productId,
              quantity: inventoryCheck.currentStock[item.productId] - item.quantity
            }
          });
        }

        // 4. Find and assign driver
        const driver = await findAvailableDriver(orderData.deliveryAddress);
        if (driver) {
          dispatch({
            type: INTEGRATION_ACTIONS.ASSIGN_DRIVER,
            payload: {
              orderId: orderData.id,
              driverId: driver.id
            }
          });
        }

        // 5. Send customer notification
        dispatch({
          type: INTEGRATION_ACTIONS.SEND_NOTIFICATION,
          payload: {
            type: 'sms',
            recipient: orderData.customer.phone,
            message: `Order ${orderData.id} confirmed! Driver ${driver?.name} will deliver in ${driver?.estimatedTime || '30-45'} minutes.`
          }
        });

        // 6. Update customer record
        dispatch({
          type: INTEGRATION_ACTIONS.UPDATE_CUSTOMER,
          payload: {
            customerId: orderData.customer.id,
            updates: {
              lastOrderDate: new Date().toISOString(),
              totalOrders: (state.customers[orderData.customer.id]?.totalOrders || 0) + 1,
              totalSpent: (state.customers[orderData.customer.id]?.totalSpent || 0) + orderData.total
            }
          }
        });

        return { success: true, orderId: orderData.id };
      } catch (error) {
        console.error('Order processing failed:', error);
        return { success: false, error: error.message };
      }
    },

    // Delivery Status Update Workflow
    updateDeliveryStatus: async (orderId, status, driverLocation) => {
      dispatch({
        type: INTEGRATION_ACTIONS.UPDATE_DELIVERY_STATUS,
        payload: { orderId, status }
      });

      // Send customer notification based on status
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        let message = '';
        switch (status) {
          case 'picked_up':
            message = `Your order ${orderId} has been picked up and is on the way!`;
            break;
          case 'out_for_delivery':
            message = `Your order ${orderId} is out for delivery. Driver is ${driverLocation?.distance || '5 minutes'} away.`;
            break;
          case 'delivered':
            message = `Your order ${orderId} has been delivered! Thank you for choosing DankDash.`;
            break;
        }

        if (message) {
          dispatch({
            type: INTEGRATION_ACTIONS.SEND_NOTIFICATION,
            payload: {
              type: 'sms',
              recipient: order.customer.phone,
              message
            }
          });
        }
      }
    },

    // Sales Integration Workflow
    processSale: async (saleData) => {
      // Update inventory
      for (const item of saleData.items) {
        dispatch({
          type: INTEGRATION_ACTIONS.UPDATE_INVENTORY,
          payload: {
            productId: item.productId,
            quantity: state.inventory[item.productId] - item.quantity
          }
        });
      }

      // Update accounting
      dispatch({
        type: INTEGRATION_ACTIONS.UPDATE_ACCOUNTING,
        payload: {
          type: 'revenue',
          amount: saleData.total,
          date: new Date().toISOString(),
          source: 'pos'
        }
      });

      // Update customer loyalty points
      const loyaltyPoints = Math.floor(saleData.total * 0.1); // 10% back in points
      dispatch({
        type: INTEGRATION_ACTIONS.UPDATE_CUSTOMER,
        payload: {
          customerId: saleData.customerId,
          updates: {
            loyaltyPoints: (state.customers[saleData.customerId]?.loyaltyPoints || 0) + loyaltyPoints
          }
        }
      });
    }
  };

  // Helper functions
  const checkInventoryAvailability = async (items) => {
    const currentStock = state.inventory;
    let available = true;
    
    for (const item of items) {
      if ((currentStock[item.productId] || 0) < item.quantity) {
        available = false;
        break;
      }
    }
    
    return { available, currentStock };
  };

  const findAvailableDriver = async (deliveryAddress) => {
    // Simulate driver selection algorithm
    const availableDrivers = state.drivers.filter(d => d.status === 'available');
    if (availableDrivers.length === 0) return null;
    
    // Return closest driver (simplified)
    return availableDrivers[0];
  };

  const value = {
    state,
    dispatch,
    workflows,
    INTEGRATION_ACTIONS
  };

  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  );
}

// Hook to use integration context
export function useIntegration() {
  const context = useContext(IntegrationContext);
  if (!context) {
    throw new Error('useIntegration must be used within an IntegrationProvider');
  }
  return context;
}

// Integration Status Component
export function IntegrationStatus() {
  const { state } = useIntegration();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Integration Status</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{state.orders.length}</div>
          <div className="text-sm text-gray-600">Active Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{Object.keys(state.inventory).length}</div>
          <div className="text-sm text-gray-600">Products Tracked</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{state.drivers.length}</div>
          <div className="text-sm text-gray-600">Active Drivers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{state.notifications.length}</div>
          <div className="text-sm text-gray-600">Notifications Sent</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${state.isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-sm text-gray-600">
            {state.isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Last sync: {state.lastSync ? new Date(state.lastSync).toLocaleTimeString() : 'Never'}
        </div>
      </div>
    </div>
  );
}

export default IntegrationHub;

