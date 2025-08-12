import { motion } from 'framer-motion';
import type { VisualizationState } from '../types';

interface AlgorithmMessageProps {
  visualizationState: VisualizationState;
}

const AlgorithmMessage = ({ visualizationState }: AlgorithmMessageProps) => {
  const { steps, currentStep, isPlaying, isPaused } = visualizationState;
  
  const currentMessage = steps.length > 0 && steps[currentStep]?.message 
    ? steps[currentStep].message 
    : 'Ready to start visualization';

  const getStatusColor = () => {
    if (isPlaying) return 'status-running';
    if (isPaused) return 'status-paused';
    return 'status-ready';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`algorithm-message ${getStatusColor()}`}
    >
      <div className="text-center">
        <div className="font-semibold mb-1">
          {isPlaying ? '🔄 Running' : isPaused ? '⏸️ Paused' : '⚡ Ready'}
        </div>
        <div className="text-sm opacity-90">
          {currentMessage}
        </div>
        {steps.length > 0 && (
          <div className="text-xs mt-2 opacity-75">
            Step {currentStep + 1} of {steps.length}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AlgorithmMessage;