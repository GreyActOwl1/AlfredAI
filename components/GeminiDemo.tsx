'use client'
import { useState, FormEvent } from 'react';

async function run(prompt: string) {
  const response = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate content');
  }

  return data.text;
}

const GeminiDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePost = async () => {
    setLoading(true);
    setError(null);

    try {
      const fullPrompt = `${prompt}`;
      const generatedText = await run(fullPrompt);
      setResult(generatedText);
    } catch (error) {
      console.error('Error:', error);
      setError((error as Error).message);
      setResult('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gemini Integration</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleGeneratePost(); }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="border p-2 mb-4 w-full"
          placeholder="Enter your prompt"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-4 border rounded bg-red-100 text-red-600">
          {error}
        </div>
      )}
      {result && (
        <div className="mt-4 p-4 border rounded bg">
          <pre className="whitespace-pre-wrap break-words max-w-full">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default GeminiDemo;