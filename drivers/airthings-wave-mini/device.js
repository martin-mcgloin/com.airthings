const { OAuth2Device } = require('homey-oauth2app');

module.exports = class AirthingsWaveMini extends OAuth2Device {

    async onOAuth2Init() {
        this.pollDevice();
        this.log("Calling Device onOAuth2Init");
        this.updateCapabilityValues()
    };

    async updateCapabilityValues() {
        const device_id = await this.getData()['id']
        this.log("Getting and updating latest samples for: " + device_id);
        try {
            await this.oAuth2Client.getDeviceLatestSamples(device_id)
                .then(async samples => {
                    const data = samples['data']
                    await this.setCapabilityValue('measure_humidity', data.humidity);
                    await this.setCapabilityValue('measure_pressure', data.pressure);
                    await this.setCapabilityValue('measure_temperature', data.temp);
                    await this.setCapabilityValue('measure_voc', data.voc);
                });
        } catch (error) {
            this.log("Error getting latest samples for " + device_id)
            this.log(error);
        }
    };

    async pollDevice() {
        this.pollingInterval = setInterval(async () => {
            this.updateCapabilityValues();
        }
            , 60000 * this.getSetting("pollInterval"))
    };

    async onOAuth2Deleted() {
        // Clean up here
    };
}
