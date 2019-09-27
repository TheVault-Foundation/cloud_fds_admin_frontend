import axios from "axios";

import LogInterceptor from "./interceptors/log";
import AccessTokenInterceptor from "./interceptors/accessToken";
import UnauthorizeInterceptor from "./interceptors/unauthorize";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const getInstance = env => {
  console.log('BASE_URL', BASE_URL)
  const instance = axios.create({
    baseURL: BASE_URL,
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

API.getUserApi = (userId) => {
  return API.instance.get(`admin/users/${userId}/userapi`);
}

API.createUserApi = (userId) => {
  return API.instance.post(`admin/users/${userId}/userapi`);
}

API.updateUserApi = (userId, apiId, body) => {
  return API.instance.put(`admin/users/${userId}/userapi/${apiId}`, body);
}

export default API;
