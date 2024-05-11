import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainWindow from './components/MainWindow';
import About from './components/About';
import './static/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/About" element={<About />} />
        <Route path="*" element={<MainWindow />} />
      </Routes>
    </Router>
  );
}

export default App;
