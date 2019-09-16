import { AccessTokenManager } from "../../data/token/AccessTokenManager";

const UnauthorizeInterceptor = {
  onFullfilled: response => {
    return Promise.resolve(response);
  },

  onRejected: error => {
    if (error) {
      const config = error.config;
      console.log(config);
      return Promise.reject(error);
    }
  }
};

export default UnauthorizeInterceptor;
