import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectsData from '../../data/projects.json';

// Нормализуем статусы
const normalizeStatus = (status) => {
  const statusMap = {
    'Active': 'In Progress',
    'Ongoing': 'In Progress',
    'Planned': 'Planned',
    'Completed': 'Completed'
  };
  return statusMap[status] || 'Planned';
};

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const normalizedProjects = projectsData.map(project => ({
    ...project,
    status: normalizeStatus(project.status)
  }));
  return normalizedProjects;
});

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    updateProjectStatus: (state, action) => {
      const { id, status } = action.payload;
      const project = state.list.find(p => p.id === id);
      if (project) {
        project.status = status;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { updateProjectStatus } = projectsSlice.actions;
export default projectsSlice.reducer;
