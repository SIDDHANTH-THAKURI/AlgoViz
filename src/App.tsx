import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import AlgorithmSelector from './components/AlgorithmSelector';
import Visualizer from './components/Visualizer';
import Controls from './components/Controls';
import AlgorithmInfo from './components/AlgorithmInfo';
import type { SortingAlgorithm, VisualizationState } from './types';
import { generateRandomArray } from './utils/algorithms';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<SortingAlgorithm>('bubble');
  const [array, setArray] = useState<number[]>(() => generateRandomArray(50));
  const [visualizationState, setVisualizationState] = useState<VisualizationState>({
    isPlaying: false,
    isPaused: false,
    speed: 50,
    currentStep: 0,
    steps: []
  });

  const handleGenerateArray = () => {
    if (!visualizationState.isPlaying) {
      setArray(generateRandomArray(50));
      setVisualizationState(prev => ({ ...prev, steps: [], currentStep: 0 }));
    }
  };

  const handleSpeedChange = (speed: number) => {
    setVisualizationState(prev => ({ ...prev, speed }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlgorithmSelector
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={setSelectedAlgorithm}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Controls
            visualizationState={visualizationState}
            onGenerateArray={handleGenerateArray}
            onSpeedChange={handleSpeedChange}
            onVisualizationStateChange={setVisualizationState}
            array={array}
            selectedAlgorithm={selectedAlgorithm}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Visualizer
            array={array}
            visualizationState={visualizationState}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AlgorithmInfo algorithm={selectedAlgorithm} />
        </motion.div>
      </main>
    </div>
  );
}

export default App;