import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, updateTaskStatus } from '../features/tasks/tasksSlice';
import { Link } from 'react-router-dom';


const Tasks = () => {
  const { theme, language } = useAuth();
  const { list: tasks, loading, error } = useSelector(state => state.tasks);
  const projects = useSelector(state => state.projects.list);
  const dispatch = useDispatch();
  const [initialized, setInitialized] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);


  // Статусы с переводами
  const statusOptions = {
    'Planned': language === 'ru' ? 'Запланировано' : 'Planned',
    'In Progress': language === 'ru' ? 'В работе' : 'In Progress',
    'Completed': language === 'ru' ? 'Завершено' : 'Completed'
  };

  // Цвета для статусов
  const statusColors = {
    'Planned': '#8B4513',     // Коричневый
    'In Progress': '#B8860B', // Латунный
    'Completed': '#556B2F'    // Патина
  };

  useEffect(() => {
    dispatch(fetchTasks())
      .then(() => setInitialized(true))
      .catch(() => setInitialized(true));
  }, [dispatch]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    setDraggedTask(taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      dispatch(updateTaskStatus({ 
        id: Number(taskId), 
        status: Object.keys(statusOptions).find(key => statusOptions[key] === newStatus)
      }));
    }
    setDraggedTask(null);
  };

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Unknown Project';
  };

  if (loading && !initialized) {
    return (
      <div className="steampunk-loading">
        <div className="steampunk-spinner"></div>
        <p>{language === 'ru' ? 'Загрузка задач...' : 'Loading tasks...'}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="steampunk-error">
        <p>{language === 'ru' ? 'Ошибка загрузки данных' : 'Error loading data'}</p>
        <button onClick={() => dispatch(fetchTasks())}>
          {language === 'ru' ? 'Повторить попытку' : 'Retry'}
        </button>
      </div>
    );
  }

  if (tasks.length === 0 && initialized) {
    return (
      <div className="steampunk-empty">
        <p>{language === 'ru' ? 'Задачи не найдены' : 'No tasks found'}</p>
        <button onClick={() => dispatch(fetchTasks())}>
          {language === 'ru' ? 'Загрузить снова' : 'Reload'}
        </button>
      </div>
    );
  }

  return (
    <div className="steampunk-tasks">
      <h2 className="tasks-title">
        {language === 'ru' ? 'Управление задачами' : 'Tasks Management'}
        <Link to="/dashboard" className="back-link">
          {language === 'ru' ? '← К проектам' : '← To projects'}
        </Link>
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
            <div className="tasks-container">
              {tasks
                .filter(task => task.status === statusKey)
                .map(task => (
                  <div 
                    key={task.id}
                    className="task-item"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    style={{
                      borderLeft: `4px solid ${statusColors[statusKey]}`,
                      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f5f5dc'
                    }}
                  >
                    <div className="task-header">
                      <span className="task-project">
                        {getProjectName(task.projectId)}
                      </span>
                      <span className="task-status-indicator" 
                        style={{ backgroundColor: statusColors[statusKey] }} />
                    </div>
                    <h4>{task.title}</h4>
                    <div className="task-gear-icon"></div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;