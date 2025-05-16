import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { motion } from 'framer-motion';
import { 
  Compass, BookOpen, GraduationCap, Briefcase, LayoutDashboard, 
  ArrowRight, Zap, Award, Map, Calendar, ArrowUpRight, ChevronRight,
  Info, Check
} from 'lucide-react';
import { 
  learningModules, 
  LearningModule, 
  getAllLearningModules,
  integrationStepsGermany,
  IntegrationStep
} from '../lib/data';

interface RecommendationItem {
  id: string;
  type: 'module' | 'step' | 'quest';
  title: string;
  description: string;
  icon: React.ReactNode;
  priority: number; // 1-10 with 10 being highest priority
  category: string;
  xpReward: number;
  tokenReward: number;
  estimatedTime: string;
  reason: string;
  progress?: number; // 0-100
  action: string;
  actionRoute: string;
  actionParams?: any;
  tags?: string[];
}

type FilterType = 'all' | 'quick-wins' | 'career' | 'language' | 'integration' | 'social';

interface PersonalizedRecommendationsProps {
  navigateTo: (view: string, id?: string, title?: string) => void;
}

export default function PersonalizedRecommendations({ navigateTo }: PersonalizedRecommendationsProps) {
  const { isLoggedIn, learningProgress } = useAppContext();
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');
  const [expandedReasons, setExpandedReasons] = useState<string[]>([]);

  // Generate personalized recommendations based on user progress and profile
  useEffect(() => {
    if (!isLoggedIn) {
      setRecommendations([]);
      setLoading(false);
      return;
    }

    // Simulate a loading delay for realism
    const timer = setTimeout(() => {
      const generatedRecommendations = generateRecommendations();
      setRecommendations(generatedRecommendations);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLoggedIn, learningProgress]);

  const generateRecommendations = (): RecommendationItem[] => {
    const allRecommendations: RecommendationItem[] = [];
    
    // Analyze the user's learning progress
    const inProgressModules = Object.entries(learningProgress)
      .filter(([_, progress]) => progress.completedSteps > 0 && progress.completedSteps < progress.totalSteps)
      .map(([moduleId, _]) => moduleId);
    
    const completedModules = Object.entries(learningProgress)
      .filter(([_, progress]) => progress.completedSteps === progress.totalSteps)
      .map(([moduleId, _]) => moduleId);
    
    // Find modules not started yet
    const allModuleIds = learningModules.map(module => module.id);
    const notStartedModules = allModuleIds.filter(
      id => !inProgressModules.includes(id) && !completedModules.includes(id)
    );
    
    // Recommend continuing in-progress modules first (high priority)
    inProgressModules.forEach(moduleId => {
      const module = learningModules.find(m => m.id === moduleId);
      if (!module) return;
      
      const progress = learningProgress[moduleId];
      const progressPercentage = Math.round((progress.completedSteps / progress.totalSteps) * 100);
      
      // Higher priority for modules that are close to completion
      const priorityBoost = progressPercentage > 50 ? 2 : 0;
      
      allRecommendations.push({
        id: `continue-${moduleId}`,
        type: 'module',
        title: `Continue: ${module.title}`,
        description: `You're ${progressPercentage}% through this module. Continue learning to earn rewards.`,
        icon: <BookOpen className="h-5 w-5 text-blue-500" />,
        priority: 8 + priorityBoost, // High priority for in-progress modules
        category: module.category,
        xpReward: Math.round((module.totalXp * (100 - progressPercentage)) / 100), // Remaining XP
        tokenReward: Math.round((module.reward * (100 - progressPercentage)) / 100), // Remaining tokens
        estimatedTime: module.duration,
        reason: `You've already made progress on this module. Completing it will help you build momentum and earn the full rewards. Your current progress is ${progressPercentage}%, so you're well on your way!`,
        progress: progressPercentage,
        action: "Continue Module",
        actionRoute: "single_module",
        actionParams: { moduleId, moduleTitle: module.title }
      });
    });
    
    // Recommend new modules based on completed ones (medium-high priority)
    // This looks for related modules to what the user has already completed
    if (completedModules.length > 0) {
      // Get categories of completed modules
      const completedCategories = completedModules
        .map(id => learningModules.find(m => m.id === id)?.category)
        .filter(Boolean) as string[];
      
      // Find not started modules in the same categories
      const relatedModules = notStartedModules
        .map(id => learningModules.find(m => m.id === id))
        .filter(Boolean) as LearningModule[];
      
      const categoryBasedRecommendations = relatedModules
        .filter(module => completedCategories.includes(module.category))
        .slice(0, 3);
      
      categoryBasedRecommendations.forEach(module => {
        allRecommendations.push({
          id: `new-${module.id}`,
          type: 'module',
          title: module.title,
          description: module.description,
          icon: <GraduationCap className="h-5 w-5 text-green-500" />,
          priority: 7, // Medium-high priority
          category: module.category,
          xpReward: module.totalXp,
          tokenReward: module.reward,
          estimatedTime: module.duration,
          reason: `Based on your completion of other ${module.category} modules, this would be a great next step to further develop your skills in this area.`,
          action: "Start Module",
          actionRoute: "single_module",
          actionParams: { moduleId: module.id, moduleTitle: module.title },
          tags: module.tags
        });
      });
    }
    
    // Recommend integration steps based on language progress (medium priority)
    const languageModulesProgress = Object.entries(learningProgress)
      .filter(([moduleId, _]) => {
        const module = learningModules.find(m => m.id === moduleId);
        return module?.category === 'Language';
      });
    
    const hasLanguageProgress = languageModulesProgress.length > 0;
    
    if (hasLanguageProgress) {
      // Recommend integration steps related to language skills
      const relevantSteps = integrationStepsGermany
        .filter(step => step.category === 'Language & Education')
        .slice(0, 2);
      
      relevantSteps.forEach(step => {
        allRecommendations.push({
          id: `step-${step.id}`,
          type: 'step',
          title: step.title,
          description: step.description,
          icon: <Map className="h-5 w-5 text-purple-500" />,
          priority: 6, // Medium priority
          category: 'Integration Steps',
          xpReward: step.points || 100,
          tokenReward: step.rewardToken || 5,
          estimatedTime: step.estimatedTime,
          reason: `You've been learning language skills, and this integration step will help you apply those skills in a practical situation. This is a key step in your integration journey.`,
          action: "View Integration Step",
          actionRoute: "integration_journey",
          actionParams: {}
        });
      });
    }
    
    // Add some diverse recommendations for users with little progress (low-medium priority)
    if (inProgressModules.length + completedModules.length < 3) {
      // Recommend a mix of different categories
      const categoryMix = ['Language', 'Culture', 'Professional Skills', 'Legal & Bureaucracy'];
      
      categoryMix.forEach(category => {
        const moduleInCategory = learningModules
          .filter(m => m.category === category && notStartedModules.includes(m.id))
          .slice(0, 1)[0];
        
        if (moduleInCategory) {
          allRecommendations.push({
            id: `mix-${moduleInCategory.id}`,
            type: 'module',
            title: moduleInCategory.title,
            description: moduleInCategory.description,
            icon: <Compass className="h-5 w-5 text-amber-500" />,
            priority: 5, // Medium-low priority
            category: moduleInCategory.category,
            xpReward: moduleInCategory.totalXp,
            tokenReward: moduleInCategory.reward,
            estimatedTime: moduleInCategory.duration,
            reason: `A well-balanced integration journey includes learning about ${moduleInCategory.category.toLowerCase()}. This module will help broaden your understanding in this important area.`,
            action: "Explore Module",
            actionRoute: "single_module",
            actionParams: { moduleId: moduleInCategory.id, moduleTitle: moduleInCategory.title },
            tags: moduleInCategory.tags
          });
        }
      });
    }
    
    // Add integration quests (special recommendations)
    // These would connect to our quest system
    allRecommendations.push({
      id: 'quest-community',
      type: 'quest',
      title: 'Connect with Your Community',
      description: 'Join a local meetup or community event to practice your skills and make connections.',
      icon: <Award className="h-5 w-5 text-indigo-500" />,
      priority: 6, // Medium priority
      category: 'Community',
      xpReward: 250,
      tokenReward: 15,
      estimatedTime: '2-3 hours',
      reason: 'Building a support network is crucial for successful integration. This quest will help you connect with others on similar journeys and practice your language skills in a real-world setting.',
      action: "View Quest",
      actionRoute: "quests",
      actionParams: {}
    });
    
    // Add time-sensitive recommendations
    const currentDate = new Date();
    if (currentDate.getMonth() === 4) { // May
      allRecommendations.push({
        id: 'quest-seasonal',
        type: 'quest',
        title: 'Spring Cultural Events',
        description: 'Explore local spring festivals and cultural events happening this month.',
        icon: <Calendar className="h-5 w-5 text-green-500" />,
        priority: 7, // Medium-high due to timeliness
        category: 'Cultural Events',
        xpReward: 200,
        tokenReward: 12,
        estimatedTime: '4-6 hours',
        reason: 'Seasonal events are excellent opportunities to experience local culture firsthand. May is a month rich with cultural activities in many regions. Participating now means you won\'t miss these annual events.',
        action: "See Events",
        actionRoute: "quests",
        actionParams: {}
      });
    }
    
    // Add "quick wins" for users looking for immediate progress
    allRecommendations.push({
      id: 'quick-win-profile',
      type: 'quest',
      title: 'Complete Your Profile',
      description: 'Add work experience, education, and skills to your Incentigrate profile.',
      icon: <Zap className="h-5 w-5 text-yellow-500" />,
      priority: 5, // Medium-low priority
      category: 'Quick Win',
      xpReward: 100,
      tokenReward: 5,
      estimatedTime: '15 min',
      reason: 'A complete profile helps us provide better recommendations and increases your visibility to potential employers and community members. This is a simple task that yields immediate rewards.',
      action: "Update Profile",
      actionRoute: "user_profile",
      actionParams: {}
    });
    
    // Sort recommendations by priority (highest first)
    const sortedRecommendations = allRecommendations.sort((a, b) => b.priority - a.priority);
    
    return sortedRecommendations;
  };

  // Filter recommendations based on selected category
  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true;
    if (filter === 'quick-wins') return rec.estimatedTime.includes('min') || rec.priority < 6;
    if (filter === 'career') return rec.category === 'Professional Skills' || rec.title.toLowerCase().includes('job') || rec.description.toLowerCase().includes('job');
    if (filter === 'language') return rec.category === 'Language' || rec.category === 'Language & Education';
    if (filter === 'integration') return rec.type === 'step' || rec.category === 'Legal & Bureaucracy';
    if (filter === 'social') return rec.category === 'Community' || rec.category === 'Cultural Events' || rec.category === 'Culture';
    return true;
  });

  // Toggle explanation for a recommendation
  const toggleReason = (id: string) => {
    setExpandedReasons(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  // Handle click on recommendation action
  const handleActionClick = (recommendation: RecommendationItem) => {
    navigateTo(
      recommendation.actionRoute, 
      recommendation.actionParams?.moduleId, 
      recommendation.actionParams?.moduleTitle
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
        <Compass className="h-12 w-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-slate-800 mb-2">Connect to Get Personalized Recommendations</h3>
        <p className="text-slate-600 mb-4">
          Sign in or connect your wallet to receive tailored learning path recommendations based on your progress and goals.
        </p>
        <button
          onClick={() => navigateTo('wallet')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <Compass className="h-6 w-6 mr-2 text-blue-600" />
          Your Learning Path
        </h2>
        
        <button 
          onClick={() => setLoading(true)}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowUpRight className="h-4 w-4 mr-1" />
          Refresh
        </button>
      </div>
      
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All Recommendations
        </button>
        
        <button
          onClick={() => setFilter('quick-wins')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'quick-wins' 
              ? 'bg-yellow-500 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Quick Wins
        </button>
        
        <button
          onClick={() => setFilter('language')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'language' 
              ? 'bg-green-600 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Language Skills
        </button>
        
        <button
          onClick={() => setFilter('integration')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'integration' 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Integration Steps
        </button>
        
        <button
          onClick={() => setFilter('career')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'career' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Career Skills
        </button>
        
        <button
          onClick={() => setFilter('social')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${
            filter === 'social' 
              ? 'bg-pink-600 text-white' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Social & Culture
        </button>
      </div>
      
      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="mt-6 h-10 bg-slate-200 rounded w-40"></div>
          </div>
        </div>
      ) : filteredRecommendations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 text-center">
          <Compass className="h-12 w-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-slate-700 mb-1">No recommendations found</h3>
          <p className="text-slate-500 mb-3">
            Try selecting a different filter or check back later.
          </p>
          <button 
            onClick={() => setFilter('all')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Show All Recommendations
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecommendations.map((recommendation) => (
            <motion.div
              key={recommendation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start">
                  <div className="flex-shrink-0 rounded-lg p-2 mr-4">
                    {recommendation.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">{recommendation.title}</h3>
                        <p className="text-slate-600 text-sm">{recommendation.description}</p>
                      </div>
                      
                      <div className="ml-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          recommendation.type === 'module' ? 'bg-blue-100 text-blue-800' :
                          recommendation.type === 'step' ? 'bg-purple-100 text-purple-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {recommendation.type === 'module' ? 'Module' :
                           recommendation.type === 'step' ? 'Integration Step' :
                           'Quest'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <span className="flex items-center text-slate-600">
                        <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                        {recommendation.estimatedTime}
                      </span>
                      
                      <span className="flex items-center text-blue-600">
                        <Zap className="h-4 w-4 mr-1" />
                        {recommendation.xpReward} XP
                      </span>
                      
                      <span className="flex items-center text-purple-600">
                        <Award className="h-4 w-4 mr-1" />
                        {recommendation.tokenReward} $O
                      </span>
                      
                      <span className="flex items-center text-slate-600">
                        <LayoutDashboard className="h-4 w-4 mr-1 text-slate-400" />
                        {recommendation.category}
                      </span>
                    </div>
                    
                    {recommendation.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{recommendation.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div 
                            className="h-1.5 rounded-full bg-blue-500"
                            style={{ width: `${recommendation.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {recommendation.tags && recommendation.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {recommendation.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <button 
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    onClick={() => toggleReason(recommendation.id)}
                  >
                    <Info className="h-4 w-4 mr-1" />
                    {expandedReasons.includes(recommendation.id) ? 'Hide explanation' : 'Why is this recommended?'}
                  </button>
                  
                  <button
                    onClick={() => handleActionClick(recommendation)}
                    className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center justify-center sm:justify-start"
                  >
                    {recommendation.action}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
                
                {expandedReasons.includes(recommendation.id) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-200"
                  >
                    <p className="text-sm text-slate-600">{recommendation.reason}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="bg-indigo-50 rounded-lg border border-indigo-100 p-4 text-sm">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="ml-3">
            <p className="text-indigo-700">
              Recommendations are personalized based on your learning patterns, progress, and integration needs.
              They're updated regularly as you complete modules and earn badges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}