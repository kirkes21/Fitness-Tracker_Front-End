import React, { useState, useEffect } from "react";
import { getRoutines } from "../api";

const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const fetchRoutines = async () => {
      const routinesFromApi = await getRoutines();
      setRoutines(routinesFromApi);
    };

    fetchRoutines();
  }, []);

  return (
    <div>
      {routines.map((routine) => {
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
          </div>
        );
      })}
    </div>
  );
};

export default Routines;
