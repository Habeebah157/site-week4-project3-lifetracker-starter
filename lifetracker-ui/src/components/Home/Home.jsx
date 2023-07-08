import React from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import ActivityPage from "../ActivityPage/ActivityPage";

const Home = ({ loggedIn, handleLogOut }) => {
  return (
    <div>
      <Navbar handleLogOut={handleLogOut} loggedIn={loggedIn} />
      <Hero />
      <ActivityPage />
    </div>
  );
};

export default Home;
