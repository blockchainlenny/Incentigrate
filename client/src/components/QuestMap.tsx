import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Sparkles, Lock, CheckCircle, MapPin, Award, Zap, Clock, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'language' | 'culture' | 'legal' | 'employment' | 'social';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  tokenReward: number;
  estimatedTime: string;
  prerequisites: string[];
  status: 'locked' | 'available' | 'completed' | 'expired';
  steps: { id: string; description: string; completed: boolean }[];
  deadline?: string;
  badgeUrl?: string;
}

interface QuestMapProps {
  onSelectQuest: (questId: string) => void;
}

export default function QuestMap({ onSelectQuest }: QuestMapProps) {
  const { isLoggedIn } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedQuest, setExpandedQuest] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample quests data
  const quests: Quest[] = [
    {
      id: 'q1',
      title: 'First Steps in German',
      description: 'Learn basic German greetings and introductions to start your integration journey.',
      category: 'language',
      difficulty: 'beginner',
      xpReward: 100,
      tokenReward: 5,
      estimatedTime: '30 mins',
      prerequisites: [],
      status: 'available',
      steps: [
        { id: 's1', description: 'Complete the basic greetings lesson', completed: false },
        { id: 's2', description: 'Practice with the interactive dialogue', completed: false },
        { id: 's3', description: 'Pass the mini-quiz with at least 80%', completed: false }
      ]
    },
    {
      id: 'q2',
      title: 'City Registration (Anmeldung)',
      description: 'Learn how to register your address at the local city office, an essential step for all newcomers.',
      category: 'legal',
      difficulty: 'beginner',
      xpReward: 150,
      tokenReward: 10,
      estimatedTime: '1 hour',
      prerequisites: [],
      status: 'available',
      steps: [
        { id: 's1', description: 'Understand the required documents', completed: false },
        { id: 's2', description: 'Learn how to fill out the registration form', completed: false },
        { id: 's3', description: 'Find your local registration office', completed: false },
        { id: 's4', description: 'Upload a photo of your completed registration', completed: false }
      ]
    },
    {
      id: 'q3',
      title: 'Setting Up a Bank Account',
      description: 'Navigate the German banking system and learn how to open your first bank account.',
      category: 'legal',
      difficulty: 'intermediate',
      xpReward: 200,
      tokenReward: 15,
      estimatedTime: '45 mins',
      prerequisites: ['q2'],
      status: 'locked',
      steps: [
        { id: 's1', description: 'Learn about different types of banks in Germany', completed: false },
        { id: 's2', description: 'Understand the documentation needed', completed: false },
        { id: 's3', description: 'Compare account options and fees', completed: false },
        { id: 's4', description: 'Complete the banking vocabulary quiz', completed: false }
      ]
    },
    {
      id: 'q4',
      title: 'German Cultural Norms',
      description: 'Learn about punctuality, recycling, and other important cultural aspects of daily life.',
      category: 'culture',
      difficulty: 'beginner',
      xpReward: 100,
      tokenReward: 8,
      estimatedTime: '40 mins',
      prerequisites: [],
      status: 'available',
      steps: [
        { id: 's1', description: 'Complete the lesson on German punctuality', completed: false },
        { id: 's2', description: 'Learn the recycling system', completed: false },
        { id: 's3', description: 'Understand public transport etiquette', completed: false },
        { id: 's4', description: 'Take the culture quiz', completed: false }
      ]
    },
    {
      id: 'q5',
      title: 'CV Building Workshop',
      description: 'Create a German-style CV that will help you in your job search.',
      category: 'employment',
      difficulty: 'intermediate',
      xpReward: 250,
      tokenReward: 20,
      estimatedTime: '1.5 hours',
      prerequisites: ['q1'],
      status: 'locked',
      steps: [
        { id: 's1', description: 'Learn the structure of a German CV', completed: false },
        { id: 's2', description: 'Translate your skills to German job market terms', completed: false },
        { id: 's3', description: 'Create your CV draft', completed: false },
        { id: 's4', description: 'Get feedback from community members', completed: false },
        { id: 's5', description: 'Finalize your CV', completed: false }
      ],
      deadline: '2025-05-30'
    },
    {
      id: 'q6',
      title: 'Community Meetup',
      description: 'Join a local meetup to practice your German and make new connections.',
      category: 'social',
      difficulty: 'beginner',
      xpReward: 150,
      tokenReward: 10,
      estimatedTime: '2 hours',
      prerequisites: ['q1'],
      status: 'locked',
      steps: [
        { id: 's1', description: 'Find a relevant community event', completed: false },
        { id: 's2', description: 'Practice conversation starters in German', completed: false },
        { id: 's3', description: 'Attend the event and meet at least 3 new people', completed: false },
        { id: 's4', description: 'Share your experience on the community forum', completed: false }
      ],
      badgeUrl: 'https://example.com/badge.png'
    }
  ];
  
  const filteredQuests = selectedCategory 
    ? quests.filter(quest => quest.category === selectedCategory)
    : quests;
  
  const categories = [
    { id: 'language', name: 'Language', color: 'bg-blue-500' },
    { id: 'culture', name: 'Culture', color: 'bg-purple-500' },
    { id: 'legal', name: 'Legal & Admin', color: 'bg-green-500' },
    { id: 'employment', name: 'Employment', color: 'bg-amber-500' },
    { id: 'social', name: 'Social', color: 'bg-pink-500' }
  ];
  
  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'bg-slate-500';
  };
  
  const getDifficultyLabel = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return { text: 'Beginner', class: 'bg-green-100 text-green-800' };
      case 'intermediate': return { text: 'Intermediate', class: 'bg-yellow-100 text-yellow-800' };
      case 'advanced': return { text: 'Advanced', class: 'bg-red-100 text-red-800' };
      default: return { text: 'Unknown', class: 'bg-slate-100 text-slate-800' };
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'locked': return <Lock className="h-5 w-5 text-slate-400" />;
      case 'available': return <Zap className="h-5 w-5 text-amber-500" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'expired': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return null;
    }
  };
  
  const toggleQuestExpand = (questId: string) => {
    setExpandedQuest(expandedQuest === questId ? null : questId);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Quest Map</h1>
          <p className="text-slate-600">Complete quests to earn rewards and advance your integration journey</p>
        </div>
        
        <div className="flex mt-4 md:mt-0">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm font-medium hover:bg-slate-50"
          >
            Filters {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
          </button>
          
          <button
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            disabled={!isLoggedIn}
          >
            <Sparkles className="inline-block h-4 w-4 mr-1" />
            Your Progress
          </button>
        </div>
      </div>
      
      {/* Filter Bar */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                selectedCategory === null ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </button>
            
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedCategory === category.id 
                    ? `text-white ${category.color}` 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Quest Path Visualization */}
      <div className="hidden lg:block bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-1/2 -ml-px w-0.5 bg-slate-200"></div>
          
          {filteredQuests.map((quest, index) => (
            <div key={quest.id} className={`relative pl-8 pb-8 ${index === 0 ? 'pt-0' : 'pt-8'}`}>
              <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full ${
                quest.status === 'completed' ? 'bg-green-500' : 
                quest.status === 'available' ? 'bg-blue-500' : 
                quest.status === 'locked' ? 'bg-slate-300' : 'bg-red-500'
              }`}>
                {quest.status === 'completed' ? (
                  <CheckCircle className="h-4 w-4 text-white" />
                ) : quest.status === 'available' ? (
                  <MapPin className="h-4 w-4 text-white" />
                ) : quest.status === 'locked' ? (
                  <Lock className="h-3 w-3 text-white" />
                ) : (
                  <XCircle className="h-4 w-4 text-white" />
                )}
              </div>
              
              <div 
                onClick={() => quest.status !== 'locked' && onSelectQuest(quest.id)}
                className={`p-4 rounded-lg border ${
                quest.status === 'locked' ? 'border-slate-200 bg-slate-50' : 'border-blue-200 bg-blue-50 cursor-pointer hover:shadow-md transition-shadow'
              }`}>
                <h3 className={`text-lg font-semibold ${
                  quest.status === 'locked' ? 'text-slate-500' : 'text-slate-800'
                }`}>
                  {quest.title}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(quest.category)} text-white`}>
                    {categories.find(c => c.id === quest.category)?.name}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyLabel(quest.difficulty).class}`}>
                    {getDifficultyLabel(quest.difficulty).text}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quest Cards */}
      <div className="space-y-4">
        {filteredQuests.map(quest => {
          const isExpanded = expandedQuest === quest.id;
          const difficultyLabel = getDifficultyLabel(quest.difficulty);
          
          return (
            <div 
              key={quest.id}
              className={`bg-white rounded-lg shadow-sm border ${
                quest.status === 'locked' ? 'border-slate-200' : 
                quest.status === 'completed' ? 'border-green-200' :
                quest.status === 'expired' ? 'border-red-200' : 'border-blue-200'
              } ${quest.status !== 'locked' ? 'hover:shadow-md transition-shadow' : ''}`}
              onClick={() => quest.status !== 'locked' && onSelectQuest(quest.id)}
              style={{ cursor: quest.status !== 'locked' ? 'pointer' : 'default' }}
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(quest.category)} text-white`}>
                        {categories.find(c => c.id === quest.category)?.name}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyLabel.class}`}>
                        {difficultyLabel.text}
                      </span>
                      {quest.deadline && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          <Clock className="h-3 w-3 mr-1" /> Deadline: {quest.deadline}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center mb-2">
                      {getStatusIcon(quest.status)}
                      <h3 className={`ml-2 text-lg font-semibold ${
                        quest.status === 'locked' ? 'text-slate-500' : 'text-slate-800'
                      }`}>
                        {quest.title}
                      </h3>
                    </div>
                    
                    <p className={`text-sm ${quest.status === 'locked' ? 'text-slate-400' : 'text-slate-600'}`}>
                      {quest.description}
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => toggleQuestExpand(quest.id)}
                    className={`ml-2 p-1 rounded-full ${
                      quest.status === 'locked' ? 'text-slate-400' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                    }`}
                    disabled={quest.status === 'locked'}
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="flex items-center text-amber-600">
                    <Award className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{quest.tokenReward} $O</span>
                  </div>
                  
                  <div className="flex items-center text-blue-600">
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{quest.xpReward} XP</span>
                  </div>
                  
                  <div className="flex items-center text-slate-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{quest.estimatedTime}</span>
                  </div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="border-t border-slate-100 px-4 py-3">
                  <h4 className="font-medium text-slate-700 mb-2">Quest Steps:</h4>
                  <ul className="space-y-2 mb-4">
                    {quest.steps.map(step => (
                      <li key={step.id} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 mt-0.5">
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-slate-300"></div>
                          )}
                        </div>
                        <span className={`ml-2 text-sm ${step.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                          {step.description}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-end">
                    <button
                      onClick={() => onSelectQuest(quest.id)}
                      disabled={quest.status === 'locked' || quest.status === 'expired'}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        quest.status === 'locked' || quest.status === 'expired'
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : quest.status === 'completed'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {quest.status === 'locked' 
                        ? 'Locked' 
                        : quest.status === 'completed'
                          ? 'Completed'
                          : quest.status === 'expired'
                            ? 'Expired'
                            : 'Start Quest'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        
        {filteredQuests.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-300" />
            <h3 className="text-lg font-medium text-slate-700 mb-1">No quests found</h3>
            <p className="text-slate-500">
              Try selecting a different category or clearing your filters.
            </p>
          </div>
        )}
      </div>
      
      {/* Locked Section Prompt */}
      {!isLoggedIn && (
        <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Log in to track your quest progress</h3>
          <p className="text-blue-700 mb-4">
            Connect your wallet or log in to access all quests, track your progress, and earn rewards.
          </p>
        </div>
      )}
    </div>
  );
}