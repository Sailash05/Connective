import authAxios from "../api/authAxios";

export const userService = {
    getProfilePicture: () => authAxios.get('/api/user/profilepicture'),
    getConnectionStat: () => authAxios.get(`/api/user/connection/stats`),
    addFollower: (userId: string) => authAxios.post(`api/user/connection/follow/${userId}`),
    unFollow: (userId: string) => authAxios.delete(`api/user/connection/follow/${userId}`),

    getUserProileList: (page: number, limit: number, search: string, sortBy: string, isMutual: boolean, type: string) => authAxios.get(`/api/user/connection/get-userprofile-list?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&isMutual=${isMutual}&type=${type}`)
}

//api/product/get-product?page=${pageNum}&limit=${limit}&search=${search.trim()}&category=${selectedCategory}&sortBy=${sortBy}&order=${sortOrder}