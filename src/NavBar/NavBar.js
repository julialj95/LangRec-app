import React, { Component } from "react";
import TokenService from "../services/token-service";
import { Link } from "react-router-dom";
import { LangrecContext } from "../LangrecContext";
import "./NavBar.css";

class NavBar extends Component {
  static contextType = LangrecContext;
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.handleLoginChange(false);
    this.context.handleRecommendedResources([]);
  };

  renderLoggedInDisplay() {
    return (
      <>
        <Link to="/saved-resources">MY SAVED RESOURCES</Link>
        {/* <Link to="/share">Submit Resources</Link> */}
        <Link to="/" onClick={this.handleLogoutClick}>
          LOGOUT
        </Link>
      </>
    );
  }

  renderLoggedOutDisplay() {
    return (
      <>
        <Link to="/signup">SIGN UP</Link>
        <Link to="/login">LOG IN</Link>
      </>
    );
  }

  render() {
    return (
      <nav>
        <ul className="navbar">
          <Link to="/">HOME</Link>
          <Link to="/recs">GET RECOMMENDATIONS</Link>
          {this.context.isLoggedIn
            ? this.renderLoggedInDisplay()
            : this.renderLoggedOutDisplay()}
        </ul>
      </nav>
    );
  }
}

export default NavBar;
