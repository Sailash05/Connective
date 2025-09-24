import { useState, useEffect, useRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '../../../service/post.service.ts';
import { userService } from '../../../service/user.service.ts';

import { type PostType } from '../../../types/postType.ts';
import EditPostForm from './EditPostForm.tsx';
import { timeDifference } from '../../../utils/dateAndTime.ts';
import SharePopUp from './SharePopUp.tsx';
import CommentSection from '../commentComponent/CommentSection.tsx';
import ImageContainer from './ImageContainer.tsx';

import DeletingPostLoading from '../../loadingComponent/postLoading/DeletingPostLoading.tsx';

import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit, MdReportGmailerrorred } from "react-icons/md";

import followIcon from '../../../assets/mainPageImages/postContainerIcons/follow.png';
import notLikeIcon from '../../../assets/mainPageImages/postContainerIcons/not_like.png';
import likeIcon from '../../../assets/mainPageImages/postContainerIcons/like.png';
import commentIcon from '../../../assets/mainPageImages/postContainerIcons/comment.png';
import sendIcon from '../../../assets/mainPageImages/postContainerIcons/send.png';
import shareIcon from '../../../assets/mainPageImages/postContainerIcons/share.png';
import saveIcon from '../../../assets/mainPageImages/postContainerIcons/save.png';
import notSaveIcon from '../../../assets/mainPageImages/postContainerIcons/not_save.png';

import ButtonLoader from "../../loadingComponent/ButtonLoader.tsx";

type PostProps = {
    post: PostType;
};

const Post = forwardRef<HTMLDivElement, PostProps>(({ post }, ref) => {

    const [isOwnPost, setIsOwnPost] = useState<boolean>(false);

    const ownPost: boolean = localStorage.getItem('UserId')=== post.userId;

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
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const openImage = (index: number) => {
        setCurrentImage(index);
        setIsImageOpen(true);
    };

    const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);

    const amountOfWords = 25;
    const splittedText = post.content.split(' ');
    const itCanOverflow = splittedText.length > amountOfWords;
    const beginText = itCanOverflow
        ? splittedText.slice(0, amountOfWords - 1).join(' ')
        : post.content;
    const endText = splittedText.slice(amountOfWords - 1).join(' ');

    const [likeCount, setLikeCount] = useState<number>(post.noOfLikes);
    const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
    const [sharePopUp, setSharePopUp] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(post.isPostSaved);
    const [commentSection, setCommentSection] = useState<boolean>(false);
    
    const [isFollowed, setIsFollowed] = useState<boolean>(post.isFollowed);
    const [followLoading, setFollowingLoading] = useState<boolean>(false);

    const [isPostDeleted, setIsPostDeleted] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const likeBtnHandle = async () => {
        try {
        const response = await postService.toggleLike(post._id, isLiked);
        setLikeCount(response.data.data.likeCount);
        setIsLiked(!isLiked);
        } catch (error) {}
    };

    const saveBtnHandle = async () => {
        try {
            await postService.toggleSave(post._id, isSaved);
            setIsSaved(!isSaved);
        }
        catch (error) {}
    };

    const handleFollow = async () => {
        try {
            setFollowingLoading(true);
            await userService.addFollower(post.userId);
            setIsFollowed(true);
            setFollowingLoading(false);
        }
        catch(err) {
            setFollowingLoading(false);   
        }
    }

    const handlePostDelete = async () => {
        try {
            setIsDeleting(true);
            await postService.deletePost(post._id);
            setIsDeleting(false);
            setIsPostDeleted(true);
        }
        catch(err) {
            setIsDeleting(false);
        }
        finally {
            setIsDeleting(false);
        }
    }

    useEffect(() => {
        const localId = localStorage.getItem("UserId");
        setIsOwnPost(post.userId === localId);
    }, []);

    return (
        <div className='relative'>
        <div ref={ref} className="bg-white rounded-xl py-2 md:py-4 px-4 md:px-12 dark:bg-gray-900 shadow-sm shadow-blue-100 dark:shadow-slate-800 space-y-4">
        {/* Profile */}
        <div className="flex gap-2 md:gap-4 justify-start items-center relative">
            <img src={post.profilePicture} alt="" className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"/>
            <div>
                <Link to={`/user/${post.userId}`} className="font-bold hover:underline cursor-pointer dark:text-white max-md:text-sm">
                    {post.userName}
                </Link>
                <p className="text-zinc-600 dark:text-zinc-400 max-md:text-xs text-sm">
                    {timeDifference(post.createdAt)}
                </p>
            </div>
            {
                !ownPost && (
                    !isFollowed ? (
                        <button onClick={() => handleFollow()} className={`flex items-center h-fit ml-auto px-2 md:px-4 py-1 md:py-2 rounded-full text-white font-bold transition-all max-sm:text-sm bg-blue-600 hover:bg-blue-800`}>
                            <img src={followIcon} alt="" className="w-3 h-3 md:w-4 md:h-4 object-contain invert mr-2"/>
                            {
                                followLoading ? (
                                    <span className='flex items-center'>
                                        Following&nbsp;&nbsp;
                                        <ButtonLoader />
                                    </span>
                                ) : (
                                    <span className='flex items-center'>
                                        Follow
                                    </span>
                                )
                            }
                        </button>
                    ) : (
                        <button disabled className="bg-gray-300 dark:bg-slate-600 text-gray-600 dark:text-gray-300 cursor-not-allowed h-fit ml-auto px-2 md:px-4 py-1 md:py-2 rounded-full font-bold max-sm:text-sm">Following</button>
                    )
                )
            }
            {
                
            }
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all dark:text-white ${ownPost && 'ml-auto'}`}>
                <BsThreeDotsVertical />
            </button>
            {isMenuOpen && (
            <div ref={menuRef} className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-40 overflow-hidden z-10" >
                {
                    isOwnPost && (
                        <>
                            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MdEdit className="text-lg text-blue-500" />
                                Edit
                            </button>

                            <button onClick={() => handlePostDelete()} className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                                <MdDelete className="text-lg text-red-500" />
                                Delete
                            </button>
                        </>
                        
                    )
                }
                <button className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MdReportGmailerrorred className="text-lg text-red-500" />
                    Report
                </button>
            </div>
            )}
        </div>

        {/* Content */}
        <pre className="font-sans dark:text-white whitespace-pre-wrap break-words">
            {beginText}
            {itCanOverflow && (
            <>
                {!isContentExpanded && <span>...</span>}
                <span className={!isContentExpanded ? 'hidden' : ''}>{endText}</span>
                <span
                className="text-blue-600 dark:text-blue-500 font-bold cursor-pointer ml-1"
                onClick={() => setIsContentExpanded(!isContentExpanded)}
                >
                {isContentExpanded ? '(show less)' : '(show more)'}
                </span>
            </>
            )}
        </pre>

        <p className="flex gap-2">
            {post.tags.map((tag, index) => (
            <a
                href=""
                key={index}
                className="text-blue-600 dark:text-blue-500 font-bold hover:underline hover:underline-offset-4"
            >
                #{tag}
            </a>
            ))}
        </p>

        {/* Media */}
        <div className="rounded overflow-hidden">
            {post.fileData.length === 1 &&
            post.fileData[0].type.startsWith('video') ? (
            <video
                src={post.fileData[0].url}
                controls
                className="w-full max-h-[500px] object-contain rounded"
            />
            ) : (
            <div
                className={`grid gap-2 rounded overflow-hidden ${
                post.fileData.length === 1
                    ? 'grid-cols-1'
                    : post.fileData.length === 2
                    ? 'grid-cols-2'
                    : post.fileData.length === 3
                    ? 'grid-cols-2 grid-rows-2'
                    : 'grid-cols-2'
                }`}
            >
                {post.fileData.slice(0, 4).map((file, index) => (
                <div
                    key={index}
                    onClick={() => openImage(index)}
                    className="flex justify-center items-center bg-gray-100 dark:bg-gray-900 rounded w-full h-40 sm:h-48 md:h-56 overflow-hidden relative cursor-pointer"
                >
                    <img
                    src={file.url}
                    alt={`Post Image ${index}`}
                    className={`max-w-full max-h-full object-contain ${
                        index === 3 && post.fileData.length > 4 ? 'opacity-40' : ''
                    }`}
                    />
                    {index === 3 && post.fileData.length > 4 && (
                    <p className="absolute text-gray-700 dark:text-white text-4xl sm:text-5xl font-extrabold">
                        +{post.fileData.length - 4}
                    </p>
                    )}
                </div>
                ))}
            </div>
            )}
        </div>

        {/* Post meta */}
        <div className="flex gap-3 md:gap-6 text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
            <p>{likeCount} Likes</p>
            <p>{post.noOfComments} Comments</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between dark:text-white">
            <button
            onClick={likeBtnHandle}
            className="flex justify-center items-center h-fit px-2 md:px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-700 rounded-lg max-md:text-sm"
            >
            <img
                src={isLiked ? likeIcon : notLikeIcon}
                alt=""
                className="w-4 h-4 md:w-5 md:h-5 dark:invert"
            />
            &nbsp;Like
            </button>
            <button
            onClick={() => setCommentSection(!commentSection)}
            className="flex justify-center items-center h-fit px-2 md:px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-700 rounded-lg max-md:text-sm"
            >
            <img
                src={commentIcon}
                alt=""
                className="w-4 h-4 md:w-5 md:h-5 dark:invert"
            />
            &nbsp;Comments
            </button>
            <button className="flex justify-center items-center h-fit px-2 md:px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-700 rounded-lg max-md:text-sm">
            <img
                src={sendIcon}
                alt=""
                className="w-4 h-4 md:w-5 md:h-5 dark:invert"
            />
            &nbsp;Send
            </button>
            <button
            onClick={() => setSharePopUp(true)}
            className="flex justify-center items-center h-fit px-2 md:px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-700 rounded-lg max-md:text-sm"
            >
            <img
                src={shareIcon}
                alt=""
                className="w-4 h-4 md:w-5 md:h-5 dark:invert"
            />
            &nbsp;Share
            </button>
            <button
            onClick={saveBtnHandle}
            className="flex justify-center items-center h-fit px-2 md:px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-700 rounded-lg max-md:text-sm"
            >
            <img
                src={isSaved ? saveIcon : notSaveIcon}
                alt=""
                className="w-4 h-4 md:w-5 md:h-5 dark:invert"
            />
            &nbsp;Save
            </button>
        </div>

        {isImageOpen && (
            <ImageContainer
            fileData={post.fileData}
            index={currentImage}
            setIsImageOpen={setIsImageOpen}
            />
        )}

        {commentSection && (
            <CommentSection
            postId={post._id}
            noOfComments={post.noOfComments}
            />
        )}

        {sharePopUp && (
            <SharePopUp
            postId={post._id}
            url={`${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`}
            setSharePopUp={setSharePopUp}
            />
        )}
        </div>
        {
            isEditing && (
                <EditPostForm post={{
                    _id: post._id,
                    content: post.content,
                    tags: post.tags,
                    visibility: post.visibility,
                    mediaUrls: post.fileData
                }}
                setIsEditing={setIsEditing} />
            )
        }
        {
            isPostDeleted && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl z-20">
                    <div className="flex flex-col items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-12 w-12 text-red-500" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                        </svg>
                        <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg text-center">This post has been deleted</p>
                    </div>
                </div>
            )
        }
        {
            isDeleting && <DeletingPostLoading />
        }
        </div>
    );
});

export default Post;