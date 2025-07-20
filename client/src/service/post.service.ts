import authAxios from "../api/authAxios";

export const postService = {
    createPost: (data: FormData) => authAxios.post('/api/post', data),
    getFeed: () => authAxios.get('/api/post'),
    getPost: (postId: string) => authAxios.get(`/api/post/${postId}`),

    toggleLike: (postId: string, isLiked: boolean) => {
        if(isLiked) {
            return authAxios.delete(`/api/post/${postId}/like`);
        }
        else {
            return authAxios.post(`/api/post/${postId}/like`);
        }
    },

    toggleSave: (postId: string, isSaved: boolean) => {
        if(isSaved) {
            return authAxios.delete(`/api/post/${postId}/save`);
        }
        else {
            return authAxios.post(`/api/post/${postId}/save`);
        }
    }
}