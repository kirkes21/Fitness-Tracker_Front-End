import React, { useState } from "react";

import {
  updateRoutine,
  deleteRoutine,
  getMyRoutines,
  addActivityToRoutine,
} from "../api";

export const RoutineCard = ({
  routine,
  token,
  myRoutines,
  setMyRoutines,
  activityList,
  setActivityList,
}) => {
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleActivity, setToggleActivity] = useState(false);
  const [updateNameState, setUpdateNameState] = useState("");
  const [updateGoalState, setUpdateGoalState] = useState("");
  const [updateCountState, setUpdateCountState] = useState("");
  const [updateDurationState, setUpdateDurationState] = useState("");
  const [activity, setActivity] = useState("any");

  const [activityFormState, setActivityFormState] = useState({
    count: "",
    duration: "",
  });

  return (
    <div key={routine.id}>
      <h3>Name: {routine.name} </h3>
      <h5>Goal: {routine.goal}</h5>

      {routine.activities
        ? routine.activities.map((activity) => {
            return (
              <div key={activity.id}>
                <h3>Activity Name: {activity.name}</h3>
                <h6>Description: {activity.description}</h6>
                <h6>Duration: {activity.duration}</h6>
                <h6>Count: {activity.count}</h6>
              </div>
            );
          })
        : null}
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

            const mappedRoutines = myRoutines.map((routine) => {
              if (routine.id === result.id) {
                return result;
              } else {
                return routine;
              }
            });
            setMyRoutines(mappedRoutines);
            console.log("testing", result);
          }}
        >
          <input
            type="text"
            placeholder="update routine name"
            value={updateNameState.name ?? ""}
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
            value={updateGoalState.goal ?? ""}
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
      <button
        onClick={() => {
          deleteRoutine(token, routine.id);
          const filteredRoutines = myRoutines.filter((elem) => {
            if (elem.id !== routine.id) {
              return true;
            } else {
              return false;
            }
          });
          setMyRoutines(filteredRoutines);
        }}
      >
        Delete Routine
      </button>

      <button
        onClick={() =>
          toggleActivity ? setToggleActivity(false) : setToggleActivity(true)
        }
      >
        Attach Activity
      </button>

      {toggleActivity ? (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const result = await addActivityToRoutine(
              token,
              activity.id,
              routine.id,
              updateCountState.count,
              updateDurationState.duration
            );
            console.log("RESULT:", result);
          }}
        >
          <label htmlFor="select-activity">
            Activity{" "}
            <span className="activity-count">({activityList.length})</span>
          </label>
          <select
            name="activity"
            id="select-activity"
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
          >
            <option value="any">Any</option>
            {activityList.map((activity, idx) => (
              <option key={`${idx}:${activity.name}`} value={activity.name}>
                {activity.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="count"
            value={updateCountState.count ?? ""}
            onChange={(event) =>
              setUpdateCountState({
                ...updateCountState,
                count: event.target.value,
              })
            }
            required
          ></input>
          <input
            type="text"
            placeholder="duration"
            value={updateDurationState.duration ?? ""}
            onChange={(event) =>
              setUpdateDurationState({
                ...updateDurationState,
                duration: event.target.value,
              })
            }
            required
          ></input>
          <button type="submit">Submit</button>
        </form>
      ) : null}
    </div>
  );
};
