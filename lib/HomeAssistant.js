'use strict';

class HomeAssistant {
  constructor(auth) {
    auth = auth || {};
    const host = auth.host || 'http://localhost';
    const port = auth.port || 8123;
    const password = auth.password;
    const apiConfig = {
      base: `${host}:${port}`,
      password
    };

    const Config = require('./Config')(apiConfig);
    this.status = () => Config.status();
    this.config = () => Config.config();
    this.discoveryInfo = () => Config.discoveryInfo();
    this.bootstrap = () => Config.bootstrap();

    ['Camera', 'Events', 'History', 'Logs', 'Services', 'States', 'Templates'].reduce((obj, id) => {
      obj[id.toLowerCase()] = require(`./${id}`)(apiConfig);
      return obj;
    }, this);
  }
}

module.exports = HomeAssistant;
