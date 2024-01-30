import { useCallback, useEffect, useState } from 'react';

type UseSimpleDarkMode = (isDark?: boolean) => {
  isDarkMode: boolean;
  handleDarkMode: (isDark?: boolean) => void;
};

// dark mode と light mode を切り替える
export const useDarkMode: UseSimpleDarkMode = (isInitialDark = true) => {
  const [isDarkMode, toggleTheme] = useState<boolean>(isInitialDark);

  const handleDarkMode = useCallback((isDark?: boolean) => {
    if (typeof isDark === 'undefined') {
      toggleTheme((state) => !state);

      return;
    }

    toggleTheme(isDark);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return { isDarkMode, handleDarkMode };
};
