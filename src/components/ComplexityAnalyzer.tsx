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
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg focus:outline-none"
      >
        <FileUp />
      </button>

      {open && (
        <div className="fixed bottom-20 right-4 w-80 bg-white rounded-lg shadow-xl p-4 text-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Analyze Code</h2>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={16} />
            </button>
          </div>

          <input
            type="file"
            accept=".py,.js,.ts,.java,.cpp,.cc,.cxx,.c++"
            onChange={handleFile}
            className="mb-3 w-full"
          />

          {loading && <p className="text-sm">Analyzing...</p>}

          {result && !loading && (
            <div className="bg-gray-100 rounded p-2 text-sm">
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
