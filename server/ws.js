/**
 * Created by anton on 6/16/17.
 */
export default (io) => {
    io.on('connection', function (socket) {
        console.log('a user connected');
        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('user join', name => {
            console.log(name);
            socket.emit('user joined', 'newGame')
        })
    });
}