import './App.css';
import { Routes, Route, useLocation} from "react-router-dom";
import {Landing, Home, Detail, Form  } from './views/index';
import Nav from './components/Nav/Nav'


function App() {

  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== '/' && <Nav />}

      <Routes>
        <Route exact path= "/" element={<Landing/>} />
          
        <Route path= "/home" element={<Home/>} />

        <Route path= "/:id" element={<Detail/>} />

        <Route path= "/form" element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
