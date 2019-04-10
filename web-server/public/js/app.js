console.log('you loaded this js file!');

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})

const geoUrl = 'http://ip-api.com/json';

const weatherForm = document.querySelector('form');
const latitudeInput = document.querySelector('#lat');
const longitudeInput = document.querySelector('#lon');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let lat = latitudeInput.value;
    let lon = longitudeInput.value;
    if (lat && lon) {
        fetch(`http://localhost:3001/weather?lat=${lat}&lon=${lon}`).then((response)=>{
            response.json().then((data)=>{
                console.log(data);
            })
        })
    } else {
        fetch(geoUrl).then((response)=>{
            response.json().then((data)=>{
                if (data.status == 'success') {
                    lat = data.lat;
                    lon = data.lon;
                    fetch(`http://localhost:3001/weather?lat=${lat}&lon=${lon}`).then((response)=>{
                        response.json().then((data)=>{
                            console.log(data);
                        })
                    })
                } else {
                    return console.log(data);
                }
            })
        })
        
    }
    
});