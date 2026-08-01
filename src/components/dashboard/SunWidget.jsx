import React from 'react';
import GlassCard from '../common/GlassCard';
import { motion } from 'framer-motion';
import { Sunrise, Sunset } from 'lucide-react';

const SunWidget = ({ sunrise, sunset }) => {
  const formatTime = (isoString) => {
    if (!isoString) return '--:--';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate sun position based on current time
  const calculatePosition = () => {
    if (!sunrise || !sunset) return 0;
    const now = new Date().getTime();
    const start = new Date(sunrise).getTime();
    const end = new Date(sunset).getTime();
    
    if (now < start) return 0;
    if (now > end) return 100;
    
    return ((now - start) / (end - start)) * 100;
  };

  const position = calculatePosition();

  // For the arc calculation: a semi-circle from (10, 60) to (190, 60)
  // center is (100, 60), radius is 90
  const angle = Math.PI - (position / 100) * Math.PI;
  const sunX = 100 + 90 * Math.cos(angle);
  const sunY = 60 - 90 * Math.sin(angle);

  return (
    <GlassCard hover className="flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="text-gray-500 dark:text-gray-400 font-medium flex items-center text-sm">
        <Sunrise className="w-4 h-4 mr-1" />
        Sun
      </h3>
      
      <div className="flex-grow flex flex-col justify-end mt-2">
        <div className="relative w-full h-16 flex items-end justify-center overflow-hidden">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 65">
            {/* Horizon line */}
            <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(156, 163, 175, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Arc path */}
            <path
              d="M 10 60 A 90 90 0 0 1 190 60"
              fill="none"
              stroke="rgba(250, 204, 21, 0.3)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            
            {/* Sun indicator */}
            {position > 0 && position < 100 && (
              <motion.circle
                cx={sunX}
                cy={sunY}
                r="6"
                fill="#EAB308"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]"
              />
            )}
          </svg>
        </div>
        
        <div className="flex justify-between items-center text-sm mt-1">
          <div className="flex flex-col">
            <span className="text-gray-800 dark:text-gray-200 font-medium">{formatTime(sunrise)}</span>
            <span className="text-xs text-gray-500">Sunrise</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-800 dark:text-gray-200 font-medium">{formatTime(sunset)}</span>
            <span className="text-xs text-gray-500">Sunset</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default SunWidget;
