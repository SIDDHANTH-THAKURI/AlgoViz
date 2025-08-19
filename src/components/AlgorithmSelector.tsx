import { motion } from 'framer-motion';
import { Zap, TrendingUp, GitBranch, BarChart3, ArrowUpDown } from 'lucide-react';
import type { SortingAlgorithm } from '../types';

interface AlgorithmSelectorProps {
  selectedAlgorithm: SortingAlgorithm;
  onAlgorithmChange: (algorithm: SortingAlgorithm) => void;
}

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange }: AlgorithmSelectorProps) => {
  const algorithms: { value: SortingAlgorithm; label: string; icon: React.ReactNode; complexity: string }[] = [
    { value: 'bubble', label: 'Bubble Sort', icon: <ArrowUpDown size={20} />, complexity: 'O(n²)' },
    { value: 'quick', label: 'Quick Sort', icon: <Zap size={20} />, complexity: 'O(n log n)' },
    { value: 'merge', label: 'Merge Sort', icon: <GitBranch size={20} />, complexity: 'O(n log n)' },
    { value: 'heap', label: 'Heap Sort', icon: <BarChart3 size={20} />, complexity: 'O(n log n)' },
    { value: 'insertion', label: 'Insertion Sort', icon: <TrendingUp size={20} />, complexity: 'O(n²)' },
  ];

  return (
    <div className="glass-card p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <BarChart3 size={32} className="text-cyan-400" />
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Sorting Algorithms
          </h2>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Explore various sorting algorithms and watch them in action
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {algorithms.map(({ value, label, icon, complexity }, index) => (
            <motion.button
              key={value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onAlgorithmChange(value)}
              className={`algorithm-card relative group ${selectedAlgorithm === value ? 'active' : ''}`}
            >
              <div className="algo-icon">{icon}</div>
              <div className="algo-title">{label}</div>
              <div className="algo-meta">{complexity}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AlgorithmSelector;