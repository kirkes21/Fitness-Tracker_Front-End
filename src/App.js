import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Register,
  Routines,
  Navbar,
  MyRoutines,
  Home,
  Login,
  Activities,
} from "./components";
import { myUserInfo } from "./api";

function App() {
  const [token, setToken] = useState("");
  const [myUser, setMyUser] = useState({});

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
      console.log("currentToken from localStorage", token);
    }
  }, [token]);

  useEffect(() => {
    const getMyUser = async () => {
      if (token) {
        const result = await myUserInfo(token);
        setMyUser({
          id: result.id,
          username: result.username,
        });
      }
    };
    getMyUser();
  }, [token]);

  return (
    <Router>
      <div className="main_container">
        <Navbar token={token} setToken={setToken} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login setToken={setToken} token={token} />
          </Route>
          <Route path="/register">
            <Register setToken={setToken} token={token} />
          </Route>
          <Route path="/routines">
            <Routines token={token} />
          </Route>

          <Route path="/myroutines">
            <MyRoutines token={token} myUser={myUser} setMyUser={setMyUser} />
          </Route>
          <Route path="/activities">
            <Activities
              token={token}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
