import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

commentSchema.index({ postId: 1, createdAt: -1 });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;