const socket = io();

// socket.on('updateCount', count => {
//     console.log('count updated:', count);
// })

// document.querySelector('#increment').addEventListener('click', () => {
//     socket.emit('increment');
// })

document.querySelector('#msg-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.msg.value;
    socket.emit('sendMsg', message);
})

socket.on('message', (msg) => {
    console.log(msg);
});