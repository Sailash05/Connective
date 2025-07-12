import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    body: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    commentedAt: { type: Date, default: Date.now },
    
}, { timestamps: true });

commentSchema.index({ postId: 1, createdAt: -1 });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;