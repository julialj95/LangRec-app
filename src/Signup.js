import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import config from "./config";
import { LangrecContext } from "./LangrecContext";

class SignUp extends Component {
  static contextType = LangrecContext;
  constructor(props) {
    super();
    this.state = {
      username: "",
      password: "",
      error: false,
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
        Authorization: "Bearer " + config.API_KEY,
      },
    })
      // .then((response) => {
      //   if (!response.ok) {
      //     return response.json().then((event) => Promise.reject(event));
      //   }
      //   return response.json();
      // })
      .then(() => this.props.history.push("/login"))
      .catch((error) => console.error({ error }));
  };

  render() {
    return (
      <div>
        <h2>Sign Up</h2>
        <h3>Create an account to save resources that look interesting!</h3>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <br />
          <label htmlFor="password">
            password
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <br />
          <button type="submit">Create Account</button>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp);
