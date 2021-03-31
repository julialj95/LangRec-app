import config from "../config";

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(config.API_KEY, token);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.API_KEY);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.API_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`);
  },
};

export default TokenService;
