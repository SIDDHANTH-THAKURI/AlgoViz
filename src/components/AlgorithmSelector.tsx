import type { SortingAlgorithm } from '../types';

interface AlgorithmSelectorProps {
  selectedAlgorithm: SortingAlgorithm;
  onAlgorithmChange: (algorithm: SortingAlgorithm) => void;
}

const AlgorithmSelector = ({ selectedAlgorithm, onAlgorithmChange }: AlgorithmSelectorProps) => {
  const algorithms: { value: SortingAlgorithm; label: string }[] = [
    { value: 'bubble', label: 'Bubble Sort' },
    { value: 'quick', label: 'Quick Sort' },
    { value: 'merge', label: 'Merge Sort' },
    { value: 'heap', label: 'Heap Sort' },
    { value: 'insertion', label: 'Insertion Sort' },
  ];

  return (
    <div className="glass-card rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Choose Algorithm</h2>
      <div className="flex flex-wrap gap-3">
        {algorithms.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onAlgorithmChange(value)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedAlgorithm === value
                ? 'bg-primary-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:transform hover:scale-105'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmSelector;