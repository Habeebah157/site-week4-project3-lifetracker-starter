import React, { useState } from "react";

import "./LoginPage.css";
// import profilepic from "../assets/imgavatar.jpg";
import fitness from "../assets/imgavatar.png";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
// lifetracker-ui/src/components/assets/imgavatar.png

const LoginPage = ({ onLogin }) => {
  const INITIAL_FORM_DATA = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    console.log("Hello");
    onLogin(email, password);
    setFormData(INITIAL_FORM_DATA);
  };
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div>
          <center>
            <img className="icon-img" src={fitness} />
          </center>
        </div>
        <div>
          <label>
            <b>Email</b>
          </label>
          <input
            placeholder="Enter Username"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* //take in infor the user entered with target.value  then, fetch to the route I creted like "http://local//auth/register. Going to post. */}
          <label>Password</label>
          <input
            placeholder="Enter Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Link to="/">
            <button className="login-btn" type="submit">
              Login
            </button>
          </Link>
        </div>
        <div>
          <span>New to us? Sign Up</span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
