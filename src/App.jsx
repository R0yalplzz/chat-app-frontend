import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import SignUp from './component/SignUp';

const App = () => {
  return (
    <div>
   <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/signup" element={<SignUp />} />
   </Routes>

    </div>
  )
}

export default App;