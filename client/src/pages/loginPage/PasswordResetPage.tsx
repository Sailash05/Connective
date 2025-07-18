import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AuthService } from '../../service/auth.service';
import FailMessage from '../../components/message/FailMessage';
import SuccessMessage from '../../components/message/SuccessMessage';

import bgImage from '../../assets/loginPageImage/password-reset-bg.jpeg';
import showPasswordIcon from '../../assets/loginPageImage/show-password.png';
import hidePasswordIcon from '../../assets/loginPageImage/hide-password.png';

const PasswordResetPage = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

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

    const handleResetPassword = async () => {

        if(!email || !token?.trim()) {
            showFailMessage('Failed!', ['Credentials required!', 'Tip: Don\'t modify the url'], 'Try again');
            return;
        }

        const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password.trim())) {
            showFailMessage('Set strong password!', ['Password must be at least 8 characters long and include letters, numbers, and a special character.'], 'Try again');
            return;
        }

        if(password.trim() !== confirmPassword.trim()) {
            showFailMessage('Failed!', ['Password and confirm password must be same.'], 'Try again');
            return;
        }

        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFailMessage('Failed!', ['Invalid email', 'Tip: Don\'t modify the url'], 'Try again');
            return;
        }

        try {
            const response = await AuthService.updatePassword({
                email: email,
                resetToken: token,
                newPassword: password
            });
            
            if(response.status === 200) {
                showSuccessMessage('SUCCESS', ['Your password has been reset successfully.', 'Please log in with your new password.'], 'Log in');
            }
        }
        catch(error: any) {
            if (error.response?.status === 400 || error.response?.status === 404) {
                const data = error.response.data;
                console.log(data);
                showFailMessage("Failed!", [data.message], "Try again");
            }
            else {
                showFailMessage("Failed!", ["Something went wrong.", "Please try again."], "Try again");
            }
        }
    }

    return(
        <div className="w-[100dvw] h-[100dvh] flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="bg-white md:w-[30dvw] w-[90dvw] p-10 flex flex-col gap-6 justify-center items-start rounded-xl shadow-lg">
                <h1 className="text-blue-600 font-extrabold text-3xl text-center w-full">Connective</h1>
                <h2 className="font-bold text-lg">Reset Password</h2>
                <div className="w-full">
                    <h5 className='font-bold text-sm'>New Password</h5>
                    <div className='relative flex items-center'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Enter new Password' value={password} onChange={(e) => setPassword(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400'/>
                        <img src={showPassword? hidePasswordIcon : showPasswordIcon} onClick={() => setShowPassword(!showPassword)} alt="" width={30} className='absolute right-5 p-1 cursor-pointer' />
                    </div>
                </div>
                <div className="w-full">
                    <h5 className='font-bold text-sm'>Confirm New Password</h5>
                    <div className='relative flex items-center'>
                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Re-enter Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400'/>
                        <img src={showConfirmPassword ? hidePasswordIcon : showPasswordIcon} onClick={() => setShowConfirmPassword(!showConfirmPassword)} alt="" width={30} className='absolute right-5 p-1 cursor-pointer' />
                    </div>
                </div>

                <button className="bg-blue-600 hover:bg-blue-800 transition-all py-2 w-full rounded-lg text-white font-bold mt-2" onClick={() => handleResetPassword()}>Reset Password</button>
            </div>
            {
                failMessage && <FailMessage title={title} message={msg} button={buttonTxt} buttonFunc={() => setFailMessage(false)} />
            }
            {
                successMessage && <SuccessMessage title={title} message={msg} button={buttonTxt} buttonFunc={() => navigate('/auth')} />
            }
        </div>
    );
}

export default PasswordResetPage;