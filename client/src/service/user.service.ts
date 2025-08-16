import authAxios from "../api/authAxios";

export const userService = {
    getProfilePicture: () => authAxios.get('/api/user/profilepicture'),
    getConnectionStat: () => authAxios.get(`/api/user/connection/stats`),
    addFollower: (userId: string) => authAxios.post(`api/user/connection/follow/${userId}`),
    unFollow: (userId: string) => authAxios.delete(`api/user/connection/follow/${userId}`)
}