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
  padding: 20px;
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

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #dadce0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%235f6368'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 24px;
  padding-right: 40px;
  color: #202124;

  &:focus {
    border-color: #1a73e8;
  }

  &:hover {
    background-color: #f8f9fa;
  }

  option {
    padding: 12px;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 24px;
  padding: 4px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #5f6368;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }

  input {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #dadce0;
    border-radius: 50%;
    margin: 0;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;

    &:checked {
      border-color: #1a73e8;
      border-width: 5px;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
    }
  }
`;

const CreateDeviceModal = ({ isOpen, onClose, onCreate }) => {
  const [deviceName, setDeviceName] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceType, setDeviceType] = useState('eyetracker');
  const [connectionType, setConnectionType] = useState('usb');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      id: deviceId,
      name: deviceName,
      type: deviceType,
      connectionType,
      description,
      connected: false,
    });
    onClose();
  };

  const isFormValid = deviceName && deviceId && deviceType && connectionType;

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
            <Title>Create New Device</Title>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Device Name *</Label>
                <Input
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="Enter device name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Device ID *</Label>
                <Input
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="Enter device ID"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Device Type *</Label>
                <Select
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  required
                >
                  <option value="eyetracker">Eye Tracker</option>
                  <option value="camera">Camera</option>
                  <option value="sensor">Sensor</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Connection Type *</Label>
                <RadioGroup>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="connectionType"
                      value="usb"
                      checked={connectionType === 'usb'}
                      onChange={(e) => setConnectionType(e.target.value)}
                    />
                    USB
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="connectionType"
                      value="bluetooth"
                      checked={connectionType === 'bluetooth'}
                      onChange={(e) => setConnectionType(e.target.value)}
                    />
                    Bluetooth
                  </RadioLabel>
                  <RadioLabel>
                    <input
                      type="radio"
                      name="connectionType"
                      value="wifi"
                      checked={connectionType === 'wifi'}
                      onChange={(e) => setConnectionType(e.target.value)}
                    />
                    Wi-Fi
                  </RadioLabel>
                </RadioGroup>
              </FormGroup>
              <FormGroup>
                <Label>Description (Optional)</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter device description"
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
                  Create Device
                </Button>
              </ButtonGroup>
            </Form>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default CreateDeviceModal; 