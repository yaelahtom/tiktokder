import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DownloadButton = ({ onDownload, status }) => {

  const handleClick = (event) => {
    if (status === 'idle') {
      onDownload(event); // Trigger the download function passed as a prop
    }
  };

  const downloadButtonVariant = {
    idle: { borderRadius: '9999px' }, // Fully rounded borders
    processing: { borderRadius: '12px' }, // Slightly rounded borders
    downloaded: { borderRadius: '0px' }, // No rounded borders
    failed: { borderRadius: '12px', backgroundColor: '#ff0000', color: '#ffffff' } // Red background for failed state
  };

  return (
    <motion.button
      className={`px-6 py-2 font-mono tracking-widest transition-colors duration-300 focus:outline-none ${
        status === 'idle'
          ? 'text-f72e2a hover:text-white hover:bg-custom-red'
          : status === 'failed'
            ? 'bg-red-600 text-white'
            : 'bg-gray-300 text-gray-700 cursor-default'
      }`}
      onClick={handleClick}
      variants={downloadButtonVariant}
      animate={status}
      disabled={status !== 'idle'}
    >
      {status === 'processing' && <WalkingDots />}
      {status === 'downloaded' ? 'DOWNLOADED ↓' : status === 'processing' ? 'PROCESSING...' : status === 'failed' ? 'FAILED' : ''}
    </motion.button>
  );
};

const WalkingDots = () => {
  return (
    <AnimatePresence>
      <motion.span
        key="dot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { repeat: Infinity, duration: 0.5, ease: 'linear' },
        }}
      >
        ...
      </motion.span>
    </AnimatePresence>
  );
};

export default DownloadButton;
