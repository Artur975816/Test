
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects } from '../features/projects/projectsSlice';

function Dashboard() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) return <p>Загрузка проектов...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h2>Все проекты</h2>
      <ul>
        {list.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
