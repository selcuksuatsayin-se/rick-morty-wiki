import { Link } from 'react-router-dom';

function LocationCard({ location }) {
  // Get a color based on dimension type
  const getDimensionColor = (type) => {
    const colors = [
      'from-purple-600 to-purple-800',
      'from-blue-600 to-blue-800',
      'from-green-600 to-green-800',
      'from-pink-600 to-pink-800',
      'from-indigo-600 to-indigo-800',
      'from-teal-600 to-teal-800',
    ];
    // Simple hash to get consistent color for same type
    const hash = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Link 
      to={`/locations/${location.id}`}
      className={`bg-linear-to-br ${getDimensionColor(location.type)} rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300`}
    >
      {/* Location Icon */}
      <div className="text-5xl mb-4">
        {location.type.toLowerCase().includes('planet') ? '🪐' : 
         location.type.toLowerCase().includes('dimension') ? '🌌' : 
         location.type.toLowerCase().includes('space') ? '🚀' : '🌍'}
      </div>

      {/* Location Name */}
      <h3 className="text-2xl font-bold text-white mb-3">
        {location.name}
      </h3>

      {/* Location Details */}
      <div className="space-y-2 text-gray-100">
        <p className="flex items-center text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <span className="font-semibold">Type:</span>&nbsp;{location.type}
        </p>
        
        <p className="flex items-center text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span className="font-semibold">Dimension:</span>&nbsp;{location.dimension}
        </p>
        
        <p className="flex items-center text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold">Residents:</span>&nbsp;{location.residents.length}
        </p>
      </div>

      {/* View Details Arrow */}
      <div className="mt-4 flex items-center text-white font-semibold">
        View Details
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default LocationCard;