import React from "react";
import "./ActivityPageOrg.css";
import Navbar from "../Navbar/Navbar";
// import "./LoginPage.css";
import { useEffect, useState } from "react";

const ActivityPageOrg = ({ loggedIn }) => {
  console.log(loggedIn);
  const [caloricavg, setCaloricAvg] = useState();
  const [nData, setNData] = useState([]);
  let calories = 0;
  let length = nData.length;

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

    const sum = nData.reduce(function (prev, current) {
      return prev + +current.calories;
    }, 0);
    console.log(sum);
    let avg = sum / nData.length;
    setCaloricAvg(avg);
  }, []);

  // const calculateAverage = nData.map((item,index)=>{

  // })

  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <div>
        {loggedIn ? (
          <>
            <h1 className="activitytext">Activity</h1>
            {
              <div className="averagCalories">
                <p className="caloricavg">{Math.round(caloricavg)}</p>
              </div>
            }
            {/* {nData.map((data) => {
              let calories = 0;
              calories = parseInt(data.calories, 10) + calories;
              // setCaloricAvg(calories);
              return (
                <>
                  <p>H</p>
                </>
              );
            })} */}
          </>
        ) : (
          <h1 className="loggedout">Log in to access</h1>
        )}
      </div>
    </div>
  );
};

export default ActivityPageOrg;
