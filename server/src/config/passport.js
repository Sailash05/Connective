import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fetch from 'node-fetch';
import User from '../models/userModel.js';
import { storeProfilePicture } from '../service/userService.js';
import { sendWelcomeTemplate } from '../utils/sendEmail.js';

dotenv.config();

/**
 * Generate a unique username if a conflict exists
 */
const generateUniqueUsername = async (baseName) => {
    let username = baseName;
    let exists = await User.findOne({ userName: username });

    while (exists) {
        const randomSuffix = crypto.randomBytes(2).toString('hex'); // e.g. '3f2a'
        username = `${baseName}_${randomSuffix}`;
        exists = await User.findOne({ userName: username });
    }

    return username;
};

/**
 * Find or create a user (used for Google and GitHub)
 */
const findOrCreateUser = async (profile, emailOverride = null) => {
    const email = emailOverride || profile.emails?.[0]?.value;

    // Fallback email if none is provided
    const finalEmail = email || `${profile.username || 'user'}@oauth.local`;

    // Check if user exists by email
    let user = await User.findOne({ email: finalEmail });

    if (!user) {
        // Create a unique username
        let baseUsername = profile.displayName || profile.username || `user_${Date.now()}`;
        const userName = await generateUniqueUsername(baseUsername);

        user = await User.create({
            userName,
            email: finalEmail,
            authProvider: profile.provider
        });

        if (profile.photos?.[0]?.value) {
            var profileUrl = await storeProfilePicture(profile.photos[0].value, user._id);
            user.profilePicture = profileUrl;
            await user.save();
        }
        await sendWelcomeTemplate(userName, finalEmail);
    }

    return user;
};

// ----------------- Google OAuth Strategy -----------------
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    
    try {
        const user = await findOrCreateUser(profile);
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
}));

// ----------------- GitHub OAuth Strategy -----------------
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback',
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
    
    try {
        let email = profile.emails?.[0]?.value;

        // If no email in profile, fetch manually from GitHub API
        if (!email) {
            const emailsResponse = await fetch('https://api.github.com/user/emails', {
                headers: {
                    Authorization: `token ${accessToken}`,
                    'User-Agent': 'OAuth App'
                }
            });
            const emails = await emailsResponse.json();
            const primaryEmail = emails.find(e => e.primary && e.verified);
            email = primaryEmail?.email || `${profile.username}@github-oauth.local`;
        }

        const user = await findOrCreateUser(profile, email);
        done(null, user);
    }
    catch (err) {
        done(err, null);
    }
}));

export default passport;
