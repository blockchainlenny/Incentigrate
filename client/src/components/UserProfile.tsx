import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { 
  User, Briefcase, GraduationCap, Languages, Mail, Phone, Home, 
  MapPin, Award, Edit, Plus, Calendar, Medal, BookOpen
} from 'lucide-react';
import BadgeShowcase from './BadgeShowcase';
import HelpAssistant from './HelpAssistant';
import { useLanguage } from '../contexts/LanguageContext';

// Interface for the various sections in the profile
interface WorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  description?: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Fluent' | 'Native';
}

interface Skill {
  id: string;
  name: string;
  endorsements: number;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  isNFT: boolean;
  tokenId?: string;
  imageUrl: string;
}

export default function UserProfile() {
  const { isLoggedIn, userName, walletAddress, oTokenBalance } = useAppContext();
  const { t, currentLanguage } = useLanguage();
  const [editMode, setEditMode] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<string | null>(null);
  
  // Sample profile data (would typically come from API/backend)
  const [profile, setProfile] = useState({
    name: 'Mohammed Al-Farsi',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MAF&mouth=smile&eyes=happy&backgroundColor=b6e3f4',
    headline: 'Software Engineer | Recent Arrival Seeking Opportunities',
    location: 'Berlin, Germany',
    email: 'mohammed.al.farsi@example.com',
    phone: '+49 123 4567890',
    about: 'I am a software engineer with 5 years of experience in web development. I recently arrived in Germany and am looking for opportunities to contribute my skills. I am passionate about building user-friendly applications and solving complex problems.',
    workExperiences: [
      {
        id: 'work1',
        title: 'Senior Frontend Developer',
        company: 'Tech Solutions Inc.',
        location: 'Damascus, Syria',
        startDate: 'January 2018',
        endDate: 'December 2022',
        description: 'Led a team of 5 developers building web applications for clients. Implemented modern React-based architectures and improved performance by 40%.'
      },
      {
        id: 'work2',
        title: 'Web Developer',
        company: 'Digital Agency',
        location: 'Aleppo, Syria',
        startDate: 'March 2015',
        endDate: 'December 2017',
        description: 'Developed responsive websites for various clients using JavaScript, HTML, and CSS. Worked directly with clients to gather requirements and implement solutions.'
      }
    ] as WorkExperience[],
    education: [
      {
        id: 'edu1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Damascus',
        location: 'Damascus, Syria',
        startDate: 'September 2011',
        endDate: 'June 2015',
        description: 'Focused on software engineering and web development. Graduated with honors.'
      }
    ] as Education[],
    languages: [
      { id: 'lang1', name: 'Arabic', proficiency: 'Native' },
      { id: 'lang2', name: 'English', proficiency: 'Advanced' },
      { id: 'lang3', name: 'German', proficiency: 'Intermediate' }
    ] as Language[],
    skills: [
      { id: 'skill1', name: 'React', endorsements: 12 },
      { id: 'skill2', name: 'JavaScript', endorsements: 15 },
      { id: 'skill3', name: 'TypeScript', endorsements: 8 },
      { id: 'skill4', name: 'HTML/CSS', endorsements: 10 },
      { id: 'skill5', name: 'Node.js', endorsements: 7 }
    ] as Skill[],
    certificates: [
      {
        id: 'cert1',
        title: 'German A1 Language Certificate',
        issuer: 'Goethe-Institut',
        date: 'February 2023',
        isNFT: true,
        tokenId: '12345',
        imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=certificate1'
      },
      {
        id: 'cert2',
        title: 'City Registration Completion',
        issuer: 'Berlin City Administration',
        date: 'January 2023',
        isNFT: true,
        tokenId: '23456',
        imageUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=certificate2'
      }
    ] as Certificate[]
  });
  
  const handleEditToggle = (section: string) => {
    if (editMode === section) {
      setEditMode(null);
    } else {
      setEditMode(section);
    }
  };
  
  const handleAddToggle = (section: string) => {
    if (showAddForm === section) {
      setShowAddForm(null);
    } else {
      setShowAddForm(section);
    }
  };
  
  // Form handlers for different sections (simplified for demo)
  const updateProfile = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };
  
  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      id: `work${profile.workExperiences.length + 1}`,
      title: 'New Position',
      company: 'Company Name',
      location: 'Location',
      startDate: 'Start Date',
      endDate: 'End Date',
      description: 'Description of your role and responsibilities'
    };
    
    setProfile(prev => ({
      ...prev,
      workExperiences: [...prev.workExperiences, newExperience]
    }));
    
    setShowAddForm(null);
  };
  
  const addEducation = () => {
    const newEducation: Education = {
      id: `edu${profile.education.length + 1}`,
      degree: 'Degree',
      institution: 'Institution Name',
      location: 'Location',
      startDate: 'Start Date',
      endDate: 'End Date'
    };
    
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
    
    setShowAddForm(null);
  };
  
  const addLanguage = () => {
    const newLanguage: Language = {
      id: `lang${profile.languages.length + 1}`,
      name: 'Language Name',
      proficiency: 'Beginner'
    };
    
    setProfile(prev => ({
      ...prev,
      languages: [...prev.languages, newLanguage]
    }));
    
    setShowAddForm(null);
  };
  
  const addSkill = () => {
    const newSkill: Skill = {
      id: `skill${profile.skills.length + 1}`,
      name: 'Skill Name',
      endorsements: 0
    };
    
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }));
    
    setShowAddForm(null);
  };
  
  if (!isLoggedIn) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
        <User className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-slate-800 mb-2">Profile Not Available</h2>
        <p className="text-slate-600 mb-6">Please log in to view and edit your profile.</p>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          onClick={() => alert('Please connect your wallet or log in to access your profile.')}
        >
          Connect Wallet
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto relative">
      {/* Help Assistant */}
      <HelpAssistant context="profile" position="bottom-right" autoShow={true} />
      
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        <div className="px-6 pb-6 relative">
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="absolute -top-12 border-4 border-white rounded-full overflow-hidden h-24 w-24">
              <img 
                src={profile.photo} 
                alt={profile.name} 
                className="h-full w-full object-cover"
              />
            </div>
            
            <div className="mt-16 md:mt-6 md:ml-28 flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{profile.name}</h1>
                  <p className="text-slate-600">{profile.headline}</p>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{profile.location}</span>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button 
                    className="px-4 py-2 border border-slate-300 rounded-md text-slate-700 hover:bg-slate-50 text-sm font-medium"
                    onClick={() => handleEditToggle('basicInfo')}
                  >
                    <Edit className="h-4 w-4 inline mr-1" />
                    Edit Profile
                  </button>
                  
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                    <Award className="h-4 w-4 inline mr-1" />
                    Share Profile
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-slate-700">
                  <Mail className="h-4 w-4 mr-1.5 text-slate-500" />
                  <span>{profile.email}</span>
                </div>
                
                <div className="flex items-center text-slate-700">
                  <Phone className="h-4 w-4 mr-1.5 text-slate-500" />
                  <span>{profile.phone}</span>
                </div>
                
                {walletAddress && (
                  <div className="flex items-center text-slate-700">
                    <Award className="h-4 w-4 mr-1.5 text-slate-500" />
                    <span title={walletAddress}>
                      {walletAddress.substring(0, 8)}...{walletAddress.substring(walletAddress.length - 4)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Me */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">About</h2>
          <button 
            className="text-slate-500 hover:text-slate-700" 
            onClick={() => handleEditToggle('about')}
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
        
        {editMode === 'about' ? (
          <div className="mb-4">
            <textarea 
              className="w-full p-3 border border-slate-300 rounded-md"
              rows={4}
              value={profile.about}
              onChange={(e) => updateProfile('about', e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button 
                className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
                onClick={() => setEditMode(null)}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-600 whitespace-pre-line">{profile.about}</p>
        )}
      </div>
      
      {/* Achievement Badges */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Achievement Badges</h2>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            On-Chain Rewards
          </span>
        </div>
        
        {/* Import the BadgeShowcase component */}
        <div className="mb-6">
          <BadgeShowcase 
            showTitle={false} 
            maxDisplay={10} 
            onlyUnlocked={true}
            size="md"
          />
        </div>
      </div>
      
      {/* NFT Certificates */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Verified Certificates (NFTs)</h2>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Blockchain Verified
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {profile.certificates.map(certificate => (
            <div 
              key={certificate.id}
              className="border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video bg-gradient-to-r from-purple-100 to-indigo-100 relative">
                <img 
                  src={certificate.imageUrl} 
                  alt={certificate.title}
                  className="w-full h-full object-contain p-3"
                />
                {certificate.isNFT && (
                  <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-md">
                    NFT
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-slate-800">{certificate.title}</h3>
                <p className="text-slate-600 text-sm">Issued by {certificate.issuer}</p>
                <div className="flex items-center text-xs text-slate-500 mt-2">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>Earned: {certificate.date}</span>
                </div>
                
                {certificate.tokenId && (
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-slate-500">Token ID: {certificate.tokenId.substring(0, 6)}...</span>
                    <button className="text-blue-600 text-xs hover:underline">Verify</button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div className="border border-dashed border-slate-300 rounded-lg flex items-center justify-center p-6 hover:bg-slate-50 cursor-pointer">
            <div className="text-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <p className="mt-2 text-slate-600 font-medium">Add Certificate</p>
              <p className="text-xs text-slate-500">Upload a certificate or connect to verify an NFT</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Work Experience */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Work Experience</h2>
          <button 
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            onClick={() => handleAddToggle('work')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
        
        {showAddForm === 'work' && (
          <div className="mb-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
            <h3 className="font-medium text-slate-800 mb-3">Add Work Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="Job Title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="Company Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="City, Country" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Employment Type</label>
                <select className="w-full p-2 border border-slate-300 rounded-md">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="Month Year" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                <input type="text" className="w-full p-2 border border-slate-300 rounded-md" placeholder="Month Year or Present" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea className="w-full p-2 border border-slate-300 rounded-md" rows={3} placeholder="Describe your responsibilities, achievements, etc."></textarea>
            </div>
            <div className="flex justify-end gap-2">
              <button 
                className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded-md text-sm"
                onClick={() => setShowAddForm(null)}
              >
                Cancel
              </button>
              <button 
                className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm"
                onClick={addWorkExperience}
              >
                Save
              </button>
            </div>
          </div>
        )}
        
        <div className="space-y-6">
          {profile.workExperiences.map((experience, index) => (
            <div key={experience.id} className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-2.5 top-0 h-5 w-5 bg-white border-2 border-slate-300 rounded-full"></div>
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-slate-800">{experience.title}</h3>
                  <p className="text-slate-600">{experience.company} • {experience.location}</p>
                  <p className="text-sm text-slate-500">{experience.startDate} - {experience.endDate}</p>
                  <p className="mt-2 text-slate-600 text-sm">{experience.description}</p>
                </div>
                
                <button 
                  className="text-slate-400 hover:text-slate-600"
                  onClick={() => handleEditToggle(`work-${index}`)}
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Education */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">Education</h2>
          <button 
            className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
            onClick={() => handleAddToggle('education')}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </button>
        </div>
        
        <div className="space-y-6">
          {profile.education.map((education, index) => (
            <div key={education.id} className="relative pl-8 border-l-2 border-slate-200">
              <div className="absolute -left-2.5 top-0 h-5 w-5 bg-white border-2 border-slate-300 rounded-full"></div>
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-slate-800">{education.degree}</h3>
                  <p className="text-slate-600">{education.institution} • {education.location}</p>
                  <p className="text-sm text-slate-500">{education.startDate} - {education.endDate}</p>
                  {education.description && (
                    <p className="mt-2 text-slate-600 text-sm">{education.description}</p>
                  )}
                </div>
                
                <button 
                  className="text-slate-400 hover:text-slate-600"
                  onClick={() => handleEditToggle(`education-${index}`)}
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Languages & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Languages */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Languages</h2>
            <button 
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
              onClick={() => handleAddToggle('language')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
          
          <div className="space-y-3">
            {profile.languages.map((language, index) => (
              <div key={language.id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-slate-800">{language.name}</h3>
                  <p className="text-sm text-slate-500">{language.proficiency}</p>
                </div>
                
                <button 
                  className="text-slate-400 hover:text-slate-600"
                  onClick={() => handleEditToggle(`language-${index}`)}
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Skills */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Skills</h2>
            <button 
              className="text-blue-600 hover:text-blue-800 flex items-center text-sm"
              onClick={() => handleAddToggle('skill')}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <div 
                key={skill.id} 
                className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-full flex items-center"
              >
                <span>{skill.name}</span>
                {skill.endorsements > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded-full">
                    {skill.endorsements}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}