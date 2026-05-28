/* import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { url } from "../config";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isVerified, setIsVerified] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      profilePic: profilePic,
      isVerified: isVerified,
    };
    // console.log(data);
    data = {
      ...data,
      role: "admin",
    };
    try {
      let result = await axios({
        url: `${url}/web-user`,
        method: `POST`,
        data: data,
      });
      toast.success(
        "A link has been sent to your email. Please click the given link to verify your account"
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setProfilePic("");
      setIsVerified(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Create Account</h2>

          <div>
            <label htmlFor="firstname">FirstName: </label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="lastname">LastName: </label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              placeholder="Eg. abc@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <br />
          <br />
          <button>Sign Up</button>
        </div>

        <div>
          <h4>Already have an account?</h4>  <a href="/login">Login here</a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
 */

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { url } from "../config";
import "../index.css";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isVerified, setIsVerified] = useState(true);

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
      let result = await axios({
    
        url: `${url}/api/auth/signup`,
        method: "POST",
        data: data,
      });
       console.log(result);
      toast.success("A verification link has been sent to your email.");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setProfilePic("");
      setIsVerified(true);
    } catch (error) {
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

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        <div className="login-link">
          <p>
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
