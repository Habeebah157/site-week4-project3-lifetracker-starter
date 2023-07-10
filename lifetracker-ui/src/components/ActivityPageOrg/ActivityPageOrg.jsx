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
  const [sleepData, setSleepData] = useState([]);
  const [workoutData, setWorkoutData] = useState([]);
  let calories = 0;
  let exerciseTime = 0;
  let workOutTime = 0;
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
    try {
      fetch("http://localhost:3002/sleep", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      }).then((response) => {
        response.json().then((data) => {
          setSleepData(data.posts);
        });
      });
    } catch (err) {
      console.log(err);
    }
    try {
      fetch("http://localhost:3002/workout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      }).then((response) => {
        response.json().then((data) => {
          setWorkoutData(data.posts);
        });
      });
    } catch (err) {
      console.log(err);
    }
  }

  console.log("ND", sleepData);

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
            {
              <div className="averageSleep">
                {sleepData.map((data) => {
                  exerciseTime = data.end_time.split("T");
                  exerciseTime = exerciseTime[1];
                  return <></>;
                })}
              </div>
            }
            {
              <div className="averagCalories">
                <span className="caloriesSpan">Recent Sleep Time</span>
                <p className="caloricavg">{exerciseTime}</p>
              </div>
            }
            {
              <div className="averageExercise">
                {workoutData.map((data) => {
                  workOutTime = parseInt(data.duration, 10) + workOutTime;
                  return <></>;
                })}
              </div>
            }
            {
              <div className="averagCalories">
                <span className="caloriesSpan">Average Exercise Duration</span>
                <p className="caloricavg">{workOutTime}</p>
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
