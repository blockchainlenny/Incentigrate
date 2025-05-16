import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, X, Info, BookOpen, MapPin, Zap } from 'lucide-react';
import ProgressBadge from './ProgressBadge';
import { useAppContext } from '../contexts/AppContext';
import { LearningModule } from '../lib/data';

interface ModuleBadgesProps {
  moduleId: string;
  module: LearningModule;
}

// Interface for a badge's data
interface BadgeData {
  id: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum' | 'master';
  category: 'language' | 'culture' | 'completion' | 'streak' | 'achievement';
  label: string;
  description: string;
  requiredProgress: number; // progress threshold to unlock this badge (0-100)
  xpReward: number;
  tokenReward: number;
}

export default function ModuleBadges({ moduleId, module }: ModuleBadgesProps) {
  const { learningProgress } = useAppContext();
  const [selectedBadge, setSelectedBadge] = useState<BadgeData | null>(null);
  
  // Module progress calculation
  const moduleProgress = learningProgress[moduleId] || { completedSteps: 0, totalSteps: module.lessons.length, claimed: false };
  const progressPercentage = moduleProgress.totalSteps === 0 
    ? 0 
    : Math.round((moduleProgress.completedSteps / moduleProgress.totalSteps) * 100);
  
  // Generate badges based on module type and progress
  const generateBadges = (): BadgeData[] => {
    // Base badges that every module has
    const badges: BadgeData[] = [
      {
        id: `${moduleId}-bronze`,
        type: 'bronze',
        category: 'completion',
        label: 'Getting Started',
        description: 'Started the module and completed at least 25% of lessons',
        requiredProgress: 25,
        xpReward: 50,
        tokenReward: 1
      },
      {
        id: `${moduleId}-silver`,
        type: 'silver',
        category: 'completion',
        label: 'Halfway There',
        description: 'Completed 50% of the module lessons',
        requiredProgress: 50,
        xpReward: 100,
        tokenReward: 2
      },
      {
        id: `${moduleId}-gold`,
        type: 'gold',
        category: 'completion',
        label: 'Almost Complete',
        description: 'Completed 75% of the module lessons',
        requiredProgress: 75,
        xpReward: 200,
        tokenReward: 4
      },
      {
        id: `${moduleId}-platinum`,
        type: 'platinum',
        category: 'completion',
        label: 'Module Complete',
        description: 'Completed all lessons in this module',
        requiredProgress: 100,
        xpReward: 500,
        tokenReward: 10
      }
    ];

    // Add specific badges based on module category
    if (module.category === 'Language') {
      badges.push({
        id: `${moduleId}-language-master`,
        type: 'master',
        category: 'language',
        label: 'Language Master',
        description: 'Completed the module with all perfect scores in assessments',
        requiredProgress: 100, // Only available when module is 100% complete
        xpReward: 1000,
        tokenReward: 20
      });
    } else if (module.category === 'Culture') {
      badges.push({
        id: `${moduleId}-culture-master`,
        type: 'master',
        category: 'culture',
        label: 'Cultural Expert',
        description: 'Demonstrated expert knowledge in cultural topics',
        requiredProgress: 100,
        xpReward: 800,
        tokenReward: 15
      });
    } else if (module.category === 'Professional Skills') {
      badges.push({
        id: `${moduleId}-skills-master`,
        type: 'master',
        category: 'achievement',
        label: 'Professional',
        description: 'Mastered professional skills required for the job market',
        requiredProgress: 100,
        xpReward: 900,
        tokenReward: 18
      });
    } else if (module.category === 'Legal & Bureaucracy') {
      badges.push({
        id: `${moduleId}-legal-master`,
        type: 'master',
        category: 'achievement',
        label: 'Legal Navigator',
        description: 'Successfully navigated complex legal procedures',
        requiredProgress: 100,
        xpReward: 1200,
        tokenReward: 25
      });
    }
    
    return badges;
  };
  
  const badges = generateBadges();
  
  // Get badge state (locked/unlocked and progress)
  const getBadgeProgress = (badge: BadgeData) => {
    // Calculate if badge is unlocked based on module progress
    const isUnlocked = progressPercentage >= badge.requiredProgress;
    
    // Calculate progress towards the badge
    let badgeProgress = 0;
    if (badge.requiredProgress === 0) {
      badgeProgress = 100; // For badges with no progress requirement
    } else if (progressPercentage >= badge.requiredProgress) {
      badgeProgress = 100; // Badge is complete
    } else {
      // Calculate percentage progress towards the next badge
      const prevBadgeRequirement = badges
        .filter(b => b.requiredProgress < badge.requiredProgress)
        .reduce((prev, curr) => (curr.requiredProgress > prev) ? curr.requiredProgress : prev, 0);
      
      const rangeSize = badge.requiredProgress - prevBadgeRequirement;
      const progressInRange = progressPercentage - prevBadgeRequirement;
      
      badgeProgress = Math.round((progressInRange / rangeSize) * 100);
      badgeProgress = Math.max(0, Math.min(99, badgeProgress)); // Cap at 99% if not fully unlocked
    }
    
    return { isUnlocked, badgeProgress };
  };
  
  // Handle badge click to show details
  const handleBadgeClick = (badge: BadgeData) => {
    setSelectedBadge(badge);
  };
  
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Module Badges</h3>
        <div className="flex items-center text-sm text-slate-600">
          <Info className="h-4 w-4 mr-1" />
          <span>Earn badges by completing lessons</span>
        </div>
      </div>
      
      {/* Badge grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-items-center">
        {badges.map(badge => {
          const { isUnlocked, badgeProgress } = getBadgeProgress(badge);
          return (
            <ProgressBadge
              key={badge.id}
              type={badge.type}
              category={badge.category}
              progress={badgeProgress}
              unlocked={isUnlocked}
              size="md"
              label={badge.label}
              animate={true}
              onClick={() => handleBadgeClick(badge)}
            />
          );
        })}
      </div>
      
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
              
              <div className="flex items-start">
                <div className="mr-4">
                  <ProgressBadge
                    type={selectedBadge.type}
                    category={selectedBadge.category}
                    progress={getBadgeProgress(selectedBadge).badgeProgress}
                    unlocked={getBadgeProgress(selectedBadge).isUnlocked}
                    size="lg"
                    animate={false}
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{selectedBadge.label}</h3>
                  <p className="text-slate-600 mb-4">{selectedBadge.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-slate-700">
                      <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                      <span>Required Progress: {selectedBadge.requiredProgress}%</span>
                    </div>
                    
                    <div className="flex items-center text-slate-700">
                      <Zap className="h-5 w-5 text-blue-500 mr-2" />
                      <span>XP Reward: {selectedBadge.xpReward} XP</span>
                    </div>
                    
                    <div className="flex items-center text-slate-700">
                      <Award className="h-5 w-5 text-purple-500 mr-2" />
                      <span>Token Reward: {selectedBadge.tokenReward} $O</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Progress to Badge</span>
                  <span className="text-sm font-medium text-slate-700">
                    {getBadgeProgress(selectedBadge).badgeProgress}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getBadgeProgress(selectedBadge).isUnlocked ? 'bg-green-500' : 'bg-blue-500'}`}
                    style={{ width: `${getBadgeProgress(selectedBadge).badgeProgress}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {getBadgeProgress(selectedBadge).isUnlocked 
                    ? "You've unlocked this badge! Congratulations!" 
                    : `Complete more lessons to earn this badge.`}
                </p>
              </div>
              
              {!getBadgeProgress(selectedBadge).isUnlocked && (
                <button 
                  className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center"
                  onClick={() => {
                    setSelectedBadge(null);
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Continue Learning
                </button>
              )}
              
              {getBadgeProgress(selectedBadge).isUnlocked && (
                <button 
                  className="mt-4 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center justify-center"
                  onClick={() => {
                    // Here we would share or mint the badge as NFT
                    alert('This would mint or share your badge as an NFT!');
                    setSelectedBadge(null);
                  }}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Mint as NFT
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}