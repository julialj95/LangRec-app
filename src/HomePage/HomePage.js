import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <main>
      <div className="hero"></div>
      <h1 className="about">About LangRec</h1>
      <p className="about">
        Whether for work, social reasons or simply the joy of gaining a new
        skill, many people are expanding their horizons by learning a foreign
        language (or two or three!). <br />
        <br />
        With a plethora of resources available, it can be challenging and costly
        to find the ones that will best help you to achieve your goals. <br />
        <br />
        Using LangRec, you can get targeted recommendations based on your
        learning style, language goals and current level.
      </p>

      <h2 className="about">Get Started</h2>
      <p className="about">
        Head to the "Get Recommendations" page to select your desired language,
        the type of content you prefer, level of learning, and cost options and
        get started finding material! Happy learning!
      </p>
      <br />
      <div className="button_row">
        <Link className="start_search_btn" to="/recs">
          START SEARCHING
        </Link>
      </div>
    </main>
  );
}

export default HomePage;
