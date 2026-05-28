import { Route, Routes } from 'react-router-dom';
import Home from './component/home';
import Login from './component/login';
import SignUp from './component/signup';

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