import { useState, useEffect} from "react"
import { navLinks } from "../utils/constants"

const NavBar = () => {
    const [darkMode, setDarkMode] = useState(false);

    const darkModeLogo = darkMode ? '/asserts/dark-mode-icons/dark.png' : '/asserts/dark-mode-icons/light.png';
 
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
    <nav className={`flex gap-[2.5rem] w-full h-[3rem] justify-end items-center px-[12rem] py-10 dark:bg-gray-950 max-sm:px-[1.3rem] max-sm:py-7 border-b-2 ${darkMode?'border-slate-800':'bg-white'} fixed top-0 z-10`}>
        <h2 className="font-bold text-4xl mr-auto text-blue-600 dark:text-white max-sm:text-2xl">Connective</h2>
        <ul className="flex gap-[2rem] max-sm:hidden">
            {
                navLinks.map((navLink, index) => (
                <li className="font-medium text-[1.1rem] px-3 py-2 cursor-pointer text-slate-600 hover:text-slate-900 hover:scale-105 transition-transform dark:text-slate-100" key={navLink.label}>{navLink.label}</li>
                ))
            }
        </ul>
        <button className="p-2" onClick={toggleDarkMode}><img src={darkModeLogo} alt="Dark Mode Logo" width={25} className="dark:invert-[100%]" /></button>
        <button className="bg-blue-600 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition-colors max-sm:hidden">Log in</button>

        <button className={`hidden max-sm:block ${darkMode ? "invert-[100%]" : "invert-0"}`}><img src="/asserts/front-page-logos/menu.png" alt="Hamburger Menu" width={20} /></button>
    </nav>
    )
}

export default NavBar;