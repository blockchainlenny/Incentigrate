import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Dashboard from '../components/Dashboard';
import LearningModulesList from '../components/LearningModulesList';
import SingleModuleView from '../components/SingleModuleView';
import ForumScreen from '../components/ForumScreen';
import WalletScreen from '../components/WalletScreen';
import IntegrationJourneyScreen from '../components/IntegrationJourneyScreen';
import LoginOptions from '../components/LoginOptions';
import NavMenu from '../components/NavMenu';
import QuestMap from '../components/QuestMap';
import ActivityTracker from '../components/ActivityTracker';
import DuolingoStyleLesson from '../components/DuolingoStyleLesson';

export type ViewType = 
  | "dashboard" 
  | "module_list" 
  | "single_module" 
  | "forum" 
  | "wallet" 
  | "integration_journey"
  | "quests"
  | "activity_tracker"
  | "duolingo_lesson";

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

  const [selectedLesson, setSelectedLesson] = useState<{ moduleId: string, lessonId: number } | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

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
      case 'quests':
        return <QuestMap onSelectQuest={(questId) => {
          setSelectedQuest(questId);
          // In a full implementation, we would navigate to the quest details/start screen
          alert(`Starting Quest: ${questId}`);
        }} />;
      case 'activity_tracker':
        return <ActivityTracker />;
      case 'duolingo_lesson':
        return selectedLesson ? (
          <DuolingoStyleLesson
            moduleId={selectedLesson.moduleId}
            lessonId={selectedLesson.lessonId}
            onComplete={() => {
              // In a full implementation, we would update progress and award tokens
              alert('Lesson completed! You earned tokens and XP.');
              navigateTo('module_list');
            }}
            onExit={() => navigateTo('module_list')}
          />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <h3 className="text-lg font-medium text-slate-700 mb-4">No lesson selected</h3>
            <button 
              onClick={() => navigateTo('module_list')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Browse Learning Modules
            </button>
          </div>
        );
      default:
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navigation Menu */}
      <NavMenu 
        currentView={currentView} 
        navigateTo={(view, moduleId, moduleTitle) => navigateTo(view as ViewType, moduleId, moduleTitle)}
      />

      {/* Main Content */}
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