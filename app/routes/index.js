import express from 'express';
import UserRoutes from './user.js';
import AuthRoutes from './auth.js';


const router = express.Router();
router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);

export default router;
