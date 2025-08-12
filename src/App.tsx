import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Visualizer from './components/Visualizer';
import GridVisualizer from './components/GridVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import AlgorithmInfo from './components/AlgorithmInfo';
import AlgorithmCategorySelector from './components/AlgorithmCategorySelector';
import AlgorithmMessage from './components/AlgorithmMessage';
import type { 
  AlgorithmType, 
  AlgorithmCategory, 
  VisualizationState, 
  Position, 
  TreeNode 
} from './types';
import { generateRandomArray, generateGrid, generateSampleTree, toggleWall } from './utils/dataGenerators';
import { runSortingAlgorithm } from './algorithms/sorting';
import { runPathfindingAlgorithm } from './algorithms/pathfinding';
import { runSearchAlgorithm } from './algorithms/searching';
import { runTreeAlgorithm } from './algorithms/trees';

// Inline Controls component to avoid import issues
function Controls({
  visualizationState,
  onGenerateData,
  onSpeedChange,
  onVisualizationStateChange,
  selectedCategory,
  selectedAlgorithm,
  searchTarget,
  onSearchTargetChange,
  array,
  gridData,
  tree
}: {
  visualizationState: VisualizationState;
  onGenerateData: () => void;
  onSpeedChange: (speed: number) => void;
  onVisualizationStateChange: (state: VisualizationState) => void;
  selectedCategory: AlgorithmCategory;
  selectedAlgorithm: AlgorithmType;
  searchTarget: number;
  onSearchTargetChange: (target: number) => void;
  array: number[];
  gridData: { grid: any[][], start: Position, end: Position };
  tree: TreeNode | null;
}) {
  const { isPlaying, isPaused, speed } = visualizationState;

  const handlePlay = async () => {
    if (isPaused) {
      onVisualizationStateChange({ 
        ...visualizationState, 
        isPlaying: true, 
        isPaused: false 
      });
      return;
    }

    try {
      let steps: any[] = [];
      
      // Get the current data based on category
      const currentCategory = selectedCategory;
      const currentAlgorithm = selectedAlgorithm;
      
      switch (currentCategory) {
        case 'sorting':
          steps = await runSortingAlgorithm(currentAlgorithm as any, [...array]);
          break;
        case 'pathfinding':
          steps = await runPathfindingAlgorithm(
            currentAlgorithm as any, 
            gridData.grid, 
            gridData.start, 
            gridData.end
          );
          break;
        case 'searching':
          steps = await runSearchAlgorithm(currentAlgorithm as any, [...array], searchTarget);
          break;
        case 'trees':
          steps = await runTreeAlgorithm(currentAlgorithm as any, tree, searchTarget);
          break;
      }
      
      onVisualizationStateChange({
        ...visualizationState,
        isPlaying: true,
        isPaused: false,
        steps,
        currentStep: 0
      });
    } catch (error) {
      console.error('Error running algorithm:', error);
    }
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

  const isDisabled = isPlaying && !isPaused;

  return (
    <div className="glass-card p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-4">
          {(selectedCategory === 'searching' || selectedCategory === 'trees') && (
            <div className="flex items-center gap-2">
              <label htmlFor="target" className="text-gray-700 font-semibold">
                {selectedCategory === 'searching' ? 'Search for:' : 'Value:'}
              </label>
              <input
                id="target"
                type="number"
                value={searchTarget}
                onChange={(e) => onSearchTargetChange(parseInt(e.target.value) || 0)}
                disabled={isDisabled}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <button
            onClick={onGenerateData}
            disabled={isDisabled}
            className="btn-secondary flex items-center gap-3"
          >
            <span>🔄</span>
            <span className="font-semibold">
              Generate New {selectedCategory === 'pathfinding' ? 'Grid' : 
                           selectedCategory === 'trees' ? 'Tree' : 'Data'}
            </span>
          </button>

          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="btn-primary flex items-center gap-3"
            >
              <span>▶️</span>
              <span className="font-semibold">
                {isPaused ? 'Resume' : 'Start Visualization'}
              </span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="btn-warning flex items-center gap-3"
            >
              <span>⏸️</span>
              <span className="font-semibold">Pause</span>
            </button>
          )}

          <button
            onClick={handleReset}
            className="btn-danger flex items-center gap-3"
          >
            <span>🔄</span>
            <span className="font-semibold">Reset</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 bg-white/50 rounded-2xl p-4 backdrop-blur-sm">
          <label htmlFor="speed" className="text-gray-700 font-semibold text-lg">
            Speed:
          </label>
          
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
          <div className="text-center bg-white/70 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-lg font-semibold text-gray-700 mb-2">
              {isPlaying ? 'Running...' : isPaused ? 'Paused' : 'Ready'}
            </div>
            <div className="text-sm text-gray-600">
              Step {visualizationState.currentStep + 1} of {visualizationState.steps.length}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState<AlgorithmCategory>('sorting');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmType>('bubble');
  const [array, setArray] = useState<number[]>(() => generateRandomArray(25));
  const [gridData, setGridData] = useState(() => generateGrid());
  const [tree, setTree] = useState<TreeNode | null>(() => generateSampleTree());
  const [searchTarget, setSearchTarget] = useState<number>(42);
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
      const delay = Math.max(50, 1000 - (visualizationState.speed * 9));
      
      const timer = setTimeout(() => {
        if (visualizationState.currentStep < visualizationState.steps.length - 1) {
          setVisualizationState(prev => ({
            ...prev,
            currentStep: prev.currentStep + 1
          }));
        } else {
          setVisualizationState(prev => ({
            ...prev,
            isPlaying: false,
            isPaused: false
          }));
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [
    visualizationState.isPlaying, 
    visualizationState.currentStep, 
    visualizationState.steps.length, 
    visualizationState.speed
  ]);

  const handleGenerateData = () => {
    if (!visualizationState.isPlaying) {
      switch (selectedCategory) {
        case 'sorting':
        case 'searching':
          const newArray = generateRandomArray(25);
          setArray(newArray);
          setSearchTarget(newArray[Math.floor(Math.random() * newArray.length)]);
          break;
        case 'pathfinding':
          setGridData(generateGrid());
          break;
        case 'trees':
          setTree(generateSampleTree());
          break;
      }
      
      setVisualizationState(prev => ({ 
        ...prev, 
        steps: [], 
        currentStep: 0,
        isPlaying: false,
        isPaused: false
      }));
    }
  };

  const handleSpeedChange = (speed: number) => {
    setVisualizationState(prev => ({ ...prev, speed }));
  };

  const handleCategoryChange = (category: AlgorithmCategory) => {
    if (!visualizationState.isPlaying) {
      setSelectedCategory(category);
      // Set default algorithm for each category
      const defaultAlgorithms: Record<AlgorithmCategory, AlgorithmType> = {
        sorting: 'bubble',
        pathfinding: 'astar',
        searching: 'binary-search',
        trees: 'bst-insert',
        graphs: 'graph-bfs'
      };
      setSelectedAlgorithm(defaultAlgorithms[category] as AlgorithmType);
      setVisualizationState(prev => ({ 
        ...prev, 
        steps: [], 
        currentStep: 0,
        isPlaying: false,
        isPaused: false
      }));
    }
  };

  const handleAlgorithmChange = (algorithm: AlgorithmType) => {
    if (!visualizationState.isPlaying) {
      setSelectedAlgorithm(algorithm);
      setVisualizationState(prev => ({ 
        ...prev, 
        steps: [], 
        currentStep: 0,
        isPlaying: false,
        isPaused: false
      }));
    }
  };

  const handleGridCellClick = (position: Position) => {
    if (!visualizationState.isPlaying) {
      const newGrid = toggleWall(gridData.grid, position);
      setGridData({ ...gridData, grid: newGrid });
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
          <AlgorithmCategorySelector
            selectedCategory={selectedCategory}
            selectedAlgorithm={selectedAlgorithm}
            onCategoryChange={handleCategoryChange}
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
            onGenerateData={handleGenerateData}
            onSpeedChange={handleSpeedChange}
            onVisualizationStateChange={setVisualizationState}
            selectedCategory={selectedCategory}
            selectedAlgorithm={selectedAlgorithm}
            searchTarget={searchTarget}
            onSearchTargetChange={setSearchTarget}
            array={array}
            gridData={gridData}
            tree={tree}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {selectedCategory === 'sorting' || selectedCategory === 'searching' ? (
            <Visualizer
              array={visualizationState.steps.length > 0 && visualizationState.steps[visualizationState.currentStep]?.array 
                ? visualizationState.steps[visualizationState.currentStep].array! 
                : array}
              visualizationState={visualizationState}
            />
          ) : selectedCategory === 'pathfinding' ? (
            <GridVisualizer
              grid={visualizationState.steps.length > 0 && visualizationState.steps[visualizationState.currentStep]?.grid
                ? visualizationState.steps[visualizationState.currentStep].grid!
                : gridData.grid}
              onCellClick={handleGridCellClick}
              isInteractive={!visualizationState.isPlaying}
            />
          ) : selectedCategory === 'trees' ? (
            <TreeVisualizer
              tree={visualizationState.steps.length > 0 && visualizationState.steps[visualizationState.currentStep]?.tree
                ? visualizationState.steps[visualizationState.currentStep].tree!
                : tree}
              highlightedNodes={visualizationState.steps.length > 0 && visualizationState.steps[visualizationState.currentStep]?.highlightedNodes
                ? visualizationState.steps[visualizationState.currentStep].highlightedNodes!
                : []}
            />
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <AlgorithmMessage visualizationState={visualizationState} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AlgorithmInfo algorithm={selectedAlgorithm} />
        </motion.div>
      </main>

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