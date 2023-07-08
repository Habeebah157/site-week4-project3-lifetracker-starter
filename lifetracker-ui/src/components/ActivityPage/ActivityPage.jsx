import React from "react";
import "./ActivityPage.css";
import food from "../assets/food.jpg";
import rest from "../assets/empty-bed.jpg";
import tracker from "../assets/tracker.jpg";
import fitness from "../assets/athlete.jpg";

const ActivityPage = () => {
  return (
    <div className="flex-container">
      <div className="fitness">
        <center>
          <h2>Fitness⚽️</h2>
        </center>
        <img src={fitness} className="fitness-img" />
      </div>
      <div className="food">
        <center>
          <h2>Food🍔</h2>
        </center>
        <img src={food} className="food-img" />
      </div>
      <div className="rest">
        <center>
          <h2>Rest😴</h2>
        </center>
        <img src={rest} className="rest-img" />
      </div>
      <div className="planner">
        <center>
          <h2>Planner✍️</h2>
        </center>
        <img src={tracker} className="planner-img" />
      </div>
    </div>
  );
};

export default ActivityPage;
