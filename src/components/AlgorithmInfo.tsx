import { motion } from 'framer-motion';
import { Clock, HardDrive, Info, BookOpen, TrendingUp } from 'lucide-react';
import type { SortingAlgorithm } from '../types';
import { algorithms } from '../utils/algorithms';

interface AlgorithmInfoProps {
  algorithm: SortingAlgorithm;
}

const AlgorithmInfo = ({ algorithm }: AlgorithmInfoProps) => {
  const algorithmData = algorithms[algorithm];

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes('n²')) return 'from-red-500 to-pink-500';
    if (complexity.includes('n log n')) return 'from-green-500 to-emerald-500';
    if (complexity.includes('n')) return 'from-blue-500 to-cyan-500';
    return 'from-purple-500 to-indigo-500';
  };

  const algorithmDetails = {
    bubble: {
      howItWorks: "Bubble sort repeatedly compares adjacent elements and swaps them if they're in the wrong order. The largest element 'bubbles up' to the end in each pass.",
      bestCase: "O(n) - when array is already sorted",
      worstCase: "O(n²) - when array is reverse sorted",
      stable: true,
      inPlace: true
    },
    quick: {
      howItWorks: "Quick sort picks a pivot element and partitions the array so elements smaller than pivot go left, larger go right. Then recursively sorts both parts.",
      bestCase: "O(n log n) - when pivot divides array evenly",
      worstCase: "O(n²) - when pivot is always smallest/largest",
      stable: false,
      inPlace: true
    },
    merge: {
      howItWorks: "Merge sort divides the array into halves recursively until single elements, then merges them back in sorted order.",
      bestCase: "O(n log n) - consistent performance",
      worstCase: "O(n log n) - consistent performance",
      stable: true,
      inPlace: false
    },
    heap: {
      howItWorks: "Heap sort builds a max heap from the array, then repeatedly extracts the maximum element and places it at the end.",
      bestCase: "O(n log n) - consistent performance",
      worstCase: "O(n log n) - consistent performance",
      stable: false,
      inPlace: true
    },
    insertion: {
      howItWorks: "Insertion sort builds the sorted array one element at a time by inserting each element into its correct position among the previously sorted elements.",
      bestCase: "O(n) - when array is already sorted",
      worstCase: "O(n²) - when array is reverse sorted",
      stable: true,
      inPlace: true
    }
  };

  const details = algorithmDetails[algorithm];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Info className="text-purple-600" size={28} />
        <h2 className="text-3xl font-bold text-gray-800">Algorithm Deep Dive</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BookOpen size={24} className="text-blue-600" />
              {algorithmData.name}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">{algorithmData.description}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              How It Works
            </h4>
            <p className="text-gray-700 leading-relaxed">{details.howItWorks}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/70 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {details.stable ? '✓' : '✗'}
              </div>
              <div className="text-sm font-semibold text-gray-700">Stable</div>
            </div>
            <div className="bg-white/70 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {details.inPlace ? '✓' : '✗'}
              </div>
              <div className="text-sm font-semibold text-gray-700">In-Place</div>
            </div>
          </div>
        </div>

        {/* Right Column - Complexity */}
        <div className="space-y-6">
          <div className="grid gap-4">
            <div className="bg-white/80 p-6 rounded-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-orange-500" size={24} />
                <h4 className="text-xl font-bold text-gray-800">Time Complexity</h4>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Case:</span>
                  <div className={`complexity-badge bg-gradient-to-r ${getComplexityColor(algorithmData.timeComplexity)}`}>
                    {algorithmData.timeComplexity}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Case:</span>
                  <div className="complexity-badge bg-gradient-to-r from-green-500 to-emerald-500">
                    {details.bestCase.split(' - ')[0]}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Worst Case:</span>
                  <div className="complexity-badge bg-gradient-to-r from-red-500 to-pink-500">
                    {details.worstCase.split(' - ')[0]}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 p-6 rounded-2xl border border-white/50">
              <div className="flex items-center gap-3 mb-4">
                <HardDrive className="text-green-500" size={24} />
                <h4 className="text-xl font-bold text-gray-800">Space Complexity</h4>
              </div>
              
              <div className="text-center">
                <div className="complexity-badge bg-gradient-to-r from-purple-500 to-indigo-500 text-2xl">
                  {algorithmData.spaceComplexity}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl">
            <h4 className="font-bold text-gray-800 mb-4">Performance Notes</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div><strong>Best Case:</strong> {details.bestCase}</div>
              <div><strong>Worst Case:</strong> {details.worstCase}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlgorithmInfo;