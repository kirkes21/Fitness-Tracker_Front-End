import React, { useState } from "react";

import { updateRoutine, deleteRoutine, addActivityToRoutine } from "../api";
import ActivityCard from "./ActivityCard";

export const RoutineCard = ({
  routine,
  token,
  myRoutines,
  setMyRoutines,
  activityList,
  setActivityList,
  setUpdate,
  update,
}) => {
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [toggleActivity, setToggleActivity] = useState(false);
  const [updateNameState, setUpdateNameState] = useState("");
  const [updateGoalState, setUpdateGoalState] = useState("");
  const [updateCountState, setUpdateCountState] = useState("");
  const [updateDurationState, setUpdateDurationState] = useState("");
  const [activityState, setActivityState] = useState();

  return (
    <div key={routine.id}>
      <h3>Name: {routine.name}</h3>
      <h5>Goal: {routine.goal}</h5>

      {routine.activities
        ? routine.activities.map((activity) => {
            return (
              <ActivityCard
                myRoutines={myRoutines}
                setMyRoutines={setMyRoutines}
                routine={routine}
                token={token}
                key={routine.id}
                activityList={activityList}
                setActivityList={setActivityList}
                setUpdate={setUpdate}
                update={update}
                activity={activity}
              />
            );
          })
        : null}
      <button
        onClick={() =>
          toggleUpdate ? setToggleUpdate(false) : setToggleUpdate(true)
        }
      >
        Update Routine
      </button>

      {toggleUpdate ? (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await updateRoutine(
              token,
              routine.id,
              updateNameState,
              updateGoalState
            );

            setUpdate(!update);
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
            await addActivityToRoutine(
              token,
              activityState,
              routine.id,
              updateCountState,
              updateDurationState
            );

            setUpdate(!update);
          }}
        >
          <label htmlFor="select-activity">
            Activity{" "}
            <span className="activity-count">({activityList.length})</span>
          </label>
          <select
            name="activity"
            id="select-activity"
            value={activityState}
            onChange={(event) => setActivityState(event.target.value)}
          >
            <option value="any">Any</option>
            {activityList.map((activity, idx) => (
              <option key={`${idx}:${activity.name}`} value={activity.id}>
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
