import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import ImgCanvas from './pages/ImgCanvas';
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
          <Route path="/imgCanvas" element={<ImgCanvas />} />
          <Route path="/search" element={<Search />} />
          <Route path="/result/:keyword" element={<Result />} />
          <Route path="/result-detail" element={<ResultDetail />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 1440px;
  min-width: 500px;
  display: flex;
  justify-content: center;
`;

export default App;
