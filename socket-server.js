import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js'; 
const httpServer = createServer(app);   

const io = new Server(httpServer);

io.on('connection', (socket) => {
    let {user_id} = socket.handshake.query;
    
    console.log('a user connected: ', user_id);
    socket.on('message', (msg) => {
        socket.emit('message', msg);
        socket.broadcast.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log(socket.id +' user disconnected');
    });
});

export default httpServer;