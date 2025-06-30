
const SignUpSection = ({ setLoginSection }: { setLoginSection: (value: boolean) => void }) => {

    return(
        <div className='mt-2'>
            <h3 className='text-2xl font-bold underline mb-4'>Sign Up</h3>

            <div>
                <h5 className='font-bold text-sm'>User Name</h5>
                <input type="text" placeholder='Enter User Name' className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4'/>

            </div>

            <div>
                <h5 className='font-bold text-sm'>Email</h5>
                <input type='email' placeholder='Enter Email' className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4' />
            </div>

            <div>
                <h5 className='font-bold text-sm'>Password</h5>
                <input type="password" placeholder='Enter Password' className='placeholder-black w-full px-4 py-2 rounded-md bg-white outline-blue-600 border border-gray-400 mb-4' />
            </div>

            <button className='bg-blue-600 w-full py-2 text-white font-medium rounded-lg mb-4 hover:bg-blue-800 transition-all'>Sign Up</button>

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