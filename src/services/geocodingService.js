const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export const searchCities = async (name, count = 8) => {
    const params = new URLSearchParams({
        name,
        count,
        language: 'en',
        format: 'json'
    });
    
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch geocoding data');
    }
    const data = await response.json();
    if (!data.results) return [];
    
    return data.results.map(city => ({
        name: city.name,
        country: city.country,
        admin1: city.admin1,
        latitude: city.latitude,
        longitude: city.longitude,
        country_code: city.country_code
    }));
};
