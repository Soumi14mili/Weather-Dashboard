import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, 
  CloudFog, CloudDrizzle, Droplets, Wind, Snowflake 
} from 'lucide-react';
import { getWeatherInfo } from '../../utils/weatherCodes';

const WeatherIcon = ({ code, size = 48, isDay = true, className = '' }) => {
  // Map WMO codes to lucide icons and animation variations
  const getIconConfig = (code, isDay) => {
    // 0: Clear sky
    if (code === 0) return { 
      Icon: isDay ? Sun : Moon, 
      color: isDay ? 'text-yellow-400' : 'text-blue-100',
      animate: { scale: [1, 1.05, 1], rotate: isDay ? 360 : 0 },
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    };
    // 1-3: Partly cloudy / Cloudy
    if (code <= 3) return {
      Icon: Cloud,
      color: 'text-gray-400 dark:text-gray-300',
      animate: { y: [-2, 2, -2] },
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    };
    // 45, 48: Fog
    if (code === 45 || code === 48) return {
      Icon: CloudFog,
      color: 'text-gray-400',
      animate: { opacity: [0.7, 1, 0.7] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    };
    // 51-57: Drizzle
    if (code >= 51 && code <= 57) return {
      Icon: CloudDrizzle,
      color: 'text-blue-400',
      animate: { y: [0, 2, 0] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    };
    // 61-67: Rain
    if (code >= 61 && code <= 67) return {
      Icon: CloudRain,
      color: 'text-blue-500',
      animate: { y: [0, 3, 0] },
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    };
    // 71-77, 85-86: Snow
    if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return {
      Icon: CloudSnow,
      color: 'text-blue-200 dark:text-white',
      animate: { y: [0, 2, 0], opacity: [0.8, 1, 0.8] },
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    };
    // 80-82: Rain showers
    if (code >= 80 && code <= 82) return {
      Icon: CloudRain,
      color: 'text-blue-500',
      animate: { y: [0, 4, 0] },
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    };
    // 95-99: Thunderstorm
    if (code >= 95 && code <= 99) return {
      Icon: CloudLightning,
      color: 'text-yellow-500',
      animate: { opacity: [1, 0.4, 1, 1], scale: [1, 1.1, 1, 1] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.2, 1] }
    };

    return { 
      Icon: isDay ? Sun : Moon, 
      color: isDay ? 'text-yellow-400' : 'text-blue-100',
      animate: {}, transition: {}
    };
  };

  const { Icon, color, animate, transition } = getIconConfig(code, isDay);

  return (
    <motion.div
      animate={animate}
      transition={transition}
      className={`inline-block ${color} ${className}`}
    >
      <Icon size={size} strokeWidth={1.5} />
    </motion.div>
  );
};

export default WeatherIcon;
