import { useState, useEffect } from 'react';
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
  const [array, setArray] = useState<number[]>(() => generateRandomArray(30));
  const [visualizationState, setVisualizationState] = useState<VisualizationState>({
    isPlaying: false,
    isPaused: false,
    speed: 50,
    currentStep: 0,
    steps: []
  });

  // Auto-advance visualization steps
  useEffect(() => {
    if (visualizationState.isPlaying && visualizationState.steps.length > 0) {
      const timer = setTimeout(() => {
        if (visualizationState.currentStep < visualizationState.steps.length - 1) {
          setVisualizationState(prev => ({
            ...prev,
            currentStep: prev.currentStep + 1
          }));
        } else {
          // Animation completed
          setVisualizationState(prev => ({
            ...prev,
            isPlaying: false,
            isPaused: false
          }));
        }
      }, 101 - visualizationState.speed);

      return () => clearTimeout(timer);
    }
  }, [visualizationState.isPlaying, visualizationState.currentStep, visualizationState.steps.length, visualizationState.speed]);

  const handleGenerateArray = () => {
    if (!visualizationState.isPlaying) {
      setArray(generateRandomArray(30));
      setVisualizationState(prev => ({ ...prev, steps: [], currentStep: 0 }));
    }
  };

  const handleSpeedChange = (speed: number) => {
    setVisualizationState(prev => ({ ...prev, speed }));
  };

  const handleAlgorithmChange = (algorithm: SortingAlgorithm) => {
    if (!visualizationState.isPlaying) {
      setSelectedAlgorithm(algorithm);
      setVisualizationState(prev => ({ ...prev, steps: [], currentStep: 0 }));
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 space-y-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AlgorithmSelector
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={handleAlgorithmChange}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Visualizer
            array={array}
            visualizationState={visualizationState}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AlgorithmInfo algorithm={selectedAlgorithm} />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80">
            Built with ❤️ using React, TypeScript, and Tailwind CSS
          </p>
          <p className="text-white/60 text-sm mt-2">
            © 2024 AlgoViz - Interactive Algorithm Visualizations
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;