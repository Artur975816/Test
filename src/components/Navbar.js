import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, theme, language } = useAuth();

  // Функция для сокращения длинных ников
  const shortenUsername = (name) => {
    if (!name) return '';
    return name.length > 8 ? `${name.substring(0, 8)}...` : name;
  };

  // Тексты в зависимости от языка
  const navTexts = {
    login: language === 'ru' ? 'Вход' : 'Login',
    logout: language === 'ru' ? 'Выйти' : 'Logout',
    dashboard: language === 'ru' ? 'Проекты' : 'Projects',
    tasks: language === 'ru' ? 'Задачи' : 'Tasks',
    users: language === 'ru' ? 'Пользователи' : 'Users',
    settings: language === 'ru' ? 'Настройки' : 'Settings'
  };

  return (
    <nav style={{
      background: theme === 'dark' ? '#1A1A1A' : '#B8860B',
      padding: '1rem',
      position: 'fixed',
      width: '100%',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      borderBottom: theme === 'dark' ? '1px solid #B8860B' : '1px solid #8B4513'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {!user ? (
            <Link 
              to="/" 
              className="nav-link"
              style={{ 
                color: theme === 'dark' ? '#B8860B' : '#1A1A1A',
                textDecoration: 'none',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span className="gear-icon" style={{ fontSize: '1.2rem' }}>⚙️</span>
              {navTexts.login}
            </Link>
          ) : (
            <>
              <Link 
                to="/dashboard" 
                className="nav-link"
                style={{ 
                  color: theme === 'dark' ? '#B8860B' : '#1A1A1A',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span className="gear-icon" style={{ fontSize: '1.2rem' }}>⚙️</span>
                {navTexts.dashboard}
              </Link>
              
              <Link 
                to="/tasks" 
                className="nav-link"
                style={{ 
                  color: theme === 'dark' ? '#B8860B' : '#1A1A1A',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span className="gear-icon" style={{ fontSize: '1.2rem' }}>⚙️</span>
                {navTexts.tasks}
              </Link>
              
              <Link 
                to="/users" 
                className="nav-link"
                style={{ 
                  color: theme === 'dark' ? '#B8860B' : '#1A1A1A',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span className="gear-icon" style={{ fontSize: '1.2rem' }}>⚙️</span>
                {navTexts.users}
              </Link>
              
              <Link 
                to="/settings" 
                className="nav-link"
                style={{ 
                  color: theme === 'dark' ? '#B8860B' : '#1A1A1A',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span className="gear-icon" style={{ fontSize: '1.2rem' }}>⚙️</span>
                {navTexts.settings}
              </Link>
            </>
          )}
        </div>

        {user && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            <span 
              title={user.name} // Полное имя в tooltip
              style={{ 
                color: theme === 'dark' ? '#D2B48C' : '#1A1A1A',
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {shortenUsername(user.name)}
            </span>
            <button 
              onClick={logout}
              style={{
                background: theme === 'dark' ? '#8B4513' : '#1A1A1A',
                color: '#D2B48C',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
                flexShrink: 0 // Запрещаем сжатие кнопки
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            >
              <span style={{ fontSize: '1rem' }}>⎋</span>
              {navTexts.logout}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;