import type { AlgorithmStep, TreeAlgorithm, TreeNode } from '../types';

export const runTreeAlgorithm = async (
  algorithm: TreeAlgorithm,
  tree: TreeNode | null,
  value?: number
): Promise<AlgorithmStep[]> => {
  switch (algorithm) {
    case 'bst-insert':
      return value !== undefined ? bstInsert(tree, value) : [];
    case 'bst-search':
      return value !== undefined ? bstSearch(tree, value) : [];
    case 'bst-delete':
      return value !== undefined ? bstDelete(tree, value) : [];
    case 'tree-traversal':
      return treeTraversal(tree);
    default:
      return [];
  }
};

export const bstInsert = (root: TreeNode | null, value: number): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  let newRoot = root;

  if (!root) {
    newRoot = createNode(value, 'root');
    steps.push({
      tree: newRoot,
      highlightedNodes: [parseInt(newRoot.id)],
      message: `Created root node with value ${value}`
    });
    return steps;
  }

  const insertHelper = (node: TreeNode, value: number, path: string = ''): TreeNode => {
    steps.push({
      tree: newRoot,
      highlightedNodes: [parseInt(node.id)],
      message: `Comparing ${value} with ${node.value} at ${path || 'root'}`
    });

    if (value < node.value) {
      if (!node.left) {
        node.left = createNode(value, `${node.id}-L`);
        steps.push({
          tree: newRoot,
          highlightedNodes: [parseInt(node.left.id)],
          message: `Inserted ${value} as left child of ${node.value}`
        });
      } else {
        insertHelper(node.left, value, `${path}-L`);
      }
    } else if (value > node.value) {
      if (!node.right) {
        node.right = createNode(value, `${node.id}-R`);
        steps.push({
          tree: newRoot,
          highlightedNodes: [parseInt(node.right.id)],
          message: `Inserted ${value} as right child of ${node.value}`
        });
      } else {
        insertHelper(node.right, value, `${path}-R`);
      }
    } else {
      steps.push({
        tree: newRoot,
        highlightedNodes: [parseInt(node.id)],
        message: `Value ${value} already exists in the tree`
      });
    }
    return node;
  };

  if (newRoot) {
    insertHelper(newRoot, value);
  }
  
  steps.push({
    tree: newRoot,
    message: `BST insertion completed. Tree now contains ${value}`
  });

  return steps;
};

export const bstSearch = (root: TreeNode | null, value: number): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];

  if (!root) {
    steps.push({
      tree: null,
      message: `Tree is empty. Cannot search for ${value}`
    });
    return steps;
  }

  const searchHelper = (node: TreeNode | null, value: number, path: string = 'root'): boolean => {
    if (!node) {
      steps.push({
        tree: root,
        message: `Reached null node. ${value} not found in the tree`
      });
      return false;
    }

    steps.push({
      tree: root,
      highlightedNodes: [parseInt(node.id)],
      message: `Searching for ${value}. Currently at ${node.value} (${path})`
    });

    if (value === node.value) {
      steps.push({
        tree: root,
        highlightedNodes: [parseInt(node.id)],
        message: `Found ${value}! Search completed successfully`
      });
      return true;
    }

    if (value < node.value) {
      steps.push({
        tree: root,
        highlightedNodes: [parseInt(node.id)],
        message: `${value} < ${node.value}. Going left...`
      });
      return searchHelper(node.left || null, value, `${path}-L`);
    } else {
      steps.push({
        tree: root,
        highlightedNodes: [parseInt(node.id)],
        message: `${value} > ${node.value}. Going right...`
      });
      return searchHelper(node.right || null, value, `${path}-R`);
    }
  };

  searchHelper(root, value);
  return steps;
};

export const bstDelete = (root: TreeNode | null, value: number): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];

  if (!root) {
    steps.push({
      tree: null,
      message: `Tree is empty. Cannot delete ${value}`
    });
    return steps;
  }

  let newRoot = { ...root };

  const deleteHelper = (node: TreeNode | null, value: number): TreeNode | null => {
    if (!node) {
      steps.push({
        tree: newRoot,
        message: `${value} not found in the tree`
      });
      return null;
    }

    steps.push({
      tree: newRoot,
      highlightedNodes: [parseInt(node.id)],
      message: `Looking for ${value}. Currently at ${node.value}`
    });

    if (value < node.value) {
      node.left = deleteHelper(node.left || null, value);
    } else if (value > node.value) {
      node.right = deleteHelper(node.right || null, value);
    } else {
      // Node to delete found
      steps.push({
        tree: newRoot,
        highlightedNodes: [parseInt(node.id)],
        message: `Found ${value}. Preparing to delete...`
      });

      // Case 1: No children
      if (!node.left && !node.right) {
        steps.push({
          tree: newRoot,
          message: `${value} is a leaf node. Simply removing it.`
        });
        return null;
      }

      // Case 2: One child
      if (!node.left) {
        steps.push({
          tree: newRoot,
          message: `${value} has only right child. Replacing with right subtree.`
        });
        return node.right || null;
      }
      if (!node.right) {
        steps.push({
          tree: newRoot,
          message: `${value} has only left child. Replacing with left subtree.`
        });
        return node.left;
      }

      // Case 3: Two children
      steps.push({
        tree: newRoot,
        highlightedNodes: [parseInt(node.id)],
        message: `${value} has two children. Finding inorder successor...`
      });

      const successor = findMin(node.right);
      steps.push({
        tree: newRoot,
        highlightedNodes: [parseInt(successor.id)],
        message: `Inorder successor is ${successor.value}. Replacing ${value} with ${successor.value}`
      });

      node.value = successor.value;
      node.right = deleteHelper(node.right, successor.value);
    }

    return node;
  };

  newRoot = deleteHelper(newRoot, value) || createNode(0, 'empty');
  
  steps.push({
    tree: newRoot,
    message: `BST deletion completed.`
  });

  return steps;
};

export const treeTraversal = (root: TreeNode | null): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];

  if (!root) {
    steps.push({
      tree: null,
      message: 'Tree is empty. No traversal possible.'
    });
    return steps;
  }

  // Inorder traversal
  const inorderResult: number[] = [];
  const inorderTraversal = (node: TreeNode | null) => {
    if (!node) return;

    inorderTraversal(node.left || null);
    
    steps.push({
      tree: root,
      highlightedNodes: [parseInt(node.id)],
      message: `Inorder: Visiting ${node.value}`
    });
    inorderResult.push(node.value);
    
    inorderTraversal(node.right || null);
  };

  steps.push({
    tree: root,
    message: 'Starting inorder traversal (Left → Root → Right)'
  });

  inorderTraversal(root);

  steps.push({
    tree: root,
    message: `Inorder traversal completed: [${inorderResult.join(', ')}]`
  });

  return steps;
};

// Helper functions
const createNode = (value: number, id: string): TreeNode => ({
  value,
  id,
  left: null,
  right: null
});

const findMin = (node: TreeNode): TreeNode => {
  while (node.left) {
    node = node.left;
  }
  return node;
};