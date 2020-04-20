const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3333;

const server = http.createServer(app);

const io = socketIO(server);

const messages = [{ author: 'PP', message: 'Bem vindo ao chat do PP' }];

io.on('connection', (socket) => {
  io.sockets.emit('loadMessages', messages.slice(-10));

  socket.on('sendMessage', (message) => {
    messages.push(message);
    io.sockets.emit('receiveMessage', message);
  });
});

server.listen(PORT, () => {
  console.log(`Server listing in PORT ${PORT}`);
});
