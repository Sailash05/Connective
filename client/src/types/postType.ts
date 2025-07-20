export type PostType = {
    _id: string;
    __v: number;
    userId: string;
    userName: string;
    profilePicture: string;
    views: number;
    content: string;
    fileData: any[];
    tags: string[];
    visibility: string;
    isPostSaved: boolean,
    likes: string[];
    comments: string[];
    shares: string[];
    createdAt: Date;
    updatedAt: Date;
};