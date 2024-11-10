import React from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DeviceCard = styled.div`
  background: ${props => props.selected ? '#e8f0fe' : 'white'};
  border: 2px solid ${props => props.selected ? '#1a73e8' : '#f1f3f4'};
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a73e8;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const DeviceHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const DeviceIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #e8f0fe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a73e8;
`;

const DeviceInfo = styled.div`
  flex: 1;
`;

const DeviceName = styled.h3`
  font-size: 16px;
  color: #202124;
  margin-bottom: 4px;
`;

const DeviceId = styled.p`
  font-size: 14px;
  color: #5f6368;
`;

const DeviceStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${props => props.connected ? '#34A853' : '#5f6368'};

  span {
    font-size: 18px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
  color: #5f6368;
  
  .material-icons {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  p {
    font-size: 14px;
  }
`;

const DeviceList = ({ devices, selectedDevice, onSelect }) => {
  const handleDeviceSelect = (device) => {
    if (selectedDevice?.id === device.id) {
      onSelect(null);
    } else {
      onSelect(device);
    }
  };

  if (devices.length === 0) {
    return (
      <EmptyState>
        <span className="material-icons">devices</span>
        <p>No devices created yet</p>
      </EmptyState>
    );
  }

  return (
    <ListContainer>
      {devices.map((device) => (
        <DeviceCard
          key={device.id}
          selected={selectedDevice?.id === device.id}
          onClick={() => handleDeviceSelect(device)}
        >
          <DeviceHeader>
            <DeviceIcon>
              <span className="material-icons">devices</span>
            </DeviceIcon>
            <DeviceInfo>
              <DeviceName>{device.name}</DeviceName>
              <DeviceId>ID: {device.id}</DeviceId>
            </DeviceInfo>
            <DeviceStatus connected={device.connected}>
              <span className="material-icons">
                {device.connected ? 'check_circle' : 'pending'}
              </span>
              {device.connected ? 'Connected' : 'Disconnected'}
            </DeviceStatus>
          </DeviceHeader>
        </DeviceCard>
      ))}
    </ListContainer>
  );
};

export default DeviceList; 