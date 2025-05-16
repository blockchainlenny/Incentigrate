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

// Comprehensive translations for the application
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation and general UI
    welcome: 'Welcome to Incentigrate',
    dashboard: 'Dashboard',
    learning: 'Learning',
    myPath: 'My Path',
    forum: 'Forum',
    wallet: 'Wallet',
    profile: 'Profile',
    logout: 'Logout',
    connectWallet: 'Connect Wallet',
    helpAssistant: 'Help Assistant',
    learnMore: 'Learn more',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    recentActivity: 'Recent Activity',
    recommendations: 'Personalized Recommendations',
    yourProgress: 'Your Progress',
    upcomingEvents: 'Upcoming Events',
    quickStats: 'Quick Stats',
    continueWhere: 'Continue where you left off',
    
    // Learning modules
    moduleList: 'Learning Modules',
    startModule: 'Start Module',
    continueModule: 'Continue',
    moduleComplete: 'Completed',
    moduleProgress: 'Progress',
    totalXP: 'Total XP',
    estimatedTime: 'Estimated time',
    difficulty: 'Difficulty',
    
    // Integration journey
    integrationJourney: 'Integration Journey',
    officialSteps: 'Official Steps',
    completedSteps: 'Completed Steps',
    inProgress: 'In Progress',
    notStarted: 'Not Started',
    prerequisites: 'Prerequisites',
    resources: 'Resources',
    claimReward: 'Claim Reward',
    
    // Forum
    discussions: 'Discussions',
    newPost: 'New Post',
    replies: 'Replies',
    mostRecent: 'Most Recent',
    mostPopular: 'Most Popular', 
    allCategories: 'All Categories',
    
    // Wallet
    yourWallet: 'Your Wallet',
    walletAddress: 'Wallet Address',
    tokenBalance: 'Token Balance',
    transactionHistory: 'Transaction History',
    sendTokens: 'Send Tokens',
    receiveTokens: 'Receive Tokens',
    copyAddress: 'Copy Address',
    redeemTokens: 'Redeem Tokens',
    
    // User profile
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    personalInfo: 'Personal Information',
    workExperience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    certificates: 'Certificates',
    
    // Dates and time
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',
    hoursAgo: 'hours ago',
    minutesAgo: 'minutes ago',
    
    // Actions
    submit: 'Submit',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    view: 'View',
    share: 'Share',
    like: 'Like',
    dislike: 'Dislike',
    report: 'Report',
    search: 'Search modules by title, description, or tags...',
    
    // Status messages
    success: 'Success',
    error: 'Error',
    loading: 'Loading',
    noResults: 'No results found',
    pleaseWait: 'Please wait',
  },
  
  de: {
    // Navigation and general UI
    welcome: 'Willkommen bei Incentigrate',
    dashboard: 'Dashboard',
    learning: 'Lernen',
    myPath: 'Mein Weg',
    forum: 'Forum',
    wallet: 'Wallet',
    profile: 'Profil',
    logout: 'Abmelden',
    connectWallet: 'Wallet verbinden',
    helpAssistant: 'Hilfsassistent',
    learnMore: 'Mehr erfahren',
    next: 'Weiter',
    previous: 'Zurück',
    close: 'Schließen',
    
    // Dashboard
    welcomeBack: 'Willkommen zurück',
    recentActivity: 'Neueste Aktivitäten',
    recommendations: 'Persönliche Empfehlungen',
    yourProgress: 'Dein Fortschritt',
    upcomingEvents: 'Kommende Ereignisse',
    quickStats: 'Schnelle Übersicht',
    continueWhere: 'Dort weitermachen, wo du aufgehört hast',
    
    // Learning modules
    moduleList: 'Lernmodule',
    startModule: 'Modul starten',
    continueModule: 'Fortsetzen',
    moduleComplete: 'Abgeschlossen',
    moduleProgress: 'Fortschritt',
    totalXP: 'Gesamt-XP',
    estimatedTime: 'Geschätzte Zeit',
    difficulty: 'Schwierigkeit',
    
    // Integration journey
    integrationJourney: 'Integrationsreise',
    officialSteps: 'Offizielle Schritte',
    completedSteps: 'Abgeschlossene Schritte',
    inProgress: 'In Bearbeitung',
    notStarted: 'Nicht begonnen',
    prerequisites: 'Voraussetzungen',
    resources: 'Ressourcen',
    claimReward: 'Belohnung einfordern',
    
    // Forum
    discussions: 'Diskussionen',
    newPost: 'Neuer Beitrag',
    replies: 'Antworten',
    mostRecent: 'Neueste',
    mostPopular: 'Beliebteste', 
    allCategories: 'Alle Kategorien',
    
    // Wallet
    yourWallet: 'Deine Wallet',
    walletAddress: 'Wallet-Adresse',
    tokenBalance: 'Token-Guthaben',
    transactionHistory: 'Transaktionsverlauf',
    sendTokens: 'Tokens senden',
    receiveTokens: 'Tokens empfangen',
    copyAddress: 'Adresse kopieren',
    redeemTokens: 'Tokens einlösen',
    
    // User profile
    editProfile: 'Profil bearbeiten',
    saveChanges: 'Änderungen speichern',
    cancel: 'Abbrechen',
    personalInfo: 'Persönliche Informationen',
    workExperience: 'Berufserfahrung',
    education: 'Ausbildung',
    skills: 'Fähigkeiten',
    languages: 'Sprachen',
    certificates: 'Zertifikate',
    
    // Dates and time
    today: 'Heute',
    yesterday: 'Gestern',
    daysAgo: 'Tage her',
    hoursAgo: 'Stunden her',
    minutesAgo: 'Minuten her',
    
    // Actions
    submit: 'Absenden',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    add: 'Hinzufügen',
    view: 'Ansehen',
    share: 'Teilen',
    like: 'Gefällt mir',
    dislike: 'Gefällt mir nicht',
    report: 'Melden',
    search: 'Module nach Titel, Beschreibung oder Tags durchsuchen...',
    
    // Status messages
    success: 'Erfolg',
    error: 'Fehler',
    loading: 'Lädt',
    noResults: 'Keine Ergebnisse gefunden',
    pleaseWait: 'Bitte warten',
  },
  
  ar: {
    // Navigation and general UI
    welcome: 'مرحبا بكم في Incentigrate',
    dashboard: 'لوحة القيادة',
    learning: 'التعلم',
    myPath: 'مساري',
    forum: 'المنتدى',
    wallet: 'المحفظة',
    profile: 'الملف الشخصي',
    logout: 'تسجيل خروج',
    connectWallet: 'ربط المحفظة',
    helpAssistant: 'مساعد المساعدة',
    learnMore: 'تعلم المزيد',
    next: 'التالي',
    previous: 'السابق',
    close: 'إغلاق',
    
    // Dashboard
    welcomeBack: 'مرحبًا بعودتك',
    recentActivity: 'النشاط الأخير',
    recommendations: 'توصيات مخصصة',
    yourProgress: 'تقدمك',
    upcomingEvents: 'الأحداث القادمة',
    quickStats: 'إحصائيات سريعة',
    continueWhere: 'استمر من حيث توقفت',
    
    // Learning modules
    moduleList: 'وحدات التعلم',
    startModule: 'ابدأ الوحدة',
    continueModule: 'استمر',
    moduleComplete: 'مكتمل',
    moduleProgress: 'التقدم',
    totalXP: 'مجموع النقاط',
    estimatedTime: 'الوقت المقدر',
    difficulty: 'الصعوبة',
    
    // Integration journey
    integrationJourney: 'رحلة الاندماج',
    officialSteps: 'الخطوات الرسمية',
    completedSteps: 'الخطوات المكتملة',
    inProgress: 'قيد التقدم',
    notStarted: 'لم يبدأ بعد',
    prerequisites: 'المتطلبات الأساسية',
    resources: 'الموارد',
    claimReward: 'المطالبة بالمكافأة',
    
    // Forum
    discussions: 'المناقشات',
    newPost: 'منشور جديد',
    replies: 'الردود',
    mostRecent: 'الأحدث',
    mostPopular: 'الأكثر شعبية', 
    allCategories: 'جميع الفئات',
    
    // Wallet
    yourWallet: 'محفظتك',
    walletAddress: 'عنوان المحفظة',
    tokenBalance: 'رصيد الرمز',
    transactionHistory: 'سجل المعاملات',
    sendTokens: 'إرسال الرموز',
    receiveTokens: 'استلام الرموز',
    copyAddress: 'نسخ العنوان',
    redeemTokens: 'استبدال الرموز',
    
    // User profile
    editProfile: 'تعديل الملف الشخصي',
    saveChanges: 'حفظ التغييرات',
    cancel: 'إلغاء',
    personalInfo: 'المعلومات الشخصية',
    workExperience: 'الخبرة العملية',
    education: 'التعليم',
    skills: 'المهارات',
    languages: 'اللغات',
    certificates: 'الشهادات',
    
    // Dates and time
    today: 'اليوم',
    yesterday: 'أمس',
    daysAgo: 'أيام مضت',
    hoursAgo: 'ساعات مضت',
    minutesAgo: 'دقائق مضت',
    
    // Actions
    submit: 'إرسال',
    delete: 'حذف',
    edit: 'تعديل',
    add: 'إضافة',
    view: 'عرض',
    share: 'مشاركة',
    like: 'إعجاب',
    dislike: 'عدم الإعجاب',
    report: 'إبلاغ',
    search: 'البحث عن الوحدات حسب العنوان أو الوصف أو العلامات...',
    
    // Status messages
    success: 'نجاح',
    error: 'خطأ',
    loading: 'جاري التحميل',
    noResults: 'لم يتم العثور على نتائج',
    pleaseWait: 'يرجى الانتظار',
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