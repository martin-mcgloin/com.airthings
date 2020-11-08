'use strict';

const { OAuth2App } = require('homey-oauth2app');
const AirthingsOAuth2Client = require('./lib/AirthingsOAuth2Client');

class AirthingsApp extends OAuth2App {

  onOAuth2Init() {
    this.enableOAuth2Debug();
    this.setOAuth2Config({
      client: AirthingsOAuth2Client,
      apiUrl: 'https://ext-api.airthings.com/v1',
      tokenUrl: 'https://accounts-api.airthings.com/v1/token',
      authorizationUrl: 'https://accounts.airthings.com/authorize',
      scopes: ['read:device'],
      allowMultiSession: true,
    });
  }

}

module.exports = AirthingsApp;
