import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Box} from '@mui/material/'

import Header from './pages/common/Header';
import Footer from './pages/common/Footer';

import Intro from './pages/Intro';
import Stage1 from './pages/Stage1';

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
            <Route path='/' element={<Intro />} />
            <Route path='/stage1' element={<Stage1 />} />
          </Routes>
        </BrowserRouter>
      </Box>
      
      <Footer />
    </div>
  );
}

export default App;
