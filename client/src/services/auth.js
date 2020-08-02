import request from 'superagent';

async function login(params) {
  const res = await request
    .post('/auth/login')
    .send(params);

  localStorage.setItem('token', res.body.token);
}

async function signup(params) {
  const res = await request
    .post('/auth/signup')
    .send(params);

  localStorage.setItem('token', res.body.token);
}

function logout() {
  localStorage.removeItem('token');
}

async function getAuthUser() {
  const res = await request
    .get('/auth/user')
    .set(getAuthHeader());

  return res.body.user;
}

function getAuthHeader() {
  return { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
}

export default {
  login,
  signup,
  logout,
  getAuthUser,
  getAuthHeader
}