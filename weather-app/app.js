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
const geocode = require('./utils/geocode');
const getweather = require('./utils/getweather');

// const url = `http://api.openweathermap.org/data/2.5/forecast?id=2037013&APPID=${apiKey}`;

// forcast weather
// request({url:url, json: true}, (error, response)=>{
//     if (!error){
//         var dataJSON = response.body;
//         // console.log(Object.keys(dataJSON.city));
//         // console.log(typeof dataJSON.cod); // string
//         if (dataJSON.cod==200){
//             var weatherList = dataJSON.list;
//             var city = dataJSON.city;
//             weatherList.forEach((weather) => {
//                 console.log(`${chalk.inverse(weather.dt_txt)}${chalk.red.inverse(city.name+`[${city.coord.lat}, ${city.coord.lon}]`)}${chalk.green.inverse(weather.weather[0].description+`, ${(weather.main.temp-273.15).toFixed(2)} Celsius`)}`);
//             });
//         }
//     } else {
//         console.log(error);
//     }
// });

const geoUrl = 'http://ip-api.com/json';
// const geoUrl = 'https://ip.nf/me.json';

// request({url:geoUrl, json:true}, (error, response) => {
//     if (!error && response.body.status==='success'){
//         let lat = response.body.lat;
//         let lon = response.body.lon;
//         let city = response.body.city;
//         console.log(chalk.green.inverse(`Got geoCode: ${city} [${lat}, ${lon}]`));
//         const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}`;
//         request({url: weatherUrl, json: true}, (error, response) => {
//             if (!error && response.body.cod == 200){
//                 let temp = response.body.main.temp-271.15;
//                 let name = response.body.name;
//                 let weatherDescription = response.body.weather[0].description;
//                 console.log(chalk.cyan.inverse(`${name} is currently ${temp} celsius, with ${weatherDescription}`));
//             } else {
//                 console.log(chalk.red.inverse('Cannot connect to weather service!'), error);
//             }
//         });
//     } else {
//         console.log(chalk.red.inverse('Cannot connect to geo service!'), error);
//     }
// });

geocode('Boston', (error, geodata) => {
    if (error){
        console.log(chalk.red.inverse('Error'), error);
    } else {
        getweather(geodata, (error, weatherdata)=>{
            if (error){
                console.log(chalk.red.inverse('Error'), error);
            } else {
                console.log(chalk.cyan.inverse(`${weatherdata.name} is currently ${weatherdata.temp} celsius, with ${weatherdata.description}`));
            }
        });
    }
})
