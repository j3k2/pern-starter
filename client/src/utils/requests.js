import request from 'superagent';

function getToken () {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return token;
}

async function post(url, params, useToken) {
  const res = await request
    .post(url)
    .send(params)
    .set(useToken ? {'Authorization':`Bearer ${getToken()}`} : {});

  return res;
}

async function get(url, params, useToken) {
  const res = await request
    .get(url)
    .query(params)
    .set(useToken ? {'Authorization':`Bearer ${getToken()}`} : {});

  return res;
}

export {
  post,
  get
}