import { useState } from "react";

const ResetRequestForm = ({ setResetRequestForm, resetRequest }: {
    setResetRequestForm: (resetRequestForm: boolean) => void;
    resetRequest: (userName: string, email: string) => void;
}) => {

    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleResetRequest = () => {
        resetRequest(userName, email);
    }

    return(
        <div className="w-[100dvw] h-[100dvh] fixed top-0 left-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
            <div className="bg-white md:w-[30dvw] w-[90dvw] p-10 flex flex-col md:gap-5 gap-3 justify-center items-start rounded-xl">
                <div className="flex justify-between items-center w-full">
                    <h2 className="text-blue-600 dark:text-blue-500 font-bold text-2xl">Forgot Password</h2>
                    <span onClick={() => setResetRequestForm(false)} className="py-1 px-2 hover:scale-125 transition-all cursor-pointer font-bold dark:text-black text-lg">X</span>
                </div>

                 <div className="w-full">
                    <h5 className='font-bold text-sm'>User Name</h5>
                    <input type="text" placeholder='Enter User Name' value={userName} onChange={(e) => setUserName(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4'/>
                </div>
                <div className="w-full">
                    <h5 className='font-bold text-sm'>Email</h5>
                    <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4' />
                </div>

                <button onClick={() => handleResetRequest()} className="bg-blue-600 hover:bg-blue-800 transition-all text-white font-bold py-2 w-full rounded-lg">Send Reset Link</button>

                <p className="text-sm text-center text-gray-500 w-full">
                    We'll send a password reset link to your email.
                </p>

            </div>
        </div>
    );
}

export default ResetRequestForm;


/* We'll send a password reset link to your email. */