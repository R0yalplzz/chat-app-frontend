import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "../features/loaderSlice";
import { userSlice } from "../features/userSlice";

export const store = configureStore({
    reducer: {
    loader: loaderSlice.reducer,
    user: userSlice.reducer,
        
    },
});

/* import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser } from "../apiCall/users";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../features/loaderSlice";
import { setUser } from "../features/userSlice";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
//   const state = useSelector((state) => state);

// console.log(state);
  const {user} = useSelector((state) => state.user);
  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const getLoggedInUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());
      console.log(response);
      if (response.success) {
        // setUser(response.data);
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      
      {children}
    </div>
  );
};

export default ProtectedRoutes;
 */