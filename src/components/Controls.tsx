import { Play, Pause, RotateCcw, Shuffle } from 'lucide-react';
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
    <div className="glass-card rounded-xl p-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          <button
            onClick={onGenerateArray}
            disabled={isPlaying}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shuffle size={18} />
            Generate Array
          </button>

          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="btn-primary flex items-center gap-2"
            >
              <Play size={18} />
              Play
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Pause size={18} />
              Pause
            </button>
          )}

          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="speed" className="text-gray-700 font-medium">
            Speed:
          </label>
          <input
            id="speed"
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-gray-600 text-sm w-8">{speed}</span>
        </div>
      </div>
    </div>
  );
};

export default Controls;