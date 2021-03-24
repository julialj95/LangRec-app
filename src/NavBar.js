import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul className="navbar">
        <Link to="/">Home</Link>
        <Link to="/recs">Get Recommendations</Link>
        <Link to="/share">Submit Resources</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        <Link to="/mypage">My Saved Resources</Link>
      </ul>
    </nav>
  );
}

export default NavBar;
