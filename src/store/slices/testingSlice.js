import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDeviceConnected: true,
  currentStep: 0,
  currentStepProgress: null,
  steps: [
    {
      icon: 'adjust',
      title: 'Auto IPD',
      description: 'Automatically measure IPD (Inter-Pupillary Distance).',
      progressMessage: '',
    },
    {
      icon: 'face',
      title: 'User Calibration',
      description: 'Calibrate user eye position.',
      progressMessage: '',
    },
    {
      icon: 'visibility',
      title: 'Testing',
      description: 'Start eye tracking test.',
      progressMessage: '',
    },
    {
      icon: 'save',
      title: 'Save Results',
      description: 'Save test results to local or Minio server.',
      progressMessage: '',
      isUploadStep: true,
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
      state.currentStepProgress = null;
    },
    updateStepProgress: (state, action) => {
      const { stepIndex, message } = action.payload;
      state.steps[stepIndex].progressMessage = message;
    },
    setCurrentStepProgress: (state, action) => {
      state.currentStepProgress = action.payload;
    }
  }
});

export const { 
  setDeviceConnected, 
  setCurrentStep,
  updateStepProgress,
  setCurrentStepProgress
} = testingSlice.actions;

export default testingSlice.reducer; 