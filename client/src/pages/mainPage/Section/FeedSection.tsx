import { useState, useEffect } from "react";
import { postService } from '../../../service/post.service.ts';

import FeedPost from "../../../components/mainPageComponent/feedComponent/FeedPost";
import Post from "../../../components/mainPageComponent/feedComponent/Post.tsx";

import { type PostType } from "../../../types/postType.ts";


const FeedSection = ({ setCreatePost }: { setCreatePost: (value: boolean) => void}) => {

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
        <section className="bg-gray-100 dark:bg-slate-900 px-8 py-4 space-y-5">
            <FeedPost setCreatePost={setCreatePost} /> 
            {
                postList.map((post) => <Post key={post._id} post={post} /> )
            }
        </section>
    );
}

export default FeedSection;