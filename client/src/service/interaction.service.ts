import authAxios from "../api/authAxios";

export const interactionService = {
    postShared: (postId: string) => authAxios.post(`api/interaction/post/${postId}/share`)
}