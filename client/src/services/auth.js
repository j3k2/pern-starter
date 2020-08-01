import request from '../utils/request';

async function login(params) {
  const res = await request({
    method: 'post',
    endpoint: '/auth/login',
    params
  });

  localStorage.setItem('token', res.body.token);
}

async function signup(params) {
  const res = await request({
    method: 'post',
    endpoint: '/auth/signup',
    params
  });

  localStorage.setItem('token', res.body.token);
}

function logout() {
  localStorage.removeItem('token');
}

async function getUser() {
  const res = await request({
    method: 'get',
    endpoint: '/auth/user'
  });

  return res.body.user;
}

export default {
  login,
  signup,
  logout,
  getUser
}