export type PostType = {
    _id: string;
    __v: number;
    userId: string;
    userName: string;
    profilePicture: string;
    content: string;
    fileData: any[];
    tags: string[];
    visibility: string;
    noOfLikes: number;
    noOfComments: number;
    isLiked: boolean;
    isPostSaved: boolean,
    isFollowed: boolean,
    createdAt: Date;
    updatedAt: Date;
};