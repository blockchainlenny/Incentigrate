'use client';

import React, { useState, useEffect } from "react";
import { useAppContext } from "./contexts/AppContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  MessagesSquare, 
  Wallet as WalletIcon, 
  Map 
} from 'lucide-react';

export type ViewType = 'dashboard' | 'module_list' | 'single_module' | 'forum' | 'wallet' | 'integration_journey';

type NavItem = {
  view: ViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function Home() {
  const { isLoggedIn } = useAppContext();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedModule, setSelectedModule] = useState<{ id: string, title: string } | null>(null);

  const handleSelectModule = (moduleId: string, moduleTitle: string) => {
    setSelectedModule({ id: moduleId, title: moduleTitle });
    setCurrentView('single_module');
  };

  const handleBackToList = () => {
    setSelectedModule(null);
    setCurrentView('module_list');
  };

  const navigateTo = (view: ViewType, moduleId?: string, moduleTitle?: string) => {
    if (moduleId && moduleTitle && view === 'single_module') {
      setSelectedModule({ id: moduleId, title: moduleTitle });
    } else {
      setSelectedModule(null);
    }
    setCurrentView(view);
  };

  const navItems: NavItem[] = [
    { view: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { view: 'module_list', label: 'Learning', icon: BookOpen },
    { view: 'integration_journey', label: 'My Path', icon: Map },
    { view: 'forum', label: 'Forum', icon: MessagesSquare },
    { view: 'wallet', label: 'Wallet', icon: WalletIcon },
  ];

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">
      <header className="sticky top-0 z-50 bg-themeBlue text-white shadow-md">
        <nav className="container mx-auto px-2 py-2 flex flex-wrap justify-center md:justify-around items-center">
          {navItems.map((item) => {
            const isActive =
              currentView === item.view ||
              (item.view === 'module_list' && currentView === 'single_module');
            return (
              <button
                key={item.view}
                onClick={() => navigateTo(item.view)}
                title={item.label}
                className={`flex flex-col items-center justify-center p-2 mx-1 rounded-md transition-colors
                          ${isActive ? 'bg-themeGreen text-white' : 'hover:bg-sky-700'}
                          w-20 h-16 md:w-auto md:h-auto md:flex-row md:px-3 md:py-2 md:space-x-2`}
              >
                <item.icon className={`h-5 w-5 md:h-4 md:w-4 ${isActive ? 'text-white' : 'text-slate-200'}`} />
                <span className={`text-xs mt-1 md:mt-0 md:text-sm ${isActive ? 'font-semibold' : 'font-normal'}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <div className="flex-grow overflow-y-auto">
        {/* Content area */}
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <h1 className="text-2xl font-semibold text-slate-900 mb-4">Incentigrate - Learn & Earn</h1>
          <p className="text-slate-600 mb-6">
            Welcome to Incentigrate, a platform designed to help refugees learn new skills, track integration progress, and earn token rewards.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Learning Modules</h2>
              <p className="text-slate-600 mb-4">Complete language courses, cultural integration modules, and professional skills training to earn rewards.</p>
              <button 
                onClick={() => navigateTo('module_list')}
                className="w-full bg-themeBlue hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
              >
                Explore Learning Modules
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Integration Journey</h2>
              <p className="text-slate-600 mb-4">Track your progress through essential integration steps like registration, housing, and employment.</p>
              <button 
                onClick={() => navigateTo('integration_journey')}
                className="w-full bg-themeGreen hover:bg-teal-700 text-white font-medium py-2 rounded-md transition-colors"
              >
                View My Integration Path
              </button>
            </div>
          </div>
          
          <div className="mt-6 bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Wallet & Rewards</h2>
            <p className="text-slate-600 mb-4">
              Connect your wallet to start earning $O tokens for completing modules and integration steps. 
              These tokens can be used for various benefits within the Incentigrate ecosystem.
            </p>
            <button 
              onClick={() => navigateTo('wallet')}
              className="bg-themeBlue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Connect Wallet & View Rewards
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              This is a demonstration of the Incentigrate dApp. In a full implementation, you would be able to track your progress, 
              earn real cryptocurrency tokens, and access detailed resources for integration.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}