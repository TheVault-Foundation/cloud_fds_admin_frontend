import axios from "axios";

import LogInterceptor from "./interceptors/log";
import AccessTokenInterceptor from "./interceptors/accessToken";
import UnauthorizeInterceptor from "./interceptors/unauthorize";

const BASE_URL = process.env.BASE_URL;

const getInstance = env => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000
  });

  instance.interceptors.response.use(
    UnauthorizeInterceptor.onFullfilled,
    UnauthorizeInterceptor.onRejected
  );

  instance.interceptors.request.use(
    LogInterceptor.requestLog,
    LogInterceptor.requestError
  );

  instance.interceptors.response.use(
    LogInterceptor.responseLog,
    LogInterceptor.responseError
  );

  instance.interceptors.request.use(
    AccessTokenInterceptor.addAccessToken,
    AccessTokenInterceptor.onRejected
  );
  return instance;
};

const API = { instance: getInstance() };

API.login = (email, password) => {
  const params = {
    email,
    password
  };
  return API.instance.post("api/login", params);
};

API.signUp = (name, email, password) => {
  const body = {
    name,
    email,
    password
  };
  return API.instance.post("api/signup", body);
};

export default API;
