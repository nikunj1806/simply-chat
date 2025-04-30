import dotenv from 'dotenv';
dotenv.config();
import server from "./socket-server.js";
server.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});