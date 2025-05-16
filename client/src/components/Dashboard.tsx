import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { getRandomLearningModules, getUpcomingIntegrationSteps } from "@/lib/data";
import { LearningModule, IntegrationStep } from "@/lib/data";
import LoginOptions from "@/components/LoginOptions";
import { ArrowRight, BookMarked, FileText, Clock, Coins } from "lucide-react";
import type { ViewType } from "@/pages/Home";

interface DashboardProps {
  navigateTo: (view: ViewType, moduleId?: string, moduleTitle?: string) => void;
}

export default function Dashboard({ navigateTo }: DashboardProps) {
  const { isLoggedIn, userName, oTokenBalance } = useAppContext();
  const [recommendedModules, setRecommendedModules] = useState<LearningModule[]>([]);
  const [integrationSteps, setIntegrationSteps] = useState<IntegrationStep[]>([]);
  
  useEffect(() => {
    // Get recommended modules and upcoming integration steps
    setRecommendedModules(getRandomLearningModules(2));
    setIntegrationSteps(getUpcomingIntegrationSteps(2));
  }, []);

  const progressPercentage = isLoggedIn ? 25 : 0;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Left column */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold text-slate-900">
                Welcome back, {isLoggedIn ? userName : "Guest"}
              </h1>
              {!isLoggedIn && (
                <button 
                  onClick={() => navigateTo("wallet")}
                  className="text-themeBlue hover:text-themeGreen font-medium text-sm flex items-center gap-1"
                >
                  <span>Login</span>
                </button>
              )}
            </div>
            <p className="text-slate-600 mb-6">
              Continue your integration journey and earn rewards by completing lessons and activities.
            </p>
            
            {/* Login options */}
            {!isLoggedIn && <LoginOptions />}
            
            {/* Progress Overview */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-base font-medium text-slate-800">Your Progress</h3>
                <span className="text-sm text-slate-500">{progressPercentage}% Complete</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-themeGreen rounded-full animate-progress" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Recommended Modules */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedModules.map((module) => (
                <div 
                  key={module.id}
                  className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigateTo("single_module", module.id, module.title)}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 text-themeBlue p-2 rounded-md mr-3">
                      <BookMarked className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium text-slate-800">{module.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{module.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="text-slate-400 mr-1 h-4 w-4" />
                      <span className="text-xs text-slate-500">{module.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Coins className="text-yellow-500 mr-1 h-4 w-4" />
                      <span className="text-xs font-medium">{module.reward} $O</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => navigateTo("module_list")}
              className="mt-4 text-themeBlue hover:text-themeGreen font-medium text-sm flex items-center gap-1"
            >
              <span>View all modules</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* Integration Steps */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Next Integration Steps</h2>
            
            <div className="space-y-4">
              {integrationSteps.map((step, index) => (
                <div key={step.id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="bg-blue-100 text-themeBlue p-1.5 rounded-md mr-3">
                        <FileText className="h-4 w-4" />
                      </div>
                      <h3 className="font-medium text-slate-800">{step.title}</h3>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      {step.officialStatus === "official" ? "Official" : "Unofficial"}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3 pl-10">{step.description}</p>
                  <div className="flex justify-between items-center pl-10">
                    <div className="flex items-center">
                      <Clock className="text-slate-400 mr-1 h-4 w-4" />
                      <span className="text-xs text-slate-500">{step.estimatedTime}</span>
                    </div>
                    <button 
                      disabled={index > 0 && !isLoggedIn}
                      onClick={() => navigateTo("integration_journey")}
                      className={`text-xs ${
                        index === 0 || isLoggedIn
                          ? "bg-themeBlue hover:bg-blue-700 text-white" 
                          : "bg-slate-200 text-slate-500 cursor-not-allowed"
                      } py-1 px-3 rounded-md transition-colors`}
                    >
                      {index === 0 || isLoggedIn ? "Start" : "Locked"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => navigateTo("integration_journey")}
              className="mt-4 text-themeBlue hover:text-themeGreen font-medium text-sm flex items-center gap-1"
            >
              <span>View full integration path</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Right column */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Wallet Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Wallet</h2>
            <div className="mb-4 p-4 bg-gradient-to-r from-themeBlue to-themeGreen rounded-lg text-white">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Current Balance</p>
                  <p className="text-2xl font-bold">{oTokenBalance} $O</p>
                </div>
                <Coins className="h-8 w-8 opacity-80" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-4">
              Connect your wallet or create a social wallet to start earning tokens for completing modules.
            </p>
            <button 
              onClick={() => navigateTo("wallet")}
              className="w-full bg-themeBlue hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <WalletIcon className="h-4 w-4" />
              <span>Connect Wallet</span>
            </button>
          </div>
          
          {/* Community Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Community Activity</h2>
            <div className="space-y-4">
              {/* Activity items */}
              <div className="flex items-start gap-3">
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm text-slate-800">
                    <span className="font-medium">Maria S.</span> completed{" "}
                    <span className="text-themeBlue">German Language Essentials</span>
                  </p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm text-slate-800">
                    <span className="font-medium">Ahmed K.</span> posted in{" "}
                    <span className="text-themeBlue">Housing Forum</span>
                  </p>
                  <p className="text-xs text-slate-500">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <img src="https://randomuser.me/api/portraits/women/42.jpg" alt="User Avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-sm text-slate-800">
                    <span className="font-medium">Sophia T.</span> earned{" "}
                    <span className="text-yellow-500">50 $O</span> tokens
                  </p>
                  <p className="text-xs text-slate-500">Yesterday</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigateTo("forum")}
              className="mt-4 text-themeBlue hover:text-themeGreen font-medium text-sm flex items-center gap-1"
            >
              <span>Visit forum</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          {/* Resources */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Helpful Resources</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-themeBlue hover:text-themeGreen flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>Official Integration Course Info</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-themeBlue hover:text-themeGreen flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>Local Services Directory</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-themeBlue hover:text-themeGreen flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>Housing Search Guide</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-themeBlue hover:text-themeGreen flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>Employment Opportunities</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
