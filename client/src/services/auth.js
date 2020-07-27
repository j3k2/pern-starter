import request from 'superagent';

async function authenticate(fields, endpoint) {
  const res = await request
    .post(`http://localhost:5000/auth/${endpoint}`)
    .send(fields);

  localStorage.setItem('token', res.body.token);
}

async function login(fields) {
  await authenticate(fields, 'login');
}

async function signup(fields) {
  await authenticate(fields, 'signup');
}

function logout() {
  localStorage.removeItem('token');
}

async function getUser() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  const res = await request
    .get('http://localhost:5000/auth/user')
    .set('Authorization', `Bearer ${token}`);

  return res.body.user;
}

export default {
  login,
  signup,
  logout,
  getUser
}