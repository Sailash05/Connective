import { useState, useEffect } from "react";
import { postService } from '../../../service/post.service.ts';

import FeedPost from "../../../components/mainPageComponent/feedComponent/FeedPost";
import PostContainer from "../../../components/mainPageComponent/feedComponent/PostContainer";

export type PostType = {
    _id: string;
    __v: number;
    userId: string;
    userName: string;
    views: number;
    content: string;
    fileData: any[];
    tags: string[];
    visibility: string;
    likes: string[];
    comments: string[];
    shares: string[];
    createdAt: string;
    postedAt: string;
    updatedAt: string;
};


const FeedSection = ({ setCreatePost }: { setCreatePost: (value: boolean) => void}) => {

    const [postList, setPostList] = useState<PostType[]>([]);

    useEffect(() => {
        const getFeed = async() => {
            try {
                const response = await postService.getFeed();
                const data = response.data;
                setPostList(data.data);
            }
            catch(error) {
                // show fail message
            }
        }
        getFeed();
    }, []);

    return(
        <section className="bg-gray-100 dark:bg-slate-900 px-8 py-4 space-y-5">
            <FeedPost setCreatePost={setCreatePost} /> 
            {/* <PostContainer /> */}
            {
                postList.map((post) => <PostContainer key={post._id} post={post} /> )
            }
        </section>
    );
}

export default FeedSection;