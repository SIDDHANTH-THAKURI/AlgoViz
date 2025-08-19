import { motion } from 'framer-motion';
import type { GridCell, Position } from '../types';

interface GridVisualizerProps {
  grid: GridCell[][];
  onCellClick?: (position: Position) => void;
  isInteractive?: boolean;
}

const GridVisualizer = ({ grid, onCellClick, isInteractive = false }: GridVisualizerProps) => {
  console.log('GridVisualizer rendering with grid size:', grid?.length, 'x', grid?.[0]?.length);
  console.log('Sample cells:', grid?.slice(0, 2)?.map(row => row.slice(0, 3)));

  const getCellColor = (cell: GridCell): string => {
    if (cell.isStart) return 'bg-green-500';
    if (cell.isEnd) return 'bg-red-500';
    if (cell.isPath) return 'bg-yellow-400';
    if (cell.isWall) return 'bg-gray-800';
    if (cell.isVisited) return 'bg-blue-200';
    return 'bg-white';
  };

  const getCellBorder = (cell: GridCell): string => {
    if (cell.isStart || cell.isEnd) return 'border-2 border-gray-700';
    if (cell.isPath) return 'border-2 border-yellow-600';
    if (cell.isWall) return 'border border-gray-600';
    if (cell.isVisited) return 'border border-blue-300';
    return 'border border-gray-300';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col items-center">
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 glass-card p-2">
            <div className="w-4 h-4 bg-green-500 border border-gray-700"></div>
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2 glass-card p-2">
            <div className="w-4 h-4 bg-red-500 border border-gray-700"></div>
            <span>End</span>
          </div>
          <div className="flex items-center gap-2 glass-card p-2">
            <div className="w-4 h-4 bg-gray-800 border border-gray-600"></div>
            <span>Wall</span>
          </div>
          <div className="flex items-center gap-2 glass-card p-2">
            <div className="w-4 h-4 bg-blue-200 border border-blue-300"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2 glass-card p-2">
            <div className="w-4 h-4 bg-yellow-400 border border-yellow-600"></div>
            <span>Path</span>
          </div>
        </div>

        <div
          className="grid-surface mb-6 select-none grid-board"
          style={{ display: 'grid', gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 1fr)` }}
        >
          {grid.map((row, y) =>
            row.map((cell, x) => (
              <motion.div
                key={`${x}-${y}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.2,
                  delay: (x + y) * 0.01,
                  type: "spring",
                  stiffness: 300
                }}
                className={`
                  cell cursor-pointer transition-all duration-200 hover:scale-110
                  ${getCellColor(cell)} ${getCellBorder(cell)}
                  ${isInteractive ? 'hover:shadow-md' : ''}
                `}
                onClick={() => isInteractive && onCellClick?.({ x, y })}
                title={`(${x}, ${y}) ${cell.isWall ? '- Wall' : ''} ${cell.distance !== Infinity ? `- Distance: ${cell.distance}` : ''}`}
              />
            ))
          )}
        </div>

        {isInteractive && (
          <div className="mt-4 text-sm opacity-80 text-center">
            <p>Click cells to toggle walls</p>
            <p>Green = Start, Red = End</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridVisualizer;