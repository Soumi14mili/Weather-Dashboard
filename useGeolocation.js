import { useState, useCallback } from 'react';

export function useGeolocation() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCurrentPosition = useCallback(() => {
        setLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLoading(false);
            },
            (err) => {
                setError(err.message || 'Failed to get location');
                setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    }, []);

    return { ...location, loading, error, getCurrentPosition };
}
