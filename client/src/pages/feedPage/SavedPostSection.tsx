import { useState, useEffect } from "react";
import StaticPostLoading from "../../components/loadingComponent/postLoading/StaticPostLoading";
import { type PostType } from "../../types/postType";
import Post from "../../components/feedPageComponent/feedComponent/Post";
import { postService } from "../../service/post.service";
import NoSavedPostCard from "../../components/feedPageComponent/feedComponent/NoSavedPostCard";

const SavedPostSection = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [savedPostList, setSavedPostList] = useState<PostType[]>([]);

    const fetchSavedPost = async () => {
        try {
            setLoading(true);
            const response = await postService.getSavedPost();
            const data = response.data;
            // console.log(data);
            setLoading(false);
            setSavedPostList(data.data);
        }
        catch(err) {
            setLoading(false);
            setError(true);
        }
    }
    
    useEffect(() => {
        fetchSavedPost();
    }, []);

    return (
        <section className="bg-gray-100 dark:bg-gray-950 px-2 md:px-8 py-4 space-y-2 md:space-y-5 min-h-full">
            <h1 className="font-bold text-xl md:text-3xl dark:text-white">Saved Post</h1>
            {
                savedPostList.map((post, index) => (
                    <Post key={index} post={post}/>
                ))
            }

            {
                savedPostList.length === 0 && <NoSavedPostCard />
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

export default SavedPostSection;