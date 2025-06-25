import { response } from '../utils/response.js';
import { createUserService, deleteUserService } from '../service/authService.js';

export const createUser = async (req, res) => {
    try {
        const result = await createUserService(req.body);
        if(result.status === 201) {
            return res.status(201).send(response('SUCCESS', result.message, result.data));
        }
        else if(result.status === 409) {
            return res.status(409).send(response('FAILED', result.message, null));
        }
    }
    catch(err) {
        return res.status(500).send(response('FAILED', err.message, null));
    }
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