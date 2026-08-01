export const getWeatherInfo = (code, isDay = 1) => {
    const codes = {
        0: { description: 'Clear sky', icon: isDay ? 'sun' : 'moon', gradient: 'bg-gradient-to-br from-blue-400 to-blue-600' },
        1: { description: 'Mainly clear', icon: isDay ? 'cloud-sun' : 'cloud-moon', gradient: 'bg-gradient-to-br from-blue-300 to-blue-500' },
        2: { description: 'Partly cloudy', icon: isDay ? 'cloud-sun' : 'cloud-moon', gradient: 'bg-gradient-to-br from-gray-300 to-blue-400' },
        3: { description: 'Overcast', icon: 'cloud', gradient: 'bg-gradient-to-br from-gray-400 to-gray-600' },
        45: { description: 'Fog', icon: 'cloud-fog', gradient: 'bg-gradient-to-br from-gray-300 to-gray-500' },
        48: { description: 'Depositing rime fog', icon: 'cloud-fog', gradient: 'bg-gradient-to-br from-gray-300 to-gray-500' },
        51: { description: 'Light drizzle', icon: 'cloud-drizzle', gradient: 'bg-gradient-to-br from-gray-400 to-blue-400' },
        53: { description: 'Moderate drizzle', icon: 'cloud-drizzle', gradient: 'bg-gradient-to-br from-gray-400 to-blue-500' },
        55: { description: 'Dense drizzle', icon: 'cloud-drizzle', gradient: 'bg-gradient-to-br from-gray-500 to-blue-600' },
        56: { description: 'Light freezing drizzle', icon: 'cloud-snow', gradient: 'bg-gradient-to-br from-blue-200 to-gray-400' },
        57: { description: 'Dense freezing drizzle', icon: 'cloud-snow', gradient: 'bg-gradient-to-br from-blue-300 to-gray-500' },
        61: { description: 'Slight rain', icon: 'cloud-rain', gradient: 'bg-gradient-to-br from-gray-500 to-blue-500' },
        63: { description: 'Moderate rain', icon: 'cloud-rain', gradient: 'bg-gradient-to-br from-gray-600 to-blue-600' },
        65: { description: 'Heavy rain', icon: 'cloud-rain', gradient: 'bg-gradient-to-br from-gray-700 to-blue-700' },
        66: { description: 'Light freezing rain', icon: 'cloud-snow', gradient: 'bg-gradient-to-br from-gray-400 to-blue-300' },
        67: { description: 'Heavy freezing rain', icon: 'cloud-snow', gradient: 'bg-gradient-to-br from-gray-500 to-blue-400' },
        71: { description: 'Slight snow fall', icon: 'snowflake', gradient: 'bg-gradient-to-br from-blue-100 to-blue-300' },
        73: { description: 'Moderate snow fall', icon: 'snowflake', gradient: 'bg-gradient-to-br from-blue-200 to-blue-400' },
        75: { description: 'Heavy snow fall', icon: 'snowflake', gradient: 'bg-gradient-to-br from-blue-300 to-blue-500' },
        77: { description: 'Snow grains', icon: 'snowflake', gradient: 'bg-gradient-to-br from-blue-100 to-blue-200' },
        80: { description: 'Slight rain showers', icon: 'cloud-rain', gradient: 'bg-gradient-to-br from-gray-400 to-blue-500' },
        81: { description: 'Moderate rain showers', icon: 'cloud-rain', gradient: 'bg-gradient-to-br from-gray-500 to-blue-600' },
        82: { description: 'Violent rain showers', icon: 'cloud-lightning', gradient: 'bg-gradient-to-br from-gray-600 to-blue-700' },
        85: { description: 'Slight snow showers', icon: 'cloud-snow', gradient: 'bg-gradient-to-br from-blue-200 to-gray-400' },
        86: { description: 'Heavy snow showers', icon: 'cloud-snow', gradient: 'bg-gradient-to-br from-blue-300 to-gray-500' },
        95: { description: 'Thunderstorm', icon: 'cloud-lightning', gradient: 'bg-gradient-to-br from-gray-700 to-purple-700' },
        96: { description: 'Thunderstorm with slight hail', icon: 'cloud-lightning', gradient: 'bg-gradient-to-br from-gray-700 to-purple-800' },
        99: { description: 'Thunderstorm with heavy hail', icon: 'cloud-lightning', gradient: 'bg-gradient-to-br from-gray-800 to-purple-900' }
    };
    
    return codes[code] || { description: 'Unknown', icon: 'help-circle', gradient: 'bg-gray-500' };
};
