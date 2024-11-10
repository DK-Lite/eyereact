import React from 'react';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import AnalysisChart from '../components/analysis/AnalysisChart';

const AnalysisContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function Analysis() {
  return (
    <div className="page-container">
      <PageTitle>분석</PageTitle>
      <AnalysisContainer>
        <AnalysisChart />
      </AnalysisContainer>
    </div>
  );
}

export default Analysis; 