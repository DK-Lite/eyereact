import React from 'react';
import styled from 'styled-components';
import PageTitle from '../components/common/PageTitle';
import UploadProgress from '../components/upload/UploadProgress';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function Upload() {
  return (
    <div className="page-container">
      <PageTitle>Upload</PageTitle>
      <UploadContainer>
        <UploadProgress />
      </UploadContainer>
    </div>
  );
}

export default Upload; 