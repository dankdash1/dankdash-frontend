import React, { useState, useEffect, useRef } from 'react';

const RouteMapGenerator = ({ 
  routeData, 
  manifestNumber,
  onMapGenerated,
  showPreview = true 
}) => {
  const [mapImageUrl, setMapImageUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mapError, setMapError] = useState(null);
  const canvasRef = useRef(null);

  // Generate static map image using route data
  const generateRouteMap = async () => {
    if (!routeData || !routeData.allWaypoints || routeData.allWaypoints.length === 0) {
      setMapError('No route data available');
      return;
    }

    setIsGenerating(true);
    setMapError(null);

    try {
      // Create canvas for map generation
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 800;
      canvas.height = 600;

      // Clear canvas
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate bounds for all waypoints
      const bounds = calculateBounds(routeData.allWaypoints);
      
      // Draw route map
      await drawRouteMap(ctx, routeData, bounds);
      
      // Convert canvas to image
      const imageUrl = canvas.toDataURL('image/png');
      setMapImageUrl(imageUrl);

      // Generate comprehensive route report
      const routeReport = generateRouteReport(routeData, imageUrl);
      
      if (onMapGenerated) {
        onMapGenerated(routeReport);
      }

    } catch (error) {
      console.error('Error generating route map:', error);
      setMapError('Failed to generate route map');
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate geographical bounds for the route
  const calculateBounds = (waypoints) => {
    let minLat = waypoints[0].lat;
    let maxLat = waypoints[0].lat;
    let minLng = waypoints[0].lng;
    let maxLng = waypoints[0].lng;

    waypoints.forEach(point => {
      minLat = Math.min(minLat, point.lat);
      maxLat = Math.max(maxLat, point.lat);
      minLng = Math.min(minLng, point.lng);
      maxLng = Math.max(maxLng, point.lng);
    });

    // Add padding
    const latPadding = (maxLat - minLat) * 0.1;
    const lngPadding = (maxLng - minLng) * 0.1;

    return {
      minLat: minLat - latPadding,
      maxLat: maxLat + latPadding,
      minLng: minLng - lngPadding,
      maxLng: maxLng + lngPadding
    };
  };

  // Convert GPS coordinates to canvas coordinates
  const gpsToCanvas = (lat, lng, bounds, canvasWidth, canvasHeight) => {
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * (canvasWidth - 100) + 50;
    const y = canvasHeight - 50 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * (canvasHeight - 100);
    return { x, y };
  };

  // Draw the complete route map
  const drawRouteMap = async (ctx, routeData, bounds) => {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`METRC Manifest Route: ${manifestNumber}`, canvasWidth / 2, 30);

    // Draw route statistics
    ctx.font = '14px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Distance: ${routeData.statistics?.totalDistanceMiles?.toFixed(1) || 0} miles`, 20, 60);
    ctx.fillText(`Duration: ${routeData.statistics?.totalTimeFormatted || '0h 0m'}`, 200, 60);
    ctx.fillText(`Avg Speed: ${routeData.statistics?.averageSpeedMph?.toFixed(1) || 0} mph`, 350, 60);
    ctx.fillText(`Waypoints: ${routeData.allWaypoints?.length || 0}`, 500, 60);

    // Draw warehouse location (start/end)
    if (routeData.warehouseLocation) {
      const warehousePos = gpsToCanvas(
        routeData.warehouseLocation.lat, 
        routeData.warehouseLocation.lng, 
        bounds, 
        canvasWidth, 
        canvasHeight
      );
      
      // Warehouse marker (green square)
      ctx.fillStyle = '#10b981';
      ctx.fillRect(warehousePos.x - 8, warehousePos.y - 8, 16, 16);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('W', warehousePos.x, warehousePos.y + 4);
      
      // Warehouse label
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('Warehouse', warehousePos.x, warehousePos.y + 25);
    }

    // Draw delivery location (if different from warehouse)
    if (routeData.routeData?.endLocation && routeData.allWaypoints.length > 1) {
      const deliveryPos = gpsToCanvas(
        routeData.routeData.endLocation.lat,
        routeData.routeData.endLocation.lng,
        bounds,
        canvasWidth,
        canvasHeight
      );
      
      // Delivery marker (red circle)
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(deliveryPos.x, deliveryPos.y, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('D', deliveryPos.x, deliveryPos.y + 4);
      
      // Delivery label
      ctx.fillStyle = '#1f2937';
      ctx.font = '12px Inter, sans-serif';
      ctx.fillText('Delivery', deliveryPos.x, deliveryPos.y + 25);
    }

    // Draw route path
    if (routeData.allWaypoints && routeData.allWaypoints.length > 1) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();

      // Convert first waypoint to canvas coordinates
      const firstPoint = gpsToCanvas(
        routeData.allWaypoints[0].lat,
        routeData.allWaypoints[0].lng,
        bounds,
        canvasWidth,
        canvasHeight
      );
      ctx.moveTo(firstPoint.x, firstPoint.y);

      // Draw line through all waypoints
      for (let i = 1; i < routeData.allWaypoints.length; i++) {
        const point = gpsToCanvas(
          routeData.allWaypoints[i].lat,
          routeData.allWaypoints[i].lng,
          bounds,
          canvasWidth,
          canvasHeight
        );
        ctx.lineTo(point.x, point.y);
      }
      
      ctx.stroke();

      // Draw waypoint dots
      ctx.fillStyle = '#1d4ed8';
      routeData.allWaypoints.forEach((waypoint, index) => {
        const point = gpsToCanvas(waypoint.lat, waypoint.lng, bounds, canvasWidth, canvasHeight);
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // Draw compliance information
    ctx.fillStyle = '#1f2937';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'left';
    const complianceY = canvasHeight - 80;
    
    ctx.fillText('Compliance Information:', 20, complianceY);
    ctx.fillText(`Speed Violations: ${routeData.compliance?.speedViolations || 0}`, 20, complianceY + 20);
    ctx.fillText(`Route Deviations: ${routeData.compliance?.routeDeviations || 0}`, 200, complianceY + 20);
    ctx.fillText(`Geofence Alerts: ${routeData.compliance?.geofenceAlerts?.length || 0}`, 380, complianceY + 20);

    // Draw timestamps
    ctx.textAlign = 'right';
    ctx.fillText(`Generated: ${new Date().toLocaleString()}`, canvasWidth - 20, canvasHeight - 20);
    
    if (routeData.timestamps?.trackingStarted) {
      ctx.fillText(`Started: ${new Date(routeData.timestamps.trackingStarted).toLocaleString()}`, canvasWidth - 20, complianceY);
    }
    
    if (routeData.timestamps?.trackingCompleted) {
      ctx.fillText(`Completed: ${new Date(routeData.timestamps.trackingCompleted).toLocaleString()}`, canvasWidth - 20, complianceY + 20);
    }
  };

  // Generate comprehensive route report for METRC
  const generateRouteReport = (routeData, mapImageUrl) => {
    return {
      manifestNumber,
      mapImage: mapImageUrl,
      routeData: routeData,
      reportData: {
        summary: {
          totalDistance: `${routeData.statistics?.totalDistanceMiles?.toFixed(2) || 0} miles`,
          totalTime: routeData.statistics?.totalTimeFormatted || '0h 0m',
          averageSpeed: `${routeData.statistics?.averageSpeedMph?.toFixed(1) || 0} mph`,
          maxSpeed: `${routeData.statistics?.maxSpeedMph?.toFixed(1) || 0} mph`,
          waypointsRecorded: routeData.allWaypoints?.length || 0
        },
        compliance: {
          speedViolations: routeData.compliance?.speedViolations || 0,
          routeDeviations: routeData.compliance?.routeDeviations || 0,
          geofenceAlerts: routeData.compliance?.geofenceAlerts || [],
          overallCompliance: (routeData.compliance?.speedViolations || 0) === 0 && 
                           (routeData.compliance?.routeDeviations || 0) === 0 ? 'COMPLIANT' : 'VIOLATIONS DETECTED'
        },
        locations: {
          warehouse: routeData.warehouseLocation,
          startLocation: routeData.routeData?.startLocation,
          endLocation: routeData.routeData?.endLocation,
          allWaypoints: routeData.allWaypoints
        },
        timestamps: routeData.timestamps,
        generatedAt: new Date().toISOString()
      }
    };
  };

  // Auto-generate map when route data changes
  useEffect(() => {
    if (routeData && routeData.allWaypoints && routeData.allWaypoints.length > 0) {
      generateRouteMap();
    }
  }, [routeData]);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Route Map Generator</h3>
          <p className="text-sm text-gray-600">METRC Manifest: {manifestNumber}</p>
        </div>
        <button
          onClick={generateRouteMap}
          disabled={isGenerating || !routeData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {isGenerating ? 'Generating...' : 'Generate Map'}
        </button>
      </div>

      {/* Hidden canvas for map generation */}
      <canvas
        ref={canvasRef}
        style={{ display: 'none' }}
        width={800}
        height={600}
      />

      {/* Map preview */}
      {showPreview && mapImageUrl && (
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Route Map Preview</h4>
          <div className="border rounded-lg overflow-hidden">
            <img 
              src={mapImageUrl} 
              alt={`Route map for manifest ${manifestNumber}`}
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Route summary */}
      {routeData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {routeData.statistics?.totalDistanceMiles?.toFixed(1) || 0}
            </div>
            <div className="text-sm text-blue-600">miles</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {routeData.statistics?.totalTimeFormatted || '0h 0m'}
            </div>
            <div className="text-sm text-green-600">duration</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <div className="text-lg font-bold text-yellow-600">
              {routeData.statistics?.averageSpeedMph?.toFixed(1) || 0}
            </div>
            <div className="text-sm text-yellow-600">avg mph</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <div className="text-lg font-bold text-purple-600">
              {routeData.allWaypoints?.length || 0}
            </div>
            <div className="text-sm text-purple-600">waypoints</div>
          </div>
        </div>
      )}

      {/* Error display */}
      {mapError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-red-600">❌</span>
            <span className="ml-2 text-sm text-red-800">{mapError}</span>
          </div>
        </div>
      )}

      {/* Status */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          {isGenerating ? 'Generating route map...' : 
           mapImageUrl ? 'Route map ready for METRC submission' : 
           'Waiting for route data'}
        </span>
        {mapImageUrl && (
          <span className="text-green-600 font-medium">✅ Map Generated</span>
        )}
      </div>
    </div>
  );
};

export default RouteMapGenerator;

