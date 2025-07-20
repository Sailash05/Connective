import { useState, useEffect } from "react";
import { useParams, type Params } from "react-router-dom";

import { type PostType } from "../../../types/postType.ts";
import { postService } from "../../../service/post.service";
import Post from "../../../components/mainPageComponent/feedComponent/Post";

const PostSection = () => {

    const params: Readonly<Params<string>> = useParams();
    const postId: string = params.postId || "";

    const [post, setPost] = useState<PostType>();

    useEffect(() => {
        const getPost = async () => {
            const response = await postService.getPost(postId);
            const data = response.data;
            setPost(data.data.post);
        }

        getPost();
    }, []);

    return(
        <div className="bg-gray-100 dark:bg-slate-900 px-8 py-4 space-y-5">
            {
                post && <Post post={post} />
            }
            {/* <h1>hello world</h1> */}
        </div>
    );
}

export default PostSection;