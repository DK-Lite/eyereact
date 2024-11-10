import React from 'react';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import StatCard from '../components/dashboard/StatCard';

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

function Dashboard() {
  return (
    <div className="page-container">
      <PageTitle>대시보드</PageTitle>
      <DashboardGrid>
        <StatCard 
          title="총 시선 추적 시간"
          value="2.5 시간"
        />
        <StatCard 
          title="오늘의 세션"
          value="12회"
        />
        <StatCard 
          title="평균 집중도"
          value="85%"
        />
      </DashboardGrid>
    </div>
  );
}

export default Dashboard; 