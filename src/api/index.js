// You can choose to import all your functions, and re-export them here

export const baseURL = "https://fitnesstrac-kr.herokuapp.com/api"

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

