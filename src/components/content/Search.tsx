import { useEffect, useState, useRef } from 'react';

interface SearchResult {
  id: string;
  url: string;
  excerpt: string;
  meta: {
    title: string;
  };
  sub_results: Array<{
    title: string;
    url: string;
    excerpt: string;
  }>;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pagefindRef = useRef<any>(null);

  // Load Pagefind
  useEffect(() => {
    const loadPagefind = async () => {
      if (typeof window !== 'undefined' && !pagefindRef.current) {
        try {
          // @ts-ignore
          const pagefind = await import('/pagefind/pagefind.js');
          pagefindRef.current = pagefind;
        } catch (error) {
          console.error('Failed to load Pagefind:', error);
        }
      }
    };
    loadPagefind();
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setResults([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search handler
  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim() || !pagefindRef.current) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const search = await pagefindRef.current.search(query);
        const resultData = await Promise.all(
          search.results.slice(0, 8).map((r: any) => r.data())
        );
        setResults(resultData);
        setSelectedIndex(0);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(performSearch, 150);
    return () => clearTimeout(debounce);
  }, [query]);

  // Keyboard navigation in results
  const handleResultsKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      window.location.href = results[selectedIndex].url;
    }
  };

  // Open search from button click
  useEffect(() => {
    const button = document.getElementById('search-button');
    if (button) {
      const handler = () => setIsOpen(true);
      button.addEventListener('click', handler);
      return () => button.removeEventListener('click', handler);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] bg-black/50 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-2xl mx-4 bg-background border border-border rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b border-border px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleResultsKeyDown}
            placeholder="Search documentation..."
            className="w-full px-4 py-4 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {isLoading && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              Searching...
            </div>
          )}

          {!isLoading && query && results.length === 0 && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <a
                  key={result.id}
                  href={result.url}
                  className={`block px-4 py-3 hover:bg-accent transition-colors ${
                    index === selectedIndex ? 'bg-accent' : ''
                  }`}
                >
                  <div className="font-medium text-foreground mb-1">
                    {result.meta.title}
                  </div>
                  <div
                    className="text-sm text-muted-foreground line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                </a>
              ))}
            </div>
          )}

          {!query && (
            <div className="px-4 py-8 text-center text-muted-foreground">
              <p className="mb-2">Search the knowledge base</p>
              <p className="text-sm">
                Try searching for topics, features, or guides
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">↑↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd>
              Close
            </span>
          </div>
          <div>Powered by Pagefind</div>
        </div>
      </div>
    </div>
  );
}
