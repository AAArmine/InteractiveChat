const socket = io();
console.log('gg');

socket.on('message', (serverData)=>{
    console.log(serverData);
})