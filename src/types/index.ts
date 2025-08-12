export interface AlgorithmStep {
  array: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  message?: string;
}

export interface Algorithm {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  category: AlgorithmCategory;
}

export type AlgorithmCategory = 'sorting' | 'pathfinding' | 'trees' | 'graphs';

export type SortingAlgorithm = 'bubble' | 'quick' | 'merge' | 'heap' | 'insertion';

export interface VisualizationState {
  isPlaying: boolean;
  isPaused: boolean;
  speed: number;
  currentStep: number;
  steps: AlgorithmStep[];
}

export interface ArrayElement {
  value: number;
  id: string;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}