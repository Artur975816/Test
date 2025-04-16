import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('steampunk-light');
  const [language, setLanguage] = useState('ru');

  // Загрузка сохраненных настроек
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('theme');
    const storedLanguage = localStorage.getItem('language');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedTheme) setTheme(storedTheme);
    if (storedLanguage) setLanguage(storedLanguage);
  }, []);

  // Применение темы ко всему документу
  useEffect(() => {
    document.documentElement.className = theme;
    document.documentElement.lang = language;
  }, [theme, language]);

  const login = (username) => {
    const userData = { name: username };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'steampunk-light' ? 'steampunk-dark' : 'steampunk-light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout,
      theme, toggleTheme,
      language, toggleLanguage
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);