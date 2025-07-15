'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { KaspaBlock } from '@/types/kaspa';

interface BlockProps {
  block: KaspaBlock;
  x: number;
  y: number;
  scale: number;
  opacity: number;
  blockSize: number;
  isHovered: boolean;
  isSelected: boolean;
  onClick: () => void;
  onHover: (isHovered: boolean) => void;
}

const Block = React.memo(function Block({
  block,
  x,
  y,
  scale,
  opacity,
  blockSize,
  isHovered,
  isSelected,
  onClick,
  onHover
}: BlockProps) {
  const getBlockColor = () => {
    switch (block.color) {
      case 'blue': return '#3b82f6';
      case 'red': return '#ef4444';
      case 'gray': return '#6b7280';
      default: return '#10b981';
    }
  };

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: x,
    top: y,
    width: blockSize,
    height: blockSize,
    backgroundColor: getBlockColor(),
    borderRadius: '8px',
    border: isSelected ? '3px solid #fbbf24' : (isHovered ? '2px solid #60a5fa' : '1px solid rgba(255, 255, 255, 0.2)'),
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: isHovered ? '0 8px 25px rgba(0, 0, 0, 0.3)' : '0 4px 15px rgba(0, 0, 0, 0.2)',
    zIndex: isHovered || isSelected ? 20 : 10,
    opacity: opacity,
    transform: `scale(${scale * (isHovered ? 1.1 : 1)})`,
    // SMOOTH TRANSITIONS - This is the key!
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'transform, left, top',
    // GPU acceleration
    backfaceVisibility: 'hidden',
    perspective: '1000px'
  };

  // Display the last 4 digits of the block ID
  const displayId = block.id.toString().slice(-4);

  return (
    <motion.div
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: scale * (isHovered ? 1.1 : 1), 
        opacity: opacity 
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
      whileHover={{ 
        scale: scale * 1.15,
        rotateY: 5,
        rotateX: 5
      }}
      whileTap={{ scale: scale * 0.95 }}
    >
      {displayId}
    </motion.div>
  );
});

export default Block; 