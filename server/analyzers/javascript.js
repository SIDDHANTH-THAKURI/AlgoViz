import { parse } from '@babel/parser';

export function analyzeJsTs(code, isTs = false) {
  const ast = parse(code, {
    sourceType: 'module',
    plugins: isTs ? ['typescript'] : []
  });

  let maxDepth = 0;
  let recursion = false;
  const funcStack = [];

  const traverse = (node, depth = 0) => {
    if (!node || typeof node !== 'object') return;

    switch (node.type) {
      case 'FunctionDeclaration':
      case 'FunctionExpression':
      case 'ArrowFunctionExpression':
        const name = node.id && node.id.name ? node.id.name : funcStack[funcStack.length - 1];
        funcStack.push(name);
        traverse(node.body, depth);
        funcStack.pop();
        return;
      case 'CallExpression':
        if (
          node.callee.type === 'Identifier' &&
          funcStack.length > 0 &&
          node.callee.name === funcStack[funcStack.length - 1]
        ) {
          recursion = true;
        }
        break;
      case 'ForStatement':
      case 'WhileStatement':
      case 'DoWhileStatement':
      case 'ForOfStatement':
      case 'ForInStatement':
        depth += 1;
        if (depth > maxDepth) maxDepth = depth;
        traverse(node.body, depth);
        return;
      default:
        break;
    }

    for (const key of Object.keys(node)) {
      const child = node[key];
      if (Array.isArray(child)) {
        child.forEach((c) => traverse(c, depth));
      } else if (child && typeof child === 'object') {
        traverse(child, depth);
      }
    }
  };

  traverse(ast.program);

  const complexity = recursion
    ? 'O(2^n)'
    : maxDepth === 0
    ? 'O(1)'
    : maxDepth === 1
    ? 'O(n)'
    : `O(n^${maxDepth})`;

  return { complexity, depth: maxDepth, recursion };
}
