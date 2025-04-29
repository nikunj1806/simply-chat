import express from 'express';
import WebCtrl from '../controller/web.controller.js';

const router = express.Router();
const webCtrl = new WebCtrl();
router.post('/login', webCtrl.login);
router.get('/', webCtrl.home);
router.get('/logout', webCtrl.logout);
export default router;