import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainWindow from './components/MainWindow';
import './static/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<MainWindow />} />
      </Routes>
    </Router>
  );
}

export default App;
