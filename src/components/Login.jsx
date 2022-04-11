import React, { useState } from "react";
import { loginUser } from "../api";
import { useHistory } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  return (
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const result = await loginUser(username, password);

          localStorage.setItem("token", result.token);
          setToken(result.token);

          history.push("/");
        }}
      >
        <input
          value={username}
          type="text"
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          required
        />
        <input
          value={password}
          type="text"
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
