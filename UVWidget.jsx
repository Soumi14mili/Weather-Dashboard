import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { SunDim } from 'lucide-react';

const UVWidget = ({ value }) => {
  const getUVInfo = (uv) => {
    if (uv <= 2) return { label: 'Low', color: 'bg-green-500' };
    if (uv <= 5) return { label: 'Moderate', color: 'bg-yellow-400' };
    if (uv <= 7) return { label: 'High', color: 'bg-orange-500' };
    if (uv <= 10) return { label: 'Very High', color: 'bg-red-500' };
    return { label: 'Extreme', color: 'bg-purple-500' };
  };

  const { label, color } = getUVInfo(value);
  const position = Math.min((value / 11) * 100, 100);

  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
        <SunDim className="w-4 h-4 mr-1" />
        UV Index
      </h3>
      
      <div className="flex flex-col mt-2">
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold text-gray-800 dark:text-white tracking-tighter"
        >
          {Math.round(value)}
        </motion.span>
        <span className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-200">
          {label}
        </span>
        
        <div className="mt-4 relative w-full h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 via-orange-500 via-red-500 to-purple-500">
          <motion.div 
            initial={{ left: '0%' }}
            animate={{ left: `${position}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 rounded-full bg-white border-2 border-gray-800 dark:border-gray-200 shadow-md"
          />
        </div>
      </div>
    </GlassCard>
  );
};

export default UVWidget;
