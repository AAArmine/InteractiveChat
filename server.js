const express = require('express')
const path = require('path')
const http = require("http");
const socket = require("socket.io");

const app = express()

app.use(express.static(path.join(__dirname, "public")));
const server = http.createServer(app)

const io = socket(server);

io.on('connection', (socket)=>{
   socket.broadcast.emit('message', 'A user connected!')
   socket.emit("message",'Hello User!')
 socket.on('disconnect', ()=>{
    io.emit("message", "A user disconnected!")
 })

})

server.listen(3000, () => {
  console.log("Server listens to port 3000");
});
