import { generateToken } from "../utils/jsonWebToken.utils.js";
import {User} from "../models/user.model.js";
import crypto from 'crypto';
import { transporter } from "../config/nodemailer.config.js";
import { createHash} from "../utils/bcript.util.js";



export const registerUser = (req, res) => {
    res.json({ message: 'User registered successfully'});
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


export const sendRecoveryMailUser = async (req, res) => {
    const email = req.body.email;
    if(!email){
        return res.status(400).json({ message: 'Email is required' });
    }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    const resetPasswordCode = crypto.randomBytes(20).toString('hex');
    const resetPasswordCodeExpires = Date.now() + 15 * 60 * 1000;
    await User.updateOne({ email }, { resetPasswordCode, resetPasswordCodeExpires });

    const info = await transporter.sendMail({
            from: `"${process.env.GMAIL_USER}" <${process.env.GMAIL_USER}>`,
            to: email, 
            subject: "Restablecer contraseña", 
            text: "Restablecer contraseña", 
            html: `
                    <h1>Restablecer contraseña</h1>
                    <a href="http://localhost:8080/reset-password/${resetPasswordCode}">Restablecer contraseña</a>
            `,
        });
    
    res.json({ message: 'Recovery email sent successfully' });
}

export const resetPasswordUser = async (req, res) => {
    const { code } = req.params;
    const {newPassword} = req.body;

    if(!code){
        return res.status(400).json({ message: 'Code is required' });
    }

    if(!newPassword){
        return res.status(400).json({ message: 'New password is required' });
    }

    if(newPassword.length < 8){
        return res.status(400).json({ message: 'New password must be at least 8 characters long' });
    }
    
    const user = await User.findOne({ resetPasswordCode: code});
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    if(user.resetPasswordCodeExpires < Date.now()){
        await User.updateOne({ email:user.email }, { resetPasswordCode:null, resetPasswordCodeExpires:null });
        return res.status(401).json({ message: 'Code expired' });
    }
    try {
        const hashedPassword = await createHash(newPassword);
        await User.updateOne({ email:user.email }, { password:hashedPassword, resetPasswordCode:null, resetPasswordCodeExpires:null });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
    res.json({ message: 'Password reset successfully' });
}

export const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'User logged out successfully' });
}

export const githubCallback = (req, res) => {
    const token = generateToken(req.user);
    res.cookie("jwt", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    });
    res.json({message:"Login with GitHub success"})
};
