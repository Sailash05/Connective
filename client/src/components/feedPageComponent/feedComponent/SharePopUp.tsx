import { useState } from "react";
import { IoClose } from "react-icons/io5";
import addLinkIcon from '../../../assets/mainPageImages/feedSectionIcons/add-link.png';
import { interactionService } from "../../../service/interaction.service";

const SharePopUp = ({ postId, url, setSharePopUp }: { postId: string; url: string; setSharePopUp: (sharePopUp: boolean) => void }) => {
    const [copied, setCopied] = useState(false);

    const postSharedInteraction = async () => {
        try {
            await interactionService.postShared(postId);
        }
        catch(err) {
        }
    }

    const copyToClipboard = async () => {
        try {
            if (window.isSecureContext && navigator.clipboard) {
                await navigator.clipboard.writeText(url);
            } 
            else {
                const textArea = document.createElement("textarea");
                textArea.value = url;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }
            setCopied(true);
            await postSharedInteraction();

            // Hide message after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Unable to copy to clipboard", err);
        }
    };

    return (
        <div className="w-[100dvw] h-[100dvh] bg-black bg-opacity-30 fixed -top-4 left-0 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-xl shadow-md max-sm:w-[90dvw]">
                <header className="items-center h-10 flex justify-between">
                    <h2 className="text-lg font-bold">Share post</h2>
                    <button
                        onClick={() => setSharePopUp(false)}
                        className="bg-gray-200 hover:bg-gray-300 transition-all p-1 rounded-full"
                    >
                        <IoClose className="text-xl text-gray-600" />
                    </button>
                </header>

                {/* <p className="mt-4 font-medium">Share this link via</p>
                <div className="space-x-4 mt-2">
                    <button className="p-1 rounded-full border border-gray-400 hover:bg-gray-100 transition-all">
                        <img src="https://res.cloudinary.com/djbmyn0fw/image/upload/v1752596109/linked_rwu28l.png" alt="" width={30} />
                    </button>
                    <button className="p-1 rounded-full border border-gray-400 hover:bg-gray-100 transition-all">
                        <img src="https://res.cloudinary.com/djbmyn0fw/image/upload/v1752596149/instagram_z7hjqs.png" alt="" width={30} />
                    </button>
                    <button className="p-1 rounded-full border border-gray-400 hover:bg-gray-100 transition-all">
                        <img src="https://res.cloudinary.com/djbmyn0fw/image/upload/v1752596148/x_u4vyjq.png" alt="" width={30} />
                    </button>
                </div> */}

                <p className="mt-5 font-medium">Copy link</p>
                <div className="border border-black flex mt-2 mb-2 p-1 items-center">
                    <img src={addLinkIcon} alt="" className="ml-2 mr-4 w-5 h-5" />
                    <input type="text" value={url} className="w-[12rem] md:w-[18rem] focus:outline-none" readOnly />
                    <button onClick={() => copyToClipboard()} className="bg-blue-600 py-1 px-4 font-bold text-white rounded-md hover:bg-blue-800 transition-all relative">
                        Copy
                        {copied && (
                            <p className="absolute text-green-600 font-bold mt-2 text-sm -top-14 -left-2">Post copied successfully!</p>
                        )}
                    </button>
                </div>

                
            </div>
        </div>
    );
};

export default SharePopUp;
