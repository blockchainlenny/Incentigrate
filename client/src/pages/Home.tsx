import { useState } from "react";
import { 
  LayoutDashboard, 
  BookOpen, 
  MessagesSquare, 
  Wallet, 
  Map 
} from "lucide-react";
import Dashboard from "@/components/Dashboard";
import LearningModulesList from "@/components/LearningModulesList";
import SingleModuleView from "@/components/SingleModuleView";
import ForumScreen from "@/components/ForumScreen";
import WalletScreen from "@/components/WalletScreen";
import IntegrationJourneyScreen from "@/components/IntegrationJourneyScreen";
import { useAppContext } from "@/contexts/AppContext";

export type ViewType = 
  | "dashboard" 
  | "module_list" 
  | "single_module" 
  | "forum" 
  | "wallet" 
  | "integration_journey";

type NavItem = {
  view: ViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function Home() {
  const { isLoggedIn } = useAppContext();
  const [currentView, setCurrentView] = useState<ViewType>("dashboard");
  const [selectedModule, setSelectedModule] = useState<{ id: string, title: string } | null>(null);

  const handleSelectModule = (moduleId: string, moduleTitle: string) => {
    setSelectedModule({ id: moduleId, title: moduleTitle });
    setCurrentView("single_module");
  };

  const handleBackToList = () => {
    setSelectedModule(null);
    setCurrentView("module_list");
  };

  const navigateTo = (view: ViewType, moduleId?: string, moduleTitle?: string) => {
    if (moduleId && moduleTitle && view === "single_module") {
      setSelectedModule({ id: moduleId, title: moduleTitle });
    } else {
      setSelectedModule(null);
    }
    setCurrentView(view);
  };

  const navItems: NavItem[] = [
    { view: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { view: "module_list", label: "Learning", icon: BookOpen },
    { view: "integration_journey", label: "My Path", icon: Map },
    { view: "forum", label: "Forum", icon: MessagesSquare },
    { view: "wallet", label: "Wallet", icon: Wallet },
  ];

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col">
      <header className="sticky top-0 z-50 bg-themeBlue text-white shadow-md">
        <nav className="container mx-auto px-2 py-2 flex flex-wrap justify-center md:justify-around items-center">
          {navItems.map((item) => {
            const isActive =
              currentView === item.view ||
              (item.view === "module_list" && currentView === "single_module");
            return (
              <button
                key={item.view}
                onClick={() => navigateTo(item.view)}
                title={item.label}
                className={`flex flex-col items-center justify-center p-2 mx-1 rounded-md transition-colors
                          ${isActive ? "bg-themeGreen text-white" : "hover:bg-sky-700"}
                          w-20 h-16 md:w-auto md:h-auto md:flex-row md:px-3 md:py-2 md:space-x-2`}
              >
                <item.icon className={`h-5 w-5 md:h-4 md:w-4 ${isActive ? "text-white" : "text-slate-200"}`} />
                <span className={`text-xs mt-1 md:mt-0 md:text-sm ${isActive ? "font-semibold" : "font-normal"}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      <div className="flex-grow overflow-y-auto">
        {currentView === "dashboard" && <Dashboard navigateTo={navigateTo} />}
        {currentView === "module_list" && <LearningModulesList onSelectModule={handleSelectModule} />}
        {currentView === "single_module" && selectedModule && (
          <SingleModuleView
            moduleId={selectedModule.id}
            moduleTitle={selectedModule.title}
            onBackToList={handleBackToList}
          />
        )}
        {currentView === "integration_journey" && <IntegrationJourneyScreen />}
        {currentView === "forum" && <ForumScreen />}
        {currentView === "wallet" && <WalletScreen />}
      </div>
    </main>
  );
}
