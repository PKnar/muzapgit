import React, { Component } from "react";
import "../stylesheets/login.css";
import cover from "../media-files/artist-signup-cover.jpg";
import logo from "../media-files/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";

class Loginpage extends Component {
  state = {
    email: "",
    password: "",
    isValidEmail: true,
    error: "",
  };

  handleEmailInput = () => {
    this.setState({ email: this.emailField.value });
  };

  handlePasswordInput = () => {
    this.setState({ password: this.passwordField.value });
  };

  handleLogin = async (e) => {
    e.preventDefault();

    let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let { email, password, isValidEmail } = this.state;
    if (email && password) {
      let validEmail = emailRegex.test(email.toLowerCase());
      if (!validEmail) {
        this.setState({ isValidEmail: false });
      } else {
        this.setState({ isValidEmail: true });

        let res = await axios.post(`/api/artists/login`, {
          email,
          password,
        });

        if (res.data.error) {
          this.setState({ error: res.data.error });
        } else {
          localStorage.setItem("user", JSON.stringify(res.data));
          this.props.history.push(`/profile/${res.data.id}`);
          this.props.updateStateProp(res.data);
        }
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="login-wrapper">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div
            className="login-cover"
            style={{
              backgroundImage: `
          linear-gradient(to bottom, transparent, black),
          url(${cover})`,
            }}
          ></div>

          <div className="form-wrapper">
            <h2>WELCOME BACK! </h2>
            <p>Login to your account</p>
            {this.state.error && <p id="error-message">{this.state.error}</p>}
            <form>
              <div className="input-field">
                <i class="fa fa-envelope"></i>
                <input
                  type="text"
                  placeholder="Email"
                  required
                  ref={(el) => (this.emailField = el)}
                  onChange={(e) => this.handleEmailInput()}
                />
                {!this.state.isValidEmail && (
                  <p id="email-error">Please enter valid email</p>
                )}
              </div>

              <div className="input-field">
                <i class="fa fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  ref={(el) => (this.passwordField = el)}
                  onChange={(e) => this.handlePasswordInput()}
                />
              </div>

              <button onClick={(e) => this.handleLogin(e)}>Login</button>
              <hr />
              <p id="message">
                New user? <Link to="/signup">Register here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Loginpage;
