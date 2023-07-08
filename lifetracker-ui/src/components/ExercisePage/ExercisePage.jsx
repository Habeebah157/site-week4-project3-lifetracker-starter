import React from "react";
import "./ExercisePage.css";
import Navbar from "../Navbar/Navbar";
const ExercisePage = ({ loggedIn }) => {
  return (
    <div>
      <Navbar />
      {loggedIn ? (
        <>
          <h1 className="exercise-header">Exercise</h1>
          <button>Add Exercise</button>
        </>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
};

export default ExercisePage;
