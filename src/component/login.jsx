import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useState } from "react";
import { url } from "../config";
import "../index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  let global = useContext(GlobalVariableContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      email,
      password,
    };

    data = {
      ...data,
    };

    try {
      let result = await axios({
        url: `${url}/api/auth/login`,
        method: "POST",
        data: data,
      });
      let token = result.data.token;
      localStorage.setItem("token", token);
      global.setToken(token);
      // console.log(result);
      toast.success(result.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);

      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Login Here</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>

          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="login-btn"
          style={{ cursor: "pointer" }}
        >
          Login
        </button>

        <div className="login-link">
          <p>
            Don't have an account yet? <Link to="/signup">Signup here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
