import React, { useState, useRef, useEffect } from 'react';
import { Signature, Trash2, Upload, Download, Check, X } from 'lucide-react';

const DigitalSignatureModule = ({ onSave, onClear, onCancel }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const dataUrl = canvasRef.current.toDataURL();
    setSignatureData(dataUrl);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(null);
    if (onClear) onClear();
  };

  const handleSave = () => {
    if (signatureData && onSave) {
      onSave(signatureData);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border p-6 w-full max-w-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Signature className="w-5 h-5 mr-2" />
          Digital Signature
        </h3>
        {onCancel && (
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="relative w-full aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={500}
          height={281}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-full"
        />
        {!signatureData && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
            <p>Draw your signature here</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-xs text-gray-500">
          By signing, you agree to the terms and conditions.
        </p>
        <div className="flex space-x-2">
          <button
            onClick={handleClear}
            className="p-2 text-gray-600 hover:text-red-600 bg-gray-100 rounded-lg transition-colors"
            title="Clear Signature"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            disabled={!signatureData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Check className="w-5 h-5" />
            <span>Save Signature</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignatureModule;

