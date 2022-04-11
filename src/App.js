import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Register, Routines, Navbar, MyRoutines, Home, Login, Activities } from './components'

function App() {
  const [token, setToken] = useState("");
  const [myUser, setMyUser] = useState({});
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const displayPosts = async () => {
  //     const data = await fetchPosts(token);
  //     setPosts(data);
  //   };
  //   displayPosts();
  // }, [token]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken) {
      setToken(localStorageToken);
      console.log("currentToken from localStorage", token);
    }
  }, [token]);

  // useEffect(() => {
  //   const getMyUserFunction = async () => {
  //     if (token) {
  //       const result = await myUserInfo(token);
  //       setMyUser({
  //         messages: result.data.messages,
  //         username: result.data.username,
  //         _id: result.data._id,
  //       });
  //     }
  //   };
  //   getMyUserFunction();
  // }, [token]);

  return (
    <Router>
      <div className="main_container">
        <Navbar token={token} setToken={setToken} setMyUser={setMyUser} />
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
            <Routines token={token}
            // setPosts={setPosts}
            // posts={posts}
            />
          </Route>

          <Route path="/myroutines">
            <MyRoutines
              setToken={setToken}
              token={token}
            // myUser={myUser}
            // setMyUser={setMyUser}
            />
          </Route>
          <Route path="/activities">
            <Activities
              token={token}
            // posts={posts}
            // setPosts={setPosts}
            // myUser={myUser}
            // setMyUser={setMyUser}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App
