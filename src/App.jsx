import { Route, Routes } from "react-router-dom";
import Home from "./component/home";
import Login from "./component/login";
import SignUp from "./component/signup";
import VerifyEmail from "./component/verifyEmail";
import { createContext, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import ProtectedRoutes from "./component/protectedRoutes";
import Loader from "./component/loader";
import { useSelector } from "react-redux";

// import ProtectedRoutes from "./component/ProtectedRoutes";
export const GlobalVariableContext = createContext();

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { loader } = useSelector((state) => state.loader);

  return (
    <div>
      {loader && <Loader />}
      <GlobalVariableContext.Provider
        value={{ token: token, setToken: setToken }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Routes>
      </GlobalVariableContext.Provider>
    </div>
  );
};

export default App;
