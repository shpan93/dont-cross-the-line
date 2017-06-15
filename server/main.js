/**
 * Created by anton on 6/16/17.
 */

import http from 'http';
import express from 'express';
import ioEnhancer from 'socket.io';
import applicationHandler from './application';
import wsHandler from './ws';

const server = express();
const httpServer = http.Server(server);
const io = ioEnhancer(httpServer);

server.use('/build', express.static(`${__dirname}/build`));

// server.get('/', (req, res) => {
//     res.redirect(301, '/en');
// });

server.use(applicationHandler);
wsHandler(io);


const port = process.env.PORT || 8000;

httpServer.listen(port, function(){
    console.log(`Application listening on port ${port}`);
});