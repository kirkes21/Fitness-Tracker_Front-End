import React from "react";
import { Link, useHistory } from "react-router-dom";
import { setMyUser } from "../App";

const Navbar = ({ setToken, token, setMyUser }) => {
  const handleLogOut = () => {
    setToken("");
    localStorage.clear();
    setMyUser({});
  };

  let history = useHistory();

  return (
    <div id="navBar" className="nav_bar_container">
      <div className="link_container">
        <div>
          <Link to={"/"} className="nav_item">
            Home
          </Link>
          <Link to={"/routines"} className="nav_item">
            Routines
          </Link>
          <Link to={"/myroutines"} className="nav_item">
            My Routines
          </Link>
          <Link to={"/activities"} className="nav_item">
            Activities
          </Link>
          {token ? null : (
            <>
              <Link to={"/login"} className="nav_item">
                Log In
              </Link>
              <Link to={"/register"} className="nav_item">
                Register
              </Link>
            </>
          )}

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              handleLogOut();
              history.push("/");
            }}
          >
            <button type="submit">Log Out</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
