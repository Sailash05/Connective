import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import StaticPostLoading from "../../components/loadingComponent/postLoading/StaticPostLoading";
import { type PostType } from "../../types/postType";
import Post from "../../components/feedPageComponent/feedComponent/Post";
import { postService } from "../../service/post.service";
import NoPostCard from "../../components/feedPageComponent/feedComponent/NoPostCard";

const ViewPostSection = () => {

    const { userId } = useParams<{ userId: string }>();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [postList, setPostList] = useState<PostType[]>([]);

    const fetchPost = async () => {
        try {
            const id = userId || localStorage.getItem("UserId");
            if (!id) throw new Error("No user ID found in URL or localStorage");

            setLoading(true);
            const response = await postService.getPostList(id);
            const data = response.data;
            setLoading(false);
            // setSavedPostList(data.data);
            setPostList(data.data);
        }
        catch(err) {
            setLoading(false);
            setError(true);
        }
    }
    
    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <section className="bg-gray-100  dark:bg-gray-950 px-2 md:px-8 py-4 space-y-2 md:space-y-5 min-h-full">
            <h1 className="font-bold text-xl md:text-3xl dark:text-white">Your Post</h1>
            {
                postList.map((post, index) => (
                    <Post key={index} post={post}/>
                ))
            }

            {
                postList.length === 0 && <NoPostCard />
            }

            {loading && <StaticPostLoading />}

            {error && (
                <div>
                    <p className="bg-red-500 w-fit mx-auto font-bold text-white px-4 py-2 rounded-md">Post failed to load!</p>
                </div>
            )}
        </section>
    );
}

export default ViewPostSection;