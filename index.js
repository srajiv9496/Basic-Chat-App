const http = require('http');
const express = require('express');
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on("user-message", (message) => {
    io.emit("message", message);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(9000, () => {
  console.log('Server is running on port 9000');
});
