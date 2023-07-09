import React from "react";
import "./ActivityPageOrg.css";
import Navbar from "../Navbar/Navbar";
// import "./LoginPage.css";
import { useEffect, useState } from "react";

const ActivityPageOrg = ({ loggedIn }) => {
  console.log(loggedIn);
  const [caloricavg, setCaloricAvg] = useState();
  const [nData, setNData] = useState([]);
  const [Totalcalories, setTotalCalories] = useState(0);
  let calories = 0;
  console.log("CALOFIEA", calories);

  async function handleToken() {
    let token = localStorage.getItem("token");
    try {
      fetch("http://localhost:3002/nutrition", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      }).then((response) => {
        response.json().then((data) => {
          console.log(data.posts);
          setNData(data.posts);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleToken();
  }, []);

  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <div>
        {loggedIn ? (
          <>
            <h1 className="activitytext">Activity</h1>
            {/* {
              <div className="averagCalories">
                <p className="caloricavg">{Math.round(caloricavg)}</p>
              </div>
            } */}
            {
              <div className="averagCalories">
                {nData.map((data) => {
                  calories = parseInt(data.calories, 10) + calories;
                  // setCaloricAvg(calories);
                  return <></>;
                })}
              </div>
            }
            {
              <div className="averagCalories">
                <span className="caloriesSpan">Total Calories</span>
                <p className="caloricavg">
                  {Math.round(calories / nData.length)}
                </p>
              </div>
            }
          </>
        ) : (
          <h1 className="loggedout">Log in to access</h1>
        )}
      </div>
    </div>
  );
};

export default ActivityPageOrg;
