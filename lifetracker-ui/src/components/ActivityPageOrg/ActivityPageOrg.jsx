import React from "react";
import "./ActivityPageOrg.css";
import Navbar from "../Navbar/Navbar";
// import "./LoginPage.css";

const ActivityPageOrg = ({ loggedIn }) => {
  console.log(loggedIn);
  return (
    <div>
      <Navbar />
      <div>
        {loggedIn ? (
          <h1 className="activitytext">Activity</h1>
        ) : (
          <h1 className="loggedout">Not a logged</h1>
        )}
      </div>
    </div>
  );
};

export default ActivityPageOrg;
