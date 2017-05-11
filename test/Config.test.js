'use strict';

const rewire = require('rewire');
const expect = require('chai').expect;

describe('Home Assistant - Config Class', () => {
  let Request = rewire('../lib/Request.js');

  Request._get = () => {
    console.log('UGH')
  };

  let module = rewire('../lib/Config.js');
  let Config;

  beforeEach(() => {
    module.__set__('Request', {
      _get: path => {
        console.log('HERE', path);
      }
    });

    Config = module();
  });

  describe('Class Interface', () => {
    it('should export an initialization function', () => {
      expect(module).to.be.a('function');
    });
  });

  describe('status', () => {
    it('should do something', () => {
      Config.status();
    });
  });
});
