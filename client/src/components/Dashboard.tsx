import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { learningModules } from '../lib/data';
import { Gem, GraduationCap, BookOpen, MapPin, Clock, Trophy, Calendar } from 'lucide-react';

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
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col items-center">
              <BookOpen className="h-8 w-8 text-teal-500 mb-2" />
              <p className="text-sm text-slate-500">Progress Status</p>
              <p className="text-2xl font-bold text-slate-800">
                {totalProgressData.total === 0 
                  ? '0%' 
                  : Math.round((totalProgressData.completed / totalProgressData.total) * 100) + '%'
                }
              </p>
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

      {/* Recommended Modules Section */}
      {isLoggedIn && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-medium text-slate-800 mb-4">Recommended Modules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedModules.map(module => (
              <div 
                key={module.id}
                onClick={() => navigateTo('single_module', module.id, module.title)}
                className="p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center mb-2">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                    {module.icon === 'BookOpen' ? <BookOpen className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                  </div>
                  <h3 className="ml-3 font-medium text-slate-800">{module.title}</h3>
                </div>
                
                <p className="text-sm text-slate-600 mb-3">{module.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {module.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">
                    <Clock className="inline h-4 w-4 mr-1" />
                    {module.duration}
                  </span>
                  <span className="text-teal-600 font-medium">
                    <Gem className="inline h-4 w-4 mr-1" />
                    {module.reward} $O reward
                  </span>
                </div>
              </div>
            ))}

            {recommendedModules.length === 0 && (
              <div className="col-span-2 p-6 text-center text-slate-500">
                No recommended modules at the moment. Check back later!
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <button 
              onClick={() => navigateTo('module_list')}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              View All Modules →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}