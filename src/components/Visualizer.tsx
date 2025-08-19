import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Play, Pause, Info } from 'lucide-react';
import type { VisualizationState } from '../types';

interface VisualizerProps {
  array: number[];
  visualizationState: VisualizationState;
}

const Visualizer = ({ array, visualizationState }: VisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('Ready to visualize!');

  const getBarColor = (index: number, step = visualizationState.steps[visualizationState.currentStep]) => {
    if (!step) return '#3b82f6';

    if (step.sorted?.includes(index)) return '#10b981';
    if (step.comparing?.includes(index)) return '#f59e0b';
    if (step.swapping?.includes(index)) return '#ef4444';
    if (step.pivot === index) return '#8b5cf6';

    return '#3b82f6';
  };

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

    // Clear canvas with dark background
    ctx.fillStyle = '#0f172a';
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

      // Add glow effect for active elements
      if (step?.comparing?.includes(index) || step?.swapping?.includes(index) || step?.pivot === index) {
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = 15;
        ctx.fillStyle = baseColor + '40';
        drawRoundedRect(ctx, x - 2, y - 2, barWidth + 2, barHeight + 4, 6);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Add value labels for smaller arrays
      if (currentArray.length <= 25) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, canvas.height - 8);
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
    <section className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 max-w-6xl mx-auto"
        >
          {/* Visualization Header */}
          <div className="viz-toolbar">
            <div className="flex items-center gap-3">
              <BarChart3 size={22} className="text-purple-400" />
              <h2 className="text-2xl font-extrabold text-white">Live Visualization</h2>
            </div>
            <span className="viz-badge">Array: {array.length}</span>
          </div>

          {/* Canvas Container */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-xl" />
            <div className="canvas-container relative">
              <canvas
                ref={canvasRef}
                width={1000}
                height={400}
                className="w-full h-auto rounded-xl"
                style={{ maxHeight: '400px' }}
              />
            </div>
          </div>
          
          {/* Current Message */}
          {currentMessage && (
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 mb-8"
            >
              <div className="flex items-center gap-3">
                <Info size={20} className="text-blue-400 flex-shrink-0" />
                <p className="text-white text-lg font-medium">{currentMessage}</p>
              </div>
            </motion.div>
          )}

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="glass-card p-4 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-blue-500"></div>
              <span className="text-white font-medium">Default</span>
            </div>
            <div className="glass-card p-4 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-yellow-500"></div>
              <span className="text-white font-medium">Comparing</span>
            </div>
            <div className="glass-card p-4 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-red-500"></div>
              <span className="text-white font-medium">Swapping</span>
            </div>
            <div className="glass-card p-4 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-green-500"></div>
              <span className="text-white font-medium">Sorted</span>
            </div>
          </div>

          {/* Progress Indicator */}
          {visualizationState.steps.length > 0 && (
            <div className="glass-card p-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-white">Visualization Progress</h4>
                <span className="text-sm text-gray-400">
                  {visualizationState.currentStep + 1} / {visualizationState.steps.length}
                </span>
              </div>
              <div className="progress-track">
                <div 
                  className="progress-fill transition-all duration-300"
                  style={{ 
                    width: `${((visualizationState.currentStep + 1) / visualizationState.steps.length) * 100}%` 
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Start</span>
                <span>{Math.round(((visualizationState.currentStep + 1) / visualizationState.steps.length) * 100)}%</span>
                <span>Complete</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Visualizer;