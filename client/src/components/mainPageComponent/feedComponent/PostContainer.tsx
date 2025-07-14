import type { PostType } from '../../../pages/mainPage/Section/FeedSection';

import profileIcon from '../../../assets/icons/profile.png';
import followIcon from '../../../assets/mainPageImages/postContainerIcons/follow.png';

import notLikeIcon from '../../../assets/mainPageImages/postContainerIcons/not_like.png';
import commentIcon from '../../../assets/mainPageImages/postContainerIcons/comment.png';
import sendIcon from '../../../assets/mainPageImages/postContainerIcons/send.png';
import shareIcon from '../../../assets/mainPageImages/postContainerIcons/share.png';
import notSaveIcon from '../../../assets/mainPageImages/postContainerIcons/not_save.png';

const PostContainer = ({ post }: { post: PostType}) => {

    return(
        <div className='bg-white rounded-2xl py-4 px-12 dark:bg-slate-950 shadow-md shadow-blue-100 dark:shadow-slate-800 space-y-4'>

            {/* Profile */}
            <div className='flex gap-4 justify-start items-center'>
                <img src={profileIcon} alt="" width={45} className='dark:invert' />
                <div>
                    <h3 className='font-bold hover:underline cursor-pointer dark:text-white'>{post.userName}</h3>
                    <p className='text-zinc-600 dark:text-zinc-400'>2w ago</p>
                </div>
                <button className="flex items-center h-fit ml-auto bg-blue-600 px-4 py-2 rounded-full text-white font-bold hover:bg-blue-800 transition-all">
                    <img src={followIcon} alt="" className="w-4 h-4 object-contain invert mr-2" />
                    Follow
                </button>
            </div>

            <p className='dark:text-white'>
                {post.content}
            </p>

            {/* Image container */}
            <div className="grid grid-cols-2 gap-2 rounded overflow-hidden">
                {
                    post.fileData.map((file, index) => <img src={file.url} alt="Post Image" key={index} className="w-full h-48 object-cover rounded" />)
                }
            </div>

            {/* Post meta data */}
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-300 font-medium">
                <p>{post.likes.length} Likes</p>
                <p>{post.comments.length} Comments</p>
                <p>{post.shares.length} Share</p>
            </div>


            <div className='flex justify-between dark:text-white'>
                <button className='flex justify-center items-center h-fit px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-800'>
                    <img src={notLikeIcon} alt="" className='w-5 h-5 dark:invert' />
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
                <button className='flex justify-center items-center h-fit px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-800'>
                    <img src={shareIcon} alt="" className='w-5 h-5 dark:invert' />
                    &nbsp;Share
                </button>
                <button className='flex justify-center items-center h-fit px-4 py-1 flex-grow hover:bg-gray-100 transition-all dark:hover:bg-slate-800'>
                    <img src={notSaveIcon} alt="" className='w-5 h-5 dark:invert' />
                    &nbsp;Save
                </button>
            </div>
        </div>
    );
}

export default PostContainer;