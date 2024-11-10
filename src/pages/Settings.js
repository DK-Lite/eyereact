import React from 'react';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import Card from '../components/common/Card';

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SettingSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f1f3f4;

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.div`
  h3 {
    color: #202124;
    font-size: 16px;
    margin-bottom: 4px;
  }

  p {
    color: #5f6368;
    font-size: 14px;
  }
`;

function Settings() {
  return (
    <div className="page-container">
      <PageTitle>설정</PageTitle>
      <SettingsContainer>
        <Card>
          <SettingSection>
            <SettingLabel>
              <h3>알림 설정</h3>
              <p>시선 추적 관련 알림을 설정합니다</p>
            </SettingLabel>
            {/* 토글 스위치 등 추가 */}
          </SettingSection>
          <SettingSection>
            <SettingLabel>
              <h3>데이터 저장</h3>
              <p>시선 추적 데이터 저장 주기를 설정합니다</p>
            </SettingLabel>
            {/* 설정 컨트롤 추가 */}
          </SettingSection>
        </Card>
      </SettingsContainer>
    </div>
  );
}

export default Settings; 