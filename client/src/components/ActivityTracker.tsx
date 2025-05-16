import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { 
  Timer, Footprints, Calendar, TrendingUp, 
  Award, BarChart, Sparkles, Landmark, 
  Building, School, BookOpen, Users
} from 'lucide-react';

type ActivityType = 'language_course' | 'cultural_event' | 'job_interview' | 'governmental_appointment' | 'community_meetup' | 'educational_course';

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  date: string;
  duration: number; // in minutes
  description: string;
  verified: boolean;
  location?: string;
  rewards: {
    tokens: number;
    xp: number;
  };
  proof?: string; // URL to photo or document
}

export default function ActivityTracker() {
  const { isLoggedIn, oTokenBalance } = useAppContext();
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [showNewActivityForm, setShowNewActivityForm] = useState(false);
  const [activityFilter, setActivityFilter] = useState<string | null>(null);
  
  // Sample past activities
  const pastActivities: Activity[] = [
    {
      id: 'act1',
      type: 'language_course',
      title: 'German A1 Course at VHS',
      date: '2025-05-14',
      duration: 120,
      description: 'Attended Module 3 of the German A1 course, focusing on everyday conversations.',
      verified: true,
      location: 'Volkshochschule Berlin',
      rewards: {
        tokens: 15,
        xp: 200
      }
    },
    {
      id: 'act2',
      type: 'governmental_appointment',
      title: 'Residence Permit Appointment',
      date: '2025-05-10',
      duration: 45,
      description: 'Successfully completed residence permit appointment and received temporary permit.',
      verified: true,
      location: 'Ausländerbehörde',
      rewards: {
        tokens: 25,
        xp: 300
      }
    },
    {
      id: 'act3',
      type: 'job_interview',
      title: 'Job Interview at Tech Startup',
      date: '2025-05-08',
      duration: 60,
      description: 'Interviewed for Junior Developer position at a local startup.',
      verified: false,
      location: 'Berlin Mitte',
      rewards: {
        tokens: 10,
        xp: 150
      }
    },
    {
      id: 'act4',
      type: 'cultural_event',
      title: 'Museum Day',
      date: '2025-05-01',
      duration: 180,
      description: 'Visited three museums during the Berlin Museum Day, learned about local history.',
      verified: true,
      location: 'Various Berlin Museums',
      rewards: {
        tokens: 8,
        xp: 120
      }
    },
    {
      id: 'act5',
      type: 'community_meetup',
      title: 'New Neighbors Community Event',
      date: '2025-04-25',
      duration: 150,
      description: 'Participated in cultural exchange event, shared traditional dishes and stories.',
      verified: true,
      location: 'Community Center',
      rewards: {
        tokens: 12,
        xp: 180
      }
    }
  ];
  
  // Filter activities based on selected type
  const filteredActivities = activityFilter
    ? pastActivities.filter(activity => activity.type === activityFilter)
    : pastActivities;
  
  // Stats calculation
  const totalHours = pastActivities.reduce((sum, act) => sum + act.duration, 0) / 60;
  const totalRewards = pastActivities.reduce((sum, act) => sum + act.rewards.tokens, 0);
  const totalXP = pastActivities.reduce((sum, act) => sum + act.rewards.xp, 0);
  const verifiedActivities = pastActivities.filter(act => act.verified).length;
  
  // Activity type info map
  const activityTypes = {
    language_course: { 
      label: 'Language Course', 
      icon: <BookOpen className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-100 text-blue-800'
    },
    cultural_event: { 
      label: 'Cultural Event', 
      icon: <Landmark className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-100 text-purple-800'
    },
    job_interview: { 
      label: 'Job Interview', 
      icon: <Building className="h-5 w-5 text-emerald-500" />,
      color: 'bg-emerald-100 text-emerald-800'
    },
    governmental_appointment: { 
      label: 'Government Appointment', 
      icon: <Landmark className="h-5 w-5 text-slate-500" />,
      color: 'bg-slate-100 text-slate-800'
    },
    community_meetup: { 
      label: 'Community Meetup', 
      icon: <Users className="h-5 w-5 text-pink-500" />,
      color: 'bg-pink-100 text-pink-800'
    },
    educational_course: { 
      label: 'Educational Course', 
      icon: <School className="h-5 w-5 text-amber-500" />,
      color: 'bg-amber-100 text-amber-800'
    }
  };
  
  const getActivityIcon = (type: ActivityType) => {
    return activityTypes[type]?.icon || <Award className="h-5 w-5" />;
  };
  
  const getActivityTypeLabel = (type: ActivityType) => {
    return activityTypes[type]?.label || 'Other Activity';
  };
  
  const getActivityTypeColor = (type: ActivityType) => {
    return activityTypes[type]?.color || 'bg-slate-100 text-slate-800';
  };
  
  const handleLogActivity = () => {
    if (!isLoggedIn) {
      alert('Please log in to track activities');
      return;
    }
    
    setShowNewActivityForm(true);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Left Column - Stats */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Your Progress</h2>
            
            <div className="flex flex-col gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-700 font-medium">Level Progress</span>
                  <span className="text-blue-800 font-semibold">Level 3</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-blue-600">
                  <span>750 / 1200 XP</span>
                  <span>Next: Level 4</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-purple-600 text-xs mb-1">$O Earned</span>
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-purple-600 mr-1" />
                      <span className="text-lg font-bold text-purple-800">{totalRewards}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-emerald-50 p-3 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-emerald-600 text-xs mb-1">Hours Logged</span>
                    <div className="flex items-center">
                      <Timer className="h-5 w-5 text-emerald-600 mr-1" />
                      <span className="text-lg font-bold text-emerald-800">{totalHours.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-amber-600 text-xs mb-1">Activities</span>
                    <div className="flex items-center">
                      <Footprints className="h-5 w-5 text-amber-600 mr-1" />
                      <span className="text-lg font-bold text-amber-800">{pastActivities.length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-sky-50 p-3 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-sky-600 text-xs mb-1">Verified</span>
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-sky-600 mr-1" />
                      <span className="text-lg font-bold text-sky-800">{verifiedActivities}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Activity Types */}
            <div className="mt-5">
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Activity Types</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    activityFilter === null ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  onClick={() => setActivityFilter(null)}
                >
                  All
                </button>
                
                {Object.entries(activityTypes).map(([type, info]) => (
                  <button 
                    key={type}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center ${
                      activityFilter === type ? info.color.replace('bg-', 'bg-').replace('text-', 'text-') : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => setActivityFilter(type as ActivityType)}
                  >
                    {info.icon}
                    <span className="ml-1">{info.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Log New Activity Button */}
          <button
            onClick={handleLogActivity}
            className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center justify-center"
            disabled={!isLoggedIn}
          >
            <Footprints className="h-5 w-5 mr-2" />
            Log New Activity
          </button>
        </div>
        
        {/* Right Column - Activity Log */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800">Activity Log</h2>
              <p className="text-slate-600 text-sm">Track your integration journey with real-world activities</p>
            </div>
            
            {filteredActivities.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredActivities.map(activity => (
                  <div 
                    key={activity.id}
                    className={`p-4 hover:bg-slate-50 transition-colors ${
                      selectedActivity?.id === activity.id ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedActivity(selectedActivity?.id === activity.id ? null : activity)}
                  >
                    <div className="flex items-start">
                      <div className={`p-2 rounded-lg ${getActivityTypeColor(activity.type).split(' ')[0]}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-semibold text-slate-800">{activity.title}</h3>
                          <div className="flex items-center">
                            <span className="text-amber-600 text-sm font-medium flex items-center">
                              <Award className="h-4 w-4 mr-1" />
                              {activity.rewards.tokens} $O
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          <span className={`inline-flex items-center text-xs ${getActivityTypeColor(activity.type)}`}>
                            {getActivityTypeLabel(activity.type)}
                          </span>
                          
                          <span className="text-slate-500 text-xs flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {activity.date}
                          </span>
                          
                          <span className="text-slate-500 text-xs flex items-center">
                            <Timer className="h-3 w-3 mr-1" />
                            {activity.duration} min
                          </span>
                          
                          {activity.verified && (
                            <span className="text-green-600 text-xs font-medium">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        
                        {selectedActivity?.id === activity.id && (
                          <div className="mt-3">
                            <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                            
                            {activity.location && (
                              <div className="text-xs text-slate-500 flex items-center mb-2">
                                <Building className="h-3.5 w-3.5 mr-1" />
                                Location: {activity.location}
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between text-xs mt-2">
                              <div className="flex gap-2">
                                <span className="text-blue-600 font-medium flex items-center">
                                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                                  {activity.rewards.xp} XP
                                </span>
                                
                                <span className="text-amber-600 font-medium flex items-center">
                                  <Award className="h-3.5 w-3.5 mr-1" />
                                  {activity.rewards.tokens} $O
                                </span>
                              </div>
                              
                              <button className="text-blue-600 hover:text-blue-800">
                                View Details
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Footprints className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-slate-700 mb-1">No activities found</h3>
                <p className="text-slate-500 mb-4">
                  {activityFilter 
                    ? `No ${getActivityTypeLabel(activityFilter as ActivityType)} activities found. Try selecting a different type.`
                    : 'Start logging your real-world integration activities to earn rewards.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Activity Form Dialog (simplified) */}
      {showNewActivityForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Log New Activity</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Activity Type</label>
                <select className="w-full p-2 border border-slate-300 rounded-md">
                  {Object.entries(activityTypes).map(([type, info]) => (
                    <option key={type} value={type}>{info.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="e.g., German A1 Class" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input type="date" className="w-full p-2 border border-slate-300 rounded-md" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Duration (minutes)</label>
                  <input type="number" className="w-full p-2 border border-slate-300 rounded-md" placeholder="60" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="e.g., Community Center" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea className="w-full p-2 border border-slate-300 rounded-md h-24" placeholder="Describe what you did, what you learned, etc."></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Proof (optional)</label>
                <div className="border border-dashed border-slate-300 rounded-md p-4 text-center">
                  <p className="text-sm text-slate-500 mb-2">Upload a photo, document or certificate</p>
                  <button type="button" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                    Choose File
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">Verified activities earn additional rewards</p>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button"
                  onClick={() => setShowNewActivityForm(false)}
                  className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={() => {
                    // In a real app, would save the activity
                    setShowNewActivityForm(false);
                    alert('Activity logged successfully! You earned 12 $O tokens and 150 XP.');
                  }}
                >
                  Log Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Login Prompt */}
      {!isLoggedIn && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Track Your Integration Journey</h3>
          <p className="text-blue-700 mb-4">
            Log in to record your real-world activities, earn rewards, and build your integration profile.
          </p>
        </div>
      )}
    </div>
  );
}