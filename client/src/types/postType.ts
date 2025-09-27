type VisibilityOption = 'PUBLIC' | 'PRIVATE' | 'FOLLOWERS_ONLY';

export type PostType = {
    _id: string;
    __v: number;
    userId: string;
    userName: string;
    profilePicture: string;
    content: string;
    fileData: PostFileType[];
    tags: string[];
    visibility: VisibilityOption;
    noOfLikes: number;
    noOfComments: number;
    isLiked: boolean;
    isPostSaved: boolean,
    isFollowed: boolean,
    createdAt: Date;
    updatedAt: Date;
};

export type PostFileType = {
    originalName: string,
    public_id: string,
    type: string,
    url: string
};