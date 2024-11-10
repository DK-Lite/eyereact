import React from 'react';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import DeviceStatus from '../components/testing/DeviceStatus';
import TestingStep from '../components/testing/TestingStep';

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

function Testing() {
  const [isDeviceConnected, setIsDeviceConnected] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);

  const steps = [
    {
      icon: 'adjust',
      title: 'Auto IPD',
      description: 'Automatically measure IPD (Inter-Pupillary Distance).',
      onStart: () => handleStepStart(0)
    },
    {
      icon: 'face',
      title: 'User Calibration',
      description: 'Calibrate user eye position.',
      onStart: () => handleStepStart(1)
    },
    {
      icon: 'visibility',
      title: 'Testing',
      description: 'Start eye tracking test.',
      onStart: () => handleStepStart(2)
    },
    {
      icon: 'cloud_upload',
      title: 'Upload',
      description: 'Upload test results.',
      onStart: () => handleStepStart(3)
    }
  ];

  const handleStepStart = (stepIndex) => {
    setCurrentStep(stepIndex);
    // 각 스텝별 실행 로직 추가
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
              disabled={!isDeviceConnected || index > currentStep}
            />
          ))}
        </StepsContainer>
      </TestingContainer>
    </div>
  );
}

export default Testing; 