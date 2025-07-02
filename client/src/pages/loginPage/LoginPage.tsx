import { useState } from 'react';

import SignUpSection from './section/SignUpSection'
import LoginSection from './section/LoginSection';

import loginPageImage from '../../assets/loginPageImage/image.png';
import rightArrow from '../../assets/loginPageImage/right-arrow.png'

const LoginPage = () => {

    const [loginSection, setLoginSection] = useState(true);

    return(
        <div className="h-fit pt-5 px-[1rem] md:pt-10 md:px-[14rem]">

            <header className="flex items-center justify-start mb-4">
                <div className="bg-blue-600 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
                    C
                </div>
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide ml-2">Connective</h1>
                <button className='ml-auto flex justify-center items-center bg-blue-600 p-1 md:p-2 rounded-md hover:bg-blue-800 transition-all'>
                    <img src={rightArrow} alt="" width={15} className='rotate-180 mr-1 invert' />
                    <p className='font-bold text-white'>Go Back</p>
                </button>
            </header>

            <div className='flex gap-4 h-[80dvh] mt-8'>

                {/* Left section */}
                <section className="hidden h-full w-[50%] md:flex flex-col justify-center">
                    <h1 className='px-8 text-3xl font-extrabold'>Build a world class</h1>
                    <h1 className='px-8 text-3xl font-extrabold'>connection with <span className='text-blue-600'>Connective</span></h1>
                    <p className='text-slate-700 px-8 mt-4'>Join a growing community and take the next step in your personal and professional growth.</p>
                    <img src={loginPageImage} alt="" width={400} className='bg-red-200 mx-auto mt-8' />
                    
                </section>

                {/* Right section */}
                <section className="h-full w-[100%] mx-auto md:w-[50%] bg-blue-50 rounded-3xl px-4 md:px-14 py-5">
                    <h2 className='text-2xl md:text-3xl font-extrabold text-black'>Welcome to Connective</h2>
                    <p className='text-sm text-black'>Unlock your team potential</p>
                    {
                        loginSection ? <LoginSection setLoginSection={setLoginSection}/> : <SignUpSection setLoginSection={setLoginSection}/>
                    }
                </section>
             </div>
        </div>
    );
}

export default LoginPage;