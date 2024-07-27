import React from "react";
import FAQ from "../common/faq";
import Hero from "../common/hero";
import Help from "../common/help";
import StepsPage from "../common/step";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <FAQ />
      <Help />
      <StepsPage />
    </div>
  );
};

export default Home;
