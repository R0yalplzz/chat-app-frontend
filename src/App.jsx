import { Route, Routes } from 'react-router-dom';
import Home from './component/home';
import Login from './component/login';
import SignUp from './component/signup';
import VerifyEmail from './component/verifyEmail';
import { createContext, useState } from 'react';
export const GlobalVariableContext = createContext();


const App = () => {
  const [token, setToken]=useState(localStorage.getItem("token"))

  return (
    <div>
      <GlobalVariableContext.Provider value={{token: token, setToken:setToken}}>

   <Routes>
      <Route  path="/" element={<Home />} />
      <Route  path="/login" element={<Login />} />
      <Route  path="/signup" element={<SignUp />} />
      <Route  path="/verify-email" element={<VerifyEmail />} />
   </Routes>
   </GlobalVariableContext.Provider>


    </div>
  )
}

export default App;