import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import type { VisualizationState } from '../types';

interface VisualizerProps {
  array: number[];
  visualizationState: VisualizationState;
}

const Visualizer = ({ array, visualizationState }: VisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('Ready to visualize!');

  const getBarColor = (index: number, step = visualizationState.steps[visualizationState.currentStep]) => {
    if (!step) return '#667eea';

    if (step.sorted?.includes(index)) return '#10b981';
    if (step.comparing?.includes(index)) return '#f59e0b';
    if (step.swapping?.includes(index)) return '#ef4444';
    if (step.pivot === index) return '#8b5cf6';

    return '#667eea';
  };

  // Helper function to draw rounded rectangle (compatible with all browsers)
  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const drawArray = (currentArray: number[], step?: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with subtle background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = Math.max(8, (canvas.width - 40) / currentArray.length);
    const maxHeight = Math.max(...currentArray);
    const padding = 20;

    currentArray.forEach((value, index) => {
      const barHeight = Math.max(10, (value / maxHeight) * (canvas.height - 80));
      const x = padding + index * barWidth;
      const y = canvas.height - barHeight - 30;

      const baseColor = getBarColor(index, step);
      
      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(1, baseColor + '80');

      // Draw bar with rounded top
      ctx.fillStyle = gradient;
      drawRoundedRect(ctx, x + 1, y, barWidth - 2, barHeight, 4);
      ctx.fill();

      // Add subtle border
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      drawRoundedRect(ctx, x + 1, y, barWidth - 2, barHeight, 4);
      ctx.stroke();

      // Add value labels for smaller arrays
      if (currentArray.length <= 25) {
        ctx.fillStyle = '#374151';
        ctx.font = '11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, canvas.height - 10);
      }

      // Add glow effect for active elements
      if (step?.comparing?.includes(index) || step?.swapping?.includes(index) || step?.pivot === index) {
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = 8;
        ctx.fillStyle = baseColor + '30';
        drawRoundedRect(ctx, x - 1, y - 1, barWidth, barHeight + 2, 5);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Update message
    if (step?.message) {
      setCurrentMessage(step.message);
    }
  };

  // Initial draw
  useEffect(() => {
    drawArray(array);
    setCurrentMessage('Array generated! Click Play to start visualization.');
  }, [array]);

  // Handle visualization steps
  useEffect(() => {
    if (visualizationState.steps.length > 0) {
      const currentStep = visualizationState.steps[visualizationState.currentStep];
      if (currentStep) {
        if (currentStep.array) {
          drawArray(currentStep.array, currentStep);
        }
      }
    }
  }, [visualizationState.currentStep, visualizationState.steps]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Eye size={24} className="text-purple-600" />
          <h2 className="text-3xl font-bold text-gray-800">Live Visualization</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Array Size: {array.length}</span>
        </div>
      </div>

      <div className="canvas-container mb-6">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-auto max-w-full border border-gray-200 rounded-lg"
          style={{ maxHeight: '400px' }}
        />
      </div>
      
      {currentMessage && (
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-xl text-center mb-6"
        >
          <div className="font-semibold text-lg">{currentMessage}</div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2 bg-white/70 p-3 rounded-lg">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#667eea' }}></div>
          <span className="font-medium">Default</span>
        </div>
        <div className="flex items-center gap-2 bg-white/70 p-3 rounded-lg">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
          <span className="font-medium">Comparing</span>
        </div>
        <div className="flex items-center gap-2 bg-white/70 p-3 rounded-lg">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div>
          <span className="font-medium">Swapping</span>
        </div>
        <div className="flex items-center gap-2 bg-white/70 p-3 rounded-lg">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }}></div>
          <span className="font-medium">Sorted</span>
        </div>
      </div>

      {visualizationState.steps.length > 0 && (
        <div className="mt-6 bg-white/70 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-600">
              {visualizationState.currentStep + 1} / {visualizationState.steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-300"
              style={{ 
                width: `${((visualizationState.currentStep + 1) / visualizationState.steps.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Visualizer;