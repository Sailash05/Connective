import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useCreatePost } from "../context/CreatePostContext";

import Header from "./Header";
import SideNavBar from "./SideNavBar";
import RightSidebar from "./RightSideBar";

import CreatePostForm from "../components/feedPageComponent/feedComponent/CreatingPostForm";

import FailMessage from "../components/message/FailMessage";
import SuccessMessage from "../components/message/SuccessMessage";
import Logout from "../components/message/Logout";


const MainLayout = ({ showRightSidebar }: { showRightSidebar: boolean }) => {

    const { createPost } = useCreatePost();

    const [failMessage, setFailMessage] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    const [logoutPopup, setLogoutPopup] = useState<Boolean>(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

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
        <div className={`h-[100dvh] grid grid-cols-1 ${showRightSidebar ? 'md:grid-cols-[20%_55%_25%]' : 'md:grid-cols-[20%_80%]'} grid-rows-[auto_1fr] dark:bg-slate-950 max-md:relative`}>
            
            <div className="col-span-1 md:col-span-3">
                <Header setLogoutPopup={setLogoutPopup} isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
            </div>
            <div className={`max-md:z-20 md:block overflow-y-hidden bg-white dark:bg-slate-950 ${isSideBarOpen ? 'max-md:fixed' : 'max-md:hidden'} max-md:h-[calc(100dvh-3.5rem)] max-md:bottom-0`}>
                <SideNavBar setLogoutPopup={setLogoutPopup} />
            </div>
            <div className="overflow-y-scroll ">
                <Outlet />
            </div>
            {
                showRightSidebar && (
                    <div className="hidden md:block overflow-y-hidden">
                        <RightSidebar />
                    </div>
                )
            }

            {
                createPost && <CreatePostForm showFailMessage={showFailMessage} showSuccessMessage={showSuccessMessage} />
            }

            {
                failMessage && <FailMessage title={title} message={msg} button={buttonTxt} buttonFunc={() => setFailMessage(false)} />
            }

            {
                successMessage && <SuccessMessage title={title} message={msg} button={buttonTxt} buttonFunc={() => setSuccessMessage(false)}/>
            }

            {
                logoutPopup && <Logout setLogoutPopup={setLogoutPopup} />
            }
        </div>
    );
}

export default MainLayout;