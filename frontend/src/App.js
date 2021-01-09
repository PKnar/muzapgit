import "./App.css";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import { Switch, Route, withRouter } from "react-router-dom";
import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import Contactpage from "./pages/Contactpage";
import Aboutpage from "./pages/Aboutpage";
import Artistpage from "./pages/Artistpage";
import ArtistProfile from "./pages/ArtistProfile";
import Nav from "./components/Nav";
const App = withRouter(({ location }) => {
  let loggedUser = JSON.parse(localStorage.getItem("user")) || {};
  let [user, setUser] = useState(loggedUser);

  const updateState = (user) => {
    setUser(user);
  };

  return (
    <div className="App">
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Nav user={user} updateStateProp={updateState} />
      )}
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route
          path="/signup"
          component={(props) => (
            <Signuppage updateStateProp={updateState} {...props} />
          )}
        ></Route>
        <Route
          path="/login"
          component={(props) => (
            <Loginpage updateStateProp={updateState} {...props} />
          )}
        />

        <Route exact path="/contact">
          <Contactpage />
        </Route>
        <Route exact path="/about">
          <Aboutpage />
        </Route>
        <Route path="/artist/:id" component={Artistpage} />
        <Route
          path="/profile/:id"
          component={(props) => <ArtistProfile {...props} user={user} />}
        />
      </Switch>
    </div>
  );
});

export default App;
