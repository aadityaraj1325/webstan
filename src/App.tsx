import React, { useState } from 'react';
import { Code2, Send, Sparkles, CheckCircle, XCircle } from 'lucide-react';

interface Suggestion {
  type: 'improvement' | 'warning' | 'error';
  message: string;
  line?: number;
}

function App() {
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const analyzeMockSuggestions = () => {
    setIsAnalyzing(true);
    // Simulated API call delay
    setTimeout(() => {
      const mockSuggestions: Suggestion[] = [
        {
          type: 'improvement',
          message: 'Consider using const instead of let for variables that are not reassigned',
          line: 3
        },
        {
          type: 'warning',
          message: 'This function could benefit from TypeScript type annotations',
          line: 5
        },
        {
          type: 'error',
          message: 'Potential memory leak: useEffect cleanup function missing',
          line: 12
        }
      ];
      setSuggestions(mockSuggestions);
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center space-x-2">
          <Code2 className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">AI Code Review Assistant</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Code Input Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Your Code</h2>
              <button
                onClick={analyzeMockSuggestions}
                disabled={isAnalyzing || !code}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
                  isAnalyzing || !code 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <Send className="h-4 w-4" />
                <span>{isAnalyzing ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-[500px] p-4 font-mono text-sm border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Suggestions Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900">AI Suggestions</h2>
            </div>
            
            {isAnalyzing ? (
              <div className="flex items-center justify-center h-[500px]">
                <div className="animate-pulse text-gray-500">Analyzing your code...</div>
              </div>
            ) : suggestions.length > 0 ? (
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-md ${
                      suggestion.type === 'improvement'
                        ? 'bg-green-50 border border-green-200'
                        : suggestion.type === 'warning'
                        ? 'bg-yellow-50 border border-yellow-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {suggestion.type === 'improvement' ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      ) : suggestion.type === 'warning' ? (
                        <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      )}
                      <div>
                        <p className={`text-sm ${
                          suggestion.type === 'improvement'
                            ? 'text-green-700'
                            : suggestion.type === 'warning'
                            ? 'text-yellow-700'
                            : 'text-red-700'
                        }`}>
                          {suggestion.message}
                        </p>
                        {suggestion.line && (
                          <p className="text-xs text-gray-500 mt-1">
                            Line: {suggestion.line}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                <Code2 className="h-12 w-12 mb-4" />
                <p>Paste your code and click Analyze to get suggestions</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;