import React, { useState, useEffect } from "react";
import {
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getMyRoutines,
} from "../api";

import { RoutineCard } from "./RoutineCard";

const MyRoutines = ({ token, myUser, setMyUser }) => {
  // Create, update (owned), delete (owned)
  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: true,
  });
  // const [toggleUpdate, setToggleUpdate] = useState(false);
  // const [updateNameState, setUpdateNameState] = useState("");
  // const [updateGoalState, setUpdateGoalState] = useState("");
  const [myRoutines, setMyRoutines] = useState([]);

  useEffect(() => {
    const myRoutines = async () => {
      const data = await getMyRoutines(token, myUser.username);
      setMyRoutines(data);
    };
    if (myUser.username) {
      myRoutines();
    }
  }, [token, myUser, myRoutines]);

  return (
    <div>
      <h2>My Routines</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await createRoutine(token, formState);
          // setRoutines state?

          console.log(result);
        }}
      >
        <input
          type="text"
          placeholder="routine name"
          value={formState.name}
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
          required
        ></input>
        <input
          type="text"
          placeholder="your goal"
          value={formState.goal}
          onChange={(event) =>
            setFormState({ ...formState, goal: event.target.value })
          }
          required
        ></input>
        <button type="submit">Submit</button>
      </form>
      <div>
        {myRoutines.length
          ? myRoutines.map((routine) => {
              return (
                <RoutineCard routine={routine} token={token} key={routine.id} />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MyRoutines;
