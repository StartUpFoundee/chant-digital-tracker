
import { UserIdentity } from './identityGenerator';

// Storage keys
const USER_IDENTITY_KEY = 'mantra_user_identity';
const LIFETIME_COUNT_KEY = 'lifetimeCount';
const TODAY_COUNT_KEY = 'todayCount';
const LAST_COUNT_DATE_KEY = 'lastCountDate';
const THEME_KEY = 'theme';

// Save user identity to localStorage
export const saveUserIdentity = (identity: UserIdentity): void => {
  localStorage.setItem(USER_IDENTITY_KEY, JSON.stringify(identity));
};

// Get user identity from localStorage
export const getUserIdentity = (): UserIdentity | null => {
  const data = localStorage.getItem(USER_IDENTITY_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as UserIdentity;
  } catch (error) {
    console.error("Error parsing user identity", error);
    return null;
  }
};

// Clear user identity from localStorage
export const clearUserIdentity = (): void => {
  localStorage.removeItem(USER_IDENTITY_KEY);
};

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

// Merge data from another device
export const mergeImportedData = (importedData: {
  identity: UserIdentity,
  lifetimeCount: number
}): void => {
  // Get current data
  const currentIdentity = getUserIdentity();
  const { lifetimeCount } = getCounts();
  
  // If no current identity, just use the imported one
  if (!currentIdentity) {
    saveUserIdentity(importedData.identity);
    saveCounts(importedData.lifetimeCount, 0); // Reset today's count
    return;
  }
  
  // Keep the older identity as primary
  if (new Date(importedData.identity.creationDate) < new Date(currentIdentity.creationDate)) {
    saveUserIdentity(importedData.identity);
  }
  
  // Take the larger lifetime count
  const newLifetimeCount = Math.max(lifetimeCount, importedData.lifetimeCount);
  saveCounts(newLifetimeCount, 0); // Reset today's count after merge
};

// Export all user data as JSON
export const exportUserData = (): string => {
  const identity = getUserIdentity();
  const { lifetimeCount, todayCount } = getCounts();
  
  const exportData = {
    identity,
    lifetimeCount,
    todayCount,
    exportDate: new Date().toISOString()
  };
  
  return JSON.stringify(exportData);
};
