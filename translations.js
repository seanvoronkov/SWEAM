const translations = {
  en: {
    // Navigation
    home: 'Home',
    calculator: 'FINA Calculator',
    personalBests: 'Personal Bests',
    toggleTheme: 'Toggle theme',
    toggleLang: 'עברית',

    // Home page
    welcome: 'Welcome to Swimming Analytics',
    welcomeDesc: 'Your comprehensive swimming performance tracking solution',
    features: 'Features',
    finaCalc: 'FINA Points Calculator',
    finaCalcDesc: 'Calculate your FINA points based on your swimming times',
    pbTracker: 'Personal Best Tracker',
    pbTrackerDesc: 'Keep track of your swimming achievements and progress',

    // Calculator page
    calcTitle: 'FINA Points Calculator',
    calcDesc: 'Calculate your FINA points based on your swimming time',
    event: 'Event',
    course: 'Course',
    gender: 'Gender',
    time: 'Time',
    calculate: 'Calculate',
    points: 'Points',
    shortCourse: 'Short Course (25m)',
    longCourse: 'Long Course (50m)',
    male: 'Male',
    female: 'Female',

    // Personal Bests page
    pbTitle: 'Personal Bests',
    pbDesc: 'Track your swimming achievements',
    addRecord: 'Add New Record',
    date: 'Date',
    location: 'Location',
    save: 'Save',
    delete: 'Delete'
  },
  he: {
    // ניווט
    home: 'דף הבית',
    calculator: 'מחשבון FINA',
    personalBests: 'שיאים אישיים',
    toggleTheme: 'החלף מצב',
    toggleLang: 'English',

    // דף הבית
    welcome: 'ברוכים הבאים לניתוח שחייה',
    welcomeDesc: 'הפתרון המקיף שלך למעקב אחר ביצועי שחייה',
    features: 'תכונות',
    finaCalc: 'מחשבון נקודות FINA',
    finaCalcDesc: 'חשב את נקודות ה-FINA שלך על סמך זמני השחייה',
    pbTracker: 'מעקב שיאים אישיים',
    pbTrackerDesc: 'עקוב אחר ההישגים וההתקדמות שלך בשחייה',

    // דף המחשבון
    calcTitle: 'מחשבון נקודות FINA',
    calcDesc: 'חשב את נקודות ה-FINA שלך על סמך זמן השחייה',
    event: 'מקצה',
    course: 'בריכה',
    gender: 'מגדר',
    time: 'זמן',
    calculate: 'חשב',
    points: 'נקודות',
    shortCourse: 'בריכה קצרה (25מ)',
    longCourse: 'בריכה ארוכה (50מ)',
    male: 'זכר',
    female: 'נקבה',

    // דף שיאים אישיים
    pbTitle: 'שיאים אישיים',
    pbDesc: 'מעקב אחר הישגי השחייה שלך',
    addRecord: 'הוסף רשומה חדשה',
    date: 'תאריך',
    location: 'מיקום',
    save: 'שמור',
    delete: 'מחק'
  }
};

// Language direction settings
const languageDirection = {
  en: 'ltr',
  he: 'rtl'
};

// Export for use in other files
export { translations, languageDirection };