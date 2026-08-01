const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchCurrentWeather = async (lat, lng) => {
    return fetchForecast(lat, lng, 1);
};

export const fetchForecast = async (lat, lng, days = 7) => {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lng,
        hourly: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,visibility,uv_index,surface_pressure',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max',
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,surface_pressure,visibility,is_day',
        timezone: 'auto',
        forecast_days: days
    });
    
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return response.json();
};
