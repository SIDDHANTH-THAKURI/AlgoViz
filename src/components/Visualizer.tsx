import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Maximize2 } from 'lucide-react';
import type { VisualizationState } from '../types';

interface VisualizerProps {
  array: number[];
  visualizationState: VisualizationState;
}

const Visualizer = ({ array, visualizationState }: VisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const getBarColor = (index: number, step = visualizationState.steps[visualizationState.currentStep]) => {
    if (!step) return '#667eea'; // Default gradient start

    if (step.sorted?.includes(index)) return '#10b981'; // Green for sorted
    if (step.comparing?.includes(index)) return '#f59e0b'; // Orange for comparing
    if (step.swapping?.includes(index)) return '#ef4444'; // Red for swapping
    if (step.pivot === index) return '#8b5cf6'; // Purple for pivot

    return '#667eea'; // Default gradient start
  };

  const drawArray = (currentArray: number[], step?: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with subtle background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const barWidth = (canvas.width - 40) / currentArray.length;
    const maxHeight = Math.max(...currentArray);
    const padding = 20;

    currentArray.forEach((value, index) => {
      const barHeight = (value / maxHeight) * (canvas.height - 60);
      const x = padding + index * barWidth;
      const y = canvas.height - barHeight - 20;

      const baseColor = getBarColor(index, step);
      
      // Create beautiful gradient for each bar
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(1, baseColor + '80');

      // Draw bar with rounded top
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x + 1, y, barWidth - 2, barHeight, [4, 4, 0, 0]);
      ctx.fill();

      // Add subtle border
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(x + 1, y, barWidth - 2, barHeight, [4, 4, 0, 0]);
      ctx.stroke();

      // Add value labels for smaller arrays
      if (currentArray.length <= 20) {
        ctx.fillStyle = '#374151';
        ctx.font = '12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, canvas.height - 5);
      }

      // Add glow effect for active elements
      if (step?.comparing?.includes(index) || step?.swapping?.includes(index) || step?.pivot === index) {
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = 10;
        ctx.fillStyle = baseColor + '40';
        ctx.beginPath();
        ctx.roundRect(x - 2, y - 2, barWidth + 2, barHeight + 4, [6, 6, 0, 0]);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Update message
    if (step?.message) {
      setCurrentMessage(step.message);
    }
  };

  useEffect(() => {
    drawArray(array);
  }, [array]);

  useEffect(() => {
    if (visualizationState.isPlaying && visualizationState.steps.length > 0) {
      const animate = () => {
        const currentStep = visualizationState.steps[visualizationState.currentStep];
        if (currentStep) {
          drawArray(currentStep.array, currentStep);
        }
        
        if (visualizationState.currentStep < visualizationState.steps.length - 1) {
          setTimeout(() => {
            if (visualizationState.isPlaying) {
              animationRef.current = requestAnimationFrame(animate);
            }
          }, 101 - visualizationState.speed);
        }
      };

      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [visualizationState]);

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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-colors"
        >
          <Maximize2 size={20} className="text-gray-600" />
        </motion.button>
      </div>

      <div className="canvas-container mb-6">
        <canvas
          ref={canvasRef}
          width={900}
          height={450}
          className="w-full h-auto max-w-full"
          style={{ maxHeight: '450px' }}
        />
      </div>
      
      {currentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-xl text-center"
        >
          <div className="font-semibold text-lg">{currentMessage}</div>
        </motion.div>
      )}

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2 bg-white/70 p-3 rounded-lg">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="font-medium">Default</span>
        </div>
        <div className="flex items-center gap-2 bg-white/70 p-3 rounded-lg">
          <div className="w-4 h-4 bg-orange-500 rounded"></div>
          <span className="font-medium">Comparing</span>
        </div>
        <div className="flex items-center gap-2 bg-white/70 p-3 rounded-lg">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="font-medium">Swapping</span>
        </div>
        <div className="flex items-center gap-2 bg-white/70 p-3 rounded-lg">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="font-medium">Sorted</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Visualizer;