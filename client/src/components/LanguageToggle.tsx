import React, { useState, useEffect } from 'react';
import { useLanguage, languageFlags, languageNames, Language } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  position?: 'top-right' | 'bottom-right' | 'inline'; // Different positioning options
  showText?: boolean; // Whether to show the language name
  size?: 'sm' | 'md' | 'lg'; // Size variants
}

export default function LanguageToggle({
  position = 'top-right',
  showText = true,
  size = 'md'
}: LanguageToggleProps) {
  const { currentLanguage, toggleLanguage, setLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Size classes based on prop
  const sizeClasses = {
    sm: 'text-sm p-1',
    md: 'text-base p-2',
    lg: 'text-lg p-3'
  };

  // Position classes
  const positionClasses = {
    'top-right': 'fixed top-20 right-4 z-50',
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'inline': 'relative inline-flex'
  };

  // Handle the one-click toggle
  const handleToggle = () => {
    setIsAnimating(true);
    toggleLanguage();
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Select a specific language from dropdown
  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setShowDropdown(false);
  };

  // Flag animation variants
  const flagVariants = {
    initial: { 
      scale: 1,
      rotate: 0,
      y: 0
    },
    animate: { 
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      y: [0, -10, 0],
      transition: { 
        duration: 0.8,
        ease: "easeInOut" 
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  // Get current flag and name
  const currentFlag = languageFlags[currentLanguage];
  const currentName = languageNames[currentLanguage];

  return (
    <div className={position !== 'inline' ? positionClasses[position] : ''}>
      <div className={`relative ${positionClasses['inline']}`}>
        {/* Main toggle button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowDropdown(!showDropdown);
          }}
          className={`flex items-center gap-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow 
            ${sizeClasses[size]} transition-all`}
          title="Click to toggle language, right-click to select"
        >
          <motion.div
            variants={flagVariants}
            animate={isAnimating ? 'animate' : 'initial'}
            className="text-xl"
          >
            {currentFlag}
          </motion.div>
          
          {showText && (
            <span className="font-medium text-slate-700">{currentName}</span>
          )}
          
          <Globe className="h-4 w-4 text-slate-400" />
        </button>

        {/* Language dropdown */}
        <AnimatePresence>
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-md border border-slate-200 overflow-hidden z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {Object.entries(languageFlags).map(([lang, flag]) => (
                <button
                  key={lang}
                  className={`flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-slate-100 transition-colors
                    ${currentLanguage === lang ? 'bg-blue-50 text-blue-600' : 'text-slate-700'}`}
                  onClick={() => selectLanguage(lang as Language)}
                >
                  <span className="text-xl">{flag}</span>
                  <span className="font-medium">{languageNames[lang as Language]}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}