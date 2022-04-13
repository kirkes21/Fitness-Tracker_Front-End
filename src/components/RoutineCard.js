import React, { useState } from "react";

import { updateRoutine, deleteRoutine } from "../api";

export const RoutineCard = ({ routine, token }) => {
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [updateNameState, setUpdateNameState] = useState("");
  const [updateGoalState, setUpdateGoalState] = useState("");
  return (
    <div key={routine.id}>
      <h3>Name: {routine.name} </h3>
      <h5>Goal: {routine.goal}</h5>
      <h6>Creator: {routine.creatorName}</h6>

      {routine.activities.map((activity) => {
        return (
          <div key={activity.id}>
            <h3>Activity Name: {activity.name}</h3>
            <h6>Description: {activity.description}</h6>
            <h6>Duration: {activity.duration}</h6>
            <h6>Count: {activity.count}</h6>
          </div>
        );
      })}
      <button
        onClick={() =>
          toggleUpdate ? setToggleUpdate(false) : setToggleUpdate(true)
        }
      >
        Update Post
      </button>

      {toggleUpdate ? (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await updateRoutine(
              token,
              routine.id,
              updateNameState,
              updateGoalState
            );

            console.log("testing", result);
          }}
        >
          <input
            type="text"
            placeholder="update routine name"
            value={updateNameState.name}
            onChange={(event) =>
              setUpdateNameState({
                ...updateNameState,
                name: event.target.value,
              })
            }
          ></input>
          <input
            type="text"
            placeholder="update your goal"
            value={updateGoalState.goal}
            onChange={(event) =>
              setUpdateGoalState({
                ...updateGoalState,
                goal: event.target.value,
              })
            }
            required
          ></input>
          <button type="submit">Submit</button>
        </form>
      ) : null}
      <button onClick={() => deleteRoutine(token, routine.id)}>
        Delete Post
      </button>
    </div>
  );
};
