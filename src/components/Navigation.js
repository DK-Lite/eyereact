import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { setCurrentPage } from '../store/slices/navigationSlice';

const NavContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  position: fixed;
  left: 0;
  top: 0;
  padding: 32px 20px;
`;

const NavTitle = styled.div`
  font-size: 28px;
  margin-bottom: 40px;
  font-weight: 500;
  padding-left: 12px;
  display: flex;
  align-items: center;
`;

const TitleText = styled.span`
  color: #202124;
`;

const TitleDot = styled.span`
  color: #94c2f3;
  margin-left: 2px;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled.li`
  padding: 16px 20px;
  margin-bottom: 8px;
  cursor: pointer;
  border-radius: 16px;
  color: #5f6368;
  transition: all 0.2s ease;
  font-size: 16px;
  background-color: ${props => props.active ? '#e8f0fe' : 'transparent'};
  color: ${props => props.active ? '#1a73e8' : '#5f6368'};
  font-weight: ${props => props.active ? '500' : '400'};

  &:hover {
    background-color: #e8f0fe;
    color: #1a73e8;
  }
`;

function Navigation() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.navigation.currentPage);

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <NavContainer>
      <NavTitle>
        <TitleText>Eye Tracking</TitleText>
        <TitleDot>.</TitleDot>
      </NavTitle>
      <NavMenu>
        <NavItem 
          active={currentPage === 'testing'}
          onClick={() => handlePageChange('testing')}
        >
          Testing
        </NavItem>
        <NavItem 
          active={currentPage === 'collection'}
          onClick={() => handlePageChange('collection')}
        >
          Collection
        </NavItem>
        <NavItem 
          active={currentPage === 'upload'}
          onClick={() => handlePageChange('upload')}
        >
          Upload
        </NavItem>
      </NavMenu>
    </NavContainer>
  );
}

export default Navigation;