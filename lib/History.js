'use strict';

const moment = require('moment');
const Request = require('./Request');

class History extends Request {
  constructor(apiConfig) {
    super(apiConfig);
  }

  // GET /api/history/period/<timestamp>
  // https://home-assistant.io/developers/rest_api/#get-apihistoryperiodlttimestamp
  state(timestamp, filter, endTimestamp) {
    if (timestamp !== undefined && moment(timestamp, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid() === false) {
      return Promise.reject(new Error('Invalid timestamp format.'));
    }
    if (endTimestamp !== undefined && moment(endTimestamp, 'YYYY-MM-DDTHH:mm:ssZ', true).isValid() === false) {
      return Promise.reject(new Error('Invalid timestamp for endTimestamp format.'));
    }

    const qs = {};

    if (filter !== undefined) {
      cs.filter_entity_id = filter;
    }

    if (endTimestamp !== undefined) {
      cs.end_time = endTimestamp;
    }

    return this._get(`/history/period/${timestamp || ""}`, qs);
  }
}

module.exports = apiConfig => {
  return new History(apiConfig);
};
