import React, { useState } from "react";

import { updateCD, deleteActivity } from "../api";

const ActivityCard = ({ token, setUpdate, update, activity }) => {
  const [toggleCDUpdate, setToggleCDUpdate] = useState(false);
  const [updateC, setUpdateC] = useState("");
  const [updateD, setUpdateD] = useState("");
  return (
    <div key={activity.id}>
      <h3>Activity Name: {activity.name}</h3>
      <h6>Description: {activity.description}</h6>
      <h6>Duration: {activity.duration}</h6>
      <h6>Count: {activity.count}</h6>
      <button
        onClick={() => {
          deleteActivity(token, activity.routineActivityId);
          setUpdate(!update);
        }}
      >
        Delete Activity
      </button>
      <button
        onClick={() =>
          toggleCDUpdate ? setToggleCDUpdate(false) : setToggleCDUpdate(true)
        }
      >
        Update Count/Duration
      </button>

      {toggleCDUpdate ? (
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            await updateCD(token, activity.routineActivityId, updateC, updateD);
            console.log("Checking", activity.routineActivityId);
            setUpdate(!update);
          }}
        >
          <input
            type="text"
            placeholder="update count"
            value={updateC.count ?? ""}
            onChange={(event) =>
              setUpdateC({
                ...updateC,
                count: event.target.value,
              })
            }
          ></input>
          <input
            type="text"
            placeholder="update duration"
            value={updateD.duration ?? ""}
            onChange={(event) =>
              setUpdateD({
                ...updateD,
                duration: event.target.value,
              })
            }
          ></input>
          <button type="submit">Submit</button>
        </form>
      ) : null}
    </div>
  );
};

export default ActivityCard;
