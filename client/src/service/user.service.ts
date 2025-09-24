import authAxios from "../api/authAxios";
import { type UserProfileUpdateType } from "../types/userType";

export const userService = {
    getProfilePicture: () => authAxios.get('/api/user/profilepicture'),
    getProfile: (userId: string) => authAxios.get(`/api/user/profile?userId=${userId}`),

    updateProfile: (updated: UserProfileUpdateType) => authAxios.put('/api/user/profile', updated),
    updateProfilePicture: (formData: FormData) => authAxios.put('/api/user/profile-picture', formData),
    updateBannerPicture: (formData: FormData) => authAxios.put('/api/user/banner-picture', formData),

    getConnectionStat: () => authAxios.get(`/api/user/connection/stats`),
    addFollower: (userId: string) => authAxios.post(`api/user/connection/follow/${userId}`),
    unFollow: (userId: string) => authAxios.delete(`api/user/connection/follow/${userId}`),

    getUserOverview: () => authAxios.get('/api/user/overview'),
    getUserSearchList: (query: string, limit: number) => authAxios.get(`api/user/get-user-list?query=${query}&limit=${limit}`),

    getUserProileList: (page: number, limit: number, search: string, sortBy: string, isMutual: boolean, type: string) => authAxios.get(`/api/user/connection/get-userprofile-list?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&isMutual=${isMutual}&type=${type}`)
}

//api/product/get-product?page=${pageNum}&limit=${limit}&search=${search.trim()}&category=${selectedCategory}&sortBy=${sortBy}&order=${sortOrder}