import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Main from './pages/Main';
import ResultDetail from './pages/ResultDetail';
import styled from 'styled-components';
import Search from './pages/Search';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Search />} />
          <Route path="/result" element={<Result />} />
          <Route path="/result-detail" element={<ResultDetail />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1440px;
  min-width: 500px;
  display: flex;
  background-color: black;
`;

export default App;
