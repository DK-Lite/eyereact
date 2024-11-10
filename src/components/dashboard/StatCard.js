import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';

const StatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StatInfo = styled.div`
  h3 {
    color: #5f6368;
    font-size: 16px;
    margin-bottom: 8px;
  }
  
  p {
    color: #202124;
    font-size: 24px;
    font-weight: 500;
  }
`;

const StatCard = ({ title, value, icon }) => {
  return (
    <Card>
      <StatContainer>
        <StatInfo>
          <h3>{title}</h3>
          <p>{value}</p>
        </StatInfo>
        {icon}
      </StatContainer>
    </Card>
  );
};

export default StatCard; 