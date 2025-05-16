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
  // completed: boolean; // Status wird im AppContext pro User gespeichert
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
  },
  {
    id: "de_tax_id",
    title: "Get Tax Identification Number (Steueridentifikationsnummer)",
    title_de: "Steueridentifikationsnummer erhalten",
    description: "The Tax ID is automatically sent to you after residence registration (Anmeldung). It is crucial for employment.",
    description_de: "Die Steuer-ID wird Ihnen nach der Anmeldung automatisch zugesandt. Sie ist entscheidend für Beschäftigungsverhältnisse.",
    officialStatus: "official",
    category: "Legal & Admin",
    difficulty: "easy",
    estimatedTime: "Automatic after Anmeldung, mail delivery can take 2-4 weeks",
    prerequisites: ["de_anmeldung"],
    resources: [
      { text: "Information on Tax ID (BZSt)", text_de: "Informationen zur Steuer-ID (BZSt)", url: "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/steuerlicheidentifikationsnummer_node.html", type: "link" }
    ],
    subTasks: [
      { id: "tax_1", text: "Wait for the Tax ID letter to arrive by post after Anmeldung" },
      { id: "tax_2", text: "If not received within 4 weeks, inquire at the Federal Central Tax Office (Bundeszentralamt für Steuern)" },
      { id: "tax_3", text: "Keep the Tax ID document safe" }
    ],
    points: 20
  },

  // Category: Language & Education
  {
    id: "de_language_course",
    title: "Enroll in a German Language Course",
    title_de: "Deutschkurs belegen",
    description: "Learning German is key to successful integration. Find and enroll in a course suitable for your level (e.g., Integration Course by BAMF).",
    description_de: "Deutsch zu lernen ist der Schlüssel zu erfolgreicher Integration. Finden und belegen Sie einen Kurs, der Ihrem Niveau entspricht (z.B. Integrationskurs des BAMF).",
    officialStatus: "unofficial", // Can be official if BAMF mandated
    category: "Language & Education",
    difficulty: "medium",
    estimatedTime: "Ongoing, depends on course intensity",
    prerequisites: [],
    resources: [
      { text: "BAMF Integration Courses", text_de: "BAMF Integrationskurse", url: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html", type: "link" },
      { text: "VHS Language Courses (Example)", text_de: "VHS Sprachkurse (Beispiel)", url: "https://www.volkshochschule.de/", type: "link" }
    ],
    subTasks: [
      { id: "lang_1", text: "Determine your current German language level (e.g., online placement test)" },
      { id: "lang_2", text: "Research language schools and course types (VHS, private schools, online)" },
      { id: "lang_3", text: "Check eligibility for funded courses (e.g., BAMF Integration Course)" },
      { id: "lang_4", text: "Register for a course and attend regularly" }
    ],
    points: 60,
    rewardToken: 10
  },
  {
    id: "de_ric_erkennung",
    title: "Recognition of Foreign Qualifications (Anerkennung)",
    title_de: "Anerkennung ausländischer Abschlüsse",
    description: "Get your foreign school diplomas or professional qualifications officially recognized in Germany to improve job prospects.",
    description_de: "Lassen Sie Ihre ausländischen Schulabschlüsse oder Berufsqualifikationen in Deutschland offiziell anerkennen, um Ihre Berufsaussichten zu verbessern.",
    officialStatus: "official",
    category: "Work & Profession",
    difficulty: "hard",
    estimatedTime: "Several months, depending on profession and documents",
    prerequisites: [],
    resources: [
      { text: "Recognition in Germany Portal", text_de: "Anerkennung in Deutschland Portal", url: "https://www.anerkennung-in-deutschland.de/", type: "link" }
    ],
    subTasks: [
      { id: "rec_1", text: "Identify the responsible authority for your profession/qualification" },
      { id: "rec_2", text: "Gather all necessary documents (diplomas, certificates, CV, translations)" },
      { id: "rec_3", text: "Submit the application for recognition" },
      { id: "rec_4", text: "Participate in any required adaptation measures or exams if applicable" }
    ],
    points: 80,
    rewardToken: 15
  },

  // Category: Housing
  {
    id: "de_find_apartment",
    title: "Find an Apartment (Wohnungssuche)",
    title_de: "Wohnung finden (Wohnungssuche)",
    description: "Finding long-term accommodation is a significant step. Learn how to search for apartments and understand rental processes.",
    description_de: "Eine langfristige Unterkunft zu finden ist ein wichtiger Schritt. Lernen Sie, wie man Wohnungen sucht und Mietprozesse versteht.",
    officialStatus: "unofficial",
    category: "Housing",
    difficulty: "hard",
    estimatedTime: "Ongoing, can take weeks or months",
    prerequisites: ["de_bank_account"], // Often needed for deposit/rent
    resources: [
      { text: "ImmobilienScout24 (Example Portal)", text_de: "ImmobilienScout24 (Beispielportal)", url: "https://www.immobilienscout24.de", type: "link" },
      { text: "WG-Gesucht (Shared Flats)", text_de: "WG-Gesucht (Wohngemeinschaften)", url: "https://www.wg-gesucht.de", type: "link" }
    ],
    subTasks: [
      { id: "apt_1", text: "Define your budget and apartment requirements (size, location)" },
      { id: "apt_2", text: "Search on online portals, local newspapers, and through contacts" },
      { id: "apt_3", text: "Prepare application documents (Schufa, proof of income, ID)" },
      { id: "apt_4", text: "Attend apartment viewings (Besichtigungstermine)" },
      { id: "apt_5", text: "Understand and sign the rental contract (Mietvertrag)" },
      { id: "apt_6", text: "Arrange for the rental deposit (Kaution)" }
    ],
    points: 100,
    rewardToken: 20
  },

  // Category: Daily Life & Culture
  {
    id: "de_public_transport",
    title: "Learn to Use Public Transport",
    title_de: "Öffentliche Verkehrsmittel nutzen lernen",
    description: "Familiarize yourself with local public transport (bus, train, tram) schedules, ticket systems, and apps.",
    description_de: "Machen Sie sich mit den Fahrplänen, Ticketsystemen und Apps der lokalen öffentlichen Verkehrsmittel (Bus, Bahn, Tram) vertraut.",
    officialStatus: "unofficial",
    category: "Daily Life & Culture",
    difficulty: "easy",
    estimatedTime: "Few days",
    prerequisites: [],
    resources: [
      { text: "DB Navigator (Train App)", text_de: "DB Navigator (Zug-App)", url: "https://www.bahn.de/angebot/zusatzticket/apps/db-navigator", type: "link" }
      // Add link to local transport authority, e.g., BVG for Berlin
    ],
    subTasks: [
      { id: "pt_1", text: "Identify local public transport options (bus, S-Bahn, U-Bahn, tram)" },
      { id: "pt_2", text: "Understand the tariff zones and ticket types (single, daily, monthly)" },
      { id: "pt_3", text: "Learn how to buy tickets (machines, apps, counters)" },
      { id: "pt_4", text: "Practice planning routes using apps or online journey planners" }
    ],
    points: 30
  },
   {
    id: "de_shopping_basics",
    title: "Understand Grocery Shopping & Recycling",
    title_de: "Lebensmitteleinkauf & Recycling verstehen",
    description: "Learn about different types of grocery stores, payment methods, the Pfand (deposit) system for bottles, and Germany's detailed recycling rules.",
    description_de: "Lernen Sie verschiedene Arten von Lebensmittelgeschäften, Zahlungsmethoden, das Pfandsystem für Flaschen und die detaillierten deutschen Recyclingregeln kennen.",
    officialStatus: "unofficial",
    category: "Daily Life & Culture",
    difficulty: "easy",
    estimatedTime: "Few hours",
    prerequisites: [],
    subTasks: [
      { id: "shop_1", text: "Identify different supermarkets (Discounter, Vollsortimenter, Bio-Laden)" },
      { id: "shop_2", text: "Understand the Pfand system for bottles and cans" },
      { id: "shop_3", text: "Learn the basics of waste separation (Papier, Plastik/Gelber Sack, Bio, Restmüll)" },
      { id: "shop_4", text: "Practice a typical grocery shopping trip" }
    ],
    points: 25
  },

  // Add more steps for other categories...
  {
    id: "de_doctor_visit",
    title: "Visit a Doctor (Arztbesuch)",
    title_de: "Arztbesuch organisieren",
    description: "Understand how to find a doctor, make an appointment, and what to expect during a doctor's visit in Germany, including health insurance card usage.",
    description_de: "Verstehen, wie man einen Arzt findet, einen Termin vereinbart und was bei einem Arztbesuch in Deutschland zu erwarten ist, einschließlich der Verwendung der Krankenversicherungskarte.",
    officialStatus: "unofficial",
    category: "Health & Wellbeing",
    difficulty: "medium",
    estimatedTime: "1-2 hours + appointment",
    prerequisites: ["de_anmeldung"], // Health insurance is often linked to this
    subTasks: [
      { id: "doc_1", text: "Find a general practitioner (Hausarzt) or specialist (Facharzt) using online portals or recommendations." },
      { id: "doc_2", text: "Call or go online to make an appointment (Termin)." },
      { id: "doc_3", text: "Prepare your health insurance card (Krankenversicherungskarte) and any relevant medical documents." },
      { id: "doc_4", text: "Understand basic medical vocabulary for symptoms and conditions." },
      { id: "doc_5", text: "Learn about prescriptions (Rezept) and pharmacies (Apotheke)." }
    ],
    points: 35,
    rewardToken: 2
  },
  {
    id: "de_emergency_numbers",
    title: "Know Emergency Numbers",
    title_de: "Notrufnummern kennen",
    description: "Memorize or save important emergency numbers in Germany: 112 for fire/ambulance and 110 for police.",
    description_de: "Merken oder speichern Sie wichtige Notrufnummern in Deutschland: 112 für Feuerwehr/Rettungsdienst und 110 für die Polizei.",
    officialStatus: "unofficial",
    category: "Health & Wellbeing",
    difficulty: "easy",
    estimatedTime: "15 minutes",
    prerequisites: [],
    subTasks: [
      { id: "em_1", text: "Memorize 112 (Fire brigade, Ambulance/Emergency medical services)." },
      { id: "em_2", text: "Memorize 110 (Police)." },
      { id: "em_3", text: "Understand when to use each number and what information to provide."}
    ],
    points: 15
  }
];
