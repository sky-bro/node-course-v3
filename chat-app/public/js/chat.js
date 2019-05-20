const socket = io();

socket.on('message', (msg) => {
    console.log(msg);
});

// socket.on('updateCount', count => {
//     console.log('count updated:', count);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     socket.emit('increment');
// })

document.querySelector('#msg-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.msg.value;
    socket.emit('sendMsg', message, (error) => {
        if (error){
            return console.log(error);
        }
        console.log('Msg delivered!');
    });
})

document.querySelector('#send-location').addEventListener('click', () => {
    if (!navigator.geolocation){
        return alert('Geolocation is not supported by your browser!');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position);
        const coords = {
            lat: position.coords.latitude,
            long: position.coords.longitude
        };
        socket.emit('sendLocation', coords, () => {
            console.log('Location shared!');
        });
    })
})
