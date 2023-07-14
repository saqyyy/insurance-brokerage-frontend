import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Detals from './pages/Details';
import Layout from './components/Layout';

function App() {
  
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Home />} />
        <Route path="/details/:id" element={<Detals />} />
      </Route>
    </Routes>
  );
}

export default App;
