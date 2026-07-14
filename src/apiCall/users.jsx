import { url } from "../config.js";
import { axiosInstance } from "./index";

export const getLoggedUser = async () => {
  try {
    const response = await axiosInstance.get(`${url}/api/user/get-logged-user`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`${url}/api/user/get-all-user`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const uploadProfilePic = async (image) => {
  try {
    const response = await axiosInstance.post(
      `${url}/api/user/upload-profile-pic`,
      { image },
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
