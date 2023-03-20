import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
