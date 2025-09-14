import { useState } from 'react';
import { FileUp, X } from 'lucide-react';

interface Result {
  complexity: string;
  depth: number;
  recursion: boolean;
}

export default function ComplexityAnalyzer() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append('code', file);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ complexity: 'Error', depth: 0, recursion: false });
    } finally {
      setLoading(false);
    }
  };

    return (
      <>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Open complexity analyzer"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg transition-transform hover:scale-105 focus:outline-none"
        >
          <FileUp className="h-6 w-6" />
        </button>

        {open && (
          <div className="fixed bottom-24 right-6 z-50 w-80 rounded-lg border border-gray-200 bg-white/95 p-4 text-gray-800 shadow-xl backdrop-blur">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-gray-700">Analyze Code</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 transition-colors hover:text-gray-700"
                aria-label="Close analyzer"
              >
                <X size={16} />
              </button>
            </div>

            <input
              type="file"
              accept=".py,.js,.ts,.java,.cpp,.cc,.cxx,.c++"
              onChange={handleFile}
              className="mb-3 w-full text-sm"
            />

            {loading && <p className="text-sm text-gray-600">Analyzing...</p>}

            {result && !loading && (
              <div className="rounded bg-gray-50 p-2 text-sm text-gray-700">
                <p className="font-medium">Estimated: {result.complexity}</p>
                <p>Loop depth: {result.depth}</p>
                <p>Recursion: {result.recursion ? 'Yes' : 'No'}</p>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
