import "./App.css";
import ExercisePage from "../ExercisePage/ExercisePage";
import Navbar from "../Navbar/Navbar";
import LoginPage from "../LoginPage/LoginPage";
import SignInPage from "../SignInPage/SignInPage";
import Hero from "../Hero/Hero";
import ActivityPage from "../ActivityPage/ActivityPage";
import Home from "../Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ActivityPageOrg from "../ActivityPageOrg/ActivityPageOrg";
import NutritionPage from "../NutritionPage/NutritionPage";
import SleepPage from "../SleepPage/SleepPage";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function App() {
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [nutritionData, setNutritionData] = useState([]);

  useEffect(() => {
    const checkLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);

        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
          //putyt the other function
          getNutrition();
        } else {
          /// 12:58
          console.log("handlelogout");
        }
      }
    };
    checkLoggedIn();
  });

  const handleSignIn = async (
    email,
    username,
    firstName,
    lastName,
    password,
    confirmPassword
  ) => {
    try {
      const response = await fetch("http://localhost:3002/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          email,
          username,
          firstName,
          lastName,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.status === 201) {
        const { token } = data;
        console.log(token);
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);

        setLoggedIn(true);
        console.log(data.message);
      } else {
        console.log(data.message);
      }
      if (response.ok) {
        // setLoggedIn(true);
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.status === 201) {
        const { token } = data;
        console.log(token);
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.userName);

        setLoggedIn(true);
        console.log(data.message);
      } else {
        console.log(data.message);
      }
      if (response.ok) {
        // setLoggedIn(true);
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getNutrition = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const decodedToken = jwtDecode(token);
    // decodedToken.
  };

  //called it
  //use effct.
  //axio creat a function with axios
  const handleNutrition = async (
    name,
    category,
    quantity,
    calories,
    image_url
  ) => {
    try {
      const response = await fetch("http://localhost:3002/nutrition/nutrient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ name, category, quantity, calories, image_url }),
      });
      console.log("works");
      const data = await response.json();
      console.log(data.NutritionPost);
      setNutritionData([...nutritionData, data.NutritionPost]);
      console.log(nutritionData);
      if (response.status === 200) {
        console.log(response);
      } else {
        console.log("not workd");
      }
    } catch (error) {
      console.log("Doesnt work");
      console.error("Error:", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home handleLogOut={handleLogOut} loggedIn={loggedIn} />}
          />
          <Route
            path="/activity"
            element={<ActivityPageOrg loggedIn={loggedIn} />}
          />
          <Route path="/signin" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<SignInPage onSignIn={handleSignIn} />}
          />
          <Route
            path="/nutrition"
            element={
              <NutritionPage
                onNutritionPage={handleNutrition}
                loggedIn={loggedIn}
                nutritionData={nutritionData}
              />
            }
          />
          <Route
            path="/exercise"
            element={<ExercisePage loggedIn={loggedIn} />}
          />
          <Route path="/sleep" element={<SleepPage loggedIn={loggedIn} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
