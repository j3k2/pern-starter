import request from 'superagent';

function getToken () {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
}

async function post(url, params) {
  const token = getToken();

  const res = await request
    .post(url)
    .send(params)
    .set('Authorization', `Bearer ${token}`);

  return res;
}

async function get(url, params) {
  const token = getToken();

  const res = await request
    .get(url)
    .query(params)
    .set('Authorization', `Bearer ${token}`);

  return res;
}

export {
  post,
  get
}