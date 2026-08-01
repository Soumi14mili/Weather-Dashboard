import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useWeatherContext } from '../context/WeatherContext';
import { useTheme } from '../context/ThemeContext';
import PageWrapper from '../components/layout/PageWrapper';
import Skeleton from '../components/common/Skeleton';
import WeatherIcon from '../components/common/WeatherIcon';
import SearchBar from '../components/common/SearchBar';

// Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to dynamically update map center
function MapUpdater({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 10, { duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

export default function MapPage() {
  const { location, weatherData, airQualityData, loading } = useWeatherContext();
  const { isDark } = useTheme();
  
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default London

  useEffect(() => {
    if (location && location.lat && location.lon) {
      setMapCenter([location.lat, location.lon]);
    }
  }, [location]);

  if (loading && !weatherData) {
    return (
      <PageWrapper>
        <Skeleton className="w-full h-[calc(100vh-120px)] rounded-2xl" />
      </PageWrapper>
    );
  }

  const tileUrl = isDark 
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  return (
    <div className="relative w-full h-[calc(100vh-80px)] md:h-[calc(100vh-40px)] rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[400] w-[90%] max-w-md">
        <SearchBar />
      </div>

      <MapContainer center={mapCenter} zoom={10} className="w-full h-full" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={tileUrl}
        />
        <MapUpdater center={mapCenter} />
        
        {location && weatherData && (
          <Marker position={[location.lat, location.lon]}>
            <Popup className="weather-popup">
              <div className="text-center p-1">
                <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <WeatherIcon code={weatherData.current.weather_code} size={32} />
                  <span className="text-2xl font-bold">{Math.round(weatherData.current.temp)}°</span>
                </div>
                <p className="text-sm capitalize">{weatherData.current.condition}</p>
                {airQualityData && (
                  <div className="mt-2 text-xs py-1 px-2 bg-slate-100 rounded-full inline-block">
                    AQI: <span className="font-bold">{airQualityData.aqi}</span> ({airQualityData.level})
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
