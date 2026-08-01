import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Gauge, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const PressureWidget = ({ value, trend = 'stable' }) => {
  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
        <Gauge className="w-4 h-4 mr-1" />
        Pressure
      </h3>
      
      <div className="flex flex-col mt-4">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-gray-800 dark:text-white tracking-tighter"
        >
          {Math.round(value)}
        </motion.span>
        <span className="text-sm text-gray-500 dark:text-gray-400">hPa</span>
        
        <div className="flex items-center mt-3 text-sm text-gray-600 dark:text-gray-300 bg-white/20 dark:bg-gray-800/40 w-fit px-2 py-1 rounded-md">
          {trend === 'rising' && <TrendingUp className="w-4 h-4 mr-1 text-green-500" />}
          {trend === 'falling' && <TrendingDown className="w-4 h-4 mr-1 text-red-500" />}
          {trend === 'stable' && <Minus className="w-4 h-4 mr-1 text-gray-500" />}
          <span className="capitalize">{trend}</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default PressureWidget;
