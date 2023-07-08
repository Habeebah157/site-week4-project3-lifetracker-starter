import React from "react";
import "./SleepPage.css";
import Navbar from "../Navbar/Navbar";

const SleepPage = ({ loggedIn }) => {
  return (
    <div>
      <Navbar loggedIn={loggedIn} />

      {loggedIn ? (
        <div>
          <div>
            <h1 className="sleep-header">Sleep</h1>
          </div>
          <div>
            <button>Add Sleep </button>
          </div>
        </div>
      ) : (
        <h1 className="loggedInh1">Log in to access</h1>
      )}
    </div>
  );
};

export default SleepPage;
