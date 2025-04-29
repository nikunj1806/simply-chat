import express from 'express';

const router = express.Router();

import UserCtrl from '../controller/user.controller.js';
const userCtrl = new UserCtrl();
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getUserById);
router.post('/', userCtrl.createUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
export default router;