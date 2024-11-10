import React from 'react';
import styled from 'styled-components';
import Card from '../common/Card';

const ChartContainer = styled.div`
  height: 400px;
  // 차트 관련 스타일
`;

const AnalysisChart = ({ data }) => {
  return (
    <Card>
      <ChartContainer>
        {/* 차트 컴포넌트 구현 */}
      </ChartContainer>
    </Card>
  );
};

export default AnalysisChart; 