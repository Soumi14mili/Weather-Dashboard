import React from 'react';
import { motion } from 'framer-motion';

const AQIGauge = ({ value = 0, size = 200, className = '' }) => {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const halfCircumference = circumference / 2;
  
  // Normalize AQI (0-500) to 0-1 range for the gauge (which is a semi-circle)
  const normalizedValue = Math.min(Math.max(value, 0), 500);
  const percent = normalizedValue / 500;
  const strokeDashoffset = halfCircumference - (percent * halfCircumference);

  const getAQIInfo = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: '#10B981' }; // Green
    if (aqi <= 100) return { label: 'Moderate', color: '#FBBF24' }; // Yellow
    if (aqi <= 150) return { label: 'Unhealthy for Sensitive', color: '#F97316' }; // Orange
    if (aqi <= 200) return { label: 'Unhealthy', color: '#EF4444' }; // Red
    if (aqi <= 300) return { label: 'Very Unhealthy', color: '#8B5CF6' }; // Purple
    return { label: 'Hazardous', color: '#9F1239' }; // Maroon
  };

  const { label, color } = getAQIInfo(value);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`} style={{ width: size, height: size / 2 + 30 }}>
      <svg width={size} height={size / 2 + strokeWidth} viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`} className="overflow-visible">
        {/* Background Arc */}
        <path
          d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke="rgba(156, 163, 175, 0.2)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Value Arc */}
        <motion.path
          d={`M ${strokeWidth/2} ${size/2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth/2} ${size/2}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${halfCircumference} ${halfCircumference}`}
          initial={{ strokeDashoffset: halfCircumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center w-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold text-gray-800 dark:text-white"
        >
          {value}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm font-medium mt-1"
          style={{ color }}
        >
          {label}
        </motion.div>
      </div>
    </div>
  );
};

export default AQIGauge;
