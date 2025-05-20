
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTheme, saveTheme } from '../utils/localStorage';

type ThemeContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark'); // Default to dark

  useEffect(() => {
    // Load saved theme from localStorage on initial render
    const savedTheme = getTheme();
    setTheme(savedTheme);
    
    // Apply the theme to document
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme => {
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      // Save to localStorage
      saveTheme(newTheme);
      // Update document class
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
