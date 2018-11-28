'use strict';

const axios = require('axios');

exports.getMeDogs = (endpoint) => {
  const url = endpoint.url;
  const port = endpoint.port;

  return axios.request({
    method: 'GET',
    baseURL: `${url}:${port}`,
    url: '/dogss',
    headers: { 'Accept': 'application/json' }
  });
};

exports.getMeCats = (endpoint) => {
  const url = endpoint.url;
  const port = endpoint.port || 8991;

  return axios.request({
    method: 'GET',
    baseURL: `${url}:${port}`,
    url: '/cats',
    headers: { 'Accept': 'application/json' }
  });
};
