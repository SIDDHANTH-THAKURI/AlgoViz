import type { AlgorithmStep, PathfindingAlgorithm, GridCell, Position } from '../types';

export const runPathfindingAlgorithm = async (
  algorithm: PathfindingAlgorithm,
  grid: GridCell[][],
  start: Position,
  end: Position
): Promise<AlgorithmStep[]> => {
  switch (algorithm) {
    case 'astar':
      return aStar(grid, start, end);
    case 'dijkstra':
      return dijkstra(grid, start, end);
    case 'bfs':
      return breadthFirstSearch(grid, start, end);
    case 'dfs':
      return depthFirstSearch(grid, start, end);
    default:
      return [];
  }
};

export const aStar = (grid: GridCell[][], start: Position, end: Position): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const openSet: Position[] = [start];
  const closedSet: Position[] = [];
  
  // Initialize grid
  const workingGrid = grid.map(row => row.map(cell => ({ ...cell })));
  workingGrid[start.y][start.x].distance = 0;
  workingGrid[start.y][start.x].heuristic = heuristic(start, end);
  workingGrid[start.y][start.x].fCost = workingGrid[start.y][start.x].heuristic;

  steps.push({
    grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
    message: 'A* pathfinding started. Green is start, red is end.'
  });

  while (openSet.length > 0) {
    // Find node with lowest fCost
    let current = openSet[0];
    let currentIndex = 0;
    
    for (let i = 1; i < openSet.length; i++) {
      const currentCell = workingGrid[current.y][current.x];
      const candidateCell = workingGrid[openSet[i].y][openSet[i].x];
      if (candidateCell.fCost < currentCell.fCost) {
        current = openSet[i];
        currentIndex = i;
      }
    }

    openSet.splice(currentIndex, 1);
    closedSet.push(current);
    workingGrid[current.y][current.x].isVisited = true;

    steps.push({
      grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
      current,
      visited: [...closedSet],
      message: `Exploring node at (${current.x}, ${current.y})`
    });

    // Check if we reached the end
    if (current.x === end.x && current.y === end.y) {
      const path = reconstructPath(workingGrid, current);
      path.forEach(pos => {
        workingGrid[pos.y][pos.x].isPath = true;
      });
      
      steps.push({
        grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
        path,
        message: 'Path found! A* completed successfully.'
      });
      break;
    }

    // Check neighbors
    const neighbors = getNeighbors(workingGrid, current);
    for (const neighbor of neighbors) {
      if (closedSet.some(pos => pos.x === neighbor.x && pos.y === neighbor.y) || 
          workingGrid[neighbor.y][neighbor.x].isWall) {
        continue;
      }

      const tentativeDistance = workingGrid[current.y][current.x].distance + 1;
      
      if (!openSet.some(pos => pos.x === neighbor.x && pos.y === neighbor.y)) {
        openSet.push(neighbor);
      } else if (tentativeDistance >= workingGrid[neighbor.y][neighbor.x].distance) {
        continue;
      }

      workingGrid[neighbor.y][neighbor.x].parent = current;
      workingGrid[neighbor.y][neighbor.x].distance = tentativeDistance;
      workingGrid[neighbor.y][neighbor.x].heuristic = heuristic(neighbor, end);
      workingGrid[neighbor.y][neighbor.x].fCost = tentativeDistance + workingGrid[neighbor.y][neighbor.x].heuristic;
    }
  }

  if (openSet.length === 0) {
    steps.push({
      grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
      message: 'No path found. Target is unreachable.'
    });
  }

  return steps;
};

export const dijkstra = (grid: GridCell[][], start: Position, end: Position): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const unvisited: Position[] = [];
  const workingGrid = grid.map(row => row.map(cell => ({ ...cell })));

  // Initialize distances
  for (let y = 0; y < workingGrid.length; y++) {
    for (let x = 0; x < workingGrid[y].length; x++) {
      workingGrid[y][x].distance = Infinity;
      if (!workingGrid[y][x].isWall) {
        unvisited.push({ x, y });
      }
    }
  }
  
  workingGrid[start.y][start.x].distance = 0;

  steps.push({
    grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
    message: 'Dijkstra\'s algorithm started. Finding shortest path...'
  });

  while (unvisited.length > 0) {
    // Find unvisited node with minimum distance
    let current = unvisited[0];
    let minIndex = 0;
    
    for (let i = 1; i < unvisited.length; i++) {
      if (workingGrid[unvisited[i].y][unvisited[i].x].distance < 
          workingGrid[current.y][current.x].distance) {
        current = unvisited[i];
        minIndex = i;
      }
    }

    if (workingGrid[current.y][current.x].distance === Infinity) break;

    unvisited.splice(minIndex, 1);
    workingGrid[current.y][current.x].isVisited = true;

    steps.push({
      grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
      current,
      message: `Visiting node at (${current.x}, ${current.y}) with distance ${workingGrid[current.y][current.x].distance}`
    });

    if (current.x === end.x && current.y === end.y) {
      const path = reconstructPath(workingGrid, current);
      path.forEach(pos => {
        workingGrid[pos.y][pos.x].isPath = true;
      });
      
      steps.push({
        grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
        path,
        message: 'Shortest path found! Dijkstra completed.'
      });
      break;
    }

    const neighbors = getNeighbors(workingGrid, current);
    for (const neighbor of neighbors) {
      if (workingGrid[neighbor.y][neighbor.x].isVisited || 
          workingGrid[neighbor.y][neighbor.x].isWall) continue;

      const newDistance = workingGrid[current.y][current.x].distance + 1;
      if (newDistance < workingGrid[neighbor.y][neighbor.x].distance) {
        workingGrid[neighbor.y][neighbor.x].distance = newDistance;
        workingGrid[neighbor.y][neighbor.x].parent = current;
      }
    }
  }

  return steps;
};

export const breadthFirstSearch = (grid: GridCell[][], start: Position, end: Position): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const queue: Position[] = [start];
  const visited: Position[] = [];
  const workingGrid = grid.map(row => row.map(cell => ({ ...cell })));

  steps.push({
    grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
    message: 'BFS started. Exploring level by level...'
  });

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (visited.some(pos => pos.x === current.x && pos.y === current.y)) continue;
    
    visited.push(current);
    workingGrid[current.y][current.x].isVisited = true;

    steps.push({
      grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
      current,
      visited: [...visited],
      message: `BFS exploring (${current.x}, ${current.y})`
    });

    if (current.x === end.x && current.y === end.y) {
      const path = reconstructPath(workingGrid, current);
      path.forEach(pos => {
        workingGrid[pos.y][pos.x].isPath = true;
      });
      
      steps.push({
        grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
        path,
        message: 'Path found! BFS completed.'
      });
      break;
    }

    const neighbors = getNeighbors(workingGrid, current);
    for (const neighbor of neighbors) {
      if (!visited.some(pos => pos.x === neighbor.x && pos.y === neighbor.y) &&
          !queue.some(pos => pos.x === neighbor.x && pos.y === neighbor.y) &&
          !workingGrid[neighbor.y][neighbor.x].isWall) {
        workingGrid[neighbor.y][neighbor.x].parent = current;
        queue.push(neighbor);
      }
    }
  }

  return steps;
};

export const depthFirstSearch = (grid: GridCell[][], start: Position, end: Position): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const stack: Position[] = [start];
  const visited: Position[] = [];
  const workingGrid = grid.map(row => row.map(cell => ({ ...cell })));

  steps.push({
    grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
    message: 'DFS started. Exploring depth-first...'
  });

  while (stack.length > 0) {
    const current = stack.pop()!;
    
    if (visited.some(pos => pos.x === current.x && pos.y === current.y)) continue;
    
    visited.push(current);
    workingGrid[current.y][current.x].isVisited = true;

    steps.push({
      grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
      current,
      visited: [...visited],
      message: `DFS exploring (${current.x}, ${current.y})`
    });

    if (current.x === end.x && current.y === end.y) {
      const path = reconstructPath(workingGrid, current);
      path.forEach(pos => {
        workingGrid[pos.y][pos.x].isPath = true;
      });
      
      steps.push({
        grid: workingGrid.map(row => row.map(cell => ({ ...cell }))),
        path,
        message: 'Path found! DFS completed.'
      });
      break;
    }

    const neighbors = getNeighbors(workingGrid, current);
    for (const neighbor of neighbors.reverse()) { // Reverse for consistent DFS behavior
      if (!visited.some(pos => pos.x === neighbor.x && pos.y === neighbor.y) &&
          !workingGrid[neighbor.y][neighbor.x].isWall) {
        workingGrid[neighbor.y][neighbor.x].parent = current;
        stack.push(neighbor);
      }
    }
  }

  return steps;
};

// Helper functions
const heuristic = (a: Position, b: Position): number => {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan distance
};

const getNeighbors = (grid: GridCell[][], pos: Position): Position[] => {
  const neighbors: Position[] = [];
  const directions = [
    { x: 0, y: -1 }, // Up
    { x: 1, y: 0 },  // Right
    { x: 0, y: 1 },  // Down
    { x: -1, y: 0 }  // Left
  ];

  for (const dir of directions) {
    const newX = pos.x + dir.x;
    const newY = pos.y + dir.y;
    
    if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length) {
      neighbors.push({ x: newX, y: newY });
    }
  }

  return neighbors;
};

const reconstructPath = (grid: GridCell[][], end: Position): Position[] => {
  const path: Position[] = [];
  let current: Position | undefined = end;

  while (current) {
    path.unshift(current);
    current = grid[current.y][current.x].parent;
  }

  return path;
};