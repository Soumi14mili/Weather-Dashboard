export const generateHealthAdvice = (weatherData, aqiData) => {
    const advice = [];
    const temp = weatherData?.current?.temperature_2m || 0;
    const uvIndex = weatherData?.current?.uv_index || 0;
    const rainProb = weatherData?.daily?.precipitation_probability_max?.[0] || 0;
    const aqi = aqiData?.current?.us_aqi || 0;

    // Temperature Advice
    if (temp > 35) {
        advice.push({ category: 'temperature', icon: 'thermometer', title: 'Extreme Heat', description: 'Very high temperatures. Stay indoors if possible.', severity: 'danger', tips: ['Stay in air-conditioned places', 'Avoid strenuous activities'] });
    } else if (temp > 25) {
        advice.push({ category: 'temperature', icon: 'thermometer', title: 'Warm Weather', description: 'Warm temperatures today.', severity: 'info', tips: ['Wear light clothing', 'Seek shade when outdoors'] });
    } else if (temp < 5) {
        advice.push({ category: 'temperature', icon: 'thermometer', title: 'Cold Weather', description: 'Freezing temperatures.', severity: 'danger', tips: ['Wear multiple layers', 'Protect extremities (gloves, hat)'] });
    } else {
        advice.push({ category: 'temperature', icon: 'thermometer', title: 'Moderate Weather', description: 'Comfortable temperatures today.', severity: 'info', tips: ['Enjoy outdoor activities'] });
    }

    // Air Quality Advice
    if (aqi > 100) {
        advice.push({ category: 'airQuality', icon: 'wind', title: 'Poor Air Quality', description: 'Air quality is poor today.', severity: 'danger', tips: ['Consider wearing a mask outdoors', 'Keep windows closed', 'Run an air purifier if you have one'] });
    } else if (aqi > 50) {
        advice.push({ category: 'airQuality', icon: 'wind', title: 'Moderate Air Quality', description: 'Air quality is acceptable.', severity: 'warning', tips: ['Sensitive groups should reduce prolonged outdoor exertion'] });
    } else {
        advice.push({ category: 'airQuality', icon: 'wind', title: 'Good Air Quality', description: 'Air quality is good.', severity: 'info', tips: ['Great day to open windows for fresh air', 'Ideal for outdoor activities'] });
    }

    // UV Protection Advice
    if (uvIndex > 6) {
        advice.push({ category: 'uvProtection', icon: 'sun', title: 'High UV Index', description: 'High risk of harm from unprotected sun exposure.', severity: 'warning', tips: ['Apply SPF 30+ sunscreen', 'Wear sunglasses and a wide-brimmed hat'] });
    } else if (uvIndex > 3) {
        advice.push({ category: 'uvProtection', icon: 'sun', title: 'Moderate UV Index', description: 'Moderate risk of harm from sun exposure.', severity: 'info', tips: ['Apply sunscreen if outdoors for extended periods'] });
    } else {
        advice.push({ category: 'uvProtection', icon: 'sun', title: 'Low UV Index', description: 'Low risk of harm from sun exposure.', severity: 'info', tips: ['No special UV protection needed'] });
    }

    // Rain Advice
    if (rainProb > 50) {
        advice.push({ category: 'rain', icon: 'umbrella', title: 'High Chance of Rain', description: 'Expect precipitation today.', severity: 'warning', tips: ['Carry an umbrella or raincoat', 'Watch out for slippery roads'] });
    }

    // Hydration
    if (temp > 25 || aqi > 100) {
        advice.push({ category: 'hydration', icon: 'droplet', title: 'Stay Hydrated', description: 'Higher risk of dehydration today.', severity: 'warning', tips: ['Drink plenty of water', 'Avoid excessive caffeine or alcohol'] });
    }

    // Workout
    if (aqi > 100 || temp > 35) {
        advice.push({ category: 'workout', icon: 'activity', title: 'Indoor Exercise Recommended', description: 'Conditions are not ideal for outdoor workouts.', severity: 'warning', tips: ['Move your workout indoors', 'Opt for lower intensity exercises'] });
    } else {
        advice.push({ category: 'workout', icon: 'activity', title: 'Great for Outdoor Exercise', description: 'Conditions are good for outdoor activities.', severity: 'info', tips: ['Go for a run or walk outside', 'Enjoy outdoor sports'] });
    }

    return advice;
};
