import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  color: #202124;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 24px;
`;

const PathSelector = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const PathInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #1a73e8;
  }
`;

const BrowseButton = styled.button`
  padding: 12px 24px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #1557b0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &.cancel {
    background: transparent;
    border: 1px solid #dadce0;
    color: #5f6368;

    &:hover {
      background: #f1f3f4;
    }
  }

  &.submit {
    background: #1a73e8;
    border: none;
    color: white;

    &:hover {
      background: #1557b0;
    }
  }
`;

const DataMatchingModal = ({ isOpen, onClose, user, onMatch }) => {
  const [dataPath, setDataPath] = useState('');

  const handleBrowse = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.onchange = (e) => {
      const path = e.target.files[0].path.split('\\').slice(0, -1).join('\\');
      setDataPath(path);
    };
    input.click();
  };

  const handleSubmit = () => {
    onMatch(user.id, dataPath);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <Title>Match Data for {user.name}</Title>
            <Subtitle>Select the data directory for this user</Subtitle>
            <PathSelector>
              <PathInput
                value={dataPath}
                onChange={(e) => setDataPath(e.target.value)}
                placeholder="Select data directory"
              />
              <BrowseButton onClick={handleBrowse}>
                <span className="material-icons">folder_open</span>
                Browse
              </BrowseButton>
            </PathSelector>
            <ButtonGroup>
              <Button className="cancel" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                className="submit" 
                onClick={handleSubmit}
                disabled={!dataPath}
              >
                Match Data
              </Button>
            </ButtonGroup>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default DataMatchingModal; 