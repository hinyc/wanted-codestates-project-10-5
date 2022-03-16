import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import ImgCanvas from './pages/ImgCanvas';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/imgCanvas" element={<ImgCanvas />} />
      </Routes>
    </Router>
  );
}

export default App;
