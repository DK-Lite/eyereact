import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import DeviceStatus from '../components/testing/DeviceStatus';
import TestingStep from '../components/testing/TestingStep';
import { 
  setCurrentStep,
  updateStepProgress,
  setCurrentStepProgress 
} from '../store/slices/testingSlice';

const TestingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Testing = ({ 
  isDeviceConnected, 
  currentStep, 
  steps,
  setCurrentStep,
  updateStepProgress,
  setCurrentStepProgress
}) => {
  const handleStepStart = (stepIndex) => {
    setCurrentStep(stepIndex);
    
    // 예시: 각 스텝별 진행상황 업데이트
    switch(stepIndex) {
      case 0: // Auto IPD
        setTimeout(() => {
          updateStepProgress({ stepIndex, message: "Measuring IPD..." });
        }, 1000);
        break;
      case 1: // Calibration
        setTimeout(() => {
          updateStepProgress({ stepIndex, message: "Calibrating eye position..." });
        }, 1000);
        break;
      case 2: // Testing
        setTimeout(() => {
          updateStepProgress({ stepIndex, message: "Recording eye movements..." });
        }, 1000);
        break;
      default:
        break;
    }
  };

  const handleLocalSave = () => {
    updateStepProgress({ 
      stepIndex: 3, 
      message: "Saving to local storage..." 
    });
    // 로컬 저장 로직 구현
  };

  const handleMinioUpload = () => {
    updateStepProgress({ 
      stepIndex: 3, 
      message: "Uploading to Minio server..." 
    });
    // Minio 업로드 로직 구현
  };

  return (
    <div className="page-container">
      <PageTitle>Testing</PageTitle>
      <TestingContainer>
        <DeviceStatus isConnected={isDeviceConnected} />
        <StepsContainer>
          {steps.map((step, index) => (
            <TestingStep
              key={index}
              {...step}
              onStart={() => handleStepStart(index)}
              disabled={!isDeviceConnected || index > currentStep}
              isActive={currentStep === index}
              onLocalSave={handleLocalSave}
              onMinioUpload={handleMinioUpload}
            />
          ))}
        </StepsContainer>
      </TestingContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isDeviceConnected: state.testing.isDeviceConnected,
  currentStep: state.testing.currentStep,
  steps: state.testing.steps
});

export default connect(mapStateToProps, {
  setCurrentStep,
  updateStepProgress,
  setCurrentStepProgress
})(Testing); 