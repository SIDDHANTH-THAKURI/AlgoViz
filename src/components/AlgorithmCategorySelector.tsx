import { motion } from 'framer-motion';
import {
  ArrowUpDown,
  Map,
  Search,
  GitBranch,
  Zap,
  TrendingUp,
  BarChart3,
  Navigation,
  Route,
  Eye,
  Binary,
  TreePine,
  Shuffle,
  Sparkles
} from 'lucide-react';
import type { AlgorithmCategory, AlgorithmType } from '../types';

interface AlgorithmCategorySelectorProps {
  selectedCategory: AlgorithmCategory;
  selectedAlgorithm: AlgorithmType;
  onCategoryChange: (category: AlgorithmCategory) => void;
  onAlgorithmChange: (algorithm: AlgorithmType) => void;
}

const AlgorithmCategorySelector = ({
  selectedCategory,
  selectedAlgorithm,
  onCategoryChange,
  onAlgorithmChange
}: AlgorithmCategorySelectorProps) => {
  const categories = [
    {
      value: 'sorting' as AlgorithmCategory,
      label: 'Sorting',
      icon: <ArrowUpDown size={28} />,
      description: 'Arrange elements in order',
      count: 5
    },
    {
      value: 'pathfinding' as AlgorithmCategory,
      label: 'Pathfinding',
      icon: <Map size={28} />,
      description: 'Find optimal paths',
      count: 4
    },
    {
      value: 'searching' as AlgorithmCategory,
      label: 'Searching',
      icon: <Search size={28} />,
      description: 'Find elements in data',
      count: 2
    },
    {
      value: 'trees' as AlgorithmCategory,
      label: 'Trees',
      icon: <GitBranch size={28} />,
      description: 'Tree data structures',
      count: 4
    }
  ];

  const algorithms: Record<
    AlgorithmCategory,
    Array<{
      value: AlgorithmType;
      label: string;
      icon: React.ReactNode;
      complexity: string;
      difficulty: 'Easy' | 'Medium' | 'Hard';
    }>
  > = {
    sorting: [
      { value: 'bubble', label: 'Bubble Sort', icon: <Shuffle size={20} />, complexity: 'O(n²)', difficulty: 'Easy' },
      { value: 'quick', label: 'Quick Sort', icon: <Zap size={20} />, complexity: 'O(n log n)', difficulty: 'Medium' },
      { value: 'merge', label: 'Merge Sort', icon: <GitBranch size={20} />, complexity: 'O(n log n)', difficulty: 'Medium' },
      { value: 'heap', label: 'Heap Sort', icon: <BarChart3 size={20} />, complexity: 'O(n log n)', difficulty: 'Hard' },
      { value: 'insertion', label: 'Insertion Sort', icon: <TrendingUp size={20} />, complexity: 'O(n²)', difficulty: 'Easy' }
    ],
    pathfinding: [
      { value: 'astar', label: 'A* Search', icon: <Navigation size={20} />, complexity: 'O(b^d)', difficulty: 'Hard' },
      { value: 'dijkstra', label: 'Dijkstra', icon: <Route size={20} />, complexity: 'O(V²)', difficulty: 'Medium' },
      { value: 'bfs', label: 'BFS', icon: <GitBranch size={20} />, complexity: 'O(V+E)', difficulty: 'Easy' },
      { value: 'dfs', label: 'DFS', icon: <TreePine size={20} />, complexity: 'O(V+E)', difficulty: 'Easy' }
    ],
    searching: [
      { value: 'binary-search', label: 'Binary Search', icon: <Binary size={20} />, complexity: 'O(log n)', difficulty: 'Easy' },
      { value: 'linear-search', label: 'Linear Search', icon: <Eye size={20} />, complexity: 'O(n)', difficulty: 'Easy' }
    ],
    trees: [
      { value: 'bst-insert', label: 'BST Insert', icon: <TreePine size={20} />, complexity: 'O(log n)', difficulty: 'Medium' },
      { value: 'bst-search', label: 'BST Search', icon: <Search size={20} />, complexity: 'O(log n)', difficulty: 'Medium' },
      { value: 'bst-delete', label: 'BST Delete', icon: <GitBranch size={20} />, complexity: 'O(log n)', difficulty: 'Hard' },
      { value: 'tree-traversal', label: 'Tree Traversal', icon: <Route size={20} />, complexity: 'O(n)', difficulty: 'Easy' }
    ],
    graphs: [
      { value: 'graph-bfs', label: 'Graph BFS', icon: <GitBranch size={20} />, complexity: 'O(V+E)', difficulty: 'Medium' },
      { value: 'graph-dfs', label: 'Graph DFS', icon: <TreePine size={20} />, complexity: 'O(V+E)', difficulty: 'Medium' }
    ]
  };

  const getDifficultyColor = (d: 'Easy' | 'Medium' | 'Hard') =>
    d === 'Easy' ? 'text-green-400' : d === 'Medium' ? 'text-yellow-400' : 'text-red-400';

  return (
    <section className="section-shell py-20 relative overflow-hidden">
      {/* Ambient aurora + grid */}
      <div className="aurora" />
      <div className="grid-overlay" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-chip mb-4">
            <Sparkles size={18} className="text-yellow-400" />
            <span className="text-sm">Interactive Visualizer</span>
          </div>

          <h2 className="gradient-title drop-shadow text-5xl md:text-6xl font-black tracking-tight mb-3">
            Choose Your Algorithm
          </h2>
          <p className="text-lg text-gray-300 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Pick a category, then dive into beautifully animated, step-by-step visualizations.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="section-kicker">Categories</div>
            <div className="divider-dot" />
            <div className="kicker-sub">Pick a starting domain</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(({ value, label, icon, description, count }, i) => (
              <motion.button
                key={value}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                onClick={() => onCategoryChange(value)}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                aria-pressed={selectedCategory === value}
                className={`category-card ${selectedCategory === value ? 'active' : ''}`}
              >
                <div
                  className={`category-icon ${
                    value === 'sorting' ? 'red' : value === 'pathfinding' ? 'green' : value === 'searching' ? 'blue' : 'purple'
                  }`}
                >
                  {icon}
                </div>

                <div className="label mb-1">{label}</div>
                <div className="desc">{description}</div>

                <div className="card-footer">
                  <span className="pill">{count} algos</span>
                </div>

                {/* shimmering border accent */}
                <span className="ring-ornament" aria-hidden />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Algorithms */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              {categories.find((c) => c.value === selectedCategory)?.label} Algorithms
            </h3>
            <p className="text-gray-300 opacity-80">Choose an algorithm to visualize</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {algorithms[selectedCategory]?.map(({ value, label, icon, complexity, difficulty }, i) => {
              const active = selectedAlgorithm === value;
              return (
                <motion.button
                  key={value}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  onClick={() => onAlgorithmChange(value)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`algorithm-card ${active ? 'active' : ''}`}
                >
                  <div className="algo-icon">{icon}</div>
                  <div className={`algo-title ${active ? 'text-white' : 'text-gray-200'}`}>{label}</div>

                  <div className="algo-meta-row">
                    <div className="algo-meta">{complexity}</div>
                    <div className={`algo-meta ${getDifficultyColor(difficulty)}`}>{difficulty}</div>
                  </div>

                  {/* subtle active badge */}
                  {active && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                      className="active-dot"
                      aria-hidden
                    />
                  )}

                  {/* soft glow */}
                  <span className="card-glow" aria-hidden />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlgorithmCategorySelector;
