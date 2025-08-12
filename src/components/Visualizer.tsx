import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { VisualizationState } from '../types';

interface VisualizerProps {
  array: number[];
  visualizationState: VisualizationState;
}

const Visualizer = ({ array, visualizationState }: VisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const getBarColor = (index: number, step = visualizationState.steps[visualizationState.currentStep]) => {
    if (!step) return '#3b82f6'; // Default blue

    if (step.sorted?.includes(index)) return '#10b981'; // Green for sorted
    if (step.comparing?.includes(index)) return '#f59e0b'; // Orange for comparing
    if (step.swapping?.includes(index)) return '#ef4444'; // Red for swapping
    if (step.pivot === index) return '#8b5cf6'; // Purple for pivot

    return '#3b82f6'; // Default blue
  };

  const drawArray = (currentArray: number[], step?: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / currentArray.length;
    const maxHeight = Math.max(...currentArray);

    currentArray.forEach((value, index) => {
      const barHeight = (value / maxHeight) * (canvas.height - 20);
      const x = index * barWidth;
      const y = canvas.height - barHeight;

      const color = getBarColor(index, step);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color + '80');

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth - 2, barHeight);

      // Add border
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, barWidth - 2, barHeight);
    });
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
              // This would need to be handled by the parent component
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
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visualization</h2>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="border-2 border-gray-200 rounded-lg bg-white shadow-inner"
        />
      </div>
      
      {visualizationState.steps.length > 0 && (
        <div className="mt-4 flex justify-center">
          <div className="text-sm text-gray-600">
            Step {visualizationState.currentStep + 1} of {visualizationState.steps.length}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Visualizer;