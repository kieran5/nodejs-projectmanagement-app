import React, { Component } from 'react';
import { TextField } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from "material-ui/RaisedButton";

// Validation help: https://www.youtube.com/watch?v=_Dq8QnQtx5Y&t=152s

class Register extends Component {
  state = {
    username: "",
    usernameError: "",
    passowrd: "",
    passwordError: "",
    passwordConf: "",
    passwordConfError: ""
  };

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validate = () => {
    let error = false;
    const errors = {
      usernameError: "",
      passwordError: "",
      passwordConfError: ""
    };

    if(this.state.username.length < 4) {
      error = true;
      errors.usernameError = "Username must be longer than 3 characters.";
    }


    this.setState({
      ...this.state,
      ...errors
    });

    return error;
  };

  onSubmit = (e) => {
    const err = this.validate();

    if(!err) {
      console.log("No errors!");
    } else {
      e.preventDefault();
      console.log(this.state.usernameError);
      console.log(this.state.passwordError);
      console.log(this.state.passwordConfError);
    }
  }

  render() {
    /*return (
      <body>
        <div>
          <h2>Register Page</h2>

          <form action="/register" method="post" encType="application/x-www-form-urlencoded">
            <label id="lblUsername">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              class="form-control"
              value={this.state.username}
              onChange={e => this.change(e)}
              errorText={this.state.usernameError}
            />

            <label id="lblPassword">Password</label>
            <input
              type="password"
               name="password"
               id="password"
               class="form-control"
            />

            <label id="lblPasswordConf">Confirm Password</label>
            <input
              type="password"
              name="passwordConf"
              id="passwordConf"
              class="form-control"
            />

            <input type="submit" value="Submit" class="form-control" onClick={e => this.onSubmit(e)}></input>
          </form>
        </div>
      </body>
    );*/

    return (
      <div>
        <h2>Register Page</h2>
        <MuiThemeProvider>
          <form action="/register" method="post" encType="application/x-www-form-urlencoded">
          <TextField
            type="text"
            name="username"
            hintText="First name"
            floatingLabelText="First name"
            value={this.state.username}
            onChange={e => this.change(e)}
            errorText={this.state.usernameError}
            floatingLabelFixed
          />

          <TextField
            type="password"
            name="password"
            hintText="Password"
            floatingLabelText="Password"
            value={this.state.password}
            onChange={e => this.change(e)}
            errorText={this.state.passwordError}
            floatingLabelFixed
          />

          <TextField
            type="password"
            name="passwordConf"
            hintText="Confirm Password"
            floatingLabelText="Confirm Pasword"
            value={this.state.passwordConf}
            onChange={e => this.change(e)}
            errorText={this.state.passwordConfError}
            floatingLabelFixed
          />

          <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />

          </form>
        </MuiThemeProvider>
      </div>

    );

  }
}

export default Register;
