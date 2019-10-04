import axios from "axios";

import LogInterceptor from "./interceptors/log";
import AccessTokenInterceptor from "./interceptors/accessToken";
import UnauthorizeInterceptor from "./interceptors/unauthorize";


const BASE_URL = process.env.REACT_APP_BASE_URL;

const getInstance = env => {
  console.log('BASE_URL', BASE_URL)
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
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

API.login = body => {
  return API.instance.post("admin/users/login", body);
};

API.register = body => {
  return API.instance.post("admin/users", body);
};

API.getTransactions = (userId, query) => {
  return API.instance.get(`admin/users/${userId}/transactions`, { params: query});
};

API.getUserApi = (userId, query) => {
  return API.instance.get(`admin/users/${userId}/userapi`, { params: query});
}

API.createUserApi = (userId) => {
  return API.instance.post(`admin/users/${userId}/userapi`);
}

API.updateUserApi = (userId, apiId, body) => {
  return API.instance.put(`admin/users/${userId}/userapi/${apiId}`, body);
}
API.updateUser = (userId, body) => {
  return API.instance.put(`admin/users/${userId}`, body);
};

API.getUserInfo = userId => {
  return API.instance.get(`admin/users/${userId}`);
};

API.getUsers = (query) => {
  return API.instance.get(`admin/users`, { params: query});
};

API.forgotPassword = (body) => {
  return API.instance.post("admin/password/request_token", body);
};

API.resetPassword = (token, body) => {
  return API.instance.post(`admin/password/verify_token/${token}`, body);
};

export default API;
