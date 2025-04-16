
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/dashboard');
  };

  return (
    <div>
      <h2>Добро пожаловать, {user.name}!</h2>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}

export default Login;
