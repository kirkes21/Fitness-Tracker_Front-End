import React, { useState, useEffect } from "react";
import { createRoutine, getActivities, getMyRoutines } from "../api";

import { RoutineCard } from "./RoutineCard";

const MyRoutines = ({ token, myUser, setMyUser }) => {
  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: true,
  });
  const [activityList, setActivityList] = useState([]);
  const [routineExists, setRoutineExists] = useState(false);

  const [myRoutines, setMyRoutines] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const myRoutinesData = async () => {
      const data = await getMyRoutines(token, myUser.username);
      const activityData = await getActivities();
      setActivityList(activityData);
      setMyRoutines(data);
    };
    if (myUser.username) {
      myRoutinesData();
    }
  }, [token, myUser, update]);

  async function routineFun(routine) {
    if (formState.name === "" || routine.name === "") {
      alert("Invalid input!");
    }

    if (routine.name === formState.name) {
      setRoutineExists(true);
      alert("Routine name already exists!");
    } else {
      const result = await createRoutine(token, formState);
      setMyRoutines([...myRoutines, result]);
      setRoutineExists(false);
    }
  }

  return (
    <div>
      <h2>My Routines</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          myRoutines.map((routine) => {
            routineFun(routine);
            return null;
          });
        }}
      >
        <input
          type="text"
          placeholder="routine name"
          value={formState.name ?? ""}
          onChange={(event) =>
            setFormState({ ...formState, name: event.target.value })
          }
          required
        ></input>
        <input
          type="text"
          placeholder="your goal"
          value={formState.goal ?? ""}
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
                <RoutineCard
                  myRoutines={myRoutines}
                  setMyRoutines={setMyRoutines}
                  routine={routine}
                  token={token}
                  key={routine.id}
                  activityList={activityList}
                  setActivityList={setActivityList}
                  setUpdate={setUpdate}
                  update={update}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MyRoutines;
