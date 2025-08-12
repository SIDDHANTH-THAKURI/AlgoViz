import { motion } from 'framer-motion';
import { 
  ArrowUpDown, 
  Map, 
  Search, 
  GitBranch, 
  Network,
  Zap,
  TrendingUp,
  BarChart3,
  Navigation,
  Route,
  Eye,
  Binary,
  TreePine,
  Shuffle
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
      icon: <ArrowUpDown size={24} />,
      description: 'Arrange elements in order'
    },
    { 
      value: 'pathfinding' as AlgorithmCategory, 
      label: 'Pathfinding', 
      icon: <Map size={24} />,
      description: 'Find paths between points'
    },
    { 
      value: 'searching' as AlgorithmCategory, 
      label: 'Searching', 
      icon: <Search size={24} />,
      description: 'Find elements in data'
    },
    { 
      value: 'trees' as AlgorithmCategory, 
      label: 'Trees', 
      icon: <GitBranch size={24} />,
      description: 'Tree data structures'
    }
  ];

  const algorithms: Record<AlgorithmCategory, Array<{value: AlgorithmType, label: string, icon: React.ReactNode, complexity: string}>> = {
    sorting: [
      { value: 'bubble', label: 'Bubble Sort', icon: <Shuffle size={20} />, complexity: 'O(n²)' },
      { value: 'quick', label: 'Quick Sort', icon: <Zap size={20} />, complexity: 'O(n log n)' },
      { value: 'merge', label: 'Merge Sort', icon: <GitBranch size={20} />, complexity: 'O(n log n)' },
      { value: 'heap', label: 'Heap Sort', icon: <BarChart3 size={20} />, complexity: 'O(n log n)' },
      { value: 'insertion', label: 'Insertion Sort', icon: <TrendingUp size={20} />, complexity: 'O(n²)' },
    ],
    pathfinding: [
      { value: 'astar', label: 'A* Search', icon: <Navigation size={20} />, complexity: 'O(b^d)' },
      { value: 'dijkstra', label: 'Dijkstra', icon: <Route size={20} />, complexity: 'O(V²)' },
      { value: 'bfs', label: 'BFS', icon: <Network size={20} />, complexity: 'O(V+E)' },
      { value: 'dfs', label: 'DFS', icon: <GitBranch size={20} />, complexity: 'O(V+E)' },
    ],
    searching: [
      { value: 'binary-search', label: 'Binary Search', icon: <Binary size={20} />, complexity: 'O(log n)' },
      { value: 'linear-search', label: 'Linear Search', icon: <Eye size={20} />, complexity: 'O(n)' },
    ],
    trees: [
      { value: 'bst-insert', label: 'BST Insert', icon: <TreePine size={20} />, complexity: 'O(log n)' },
      { value: 'bst-search', label: 'BST Search', icon: <Search size={20} />, complexity: 'O(log n)' },
      { value: 'bst-delete', label: 'BST Delete', icon: <GitBranch size={20} />, complexity: 'O(log n)' },
      { value: 'tree-traversal', label: 'Tree Traversal', icon: <Route size={20} />, complexity: 'O(n)' },
    ],
    graphs: [
      { value: 'graph-bfs', label: 'Graph BFS', icon: <Network size={20} />, complexity: 'O(V+E)' },
      { value: 'graph-dfs', label: 'Graph DFS', icon: <GitBranch size={20} />, complexity: 'O(V+E)' },
    ]
  };

  return (
    <div className="glass-card p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Choose Algorithm Category</h2>
        <p className="text-gray-600 text-center mb-8">Select a category and then pick an algorithm to visualize</p>
        
        {/* Category Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {categories.map(({ value, label, icon, description }, index) => (
            <motion.button
              key={value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onCategoryChange(value)}
              className={`category-btn relative group ${
                selectedCategory === value ? 'active' : ''
              }`}
            >
              <div className="flex flex-col items-center gap-3 relative z-10">
                <div className="text-current">
                  {icon}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-lg">{label}</div>
                  <div className="text-xs opacity-75 mt-1">{description}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Algorithm Selection */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            {categories.find(c => c.value === selectedCategory)?.label} Algorithms
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {algorithms[selectedCategory]?.map(({ value, label, icon, complexity }, index) => (
              <motion.button
                key={value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => onAlgorithmChange(value)}
                className={`algorithm-btn relative group ${
                  selectedAlgorithm === value ? 'active' : ''
                }`}
              >
                <div className="flex flex-col items-center gap-3 relative z-10">
                  <div className="text-current">
                    {icon}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{label}</div>
                    <div className="text-xs opacity-75 mt-1">{complexity}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AlgorithmCategorySelector;