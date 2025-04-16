
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/tasksSlice';
import { fetchProjects } from '../features/projects/projectsSlice';
import TaskBoard from '../features/tasks/TaskBoard';

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const project = useSelector(state =>
    state.projects.list.find(p => p.id === parseInt(id))
  );
  const tasks = useSelector(state =>
    state.tasks.list.filter(t => t.projectId === parseInt(id))
  );

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, [dispatch]);

  if (!project) return <p>Проект не найден...</p>;

  return (
    <div>
      <h2>{project.name}</h2>
      <p>{project.description}</p>
      <h3>Задачи:</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - <strong>{task.status}</strong>
          </li>
        ))}
      </ul>
      <TaskBoard tasks={tasks} />
    </div>
  );
};

export default ProjectDetails;
