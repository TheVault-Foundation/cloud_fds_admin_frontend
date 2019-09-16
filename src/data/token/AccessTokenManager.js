const AccessTokenManager = { accessToken: null };
const ACCESS_TOKEN = "accessToken";

AccessTokenManager.initialize = () => {
  AccessTokenManager.accessToken = sessionStorage.get(ACCESS_TOKEN);
};

AccessTokenManager.saveAccessToken = token => {
  AccessTokenManager.accessToken = token;
  sessionStorage.setItem(ACCESS_TOKEN, token);
};

AccessTokenManager.clear = () => {
  AccessTokenManager.accessToken = null;
  sessionStorage.removeItem(ACCESS_TOKEN);
};

AccessTokenManager.getAccessToken = () => {
  return AccessTokenManager.accessToken;
};

export default AccessTokenManager;
