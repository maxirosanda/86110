import { Router } from 'express';
import { registerUser, loginUser, errorUser, logoutUser } from '../controllers/users.controller.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { session: false, failureRedirect: '/api/users/error' }), registerUser);
router.post('/login', passport.authenticate('login', { session: false, failureRedirect: '/api/users/error' }), loginUser);
router.get('/error', errorUser)
router.get('/logout', logoutUser);

export default router;