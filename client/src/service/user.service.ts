import authAxios from "../api/authAxios";

export const userService = {
    getProfilePicture: () => authAxios.get('/api/user/profilepicture')
}