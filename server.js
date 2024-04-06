const express = require('express')
const path = require('path')
const http = require("http");
const socket = require("socket.io");

const app = express()

app.use(express.static(path.join(__dirname, "public")));
const server = http.createServer(app)

const io = socket(server);

io.on('connection', (socket)=>{
    socket.emit('message', 'hello from server')
 socket.on('disconnect', ()=>{
    console.log('user disconnected');
 })

})

server.listen(3000, () => {
  console.log("Server listens to port 3000");
});

// kfnvsklnvdsknvk