import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2 } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { searchCities } from '../../services/geocodingService';
import { useWeatherContext } from '../../context/WeatherContext';
import { useFavorites } from '../../context/FavoritesContext';

const SearchBar = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);
  
  const debouncedQuery = useDebounce(query, 500);
  const { setLocation } = useWeatherContext();
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchCities = async () => {
      if (!debouncedQuery) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const data = await searchCities(debouncedQuery);
        setResults(data || []);
      } catch (error) {
        console.error("Error searching cities", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCities();
  }, [debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    const lat = city.latitude || city.lat;
    const lon = city.longitude || city.lng || city.lon;
    setLocation({
      lat,
      lng: lon,
      lon,
      name: city.name,
      country: city.country,
    });
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative w-full max-w-md z-50 ${className}`}>
      <div className="relative flex items-center w-full h-10 rounded-full focus-within:shadow-lg backdrop-blur-md bg-white/20 dark:bg-gray-800/40 border border-white/30 dark:border-gray-600/50 overflow-hidden">
        <div className="grid place-items-center h-full w-10 text-gray-500 dark:text-gray-300">
          <Search className="w-4 h-4" />
        </div>
        <input
          className="peer h-full w-full outline-none text-sm text-gray-700 dark:text-gray-200 bg-transparent pr-2"
          type="text"
          id="search"
          placeholder="Search city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setResults([]); }}
            className="grid place-items-center h-full w-10 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (query || favorites?.length > 0) && (
        <div className="absolute mt-2 w-full backdrop-blur-xl bg-white/40 dark:bg-gray-800/70 border border-white/30 dark:border-gray-600/50 rounded-xl shadow-xl overflow-hidden">
          {isLoading ? (
            <div className="p-4 flex justify-center items-center text-gray-600 dark:text-gray-300">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Searching...
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto py-1">
              {results.map((city) => (
                <li 
                  key={`${city.latitude}-${city.longitude}`}
                  onClick={() => handleSelect(city)}
                  className="px-4 py-3 hover:bg-white/40 dark:hover:bg-gray-700/60 cursor-pointer flex items-center transition-colors"
                >
                  <MapPin className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">
                      {city.name} {city.country_code ? `(${city.country_code})` : ''}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {city.admin1}{city.admin1 && city.country ? ', ' : ''}{city.country}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : query ? (
            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found for "{query}"
            </div>
          ) : (
            <div className="py-2">
              <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Recent / Favorites
              </div>
              <ul>
                {favorites?.map((fav, i) => (
                  <li 
                    key={i}
                    onClick={() => handleSelect(fav)}
                    className="px-4 py-2 hover:bg-white/40 dark:hover:bg-gray-700/60 cursor-pointer flex items-center transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-teal-500 mr-3" />
                    <span className="text-sm text-gray-800 dark:text-gray-100">{fav.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
