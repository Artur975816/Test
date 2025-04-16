import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import usersData from '../../data/users.json';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    // Имитация загрузки с сервера
    await new Promise(resolve => setTimeout(resolve, 500));
    return usersData;
  } catch (error) {
    console.error("Error loading users:", error);
    throw error;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {
    addUser: (state, action) => {
      const newId = Math.max(...state.list.map(u => u.id), 0) + 1;
      state.list.push({
        id: newId,
        ...action.payload,
        createdAt: new Date().toISOString()
      });
    },
    updateUser: (state, action) => {
      const index = state.list.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload };
      }
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(u => u.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;