import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { learningModules } from '../lib/data';
import { 
  Gem, GraduationCap, BookOpen, MapPin, Clock, Trophy, Calendar,
  Footprints, Lightbulb, CheckCircle, Medal, Users, Award, Flame
} from 'lucide-react';
import PersonalizedRecommendations from './PersonalizedRecommendations';

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
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
            <p className="text-slate-700 mb-3">
              Connect your wallet or login to start tracking your integration progress and earn token rewards.
            </p>
            <button 
              onClick={() => navigateTo('wallet')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Connect & Start Earning
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center">
              <GraduationCap className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm text-slate-500">Learning Modules</p>
              <p className="text-2xl font-bold text-slate-800">{learningModules.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center">
              <Trophy className="h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm text-slate-500">Modules Completed</p>
              <p className="text-2xl font-bold text-slate-800">{totalProgressData.modulesClaimed}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <div className="flex flex-col items-center">
                <BookOpen className="h-8 w-8 text-teal-500 mb-2" />
                <p className="text-sm text-slate-500">Progress Status</p>
                <p className="text-2xl font-bold text-slate-800">
                  {totalProgressData.total === 0 
                    ? '0%' 
                    : Math.round((totalProgressData.completed / totalProgressData.total) * 100) + '%'
                  }
                </p>
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
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center">
              <Calendar className="h-8 w-8 text-purple-500 mb-2" />
              <p className="text-sm text-slate-500">Member Since</p>
              <p className="text-2xl font-bold text-slate-800">May 2023</p>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => navigateTo('module_list')}
          className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="ml-3 font-medium text-lg text-slate-800">Learning Modules</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Access language courses, cultural integration materials, and skill training modules.
          </p>
        </div>
        
        <div 
          onClick={() => navigateTo('integration_journey')}
          className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="ml-3 font-medium text-lg text-slate-800">Integration Steps</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Track your integration journey - from registration to employment, housing, and more.
          </p>
        </div>
        
        <div 
          onClick={() => navigateTo('forum')}
          className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="flex items-center mb-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="ml-3 font-medium text-lg text-slate-800">Community Forum</h3>
          </div>
          <p className="text-slate-600 text-sm">
            Connect with others, ask questions, share experiences, and find local support.
          </p>
        </div>
      </div>

      {/* New Learning Features */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-medium text-slate-800 mb-4">New Learning Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Duolingo-Style Lessons */}
          <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Lightbulb className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="ml-3 font-medium text-slate-800">Interactive Lessons</h3>
            </div>
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded inline-block mb-2">
              New Feature
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Learn with fun, interactive exercises in a Duolingo-style interface. Practice language skills and earn rewards as you progress.
            </p>
            <button
              onClick={() => navigateTo('duolingo_lesson')}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Try a Lesson
            </button>
          </div>
          
          {/* Quests */}
          <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Trophy className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="ml-3 font-medium text-slate-800">Quest Map</h3>
            </div>
            <div className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded inline-block mb-2">
              New Feature
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Complete quests to earn rewards and advance your integration journey through fun, interactive challenges.
            </p>
            <button
              onClick={() => navigateTo('quests')}
              className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
            >
              Start Quests
            </button>
          </div>
          
          {/* Activity Tracking */}
          <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-emerald-100 rounded-full">
                <Footprints className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="ml-3 font-medium text-slate-800">Activity Tracker</h3>
            </div>
            <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-0.5 rounded inline-block mb-2">
              New Feature
            </div>
            <p className="text-sm text-slate-600 mb-3">
              Log your real-world integration activities and earn rewards for attending classes, appointments, and community events.
            </p>
            <button
              onClick={() => navigateTo('activity_tracker')}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
            >
              Track Activities
            </button>
          </div>
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