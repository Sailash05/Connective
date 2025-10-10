import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useCreatePost } from "../context/CreatePostContext";

import Header from "./Header";
import SideNavBar from "./SideNavBar";
import RightSidebar from "./RightSideBar";

import CreatePostForm from "../components/feedPageComponent/feedComponent/CreatingPostForm";

import FailMessage from "../components/message/FailMessage";
import SuccessMessage from "../components/message/SuccessMessage";
import Logout from "../components/message/Logout";


const MainLayout = ({ showRightSidebar }: { showRightSidebar: boolean }) => {
    const location = useLocation();

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

    useEffect(() => {
        setIsSideBarOpen(false);
    }, [location.pathname]);

    return(
        <div className={`h-[100dvh] grid grid-cols-1 ${showRightSidebar ? 'md:grid-cols-[20%_55%_25%]' : 'md:grid-cols-[20%_80%]'} grid-rows-[auto_1fr] dark:bg-slate-950 max-md:relative`}>
            
            <div className="col-span-1 md:col-span-3">
                <Header setLogoutPopup={setLogoutPopup} isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
            </div>
            
            {/* Sidebar */}
            <div className={`max-md:fixed md:block max-md:z-20 overflow-y-hidden bg-white dark:bg-slate-950
            max-md:h-[calc(100dvh-3.5rem)] max-md:bottom-0 max-md:left-0 max-md:top-[3.5rem]
            transition-transform duration-300 ease-in-out transform
            ${isSideBarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0`} >
                <SideNavBar setLogoutPopup={setLogoutPopup} />
            </div>

            {/* Overlay (click to close) */}
            {isSideBarOpen && (
                <div onClick={() => setIsSideBarOpen(false)} className="max-md:fixed top-[3.5rem] left-0 w-full h-[calc(100dvh-3.5rem)] bg-black/40 z-10 md:hidden" />
            )}

            <div className="overflow-y-scroll hide-scrollbar">
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