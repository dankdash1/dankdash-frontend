import React, { useState, useEffect, useRef } from 'react';

const GPSRouteTracker = ({ 
  manifestNumber, 
  isTracking = false, 
  onRouteUpdate, 
  onRouteComplete,
  warehouseLocation = { lat: 35.4676, lng: -97.5164 } // Default Oklahoma City
}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);
  const [trackingStatus, setTrackingStatus] = useState('idle'); // idle, tracking, paused, completed
  const [routeStats, setRouteStats] = useState({
    totalDistance: 0,
    totalTime: 0,
    averageSpeed: 0,
    maxSpeed: 0,
    startTime: null,
    endTime: null
  });
  const [geofenceAlerts, setGeofenceAlerts] = useState([]);
  const trackingIntervalRef = useRef(null);
  const lastLocationRef = useRef(null);

  // Start GPS tracking
  const startTracking = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    setTrackingStatus('tracking');
    setRouteStats(prev => ({
      ...prev,
      startTime: new Date().toISOString()
    }));

    // Initial location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date().toISOString(),
          speed: position.coords.speed || 0,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading
        };
        
        setCurrentLocation(location);
        setRoutePoints([location]);
        lastLocationRef.current = location;
      },
      (error) => console.error('GPS Error:', error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );

    // Continuous tracking every 30 seconds
    trackingIntervalRef.current = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: new Date().toISOString(),
            speed: position.coords.speed || 0,
            accuracy: position.coords.accuracy,
            heading: position.coords.heading
          };

          // Calculate distance from last point
          if (lastLocationRef.current) {
            const distance = calculateDistance(
              lastLocationRef.current.lat,
              lastLocationRef.current.lng,
              newLocation.lat,
              newLocation.lng
            );
            
            // Only add point if moved significantly (>10 meters)
            if (distance > 0.01) {
              setRoutePoints(prev => [...prev, newLocation]);
              updateRouteStats(newLocation, distance);
              checkGeofences(newLocation);
              lastLocationRef.current = newLocation;
              
              // Notify parent component
              if (onRouteUpdate) {
                onRouteUpdate({
                  location: newLocation,
                  routePoints: [...routePoints, newLocation],
                  stats: routeStats
                });
              }
            }
          }

          setCurrentLocation(newLocation);
        },
        (error) => console.error('GPS Tracking Error:', error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
      );
    }, 30000); // Every 30 seconds
  };

  // Stop GPS tracking
  const stopTracking = () => {
    if (trackingIntervalRef.current) {
      clearInterval(trackingIntervalRef.current);
      trackingIntervalRef.current = null;
    }

    setTrackingStatus('completed');
    setRouteStats(prev => ({
      ...prev,
      endTime: new Date().toISOString()
    }));

    // Generate final route report
    const routeReport = generateRouteReport();
    
    if (onRouteComplete) {
      onRouteComplete(routeReport);
    }
  };

  // Calculate distance between two GPS points (in kilometers)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Update route statistics
  const updateRouteStats = (newLocation, distance) => {
    setRouteStats(prev => {
      const newTotalDistance = prev.totalDistance + distance;
      const currentTime = new Date();
      const startTime = new Date(prev.startTime);
      const totalTimeHours = (currentTime - startTime) / (1000 * 60 * 60);
      const averageSpeed = totalTimeHours > 0 ? newTotalDistance / totalTimeHours : 0;
      const currentSpeed = newLocation.speed * 3.6; // Convert m/s to km/h

      return {
        ...prev,
        totalDistance: newTotalDistance,
        totalTime: totalTimeHours,
        averageSpeed: averageSpeed,
        maxSpeed: Math.max(prev.maxSpeed, currentSpeed)
      };
    });
  };

  // Check for geofence violations
  const checkGeofences = (location) => {
    // Example: Check if driver is too far from expected route
    // This would be enhanced with actual route planning
    const distanceFromWarehouse = calculateDistance(
      warehouseLocation.lat,
      warehouseLocation.lng,
      location.lat,
      location.lng
    );

    // Alert if more than 50km from warehouse (configurable)
    if (distanceFromWarehouse > 50) {
      const alert = {
        id: Date.now(),
        type: 'distance_warning',
        message: `Driver is ${distanceFromWarehouse.toFixed(1)}km from warehouse`,
        location: location,
        timestamp: new Date().toISOString()
      };
      
      setGeofenceAlerts(prev => [...prev, alert]);
    }
  };

  // Generate comprehensive route report
  const generateRouteReport = () => {
    return {
      manifestNumber,
      routeData: {
        startLocation: routePoints[0] || null,
        endLocation: routePoints[routePoints.length - 1] || null,
        warehouseLocation,
        allWaypoints: routePoints,
        totalWaypoints: routePoints.length
      },
      statistics: {
        ...routeStats,
        totalDistanceMiles: routeStats.totalDistance * 0.621371,
        totalTimeFormatted: formatTime(routeStats.totalTime),
        averageSpeedMph: routeStats.averageSpeed * 0.621371,
        maxSpeedMph: routeStats.maxSpeed * 0.621371
      },
      compliance: {
        geofenceAlerts: geofenceAlerts,
        speedViolations: routePoints.filter(p => (p.speed * 3.6) > 80).length, // Over 80 km/h
        routeDeviations: geofenceAlerts.filter(a => a.type === 'distance_warning').length
      },
      timestamps: {
        trackingStarted: routeStats.startTime,
        trackingCompleted: routeStats.endTime,
        reportGenerated: new Date().toISOString()
      }
    };
  };

  // Format time duration
  const formatTime = (hours) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  // Auto-start tracking when prop changes
  useEffect(() => {
    if (isTracking && trackingStatus === 'idle') {
      startTracking();
    } else if (!isTracking && trackingStatus === 'tracking') {
      stopTracking();
    }
  }, [isTracking]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">GPS Route Tracking</h3>
          <p className="text-sm text-gray-600">Manifest: {manifestNumber}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          trackingStatus === 'tracking' ? 'bg-green-100 text-green-800' :
          trackingStatus === 'completed' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {trackingStatus === 'tracking' ? '🟢 Tracking Active' :
           trackingStatus === 'completed' ? '✅ Route Complete' :
           '⚪ Tracking Idle'}
        </div>
      </div>

      {/* Current Location */}
      {currentLocation && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Current Location</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Latitude:</span>
              <span className="ml-2 font-mono">{currentLocation.lat.toFixed(6)}</span>
            </div>
            <div>
              <span className="text-gray-600">Longitude:</span>
              <span className="ml-2 font-mono">{currentLocation.lng.toFixed(6)}</span>
            </div>
            <div>
              <span className="text-gray-600">Speed:</span>
              <span className="ml-2">{(currentLocation.speed * 3.6).toFixed(1)} km/h</span>
            </div>
            <div>
              <span className="text-gray-600">Accuracy:</span>
              <span className="ml-2">{currentLocation.accuracy?.toFixed(0)}m</span>
            </div>
          </div>
        </div>
      )}

      {/* Route Statistics */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Route Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {routeStats.totalDistance.toFixed(1)}
            </div>
            <div className="text-sm text-blue-600">km traveled</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {formatTime(routeStats.totalTime)}
            </div>
            <div className="text-sm text-green-600">total time</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {routeStats.averageSpeed.toFixed(1)}
            </div>
            <div className="text-sm text-yellow-600">avg km/h</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {routePoints.length}
            </div>
            <div className="text-sm text-purple-600">waypoints</div>
          </div>
        </div>
      </div>

      {/* Geofence Alerts */}
      {geofenceAlerts.length > 0 && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Route Alerts</h4>
          <div className="space-y-2">
            {geofenceAlerts.slice(-3).map((alert) => (
              <div key={alert.id} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="ml-2 text-sm text-yellow-800">{alert.message}</span>
                  <span className="ml-auto text-xs text-yellow-600">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex space-x-3">
        {trackingStatus === 'idle' && (
          <button
            onClick={startTracking}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Route Tracking
          </button>
        )}
        
        {trackingStatus === 'tracking' && (
          <button
            onClick={stopTracking}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Complete Route
          </button>
        )}

        {trackingStatus === 'completed' && (
          <div className="flex items-center space-x-2 text-green-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Route tracking completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GPSRouteTracker;

