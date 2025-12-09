import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCharacters, getEpisodes, getLocations } from '../services/api';

function HomePage() {
  const [stats, setStats] = useState({
    characters: 0,
    episodes: 0,
    locations: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats from API
    const fetchStats = async () => {
      try {
        const [charactersData, episodesData, locationsData] = await Promise.all([
          getCharacters(1),
          getEpisodes(1),
          getLocations(1)
        ]);

        setStats({
          characters: charactersData.info.count,
          episodes: episodesData.info.count,
          locations: locationsData.info.count
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-green-400 mb-4">
          Welcome to the Rick and Morty Wiki
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Explore the multiverse! Discover characters, episodes, and locations from the 
          interdimensional adventures of Rick Sanchez and his grandson Morty Smith.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 text-center transform hover:scale-105 transition">
          <div className="text-5xl font-bold text-green-400 mb-2">
            {loading ? '...' : stats.characters}
          </div>
          <div className="text-xl text-gray-300">Characters</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center transform hover:scale-105 transition">
          <div className="text-5xl font-bold text-blue-400 mb-2">
            {loading ? '...' : stats.episodes}
          </div>
          <div className="text-xl text-gray-300">Episodes</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 text-center transform hover:scale-105 transition">
          <div className="text-5xl font-bold text-purple-400 mb-2">
            {loading ? '...' : stats.locations}
          </div>
          <div className="text-xl text-gray-300">Locations</div>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Characters Card */}
        <Link 
          to="/characters" 
          className="bg-linear-to-br from-green-600 to-green-800 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">👨‍🔬</div>
            <h2 className="text-2xl font-bold mb-3">Characters</h2>
            <p className="text-gray-200">
              Browse through all the characters from across the multiverse, from Rick and Morty to the countless variants and aliens.
            </p>
          </div>
        </Link>

        {/* Episodes Card */}
        <Link 
          to="/episodes" 
          className="bg-linear-to-br from-blue-600 to-blue-800 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-2xl font-bold mb-3">Episodes</h2>
            <p className="text-gray-200">
              Explore every episode from all seasons, complete with air dates, episode codes, and character appearances.
            </p>
          </div>
        </Link>

        {/* Locations Card */}
        <Link 
          to="/locations" 
          className="bg-linear-to-br from-purple-600 to-purple-800 rounded-lg p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🌍</div>
            <h2 className="text-2xl font-bold mb-3">Locations</h2>
            <p className="text-gray-200">
              Discover the vast array of dimensions, planets, and locations visited throughout the series.
            </p>
          </div>
        </Link>
      </div>

      {/* About Section */}
      <div className="bg-gray-800 rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-green-400 mb-4">About This Wiki</h2>
        <p className="text-gray-300 mb-4">
          This wiki is powered by the Rick and Morty API, providing comprehensive information about 
          the animated series created by Justin Roiland and Dan Harmon. The show follows the misadventures 
          of cynical mad scientist Rick Sanchez and his good-hearted but fretful grandson Morty Smith.
        </p>
        <p className="text-gray-300">
          Use the navigation above to explore different sections, search for your favorite characters, 
          filter by various attributes, and dive deep into the details of this beloved series.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-green-400 mb-3">🔍 Search & Filter</h3>
          <p className="text-gray-300">
            Find characters by name, filter by status (alive, dead, unknown), species, and more.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-400 mb-3">📖 Detailed Information</h3>
          <p className="text-gray-300">
            View comprehensive details including character origins, episode appearances, and location data.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-purple-400 mb-3">🎨 Responsive Design</h3>
          <p className="text-gray-300">
            Enjoy a seamless experience across all devices with our mobile-friendly interface.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">⚡ Real-time Data</h3>
          <p className="text-gray-300">
            All data is fetched directly from the official API, ensuring accuracy and up-to-date information.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;