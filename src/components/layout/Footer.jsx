function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p>© {currentYear} Rick and Morty Wiki. All rights reserved.</p>
            <p className="mt-1">
              Data provided by{' '}
              <a 
                href="https://rickandmortyapi.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 transition"
              >
                The Rick and Morty API
              </a>
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://rickandmortyapi.com/documentation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              API Docs
            </a>
            <span className="text-gray-600">|</span>
            <a 
              href="https://www.adultswim.com/videos/rick-and-morty" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
            >
              Watch Episodes
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;