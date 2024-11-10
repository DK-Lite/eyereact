import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setPath } from '../../store/slices/uploadSlice';

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

const PathSelector = ({ path, setPath }) => {
  const handleBrowse = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.onchange = (e) => {
      const path = e.target.files[0].path.split('\\').slice(0, -1).join('\\');
      setPath(path);
    };
    input.click();
  };

  return (
    <Container>
      <PathInput>
        <Input
          value={path}
          onChange={(e) => setPath(e.target.value)}
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

const mapStateToProps = (state) => ({
  path: state.upload.path
});

export default connect(mapStateToProps, {
  setPath
})(PathSelector); 