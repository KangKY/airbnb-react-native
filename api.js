import axios from "axios";

const callApi = async(method, path, data, jwt) => {
  const headers = {
    Authorization : jwt,
    "Content-Type": "application/json"
  };

  const baseUrl = "http://127.0.0.1:8000/api/v1";
  const fullUrl = `${baseUrl}${path}`;

  if (method === "get" || method === "delete") {
    axios[method](fullUrl, { headers })
  } else {
    axios[method](fullUrl, { headers })
  }
};

export const createAccount = form => callApi("post", "/users/", form)