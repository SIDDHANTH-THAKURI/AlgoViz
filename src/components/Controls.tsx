import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Shuffle, Gauge } from 'lucide-react';
import type { SortingAlgorithm, VisualizationState } from '../types';
import { runSortingAlgorithm } from '../algorithms/sorting';

interface ControlsProps {
  visualizationState: VisualizationState;
  onGenerateArray: () => void;
  onSpeedChange: (speed: number) => void;
  onVisualizationStateChange: (state: VisualizationState) => void;
  array: number[];
  selectedAlgorithm: SortingAlgorithm;
}

const Controls = ({
  visualizationState,
  onGenerateArray,
  onSpeedChange,
  onVisualizationStateChange,
  array,
  selectedAlgorithm
}: ControlsProps) => {
  const { isPlaying, isPaused, speed } = visualizationState;

  const handlePlay = async () => {
    if (isPaused) {
      onVisualizationStateChange({ ...visualizationState, isPlaying: true, isPaused: false });
      return;
    }

    const steps = await runSortingAlgorithm(selectedAlgorithm, [...array]);
    onVisualizationStateChange({
      ...visualizationState,
      isPlaying: true,
      isPaused: false,
      steps,
      currentStep: 0
    });
  };

  const handlePause = () => {
    onVisualizationStateChange({
      ...visualizationState,
      isPlaying: false,
      isPaused: true
    });
  };

  const handleReset = () => {
    onVisualizationStateChange({
      ...visualizationState,
      isPlaying: false,
      isPaused: false,
      currentStep: 0,
      steps: []
    });
  };

  return (
    <div className="glass-card p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGenerateArray}
            disabled={isPlaying}
            className="btn-secondary flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shuffle size={20} />
            <span className="font-semibold">Generate New Array</span>
          </motion.button>

          {!isPlaying ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className="btn-primary flex items-center gap-3"
            >
              <Play size={20} />
              <span className="font-semibold">Start Visualization</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePause}
              className="btn-warning flex items-center gap-3"
            >
              <Pause size={20} />
              <span className="font-semibold">Pause</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="btn-danger flex items-center gap-3"
          >
            <RotateCcw size={20} />
            <span className="font-semibold">Reset</span>
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-6 bg-white/50 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Gauge size={20} className="text-gray-600" />
            <label htmlFor="speed" className="text-gray-700 font-semibold text-lg">
              Animation Speed
            </label>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-medium">Slow</span>
            <input
              id="speed"
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => onSpeedChange(parseInt(e.target.value))}
              className="speed-slider w-40"
            />
            <span className="text-sm text-gray-500 font-medium">Fast</span>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-xl font-bold min-w-[60px] text-center">
            {speed}%
          </div>
        </div>

        {visualizationState.steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white/70 rounded-xl p-4 backdrop-blur-sm"
          >
            <div className="text-lg font-semibold text-gray-700 mb-2">
              Progress: Step {visualizationState.currentStep + 1} of {visualizationState.steps.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((visualizationState.currentStep + 1) / visualizationState.steps.length) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Controls;