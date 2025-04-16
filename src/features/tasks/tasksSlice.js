
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import tasksData from '../../data/tasks.json';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return tasksData;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
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
  },
});

export default tasksSlice.reducer;
