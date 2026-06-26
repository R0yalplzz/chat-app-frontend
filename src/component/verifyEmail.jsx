import axios from "axios";
import  { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { url } from "../config";

const VerifyEmail = () => {
  let [query] = useSearchParams();
  let token = query.get("token");

  let navigate = useNavigate();
  let verifyEmail = async () => {
    try {
      let result = await axios({
        url: `${url}/api/auth/verify-email`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/login");
    } catch (error) {}
  };
  useEffect(() => {
    verifyEmail();
  }, []);
  return <div>AdminVerify</div>;
};

export default VerifyEmail;
