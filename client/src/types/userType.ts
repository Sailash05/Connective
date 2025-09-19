import { type PostType } from "./postType";

export type UserSearchListType = {
    _id: string,
    userName: string,
    email: string,
    profilePicture: string | null,
    bio: string | null,
    isFollowed: boolean,
    mutualFollowersCount: number
};

export type SuggestedUserType = {
    _id: string,
    userName: string,
    bio: string,
    profilePicture: string | null,
    mutualFollowersCount: number
}

export type TopProfessionalsType = {
    _id: string,
    userName: string,
    bio: string | null,
    followerCount: number
}

export type RecentlyJoinedUserType = {
    _id: string,
    userName: string,
    bio: string | null;
    createdAt: string,
    profilePicture: string | null,
    isFollowed: boolean
}

export type UserProfileType = {
    _id: string,
    userName: string,
    email: string,
    bio: string | null,
    profilePicture: string | null,
    bannerPicture: string | null,
    location?: LocationType | null,
    website: string | null,
    resume: string | null,
    skill: string[],
    interest: string[],
    experience: ExperienceType[],
    followerCount: number,
    followingCount: number,
    post: PostType
}

export type UserProfileUpdateType = {
    _id: string,
    userName: string,
    email: string,
    bio: string | null,
    profilePicture: string | null,
    bannerPicture: string | null,
    location?: LocationType | null,
    website: string | null,
    resume: string | null,
    skill: string[],
    interest: string[],
    experience: ExperienceType[]
}


export type LocationType = {
    city?: string;
    state?: string;
    country?: string;
};

export type ExperienceType = {
    companyName: string,
    type: string,
    role: string,
    from: Date,
    to: Date
}