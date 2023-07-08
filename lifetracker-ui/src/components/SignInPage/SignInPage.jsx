import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const SignInPage = ({ onSignIn }) => {
  //refactor to have to have one form state object
  const INITIAL_FORM_DATA = {
    email: "",
    username: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    lastName: "",
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

  // console.log("formData:", formData);

  const handleSubmit = (e) => {
    // console.log("signpage");
    e.preventDefault();

    //these are all variables. (destructuring)
    const { email, username, firstName, lastName, password, confirmPassword } =
      formData;
    onSignIn(email, username, firstName, lastName, password, confirmPassword);
    setFormData(INITIAL_FORM_DATA);
  };
  return (
    <div>
      <div>
        <Navbar />
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Username</label>
            <input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>First Name</label>
            <input
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label>Last Name</label>
            <input
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <input
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              placeholder="confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign up</button>
          </div>
          <span>Have an account? Login</span>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
