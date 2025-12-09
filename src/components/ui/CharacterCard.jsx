import { Link } from 'react-router-dom';

function CharacterCard({ character }) {
  // Status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Link 
      to={`/characters/${character.id}`}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
    >
      {/* Character Image */}
      <div className="relative">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-64 object-cover"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`${getStatusColor(character.status)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center`}>
            <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
            {character.status}
          </span>
        </div>
      </div>

      {/* Character Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 truncate">
          {character.name}
        </h3>
        
        <div className="space-y-1 text-gray-400 text-sm">
          <p>
            <span className="font-semibold text-gray-300">Species:</span> {character.species}
          </p>
          {character.type && (
            <p>
              <span className="font-semibold text-gray-300">Type:</span> {character.type}
            </p>
          )}
          <p>
            <span className="font-semibold text-gray-300">Gender:</span> {character.gender}
          </p>
          <p className="truncate">
            <span className="font-semibold text-gray-300">Origin:</span> {character.origin.name}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default CharacterCard;