import socketIOClient from 'socket.io-client';

const endpoint = 'http://localhost:3333';
const socket = socketIOClient(endpoint);

function subscribeToEvent(event, callbackFn) {
    socket.on(event, data => {
        callbackFn(data);
    })
}

function sendEvent(event, data) {
    socket.emit(event, data);
}


export { subscribeToEvent, sendEvent };