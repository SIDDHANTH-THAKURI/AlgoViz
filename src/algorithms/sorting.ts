import type { AlgorithmStep, SortingAlgorithm } from '../types';

export const runSortingAlgorithm = async (
  algorithm: SortingAlgorithm,
  array: number[]
): Promise<AlgorithmStep[]> => {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort(array);
    case 'quick':
      return quickSort(array);
    case 'merge':
      return mergeSort(array);
    case 'heap':
      return heapSort(array);
    case 'insertion':
      return insertionSort(array);
    default:
      return [];
  }
};

export const bubbleSort = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        message: `Comparing elements at positions ${j} and ${j + 1}`
      });

      if (arr[j] > arr[j + 1]) {
        // Swapping step
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          swapping: [j, j + 1],
          message: `Swapped elements at positions ${j} and ${j + 1}`
        });
      }
    }

    // Mark element as sorted
    steps.push({
      array: [...arr],
      sorted: Array.from({ length: i + 1 }, (_, idx) => n - 1 - idx),
      message: `Element at position ${n - 1 - i} is now in its final position`
    });
  }

  // Final step - all sorted
  steps.push({
    array: [...arr],
    sorted: Array.from({ length: n }, (_, i) => i),
    message: 'Array is completely sorted!'
  });

  return steps;
};

export const quickSort = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];

  const quickSortHelper = (low: number, high: number) => {
    if (low < high) {
      const pivotIndex = partition(arr, low, high, steps);
      quickSortHelper(low, pivotIndex - 1);
      quickSortHelper(pivotIndex + 1, high);
    }
  };

  quickSortHelper(0, arr.length - 1);

  // Final step
  steps.push({
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    message: 'Quick sort completed!'
  });

  return steps;
};

const partition = (arr: number[], low: number, high: number, steps: AlgorithmStep[]): number => {
  const pivot = arr[high];
  let i = low - 1;

  steps.push({
    array: [...arr],
    pivot: high,
    message: `Pivot selected: ${pivot} at position ${high}`
  });

  for (let j = low; j < high; j++) {
    steps.push({
      array: [...arr],
      comparing: [j],
      pivot: high,
      message: `Comparing ${arr[j]} with pivot ${pivot}`
    });

    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];

      steps.push({
        array: [...arr],
        swapping: [i, j],
        pivot: high,
        message: `Swapped ${arr[j]} and ${arr[i]}`
      });
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  steps.push({
    array: [...arr],
    swapping: [i + 1, high],
    message: `Placed pivot ${pivot} in its correct position`
  });

  return i + 1;
};

export const mergeSort = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];

  const mergeSortHelper = (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(arr, left, mid, right, steps);
    }
  };

  mergeSortHelper(0, arr.length - 1);

  steps.push({
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    message: 'Merge sort completed!'
  });

  return steps;
};

const merge = (arr: number[], left: number, mid: number, right: number, steps: AlgorithmStep[]) => {
  const leftArray = arr.slice(left, mid + 1);
  const rightArray = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArray.length && j < rightArray.length) {
    steps.push({
      array: [...arr],
      comparing: [left + i, mid + 1 + j],
      message: `Comparing ${leftArray[i]} and ${rightArray[j]}`
    });

    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }

    steps.push({
      array: [...arr],
      swapping: [k],
      message: `Placed ${arr[k]} at position ${k}`
    });
    k++;
  }

  while (i < leftArray.length) {
    arr[k] = leftArray[i];
    steps.push({
      array: [...arr],
      swapping: [k],
      message: `Placed remaining element ${arr[k]} at position ${k}`
    });
    i++;
    k++;
  }

  while (j < rightArray.length) {
    arr[k] = rightArray[j];
    steps.push({
      array: [...arr],
      swapping: [k],
      message: `Placed remaining element ${arr[k]} at position ${k}`
    });
    j++;
    k++;
  }
};

export const heapSort = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    steps.push({
      array: [...arr],
      swapping: [0, i],
      message: `Moved largest element to position ${i}`
    });

    heapify(arr, i, 0, steps);

    steps.push({
      array: [...arr],
      sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
      message: `Elements from position ${i} onwards are sorted`
    });
  }

  steps.push({
    array: [...arr],
    sorted: Array.from({ length: n }, (_, i) => i),
    message: 'Heap sort completed!'
  });

  return steps;
};

const heapify = (arr: number[], n: number, i: number, steps: AlgorithmStep[]) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    steps.push({
      array: [...arr],
      swapping: [i, largest],
      message: `Heapifying: swapped elements at positions ${i} and ${largest}`
    });

    heapify(arr, n, largest, steps);
  }
};

export const insertionSort = (array: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const arr = [...array];

  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [i],
      message: `Inserting element ${key} into sorted portion`
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        message: `Comparing ${arr[j]} with ${key}`
      });

      arr[j + 1] = arr[j];
      steps.push({
        array: [...arr],
        swapping: [j + 1],
        message: `Shifted ${arr[j]} to the right`
      });
      j--;
    }

    arr[j + 1] = key;
    steps.push({
      array: [...arr],
      swapping: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      message: `Placed ${key} at position ${j + 1}`
    });
  }

  steps.push({
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    message: 'Insertion sort completed!'
  });

  return steps;
};