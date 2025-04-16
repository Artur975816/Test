import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProjectDetails from './pages/ProjectDetails';
import Settings from './pages/Settings';
import ErrorPage from './pages/ErrorPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router> {/* Обертываем все в Router */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
