import React, { useState, useEffect } from "react";
import {
  createRoutine,
  updateRoutine,
  deleteRoutine,
  getMyRoutines,
} from "../api";

const MyRoutines = ({ token, myUser, setMyUser }) => {
  // Create, update (owned), delete (owned)
  const [formState, setFormState] = useState({
    name: "",
    goal: "",
    isPublic: true,
  });
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [updateNameState, setUpdateNameState] = useState("");
  const [updateGoalState, setUpdateGoalState] = useState("");
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
                      toggleUpdate
                        ? setToggleUpdate(false)
                        : setToggleUpdate(true)
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
                          routine.name,
                          routine.goal
                        );

                        // console.log(result);
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
                        required
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
            })
          : null}
      </div>
    </div>
  );
};

export default MyRoutines;
