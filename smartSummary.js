import { getWeatherInfo } from './weatherCodes';

export const generateSummary = (weatherData, aqiData) => {
    if (!weatherData?.current || !aqiData?.current) return 'Data unavailable for summary.';
    
    const temp = weatherData.current.temperature_2m;
    const isDay = weatherData.current.is_day;
    const weatherCode = weatherData.current.weather_code;
    const aqi = aqiData.current.us_aqi;
    
    const { description } = getWeatherInfo(weatherCode, isDay);
    
    let tempAssessment = 'mild';
    if (temp > 30) tempAssessment = 'hot';
    else if (temp > 20) tempAssessment = 'warm';
    else if (temp < 5) tempAssessment = 'freezing';
    else if (temp < 15) tempAssessment = 'chilly';
    
    let aqiAssessment = 'good';
    if (aqi > 150) aqiAssessment = 'unhealthy';
    else if (aqi > 100) aqiAssessment = 'poor';
    else if (aqi > 50) aqiAssessment = 'moderate';
    
    let activityRecommendation = 'a great day for outdoor activities.';
    if (temp > 35 || aqi > 150 || [65, 67, 75, 82, 95, 96, 99].includes(weatherCode)) {
        activityRecommendation = 'best to stay indoors today.';
    } else if (aqi > 100 || temp > 30 || temp < 5) {
        activityRecommendation = 'consider limiting prolonged outdoor activities.';
    }
    
    return `Right now, it's ${tempAssessment} at ${temp}°C with ${description.toLowerCase()}. The air quality is ${aqiAssessment} (AQI: ${aqi}). Overall, it's ${activityRecommendation}`;
};
