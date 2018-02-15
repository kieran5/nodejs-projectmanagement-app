import React, { Component } from 'react';

class Register extends Component {
  render() {
    return (
      <body>
        <div>
          <h2>Register Page</h2>

          <form action="/register" method="post" encType="application/x-www-form-urlencoded">
            <label id="lblUsername">Username</label>
            <input type="text" name="username" id="username" />

            <label id="lblPassword">Password</label>
            <input type="password" name="password" id="password" />

            <label id="lblPasswordConf">Confirm Password</label>
            <input type="password" name="passwordConf" id="passwordConf" />

            <input type="submit" value="Submit"></input>
          </form>
        </div>
      </body>
    );
  }
}

export default Register;
