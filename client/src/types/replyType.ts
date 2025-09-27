export type ReplyType = {
    _id: string;
    __v: number;
    text: string;
    postId: string;
    userId: string;
    parentCommentId: string;
    noOfLikes: number;
    userName: string;
    profilePicture: string;
    isAuthor: boolean;
    isLiked: boolean;
    createdAt: Date;
    updatedAt: Date;
};