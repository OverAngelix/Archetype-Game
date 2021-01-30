const express = require('express');
let globalchat = [];

const app = express();



const server = app.listen(3001, function () {
    console.log('server running on port 3001');
});


const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', function (socket) {

    socket.on('SEND_MESSAGE', function (data) {
        globalchat = [...globalchat, data];
        io.emit('MESSAGE', data);
    });

    socket.on('recuperationChat', function () {
        io.emit('miseAJourChat', globalchat);
    });

});

