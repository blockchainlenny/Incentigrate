import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { getAllLearningModules, LearningModule } from "@/lib/data";
import { 
  BookMarked, 
  TrendingUp, 
  FileText, 
  Clock, 
  BookOpen, 
  Coins 
} from "lucide-react";

interface LearningModulesListProps {
  onSelectModule: (moduleId: string, moduleTitle: string) => void;
}

export default function LearningModulesList({ onSelectModule }: LearningModulesListProps) {
  const { isLoggedIn, learningProgress } = useAppContext();
  const [modules, setModules] = useState<LearningModule[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  useEffect(() => {
    setModules(getAllLearningModules());
  }, []);

  const filteredModules = categoryFilter === "all" 
    ? modules 
    : modules.filter(m => m.category.toLowerCase() === categoryFilter.toLowerCase());

  // Function to get the appropriate icon for a module
  const getModuleIcon = (category: string) => {
    switch (category) {
      case "Language":
        return <BookMarked className="text-xl" />;
      case "Culture":
        return <TrendingUp className="text-xl" />;
      case "Legal & Bureaucracy":
        return <FileText className="text-xl" />;
      default:
        return <BookMarked className="text-xl" />;
    }
  };

  // Function to get color style based on category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Language":
        return {
          barClass: "bg-themeBlue",
          bgClass: "bg-blue-100 text-themeBlue",
          buttonClass: "bg-themeBlue hover:bg-blue-700"
        };
      case "Culture":
        return {
          barClass: "bg-themeGreen",
          bgClass: "bg-green-100 text-themeGreen",
          buttonClass: "bg-themeGreen hover:bg-teal-700"
        };
      case "Legal & Bureaucracy":
        return {
          barClass: "bg-purple-600",
          bgClass: "bg-purple-100 text-purple-600",
          buttonClass: "bg-purple-600 hover:bg-purple-700"
        };
      case "Professional Skills":
        return {
          barClass: "bg-amber-600",
          bgClass: "bg-amber-100 text-amber-600",
          buttonClass: "bg-amber-600 hover:bg-amber-700"
        };
      case "Digital Skills":
        return {
          barClass: "bg-cyan-600",
          bgClass: "bg-cyan-100 text-cyan-600",
          buttonClass: "bg-cyan-600 hover:bg-cyan-700"
        };
      default:
        return {
          barClass: "bg-themeBlue",
          bgClass: "bg-blue-100 text-themeBlue",
          buttonClass: "bg-themeBlue hover:bg-blue-700"
        };
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-slate-900">Learning Modules</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Filter by:</span>
            <select 
              className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg p-2 focus:ring-themeBlue focus:border-themeBlue"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="language">Language</option>
              <option value="culture">Culture</option>
              <option value="professional skills">Professional Skills</option>
              <option value="digital skills">Digital Skills</option>
              <option value="legal & bureaucracy">Legal & Bureaucracy</option>
            </select>
          </div>
        </div>
        <p className="text-slate-600 mt-1">Learn new skills and earn rewards by completing modules</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => {
          const colors = getCategoryColor(module.category);
          const progress = learningProgress[module.id] || { completedSteps: 0, totalSteps: module.totalLessons, claimed: false };
          const progressPercent = (progress.completedSteps / progress.totalSteps) * 100;
          
          return (
            <div 
              key={module.id}
              className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className={`h-3 ${colors.barClass}`}></div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${colors.bgClass} p-2 rounded-full`}>
                    {getModuleIcon(module.category)}
                  </div>
                  <h3 className="font-semibold text-slate-800">{module.title}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">{module.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="text-slate-400 h-4 w-4" />
                    <span className="text-xs text-slate-500">{module.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="text-slate-400 h-4 w-4" />
                    <span className="text-xs text-slate-500">{module.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="text-yellow-500 h-4 w-4" />
                    <span className="text-xs font-medium">{module.reward} $O</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-slate-500">
                    {progress.completedSteps}/{module.totalLessons} completed
                  </span>
                  <span className="text-xs font-medium text-themeBlue">
                    {(progress.completedSteps / module.totalLessons * module.totalXp).toFixed(0)} XP / {module.totalXp} XP
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                  <div 
                    className={`h-full ${progressPercent > 0 ? colors.barClass : 'bg-slate-400'} rounded-full`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <button 
                  onClick={() => onSelectModule(module.id, module.title)}
                  className={`w-full ${colors.buttonClass} text-white font-medium py-2 rounded-md transition-colors`}
                >
                  {progressPercent > 0 ? "Continue Learning" : "Start Learning"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
