import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  users: [],
  selectedDevice: null,
  selectedUsers: [],
  isCreateDeviceModalOpen: false,
  isCreateUserModalOpen: false,
  isAnalysisModalOpen: false,
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addDevice: (state, action) => {
      state.devices.push(action.payload);
    },
    removeDevice: (state, action) => {
      state.devices = state.devices.filter(device => device.id !== action.payload);
      if (state.selectedDevice?.id === action.payload) {
        state.selectedDevice = null;
      }
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      state.selectedUsers = state.selectedUsers.filter(user => user.id !== action.payload);
    },
    setSelectedDevice: (state, action) => {
      state.selectedDevice = action.payload;
    },
    toggleUserSelection: (state, action) => {
      const userId = action.payload.id;
      const index = state.selectedUsers.findIndex(u => u.id === userId);
      if (index === -1) {
        state.selectedUsers.push(action.payload);
      } else {
        state.selectedUsers.splice(index, 1);
      }
    },
    updateUserLogPath: (state, action) => {
      const { userId, logPath } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.logPath = logPath;
      }
    },
    setCreateDeviceModalOpen: (state, action) => {
      state.isCreateDeviceModalOpen = action.payload;
    },
    setCreateUserModalOpen: (state, action) => {
      state.isCreateUserModalOpen = action.payload;
    },
    setAnalysisModalOpen: (state, action) => {
      state.isAnalysisModalOpen = action.payload;
    },
  },
});

export const {
  addDevice,
  removeDevice,
  addUser,
  removeUser,
  setSelectedDevice,
  toggleUserSelection,
  updateUserLogPath,
  setCreateDeviceModalOpen,
  setCreateUserModalOpen,
  setAnalysisModalOpen,
} = collectionSlice.actions;

export default collectionSlice.reducer; 