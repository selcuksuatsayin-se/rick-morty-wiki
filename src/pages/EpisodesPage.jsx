import { useState, useEffect } from 'react';
import { getEpisodes, searchEpisodes } from '../services/api';
import EpisodeCard from '../components/ui/EpisodeCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';

function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        
        if (searchTerm) {
          data = await searchEpisodes(searchTerm);
        } else {
          data = await getEpisodes(currentPage);
        }
        
        setEpisodes(data.results);
        setPageInfo(data.info);
        setLoading(false);
      } catch (err) {
        setError('Failed to load episodes. Please try again later.');
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [currentPage, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
          Episodes
        </h1>
        <p className="text-gray-400 text-lg">
          Explore all episodes from the Rick and Morty series
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="max-w-2xl">
          <SearchBar 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search episodes by name..."
          />
        </div>
        
        {searchTerm && (
          <div className="mt-4 flex items-center justify-between">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              Search: "{searchTerm}"
            </span>
            <button
              onClick={clearSearch}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      {!loading && !error && pageInfo && (
        <div className="mb-4 text-gray-400">
          Showing {episodes.length} of {pageInfo.count} episodes
        </div>
      )}

      {/* Loading State */}
      {loading && <LoadingSpinner />}

      {/* Error State */}
      {error && (
        <div className="mb-8">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Episodes Grid */}
      {!loading && !error && (
        <>
          {episodes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {episodes.map((episode) => (
                  <EpisodeCard key={episode.id} episode={episode} />
                ))}
              </div>

              {/* Pagination */}
              {pageInfo && !searchTerm && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={pageInfo.pages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-400">
                No episodes found matching your search.
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                Clear Search
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EpisodesPage;