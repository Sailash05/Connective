import { useState } from 'react';
import { postService } from '../../../service/post.service';
import { type PostType } from '../../../types/postType.ts';
import { timeDifference } from '../../../utils/dateAndTime';
import SharePopUp from './SharePopUp.tsx';

import followIcon from '../../../assets/mainPageImages/postContainerIcons/follow.png';
import notLikeIcon from '../../../assets/mainPageImages/postContainerIcons/not_like.png';
import likeIcon from '../../../assets/mainPageImages/postContainerIcons/like.png';
import commentIcon from '../../../assets/mainPageImages/postContainerIcons/comment.png';
import sendIcon from '../../../assets/mainPageImages/postContainerIcons/send.png';
import shareIcon from '../../../assets/mainPageImages/postContainerIcons/share.png';

import saveIcon from '../../../assets/mainPageImages/postContainerIcons/save.png';
import notSaveIcon from '../../../assets/mainPageImages/postContainerIcons/not_save.png';

const Post = ({ post }: { post: PostType}) => {

    const userId: string = localStorage.getItem('UserId') || "";

    const [isContentExpanded, setIsContentExpanded] = useState<boolean>(false);
    const [sharePopUp, setSharePopUp] = useState<boolean>(false);

    const amountOfWords = 25;

    const splittedText = post.content.split(' ')
    const itCanOverflow = splittedText.length > amountOfWords
    const beginText = itCanOverflow
        ? splittedText.slice(0, amountOfWords - 1).join(' ')
        : post.content;
    const endText = splittedText.slice(amountOfWords - 1).join(' ')

    const [likeCount, setLikeCount] = useState<number>(post.likes.length);
    const [isLiked, setIsLiked] = useState<boolean>(
        post.likes.some((id: any) => id.toString() === userId)
    );

    const [comment, setComment] = useState<number>(post.comments.length);
    const [share, setShare] = useState<number>(post.shares.length);

    const [isSaved, setIsSaved] = useState<boolean>(post.isPostSaved);

    const likeBtnHandle = async () => {
        try {
            const response = await postService.toggleLike(post._id, isLiked);
            setLikeCount(response.data.data.likeCount);
            setIsLiked(!isLiked);
        }
        catch(error) {

        }
    }
    const saveBtnHandle = async () => {
        try {
            const response = await postService.toggleSave(post._id, isSaved);
            setIsSaved(!isSaved);
        }
        catch(error) {

        }
    }

    return(
        <div className='bg-white rounded-2xl py-4 px-12 dark:bg-slate-950 shadow-md shadow-blue-100 dark:shadow-slate-800 space-y-4'>

            {/* Profile */}
            <div className='flex gap-4 justify-start items-center'>
                <img src={post.profilePicture} alt="" className='h-10 w-10 rounded-full object-cover' />
                <div>
                    <h3 className='font-bold hover:underline cursor-pointer dark:text-white'>{post.userName}</h3>
                    <p className='text-zinc-600 dark:text-zinc-400'>{timeDifference(post.createdAt)}</p>
                </div>
                <button className="flex items-center h-fit ml-auto bg-blue-600 px-4 py-2 rounded-full text-white font-bold hover:bg-blue-800 transition-all">
                    <img src={followIcon} alt="" className="w-4 h-4 object-contain invert mr-2" />
                    Follow
                </button>
            </div>

            {/* {
                if(post.content.length)
            } */}

            <pre className='font-sans dark:text-white whitespace-pre-wrap break-words'>
                {beginText}
                { itCanOverflow && (
                    <>
                        {!isContentExpanded && <span>...</span>}
                        <span className={`${!isContentExpanded && 'hidden'}`} > 
                            {endText}
                        </span>
                        <span className='text-blue-600 dark:text-blue-500 font-bold cursor-pointer ml-1' onClick={() => setIsContentExpanded(!isContentExpanded)}>
                            {isContentExpanded ? '(show less)' : '(show more)'}
                        </span>
                    </>
                )}
            </pre>

            <p className='flex gap-2'>
                {
                    post.tags.map((tag, index) => <a href='' key={index} className='text-blue-600 dark:text-blue-500 font-bold'>#{tag}</a>)
                }
            </p>

            {/* Image container */}
            <div className="grid grid-cols-2 gap-2 rounded overflow-hidden">
                {
                    post.fileData.map((file, index) => <img src={file.url} alt="Post Image" key={index} className="w-full h-48 object-cover rounded" />)
                }
            </div>

            {/* Post meta data */}
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300 font-medium">
                <p>{likeCount} Likes</p>
                <p>{comment} Comments</p>
                <p>{share} Share</p>
            </div>


            <div className='flex justify-between dark:text-white'>
                <button onClick={() => likeBtnHandle()} className='flex justify-center items-center h-fit px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-800'>
                    <img src={isLiked ? likeIcon : notLikeIcon} alt="" className='w-5 h-5 dark:invert' />
                    &nbsp;Like
                </button>
                <button className='flex justify-center items-center h-fit px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-800'>
                    <img src={commentIcon} alt="" className='w-5 h-5 dark:invert' />
                    &nbsp;Comments
                </button>
                <button className='flex justify-center items-center h-fit px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-800'>
                    <img src={sendIcon} alt="" className='w-5 h-5 dark:invert' />
                    &nbsp;send
                </button>
                <button onClick={() => setSharePopUp(true)} className='flex justify-center items-center h-fit px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-800'>
                    <img src={shareIcon} alt="" className='w-5 h-5 dark:invert' />
                    &nbsp;Share
                </button>
                <button onClick={() => saveBtnHandle()} className='flex justify-center items-center h-fit px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-800'>
                    <img src={isSaved ? saveIcon : notSaveIcon} alt="" className='w-5 h-5 dark:invert' />
                    &nbsp;Save
                </button>
            </div>
            {
                sharePopUp && <SharePopUp url={`${import.meta.env.VITE_FRONTEND_URL}/home/post/${post._id}`} setSharePopUp={setSharePopUp} />
            }
        </div>
    );
}

export default Post;