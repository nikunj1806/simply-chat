import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js'; 
const httpServer = createServer(app);   

const io = new Server(httpServer);
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});