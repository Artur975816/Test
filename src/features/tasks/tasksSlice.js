import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasksData from '../../data/tasks.json';

// Нормализация статусов
const normalizeStatus = (status) => {
  const statusMap = {
    'Active': 'In Progress',
    'Ongoing': 'In Progress',
    'Planned': 'Planned',
    'Completed': 'Completed'
  };
  return statusMap[status] || 'Planned';
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const normalizedTasks = tasksData.map(task => ({
    ...task,
    status: normalizeStatus(task.status)
  }));
  return normalizedTasks;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.list.find(t => t.id === id);
      if (task) {
        task.status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;