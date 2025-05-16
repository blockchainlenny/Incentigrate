import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'de' | 'ar';

// Define the language context type
interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string; // Basic translation function
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translations for demonstration purposes
const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: 'Welcome to Incentigrate',
    dashboard: 'Dashboard',
    learning: 'Learning',
    myPath: 'My Path',
    forum: 'Forum',
    wallet: 'Wallet',
    profile: 'Profile',
    logout: 'Logout',
    connectWallet: 'Connect Wallet',
  },
  de: {
    welcome: 'Willkommen bei Incentigrate',
    dashboard: 'Dashboard',
    learning: 'Lernen',
    myPath: 'Mein Weg',
    forum: 'Forum',
    wallet: 'Wallet',
    profile: 'Profil',
    logout: 'Abmelden',
    connectWallet: 'Wallet verbinden',
  },
  ar: {
    welcome: 'مرحبا بكم في Incentigrate',
    dashboard: 'لوحة القيادة',
    learning: 'التعلم',
    myPath: 'مساري',
    forum: 'المنتدى',
    wallet: 'المحفظة',
    profile: 'الملف الشخصي',
    logout: 'تسجيل خروج',
    connectWallet: 'ربط المحفظة',
  }
};

// Flag emoji codes for each language
export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  de: '🇩🇪',
  ar: '🇸🇦'
};

// Language name mapping
export const languageNames: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
  ar: 'العربية'
};

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  // Function to set language
  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  // Function to toggle language in a cycle
  const toggleLanguage = () => {
    const languageOrder: Language[] = ['en', 'de', 'ar'];
    const currentIndex = languageOrder.indexOf(currentLanguage);
    const nextIndex = (currentIndex + 1) % languageOrder.length;
    setCurrentLanguage(languageOrder[nextIndex]);
  };

  // Basic translation function
  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};