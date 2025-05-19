const TOKEN_KEY = 'jwt_token';
// localStorage에서 key 이름 -> 'jwt_toke' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6..' 이런식

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
