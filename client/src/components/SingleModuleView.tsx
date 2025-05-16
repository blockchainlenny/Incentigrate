import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { getLearningModuleById, Lesson } from "@/lib/data";
import { ArrowLeft, BookMarked, Coins, Trophy, Clock, CheckIcon, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SingleModuleViewProps {
  moduleId: string;
  moduleTitle: string;
  onBackToList: () => void;
}

export default function SingleModuleView({ moduleId, moduleTitle, onBackToList }: SingleModuleViewProps) {
  const { isLoggedIn, updateModuleProgress, learningProgress, claimReward } = useAppContext();
  const [module, setModule] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModule = async () => {
      setLoading(true);
      const moduleData = getLearningModuleById(moduleId);
      setModule(moduleData);
      setLoading(false);
    };
    
    fetchModule();
  }, [moduleId]);

  if (loading || !module) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-themeBlue"></div>
        </div>
      </div>
    );
  }

  const progress = learningProgress[moduleId] || { completedSteps: 0, totalSteps: module.totalLessons, claimed: false };
  const progressPercent = (progress.completedSteps / module.totalSteps) * 100;
  const earnedXP = Math.floor((progress.completedSteps / module.totalLessons) * module.totalXp);
  
  const handleLessonAction = (lessonIndex: number) => {
    if (!isLoggedIn) return;
    
    // If this lesson is the next one (current progress + 1)
    if (lessonIndex === progress.completedSteps) {
      // Mark it as completed by incrementing the progress
      updateModuleProgress(moduleId, progress.completedSteps + 1, module.totalLessons);
    }
  };

  const handleClaimReward = () => {
    if (isLoggedIn && progress.completedSteps === module.totalLessons && !progress.claimed) {
      claimReward(moduleId, module.reward);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <button 
          onClick={onBackToList}
          className="flex items-center text-themeBlue hover:text-themeGreen mb-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Modules</span>
        </button>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-themeBlue p-2 rounded-full">
              <BookMarked className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">{moduleTitle}</h1>
          </div>
          <div className="flex items-center gap-3 mt-3 md:mt-0">
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{module.reward} $O reward</span>
            </div>
            <div className="bg-slate-200 h-5 w-px"></div>
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-themeBlue" />
              <span className="text-sm font-medium">{module.totalXp} XP</span>
            </div>
          </div>
        </div>
        <p className="text-slate-600 mt-2">{module.description}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lessons List */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Lessons</h2>
          <div className="space-y-4">
            {module.lessons.map((lesson: Lesson, index: number) => {
              // Determine lesson status
              let status = "locked";
              if (index < progress.completedSteps) {
                status = "completed";
              } else if (index === progress.completedSteps) {
                status = "current";
              }
              
              return (
                <div 
                  key={lesson.id}
                  className={`border rounded-lg p-4 ${
                    status === "completed" 
                      ? "bg-slate-50 border-slate-200" 
                      : status === "current" 
                      ? "bg-blue-50 border-themeBlue shadow-sm" 
                      : "bg-white border-slate-200 opacity-75"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <div className={`${
                        status === "completed" 
                          ? "bg-themeGreen text-white" 
                          : status === "current" 
                          ? "bg-themeBlue text-white" 
                          : "bg-slate-300 text-slate-600"
                        } p-1.5 rounded-full mr-3 flex items-center justify-center w-7 h-7`}
                      >
                        {status === "completed" ? (
                          <CheckIcon className="h-4 w-4" />
                        ) : (
                          <span className="text-sm font-medium">{lesson.id}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">{lesson.title}</h3>
                        <p className="text-sm text-slate-600">{lesson.description}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                      status === "completed" 
                        ? "bg-green-100 text-green-800" 
                        : status === "current" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {status === "completed" ? "Completed" : status === "current" ? "In Progress" : "Locked"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pl-10">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span className="text-xs text-slate-500">{lesson.estimatedMinutes} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-themeBlue" />
                        <span className="text-xs font-medium">{lesson.xp} XP</span>
                      </div>
                    </div>
                    {status === "current" && (
                      <button 
                        onClick={() => handleLessonAction(index)}
                        className="text-xs bg-themeBlue hover:bg-blue-700 text-white py-1.5 px-3 rounded-md transition-colors"
                      >
                        {isLoggedIn ? "Continue" : "Login to Continue"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Module Progress */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Your Progress</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600">{progress.completedSteps}/{module.totalLessons} lessons completed</span>
              <span className="text-sm font-medium text-themeBlue">{earnedXP} XP / {module.totalXp} XP</span>
            </div>
            <Progress 
              value={progressPercent} 
              className="h-2.5 bg-slate-200 mb-4" 
            />
            <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-themeBlue">
                  <Coins className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-slate-800">Reward Status</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Complete all {module.totalLessons} lessons to earn {module.reward} $O tokens.
              </p>
              {progress.completedSteps === module.totalLessons && !progress.claimed ? (
                <button
                  onClick={handleClaimReward}
                  className="w-full bg-themeGreen hover:bg-teal-700 text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Coins className="h-4 w-4" />
                  <span>Claim {module.reward} $O Tokens</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span className="text-xs font-medium">
                    {progress.claimed 
                      ? `${module.reward} $O claimed` 
                      : `${module.reward} $O pending`}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Resources */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Supplementary Resources</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-themeBlue hover:text-themeGreen flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>German Vocabulary Flashcards</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-themeBlue hover:text-themeGreen flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>Pronunciation Guide</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-themeBlue hover:text-themeGreen flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>Grammar Companion PDF</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-themeBlue hover:text-themeGreen flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>Practice Exercises</span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Community Discussion */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Community Discussion</h2>
            <p className="text-sm text-slate-600 mb-4">Join the conversation with other learners</p>
            <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2">
              <MessagesSquare className="h-4 w-4" />
              <span>View Discussion</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
