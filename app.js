import express from 'express';
import cors from 'cors';
import ejs from 'ejs';
import webRoutes from './app/routes/web.js';

import { connectDB } from './config/db.js';
import routes from './app/routes/index.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('views'));
connectDB();
app.use('/', webRoutes);

app.use('/api', routes);
app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Not Found'
    });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    });
});

export default app;