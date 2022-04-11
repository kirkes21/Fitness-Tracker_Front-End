import React, { useState, useEffect } from "react";
import { getActivities } from "../api";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const activitiesFromApi = await getActivities();
      setActivities(activitiesFromApi);
    };

    fetchActivities();
  }, []);

  return (
    <div>
      {activities.map((activity) => {
        return (
          <div key={activity.id}>
            <h3>{activity.id} </h3>
            <h3>{activity.name}</h3>
            <h4>{activity.description}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default Activities;
