import { useState } from 'react';

import SignUpSection from './section/SignUpSection'
import LoginSection from './section/LoginSection';

import loginPageImage from '../../assets/loginPageImage/image.png';

const LoginPage = () => {

    const [loginSection, setLoginSection] = useState(true);

    return(
        <div className="h-fit pt-10 px-[14rem]">

            <header className=''>
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded-full">
                        C
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-800 tracking-wide">Connective</h1>
                </div>
            </header>

            <div className='flex gap-4 h-[80dvh]'>

                {/* Left section */}
                <section className="h-full w-[50%] flex flex-col justify-center">
                    <h1 className='px-8 text-3xl font-extrabold'>Build a world class</h1>
                    <h1 className='px-8 text-3xl font-extrabold'>connection with <span className='text-blue-600'>Connective</span></h1>
                    <p className='text-slate-700 px-8 mt-4'>Join a growing community and take the next step in your personal and professional growth.</p>
                    <img src={loginPageImage} alt="" width={400} className='bg-red-200 mx-auto mt-8' />
                    
                </section>

                {/* Right section */}
                <section className="h-full w-[50%] bg-blue-50 rounded-3xl px-14 py-5">
                    <h2 className='text-3xl font-extrabold text-black'>Welcome to Connective</h2>
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