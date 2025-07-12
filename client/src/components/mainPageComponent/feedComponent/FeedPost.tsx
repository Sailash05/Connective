import profileIcon from '../../../assets/icons/profile.png';
import addImageIcon from '../../../assets/mainPageImages/feedSectionIcons/add-image.png';
import addVideoIcon from '../../../assets/mainPageImages/feedSectionIcons/add-video.png';
import addFileIcon from '../../../assets/mainPageImages/feedSectionIcons/add-file.png';
import addLinkIcon from '../../../assets/mainPageImages/feedSectionIcons/add-link.png';

const FeedPost = ({ setCreatePost }: { setCreatePost: (value: boolean) => void}) => {

    return(
        <div className="bg-white rounded-2xl py-4 px-8 dark:bg-slate-800 shadow-md shadow-blue-100 dark:shadow-slate-800">
            <div className='flex gap-4'>
                <img src={profileIcon} alt="" width={45} className='dark:invert' />
                <input type="text" placeholder={`What's on your mind?`} onClick={() => setCreatePost(true)} defaultValue="" className='bg-gray-100 dark:bg-white w-[18rem] flex-grow py-2 px-6 rounded-full outline-none placeholder:text-black dark:hover:bg-gray-100 hover:bg-gray-50 transition-all' />
            </div>

            <div className='mt-4 pl-4 flex gap-4'>
                <button onClick={() => setCreatePost(true)}><img src={addImageIcon} alt="" width={25} className='dark:invert hover:scale-110 transition-all' /></button>
                <button onClick={() => setCreatePost(true)}><img src={addVideoIcon} alt="" width={25} className='dark:invert hover:scale-110 transition-all' /></button>
                <button onClick={() => setCreatePost(true)}><img src={addFileIcon} alt="" width={25} className='dark:invert hover:scale-110 transition-all' /></button>
                <button onClick={() => setCreatePost(true)}><img src={addLinkIcon} alt="" width={25} className='dark:invert hover:scale-110 transition-all' /></button>
                <button onClick={() => setCreatePost(true)} className='ml-auto py-2 px-6 rounded-full bg-blue-600 hover:bg-blue-800 transition-all text-white font-bold'>Post</button>
            </div>
        </div>
    );
}

export default FeedPost;