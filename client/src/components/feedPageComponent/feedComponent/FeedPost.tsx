import { useState, useEffect } from 'react';
import { userService } from '../../../service/user.service';
import { useCreatePost } from '../../../context/CreatePostContext';

import addImageIcon from '../../../assets/mainPageImages/feedSectionIcons/add-image.png';
import addVideoIcon from '../../../assets/mainPageImages/feedSectionIcons/add-video.png';
import addFileIcon from '../../../assets/mainPageImages/feedSectionIcons/add-file.png';
import addLinkIcon from '../../../assets/mainPageImages/feedSectionIcons/add-link.png';

const FeedPost = () => {
    const { setCreatePost } = useCreatePost();

    const [profilePicture, setProfilePicture] = useState<string>("https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg");

    useEffect(() => {
        const getProfilePicture = async () => {
            try {
                const response = await userService.getProfilePicture();
                if(response.status === 200) {
                    setProfilePicture(response.data.data.profilePictureUrl);
                }
                else if(response.status === 404) {
                    setProfilePicture("https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg");
                }
            }
            catch(err) {
                setProfilePicture("https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg");
            }
        }

        getProfilePicture();
    }, []);

    return(
        <div className="bg-white rounded-2xl py-4 px-8 dark:bg-slate-950 shadow-md shadow-blue-100 dark:shadow-slate-800">
            <div className='flex gap-4'>
                <img src={profilePicture} alt="" className="h-10 w-10 rounded-full object-cover" />
                <input type="text" placeholder={`What's on your mind?`} onClick={() => setCreatePost(true)} defaultValue="" readOnly className='bg-gray-100 dark:bg-white w-[18rem] flex-grow py-2 px-6 rounded-full outline-none placeholder:text-black dark:hover:bg-gray-100 hover:bg-gray-50 transition-all' />
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