import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';

const VisibilityWidget = ({ value }) => {
  const distanceKm = value / 1000;
  
  const getVisibilityText = (km) => {
    if (km >= 10) return "Excellent";
    if (km >= 5) return "Good";
    if (km >= 2) return "Moderate";
    return "Poor";
  };

  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
        <Eye className="w-4 h-4 mr-1" />
        Visibility
      </h3>
      
      <div className="flex flex-col mt-4">
        <div className="flex items-baseline">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-gray-800 dark:text-white tracking-tighter mr-1"
          >
            {distanceKm.toFixed(1)}
          </motion.span>
          <span className="text-sm text-gray-500 dark:text-gray-400">km</span>
        </div>
        
        <span className="text-sm font-medium mt-2 text-gray-700 dark:text-gray-200">
          {getVisibilityText(distanceKm)}
        </span>
      </div>
    </GlassCard>
  );
};

export default VisibilityWidget;
