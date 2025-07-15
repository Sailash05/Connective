import { useNavigate } from 'react-router-dom';

import warningIcon from '../../assets/icons/warning.png';

const Logout = ({ setLogoutPopup }: { setLogoutPopup: (value: boolean) => void }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        const removeItems: string[] = ['Token', 'UserId'];
        removeItems.forEach(item => localStorage.removeItem(item));
        navigate('/');
    }

    return(
        <div className="w-[100dvw] h-[100dvh] fixed top-0 left-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-10">
            <div className="max-w-sm w-full  bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center gap-3 text-center dark:bg-slate-900">
                <img src={warningIcon} alt="Success Icon" width={80} className="mb-2" />

                <h3 className="text-3xl font-extrabold dark:text-white">Logout</h3>
                <p className="text-slate-700 dark:text-slate-200 text-base">Are you sure want to logout?</p>

                <div className='flex gap-5'>
                    <button onClick={() => setLogoutPopup(false)} className="mt-4 bg-slate-400 hover:bg-slate-600 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300">No</button>
                    <button onClick={() => handleLogout()} className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300">Yes</button>
                </div>
            </div>
        </div>
    );
}

export default Logout;