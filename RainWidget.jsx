import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Umbrella } from 'lucide-react';

const RainWidget = ({ value = 0 }) => {
  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
        <Umbrella className="w-4 h-4 mr-1" />
        Rain Probability
      </h3>
      
      <div className="flex flex-col justify-end mt-4 h-full">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-blue-500 dark:text-blue-400 tracking-tighter mb-4"
        >
          {Math.round(value)}%
        </motion.div>
        
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${value}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="h-full bg-blue-500 rounded-full"
          />
        </div>
      </div>
    </GlassCard>
  );
};

export default RainWidget;
