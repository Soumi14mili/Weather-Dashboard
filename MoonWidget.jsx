import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { getMoonPhase } from '../../utils/moonPhase';

const MoonWidget = ({ date }) => {
  const { name, emoji, illumination } = getMoonPhase(date || new Date());

  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
        <Moon className="w-4 h-4 mr-1" />
        Moon Phase
      </h3>
      
      <div className="flex items-center justify-between mt-4">
        <motion.div 
          initial={{ rotate: -20, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-6xl drop-shadow-lg"
        >
          {emoji}
        </motion.div>
        
        <div className="flex flex-col items-end text-right">
          <span className="text-lg font-bold text-gray-800 dark:text-white leading-tight">
            {name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {Math.round(illumination * 100)}% illuminated
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default MoonWidget;
