import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import DeviceList from '../components/collection/DeviceList';
import UserList from '../components/collection/UserList';
import CreateDeviceModal from '../components/collection/CreateDeviceModal';
import CreateUserModal from '../components/collection/CreateUserModal';
import AnalysisModal from '../components/collection/AnalysisModal';
import {
  setSelectedDevice,
  toggleUserSelection,
  setCreateDeviceModalOpen,
  setCreateUserModalOpen,
  setAnalysisModalOpen,
} from '../store/slices/collectionSlice';
import {
  createDeviceRequest,
  createUserRequest,
  matchLogRequest,
} from '../store/sagas/collectionSaga';

const CollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Section = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-size: 18px;
  color: #202124;
  font-weight: 500;
`;

const CreateButton = styled.button`
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

  .material-icons {
    font-size: 20px;
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  height: 48px;
  padding: 0 24px;
  background: #f8f9fa;
  color: #24292f;
  border: 1px solid #d0d7de;
  border-radius: 28px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    border-color: #bbc0c4;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    background: #f3f4f6;
    color: #8c959f;
    border-color: #d0d7de;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  .material-icons {
    font-size: 20px;
  }
`;

const SelectedCount = styled.div`
  background: rgba(0, 0, 0, 0.05);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
`;

function Collection() {
  const dispatch = useDispatch();
  const {
    devices,
    users,
    selectedDevice,
    selectedUsers,
    isCreateDeviceModalOpen,
    isCreateUserModalOpen,
    isAnalysisModalOpen,
  } = useSelector(state => state.collection);

  const handleCreateDevice = (newDevice) => {
    dispatch(createDeviceRequest(newDevice));
  };

  const handleCreateUser = (newUser) => {
    dispatch(createUserRequest(newUser));
  };

  const handleUserSelect = (user) => {
    dispatch(toggleUserSelection(user));
  };

  const handleAnalyze = () => {
    dispatch(setAnalysisModalOpen(true));
  };

  const handleMatchLog = (userId, logPath) => {
    dispatch(matchLogRequest({ userId, logPath }));
  };

  const canAnalyze = selectedDevice && selectedUsers.length > 0;

  return (
    <div className="page-container">
      <PageTitle>Collection</PageTitle>
      <CollectionContainer>
        <Section>
          <SectionHeader>
            <Title>Devices</Title>
            <CreateButton onClick={() => dispatch(setCreateDeviceModalOpen(true))}>
              <span className="material-icons">add</span>
              Create Device
            </CreateButton>
          </SectionHeader>
          <DeviceList
            devices={devices}
            selectedDevice={selectedDevice}
            onSelect={(device) => dispatch(setSelectedDevice(device))}
          />
        </Section>

        <Section>
          <SectionHeader>
            <Title>Users</Title>
            <CreateButton onClick={() => dispatch(setCreateUserModalOpen(true))}>
              <span className="material-icons">person_add</span>
              Create User
            </CreateButton>
          </SectionHeader>
          <UserList
            users={users}
            selectedUsers={selectedUsers}
            onSelect={handleUserSelect}
            onMatchLog={handleMatchLog}
          />
        </Section>
      </CollectionContainer>

      {canAnalyze && (
        <FloatingButton onClick={handleAnalyze}>
          <span className="material-icons">analytics</span>
          Analyze
          <SelectedCount>{selectedUsers.length} users selected</SelectedCount>
        </FloatingButton>
      )}

      <CreateDeviceModal
        isOpen={isCreateDeviceModalOpen}
        onClose={() => dispatch(setCreateDeviceModalOpen(false))}
        onCreate={handleCreateDevice}
      />
      
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => dispatch(setCreateUserModalOpen(false))}
        onCreate={handleCreateUser}
      />

      <AnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => dispatch(setAnalysisModalOpen(false))}
        data={{
          device: selectedDevice,
          users: selectedUsers,
        }}
      />
    </div>
  );
}

export default Collection;