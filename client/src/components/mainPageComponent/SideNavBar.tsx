import { useState } from 'react';

import homeIcon from '../../assets/mainPageImages/sideNavBarIcons/social/home.png';
import friendsIcon from '../../assets/mainPageImages/sideNavBarIcons/social/friends.png'
import exploreIcon from '../../assets/mainPageImages/sideNavBarIcons/social/explore.png';

import communityIcon from '../../assets/mainPageImages/sideNavBarIcons/community/community.png';
import resourceIcon from '../../assets/mainPageImages/sideNavBarIcons/community/resource.png';
import discussionForumIcon from '../../assets/mainPageImages/sideNavBarIcons/community/disscussionForum.png';
import blogIcon from '../../assets/mainPageImages/sideNavBarIcons/community/blog.png';

import careerDasbboardIcon from '../../assets/mainPageImages/sideNavBarIcons/career/careerDashboard.png';
import learningHubIcon from '../../assets/mainPageImages/sideNavBarIcons/career/learningHub.png';
import resumeBuilderIcon from '../../assets/mainPageImages/sideNavBarIcons/career/resume.png';
import personalTrainingIcon from '../../assets/mainPageImages/sideNavBarIcons/career/personalTraining.png';
import mockTestIcon from '../../assets/mainPageImages/sideNavBarIcons/career/mockTest.png';
import careerGuidanceIcon from '../../assets/mainPageImages/sideNavBarIcons/career/careerGuidance.png';

import helpIcon from '../../assets/mainPageImages/sideNavBarIcons/help.png';
import settingsIcon from '../../assets/mainPageImages/sideNavBarIcons/settings.png';

import { RiArrowDropDownLine } from "react-icons/ri";

const SideNavBar = () => {

    const [subMenu, setSubMenu] = useState(false);

    return(
        <aside className="h-full px-8 flex flex-col pt-4 pb-4 overflow-y-scroll hide-scrollbar">

            {/* Social */}
            <div className="py-2">
                <h2 className='font-extrabold text-md pl-2'>Social</h2>

                <div className='pt-2'>
                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={homeIcon} alt="" width={25} />
                        Home
                    </button>

                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={friendsIcon} alt="" width={25} />
                        Friends
                    </button>

                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={exploreIcon} alt="" width={25} />
                        Explore
                    </button>
                </div>
            </div>

            {/* Communities */}
            <div className="py-2">
                <h2 className='font-extrabold text-md pl-2'>Community</h2>

                <div className='pt-2'>
                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={communityIcon} alt="" width={25} />
                        Communities
                    </button>

                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={resourceIcon} alt="" width={25} />
                        Resources
                    </button>

                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={discussionForumIcon} alt="" width={25} />
                        Disscussion Forums
                    </button>

                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={blogIcon} alt="" width={25} />
                        Blogs
                    </button>
                </div>
            </div>

            {/* Career */}
            <div className="py-2">
                <h2 className='font-extrabold text-md pl-2'>Career</h2>

                <div className='pt-2'>
                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={careerDasbboardIcon} alt="" width={25} />
                        Career Dashboard
                    </button>

                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={learningHubIcon} alt="" width={25} />
                        Learning Hub
                    </button>
                </div>

                {/* Sub menu */}
                <div className='pt-2'>
                    <h3 className='pl-6 flex justify-between items-center cursor-pointer text-gray-800' onClick={() => setSubMenu(!subMenu)}>
                        Ai Career Tools
                        <RiArrowDropDownLine className={`text-3xl transition-all duration-300 ${subMenu && 'rotate-180'}`}/>
                    </h3>

                    <div className={`border-l-2 ml-6 overflow-hidden transform transition-all duration-300 ease-in-out ${subMenu ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}>
                        <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                            <img src={resumeBuilderIcon} alt="" width={25} />
                            Resume Builder
                        </button>

                        <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                            <img src={personalTrainingIcon} alt="" width={25} />
                            Personal Training
                        </button>

                        <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                            <img src={mockTestIcon} alt="" width={25} />
                            Mock Test Zone
                        </button>

                        <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                            <img src={careerGuidanceIcon} alt="" width={25} />
                            Career Guidance
                        </button>
                    </div>
                </div>
            </div>



            {/* Settings and privacy */}
            <div className="py-2 mt-auto">
                <h2 className='font-extrabold text-md pl-2'>Settings & Privacy</h2>

                <div className='pt-2'>
                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={helpIcon} alt="" width={25} />
                        Help
                    </button>

                    <button className="flex justify-start items-center w-full gap-2 py-2 pl-4 hover:bg-blue-50 rounded-md transition-all">
                        <img src={settingsIcon} alt="" width={25} />
                        Settings
                    </button>
                </div>
            </div>

        </aside>
    );
}

export default SideNavBar;