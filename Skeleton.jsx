import React from 'react';

const Skeleton = ({ className = '', variant = 'text' }) => {
  const baseClasses = "relative overflow-hidden bg-gray-200/50 dark:bg-gray-700/50";
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'circle': return 'rounded-full';
      case 'rect': return 'rounded-md';
      case 'card': return 'rounded-2xl';
      case 'text':
      default: return 'rounded h-4 w-full';
    }
  };

  return (
    <div className={`${baseClasses} ${getVariantClasses()} ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
    </div>
  );
};

export const SkeletonCard = ({ className = '' }) => (
  <div className={`backdrop-blur-xl bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 ${className}`}>
    <Skeleton variant="circle" className="w-12 h-12 mb-4" />
    <Skeleton variant="text" className="w-1/2 mb-2 h-6" />
    <Skeleton variant="text" className="w-3/4 mb-4" />
    <Skeleton variant="rect" className="w-full h-24" />
  </div>
);

export const SkeletonWidget = ({ className = '' }) => (
  <div className={`backdrop-blur-xl bg-white/20 dark:bg-gray-800/30 border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 flex flex-col justify-between ${className}`}>
    <div className="flex justify-between items-center mb-4">
      <Skeleton variant="text" className="w-1/3 h-5" />
      <Skeleton variant="circle" className="w-8 h-8" />
    </div>
    <Skeleton variant="rect" className="w-full h-16 mt-auto" />
  </div>
);

export default Skeleton;
