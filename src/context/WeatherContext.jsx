import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchForecast } from '../services/weatherService';
import { fetchAirQuality, getAQILevel } from '../services/airQualityService';
import { getWeatherInfo } from '../utils/weatherCodes';

const WeatherContext = createContext();

export const useWeatherContext = () => useContext(WeatherContext);

// Transform raw Open-Meteo weather data into a friendly format
function transformWeatherData(raw) {
  if (!raw) return null;

  const { current, hourly, daily } = raw;
  const currentHourIndex = new Date().getHours();

  const weatherInfo = getWeatherInfo(current.weather_code, current.is_day);

  const transformedCurrent = {
    temp: current.temperature_2m,
    weather_code: current.weather_code,
    is_day: current.is_day,
    condition: weatherInfo.description,
    humidity: current.relative_humidity_2m,
    wind_speed: current.wind_speed_10m,
    wind_dir: current.wind_direction_10m,
    pressure: current.pressure_msl,
    uv: hourly?.uv_index?.[currentHourIndex] ?? 0,
    visibility: current.visibility,
    precip_prob: hourly?.precipitation_probability?.[currentHourIndex] ?? 0,
    sunrise: daily?.sunrise?.[0] || '',
    sunset: daily?.sunset?.[0] || '',
    last_updated: new Date().toISOString(),
  };

  // Transform hourly data into array of objects (next 48 hours)
  const transformedHourly = (hourly?.time || []).map((time, i) => ({
    time,
    temp: hourly.temperature_2m[i],
    humidity: hourly.relative_humidity_2m[i],
    precip_prob: hourly.precipitation_probability[i],
    weather_code: hourly.weather_code[i],
    wind_speed: hourly.wind_speed_10m[i],
    wind_dir: hourly.wind_direction_10m[i],
    pressure: hourly.pressure_msl[i],
    visibility: hourly.visibility[i],
    uv: hourly.uv_index[i],
    is_day: (new Date(time).getHours() >= 6 && new Date(time).getHours() < 20) ? 1 : 0,
  }));

  // Transform daily data into array of objects
  const transformedDaily = (daily?.time || []).map((date, i) => {
    const dayWeatherInfo = getWeatherInfo(daily.weather_code[i], 1);
    return {
      date,
      weather_code: daily.weather_code[i],
      condition: dayWeatherInfo.description,
      temp_max: daily.temperature_2m_max[i],
      temp_min: daily.temperature_2m_min[i],
      apparent_max: daily.apparent_temperature_max[i],
      apparent_min: daily.apparent_temperature_min[i],
      sunrise: daily.sunrise[i],
      sunset: daily.sunset[i],
      precip_prob: daily.precipitation_probability_max[i],
      wind_speed: daily.wind_speed_10m_max[i],
      wind_dir: daily.wind_direction_10m_dominant[i],
      uv_max: daily.uv_index_max[i],
    };
  });

  return {
    current: transformedCurrent,
    hourly: transformedHourly,
    daily: transformedDaily,
  };
}

// Transform raw Open-Meteo air quality data into a friendly format
function transformAirQualityData(raw) {
  if (!raw) return null;

  const { current, hourly } = raw;
  const aqi = current.us_aqi ?? 0;
  const aqiInfo = getAQILevel(aqi);

  const pollutants = {
    'PM2.5': { value: current.pm2_5 ?? 0, unit: 'μg/m³', max: 75 },
    'PM10': { value: current.pm10 ?? 0, unit: 'μg/m³', max: 150 },
    'CO': { value: Math.round((current.carbon_monoxide ?? 0) / 100) / 10, unit: 'mg/m³', max: 10 },
    'NO₂': { value: current.nitrogen_dioxide ?? 0, unit: 'μg/m³', max: 200 },
    'SO₂': { value: current.sulphur_dioxide ?? 0, unit: 'μg/m³', max: 350 },
    'O₃': { value: current.ozone ?? 0, unit: 'μg/m³', max: 180 },
  };

  // Build 24-hour AQI history
  const history = (hourly?.time || []).slice(0, 24).map((time, i) => ({
    time,
    aqi: hourly.us_aqi?.[i] ?? 0,
  }));

  return {
    aqi,
    level: aqiInfo.level,
    description: aqiInfo.description,
    healthImplication: aqiInfo.healthImplication,
    color: aqiInfo.color,
    pollutants,
    history,
  };
}

export const WeatherProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = useCallback(async (lat, lng) => {
    setLoading(true);
    setError(null);
    try {
      const [rawWeather, rawAqi] = await Promise.all([
        fetchForecast(lat, lng),
        fetchAirQuality(lat, lng),
      ]);

      setWeatherData(transformWeatherData(rawWeather));
      setAirQualityData(transformAirQualityData(rawAqi));
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    if (location) {
      fetchWeatherData(location.lat, location.lng || location.lon);
    }
  }, [location, fetchWeatherData]);

  useEffect(() => {
    if (location) {
      fetchWeatherData(location.lat, location.lng || location.lon);
    }
  }, [location, fetchWeatherData]);

  return (
    <WeatherContext.Provider value={{
      location,
      setLocation,
      weatherData,
      forecastData: weatherData,
      airQualityData,
      loading,
      error,
      fetchWeatherData,
      refreshData,
    }}>
      {children}
    </WeatherContext.Provider>
  );
};
