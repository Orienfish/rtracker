

// Create WebSocket connection.
// console.log('is this working?');
// const socket = new WebSocket('ws://localhost:8080');

// // Connection opened
// socket.addEventListener('open', function (event) {
//     socket.send('Hello Server!');
//     console.log('connection opened');
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// Create SocketIO instance, connect
var socket = new io.Socket('localhost',{
	port: 8080
});
socket.connect(); 

// Add a connect listener
socket.on('connect',function() {
	console.log('Client has connected to the server!');
});
// Add a connect listener
socket.on('message',function(data) {
	console.log('Received a message from the server!',data);
});
// Add a disconnect listener
socket.on('disconnect',function() {
	console.log('The client has disconnected!');
});

// Sends a message to the server via sockets
function sendMessageToServer(message) {
	socket.send(message);
}

