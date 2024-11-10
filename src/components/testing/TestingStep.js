import React from 'react';
import styled from 'styled-components';

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
`;

const StepIcon = styled.span.attrs({
  className: 'material-icons'
})`
  font-size: 32px;
  color: #1a73e8;
  margin-right: 24px;
`;

const StepContent = styled.div`
  flex: 1;
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

const PlayButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;

  .material-icons {
    font-size: 36px;
    color: ${props => props.disabled ? '#dadce0' : '#1a73e8'};
  }

  &:hover:not(:disabled) .material-icons {
    color: #174ea6;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const TestingStep = ({ icon, title, description, onStart, disabled }) => {
  return (
    <StepContainer>
      <StepIcon>{icon}</StepIcon>
      <StepContent>
        <StepTitle>{title}</StepTitle>
        <StepDescription>{description}</StepDescription>
      </StepContent>
      <PlayButton onClick={onStart} disabled={disabled}>
        <span className="material-icons">play_circle_outline</span>
      </PlayButton>
    </StepContainer>
  );
};

export default TestingStep; 