import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle, MessageCircle, Bot } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export type HelpContext = 
  | 'dashboard' 
  | 'learning' 
  | 'wallet' 
  | 'forum' 
  | 'integration' 
  | 'profile'
  | 'general';

interface HelpBubbleProps {
  context: HelpContext;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  autoShow?: boolean;
  autoHideAfter?: number; // in milliseconds
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface HelpTip {
  text: string;
  text_de: string;
  text_ar: string;
}

export default function HelpAssistant({ 
  context, 
  position = 'bottom-right',
  autoShow = false,
  autoHideAfter = 0,
  pulse = true,
  size = 'md'
}: HelpBubbleProps) {
  const { currentLanguage, t } = useLanguage();
  const bubbleKey = `help_bubble_${context}_session`;
  
  // State for UI management
  const [isOpen, setIsOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  
  // On component mount, check if we should show bubble
  useEffect(() => {
    // First visit detection - show only one bubble per app session
    const hasSeenAnyBubbles = localStorage.getItem('help_bubbles_global') === 'seen';
    
    // Only auto-show if this is the first time the user is seeing any bubble
    if (autoShow && !hasSeenAnyBubbles) {
      setIsOpen(true);
      // Mark globally that we've shown a bubble
      localStorage.setItem('help_bubbles_global', 'seen');
    }
  }, []); // Empty dependency array - only run on mount
  
  // Character personality traits
  const characterName = "Inti";
  const characterEmoji = "🤖";

  // Size styles
  const sizeStyles = {
    sm: {
      bubbleWidth: "max-w-xs",
      iconSize: "h-8 w-8",
      fontSize: "text-sm"
    },
    md: {
      bubbleWidth: "max-w-sm",
      iconSize: "h-10 w-10",
      fontSize: "text-base"
    },
    lg: {
      bubbleWidth: "max-w-md",
      iconSize: "h-12 w-12",
      fontSize: "text-lg"
    }
  };

  // Position styles
  const positionStyles = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'center': 'bottom-1/2 right-1/2 transform translate-x-1/2 translate-y-1/2'
  };

  // Context-specific help tips
  const helpTips: Record<HelpContext, HelpTip[]> = {
    dashboard: [
      {
        text: "Welcome to your dashboard! This is where you can see your progress and explore learning modules.",
        text_de: "Willkommen in deinem Dashboard! Hier kannst du deinen Fortschritt sehen und Lernmodule erkunden.",
        text_ar: "مرحبًا بك في لوحة التحكم! هنا يمكنك رؤية تقدمك واستكشاف وحدات التعلم."
      },
      {
        text: "Need help finding resources? Click on 'Learning Modules' to browse all available courses.",
        text_de: "Brauchst du Hilfe bei der Suche nach Ressourcen? Klicke auf 'Lernmodule', um alle verfügbaren Kurse zu durchsuchen.",
        text_ar: "هل تحتاج إلى مساعدة في العثور على الموارد؟ انقر على 'وحدات التعلم' لتصفح جميع الدورات المتاحة."
      },
      {
        text: "You can earn $O tokens by completing modules and activities. These can be redeemed for real benefits!",
        text_de: "Du kannst $O-Token verdienen, indem du Module und Aktivitäten abschließt. Diese können gegen echte Vorteile eingelöst werden!",
        text_ar: "يمكنك كسب رموز $O من خلال إكمال الوحدات والأنشطة. يمكن استبدال هذه مقابل فوائد حقيقية!"
      }
    ],
    learning: [
      {
        text: "Select a module to begin learning. You can track your progress and earn rewards as you complete lessons.",
        text_de: "Wähle ein Modul, um mit dem Lernen zu beginnen. Du kannst deinen Fortschritt verfolgen und Belohnungen verdienen, während du Lektionen abschließt.",
        text_ar: "حدد وحدة للبدء في التعلم. يمكنك تتبع تقدمك وكسب المكافآت أثناء إكمال الدروس."
      },
      {
        text: "Try to complete one module before moving to the next. Building a solid foundation is important!",
        text_de: "Versuche, ein Modul abzuschließen, bevor du zum nächsten übergehst. Eine solide Grundlage aufzubauen ist wichtig!",
        text_ar: "حاول إكمال وحدة واحدة قبل الانتقال إلى الوحدة التالية. بناء أساس متين أمر مهم!"
      },
      {
        text: "Don't forget to claim your $O token rewards after completing a module!",
        text_de: "Vergiss nicht, deine $O-Token-Belohnungen nach Abschluss eines Moduls einzufordern!",
        text_ar: "لا تنس المطالبة بمكافآت رمز $O بعد إكمال وحدة!"
      }
    ],
    wallet: [
      {
        text: "Here you can manage your $O tokens. You need at least 5,000 tokens and a 3-month waiting period to redeem for benefits.",
        text_de: "Hier kannst du deine $O-Token verwalten. Du benötigst mindestens 5.000 Token und eine Wartezeit von 3 Monaten, um sie gegen Vorteile einzulösen.",
        text_ar: "هنا يمكنك إدارة رموز $O الخاصة بك. تحتاج إلى 5000 رمز على الأقل وفترة انتظار مدتها 3 أشهر للاستبدال مقابل الفوائد."
      },
      {
        text: "You can connect a blockchain wallet for more security or use our built-in wallet.",
        text_de: "Du kannst eine Blockchain-Wallet für mehr Sicherheit verbinden oder unsere eingebaute Wallet verwenden.",
        text_ar: "يمكنك ربط محفظة بلوكتشين لمزيد من الأمان أو استخدام محفظتنا المدمجة."
      },
      {
        text: "Transaction history shows all your earned and spent tokens. Keep earning by completing learning modules!",
        text_de: "Der Transaktionsverlauf zeigt alle deine verdienten und ausgegebenen Token. Verdiene weiter, indem du Lernmodule abschließt!",
        text_ar: "يعرض سجل المعاملات جميع الرموز المكتسبة والمنفقة. استمر في الكسب من خلال إكمال وحدات التعلم!"
      }
    ],
    forum: [
      {
        text: "Welcome to our community forum! Here you can connect with others on similar integration journeys.",
        text_de: "Willkommen in unserem Community-Forum! Hier kannst du dich mit anderen auf ähnlichen Integrationsreisen verbinden.",
        text_ar: "مرحبًا بك في منتدى مجتمعنا! هنا يمكنك التواصل مع الآخرين في رحلات الاندماج المماثلة."
      },
      {
        text: "Browse posts in different languages. You can select English, German, or Arabic content.",
        text_de: "Durchsuche Beiträge in verschiedenen Sprachen. Du kannst englische, deutsche oder arabische Inhalte auswählen.",
        text_ar: "تصفح المنشورات بلغات مختلفة. يمكنك تحديد المحتوى باللغة الإنجليزية أو الألمانية أو العربية."
      },
      {
        text: "Don't be shy! Sharing your experiences helps others and builds community.",
        text_de: "Sei nicht schüchtern! Das Teilen deiner Erfahrungen hilft anderen und baut Gemeinschaft auf.",
        text_ar: "لا تكن خجولاً! مشاركة تجاربك تساعد الآخرين وتبني المجتمع."
      }
    ],
    integration: [
      {
        text: "This is your integration journey tracker. Complete each step to progress in your integration process.",
        text_de: "Dies ist dein Integrationsreise-Tracker. Schließe jeden Schritt ab, um im Integrationsprozess voranzukommen.",
        text_ar: "هذا هو متتبع رحلة الاندماج الخاصة بك. أكمل كل خطوة للتقدم في عملية الاندماج."
      },
      {
        text: "Official steps are required by government authorities. Unofficial steps help with social and cultural integration.",
        text_de: "Offizielle Schritte werden von Regierungsbehörden verlangt. Inoffizielle Schritte helfen bei der sozialen und kulturellen Integration.",
        text_ar: "الخطوات الرسمية مطلوبة من قبل السلطات الحكومية. الخطوات غير الرسمية تساعد في الاندماج الاجتماعي والثقافي."
      },
      {
        text: "Don't worry if some steps seem challenging. Take your time and ask for help in the forum if needed!",
        text_de: "Mach dir keine Sorgen, wenn einige Schritte schwierig erscheinen. Nimm dir Zeit und bitte im Forum um Hilfe, wenn nötig!",
        text_ar: "لا تقلق إذا بدت بعض الخطوات صعبة. خذ وقتك واطلب المساعدة في المنتدى إذا لزم الأمر!"
      }
    ],
    profile: [
      {
        text: "Your profile helps you track all your achievements and progress in one place.",
        text_de: "Dein Profil hilft dir, alle deine Erfolge und Fortschritte an einem Ort zu verfolgen.",
        text_ar: "يساعدك ملفك الشخصي على تتبع جميع إنجازاتك وتقدمك في مكان واحد."
      },
      {
        text: "A complete profile helps us provide better recommendations tailored to your needs.",
        text_de: "Ein vollständiges Profil hilft uns, bessere Empfehlungen zu geben, die auf deine Bedürfnisse zugeschnitten sind.",
        text_ar: "يساعدنا الملف الشخصي الكامل على تقديم توصيات أفضل مصممة خصيصًا لاحتياجاتك."
      },
      {
        text: "You can change your language preferences at any time using the language toggle in the top navigation bar.",
        text_de: "Du kannst deine Spracheinstellungen jederzeit über den Sprachumschalter in der oberen Navigationsleiste ändern.",
        text_ar: "يمكنك تغيير تفضيلاتك اللغوية في أي وقت باستخدام مفتاح تبديل اللغة في شريط التنقل العلوي."
      }
    ],
    general: [
      {
        text: "Welcome to Incentigrate! I'm Inti, your friendly assistant. I'm here to help you navigate the platform.",
        text_de: "Willkommen bei Incentigrate! Ich bin Inti, dein freundlicher Assistent. Ich bin hier, um dir bei der Navigation durch die Plattform zu helfen.",
        text_ar: "مرحبًا بك في Incentigrate! أنا إنتي، مساعدك الودود. أنا هنا لمساعدتك في التنقل عبر المنصة."
      },
      {
        text: "You can earn $O tokens by completing learning modules and integration steps. These tokens can be redeemed for real benefits!",
        text_de: "Du kannst $O-Token verdienen, indem du Lernmodule und Integrationsschritte abschließt. Diese Token können gegen echte Vorteile eingelöst werden!",
        text_ar: "يمكنك كسب رموز $O من خلال إكمال وحدات التعلم وخطوات الاندماج. يمكن استبدال هذه الرموز مقابل فوائد حقيقية!"
      },
      {
        text: "Don't forget to check the forum for community support and to share your experiences.",
        text_de: "Vergiss nicht, das Forum für Community-Unterstützung zu besuchen und deine Erfahrungen zu teilen.",
        text_ar: "لا تنس التحقق من المنتدى للحصول على دعم المجتمع ومشاركة تجاربك."
      }
    ]
  };

  // Get current help tip based on context and language
  const getCurrentTip = () => {
    const tips = helpTips[context];
    const tip = tips[tipIndex % tips.length];
    
    if (currentLanguage === 'de') return tip.text_de;
    if (currentLanguage === 'ar') return tip.text_ar;
    return tip.text;
  };

  // Auto-hide the bubble after specified time
  useEffect(() => {
    if (autoShow && autoHideAfter > 0) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, autoHideAfter);
      return () => clearTimeout(timer);
    }
  }, [autoShow, autoHideAfter]);

  // Cycle through tips
  const showNextTip = () => {
    setTipIndex((prev) => (prev + 1) % helpTips[context].length);
  };

  // Handle auto-hide after specified time
  useEffect(() => {
    if (isOpen && autoHideAfter > 0) {
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, autoHideAfter);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoHideAfter]);

  // Function to toggle the assistant
  const toggleAssistant = () => {
    if (isOpen) {
      // When closing bubble, store in sessionStorage for this context only
      sessionStorage.setItem(bubbleKey, 'seen');
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  // Check if this context bubble has been seen before
  const hasBeenSeen = sessionStorage.getItem(bubbleKey) === 'seen';

  return (
    <div className={`fixed ${positionStyles[position]} z-50`}>
      {/* Help Button - Always visible */}
      <motion.button
        onClick={toggleAssistant}
        className={`${sizeStyles[size].iconSize} p-2 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center ${
          !isOpen && pulse && !hasBeenSeen ? 'animate-pulse' : ''
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X /> : <Bot />}
      </motion.button>

      {/* Help Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className={`absolute ${
              position.includes('right') ? 'right-0 mr-16' : 'left-0 ml-16'
            } ${
              position.includes('top') ? 'top-0' : 'bottom-0 mb-16'
            } ${sizeStyles[size].bubbleWidth} bg-white rounded-xl shadow-xl border border-slate-200 p-4`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 text-2xl">
                {characterEmoji}
              </div>
              <div className="flex-grow">
                <div className="font-medium text-slate-800 mb-1">{characterName}</div>
                <p className={`text-slate-600 ${sizeStyles[size].fontSize}`}>
                  {getCurrentTip()}
                </p>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={showNextTip}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <MessageCircle size={14} />
                    {t('continueModule')}
                  </button>
                  <div className="text-xs text-slate-400">
                    {tipIndex + 1}/{helpTips[context].length}
                  </div>
                </div>
              </div>
            </div>
            {/* Chat bubble pointer */}
            <div 
              className={`absolute w-4 h-4 bg-white border-l border-b border-slate-200 transform rotate-45 ${
                position.includes('right') ? 'right-0 -mr-2' : 'left-0 -ml-2'
              } ${
                position.includes('top') ? 'top-4' : 'bottom-4'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}