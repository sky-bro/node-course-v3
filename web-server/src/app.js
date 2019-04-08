const express = require('express');
const geocode = require('../../weather-app/utils/geocode');
const forcast = require('../../weather-app/utils/forcast');

const app = express();

app.get('', (req, res)=>{
    res.send('<h1>Hello Express!</h1>');
})

app.get('/help', (req, res)=>{
    res.send('<h1>Help Page!</h1>');
})

app.get('/about', (req, res)=>{
    res.send('<h1>About Page!</h1>');
})

app.get('/weather', (req, res)=>{
    // res.send('<h1>Weather Page!</h1>');
    geocode("Boston", (error, {lat, lon}) => {
        if (error){
            return res.send(chalk.red.inverse('Error'), error);
        }
    
        forcast(lat, lon, (error, weatherdata)=>{
            if (error){
                res.send(chalk.red.inverse('Error'), error);
            } else {
                res.send(weatherdata);
            }
        });
    });
})

const port = process.env.port?process.env.port:3000;
app.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});