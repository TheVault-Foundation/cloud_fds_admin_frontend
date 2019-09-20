import axios from "axios";

import LogInterceptor from "./interceptors/log";
import AccessTokenInterceptor from "./interceptors/accessToken";
import UnauthorizeInterceptor from "./interceptors/unauthorize";

const BASE_URL = process.env.BASE_URL;

const getInstance = env => {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:5000/v1/',
    timeout: 30000,
    validateStatus: function (status) {
      return status >= 200 && status <= 503;
  },
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

API.login = (body) => {
  return API.instance.post("admin/users/login", body);
};

API.register = (body) => {
  return API.instance.post("admin/users", body);
};

export default API;
