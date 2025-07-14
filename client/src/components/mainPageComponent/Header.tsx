import { useContext } from 'react';

import { ThemeContext } from '../../context/ThemeContext';

import upgradeIcon from '../../assets/mainPageImages/upgrade.png';
import createPostIcon from '../../assets/mainPageImages/createPost.png';
import { IoMdNotifications } from "react-icons/io";
import profileIcon from '../../assets/icons/profile.png'
import { MdOutlineMessage } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import darkModeIcon from '../../assets/icons/light-mode.png';
import lightModeIcon from '../../assets/icons/dark-mode.png';

const Header = ({ setCreatePost }: {setCreatePost: (value: boolean) => void}) => {

    const { darkMode, setDarkMode } = useContext(ThemeContext);

    return(
         <header className="flex justify-between py-3 px-16 border-b border-gray-300 dark:border-gray-600">
            <div className='basis-1/3'>
                <h1 className='text-2xl md:text-3xl font-extrabold text-blue-600 dark:text-white cursor-pointer'>Connective</h1>
            </div>
            
            <div className='flex justify-center items-center basis-1/3'>
                <div className='relative flex justify-center items-center'>
                    <input type="text" placeholder='Search...' className='p-2 pl-5 w-[350px] rounded-full bg-gray-200 hover:bg-gray-100 focus:outline-blue-600 placeholder:text-black dark:bg-white transition-all focus:bg-gray-100' />
                    <IoMdSearch className='text-3xl absolute right-2'/>
                </div>
            </div>

            <div className='flex justify-end items-center gap-4 basis-1/3'>

                <button className='flex justify-center items-center h-full shadow-md bg-gradient-to-r from-[#4776E6] via-[#8E54E9] to-[#4776E6] bg-[length:200%_auto] transition-all duration-500 ease-in-out hover:bg-right px-4 rounded-lg text-white font-extrabold'>
                    <img src={upgradeIcon} alt="" width={20} className='invert' />
                    <p>&nbsp;Upgrade</p>
                </button>

                <button onClick={() => setCreatePost(true)} className='p-2 bg-fuchsia-400 shadow-md bg-gradient-to-r from-[#FF512F] via-[#F09819] to-[#FF512F] bg-[length:200%_auto] transition-all duration-500 hover:bg-right rounded-lg'><img src={createPostIcon} alt="" width={20} className='invert' /></button>

                <button className='text-2xl p-2 dark:text-white'><MdOutlineMessage /></button>

                <button className='text-2xl p-1 dark:text-white'><IoMdNotifications /></button>

                <button onClick={() => setDarkMode(!darkMode)} className='p-1'><img src={darkMode?lightModeIcon:darkModeIcon} alt="" width={25} className='dark:invert' /></button>

                <button className='pl-2'><img src={profileIcon} alt="" width={35} className='dark:invert' /></button>
            </div>
        </header> 
    );
}

export default Header;