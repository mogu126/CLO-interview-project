import React from 'react';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import { store } from './store';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import ContentList from './components/ContentList';
import { GlobalStyle } from './styles/GlobalStyle';

// 样式组件
const AppContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background-color: #1B1A21;
  padding: 24px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  text-align: center;
  margin-bottom: 32px;
  color: #fff;
`;


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <AppContainer>
        <PageTitle>CLO-SET CONNECT</PageTitle>
        <SearchBar />
        <FilterSection />
        <ContentList />
      </AppContainer>
    </Provider>
  );
};

export default App;
