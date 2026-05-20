const WebSocket = require('ws');

// Start the server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('New device connected!');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        
        // Broadcast the message to all connected clients (like your phone)
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    ws.on('close', () => {
        console.log('Device disconnected');
    });
});

console.log('WebSocket Server running on ws://localhost:8080');