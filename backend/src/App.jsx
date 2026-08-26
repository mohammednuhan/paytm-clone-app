import { useState ,useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './components/signup'
import Signin from './components/signin'



function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Signup />} />
        <Route path = "/Signup" element = {<Signup />}/>
        <Route path = "/Signin" element = {<Signin />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;



