'use strict';

const { OAuth2Client, OAuth2Error } = require('homey-oauth2app');

module.exports = class AirthingsOAuth2Client extends OAuth2Client {

  async getDevices() {
    return this.get({
      path: '/devices',
    });
  }

  async getDeviceLatestSamples(id) {
    this.log(id);
    return this.get({
      path: `/devices/${id}/latest-samples`,
    });
  }

  async onHandleNotOK({ body }) {
    throw new OAuth2Error(body.error);
  }

};
