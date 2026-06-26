import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getLoggedUser } from "../apiCall/users";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../features/loaderSlice";
import { setAllChats, setAllUsers, setUser } from "../features/userSlice";
import { getAllChats } from "../apiCall/chat";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); // ← Fixed this line
  const navigate = useNavigate();

  const getLoggedInUser = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getLoggedUser();
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getAllUsersFromDb = async () => {
    let response = null;
    try {
      dispatch(showLoader());
      response = await getAllUsers();
      dispatch(hideLoader());
      if (response.success) {
        dispatch(setAllUsers(response.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoader());
      navigate("/login");
    }
  };

  const getCurrentUserChats = async () => {
    try {
      const response = await getAllChats();
      if (response.success) {
        dispatch(setAllChats(response.data));
      }
    } catch (error) {
      navigate("login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getLoggedInUser();
      getAllUsersFromDb();
      getCurrentUserChats();
    } else {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
};

export default ProtectedRoutes;
