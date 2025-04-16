import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';

const ProjectDetails = () => {
  const { id } = useParams();
  const { theme, language } = useAuth();
  const project = useSelector(state => 
    state.projects.list.find(p => p.id === parseInt(id))
  );


  const statusColors = {
    'Planned': '#8B4513',
    'In Progress': '#B8860B',
    'Completed': '#556B2F'
  };

  const statusNames = {
    'Planned': language === 'ru' ? 'Планируется' : 'Planned',
    'In Progress': language === 'ru' ? 'В работе' : 'In Progress',
    'Completed': language === 'ru' ? 'Завершено' : 'Completed'
  };

  if (!project) {
    return (
      <div className="steampunk-container">
        {language === 'ru' ? 'Проект не найден' : 'Project not found'}
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="project-gear-large">
        <div className="gear-teeth-large" />
        <div className="gear-content">
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <div 
            className="project-status"
            style={{ color: statusColors[project.status] }}
          >
            {language === 'ru' ? 'Статус: ' : 'Status: '}
            {statusNames[project.status]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;