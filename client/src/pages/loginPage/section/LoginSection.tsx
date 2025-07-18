import { useState } from 'react';
import { AuthService } from '../../../service/auth.service';
import { useNavigate } from 'react-router-dom';

import ResetRequestForm from '../../../components/loginPageComponent/ResetRequestForm';
import ResetLinkLoading from '../../../components/loadingComponent/ResetLinkLoading';

import showPasswordIcon from '../../../assets/loginPageImage/show-password.png'
import hidePasswordIcon from '../../../assets/loginPageImage/hide-password.png';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginSection = ({
    setLoginSection,
    redirectPath,
    showFailMessage,
    showSuccessMessage
}: {
    setLoginSection: (value: boolean) => void;
    redirectPath: string;
    showFailMessage: (
        title: string,
        msg: string[],
        buttonTxt: string
    ) => void;
    showSuccessMessage: (
        title: string,
        msg: string[],
        buttonTxt: string
    ) => void;
}) => {
    const navigate = useNavigate();

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [resetRequestForm, setResetRequestForm] = useState<boolean>(false);

    const [resetLinkLoading, setResetLinkLoading] = useState<boolean>(false);

    const resetRequest = async (userName: string, email: string) => {
        const trimmedUserName: string = userName.trim();
        const trimmedEmail: string = email.trim();

        if (!trimmedUserName) {
            showFailMessage('Failed!', ['Please enter the user name', 'and try again'], 'Try again');
            return;
        }

        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            showFailMessage('Failed!', ['Please enter a valid email address', 'and try again'], 'Try again');
            return;
        }

        try {
            setResetLinkLoading(true);
            const response = await AuthService.resetRequest({
                userName: trimmedUserName,
                email: trimmedEmail
            });

            setResetLinkLoading(false);

            const data = response.data;

            if(response.status === 200) {
                setResetRequestForm(false);
                showSuccessMessage('Success', [data.message], 'Okay');
            }
        }
        catch(error: any) {
            setResetLinkLoading(false);
            if (error.response?.status === 404 || error.response?.status === 409) {
                const data = error.response.data;
                showFailMessage("Failed!", [data.message], "Try again");
            }
            else {
                showFailMessage("Failed!", ["Something went wrong.", "Please try again."], "Try again");
            }
        }
    }

    const handleLogin = async () => {
        const trimmedUserName: string = userName.trim();
        const trimmedPassword: string = password.trim();

        if (!trimmedUserName) {
            showFailMessage('Failed!', ['Please enter the user name', 'and try again'], 'Try again');
            return;
        }

        if (!trimmedPassword) {
            showFailMessage('Failed!', ['Please enter the password', 'and try again'], 'Try again');
            return;
        }
        
        try {
            const response = await AuthService.login({
                userName: trimmedUserName,
                password: trimmedPassword,
            });

            const data = response.data;

            if(response.status === 200) {
                localStorage.setItem('Token', data.data.jwtToken);
                localStorage.setItem('UserId', data.data.userId);
                navigate(redirectPath);
            }
        }
        catch(error: any) {
            if (error.response?.status === 404) {
                const data = error.response.data;
                showFailMessage("Failed!", [data.message], "Try again");
            }
            else if (error.response?.status === 401) {
                const data = error.response.data;
                showFailMessage("Unauthorized!", [data.message], "Try again");
            } 
            else {
                showFailMessage("Failed!", ["Something went wrong.", "Please try again."], "Try again");
            }
        }

    }

    return(
        <div className='mt-4'>
            <h3 className='text-xl md:text-2xl font-bold underline mb-4'>Log In</h3>

            <div>
                <h5 className='font-bold text-sm'>User Name</h5>
                <input type="text" placeholder='Enter User Name' value={userName} onChange={(e) => setUserName(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4'/>

            </div>

            <div>
                <h5 className='font-bold text-sm'>Password</h5>
                <div className='relative flex items-center'>
                    <input type={showPassword ? 'text' : 'password'} placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400'/>
                    <img src={showPassword ? hidePasswordIcon : showPasswordIcon} alt="" width={30} onClick={() => setShowPassword(!showPassword)} className='absolute right-5 p-1 cursor-pointer' />
                </div>
            </div>
            <p className="text-blue-700 font-bold mb-4 text-end text-sm mt-1">
                <span onClick={() => setResetRequestForm(true)} className="cursor-pointer underline-offset-2 hover:underline">Forgot Password?</span>
            </p>

            <button className='bg-blue-600 w-full py-2 text-white font-medium rounded-lg mb-4 hover:bg-blue-800 transition-all' onClick={() => handleLogin()}>Log In</button>

            <p className='mb-4'>
                Don't have an account? 
                <span className='text-blue-700 font-bold cursor-pointer hover:text-blue-800' onClick={() => setLoginSection(false)}> Sign Up</span>
            </p>

            <p className='text-center mb-4'>————— Or —————</p>

            <button onClick={() => window.location.href = `${BACKEND_URL}/api/auth/google`} className='bg-white border border-blue-600 hover:bg-gray-100 transition-all w-full py-2 px-2 rounded-lg mb-4 flex items-center'>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google Logo" className="h-8 w-8 bg-white p-1"/>
                <h4 className='text-blue-600 font-bold flex-grow'>Continue with Google</h4>
            </button>

            <button onClick={() => window.location.href = `${BACKEND_URL}/api/auth/github`} className='bg-gray-900 hover:bg-gray-950 border border-gray-900 transition-all w-full py-2 px-2 rounded-lg flex items-center'>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub Logo" className="h-8 w-8 p-0.5 invert"/>
                <h4 className='text-white font-bold flex-grow'>Continue with GitHub</h4>
            </button>
            
            {
                resetRequestForm && <ResetRequestForm setResetRequestForm={setResetRequestForm} resetRequest={resetRequest} />
            }
            {
                resetLinkLoading && <ResetLinkLoading />
            }
        </div>
    );
}

export default LoginSection;