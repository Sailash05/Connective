import { useState, useEffect } from "react";
import { postService } from '../../service/post.service.ts';

import FeedPost from "../../components/feedPageComponent/feedComponent/FeedPost.tsx";
import Post from "../../components/feedPageComponent/feedComponent/Post.tsx";

import { type PostType } from "../../types/postType.ts";

const FeedPage = () => {

    const [postList, setPostList] = useState<PostType[]>([]);

    useEffect(() => {
        const getFeed = async() => {
            try {
                const response = await postService.getFeed();
                const data = response.data;
                setPostList(data.data);
            }
            catch(error: any) {

            }
        }
        getFeed();
    }, []);

    return(
        <section className="bg-gray-100 dark:bg-slate-900 px-2 md:px-8 py-4 space-y-2 md:space-y-5">
            <FeedPost /> 
            {
                postList.map((post) => <Post key={post._id} post={post} /> )
            }
        </section>
    );
}

export default FeedPage;