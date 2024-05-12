import React from 'react';
import { Route, Routes, BrowserRouter} from 'react-router-dom';
import MainWindow from './components/MainWindow';
import './static/style.css';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="*" element={<MainWindow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
