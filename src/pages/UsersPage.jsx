import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addUser, updateUser, deleteUser } from '../features/users/usersSlice';

const UsersPage = () => {
  const { theme, language } = useAuth();
  const { list: users, loading, error } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user'
  });


  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateUser({ id: isEditing, ...formData }));
    } else {
      dispatch(addUser(formData));
    }
    setIsEditing(null);
    setFormData({ name: '', email: '', role: 'user' });
  };

  const handleEdit = (user) => {
    setIsEditing(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
  };

  if (loading) return (
    <div className="steampunk-loading">
      <div className="steampunk-spinner"></div>
      <p>{language === 'ru' ? 'Загрузка пользователей...' : 'Loading users...'}</p>
    </div>
  );

  if (error) return (
    <div className="steampunk-error">
      <p>{language === 'ru' ? 'Ошибка загрузки' : 'Loading error'}</p>
      <button onClick={() => dispatch(fetchUsers())}>
        {language === 'ru' ? 'Повторить' : 'Retry'}
      </button>
    </div>
  );

  return (
    <div className="steampunk-container" style={{ 
      backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F5F5DC',
      color: theme === 'dark' ? '#D2B48C' : '#1A1A1A',
      padding: '2rem',
      marginTop: '80px'
    }}>
      <h2 style={{ 
        color: '#B8860B',
        borderBottom: '2px solid #8B4513',
        paddingBottom: '0.5rem',
        fontFamily: '"Times New Roman", serif'
      }}>
        {language === 'ru' ? 'Управление пользователями' : 'Users Management'}
      </h2>

      <form onSubmit={handleSubmit} style={{
        margin: '2rem 0',
        padding: '1.5rem',
        border: '1px solid #B8860B',
        borderRadius: '5px',
        backgroundColor: theme === 'dark' ? '#2A2A2A' : '#EEE'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            {language === 'ru' ? 'Имя' : 'Name'}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #B8860B',
                borderRadius: '3px',
                backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFF'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #B8860B',
                borderRadius: '3px',
                backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFF'
              }}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            {language === 'ru' ? 'Роль' : 'Role'}
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '1px solid #B8860B',
                borderRadius: '3px',
                backgroundColor: theme === 'dark' ? '#1A1A1A' : '#FFF',
                color: 'inherit'
              }}
            >
              <option value="user">{language === 'ru' ? 'Пользователь' : 'User'}</option>
              <option value="admin">{language === 'ru' ? 'Администратор' : 'Admin'}</option>
              <option value="editor">{language === 'ru' ? 'Редактор' : 'Editor'}</option>
            </select>
          </label>
        </div>

        <button type="submit" style={{
          padding: '0.5rem 1rem',
          background: '#B8860B',
          color: '#1A1A1A',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          {isEditing ? 
            (language === 'ru' ? 'Обновить' : 'Update') : 
            (language === 'ru' ? 'Добавить' : 'Add')}
        </button>

        {isEditing && (
          <button 
            type="button" 
            onClick={() => {
              setIsEditing(null);
              setFormData({ name: '', email: '', role: 'user' });
            }}
            style={{
              marginLeft: '1rem',
              padding: '0.5rem 1rem',
              background: '#8B4513',
              color: '#FFF',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            {language === 'ru' ? 'Отмена' : 'Cancel'}
          </button>
        )}
      </form>

      <div style={{
        marginTop: '2rem',
        border: '1px solid #8B4513',
        borderRadius: '5px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ 
              backgroundColor: '#B8860B',
              color: '#1A1A1A',
              fontFamily: '"Times New Roman", serif'
            }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>
                {language === 'ru' ? 'Имя' : 'Name'}
              </th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>
                {language === 'ru' ? 'Роль' : 'Role'}
              </th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>
                {language === 'ru' ? 'Действия' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ 
                borderBottom: '1px solid #8B4513',
                backgroundColor: theme === 'dark' ? '#2A2A2A' : '#F5F5DC',
                '&:hover': {
                  backgroundColor: theme === 'dark' ? '#3A3A3A' : '#EEE'
                }
              }}>
                <td style={{ padding: '1rem' }}>{user.id}</td>
                <td style={{ padding: '1rem' }}>{user.name}</td>
                <td style={{ padding: '1rem' }}>{user.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '3px',
                    backgroundColor: 
                      user.role === 'admin' ? '#8B4513' :
                      user.role === 'editor' ? '#556B2F' : '#B8860B',
                    color: '#FFF',
                    fontSize: '0.8rem'
                  }}>
                    {user.role === 'admin' ? (language === 'ru' ? 'Админ' : 'Admin') :
                     user.role === 'editor' ? (language === 'ru' ? 'Редактор' : 'Editor') :
                     (language === 'ru' ? 'Пользователь' : 'User')}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{
                      marginRight: '0.5rem',
                      padding: '0.25rem 0.5rem',
                      background: '#B8860B',
                      color: '#1A1A1A',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    {language === 'ru' ? 'Редактировать' : 'Edit'}
                  </button>
                  <button
                    onClick={() => dispatch(deleteUser(user.id))}
                    style={{
                      padding: '0.25rem 0.5rem',
                      background: '#8B4513',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    {language === 'ru' ? 'Удалить' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;