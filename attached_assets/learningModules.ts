// This file contains the data for learning modules in the Incentigrate app
// Inspired by Kiron.ngo's learning approach, but adapted for our dApp context

export interface Lesson {
  id: number;
  title: string;
  description: string;
  xp: number; // Experience points awarded upon completion
  estimatedMinutes: number; // Estimated time to complete in minutes
  contentSummary?: string; // A brief summary of the content
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: 'Language' | 'Culture' | 'Professional Skills' | 'Digital Skills' | 'Legal & Bureaucracy';
  icon: string; // Name of the icon to use from lucide-react
  totalLessons: number;
  totalXp: number; // Sum of XP from all lessons
  duration: string; // e.g., "4 weeks"
  language: string; // Primary language of the content
  tags: string[];
  reward: number; // $O-Tokens awarded upon module completion
  lessons: Lesson[];
}

export const learningModules: LearningModule[] = [
  {
    id: "german-a1",
    title: "German Language Essentials: Level A1",
    description: "Start your journey with basic German grammar, vocabulary, and everyday phrases to build a foundation for life in German-speaking regions.",
    category: "Language",
    icon: "BookMarked",
    totalLessons: 7,
    totalXp: 145,
    duration: "4 weeks",
    language: "English/German",
    tags: ["Beginner", "German", "Grammar"],
    reward: 50,
    lessons: [
      {
        id: 1,
        title: "Greetings & Introductions",
        description: "Learn basic greetings, how to introduce yourself, and simple conversational phrases in German.",
        xp: 10,
        estimatedMinutes: 45,
        contentSummary: "Covers 'Guten Tag', 'Wie heißen Sie?', 'Ich heiße...', 'Woher kommen Sie?', 'Ich komme aus...' and other basic phrases."
      },
      {
        id: 2,
        title: "Basic Nouns & Articles",
        description: "Understand German nouns and the three grammatical genders (der, die, das) with common everyday vocabulary.",
        xp: 10,
        estimatedMinutes: 60,
        contentSummary: "Introduction to German nouns, articles (der, die, das), and plural forms with everyday vocabulary."
      },
      {
        id: 3,
        title: "Simple Verbs (sein, haben)",
        description: "Master the essential verbs 'sein' (to be) and 'haben' (to have) and their conjugations in the present tense.",
        xp: 15,
        estimatedMinutes: 50,
        contentSummary: "Conjugation of 'sein' and 'haben' in present tense with examples and practice exercises."
      },
      {
        id: 4,
        title: "Numbers & Telling Time",
        description: "Learn German numbers 1-100 and how to tell time, including asking and answering questions about time.",
        xp: 15,
        estimatedMinutes: 45,
        contentSummary: "Numbers from 1-100, telling time, asking 'Wie spät ist es?' and understanding time-related phrases."
      },
      {
        id: 5,
        title: "Quiz 1: Vocabulary Check",
        description: "Test your knowledge of the vocabulary and grammar covered in lessons 1-4.",
        xp: 25,
        estimatedMinutes: 30,
        contentSummary: "Interactive quiz covering greetings, introductions, basic nouns, articles, verbs, numbers, and time."
      },
      {
        id: 6,
        title: "Asking for Directions",
        description: "Learn how to ask for and understand directions in German, including locations and transportation.",
        xp: 20,
        estimatedMinutes: 45,
        contentSummary: "Vocabulary for directions, locations, transportation, and phrases like 'Wo ist...?', 'Wie komme ich zu...?'"
      },
      {
        id: 7,
        title: "Final Assessment: Level A1",
        description: "Demonstrate your A1 level German skills with this comprehensive final assessment.",
        xp: 50,
        estimatedMinutes: 60,
        contentSummary: "Comprehensive assessment covering all A1 topics with reading, writing, and comprehension exercises."
      }
    ]
  },
  {
    id: "cultural-integration",
    title: "Cultural Integration in Germany",
    description: "Learn about German customs, social etiquette, and important cultural norms to help you integrate effectively into German society.",
    category: "Culture",
    icon: "TrendingUp",
    totalLessons: 6,
    totalXp: 130,
    duration: "3 weeks",
    language: "English/German",
    tags: ["Culture", "Germany", "Integration"],
    reward: 45,
    lessons: [
      {
        id: 1,
        title: "Daily Life & Social Norms",
        description: "Understand daily routines, social expectations, and common practices in German society.",
        xp: 15,
        estimatedMinutes: 40,
        contentSummary: "Overview of daily life, punctuality, social expectations, public behavior, and typical daily routines."
      },
      {
        id: 2,
        title: "Housing & Neighborhood",
        description: "Learn about housing types, rental processes, utilities, and neighborhood etiquette in Germany.",
        xp: 20,
        estimatedMinutes: 50,
        contentSummary: "Types of housing, rental agreements, utilities, recycling rules, and being a good neighbor."
      },
      {
        id: 3,
        title: "German Festivals & Holidays",
        description: "Discover the major German holidays, festivals, and celebrations throughout the year.",
        xp: 15,
        estimatedMinutes: 45,
        contentSummary: "Major holidays like Christmas, Easter, Oktoberfest, and regional celebrations with their customs and traditions."
      },
      {
        id: 4,
        title: "Food & Dining Etiquette",
        description: "Explore German cuisine, dining customs, and restaurant etiquette.",
        xp: 15,
        estimatedMinutes: 40,
        contentSummary: "German dishes, meal times, table manners, restaurant vocabulary, and tipping practices."
      },
      {
        id: 5,
        title: "Public Services & Transportation",
        description: "Navigate the German public transportation system and access essential public services.",
        xp: 25,
        estimatedMinutes: 60,
        contentSummary: "Using trains, buses, trams, buying tickets, accessing libraries, swimming pools, and other public services."
      },
      {
        id: 6,
        title: "Cultural Integration Project",
        description: "Apply your knowledge by completing a cultural integration project about life in Germany.",
        xp: 40,
        estimatedMinutes: 90,
        contentSummary: "Create a personal cultural guide for newcomers based on what you've learned about German culture and customs."
      }
    ]
  },
  {
    id: "bureaucracy-navigation",
    title: "Navigating Local Services & Bureaucracy",
    description: "A practical guide to accessing essential services, understanding forms, and bureaucracy in your new country.",
    category: "Legal & Bureaucracy",
    icon: "FileText",
    totalLessons: 7,
    totalXp: 165,
    duration: "5 weeks",
    language: "English/German",
    tags: ["Services", "Bureaucracy", "Daily Life", "Legal"],
    reward: 55,
    lessons: [
      {
        id: 1,
        title: "Residence Registration (Anmeldung)",
        description: "Learn about the mandatory residence registration process and how to complete it.",
        xp: 20,
        estimatedMinutes: 45,
        contentSummary: "The registration process, required documents, deadlines, and step-by-step guide to registering your address."
      },
      {
        id: 2,
        title: "Visa & Residency Permits",
        description: "Understand different visa types, residency permits, and the application process.",
        xp: 25,
        estimatedMinutes: 60,
        contentSummary: "Types of visas, residency permit options, application requirements, and renewal procedures."
      },
      {
        id: 3,
        title: "Healthcare System Basics",
        description: "Navigate the healthcare system, health insurance options, and accessing medical services.",
        xp: 25,
        estimatedMinutes: 55,
        contentSummary: "Public vs. private health insurance, finding doctors, emergency services, pharmacies, and medical vocabulary."
      },
      {
        id: 4,
        title: "Banking & Finance",
        description: "Set up a bank account, understand financial services, and manage your finances.",
        xp: 20,
        estimatedMinutes: 50,
        contentSummary: "Bank account options, required documents, online banking, transfers, direct debits, and financial terminology."
      },
      {
        id: 5,
        title: "Social Welfare & Benefits",
        description: "Learn about available social welfare programs, benefits, and how to apply for assistance.",
        xp: 25,
        estimatedMinutes: 60,
        contentSummary: "Overview of social welfare system, unemployment benefits, housing assistance, child benefits, and application procedures."
      },
      {
        id: 6,
        title: "Tax Basics",
        description: "Understand the tax system, tax ID, tax classes, and basic tax filing requirements.",
        xp: 20,
        estimatedMinutes: 45,
        contentSummary: "Tax ID (Steueridentifikationsnummer), tax classes, income tax basics, and the tax calendar."
      },
      {
        id: 7,
        title: "Bureaucracy Navigation Assessment",
        description: "Test your knowledge and ability to navigate bureaucratic systems with practical scenarios.",
        xp: 30,
        estimatedMinutes: 40,
        contentSummary: "Practical assessment with real-life scenarios to solve using your knowledge of local bureaucracy and services."
      }
    ]
  },
  {
    id: "job-application",
    title: "Job Application Training",
    description: "Learn how to write a CV, cover letter and prepare for job interviews in Germany. Build essential skills for your job search.",
    category: "Professional Skills",
    icon: "Briefcase",
    totalLessons: 6,
    totalXp: 150,
    duration: "3 weeks",
    language: "English/German",
    tags: ["Career", "Job Search", "CV", "Interview Skills"],
    reward: 50,
    lessons: [
      {
        id: 1,
        title: "German Job Market Overview",
        description: "Understand the German job market, in-demand skills, and employment opportunities.",
        xp: 15,
        estimatedMinutes: 40,
        contentSummary: "Overview of the job market, major industries, employment types, and where to find job listings."
      },
      {
        id: 2,
        title: "CV Creation (Lebenslauf)",
        description: "Learn how to create a German-style CV that meets local expectations and standards.",
        xp: 25,
        estimatedMinutes: 60,
        contentSummary: "German CV format, content requirements, photo guidelines, and practical CV building exercise."
      },
      {
        id: 3,
        title: "Cover Letter Writing",
        description: "Master the art of writing compelling cover letters for German job applications.",
        xp: 25,
        estimatedMinutes: 55,
        contentSummary: "Cover letter structure, content, formal language, addressing employers, and example templates."
      },
      {
        id: 4,
        title: "Job Application Documents",
        description: "Understand the additional documents needed for a complete German job application.",
        xp: 20,
        estimatedMinutes: 45,
        contentSummary: "The 'Bewerbungsmappe' concept, certificates, diplomas, references, and document organization."
      },
      {
        id: 5,
        title: "Interview Preparation",
        description: "Prepare for job interviews with common questions, appropriate responses, and cultural expectations.",
        xp: 30,
        estimatedMinutes: 70,
        contentSummary: "Common interview questions, appropriate responses, dress code, body language, and follow-up etiquette."
      },
      {
        id: 6,
        title: "Job Application Simulation",
        description: "Put your skills into practice with a complete job application simulation from search to interview.",
        xp: 35,
        estimatedMinutes: 90,
        contentSummary: "Find a relevant job posting, create application documents, and prepare interview responses for that specific position."
      }
    ]
  },
  {
    id: "digital-skills",
    title: "Essential Digital Skills",
    description: "Build fundamental digital skills needed for education, employment, and daily life in a technology-driven society.",
    category: "Digital Skills",
    icon: "Laptop",
    totalLessons: 6,
    totalXp: 140,
    duration: "3 weeks",
    language: "English",
    tags: ["Digital Literacy", "Computers", "Internet", "Office Software"],
    reward: 45,
    lessons: [
      {
        id: 1,
        title: "Computer Basics",
        description: "Learn essential computer skills, terminology, and basic operating system functions.",
        xp: 20,
        estimatedMinutes: 50,
        contentSummary: "Computer terminology, operating system basics, file management, and basic troubleshooting."
      },
      {
        id: 2,
        title: "Internet Navigation & Safety",
        description: "Navigate the internet effectively and safely, understanding online security and privacy.",
        xp: 20,
        estimatedMinutes: 45,
        contentSummary: "Web browsers, search techniques, evaluating sources, protecting personal information, and avoiding scams."
      },
      {
        id: 3,
        title: "Email Communication",
        description: "Master email for professional and personal communication with proper etiquette.",
        xp: 15,
        estimatedMinutes: 40,
        contentSummary: "Email account setup, composing professional emails, attachments, organization, and email etiquette."
      },
      {
        id: 4,
        title: "Word Processing Fundamentals",
        description: "Create and format documents using word processing software.",
        xp: 25,
        estimatedMinutes: 60,
        contentSummary: "Document creation, formatting text, adding images, creating tables, and saving in different formats."
      },
      {
        id: 5,
        title: "Spreadsheet Basics",
        description: "Understand and use spreadsheets for organizing data and basic calculations.",
        xp: 25,
        estimatedMinutes: 60,
        contentSummary: "Creating spreadsheets, basic formulas, data organization, simple charts, and practical applications."
      },
      {
        id: 6,
        title: "Digital Skills Assessment",
        description: "Demonstrate your digital competency through a series of practical tasks.",
        xp: 35,
        estimatedMinutes: 45,
        contentSummary: "Practical assessment tasks covering all areas of digital skills learned in the previous lessons."
      }
    ]
  },
  {
    id: "first-coding-steps",
    title: "First Coding Steps",
    description: "Begin your journey into web development with this introduction to HTML, CSS, and basic JavaScript for beginners.",
    category: "Digital Skills",
    icon: "Code",
    totalLessons: 5,
    totalXp: 125,
    duration: "4 weeks",
    language: "English",
    tags: ["Coding", "Web Development", "HTML", "CSS", "JavaScript"],
    reward: 60,
    lessons: [
      {
        id: 1,
        title: "Introduction to Web Development",
        description: "Understand how websites work and get familiar with basic web development concepts.",
        xp: 15,
        estimatedMinutes: 40,
        contentSummary: "How the web works, client-server model, web browsers, and development tools introduction."
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        description: "Learn HTML to create the structure of web pages with various elements and attributes.",
        xp: 25,
        estimatedMinutes: 60,
        contentSummary: "HTML document structure, tags, elements, attributes, lists, links, images, and semantic HTML."
      },
      {
        id: 3,
        title: "CSS Styling Basics",
        description: "Use CSS to style your HTML pages with colors, fonts, layouts, and more.",
        xp: 30,
        estimatedMinutes: 70,
        contentSummary: "CSS syntax, selectors, colors, fonts, borders, margins, padding, and basic layouts."
      },
      {
        id: 4,
        title: "JavaScript Introduction",
        description: "Add interactivity to your web pages with basic JavaScript concepts.",
        xp: 35,
        estimatedMinutes: 80,
        contentSummary: "Basic JavaScript syntax, variables, functions, events, and simple DOM manipulation."
      },
      {
        id: 5,
        title: "Build Your Mini-Website",
        description: "Apply what you've learned to create a simple personal webpage from scratch.",
        xp: 40,
        estimatedMinutes: 120,
        contentSummary: "Project-based lesson to create a personal webpage using HTML, CSS, and simple JavaScript."
      }
    ]
  },
  {
    id: "english-essentials",
    title: "English Language Essentials",
    description: "Build practical English language skills for daily life, social interactions, and professional opportunities.",
    category: "Language",
    icon: "Languages",
    totalLessons: 6,
    totalXp: 130,
    duration: "4 weeks",
    language: "English",
    tags: ["English", "Communication", "Language", "Beginner"],
    reward: 45,
    lessons: [
      {
        id: 1,
        title: "Introduction & Basic Conversations",
        description: "Learn essential phrases for introducing yourself and having basic conversations in English.",
        xp: 15,
        estimatedMinutes: 45,
        contentSummary: "Greetings, introductions, basic questions and responses, common phrases for everyday situations."
      },
      {
        id: 2,
        title: "Practical Vocabulary",
        description: "Build vocabulary for everyday situations like shopping, transportation, and dining.",
        xp: 20,
        estimatedMinutes: 50,
        contentSummary: "Essential vocabulary for shopping, transportation, dining, healthcare, and other daily activities."
      },
      {
        id: 3,
        title: "Grammar Foundations",
        description: "Understand basic English grammar to construct proper sentences and questions.",
        xp: 25,
        estimatedMinutes: 60,
        contentSummary: "Basic sentence structure, present tense, past tense, future tense, and question formation."
      },
      {
        id: 4,
        title: "Reading & Comprehension",
        description: "Practice reading simple texts and understanding written English.",
        xp: 20,
        estimatedMinutes: 45,
        contentSummary: "Reading strategies, comprehension exercises, vocabulary in context, and simple texts."
      },
      {
        id: 5,
        title: "Professional Communication",
        description: "Learn English for workplace communication, including emails and job-related conversations.",
        xp: 25,
        estimatedMinutes: 55,
        contentSummary: "Professional greetings, email writing, workplace vocabulary, and handling job-related conversations."
      },
      {
        id: 6,
        title: "English Practical Assessment",
        description: "Demonstrate your English language skills through various practical exercises.",
        xp: 25,
        estimatedMinutes: 40,
        contentSummary: "Comprehensive assessment including listening, speaking, reading, and writing exercises."
      }
    ]
  }
];
