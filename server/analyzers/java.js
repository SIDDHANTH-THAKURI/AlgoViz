import { parse } from 'java-parser';

export function analyzeJava(code) {
  const cst = parse(code);
  let maxDepth = 0;
  let depth = 0;
  let recursion = false;
  let currentMethod = null;

  const traverse = (node) => {
    if (!node || !node.name) return;

    if (node.name === 'methodDeclaration') {
      const header = node.children.methodHeader?.[0];
      const declarator = header?.children.methodDeclarator?.[0];
      currentMethod = declarator?.children.Identifier?.[0]?.image || currentMethod;
    }

    if (
      node.name === 'forStatement' ||
      node.name === 'whileStatement' ||
      node.name === 'doStatement' ||
      node.name === 'enhancedForStatement'
    ) {
      depth += 1;
      maxDepth = Math.max(maxDepth, depth);
      const body = node.children.statement?.[0];
      if (body) traverse(body);
      depth -= 1;
      return;
    }

    if (node.name === 'methodInvocation' && currentMethod) {
      const id = node.children.Identifier?.[0]?.image;
      if (id === currentMethod) recursion = true;
    }

    for (const key in node.children) {
      node.children[key].forEach((child) => traverse(child));
    }
  };

  traverse(cst);

  const complexity = recursion
    ? 'O(2^n)'
    : maxDepth === 0
    ? 'O(1)'
    : maxDepth === 1
    ? 'O(n)'
    : `O(n^${maxDepth})`;

  return { complexity, depth: maxDepth, recursion };
}
