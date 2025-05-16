import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Star, Award, BookOpen, Zap, CheckCircle, Medal } from 'lucide-react';

type BadgeType = 'bronze' | 'silver' | 'gold' | 'platinum' | 'master';
type BadgeCategory = 'language' | 'culture' | 'completion' | 'streak' | 'achievement';

interface ProgressBadgeProps {
  type: BadgeType;
  category: BadgeCategory;
  progress: number; // 0-100
  unlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  label?: string;
  onClick?: () => void;
}

export default function ProgressBadge({ 
  type, 
  category, 
  progress, 
  unlocked,
  size = 'md',
  animate = true,
  label,
  onClick
}: ProgressBadgeProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (animate && unlocked && progress === 100) {
      setIsAnimating(true);
      
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 2000); // Animation duration
      
      return () => clearTimeout(timer);
    }
  }, [animate, unlocked, progress]);
  
  // Determine size classes
  const sizeClasses = {
    sm: 'w-14 h-14',
    md: 'w-20 h-20',
    lg: 'w-28 h-28'
  };
  
  const iconSize = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };
  
  // Determine badge styles based on type
  const getBadgeStyles = () => {
    switch (type) {
      case 'bronze':
        return 'from-amber-600 to-amber-800 shadow-amber-400/20';
      case 'silver':
        return 'from-slate-300 to-slate-500 shadow-slate-400/30';
      case 'gold':
        return 'from-yellow-400 to-yellow-600 shadow-yellow-400/40';
      case 'platinum':
        return 'from-cyan-300 to-cyan-700 shadow-cyan-400/40';
      case 'master':
        return 'from-purple-400 to-purple-800 shadow-purple-400/40';
      default:
        return 'from-slate-400 to-slate-600';
    }
  };
  
  // Get appropriate icon based on category
  const getIcon = () => {
    switch (category) {
      case 'language':
        return <BookOpen className={iconSize[size]} />;
      case 'culture':
        return <Medal className={iconSize[size]} />;
      case 'completion':
        return <CheckCircle className={iconSize[size]} />;
      case 'streak':
        return <Zap className={iconSize[size]} />;
      case 'achievement':
        return <Trophy className={iconSize[size]} />;
      default:
        return <Star className={iconSize[size]} />;
    }
  };
  
  // Determine badge level label
  const getBadgeLabel = () => {
    switch (type) {
      case 'bronze': return 'Bronze';
      case 'silver': return 'Silver';
      case 'gold': return 'Gold';
      case 'platinum': return 'Platinum';
      case 'master': return 'Master';
      default: return '';
    }
  };
  
  if (!unlocked && progress < 100) {
    // Locked badge state
    return (
      <div 
        className={`relative ${sizeClasses[size]} flex flex-col items-center justify-center cursor-pointer`}
        onClick={onClick}
      >
        <div className={`absolute inset-0 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden`}>
          {/* Progress circle */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke="#cbd5e1" 
              strokeWidth="8"
            />
            <circle 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="8"
              strokeDasharray={`${progress * 2.89}, 289`} // 289 is approximately 2πr
              strokeDashoffset="0"
              transform="rotate(-90, 50, 50)"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          <div className="relative flex flex-col items-center justify-center text-slate-500">
            {/* Icon shown at reduced opacity */}
            <div className="opacity-30 mb-0.5">
              {getIcon()}
            </div>
            
            {/* Progress percentage */}
            <span className={`font-bold ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}`}>
              {progress}%
            </span>
          </div>
        </div>
        
        {label && (
          <p className={`mt-2 text-center text-slate-700 font-medium ${
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
          }`}>
            {label}
          </p>
        )}
      </div>
    );
  }
  
  return (
    <div 
      className={`relative ${sizeClasses[size]} flex flex-col items-center justify-center`}
      onClick={onClick}
    >
      {/* Badge background */}
      <motion.div 
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${getBadgeStyles()} 
          shadow-lg flex items-center justify-center cursor-pointer
          ${unlocked ? '' : 'opacity-30'}
        `}
        animate={isAnimating ? {
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
        } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        {/* Achievement icon */}
        <div className="text-white">
          {getIcon()}
        </div>
        
        {/* Celebrate animation on completion */}
        {isAnimating && (
          <>
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-white opacity-30"></div>
            </motion.div>
            
            {/* Animated sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 5)],
                  y: [0, (i % 3 === 0 ? -1 : 1) * (20 + i * 5)],
                }}
                transition={{ 
                  duration: 1 + (i * 0.1),
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              >
                <Sparkles className="h-3 w-3 text-yellow-200" />
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
      
      {/* Badge label */}
      {label && (
        <motion.p 
          className={`mt-2 text-center font-medium ${
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
          } ${isAnimating ? 'text-blue-700' : 'text-slate-700'}`}
          animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 1.5 }}
        >
          {label}
        </motion.p>
      )}
      
      {/* Type indicator - only show on larger badges */}
      {size !== 'sm' && (
        <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 
          ${size === 'md' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs'} 
          rounded-full font-medium 
          ${unlocked ? getBadgeTypeColor() : 'bg-slate-200 text-slate-500'}`}
        >
          {getBadgeLabel()}
        </div>
      )}
    </div>
  );
  
  // Helper function to get badge type label background color
  function getBadgeTypeColor() {
    switch (type) {
      case 'bronze': return 'bg-amber-100 text-amber-800';
      case 'silver': return 'bg-slate-100 text-slate-800';
      case 'gold': return 'bg-yellow-100 text-yellow-800';
      case 'platinum': return 'bg-cyan-100 text-cyan-800';
      case 'master': return 'bg-purple-100 text-purple-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  }
}