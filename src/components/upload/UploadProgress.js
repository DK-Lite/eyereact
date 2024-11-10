import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import PathSelector from './PathSelector';
import MemoModal from './MemoModal';
import { startUpload } from '../../store/sagas/uploadSaga';
import { 
  setMemo, 
  setMemoModalOpen 
} from '../../store/slices/uploadSlice';

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

const UploadProgress = ({ 
  path,
  memo,
  isStarted,
  currentStep,
  completedSteps,
  isMemoModalOpen,
  steps,
  startUpload,
  setMemo,
  setMemoModalOpen
}) => {
  const getStepDescription = (step, index) => {
    if (completedSteps.includes(index)) {
      return `${step.completedText || step.description}`;
    }
    if (currentStep === index) {
      return `${step.processingText || step.description}`;
    }
    return step.description;
  };

  const handleStartUpload = () => {
    if (!path) {
      alert('Please select a data path.');
      return;
    }
    startUpload();
  };

  return (
    <>
      <PathSelector />
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
        <MemoButton onClick={() => setMemoModalOpen(true)}>
          <span className="material-icons">edit_note</span>
          {memo ? 'Edit Memo' : 'Add Memo'}
        </MemoButton>
        <StartButton 
          onClick={handleStartUpload} 
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
        onClose={() => setMemoModalOpen(false)}
        onSave={(memo) => setMemo(memo)}
        initialMemo={memo}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  path: state.upload.path,
  memo: state.upload.memo,
  isStarted: state.upload.isStarted,
  currentStep: state.upload.currentStep,
  completedSteps: state.upload.completedSteps,
  isMemoModalOpen: state.upload.isMemoModalOpen,
  steps: state.upload.steps
});

export default connect(mapStateToProps, {
  startUpload,
  setMemo,
  setMemoModalOpen
})(UploadProgress); 