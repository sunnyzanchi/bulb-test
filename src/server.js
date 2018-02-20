const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3001 });

// Simple echo server
wss.on('connection', ws => {
  ws.on('error', err => {
    console.log(err);
  });

  ws.on('message', message => {
    console.log(`Echoing: ${message}`);
    ws.send(message);
  });
});