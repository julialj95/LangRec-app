import React, { Component } from "react";
import TokenService from "./services/token-service";
import { Link } from "react-router-dom";
import { LangrecContext } from "./LangrecContext";

class NavBar extends Component {
  static contextType = LangrecContext;
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.handleLoginChange();
  };

  renderLoggedInDisplay() {
    return (
      <>
        <Link to="/saved-resources">My Saved Resources</Link>
        <Link to="/share">Submit Resources</Link>
        <Link to="/" onClick={this.handleLogoutClick}>
          Logout
        </Link>
      </>
    );
  }

  renderLoggedOutDisplay() {
    return (
      <>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
      </>
    );
  }

  render() {
    return (
      <nav>
        <ul className="navbar">
          <Link to="/">Home</Link>
          <Link to="/recs">Get Recommendations</Link>
          {TokenService.hasAuthToken()
            ? this.renderLoggedInDisplay()
            : this.renderLoggedOutDisplay()}
        </ul>
      </nav>
    );
  }
}

export default NavBar;
