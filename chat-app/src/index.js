const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

let count = 0;

io.on('connection', (socket) => {
    console.log('New Connection From Client!');
    socket.emit('updateCount', count);
    socket.on('increment', () => {
        count ++ ;
        io.emit('updateCount', count);
    })
})

server.listen(port, () => {
    console.log('Server listening at port', port);
})