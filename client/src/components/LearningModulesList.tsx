import React, { useState } from 'react';
import { getAllLearningModules, LearningModule } from '../lib/data';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import HelpAssistant from './HelpAssistant';
import { 
  BookOpen, 
  GraduationCap, 
  Globe, 
  Briefcase, 
  Laptop, 
  Search,
  FilterX,
  Clock,
  Gem
} from 'lucide-react';

interface LearningModulesListProps {
  onSelectModule: (moduleId: string, moduleTitle: string) => void;
}

export default function LearningModulesList({ onSelectModule }: LearningModulesListProps) {
  const { isLoggedIn, learningProgress } = useAppContext();
  const { t } = useLanguage(); // Add translation support
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const modules = getAllLearningModules();
  
  // Filter modules based on search term and category
  const filteredModules = modules.filter(module => {
    const matchesSearch = 
      searchTerm === '' || 
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || module.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get progress for a module
  const getModuleProgress = (moduleId: string) => {
    if (!isLoggedIn) return 0;
    
    const progress = learningProgress[moduleId];
    if (!progress || progress.totalSteps === 0) return 0;
    
    return Math.round((progress.completedSteps / progress.totalSteps) * 100);
  };
  
  // Get icon component by name
  const getIconByName = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="h-5 w-5" />;
      case 'GraduationCap':
        return <GraduationCap className="h-5 w-5" />;
      case 'Globe':
        return <Globe className="h-5 w-5" />;
      case 'Briefcase':
        return <Briefcase className="h-5 w-5" />;
      case 'Laptop':
        return <Laptop className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
  };
  
  // Get color styles for a category
  const getCategoryStyles = (category: string) => {
    const styles: Record<string, { bg: string, text: string, iconBg: string }> = {
      'Language': { 
        bg: 'bg-blue-50', 
        text: 'text-blue-700',
        iconBg: 'bg-blue-100'
      },
      'Culture': { 
        bg: 'bg-purple-50', 
        text: 'text-purple-700',
        iconBg: 'bg-purple-100'
      },
      'Professional Skills': { 
        bg: 'bg-amber-50', 
        text: 'text-amber-700',
        iconBg: 'bg-amber-100'
      },
      'Digital Skills': { 
        bg: 'bg-green-50', 
        text: 'text-green-700',
        iconBg: 'bg-green-100'
      },
      'Legal & Bureaucracy': { 
        bg: 'bg-red-50', 
        text: 'text-red-700',
        iconBg: 'bg-red-100'
      }
    };
    
    return styles[category] || { bg: 'bg-slate-50', text: 'text-slate-700', iconBg: 'bg-slate-100' };
  };
  
  // Get all unique categories
  const categories = Array.from(new Set(modules.map(module => module.category)));
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">{t('moduleList')}</h1>
      <p className="text-slate-600 mb-6">
        {t('continueWhere')}. 
        Complete modules to earn token rewards.
      </p>
      
      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search modules by title, description, or tags..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
            
            {(searchTerm || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory(null);
                }}
                className="flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
              >
                <FilterX className="h-4 w-4 mr-1" />
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Modules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredModules.map((module) => {
          const categoryStyles = getCategoryStyles(module.category);
          const progress = getModuleProgress(module.id);
          const isCompleted = progress === 100;
          
          return (
            <div 
              key={module.id}
              onClick={() => onSelectModule(module.id, module.title)}
              className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer ${
                isCompleted ? 'border-green-200' : 'border-slate-200'
              }`}
            >
              <div className="p-5">
                <div className="flex items-start mb-3">
                  <div className={`p-2 rounded-lg ${categoryStyles.iconBg} ${categoryStyles.text} mr-3`}>
                    {getIconByName(module.icon)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-800 mb-1">{module.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyles.bg} ${categoryStyles.text}`}>
                        {module.category}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {module.language}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-4">{module.description}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {module.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {isLoggedIn && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-slate-500 mb-1">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between text-sm border-t border-slate-100 pt-3">
                  <div className="flex items-center text-slate-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{module.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-teal-600 font-medium">
                    <Gem className="h-4 w-4 mr-1" />
                    <span>{module.reward} $O reward</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredModules.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
          <div className="flex justify-center mb-3">
            <Search className="h-12 w-12 text-slate-300" />
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-1">No modules found</h3>
          <p className="text-slate-500">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
            }}
            className="mt-4 inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <FilterX className="h-4 w-4 mr-1" />
            Clear all filters
          </button>
        </div>
      )}
      
      {/* AI Assistant for Learning Modules */}
      <HelpAssistant 
        context="learning"
        position="bottom-right"
        autoShow={true} 
        autoHideAfter={10000}
        pulse={true}
        size="md"
      />
    </div>
  );
}