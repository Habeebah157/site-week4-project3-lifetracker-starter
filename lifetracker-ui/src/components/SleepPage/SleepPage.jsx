import React, { useState, useEffect } from "react";
import "./SleepPage.css";
import Navbar from "../Navbar/Navbar";

const SleepPage = ({ loggedIn, onSleepPage }) => {
  const [nData, setNData] = useState([]);
  const INITIAL_FORM_DATA = {
    start_time: "",
    end_time: "",
  };
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  async function handleToken() {
    let token = localStorage.getItem("token");
    try {
      fetch("https://lifetracker-api-uo7v.onrender.com/sleep", {
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
  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const { start_time, end_time } = formData;
    let str = start_time.split("T");
    let dateof = str[0];

    onSleepPage(start_time, end_time, dateof);
    console.log("dayof", dayof);
    setFormData;
  };
  const refresh = () => window.location.reload(true);
  return (
    <div>
      <Navbar loggedIn={loggedIn} />

      {loggedIn ? (
        <div>
          <div>
            <h1 className="sleep-header">Sleep</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                name="start_time"
                type="datetime-local"
                id="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
              ></input>
              <input
                type="datetime-local"
                id="end_time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
              />
              <button onClick={refresh} className="saveButton" type="subimt">
                Save
              </button>
            </form>
            {nData.map((data) => {
              let str = data.start_time.split("T");
              let fstart_time = str[1];
              let str2 = data.end_time.split("T");
              let fend_time = str2[1];

              return (
                <center>
                  <span>{data.dateof}</span>
                  <div className="nutiInfo">
                    <p>{fstart_time}</p>
                    <p>{fend_time}</p>
                  </div>
                </center>
              );
            })}
          </div>
        </div>
      ) : (
        <h1 className="loggedInh1">Log in to access</h1>
      )}
    </div>
  );
};

export default SleepPage;
