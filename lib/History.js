'use strict';

const moment = require('moment');
const Request = require('./Request');

class History extends Request {
  constructor(apiConfig) {
    super(apiConfig);
  }

  // GET /api/history/period/<timestamp>
  // https://home-assistant.io/developers/rest_api/#get-apihistoryperiodlttimestamp
  state(startTimestamp, filter, endTimestamp) {
    if (startTimestamp !== undefined && moment(startTimestamp, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid() === false) {
      return Promise.reject(new Error('Invalid startTimestamp format.'));
    }
    if (endTimestamp !== undefined && moment(endTimestamp, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid() === false) {
      return Promise.reject(new Error('Invalid endTimestamp format.'));
    }

    const qs = {};

    if (filter !== undefined) {
      qs.filter_entity_id = filter;
    }

    if (endTimestamp !== undefined) {
      qs.end_time = endTimestamp;
    }

    return this._get(`/history/period/${startTimestamp || ''}`, qs);
  }
}

module.exports = apiConfig => {
  return new History(apiConfig);
};
