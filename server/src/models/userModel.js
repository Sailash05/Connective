import mongoose from "mongoose";

const experienceSchema = mongoose.Schema({
    companyName: String,
    type: String,
    role: String,
    from: Date,
    to: Date
}, { _id: false });

const paymentSchema = mongoose.Schema({
    amount: Number,
    method: String,   // stripe, paypal
    status: String,   // success, failed
    date: Date
}, { _id: false });

const badgeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String },
    awardedAt: { type: Date, default: Date.now }
}, { _id: false });

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /.+\@.+\..+/
    },
    password: { type: String },
    authProvider: { type: String, default: 'local' },
    
    bio: { type: String, maxlength: 500 },
    profilePicture: { type: String },
    location: { city: String, state: String, country: String },
    savedPost: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }], default: [] },

    skill: { type: [String], default: [] },
    interest: { type: [String], default: [] },
    experience: { type: [experienceSchema], default: [] },
    badges: { type: [badgeSchema], default: [] },

    website: { type: String },
    resume: { type: String },
    
    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },

    recentProfileViewers: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            time: {
                type: Date,
                default: Date.now
            }
        }
    ],

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isPremium: { type: Boolean, default: false },
    premiumData: {
        type: new mongoose.Schema({
            premiumPlan: String,
            premiumSince: Date,
            premiumExpiry: Date,
            paymentHistory: {
                type: [paymentSchema],
                default: []
            }
        }, { _id: false }),
        default: undefined
    }
});

const User = mongoose.model('User', userSchema);

export default User;