import React, { Component } from "react";
//import "../stylesheets/login.css";
import cover from "../media-files/artist-signup-cover.jpg";
import logo from "../media-files/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import countries from "../countries.js";

class Signuppage extends Component {
  state = {
    email: "",
    password: "",
    isValidEmail: true,
    error: "",
    country: "",
    city: "",
    username: "",
    createdUser: "",
  };

  getGeoCode = async (country, city) => {
    let res = await axios.get(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_GEOCODE_KEY}&city=${city}&country=${country}`
    );

    let data = res.data.results[0].locations[0].displayLatLng;
    return data;
  };

  handleEmailInput = () => {
    this.setState({ email: this.emailField.value });
  };

  handlePasswordInput = () => {
    this.setState({ password: this.passwordField.value });
  };

  handleRegister = async (e) => {
    e.preventDefault();

    let emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let {
      email,
      password,
      isValidEmail,
      country,
      city,
      file,
      username,
    } = this.state;

    if (email && password && country && city && username) {
      this.setState({ error: null });
      let validEmail = emailRegex.test(email.toLowerCase());
      if (!validEmail) {
        this.setState({ isValidEmail: false });
      } else {
        this.setState({ isValidEmail: true });

        let location = await this.getGeoCode(country, city);
        let latitude = location.lat;
        let longitude = location.lng;

        let res = await axios.post("/api/artists/register", {
          username,
          email,
          password,
          latitude,
          longitude,
        });

        if (res.data.error) {
          this.setState({ error: res.data.error });
        } else {
          localStorage.setItem("user", JSON.stringify(res.data));
          this.props.history.push(`/profile/${res.data.id}`);
          this.props.updateStateProp(res.data);
        }

        console.log("sending data to back end");
      }
    } else {
      this.setState({ error: "Please fill in all fields" });
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
            <h2>Register </h2>
            <div className="input-field"></div>
            {this.state.error && <p id="error-message">{this.state.error}</p>}
            <form>
              <i class="fa fa-user"></i>
              <input
                onChange={(e) => this.setState({ username: e.target.value })}
                required
                type="text"
                placeholder="Enter you artists name"
              />
              <div className="input-field">
                <i class="fa fa-envelope"></i>
                <input
                  type="text"
                  placeholder="Email"
                  //required
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

              <div className="input-field">
                <i class="fa fa-globe"></i>
                <label for="country">Choose a country:</label>
                <select
                  name="country"
                  id="country"
                  onChange={(e) => this.setState({ country: e.target.value })}
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  {countries.map(({ name }) => {
                    return <option value={name}>{name}</option>;
                  })}
                </select>
              </div>

              <div className="input-field">
                <i class="fa fa-map"></i>
                <input
                  onChange={(e) => this.setState({ city: e.target.value })}
                  required
                  type="text"
                  placeholder="Enter your city"
                />
              </div>
              {/* <div className="input-field">
                <i class="fa fa-music"></i>
                <input
                  required
                  onChange={(e) => this.setState({ file: e.target.value })}
                  id="file"
                  type="file"
                  name="file"
                  accept=".mp3"
                />
              </div> */}

              <button onClick={(e) => this.handleRegister(e)}>Submit</button>
              <hr />
              <p id="message">
                Have an account? <Link to="/login">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signuppage;
