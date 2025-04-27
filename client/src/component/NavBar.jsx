import { useState, useEffect} from "react"
import { navLinks } from "../utils/constants"

const NavBar = () => {
    const [darkMode, setDarkMode] = useState(false);

    const darkModeLogo = darkMode ? 'public/asserts/dark-mode-icons/dark.png' : 'public/asserts/dark-mode-icons/light.png';
 
    function toggleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
    }

    useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkMode]);

    return (
    <nav className="flex gap-[2.5rem] h-[3rem] justify-end items-center px-[12rem] py-10 dark:bg-black">
        <h2 className="font-semibold text-4xl mr-auto text-blue-600 dark:text-white">Connective</h2>
        <ul className="flex gap-[3rem]">
            {
                navLinks.map((navLink, index) => (
                <li className="font-medium text-[1.1rem] px-3 py-2 cursor-pointer text-slate-600 hover:text-slate-900 hover:scale-105 transition-transform dark:text-slate-100" key={navLink.label}>{navLink.label}</li>
                ))
            }
        </ul>
        <button className="p-2" onClick={toggleDarkMode}><img src={darkModeLogo} alt="Dark Mode Logo" width={25} className="dark:invert-[100%]" /></button>
        <button className="bg-blue-600 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition-colors">Log in</button>
    </nav>
    )
}

export default NavBar;