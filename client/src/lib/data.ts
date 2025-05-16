import { 
  BookOpen, 
  GraduationCap, 
  Globe, 
  Briefcase, 
  Laptop 
} from 'lucide-react';

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
    id: 'german-basics',
    title: 'German Basics for Newcomers',
    description: 'Learn essential German phrases and vocabulary for daily life in Germany.',
    category: 'Language',
    icon: 'BookOpen',
    totalLessons: 8,
    totalXp: 400,
    duration: '4 weeks',
    language: 'English + German',
    tags: ['Beginner', 'Language', 'Essential'],
    reward: 50,
    lessons: [
      {
        id: 1,
        title: 'Greetings and Introductions',
        description: 'Learn how to introduce yourself and greet others in German.',
        xp: 50,
        estimatedMinutes: 30,
        contentSummary: 'Basic phrases for meeting people, saying hello and goodbye, introducing yourself.'
      },
      {
        id: 2,
        title: 'Numbers and Time',
        description: 'Learn to count and tell time in German.',
        xp: 50,
        estimatedMinutes: 45,
        contentSummary: 'Numbers 1-100, telling time, asking "what time is it?"'
      },
      {
        id: 3,
        title: 'Everyday Objects',
        description: 'Learn the German names for common objects around you.',
        xp: 50,
        estimatedMinutes: 40,
        contentSummary: 'Vocabulary for household items, personal belongings, and common objects in public spaces.'
      },
      {
        id: 4,
        title: 'Food and Dining',
        description: 'Learn how to order food and discuss preferences in German.',
        xp: 50,
        estimatedMinutes: 60,
        contentSummary: 'Restaurant vocabulary, ordering food, expressing preferences, understanding menus.'
      },
      {
        id: 5,
        title: 'Transportation',
        description: 'Learn how to navigate public transportation in German.',
        xp: 50,
        estimatedMinutes: 45,
        contentSummary: 'Vocabulary for different types of transportation, buying tickets, asking for directions.'
      },
      {
        id: 6,
        title: 'Shopping',
        description: 'Learn how to shop and ask about products in German.',
        xp: 50,
        estimatedMinutes: 50,
        contentSummary: 'Vocabulary for different types of stores, asking for prices, sizes, and assistance.'
      },
      {
        id: 7,
        title: 'Health and Emergencies',
        description: 'Learn essential phrases for health situations.',
        xp: 50,
        estimatedMinutes: 60,
        contentSummary: 'Vocabulary for describing symptoms, talking to a doctor, and handling emergency situations.'
      },
      {
        id: 8,
        title: 'Basic Grammar',
        description: 'Understand the fundamentals of German sentence structure.',
        xp: 50,
        estimatedMinutes: 90,
        contentSummary: 'Basic sentence structure, present tense verbs, articles, and pronouns.'
      }
    ]
  },
  {
    id: 'german-bureaucracy',
    title: 'Navigating German Bureaucracy',
    description: 'Understand the German administrative system and learn how to handle official procedures.',
    category: 'Legal & Bureaucracy',
    icon: 'GraduationCap',
    totalLessons: 6,
    totalXp: 300,
    duration: '3 weeks',
    language: 'English + German',
    tags: ['Bureaucracy', 'Administrative', 'Legal'],
    reward: 60,
    lessons: [
      {
        id: 1,
        title: 'Residence Registration (Anmeldung)',
        description: 'Learn how to register your address in Germany.',
        xp: 50,
        estimatedMinutes: 45,
        contentSummary: 'Required documents, process, deadlines, and useful phrases for residence registration.'
      },
      {
        id: 2,
        title: 'Residence Permits & Visas',
        description: 'Understand different types of permits and visa extensions.',
        xp: 50,
        estimatedMinutes: 60,
        contentSummary: 'Types of residence permits, application process, renewal procedures, and required documents.'
      },
      {
        id: 3,
        title: 'Health Insurance',
        description: 'Navigate the German health insurance system.',
        xp: 50,
        estimatedMinutes: 50,
        contentSummary: 'Public vs. private insurance, coverage, costs, and registration process.'
      },
      {
        id: 4,
        title: 'Banking & Finances',
        description: 'Set up bank accounts and understand financial services in Germany.',
        xp: 50,
        estimatedMinutes: 45,
        contentSummary: 'Types of bank accounts, required documents, online banking, and money transfers.'
      },
      {
        id: 5,
        title: 'Employment Contracts & Rights',
        description: 'Understand German employment law basics.',
        xp: 50,
        estimatedMinutes: 55,
        contentSummary: 'Standard contract terms, employee rights, taxation, social security contributions.'
      },
      {
        id: 6,
        title: 'Family Benefits & Services',
        description: 'Learn about child benefits and family support systems.',
        xp: 50,
        estimatedMinutes: 40,
        contentSummary: 'Kindergeld (child benefit), parental allowance, childcare options, and application procedures.'
      }
    ]
  },
  {
    id: 'german-culture',
    title: 'German Culture & Social Norms',
    description: 'Understand German cultural practices, traditions, and social expectations.',
    category: 'Culture',
    icon: 'Globe',
    totalLessons: 5,
    totalXp: 250,
    duration: '2 weeks',
    language: 'English',
    tags: ['Culture', 'Social', 'Integration'],
    reward: 40,
    lessons: [
      {
        id: 1,
        title: 'Social Etiquette',
        description: 'Learn about German social customs and proper behavior.',
        xp: 50,
        estimatedMinutes: 40,
        contentSummary: 'Greetings, personal space, punctuality, and communication styles.'
      },
      {
        id: 2,
        title: 'Festivals & Traditions',
        description: 'Discover important German holidays and cultural celebrations.',
        xp: 50,
        estimatedMinutes: 45,
        contentSummary: 'Major holidays, regional festivals, traditions, and typical celebrations.'
      },
      {
        id: 3,
        title: 'Food Culture',
        description: 'Explore German cuisine and dining customs.',
        xp: 50,
        estimatedMinutes: 35,
        contentSummary: 'Traditional dishes, meal times, restaurant etiquette, and food shopping.'
      },
      {
        id: 4,
        title: 'Leisure & Recreation',
        description: 'Learn about common leisure activities and recreational opportunities.',
        xp: 50,
        estimatedMinutes: 30,
        contentSummary: 'Sports, outdoor activities, cultural venues, clubs, and associations (Vereine).'
      },
      {
        id: 5,
        title: 'Environmental Awareness',
        description: 'Understand German environmental practices and recycling system.',
        xp: 50,
        estimatedMinutes: 40,
        contentSummary: 'Recycling system, deposit returns (Pfand), energy conservation, and sustainable living.'
      }
    ]
  },
  {
    id: 'job-search',
    title: 'Job Search in Germany',
    description: 'Learn how to find employment opportunities and succeed in the German job market.',
    category: 'Professional Skills',
    icon: 'Briefcase',
    totalLessons: 7,
    totalXp: 350,
    duration: '4 weeks',
    language: 'English + German',
    tags: ['Employment', 'Professional', 'Career'],
    reward: 70,
    lessons: [
      {
        id: 1,
        title: 'CV and Cover Letter',
        description: 'Create a German-style resume and application letter.',
        xp: 50,
        estimatedMinutes: 60,
        contentSummary: 'German CV format, application photo requirements, formal letter structure.'
      },
      {
        id: 2,
        title: 'Job Search Platforms',
        description: 'Discover the best resources for finding jobs in Germany.',
        xp: 50,
        estimatedMinutes: 40,
        contentSummary: 'Popular job boards, company websites, recruitment agencies, and networking platforms.'
      },
      {
        id: 3,
        title: 'The German Interview Process',
        description: 'Prepare for job interviews in the German context.',
        xp: 50,
        estimatedMinutes: 55,
        contentSummary: 'Interview expectations, common questions, appropriate attire, and follow-up etiquette.'
      },
      {
        id: 4,
        title: 'Qualifications Recognition',
        description: 'Learn how to get foreign qualifications recognized in Germany.',
        xp: 50,
        estimatedMinutes: 50,
        contentSummary: 'Recognition process, required documents, responsible authorities, and alternatives.'
      },
      {
        id: 5,
        title: 'Workplace Communication',
        description: 'Understand German business communication styles.',
        xp: 50,
        estimatedMinutes: 45,
        contentSummary: 'Formality levels, email etiquette, meeting behavior, and conflict resolution.'
      },
      {
        id: 6,
        title: 'Professional Networking',
        description: 'Build your professional network in Germany.',
        xp: 50,
        estimatedMinutes: 40,
        contentSummary: 'Industry events, professional associations, business networking etiquette.'
      },
      {
        id: 7,
        title: 'Self-Employment Options',
        description: 'Explore freelancing and entrepreneurship in Germany.',
        xp: 50,
        estimatedMinutes: 60,
        contentSummary: 'Business registration, visa considerations, taxation, and support resources.'
      }
    ]
  },
  {
    id: 'digital-tools',
    title: 'Digital Tools for Integration',
    description: 'Learn to use digital resources and apps that facilitate life in Germany.',
    category: 'Digital Skills',
    icon: 'Laptop',
    totalLessons: 4,
    totalXp: 200,
    duration: '2 weeks',
    language: 'English',
    tags: ['Digital', 'Technology', 'Practical'],
    reward: 30,
    lessons: [
      {
        id: 1,
        title: 'Essential Government Apps',
        description: 'Discover official digital services and authentication tools.',
        xp: 50,
        estimatedMinutes: 40,
        contentSummary: 'AusweisApp, ELSTER tax system, government portals, and digital ID verification.'
      },
      {
        id: 2,
        title: 'Transportation & Navigation',
        description: 'Use apps for public transport and getting around Germany.',
        xp: 50,
        estimatedMinutes: 35,
        contentSummary: 'Deutsche Bahn app, local transport apps, ride-sharing services, and navigation tools.'
      },
      {
        id: 3,
        title: 'Language Learning Tools',
        description: 'Utilize digital resources for improving your German.',
        xp: 50,
        estimatedMinutes: 40,
        contentSummary: 'Language learning apps, online courses, vocabulary tools, and language exchange platforms.'
      },
      {
        id: 4,
        title: 'Everyday Services Apps',
        description: 'Navigate food delivery, shopping, and local services.',
        xp: 50,
        estimatedMinutes: 45,
        contentSummary: 'Food delivery platforms, online marketplaces, service booking apps, and payment systems.'
      }
    ]
  }
];

// Integration Steps Types
export type OfficialStatus = 'official' | 'unofficial';
export type StepDifficulty = 'easy' | 'medium' | 'hard';
export type StepCategory =
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
  // completed: boolean; // Status is stored in AppContext per user
}

export interface IntegrationStep {
  id: string;
  title: string;
  title_de: string;
  description: string;
  description_de: string;
  officialStatus: OfficialStatus;
  category: StepCategory;
  difficulty: StepDifficulty;
  estimatedTime: string; // e.g., "1-2 hours", "Several days", "Ongoing"
  prerequisites?: string[]; // Array of Step IDs
  resources?: Array<{ text: string; text_de: string; url: string; type: 'link' | 'document' | 'video' }>;
  subTasks?: SubTask[];
  points?: number; // Points/XP for completing this step
  rewardToken?: number; // Token reward for this specific step
}

export const integrationStepsGermany: IntegrationStep[] = [
  {
    id: 'residence-registration',
    title: 'Complete Residence Registration (Anmeldung)',
    title_de: 'Anmeldung durchführen',
    description: 'Register your address at the local residents registration office (Einwohnermeldeamt) within 14 days of moving into a new residence.',
    description_de: 'Melden Sie Ihre Adresse innerhalb von 14 Tagen nach Einzug in eine neue Wohnung beim örtlichen Einwohnermeldeamt an.',
    officialStatus: 'official',
    category: 'Legal & Admin',
    difficulty: 'easy',
    estimatedTime: '1-2 hours',
    subTasks: [
      { id: 'form', text: 'Complete the registration form' },
      { id: 'id', text: 'Bring valid ID or passport' },
      { id: 'confirmation', text: 'Obtain landlord confirmation (Wohnungsgeberbestätigung)' },
      { id: 'appointment', text: 'Book and attend appointment' },
      { id: 'certificate', text: 'Receive registration certificate (Anmeldebestätigung)' }
    ],
    points: 50,
    rewardToken: 10,
    resources: [
      {
        text: 'Official Information on Anmeldung',
        text_de: 'Offizielle Informationen zur Anmeldung',
        url: 'https://www.germany.info/us-en/service/03-Citizenship/residence-law/943658',
        type: 'link'
      },
      {
        text: 'Anmeldung Form Sample',
        text_de: 'Anmeldeformular Muster',
        url: 'https://www.berlin.de/formularverzeichnis/?formular=/labo/zentrale-einwohnerangelegenheiten/_assets/anmeldung_bei_der_meldebeh__rde.pdf',
        type: 'document'
      }
    ]
  },
  {
    id: 'residence-permit',
    title: 'Apply for Residence Permit',
    title_de: 'Aufenthaltstitel beantragen',
    description: 'Apply for a residence permit at the local immigration office (Ausländerbehörde) based on your purpose of stay.',
    description_de: 'Beantragen Sie einen Aufenthaltstitel bei der örtlichen Ausländerbehörde entsprechend Ihrem Aufenthaltszweck.',
    officialStatus: 'official',
    category: 'Legal & Admin',
    difficulty: 'medium',
    estimatedTime: 'Several weeks',
    prerequisites: ['residence-registration'],
    subTasks: [
      { id: 'docs', text: 'Gather required documents (passport, photos, etc.)' },
      { id: 'insurance', text: 'Provide proof of health insurance' },
      { id: 'finances', text: 'Provide proof of financial means' },
      { id: 'purpose', text: 'Document purpose of stay (work contract, university admission, etc.)' },
      { id: 'appointment', text: 'Book and attend appointment' },
      { id: 'biometrics', text: 'Provide biometric data' },
      { id: 'payment', text: 'Pay application fee' }
    ],
    points: 100,
    rewardToken: 20,
    resources: [
      {
        text: 'Residence Permit Information',
        text_de: 'Informationen zum Aufenthaltstitel',
        url: 'https://www.bamf.de/EN/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/zuwandererdrittstaaten-node.html',
        type: 'link'
      }
    ]
  },
  {
    id: 'health-insurance',
    title: 'Obtain Health Insurance',
    title_de: 'Krankenversicherung abschließen',
    description: 'Register for German health insurance, either public (gesetzliche) or private (private), which is mandatory for all residents.',
    description_de: 'Melden Sie sich für eine deutsche Krankenversicherung an, entweder gesetzlich oder privat, die für alle Einwohner obligatorisch ist.',
    officialStatus: 'official',
    category: 'Health & Wellbeing',
    difficulty: 'medium',
    estimatedTime: '1-2 weeks',
    prerequisites: ['residence-registration'],
    subTasks: [
      { id: 'research', text: 'Research health insurance providers' },
      { id: 'choose', text: 'Select appropriate insurance type (public or private)' },
      { id: 'apply', text: 'Submit application' },
      { id: 'documents', text: 'Provide required documents' },
      { id: 'card', text: 'Receive insurance card' }
    ],
    points: 75,
    rewardToken: 15,
    resources: [
      {
        text: 'Health Insurance in Germany Guide',
        text_de: 'Leitfaden zur Krankenversicherung in Deutschland',
        url: 'https://www.make-it-in-germany.com/en/living-in-germany/insurances-tax/health-insurance',
        type: 'link'
      }
    ]
  },
  {
    id: 'tax-id',
    title: 'Obtain Tax Identification Number',
    title_de: 'Steueridentifikationsnummer erhalten',
    description: 'Receive your personal tax identification number (Steueridentifikationsnummer) which is needed for employment and tax purposes.',
    description_de: 'Erhalten Sie Ihre persönliche Steueridentifikationsnummer, die für Beschäftigung und steuerliche Zwecke benötigt wird.',
    officialStatus: 'official',
    category: 'Legal & Admin',
    difficulty: 'easy',
    estimatedTime: '2-4 weeks',
    prerequisites: ['residence-registration'],
    subTasks: [
      { id: 'wait', text: 'Wait for automatic delivery after registration' },
      { id: 'request', text: 'Request tax ID if not received (after 2 weeks)' },
      { id: 'store', text: 'Store number safely for future use' }
    ],
    points: 25,
    rewardToken: 5,
    resources: [
      {
        text: 'Tax ID Information',
        text_de: 'Informationen zur Steueridentifikationsnummer',
        url: 'https://www.bzst.de/EN/Private_individuals/Tax_identification_number/tax_identification_number_node.html',
        type: 'link'
      }
    ]
  },
  {
    id: 'bank-account',
    title: 'Open a Bank Account',
    title_de: 'Bankkonto eröffnen',
    description: 'Set up a German bank account for salary payments, rent, and other financial transactions.',
    description_de: 'Richten Sie ein deutsches Bankkonto für Gehaltszahlungen, Miete und andere finanzielle Transaktionen ein.',
    officialStatus: 'unofficial',
    category: 'Daily Life & Culture',
    difficulty: 'easy',
    estimatedTime: '1-2 days',
    prerequisites: ['residence-registration'],
    subTasks: [
      { id: 'research', text: 'Research bank options (traditional and online banks)' },
      { id: 'documents', text: 'Gather required documents (ID, residence registration)' },
      { id: 'appointment', text: 'Make appointment or apply online' },
      { id: 'application', text: 'Complete application process' },
      { id: 'activate', text: 'Activate account and online banking' },
      { id: 'card', text: 'Receive bank card' }
    ],
    points: 50,
    rewardToken: 10,
    resources: [
      {
        text: 'Banking in Germany Guide',
        text_de: 'Leitfaden zum Bankwesen in Deutschland',
        url: 'https://www.expatica.com/de/finance/banking/banking-in-germany-101933/',
        type: 'link'
      }
    ]
  },
  {
    id: 'language-course',
    title: 'Enroll in a German Language Course',
    title_de: 'In einen Deutschkurs einschreiben',
    description: 'Join a German language course to improve your language skills and integration prospects.',
    description_de: 'Nehmen Sie an einem Deutschkurs teil, um Ihre Sprachkenntnisse und Integrationschancen zu verbessern.',
    officialStatus: 'unofficial',
    category: 'Language & Education',
    difficulty: 'medium',
    estimatedTime: 'Several months',
    subTasks: [
      { id: 'research', text: 'Research language schools and course types' },
      { id: 'level', text: 'Determine your language level (placement test)' },
      { id: 'register', text: 'Register for appropriate course' },
      { id: 'payment', text: 'Pay course fees or apply for subsidies' },
      { id: 'attend', text: 'Attend course regularly' },
      { id: 'exam', text: 'Complete final examination' }
    ],
    points: 100,
    rewardToken: 25,
    resources: [
      {
        text: 'Integration Course Information',
        text_de: 'Informationen zum Integrationskurs',
        url: 'https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html',
        type: 'link'
      },
      {
        text: 'Online German Learning Options',
        text_de: 'Online-Deutschlernangebote',
        url: 'https://www.goethe.de/en/spr/kup/opt.html',
        type: 'link'
      }
    ]
  },
  {
    id: 'find-housing',
    title: 'Find Long-term Housing',
    title_de: 'Langfristige Unterkunft finden',
    description: 'Search for and secure appropriate long-term accommodation.',
    description_de: 'Suchen und sichern Sie eine geeignete langfristige Unterkunft.',
    officialStatus: 'unofficial',
    category: 'Housing',
    difficulty: 'hard',
    estimatedTime: '1-3 months',
    subTasks: [
      { id: 'search', text: 'Search housing platforms and listings' },
      { id: 'budget', text: 'Determine budget and preferred locations' },
      { id: 'documents', text: 'Prepare application documents (SCHUFA, proof of income, etc.)' },
      { id: 'viewings', text: 'Attend property viewings' },
      { id: 'application', text: 'Submit housing applications' },
      { id: 'contract', text: 'Sign rental contract' },
      { id: 'deposit', text: 'Pay security deposit and first month\'s rent' },
      { id: 'utilities', text: 'Set up utilities and internet' },
      { id: 'register', text: 'Register new address (see Anmeldung)' }
    ],
    points: 150,
    rewardToken: 30,
    resources: [
      {
        text: 'German Housing Market Guide',
        text_de: 'Leitfaden zum deutschen Wohnungsmarkt',
        url: 'https://www.settle-in-berlin.com/find-a-flat-in-berlin-apartment/',
        type: 'link'
      },
      {
        text: 'Tenant Rights in Germany',
        text_de: 'Mieterrechte in Deutschland',
        url: 'https://www.mieterbund.de/index.php?id=325&L=1',
        type: 'link'
      }
    ]
  },
  {
    id: 'public-transport',
    title: 'Learn to Use Public Transportation',
    title_de: 'Öffentliche Verkehrsmittel nutzen lernen',
    description: 'Understand and navigate the public transportation system in your city.',
    description_de: 'Verstehen und nutzen Sie das öffentliche Verkehrssystem in Ihrer Stadt.',
    officialStatus: 'unofficial',
    category: 'Daily Life & Culture',
    difficulty: 'easy',
    estimatedTime: '1 week',
    subTasks: [
      { id: 'map', text: 'Get public transport map of your city' },
      { id: 'app', text: 'Download relevant transport apps' },
      { id: 'ticket', text: 'Understand ticket types and zones' },
      { id: 'purchase', text: 'Purchase appropriate ticket or pass' },
      { id: 'routes', text: 'Learn key routes for your daily needs' },
      { id: 'rules', text: 'Understand system rules (validation, transfers, etc.)' }
    ],
    points: 30,
    rewardToken: 5,
    resources: [
      {
        text: 'Public Transport in Germany',
        text_de: 'Öffentlicher Verkehr in Deutschland',
        url: 'https://www.deutschland.de/en/topic/life/mobility-travel/public-transport-in-germany',
        type: 'link'
      }
    ]
  },
  {
    id: 'job-search',
    title: 'Find Employment',
    title_de: 'Arbeit finden',
    description: 'Search for and secure employment appropriate to your skills and qualifications.',
    description_de: 'Suchen und sichern Sie eine Beschäftigung, die Ihren Fähigkeiten und Qualifikationen entspricht.',
    officialStatus: 'unofficial',
    category: 'Work & Profession',
    difficulty: 'hard',
    estimatedTime: '1-6 months',
    prerequisites: ['residence-permit', 'language-course'],
    subTasks: [
      { id: 'cv', text: 'Create German-style CV and cover letter' },
      { id: 'recognition', text: 'Get foreign qualifications recognized if applicable' },
      { id: 'platforms', text: 'Register on job search platforms' },
      { id: 'network', text: 'Build professional network' },
      { id: 'apply', text: 'Apply for suitable positions' },
      { id: 'interview', text: 'Prepare for and attend interviews' },
      { id: 'contract', text: 'Review and sign employment contract' },
      { id: 'tax-class', text: 'Set up tax class and provide details to employer' }
    ],
    points: 200,
    rewardToken: 50,
    resources: [
      {
        text: 'Job Search in Germany',
        text_de: 'Arbeitssuche in Deutschland',
        url: 'https://www.make-it-in-germany.com/en/jobs/finding-jobs',
        type: 'link'
      },
      {
        text: 'Recognition of Foreign Qualifications',
        text_de: 'Anerkennung ausländischer Qualifikationen',
        url: 'https://www.anerkennung-in-deutschland.de/en/index.php',
        type: 'link'
      }
    ]
  },
  {
    id: 'cultural-integration',
    title: 'Participate in Local Community',
    title_de: 'An der lokalen Gemeinschaft teilnehmen',
    description: 'Engage with your local community through events, clubs, or volunteer activities.',
    description_de: 'Engagieren Sie sich in Ihrer lokalen Gemeinschaft durch Veranstaltungen, Vereine oder ehrenamtliche Tätigkeiten.',
    officialStatus: 'unofficial',
    category: 'Social Integration',
    difficulty: 'medium',
    estimatedTime: 'Ongoing',
    subTasks: [
      { id: 'research', text: 'Research local clubs, events, and volunteer opportunities' },
      { id: 'join', text: 'Join a club or organization (Verein)' },
      { id: 'attend', text: 'Attend community events or meetings' },
      { id: 'volunteer', text: 'Participate in volunteer activities' },
      { id: 'network', text: 'Build social connections with locals' }
    ],
    points: 75,
    rewardToken: 15,
    resources: [
      {
        text: 'Volunteering in Germany',
        text_de: 'Ehrenamtliche Tätigkeit in Deutschland',
        url: 'https://www.deutschland.de/en/topic/life/volunteering-in-germany-getting-involved',
        type: 'link'
      }
    ]
  }
];

/**
 * Helper functions to work with the data
 */

export function getAllLearningModules(): LearningModule[] {
  return learningModules;
}

/**
 * Get a learning module by ID
 */
export function getLearningModuleById(id: string): LearningModule | null {
  return learningModules.find(module => module.id === id) || null;
}

/**
 * Get random learning modules (for recommendations)
 */
export function getRandomLearningModules(count: number = 2): LearningModule[] {
  const shuffled = [...learningModules].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get lessons for a specific module
 */
export function getLessons(moduleId: string): Lesson[] {
  const module = getLearningModuleById(moduleId);
  return module ? module.lessons : [];
}

export function getAllIntegrationSteps(): IntegrationStep[] {
  return integrationStepsGermany;
}

/**
 * Get integration steps by category
 */
export function getStepsByCategory(category: StepCategory): IntegrationStep[] {
  return integrationStepsGermany.filter(step => step.category === category);
}

/**
 * Get upcoming integration steps
 */
export function getUpcomingIntegrationSteps(count: number = 2): IntegrationStep[] {
  // This would be more sophisticated in a real app, based on user's progress
  const shuffled = [...integrationStepsGermany].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Get step prerequisites 
 */
export function getStepPrerequisites(stepId: string): IntegrationStep[] {
  const step = integrationStepsGermany.find(s => s.id === stepId);
  if (!step || !step.prerequisites || step.prerequisites.length === 0) {
    return [];
  }
  
  return integrationStepsGermany.filter(s => step.prerequisites?.includes(s.id));
}