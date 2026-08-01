import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', onClick, hover = false }) => {
  const baseClasses = "backdrop-blur-xl bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-lg p-6 overflow-hidden relative";
  
  const motionProps = hover ? {
    whileHover: { scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" },
    whileTap: { scale: 0.98 }
  } : {};

  if (onClick || hover) {
    return (
      <motion.div
        className={`${baseClasses} cursor-pointer ${className}`}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
