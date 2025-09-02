export type UserSearchListType = {
    _id: string,
    userName: string,
    email: string,
    bio: string | null,
    isFollowed: boolean,
    mutualFollowersCount: number
};