// You can choose to import all your functions, and re-export them here

export const baseURL = "https://fitnesstrac-kr.herokuapp.com/api";

export const registerUser = async (username, password) => {
  const response = await fetch(`${baseURL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${baseURL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const getActivities = async () => {
  const response = await fetch(`${baseURL}/activities`);
  const result = await response.json();

  return result;
};

export const getRoutines = async () => {
  const response = await fetch(`${baseURL}/routines`);
  const result = await response.json();

  return result;
};

export const createRoutine = async (token, formState) => {
  const response = await fetch(`${baseURL}/routines`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: formState.name,
      goal: formState.goal,
      isPublic: formState.isPublic,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateRoutine = async (
  token,
  routineId,
  updateNameState,
  updateGoalState
) => {
  const response = await fetch(`${baseURL}/routines/${routineId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: updateNameState.name,
      goal: updateGoalState.goal,
    }),
  });
  console.log(response);
  const data = await response.json();
  return data;
};

export const deleteRoutine = async (token, routineId) => {
  const response = await fetch(`${baseURL}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getMyRoutines = async (token, username) => {
  const response = await fetch(`${baseURL}/users/${username}/routines`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const myUserInfo = async (token) => {
  const response = await fetch(`${baseURL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

export const addActivityToRoutine = async (
  token,
  activityId,
  routineId,
  updateCountState,
  updateDurationState
) => {
  console.log(updateCountState, updateDurationState);
  const response = await fetch(`${baseURL}/routines/${routineId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      activityId,
      count: updateCountState.count,
      duration: updateDurationState.duration,
    }),
  });
  const data = await response.json();

  return data;
};

export const createActivity = async (token, formState) => {
  const response = await fetch(`${baseURL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: formState.name,
      description: formState.description,
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteActivity = async (token, routineActivityId) => {
  const response = await fetch(
    `${baseURL}/routine_activities/${routineActivityId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return data;
};

export const updateCD = async (token, routineActivityId, updateC, updateD) => {
  const response = await fetch(
    `${baseURL}/routine_activities/${routineActivityId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        count: updateC.count,
        duration: updateD.duration,
      }),
    }
  );
  const data = await response.json();
  return data;
};
