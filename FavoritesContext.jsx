import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    });
    
    const [recentSearches, setRecentSearches] = useState(() => {
        const stored = localStorage.getItem('recentSearches');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    }, [recentSearches]);

    const addFavorite = (location) => {
        setFavorites(prev => {
            if (prev.find(f => f.lat === location.lat && f.lng === location.lng)) return prev;
            return [...prev, location];
        });
    };

    const removeFavorite = (lat, lng) => {
        setFavorites(prev => prev.filter(f => f.lat !== lat || f.lng !== lng));
    };

    const isFavorite = (lat, lng) => {
        return favorites.some(f => f.lat === lat && f.lng === lng);
    };

    const addRecentSearch = (location) => {
        setRecentSearches(prev => {
            const filtered = prev.filter(l => l.lat !== location.lat || l.lng !== location.lng);
            return [location, ...filtered].slice(0, 5);
        });
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            recentSearches,
            addFavorite,
            removeFavorite,
            isFavorite,
            addRecentSearch
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};
