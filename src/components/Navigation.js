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
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.05);
  transform: translateY(-8px);
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
  background: transparent;
`;

const NavItem = styled.li`
  padding: 16px 20px;
  cursor: pointer;
  color: ${props => props.active ? '#1a73e8' : '#5f6368'};
  font-weight: ${props => props.active ? '500' : '400'};
  font-size: 16px;
  transition: all 0.2s ease;
  opacity: ${props => props.active ? 1 : 0.7};

  &:hover {
    color: #1a73e8;
    opacity: 1;
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