import type { AlgorithmStep, SearchAlgorithm } from '../types';

export const runSearchAlgorithm = async (
  algorithm: SearchAlgorithm,
  array: number[],
  target: number
): Promise<AlgorithmStep[]> => {
  switch (algorithm) {
    case 'binary-search':
      return binarySearch(array, target);
    case 'linear-search':
      return linearSearch(array, target);
    default:
      return [];
  }
};

export const binarySearch = (array: number[], target: number): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array].sort((a, b) => a - b); // Binary search requires sorted array
  let left = 0;
  let right = arr.length - 1;

  steps.push({
    array: [...arr],
    message: `Binary search for ${target}. Array must be sorted first.`
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      comparing: [mid],
      message: `Checking middle element at index ${mid}: ${arr[mid]}`
    });

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        sorted: [mid],
        message: `Found ${target} at index ${mid}! Binary search completed.`
      });
      return steps;
    }

    if (arr[mid] < target) {
      left = mid + 1;
      steps.push({
        array: [...arr],
        comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        message: `${arr[mid]} < ${target}. Searching right half (indices ${left} to ${right})`
      });
    } else {
      right = mid - 1;
      steps.push({
        array: [...arr],
        comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
        message: `${arr[mid]} > ${target}. Searching left half (indices ${left} to ${right})`
      });
    }
  }

  steps.push({
    array: [...arr],
    message: `${target} not found in the array. Binary search completed.`
  });

  return steps;
};

export const linearSearch = (array: number[], target: number): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];

  steps.push({
    array: [...arr],
    message: `Linear search for ${target}. Checking each element sequentially.`
  });

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      comparing: [i],
      message: `Checking element at index ${i}: ${arr[i]}`
    });

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        sorted: [i],
        message: `Found ${target} at index ${i}! Linear search completed.`
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    message: `${target} not found in the array. Linear search completed.`
  });

  return steps;
};