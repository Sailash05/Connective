import User from '../models/userModel.js'
import bcrypt from 'bcrypt';

export const createUserService = async ({userName, email, password}) => {

    const userByName = await User.findOne({ userName }).exec();
    if (userByName) return { status: 409, message: 'Username already exists' };

    const userByEmail = await User.findOne({ email }).exec();
    if (userByEmail) return { status: 409, message: 'Email already registered' };

    const currentDateAndTime = new Date();
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        userName: userName,
        email: email,
        password: hashedPassword,
        createdAt: currentDateAndTime,
        updatedAt: currentDateAndTime
    });
    return { status: 201, message: 'User created successfully', userId: newUser._id};
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

export const deleteUserService = async (userId) => {

    const userById = await User.findById(userId)
    if(!userById) return {status: 404, message: 'User not found'};

    await User.deleteOne({ _id: userId });
    return { status: 200, message: 'User deleted successfully'};
}