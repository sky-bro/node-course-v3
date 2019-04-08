const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../../weather-app/utils/geocode');
const forcast = require('../../weather-app/utils/forcast');

const app = express();

// define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static dir to serve
app.use(express.static(publicPath));

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

app.get('/help/*', (req, res)=>{
    res.render('404', {
        errorMsg: 'help article not found',
        title: 404,
        name: "sky_bro"
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        errorMsg: '404 not found',
        title: 404,
        name: "sky_bro"
    })
});

const port = process.env.port?process.env.port:3000;
app.listen(port, ()=>{
    console.log(`Server is up on ${port}`);
});