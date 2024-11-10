import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { toggleUserSelection, matchLogRequest } from '../../store/slices/collectionSlice';

const UserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const UserCard = styled.div`
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

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #e8f0fe;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a73e8;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-size: 16px;
  color: #202124;
  margin-bottom: 4px;
`;

const UserId = styled.p`
  font-size: 14px;
  color: #5f6368;
`;

const MatchButton = styled.button`
  background: ${props => props.hasLog ? '#f1f8ff' : '#f8f9fa'};
  color: ${props => props.hasLog ? '#0969da' : '#24292f'};
  border: 1px solid ${props => props.hasLog ? '#cae1ff' : '#d0d7de'};
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    background: ${props => props.hasLog ? '#e1f0ff' : '#f3f4f6'};
    border-color: ${props => props.hasLog ? '#a7d0ff' : '#bbc0c4'};
  }

  .material-icons {
    font-size: 18px;
  }
`;

const LogPath = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f1f3f4;
  font-size: 14px;
  color: #5f6368;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    color: #1a73e8;
  }
`;

const UserList = ({ users, selectedUsers, toggleUserSelection, matchLogRequest }) => {
  const handleMatchLog = (user, e) => {
    e.stopPropagation();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.log,.txt,.csv';
    input.onchange = (event) => {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        matchLogRequest({ userId: user.id, logPath: file.path || file.name });
      }
    };
    input.click();
  };

  return (
    <UserListContainer>
      {users.map((user) => (
        <UserCard
          key={user.id}
          selected={selectedUsers.some(u => u.id === user.id)}
          onClick={() => toggleUserSelection(user)}
        >
          <UserHeader>
            <Avatar>
              <span className="material-icons">person</span>
            </Avatar>
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserId>ID: {user.id}</UserId>
            </UserInfo>
            <MatchButton
              hasLog={user.logPath}
              onClick={(e) => handleMatchLog(user, e)}
            >
              <span className="material-icons">
                {user.logPath ? 'check_circle' : 'add_link'}
              </span>
              {user.logPath ? 'Matched' : 'Match Log'}
            </MatchButton>
          </UserHeader>
          {user.logPath && (
            <LogPath>
              <span className="material-icons">folder</span>
              {user.logPath}
            </LogPath>
          )}
        </UserCard>
      ))}
    </UserListContainer>
  );
};

const mapStateToProps = (state) => ({
  users: state.collection.users,
  selectedUsers: state.collection.selectedUsers
});

export default connect(mapStateToProps, {
  toggleUserSelection,
  matchLogRequest
})(UserList); 