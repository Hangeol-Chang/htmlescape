import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Box} from '@mui/material/'

import Header from './pages/common/Header';
import Footer from './pages/common/Footer';

import Intro from './pages/Intro';
import Stage1 from './pages/Stage1';

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
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Intro />} />
          </Routes> 
        </BrowserRouter> 

        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route exact path="/" element={<Intro />} />
            <Route path="/stage1" element={<Stage1 />} />
          </Routes>
        </BrowserRouter>
      </Box>
      
      <Footer />
    </div>
  );
}

export default App;
