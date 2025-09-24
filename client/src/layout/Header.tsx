import { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';

import { ThemeContext } from '../context/ThemeContext';
import { userService } from '../service/user.service';
import { useCreatePost } from '../context/CreatePostContext';

import { IoMenu, IoClose } from "react-icons/io5";
import upgradeIcon from '../assets/mainPageImages/upgrade.png';
import createPostIcon from '../assets/mainPageImages/createPost.png';
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineMessage, MdReportGmailerrorred } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import darkModeIcon from '../assets/icons/light-mode.png';
import lightModeIcon from '../assets/icons/dark-mode.png';
import settingsIcon from '../assets/mainPageImages/sideNavBarIcons/settings.png';
import { MdLogout } from "react-icons/md";

import { version } from '../constants/metaData';

const Header = ({ setLogoutPopup, isSideBarOpen, setIsSideBarOpen }: { 
    setLogoutPopup: (logoutPopup: boolean) => void,
    isSideBarOpen: boolean,
    setIsSideBarOpen: (isSideBarOpen: boolean) => void
}) => {

    const { setCreatePost } = useCreatePost();

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const [profilePicture, setProfilePicture] = useState<string>("https://res.cloudinary.com/djbmyn0fw/image/upload/v1752897230/default-profile_n6tn9o.jpg");
    const [email, setEmail] = useState<string>('your_email@example.com');
    const [userName, setUserName] = useState<string>('User Name');

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
    const profileMenuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsProfileMenuOpen(false);
            }
        };
        if (isProfileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } 
        else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileMenuOpen]);

    useEffect(() => {
        const getProfilePicture = async () => {
            try {
                const response = await userService.getProfilePicture();
                if(response.status === 200) {
                    const data = response.data.data;
                    setUserName(data.userName || userName);
                    setEmail(data.email || email);
                    setProfilePicture(data.profilePicture);
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
        <header className="flex justify-between items-center py-2 md:py-3 px-4 md:px-16 border-b border-gray-300 dark:border-gray-600 max-md:h-[3.5rem]">

            <button onClick={() => setIsSideBarOpen(!isSideBarOpen)} className='md:hidden text-3xl dark:text-white mr-3'>
                {
                    isSideBarOpen ?  <IoClose /> : <IoMenu />
                }
            </button>

            <div className='basis-1/2 md:basis-1/3'>
                <Link to='/home' className='text-xl md:text-3xl font-extrabold text-blue-600 dark:text-white cursor-pointer w-fit'>Connective <span className='text-xs'>{version}</span></Link>
            </div>
            
            <div className='hidden md:flex justify-center items-center basis-1/3'>
                <div className='relative flex justify-center items-center'>
                    <input type="text" placeholder='Search...' className='p-2 pl-5 w-[350px] rounded-full bg-gray-200 hover:bg-gray-100 focus:outline-blue-600 placeholder:text-black dark:bg-white transition-all focus:bg-gray-100' />
                    <IoMdSearch className='text-3xl absolute right-2'/>
                </div>
            </div>

            <div className='flex justify-end items-center gap-4 basis-1/2 md:basis-1/3'>

                <button className='md:hidden text-3xl p-1 dark:text-white'><IoMdSearch /></button>

                <button onClick={() => setCreatePost(true)} className='p-2 bg-fuchsia-400 shadow-md bg-gradient-to-r from-[#FF512F] via-[#F09819] to-[#FF512F] bg-[length:200%_auto] transition-all duration-500 hover:bg-right rounded-lg'><img src={createPostIcon} alt="" className='invert w-3 md:w-5' /></button>

                <button className='hidden md:block text-2xl p-2 dark:text-white'><MdOutlineMessage /></button>

                <button className='hidden md:block text-2xl p-1 dark:text-white'><IoMdNotifications /></button>

                {/* PROFILE DROPDOWN */}
                <div className='flex pl-2 relative group'>
                    <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="h-full">
                        <img src={profilePicture} alt="User Avatar" className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover" />
                    </button>
                    {
                        isProfileMenuOpen && (
                            <div
                            ref={profileMenuRef}
                            className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
                                        rounded-lg border border-gray-200 dark:border-gray-600 shadow-xl w-64 z-30 
                                        animate-fadeIn"
                            >
                            {/* User Info Section */}
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <p className="font-semibold text-lg">{userName}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
                            </div>

                            <div className="md:hidden py-2">
                                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <MdOutlineMessage className='text-xl'/>
                                    Message
                                </button>

                                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <IoMdNotifications className='text-xl'/>
                                    Notifications
                                </button>
                            </div>

                            <hr className="md:hidden border-gray-200 dark:border-gray-700" />

                            {/* Menu Items */}
                            <div className="py-2">
                                <Link to={'/user'} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <img src={profilePicture} alt="Profile" className="h-6 w-6 rounded-full object-cover" />
                                    My Profile
                                </Link>

                                <button onClick={() => setDarkMode(!darkMode)} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <img src={darkMode?lightModeIcon:darkModeIcon} alt="" width={20} className='dark:invert' />
                                    Switch Theme
                                </button>

                                <Link to={'/saved-post'} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    Saved Post
                                </Link> 

                                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <img src={settingsIcon} alt="" width={20} className='dark:invert' />
                                    Settings
                                </button>                                

                                <button className="flex items-center justify-center gap-2 w-[90%] mx-auto my-2 py-2 text-sm font-bold text-white rounded-lg shadow-md bg-gradient-to-r from-[#4776E6] via-[#8E54E9] to-[#4776E6] bg-[length:200%_auto] transition-all duration-500 ease-in-out hover:bg-right">
                                    <img src={upgradeIcon} alt="Upgrade" width={18} className="invert" />
                                    <span>Upgrade</span>
                                </button>

                            </div>

                            <hr className="border-gray-200 dark:border-gray-700" />

                            {/* Report & Logout */}
                            <div className="py-2">
                                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <img src={darkModeIcon} alt="" width={20} className='dark:invert' />
                                    Help and Support
                                </button>
                                <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500">
                                <MdReportGmailerrorred className="text-lg" />
                                    Report a Problem
                                </button>
                                <button onClick={() => setLogoutPopup(true)} className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">
                                    <MdLogout />
                                    Logout
                                </button>
                            </div>
                            </div>
                        )
                        }
                </div>

            </div>
        </header> 
    );
}

export default Header;