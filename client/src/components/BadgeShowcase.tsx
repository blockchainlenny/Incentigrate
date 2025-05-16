import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Info, Award, Trophy, Zap } from 'lucide-react';
import ProgressBadge from './ProgressBadge';
import { useAppContext } from '../contexts/AppContext';
import { learningModules } from '../lib/data';

interface BadgeShowcaseProps {
  showTitle?: boolean;
  maxDisplay?: number;
  onlyUnlocked?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

interface DisplayBadge {
  id: string;
  moduleId: string;
  moduleName: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum' | 'master';
  category: 'language' | 'culture' | 'completion' | 'streak' | 'achievement';
  label: string;
  description: string;
  progress: number;
  unlocked: boolean;
  earnedDate?: string;
  tokenReward: number;
  xpReward: number;
}

export default function BadgeShowcase({ 
  showTitle = true, 
  maxDisplay = 10,
  onlyUnlocked = false,
  size = 'md',
  className = ''
}: BadgeShowcaseProps) {
  const { learningProgress } = useAppContext();
  const [selectedBadge, setSelectedBadge] = useState<DisplayBadge | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Generate badges based on user's learning progress
  const generateBadges = (): DisplayBadge[] => {
    const allBadges: DisplayBadge[] = [];
    
    // Process each module's progress to generate appropriate badges
    learningModules.forEach(module => {
      const moduleProgress = learningProgress[module.id] || { completedSteps: 0, totalSteps: module.lessons.length, claimed: false };
      const progressPercentage = moduleProgress.totalSteps === 0 
        ? 0 
        : Math.round((moduleProgress.completedSteps / moduleProgress.totalSteps) * 100);
      
      // Generate bronze badge (25% completion)
      if (progressPercentage >= 0) {
        allBadges.push({
          id: `${module.id}-bronze`,
          moduleId: module.id,
          moduleName: module.title,
          type: 'bronze',
          category: 'completion',
          label: 'Getting Started',
          description: `Started the "${module.title}" module and completed at least 25% of lessons`,
          progress: progressPercentage >= 25 ? 100 : Math.min(99, (progressPercentage / 25) * 100),
          unlocked: progressPercentage >= 25,
          earnedDate: progressPercentage >= 25 ? '2025-05-12' : undefined,
          tokenReward: 1,
          xpReward: 50
        });
      }
      
      // Generate silver badge (50% completion)
      if (progressPercentage >= 25) {
        allBadges.push({
          id: `${module.id}-silver`,
          moduleId: module.id,
          moduleName: module.title,
          type: 'silver',
          category: 'completion',
          label: 'Halfway There',
          description: `Completed 50% of the "${module.title}" module lessons`,
          progress: progressPercentage >= 50 ? 100 : Math.min(99, ((progressPercentage - 25) / 25) * 100),
          unlocked: progressPercentage >= 50,
          earnedDate: progressPercentage >= 50 ? '2025-05-13' : undefined,
          tokenReward: 2,
          xpReward: 100
        });
      }
      
      // Generate gold badge (75% completion)
      if (progressPercentage >= 50) {
        allBadges.push({
          id: `${module.id}-gold`,
          moduleId: module.id,
          moduleName: module.title,
          type: 'gold',
          category: 'completion',
          label: 'Almost Complete',
          description: `Completed 75% of the "${module.title}" module lessons`,
          progress: progressPercentage >= 75 ? 100 : Math.min(99, ((progressPercentage - 50) / 25) * 100),
          unlocked: progressPercentage >= 75,
          earnedDate: progressPercentage >= 75 ? '2025-05-14' : undefined,
          tokenReward: 5,
          xpReward: 200
        });
      }
      
      // Generate platinum badge (100% completion)
      if (progressPercentage >= 75) {
        allBadges.push({
          id: `${module.id}-platinum`,
          moduleId: module.id,
          moduleName: module.title,
          type: 'platinum',
          category: 'completion',
          label: 'Module Complete',
          description: `Completed all lessons in the "${module.title}" module`,
          progress: progressPercentage >= 100 ? 100 : Math.min(99, ((progressPercentage - 75) / 25) * 100),
          unlocked: progressPercentage >= 100,
          earnedDate: progressPercentage >= 100 ? '2025-05-15' : undefined,
          tokenReward: 10,
          xpReward: 500
        });
      }
      
      // Generate master badge if module is complete
      if (progressPercentage >= 100 && moduleProgress.claimed) {
        const masterCategory = module.category === 'Language' 
          ? 'language' 
          : module.category === 'Culture' 
            ? 'culture' 
            : 'achievement';
            
        const masterLabel = module.category === 'Language' 
          ? 'Language Master' 
          : module.category === 'Culture' 
            ? 'Cultural Expert' 
            : 'Skills Master';
            
        allBadges.push({
          id: `${module.id}-master`,
          moduleId: module.id,
          moduleName: module.title,
          type: 'master',
          category: masterCategory,
          label: masterLabel,
          description: `Mastered all content in the "${module.title}" module and claimed rewards`,
          progress: 100,
          unlocked: true,
          earnedDate: '2025-05-16',
          tokenReward: 20,
          xpReward: 1000
        });
      }
    });
    
    // Special achievement badges
    if (Object.keys(learningProgress).length >= 3) {
      allBadges.push({
        id: 'multi-learner',
        moduleId: 'special',
        moduleName: 'Special Achievement',
        type: 'gold',
        category: 'achievement',
        label: 'Multi-Module Learner',
        description: 'Started learning in at least 3 different modules',
        progress: 100,
        unlocked: true,
        earnedDate: '2025-05-10',
        tokenReward: 5,
        xpReward: 250
      });
    }
    
    // Check if any module is 100% complete
    const hasCompletedModule = Object.values(learningProgress).some(
      module => (module.completedSteps / module.totalSteps) >= 1
    );
    
    if (hasCompletedModule) {
      allBadges.push({
        id: 'first-completion',
        moduleId: 'special',
        moduleName: 'Special Achievement',
        type: 'platinum',
        category: 'achievement',
        label: 'First Module Mastery',
        description: 'Completed your first module at 100%',
        progress: 100,
        unlocked: true,
        earnedDate: '2025-05-15',
        tokenReward: 15,
        xpReward: 500
      });
    }
    
    // Add streak badges
    allBadges.push({
      id: 'three-day-streak',
      moduleId: 'streak',
      moduleName: 'Learning Streak',
      type: 'bronze',
      category: 'streak',
      label: '3-Day Streak',
      description: 'Logged in and completed lessons for 3 consecutive days',
      progress: 100,
      unlocked: true,
      earnedDate: '2025-05-08',
      tokenReward: 3,
      xpReward: 150
    });
    
    allBadges.push({
      id: 'seven-day-streak',
      moduleId: 'streak',
      moduleName: 'Learning Streak',
      type: 'silver',
      category: 'streak',
      label: '7-Day Streak',
      description: 'Logged in and completed lessons for a full week',
      progress: 100,
      unlocked: true,
      earnedDate: '2025-05-12',
      tokenReward: 7,
      xpReward: 350
    });
    
    // Filter badges if needed
    if (onlyUnlocked) {
      return allBadges.filter(badge => badge.unlocked);
    }
    
    return allBadges;
  };
  
  const badges = generateBadges();
  const badgesPerPage = Math.min(maxDisplay, 10);
  const totalPages = Math.ceil(badges.length / badgesPerPage);
  
  const displayBadges = badges.slice(
    currentPage * badgesPerPage, 
    (currentPage + 1) * badgesPerPage
  );
  
  // Handle badge click to show details
  const handleBadgeClick = (badge: DisplayBadge) => {
    setSelectedBadge(badge);
  };
  
  // Pagination controls
  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Earned Badges
          </h3>
          
          <div className="text-sm text-slate-600 flex items-center">
            <Info className="w-4 h-4 mr-1" />
            <span>Displaying {Math.min(badges.length, maxDisplay)} of {badges.length} badges</span>
          </div>
        </div>
      )}
      
      {badges.length === 0 ? (
        <div className="bg-slate-50 rounded-lg p-6 text-center">
          <Trophy className="h-12 w-12 text-slate-300 mx-auto mb-2" />
          <h4 className="text-lg font-medium text-slate-700 mb-1">No badges yet</h4>
          <p className="text-slate-500">Complete lessons and modules to earn badges</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-items-center">
            {displayBadges.map(badge => (
              <ProgressBadge
                key={badge.id}
                type={badge.type}
                category={badge.category}
                progress={badge.progress}
                unlocked={badge.unlocked}
                size={size}
                label={badge.label}
                animate={false}
                onClick={() => handleBadgeClick(badge)}
              />
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className={`p-1 rounded-full ${
                  currentPage === 0 
                    ? 'text-slate-300 cursor-not-allowed' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <span className="text-sm text-slate-600">
                Page {currentPage + 1} of {totalPages}
              </span>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className={`p-1 rounded-full ${
                  currentPage === totalPages - 1 
                    ? 'text-slate-300 cursor-not-allowed' 
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Badge detail modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl max-w-md w-full p-6 relative"
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                onClick={() => setSelectedBadge(null)}
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className="mr-4 mb-4 sm:mb-0">
                  <ProgressBadge
                    type={selectedBadge.type}
                    category={selectedBadge.category}
                    progress={selectedBadge.progress}
                    unlocked={selectedBadge.unlocked}
                    size="lg"
                    animate={false}
                  />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{selectedBadge.label}</h3>
                  <p className="text-sm text-slate-500 mb-1">{selectedBadge.moduleName}</p>
                  <p className="text-slate-600 mb-4">{selectedBadge.description}</p>
                  
                  <div className="space-y-3">
                    {selectedBadge.earnedDate && (
                      <div className="flex items-center text-slate-700 justify-center sm:justify-start">
                        <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                        <span>Earned on: {selectedBadge.earnedDate}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-slate-700 justify-center sm:justify-start">
                      <Zap className="h-5 w-5 text-blue-500 mr-2" />
                      <span>XP Reward: {selectedBadge.xpReward} XP</span>
                    </div>
                    
                    <div className="flex items-center text-slate-700 justify-center sm:justify-start">
                      <Award className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Token Reward: {selectedBadge.tokenReward} $O</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Badge Status</span>
                  <span className="text-sm font-medium text-slate-700">
                    {selectedBadge.progress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${selectedBadge.unlocked ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${selectedBadge.progress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {selectedBadge.unlocked 
                    ? "You've unlocked this badge! Congratulations!" 
                    : `Continue working on ${selectedBadge.moduleName} to unlock this badge.`}
                </p>
              </div>
              
              {selectedBadge.unlocked && (
                <button 
                  className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center"
                  onClick={() => {
                    setSelectedBadge(null);
                  }}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Share Badge
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}