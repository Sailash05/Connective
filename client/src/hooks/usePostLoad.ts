import { useState, useEffect } from "react";
import { postService } from "../service/post.service";
import { type PostType } from "../types/postType";

const usePostLoad = (pageNumber: number, limit: number) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [postList, setPostList] = useState<PostType[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const fetchFeedPost = async () => {
        try {
            setLoading(true);
            const response = await postService.getFeed(pageNumber, limit);
            const data = response.data;
            setPostList(prev => {
                const merged = [...prev, ...data.data.posts];
                const uniqueMap = new Map<string, PostType>();
                for (const post of merged) {
                    uniqueMap.set(post._id, post);
                }
                return Array.from(uniqueMap.values());
            });

            setHasMore(data.data.currentPage < data.data.totalPages);
            setLoading(false);
        }
        catch(err) {
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        fetchFeedPost();
    }, [pageNumber]);

    return { loading, error, postList, hasMore };
}

export default usePostLoad;