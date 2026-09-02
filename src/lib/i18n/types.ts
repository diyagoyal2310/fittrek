export interface Dictionary {
  common: {
    save: string;
    saving: string;
    signOut: string;
  };
  nav: {
    appName: string;
    dashboard: string;
    workouts: string;
    nutrition: string;
    analytics: string;
    learn: string;
  };
  dashboard: {
    title: string;
    readiness: string;
    bands: {
      low: { label: string; hint: string };
      moderate: { label: string; hint: string };
      high: { label: string; hint: string };
    };
    activeCalories: string;
    restingHeartRate: string;
    sleepScore: string;
    hrv: string;
    manualLog: {
      title: string;
      description: string;
      activeCalories: string;
      restingHeartRate: string;
      sleepScore: string;
      hrv: string;
    };
  };
  workouts: {
    title: string;
    startSession: { title: string; nameLabel: string; namePlaceholder: string; start: string };
    noSessions: string;
    inProgress: string;
    completed: string;
    setsSuffix: string;
    detail: {
      readinessAtStart: string;
      suggestedVolume: string;
      perExercise: string;
      autoReduced: string;
      completeSession: string;
      loggedSets: string;
      noSets: string;
    };
    logger: {
      exercise: string;
      exercisePlaceholder: string;
      weight: string;
      reps: string;
      rpe: string;
      logSet: string;
      logging: string;
    };
  };
  nutrition: {
    title: string;
    targetMacros: string;
    intakeSoFar: string;
    loggedMeals: string;
    noMeals: string;
    unableToCompute: string;
    macros: { calories: string; protein: string; carbs: string; fat: string };
    form: {
      mealLabel: string;
      mealPlaceholder: string;
      calories: string;
      protein: string;
      carbs: string;
      fat: string;
      logMeal: string;
      saving: string;
    };
    scan: {
      button: string;
      dialogTitle: string;
      instructions: string;
      requestingCamera: string;
      cameraError: string;
      switchCamera: string;
      lookingUp: string;
      notFound: string;
      notFoundHint: string;
      found: string;
      per100g: string;
      grams: string;
      addToLog: string;
      adding: string;
      cancel: string;
      scanAnother: string;
    };
  };
  analytics: {
    title: string;
    recoveryTrend: string;
    volumeTrend: string;
    macroTrend: string;
    notEnoughData: string;
    series: { recovery: string; volume: string; protein: string; carbs: string; fat: string };
  };
  auth: {
    login: {
      title: string;
      email: string;
      password: string;
      signIn: string;
      signingIn: string;
      invalidCredentials: string;
      noAccount: string;
      register: string;
      or: string;
      continueWithGoogle: string;
      continueWithGithub: string;
    };
    register: {
      title: string;
      name: string;
      email: string;
      password: string;
      weight: string;
      height: string;
      age: string;
      sex: string;
      male: string;
      female: string;
      goal: string;
      goals: { cut: string; bulk: string; recomp: string; hypertrophy: string };
      createAccount: string;
      creating: string;
      haveAccount: string;
      signIn: string;
    };
  };
  learn: {
    title: string;
    subtitle: string;
    tabs: { nutrition: string; workouts: string };
    diagrams: {
      progressiveOverloadCaption: string;
      progressiveOverloadWeeks: string;
      macroSplitCaption: string;
      recoveryBandCaption: string;
      tdeeCaption: string;
      tdeeBmr: string;
      tdeeActive: string;
      tdeeTef: string;
      proteinDistributionCaption: string;
      carbCyclingCaption: string;
      trainingDay: string;
      restDay: string;
      hydrationCaption: string;
      rpeCaption: string;
      trainingSplitCaption: string;
      push: string;
      pull: string;
      legs: string;
      rest: string;
      overtrainingCaption: string;
    };
  };
}
