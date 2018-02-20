import { Signal } from 'bulb';
import { initWs, message } from './ws';

const input = document.querySelector('#in');
const log = document.querySelector('#log');
const debouncedLog = document.querySelector('#debounced-log');

const inputSignal = Signal
  .fromEvent('input', input)
  .map(e => e.target.value);

const prettyMessage = message
  .map(val => `Received from server: ${val}`);

prettyMessage
  .subscribe(val => log.innerText = val);

prettyMessage
  .debounce(500)
  .map(val => `Debounced - ${val}`)
  .subscribe(val => debouncedLog.innerText = val);

(async() => {
  const ws = await initWs();

  inputSignal
    .subscribe(value => ws.send(value));
})();

