import React, { useEffect, useState } from "react";
import "./ExercisePage.css";
import Navbar from "../Navbar/Navbar";

const ExercisePage = ({ loggedIn, onExercisePage }) => {
  const [nData, setNData] = useState([]);
  const INITIAL_FORM_DATA = {
    name: "",
    category: "",
    duration: "",
    intensity: "",
  };
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  async function handleToken() {
    let token = localStorage.getItem("token");
    try {
      fetch("http://localhost:3002/workout", {
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
    const { name, category, duration, intensity } = formData;
    onExercisePage(name, category, duration, intensity);

    setFormData(INITIAL_FORM_DATA);
  };
  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      {loggedIn ? (
        <>
          <h1 className="exercise-header">Exercise</h1>
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                <label>Exercise Name</label>
                <input
                  name="name"
                  placeholder="Name"
                  type="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label>Category</label>
                <input
                  name="category"
                  placeholder="category"
                  value={formData.category}
                  onChange={handleChange}
                  type="categroy"
                  required
                />
                <label>Duration</label>
                <input
                  name="duration"
                  placeholder="0"
                  value={formData.duration}
                  onChange={handleChange}
                  type="number"
                  required
                />
                <label>Intensity</label>
                <input
                  name="intensity"
                  placeholder="0"
                  value={formData.intensity}
                  onChange={handleChange}
                  type="number"
                  required
                />
                <button className="exerciseSaveButton">SAVE</button>
              </form>
            </div>
            {nData.map((data) => {
              const date = new Date(data.created_at);
              const normalDate = date.toLocaleString();
              return (
                <center>
                  <span>{normalDate}</span>
                  <div className="exerciseInfo">
                    <span className="category">{data.category}</span>
                    <h2 className="food_name">{data.name}</h2>
                    <p className="categorytxt">
                      {"Category: " + data.category}
                    </p>
                    <p className="duration">{"Duration: " + data.duration}</p>
                  </div>
                </center>
              );
            })}
          </div>
        </>
      ) : (
        <h1 className="loggedInh1">Log in to access</h1>
      )}
    </div>
  );
};

export default ExercisePage;
