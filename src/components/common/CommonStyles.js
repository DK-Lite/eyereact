import styled from 'styled-components';

export const Button = styled.button`
  background: ${props => props.variant === 'outlined' ? 'white' : '#f8f9fa'};
  color: ${props => props.variant === 'outlined' ? '#0969da' : '#24292f'};
  border: 1px solid ${props => props.variant === 'outlined' ? '#cae1ff' : '#d0d7de'};
  padding: ${props => props.size === 'large' ? '12px 24px' : '8px 16px'};
  border-radius: 6px;
  font-size: ${props => props.size === 'large' ? '16px' : '14px'};
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.variant === 'outlined' ? '#e1f0ff' : '#f3f4f6'};
    border-color: ${props => props.variant === 'outlined' ? '#a7d0ff' : '#bbc0c4'};
  }

  &:disabled {
    background: #f3f4f6;
    color: #8c959f;
    border-color: #d0d7de;
    cursor: not-allowed;
  }

  .material-icons {
    font-size: ${props => props.size === 'large' ? '20px' : '18px'};
  }
`;

export const PrimaryButton = styled(Button)`
  background: #f8f9fa;
  color: #24292f;
  border: 1px solid #d0d7de;

  &:hover {
    background: #f3f4f6;
    border-color: #bbc0c4;
  }

  &:disabled {
    background: #f3f4f6;
    color: #8c959f;
    border-color: #d0d7de;
  }
`;

export const FloatingButton = styled(PrimaryButton)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 32px;
  border-radius: 28px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    transform: none;
    box-shadow: none;
  }
`;