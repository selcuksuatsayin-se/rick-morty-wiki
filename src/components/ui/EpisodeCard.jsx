import { Link } from 'react-router-dom';

function EpisodeCard({ episode }) {
  return (
    <Link 
      to={`/episodes/${episode.id}`}
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
    >
      {/* Episode Code Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          {episode.episode}
        </span>
        <span className="text-gray-400 text-sm">
          {episode.air_date}
        </span>
      </div>

      {/* Episode Title */}
      <h3 className="text-xl font-bold text-white mb-3">
        {episode.name}
      </h3>

      {/* Episode Info */}
      <div className="space-y-2 text-gray-400 text-sm">
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Air Date: {episode.air_date}
        </p>
        <p className="flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {episode.characters.length} Characters
        </p>
      </div>

      {/* View Details Link */}
      <div className="mt-4 text-blue-400 hover:text-blue-300 flex items-center text-sm font-semibold">
        View Details
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

export default EpisodeCard;