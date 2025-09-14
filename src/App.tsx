import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Sparkles, RefreshCw, Play, Pause, RotateCcw } from 'lucide-react';
import Header from './components/Header';
import Visualizer from './components/Visualizer';
import GridVisualizer from './components/GridVisualizer';
import TreeVisualizer from './components/TreeVisualizer';
import AlgorithmInfo from './components/AlgorithmInfo';
import AlgorithmCategorySelector from './components/AlgorithmCategorySelector';
import AlgorithmMessage from './components/AlgorithmMessage';
import ComplexityAnalyzer from './components/ComplexityAnalyzer';
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

// Inline Controls component
function Controls({
  visualizationState,
  onGenerateData,
  onSpeedChange,
  onVisualizationStateChange,
  selectedCategory,
  searchTarget,
  onSearchTargetChange,
  onPlay
}: {
  visualizationState: VisualizationState;
  onGenerateData: () => void;
  onSpeedChange: (speed: number) => void;
  onVisualizationStateChange: (state: VisualizationState) => void;
  selectedCategory: AlgorithmCategory;
  searchTarget: number;
  onSearchTargetChange: (target: number) => void;
  onPlay: () => void;
}) {
  const { isPlaying, isPaused, speed } = visualizationState;

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
        {/* Buttons row */}
        <div className="button-row flex flex-wrap justify-center gap-4">
          {(selectedCategory === 'searching' || selectedCategory === 'trees') && (
            <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg shadow-inner">
              <label htmlFor="target" className="text-gray-200 font-semibold">
                {selectedCategory === 'searching' ? 'Search for:' : 'Value:'}
              </label>
              <input
                id="target"
                type="number"
                value={searchTarget}
                onChange={(e) => onSearchTargetChange(parseInt(e.target.value) || 0)}
                disabled={isDisabled}
                style={{
                  width: '6rem', /* w-24 */
                  padding: '0.5rem 0.75rem', /* px-3 py-2 */
                  borderRadius: '0.5rem', /* rounded-lg */
                  border: '1px solid rgba(255, 255, 255, 0.2)', /* border-white/20 */
                  backgroundColor: 'rgba(0, 238, 255, 0.52)', /* bg-white/5 */
                  color: 'white', /* text-white */
                }}
              />
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGenerateData}
            disabled={isDisabled}
            className="btn btn-secondary flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-semibold">
              Generate New {selectedCategory === 'pathfinding' ? 'Grid' :
                selectedCategory === 'trees' ? 'Tree' : 'Data'}
            </span>
          </motion.button>

          {!isPlaying ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onPlay}
              className="btn btn-primary flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              <span className="font-semibold">{isPaused ? 'Resume' : 'Start Visualization'}</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePause}
              className="btn btn-warning flex items-center gap-2"
            >
              <Pause className="w-5 h-5" />
              <span className="font-semibold">Pause</span>
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="btn btn-danger flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="font-semibold">Reset</span>
          </motion.button>
        </div>

        {/* Speed row */}
        <div className="controls-row bg-white/10 rounded-xl p-4 shadow-inner flex flex-col items-center gap-4">
          <div className="flex items-center justify-center gap-3">
            <label htmlFor="speed" className="speed-label text-white font-semibold text-lg">Speed:</label>
            <span className="speed-endpoint text-gray-300 text-sm">Slow</span>
            <input
              id="speed"
              type="range"
              min="1"
              max="100"
              value={speed}
              onChange={(e) => onSpeedChange(parseInt(e.target.value))}
              className="speed-slider w-56 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg appearance-none cursor-pointer"
            />
            <span className="speed-endpoint text-gray-300 text-sm">Fast</span>
            <div className="speed-percent text-white font-bold text-xl w-16 text-center">{speed}%</div>
          </div>
        </div>

        {/* Status panel */}
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
          setVisualizationState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
        } else {
          setVisualizationState(prev => ({ ...prev, isPlaying: false, isPaused: false }));
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
        case 'searching': {
          const newArray = generateRandomArray(25);
          setArray(newArray);
          setSearchTarget(newArray[Math.floor(Math.random() * newArray.length)]);
          break;
        }
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
      const defaults: Record<AlgorithmCategory, AlgorithmType> = {
        sorting: 'bubble',
        pathfinding: 'astar',
        searching: 'binary-search',
        trees: 'bst-insert',
        graphs: 'graph-bfs'
      };
      setSelectedAlgorithm(defaults[category] as AlgorithmType);
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

  const handlePlay = async () => {
    if (visualizationState.isPaused) {
      setVisualizationState(prev => ({ ...prev, isPlaying: true, isPaused: false }));
      return;
    }

    try {
      let steps: any[] = [];

      switch (selectedCategory) {
        case 'sorting':
          steps = await runSortingAlgorithm(selectedAlgorithm as any, [...array]);
          break;
        case 'pathfinding':
          if (!gridData.grid || gridData.grid.length === 0) return;
          steps = await runPathfindingAlgorithm(
            selectedAlgorithm as any,
            gridData.grid,
            gridData.start,
            gridData.end
          );
          break;
        case 'searching':
          steps = await runSearchAlgorithm(selectedAlgorithm as any, [...array], searchTarget);
          break;
        case 'trees':
          if (!tree) {
            const newTree = generateSampleTree();
            setTree(newTree);
            steps = await runTreeAlgorithm(selectedAlgorithm as any, newTree, searchTarget);
          } else {
            steps = await runTreeAlgorithm(selectedAlgorithm as any, tree, searchTarget);
          }
          break;
      }

      if (steps.length === 0) return;

      setVisualizationState(prev => ({
        ...prev,
        isPlaying: true,
        isPaused: false,
        steps,
        currentStep: 0
      }));

      // Scroll to the live visualization section
      const liveVizSection = document.getElementById('live-visualization-section');
      if (liveVizSection) {
        liveVizSection.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Error running algorithm:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Header onStartVisualization={() => {
        const algorithmSection = document.getElementById('algorithm-selection-section');
        if (algorithmSection) {
          algorithmSection.scrollIntoView({ behavior: 'smooth' });
        }
      }} />

      <main className="container mx-auto px-6 py-12 space-y-12 max-w-6xl">
        {/* Algorithm Selection */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          id="algorithm-selection-section"
        >
          <AlgorithmCategorySelector
            selectedCategory={selectedCategory}
            selectedAlgorithm={selectedAlgorithm}
            onCategoryChange={handleCategoryChange}
            onAlgorithmChange={handleAlgorithmChange}
          />
        </motion.section>

        {/* Controls */}
        <motion.section
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
            searchTarget={searchTarget}
            onSearchTargetChange={setSearchTarget}
            onPlay={handlePlay}
          />
        </motion.section>

        {/* Main Visualization Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
          id="live-visualization-section"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-2">
              {selectedAlgorithm.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </h3>
            <p className="text-gray-300">Watch the algorithm work in real-time</p>
          </div>

          <div className="relative">
            <div className="viz-glow" />

            {selectedCategory === 'sorting' || selectedCategory === 'searching' ? (
              <Visualizer
                array={
                  visualizationState.steps.length > 0 &&
                  visualizationState.steps[visualizationState.currentStep]?.array
                    ? visualizationState.steps[visualizationState.currentStep].array!
                    : array
                }
                visualizationState={visualizationState}
              />
            ) : selectedCategory === 'pathfinding' ? (
              <GridVisualizer
                grid={
                  visualizationState.steps.length > 0 &&
                  visualizationState.steps[visualizationState.currentStep]?.grid
                    ? visualizationState.steps[visualizationState.currentStep].grid!
                    : gridData.grid
                }
                onCellClick={handleGridCellClick}
                isInteractive={!visualizationState.isPlaying}
              />
            ) : selectedCategory === 'trees' ? (
              <TreeVisualizer
                tree={
                  visualizationState.steps.length > 0 &&
                  visualizationState.steps[visualizationState.currentStep]?.tree
                    ? visualizationState.steps[visualizationState.currentStep].tree!
                    : tree
                }
                highlightedNodes={
                  visualizationState.steps.length > 0 &&
                  visualizationState.steps[visualizationState.currentStep]?.highlightedNodes
                    ? visualizationState.steps[visualizationState.currentStep].highlightedNodes!
                    : []
                }
              />
            ) : (
              <div className="glass-card p-16 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to Visualize!</h3>
                <p className="text-gray-300">Select an algorithm above to get started</p>
              </div>
            )}
          </div>
        </motion.section>

        {/* Status and Progress Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex justify-center"
        >
          <AlgorithmMessage visualizationState={visualizationState} />
        </motion.section>

        {/* Algorithm Information Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">Algorithm Details</h3>
            <p className="text-gray-400">Learn about complexity and implementation</p>
          </div>

          <AlgorithmInfo algorithm={selectedAlgorithm} />
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="relative mt-24 py-16 border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-purple-900/50 to-slate-900/50 backdrop-blur-sm" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-white mb-2">AlgoViz</h4>
            <p className="text-gray-300">Making algorithms beautiful and understandable</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
            <div className="glass-chip">
              <Code size={16} />
              <span>React + TypeScript</span>
            </div>
            <div className="glass-chip">
              <Zap size={16} />
              <span>Framer Motion</span>
            </div>
            <div className="glass-chip">
              <Sparkles size={16} />
              <span>Beautiful UI</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-gray-400">Built with ❤️ for algorithm enthusiasts and learners</p>
            <p className="text-gray-500 text-sm mt-2">© 2024 AlgoViz - Interactive Algorithm Visualizations</p>
          </div>
        </div>
      </footer>
      <ComplexityAnalyzer />
    </div>
  );
}

export default App;
