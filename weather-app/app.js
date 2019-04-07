// console.log('Starting');

// setTimeout(()=>{
//     console.log('2 second timer')
// }, 2000);

// setTimeout(()=>{
//     console.log('0 second timer')
// }, 0);

// console.log('Stopping');

// api.openweathermap.org/data/2.5/forecast?id=524901&APPID=1111111111

const request = require('request');
const chalk = require('chalk');

const url = 'http://api.openweathermap.org/data/2.5/forecast?id=2037013&APPID=7004c2e69aab1cf99a4abd698d9234c6';
request(url, (error, response, body)=>{
    if (!error){
        var dataJSON = JSON.parse(body);        
        // console.log(Object.keys(dataJSON.city));
        // console.log(typeof dataJSON.cod); // string
        if (dataJSON.cod==200){
            var weatherList = dataJSON.list;
            var city = dataJSON.city;
            weatherList.forEach((weather) => {
                console.log(`${chalk.inverse(weather.dt_txt)}${chalk.red.inverse(city.name+`[${city.coord.lat}, ${city.coord.lon}]`)}${chalk.green.inverse(weather.weather[0].description+`, ${(weather.main.temp-273.15).toFixed(2)} Celsius`)}`);
            });
        }
    } else {
        console.log(error);
    }
});