export function analyzeCpp(code) {
  const loopMatches = code.match(/\b(for|while|do)\b/g) || [];
  const depth = loopMatches.length > 1 ? 2 : loopMatches.length;
  const complexity = depth === 0 ? 'O(1)' : depth === 1 ? 'O(n)' : `O(n^${depth})`;
  return { complexity, depth, recursion: false };
}
