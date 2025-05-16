import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Search, ArrowRight, ArrowLeft, User, UserCheck } from "lucide-react";

interface ForumPost {
  id: number;
  title: string;
  author: string;
  authorImage: string;
  time: string;
  category: string;
  content: string;
  tags: string[];
  replies: number;
  isAnnouncement?: boolean;
}

export default function ForumScreen() {
  const { isLoggedIn } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock forum posts data
  const forumPosts: ForumPost[] = [
    {
      id: 1,
      title: "Tips for finding affordable housing in Berlin?",
      author: "Lisa M.",
      authorImage: "https://randomuser.me/api/portraits/women/32.jpg",
      time: "3 hours ago",
      category: "Housing",
      content: "I've been searching for an apartment for weeks with no luck. Does anyone have tips on finding affordable housing? I'm especially interested in WGs or temporary solutions while I continue my search...",
      tags: ["Affordable Housing", "Berlin", "WG"],
      replies: 12
    },
    {
      id: 2,
      title: "How did you find your first job in Germany?",
      author: "Ahmed K.",
      authorImage: "https://randomuser.me/api/portraits/men/45.jpg",
      time: "Yesterday",
      category: "Work & Employment",
      content: "I have a background in software engineering and I'm trying to find my first position in Germany. What job platforms work best? Did anyone have success with specific companies that are open to hiring internationals?",
      tags: ["Job Search", "Tech Jobs", "First Employment"],
      replies: 28
    },
    {
      id: 3,
      title: "ANNOUNCEMENT: New Tax Filing Workshop Next Week",
      author: "Moderator",
      authorImage: "",
      time: "2 days ago",
      category: "Announcement",
      content: "We're hosting a virtual workshop on filing taxes in Germany for newcomers. The session will cover basics of the German tax system, how to submit your first tax declaration, and common deductions. Join us on June 15th at 18:00 CET.",
      tags: ["Workshop", "Taxes", "Free Event"],
      replies: 5,
      isAnnouncement: true
    }
  ];

  const categories = [
    { id: "all", name: "All Discussions", count: forumPosts.length },
    { id: "language", name: "Language Learning", count: 24 },
    { id: "housing", name: "Housing", count: 18 },
    { id: "work", name: "Work & Employment", count: 15 },
    { id: "bureaucracy", name: "Bureaucracy Help", count: 31 },
    { id: "events", name: "Social Events", count: 7 },
    { id: "success", name: "Success Stories", count: 0 },
    { id: "general", name: "General Questions", count: 0 }
  ];

  const filteredPosts = activeCategory === "all" 
    ? forumPosts 
    : forumPosts.filter(post => post.category.toLowerCase().includes(activeCategory));

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Community Forum</h1>
        <p className="text-slate-600">Connect with other users, ask questions and share experiences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-slate-200 sticky top-20">
            <h3 className="font-medium text-slate-800 mb-3 px-2">Forum Categories</h3>
            <div className="space-y-1">
              {categories.map(category => (
                <button 
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-md ${
                    activeCategory === category.id 
                      ? "bg-themeBlue text-white font-medium" 
                      : "text-slate-700 hover:bg-slate-100"
                  } text-sm flex justify-between items-center`}
                >
                  <span>{category.name}</span>
                  {category.count > 0 && (
                    <span className={`${
                      activeCategory === category.id 
                        ? "bg-white/20 text-white" 
                        : "bg-slate-200 text-slate-600"
                      } text-xs px-2 py-0.5 rounded-full`}
                    >
                      {category.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-6 px-2">
              <button 
                onClick={() => {
                  if (!isLoggedIn) {
                    alert("Please log in to create a post");
                  }
                }}
                className="w-full bg-themeGreen hover:bg-teal-700 text-white font-medium py-2 rounded-md transition-colors"
              >
                Create New Post
              </button>
            </div>
          </div>
        </div>
        
        {/* Forum posts */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Recent Discussions</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">Sort by:</span>
                <select className="text-sm border border-slate-300 rounded-md px-2 py-1">
                  <option>Recent Activity</option>
                  <option>Most Popular</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search discussions..." 
                className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-4 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            </div>
            
            <div className="space-y-4">
              {filteredPosts.map(post => (
                <div 
                  key={post.id}
                  className={`border ${
                    post.isAnnouncement ? "border-slate-200 rounded-lg p-4 bg-blue-50" : "border-slate-200 rounded-lg p-4 hover:border-slate-300"
                  } transition-colors`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      {post.isAnnouncement ? (
                        <div className="bg-themeBlue text-white p-1.5 rounded-full flex items-center justify-center w-10 h-10">
                          <UserCheck className="h-5 w-5" />
                        </div>
                      ) : (
                        <img src={post.authorImage} alt={`${post.author} Avatar`} className="w-10 h-10 rounded-full" />
                      )}
                      <div>
                        <h3 className="font-medium text-slate-800">{post.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                          <span>Posted by <span className="text-themeBlue">{post.author}</span></span>
                          <span>•</span>
                          <span>{post.time}</span>
                          <span>•</span>
                          <span className={`${
                            post.isAnnouncement ? "text-purple-600" : "text-themeGreen"
                          }`}>{post.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-lg font-medium text-slate-700">{post.replies}</span>
                      <span className="text-xs text-slate-500">replies</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{post.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className={`text-xs ${
                          post.isAnnouncement 
                            ? "bg-blue-100 text-blue-700" 
                            : "bg-slate-100 text-slate-700"
                        } px-2 py-1 rounded-full`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <nav className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-500 hover:bg-slate-50">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-themeBlue text-white">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-300 text-slate-500 hover:bg-slate-50">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
