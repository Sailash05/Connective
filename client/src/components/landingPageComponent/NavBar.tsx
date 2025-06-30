import { useEffect, useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

import lightModeIcon from '../../assets/icons/light-mode.png';
import darkModeIcon from '../../assets/icons/dark-mode.png';

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const handleMenubtn = () => {
        setMenuOpen(!menuOpen);
    }

    useEffect(() => {
        const root = window.document.documentElement;
        darkMode ? root.classList.add('dark') : root.classList.remove('dark');
    }, [darkMode]);

    return(
        <nav className="w-full fixed top-0 left-0 right-0 z-50 shadow-sm dark:shadow-slate-800 bg-white dark:bg-slate-950">
            <div className="w-[90%] md:w-[70%] mx-auto flex justify-between items-center gap-10 py-3 md:py-4 h-full">
                <h1 className="mr-auto text-2xl md:text-4xl font-extrabold text-blue-600 dark:text-white cursor-pointer">
                    <a href="#home">Connective</a>
                </h1>
                <ul className="hidden md:flex gap-10 text-lg font-medium dark:text-white">
                    <li><a href='#home'>Home</a></li>
                    <li><a href='#features'>Features</a></li>
                    <li><a href='#reviews'>Reviews</a></li>
                    <li><a href='#blogs'>Blogs</a></li>
                    <li><a href='#faq'>Faq</a></li>
                </ul>
                <button className="cursor-pointer dark:invert" onClick={() => setDarkMode(!darkMode)}>
                    {
                        darkMode ? <img src={darkModeIcon} alt="Dark-mode icon" width={25} /> : <img src={lightModeIcon} alt="dark-mode icon" width={25} />
                    }
                </button>
                <button className="hidden md:block bg-blue-600 px-5 py-3 rounded-full font-extrabold text-white cursor-pointer hover:bg-blue-800 transition-all">Log in</button>
                <button className='md:hidden text-3xl dark:text-white' onClick={handleMenubtn}>
                    {
                        menuOpen ?  <IoClose /> : <IoMenu />
                    }
                </button>
            </div>
            {
                menuOpen && (
                    <ul className="md:hidden flex flex-col items-center gap-6 py-6 bg-white dark:bg-slate-950 shadow-md text-lg font-medium transition-transform duration-300 dark:text-white dark:shadow-slate-800">
                        <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
                        <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
                        <li><a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a></li>
                        <li><a href="#blogs" onClick={() => setMenuOpen(false)}>Blogs</a></li>
                        <li><a href="#faq" onClick={() => setMenuOpen(false)}>Faq</a></li>
                        <li>
                            <button className="bg-blue-600 px-5 py-2 rounded-full font-extrabold text-white hover:bg-blue-800 transition-all">Log in</button>
                        </li>
                    </ul>
                )
            }            
        </nav>
    );
}

export default NavBar;