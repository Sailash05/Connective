const CheckingAccessLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {/* Horizontal wave dots */}
      <div className="flex space-x-2">
        <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full animate-wave delay-0"></span>
        <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-wave delay-150"></span>
        <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full animate-wave delay-300"></span>
        <span className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full animate-wave delay-450"></span>
        <span className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full animate-wave delay-600"></span>
      </div>

      {/* Text */}
      <p className="mt-6 text-purple-700 font-semibold text-lg">Checking access...</p>

      {/* Inline CSS for animations */}
      <style>{`
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
        .delay-0 { animation-delay: 0s; }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-450 { animation-delay: 0.45s; }
        .delay-600 { animation-delay: 0.6s; }

        @keyframes wave {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CheckingAccessLoading;
