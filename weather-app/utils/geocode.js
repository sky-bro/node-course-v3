const request = require('request');
const chalk = require('chalk');

const geocode = (address, callback) =>{
    // this api does not use address, directly get coord using ip address
    const geoUrl = 'http://ip-api.com/json';
    console.log(chalk.red.inverse(`Ignore address parameter ${encodeURIComponent(address)}, utilizing an api directly get coord from your ip address`));
    request({url: geoUrl, json: true}, (error, response) => {
        if (!error && response.body.status === 'success'){
            let geodata = {
                // temp: response.body.main.temp-271.15,
                // name: response.body.name,
                // weatherDescription: response.body.weather[0].description
                lat: response.body.lat,
                lon: response.body.lon,
                city: response.body.city
            };
            callback(null, geodata);
        } else {
            callback('Cannot connect to geo service!');
        }
    });
}

module.exports = geocode;