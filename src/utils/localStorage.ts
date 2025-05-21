
// Storage keys
const LIFETIME_COUNT_KEY = 'lifetimeCount';
const TODAY_COUNT_KEY = 'todayCount';
const LAST_COUNT_DATE_KEY = 'lastCountDate';
const THEME_KEY = 'theme';

// Save counts to localStorage
export const saveCounts = (lifetimeCount: number, todayCount: number): void => {
  localStorage.setItem(LIFETIME_COUNT_KEY, lifetimeCount.toString());
  localStorage.setItem(TODAY_COUNT_KEY, todayCount.toString());
  localStorage.setItem(LAST_COUNT_DATE_KEY, new Date().toDateString());
};

// Get counts from localStorage
export const getCounts = (): { lifetimeCount: number, todayCount: number } => {
  const savedLifetimeCount = localStorage.getItem(LIFETIME_COUNT_KEY);
  const savedTodayCount = localStorage.getItem(TODAY_COUNT_KEY);
  const savedLastDate = localStorage.getItem(LAST_COUNT_DATE_KEY);
  
  const today = new Date().toDateString();
  let todayCount = 0;
  
  if (savedTodayCount && savedLastDate === today) {
    todayCount = parseInt(savedTodayCount, 10) || 0;
  } else {
    localStorage.setItem(TODAY_COUNT_KEY, '0');
    localStorage.setItem(LAST_COUNT_DATE_KEY, today);
  }
  
  return {
    lifetimeCount: parseInt(savedLifetimeCount || '0', 10),
    todayCount: todayCount
  };
};

// Save theme preference
export const saveTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(THEME_KEY, theme);
};

// Get theme preference
export const getTheme = (): 'light' | 'dark' => {
  const theme = localStorage.getItem(THEME_KEY);
  return (theme === 'light') ? 'light' : 'dark';
};
