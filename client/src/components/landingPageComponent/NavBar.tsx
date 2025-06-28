import lightModeIcon from '../../assets/icons/light-mode.png';
//import darkModeIcon from '../assets/icons/dark-mode.png';

const NavBar = () => {

    return(
        <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-white shadow-sm h-[5rem]">
            <div className="w-[70%] max-w-7xl mx-auto flex justify-between items-center gap-10 py-4 h-full">
                <h1 className="mr-auto text-4xl font-extrabold text-blue-600 cursor-pointer">Connective</h1>
                <ul className="flex gap-10 text-lg font-medium">
                    <li>Home</li>
                    <li>Features</li>
                    <li>Reviews</li>
                    <li>Blogs</li>
                    <li>Contact Us</li>
                </ul>
                <button className="cursor-pointer">
                    <img src={lightModeIcon} alt="dark-mode icon" width={30} />
                </button>
                <button className="bg-blue-600 px-5 py-3 rounded-full font-extrabold text-white cursor-pointer hover:bg-blue-800 transition-all">Log in</button>
            </div>
        </nav>
    );
}

export default NavBar;