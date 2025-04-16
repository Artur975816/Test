import React, { useReducer, useState } from 'react';

const initialState = {
  title: '',
  status: 'To Do',
};

function taskFormReducer(state, action) {
  switch (action.type) {
    case 'SET_TITLE':
      return { ...state, title: action.payload };
    case 'SET_STATUS':
      return { ...state, status: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const TaskForm = ({ onSubmit }) => {
  const [state, dispatch] = useReducer(taskFormReducer, initialState);
  const [error, setError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!state.title.trim()) {
      setError('Пожалуйста, введите название задачи');
      return;
    }
    setError(''); // Сбросить ошибку, если задача добавлена
    onSubmit({ ...state, id: Date.now() });
    dispatch({ type: 'RESET' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Название задачи"
        value={state.title}
        onChange={e => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
        style={{ marginRight: '10px', padding: '5px', border: '1px solid #ccc' }}
      />
      <select
        value={state.status}
        onChange={e => dispatch({ type: 'SET_STATUS', payload: e.target.value })}
        style={{ marginRight: '10px', padding: '5px', border: '1px solid #ccc' }}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" style={{ padding: '5px 10px', cursor: 'pointer' }}>Добавить</button>

      {error && <p style={{ color: 'red', fontSize: '12px' }}>{error}</p>}
    </form>
  );
};

export default TaskForm;
