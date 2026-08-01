import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Droplets } from 'lucide-react';

const HumidityWidget = ({ value }) => {
  const getHumidityText = (val) => {
    if (val < 30) return 'Low';
    if (val <= 60) return 'Comfortable';
    return 'High';
  };

  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const strokeDashoffset = 125.6 - (normalizedValue / 100) * 125.6; // For r=40, circum=251.2, semi=125.6

  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
        <Droplets className="w-4 h-4 mr-1" />
        Humidity
      </h3>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold text-gray-800 dark:text-white tracking-tighter"
          >
            {Math.round(value)}%
          </motion.span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {getHumidityText(value)}
          </span>
        </div>
        
        <div className="relative w-24 h-12 flex items-end justify-center overflow-hidden">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="rgba(156, 163, 175, 0.2)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            <motion.path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="125.6 125.6"
              initial={{ strokeDashoffset: 125.6 }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
        </div>
      </div>
    </GlassCard>
  );
};

export default HumidityWidget;
