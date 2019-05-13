// console.log('you loaded this js file!');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

const geoUrl = 'http://ip-api.com/json';

const weatherForm = document.querySelector('form');
const latitudeInput = document.querySelector('#lat');
const longitudeInput = document.querySelector('#lon');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let lat = latitudeInput.value;
    let lon = longitudeInput.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    if (lat && lon) {
        fetch(`http://localhost:3001/weather?lat=${lat}&lon=${lon}`).then((response)=>{
            response.json().then((data)=>{
                console.log(data);
                messageOne.textContent = data.name;
                messageTwo.textContent = `It's ${data.description}, and the temperature is ${data.temp} celsius degree`;
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
                            messageOne.textContent = data.name;
                            messageTwo.textContent = `It's ${data.description}, and the temperature is ${data.temp} celsius degree`;
                        })
                    })
                } else {
                    messageOne.textContent = data;
                    return console.log(data);
                }
            })
        })
    }
    
});