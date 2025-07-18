import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import SignUpSection from './section/SignUpSection'
import LoginSection from './section/LoginSection';
import FailMessage from "../../components/message/FailMessage";
import SuccessMessage from '../../components/message/SuccessMessage';

import loginPageImage from '../../assets/loginPageImage/image.png';
import rightArrow from '../../assets/loginPageImage/right-arrow.png'

const LoginPage = () => {
    const location = useLocation();
    const redirectPath = location.state?.from?.pathname || '/home';

    const [loginSection, setLoginSection] = useState(false);

    const [failMessage, setFailMessage] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [msg, setMsg] = useState<string[]>([]);
    const [buttonTxt, setButtonTxt] = useState<string>("");

    const showFailMessage = (title: string, msg: string[], buttonTxt: string): void => {
        setTitle(title);
        setMsg(msg);
        setButtonTxt(buttonTxt);
        setSuccessMessage(false);
        setFailMessage(true);
    }

    const showSuccessMessage = (title: string, msg: string[], buttonTxt: string): void => {
        setTitle(title);
        setMsg(msg);
        setButtonTxt(buttonTxt);
        setFailMessage(false);
        setSuccessMessage(true);
    }

    return(
        <div className="h-[100dvh] pt-5 px-[1rem] md:pt-10 md:px-[14rem] dark:bg-slate-950">

            <header className="flex items-center justify-start mb-4">
                <div className="bg-blue-600 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
                    C
                </div>
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide ml-2 dark:text-white mr-auto">Connective</h1>
                <Link to='/'>
                    <button className='flex justify-center items-center bg-blue-600 p-1 md:p-2 rounded-md hover:bg-blue-800 transition-all'>
                        <img src={rightArrow} alt="" width={15} className='rotate-180 mr-1 invert' />
                        <p className='font-bold text-white'>Go Back</p>
                    </button>
                </Link>
            </header>

            <div className='flex gap-4 h-[80dvh] mt-8'>

                {/* Left section */}
                <section className="hidden h-full w-[50%] md:flex flex-col justify-center">
                    <h1 className='px-8 text-3xl font-extrabold dark:text-white'>Build a world class</h1>
                    <h1 className='px-8 text-3xl font-extrabold dark:text-white'>connection with <span className='text-blue-600 dark:text-blue-500'>Connective</span></h1>
                    <p className='text-slate-700 px-8 mt-4 dark:text-slate-200'>Join a growing community and take the next step in your personal and professional growth.</p>
                    <img src={loginPageImage} alt="" width={400} className='bg-red-200 mx-auto mt-8' />
                    
                </section>

                {/* Right section */}
                <section className="h-full w-[100%] mx-auto md:w-[50%] bg-blue-50 rounded-3xl px-4 md:px-14 py-5">
                    <h2 className='text-2xl md:text-3xl font-extrabold text-black'>Welcome to Connective</h2>
                    <p className='text-sm text-black'>Unlock your team potential</p>
                    {
                        loginSection ? <LoginSection setLoginSection={setLoginSection} redirectPath={redirectPath} showFailMessage={showFailMessage} showSuccessMessage={showSuccessMessage} /> : <SignUpSection setLoginSection={setLoginSection} redirectPath={redirectPath} showFailMessage={showFailMessage}/>
                    }
                </section>
             </div>
            {
                failMessage && <FailMessage title={title} message={msg} button={buttonTxt} buttonFunc={() => setFailMessage(false)} />
            }
            {
                successMessage && <SuccessMessage title={title} message={msg} button={buttonTxt} buttonFunc={() => setSuccessMessage(false)} />
            }
        </div>
    );
}

export default LoginPage;