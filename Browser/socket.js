// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8080');

console.log('is this working?')

// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
    console.log('is this working?')
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});