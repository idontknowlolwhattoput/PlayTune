// MainContent.jsx
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  FaSearch, FaStar, FaGamepad, FaTimes, 
  FaChevronLeft, FaChevronRight, FaPlay, 
  FaWindows, FaApple, FaLinux, FaPlaystation, FaXbox
} from 'react-icons/fa';

// RAWG API configuration
const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

export default function MainContent() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreGames, setGenreGames] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  const rowRefs = useRef({});
  const heroInterval = useRef(null);

  useEffect(() => {
    fetchAllData();
    return () => {
      if (heroInterval.current) {
        clearInterval(heroInterval.current);
      }
    };
  }, []);

  // Start auto-rotation when featuredGames changes
  useEffect(() => {
    if (featuredGames.length > 0) {
      startHeroRotation();
    }
    return () => {
      if (heroInterval.current) {
        clearInterval(heroInterval.current);
      }
    };
  }, [featuredGames]);

  const startHeroRotation = () => {
    if (heroInterval.current) {
      clearInterval(heroInterval.current);
    }
    heroInterval.current = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % featuredGames.length);
    }, 6000);
  };

  const handleHeroDotClick = (index) => {
    setCurrentHeroIndex(index);
    // Reset interval on manual click
    if (heroInterval.current) {
      clearInterval(heroInterval.current);
      startHeroRotation();
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch featured games for hero
      const featuredResponse = await axios.get(`${BASE_URL}/games`, {
        params: {
          key: RAWG_API_KEY,
          page_size: 5,
          ordering: '-rating',
          metacritic: '85,100'
        }
      });
      setFeaturedGames(featuredResponse.data.results);

      // Fetch genres
      const genresResponse = await axios.get(`${BASE_URL}/genres`, {
        params: {
          key: RAWG_API_KEY,
          page_size: 8
        }
      });
      setGenres(genresResponse.data.results);

      // Fetch games for each genre
      const genreGamesData = {};
      for (const genre of genresResponse.data.results.slice(0, 6)) {
        const gamesResponse = await axios.get(`${BASE_URL}/games`, {
          params: {
            key: RAWG_API_KEY,
            genres: genre.id,
            page_size: 15,
            ordering: '-rating'
          }
        });
        genreGamesData[genre.id] = gamesResponse.data.results;
      }
      setGenreGames(genreGamesData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollRow = (genreId, direction) => {
    const container = rowRefs.current[genreId];
    if (container) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const openGameDetails = (game) => {
    setSelectedGame(game);
    setShowModal(true);
  };

  // Platform icons mapping
  const getPlatformIcon = (platform) => {
    if (platform.includes('PC')) return <FaWindows className="text-xs" />;
    if (platform.includes('macOS')) return <FaApple className="text-xs" />;
    if (platform.includes('Linux')) return <FaLinux className="text-xs" />;
    if (platform.includes('PlayStation')) return <FaPlaystation className="text-xs" />;
    if (platform.includes('Xbox')) return <FaXbox className="text-xs" />;
    return null;
  };

  if (loading) {
    return (
      <div className="w-full h-full bg-[#0a0a0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9f7aea]"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0a0a0f] overflow-y-auto overflow-x-hidden font-['Inter',sans-serif]">
      
      {/* Hero Section - Fixed height, no overlapping */}
      <div className="relative w-full h-[500px] flex-shrink-0">
        {featuredGames.map((game, index) => (
          <div
            key={game.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent"></div>
            </div>

            {/* Hero Content */}
            <div className="absolute bottom-16 left-16 max-w-2xl z-10">
              <h1 className="text-4xl font-light text-white mb-2 tracking-tight">
                {game.name}
              </h1>

              <div className="flex items-center gap-4 text-sm mb-3">
                <span className="flex items-center gap-1 text-[#9f7aea] font-medium">
                  <FaStar className="text-[#9f7aea]" /> {game.rating.toFixed(1)}/5
                </span>
                <span className="text-gray-400 font-light">{new Date(game.released).getFullYear()}</span>
                <span className="text-gray-400 font-light">
                  {game.genres?.slice(0, 2).map(g => g.name).join(' • ')}
                </span>
              </div>

              <p className="text-gray-300 text-sm font-light mb-4 line-clamp-2 max-w-xl">
                {game.description_raw?.substring(0, 150)}...
              </p>

              <button 
                onClick={() => openGameDetails(game)}
                className="flex items-center gap-2 bg-[#9f7aea] hover:bg-[#b794f4] text-white px-5 py-2 rounded-md font-medium text-sm transition-all"
              >
                <FaPlay className="text-xs" /> View Details
              </button>
            </div>
          </div>
        ))}

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-6 left-16 flex gap-1.5 z-10">
          {featuredGames.map((_, index) => (
            <button
              key={index}
              onClick={() => handleHeroDotClick(index)}
              className={`h-1 transition-all ${
                index === currentHeroIndex 
                  ? 'w-8 bg-[#9f7aea]' 
                  : 'w-4 bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Genre Rows - Proper spacing from hero */}
      <div className="pt-6 pb-16">
        {genres.slice(0, 6).map((genre) => (
          <div key={genre.id} className="mb-8 group/row">
            {/* Genre Header */}
            <div className="flex items-center justify-between px-6 mb-2">
              <h2 className="text-lg font-medium text-white tracking-wide">
                {genre.name} <span className="text-gray-500 text-xs ml-2 font-light">({genre.games_count})</span>
              </h2>
              <span className="text-xs text-gray-500 hover:text-[#9f7aea] transition-colors cursor-pointer uppercase tracking-wider">
                View All
              </span>
            </div>

            {/* Game Row */}
            <div className="relative px-6">
              {/* Scroll Buttons */}
              <button
                onClick={() => scrollRow(genre.id, 'left')}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-[#1a1a2e] hover:bg-[#2d1b4e] text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-lg"
              >
                <FaChevronLeft className="text-xs" />
              </button>

              {/* Games Container */}
              <div
                ref={el => rowRefs.current[genre.id] = el}
                className="flex gap-2 overflow-x-auto scrollbar-hide py-1 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {genreGames[genre.id]?.map((game) => (
                  <div
                    key={game.id}
                    onClick={() => openGameDetails(game)}
                    className="flex-none w-[140px] cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  >
                    {/* Game Card */}
                    <div className="relative rounded-md overflow-hidden bg-[#1a1a2e]">
                      <div className="aspect-[2/3] w-full relative">
                        {game.background_image ? (
                          <img
                            src={game.background_image}
                            alt={game.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#2d1b4e] to-[#1a1a2e] flex items-center justify-center">
                            <FaGamepad className="text-white/20 text-3xl" />
                          </div>
                        )}

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-70"></div>

                        {/* Rating Badge */}
                        <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                          <FaStar className="text-[#9f7aea] text-[8px]" />
                          <span className="text-white text-[9px] font-medium">{game.rating.toFixed(1)}</span>
                        </div>

                        {/* Game Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-1.5">
                          <h3 className="text-white text-[11px] font-medium leading-tight mb-1 line-clamp-2 drop-shadow-lg">
                            {game.name}
                          </h3>
                          
                          <div className="flex items-center gap-1 text-[8px] text-gray-300">
                            <span className="bg-black/40 px-1 py-0.5 rounded">
                              {new Date(game.released)?.getFullYear() || 'TBA'}
                            </span>
                            
                            {game.parent_platforms && game.parent_platforms.length > 0 && (
                              <span className="flex items-center gap-0.5 bg-black/40 px-1 py-0.5 rounded">
                                {game.parent_platforms.slice(0, 2).map(p => (
                                  <span key={p.platform.id}>
                                    {getPlatformIcon(p.platform.name)}
                                  </span>
                                ))}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Scroll Button */}
              <button
                onClick={() => scrollRow(genre.id, 'right')}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-[#1a1a2e] hover:bg-[#2d1b4e] text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all shadow-lg"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Game Details Modal */}
      {showModal && selectedGame && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-[#0f0f14] rounded-lg border border-[#2a2a35]">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-[#2a2a35] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#9f7aea] transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>

            <div className="relative h-[250px] w-full">
              <img
                src={selectedGame.background_image || 'https://via.placeholder.com/1200x400/1a1a2e/9f7aea?text=No+Image'}
                alt={selectedGame.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-light text-white mb-1">{selectedGame.name}</h2>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-[#9f7aea]" /> {selectedGame.rating.toFixed(1)}
                  </span>
                  <span>•</span>
                  <span>{new Date(selectedGame.released).getFullYear()}</span>
                  <span>•</span>
                  <span>{selectedGame.genres?.slice(0, 2).map(g => g.name).join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-[#9f7aea] mb-2 uppercase tracking-wider">About</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  {selectedGame.description_raw || 'No description available.'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-[#9f7aea] mb-3 uppercase tracking-wider">System Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a24] rounded-lg p-4">
                    <h4 className="text-xs font-medium text-white mb-3">Minimum</h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex gap-2">
                        <span className="text-gray-500 w-16">OS:</span>
                        <span className="text-gray-300">Windows 10</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500 w-16">CPU:</span>
                        <span className="text-gray-300">Intel Core i5</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500 w-16">RAM:</span>
                        <span className="text-gray-300">8 GB</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500 w-16">GPU:</span>
                        <span className="text-gray-300">GTX 780</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#1a1a24] rounded-lg p-4">
                    <h4 className="text-xs font-medium text-white mb-3">Recommended</h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex gap-2">
                        <span className="text-gray-500 w-16">OS:</span>
                        <span className="text-gray-300">Windows 11</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500 w-16">CPU:</span>
                        <span className="text-gray-300">Intel Core i7</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500 w-16">RAM:</span>
                        <span className="text-gray-300">16 GB</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-gray-500 w-16">GPU:</span>
                        <span className="text-gray-300">GTX 1060</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}