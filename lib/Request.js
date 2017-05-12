'use strict';

const request = require('request');

class Request {
  constructor(apiConfig) {
    this.apiConfig = apiConfig;
  }

  _get(path, qs) {
    return _request.call(this, 'GET', path, qs);
  }

  _post(path, qs, body) {
    return _request.call(this, 'POST', path, qs, body);
  }
}

function _request(method, path, qs, body) {
  return new Promise((resolve, reject) => {
    let options = {
      method,
      rejectUnauthorized: this.apiConfig.rejectUnauthorized,
      url: `${this.apiConfig.base}/api${path}`,
      headers: {
        'Content-Type': 'application/json'
      },
      json: true
    };

    if (this.apiConfig.password) {
      options.headers['x-ha-access'] = this.apiConfig.password;
    }

    if (typeof qs === 'object' && !Array.isArray(qs)) {
      options.qs = qs;
    }

    if (method !== 'GET' && typeof body !== 'undefined') {
      if (typeof body === 'object' && !Array.isArray(body)) {
        options.body = body;
      } else if (typeof body === 'string') {
        try {
          options.body = JSON.parse(body);
        } catch (e) {
          return reject(new Error('Invalid JSON provided.'));
        }
      } else {
        return reject(new Error('Invalid JSON provided.'));
      }
    }

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      }
      resolve(body);
    });
  });
};

module.exports = Request;
