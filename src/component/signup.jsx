import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { url } from "../config";
import "../index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "../features/loaderSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = {
      firstName,
      lastName,
      email,
      password,
      profilePic,
      isVerified,
    };

    data = {
      ...data,
    };

    try {
      dispatch(showLoader());
      let result = await axios({
        url: `${url}/api/auth/signup`,
        method: "POST",
        data: data,
      });
      dispatch(hideLoader());
      toast.success("A verification link has been sent to your email.");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setProfilePic("");
      setIsVerified(true);
    } catch (error) {
      dispatch(hideLoader());
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer />

      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <p className="subtitle">Join us today</p>

        <div className="input-group">
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/*    <div className="input-group">
          <label>Password </label>
          <input
            type="password"
            
            placeholder="Enter password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div> */}

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

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        <div className="login-link">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
