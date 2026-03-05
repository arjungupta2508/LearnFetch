import { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { ResourceCard } from '../components/ResourceCard';
import { ResourceCardSkeleton } from '../components/ResourceCardSkeleton';
import { QuickStats } from '../components/QuickStats';
import { searchYouTube } from '../services/youtubeApi';
import { searchArxiv } from '../services/arxivApi';
import { searchWikipedia } from '../services/wikipediaApi';
import { searchOpenLibrary } from '../services/openLibraryApi';
import { aggregateResources, mockTopics } from '../data/mockResources';
import { Resource } from '../types/resource';
import { logSearchHistory } from '../utils/storage';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Info, AlertCircle } from 'lucide-react';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all',
    sortBy: 'relevance',
    topicId: 0,
  });
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (hasSearched) performSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    setError('');

    try {
      const [youtubeResults, arxivResults, wikiResults, olResults] =
        await Promise.allSettled([
          searchYouTube(searchQuery, 9),
          searchArxiv(searchQuery, 6),
          searchWikipedia(searchQuery, 6),
          searchOpenLibrary(searchQuery, 6),
        ]);

      let results: Resource[] = [
        ...(youtubeResults.status === 'fulfilled' ? youtubeResults.value : []),
        ...(arxivResults.status  === 'fulfilled' ? arxivResults.value  : []),
        ...(wikiResults.status   === 'fulfilled' ? wikiResults.value   : []),
        ...(olResults.status     === 'fulfilled' ? olResults.value     : []),
      ];

      if (results.length === 0) {
        results = aggregateResources(searchQuery, filters);
      }

      if (filters.type !== 'all') {
        results = results.filter((r) => r.type === filters.type);
      }

      if (filters.category !== 'all') {
        results = results.filter((r) => r.category === filters.category);
      }

      if (filters.topicId !== 0) {
        results = results.filter((r) => r.topic_id === filters.topicId);
      }

      if (filters.sortBy === 'recent') {
        results.sort((a, b) =>
          new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
        );
      } else if (filters.sortBy === 'popular') {
        results.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
      }

      setResources(results);

      if (filters.topicId !== 0) {
        logSearchHistory(filters.topicId).catch(console.error);
      } else {
        const matchedTopic = mockTopics.find(
          t => t.topic_name.toLowerCase() === searchQuery.toLowerCase()
        );
        if (matchedTopic) {
          logSearchHistory(matchedTopic.topic_id).catch(console.error);
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Some sources failed to load. Showing available results.');
      setResources(aggregateResources(searchQuery, filters));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setHasSearched(true);
    performSearch(searchQuery);
  };

  const handleFilterChange = (filterName: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-6 py-16 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-sm">
        <div className="inline-block">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
            🚀 Your Learning Hub
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Find Learning Resources in One Place
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Search across YouTube videos, research PDFs, Wikipedia articles, and free books simultaneously.
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          {[
            { label: '🎬 YouTube',      color: 'bg-red-100 text-red-700' },
            { label: '📄 arXiv PDFs',   color: 'bg-blue-100 text-blue-700' },
            { label: '📝 Wikipedia',    color: 'bg-gray-100 text-gray-700' },
            { label: '📚 Open Library', color: 'bg-green-100 text-green-700' },
          ].map((s) => (
            <span key={s.label} className={`px-3 py-1 rounded-full text-sm font-semibold ${s.color}`}>
              {s.label}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <SearchBar onSearch={handleSearch} initialQuery={query} />
      </div>

      {!hasSearched && <QuickStats />}

      {!hasSearched && (
        <Alert className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <Info className="size-4 text-indigo-600" />
          <AlertTitle className="text-indigo-900">Welcome to LearnFetch</AlertTitle>
          <AlertDescription className="text-indigo-700">
            Search once — get results from YouTube, arXiv, Wikipedia, and Open Library all at once.
          </AlertDescription>
        </Alert>
      )}

      {hasSearched && (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {loading ? 'Searching across all sources…' : `${resources.length} Resources Found`}
              </h2>
            </div>

            {/* Topic filter pills */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => handleFilterChange('topicId', 0)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                  filters.topicId === 0
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                }`}
              >
                All Topics
              </button>
              {mockTopics.map((topic) => (
                <button
                  key={topic.topic_id}
                  onClick={() => handleFilterChange('topicId', topic.topic_id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors ${
                    filters.topicId === topic.topic_id
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400'
                  }`}
                >
                  {topic.topic_name}
                </button>
              ))}
            </div>

            <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="size-4 text-red-600" />
              <AlertTitle className="text-red-900">Notice</AlertTitle>
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <ResourceCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && resources.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}

          {!loading && resources.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">
                No resources found. Try a different search term.
              </p>
            </div>
          )}
        </>
      )}

      {!hasSearched && (
        <div className="space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Programming', gradient: 'from-blue-500 to-cyan-500',     emoji: '💻' },
              { name: 'Design',      gradient: 'from-pink-500 to-rose-500',     emoji: '🎨' },
              { name: 'Business',    gradient: 'from-green-500 to-emerald-500', emoji: '💼' },
              { name: 'Science',     gradient: 'from-purple-500 to-indigo-500', emoji: '🔬' },
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => handleSearch(category.name)}
                className={`p-6 border-2 border-transparent rounded-2xl bg-gradient-to-br ${category.gradient} text-white hover:shadow-xl hover:scale-105 transition-all duration-300 text-center group`}
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{category.emoji}</div>
                <p className="font-semibold text-lg">{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}