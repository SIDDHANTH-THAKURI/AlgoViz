export interface AlgorithmStep {
  array?: number[];
  comparing?: number[];
  swapping?: number[];
  sorted?: number[];
  pivot?: number;
  message?: string;
  // For pathfinding
  grid?: GridCell[][];
  path?: Position[];
  visited?: Position[];
  current?: Position;
  // For trees
  tree?: TreeNode | null;
  highlightedNodes?: number[];
  // For graphs
  graph?: GraphNode[];
  edges?: Edge[];
}

export interface Algorithm {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  category: AlgorithmCategory;
}

export type AlgorithmCategory = 'sorting' | 'pathfinding' | 'trees' | 'graphs' | 'searching';

export type SortingAlgorithm = 'bubble' | 'quick' | 'merge' | 'heap' | 'insertion';
export type PathfindingAlgorithm = 'astar' | 'dijkstra' | 'bfs' | 'dfs';
export type TreeAlgorithm = 'bst-insert' | 'bst-search' | 'bst-delete' | 'tree-traversal';
export type GraphAlgorithm = 'graph-bfs' | 'graph-dfs' | 'mst-kruskal' | 'mst-prim';
export type SearchAlgorithm = 'binary-search' | 'linear-search';

export type AlgorithmType = SortingAlgorithm | PathfindingAlgorithm | TreeAlgorithm | GraphAlgorithm | SearchAlgorithm;

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

// Pathfinding types
export interface Position {
  x: number;
  y: number;
}

export interface GridCell {
  x: number;
  y: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isPath: boolean;
  isVisited: boolean;
  distance: number;
  heuristic: number;
  fCost: number;
  parent?: Position;
}

// Tree types
export interface TreeNode {
  value: number;
  left?: TreeNode | null;
  right?: TreeNode | null;
  id: string;
  x?: number;
  y?: number;
  highlighted?: boolean;
}

// Graph types
export interface GraphNode {
  id: string;
  value: number;
  x: number;
  y: number;
  visited?: boolean;
  distance?: number;
  highlighted?: boolean;
}

export interface Edge {
  from: string;
  to: string;
  weight: number;
  highlighted?: boolean;
}

// Visualization state for different algorithm types
export interface VisualizationConfig {
  category: AlgorithmCategory;
  algorithm: AlgorithmType;
  data: any; // Will be array, grid, tree, or graph depending on category
}