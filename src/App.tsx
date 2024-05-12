import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import MainWindow from './components/MainWindow';
import './static/style.css';

function App() {
  const pjson = require('../package.json');
  return (
    <BrowserRouter basename={pjson.homepage}>
      <Routes>
        <Route path="*" element={<MainWindow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
