import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEpisodeById } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

function EpisodeDetailPage() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodeDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getEpisodeById(id);
        setEpisode(data);
        
        // Fetch character details (limit to first 20 for performance)
        if (data.characters && data.characters.length > 0) {
          const characterPromises = data.characters.slice(0, 20).map(url => 
            fetch(url).then(res => res.json())
          );
          const characterData = await Promise.all(characterPromises);
          setCharacters(characterData);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load episode details. Please try again later.');
        setLoading(false);
      }
    };

    fetchEpisodeDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage message={error} />
      <Link to="/episodes" className="inline-block mt-4 text-blue-400 hover:text-blue-300">
        ← Back to Episodes
      </Link>
    </div>
  );
  if (!episode) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/episodes" 
        className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 transition"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Episodes
      </Link>

      {/* Episode Detail Card */}
      <div className="bg-gray-800 rounded-lg p-8 shadow-2xl mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
              {episode.episode}
            </span>
            <h1 className="text-4xl font-bold text-white mb-2">
              {episode.name}
            </h1>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Air Date</p>
            <p className="text-white text-xl font-semibold">{episode.air_date}</p>
          </div>
        </div>

        {/* Episode Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm font-semibold mb-1">Episode Code</h3>
            <p className="text-white text-2xl font-bold">{episode.episode}</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm font-semibold mb-1">Characters</h3>
            <p className="text-white text-2xl font-bold">{episode.characters.length}</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm font-semibold mb-1">Created</h3>
            <p className="text-white text-lg">
              {new Date(episode.created).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Characters Section */}
      {characters.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-blue-400 mb-4">
            Featured Characters {episode.characters.length > 20 && `(Showing 20 of ${episode.characters.length})`}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {characters.map((character) => (
              <Link
                key={character.id}
                to={`/characters/${character.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition"
              >
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {character.name}
                  </h3>
                  <p className="text-gray-400 text-xs">{character.species}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EpisodeDetailPage;