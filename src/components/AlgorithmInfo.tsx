import { motion } from 'framer-motion';
import { Clock, HardDrive, Info } from 'lucide-react';
import type { SortingAlgorithm } from '../types';
import { algorithms } from '../utils/algorithms';

interface AlgorithmInfoProps {
  algorithm: SortingAlgorithm;
}

const AlgorithmInfo = ({ algorithm }: AlgorithmInfoProps) => {
  const algorithmData = algorithms[algorithm];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <Info className="text-primary-500" size={24} />
        <h2 className="text-2xl font-semibold text-gray-800">Algorithm Information</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{algorithmData.name}</h3>
          <p className="text-gray-600 leading-relaxed">{algorithmData.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Clock className="text-blue-500" size={20} />
            <div>
              <div className="text-sm text-gray-600">Time Complexity</div>
              <div className="font-mono text-lg font-semibold text-blue-600">
                {algorithmData.timeComplexity}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
            <HardDrive className="text-green-500" size={20} />
            <div>
              <div className="text-sm text-gray-600">Space Complexity</div>
              <div className="font-mono text-lg font-semibold text-green-600">
                {algorithmData.spaceComplexity}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">Color Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Default</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Sorted</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlgorithmInfo;