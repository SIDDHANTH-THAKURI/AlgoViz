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
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Choose Your Algorithm</h2>
        <p className="text-gray-600 text-center mb-8">Select a sorting algorithm to visualize</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {algorithms.map(({ value, label, icon, complexity }, index) => (
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
      </motion.div>
    </div>
  );
};

export default AlgorithmSelector;