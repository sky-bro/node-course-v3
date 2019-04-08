const http = require('http');
const geoUrl = 'http://ip-api.com/json'

const request = http.request(geoUrl, (response)=>{
    let data = '';
    response.on('data', (chunk)=>{
        // console.log(chunk);
        data += chunk.toString();
    })

    response.on('end', ()=>{
        // console.log(data);
        const body = JSON.parse(data);
        console.log(body);
    })
})

request.on('error', (error)=>{
    console.log('Error', error);
});

request.end();