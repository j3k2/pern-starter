import request from 'superagent';

const rootUrl = '';

async function post({ endpoint, params }) {
  return request
    .post(rootUrl + endpoint)
    .send(params)
    .set({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
}

async function get({ endpoint, params }) {
  return request
    .get(rootUrl + endpoint)
    .query(params)
    .set({ 'Authorization': `Bearer ${localStorage.getItem('token')}` });
}

export default async function ({ endpoint, params = {}, method }) {
  if (method === 'get') {
    return get({ endpoint, params });
  }
  if (method === 'post') {
    return post({ endpoint, params });
  }
}