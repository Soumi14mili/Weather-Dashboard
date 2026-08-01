export const formatTemp = (celsius) => `${Math.round(celsius)}°C`;
export const formatWind = (kmh) => `${Math.round(kmh)} km/h`;
export const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};
export const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
};
export const formatVisibility = (meters) => `${(meters / 1000).toFixed(1)} km`;
export const formatPressure = (hPa) => `${Math.round(hPa)} hPa`;
export const formatPercentage = (value) => `${Math.round(value)}%`;
export const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(degrees / 45) % 8];
};
