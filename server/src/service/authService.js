import User from '../models/userModel.js'
import bcrypt from 'bcrypt';
import { sendOtp } from '../utils/sendEmail.js';
import redisClient from '../config/redisClient.js';

export const createUserService = async ({ userName, email, password, otp }) => {

    const storedOtp = await redisClient.get(`otp:${email}`);

    if (!storedOtp) {
        return { status: 400, message: 'OTP expired.' };
    }
    
    if (Number(storedOtp) !== otp) {
        return { status: 400, message: 'Invalid OTP.' };
    }

    await redisClient.del(`otp:${email}`);

    const currentDateAndTime = new Date();
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        userName: userName,
        email: email,
        password: hashedPassword,
        createdAt: currentDateAndTime,
        updatedAt: currentDateAndTime
    });
    return { status: 201, message: 'User account created successfully.', userId: newUser._id};
}

export const loginUserService = async ({ userName, password}) => {
    const user = await User.findOne({ userName }).exec();

    if(!user) return {status: 404, message: 'User not found'};

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
        return {status: 200, message: 'Login successfully', userId: user._id};
    }
    else {
        return {status: 401, message: 'Invalid password'};
    }
}

export const sendOtpService = async (userName, email) => {

    const userByName = await User.findOne({ userName }).exec();
    if (userByName) return { status: 409, message: 'Username already exists' };

    const userByEmail = await User.findOne({ email }).exec();
    if (userByEmail) return { status: 409, message: 'Email already registered' };

    const otp = Math.floor(100000 + Math.random() * 900000);

    try {
        await redisClient.set(`otp:${email}`, otp.toString(), { EX: 300 });
        await sendOtp(userName, email, otp);
        return { status: 200, message: 'OPT successfully sent to your email.' };
    }
    catch(err) {
        return { status: 500, message: err.message };
    }
}

export const deleteUserService = async (userId) => {

    const userById = await User.findById(userId)
    if(!userById) return {status: 404, message: 'User not found'};

    await User.deleteOne({ _id: userId });
    return { status: 200, message: 'User deleted successfully'};
}