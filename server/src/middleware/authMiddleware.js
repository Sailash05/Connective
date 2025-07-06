import { response } from '../utils/response.js';
import jwt from "jsonwebtoken";

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email === email.toLowerCase();
};

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

    // Input validation
    if (!userName) return res.status(400).send(response('FAILED', 'Enter your user name!', null));
    if (!email || !isValidEmail(email)) return res.status(400).send(response('FAILED', 'Invalid email!', null));
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

export const verifyToken = (req, res, next) => {
    console.log('hdsf');
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};