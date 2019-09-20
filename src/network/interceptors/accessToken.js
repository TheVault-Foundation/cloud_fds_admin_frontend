import { store } from '../../redux/store';
import { path } from 'ramda';


const AccessTokenInterceptor = {
  addAccessToken: config => {
    const state = store.getState();
    const accessToken = path(['auth', 'data', 'access_token'], state);

    if (accessToken) {
      const headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      };
      config.headers = headers;
    }
    console.log('addAccessToken', accessToken);
    return config;
  },

  onRejected: error => {
    return Promise.reject(error);
  }
};

export default AccessTokenInterceptor;
