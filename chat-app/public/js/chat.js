const socket = io();

socket.on('updateCount', count => {
    console.log('count updated:', count);
})

document.querySelector('#increment').addEventListener('click', () => {
    socket.emit('increment');
})