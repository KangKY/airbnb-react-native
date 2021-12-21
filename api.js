import axios from "axios";

const callApi = async (method, path, data, jwt) => {
  const headers = {
    Authorization : jwt,
    "Content-Type": "application/json"
  };

  //const baseUrl = "http://127.0.0.1:8000/api/v1";
  const baseUrl = "http://3337-121-165-242-209.ngrok.io/api/v1";
  const fullUrl = `${baseUrl}${path}`;

  if (method === "get" || method === "delete") {
    return axios[method](fullUrl, { headers })
  } else {
    return axios[method](fullUrl, data, { headers })
  }
};

export default {
  createAccount : form => callApi("post", "/users/", form),
  login : form => callApi("post","/users/login/", form)
}