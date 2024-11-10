import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDeviceConnected: false,
  currentStep: 0,
  steps: [
    {
      icon: 'adjust',
      title: 'Auto IPD',
      description: 'Automatically measure IPD (Inter-Pupillary Distance).',
    },
    {
      icon: 'face',
      title: 'User Calibration',
      description: 'Calibrate user eye position.',
    },
    {
      icon: 'visibility',
      title: 'Testing',
      description: 'Start eye tracking test.',
    },
    {
      icon: 'cloud_upload',
      title: 'Upload',
      description: 'Upload test results.',
    }
  ]
};

const testingSlice = createSlice({
  name: 'testing',
  initialState,
  reducers: {
    setDeviceConnected: (state, action) => {
      state.isDeviceConnected = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    }
  }
});

export const { setDeviceConnected, setCurrentStep } = testingSlice.actions;
export default testingSlice.reducer; 