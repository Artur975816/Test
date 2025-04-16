import React from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { 
    theme, 
    toggleTheme, 
    language, 
    toggleLanguage,
    user 
  } = useAuth();

  if (!user) {
    return (
      <div className="steampunk-container">
        {language === 'ru' ? 'Пожалуйста, войдите в систему' : 'Please log in'}
      </div>
    );
  }

  return (
    <div className="steampunk-container">
      <h2 className="steampunk-title">
        {language === 'ru' ? 'Настройки' : 'Settings'}
      </h2>
      
      <div className="steampunk-control-group">
        <p className="steampunk-text">
          {language === 'ru' ? 'Тема: ' : 'Theme: '}
          <span className="steampunk-value">
            {theme === 'steampunk-light' 
              ? (language === 'ru' ? 'Светлая' : 'Light') 
              : (language === 'ru' ? 'Тёмная' : 'Dark')}
          </span>
        </p>
        <button 
          onClick={toggleTheme}
          className="steampunk-button"
        >
          {language === 'ru' ? 'Сменить тему' : 'Toggle theme'}
        </button>
      </div>
      
      <div className="steampunk-control-group">
        <p className="steampunk-text">
          {language === 'ru' ? 'Язык: ' : 'Language: '}
          <span className="steampunk-value">
            {language === 'ru' ? 'Русский' : 'English'}
          </span>
        </p>
        <button 
          onClick={toggleLanguage}
          className="steampunk-button"
        >
          {language === 'ru' ? 'Сменить язык' : 'Toggle language'}
        </button>
      </div>
    </div>
  );
};

export default Settings;