import { Router } from 'express';
import { registerUser, loginUser, logoutUser, githubCallback, sendRecoveryMailUser, resetPasswordUser } from '../controllers/users.controller.js';

import { customPassport } from '../utils/customPassport.js';

const router = Router();

router.post('/register', customPassport('register'), registerUser);
router.post('/login', customPassport('login'), loginUser);
router.post('/send-recovery-mail', sendRecoveryMailUser);
router.put('/reset-password/:code', resetPasswordUser);
router.get('/logout', logoutUser);
router.get('/github', customPassport('github'));
router.get('/github-callback', customPassport('github'), githubCallback);

export default router;