import Landing from './components/Landing';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form.tsx';
import Signin from "./components/Signin";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* <Route path="/" element={<Landing/>}/> */}
          <Route path="/list-item" element={<><Header /><Form /></>}/>
          <Route path="/" element={<Signin/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App