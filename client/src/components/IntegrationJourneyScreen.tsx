import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { getAllIntegrationSteps, IntegrationStep, IntegrationStepCategory } from "@/lib/data";
import { Check, Clock, Lock, ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function IntegrationJourneyScreen() {
  const { isLoggedIn } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>("Legal & Admin");
  const [integrationSteps, setIntegrationSteps] = useState<IntegrationStep[]>([]);
  const [stepProgress, setStepProgress] = useState<Record<string, boolean[]>>({});
  const [filters, setFilters] = useState({
    showCompleted: true,
    officialOnly: true,
    showPrerequisites: false
  });

  useEffect(() => {
    // Get all integration steps
    const steps = getAllIntegrationSteps();
    setIntegrationSteps(steps);
    
    // Initialize step progress
    const initialProgress: Record<string, boolean[]> = {};
    steps.forEach(step => {
      if (step.id === "de_anmeldung") {
        // Make the first step completed for demo
        initialProgress[step.id] = Array(step.subTasks?.length || 0).fill(true);
      } else if (step.id === "de_bank_account") {
        // Make the second step partially completed
        initialProgress[step.id] = Array(step.subTasks?.length || 0).fill(false);
        if (initialProgress[step.id].length > 0) {
          initialProgress[step.id][0] = true;
          initialProgress[step.id][1] = true;
        }
      } else {
        initialProgress[step.id] = Array(step.subTasks?.length || 0).fill(false);
      }
    });
    setStepProgress(initialProgress);
  }, []);

  // Get all categories from steps
  const categories = Array.from(
    new Set(integrationSteps.map(step => step.category))
  ) as IntegrationStepCategory[];

  // Filter steps by active category
  const categorySteps = integrationSteps.filter(step => step.category === activeCategory);
  
  // Apply additional filters
  const filteredSteps = categorySteps.filter(step => {
    if (!filters.showCompleted && isStepCompleted(step.id)) return false;
    if (filters.officialOnly && step.officialStatus !== "official") return false;
    return true;
  });

  // Calculate overall progress
  const totalSteps = integrationSteps.length;
  const completedSteps = Object.keys(stepProgress).filter(stepId => 
    isStepCompleted(stepId)
  ).length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  // Check if a step is completed
  function isStepCompleted(stepId: string): boolean {
    if (!stepProgress[stepId]) return false;
    return stepProgress[stepId].every(Boolean) && stepProgress[stepId].length > 0;
  }

  // Toggle a subtask
  function toggleSubtask(stepId: string, subtaskIndex: number) {
    if (!isLoggedIn) return;
    
    setStepProgress(prev => {
      const stepSubtasks = [...(prev[stepId] || [])];
      stepSubtasks[subtaskIndex] = !stepSubtasks[subtaskIndex];
      return { ...prev, [stepId]: stepSubtasks };
    });
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Your Integration Journey</h1>
        <p className="text-slate-600">Track your progress through essential steps for successful integration</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200 sticky top-20">
            <h3 className="font-medium text-slate-800 mb-3 px-2">Categories</h3>
            <div className="space-y-1">
              {categories.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeCategory === category 
                      ? "bg-themeBlue text-white font-medium" 
                      : "text-slate-700 hover:bg-slate-100"
                  } text-sm`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-slate-800 mb-3 px-2">Filters</h3>
              <div className="space-y-2 px-2">
                <label className="flex items-center text-sm text-slate-700">
                  <Checkbox 
                    checked={filters.showCompleted}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, showCompleted: Boolean(checked) }))
                    }
                    className="mr-2"
                  />
                  <span>Show completed steps</span>
                </label>
                <label className="flex items-center text-sm text-slate-700">
                  <Checkbox 
                    checked={filters.officialOnly}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, officialOnly: Boolean(checked) }))
                    }
                    className="mr-2"
                  />
                  <span>Official steps only</span>
                </label>
                <label className="flex items-center text-sm text-slate-700">
                  <Checkbox 
                    checked={filters.showPrerequisites}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, showPrerequisites: Boolean(checked) }))
                    }
                    className="mr-2"
                  />
                  <span>Show prerequisites</span>
                </label>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-themeBlue" />
                <h3 className="font-medium text-slate-800">Overall Progress</h3>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-slate-600">{completedSteps}/{totalSteps} steps completed</span>
                <span className="text-sm font-medium text-themeBlue">{progressPercentage}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-themeGreen rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Integration steps */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900">
                {activeCategory} Steps
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {categorySteps.filter(step => isStepCompleted(step.id)).length}/{categorySteps.length} Completed
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              {filteredSteps.map((step, index) => {
                const isCompleted = isStepCompleted(step.id);
                const isInProgress = !isCompleted && stepProgress[step.id]?.some(Boolean);
                const isLocked = index > 0 && !isLoggedIn;
                
                return (
                  <div 
                    key={step.id}
                    className={`border rounded-lg p-4 ${
                      isCompleted 
                        ? "border-green-300 bg-green-50" 
                        : isInProgress 
                        ? "border-themeBlue bg-blue-50" 
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-start sm:items-center gap-3">
                        <div className={`${
                          isCompleted 
                            ? "bg-green-100 text-green-800" 
                            : isInProgress 
                            ? "bg-themeBlue text-white" 
                            : "bg-slate-100 text-slate-500"
                          } p-1.5 rounded-full flex items-center justify-center min-w-8 min-h-8`}
                        >
                          {isCompleted ? (
                            <Check className="h-4 w-4" />
                          ) : isInProgress ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-800">{step.title}</h3>
                          <p className="text-sm text-slate-600">{step.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center ml-0 sm:ml-11 gap-2">
                        <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                          {step.officialStatus === "official" ? "Official" : "Unofficial"}
                        </span>
                        <span className={`text-xs font-medium px-2 py-1 ${
                          step.difficulty === "easy" 
                            ? "bg-green-100 text-green-800" 
                            : step.difficulty === "medium" 
                            ? "bg-blue-100 text-blue-800" 
                            : "bg-red-100 text-red-800"
                          } rounded-full`}
                        >
                          {step.difficulty.charAt(0).toUpperCase() + step.difficulty.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content area for step details */}
                    <div className={`ml-0 sm:ml-11 ${
                      isCompleted 
                        ? "bg-white" 
                        : isInProgress 
                        ? "bg-white" 
                        : "bg-slate-50"
                      } rounded-lg p-3 border border-slate-200`}
                    >
                      {isCompleted ? (
                        <div className="flex justify-between items-start">
                          <span className="text-sm font-medium text-slate-700">Completed on May 10, 2023</span>
                          <div className="flex items-center gap-1">
                            <Coin className="h-4 w-4 text-yellow-500" />
                            <span className="text-xs font-medium">
                              {step.rewardToken || 0} $O earned
                            </span>
                          </div>
                        </div>
                      ) : step.subTasks && step.subTasks.length > 0 ? (
                        <>
                          <h4 className="text-sm font-medium text-slate-700 mb-2">
                            Subtasks ({stepProgress[step.id]?.filter(Boolean).length || 0}/{step.subTasks.length} completed)
                          </h4>
                          <div className="space-y-2">
                            {step.subTasks.map((subtask, subtaskIndex) => (
                              <label key={subtask.id} className="flex items-start gap-2 text-sm text-slate-700">
                                <Checkbox 
                                  checked={stepProgress[step.id]?.[subtaskIndex] || false}
                                  onCheckedChange={() => toggleSubtask(step.id, subtaskIndex)}
                                  disabled={isLocked || !isLoggedIn}
                                  className="mt-0.5"
                                />
                                <span>{subtask.text}</span>
                              </label>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-slate-500">
                              Reward: {step.rewardToken || 0} $O tokens on completion
                            </span>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-slate-400" />
                              <span className="text-xs text-slate-500">Est: {step.estimatedTime}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">
                            {step.estimatedTime} to complete
                          </span>
                          <button 
                            disabled={isLocked || !isLoggedIn}
                            className={`text-xs ${
                              isLocked || !isLoggedIn
                                ? "bg-slate-200 text-slate-500 cursor-not-allowed" 
                                : "bg-themeBlue hover:bg-blue-700 text-white"
                              } py-1 px-3 rounded-md transition-colors`}
                          >
                            {isLocked ? "Locked" : "Start Step"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Additional icons
const Info = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const Coin = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="8" />
    <path d="M12 6v12" />
    <path d="M8 10h8" />
  </svg>
);
