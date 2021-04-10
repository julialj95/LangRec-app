import React from "react";
import { withRouter } from "react-router-dom";
import AuthorizationApiService from "../services/authorization-api-service";
import TokenService from "../services/token-service";
import { LangrecContext } from "../LangrecContext";
import "./Login.css";

class Login extends React.Component {
  static contextType = LangrecContext;
  constructor(props) {
    super(props);
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

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    const { username, password } = e.target;

    AuthorizationApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = "";
        password.value = "";
        TokenService.saveAuthToken(res.authToken);
        this.context.handleLoginChange(true);
        this.props.history.push("/saved-resources");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div>
        <h2>LOG IN</h2>
        <form className="login_form" onSubmit={this.handleSubmitJwtAuth}>
          <input
            className="login_field"
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={(e) => this.handleChange(e)}
          />

          <br />

          <input
            className="login_field"
            type="text"
            name="password"
            placeholder="Enter password"
            onChange={(e) => this.handleChange(e)}
          />

          <br />
          <button type="submit">Log In</button>
        </form>
        {this.state.error ? (
          <h3>Incorrect username or password. Please try again.</h3>
        ) : null}
      </div>
    );
  }
}

export default withRouter(Login);
