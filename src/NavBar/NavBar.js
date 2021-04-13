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
    this.context.handleSavedResourcesOnLogout();
  };

  renderLoggedInDisplay() {
    return (
      <>
        <Link className="navlink" to="/saved-resources">
          MY SAVED RESOURCES
        </Link>
        <Link className="navlink" to="/" onClick={this.handleLogoutClick}>
          LOGOUT
        </Link>
      </>
    );
  }

  renderLoggedOutDisplay() {
    return (
      <>
        <Link className="navlink" to="/signup">
          SIGN UP
        </Link>
        <Link className="navlink" to="/login">
          LOG IN
        </Link>
        <Link className="navlink" to="/demo">
          DEMO
        </Link>
      </>
    );
  }

  render() {
    return (
      <nav>
        <ul className="navbar">
          <Link className="navlink" to="/">
            HOME
          </Link>
          <Link className="navlink" to="/recs">
            GET RECOMMENDATIONS
          </Link>
          {this.context.isLoggedIn
            ? this.renderLoggedInDisplay()
            : this.renderLoggedOutDisplay()}
        </ul>
      </nav>
    );
  }
}

export default NavBar;
