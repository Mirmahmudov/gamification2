// Auth utility functions

const USER_KEY = 'user';
const TOKENS_KEY = 'authTokens';
export const getCurrentUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const setTokens = (tokens) => {
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
};

export const getTokens = () => {
  const value = localStorage.getItem(TOKENS_KEY);
  return value ? JSON.parse(value) : null;
};

export const getAccessToken = () => {
  const tokens = getTokens();
  return tokens?.access || null;
};

export const getRefreshToken = () => {
  const tokens = getTokens();
  return tokens?.refresh || null;
};

export const setAccessToken = (access) => {
  const tokens = getTokens() || {};
  localStorage.setItem(
    TOKENS_KEY,
    JSON.stringify({
      ...tokens,
      access,
    }),
  );
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKENS_KEY);
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export const hasRole = (requiredRole) => {
  const user = getCurrentUser();
  return user && user.role === requiredRole;
};