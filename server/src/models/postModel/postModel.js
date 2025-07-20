import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    originalName: String,
    type: String,
    url: String,
    public_id: String,
}, { _id: false });

const postSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    fileData: [ fileSchema ],
    tags: [{ type: String }],
    views: { type: Number, default: 0 },
    visibility: { type: String, enum: ['PUBLIC', 'FOLLOWERS_ONLY', 'PRIVATE'], default: 'PUBLIC' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post;