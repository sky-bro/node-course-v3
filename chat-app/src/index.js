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

// let count = 0;

io.on('connection', (socket) => {
    console.log('New Connection From Client!');
    // socket.emit('updateCount', count);
    // socket.on('increment', () => {
    //     count ++ ;
    //     io.emit('updateCount', count);
    // })
    socket.broadcast.emit('message', 'a user has joined the room!');
    socket.emit('message', 'Welcome!');
    socket.on('sendMsg', (msg) => {
        console.log(msg);
        io.emit('message', msg);
    })
    socket.on('disconnect', () => {
        io.emit('message', 'a user has left the room!');
    })
    // socket.emit('message', 'helo');
})

server.listen(port, () => {
    console.log('Server listening at port', port);
})