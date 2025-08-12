import { motion } from 'framer-motion';
import type { TreeNode } from '../types';

interface TreeVisualizerProps {
  tree: TreeNode | null;
  highlightedNodes?: number[];
}

const TreeVisualizer = ({ tree, highlightedNodes = [] }: TreeVisualizerProps) => {
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

  // Calculate positions for nodes
  const calculatePositions = (node: TreeNode | null, x: number, y: number, spacing: number): void => {
    if (!node) return;
    
    node.x = x;
    node.y = y;
    
    if (node.left) {
      calculatePositions(node.left, x - spacing, y + 80, spacing / 2);
    }
    if (node.right) {
      calculatePositions(node.right, x + spacing, y + 80, spacing / 2);
    }
  };

  // Create a copy to avoid mutating the original
  const treeCopy = JSON.parse(JSON.stringify(tree));
  calculatePositions(treeCopy, 300, 50, 120);

  // Collect all nodes for rendering
  const collectNodes = (node: TreeNode | null): TreeNode[] => {
    if (!node) return [];
    return [node, ...collectNodes(node.left || null), ...collectNodes(node.right || null)];
  };

  // Collect all edges for rendering
  const collectEdges = (node: TreeNode | null): Array<{from: TreeNode, to: TreeNode}> => {
    if (!node) return [];
    const edges: Array<{from: TreeNode, to: TreeNode}> = [];
    
    if (node.left) {
      edges.push({ from: node, to: node.left });
      edges.push(...collectEdges(node.left));
    }
    if (node.right) {
      edges.push({ from: node, to: node.right });
      edges.push(...collectEdges(node.right));
    }
    
    return edges;
  };

  const nodes = collectNodes(treeCopy);
  const edges = collectEdges(treeCopy);

  return (
    <div className="glass-card p-6">
      <div className="relative bg-gray-50 rounded-lg" style={{ height: '400px', width: '600px', margin: '0 auto' }}>
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Render edges */}
          {edges.map((edge, index) => (
            <motion.line
              key={`edge-${index}`}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              x1={edge.from.x}
              y1={edge.from.y! + 20}
              x2={edge.to.x}
              y2={edge.to.y! + 20}
              stroke="#6B7280"
              strokeWidth="2"
              className="drop-shadow-sm"
            />
          ))}
        </svg>

        {/* Render nodes */}
        {nodes.map((node, index) => {
          const isHighlighted = highlightedNodes.includes(parseInt(node.id));
          
          return (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 300
              }}
              className={`
                absolute w-10 h-10 rounded-full flex items-center justify-center
                font-bold text-white text-sm shadow-lg transform -translate-x-5 -translate-y-5
                transition-all duration-300
                ${isHighlighted 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-125 shadow-xl ring-4 ring-yellow-300' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110'
                }
              `}
              style={{
                left: node.x,
                top: node.y
              }}
            >
              {node.value}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <span>Normal Node</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
            <span>Highlighted Node</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualizer;