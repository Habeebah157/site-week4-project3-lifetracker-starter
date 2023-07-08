import React from "react";
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import ActivityPage from "../ActivityPage/ActivityPage";

const Home = ({ loggedIn }) => {
  return (
    <div>
      <Navbar loggedIn={loggedIn} />
      <Hero />
      <ActivityPage />
    </div>
  );
};

export default Home;
