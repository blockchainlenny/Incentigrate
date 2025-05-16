import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedIconProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  hoverEffect?: 'bounce' | 'pulse' | 'wiggle' | 'spin' | 'scale' | 'none';
  autoAnimate?: boolean;
  interval?: number;
  className?: string;
  onClick?: () => void;
}

export default function AnimatedIcon({
  icon,
  size = 'md',
  color = 'text-blue-500',
  hoverEffect = 'bounce',
  autoAnimate = false,
  interval = 3000,
  className = '',
  onClick
}: AnimatedIconProps) {
  const [animate, setAnimate] = useState(false);
  
  // Size styles
  const sizeStyles = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };
  
  // Set up animations
  const animations = {
    bounce: {
      y: [0, -8, 0],
      transition: { duration: 0.6, times: [0, 0.5, 1] }
    },
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.6, times: [0, 0.5, 1] }
    },
    wiggle: {
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    },
    spin: {
      rotate: [0, 360],
      transition: { duration: 0.6 }
    },
    scale: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5, times: [0, 0.5, 1] }
    },
    none: {}
  };
  
  // Auto-animation effect
  useEffect(() => {
    if (!autoAnimate) return;
    
    const timer = setInterval(() => {
      setAnimate(true);
      const reset = setTimeout(() => setAnimate(false), 600);
      return () => clearTimeout(reset);
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoAnimate, interval]);
  
  const handleMouseEnter = () => {
    if (hoverEffect !== 'none' && !autoAnimate) {
      setAnimate(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (hoverEffect !== 'none' && !autoAnimate) {
      setAnimate(false);
    }
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick();
      // Also trigger animation on click
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
  };

  return (
    <motion.div
      className={`inline-flex items-center justify-center ${sizeStyles[size]} ${color} ${className}`}
      animate={animate ? animations[hoverEffect] : {}}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ display: 'inline-flex' }}
      whileHover={hoverEffect !== 'none' && !autoAnimate ? { scale: 1.1 } : {}}
    >
      {icon}
    </motion.div>
  );
}