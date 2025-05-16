import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage, languageFlags, languageNames } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessagesSquare, 
  Wallet as WalletIcon, 
  Map,
  UserCircle,
  LogOut,
  Gem,
  Globe
} from 'lucide-react';

interface NavMenuProps {
  currentView: string;
  navigateTo: (view: string, moduleId?: string, moduleTitle?: string) => void;
}

export default function NavMenu({ currentView, navigateTo }: NavMenuProps) {
  const { isLoggedIn, userName, oTokenBalance, logout } = useAppContext();
  const { t, currentLanguage, toggleLanguage } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  
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
  
  // Handle language toggle with animation
  const handleToggleLanguage = () => {
    setIsAnimating(true);
    toggleLanguage();
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  const navItems = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'module_list', label: t('learning'), icon: BookOpen },
    { id: 'integration_journey', label: t('myPath'), icon: Map },
    { id: 'forum', label: t('forum'), icon: MessagesSquare },
    { id: 'wallet', label: t('wallet'), icon: WalletIcon },
    { id: 'user_profile', label: t('profile'), icon: UserCircle },
  ];

  return (
    <div className="bg-themeBlue text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-xl">Incentigrate</h1>
            <span className="text-xs px-2 py-0.5 bg-blue-500 rounded-full">Beta</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentView === item.id || 
                (item.id === 'module_list' && currentView === 'single_module');
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`py-2 px-3 rounded-md flex items-center transition-colors ${
                    isActive ? 'bg-themeGreen text-white' : 'hover:bg-blue-700 text-slate-200'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  <span className={isActive ? 'font-medium' : ''}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Info / Login Button */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle Button in navigation */}
            <button 
              onClick={handleToggleLanguage}
              className="hidden md:flex items-center bg-blue-600/30 px-2 py-1.5 rounded-full hover:bg-blue-600/50 transition-colors cursor-pointer"
              title="Click to change language"
            >
              <motion.span 
                className="text-lg mr-1"
                variants={flagVariants}
                animate={isAnimating ? 'animate' : 'initial'}
              >
                {currentLanguage === 'en' ? '🇬🇧' : currentLanguage === 'de' ? '🇩🇪' : '🇸🇦'}
              </motion.span>
              <div className="relative hidden md:block">
                <Globe className="h-4 w-4" />
                <div className="absolute -top-1 -right-1 text-[10px] font-bold bg-blue-500 text-white rounded-full w-3 h-3 flex items-center justify-center">
                  {currentLanguage === 'en' ? 'E' : currentLanguage === 'de' ? 'D' : 'A'}
                </div>
              </div>
            </button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center bg-blue-600/30 px-2 py-1.5 rounded-full">
                  <Gem className="h-4 w-4 text-teal-300 mr-1" />
                  <span className="font-medium text-teal-100 text-sm">{oTokenBalance} $O</span>
                </div>
                <div className="hidden md:flex items-center text-slate-200">
                  <UserCircle className="h-4 w-4 mr-1" />
                  <span className="text-sm">{userName}</span>
                </div>
                <button 
                  onClick={() => logout()}
                  className="text-sm bg-blue-600/30 hover:bg-blue-600/50 rounded-md p-1.5 transition-colors"
                  title={t('logout')}
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => navigateTo('wallet')}
                className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-md transition-colors"
              >
                {t('connectWallet')}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around pb-3">
          {navItems.map((item) => {
            const isActive = currentView === item.id || 
              (item.id === 'module_list' && currentView === 'single_module');
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="flex flex-col items-center"
              >
                <div className={`p-2 rounded-full ${isActive ? 'bg-themeGreen' : 'bg-blue-700/30'}`}>
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-200'}`} />
                </div>
                <span className={`text-xs mt-1 ${isActive ? 'text-white font-medium' : 'text-slate-200'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
          
          {/* Mobile Language Toggle */}
          <div className="flex flex-col items-center">
            <button 
              className="p-2 rounded-full bg-blue-700/30 flex items-center justify-center relative cursor-pointer hover:bg-blue-700/50 transition-colors"
              onClick={handleToggleLanguage}
            >
              <motion.span 
                className="text-xl"
                variants={flagVariants}
                animate={isAnimating ? 'animate' : 'initial'}
              >
                {currentLanguage === 'en' ? '🇬🇧' : currentLanguage === 'de' ? '🇩🇪' : '🇸🇦'}
              </motion.span>
              <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full text-white text-[10px] w-3 h-3 flex items-center justify-center font-bold">
                {currentLanguage === 'en' ? 'E' : currentLanguage === 'de' ? 'D' : 'A'}
              </div>
            </button>
            <span className="text-xs mt-1 text-slate-200">
              {currentLanguage === 'en' ? 'EN' : currentLanguage === 'de' ? 'DE' : 'AR'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}