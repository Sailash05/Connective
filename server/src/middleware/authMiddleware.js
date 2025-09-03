import { response } from '../utils/response.js';
import jwt from "jsonwebtoken";
import { isValidEmail } from '../utils/emailValidator.js';

import User from '../models/userModel.js';

const isStrongPassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
};

export const validateCreateUser = (req, res, next) => {
    let { userName, email, password } = req.body;

    // Sanitize input
    userName = userName?.trim();
    email = email?.trim();
    password = password?.trim();

    if (!password) return res.status(400).send(response('FAILED', 'Enter your password!', null));
    if (!isStrongPassword(password)) return res.status(400).send(response('FAILED', 'Enter a strong password!', null));

    // Replace trimmed inputs
    req.body.userName = userName;
    req.body.email = email;
    req.body.password = password;
    
    next();
}

export const validateLoginInput = (req, res, next) => {
    let { userName, password } = req.body;

    // Sanitize input
    userName = userName?.trim();
    password = password?.trim();

    // Input validation
    if (!userName) return res.status(400).send(response('FAILED', 'Enter your user name!', null));
    if (!password) return res.status(400).send(response('FAILED', 'Enter your password!', null));

    // Replace trimmed inputs
    req.body.userName = userName;
    req.body.password = password;
    
    next();
}

export const validateForOtp = (req, res, next) => {
    let { userName, email } = req.body;

    // Sanitize input
    userName = userName?.trim();
    email = email?.trim();

    // Input validation
    if (!userName) return res.status(400).send(response('FAILED', 'Enter your user name!', null));
    if (!email || !isValidEmail(email)) return res.status(400).send(response('FAILED', 'Invalid email!', null));

    // Replace trimmed inputs
    req.body.userName = userName;
    req.body.email = email;
    
    next();
}

export const validateForUpdatePassword = (req, res, next) => {
    let { email, resetToken, newPassword } = req.body;

    // Sanitize input
    email = email?.trim();
    resetToken = resetToken?.trim();
    newPassword = newPassword?.trim();

    // Input validation
    if (!email || !isValidEmail(email)) return res.status(400).send(response('FAILED', 'Enter valid email.', null));
    if (!resetToken) return res.status(400).send(response('FAILED', 'Reset token required', null));
    if (!newPassword) return res.status(400).send(response('FAILED', 'Enter your new password!', null));
    if (!isStrongPassword(newPassword)) return res.status(400).send(response('FAILED', 'Enter a strong password!', null));

    // Replace trimmed inputs
    req.body.email = email;
    req.body.resetToken = resetToken;
    req.body.newPassword = newPassword;
    
    next();
}

export const verifyToken = async (req, res, next) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send(response('FAILED', 'Access denied. No token provided.', null));
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).send(response('FAILED', 'User not found.', null));
        }
        
        req.user = decoded;
        next();
    } 
    catch (err) {
        return res.status(403).send(response('FAILED', 'Invalid or expired token.', null));
    }
};