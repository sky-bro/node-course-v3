const path = require('path');
const express = require('express');
const geocode = require('../../weather-app/utils/geocode');
const forcast = require('../../weather-app/utils/forcast');


const app = express();
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'sky_bro'
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'sky_bro'
    });
});

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        helpTest: 'Some helpful text',
        name: 'sky_bro'
    });
});

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