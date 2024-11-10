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
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #5f6368;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #1a73e8;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
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

    &:disabled {
      background: #dadce0;
      cursor: not-allowed;
    }
  }
`;

const CreateUserModal = ({ isOpen, onClose, onCreate }) => {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      name: userName,
      age: userAge,
      gender: userGender,
    });
    onClose();
  };

  const isFormValid = userName && userAge && userGender;

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
            <Title>Create New User</Title>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>User Name *</Label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter user name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Age *</Label>
                <Input
                  type="number"
                  value={userAge}
                  onChange={(e) => setUserAge(e.target.value)}
                  placeholder="Enter user age"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Gender *</Label>
                <Input
                  value={userGender}
                  onChange={(e) => setUserGender(e.target.value)}
                  placeholder="Enter user gender"
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <Button type="button" className="cancel" onClick={onClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="submit"
                  disabled={!isFormValid}
                >
                  Create User
                </Button>
              </ButtonGroup>
            </Form>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default CreateUserModal; 