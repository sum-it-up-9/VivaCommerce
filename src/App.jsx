import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home'
import Sports from './Pages/Sports';
import Outdoor from './Pages/Outdoor';
import ProductDisplay from './Components/PDP/ProductDisplay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/outdoors" element={<Outdoor />} />
        <Route path="/product/:id" element={<ProductDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
