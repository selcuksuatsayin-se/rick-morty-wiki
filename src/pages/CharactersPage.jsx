import { useState, useEffect } from 'react';
import { getCharacters, searchCharacters, filterCharacters } from '../services/api';
import CharacterCard from '../components/ui/CharacterCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  // Fetch characters with filters
  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let data;
        
        // Build filter parameters
        const params = { page: currentPage };
        if (searchTerm) params.name = searchTerm;
        if (statusFilter) params.status = statusFilter;
        if (genderFilter) params.gender = genderFilter;
        
        // Check if we have any filters
        if (searchTerm || statusFilter || genderFilter) {
          data = await filterCharacters(params);
        } else {
          data = await getCharacters(currentPage);
        }
        
        setCharacters(data.results);
        setPageInfo(data.info);
        setLoading(false);
      } catch (err) {
        setError('Failed to load characters. Please try again later.');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, searchTerm, statusFilter, genderFilter]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to page 1 when searching
  };

  // Handle filter changes
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value);
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setGenderFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
          Characters
        </h1>
        <p className="text-gray-400 text-lg">
          Browse all characters from the Rick and Morty universe
        </p>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <SearchBar 
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search characters by name..."
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={handleStatusChange}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Status</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Gender
            </label>
            <select
              value={genderFilter}
              onChange={handleGenderChange}
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        {/* Active Filters Display and Clear Button */}
        {(searchTerm || statusFilter || genderFilter) && (
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  Search: "{searchTerm}"
                </span>
              )}
              {statusFilter && (
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  Status: {statusFilter}
                </span>
              )}
              {genderFilter && (
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  Gender: {genderFilter}
                </span>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      {!loading && !error && pageInfo && (
        <div className="mb-4 text-gray-400">
          Showing {characters.length} of {pageInfo.count} characters
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

      {/* Characters Grid */}
      {!loading && !error && (
        <>
          {characters.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))}
              </div>

              {/* Pagination */}
              {pageInfo && (
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
                No characters found matching your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CharactersPage;