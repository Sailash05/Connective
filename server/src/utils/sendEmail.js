import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendOtp = async (userName, email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    const htmlPath = path.join(__dirname, '../emailTemplates/otpEmail.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    const currentDate = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);

    htmlContent = htmlContent
        .replace('{{name}}', userName)
        .replace('{{date}}', formattedDate)
        .replace('{{otp}}', otp);

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for Signup',
        html: htmlContent
    });
}

export const passwordResetLink = async (userName, email, resetToken) => {

    const resetLink = process.env.FRONTEND_URL + `/auth/reset-password?email=${email}&token=${resetToken}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    const htmlPath = path.join(__dirname, '../emailTemplates/passwordResetLink.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    
    const currentDate = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);

    htmlContent = htmlContent
        .replace('{{name}}', userName)
        .replace('{{date}}', formattedDate)
        .replace('{{resetLink}}', resetLink);

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Reset Your Password',
        html: htmlContent
    });
}

export const sendWelcomeTemplate = async (userName, email) => {

    // Need PROFILE LINK
    // const resetLink = process.env.FRONTEND_URL + `/auth/reset-password?email=${email}&token=${resetToken}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD
        }
    });

    const htmlPath = path.join(__dirname, '../emailTemplates/welcomeUser.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    htmlContent = htmlContent
        .replace('{{name}}', userName);

    await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Welcome to Connective',
        html: htmlContent
    });
}