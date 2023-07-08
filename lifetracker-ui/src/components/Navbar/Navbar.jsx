import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import image from "../assets/codepath.svg";

const Navbar = ({ loggedIn }) => {
  console.log(loggedIn);
  return (
    <div>
      <ul>
        <li className="codepathlogo">
          <Link to="/">
            <img src={image} />
          </Link>
        </li>
        <li>
          <Link to="/activity">Activity</Link>
        </li>
        <li>
          <Link to="/exercise">Exercise</Link>
        </li>
        <li>
          <Link to="/nutrition">
            <a href="">Nutrition</a>
          </Link>
        </li>
        <li>
          <Link to="/sleep">
            <a href="">Sleep</a>
          </Link>
        </li>
        {loggedIn ? (
          <Link to="/">
            <button>Logout</button>
          </Link>
        ) : (
          <>
            <Link to="/signin">
              <button>Sign In</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </ul>
      <div></div>
    </div>
  );
};

export default Navbar;
