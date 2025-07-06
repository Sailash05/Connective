import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthService } from "../../../service/auth.service";

const SignUpSection = ({
    setLoginSection,
    redirectPath,
    showFailMessage,
}: {
    setLoginSection: (value: boolean) => void;
    redirectPath: string;
    showFailMessage: (
        title: string,
        msg: string[],
        buttonTxt: string
    ) => void;
}) => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const handleSignUp = async () => {
        const trimmedUserName: string = userName.trim();
        const trimmedEmail: string = email.trim().toLowerCase();
        const trimmedPassword: string = password.trim();

        if (!trimmedUserName) {
            showFailMessage('Failed!', ['Please enter the user name', 'and try again'], 'Try again');
            return;
        }

        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            showFailMessage('Failed!', ['Please enter a valid email address', 'and try again'], 'Try again');
            return;
        }

        const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(trimmedPassword)) {
            showFailMessage('Set strong password!', ['Password must be at least 8 characters long and include letters, numbers, and a special character.'], 'Try again');
            return;
        }

        try {
            const response = await AuthService.signup({
                userName: trimmedUserName,
                email: trimmedEmail,
                password: trimmedPassword,
            });

            const data = response.data;
            if(response.status === 201) {
                localStorage.setItem('Token', data.data.jwtToken);
                //showSuccessMessage('Success!', [data.message], 'Okay', (() => { navigate('/home');}));
                navigate(redirectPath);
            }
        } 
        catch (error: any) {
            if (error.response?.status === 409) {
                const data = error.response.data;
                showFailMessage("Failed!", [data.message], "Try again");
            } 
            else {
                showFailMessage("Failed!", ["Something went wrong.", "Please try again."], "Try again");
            }
        }
    };


    return(
        <div className='mt-2'>
            <h3 className='text-xl md:text-2xl font-bold underline mb-4'>Sign Up</h3>

            <div>
                <h5 className='font-bold text-sm'>User Name</h5>
                <input type="text" placeholder='Enter User Name' value={userName} onChange={(e) => setUserName(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4'/>
            </div>

            <div>
                <h5 className='font-bold text-sm'>Email</h5>
                <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4' />
            </div>

            <div>
                <h5 className='font-bold text-sm'>Set Password</h5>
                <input type="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4' />
            </div>

            <button className='bg-blue-600 w-full py-2 text-white font-medium rounded-lg mb-4 hover:bg-blue-800 transition-all' onClick={handleSignUp}>Sign Up</button>

            <p className='mb-4'>Already have an account? <span className='text-blue-700 font-bold cursor-pointer hover:text-blue-800' onClick={() => setLoginSection(true)}>Log In</span></p>

            <p className='text-center mb-4'>————— Or —————</p>

            <button className='bg-white border border-blue-600 hover:bg-gray-100 transition-all w-full py-2 px-2 rounded-lg mb-2 flex items-center'>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google Logo" className="h-8 w-8 bg-white p-1"/>
                <h4 className='text-blue-600 font-bold flex-grow'>Continue with Google</h4>
            </button>

            <button className='bg-gray-900 hover:bg-gray-950 border border-gray-900 transition-all w-full py-2 px-2 rounded-lg flex items-center'>
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub Logo" className="h-8 w-8 p-0.5 invert"/>
                <h4 className='text-white font-bold flex-grow'>Continue with GitHub</h4>
            </button>
        </div>
    );
}

export default SignUpSection;