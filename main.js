const DATASET_PATH = "./data/healthcare-symptoms-disease.csv";
const EXCLUDED_NON_SYMPTOM_FIELDS = new Set(["history of alcohol consumption"]);
const BRAND_NAME = "CarePath";
const NON_TRANSLATABLE_TRANSLATION_KEYS = new Set(["heroTitle"]);
const CURATED_SYMPTOM_CATALOG = [
  { id: "itching", label: "Itching", weight: 5 },
  { id: "skin-rash", label: "Skin Rash", weight: 9 },
  { id: "continuous-sneezing", label: "Continuous Sneezing", weight: 3 },
  { id: "chills", label: "Chills", weight: 6 },
  { id: "shivering", label: "Shivering", weight: 6 },
  { id: "joint-pain", label: "Joint Pain", weight: 6 },
  { id: "stomach-pain", label: "Stomach Pain", weight: 6 },
  { id: "vomiting", label: "Vomiting", weight: 9 },
  { id: "burning-micturition", label: "Burning Urination", weight: 9 },
  { id: "fatigue", label: "Fatigue", weight: 6 },
  { id: "weight-loss", label: "Sudden Weight Loss", weight: 9 },
  { id: "high-fever", label: "High Fever", weight: 14 },
  { id: "mild-fever", label: "Mild Fever", weight: 5 },
  { id: "breathlessness", label: "Breathlessness", weight: 24 },
  { id: "sweating", label: "Sweating", weight: 6 },
  { id: "dehydration", label: "Dehydration", weight: 9 },
  { id: "headache", label: "Headache", weight: 10 },
  { id: "yellowish-skin", label: "Yellowish Skin", weight: 14 },
  { id: "dark-urine", label: "Dark Urine", weight: 11 },
  { id: "nausea", label: "Nausea", weight: 6 },
  { id: "loss-of-appetite", label: "Loss of Appetite", weight: 5 },
  { id: "back-pain", label: "Back Pain", weight: 6 },
  { id: "abdominal-pain", label: "Abdominal Pain", weight: 10 },
  { id: "diarrhoea", label: "Diarrhoea", weight: 9 },
  { id: "yellowing-of-eyes", label: "Yellowing of Eyes", weight: 14 },
  { id: "swelled-lymph-nodes", label: "Swollen Lymph Nodes", weight: 9 },
  { id: "blurred-and-distorted-vision", label: "Blurred Vision", weight: 11 },
  { id: "chest-pain", label: "Chest Pain", weight: 20 },
  { id: "weakness-in-limbs", label: "Weakness in Limbs", weight: 12 },
  { id: "fast-heart-rate", label: "Fast Heart Rate", weight: 14 },
  { id: "bloody-stool", label: "Bloody Stool", weight: 22 },
  { id: "neck-pain", label: "Neck Pain", weight: 6 },
  { id: "dizziness", label: "Dizziness", weight: 10 },
  { id: "cramps", label: "Cramps", weight: 6 },
  { id: "slurred-speech", label: "Slurred Speech", weight: 22 },
  { id: "muscle-weakness", label: "Muscle Weakness", weight: 11 },
  { id: "stiff-neck", label: "Stiff Neck", weight: 18 },
  { id: "loss-of-balance", label: "Loss of Balance", weight: 14 },
  { id: "weakness-of-one-body-side", label: "Weakness of One Body Side", weight: 26 },
  { id: "altered-sensorium", label: "Confusion / Altered Thinking", weight: 22 },
  { id: "red-spots-over-body", label: "Red Spots Over Body", weight: 11 },
  { id: "stomach-bleeding", label: "Stomach Bleeding", weight: 26 },
  { id: "blood-in-sputum", label: "Blood in Sputum", weight: 22 },
  { id: "palpitations", label: "Palpitations", weight: 14 },
  { id: "skin-peeling", label: "Skin Peeling", weight: 5 },
  { id: "swelling-joints", label: "Swelling in Joints", weight: 7 },
  { id: "loss-of-smell", label: "Loss of Smell", weight: 5 },
  { id: "polyuria", label: "Frequent Urination", weight: 8 },
  { id: "irregular-sugar-level", label: "Irregular Blood Sugar", weight: 8 },
  { id: "depression", label: "Depression / Low Mood", weight: 4 }
];

const TOP_US_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish (Español)" },
  { code: "zh", label: "Chinese (中文)" },
  { code: "tl", label: "Tagalog" },
  { code: "vi", label: "Vietnamese (Tiếng Việt)" },
  { code: "ar", label: "Arabic (العربية)" },
  { code: "fr", label: "French (Français)" },
  { code: "ko", label: "Korean (한국어)" },
  { code: "ru", label: "Russian (Русский)" },
  { code: "de", label: "German (Deutsch)" },
  { code: "ht", label: "Haitian Creole (Kreyòl Ayisyen)" },
  { code: "hi", label: "Hindi (हिन्दी)" },
  { code: "pt", label: "Portuguese (Português)" },
  { code: "it", label: "Italian (Italiano)" },
  { code: "pl", label: "Polish (Polski)" },
  { code: "ur", label: "Urdu (اردو)" },
  { code: "ja", label: "Japanese (日本語)" },
  { code: "fa", label: "Persian (فارسی)" },
  { code: "gu", label: "Gujarati (ગુજરાતી)" },
  { code: "te", label: "Telugu (తెలుగు)" },
  { code: "bn", label: "Bengali (বাংলা)" },
  { code: "ta", label: "Tamil (தமிழ்)" },
  { code: "pa", label: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "th", label: "Thai (ไทย)" },
  { code: "tr", label: "Turkish (Türkçe)" },
  { code: "he", label: "Hebrew (עברית)" },
  { code: "el", label: "Greek (Ελληνικά)" },
  { code: "uk", label: "Ukrainian (Українська)" },
  { code: "hy", label: "Armenian (Հայերեն)" },
  { code: "hmn", label: "Hmong" },
  { code: "sw", label: "Swahili (Kiswahili)" },
  { code: "yo", label: "Yoruba (Yorùbá)" },
  { code: "am", label: "Amharic (አማርኛ)" },
  { code: "ne", label: "Nepali (नेपाली)" },
  { code: "lo", label: "Lao (ລາວ)" },
  { code: "km", label: "Khmer (ខ្មែរ)" },
  { code: "id", label: "Indonesian (Bahasa Indonesia)" },
  { code: "ms", label: "Malay (Bahasa Melayu)" },
  { code: "my", label: "Burmese (မြန်မာ)" },
  { code: "sr", label: "Serbian (Српски)" },
  { code: "hr", label: "Croatian (Hrvatski)" },
  { code: "nl", label: "Dutch (Nederlands)" },
  { code: "hu", label: "Hungarian (Magyar)" },
  { code: "ro", label: "Romanian (Română)" },
  { code: "cs", label: "Czech (Čeština)" },
  { code: "sk", label: "Slovak (Slovenčina)" },
  { code: "fi", label: "Finnish (Suomi)" },
  { code: "no", label: "Norwegian (Norsk)" },
  { code: "da", label: "Danish (Dansk)" },
  { code: "lt", label: "Lithuanian (Lietuvių)" }
];

const SUPPORTED_LANGUAGE_VALUES = new Set(TOP_US_LANGUAGES.map((lang) => lang.code));

const TRANSLATIONS = {
  en: {
    heroKicker: "COMMUNITY HEALTH GUIDE",
    heroTitle: "CarePath",
    heroSubtitle: "Symptom triage support with guidance and care routing.",
    docTitle: "CarePath - Triage",
    languageTitle: "Choose Your Language",
    languageSubtitle: "Enter your preferred language before continuing.",
    languageInputLabel: "Language",
    languageOptionPlaceholder: "Select language...",
    languageOptionEnglish: "English",
    languageOptionGerman: "German",
    languageContinue: "Continue",
    languageUnsupported:
      "This language is not supported yet. Please choose one from the dropdown.",
    consentTitle: "Consent & Safety Notice",
    consentSubtitle: "Please review before continuing.",
    consentBody1:
      "This tool offers informational triage support based on user-reported inputs. It does not provide an official medical diagnosis and does not replace professional medical care.",
    consentBody2:
      "In a medical emergency, including severe chest pain, trouble breathing, stroke symptoms (sudden numbness, confusion, speech difficulty), severe bleeding, seizures, or suicidal thoughts, call emergency services immediately.",
    hotlineEmergency: "National Emergency Hotline: 911",
    hotlineSuicide: "National Suicide Hotline: 988",
    consentCheckbox:
      "I understand this tool is a first-pass support system and not a replacement for a doctor. I consent to provide health and location information for triage guidance.",
    consentContinue: "Continue to Triage",
    triageTitle: "Symptom",
    triageSubtitle:
      "Complete the form below for urgency scoring, hidden danger alerts, best care routing, and backup options.",
    labelAge: "Age",
    ageRestrictionMessage: "You must be at least {minAge} years old to use this tool.",
    labelSex: "Sex assigned at birth",
    labelZip: "ZIP code",
    labelIncome: "Income bracket",
    labelInsurance: "Insurance status",
    labelTransport: "Transport access",
    labelDuration: "Symptom duration",
    labelSeverity: "Severity (1-10)",
    labelNotes: "Notes / Additional information (optional)",
    notesPlaceholder: "Any extra detail...",
    legendSymptoms: "Symptoms (select all that apply)",
    analyze: "Analyze & Route Care",
    startOver: "Start Over",
    doctorBriefButton: "What to tell your doctor once you arrive",
    doctorBriefTitle: "What to Tell Your Doctor",
    doctorBriefIntro: "You can say this when you arrive:",
    doctorBriefScriptWithDuration:
      "I am {age} years old and have had {symptoms} for {duration}. It has felt {severityWord}.",
    doctorBriefScriptNoDuration:
      "I am {age} years old and have had {symptoms}. It has felt {severityWord}.",
    doctorBriefNotesLine: "Additional notes: {notes}.",
    doctorBriefNoNotes: "No extra notes provided.",
    doctorBriefNoSymptoms: "No symptoms selected.",
    doctorBriefDurationUnknown: "an unknown amount of time",
    andWord: "and",
    severityMild: "mild",
    severityModerate: "moderate",
    severitySevere: "severe",
    severityVerySevere: "very severe",
    findingCare: "Finding care options...",
    select: "Select...",
    female: "Female",
    male: "Male",
    intersex: "Intersex",
    incomeVeryLow: "Very low income",
    incomeLow: "Low income",
    incomeModerate: "Moderate income",
    incomeHigher: "Higher income",
    uninsured: "Uninsured",
    medicaid: "Medicaid",
    privateInsurance: "Private insurance",
    yes: "Yes",
    limited: "Limited",
    no: "No",
    durationHours: "Hours",
    duration1to3: "1-3 days",
    duration4to7: "4-7 days",
    durationWeek: "Over a week",
    resultsTitle: "Your Triage Result",
    resultsSubtitle: "Recommendation based on your symptom profile and access constraints.",
    datasetLoading: "Loading clinical symptom library...",
    datasetReady: "Clinical library ready: {symptoms} symptoms across {conditions} conditions.",
    datasetReadyFallback: "Clinical library ready: {symptoms} symptoms available.",
    datasetOffline:
      "Clinical symptom list loaded (offline mode). Full CSV condition matching is unavailable when opened as a local file. Start a local server (python -m http.server 8000) and open http://localhost:8000.",
    datasetLimited:
      "Clinical symptom list loaded (offline mode). Condition matching is limited because the CSV file could not be fetched.",
    resultsUrgencyScore: "Urgency Score",
    resultsConfidence: "Confidence",
    resultsConfidenceFactors: "Confidence factors",
    resultsWhy: "Why",
    notesConsidered: "Notes considered",
    possibleConditions: "Possible Conditions",
    noConditionOverlap: "Not enough overlap was found to suggest likely conditions.",
    hiddenDangerAlerts: "Hidden Danger Alerts",
    noCriticalCombo: "No critical symptom combination detected from selected inputs.",
    bestOptionNow: "Best Option Right Now",
    chosenForArea:
      "Chosen for care-fit, affordability, and speed in your area ({zip}). Wait ~{wait} min, {distance} miles away.",
    visitDetails: "Visit details",
    costModel: "Cost model",
    rankingScore: "Ranking score",
    waitMinutesShort: "{value} min",
    clinicTypeEmergencyRoom: "Emergency Room",
    clinicTypeUrgentCare: "Urgent Care",
    clinicTypeClinic: "Clinic",
    costLevelFree: "Free",
    costLevelSlidingScale: "Sliding scale",
    costLevelHigher: "Higher cost",
    mapSectionTitle: "Map",
    mapForZipTitle: "Nearby map for ZIP {zip}",
    mapOpenInGoogle: "Open in Google Maps",
    mapGetDirections: "Get directions",
    mapUnavailable: "Map preview unavailable for this clinic.",
    emergencyNote: "If symptoms worsen suddenly, go to the nearest ER immediately.",
    backupOptions: "Backup Options",
    urgencyEmergency: "Emergency: Go to ER now",
    urgencyUrgent: "Urgent: Seek urgent care today",
    urgencyModerate: "Moderate: Clinic visit within 24-72 hours",
    urgencyLow: "Low: Self-care + monitor symptoms",
    reasonSymptomRisk: "{symptom} increases overall risk profile.",
    reasonSeverity: "Severity ({severity}/10) increases urgency.",
    reasonAge: "Age group increases chance of complications.",
    reasonRapid: "Rapid symptom onset can indicate acute illness.",
    reasonLong: "Long symptom duration suggests unresolved condition.",
    conditionMatchWord: "match",
    backupOptionLine: "{name} - {type}, wait ~{wait} min, score {score}",
    confidenceBase: "Base confidence: +{value}",
    confidenceSymptomEvidence: "Symptom evidence ({count} selected): +{value}",
    confidenceTopConditionSupport: "Top condition support: +{value}",
    confidenceTopGap: "Top-vs-second match gap: +{value}",
    confidenceNotesEvidence: "Notes evidence signals: +{value}",
    confidenceDangerSupport: "Danger signal support: +{value}",
    confidenceSeverity: "Severity contribution: +{value}",
    confidenceCapFew2: "Limited to 55% because fewer than 2 symptoms were selected.",
    confidenceCapNoStrong: "Limited to 70% because no strong condition match was found.",
    confidenceCapFew3: "Limited to 75% because fewer than 3 symptoms were selected.",
    dangerMeningitisName: "Possible meningitis pattern",
    dangerMeningitisReason: "Fever with stiff neck can indicate a dangerous neurologic infection.",
    dangerCardiacName: "Possible cardiac complication",
    dangerCardiacReason: "Chest pain with fatigue may indicate elevated heart risk.",
    dangerRespName: "Respiratory emergency risk",
    dangerRespReason: "Breathing difficulty with chest symptoms can escalate quickly.",
    dangerNeuroName: "Neurologic red flag",
    dangerNeuroReason: "Severe headache with cognitive changes can indicate neurologic danger.",
    noteChestName: "Chest symptoms in notes",
    noteChestReason: "Your notes mention chest-related discomfort.",
    noteBreathName: "Breathing concerns in notes",
    noteBreathReason: "Your notes mention breathing difficulty.",
    noteNeuroName: "Neurologic concerns in notes",
    noteNeuroReason: "Your notes mention neurologic warning signs.",
    notePregnancyName: "Pregnancy mention",
    notePregnancyReason: "Your notes mention pregnancy/postpartum context.",
    noteWorseName: "Worsening progression in notes",
    noteWorseReason: "Your notes suggest symptoms may be worsening quickly.",
    watchItemName: "Safety watch item",
    watchItemReason:
      "No high-risk symptom combination was triggered, but continue monitoring and seek care if symptoms worsen.",
    liveLookupMissingTitle: "Best Option Right Now",
    liveLookupMissingBody:
      "We could not fetch nearby clinic records for ZIP {zip}. Please try another nearby ZIP code or try again shortly.",
    liveLookupMissingBackup: "No ranked local clinics available from live lookup."
  },
  de: {
    heroKicker: "GESUNDHEITSWEGWEISER",
    heroTitle: "CarePath",
    heroSubtitle: "Symptom-Triage mit klaren Empfehlungen und Versorgungsoptionen.",
    docTitle: "CarePath - Triage und Versorgung",
    languageTitle: "Sprache auswählen",
    languageSubtitle: "Geben Sie zuerst Ihre bevorzugte Sprache ein.",
    languageInputLabel: "Sprache",
    languageOptionPlaceholder: "Sprache auswählen...",
    languageOptionEnglish: "Englisch",
    languageOptionGerman: "Deutsch",
    languageContinue: "Weiter",
    languageUnsupported:
      "Diese Sprache wird noch nicht unterstützt. Bitte eine Sprache aus der Liste wählen.",
    consentTitle: "Einwilligung & Sicherheitshinweis",
    consentSubtitle: "Bitte vor dem Fortfahren lesen.",
    consentBody1:
      "Dieses Tool bietet nur eine informative Triage auf Basis Ihrer Angaben. Es stellt keine offizielle Diagnose und ersetzt keine professionelle medizinische Behandlung.",
    consentBody2:
      "Bei einem medizinischen Notfall (z. B. starke Brustschmerzen, Atemnot, Schlaganfallzeichen, starke Blutung, Krampfanfälle oder Suizidgedanken) sofort den Notruf wählen.",
    hotlineEmergency: "Notruf: 911",
    hotlineSuicide: "Suizid-Hotline: 988",
    consentCheckbox:
      "Ich verstehe, dass dieses Tool eine Ersthilfe ist und keinen Arzt ersetzt. Ich stimme der Nutzung meiner Gesundheits- und Standortdaten zu.",
    consentContinue: "Zur Triage",
    triageTitle: "Symptomerfassung",
    triageSubtitle:
      "Bitte Formular ausfüllen für Dringlichkeit, Warnhinweise und beste Versorgungsoptionen.",
    labelAge: "Alter",
    ageRestrictionMessage:
      "Sie müssen mindestens {minAge} Jahre alt sein, um dieses Tool zu verwenden.",
    labelSex: "Geschlecht bei Geburt",
    labelZip: "Postleitzahl",
    labelIncome: "Einkommensstufe",
    labelInsurance: "Versicherungsstatus",
    labelTransport: "Transportzugang",
    labelDuration: "Symptomdauer",
    labelSeverity: "Schweregrad (1-10)",
    labelNotes: "Zusätzliche Informationen (optional)",
    notesPlaceholder: "Weitere Details...",
    legendSymptoms: "Symptome (mehrere auswählbar)",
    analyze: "Analysieren & Versorgung finden",
    startOver: "Neu starten",
    doctorBriefButton: "Was Sie Ihrem Arzt bei Ankunft sagen können",
    doctorBriefTitle: "Was Sie Ihrem Arzt sagen können",
    doctorBriefIntro: "Das können Sie bei Ankunft sagen:",
    doctorBriefScriptWithDuration:
      "Ich bin {age} Jahre alt und habe seit {duration} {symptoms}. Es fühlt sich {severityWord} an.",
    doctorBriefScriptNoDuration:
      "Ich bin {age} Jahre alt und habe {symptoms}. Es fühlt sich {severityWord} an.",
    doctorBriefNotesLine: "Zusätzliche Hinweise: {notes}.",
    doctorBriefNoNotes: "Keine zusätzlichen Hinweise angegeben.",
    doctorBriefNoSymptoms: "Keine Symptome ausgewählt.",
    doctorBriefDurationUnknown: "einen unbekannten Zeitraum",
    andWord: "und",
    severityMild: "leicht",
    severityModerate: "mittelstark",
    severitySevere: "stark",
    severityVerySevere: "sehr stark",
    findingCare: "Versorgung wird gesucht...",
    select: "Auswählen...",
    female: "Weiblich",
    male: "Männlich",
    intersex: "Intersex",
    incomeVeryLow: "Sehr niedriges Einkommen",
    incomeLow: "Niedriges Einkommen",
    incomeModerate: "Mittleres Einkommen",
    incomeHigher: "Höheres Einkommen",
    uninsured: "Nicht versichert",
    medicaid: "Medicaid",
    privateInsurance: "Private Versicherung",
    yes: "Ja",
    limited: "Eingeschränkt",
    no: "Nein",
    durationHours: "Stunden",
    duration1to3: "1-3 Tage",
    duration4to7: "4-7 Tage",
    durationWeek: "Über eine Woche",
    resultsTitle: "Ihr Triage-Ergebnis",
    resultsSubtitle: "Empfehlung basierend auf Symptomen und Zugang.",
    datasetLoading: "Klinische Symptomdaten werden geladen...",
    datasetReady: "Klinische Daten bereit: {symptoms} Symptome, {conditions} Erkrankungen.",
    datasetReadyFallback: "Klinische Daten bereit: {symptoms} Symptome verfügbar.",
    datasetOffline:
      "Symptomliste im Offline-Modus geladen. Vollständige CSV-Zuordnung ist bei Datei-Öffnung nicht verfügbar.",
    datasetLimited:
      "Symptomliste im Offline-Modus geladen. Erkrankungszuordnung ist begrenzt.",
    resultsUrgencyScore: "Dringlichkeit",
    resultsConfidence: "Sicherheit",
    resultsConfidenceFactors: "Sicherheitsfaktoren",
    resultsWhy: "Begründung",
    notesConsidered: "Berücksichtigte Notizen",
    possibleConditions: "Mögliche Erkrankungen",
    noConditionOverlap: "Keine ausreichende Übereinstimmung für klare Erkrankungsvorschläge.",
    hiddenDangerAlerts: "Versteckte Warnsignale",
    noCriticalCombo: "Keine kritische Symptomkombination erkannt.",
    bestOptionNow: "Beste Option jetzt",
    chosenForArea:
      "Ausgewählt nach Versorgungsniveau, Kosten und Schnelligkeit für PLZ {zip}. Wartezeit ca. {wait} Min., Entfernung {distance} Meilen.",
    visitDetails: "Besuchsdetails",
    costModel: "Kostenmodell",
    rankingScore: "Rangwert",
    waitMinutesShort: "{value} Min",
    clinicTypeEmergencyRoom: "Notaufnahme",
    clinicTypeUrgentCare: "Akutversorgung",
    clinicTypeClinic: "Klinik",
    costLevelFree: "Kostenlos",
    costLevelSlidingScale: "Einkommensabhängig",
    costLevelHigher: "Höhere Kosten",
    mapSectionTitle: "Karte",
    mapForZipTitle: "Karte in der Nähe für PLZ {zip}",
    mapOpenInGoogle: "In Google Maps öffnen",
    mapGetDirections: "Route anzeigen",
    mapUnavailable: "Kartenvorschau für diese Einrichtung nicht verfügbar.",
    emergencyNote: "Bei plötzlicher Verschlechterung sofort zur Notaufnahme.",
    backupOptions: "Weitere Optionen",
    urgencyEmergency: "Notfall: Sofort in die Notaufnahme",
    urgencyUrgent: "Dringend: Heute zur Akutversorgung",
    urgencyModerate: "Mittel: Klinikbesuch in 24-72 Stunden",
    urgencyLow: "Niedrig: Selbsthilfe und beobachten",
    reasonSymptomRisk: "{symptom} erhöht das Gesamtrisiko.",
    reasonSeverity: "Schweregrad ({severity}/10) erhöht die Dringlichkeit.",
    reasonAge: "Diese Altersgruppe hat ein höheres Komplikationsrisiko.",
    reasonRapid: "Ein schneller Symptombeginn kann auf eine akute Erkrankung hindeuten.",
    reasonLong: "Lange Symptomdauer deutet auf einen nicht abgeklärten Zustand hin.",
    conditionMatchWord: "Treffer",
    backupOptionLine: "{name} - {type}, Wartezeit ~{wait} Min., Wertung {score}",
    confidenceBase: "Basisvertrauen: +{value}",
    confidenceSymptomEvidence: "Symptombelege ({count} ausgewählt): +{value}",
    confidenceTopConditionSupport: "Unterstützung der Top-Erkrankung: +{value}",
    confidenceTopGap: "Abstand Top- zur zweiten Übereinstimmung: +{value}",
    confidenceNotesEvidence: "Hinweise aus Notizen: +{value}",
    confidenceDangerSupport: "Unterstützung durch Warnsignale: +{value}",
    confidenceSeverity: "Beitrag des Schweregrads: +{value}",
    confidenceCapFew2: "Auf 55% begrenzt, weil weniger als 2 Symptome ausgewählt wurden.",
    confidenceCapNoStrong:
      "Auf 70% begrenzt, weil keine starke Erkrankungsübereinstimmung gefunden wurde.",
    confidenceCapFew3: "Auf 75% begrenzt, weil weniger als 3 Symptome ausgewählt wurden.",
    dangerMeningitisName: "Mögliches Meningitis-Muster",
    dangerMeningitisReason:
      "Fieber mit Nackensteifigkeit kann auf eine gefährliche neurologische Infektion hinweisen.",
    dangerCardiacName: "Mögliche kardiale Komplikation",
    dangerCardiacReason: "Brustschmerz mit Müdigkeit kann auf ein erhöhtes Herzrisiko hinweisen.",
    dangerRespName: "Risiko für Atemwegsnotfall",
    dangerRespReason: "Atemnot mit Brustsymptomen kann sich schnell verschlimmern.",
    dangerNeuroName: "Neurologisches Warnsignal",
    dangerNeuroReason:
      "Starke Kopfschmerzen mit kognitiven Veränderungen können neurologisch gefährlich sein.",
    noteChestName: "Brustsymptome in den Notizen",
    noteChestReason: "Ihre Notizen erwähnen Brustbeschwerden.",
    noteBreathName: "Atemprobleme in den Notizen",
    noteBreathReason: "Ihre Notizen erwähnen Atembeschwerden.",
    noteNeuroName: "Neurologische Hinweise in den Notizen",
    noteNeuroReason: "Ihre Notizen erwähnen neurologische Warnzeichen.",
    notePregnancyName: "Hinweis auf Schwangerschaft",
    notePregnancyReason: "Ihre Notizen erwähnen Schwangerschaft/Wochenbett.",
    noteWorseName: "Hinweis auf Verschlechterung",
    noteWorseReason: "Ihre Notizen deuten auf eine schnelle Verschlechterung hin.",
    watchItemName: "Sicherheits-Hinweis",
    watchItemReason:
      "Es wurde keine Hochrisiko-Kombination ausgelöst, aber bitte Symptome weiter beobachten und bei Verschlechterung medizinische Hilfe suchen.",
    liveLookupMissingTitle: "Beste Option jetzt",
    liveLookupMissingBody:
      "Für PLZ {zip} konnten keine nahen Kliniken geladen werden. Bitte andere PLZ versuchen.",
    liveLookupMissingBackup: "Keine lokalen Alternativen aus Live-Suche."
  },
  zh: {
    heroKicker: "社区健康指南",
    heroTitle: "CarePath",
    heroSubtitle: "症状分诊支持与就医路径建议。",
    docTitle: "CarePath - 分诊与就医",
    languageTitle: "选择您的语言",
    languageSubtitle: "继续之前请选择语言。",
    languageInputLabel: "语言",
    languageOptionPlaceholder: "选择语言...",
    languageContinue: "继续",
    consentTitle: "同意与安全提示",
    consentSubtitle: "继续前请先阅读。",
    consentBody1:
      "本工具根据您提供的信息提供分诊参考，不构成正式医疗诊断，也不能替代专业医疗服务。",
    consentBody2:
      "如遇医疗紧急情况（如严重胸痛、呼吸困难、中风症状、严重出血、癫痫或自杀想法），请立即联系急救服务。",
    hotlineEmergency: "紧急热线：911",
    hotlineSuicide: "心理危机热线：988",
    consentCheckbox:
      "我理解本工具仅用于初步支持，不能替代医生。我同意提供健康和位置信息用于分诊建议。",
    consentContinue: "继续进入分诊",
    triageTitle: "症状录入",
    triageSubtitle: "填写表单以获取紧急程度评估、风险提示与就医路线建议。",
    labelAge: "年龄",
    ageRestrictionMessage: "您必须年满 {minAge} 岁才能使用本工具。",
    labelSex: "出生时指定性别",
    labelZip: "邮政编码",
    labelIncome: "收入区间",
    labelInsurance: "保险状态",
    labelTransport: "交通可达性",
    labelDuration: "症状持续时间",
    labelSeverity: "严重程度（1-10）",
    labelNotes: "备注 / 其他信息（可选）",
    notesPlaceholder: "可填写更多细节...",
    legendSymptoms: "症状（可多选）",
    analyze: "分析并推荐就医",
    startOver: "重新开始",
    doctorBriefButton: "到达后可以对医生说什么",
    doctorBriefTitle: "就诊沟通提示",
    doctorBriefIntro: "到达后可以这样和医生说：",
    doctorBriefScriptWithDuration:
      "我今年 {age} 岁，已经出现 {symptoms} 持续 {duration}，整体感觉{severityWord}。",
    doctorBriefScriptNoDuration: "我今年 {age} 岁，出现了 {symptoms}，整体感觉{severityWord}。",
    doctorBriefNotesLine: "补充说明：{notes}。",
    doctorBriefNoNotes: "未提供额外备注。",
    doctorBriefNoSymptoms: "未选择症状。",
    doctorBriefDurationUnknown: "一段时间",
    andWord: "和",
    severityMild: "轻微",
    severityModerate: "中等",
    severitySevere: "较重",
    severityVerySevere: "非常严重",
    findingCare: "正在查找就医选项...",
    select: "请选择...",
    female: "女性",
    male: "男性",
    intersex: "间性",
    incomeVeryLow: "极低收入",
    incomeLow: "低收入",
    incomeModerate: "中等收入",
    incomeHigher: "较高收入",
    uninsured: "无保险",
    medicaid: "Medicaid",
    privateInsurance: "商业保险",
    yes: "是",
    limited: "有限",
    no: "否",
    durationHours: "数小时",
    duration1to3: "1-3 天",
    duration4to7: "4-7 天",
    durationWeek: "超过一周",
    resultsTitle: "您的分诊结果",
    resultsSubtitle: "基于症状与可及性限制的建议。",
    resultsUrgencyScore: "紧急评分",
    resultsConfidence: "置信度",
    resultsConfidenceFactors: "置信度因素",
    resultsWhy: "依据",
    notesConsidered: "已纳入备注",
    possibleConditions: "可能情况",
    hiddenDangerAlerts: "隐藏风险提示",
    bestOptionNow: "当前最佳就医选项",
    chosenForArea:
      "因您所在地区的护理适配度、可负担性与速度而被选中（{zip}）。预计等待约 {wait} 分钟，距离 {distance} 英里。",
    costModel: "费用模式",
    rankingScore: "排名分数",
    clinicTypeEmergencyRoom: "急诊室",
    clinicTypeUrgentCare: "急诊门诊",
    clinicTypeClinic: "诊所",
    costLevelFree: "免费",
    costLevelSlidingScale: "按收入浮动",
    costLevelHigher: "较高费用",
    mapSectionTitle: "地图",
    mapForZipTitle: "邮编 {zip} 附近地图",
    mapOpenInGoogle: "在 Google 地图中打开",
    mapGetDirections: "获取路线",
    emergencyNote: "若症状突然恶化，请立即前往最近急诊室。",
    backupOptions: "备选选项",
    conditionMatchWord: "匹配",
    backupOptionLine: "{name} - {type}，等待约 {wait} 分钟，评分 {score}",
    urgencyEmergency: "紧急：立即前往急诊室",
    urgencyUrgent: "紧急：今天前往急诊门诊",
    urgencyModerate: "中等：24-72 小时内门诊就诊",
    urgencyLow: "较低：居家观察并监测症状",
    watchItemName: "安全观察项",
    watchItemReason: "当前未触发高风险组合，但请持续观察，若症状加重请尽快就医。",
    liveLookupMissingTitle: "当前最佳就医选项",
    liveLookupMissingBody: "未能获取邮编 {zip} 附近的诊所记录，请稍后重试或更换附近邮编。",
    liveLookupMissingBackup: "实时查询未返回可排序的本地诊所。"
  },
  es: {
    heroKicker: "GUÍA DE SALUD COMUNITARIA",
    heroTitle: "CarePath",
    heroSubtitle: "Triaje de síntomas con orientación y rutas de atención.",
    languageTitle: "Elige tu idioma",
    languageSubtitle: "Escribe tu idioma antes de continuar.",
    languageInputLabel: "Idioma",
    languageInputPlaceholder: "Inglés, Alemán, Español...",
    languageContinue: "Continuar",
    languageUnsupported:
      "Este idioma aún no está disponible. Prueba inglés, alemán, español o francés."
  },
  fr: {
    heroKicker: "GUIDE SANTÉ COMMUNAUTAIRE",
    heroTitle: "CarePath",
    heroSubtitle: "Triage des symptômes avec orientation et accès aux soins.",
    languageTitle: "Choisissez votre langue",
    languageSubtitle: "Saisissez votre langue avant de continuer.",
    languageInputLabel: "Langue",
    languageInputPlaceholder: "Anglais, Allemand, Espagnol...",
    languageContinue: "Continuer",
    languageUnsupported:
      "Cette langue n'est pas encore prise en charge. Essayez anglais, allemand, espagnol ou français."
  }
};

const dangerRuleTemplates = [
  {
    nameKey: "dangerMeningitisName",
    triggerLabels: ["high fever", "stiff neck"],
    urgencyFloor: 92,
    reasonKey: "dangerMeningitisReason"
  },
  {
    nameKey: "dangerCardiacName",
    triggerLabels: ["chest pain", "fatigue"],
    urgencyFloor: 86,
    reasonKey: "dangerCardiacReason"
  },
  {
    nameKey: "dangerRespName",
    triggerLabels: ["breathlessness", "chest pain"],
    urgencyFloor: 90,
    reasonKey: "dangerRespReason"
  },
  {
    nameKey: "dangerNeuroName",
    triggerLabels: ["headache", "altered sensorium"],
    urgencyFloor: 88,
    reasonKey: "dangerNeuroReason"
  }
];

const NOTE_KEYWORD_RULES = [
  {
    nameKey: "noteChestName",
    pattern: /\b(chest pain|chest pressure|tight chest|tightness in chest)\b/i,
    riskPoints: 12,
    urgencyFloor: 78,
    reasonKey: "noteChestReason"
  },
  {
    nameKey: "noteBreathName",
    pattern: /\b(short of breath|cannot breathe|trouble breathing|breathing hard)\b/i,
    riskPoints: 14,
    urgencyFloor: 82,
    reasonKey: "noteBreathReason"
  },
  {
    nameKey: "noteNeuroName",
    pattern: /\b(fainted|fainting|passed out|confused|slurred speech|numbness)\b/i,
    riskPoints: 12,
    urgencyFloor: 80,
    reasonKey: "noteNeuroReason"
  },
  {
    nameKey: "notePregnancyName",
    pattern: /\b(pregnan|postpartum|recent birth)\b/i,
    riskPoints: 6,
    urgencyFloor: 65,
    reasonKey: "notePregnancyReason"
  },
  {
    nameKey: "noteWorseName",
    pattern: /\b(getting worse|worse today|rapidly worsening|suddenly worse)\b/i,
    riskPoints: 8,
    urgencyFloor: 70,
    reasonKey: "noteWorseReason"
  }
];

const FALLBACK_CONDITION_PROFILES = [
  {
    condition: "Influenza-like illness",
    symptomIds: ["high-fever", "mild-fever", "chills", "shivering", "fatigue", "headache"]
  },
  {
    condition: "Gastrointestinal infection",
    symptomIds: ["stomach-pain", "abdominal-pain", "nausea", "vomiting", "diarrhoea", "dehydration"]
  },
  {
    condition: "Urinary tract infection",
    symptomIds: ["burning-micturition", "polyuria", "dark-urine", "mild-fever", "dehydration"]
  },
  {
    condition: "Migraine or tension headache",
    symptomIds: ["headache", "dizziness", "nausea", "blurred-and-distorted-vision"]
  },
  {
    condition: "Possible liver-related condition",
    symptomIds: ["yellowish-skin", "yellowing-of-eyes", "dark-urine", "loss-of-appetite", "abdominal-pain"]
  },
  {
    condition: "Respiratory infection",
    symptomIds: ["breathlessness", "chest-pain", "high-fever", "fatigue", "blood-in-sputum"]
  },
  {
    condition: "Cardiac chest pain syndrome",
    symptomIds: ["chest-pain", "fast-heart-rate", "palpitations", "breathlessness", "fatigue"]
  },
  {
    condition: "Neurologic warning condition",
    symptomIds: ["slurred-speech", "weakness-of-one-body-side", "loss-of-balance", "altered-sensorium", "dizziness"]
  },
  {
    condition: "Inflammatory skin condition",
    symptomIds: ["itching", "skin-rash", "red-spots-over-body", "skin-peeling", "swelling-joints"]
  },
  {
    condition: "Metabolic/endocrine imbalance",
    symptomIds: ["weight-loss", "fatigue", "irregular-sugar-level", "polyuria", "depression"]
  }
];

const consentCheckbox = document.getElementById("consent-checkbox");
const startButton = document.getElementById("start-btn");
const languageScreen = document.getElementById("language-screen");
const languageInput = document.getElementById("language-input");
const languageError = document.getElementById("language-error");
const languageContinueBtn = document.getElementById("language-continue-btn");
const triageForm = document.getElementById("triage-form");
const symptomsContainer = document.getElementById("symptoms-options");
const datasetStatus = document.getElementById("dataset-status");
const waiverScreen = document.getElementById("waiver-screen");
const triageScreen = document.getElementById("triage-screen");
const resultsScreen = document.getElementById("results-screen");
const resultSummary = document.getElementById("result-summary");
const conditionInsights = document.getElementById("condition-insights");
const dangerFlags = document.getElementById("danger-flags");
const topOption = document.getElementById("top-option");
const backupOptions = document.getElementById("backup-options");
const doctorBriefButton = document.getElementById("doctor-brief-btn");
const doctorBriefOutput = document.getElementById("doctor-brief-output");
const startOverButton = document.getElementById("start-over-btn");
const submitButton = triageForm.querySelector("button[type='submit']");
const ageInput = document.getElementById("age");
const MINIMUM_ALLOWED_AGE = 15;

let symptomCatalog = [];
let diseaseProfiles = [];
let hiddenDangerRules = [];
let currentLanguage = "en";
let selectedLanguageCode = "";
const dynamicLanguagePacks = {};
const dynamicSymptomPacks = {};
const runtimeTranslationCache = new Map();
let latestDoctorBriefContext = null;
const PRIORITY_UI_KEYS = [
  "heroKicker",
  "heroSubtitle",
  "languageTitle",
  "languageSubtitle",
  "labelAge",
  "labelSex",
  "labelZip",
  "labelIncome",
  "labelInsurance",
  "labelTransport",
  "labelDuration",
  "labelSeverity",
  "legendSymptoms",
  "analyze",
  "select",
  "female",
  "male",
  "intersex",
  "incomeVeryLow",
  "incomeLow",
  "incomeModerate",
  "incomeHigher",
  "uninsured",
  "medicaid",
  "privateInsurance",
  "yes",
  "limited",
  "no",
  "durationHours",
  "duration1to3",
  "duration4to7",
  "durationWeek",
  "doctorBriefButton",
  "resultsUrgencyScore",
  "resultsConfidence",
  "resultsConfidenceFactors",
  "resultsWhy",
  "possibleConditions",
  "hiddenDangerAlerts",
  "bestOptionNow",
  "chosenForArea",
  "costModel",
  "rankingScore",
  "mapSectionTitle",
  "mapOpenInGoogle",
  "mapGetDirections",
  "emergencyNote",
  "backupOptions",
  "conditionMatchWord",
  "backupOptionLine",
  "watchItemName",
  "watchItemReason",
  "noConditionOverlap",
  "noCriticalCombo",
  "urgencyEmergency",
  "urgencyUrgent",
  "urgencyModerate",
  "urgencyLow",
  "consentTitle",
  "consentSubtitle",
  "consentBody1",
  "consentBody2",
  "hotlineEmergency",
  "hotlineSuicide",
  "consentCheckbox",
  "consentContinue",
  "triageTitle",
  "triageSubtitle",
  "resultsTitle",
  "resultsSubtitle"
];

init();

function init() {
  applyTranslations();
  waiverScreen.classList.add("hidden");
  triageScreen.classList.add("hidden");
  resultsScreen.classList.add("hidden");
  languageScreen.classList.remove("hidden");

  languageContinueBtn.addEventListener("click", () => {
    handleLanguageSelection();
  });

  consentCheckbox.addEventListener("change", () => {
    startButton.disabled = !consentCheckbox.checked;
  });

  ageInput.addEventListener("input", () => {
    if (Number(ageInput.value) >= MINIMUM_ALLOWED_AGE) {
      ageInput.setCustomValidity("");
    }
  });

  startButton.addEventListener("click", () => {
    waiverScreen.classList.add("hidden");
    triageScreen.classList.remove("hidden");
  });

  triageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = t("findingCare");

    try {
      const formData = collectFormData();
      if (formData.age < MINIMUM_ALLOWED_AGE) {
        const message = t("ageRestrictionMessage", { minAge: MINIMUM_ALLOWED_AGE });
        ageInput.setCustomValidity(message);
        ageInput.reportValidity();
        return;
      }
      ageInput.setCustomValidity("");
      const triage = calculateTriage(formData);
      const clinicLookup = await lookupClinicsByZip(formData.zipCode, triage.recommendedLevel);
      const rankedOptions = rankCareOptions(
        triage.recommendedLevel,
        formData,
        clinicLookup.clinics
      );
      await renderResults(triage, rankedOptions, formData, clinicLookup);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });

  startOverButton.addEventListener("click", () => {
    triageForm.reset();
    resultsScreen.classList.add("hidden");
    waiverScreen.classList.add("hidden");
    triageScreen.classList.remove("hidden");
    doctorBriefOutput.classList.add("hidden");
    doctorBriefOutput.innerHTML = "";
    latestDoctorBriefContext = null;
  });

  doctorBriefButton.addEventListener("click", () => {
    renderDoctorBrief();
  });

  loadKaggleDataset();
}

async function handleLanguageSelection() {
  const nextLanguage = (languageInput.value || "").trim().toLowerCase();
  if (!SUPPORTED_LANGUAGE_VALUES.has(nextLanguage)) {
    languageError.textContent = t("languageUnsupported");
    languageError.classList.remove("hidden");
    return;
  }

  languageContinueBtn.disabled = true;
  selectedLanguageCode = nextLanguage;
  currentLanguage = nextLanguage;
  languageError.classList.add("hidden");

  // Ensure waiver text is translated before showing the waiver screen.
  await ensurePriorityTranslations(nextLanguage, PRIORITY_UI_KEYS);

  // Apply immediately so users see language change without waiting on full translation batches.
  applyTranslations();
  loadKaggleDataset();
  languageScreen.classList.add("hidden");
  waiverScreen.classList.remove("hidden");

  try {
    await ensureLanguageResources(nextLanguage);
    applyTranslations();
    renderSymptoms();
  } catch (_error) {
    // Keep UI usable with available fallback strings.
  }

  languageContinueBtn.disabled = false;
}

async function ensurePriorityTranslations(langCode, keys) {
  if (langCode === "en") {
    return;
  }

  const staticPack = TRANSLATIONS[langCode] || {};
  const dynamicPack = dynamicLanguagePacks[langCode] || {};
  const missingKeys = keys.filter((key) =>
    shouldTranslateLanguageKey(langCode, key, staticPack, dynamicPack)
  );

  if (!missingKeys.length) {
    return;
  }

  const translatedEntries = await mapWithConcurrency(missingKeys, 4, async (key) => {
    const englishValue = TRANSLATIONS.en[key];
    if (!englishValue) {
      return [key, key];
    }
    if (NON_TRANSLATABLE_TRANSLATION_KEYS.has(key)) {
      return [key, englishValue];
    }
    const translated = await translateText(englishValue, langCode);
    return [key, translated || englishValue];
  });

  dynamicLanguagePacks[langCode] = {
    ...dynamicPack,
    ...Object.fromEntries(translatedEntries)
  };
}

async function loadKaggleDataset() {
  submitButton.disabled = true;
  datasetStatus.textContent = "";

  try {
    const response = await fetch(DATASET_PATH);
    if (!response.ok) {
      throw new Error(`Failed to load ${DATASET_PATH}`);
    }

    const csvText = await response.text();
    const parsed = parseKaggleOneHotDataset(csvText);
    symptomCatalog = parsed.symptoms;
    diseaseProfiles = parsed.diseases;
    hiddenDangerRules = buildDangerRules(symptomCatalog);
    renderSymptoms();

    datasetStatus.textContent = "";
    submitButton.disabled = false;
  } catch (error) {
    symptomCatalog = CURATED_SYMPTOM_CATALOG.map((symptom) => ({
      ...symptom,
      rawLabel: normalizeLabel(symptom.id)
    }));
    diseaseProfiles = [];
    hiddenDangerRules = buildDangerRules(symptomCatalog);
    renderSymptoms();
    datasetStatus.textContent = "";
    submitButton.disabled = false;
  }
}

function parseKaggleOneHotDataset(csvText) {
  const rows = parseCsv(csvText);
  if (rows.length < 2) {
    throw new Error("Dataset is empty.");
  }

  const rawHeaders = rows[0].map((header) => header.trim());
  const headers = rawHeaders.filter((header) => header !== "");
  const dataRows = rows.slice(1).map((row) => row.slice(0, headers.length));

  const prognosisIdx = headers.findIndex(
    (header) => normalizeLabel(header) === "prognosis"
  );
  if (prognosisIdx === -1) {
    throw new Error("Expected prognosis column was not found.");
  }

  const curatedByKey = new Map(
    CURATED_SYMPTOM_CATALOG.map((symptom) => [normalizeLabel(symptom.id), symptom])
  );
  const symptomColumns = headers
    .map((header, idx) => ({ idx, header, key: cleanSymptomValue(header) }))
    .filter(({ idx, key }) => {
      if (idx === prognosisIdx || !key) {
        return false;
      }
      if (EXCLUDED_NON_SYMPTOM_FIELDS.has(key)) {
        return false;
      }
      return curatedByKey.has(key);
    });

  const symptoms = CURATED_SYMPTOM_CATALOG.map((symptom) => ({
    ...symptom,
    rawLabel: normalizeLabel(symptom.id)
  }));
  const idByRawLabel = new Map(symptoms.map((symptom) => [symptom.rawLabel, symptom.id]));
  const diseaseMap = new Map();

  for (const row of dataRows) {
    const condition = (row[prognosisIdx] || "").trim();
    if (!condition) {
      continue;
    }

    if (!diseaseMap.has(condition)) {
      diseaseMap.set(condition, {
        condition,
        sampleSize: 0,
        symptoms: new Map()
      });
    }

    const profile = diseaseMap.get(condition);
    profile.sampleSize += 1;

    for (const column of symptomColumns) {
      const rawValue = (row[column.idx] || "").trim().toLowerCase();
      if (rawValue === "1" || rawValue === "true" || rawValue === "yes") {
        const symptomLabel = column.key;
        profile.symptoms.set(
          symptomLabel,
          (profile.symptoms.get(symptomLabel) || 0) + 1
        );
      }
    }
  }
  const diseases = Array.from(diseaseMap.values())
    .map((profile) => ({
      condition: profile.condition,
      sampleSize: profile.sampleSize,
      symptoms: Array.from(profile.symptoms.entries())
        .map(([rawLabel, count]) => {
          const symptomId = idByRawLabel.get(rawLabel);
          if (!symptomId) {
            return null;
          }
          return { id: symptomId, label: toTitleCase(rawLabel), count };
        })
        .filter(Boolean)
        .sort((a, b) => b.count - a.count)
    }))
    .filter((profile) => profile.symptoms.length > 0);

  return { symptoms, diseases };
}

function buildDangerRules(catalog) {
  const labelToId = new Map(
    catalog.map((symptom) => [normalizeLabel(symptom.rawLabel || symptom.label), symptom.id])
  );

  const aliases = {
    "shortness of breath": "breathlessness",
    "short breath": "breathlessness",
    fever: "high fever",
    confusion: "altered sensorium"
  };

  return dangerRuleTemplates
    .map((template) => {
      const trigger = template.triggerLabels
        .map((label) => normalizeLabel(aliases[normalizeLabel(label)] || label))
        .map((normalized) => labelToId.get(normalized))
        .filter(Boolean);

      if (trigger.length !== template.triggerLabels.length) {
        return null;
      }

      return {
        ...template,
        trigger,
        name: t(template.nameKey),
        reason: t(template.reasonKey)
      };
    })
    .filter(Boolean);
}

function renderSymptoms() {
  symptomsContainer.innerHTML = "";
  for (const symptom of symptomCatalog) {
    const label = document.createElement("label");
    label.className = "checkbox-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "symptoms";
    checkbox.value = symptom.id;

    const text = document.createElement("span");
    text.textContent = getSymptomLabel(symptom);

    label.appendChild(checkbox);
    label.appendChild(text);
    symptomsContainer.appendChild(label);
  }
}

function collectFormData() {
  const selectedSymptoms = Array.from(
    document.querySelectorAll("input[name='symptoms']:checked")
  ).map((el) => el.value);

  return {
    age: Number(document.getElementById("age").value),
    sex: document.getElementById("sex").value,
    zipCode: document.getElementById("zipCode").value,
    incomeBracket: document.getElementById("incomeBracket").value,
    insuranceStatus: document.getElementById("insuranceStatus").value,
    transportAccess: document.getElementById("transportAccess").value,
    duration: document.getElementById("duration").value,
    severity: Number(document.getElementById("severity").value),
    symptomNotes: (document.getElementById("symptomNotes").value || "").trim(),
    symptoms: selectedSymptoms
  };
}

function calculateTriage(input) {
  let score = 0;
  const reasons = [];
  const triggeredDanger = [];
  const noteAnalysis = analyzeSymptomNotes(input.symptomNotes);

  const symptomMap = new Map(symptomCatalog.map((symptom) => [symptom.id, symptom]));
  for (const symptomId of input.symptoms) {
    const symptom = symptomMap.get(symptomId);
    if (!symptom) {
      continue;
    }
    score += symptom.weight;
    reasons.push(
      t("reasonSymptomRisk", {
        symptom: getSymptomLabel(symptom)
      })
    );
  }

  score += input.severity * 3;
  reasons.push(t("reasonSeverity", { severity: input.severity }));

  if (input.age < 5 || input.age > 65) {
    score += 8;
    reasons.push(t("reasonAge"));
  }

  if (input.duration === "hours") {
    score += 8;
    reasons.push(t("reasonRapid"));
  } else if (input.duration === "over-a-week") {
    score += 5;
    reasons.push(t("reasonLong"));
  }

  for (const signal of noteAnalysis.signals) {
    score += signal.riskPoints;
    reasons.push(t(signal.reasonKey));
    if (signal.urgencyFloor) {
      score = Math.max(score, signal.urgencyFloor);
      triggeredDanger.push({
        name: t(signal.nameKey),
        reason: t(signal.reasonKey)
      });
    }
  }

  for (const rule of hiddenDangerRules) {
    const triggered = rule.trigger.every((symptomId) => input.symptoms.includes(symptomId));
    if (!triggered) {
      continue;
    }
    triggeredDanger.push(rule);
    score = Math.max(score, rule.urgencyFloor);
    reasons.push(rule.reason);
  }

  if (!triggeredDanger.length) {
    triggeredDanger.push({
      name: t("watchItemName"),
      reason: t("watchItemReason")
    });
  }

  score = clamp(score, 0, 100);
  const predictedConditions = predictConditions(input.symptoms, {
    severity: input.severity,
    duration: input.duration
  });
  const confidenceBreakdown = computeConfidenceScore({
    selectedSymptomCount: input.symptoms.length,
    predictedConditions,
    noteSignalCount: noteAnalysis.signals.length,
    dangerSignalCount: triggeredDanger.length,
    severity: input.severity
  });
  const urgency = getUrgencyBand(score);

  return {
    score,
    confidence: confidenceBreakdown.score,
    confidenceFactors: confidenceBreakdown.factors,
    urgencyLabel: urgency.label,
    recommendedLevel: urgency.level,
    reasons: reasons.slice(0, 5),
    dangerFlags: triggeredDanger,
    predictedConditions,
    noteInsights: noteAnalysis
  };
}

function predictConditions(selectedSymptomIds, context = {}) {
  const selected = new Set(selectedSymptomIds);
  const dataDriven = diseaseProfiles
    .map((profile) => {
      const matched = profile.symptoms.filter((symptom) => selected.has(symptom.id));
      if (!matched.length) {
        return null;
      }

      const coverage = matched.length / Math.max(profile.symptoms.length, 1);
      const support = matched.reduce((sum, symptom) => sum + symptom.count, 0);
      const confidence = clamp(Math.round(coverage * 70 + Math.min(25, support / 2)), 35, 99);

      return {
        condition: profile.condition,
        confidence,
        matchedSymptoms: matched.slice(0, 4).map((symptom) => symptom.label)
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);

  const fallback = predictFallbackConditions(selectedSymptomIds, context);
  if (!dataDriven.length) {
    return fallback;
  }

  const merged = [...dataDriven];
  for (const candidate of fallback) {
    if (merged.some((item) => normalizeLabel(item.condition) === normalizeLabel(candidate.condition))) {
      continue;
    }
    merged.push(candidate);
    if (merged.length >= 3) {
      break;
    }
  }
  return merged.slice(0, 3);
}

function predictFallbackConditions(selectedSymptomIds, context = {}) {
  const selected = new Set(selectedSymptomIds);
  const symptomMap = new Map(symptomCatalog.map((symptom) => [symptom.id, symptom]));

  const ranked = FALLBACK_CONDITION_PROFILES.map((profile) => {
    const matchedIds = profile.symptomIds.filter((id) => selected.has(id));
    const weightedSupport = matchedIds.reduce(
      (sum, id) => sum + (symptomMap.get(id)?.weight || 4),
      0
    );
    const severityBoost = context.severity >= 7 ? 6 : context.severity >= 4 ? 3 : 0;
    const durationBoost = context.duration === "over-a-week" ? 4 : context.duration === "hours" ? 3 : 0;
    const confidence = clamp(38 + matchedIds.length * 10 + weightedSupport * 0.6 + severityBoost + durationBoost, 35, 88);
    return {
      condition: profile.condition,
      confidence: Math.round(confidence),
      matchedSymptoms: matchedIds.map((id) => symptomMap.get(id)?.label).filter(Boolean),
      matchedCount: matchedIds.length
    };
  })
    .sort((a, b) => b.matchedCount - a.matchedCount || b.confidence - a.confidence)
    .slice(0, 3)
    .map((item) => ({
      condition: item.condition,
      confidence: item.confidence,
      matchedSymptoms: item.matchedSymptoms.length ? item.matchedSymptoms.slice(0, 4) : ["General symptom pattern"]
    }));

  if (ranked.length >= 3) {
    return ranked;
  }

  const defaults = [
    "General viral illness pattern",
    "Possible inflammatory condition",
    "Needs in-person clinical evaluation"
  ];
  for (const name of defaults) {
    if (ranked.some((item) => normalizeLabel(item.condition) === normalizeLabel(name))) {
      continue;
    }
    ranked.push({
      condition: name,
      confidence: 40,
      matchedSymptoms: ["General symptom pattern"]
    });
    if (ranked.length >= 3) {
      break;
    }
  }
  return ranked.slice(0, 3);
}

function getUrgencyBand(score) {
  if (score >= 80) {
    return { label: t("urgencyEmergency"), level: "er" };
  }
  if (score >= 60) {
    return { label: t("urgencyUrgent"), level: "urgent-care" };
  }
  if (score >= 30) {
    return { label: t("urgencyModerate"), level: "clinic" };
  }
  return { label: t("urgencyLow"), level: "self-care" };
}

async function lookupClinicsByZip(zipCode, recommendedLevel) {
  const location = await geocodeZip(zipCode);
  if (!location) {
    return {
      clinics: [],
      source: "none",
      location: null,
      reason: `Could not resolve ZIP ${zipCode}.`
    };
  }

  const clinics = await fetchNearbyClinics(location.lat, location.lon, recommendedLevel);
  const maxDistanceMiles = recommendedLevel === "er" ? 25 : 15;
  const localClinics = clinics.filter((clinic) => clinic.distanceMiles <= maxDistanceMiles);
  const rankedClinics = localClinics.length ? localClinics : clinics.slice(0, 6);
  return {
    clinics: rankedClinics,
    source: rankedClinics.length ? "osm-live" : "none",
    location,
    reason: rankedClinics.length ? "" : "No nearby clinics were returned for this ZIP."
  };
}

async function geocodeZip(zipCode) {
  const zip = String(zipCode || "").trim();
  if (!/^\d{5}$/.test(zip)) {
    return null;
  }

  try {
    const zippopotamResponse = await fetch(`https://api.zippopotam.us/us/${encodeURIComponent(zip)}`);
    if (zippopotamResponse.ok) {
      const zippopotamPayload = await zippopotamResponse.json();
      const place = Array.isArray(zippopotamPayload?.places) ? zippopotamPayload.places[0] : null;
      const lat = Number(place?.latitude);
      const lon = Number(place?.longitude);
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        return {
          lat,
          lon,
          label: `${place["place name"] || zip}, ${place.state || "US"}`
        };
      }
    }
  } catch (_error) {
    // no-op
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=us&postalcode=${encodeURIComponent(zip)}&limit=3&addressdetails=1`
    );
    if (response.ok) {
      const data = await response.json();
      const candidates = Array.isArray(data) ? data : [];
      const exact = candidates.find((item) => {
        const postcode = String(item?.address?.postcode || "")
          .replace(/\D/g, "")
          .slice(0, 5);
        const country = String(item?.address?.country_code || "").toLowerCase();
        return postcode === zip && country === "us";
      });
      const match = exact || candidates[0];
      const lat = Number(match?.lat);
      const lon = Number(match?.lon);
      if (Number.isFinite(lat) && Number.isFinite(lon)) {
        return {
          lat,
          lon,
          label: match?.display_name || `${zip}, US`
        };
      }
    }
  } catch (_error) {
    // no-op
  }

  return null;
}

async function fetchNearbyClinics(lat, lon, recommendedLevel) {
  const baseRadius = recommendedLevel === "er" ? 30000 : 18000;
  const radii = [baseRadius, 45000, 80000];
  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://lz4.overpass-api.de/api/interpreter"
  ];

  for (const radiusMeters of radii) {
    const overpassQuery = `[out:json][timeout:25];
(
  node["amenity"~"hospital|clinic|doctors"](around:${radiusMeters},${lat},${lon});
  way["amenity"~"hospital|clinic|doctors"](around:${radiusMeters},${lat},${lon});
  relation["amenity"~"hospital|clinic|doctors"](around:${radiusMeters},${lat},${lon});
  node["healthcare"~"hospital|clinic|doctor|centre"](around:${radiusMeters},${lat},${lon});
  way["healthcare"~"hospital|clinic|doctor|centre"](around:${radiusMeters},${lat},${lon});
  relation["healthcare"~"hospital|clinic|doctor|centre"](around:${radiusMeters},${lat},${lon});
);
out center tags 120;`;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
          body: `data=${encodeURIComponent(overpassQuery)}`
        });

        if (!response.ok) {
          continue;
        }

        const payload = await response.json();
        const elements = Array.isArray(payload.elements) ? payload.elements : [];
        const deduped = new Map();

        for (const element of elements) {
          const tags = element.tags || {};
          const itemLat = Number(element.lat ?? element.center?.lat);
          const itemLon = Number(element.lon ?? element.center?.lon);
          if (!Number.isFinite(itemLat) || !Number.isFinite(itemLon)) {
            continue;
          }

          const name = (tags.name || "").trim() || deriveFacilityName(tags);
          const key = `${name.toLowerCase()}|${itemLat.toFixed(4)}|${itemLon.toFixed(4)}`;
          if (deduped.has(key)) {
            continue;
          }

          const clinic = mapOsmElementToClinic({
            name,
            tags,
            lat: itemLat,
            lon: itemLon,
            referenceLat: lat,
            referenceLon: lon
          });
          deduped.set(key, clinic);
        }

        const results = Array.from(deduped.values()).sort((a, b) => a.distanceMiles - b.distanceMiles);
        if (results.length) {
          return results;
        }
      } catch (_error) {
        // try next mirror
      }
    }
  }
  return [];
}

function mapOsmElementToClinic({ name, tags, lat, lon, referenceLat, referenceLon }) {
  const amenity = normalizeLabel(tags.amenity || tags.healthcare || "");
  const fullText = `${name} ${tags.operator || ""} ${tags.brand || ""}`.toLowerCase();
  const type = deriveFacilityType(amenity, fullText);
  const careLevel = deriveCareLevel(type);
  const distanceMiles = haversineMiles(referenceLat, referenceLon, lat, lon);

  const isCommunity =
    fullText.includes("community") ||
    fullText.includes("public health") ||
    fullText.includes("county") ||
    fullText.includes("fqhc");

  let costLevel = "higher";
  if (fullText.includes("free clinic")) {
    costLevel = "free";
  } else if (isCommunity || type === "Clinic") {
    costLevel = "sliding-scale";
  }

  let accessType = "appointment";
  if (type === "Emergency Room") {
    accessType = "walk-in";
  } else if (type === "Urgent Care") {
    accessType = "both";
  } else if (type === "Clinic") {
    accessType = "both";
  }

  return {
    name,
    type,
    costLevel,
    accessType,
    scheduling:
      accessType === "walk-in"
        ? "Walk-in accepted"
        : accessType === "both"
        ? "Walk-in or appointment"
        : "Appointment recommended",
    waitMinutes: estimateWaitByType(type),
    distanceMiles: Number(distanceMiles.toFixed(1)),
    careLevel,
    accepts: ["none", "medicaid", "private"],
    transitFriendly: true,
    lat,
    lon
  };
}

function deriveFacilityType(amenity, fullText) {
  if (amenity.includes("hospital")) {
    return "Emergency Room";
  }
  if (fullText.includes("urgent care")) {
    return "Urgent Care";
  }
  if (amenity.includes("doctor") || amenity.includes("clinic") || amenity.includes("centre")) {
    return "Clinic";
  }
  return "Clinic";
}

function deriveCareLevel(type) {
  if (type === "Emergency Room") {
    return "er";
  }
  if (type === "Urgent Care") {
    return "urgent-care";
  }
  return "clinic";
}

function estimateWaitByType(type) {
  if (type === "Emergency Room") {
    return 35;
  }
  if (type === "Urgent Care") {
    return 45;
  }
  return 70;
}

function deriveFacilityName(tags) {
  const type = normalizeLabel(tags.amenity || tags.healthcare || "");
  if (type.includes("hospital")) {
    return "Nearby Hospital";
  }
  if (type.includes("doctor")) {
    return "Nearby Medical Office";
  }
  return "Nearby Clinic";
}

function haversineMiles(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadiusMiles = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * earthRadiusMiles * Math.asin(Math.sqrt(a));
}

function rankCareOptions(recommendedLevel, input, clinicCandidates) {
  const incomeCostWeight = {
    "very-low": 25,
    low: 18,
    moderate: 10,
    higher: 4
  };

  const sourceClinics = Array.isArray(clinicCandidates) ? clinicCandidates : [];
  if (!sourceClinics.length) {
    return [];
  }

  return sourceClinics
    .map((clinic) => {
      let score = 100;

      if (recommendedLevel !== "self-care") {
        if (clinic.careLevel === recommendedLevel) {
          score += 25;
        } else if (recommendedLevel === "urgent-care" && clinic.careLevel === "er") {
          score += 10;
        } else if (recommendedLevel === "er" && clinic.careLevel !== "er") {
          score -= 25;
        } else {
          score -= 8;
        }
      }

      if (recommendedLevel === "urgent-care" || recommendedLevel === "er") {
        if (clinic.accessType === "walk-in") {
          score += 8;
        } else if (clinic.accessType === "both") {
          score += 5;
        } else if (clinic.accessType === "appointment") {
          score -= 6;
        }
      }

      if (
        (input.incomeBracket === "very-low" || input.incomeBracket === "low") &&
        clinic.costLevel === "free"
      ) {
        score += incomeCostWeight[input.incomeBracket];
      } else if (clinic.costLevel === "sliding-scale") {
        score += 12;
      } else if (clinic.costLevel === "higher") {
        score -= 12;
      }

      score -= clinic.waitMinutes / 10;
      score -= clinic.distanceMiles * 1.5;

      if (!clinic.accepts.includes(input.insuranceStatus)) {
        score -= 30;
      }

      if (input.transportAccess !== "yes" && !clinic.transitFriendly) {
        score -= 15;
      }

      return { ...clinic, rankingScore: Number(score.toFixed(1)) };
    })
    .sort((a, b) => b.rankingScore - a.rankingScore);
}

async function renderResults(triage, options, formData, clinicLookup) {
  triageScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");
  doctorBriefOutput.classList.add("hidden");
  doctorBriefOutput.innerHTML = "";

  const localizedReasons = await localizeTextList(triage.reasons);
  const localizedConfidenceFactors = await localizeTextList(triage.confidenceFactors);
  const localizedDangerFlags = await Promise.all(
    triage.dangerFlags.map(async (flag) => ({
      name: await localizeRuntimeText(flag.name),
      reason: await localizeRuntimeText(flag.reason)
    }))
  );
  const localizedConditions = await Promise.all(
    triage.predictedConditions.map(async (item) => ({
      ...item,
      condition: await localizeRuntimeText(item.condition),
      matchedSymptoms: await localizeTextList(item.matchedSymptoms)
    }))
  );
  const localizedOptions = await Promise.all(
    options.map(async (option) => ({
      ...option,
      localizedType: localizeClinicType(option.type),
      localizedCostLevel: localizeCostLevel(option.costLevel)
    }))
  );

  latestDoctorBriefContext = {
    triage,
    formData,
    bestOption: localizedOptions[0] || null
  };

  const badgeClass =
    triage.score >= 80
      ? "badge badge-danger"
      : triage.score >= 30
      ? "badge badge-warning"
      : "badge badge-safe";

  resultSummary.innerHTML = `
    <div class="result-card">
      <h3>${t("resultsUrgencyScore")}: ${triage.score}/100</h3>
      <p><span class="${badgeClass}">${triage.urgencyLabel}</span></p>
      <p><strong>${t("resultsConfidence")}:</strong> ${triage.confidence}%</p>
      <p><strong>${t("resultsConfidenceFactors")}:</strong></p>
      <ul>${localizedConfidenceFactors.map((factor) => `<li>${factor}</li>`).join("")}</ul>
      <p><strong>${t("resultsWhy")}:</strong></p>
      <ul>${localizedReasons.map((reason) => `<li>${reason}</li>`).join("")}</ul>
      ${
        triage.noteInsights.hasNotes
          ? `<p><strong>${t("notesConsidered")}:</strong> ${escapeHtml(triage.noteInsights.originalText.slice(0, 220))}</p>`
          : ""
      }
    </div>
  `;

  conditionInsights.innerHTML = `
    <div class="result-card">
      <h3>${t("possibleConditions")}</h3>
      ${
        localizedConditions.length
          ? `<ul>
              ${localizedConditions
                .map(
                  (item) =>
                    `<li><strong>${item.condition}</strong> (${item.confidence}% ${t("conditionMatchWord")}) - ${t("resultsWhy").toLowerCase()}: ${item.matchedSymptoms.join(", ")}</li>`
                )
                .join("")}
            </ul>`
          : `<p>${t("noConditionOverlap")}</p>`
      }
    </div>
  `;

  dangerFlags.innerHTML = `
    <div class="result-card">
      <h3>${t("hiddenDangerAlerts")}</h3>
      ${
        localizedDangerFlags.length
          ? `<ul>
              ${localizedDangerFlags
                .map((flag) => `<li><strong>${flag.name}:</strong> ${flag.reason}</li>`)
                .join("")}
            </ul>`
          : `<p>${t("noCriticalCombo")}</p>`
      }
    </div>
  `;

  if (!options.length) {
    const zipMap = buildZipMapUrls(formData.zipCode, clinicLookup?.location);
    topOption.innerHTML = `
      <div class="result-card">
        <h3>${t("liveLookupMissingTitle")}</h3>
        <p>${t("liveLookupMissingBody", { zip: formData.zipCode })}</p>
        <h4>${t("mapForZipTitle", { zip: formData.zipCode })}</h4>
        ${
          zipMap.embedUrl
            ? `<iframe
                title="${escapeHtml(t("mapSectionTitle"))}"
                src="${zipMap.embedUrl}"
                width="100%"
                height="220"
                style="border:0; border-radius: 12px;"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>`
            : `<p>${t("mapUnavailable")}</p>`
        }
        <p>
          <a href="${zipMap.openUrl}" target="_blank" rel="noopener noreferrer">${t("mapOpenInGoogle")}</a>
        </p>
      </div>
    `;

    backupOptions.innerHTML = `
      <div class="result-card">
        <h3>${t("backupOptions")}</h3>
        <p>${t("liveLookupMissingBackup")}</p>
      </div>
    `;
    return;
  }

  const [best, ...rest] = localizedOptions;
  const bestMap = buildClinicMapUrls(best, formData.zipCode);
  const zipMap = buildZipMapUrls(formData.zipCode, clinicLookup?.location);
  topOption.innerHTML = `
    <div class="result-card">
      <h3>${t("bestOptionNow")}</h3>
      <p><strong>${best.name}</strong> (${best.localizedType})</p>
      <p>
        ${t("chosenForArea", {
          zip: formData.zipCode,
          wait: best.waitMinutes,
          distance: best.distanceMiles
        })}
      </p>
      <p><strong>${t("costModel")}:</strong> ${best.localizedCostLevel} | <strong>${t("rankingScore")}:</strong> ${best.rankingScore}</p>
      <h4>${t("mapForZipTitle", { zip: formData.zipCode })}</h4>
      ${
        zipMap.embedUrl
          ? `<iframe
              title="${escapeHtml(t("mapSectionTitle"))}"
              src="${zipMap.embedUrl}"
              width="100%"
              height="220"
              style="border:0; border-radius: 12px;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>`
          : `<p>${t("mapUnavailable")}</p>`
      }
      <p>
        <a href="${zipMap.openUrl}" target="_blank" rel="noopener noreferrer">${t("mapOpenInGoogle")}</a>
        ${
          bestMap.directionsUrl
            ? ` | <a href="${bestMap.directionsUrl}" target="_blank" rel="noopener noreferrer">${t("mapGetDirections")}</a>`
            : ""
        }
      </p>
      <p class="emergency-note">${t("emergencyNote")}</p>
    </div>
  `;

  backupOptions.innerHTML = `
    <div class="result-card">
      <h3>${t("backupOptions")}</h3>
      <ul>
        ${rest
          .slice(0, 2)
          .map(
            (option) =>
              `<li>${t("backupOptionLine", {
                name: option.name,
                type: option.localizedType,
                wait: option.waitMinutes,
                score: option.rankingScore
              })} - <a href="${buildClinicMapUrls(option, formData.zipCode).openUrl}" target="_blank" rel="noopener noreferrer">${t("mapOpenInGoogle")}</a></li>`
          )
          .join("")}
      </ul>
    </div>
  `;
}

function applyTranslations() {
  document.title = t("docTitle");
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  };

  setText("hero-kicker", t("heroKicker"));
  setText("hero-title", BRAND_NAME);
  setText("hero-subtitle", t("heroSubtitle"));
  setText("language-title", t("languageTitle"));
  setText("language-subtitle", t("languageSubtitle"));
  setText("language-input-label", t("languageInputLabel"));
  setText("language-continue-btn", t("languageContinue"));
  renderLanguageOptions();

  setText("consent-title", t("consentTitle"));
  setText("consent-subtitle", t("consentSubtitle"));
  setText("consent-body-1", t("consentBody1"));
  setText("consent-body-2", t("consentBody2"));
  setText("hotline-emergency", t("hotlineEmergency"));
  setText("hotline-suicide", t("hotlineSuicide"));
  setText("consent-checkbox-text", t("consentCheckbox"));
  setText("consent-continue-btn-text", t("consentContinue"));

  setText("triage-title", t("triageTitle"));
  setText("triage-subtitle", t("triageSubtitle"));
  setText("label-age", t("labelAge"));
  setText("label-sex", t("labelSex"));
  setText("label-zip", t("labelZip"));
  setText("label-income", t("labelIncome"));
  setText("label-insurance", t("labelInsurance"));
  setText("label-transport", t("labelTransport"));
  setText("label-duration", t("labelDuration"));
  setText("label-severity", t("labelSeverity"));
  setText("legend-symptoms", t("legendSymptoms"));
  setText("label-notes", t("labelNotes"));
  setText("analyze-btn", t("analyze"));
  setText("results-title", t("resultsTitle"));
  setText("results-subtitle", t("resultsSubtitle"));
  setText("doctor-brief-btn", t("doctorBriefButton"));
  setText("start-over-btn", t("startOver"));

  setText("option-select-sex", t("select"));
  setText("option-female", t("female"));
  setText("option-male", t("male"));
  setText("option-intersex", t("intersex"));
  setText("option-select-income", t("select"));
  setText("option-income-very-low", t("incomeVeryLow"));
  setText("option-income-low", t("incomeLow"));
  setText("option-income-moderate", t("incomeModerate"));
  setText("option-income-higher", t("incomeHigher"));
  setText("option-select-insurance", t("select"));
  setText("option-insurance-none", t("uninsured"));
  setText("option-insurance-medicaid", t("medicaid"));
  setText("option-insurance-private", t("privateInsurance"));
  setText("option-select-transport", t("select"));
  setText("option-transport-yes", t("yes"));
  setText("option-transport-limited", t("limited"));
  setText("option-transport-no", t("no"));
  setText("option-select-duration", t("select"));
  setText("option-duration-hours", t("durationHours"));
  setText("option-duration-1-3", t("duration1to3"));
  setText("option-duration-4-7", t("duration4to7"));
  setText("option-duration-week", t("durationWeek"));

  const notesInput = document.getElementById("symptomNotes");
  if (notesInput) {
    notesInput.placeholder = t("notesPlaceholder");
  }
}

function renderLanguageOptions() {
  languageInput.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = t("languageOptionPlaceholder");
  languageInput.appendChild(placeholder);

  for (const language of TOP_US_LANGUAGES) {
    const option = document.createElement("option");
    option.value = language.code;
    option.textContent = language.label;
    languageInput.appendChild(option);
  }

  languageInput.value = selectedLanguageCode || "";
}

function t(key, variables = {}) {
  const staticPack = TRANSLATIONS[currentLanguage] || {};
  const dynamicPack = dynamicLanguagePacks[currentLanguage] || {};
  const current = { ...dynamicPack, ...staticPack };
  let value = current[key] || TRANSLATIONS.en[key] || key;
  for (const [varKey, varValue] of Object.entries(variables)) {
    value = value.replaceAll(`{${varKey}}`, String(varValue));
  }
  return value;
}

function getSymptomLabel(symptom) {
  if (currentLanguage === "en") {
    return symptom.label;
  }
  const translated = dynamicSymptomPacks[currentLanguage]?.[symptom.id];
  return translated || symptom.label;
}

async function ensureLanguageResources(langCode) {
  if (langCode === "en" || langCode === "de") {
    return;
  }

  dynamicLanguagePacks[langCode] = await buildDynamicLanguagePack(
    langCode,
    dynamicLanguagePacks[langCode] || {}
  );

  dynamicSymptomPacks[langCode] = await buildDynamicSymptomPack(
    langCode,
    dynamicSymptomPacks[langCode] || {}
  );
}

function shouldTranslateLanguageKey(langCode, key, staticPack, dynamicPack) {
  if (NON_TRANSLATABLE_TRANSLATION_KEYS.has(key)) {
    return false;
  }
  if (key in staticPack) {
    return false;
  }
  const englishValue = TRANSLATIONS.en[key];
  if (!englishValue) {
    return false;
  }
  const currentValue = dynamicPack[key];
  if (!currentValue) {
    return true;
  }
  if (langCode !== "en" && String(currentValue).trim() === String(englishValue).trim()) {
    return true;
  }
  return false;
}

async function buildDynamicLanguagePack(langCode, existingPack = {}) {
  const englishPack = TRANSLATIONS.en;
  const staticPack = TRANSLATIONS[langCode] || {};
  const keysToTranslate = Object.keys(englishPack).filter((key) =>
    shouldTranslateLanguageKey(langCode, key, staticPack, existingPack)
  );
  if (!keysToTranslate.length) {
    return existingPack;
  }
  const translatedEntries = await mapWithConcurrency(keysToTranslate, 6, async (key) => {
    const translated = await translateText(englishPack[key], langCode);
    return [key, translated || englishPack[key]];
  });
  return {
    ...existingPack,
    ...Object.fromEntries(translatedEntries)
  };
}

async function buildDynamicSymptomPack(langCode, existingPack = {}) {
  const symptomsToTranslate = CURATED_SYMPTOM_CATALOG.filter((symptom) => {
    const current = existingPack[symptom.id];
    return !current || String(current).trim() === String(symptom.label).trim();
  });
  if (!symptomsToTranslate.length) {
    return existingPack;
  }
  const translatedEntries = await mapWithConcurrency(
    symptomsToTranslate,
    6,
    async (symptom) => {
      const translated = await translateText(symptom.label, langCode, {
        strictQuality: true
      });
      return [symptom.id, translated || symptom.label];
    }
  );
  return {
    ...existingPack,
    ...Object.fromEntries(translatedEntries)
  };
}

async function translateText(text, targetLang, options = {}) {
  if (!text || !targetLang || targetLang === "en") {
    return text;
  }
  const { strictQuality = false } = options;
  const placeholders = [];
  let safeText = text.replace(/\{[^}]+\}/g, (match) => {
    const token = `__PH_${placeholders.length}__`;
    placeholders.push([token, match]);
    return token;
  });

  try {
    const googleEndpoint = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${encodeURIComponent(
      targetLang
    )}&dt=t&q=${encodeURIComponent(safeText)}`;
    const googleResponse = await fetch(googleEndpoint);
    if (googleResponse.ok) {
      const googlePayload = await googleResponse.json();
      const segments = Array.isArray(googlePayload?.[0]) ? googlePayload[0] : [];
      let translated = segments
        .map((segment) => (Array.isArray(segment) ? segment[0] : ""))
        .join("")
        .trim();
      if (!isBadTranslation(translated, text, strictQuality)) {
        for (const [token, original] of placeholders) {
          translated = translated.replaceAll(token, original);
        }
        return translated;
      }
    }

    const memoryEndpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      safeText
    )}&langpair=en|${encodeURIComponent(targetLang)}`;
    const response = await fetch(memoryEndpoint);
    if (!response.ok) {
      return text;
    }
    const payload = await response.json();
    let translated = payload?.responseData?.translatedText || text;
    if (isBadTranslation(translated, text, strictQuality)) {
      return text;
    }
    for (const [token, original] of placeholders) {
      translated = translated.replaceAll(token, original);
    }
    return translated;
  } catch (_error) {
    return text;
  }
}

function isBadTranslation(translated, original, strictQuality) {
  const out = String(translated || "").trim();
  const src = String(original || "").trim();
  if (!out) {
    return true;
  }
  const lower = out.toLowerCase();
  if (
    lower.includes("mymemory") ||
    lower.includes("machine translation") ||
    lower.includes("translated by") ||
    lower.includes("warning")
  ) {
    return true;
  }
  const symbolRatio =
    out.replace(/[A-Za-z0-9\u00C0-\u024F\u0370-\u1FFF\u2E80-\u9FFF\s]/g, "").length /
    Math.max(out.length, 1);
  if (symbolRatio > 0.35) {
    return true;
  }
  if (strictQuality && out.length < 2) {
    return true;
  }
  if (strictQuality && src.length >= 8 && out.length > src.length * 4) {
    return true;
  }
  return false;
}

async function localizeRuntimeText(text) {
  if (currentLanguage === "en") {
    return text;
  }
  const cacheKey = `${currentLanguage}::${text}`;
  if (runtimeTranslationCache.has(cacheKey)) {
    return runtimeTranslationCache.get(cacheKey);
  }
  const translated = await translateText(text, currentLanguage, { strictQuality: true });
  runtimeTranslationCache.set(cacheKey, translated);
  return translated;
}

async function localizeTextList(items) {
  return Promise.all(items.map((item) => localizeRuntimeText(item)));
}

function localizeClinicType(type) {
  if (type === "Emergency Room") {
    return t("clinicTypeEmergencyRoom");
  }
  if (type === "Urgent Care") {
    return t("clinicTypeUrgentCare");
  }
  return t("clinicTypeClinic");
}

function localizeCostLevel(costLevel) {
  if (costLevel === "free") {
    return t("costLevelFree");
  }
  if (costLevel === "sliding-scale") {
    return t("costLevelSlidingScale");
  }
  return t("costLevelHigher");
}

function buildClinicMapUrls(clinic, zipCode) {
  const hasCoords = Number.isFinite(clinic?.lat) && Number.isFinite(clinic?.lon);
  const query = `${clinic?.name || "Clinic"} ${zipCode || ""}`.trim();
  const encodedQuery = encodeURIComponent(query);
  const openUrl = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lon}`
    : `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
  const directionsUrl = hasCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lon}`
    : "";
  const embedUrl = hasCoords
    ? `https://www.google.com/maps?q=${clinic.lat},${clinic.lon}&z=13&output=embed`
    : "";
  return { openUrl, directionsUrl, embedUrl };
}

function buildZipMapUrls(zipCode, location = null) {
  const cleanZip = String(zipCode || "").trim();
  const hasCoords = Number.isFinite(location?.lat) && Number.isFinite(location?.lon);
  if (hasCoords) {
    return {
      openUrl: `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lon}`,
      embedUrl: `https://www.google.com/maps?q=${location.lat},${location.lon}&z=12&output=embed`,
      directionsUrl: ""
    };
  }
  if (!cleanZip) {
    return { openUrl: "https://www.google.com/maps", embedUrl: "", directionsUrl: "" };
  }
  const query = encodeURIComponent(`${cleanZip}, US`);
  return {
    openUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
    embedUrl: `https://www.google.com/maps?q=${query}&z=12&output=embed`,
    directionsUrl: ""
  };
}

function renderDoctorBrief() {
  if (!latestDoctorBriefContext) {
    return;
  }

  const { formData } = latestDoctorBriefContext;
  const symptomMap = new Map(symptomCatalog.map((symptom) => [symptom.id, symptom]));
  const selectedSymptoms = formData.symptoms
    .map((id) => symptomMap.get(id))
    .filter(Boolean)
    .slice(0, 5)
    .map((symptom) => toConversationalSymptom(getSymptomLabel(symptom)));
  const symptomsText = selectedSymptoms.length ? formatNaturalList(selectedSymptoms) : t("doctorBriefNoSymptoms");
  const durationText = getDurationLabel(formData.duration);
  const severityWord = getSeverityWord(formData.severity);
  const notesText = formData.symptomNotes ? formData.symptomNotes.slice(0, 260) : "";
  const hasDuration = Boolean(formData.duration);
  const scriptSentence = hasDuration
    ? t("doctorBriefScriptWithDuration", {
        age: formData.age,
        symptoms: escapeHtml(symptomsText),
        duration: escapeHtml(durationText || t("doctorBriefDurationUnknown")),
        severityWord
      })
    : t("doctorBriefScriptNoDuration", {
        age: formData.age,
        symptoms: escapeHtml(symptomsText),
        severityWord
      });

  doctorBriefOutput.innerHTML = `
    <div class="result-card">
      <h3>${t("doctorBriefTitle")}</h3>
      <p>${t("doctorBriefIntro")}</p>
      <p><strong>${scriptSentence}</strong></p>
      ${
        notesText
          ? `<p>${t("doctorBriefNotesLine", { notes: escapeHtml(notesText) })}</p>`
          : ""
      }
    </div>
  `;
  doctorBriefOutput.classList.remove("hidden");
}

function getDurationLabel(durationValue) {
  if (durationValue === "hours") {
    return t("durationHours");
  }
  if (durationValue === "1-3-days") {
    return t("duration1to3");
  }
  if (durationValue === "4-7-days") {
    return t("duration4to7");
  }
  if (durationValue === "over-a-week") {
    return t("durationWeek");
  }
  return durationValue || t("select");
}

function getSeverityWord(severity) {
  if (severity >= 9) {
    return t("severityVerySevere");
  }
  if (severity >= 7) {
    return t("severitySevere");
  }
  if (severity >= 4) {
    return t("severityModerate");
  }
  return t("severityMild");
}

function formatNaturalList(items) {
  const clean = items.filter(Boolean);
  if (!clean.length) {
    return "";
  }
  if (clean.length === 1) {
    return clean[0];
  }
  if (clean.length === 2) {
    return `${clean[0]} ${t("andWord")} ${clean[1]}`;
  }
  return `${clean.slice(0, -1).join(", ")}, ${t("andWord")} ${clean[clean.length - 1]}`;
}

function toConversationalSymptom(label) {
  const value = String(label || "").trim();
  if (!value) {
    return value;
  }
  if (currentLanguage !== "en") {
    return value;
  }
  const lowered = value.toLowerCase();
  if (!/^[a-z]/.test(lowered)) {
    return lowered;
  }
  return lowered.charAt(0).toLowerCase() + lowered.slice(1);
}

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function runWorker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () =>
    runWorker()
  );
  await Promise.all(workers);
  return results;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function normalizeLabel(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanSymptomValue(value) {
  const normalized = normalizeLabel(value);
  if (!normalized || normalized === "nan" || normalized === "none") {
    return "";
  }
  return normalized;
}

function slugify(value) {
  return normalizeLabel(value).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function toTitleCase(value) {
  return normalizeLabel(value)
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function computeConfidenceScore({
  selectedSymptomCount,
  predictedConditions,
  noteSignalCount,
  dangerSignalCount,
  severity
}) {
  const topCondition = predictedConditions[0] || null;
  const secondCondition = predictedConditions[1] || null;
  const topMatch = topCondition ? topCondition.confidence : 0;
  const secondMatch = secondCondition ? secondCondition.confidence : 0;

  const baseScore = 25;
  const symptomEvidence = clamp(selectedSymptomCount * 4, 0, 35);
  const topConditionSupport = clamp(Math.round(topMatch * 0.22), 0, 22);
  const topVsSecondGap = clamp(Math.round((topMatch - secondMatch) * 0.8), 0, 20);
  const noteSupport = clamp(noteSignalCount * 4, 0, 10);
  const dangerSupport = clamp(dangerSignalCount * 5, 0, 15);
  const severitySupport = severity >= 7 ? 5 : severity >= 4 ? 2 : 0;

  let score =
    baseScore +
    symptomEvidence +
    topConditionSupport +
    topVsSecondGap +
    noteSupport +
    dangerSupport +
    severitySupport;

  let cap = 99;
  let capReasonKey = "";
  if (selectedSymptomCount < 2) {
    cap = 55;
    capReasonKey = "confidenceCapFew2";
  } else if (!predictedConditions.length) {
    cap = 70;
    capReasonKey = "confidenceCapNoStrong";
  } else if (selectedSymptomCount < 3) {
    cap = 75;
    capReasonKey = "confidenceCapFew3";
  }

  score = clamp(Math.min(score, cap), 20, 99);

  const factors = [
    t("confidenceBase", { value: baseScore }),
    t("confidenceSymptomEvidence", { count: selectedSymptomCount, value: symptomEvidence }),
    t("confidenceTopConditionSupport", { value: topConditionSupport }),
    t("confidenceTopGap", { value: topVsSecondGap }),
    t("confidenceNotesEvidence", { value: noteSupport }),
    t("confidenceDangerSupport", { value: dangerSupport }),
    t("confidenceSeverity", { value: severitySupport })
  ];

  if (capReasonKey) {
    factors.push(t(capReasonKey));
  }

  return { score, factors };
}

function analyzeSymptomNotes(noteText) {
  const originalText = (noteText || "").trim();
  if (!originalText) {
    return { hasNotes: false, originalText: "", signals: [] };
  }

  const signals = NOTE_KEYWORD_RULES.filter((rule) => rule.pattern.test(originalText));
  return { hasNotes: true, originalText, signals };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
