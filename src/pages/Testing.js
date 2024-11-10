import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import DeviceStatus from '../components/testing/DeviceStatus';
import TestingStep from '../components/testing/TestingStep';
import { setCurrentStep } from '../store/slices/testingSlice';

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
  setCurrentStep 
}) => {
  const handleStepStart = (stepIndex) => {
    setCurrentStep(stepIndex);
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
  setCurrentStep
})(Testing); 