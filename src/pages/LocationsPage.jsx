import { useState, useEffect } from 'react';
import { getLocations, searchLocations } from '../services/api';
import LocationCard from '../components/ui/LocationCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';

function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        
        if (searchTerm) {
          data = await searchLocations(searchTerm);
        } else {
          data = await getLocations(currentPage);
        }
        
        setLocations(data.results);
        setPageInfo(data.info);
        setLoading(false);
      } catch (err) {
        setError('Failed to load locations. Please try again later.');
        setLoading(false);
      }
    };

    fetchLocations();
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
        <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
          Locations
        </h1>
        <p className="text-gray-400 text-lg">
          Discover dimensions, planets, and locations from the multiverse
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="max-w-2xl">
          <SearchBar 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search locations by name..."
          />
        </div>
        
        {searchTerm && (
          <div className="mt-4 flex items-center justify-between">
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
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
          Showing {locations.length} of {pageInfo.count} locations
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

      {/* Locations Grid */}
      {!loading && !error && (
        <>
          {locations.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {locations.map((location) => (
                  <LocationCard key={location.id} location={location} />
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
                No locations found matching your search.
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition"
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

export default LocationsPage;