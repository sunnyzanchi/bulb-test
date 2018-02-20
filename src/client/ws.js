import { Signal } from 'bulb';
import Sockette from 'sockette';

// This feels wrong :(
// I'll have to think about a better way to do this than redefinition
let onmessage;

// It also feels wrong to have the Signal in the WebSocket initializer
// I'd like to make initWs take some argument so all this does is create the WS
export const message = Signal.fromCallback(f => {
  onmessage = e => f(undefined, e.data);
});

export const initWs = () => new Promise((resolve, reject) => {
  const ws = new Sockette('ws://localhost:3001', {
    onerror: reject,
    onmessage,
    onopen: e => resolve(ws),
  })
});
