const LoggingInLoading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-[100dvh] w-[100dvw] fixed top-0 left-0 z-50 bg-black bg-opacity-30">
            <div className="text-center bg-white md:p-14 p-10 rounded-xl shadow-md max-sm:w-[90dvw]">

                {/* Wave Loader */}
                <div className="flex space-x-2 justify-center mb-6">
                    <span className="w-2 h-6 bg-blue-600 rounded-full animate-wave" style={{ animationDelay: "0s" }} />
                    <span className="w-2 h-6 bg-blue-600 rounded-full animate-wave" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-6 bg-blue-600 rounded-full animate-wave" style={{ animationDelay: "0.4s" }} />
                    <span className="w-2 h-6 bg-blue-600 rounded-full animate-wave" style={{ animationDelay: "0.6s" }} />
                    <span className="w-2 h-6 bg-blue-600 rounded-full animate-wave" style={{ animationDelay: "0.8s" }} />
                </div>

                {/* Text */}
                <h2 className="text-lg font-semibold text-gray-700">Logging you in...</h2>
                <p className="text-sm text-gray-500 mt-2">Please wait while we verify your credentials.</p>
            </div>

            {/* Custom Keyframes */}
            <style>
                {`
                @keyframes wave {
                    0%, 100% { transform: scaleY(0.4); }
                    50% { transform: scaleY(1); }
                }
                .animate-wave {
                    animation: wave 1s ease-in-out infinite;
                }
                `}
            </style>
        </div>
    );
};

export default LoggingInLoading;
