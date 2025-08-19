import { motion } from 'framer-motion';
import { Zap, TrendingUp, GitBranch, BarChart3, ArrowUpDown } from 'lucide-react';
import type { SortingAlgorithm } from '../types';

interface AlgorithmSelectorProps {
  selectedAlgorithm: SortingAlgorithm;
  onAlgorithmChange: (algorithm: SortingAlgorithm) => void;
}

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange }: AlgorithmSelectorProps) => {
  const algorithms: {
    value: SortingAlgorithm;
    label: string;
    icon: React.ReactNode;
    complexity: string;
    gradient: string;
  }[] = [
    { value: 'bubble', label: 'Bubble Sort', icon: <ArrowUpDown size={20} />, complexity: 'O(n²)', gradient: 'from-pink-500 to-rose-500' },
    { value: 'quick', label: 'Quick Sort', icon: <Zap size={20} />, complexity: 'O(n log n)', gradient: 'from-yellow-500 to-orange-500' },
    { value: 'merge', label: 'Merge Sort', icon: <GitBranch size={20} />, complexity: 'O(n log n)', gradient: 'from-green-500 to-emerald-500' },
    { value: 'heap', label: 'Heap Sort', icon: <BarChart3 size={20} />, complexity: 'O(n log n)', gradient: 'from-blue-500 to-cyan-500' },
    { value: 'insertion', label: 'Insertion Sort', icon: <TrendingUp size={20} />, complexity: 'O(n²)', gradient: 'from-purple-500 to-violet-500' },
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
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-6">
          Explore various sorting algorithms and watch them in action
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {algorithms.map(({ value, label, icon, complexity, gradient }, index) => (
            <motion.button
              key={value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onAlgorithmChange(value)}
              className={`relative rounded-xl p-[1px] bg-gradient-to-br ${gradient} ${
                selectedAlgorithm === value ? '' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <div className="glass-card !border-0 rounded-xl p-4 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/10 text-white">
                  {icon}
                </div>
                <div className="text-sm font-semibold text-white">{label}</div>
                <div className="text-xs text-gray-400 px-2 py-0.5 rounded-full bg-white/5">
                  {complexity}
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
