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