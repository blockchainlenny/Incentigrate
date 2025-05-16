import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import HelpAssistant from './HelpAssistant';
import { 
  MessageSquare, 
  Users, 
  Star, 
  MessageCircle, 
  Award, 
  Search, 
  Filter,
  ChevronDown,
  ChevronUp,
  Share2,
  Heart,
  ThumbsUp,
  Globe,
  Flag
} from 'lucide-react';

// Old forum post interface (keeping for backward compatibility)
interface OldForumPost {
  id: string;
  title: string;
  author: string;
  authorImage: string;
  time: string;
  category: string;
  content: string;
  tags: string[];
  replies: number;
  likes: number;
  isAnnouncement?: boolean;
  isLiked?: boolean;
}

// New forum post interface with language
interface ForumPost extends OldForumPost {
  language: 'en' | 'de' | 'ar'; // English, German, Arabic
}

const mockPosts: OldForumPost[] = [
  {
    id: 'post1',
    title: 'Important: New Integration Resources Available',
    author: 'Incentigrate Team',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=IT',
    time: '2 days ago',
    category: 'Announcements',
    content: 'We\'ve added new resources to help with residence registration and finding housing. Check out the Integration Journey section for updated guidance on completing these essential steps.',
    tags: ['official', 'resources', 'announcement'],
    replies: 7,
    likes: 23,
    isAnnouncement: true
  },
  {
    id: 'post2',
    title: 'Tips for passing the B1 German language exam?',
    author: 'Mohammed Al-Farsi',
    authorImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MS&mouth=smile&eyes=happy&backgroundColor=b6e3f4',
    time: '5 hours ago',
    category: 'Language Learning',
    content: 'I\'m preparing for the B1 language exam next month and feeling nervous. Has anyone here taken it recently? Any advice on the speaking portion? I\'m particularly worried about that part.',
    tags: ['german', 'language-exam', 'b1-level'],
    replies: 12,
    likes: 8
  },
  {
    id: 'post3',
    title: 'Successfully got my residence permit today!',
    author: 'Amina K.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=AK',
    time: '1 day ago',
    category: 'Success Stories',
    content: 'After months of waiting and gathering documents, I finally received my residence permit today! The process was complicated but worth it. Happy to answer questions if anyone is going through the same process.',
    tags: ['residence-permit', 'bureaucracy', 'success'],
    replies: 18,
    likes: 45
  },
  {
    id: 'post4',
    title: 'Job opportunities for English speakers?',
    author: 'Raj P.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=RP',
    time: '3 days ago',
    category: 'Employment',
    content: 'I\'m still working on my German but need to find a job soon. Does anyone know companies that hire English speakers in Berlin? I have experience in IT support and some web development skills.',
    tags: ['jobs', 'english', 'berlin', 'it'],
    replies: 9,
    likes: 12
  },
  {
    id: 'post5',
    title: 'Affordable housing in Munich - is it possible?',
    author: 'Sophia L.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=SL',
    time: '1 week ago',
    category: 'Housing',
    content: 'I\'ve been searching for an apartment in Munich for two months now and everything is so expensive. Are there any neighborhoods or resources I should be looking at? Any tips for standing out in applications?',
    tags: ['housing', 'munich', 'rent'],
    replies: 21,
    likes: 19
  }
];

// Forum categories
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'announcements', name: 'Announcements' },
  { id: 'language', name: 'Language Learning' },
  { id: 'employment', name: 'Employment' },
  { id: 'housing', name: 'Housing' },
  { id: 'bureaucracy', name: 'Bureaucracy Help' },
  { id: 'culture', name: 'Culture & Social' },
  { id: 'success', name: 'Success Stories' },
  { id: 'questions', name: 'General Questions' },
];

// This interface is no longer needed as we're using OldForumPost extended in ForumPost

// Add language-specific forum posts for Arabic and German
const arabicPosts: ForumPost[] = [
  {
    id: 'ar-post1',
    title: 'نصائح لتعلم اللغة الألمانية بسرعة',
    author: 'Fatima H.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=FH',
    time: '3 days ago',
    category: 'Language Learning',
    content: 'أنا أدرس اللغة الألمانية منذ ثلاثة أشهر وأريد مشاركة بعض النصائح التي ساعدتني على التعلم بشكل أسرع. أهم شيء هو الممارسة اليومية والاستماع إلى المحتوى الألماني.',
    tags: ['german', 'learning-tips', 'language'],
    replies: 7,
    likes: 15,
    language: 'ar'
  },
  {
    id: 'ar-post2',
    title: 'تجربتي مع مكتب العمل في ألمانيا',
    author: 'Youssef M.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=YM',
    time: '1 week ago',
    category: 'Bureaucracy Help',
    content: 'زرت مكتب العمل الأسبوع الماضي وأود مشاركة تجربتي. المستندات التي احتجتها هي... الخطوات التي اتبعتها كانت...',
    tags: ['employment-office', 'documents', 'experience'],
    replies: 12,
    likes: 8,
    language: 'ar'
  },
  {
    id: 'ar-post3',
    title: 'المدارس العربية في برلين',
    author: 'Layla K.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=LK',
    time: '4 days ago',
    category: 'Education',
    content: 'هل يعرف أحد مدارس عربية جيدة في برلين؟ أريد أن يتعلم أطفالي اللغة العربية بجانب الألمانية.',
    tags: ['arabic-schools', 'berlin', 'education'],
    replies: 9,
    likes: 6,
    language: 'ar'
  }
];

const germanPosts: ForumPost[] = [
  {
    id: 'de-post1',
    title: 'Hilfe bei Anmeldung einer neuen Wohnung',
    author: 'Tobias M.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=TM',
    time: '2 days ago',
    category: 'Bureaucracy Help',
    content: 'Ich bin vor kurzem umgezogen und muss meine neue Wohnung anmelden. Welche Dokumente brauche ich dafür und wie läuft der Prozess ab?',
    tags: ['anmeldung', 'wohnung', 'bürokratie'],
    replies: 14,
    likes: 10,
    language: 'de'
  },
  {
    id: 'de-post2',
    title: 'Sprachcafé in Hamburg',
    author: 'Laura S.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=LS',
    time: '1 day ago',
    category: 'Language Learning',
    content: 'Wir organisieren ein Sprachcafé in Hamburg, wo Menschen verschiedener Kulturen zusammenkommen können. Kommt vorbei und übt Deutsch oder andere Sprachen in entspannter Atmosphäre!',
    tags: ['sprachcafé', 'hamburg', 'deutsch-lernen'],
    replies: 8,
    likes: 22,
    language: 'de'
  },
  {
    id: 'de-post3',
    title: 'Tipps für die Integration im Arbeitsplatz',
    author: 'Stefan B.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=SB',
    time: '5 days ago',
    category: 'Employment',
    content: 'Ich arbeite seit einem Jahr in einem deutschen Unternehmen und möchte meine Erfahrungen teilen, wie man sich am besten integrieren kann.',
    tags: ['arbeitsplatz', 'integration', 'erfahrung'],
    replies: 17,
    likes: 35,
    language: 'de'
  }
];

// Update the existing posts to include language
const englishPosts: ForumPost[] = mockPosts.map(post => ({
  ...post,
  language: 'en'
}));

// Combine all language posts
const allLanguagePosts = [...englishPosts, ...germanPosts, ...arabicPosts];

export default function ForumScreen() {
  const { isLoggedIn, userName } = useAppContext();
  const { t } = useLanguage(); // Add translation support
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('recent');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'de' | 'ar' | 'all'>('all');
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  
  // Toggle post expansion
  const togglePostExpansion = (postId: string) => {
    const isExpanding = expandedPostId !== postId;
    setExpandedPostId(isExpanding ? postId : null);
    
    // Simulate clicking on a post - in a real app, this would fetch post details and replies
    if (isExpanding) {
      // This would be a real API call in a production app
      console.log(`Fetching details for post ${postId}`);
      setShowReplyForm(false); // Reset reply form when opening a new post
    }
  };
  
  // Handle showing reply form 
  const handleReplyClick = (postId: string) => {
    if (!isLoggedIn) return;
    
    setExpandedPostId(postId);
    setShowReplyForm(true);
    setReplyContent('');
  };
  
  // Submit a reply
  const submitReply = (postId: string) => {
    if (!replyContent.trim() || !isLoggedIn) return;
    
    console.log(`Submitting reply to post ${postId}: ${replyContent}`);
    // In a real app, this would be an API call to submit the reply
    
    // Reset form
    setReplyContent('');
    setShowReplyForm(false);
    
    // Show success message or update UI to show the new reply
    alert('Your reply has been posted!');
  };
  
  // Toggle like on a post
  const toggleLike = (postId: string) => {
    if (!isLoggedIn) return;
    
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId) 
        : [...prev, postId]
    );
  };
  
  // Filter posts based on search, category, and language
  const filteredPosts = allLanguagePosts.filter(post => {
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'announcements' && post.isAnnouncement) ||
      post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesLanguage =
      selectedLanguage === 'all' ||
      post.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });
  
  // Sort posts based on selected option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOption) {
      case 'recent':
        // Simple mock sorting by time (in a real app would use actual dates)
        return a.time.includes('hour') ? -1 : 1;
      case 'popular':
        return b.likes - a.likes;
      case 'most_replies':
        return b.replies - a.replies;
      default:
        return 0;
    }
  });

  // Get language name and flag
  const getLanguageName = (code: string) => {
    switch(code) {
      case 'en': return 'English';
      case 'de': return 'Deutsch';
      case 'ar': return 'العربية';
      default: return 'All Languages';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">{t('forum')}</h1>
      <p className="text-slate-600 mb-6">
        {t('discussions')}. {t('share')} {t('yourProgress')}.
      </p>
      
      {/* Language Tabs */}
      <div className="mb-6 border-b border-slate-200">
        <div className="flex flex-wrap">
          <button
            onClick={() => setSelectedLanguage('all')}
            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
              selectedLanguage === 'all' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <Globe className="inline-block h-4 w-4 mr-1.5" />
            {t('allCategories')}
          </button>
          
          <button
            onClick={() => setSelectedLanguage('en')}
            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
              selectedLanguage === 'en' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span className="inline-block mr-1.5">🇬🇧</span>
            English
          </button>
          
          <button
            onClick={() => setSelectedLanguage('de')}
            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
              selectedLanguage === 'de' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span className="inline-block mr-1.5">🇩🇪</span>
            Deutsch
          </button>
          
          <button
            onClick={() => setSelectedLanguage('ar')}
            className={`px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
              selectedLanguage === 'ar' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            <span className="inline-block mr-1.5">🇸🇦</span>
            العربية
          </button>
        </div>
      </div>
      
      {/* Selected Language Indicator */}
      {selectedLanguage !== 'all' && (
        <div className="mb-4 bg-blue-50 rounded-md p-3 flex items-center">
          <Globe className="h-5 w-5 text-blue-600 mr-2" />
          <p className="text-blue-700">
            Showing discussions in <span className="font-medium">{getLanguageName(selectedLanguage)}</span>.
            {selectedLanguage === 'ar' && " Posts are displayed right-to-left for better readability."}
          </p>
        </div>
      )}
      
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              className="border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select
              className="border border-slate-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="most_replies">Most Replies</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* New Post Button */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">Discussions</h2>
        <button 
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            isLoggedIn 
              ? 'bg-blue-600 hover:bg-blue-700 text-white transition-colors' 
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
          disabled={!isLoggedIn}
          title={isLoggedIn ? 'Start a new discussion' : 'Please log in to post'}
          onClick={() => {
            if (isLoggedIn) {
              alert("Creating a new forum post! In a full implementation, this would open a form to create a new post.");
            }
          }}
        >
          <MessageCircle className="h-4 w-4 inline mr-1" />
          New Post
        </button>
      </div>
      
      {/* Posts List */}
      <div className="space-y-4">
        {sortedPosts.map(post => {
          const isExpanded = expandedPostId === post.id;
          const isLiked = likedPosts.includes(post.id);
          
          return (
            <div 
              key={post.id}
              className={`bg-white rounded-lg shadow-sm border ${
                post.isAnnouncement ? 'border-blue-200' : 'border-slate-200'
              } cursor-pointer hover:border-blue-300 transition-colors`}
              onClick={() => togglePostExpansion(post.id)}
            >
              {/* Post Header */}
              <div className={`p-4 ${post.isAnnouncement ? 'bg-blue-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {post.isAnnouncement && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                          Announcement
                        </span>
                      )}
                      <span className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-1 hover:text-blue-600 cursor-pointer" onClick={() => togglePostExpansion(post.id)}>
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500">
                      <img 
                        src={post.authorImage} 
                        alt={post.author} 
                        className="h-6 w-6 rounded-full mr-2" 
                      />
                      <span className="font-medium text-slate-700 mr-1">{post.author}</span>
                      <span className="mx-1">•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => togglePostExpansion(post.id)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
                
                {!isExpanded && (
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">
                    {post.content}
                  </p>
                )}
                
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-4 py-3 border-t border-slate-100">
                  <p className="text-slate-700 mb-4">{post.content}</p>
                  
                  {/* AI-generated replies section */}
                  <div className="mt-6 space-y-4">
                    <h4 className="font-medium text-slate-800 flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" /> 
                      Replies ({post.replies})
                    </h4>
                    
                    {/* Example replies - these would come from an API in a real app */}
                    <div className="space-y-4 pl-2 border-l-2 border-slate-100">
                      <div className="flex items-start gap-3">
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=KL&mouth=smile&eyes=happy&backgroundColor=b6e3f4" 
                          alt="Karma L." 
                          className="h-8 w-8 rounded-full mt-1" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-slate-800 mr-2">Karma L.</span>
                            <span className="text-xs text-slate-500">2 days ago</span>
                          </div>
                          <p className="text-sm text-slate-700">
                            I just took the B1 exam last month! For the speaking portion, practice with a language partner as much as you can. I found an online language exchange and it really helped with my confidence.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <img 
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=JS&mouth=smile&eyes=happy&backgroundColor=b6e3f4" 
                          alt="John S." 
                          className="h-8 w-8 rounded-full mt-1" 
                        />
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-slate-800 mr-2">John S.</span>
                            <span className="text-xs text-slate-500">1 day ago</span>
                          </div>
                          <p className="text-sm text-slate-700">
                            Make sure to review common everyday scenarios - like ordering at a restaurant, asking for directions, describing your job. I was asked to role play a situation at a doctor's office and was glad I had practiced medical vocabulary!
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Reply form */}
                    {showReplyForm && (
                      <div className="mt-6 bg-slate-50 p-3 rounded-md">
                        <h4 className="font-medium text-slate-800 mb-2">Post a reply</h4>
                        <textarea
                          className="w-full border border-slate-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                          rows={3}
                          placeholder="Write your reply..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end gap-2">
                          <button 
                            className="px-3 py-1 text-sm bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300"
                            onClick={() => setShowReplyForm(false)}
                          >
                            Cancel
                          </button>
                          <button 
                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={() => submitReply(post.id)}
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Post Footer */}
              <div className="px-4 py-2 border-t border-slate-100 flex justify-between">
                <div className="flex space-x-4">
                  <button 
                    className={`flex items-center text-sm ${
                      isLiked 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-slate-500 hover:text-slate-700'
                    } ${!isLoggedIn ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={() => toggleLike(post.id)}
                    disabled={!isLoggedIn}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{post.likes + (isLiked ? 1 : 0)}</span>
                  </button>
                  <button 
                    className="flex items-center text-sm text-slate-500 hover:text-slate-700"
                    onClick={() => handleReplyClick(post.id)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{post.replies} replies</span>
                  </button>
                </div>
                <div>
                  <button 
                    className="flex items-center text-sm text-slate-500 hover:text-slate-700"
                    onClick={() => {
                      // In a real app, this would open a share dialog
                      alert(`Share this post: ${post.title}`);
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredPosts.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
            <div className="flex justify-center mb-3">
              <Search className="h-12 w-12 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-700 mb-1">No discussions found</h3>
            <p className="text-slate-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      {/* Login to Participate Message */}
      {!isLoggedIn && (
        <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Join the conversation</h3>
          <p className="text-blue-700 mb-4">
            Log in or connect your wallet to participate in discussions, like posts, and share your own experiences.
          </p>
        </div>
      )}
      
      {/* Forum Guidelines */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-slate-200 p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-3">Community Guidelines</h3>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
          <li>Be respectful and considerate of others' experiences and questions.</li>
          <li>Share accurate information and cite official sources when possible.</li>
          <li>Protect your privacy - don't share personal identification documents or numbers.</li>
          <li>Use appropriate categories and tags to help others find relevant discussions.</li>
          <li>Report inappropriate content to moderators.</li>
        </ul>
      </div>
      
      {/* AI Assistant for Forum */}
      <HelpAssistant 
        context="forum"
        position="bottom-right"
        autoShow={true} 
        autoHideAfter={10000}
        pulse={true}
        size="md"
      />
    </div>
  );
}