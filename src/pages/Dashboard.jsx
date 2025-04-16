import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects, updateProjectStatus } from '../features/projects/projectsSlice';

const Dashboard = () => {
  const { theme, language } = useAuth();
  const { list: projects, loading, error } = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const [draggedProject, setDraggedProject] = useState(null); // Добавлено состояние


  useEffect(() => {
    dispatch(fetchProjects())
      .then(() => setInitialized(true))
      .catch(() => setInitialized(true));
  }, [dispatch]);

  const statusOptions = {
    'Planned': language === 'ru' ? 'Планируется' : 'Planned',
    'In Progress': language === 'ru' ? 'В работе' : 'In Progress',
    'Completed': language === 'ru' ? 'Завершено' : 'Completed'
  };

  const statusColors = {
    'Planned': '#8B4513',
    'In Progress': '#B8860B',
    'Completed': '#556B2F'
  };

  const handleDragStart = (e, projectId) => {
    e.dataTransfer.setData('text/plain', projectId);
    setDraggedProject(projectId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData('text/plain');
    if (projectId) {
      dispatch(updateProjectStatus({ 
        id: Number(projectId), 
        status: Object.keys(statusOptions).find(key => statusOptions[key] === newStatus)
      }));
    }
    setDraggedProject(null);
  };

  if (loading && !initialized) {
    return (
      <div className="steampunk-loading">
        <div className="steampunk-spinner"></div>
        <p>{language === 'ru' ? 'Загрузка проектов...' : 'Loading projects...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="steampunk-error">
        <p>{language === 'ru' ? 'Ошибка загрузки данных' : 'Error loading data'}</p>
        <button onClick={() => dispatch(fetchProjects())}>
          {language === 'ru' ? 'Повторить попытку' : 'Retry'}
        </button>
      </div>
    );
  }

  if (projects.length === 0 && initialized) {
    return (
      <div className="steampunk-empty">
        <p>{language === 'ru' ? 'Проекты не найдены' : 'No projects found'}</p>
        <button onClick={() => dispatch(fetchProjects())}>
          {language === 'ru' ? 'Загрузить снова' : 'Reload'}
        </button>
      </div>
    );
  }

  return (
    <div className="steampunk-dashboard">
      <h2 className="dashboard-title">
        {language === 'ru' ? 'Панель управления проектами' : 'Projects Dashboard'}
      </h2>
      
      <div className="status-columns-container">
        {Object.entries(statusOptions).map(([statusKey, statusName]) => (
          <div 
            key={statusKey}
            className="status-column"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, statusName)}
            style={{ borderTop: `5px solid ${statusColors[statusKey]}` }}
          >
            <h3 style={{ color: statusColors[statusKey] }}>{statusName}</h3>
            <div className="gears-container">
              {projects
                .filter(project => project.status === statusKey)
                .map(project => (
                  <div 
                    key={project.id}
                    className="project-gear"
                    draggable
                    onDragStart={(e) => handleDragStart(e, project.id)}
                    style={{
                      borderColor: statusColors[project.status],
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5dc'
                    }}
                  >
                    <div className="gear-inner">
                      <h4>{project.name}</h4>
                      <p>{project.description}</p>
                    </div>
                    <div className="gear-teeth" style={{ opacity: theme === 'dark' ? 0.7 : 0.4 }} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;