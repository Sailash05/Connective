import mongoose from 'mongoose';

const postInteractionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },

    isLiked: { type: Boolean, default: false },
    isCommented: { type: Boolean, default: false },
    isShared: { type: Boolean, default: false },
    isSent: { type: Boolean, default: false },
    isSaved: { type: Boolean, default: false }
}, { timestamps: true });

// Virtual rating field (not stored, calculated on the fly)
postInteractionSchema.virtual('rating').get(function () {
    return (this.isLiked ? 1 : 0) +
        (this.isCommented ? 2 : 0) +
        (this.isShared ? 3 : 0) +
        (this.isSent ? 3 : 0) +
        (this.isSaved ? 4 : 0);
});

postInteractionSchema.index({ userId: 1, postId: 1 }, { unique: true });

const PostInteraction = mongoose.model('PostInteraction', postInteractionSchema);

export default PostInteraction;
