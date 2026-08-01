import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Wind, Navigation2 } from 'lucide-react';

const WindWidget = ({ speed, direction }) => {
  const getDirectionText = (degrees) => {
    const val = Math.floor((degrees / 22.5) + 0.5);
    const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
  };

  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
        <Wind className="w-4 h-4 mr-1" />
        Wind
      </h3>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-gray-800 dark:text-white tracking-tighter"
          >
            {Math.round(speed)}
          </motion.span>
          <span className="text-sm text-gray-500 dark:text-gray-400">km/h</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center">
            <span className="absolute top-0 text-[10px] text-gray-400 font-bold -mt-1 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md px-1 rounded-sm z-10">N</span>
            <span className="absolute bottom-0 text-[10px] text-gray-400 font-bold -mb-1 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md px-1 rounded-sm z-10">S</span>
            <span className="absolute right-0 text-[10px] text-gray-400 font-bold -mr-1 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md px-1 rounded-sm z-10">E</span>
            <span className="absolute left-0 text-[10px] text-gray-400 font-bold -ml-1 bg-white/20 dark:bg-gray-800/30 backdrop-blur-md px-1 rounded-sm z-10">W</span>
            
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: direction }}
              transition={{ type: "spring", stiffness: 50, damping: 10, delay: 0.2 }}
              className="text-blue-500 z-0"
            >
              <Navigation2 className="w-6 h-6 fill-current" />
            </motion.div>
          </div>
          <span className="text-sm font-medium mt-1 text-gray-700 dark:text-gray-200">
            {getDirectionText(direction)}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default WindWidget;
