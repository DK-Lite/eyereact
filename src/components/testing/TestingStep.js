import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`;

const StepContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  min-height: 80px;
`;

const StepIcon = styled.span.attrs({
  className: 'material-icons'
})`
  font-size: 32px;
  color: #1a73e8;
  margin-right: 24px;
  padding-top: 4px;
`;

const StepContent = styled.div`
  flex: 1;
  position: relative;
`;

const StepTitle = styled.h3`
  font-size: 18px;
  color: #202124;
  margin-bottom: 8px;
`;

const StepDescription = styled.p`
  font-size: 14px;
  color: #5f6368;
`;

const ProgressMessage = styled.p`
  font-size: 14px;
  color: #1a73e8;
  font-style: italic;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  margin: 0;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  padding-top: 4px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: ${props => props.isLoading ? 'default' : 'pointer'};
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  color: #1a73e8;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f1f8ff;
  }

  &:disabled {
    color: #dadce0;
    cursor: not-allowed;
  }

  .material-icons {
    font-size: 24px;
    animation: ${props => props.isLoading ? css`${rotate} 1.5s linear infinite` : 'none'};
  }
`;

const TestingStep = ({ 
  icon, 
  title, 
  description, 
  onStart, 
  disabled, 
  isActive,
  isUploadStep,
  progressMessage,
  onLocalSave,
  onMinioUpload
}) => {
  if (isUploadStep) {
    return (
      <StepContainer>
        <StepIcon>{icon}</StepIcon>
        <StepContent>
          <StepTitle>{title}</StepTitle>
          <StepDescription>{description}</StepDescription>
          {progressMessage && <ProgressMessage>{progressMessage}</ProgressMessage>}
        </StepContent>
        <ButtonGroup>
          <ActionButton 
            onClick={onLocalSave} 
            disabled={disabled}
            title="Save to Local"
          >
            <span className="material-icons">save</span>
          </ActionButton>
          <ActionButton 
            onClick={onMinioUpload}
            disabled={disabled}
            title="Upload to Minio"
          >
            <span className="material-icons">cloud_upload</span>
          </ActionButton>
        </ButtonGroup>
      </StepContainer>
    );
  }

  return (
    <StepContainer>
      <StepIcon>{icon}</StepIcon>
      <StepContent>
        <StepTitle>{title}</StepTitle>
        <StepDescription>{description}</StepDescription>
        {progressMessage && <ProgressMessage>{progressMessage}</ProgressMessage>}
      </StepContent>
      <ActionButton 
        onClick={onStart} 
        disabled={disabled}
        isLoading={isActive}
      >
        <span className="material-icons">
          {isActive ? 'sync' : 'play_circle_outline'}
        </span>
      </ActionButton>
    </StepContainer>
  );
};

export default TestingStep; 