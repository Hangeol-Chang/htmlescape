import './App.css';
import { HashRouter as Router, Route, Routes} from "react-router-dom";

import {Box} from '@mui/material'

import Header from './pages/common/Header';
import Footer from './pages/common/Footer';

import Intro from './pages/Intro';
import Stage1 from './pages/Stage1';
import Stage2 from './pages/Stage2';
import Clear from './pages/clear';
import Stage3 from './pages/Stage3';
import Stage4 from './pages/Stage4';
import Googlepoly from './pages/Googlepoly';

console.log(process.env.PUBLIC_URL)

function App() {
  return (
    <div className="App">
      <Header />
      <Box sx={{
        minHeight:'600px',
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
      }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Intro />} />
            <Route exact path="/stage1" element={<Stage1 />} />
            <Route exact path="/stage2" element={<Stage2 />} />
            <Route exact path="/stage3" element={<Stage3 />} />
            <Route exact path="/stage4" element={<Stage4 />} />

            <Route exact path="/clear" element={<Clear />} />

            <Route exact path="/googlepoly" element={<Googlepoly />} />
          </Routes>   
        </Router> 
      </Box>
      
      <Footer />
    </div>
  );
}

export default App;
