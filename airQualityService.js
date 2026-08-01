const BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

export const fetchAirQuality = async (lat, lng) => {
    const params = new URLSearchParams({
        latitude: lat,
        longitude: lng,
        hourly: 'pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi',
        current: 'pm2_5,pm10,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi',
        timezone: 'auto'
    });
    
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch air quality data');
    }
    return response.json();
};

export const getAQILevel = (aqi) => {
    if (aqi <= 50) return { level: 'Good', color: 'green', description: 'Air quality is considered satisfactory.', healthImplication: 'None' };
    if (aqi <= 100) return { level: 'Moderate', color: 'yellow', description: 'Air quality is acceptable.', healthImplication: 'Unusually sensitive people should consider limiting prolonged outdoor exertion.' };
    if (aqi <= 150) return { level: 'Unhealthy for Sensitive Groups', color: 'orange', description: 'Members of sensitive groups may experience health effects.', healthImplication: 'Children, active adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.' };
    if (aqi <= 200) return { level: 'Unhealthy', color: 'red', description: 'Everyone may begin to experience health effects.', healthImplication: 'Active children and adults, and people with respiratory disease, such as asthma, should avoid prolonged outdoor exertion; everyone else, especially children, should limit prolonged outdoor exertion.' };
    if (aqi <= 300) return { level: 'Very Unhealthy', color: 'purple', description: 'Health warnings of emergency conditions.', healthImplication: 'Active children and adults, and people with respiratory disease, such as asthma, should avoid all outdoor exertion; everyone else, especially children, should limit outdoor exertion.' };
    return { level: 'Hazardous', color: 'maroon', description: 'Health alert: everyone may experience more serious health effects.', healthImplication: 'Everyone should avoid all outdoor exertion.' };
};
