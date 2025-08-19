import { analyzeJsTs } from './javascript.js';
import { analyzePython } from './python.js';
import { analyzeJava } from './java.js';
import { analyzeCpp } from './cpp.js';

export default async function analyze(ext, code) {
  switch (ext) {
    case 'js':
      return analyzeJsTs(code, false);
    case 'ts':
      return analyzeJsTs(code, true);
    case 'py':
      return await analyzePython(code);
    case 'java':
      return analyzeJava(code);
    case 'cpp':
    case 'cc':
    case 'cxx':
    case 'c++':
      return analyzeCpp(code);
    default:
      throw new Error('Unsupported file type');
  }
}
