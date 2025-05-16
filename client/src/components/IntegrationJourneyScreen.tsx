import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import HelpAssistant from './HelpAssistant';
import { 
  getAllIntegrationSteps, 
  getStepsByCategory, 
  getStepPrerequisites,
  StepCategory,
  IntegrationStep
} from '../lib/data';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp,
  FileText,
  ExternalLink,
  Video,
  PlusCircle,
  XCircle,
  Gem,
  ArrowRight,
  LucideIcon,
  Layers
} from 'lucide-react';

export default function IntegrationJourneyScreen() {
  const { isLoggedIn, updateModuleProgress, claimReward } = useAppContext();
  const { t } = useLanguage(); // Add translation support
  const [selectedCategory, setSelectedCategory] = useState<StepCategory | 'all'>('all');
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);
  const [completedSubtasks, setCompletedSubtasks] = useState<Record<string, string[]>>({});
  
  // Get all steps or filter by category
  const steps = selectedCategory === 'all' 
    ? getAllIntegrationSteps() 
    : getStepsByCategory(selectedCategory as StepCategory);
  
  const toggleStepExpansion = (stepId: string) => {
    setExpandedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId) 
        : [...prev, stepId]
    );
  };
  
  // Function to check if a step is completed based on subtasks
  function isStepCompleted(stepId: string): boolean {
    const step = getAllIntegrationSteps().find(s => s.id === stepId);
    if (!step || !step.subTasks || step.subTasks.length === 0) return false;
    
    const completedSubtasksForStep = completedSubtasks[stepId] || [];
    return completedSubtasksForStep.length === step.subTasks.length;
  }
  
  // Function to check if all prerequisites of a step are completed
  function arePrerequisitesCompleted(step: IntegrationStep): boolean {
    if (!step.prerequisites || step.prerequisites.length === 0) return true;
    return step.prerequisites.every(prereqId => isStepCompleted(prereqId));
  }
  
  // Function to toggle a subtask completion status
  function toggleSubtask(stepId: string, subtaskId: string) {
    if (!isLoggedIn) return;
    
    setCompletedSubtasks(prev => {
      const stepSubtasks = prev[stepId] || [];
      const updatedStepSubtasks = stepSubtasks.includes(subtaskId)
        ? stepSubtasks.filter(id => id !== subtaskId)
        : [...stepSubtasks, subtaskId];
      
      const updatedCompletedSubtasks = {
        ...prev,
        [stepId]: updatedStepSubtasks
      };
      
      // Update progress in context if a step is completed
      const step = getAllIntegrationSteps().find(s => s.id === stepId);
      if (step && step.subTasks) {
        updateModuleProgress(
          stepId, 
          updatedStepSubtasks.length,
          step.subTasks.length
        );
        
        // If all subtasks are completed, claim reward
        if (updatedStepSubtasks.length === step.subTasks.length && step.rewardToken) {
          claimReward(stepId, step.rewardToken);
        }
      }
      
      return updatedCompletedSubtasks;
    });
  }
  
  // Get category badge color
  const getCategoryColor = (category: StepCategory) => {
    const colors: Record<StepCategory, { bg: string; text: string }> = {
      'Legal & Admin': { bg: 'bg-blue-100', text: 'text-blue-700' },
      'Language & Education': { bg: 'bg-purple-100', text: 'text-purple-700' },
      'Work & Profession': { bg: 'bg-amber-100', text: 'text-amber-700' },
      'Housing': { bg: 'bg-green-100', text: 'text-green-700' },
      'Social Integration': { bg: 'bg-pink-100', text: 'text-pink-700' },
      'Daily Life & Culture': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
      'Health & Wellbeing': { bg: 'bg-red-100', text: 'text-red-700' },
      'Long-term Integration': { bg: 'bg-cyan-100', text: 'text-cyan-700' }
    };
    
    return colors[category] || { bg: 'bg-slate-100', text: 'text-slate-700' };
  };
  
  // Get status badge based on step completion and prerequisites
  const getStatusBadge = (step: IntegrationStep) => {
    const isCompleted = isStepCompleted(step.id);
    const hasPrerequisites = !arePrerequisitesCompleted(step);
    
    if (isCompleted) {
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 text-green-700">
          <CheckCircle className="w-3.5 h-3.5 mr-1" />
          Completed
        </span>
      );
    } else if (hasPrerequisites) {
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
          <Clock className="w-3.5 h-3.5 mr-1" />
          Prerequisites Needed
        </span>
      );
    } else if (step.officialStatus === 'official') {
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
          <AlertCircle className="w-3.5 h-3.5 mr-1" />
          Official Requirement
        </span>
      );
    } else {
      return (
        <span className="flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
          <Layers className="w-3.5 h-3.5 mr-1" />
          Recommended
        </span>
      );
    }
  };
  
  // Get resource icon based on type
  const getResourceIcon = (type: 'link' | 'document' | 'video'): LucideIcon => {
    switch (type) {
      case 'document':
        return FileText;
      case 'video':
        return Video;
      case 'link':
      default:
        return ExternalLink;
    }
  };
  
  // Category pills
  const categories: { label: string; value: StepCategory | 'all' }[] = [
    { label: 'All Steps', value: 'all' },
    { label: 'Legal & Admin', value: 'Legal & Admin' },
    { label: 'Language & Education', value: 'Language & Education' },
    { label: 'Work & Profession', value: 'Work & Profession' },
    { label: 'Housing', value: 'Housing' },
    { label: 'Social Integration', value: 'Social Integration' },
    { label: 'Daily Life & Culture', value: 'Daily Life & Culture' },
    { label: 'Health & Wellbeing', value: 'Health & Wellbeing' },
    { label: 'Long-term Integration', value: 'Long-term Integration' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Integration Journey</h1>
      <p className="text-slate-600 mb-6">
        Track your progress through essential steps for successful integration in Germany.
        Complete tasks to earn rewards and advance your journey.
      </p>
      
      {!isLoggedIn && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-blue-700">
          <p>
            <strong>Note:</strong> Connect your wallet or log in to track your progress and earn rewards.
          </p>
        </div>
      )}
      
      {/* Category Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Steps List */}
      <div className="space-y-4">
        {steps.map((step) => {
          const isExpanded = expandedSteps.includes(step.id);
          const isComplete = isStepCompleted(step.id);
          const canStart = arePrerequisitesCompleted(step);
          const categoryColors = getCategoryColor(step.category);
          
          return (
            <div 
              key={step.id} 
              className={`bg-white rounded-lg shadow-sm border ${
                isComplete ? 'border-green-200' : canStart ? 'border-slate-200' : 'border-orange-200'
              }`}
            >
              {/* Step Header */}
              <div 
                onClick={() => toggleStepExpansion(step.id)}
                className={`p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer ${
                  isComplete ? 'bg-green-50/50' : canStart ? 'bg-white' : 'bg-orange-50/50'
                }`}
              >
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-2 gap-2">
                    <h3 className="text-lg font-semibold text-slate-800">{step.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {getStatusBadge(step)}
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors.bg} ${categoryColors.text}`}>
                        {step.category}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full 
                        ${step.difficulty === 'easy' ? 'bg-green-100 text-green-700' : 
                          step.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-red-100 text-red-700'}`}
                      >
                        {step.difficulty.charAt(0).toUpperCase() + step.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
                
                <div className="flex items-center mt-3 sm:mt-0 sm:ml-4">
                  {step.rewardToken && (
                    <div className="flex items-center bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full text-xs font-medium mr-3">
                      <Gem className="h-3.5 w-3.5 mr-1" />
                      {step.rewardToken} $O
                    </div>
                  )}
                  <button className="text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Step Details (expanded) */}
              {isExpanded && (
                <div className="border-t border-slate-200 p-4">
                  {!canStart && (
                    <div className="mb-4 p-3 rounded-md bg-orange-50 border border-orange-200">
                      <h4 className="text-sm font-medium text-orange-800 mb-2">Prerequisites Required</h4>
                      <p className="text-xs text-orange-700 mb-2">
                        Complete the following steps first:
                      </p>
                      <ul className="space-y-1">
                        {step.prerequisites?.map(prereqId => {
                          const prereq = getAllIntegrationSteps().find(s => s.id === prereqId);
                          return prereq ? (
                            <li key={prereqId} className="flex items-center text-sm">
                              {isStepCompleted(prereqId) ? (
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                              )}
                              <span className={isStepCompleted(prereqId) ? 'text-green-700' : 'text-slate-700'}>
                                {prereq.title}
                              </span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-slate-700">Step Details</h4>
                      <span className="text-xs text-slate-500">{step.estimatedTime}</span>
                    </div>
                    <p className="text-sm text-slate-600">{step.description}</p>
                    
                    {step.description_de && (
                      <div className="mt-2 p-2 rounded bg-slate-50">
                        <p className="text-sm text-slate-600 italic">{step.description_de}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Resources */}
                  {step.resources && step.resources.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Helpful Resources</h4>
                      <ul className="space-y-2">
                        {step.resources.map((resource, index) => {
                          const IconComponent = getResourceIcon(resource.type);
                          return (
                            <li key={index} className="flex items-center">
                              <IconComponent className="h-4 w-4 text-blue-500 mr-2" />
                              <a 
                                href={resource.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {resource.text}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  
                  {/* Subtasks Checklist */}
                  {step.subTasks && (
                    <div>
                      <h4 className="text-sm font-medium text-slate-700 mb-2">Steps to Complete</h4>
                      <ul className="space-y-2">
                        {step.subTasks.map((subtask) => {
                          const isSubtaskCompleted = (completedSubtasks[step.id] || []).includes(subtask.id);
                          return (
                            <li 
                              key={subtask.id} 
                              className={`flex items-start p-2 rounded ${
                                isSubtaskCompleted ? 'bg-green-50' : 'bg-slate-50'
                              }`}
                            >
                              <button 
                                onClick={() => toggleSubtask(step.id, subtask.id)}
                                className={`flex-shrink-0 mt-0.5 ${!isLoggedIn ? 'cursor-not-allowed opacity-50' : ''}`}
                                disabled={!isLoggedIn}
                              >
                                {isSubtaskCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <PlusCircle className="h-5 w-5 text-slate-400 hover:text-blue-500" />
                                )}
                              </button>
                              <span className={`ml-2 text-sm ${isSubtaskCompleted ? 'text-green-700' : 'text-slate-700'}`}>
                                {subtask.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        
        {steps.length === 0 && (
          <div className="bg-white rounded-lg p-8 text-center border border-slate-200">
            <p className="text-slate-500">No steps found for this category.</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm">
        <h3 className="text-blue-800 font-medium mb-2">About the Integration Journey</h3>
        <p className="text-blue-700 mb-3">
          This integration plan is designed to help you navigate the essential steps for becoming established in Germany. 
          Each completed step earns $O tokens which can be used within the Incentigrate ecosystem.
        </p>
        <p className="text-blue-700">
          <strong>Note:</strong> While this application helps track your progress, always refer to official sources 
          and local authorities for the most up-to-date information.
        </p>
      </div>
    </div>
  );
}