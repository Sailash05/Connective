import { useEffect } from 'react';

import tickIcon from '../../assets/icons/success.png';

type SuccessMessageProps = {
    title: string;
    message: string[];
    button: string;
    buttonFunc: () => void;
};

const SuccessMessage = ({ title, message, button, buttonFunc }: SuccessMessageProps) => {
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

  return (
    <div className="w-[100dvw] h-[100dvh] fixed top-0 left-0 z-50 bg-black bg-opacity-30 flex justify-center items-center px-10">
      <div className="max-w-sm w-full bg-white border border-blue-500 rounded-2xl p-6 shadow-xl flex flex-col items-center gap-3 text-center dark:bg-slate-900 dark:border-blue-500">
        <img src={tickIcon} alt="Success Icon" width={80} className="mb-2" />

        <h3 className="text-3xl font-extrabold text-blue-600 dark:text-blue-500">{title}</h3>

        {message.map((msg, index) => (
          <p key={index} className="text-slate-700 dark:text-slate-300 text-base">
            {msg}
          </p>
        ))}

        <button
          className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300"
          onClick={buttonFunc}
        >
          {button}
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
