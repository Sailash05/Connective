import authAxios from "../api/authAxios";

export const postService = {
    createPost: (data: FormData) => authAxios.post('/api/post', data),
    updatePost: (postId: string, data: FormData) => authAxios.put(`/api/post/?postId=${postId}`, data),
    deletePost: (postId: string) => authAxios.delete(`/api/post/?postId=${postId}`),

    getFeed: (page: number, limit: number) => authAxios.get(`/api/post?page=${page}&limit=${limit}`),
    getPost: (postId: string) => authAxios.get(`/api/post/${postId}`),
    getSavedPost: () => authAxios.get('/api/post/saved-post'),
    getPostList: (userId: string) => authAxios.get(`/api/post/post-list?userId=${userId}`),


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
    },

    addComment: (postId: string, data: { text: string }) => authAxios.post(`/api/post/${postId}/comment`, data),
    getComment: (postId: string, filter: string, page: number, limit: number) => authAxios.get(`/api/post/${postId}/comment?filter=${filter.toLowerCase()}&page=${page}&limit=${limit}`),
    toggleCommentLike: (postId: string, isLiked: boolean) => {
        if(isLiked) {
            return authAxios.delete(`/api/post/${postId}/comment/like`);
        }
        else {
            return authAxios.post(`/api/post/${postId}/comment/like`);
        }
    },
    deleteComment: (commentId: string) => authAxios.delete(`/api/post/${commentId}/delete-comment`),

    addReply: (postId: string, commentId: string, data: { text: string }) => authAxios.post(`/api/post/${postId}/${commentId}/reply`, data),
    getReply: (commentId: string, filter: string, page: number, limit: number) => authAxios.get(`/api/post/${commentId}/reply?filter=${filter.toLowerCase()}&page=${page}&limit=${limit}`),
    toggleReplyLike: (replyId: string, isLiked: boolean) => {
        if(isLiked) {
            return authAxios.delete(`api/post/${replyId}/reply/like`);
        }
        else {
            return authAxios.post(`api/post/${replyId}/reply/like`);
        }
    },
    deleteReply: (replyId: string) => authAxios.delete(`/api/post/${replyId}/delete-reply`)
}