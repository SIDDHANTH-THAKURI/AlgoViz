import { motion } from 'framer-motion';
import type { TreeNode } from '../types';

interface TreeVisualizerProps {
  tree: TreeNode | null;
  highlightedNodes?: number[];
}

interface PositionedNode extends TreeNode {
  x: number;
  y: number;
}

const TreeVisualizer = ({ tree, highlightedNodes = [] }: TreeVisualizerProps) => {
  console.log('TreeVisualizer rendering with:', { tree: tree?.value, highlightedNodes });

  if (!tree) {
    return (
      <div className="glass-card p-8">
        <div className="text-center text-gray-500">
          <div className="text-6xl mb-4">🌳</div>
          <p className="text-lg">Tree is empty</p>
          <p className="text-sm">Add some nodes to see the visualization</p>
        </div>
      </div>
    );
  }

  // Safe deep copy function that handles null values
  const deepCopyTree = (node: TreeNode | null): TreeNode | null => {
    if (!node) return null;
    return {
      value: node.value,
      id: node.id,
      left: deepCopyTree(node.left || null),
      right: deepCopyTree(node.right || null),
      x: node.x,
      y: node.y,
      highlighted: node.highlighted
    };
  };

  // Calculate positions for nodes with better spacing
  const calculatePositions = (node: TreeNode | null, x: number, y: number, spacing: number): void => {
    if (!node) return;
    
    (node as any).x = x;
    (node as any).y = y;
    
    if (node.left) {
      calculatePositions(node.left, x - spacing, y + 80, Math.max(spacing * 0.7, 40));
    }
    if (node.right) {
      calculatePositions(node.right, x + spacing, y + 80, Math.max(spacing * 0.7, 40));
    }
  };

  // Create a safe copy and calculate positions
  const treeCopy = deepCopyTree(tree);
  if (treeCopy) {
    calculatePositions(treeCopy, 400, 70, 120); // Start more centered with wider spacing
  }

  // Collect all nodes for rendering
  const collectNodes = (node: TreeNode | null): PositionedNode[] => {
    if (!node) return [];
    const positionedNode = node as PositionedNode;
    return [
      positionedNode, 
      ...collectNodes(node.left || null), 
      ...collectNodes(node.right || null)
    ];
  };

  // Collect all edges for rendering
  const collectEdges = (node: TreeNode | null): Array<{from: PositionedNode, to: PositionedNode}> => {
    if (!node) return [];
    const edges: Array<{from: PositionedNode, to: PositionedNode}> = [];
    const positionedNode = node as PositionedNode;
    
    if (node.left) {
      edges.push({ from: positionedNode, to: node.left as PositionedNode });
      edges.push(...collectEdges(node.left));
    }
    if (node.right) {
      edges.push({ from: positionedNode, to: node.right as PositionedNode });
      edges.push(...collectEdges(node.right));
    }
    
    return edges;
  };

  const nodes = treeCopy ? collectNodes(treeCopy) : [];
  const edges = treeCopy ? collectEdges(treeCopy) : [];

  console.log('Rendering tree with nodes:', nodes.length, 'edges:', edges.length);

  const NODE_COLORS = {
    normal: 'bg-gradient-to-r from-blue-500 to-purple-600',
    highlight: 'bg-gradient-to-r from-yellow-400 to-orange-500'
  } as const;

  return (
    <div className="glass-card p-6">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold mb-2">Binary Search Tree</h3>
        <p className="text-sm opacity-80">Nodes: {nodes.length} | Highlighted: {highlightedNodes.length}</p>
      </div>

      <div className="canvas-card backdrop-blur-md tree-surface overflow-hidden mx-auto w-full max-w-[800px]" style={{ height: '500px' }}>
        {/* SVG for edges */}
        <svg width="100%" height="100%" className="absolute inset-0" style={{ zIndex: 1 }}>
          {edges.map((edge, index) => (
            <motion.line
              key={`edge-${edge.from.id}-${edge.to.id}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              x1={edge.from.x}
              y1={edge.from.y + 25}
              x2={edge.to.x}
              y2={edge.to.y + 25}
              stroke="#4B5563"
              strokeWidth="3"
              className="drop-shadow-sm"
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const isHighlighted = highlightedNodes.includes(parseInt(node.id)) || highlightedNodes.includes(node.id as any);

          return (
            <motion.div
              key={`node-${node.id}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHighlighted ? 1.3 : 1,
                opacity: 1
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
              className={`tree-node ${isHighlighted ? 'highlight' : ''}`}
              style={{
                position: 'absolute',
                left: node.x - 25,
                top: node.y - 25,
                zIndex: 2,
                background: isHighlighted
                  ? 'linear-gradient(to right, #facc15, #fb923c)'
                  : 'linear-gradient(to right, #3b82f6, #8b5cf6)'
              }}
            >
              {node.value}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 glass-card p-4">
        <div className="flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 ${NODE_COLORS.normal} rounded-full`}></div>
            <span className="font-medium">Normal Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-5 h-5 ${NODE_COLORS.highlight} rounded-full`}></div>
            <span className="font-medium">Active/Highlighted</span>
          </div>
        </div>
        <div className="mt-3 text-center">
          <div className="text-xs opacity-80">
            Tree Structure: {nodes.length} nodes total
          </div>
          {highlightedNodes.length > 0 && (
            <div className="text-xs font-medium mt-1" style={{ color: '#f59e0b' }}>
              Currently highlighting: {highlightedNodes.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;