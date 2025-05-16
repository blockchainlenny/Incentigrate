import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { ArrowRight, Check, X, Volume2, Star, Trophy, Award } from 'lucide-react';

interface Question {
  type: 'translation' | 'multipleChoice' | 'match' | 'arrange';
  prompt: string;
  correctAnswer: string;
  options?: string[];
  imageUrl?: string;
  audio?: string;
}

interface LessonProps {
  moduleId: string;
  lessonId: number;
  onComplete: () => void;
  onExit: () => void;
}

export default function DuolingoStyleLesson({ moduleId, lessonId, onComplete, onExit }: LessonProps) {
  const { updateModuleProgress } = useAppContext();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Sample questions for the lesson
  const questions: Question[] = [
    {
      type: 'translation',
      prompt: 'Translate: "Hello, my name is Maria"',
      correctAnswer: 'Hallo, ich heiße Maria',
      options: ['Hallo, ich heiße Maria', 'Hallo, mein Name ist Maria', 'Guten Tag, ich bin Maria', 'Hallo, sie heißt Maria']
    },
    {
      type: 'multipleChoice',
      prompt: 'Which document do you need to register at the city hall?',
      correctAnswer: 'Passport',
      options: ['Passport', 'Student ID', 'Driver\'s License', 'Library Card']
    },
    {
      type: 'translation',
      prompt: 'Translate: "I am looking for an apartment"',
      correctAnswer: 'Ich suche eine Wohnung',
      options: ['Ich suche eine Wohnung', 'Ich finde eine Wohnung', 'Ich lebe in einer Wohnung', 'Ich habe eine Wohnung']
    },
    {
      type: 'multipleChoice',
      prompt: 'What is the German word for "job"?',
      correctAnswer: 'Arbeit',
      options: ['Schule', 'Haus', 'Arbeit', 'Freund']
    },
    {
      type: 'match',
      prompt: 'Match the word with its meaning',
      correctAnswer: 'Aufenthaltstitel',
      options: ['Aufenthaltstitel', 'Anmeldung', 'Termin', 'Führungszeugnis'],
      imageUrl: 'https://example.com/image.jpg'
    }
  ];

  // Update progress when current question changes
  useEffect(() => {
    setProgress(Math.round(((currentQuestionIndex) / questions.length) * 100));
  }, [currentQuestionIndex, questions.length]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const checkAnswer = () => {
    if (!selectedAnswer) return;
    
    const correct = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setStreak(prev => prev + 1);
      setXp(prev => prev + 10 + (streak * 2)); // Bonus XP for streaks
    } else {
      setHearts(prev => prev - 1);
      setStreak(0);
    }
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex === questions.length - 1 || hearts <= 0) {
        // Lesson complete or failed
        updateModuleProgress(moduleId, lessonId, questions.length);
        setShowCompleteScreen(true);
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }
    }, 1500);
  };
  
  if (showCompleteScreen) {
    const passed = hearts > 0;
    
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-white rounded-xl">
        <div className={`text-center mb-6 ${passed ? 'text-green-500' : 'text-red-500'}`}>
          {passed ? (
            <div className="flex flex-col items-center">
              <Trophy className="h-24 w-24 mb-4 text-yellow-500" />
              <h2 className="text-2xl font-bold mb-2">Lesson Complete!</h2>
              <div className="text-5xl font-bold mb-6">+{xp} XP</div>
              
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="bg-blue-100 p-3 rounded-full mb-2">
                    <Star className="h-8 w-8 text-blue-500" />
                  </div>
                  <span className="text-sm text-slate-600">Streak: {streak}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-purple-100 p-3 rounded-full mb-2">
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                  <span className="text-sm text-slate-600">Level Up!</span>
                </div>
              </div>
              
              <div className="mt-2 bg-blue-50 p-4 rounded-lg text-blue-700 text-sm">
                <p>🔥 You're on a learning streak! Keep it up to earn more rewards.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <X className="h-20 w-20 mb-4 p-4 bg-red-100 rounded-full" />
              <h2 className="text-2xl font-bold mb-4">Lesson Failed</h2>
              <p className="text-slate-600 mb-4">Try again to earn XP and rewards.</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-4 mt-6">
          <button 
            onClick={onExit}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-lg"
          >
            Exit
          </button>
          <button 
            onClick={() => {
              // Reset lesson state
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setIsCorrect(null);
              setStreak(0);
              setHearts(3);
              setXp(0);
              setShowCompleteScreen(false);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-2"
          >
            Try Again <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden">
      {/* Top Bar with progress & hearts */}
      <div className="px-4 py-3 bg-blue-50 border-b border-blue-100 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onExit}
            className="mr-4 text-slate-600 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="w-48 bg-slate-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm text-slate-600">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">
            {Array(hearts).fill(0).map((_, i) => (
              <span key={i} className="text-red-500 text-lg">❤️</span>
            ))}
          </span>
          
          <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-1 rounded flex items-center">
            <Star className="h-3.5 w-3.5 mr-1" /> 
            <span>{xp} XP</span>
          </div>
        </div>
      </div>
      
      {/* Question Area */}
      <div className="flex-grow p-6 flex flex-col">
        <div className="mb-8">
          <div className="text-sm text-slate-500 mb-2">
            {currentQuestion.type === 'translation' ? 'Translate this sentence' : 
             currentQuestion.type === 'multipleChoice' ? 'Choose the correct answer' :
             currentQuestion.type === 'match' ? 'Select the matching term' : 'Arrange the words'}
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">{currentQuestion.prompt}</h2>
          
          {currentQuestion.imageUrl && (
            <div className="mb-4 bg-slate-100 p-2 rounded-lg">
              <div className="aspect-video bg-slate-200 rounded flex items-center justify-center">
                <span className="text-slate-500">Image placeholder</span>
              </div>
            </div>
          )}
          
          {currentQuestion.audio && (
            <button className="flex items-center gap-2 text-blue-600 mb-4">
              <Volume2 className="h-5 w-5" />
              <span>Listen</span>
            </button>
          )}
        </div>
        
        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg border text-left ${
                selectedAnswer === option 
                  ? isCorrect === null
                    ? 'border-blue-500 bg-blue-50' 
                    : isCorrect 
                      ? 'border-green-500 bg-green-50'
                      : 'border-red-500 bg-red-50'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
              onClick={() => handleAnswerSelect(option)}
              disabled={isCorrect !== null}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer === option && isCorrect !== null && (
                  isCorrect ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="px-6 py-4 border-t border-slate-200">
        <button
          onClick={checkAnswer}
          disabled={!selectedAnswer || isCorrect !== null}
          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
            !selectedAnswer || isCorrect !== null
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Check
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}