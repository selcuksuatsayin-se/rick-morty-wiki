import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLocationById } from '../services/api';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

function LocationDetailPage() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getLocationById(id);
        setLocation(data);
        
        // Fetch resident details (limit to first 20 for performance)
        if (data.residents && data.residents.length > 0) {
          const residentPromises = data.residents.slice(0, 20).map(url => 
            fetch(url).then(res => res.json())
          );
          const residentData = await Promise.all(residentPromises);
          setResidents(residentData);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load location details. Please try again later.');
        setLoading(false);
      }
    };

    fetchLocationDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage message={error} />
      <Link to="/locations" className="inline-block mt-4 text-purple-400 hover:text-purple-300">
        ← Back to Locations
      </Link>
    </div>
  );
  if (!location) return null;

  // Get icon based on type
  const getLocationIcon = (type) => {
    if (type.toLowerCase().includes('planet')) return '🪐';
    if (type.toLowerCase().includes('dimension')) return '🌌';
    if (type.toLowerCase().includes('space')) return '🚀';
    if (type.toLowerCase().includes('cluster')) return '⭐';
    return '🌍';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/locations" 
        className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-6 transition"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Locations
      </Link>

      {/* Location Detail Card */}
      <div className="bg-linear-to-br from-purple-600 to-purple-900 rounded-lg p-8 shadow-2xl mb-8">
        <div className="flex items-start mb-6">
          <div className="text-7xl mr-6">
            {getLocationIcon(location.type)}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {location.name}
            </h1>
            
            {/* Location Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
                <h3 className="text-purple-200 text-sm font-semibold mb-1">Type</h3>
                <p className="text-white text-xl font-bold">{location.type}</p>
              </div>
              
              <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
                <h3 className="text-purple-200 text-sm font-semibold mb-1">Dimension</h3>
                <p className="text-white text-xl font-bold">{location.dimension}</p>
              </div>
              
              <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
                <h3 className="text-purple-200 text-sm font-semibold mb-1">Residents</h3>
                <p className="text-white text-xl font-bold">{location.residents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-purple-800 bg-opacity-30 rounded-lg p-4 mt-4">
          <p className="text-purple-100 text-sm">
            <span className="font-semibold">Created:</span> {new Date(location.created).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Residents Section */}
      {residents.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-purple-400 mb-4">
            Residents {location.residents.length > 20 && `(Showing 20 of ${location.residents.length})`}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {residents.map((resident) => (
              <Link
                key={resident.id}
                to={`/characters/${resident.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition"
              >
                <img 
                  src={resident.image} 
                  alt={resident.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-white font-semibold text-sm truncate">
                    {resident.name}
                  </h3>
                  <p className="text-gray-400 text-xs">{resident.species}</p>
                  {/* Status badge */}
                  <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                    resident.status.toLowerCase() === 'alive' ? 'bg-green-600' :
                    resident.status.toLowerCase() === 'dead' ? 'bg-red-600' : 'bg-gray-600'
                  }`}>
                    {resident.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No Residents Message */}
      {location.residents.length === 0 && (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400 text-lg">
            No known residents at this location.
          </p>
        </div>
      )}
    </div>
  );
}

export default LocationDetailPage;