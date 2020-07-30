import { get, post } from '../utils/requests';

async function login(params) {
  const res = await post(`/auth/login`, params);
  localStorage.setItem('token', res.body.token);
}

async function signup(params) {
  const res = await post(`/auth/signup`, params);
  localStorage.setItem('token', res.body.token);
}

function logout() {
  localStorage.removeItem('token');
}

async function getUser() {
  const res = await get('/auth/user', {}, true);

  return res.body.user;
}

export default {
  login,
  signup,
  logout,
  getUser
}