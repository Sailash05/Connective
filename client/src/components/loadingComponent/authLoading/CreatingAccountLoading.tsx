import React from "react";

const UniqueLoading: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-2xl shadow-lg px-10 py-8 flex flex-col items-center animate-fadeIn">
                {/* Loader */}
                <div className="relative w-16 h-16 mb-4">
                    <div className="w-full h-full rounded-lg border-4 border-transparent animate-[spinSquare_1.2s_linear_infinite] bg-gradient-to-tr from-blue-500 to-purple-500 [mask-image:linear-gradient(#fff_0_0)] shadow-lg shadow-blue-300/40"></div>
                </div>

                {/* Text */}
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    Creating Account{" "}
                    <span className="animate-pulse text-xl">🚀</span>
                </h2>

                <p className="text-sm text-gray-700 mt-2 text-center max-w-xs">
                    Please wait while we prepare your personalized user experience...
                </p>
            </div>

            {/* Keyframes */}
            <style>{`
                @keyframes spinSquare {
                0% { transform: rotate(0deg) scale(1); border-radius: 10%; }
                50% { transform: rotate(180deg) scale(0.7); border-radius: 50%; }
                100% { transform: rotate(360deg) scale(1); border-radius: 10%; }
                }
                @keyframes fadeIn {
                0% { opacity: 0; transform: scale(0.95); }
                100% { opacity: 1; transform: scale(1); }
                }
                .animate-fadeIn {
                animation: fadeIn 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default UniqueLoading;
