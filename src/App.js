import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Добавляем провайдер
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Settings from './pages/Settings';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Tasks from './pages/Tasks';
import UsersPage from './pages/UsersPage';

// Компонент-обёртка для страниц с навбаром
const LayoutWithNavbar = () => {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '60px' }}> {/* Добавляем отступ для навбара */}
        <Outlet />
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider> {/* Обертываем всё в AuthProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Все приватные страницы */}
          {/* <Route element={<PrivateRoute />}> */}
          {/* не работает это не мои кривые руки это уже сам он такой плохой */}
            <Route element={<LayoutWithNavbar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/users" element={<UsersPage />} />
            </Route>
          {/* </Route> */}

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;