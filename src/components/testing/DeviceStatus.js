import React from 'react';
import styled from 'styled-components';

const StatusContainer = styled.div`
  background: ${props => props.isConnected ? '#e6f4ea' : '#fce8e6'};
  color: ${props => props.isConnected ? '#1e8e3e' : '#d93025'};
  padding: 12px 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const StatusIcon = styled.span.attrs({
  className: 'material-icons'
})`
  font-size: 24px;
`;

const StatusText = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const DeviceStatus = ({ isConnected }) => {
  return (
    <StatusContainer isConnected={isConnected}>
      <StatusIcon>usb</StatusIcon>
      <StatusText>
        {isConnected ? 'ADB device is connected' : 'ADB device connection required'}
      </StatusText>
    </StatusContainer>
  );
};

export default DeviceStatus; 