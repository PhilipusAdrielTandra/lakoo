import Landing from './components/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Form from './components/Form.tsx'
import Signin from "./components/Signin";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/product" element={<Form/>}/>
          <Route path="/header" element={<Header/>}/>
          <Route path="/signin" element={<Signin/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App