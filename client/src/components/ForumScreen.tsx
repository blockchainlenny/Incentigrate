import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
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
  ThumbsUp
} from 'lucide-react';

// Mock forum post data (in a real app, this would come from backend API)
interface ForumPost {
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

const mockPosts: ForumPost[] = [
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
    author: 'Mohammad S.',
    authorImage: 'https://api.dicebear.com/7.x/initials/svg?seed=MS',
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

export default function ForumScreen() {
  const { isLoggedIn, userName } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState('recent');
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  
  // Toggle post expansion
  const togglePostExpansion = (postId: string) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
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
  
  // Filter posts based on search and category
  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = 
      searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'announcements' && post.isAnnouncement) ||
      post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
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

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Community Forum</h1>
      <p className="text-slate-600 mb-6">
        Connect with others on their integration journey, share experiences, ask questions, 
        and find support for your specific challenges.
      </p>
      
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
              }`}
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
                  <button className="flex items-center text-sm text-slate-500 hover:text-slate-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>{post.replies} replies</span>
                  </button>
                </div>
                <div>
                  <button className="flex items-center text-sm text-slate-500 hover:text-slate-700">
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
    </div>
  );
}