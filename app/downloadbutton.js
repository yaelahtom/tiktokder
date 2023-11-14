// Import useState and useEffect from React
import React, { useState, useEffect } from 'react';
// Import motion from Framer Motion for animations
import { motion, AnimatePresence } from 'framer-motion';

const DownloadButton = ({ onDownload }) => {
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (status === 'processing') {
      // Simulate an async download process
      const timer = setTimeout(() => {
        setStatus('downloaded');
      }, 3000); // Adjust the time as needed for your download process
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleClick = () => {
    setStatus('processing');
    onDownload(); // Trigger the download function passed as a prop
  };

  const downloadText = status === 'idle' ? 'DOWNLOAD' : status === 'processing' ? 'PROCESSING...' : 'DOWNLOADED ↓';

  const downloadButtonVariant = {
    idle: { borderRadius: '9999px' }, // Fully rounded borders
    processing: { borderRadius: '12px' }, // Slightly rounded borders
    downloaded: { borderRadius: '0px' }, // No rounded borders
  };

  return (
    <motion.button
      className={`px-6 py-2 font-mono tracking-widest text-f72e2a transition-colors duration-300 focus:outline-none ${
        status === 'idle'
          ? 'hover:text-white hover:bg-custom-red'
          : 'bg-gray-300 text-gray-700 cursor-default'
      }`}
      onClick={handleClick}
      variants={downloadButtonVariant}
      animate={status}
      disabled={status !== 'idle'}
    >
      {status === 'processing' && <WalkingDots />}
      {downloadText}
    </motion.button>
  );
};

const WalkingDots = () => {
  // Dot walking animation
  return (
    <AnimatePresence>
      <motion.span
        key="dot"
        initial={{ x: 0 }}
        animate={{ x: 20 }}
        exit={{ x: 0 }}
        transition={{
          x: { repeat: Infinity, duration: 1, ease: 'linear' },
          opacity: { duration: 0.2 },
        }}
      >
        ...
      </motion.span>
    </AnimatePresence>
  );
};

export default DownloadButton;
