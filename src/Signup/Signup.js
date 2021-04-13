import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TokenService from "../services/token-service";
import config from "../config";
import { LangrecContext } from "../LangrecContext";
import "./Signup.css";

class SignUp extends Component {
  static contextType = LangrecContext;
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    fetch(`${config.API_BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + TokenService.getAuthToken(),
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })

      .then(() => this.props.history.push("/login"))
      .catch((error) => this.setState({ error }));
  };

  render() {
    const errorMessage = this.state.error.error;
    return (
      <div>
        <h1>SIGN UP</h1>
        <h2 className="signup_instructions">
          Create an account to save resources to your favorites list!
        </h2>
        <form className="signup_form" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            className="signup_field"
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Create a username..."
            onChange={(e) => this.handleChange(e)}
          />

          <br />

          <input
            className="signup_field"
            type="text"
            name="password"
            value={this.state.password}
            placeholder="Create a password..."
            onChange={(e) => this.handleChange(e)}
          />

          <br />
          <button className="signup_btn" type="submit">
            Create Account
          </button>
        </form>
        {this.state.error ? <h3>{errorMessage}</h3> : null}
      </div>
    );
  }
}

export default withRouter(SignUp);
