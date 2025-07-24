export type CommentType = {
    _id: string;
    __v: number;
    text: string;
    postId: string;
    userId: string;
    parentCommentId: null;
    noOfLikes: number;
    noOfReplies: number;
    userName: string;
    profilePicture: string;
    isAuthor: boolean;
    isLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
};