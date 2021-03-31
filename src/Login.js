import React from "react";
import { withRouter } from "react-router-dom";
import AuthorizationApiService from "./services/authorization-api-service";
import TokenService from "./services/token-service";
import { LangrecContext } from "./LangrecContext";

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
        this.context.handleLoginChange();
        this.props.history.push("/saved-resources");
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    return (
      <div>
        <h2>Log in to access your previously saved resources</h2>
        <form onSubmit={this.handleSubmitJwtAuth}>
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <br />
          <label htmlFor="password">
            password
            <input
              type="text"
              name="password"
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <br />
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
