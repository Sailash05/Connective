import authAxios from "../api/authAxios";

export const postService = {
    createPost: (data: FormData) => authAxios.post('/api/post', data),
    getFeed: () => authAxios.get('/api/post')
}