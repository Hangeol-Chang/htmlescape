import './App.css';
import Header from './pages/common/Header';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Intro from './pages/Intro';


function App() {
  return (
    <div className="App">
      <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Intro />} />
            <Route path='/stage1' element={<div>임시 stage1</div>} />
          </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
