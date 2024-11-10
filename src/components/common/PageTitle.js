import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-size: 28px;
  color: #202124;
  margin-bottom: 16px;
  font-weight: 500;
`;

const PageTitle = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default PageTitle; 