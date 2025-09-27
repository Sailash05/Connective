import { useState, useEffect, useRef } from "react";
import type { ReplyType } from "../../../types/replyType";
import { postService } from '../../../service/post.service';
import { timeDifference } from "../../../utils/dateAndTime";

import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";

import notLikeIcon from '../../../assets/mainPageImages/postContainerIcons/not_like.png';
import likeIcon from '../../../assets/mainPageImages/postContainerIcons/like.png';

const Replies = ({ reply }: { reply: ReplyType }) => {

    const [noOfLikes, setNoOfLikes] = useState<number>(reply.noOfLikes);
    const [isLiked, setIsLiked] = useState<boolean>(reply.isLiked);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const likeReply = async () => {
        try {
            await postService.toggleReplyLike(reply._id, isLiked);
            setNoOfLikes(isLiked ? noOfLikes-1 : noOfLikes+1);
            setIsLiked(!isLiked);
        }
        catch(err) {

        }
    }

    const [isReplyDeleted, setIsReplyDeleted] = useState<boolean>(false);
    const deleteReply = async () => {
        try {
            await postService.deleteReply(reply._id);
            setIsReplyDeleted(true);
        }
        catch(err) {

        }
    }

    return(
        <div className="mx-2 md:mx-10 py-2 border-b border-gray-200 dark:border-gray-700 relative">

            {/* Profile & Menu */}
            <div className="flex gap-3 items-center relative">
                <img src={reply.profilePicture} alt="Profile" className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"/>
                <div className="flex flex-col">
                    <h4 className="font-semibold hover:underline cursor-pointer dark:text-white text-sm">{reply.userName}</h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{timeDifference(reply.createdAt)}</p>
                </div>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-auto p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all dark:text-white">
                    <BsThreeDotsVertical />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                    <div ref={menuRef} className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-40 overflow-hidden z-10">
                        {
                            reply.isAuthor && (
                                <button onClick={() => deleteReply()} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <MdDeleteOutline className="text-lg text-red-500" />
                                    Delete
                                </button>
                            )
                        }
                        
                        
                        <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                            <MdReportGmailerrorred className="text-lg text-red-500" />
                            Report
                        </button>
                    </div>  
                )}
            </div>

            {/* Comment Content */}
            <div className="ml-12 mt-1 md:mt-3">
                <pre className="font-sans dark:text-white whitespace-pre-wrap break-words text-sm">
                    {reply.text}
                </pre>

                {/* Meta Info */}
                <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1 md:mt-2 ml-1">
                <span>{noOfLikes} Likes</span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-1 md:mt-2 ml-1">
                    <button onClick={() => likeReply()} className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <img src={isLiked ? likeIcon : notLikeIcon} alt="" className="w-4 h-4 dark:invert" />
                        Like
                    </button>
                </div>
            </div>

            {
                isReplyDeleted && (
                    <div className="bg-white dark:bg-slate-950 absolute top-0 left-0 w-full h-full flex justify-center items-center">
                        <p className="font-bold dark:text-white">REPLY DELETED!!</p>
                    </div>
                )
            }

        </div>
    );
}

export default Replies;