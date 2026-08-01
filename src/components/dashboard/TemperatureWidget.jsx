import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Thermometer } from 'lucide-react';

const TemperatureWidget = ({ current, feelsLike, high, low, condition }) => {
  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
          <Thermometer className="w-4 h-4 mr-1" />
          Temperature
        </h3>
        {condition && (
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/30 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200">
            {condition}
          </span>
        )}
      </div>
      
      <div className="flex flex-col mt-4">
        <div className="flex items-end">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="text-5xl font-bold text-gray-800 dark:text-white tracking-tighter"
          >
            {Math.round(current)}°
          </motion.span>
        </div>
        
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
          <div>Feels like {Math.round(feelsLike)}°</div>
          <div className="flex gap-2">
            <span>H: {Math.round(high)}°</span>
            <span>L: {Math.round(low)}°</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default TemperatureWidget;
