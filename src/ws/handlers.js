/**
 * Created by anton on 6/16/17.
 */


export function enterRoom(socket, name) {
        socket.emit('user join', name);
}

export function subscribeUserJoined(socket, callback) {
    socket.on('user joined', callback);
}