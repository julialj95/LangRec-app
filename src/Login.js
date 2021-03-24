import React from "react";

function Login() {
  return (
    <div>
      <h2>Log in to access your previously saved resources</h2>
      <form>
        <label htmlFor="username">
          Username
          <input type="text" name="username" />
        </label>
        <br />
        <label htmlFor="password">
          password
          <input type="text" name="password" />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
