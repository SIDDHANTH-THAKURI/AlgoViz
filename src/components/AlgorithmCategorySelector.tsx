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
import type { 
  AlgorithmCategory, 
  AlgorithmType 
} from '../types';

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
      gradient: 'from-orange-500 to-red-500',
      count: 5
    },
    { 
      value: 'pathfinding' as AlgorithmCategory, 
      label: 'Pathfinding', 
      icon: <Map size={28} />,
      description: 'Find optimal paths',
      gradient: 'from-green-500 to-emerald-500',
      count: 4
    },
    { 
      value: 'searching' as AlgorithmCategory, 
      label: 'Searching', 
      icon: <Search size={28} />,
      description: 'Find elements in data',
      gradient: 'from-blue-500 to-cyan-500',
      count: 2
    },
    { 
      value: 'trees' as AlgorithmCategory, 
      label: 'Trees', 
      icon: <GitBranch size={28} />,
      description: 'Tree data structures',
      gradient: 'from-purple-500 to-pink-500',
      count: 4
    }
  ];

  const algorithms: Record<AlgorithmCategory, Array<{value: AlgorithmType, label: string, icon: React.ReactNode, complexity: string, difficulty: string}>> = {
    sorting: [
      { value: 'bubble', label: 'Bubble Sort', icon: <Shuffle size={20} />, complexity: 'O(n²)', difficulty: 'Easy' },
      { value: 'quick', label: 'Quick Sort', icon: <Zap size={20} />, complexity: 'O(n log n)', difficulty: 'Medium' },
      { value: 'merge', label: 'Merge Sort', icon: <GitBranch size={20} />, complexity: 'O(n log n)', difficulty: 'Medium' },
      { value: 'heap', label: 'Heap Sort', icon: <BarChart3 size={20} />, complexity: 'O(n log n)', difficulty: 'Hard' },
      { value: 'insertion', label: 'Insertion Sort', icon: <TrendingUp size={20} />, complexity: 'O(n²)', difficulty: 'Easy' },
    ],
    pathfinding: [
      { value: 'astar', label: 'A* Search', icon: <Navigation size={20} />, complexity: 'O(b^d)', difficulty: 'Hard' },
      { value: 'dijkstra', label: 'Dijkstra', icon: <Route size={20} />, complexity: 'O(V²)', difficulty: 'Medium' },
      { value: 'bfs', label: 'BFS', icon: <GitBranch size={20} />, complexity: 'O(V+E)', difficulty: 'Easy' },
      { value: 'dfs', label: 'DFS', icon: <TreePine size={20} />, complexity: 'O(V+E)', difficulty: 'Easy' },
    ],
    searching: [
      { value: 'binary-search', label: 'Binary Search', icon: <Binary size={20} />, complexity: 'O(log n)', difficulty: 'Easy' },
      { value: 'linear-search', label: 'Linear Search', icon: <Eye size={20} />, complexity: 'O(n)', difficulty: 'Easy' },
    ],
    trees: [
      { value: 'bst-insert', label: 'BST Insert', icon: <TreePine size={20} />, complexity: 'O(log n)', difficulty: 'Medium' },
      { value: 'bst-search', label: 'BST Search', icon: <Search size={20} />, complexity: 'O(log n)', difficulty: 'Medium' },
      { value: 'bst-delete', label: 'BST Delete', icon: <GitBranch size={20} />, complexity: 'O(log n)', difficulty: 'Hard' },
      { value: 'tree-traversal', label: 'Tree Traversal', icon: <Route size={20} />, complexity: 'O(n)', difficulty: 'Easy' },
    ],
    graphs: [
      { value: 'graph-bfs', label: 'Graph BFS', icon: <GitBranch size={20} />, complexity: 'O(V+E)', difficulty: 'Medium' },
      { value: 'graph-dfs', label: 'Graph DFS', icon: <TreePine size={20} />, complexity: 'O(V+E)', difficulty: 'Medium' },
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles size={32} className="text-yellow-400" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Choose Your Algorithm
            </h2>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select a category and algorithm to begin your visualization journey
          </p>
        </motion.div>
        
        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Algorithm Categories</h3>
          <div className="glass-card p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map(({ value, label, icon, description, gradient }, index) => (
                <motion.button
                  key={value}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => onCategoryChange(value)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-pressed={selectedCategory === value}
                  className={`glass-card flex items-center gap-4 p-4 h-32 transition-all duration-300 ${
                    selectedCategory === value
                      ? 'border-blue-400/50 shadow-lg shadow-blue-500/20'
                      : 'hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${gradient} text-white shadow-lg flex-shrink-0`}
                  >
                    {icon}
                  </div>
                  <div className="text-left">
                    <div className="text-lg font-bold text-white mb-1">{label}</div>
                    <div className="text-sm text-gray-300">{description}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Algorithm Selection */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              {categories.find(c => c.value === selectedCategory)?.label} Algorithms
            </h3>
            <p className="text-gray-400">Choose an algorithm to visualize</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {algorithms[selectedCategory]?.map(({ value, label, icon, complexity, difficulty }, index) => (
              <motion.button
                key={value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => onAlgorithmChange(value)}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative p-4 rounded-xl border transition-all duration-300 group min-h-140 flex flex-col justify-center
                  ${selectedAlgorithm === value 
                    ? 'bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-400/50 shadow-lg shadow-purple-500/25' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }
                `}
              >
                <div className="text-center">
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-300
                    ${selectedAlgorithm === value 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg' 
                      : 'bg-white/10 text-gray-300 group-hover:bg-white/20'
                    }
                  `}>
                    {icon}
                  </div>
                  <h5 className={`font-semibold text-sm mb-2 ${
                    selectedAlgorithm === value ? 'text-white' : 'text-gray-200'
                  }`}>
                    {label}
                  </h5>
                  <div className="space-y-1">
                    <div className={`text-xs font-mono px-2 py-1 rounded ${
                      selectedAlgorithm === value 
                        ? 'bg-purple-500/30 text-purple-200' 
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {complexity}
                    </div>
                    <div className={`text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                      {difficulty}
                    </div>
                  </div>
                </div>
                
                {selectedAlgorithm === value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlgorithmCategorySelector;