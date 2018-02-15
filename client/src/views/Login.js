import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
        <h2>Login Page</h2>

        <form action="/login" method="post" encType="application/x-www-form-urlencoded">
          <label id="lblUsername">Username</label>
          <input type="text" name="username" id="username" />

          <label id="lblPassword">Password</label>
          <input type="password" name="password" id="password" />

          <input type="submit" value="Login"></input>
        </form>
      </div>
    );
  }
}

export default Login;
