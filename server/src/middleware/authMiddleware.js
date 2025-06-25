import { response } from '../utils/response.js';

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