import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { learningModules } from '../lib/data';
import { 
  Gem, GraduationCap, BookOpen, MapPin, Clock, Trophy, Calendar,
  Footprints, Lightbulb, CheckCircle, Medal, Users, Award, Flame,
  Smile, PartyPopper, Star, MessageCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import PersonalizedRecommendations from './PersonalizedRecommendations';
import AnimatedIcon from './AnimatedIcon';

interface DashboardProps {
  navigateTo: (view: any, moduleId?: string, moduleTitle?: string) => void;
}

export default function Dashboard({ navigateTo }: DashboardProps) {
  const { isLoggedIn, userName, oTokenBalance, learningProgress } = useAppContext();

  // Calculate total progress metrics
  const totalProgressData = Object.values(learningProgress).reduce(
    (acc, module) => {
      acc.completed += module.completedSteps;
      acc.total += module.totalSteps;
      if (module.claimed) acc.modulesClaimed++;
      return acc;
    },
    { completed: 0, total: 0, modulesClaimed: 0 }
  );

  // Get recommended modules (simple logic - first 2 modules or incomplete ones)
  const recommendedModules = learningModules
    .filter(module => 
      !learningProgress[module.id] || 
      (learningProgress[module.id]?.completedSteps < learningProgress[module.id]?.totalSteps)
    )
    .slice(0, 2);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {isLoggedIn ? `Welcome back, ${userName}!` : 'Welcome to Incentigrate!'}
            </h1>
            <p className="text-slate-600 mt-1">Your integration journey assistant</p>
          </div>
          
          {isLoggedIn && (
            <div className="mt-4 md:mt-0 px-4 py-2 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center gap-2">
              <Gem className="h-5 w-5 text-teal-500" />
              <span className="font-bold text-teal-600">{oTokenBalance}</span>
              <span className="text-slate-600">$O Tokens</span>
            </div>
          )}
        </div>
        
        {!isLoggedIn ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
              <h2 className="text-lg font-medium text-slate-800 mb-3 flex items-center">
                <GraduationCap className="h-5 w-5 text-blue-500 mr-2" />
                Start Your Integration Journey
              </h2>
              <p className="text-slate-600 mb-4">
                Incentigrate helps refugees with language learning, career development, and community integration - all while earning rewards.
              </p>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigateTo('wallet')}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-md transition-all flex items-center justify-center"
              >
                <Smile className="h-5 w-5 mr-2" />
                Connect Wallet & Start Earning
              </motion.button>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-slate-800 flex items-center">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  Key Platform Features
                </h3>
                <motion.div 
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    transition: { duration: 1.5, repeat: Infinity, repeatDelay: 3 }
                  }}
                >
                  <Star className="h-5 w-5 text-amber-400" />
                </motion.div>
              </div>
              <ul className="space-y-2.5">
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Interactive language and integration modules</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Earn tokens for completing integration activities</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Connect with community support in multiple languages</span>
                </li>
                <li className="flex items-center text-slate-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                  <span>Track your integration progress with helpful guides</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center cursor-pointer"
              onClick={() => navigateTo('module_list')}
            >
              <AnimatedIcon 
                icon={<GraduationCap />}
                size="lg"
                color="text-blue-500" 
                hoverEffect="bounce"
                className="mb-2"
              />
              <p className="text-sm text-slate-500">Learning Modules</p>
              <p className="text-2xl font-bold text-slate-800">{learningModules.length}</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center cursor-pointer"
              onClick={() => navigateTo('module_list')}
            >
              <AnimatedIcon 
                icon={<Trophy />}
                size="lg"
                color="text-amber-500" 
                hoverEffect="pulse"
                className="mb-2"
                autoAnimate={totalProgressData.modulesClaimed > 0}
                interval={5000}
              />
              <p className="text-sm text-slate-500">Modules Completed</p>
              <p className="text-2xl font-bold text-slate-800">{totalProgressData.modulesClaimed}</p>
              {totalProgressData.modulesClaimed > 0 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-1 px-2 py-0.5 bg-amber-100 rounded-full"
                >
                  <span className="text-xs font-medium text-amber-700 flex items-center">
                    <Smile className="h-3 w-3 mr-1" />
                    Great progress!
                  </span>
                </motion.div>
              )}
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-pointer"
              onClick={() => navigateTo('module_list')}
            >
              <div className="flex flex-col items-center">
                <AnimatedIcon 
                  icon={<BookOpen />}
                  size="lg"
                  color="text-teal-500" 
                  hoverEffect="wiggle"
                  className="mb-2"
                />
                <p className="text-sm text-slate-500">Progress Status</p>
                <motion.p 
                  className="text-2xl font-bold text-slate-800"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    transition: { 
                      duration: 0.5, 
                      repeat: totalProgressData.completed > 0 ? 1 : 0, 
                      repeatDelay: 1 
                    }
                  }}
                >
                  {totalProgressData.total === 0 
                    ? '0%' 
                    : Math.round((totalProgressData.completed / totalProgressData.total) * 100) + '%'
                  }
                </motion.p>
                {totalProgressData.completed > 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center mt-1 text-xs font-medium text-teal-600"
                  >
                    <PartyPopper className="h-3 w-3 mr-1" />
                    <span>Keep it up!</span>
                  </motion.div>
                )}
              </div>
              
              {/* Active modules progress indicator */}
              <div className="mt-2 pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-600 mb-1 flex justify-between">
                  <span>Active Modules Progress:</span>
                  <span className="font-medium">
                    {Object.entries(learningProgress)
                      .filter(([_, module]) => module.completedSteps < module.totalSteps)
                      .length} active
                  </span>
                </div>
                {Object.entries(learningProgress)
                  .filter(([_, module]) => module.completedSteps < module.totalSteps)
                  .slice(0, 2)
                  .map(([moduleId, module]) => {
                    const moduleInfo = learningModules.find(m => m.id === moduleId);
                    const progressPercent = Math.round((module.completedSteps / module.totalSteps) * 100);
                    
                    return moduleInfo ? (
                      <div key={moduleId} className="mb-1.5">
                        <div className="flex justify-between text-xs mb-0.5">
                          <span className="truncate text-slate-700" style={{maxWidth: '80%'}}>{moduleInfo.title}</span>
                          <span className="text-slate-600">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5">
                          <div 
                            className="bg-teal-500 h-1.5 rounded-full" 
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : null;
                  })
                }
                {Object.entries(learningProgress)
                  .filter(([_, module]) => module.completedSteps < module.totalSteps)
                  .length > 2 && (
                    <div className="text-xs text-blue-600 mt-1 text-center">
                      <button onClick={() => navigateTo('module_list')}>
                        View all active modules
                      </button>
                    </div>
                  )}
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center"
            >
              <AnimatedIcon 
                icon={<Calendar />}
                size="lg"
                color="text-purple-500" 
                hoverEffect="bounce"
                className="mb-2"
              />
              <p className="text-sm text-slate-500">Member Since</p>
              <p className="text-2xl font-bold text-slate-800">May 2023</p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-1 px-2 py-0.5 bg-purple-100 rounded-full"
              >
                <span className="text-xs font-medium text-purple-700 flex items-center">
                  <Star className="h-3 w-3 mr-1" />
                  2 Years Strong!
                </span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Quick Access Section - Dynamically changes based on login state */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium text-slate-800 flex items-center">
            <Lightbulb className="h-5 w-5 mr-2 text-blue-500" />
            {isLoggedIn ? "Continue Your Journey" : "Explore Features"}
          </h2>
          {isLoggedIn && (
            <div className="px-2 py-1 bg-blue-100 rounded-md text-xs font-medium text-blue-700 flex items-center">
              <Flame className="h-3 w-3 mr-1" />
              {totalProgressData.completed > 0 ? `${totalProgressData.completed} activities completed` : "Start your first activity"}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {isLoggedIn ? (
            // When logged in, show personalized quick access cards with progress
            <>
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                onClick={() => navigateTo('module_list')}
                className="relative bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200 transition-shadow cursor-pointer"
              >
                <div className="flex items-center mb-2">
                  <AnimatedIcon 
                    icon={<BookOpen />}
                    size="md"
                    color="text-blue-600" 
                    hoverEffect="pulse"
                  />
                  <h3 className="ml-2 font-medium text-slate-800">Learning Modules</h3>
                </div>
                
                {/* Most recent module or recommended next module */}
                {recommendedModules.length > 0 && (
                  <div className="mt-2 p-2 bg-white rounded-md border border-blue-200">
                    <div className="text-xs font-medium text-blue-800 mb-1">Recommended Next:</div>
                    <div className="font-medium text-sm text-slate-700">{recommendedModules[0].title}</div>
                    <div className="flex items-center mt-1.5">
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mr-2">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${learningProgress[recommendedModules[0].id]?.completedSteps 
                            ? Math.round((learningProgress[recommendedModules[0].id].completedSteps / recommendedModules[0].totalLessons) * 100) 
                            : 0}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {learningProgress[recommendedModules[0].id]?.completedSteps || 0}/{recommendedModules[0].totalLessons}
                      </span>
                    </div>
                  </div>
                )}
                
                <motion.div 
                  className="absolute top-2 right-2 bg-blue-200 rounded-full p-1"
                  whileHover={{ rotate: 15 }}
                >
                  <BookOpen className="h-4 w-4 text-blue-700" />
                </motion.div>
              </motion.div>
            
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                onClick={() => navigateTo('integration_journey')}
                className="relative bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200 transition-shadow cursor-pointer"
              >
                <div className="flex items-center mb-2">
                  <AnimatedIcon 
                    icon={<MapPin />}
                    size="md"
                    color="text-green-600" 
                    hoverEffect="bounce"
                  />
                  <h3 className="ml-2 font-medium text-slate-800">Step Tracker</h3>
                </div>
                
                <div className="mt-2 p-2 bg-white rounded-md border border-green-200">
                  <div className="text-xs font-medium text-green-800 mb-1">Recent Integration Steps:</div>
                  <ul className="space-y-1">
                    <li className="flex items-center text-xs text-slate-600">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                      <span className="truncate">Application registration completed</span>
                    </li>
                    <li className="flex items-center text-xs text-slate-600">
                      <MapPin className="h-3 w-3 text-amber-500 mr-1 flex-shrink-0" />
                      <span className="truncate">Language course enrollment pending</span>
                    </li>
                  </ul>
                </div>
                
                <motion.div 
                  className="absolute top-2 right-2 bg-green-200 rounded-full p-1"
                  whileHover={{ rotate: 15 }}
                >
                  <Footprints className="h-4 w-4 text-green-700" />
                </motion.div>
              </motion.div>
              
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                onClick={() => navigateTo('forum')}
                className="relative bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-lg border border-amber-200 transition-shadow cursor-pointer"
              >
                <div className="flex items-center mb-2">
                  <AnimatedIcon 
                    icon={<Users />}
                    size="md"
                    color="text-amber-600" 
                    hoverEffect="wiggle"
                  />
                  <h3 className="ml-2 font-medium text-slate-800">Community Forum</h3>
                </div>
                
                <div className="mt-2 p-2 bg-white rounded-md border border-amber-200">
                  <div className="text-xs font-medium text-amber-800 mb-1">Recent Discussions:</div>
                  <div className="text-sm text-slate-700">Housing options in Berlin</div>
                  <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
                    <span>12 new replies</span>
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      38 participants
                    </span>
                  </div>
                </div>
                
                <motion.div 
                  className="absolute top-2 right-2 bg-amber-200 rounded-full p-1"
                  whileHover={{ rotate: 15 }}
                >
                  <MessageCircle className="h-4 w-4 text-amber-700" />
                </motion.div>
              </motion.div>
            </>
          ) : (
            // When not logged in, show feature highlights
            <>
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg border border-blue-200 transition-shadow"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <AnimatedIcon 
                      icon={<GraduationCap />}
                      size="md"
                      color="text-blue-600" 
                      hoverEffect="pulse"
                      autoAnimate={true}
                    />
                  </div>
                </div>
                <h3 className="text-center font-medium text-slate-800 mb-2">Language Learning</h3>
                <p className="text-center text-slate-600 text-sm">
                  Interactive modules to learn languages essential for daily life and work.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                className="bg-gradient-to-br from-green-50 to-green-100 p-5 rounded-lg border border-green-200 transition-shadow"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <AnimatedIcon 
                      icon={<Gem />}
                      size="md"
                      color="text-green-600" 
                      hoverEffect="bounce"
                      autoAnimate={true}
                    />
                  </div>
                </div>
                <h3 className="text-center font-medium text-slate-800 mb-2">Token Rewards</h3>
                <p className="text-center text-slate-600 text-sm">
                  Earn $O tokens for completing integration steps and learning activities.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg border border-purple-200 transition-shadow"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-white rounded-full shadow-sm">
                    <AnimatedIcon 
                      icon={<Award />}
                      size="md"
                      color="text-purple-600" 
                      hoverEffect="wiggle"
                      autoAnimate={true}
                    />
                  </div>
                </div>
                <h3 className="text-center font-medium text-slate-800 mb-2">Achievement Badges</h3>
                <p className="text-center text-slate-600 text-sm">
                  Collect badges that showcase your skills and integration milestones.
                </p>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* New Learning Features */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-medium text-slate-800 mb-4">New Learning Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Duolingo-Style Lessons */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-lg border border-blue-200 bg-blue-50"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <AnimatedIcon 
                  icon={<Lightbulb />}
                  size="sm"
                  color="text-blue-600" 
                  hoverEffect="pulse"
                  autoAnimate={true}
                  interval={4000}
                />
              </div>
              <h3 className="ml-3 font-medium text-slate-800">Interactive Lessons</h3>
            </div>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded inline-block mb-2">
              New Feature
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Learn with fun, interactive exercises in a Duolingo-style interface. Practice language skills and earn rewards as you progress.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('duolingo_lesson')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Try a Lesson
            </motion.button>
          </motion.div>
          
          {/* Quests */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-lg border border-amber-200 bg-amber-50"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <AnimatedIcon 
                  icon={<Trophy />}
                  size="sm"
                  color="text-amber-600" 
                  hoverEffect="bounce"
                  autoAnimate={true}
                  interval={6000}
                />
              </div>
              <h3 className="ml-3 font-medium text-slate-800">Quest Map</h3>
            </div>
            <div className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded inline-block mb-2">
              New Feature
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Complete quests to earn rewards and advance your integration journey through fun, interactive challenges.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('quests')}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
            >
              Start Quests
            </motion.button>
          </motion.div>
          
          {/* Activity Tracking */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-lg border border-emerald-200 bg-emerald-50"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-emerald-100 rounded-full">
                <AnimatedIcon 
                  icon={<Footprints />}
                  size="sm"
                  color="text-emerald-600" 
                  hoverEffect="wiggle"
                  autoAnimate={true}
                  interval={5000}
                />
              </div>
              <h3 className="ml-3 font-medium text-slate-800">Activity Tracker</h3>
            </div>
            <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded inline-block mb-2">
              New Feature
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Log your real-world integration activities and earn rewards for attending classes, appointments, and community events.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigateTo('activity_tracker')}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Track Activities
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Personalized Learning Path */}
      {isLoggedIn && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <PersonalizedRecommendations navigateTo={navigateTo} />
        </div>
      )}
    </div>
  );
}