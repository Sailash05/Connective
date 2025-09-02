import { response } from '../utils/response.js';
import { createUserService, loginUserService, sendOtpService, resetRequestService, updatePasswordService, deleteUserService } from '../service/authService.js';
import { generateJwtToken } from '../utils/jwtToken.js';

export const createUser = async (req, res) => {
    try {
        const result = await createUserService(req.body);
        
        if(result.status === 201) {
            const token = generateJwtToken({ userId: result.userId });
            return res.status(201).send(response('SUCCESS', result.message, { jwtToken: token, userId: result.userId }));
        }
        else if(result.status === 400) {
            return res.status(400).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const loginUser = async (req, res) => {
    try {
        const result = await loginUserService(req.body);
        
        if(result.status === 401 || result.status === 404) {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
        else if(result.status === 200) {
            const token = generateJwtToken({ userId: result.userId });
            return res.status(200).send(response('SUCCESS', result.message, { jwtToken: token, userId: result.userId }));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const getOtp = async (req, res) => {

    let { userName, email } = req.body;

    try {
        const result = await sendOtpService(userName, email);

        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, null));
        }
        else if(result.status === 409) {
            return res.status(409).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const resetRequest = async (req, res) => {
    let { userName, email } = req.body;

    try {
        const result = await resetRequestService(userName, email);

        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, null));
        }

        if(result.status === 404 || result.status === 409) {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const updatePassword = async (req, res) => {
    let { email, resetToken, newPassword } = req.body;

    try {
        const result = await updatePasswordService(email, resetToken, newPassword);

        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, null));
        }
        
        if(result.status === 400 || result.status === 404) {
            return res.status(result.status).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}

export const verifyTokenController = async (req, res) => {
    return res.status(200).json({ valid: true, user: req.user });
}

export const deleteUser = async (req, res) => {
    try {
        const result = await deleteUserService(req.body.userId);

        if(result.status === 200) {
            return res.status(200).send(response('SUCCESS', result.message, null));
        }
        else if(result.status === 404) {
            return res.status(404).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
}


export const oauthCallback = async (req, res) => {
    try {
        const user = req.user;

        const token = generateJwtToken({ userId: user._id });

        //res.status(200).send(response('SUCCESS', 'Authenticated successfully.', { jwtToken: token, userId: user._id }))
        res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}&userId=${user._id}`);
    } 
    catch (error) {
        console.error('OAuth callback error:', error);
        //res.status(500).send(response('FAILED', 'Authenticated failed.', null));
    }
};