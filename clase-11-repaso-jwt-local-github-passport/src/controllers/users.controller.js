import { generateToken } from "../utils/jsonWebToken.utils.js";

export const registerUser = (req, res) => {
    res.json({ message: 'User registered successfully', user: req.user });
}

export const loginUser = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    const token = generateToken(req.user);
    res.cookie('jwt', token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    });
    res.json({ message: 'User logged in successfully', user: req.user });
}

export const errorUser = (req, res) => {
    res.status(401).json({ message: 'User not authenticated' });
}

export const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'User logged out successfully' });
}
