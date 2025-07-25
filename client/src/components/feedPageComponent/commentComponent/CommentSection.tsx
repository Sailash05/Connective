import { useRef, useEffect, useState } from "react";
import { postService } from "../../../service/post.service";
import type { CommentType } from "../../../types/commentType";
import Comments from "./Comments";

import { FaChevronDown } from "react-icons/fa";

const CommentSection = ({ postId, noOfComments }: { postId: string, noOfComments: number }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const [text, setText] = useState<string>("");
    const [successState, setSuccessState] = useState<boolean>(false);

    const [commentFilter, setCommentFilter] = useState<'RECENT' | 'POPULAR'>('POPULAR');

    const totalPage = Math.ceil(noOfComments / 3);
    const [page, setPage] = useState<number>(1);
    const [isMaxCommentReached, setIsMaxCommentReached] = useState<boolean>(false);

    const [comments, setComments] = useState<CommentType[]>([]);

    // Close filter dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsFilterMenuOpen(false);
            }
        };
        if (isFilterMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isFilterMenuOpen]);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    };

    const addComment = async () => {
        if (!text.trim()) return;
        try {
            await postService.addComment(postId, { text });
            setText("");
            setSuccessState(true);
            setTimeout(() => setSuccessState(false), 2000);
            // Refresh comments after adding
            fetchComments(true, 1);
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const fetchComments = async (reset = false, pageToFetch = page) => {
        try {
            const response = await postService.getComment(postId, commentFilter, pageToFetch, 3);
            const newComments = response.data.data.comments;

            if (reset) {
                setComments(newComments); // Reset on filter change or refresh
                setPage(1);
            } else {
                setComments(prev => [...prev, ...newComments]); // Append for load more
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const loadMoreComments = () => {
        if (page < totalPage) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchComments(false, nextPage);
        } else {
            setIsMaxCommentReached(true);
            setTimeout(() => setIsMaxCommentReached(false), 2000);
        }
    };

    // Fetch comments on filter change (reset)
    useEffect(() => {
        fetchComments(true, 1);
    }, [commentFilter]);

    // Initial load
    useEffect(() => {
        adjustHeight();
        fetchComments(true, 1);
    }, []);

    return (
        <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-2">
            <div className="flex gap-3 mx-10">
                <h3 className="font-bold text-md dark:text-white pt-3">Comment: </h3>
                <div className="border border-black dark:border-white rounded-3xl flex-grow p-1 flex items-end">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        ref={textareaRef}
                        onInput={adjustHeight}
                        placeholder="Add a comment..."
                        rows={1}
                        className="flex-grow ml-2 resize-none overflow-hidden w-full focus:outline-none my-auto leading-tight p-0 bg-transparent dark:placeholder:text-gray-200 dark:text-white"
                        style={{ minHeight: "auto" }}
                    />
                    <button
                        onClick={addComment}
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold rounded-full px-4 py-1 ml-3 h-10 relative"
                    >
                        Post
                        {successState && (
                            <span className="absolute -top-14 -left-3 bg-green-500 w-24 rounded-lg">
                                Comment added
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {
                noOfComments === 0 && <p className="text-center mt-4 dark:text-white">No comments yet</p>
            }

            {
                noOfComments !== 0 && (
                    <div className="mx-10 mt-2">
                        <button onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)} className="flex gap-2 items-center relative dark:text-white">
                            Most {commentFilter.toLowerCase()}
                            <FaChevronDown />
                            {isFilterMenuOpen && (
                                <div ref={menuRef} className="absolute top-full -right-8 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-40 overflow-hidden z-10">
                                    <div onClick={() => setCommentFilter("POPULAR")} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Most popular
                                    </div>
                                    <div onClick={() => setCommentFilter("RECENT")} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                        Most recent
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                )
            }

            {
                noOfComments !== 0 && (
                    <div className="py-5 space-y-4">
                        {comments?.map((comment) => (
                            <Comments key={comment._id} comment={comment} />
                        ))}
                    </div>
                )
            }

            {
                noOfComments !== 0 && (
                    <div className="text-center">
                        <button onClick={loadMoreComments} className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-full font-bold transition-all relative">
                            Load more comments
                            {isMaxCommentReached && (
                                <div className="absolute font-medium bg-gray-500 p-2 -top-12 left-1 rounded-md">
                                    Max comment reached.
                                </div>
                            )}
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default CommentSection;
