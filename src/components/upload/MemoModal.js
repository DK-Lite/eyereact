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
  max-width: 600px;
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

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  outline: none;
  margin-bottom: 24px;

  &:focus {
    border-color: #1a73e8;
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

const MemoModal = ({ isOpen, onClose, onSave, initialMemo = '' }) => {
  const [memo, setMemo] = useState(initialMemo);

  const handleSubmit = () => {
    onSave(memo);
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
            <Title>Add Memo</Title>
            <Subtitle>Write a memo for Minio upload documentation</Subtitle>
            <TextArea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="Enter your memo here..."
            />
            <ButtonGroup>
              <Button className="cancel" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                className="submit" 
                onClick={handleSubmit}
              >
                Save Memo
              </Button>
            </ButtonGroup>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default MemoModal; 