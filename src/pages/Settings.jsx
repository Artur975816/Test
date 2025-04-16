
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { theme, toggleTheme, language, toggleLanguage } = useContext(AuthContext);

  return (
    <div>
      <h2>Настройки</h2>
      <div>
        <p>Тема: {theme}</p>
        <button onClick={toggleTheme}>Сменить тему</button>
      </div>
      <div>
        <p>Язык: {language}</p>
        <button onClick={toggleLanguage}>Сменить язык</button>
      </div>
    </div>
  );
};

export default Settings;
