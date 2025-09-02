import mongoose from 'mongoose';

const postInteractionSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },

    isLiked: { type: Boolean, default: false },
    noOfComments: { type: Number, default: 0 },
    isShared: { type: Boolean, default: false },
    isSent: { type: Boolean, default: false },
    isSaved: { type: Boolean, default: false }
}, { timestamps: true });

postInteractionSchema.virtual('rating').get(function () {
    return (this.isLiked ? 1 : 0) +
        (this.noOfComments ? 2 : 0) +
        (this.isShared ? 3 : 0) +
        (this.isSent ? 3 : 0) +
        (this.isSaved ? 4 : 0);
});

postInteractionSchema.set('toObject', { virtuals: true });
postInteractionSchema.set('toJSON', { virtuals: true });

postInteractionSchema.index({ userId: 1, postId: 1 }, { unique: true });

const PostInteraction = mongoose.model('PostInteraction', postInteractionSchema);

export default PostInteraction;
