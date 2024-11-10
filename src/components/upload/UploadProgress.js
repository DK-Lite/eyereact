import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PathSelector from './PathSelector';
import MemoModal from './MemoModal';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const ProgressContainer = styled.div`
  margin-top: 12px;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 16px;
  background: ${props => props.isActive ? '#e8f0fe' : 'white'};
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
`;

const StepIcon = styled.span.attrs({
  className: 'material-icons'
})`
  font-size: 32px;
  color: ${props => {
    if (props.isCompleted) return '#34A853';
    if (props.isActive) return '#1a73e8';
    return '#5f6368';
  }};
  margin-right: 24px;
  animation: ${props => props.isActive ? float : 'none'} 2s ease-in-out infinite;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  color: ${props => props.isActive ? '#1a73e8' : '#202124'};
  margin-bottom: 8px;
  transition: color 0.3s ease;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: #5f6368;
`;

const StartButton = styled.button`
  height: 48px;
  padding: 0 24px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;

  &:hover {
    background: #1557b0;
  }

  &:disabled {
    background: #dadce0;
    cursor: not-allowed;
  }
`;

const MemoButton = styled.button`
  height: 48px;
  padding: 0 24px;
  background: white;
  border: 1px solid #1a73e8;
  color: #1a73e8;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;

  &:hover {
    background: #f8f9fa;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
`;

const MemoPreview = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  
  h3 {
    font-size: 14px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  p {
    font-size: 14px;
    color: #5f6368;
    white-space: pre-wrap;
  }
`;

const UploadProgress = () => {
  const [path, setPath] = useState('');
  const [isStarted, setIsStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [steps, setSteps] = useState([
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
  ]);
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const [memo, setMemo] = useState('');

  const getStepDescription = (step, index) => {
    if (completedSteps.includes(index)) {
      return `${step.completedText || step.description}`;
    }
    if (currentStep === index) {
      return `${step.processingText || step.description}`;
    }
    return step.description;
  };

  const startUpload = () => {
    if (!path) {
      alert('Please select a data path.');
      return;
    }
    setIsStarted(true);
    processSteps();
  };

  const processSteps = async () => {
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      const startTime = Date.now();
      
      const updateInterval = setInterval(() => {
        const progress = Math.floor((Date.now() - startTime) / (steps[i].duration * 10));
        if (progress <= 100) {
          setSteps(prevSteps => {
            const newSteps = [...prevSteps];
            newSteps[i] = {
              ...newSteps[i],
              processingText: `${newSteps[i].title} in progress... (${progress}/100)`
            };
            return newSteps;
          });
        }
      }, 100);

      await new Promise(resolve => setTimeout(resolve, steps[i].duration * 1000));
      clearInterval(updateInterval);
      
      setCompletedSteps(prev => [...prev, i]);
    }
    setCurrentStep(-1);
  };

  return (
    <>
      <PathSelector onPathSelect={setPath} />
      {memo && (
        <MemoPreview>
          <h3>
            <span className="material-icons">description</span>
            Memo
          </h3>
          <p>{memo}</p>
        </MemoPreview>
      )}
      <ButtonGroup>
        <MemoButton onClick={() => setIsMemoModalOpen(true)}>
          <span className="material-icons">edit_note</span>
          {memo ? 'Edit Memo' : 'Add Memo'}
        </MemoButton>
        <StartButton 
          onClick={startUpload} 
          disabled={isStarted || !path}
        >
          <span className="material-icons">play_circle_outline</span>
          Start Automation
        </StartButton>
      </ButtonGroup>
      <ProgressContainer>
        {steps.map((step, index) => (
          <StepContainer 
            key={index}
            isActive={currentStep === index}
          >
            <StepIcon 
              isActive={currentStep === index}
              isCompleted={completedSteps.includes(index)}
            >
              {completedSteps.includes(index) ? 'check_circle' : step.icon}
            </StepIcon>
            <StepContent>
              <StepTitle isActive={currentStep === index}>{step.title}</StepTitle>
              <StepDescription>
                {getStepDescription(step, index)}
              </StepDescription>
            </StepContent>
          </StepContainer>
        ))}
      </ProgressContainer>

      <MemoModal
        isOpen={isMemoModalOpen}
        onClose={() => setIsMemoModalOpen(false)}
        onSave={setMemo}
        initialMemo={memo}
      />
    </>
  );
};

export default UploadProgress; 