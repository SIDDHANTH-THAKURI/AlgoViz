import type { GridCell, Position, TreeNode } from '../types';

export const generateRandomArray = (size: number, min: number = 5, max: number = 100): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const generateGrid = (width: number = 20, height: number = 15): { 
  grid: GridCell[][], 
  start: Position, 
  end: Position 
} => {
  const grid: GridCell[][] = [];
  
  for (let y = 0; y < height; y++) {
    const row: GridCell[] = [];
    for (let x = 0; x < width; x++) {
      row.push({
        x,
        y,
        isWall: Math.random() < 0.25, // 25% chance of wall
        isStart: false,
        isEnd: false,
        isPath: false,
        isVisited: false,
        distance: Infinity,
        heuristic: 0,
        fCost: Infinity,
        parent: undefined
      });
    }
    grid.push(row);
  }

  // Set start and end positions
  const start: Position = { x: 1, y: 1 };
  const end: Position = { x: width - 2, y: height - 2 };
  
  // Ensure start and end are not walls
  grid[start.y][start.x].isWall = false;
  grid[start.y][start.x].isStart = true;
  grid[end.y][end.x].isWall = false;
  grid[end.y][end.x].isEnd = true;

  return { grid, start, end };
};

export const generateBinarySearchTree = (values: number[]): TreeNode | null => {
  if (values.length === 0) return null;

  let root: TreeNode | null = null;
  let nodeCounter = 0;

  const insert = (node: TreeNode | null, value: number): TreeNode => {
    if (!node) {
      return {
        value,
        id: (nodeCounter++).toString(),
        left: undefined,
        right: undefined
      };
    }

    if (value < node.value) {
      node.left = insert(node.left || null, value);
    } else if (value > node.value) {
      node.right = insert(node.right || null, value);
    }

    return node;
  };

  for (const value of values) {
    root = insert(root, value);
  }

  return root;
};

export const generateSampleTree = (): TreeNode => {
  return {
    value: 50,
    id: '0',
    left: {
      value: 30,
      id: '1',
      left: {
        value: 20,
        id: '2',
        left: {
          value: 10,
          id: '3'
        },
        right: {
          value: 25,
          id: '4'
        }
      },
      right: {
        value: 40,
        id: '5',
        right: {
          value: 45,
          id: '6'
        }
      }
    },
    right: {
      value: 70,
      id: '7',
      left: {
        value: 60,
        id: '8',
        left: {
          value: 55,
          id: '9'
        },
        right: {
          value: 65,
          id: '10'
        }
      },
      right: {
        value: 80,
        id: '11',
        right: {
          value: 90,
          id: '12'
        }
      }
    }
  };
};

export const toggleWall = (grid: GridCell[][], position: Position): GridCell[][] => {
  const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
  const cell = newGrid[position.y][position.x];
  
  // Don't allow toggling start or end cells
  if (cell.isStart || cell.isEnd) return grid;
  
  cell.isWall = !cell.isWall;
  // Reset other states when toggling wall
  cell.isVisited = false;
  cell.isPath = false;
  
  return newGrid;
};

export const resetGrid = (grid: GridCell[][]): GridCell[][] => {
  return grid.map(row => 
    row.map(cell => ({
      ...cell,
      isVisited: false,
      isPath: false,
      distance: Infinity,
      heuristic: 0,
      fCost: Infinity,
      parent: undefined
    }))
  );
};