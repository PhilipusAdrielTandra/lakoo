import Landing from './components/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from "./components/Header";
// import Form from "./components/Form";
// import Signin from "./components/Signin";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App