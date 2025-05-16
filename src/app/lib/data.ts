// Learning Module Types
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

// Integration Step Types
export type OfficialStatus = 'official' | 'unofficial';
export type StepDifficulty = 'easy' | 'medium' | 'hard';
export type IntegrationStepCategory =
  | 'Legal & Admin'
  | 'Language & Education'
  | 'Work & Profession'
  | 'Housing'
  | 'Social Integration'
  | 'Daily Life & Culture'
  | 'Health & Wellbeing'
  | 'Long-term Integration';

export interface SubTask {
  id: string;
  text: string;
}

export interface IntegrationStep {
  id: string;
  title: string;
  title_de: string;
  description: string;
  description_de: string;
  officialStatus: OfficialStatus;
  category: IntegrationStepCategory;
  difficulty: StepDifficulty;
  estimatedTime: string; // e.g., "1-2 hours", "Several days", "Ongoing"
  prerequisites?: string[]; // Array of Step IDs
  resources?: Array<{ text: string; text_de: string; url: string; type: 'link' | 'document' | 'video' }>;
  subTasks?: SubTask[];
  points?: number; // Points/XP for completing this step
  rewardToken?: number; // Token reward for this specific step
}

// Learning Modules Data
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
  }
];

// Integration Steps Data
export const integrationSteps: IntegrationStep[] = [
  // Category: Legal & Admin
  {
    id: "de_anmeldung",
    title: "Register Residence (Anmeldung)",
    title_de: "Wohnsitz anmelden (Anmeldung)",
    description: "Registering your address with the local registration office (Bürgeramt/Einwohnermeldeamt) is one of the first and most important official steps after arriving in Germany.",
    description_de: "Die Anmeldung Ihres Wohnsitzes beim örtlichen Bürgeramt/Einwohnermeldeamt ist einer der ersten und wichtigsten offiziellen Schritte nach Ihrer Ankunft in Deutschland.",
    officialStatus: "official",
    category: "Legal & Admin",
    difficulty: "medium",
    estimatedTime: "2-4 hours (incl. appointment wait time)",
    prerequisites: [],
    resources: [
      { text: "Official Info Berlin (Example)", text_de: "Offizielle Infos Berlin (Beispiel)", url: "https://service.berlin.de/dienstleistung/120686/", type: "link" },
      { text: "Video Guide: Anmeldung (Multilingual)", text_de: "Video-Anleitung: Anmeldung (Mehrsprachig)", url: "https://www.youtube.com/watch?v=examplevideoanmeldung", type: "video" }
    ],
    subTasks: [
      { id: "anm_1", text: "Find your local registration office (Bürgeramt/Einwohnermeldeamt)" },
      { id: "anm_2", text: "Book an appointment (online or by phone)" },
      { id: "anm_3", text: "Fill out the registration form (Anmeldeformular)" },
      { id: "anm_4", text: "Gather necessary documents (passport, rental agreement - Wohnungsgeberbestätigung)" },
      { id: "anm_5", text: "Attend the appointment and receive your registration certificate (Anmeldebestätigung)" }
    ],
    points: 50,
    rewardToken: 5
  },
  {
    id: "de_bank_account",
    title: "Open a Bank Account (Bankkonto)",
    title_de: "Bankkonto eröffnen",
    description: "Opening a German bank account is essential for receiving salary, paying rent, and daily transactions.",
    description_de: "Die Eröffnung eines deutschen Bankkontos ist unerlässlich für den Gehaltsempfang, Mietzahlungen und tägliche Transaktionen.",
    officialStatus: "official",
    category: "Legal & Admin",
    difficulty: "medium",
    estimatedTime: "1-3 hours (application) + waiting time for card/PIN",
    prerequisites: ["de_anmeldung"],
    resources: [
      { text: "Comparison of German Banks", text_de: "Vergleich deutscher Banken", url: "https://www.check24.de/girokonto/", type: "link" }
    ],
    subTasks: [
      { id: "bank_1", text: "Research different banks and their conditions (fees, services)" },
      { id: "bank_2", text: "Choose a bank and gather required documents (passport, Anmeldebestätigung, sometimes tax ID)" },
      { id: "bank_3", text: "Apply online or in a branch" },
      { id: "bank_4", text: "Complete identification process (e.g., PostIdent, VideoIdent)" },
      { id: "bank_5", text: "Receive your bank card and PIN" }
    ],
    points: 40,
    rewardToken: 3
  }
];

// Data Access Functions
export function getAllLearningModules(): LearningModule[] {
  return learningModules;
}

export function getLearningModuleById(id: string): LearningModule | null {
  return learningModules.find(module => module.id === id) || null;
}

export function getRandomLearningModules(count: number = 2): LearningModule[] {
  // In a production app, we would have more logic for recommendations
  return learningModules.slice(0, Math.min(count, learningModules.length));
}

export function getAllIntegrationSteps(): IntegrationStep[] {
  return integrationSteps;
}

export function getStepsByCategory(category: IntegrationStepCategory): IntegrationStep[] {
  return integrationSteps.filter(step => step.category === category);
}

export function getUpcomingIntegrationSteps(count: number = 2): IntegrationStep[] {
  // In a production app, this would be personalized based on user progress
  return integrationSteps.slice(0, Math.min(count, integrationSteps.length));
}