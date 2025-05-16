import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { getLearningModuleById, Lesson } from '../lib/data';
import { 
  ArrowLeft, 
  Book, 
  Clock, 
  Award, 
  CheckCircle, 
  Gem, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Trophy
} from 'lucide-react';
import ModuleBadges from './ModuleBadges';

interface SingleModuleViewProps {
  moduleId: string;
  moduleTitle: string;
  onBackToList: () => void;
}

export default function SingleModuleView({ moduleId, moduleTitle, onBackToList }: SingleModuleViewProps) {
  const { isLoggedIn, learningProgress, updateModuleProgress, claimReward } = useAppContext();
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  
  const module = getLearningModuleById(moduleId);
  
  if (!module) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Module Not Found</h2>
        <p className="text-slate-600 mb-4">
          The learning module you're looking for doesn't exist or might have been removed.
        </p>
        <button 
          onClick={onBackToList}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Modules
        </button>
      </div>
    );
  }
  
  // Get stored progress from context
  const moduleProgress = learningProgress[moduleId];
  const progress = moduleProgress ? 
    Math.round((moduleProgress.completedSteps / moduleProgress.totalSteps) * 100) : 0;
  const isCompleted = progress === 100;
  const hasClaimedReward = moduleProgress?.claimed || false;
  
  // Toggle lesson expansion
  const toggleLesson = (lessonId: number) => {
    setExpandedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId) 
        : [...prev, lessonId]
    );
  };
  
  // Mark lesson as completed
  const toggleLessonCompletion = (lessonId: number) => {
    if (!isLoggedIn) return;
    
    setCompletedLessons(prev => {
      const newCompletedLessons = prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId];
      
      // Update progress in context
      updateModuleProgress(
        moduleId,
        newCompletedLessons.length,
        module.lessons.length
      );
      
      return newCompletedLessons;
    });
  };
  
  // Claim reward for completed module
  const handleClaimReward = () => {
    if (!isLoggedIn || !isCompleted || hasClaimedReward) return;
    claimReward(moduleId, module.reward);
  };
  
  // Calculate total duration of the module in minutes
  const totalDurationMinutes = module.lessons.reduce(
    (total, lesson) => total + lesson.estimatedMinutes, 0
  );
  
  // Format duration in hours and minutes
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 
      ? `${hours} hr ${remainingMinutes} min` 
      : `${hours} hr`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={onBackToList}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Modules
      </button>
      
      {/* Module Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{module.title}</h1>
          <p className="text-slate-600 mb-4">{module.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              {module.category}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700">
              {module.language}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {module.duration}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 mb-5">
            {module.tags.map((tag, i) => (
              <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          {isLoggedIn && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-slate-600 mb-1">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center text-slate-600">
                <Book className="h-5 w-5 text-slate-500 mr-2" />
                <span>{module.totalLessons} Lessons</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Clock className="h-5 w-5 text-slate-500 mr-2" />
                <span>{formatDuration(totalDurationMinutes)}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Award className="h-5 w-5 text-slate-500 mr-2" />
                <span>{module.totalXp} XP</span>
              </div>
            </div>
            
            {isLoggedIn && isCompleted && (
              <button
                onClick={handleClaimReward}
                disabled={hasClaimedReward}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                  hasClaimedReward
                    ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                } transition-colors`}
              >
                {hasClaimedReward ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Reward Claimed
                  </>
                ) : (
                  <>
                    <Gem className="h-4 w-4 mr-1" />
                    Claim {module.reward} $O Reward
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Lessons</h2>
        
        {module.lessons.map((lesson: Lesson, index: number) => {
          const isExpanded = expandedLessons.includes(lesson.id);
          const isCompleted = completedLessons.includes(lesson.id);
          
          return (
            <div 
              key={lesson.id}
              className={`bg-white rounded-lg shadow-sm border ${
                isCompleted ? 'border-green-200' : 'border-slate-200'
              }`}
            >
              <div 
                onClick={() => toggleLesson(lesson.id)}
                className={`p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer ${
                  isCompleted ? 'bg-green-50/50' : 'bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mr-3">
                    {isLoggedIn && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLessonCompletion(lesson.id);
                        }}
                        className="focus:outline-none"
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 hover:border-blue-500 transition-colors" />
                        )}
                      </button>
                    )}
                    {!isLoggedIn && (
                      <span className="text-slate-500 font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div>
                    <h3 className={`font-medium ${isCompleted ? 'text-green-700' : 'text-slate-800'}`}>
                      {lesson.title}
                    </h3>
                    <div className="flex items-center mt-1 text-sm text-slate-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{lesson.estimatedMinutes} min</span>
                      <span className="mx-2">•</span>
                      <Award className="h-3.5 w-3.5 mr-1" />
                      <span>{lesson.xp} XP</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 sm:mt-0">
                  <button className="text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {isExpanded && (
                <div className="border-t border-slate-200 p-4">
                  <p className="text-slate-600 mb-4">{lesson.description}</p>
                  
                  {lesson.contentSummary && (
                    <div className="bg-slate-50 rounded-md p-3 border border-slate-200">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Content Summary</h4>
                      <p className="text-sm text-slate-600">{lesson.contentSummary}</p>
                    </div>
                  )}
                  
                  {isLoggedIn && (
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => toggleLessonCompletion(lesson.id)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                          isCompleted
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        } transition-colors`}
                      >
                        {isCompleted ? 'Completed' : 'Mark as Complete'}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Progress Badges Section */}
      {isLoggedIn && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mt-8">
          <ModuleBadges moduleId={moduleId} module={module} />
        </div>
      )}
      
      {/* Module Completion Section */}
      {isLoggedIn && isCompleted && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-8">
          <div className="flex items-center mb-2">
            <Trophy className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">Module Completed!</h3>
          </div>
          <p className="text-green-700 mb-4">
            Congratulations on completing this module! You've earned {module.totalXp} XP and are eligible 
            for a reward of {module.reward} $O tokens.
          </p>
          
          {!hasClaimedReward && (
            <button
              onClick={handleClaimReward}
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-teal-600 text-white hover:bg-teal-700 transition-colors"
            >
              <Gem className="h-4 w-4 mr-1" />
              Claim Your Reward
            </button>
          )}
          
          {hasClaimedReward && (
            <div className="flex items-center text-teal-700">
              <CheckCircle className="h-5 w-5 mr-1" />
              <span>Reward successfully claimed</span>
            </div>
          )}
        </div>
      )}
      
      {/* Not Logged In Message */}
      {!isLoggedIn && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Connect to Track Progress</h3>
          <p className="text-blue-700 mb-4">
            Log in or connect your wallet to track your progress and earn rewards for completing lessons.
          </p>
        </div>
      )}
    </div>
  );
}