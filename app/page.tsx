'use client';

import React, { useState, useRef } from 'react';

export default function Home() {
  const [drawing, setDrawing] = useState<string | null>(null);
  const [recognizedSymbols, setRecognizedSymbols] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawing(null);
    setRecognizedSymbols([]);
  };

  const analyzeDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setLoading(true);
    try {
      const imageData = canvas.toDataURL('image/png');
      setDrawing(imageData);

      const response = await fetch('/api/analyze-drawing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      });

      if (!response.ok) throw new Error('Failed to analyze drawing');

      const data = await response.json();
      setRecognizedSymbols(data.symbols || []);
    } catch (error) {
      console.error('Error analyzing drawing:', error);
      alert('Error analyzing drawing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">기호 인식 시스템</h1>
        <p className="text-center text-gray-600 mb-8">손그림으로 기호를 인식하고 코드로 변환합니다</p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">그림판</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 bg-gray-50">
            <canvas
              ref={canvasRef}
              width={600}
              height={400}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full bg-white cursor-crosshair border-2 border-gray-300 rounded"
            />
          </div>
          <div className="flex gap-4 justify-center">
            <button
              onClick={analyzeDrawing}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
            >
              {loading ? '분석 중...' : '기호 분석'}
            </button>
            <button
              onClick={clearCanvas}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
            >
              초기화
            </button>
          </div>
        </div>

        {recognizedSymbols.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">인식된 기호</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recognizedSymbols.map((symbol, index) => (
                <div key={index} className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded">
                  <h3 className="font-bold text-lg text-gray-800">{symbol.name}</h3>
                  <p className="text-gray-600 text-sm">{symbol.description}</p>
                  {symbol.code && (
                    <div className="mt-2 bg-gray-800 text-green-400 p-2 rounded font-mono text-xs overflow-x-auto">
                      <pre>{symbol.code}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}