const request = require('request');

const apiKey = '7004c2e69aab1cf99a4abd698d9234c6';

const forcast = (lat, lon, callback) =>{
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`;
    request({url: weatherUrl, json: true}, (error, {body}) => {
        if (!error && body.cod == 200){
            let weatherdata = {
                temp: (body.main.temp-271.15).toFixed(2),
                name: body.name,
                description: body.weather[0].description
            };
            callback(null, weatherdata);
        } else {
            callback('Cannot connect to weather service!');
        }
    });
}

module.exports = forcast;