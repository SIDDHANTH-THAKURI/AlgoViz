import { motion } from 'framer-motion';
import { 
  Clock, 
  HardDrive, 
  Info, 
  CheckCircle, 
  XCircle, 
  Zap, 
  TrendingUp,

  Search,
  GitBranch,
  Navigation,
  Route,
  Eye,
  Binary,
  TreePine,
  Network
} from 'lucide-react';
import type { AlgorithmType } from '../types';

interface AlgorithmInfoProps {
  algorithm: AlgorithmType;
}

const AlgorithmInfo = ({ algorithm }: AlgorithmInfoProps) => {
  const algorithmDetails = {
    // Sorting algorithms
    bubble: {
      howItWorks: "Compares adjacent elements and swaps them if they're in wrong order. Largest element 'bubbles up' each pass.",
      bestCase: "O(n)",
      worstCase: "O(n²)",
      stable: true,
      inPlace: true,
      icon: <TrendingUp size={20} />,
      color: 'from-orange-500 to-red-500',
      category: 'Sorting',
      spaceComplexity: 'O(1)'
    },
    quick: {
      howItWorks: "Picks a pivot, partitions array around it, then recursively sorts sub-arrays.",
      bestCase: "O(n log n)",
      worstCase: "O(n²)",
      stable: false,
      inPlace: true,
      icon: <Zap size={20} />,
      color: 'from-yellow-500 to-orange-500',
      category: 'Sorting',
      spaceComplexity: 'O(log n)'
    },
    merge: {
      howItWorks: "Divides array into halves, sorts them separately, then merges sorted halves.",
      bestCase: "O(n log n)",
      worstCase: "O(n log n)",
      stable: true,
      inPlace: false,
      icon: <TrendingUp size={20} />,
      color: 'from-green-500 to-blue-500',
      category: 'Sorting',
      spaceComplexity: 'O(n)'
    },
    heap: {
      howItWorks: "Builds max heap, then repeatedly extracts maximum element to end.",
      bestCase: "O(n log n)",
      worstCase: "O(n log n)",
      stable: false,
      inPlace: true,
      icon: <TrendingUp size={20} />,
      color: 'from-purple-500 to-pink-500',
      category: 'Sorting',
      spaceComplexity: 'O(1)'
    },
    insertion: {
      howItWorks: "Builds sorted array one element at a time by inserting each into correct position.",
      bestCase: "O(n)",
      worstCase: "O(n²)",
      stable: true,
      inPlace: true,
      icon: <TrendingUp size={20} />,
      color: 'from-blue-500 to-purple-500',
      category: 'Sorting',
      spaceComplexity: 'O(1)'
    },
    // Pathfinding algorithms
    astar: {
      howItWorks: "Uses heuristic function to guide search towards goal, combining actual distance with estimated remaining distance.",
      bestCase: "O(b^d)",
      worstCase: "O(b^d)",
      optimal: true,
      complete: true,
      icon: <Navigation size={20} />,
      color: 'from-green-500 to-blue-500',
      category: 'Pathfinding',
      spaceComplexity: 'O(b^d)'
    },
    dijkstra: {
      howItWorks: "Finds shortest path by exploring nodes in order of their distance from start, guaranteeing optimal solution.",
      bestCase: "O(V²)",
      worstCase: "O(V²)",
      optimal: true,
      complete: true,
      icon: <Route size={20} />,
      color: 'from-purple-500 to-pink-500',
      category: 'Pathfinding',
      spaceComplexity: 'O(V)'
    },
    bfs: {
      howItWorks: "Explores all nodes at current depth before moving to next depth level, guarantees shortest path in unweighted graphs.",
      bestCase: "O(V + E)",
      worstCase: "O(V + E)",
      optimal: true,
      complete: true,
      icon: <GitBranch size={20} />,
      color: 'from-blue-500 to-cyan-500',
      category: 'Pathfinding',
      spaceComplexity: 'O(V)'
    },
    dfs: {
      howItWorks: "Explores as far as possible along each branch before backtracking, may not find optimal path.",
      bestCase: "O(V + E)",
      worstCase: "O(V + E)",
      optimal: false,
      complete: true,
      icon: <GitBranch size={20} />,
      color: 'from-orange-500 to-red-500',
      category: 'Pathfinding',
      spaceComplexity: 'O(V)'
    },
    // Search algorithms
    'binary-search': {
      howItWorks: "Repeatedly divides sorted array in half, comparing target with middle element to eliminate half of remaining elements.",
      bestCase: "O(1)",
      worstCase: "O(log n)",
      optimal: true,
      complete: true,
      icon: <Binary size={20} />,
      color: 'from-green-500 to-teal-500',
      category: 'Searching',
      spaceComplexity: 'O(1)'
    },
    'linear-search': {
      howItWorks: "Checks each element sequentially until target is found or end of array is reached.",
      bestCase: "O(1)",
      worstCase: "O(n)",
      optimal: false,
      complete: true,
      icon: <Eye size={20} />,
      color: 'from-yellow-500 to-orange-500',
      category: 'Searching',
      spaceComplexity: 'O(1)'
    },
    // Tree algorithms
    'bst-insert': {
      howItWorks: "Compares new value with current node, goes left if smaller or right if larger, inserts when empty spot found.",
      bestCase: "O(log n)",
      worstCase: "O(n)",
      balanced: false,
      complete: true,
      icon: <TreePine size={20} />,
      color: 'from-green-500 to-emerald-500',
      category: 'Trees',
      spaceComplexity: 'O(log n)'
    },
    'bst-search': {
      howItWorks: "Compares target with current node, goes left if smaller or right if larger until found or null reached.",
      bestCase: "O(log n)",
      worstCase: "O(n)",
      balanced: false,
      complete: true,
      icon: <Search size={20} />,
      color: 'from-blue-500 to-indigo-500',
      category: 'Trees',
      spaceComplexity: 'O(log n)'
    },
    'bst-delete': {
      howItWorks: "Finds node to delete, handles three cases: no children, one child, or two children (replace with inorder successor).",
      bestCase: "O(log n)",
      worstCase: "O(n)",
      balanced: false,
      complete: true,
      icon: <GitBranch size={20} />,
      color: 'from-red-500 to-pink-500',
      category: 'Trees',
      spaceComplexity: 'O(log n)'
    },
    'tree-traversal': {
      howItWorks: "Visits all nodes in specific order: inorder (left, root, right), preorder (root, left, right), or postorder (left, right, root).",
      bestCase: "O(n)",
      worstCase: "O(n)",
      balanced: true,
      complete: true,
      icon: <Route size={20} />,
      color: 'from-purple-500 to-violet-500',
      category: 'Trees',
      spaceComplexity: 'O(log n)'
    },
    // Graph algorithms (placeholder)
    'graph-bfs': {
      howItWorks: "Explores graph nodes level by level using a queue data structure.",
      bestCase: "O(V + E)",
      worstCase: "O(V + E)",
      optimal: true,
      complete: true,
      icon: <GitBranch size={20} />,
      color: 'from-blue-500 to-cyan-500',
      category: 'Graphs',
      spaceComplexity: 'O(V)'
    },
    'graph-dfs': {
      howItWorks: "Explores graph nodes depth-first using a stack data structure.",
      bestCase: "O(V + E)",
      worstCase: "O(V + E)",
      optimal: false,
      complete: true,
      icon: <GitBranch size={20} />,
      color: 'from-orange-500 to-red-500',
      category: 'Graphs',
      spaceComplexity: 'O(V)'
    },
    'mst-kruskal': {
      howItWorks: "Finds minimum spanning tree by sorting edges and using union-find data structure.",
      bestCase: "O(E log E)",
      worstCase: "O(E log E)",
      optimal: true,
      complete: true,
      icon: <Network size={20} />,
      color: 'from-green-500 to-teal-500',
      category: 'Graphs',
      spaceComplexity: 'O(V)'
    },
    'mst-prim': {
      howItWorks: "Finds minimum spanning tree by growing tree from arbitrary starting vertex.",
      bestCase: "O(E log V)",
      worstCase: "O(E log V)",
      optimal: true,
      complete: true,
      icon: <Network size={20} />,
      color: 'from-purple-500 to-pink-500',
      category: 'Graphs',
      spaceComplexity: 'O(V)'
    }
  } as const;

  const details = algorithmDetails[algorithm as keyof typeof algorithmDetails];

  if (!details) {
    return (
      <div className="glass-card p-6">
        <p className="text-gray-600 text-center">Algorithm information not available</p>
      </div>
    );
  }

  const getAlgorithmName = (alg: AlgorithmType): string => {
    const names: Record<AlgorithmType, string> = {
      // Sorting
      bubble: 'Bubble Sort',
      quick: 'Quick Sort',
      merge: 'Merge Sort',
      heap: 'Heap Sort',
      insertion: 'Insertion Sort',
      // Pathfinding
      astar: 'A* Search',
      dijkstra: "Dijkstra's Algorithm",
      bfs: 'Breadth-First Search',
      dfs: 'Depth-First Search',
      // Searching
      'binary-search': 'Binary Search',
      'linear-search': 'Linear Search',
      // Trees
      'bst-insert': 'BST Insert',
      'bst-search': 'BST Search',
      'bst-delete': 'BST Delete',
      'tree-traversal': 'Tree Traversal',
      // Graphs (placeholder)
      'graph-bfs': 'Graph BFS',
      'graph-dfs': 'Graph DFS',
      'mst-kruskal': 'Kruskal MST',
      'mst-prim': 'Prim MST'
    };
    return names[alg] || alg;
  };

  const getComplexityColor = (complexity: string): string => {
    if (complexity.includes('n²') || complexity.includes('n^2')) {
      return 'linear-gradient(135deg, #dc2626, #be185d)'; // Red for quadratic
    }
    if (complexity.includes('n log n')) {
      return 'linear-gradient(135deg, #059669, #047857)'; // Green for n log n
    }
    if (complexity.includes('log n')) {
      return 'linear-gradient(135deg, #2563eb, #1d4ed8)'; // Blue for logarithmic
    }
    if (complexity.includes('n') && !complexity.includes('log')) {
      return 'linear-gradient(135deg, #f59e0b, #d97706)'; // Orange for linear
    }
    if (complexity.includes('1')) {
      return 'linear-gradient(135deg, #10b981, #059669)'; // Teal for constant
    }
    return 'linear-gradient(135deg, #7c3aed, #5b21b6)'; // Purple for others
  };

  const getDifficulty = (alg: AlgorithmType): string => {
    const difficulties: Record<AlgorithmType, string> = {
      // Sorting
      bubble: 'Easy',
      insertion: 'Easy',
      merge: 'Medium',
      heap: 'Medium',
      quick: 'Hard',
      // Pathfinding
      bfs: 'Easy',
      dfs: 'Easy',
      dijkstra: 'Medium',
      astar: 'Hard',
      // Searching
      'linear-search': 'Easy',
      'binary-search': 'Medium',
      // Trees
      'bst-search': 'Easy',
      'bst-insert': 'Medium',
      'tree-traversal': 'Medium',
      'bst-delete': 'Hard',
      // Graphs (placeholder)
      'graph-bfs': 'Medium',
      'graph-dfs': 'Medium',
      'mst-kruskal': 'Hard',
      'mst-prim': 'Hard'
    };
    return difficulties[alg] || 'Medium';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${details.color}`}>
          {details.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{getAlgorithmName(algorithm)}</h2>
          <p className="opacity-80 text-sm">{details.category} Algorithm Analysis</p>
        </div>
      </div>

      {/* Main Content - Compact 2-column layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Description & How it works */}
        <div className="space-y-4">
          <div className="glass-card p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Info size={16} />
              How It Works
            </h4>
            <p className="text-sm leading-relaxed opacity-90">{details.howItWorks}</p>
          </div>

          {/* Properties - Adaptive based on algorithm type */}
          <div className="glass-card p-4">
            <h4 className="font-semibold mb-3">Properties</h4>
            <div className="flex gap-6 flex-wrap">
              {details.category === 'Sorting' && (
                <>
                  <div className="flex items-center gap-2">
                    {'stable' in details && details.stable ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <XCircle size={16} className="text-red-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">Stable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {'inPlace' in details && details.inPlace ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <XCircle size={16} className="text-red-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">In-Place</span>
                  </div>
                </>
              )}
              {(details.category === 'Pathfinding' || details.category === 'Searching') && (
                <>
                  <div className="flex items-center gap-2">
                    {'optimal' in details && details.optimal ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <XCircle size={16} className="text-red-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">Optimal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {'complete' in details && details.complete ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <XCircle size={16} className="text-red-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">Complete</span>
                  </div>
                </>
              )}
              {details.category === 'Trees' && (
                <>
                  <div className="flex items-center gap-2">
                    {'balanced' in details && details.balanced ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <XCircle size={16} className="text-red-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">Balanced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {'complete' in details && details.complete ? (
                      <CheckCircle size={16} className="text-green-600" />
                    ) : (
                      <XCircle size={16} className="text-red-600" />
                    )}
                    <span className="text-sm font-medium text-gray-700">Complete</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Complexity */}
        <div className="space-y-4">
          {/* Time Complexity - Compact */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="text-orange-500" size={18} />
              <h4 className="font-semibold text-white">Time Complexity</h4>
            </div>

            <div className="space-y-3">
              <div className="flex items-center">
              <span className="text-sm font-medium text-gray-300">Best:</span>
                <div
                  className="text-xs px-3 py-1.5 rounded-full text-white font-mono font-bold shadow-lg border border-white/20"
                  style={{
                    background: getComplexityColor(details.bestCase),
                    padding: "4px",
                    marginLeft: "5px"
                  }}
                >
                  {details.bestCase}
                </div>
              </div>
              <div className="flex items-center">
              <span className="text-sm font-medium text-gray-300">Worst:</span>
                <div
                  className="text-xs px-3 py-1.5 rounded-full text-white font-mono font-bold shadow-lg border border-white/20"
                  style={{
                    background: getComplexityColor(details.worstCase),
                    padding: "4px",
                    marginLeft: "5px"
                  }}
                >
                  {details.worstCase}
                </div>
              </div>
            </div>
          </div>

          {/* Space Complexity - Compact */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive className="text-green-500" size={18} />
              <h4 className="font-semibold text-white">Space Complexity</h4>
            </div>

            <div className="text-center">
            <div
                className="text-lg px-4 py-2 rounded-full text-white font-mono font-bold inline-block shadow-lg border border-white/20"
                style={{
                  background: getComplexityColor(details.spaceComplexity)
                }}
              >
                {details.spaceComplexity}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="glass-card p-4">
            <h4 className="font-semibold text-white mb-2">Quick Stats</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-center p-2 glass-card">
                <div className="font-semibold text-white">Category</div>
                <div className="text-gray-300">{details.category}</div>
              </div>
              <div className="text-center p-2 glass-card">
                <div className="font-semibold text-white">Difficulty</div>
                <div className="text-gray-300">
                  {getDifficulty(algorithm)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Legend - Adaptive based on category */}
      <div className="mt-6 glass-card p-4">
        <h4 className="font-semibold text-white mb-3 text-center">Visualization Colors</h4>
        {['Sorting', 'Pathfinding', 'Searching', 'Trees'].includes(details.category) ? (
          <div className="flex justify-center gap-4 text-xs flex-wrap text-gray-200">
            {details.category === 'Sorting' && (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#667eea' }}></div>
                  <span>Default</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span>Comparing</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
                  <span>Swapping</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
                  <span>Sorted</span>
                </div>
              </>
            )}
            {details.category === 'Pathfinding' && (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
                  <span>Start</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#ef4444' }}></div>
                  <span>End</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#1f2937' }}></div>
                  <span>Wall</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#93c5fd' }}></div>
                  <span>Visited</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#fbbf24' }}></div>
                  <span>Path</span>
                </div>
              </>
            )}
            {details.category === 'Searching' && (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#667eea' }}></div>
                  <span>Default</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span>Checking</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10b981' }}></div>
                  <span>Found</span>
                </div>
              </>
            )}
            {details.category === 'Trees' && (
              <>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#667eea' }}></div>
                  <span>Normal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
                  <span>Highlighted</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-200 text-sm">No color information available.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AlgorithmInfo;