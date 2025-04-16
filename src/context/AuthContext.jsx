import { useEffect, useState, createContext } from 'react';

// Создаем контекст для авторизации
export const AuthContext = createContext();

const defaultUser = {
  id: 1,
  name: 'Dimash Kudaibergen',
  role: 'Project Manager',
  email: 'dimash.kudaibergen@example.kz',
  location: 'Astana, Kazakhstan',
  authenticated: false,
};

// Провайдер контекста
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(defaultUser);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  // Эффект для изменения темы
  useEffect(() => {
    document.body.className = theme; // Меняем класс на body для применения темы
  }, [theme]); // Эффект срабатывает при изменении темы

  const login = () => {
    setUser(prev => ({ ...prev, authenticated: true }));
  };

  const logout = () => {
    setUser(prev => ({ ...prev, authenticated: false }));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ru' : 'en'));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, theme, toggleTheme, language, toggleLanguage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
