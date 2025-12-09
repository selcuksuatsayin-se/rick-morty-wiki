import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacterById } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
        
        // Fetch episode details
        if (data.episode && data.episode.length > 0) {
          const episodePromises = data.episode.map(url => 
            fetch(url).then(res => res.json())
          );
          const episodeData = await Promise.all(episodePromises);
          setEpisodes(episodeData);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load character details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  // Status badge color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage message={error} />
      <Link to="/characters" className="inline-block mt-4 text-green-400 hover:text-green-300">
        ← Back to Characters
      </Link>
    </div>
  );
  if (!character) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/characters" 
        className="inline-flex items-center text-green-400 hover:text-green-300 mb-6 transition"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Characters
      </Link>

      {/* Character Detail Card */}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
        <div className="md:flex">
          {/* Character Image */}
          <div className="md:w-1/3">
            <img 
              src={character.image} 
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Character Information */}
          <div className="md:w-2/3 p-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-white">
                {character.name}
              </h1>
              <span className={`${getStatusColor(character.status)} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center`}>
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                {character.status}
              </span>
            </div>

            {/* Character Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-1">Species</h3>
                <p className="text-white text-lg">{character.species}</p>
              </div>
              
              {character.type && (
                <div>
                  <h3 className="text-gray-400 text-sm font-semibold mb-1">Type</h3>
                  <p className="text-white text-lg">{character.type}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-1">Gender</h3>
                <p className="text-white text-lg">{character.gender}</p>
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-1">Origin</h3>
                <p className="text-white text-lg">{character.origin.name}</p>
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-1">Last Known Location</h3>
                <p className="text-white text-lg">{character.location.name}</p>
              </div>
              
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-1">Number of Episodes</h3>
                <p className="text-white text-lg">{character.episode.length}</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300 text-sm">
                <span className="font-semibold">Created:</span> {new Date(character.created).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      {episodes.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Episodes ({episodes.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((episode) => (
              <Link
                key={episode.id}
                to={`/episodes/${episode.id}`}
                className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-semibold">{episode.name}</h3>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                    {episode.episode}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{episode.air_date}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterDetailPage;