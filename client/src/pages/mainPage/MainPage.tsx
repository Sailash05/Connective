import { useState } from "react";

import Header from "../../components/mainPageComponent/Header";
import SideNavBar from "../../components/mainPageComponent/SideNavBar";
import RightSidebar from "../../components/mainPageComponent/RightSideBar";
import FeedSection from "./Section/FeedSection";
import CreatePostForm from "../../components/mainPageComponent/feedComponent/CreatePostForm";

import FailMessage from "../../components/message/FailMessage";
import SuccessMessage from "../../components/message/SuccessMessage";

const MainPage = () => {

    const [createPost, setCreatePost] = useState<boolean>(false);

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
    return(
        <div className="h-[100dvh] grid grid-cols-[20%_55%_25%] grid-rows-[auto_1fr] dark:bg-slate-950">
            
            <div className="col-span-3">
                <Header setCreatePost={setCreatePost} />
            </div>
            <div className="overflow-y-hidden">
                <SideNavBar />
            </div>
            <div className="bg-white">
                <FeedSection setCreatePost={setCreatePost} />
            </div>
            <div className="overflow-y-hidden">
                <RightSidebar />
            </div>

            {
                createPost && <CreatePostForm setCreatePost={setCreatePost} showFailMessage={showFailMessage} showSuccessMessage={showSuccessMessage} />
            }

            {
                failMessage && <FailMessage title={title} message={msg} button={buttonTxt} buttonFunc={() => setFailMessage(false)} />
            }

            {
                successMessage && <SuccessMessage title={title} message={msg} button={buttonTxt} buttonFunc={() => setSuccessMessage(false)}/>
            }
        </div>
    );
}

export default MainPage;