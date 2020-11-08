const { OAuth2Driver } = require('homey-oauth2app');
const Homey = require('homey');

module.exports = class AirthingsWaveMini extends OAuth2Driver {

  onOAuth2Init() {
    // Register Flow Cards etc.
    this.log('Initializing Airthings Driver');
  }

  async onPairListDevices({ oAuth2Client }) {
    this.log('Getting list of devices');
    const devices = await oAuth2Client.getDevices();

    const result = devices['devices']
      .filter(device => device.deviceType === 'WAVE_MINI')
      .map(device => {
        return {
          name: device.segment.name,
          data: {
            id: device.id,
            deviceType: device.deviceType,
          },
        };
      });
    return result;
  }

};
