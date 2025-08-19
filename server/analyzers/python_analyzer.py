import ast
import json
import sys

code = sys.stdin.read()

class Analyzer(ast.NodeVisitor):
    def __init__(self):
        self.depth = 0
        self.max_depth = 0
        self.recursion = False
        self.func_stack = []

    def visit_FunctionDef(self, node):
        self.func_stack.append(node.name)
        self.generic_visit(node)
        self.func_stack.pop()

    def visit_For(self, node):
        self.depth += 1
        self.max_depth = max(self.max_depth, self.depth)
        self.generic_visit(node)
        self.depth -= 1

    def visit_While(self, node):
        self.depth += 1
        self.max_depth = max(self.max_depth, self.depth)
        self.generic_visit(node)
        self.depth -= 1

    def visit_Call(self, node):
        if isinstance(node.func, ast.Name) and self.func_stack and node.func.id == self.func_stack[-1]:
            self.recursion = True
        self.generic_visit(node)

analyzer = Analyzer()
analyzer.visit(ast.parse(code))

complexity = (
    'O(2^n)' if analyzer.recursion else
    'O(1)' if analyzer.max_depth == 0 else
    'O(n)' if analyzer.max_depth == 1 else
    f'O(n^{analyzer.max_depth})'
)

print(json.dumps({
    'complexity': complexity,
    'depth': analyzer.max_depth,
    'recursion': analyzer.recursion
}))
