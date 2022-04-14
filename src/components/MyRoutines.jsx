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

  const [myRoutines, setMyRoutines] = useState([]);

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
  }, [token, myUser]);

  return (
    <div>
      <h2>My Routines</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await createRoutine(token, formState);
          setMyRoutines([...myRoutines, result]);
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
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MyRoutines;
