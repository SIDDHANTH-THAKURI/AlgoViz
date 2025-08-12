import type { Algorithm } from '../types';

export const algorithms: Record<string, Algorithm> = {
  bubble: {
    name: 'Bubble Sort',
    description: 'Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    category: 'sorting'
  },
  quick: {
    name: 'Quick Sort',
    description: 'Quick sort picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    category: 'sorting'
  },
  merge: {
    name: 'Merge Sort',
    description: 'Merge sort divides the array into halves, sorts them separately, and then merges the sorted halves.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    category: 'sorting'
  },
  heap: {
    name: 'Heap Sort',
    description: 'Heap sort builds a max heap from the array and repeatedly extracts the maximum element.',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    category: 'sorting'
  },
  insertion: {
    name: 'Insertion Sort',
    description: 'Insertion sort builds the final sorted array one item at a time by inserting each element into its correct position.',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    category: 'sorting'
  }
};

export const generateRandomArray = (size: number = 50, min: number = 5, max: number = 300): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};