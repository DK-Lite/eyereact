import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import Testing from './pages/Testing';
import Collection from './pages/Collection';
import Upload from './pages/Upload';

const AppContainer = styled.div`
  display: flex;
  background-color: #f8f9fa;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 250px;
  padding: 40px;
  background-color: #ffffff;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.05);
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
`;

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const renderPage = (currentPage) => {
  switch (currentPage) {
    case 'testing':
      return <Testing />;
    case 'collection':
      return <Collection />;
    case 'upload':
      return <Upload />;
    default:
      return <Testing />;
  }
};

function App() {
  const currentPage = useSelector((state) => state.navigation.currentPage);

  return (
    <AppContainer>
      <Navigation />
      <MainContent>
        <PageWrapper>
          {renderPage(currentPage)}
        </PageWrapper>
      </MainContent>
    </AppContainer>
  );
}

export default App;
