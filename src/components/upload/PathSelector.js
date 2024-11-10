import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 12px;
`;

const PathInput = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  color: #202124;
  outline: none;

  &:focus {
    border-color: #1a73e8;
  }
`;

const Button = styled.button`
  height: 48px;
  padding: 0 24px;
  background: ${props => props.variant === 'outlined' ? 'white' : '#f8f9fa'};
  color: ${props => props.variant === 'outlined' ? '#0969da' : '#24292f'};
  border: 1px solid ${props => props.variant === 'outlined' ? '#cae1ff' : '#d0d7de'};
  border-radius: 8px;
  font-size: 14px;
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
    font-size: 20px;
  }
`;

const PathSelector = ({ onPathSelect }) => {
  const [path, setPath] = useState('');

  const handleBrowse = () => {
    // 실제 구현시에는 electron의 dialog API를 사용하거나
    // 웹에서는 input type="file" directory webkitdirectory를 사용
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.onchange = (e) => {
      const path = e.target.files[0].path.split('\\').slice(0, -1).join('\\');
      setPath(path);
      onPathSelect(path);
    };
    input.click();
  };

  return (
    <Container>
      <PathInput>
        <Input
          value={path}
          onChange={(e) => {
            setPath(e.target.value);
            onPathSelect(e.target.value);
          }}
          placeholder="Enter or select data path"
        />
        <Button onClick={handleBrowse}>
          <span className="material-icons">folder_open</span>
          Browse
        </Button>
      </PathInput>
    </Container>
  );
};

export default PathSelector; 