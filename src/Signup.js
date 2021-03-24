import React from "react";

function SignUp() {
  return (
    <div>
      <h2>Sign Up</h2>
      <h3>Create an account to save resources that look interesting!</h3>
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
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignUp;
