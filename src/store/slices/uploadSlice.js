import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  path: '',
  memo: '',
  isStarted: false,
  currentStep: -1,
  completedSteps: [],
  isMemoModalOpen: false,
  steps: [
    { 
      icon: 'folder_open',
      title: 'Gather',
      description: 'Start collecting data.',
      processingText: 'Collecting data...',
      completedText: 'Data collection completed.',
      duration: 3
    },
    {
      icon: 'image',
      title: 'Transcoding JPG',
      description: 'Start JPG conversion.',
      processingText: 'Converting to JPG... (0/100)',
      completedText: 'JPG conversion completed.',
      duration: 5
    },
    {
      icon: 'movie',
      title: 'Transcoding AVI',
      description: 'Start AVI conversion.',
      processingText: 'Converting to AVI... (0/100)',
      completedText: 'AVI conversion completed.',
      duration: 4
    },
    {
      icon: 'cloud_upload',
      title: 'Minio Upload',
      description: 'Start uploading.',
      processingText: 'Uploading to Minio server... (0/100)',
      completedText: 'Upload completed.',
      duration: 3
    }
  ]
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setPath: (state, action) => {
      state.path = action.payload;
    },
    setMemo: (state, action) => {
      state.memo = action.payload;
    },
    setIsStarted: (state, action) => {
      state.isStarted = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    addCompletedStep: (state, action) => {
      state.completedSteps.push(action.payload);
    },
    updateStepProgress: (state, action) => {
      const { index, progress } = action.payload;
      state.steps[index].processingText = 
        `${state.steps[index].title} in progress... (${progress}/100)`;
    },
    setMemoModalOpen: (state, action) => {
      state.isMemoModalOpen = action.payload;
    },
    resetUpload: (state) => {
      return { ...initialState, steps: state.steps };
    }
  }
});

export const {
  setPath,
  setMemo,
  setIsStarted,
  setCurrentStep,
  addCompletedStep,
  updateStepProgress,
  setMemoModalOpen,
  resetUpload
} = uploadSlice.actions;

export default uploadSlice.reducer; 