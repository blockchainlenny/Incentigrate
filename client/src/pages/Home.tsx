import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Dashboard from '../components/Dashboard';
import LearningModulesList from '../components/LearningModulesList';
import SingleModuleView from '../components/SingleModuleView';
import ForumScreen from '../components/ForumScreen';
import WalletScreen from '../components/WalletScreen';
import IntegrationJourneyScreen from '../components/IntegrationJourneyScreen';
import { Gem } from 'lucide-react';
import LoginOptions from '../components/LoginOptions';

export type ViewType = 
  | "dashboard" 
  | "module_list" 
  | "single_module" 
  | "forum" 
  | "wallet" 
  | "integration_journey";

export default function Home() {
  const { isLoggedIn, userName, oTokenBalance } = useAppContext();
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedModule, setSelectedModule] = useState<{ id: string, title: string } | null>(null);

  const navigateTo = (view: ViewType, moduleId?: string, moduleTitle?: string) => {
    if (moduleId && moduleTitle && view === 'single_module') {
      setSelectedModule({ id: moduleId, title: moduleTitle });
    } else {
      setSelectedModule(null);
    }
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} />;
      case 'module_list':
        return <LearningModulesList onSelectModule={(id, title) => navigateTo('single_module', id, title)} />;
      case 'single_module':
        return selectedModule ? (
          <SingleModuleView 
            moduleId={selectedModule.id} 
            moduleTitle={selectedModule.title}
            onBackToList={() => navigateTo('module_list')} 
          />
        ) : (
          <LearningModulesList onSelectModule={(id, title) => navigateTo('single_module', id, title)} />
        );
      case 'forum':
        return <ForumScreen />;
      case 'wallet':
        return <WalletScreen />;
      case 'integration_journey':
        return <IntegrationJourneyScreen />;
      default:
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600 mr-2">Incentigrate</h1>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Beta</span>
          </div>
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-teal-50 px-3 py-1.5 rounded-full">
                <Gem className="h-4 w-4 text-teal-500 mr-1" />
                <span className="font-medium text-teal-700">{oTokenBalance} $O</span>
              </div>
              <div className="text-sm text-slate-600">
                Hello, <span className="font-medium">{userName}</span>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => navigateTo('wallet')}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-6 flex-grow">
        {!isLoggedIn && currentView !== 'wallet' && (
          <div className="mb-6">
            <LoginOptions />
          </div>
        )}
        
        {renderContent()}
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-medium mb-3">Incentigrate</h3>
              <p className="text-sm">
                A decentralized platform helping refugees track integration progress
                and earn rewards for completing essential steps.
              </p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Resources</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integration Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Token Economics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center">
            <p>&copy; {new Date().getFullYear()} Incentigrate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}