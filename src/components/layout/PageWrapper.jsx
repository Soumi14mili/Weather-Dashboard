import React from 'react';
import { motion } from 'framer-motion';

const PageWrapper = ({ children, className = '' }) => {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`min-h-screen w-full p-4 sm:p-6 lg:p-8 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
