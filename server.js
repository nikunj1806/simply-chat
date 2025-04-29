import app from "./app.js";
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

const server = createServer(app);   
dotenv.config();
const io = new Server(server, { 
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('message', (msg) => {
        console.log('Message received:', msg);
        socket.emit('message', 'Hello from server');
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});