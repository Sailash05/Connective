const VerifyTokenLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        {/* Vertical pulse bars */}
        <div className="flex space-x-2 h-16">
            <div className="w-2 bg-gradient-to-t from-blue-400 to-blue-600 animate-bar"></div>
            <div className="w-2 bg-gradient-to-t from-blue-500 to-blue-700 animate-bar delay-150"></div>
            <div className="w-2 bg-gradient-to-t from-blue-300 to-blue-500 animate-bar delay-300"></div>
            <div className="w-2 bg-gradient-to-t from-blue-400 to-blue-600 animate-bar delay-450"></div>
            <div className="w-2 bg-gradient-to-t from-blue-500 to-blue-700 animate-bar delay-600"></div>
        </div>

        {/* Text */}
        <p className="mt-6 text-blue-700 font-semibold text-lg">Verifying your session...</p>

        {/* Inline CSS for animations */}
        <style>{`
            .animate-bar {
            animation: pulseBar 1s ease-in-out infinite;
            }
            .delay-150 { animation-delay: 0.15s; }
            .delay-300 { animation-delay: 0.3s; }
            .delay-450 { animation-delay: 0.45s; }
            .delay-600 { animation-delay: 0.6s; }

            @keyframes pulseBar {
            0%, 100% { transform: scaleY(0.4); }
            50% { transform: scaleY(1); }
            }
        `}</style>
        </div>
    );
};

export default VerifyTokenLoading;
