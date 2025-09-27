import { useState, useRef, useCallback } from "react";
import usePostLoad from "../../hooks/usePostLoad";
import FeedPost from "../../components/feedPageComponent/feedComponent/FeedPost";
import Post from "../../components/feedPageComponent/feedComponent/Post";

import StaticPostLoading from "../../components/loadingComponent/postLoading/StaticPostLoading";

const FeedPage = () => {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const limit = 5;

    const { loading, error, postList, hasMore } = usePostLoad(pageNumber, limit);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastPostRef = useCallback((node: HTMLDivElement | null) => {
        if (loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    

    return (
        <section className="bg-gray-100 dark:bg-gray-950 px-2 md:px-8 py-4 space-y-2 md:space-y-5">
            <FeedPost />
            {
                postList.map((post, index) => {
                    if (postList.length === index + 1) {
                        return <Post ref={lastPostRef} key={post._id} post={post} />;
                    }
                    else {
                        return <Post key={post._id} post={post} />;
                    }
                })
            }

            {loading && <StaticPostLoading />}

            {error && (
                <div>
                    <p className="bg-red-500 w-fit mx-auto font-bold text-white px-4 py-2 rounded-md">Post failed to load!</p>
                </div>
            )}

            
        </section>
    );
};

export default FeedPage;
