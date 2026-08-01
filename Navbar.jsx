import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Heart } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import { useTheme } from '../../context/ThemeContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useWeatherContext } from '../../context/WeatherContext';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { location } = useWeatherContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Forecast', path: '/forecast' },
    { name: 'Air Quality', path: '/air-quality' },
    { name: 'Health', path: '/health' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Map', path: '/map' },
  ];

  useKeyboardShortcuts([
    {
      key: 'k',
      ctrlKey: true,
      action: () => {
        const searchInput = document.getElementById('search');
        if (searchInput) searchInput.focus();
      }
    },
    {
      key: 'd',
      ctrlKey: true,
      action: toggleTheme
    },
    {
      key: 'f',
      ctrlKey: true,
      action: () => setIsFavoritesOpen(prev => !prev)
    }
  ]);

  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/10 dark:bg-gray-900/50 border-b border-white/20 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              WeatherPulse
            </NavLink>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <SearchBar />
              <div className="absolute right-10 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block opacity-50 group-focus-within:hidden">
                <span className="text-xs border border-gray-300 dark:border-gray-600 rounded px-1.5 py-0.5">⌘K</span>
              </div>
            </div>
            <div className="flex space-x-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-white/20 dark:bg-gray-800/40 text-blue-600 dark:text-teal-400' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800/20'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <div className="relative">
              <button 
                onClick={() => setIsFavoritesOpen(!isFavoritesOpen)}
                className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {isFavoritesOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl backdrop-blur-xl bg-white/30 dark:bg-gray-800/50 border border-white/20 shadow-lg py-1"
                  >
                    {favorites?.length > 0 ? (
                      favorites.map((fav, i) => (
                        <div key={i} className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700/50 cursor-pointer">
                          {fav.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">No favorites yet</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/40 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/40"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden border-t border-white/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="mb-4 px-2">
                <SearchBar />
              </div>
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive 
                        ? 'bg-white/20 dark:bg-gray-800/40 text-blue-600 dark:text-teal-400' 
                        : 'text-gray-700 dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-800/20'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-gray-700 dark:text-gray-200 font-medium">Theme</span>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-gray-800/40">
                  {theme === 'dark' ? <Sun className="w-5 h-5 text-gray-200" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
