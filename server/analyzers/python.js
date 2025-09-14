import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function analyzePython(code) {
  return new Promise((resolve, reject) => {
    const py = spawn('python', [path.join(__dirname, 'python_analyzer.py')]);
    let out = '';
    let err = '';
    py.stdout.on('data', (d) => (out += d.toString()));
    py.stderr.on('data', (d) => (err += d.toString()));
    py.on('close', () => {
      if (err) {
        reject(new Error(err));
      } else {
        try {
          resolve(JSON.parse(out));
        } catch (e) {
          reject(e);
        }
      }
    });
    py.stdin.write(code);
    py.stdin.end();
  });
}
