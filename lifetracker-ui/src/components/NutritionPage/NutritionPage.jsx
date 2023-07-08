import React from "react";
import "./NutritionPage.css";
import Navbar from "../Navbar/Navbar";
import { Form } from "react-router-dom";
import { useState, useEffect } from "react";

const NutritionPage = ({ loggedIn, onNutritionPage, nutritionData }) => {
  // console.log("nutritiondata", nutritionData);
  const [nData, setNData] = useState([]);
  const INITIAL_FORM_DATA = {
    name: "",
    category: "",
    quantity: "",
    calories: "",
    image_url: "",
  };
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

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
    console.log(formData);
    const { name, category, quantity, calories, image_url } = formData;
    onNutritionPage(name, category, quantity, calories, image_url);
    setFormData(INITIAL_FORM_DATA);
  };
  console.log("nData", nData);
  return (
    <div>
      <Navbar />

      {loggedIn ? (
        <div>
          <div>
            <h1 className="nutrition-head">Nutrition</h1>
          </div>
          <div>
            <button>Record Nutrition</button>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                type="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Category</label>
              {/* <select name="category" id="categories">
                <option>Snack</option>
                <option>Beverage</option>
                <option>Food</option>
              </select> */}
              <input
                name="category"
                type="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                required
              ></input>
              <label>Quantity</label>
              <input
                name="quantity"
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
              <label>Calories</label>
              <input
                name="calories"
                type="number"
                placeholder="0"
                value={formData.calories}
                onChange={handleChange}
                required
              />
              <input
                name="image_url"
                placeholder="url for image"
                type="url"
                value={formData.image_url}
                onChange={handleChange}
                required
              />
              <div>
                <button className="submit" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
          {/* {nData.map((data) => {
            {
              <p>{data.calories}</p>;
            }


          })} */}

          {nData.map((data) => {
            const date = new Date(data.created_at);
            const normalDate = date.toLocaleString();
            return (
              <div className="nutiInfo">
                <p>{data.id}</p>
                <p>{data.name}</p>
                <p>{data.category}</p>
                <p>{normalDate}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="loggedInh1">Log in to access</h1>
      )}
      {}
    </div>
  );
};

export default NutritionPage;
