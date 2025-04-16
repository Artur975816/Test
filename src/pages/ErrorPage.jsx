import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ErrorPage = () => {
  const { theme, language } = useAuth();
  const navigate = useNavigate();

  const errorMessages = {
    en: {
      main: "STEAMPUNK IS NO MORE",
      sub: "The gears have stopped turning...",
      button: "TRY TO RESTART"
    },
    ru: {
      main: "СТИМПАНК НЕ ТОТ",
      sub: "Шестерёнки больше не крутятся...",
      button: "ПОПРОБОВАТЬ СНОВА"
    }
  };

  const currentMessages = errorMessages[language === 'ru' ? 'ru' : 'en'];

  return (
    <div style={{
      backgroundImage: 'url(https://artchive.ru/res/media/img/oy800/article/f06/6306245@2x.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '2rem',
      color: theme === 'dark' ? '#D2B48C' : '#1A1A1A',
      position: 'relative'
    }}>
      {/* Затемнение фона */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1
      }}></div>
      
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '800px'
      }}>
        <h1 style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5rem',
          textShadow: '3px 3px 0 #B8860B',
          fontFamily: '"Times New Roman", serif'
        }}>
          {currentMessages.main}
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '3rem',
          fontStyle: 'italic',
          fontFamily: '"Courier New", monospace'
        }}>
          {currentMessages.sub}
        </p>
        
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            background: 'linear-gradient(to right, #B8860B, #8B4513)',
            color: '#1A1A1A',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            fontFamily: '"Courier New", monospace'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
          }}
        >
          {currentMessages.button}
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;